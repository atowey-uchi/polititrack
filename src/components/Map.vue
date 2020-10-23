<template>
  <div style="position: relative;" class="map-section">
    <div class="map-controls">
      <div class="controls">
        <button class="back-btn" @click="skipToStart()" :disabled="day <= 0">
          <font-awesome-icon icon="fast-backward" />
        </button>
        <button class="play-btn" @click="play()" :disabled="day >= dayMax">
          <font-awesome-icon :icon="['fas', 'play']" />
        </button>
        <button class="pause-btn" @click="pause()">
          <font-awesome-icon :icon="['fas', 'pause']" />
        </button>
        <button
          class="forward-btn"
          @click="skipToEnd()"
          :disabled="day >= dayMax"
        >
          <font-awesome-icon icon="fast-forward" />
        </button>
        <span class="spacer"></span>
        <button
          class="speed-btn"
          @click="speedSelectActive = !speedSelectActive"
        >
          <span :class="{ hide: speedSelectActive }">{{
            selectedSpeed.name
          }}</span>
          <div class="options" v-show="speedSelectActive">
            <ul>
              <li
                v-for="(speed, index) in speeds"
                :key="speed.value"
                :style="{
                  bottom: speedSelectActive
                    ? 0
                    : -35 * (speeds.length - 1 - index) + 'px'
                }"
              >
                <button value="speed.value" @click="selectedSpeed = speed">
                  {{ speed.name }}
                </button>
              </li>
            </ul>
          </div>
        </button>
        <button class="settings-btn" @click="toggleSettings()">
          <font-awesome-icon icon="cog" />
          <div class="settings-popover">
          <button class="high-contrast" @click="toggleHighContrast()">
          High Contrast Colors Mode
        </button>
          </div>
        </button>
      </div>
      <label for="date-slider">{{ prettyDateString }}</label>
      <input
        type="range"
        min="0"
        :max="dayMax"
        class="slider"
        id="date-slider"
        v-model="day"
      />
    </div>
    <div id="map">
      <svg :width="settings.width" :height="settings.height">
        <transition-group tag="g" name="state">
          <path
            v-for="state in statesData"
            class="state"
            :id="state.id"
            :key="state.id"
            :d="state.d"
            :style="state.style"
            @mouseover="showTooltip($event)"
            @mouseout="hideTooltip()"
          />
        </transition-group>
      </svg>
      <div class="map-legend">
        <ul class="legend">
          <li><span class="solidD"></span> Solid Biden</li>
          <li><span class="likelyD"></span> Likely Biden</li>
          <li><span class="leanD"></span> Lean Biden</li>
          <li><span class="tossup"></span> Toss Up</li>
          <li><span class="leanR"></span> Lean Trump</li>
          <li><span class="likelyR"></span> Likely Trump</li>
          <li><span class="solidR"></span> Solid Trump</li>
        </ul>
      </div>
    </div>
    <div class="tooltip" v-html="tooltipData"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
// import { feature, mesh } from "topojson";
// import * as moment from "moment";
// import "../lib/d3.slider";

export default {
  name: "Map",
  data() {
    return {
      states: {},
      colors: [],
      threshold_names: [
        "Solid Trump",
        "Likely Trump",
        "Lean Trump",
        "Toss-Up",
        "Lean Biden",
        "Likely Biden",
        "Solid Biden"
      ],
      thresholds: [10, 25, 40, 60, 75, 90],
      currentDate: "",
      startDate: "June 1, 2020 00:00:00",
      chart: "",
      colorRange: "",
      namesRange: "",
      projection: "",
      path: "",
      day: 0,
      dayMax: 0,
      mapInterval: "",
      hoveredState: "",
      settings: {
        width: 1280,
        height: 600
      },
      speeds: [
        {
          name: "4.0x",
          value: 4
        },
        {
          name: "2.0x",
          value: 2
        },
        {
          name: "1.5x",
          value: 1.5
        },
        {
          name: "1.0x",
          value: 1
        },
        {
          name: "0.5x",
          value: 0.5
        }
      ],
      selectedSpeed: "",
      speedSelectActive: false,
      highContrast: false
    };
  },
  created() {
    this.currentDate = new Date(this.startDate);
    this.fetchData();
  },
  mounted() {
    this.fetchColors();
    this.settings.width = Math.min(this.settings.width, window.innerWidth);
    this.selectedSpeed = this.speeds[2];
    this.setupSlider();
    this.setupChart();
  },
  watch: {
    day: function() {
      if (typeof this.day === "string") {
        this.day = parseInt(this.day);
      }
      this.currentDate = new Date(this.startDate);
      this.currentDate.setDate(
        new Date(this.startDate).getDate() + parseInt(this.day)
      );
    },
    selectedSpeed: function() {
      if (this.mapInterval) {
        this.pause();
        this.play();
      }
    }
  },
  computed: {
    statesData: function() {
      let that = this;

      if (this.states.length) {
        return this.states.map(function(d) {
          return {
            id: d.properties.name,
            d: that.path(d),
            style: {
              fill: that.colorRange(
                parseFloat(
                  d.properties.projections[
                    that.formatDateString(
                      that.getLastDayInData(
                        that.currentDate,
                        d.properties.projections
                      )
                    )
                  ].winstate_chal
                ) * 100
              )
            }
          };
        });
      } else {
        return [];
      }
    },
    tooltipData() {
      if (this.hoveredState) {
        let data = "";
        for (let state of this.states) {
          if (this.hoveredState === state.properties.name) {
            const projections =
              state.properties.projections[
                this.formatDateString(
                  this.getLastDayInData(
                    this.currentDate,
                    state.properties.projections
                  )
                )
              ];
            data += `<h2>${this.hoveredState}</h2>`;
            data += `<h4><i>${this.namesRange(
              parseFloat(projections.winstate_chal) * 100
            )}</i></h4>`;
            data += `<h4 class="likely">Likelihood to win state:</h4>`;
            data += `<p><span class="blue--text" id="Biden">Biden:</span> ${(
              parseFloat(projections.winstate_chal) * 100
            ).toFixed(2)}%</p>`;
            data += `<p><span class="red--text" id="Trump">Trump:</span> ${(
              parseFloat(projections.winstate_inc) * 100
            ).toFixed(2)}%</p>`;
            return data;
          }
        }
      }
      return "";
    },
    currentDateString: function() {
      return `${this.currentDate.getMonth() +
        1}/${this.currentDate.getDate()}/${this.currentDate.getFullYear()}`;
    },
    prettyDateString: function() {
      return `${this.currentDate.toLocaleString("default", {
        month: "long"
      })} ${this.currentDate.getDate()}, ${this.currentDate.getFullYear()}`;
    }
  },
  methods: {
    toggleSettings() {
      let popover=document.querySelector(".settings-popover");
      popover.classList.toggle("active");
    },
    toggleHighContrast() {
      this.highContrast = !this.highContrast;
      if (this.highContrast) {
        this.colors = [
          "#EB2019",
          "#ff7c62",
          "#ffbfae",
          "#ededed",
          "#bab1db",
          "#7268b6",
          "#0d2791"
        ];
      } else {
        this.colors = [];
        this.fetchColors();
      }
      this.setupChart();
    },
    fetchColors() {
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--red")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--redstep2")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--redstep3")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--middle-purple")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--bluestep3")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--bluestep2")
      );
      this.colors.push(
        getComputedStyle(document.body).getPropertyValue("--blue")
      );
    },
    play() {
      document.querySelector(".pause-btn").style.display = "inline";
      document.querySelector(".play-btn").style.display = "none";
      this.mapInterval = setInterval(() => {
        if (this.day >= this.dayMax) {
          this.pause();
        } else {
          this.day += 1;
        }
      }, 300 / this.selectedSpeed.value);
    },
    pause() {
      document.querySelector(".play-btn").style.display = "inline";
      document.querySelector(".pause-btn").style.display = "none";
      clearInterval(this.mapInterval);
    },
    skipToStart() {
      this.day = 0;
    },
    skipToEnd() {
      this.day = this.dayMax;
    },
    showTooltip(event) {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.add("active");
      tooltip.style.left =
        event.pageX - tooltip.parentElement.offsetLeft + "px";
      tooltip.style.top = event.pageY - tooltip.parentElement.offsetTop + "px";
      this.hoveredState = event.target.id;
    },
    hideTooltip() {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.remove("active");
      this.hoveredState = "";
    },
    fetchData() {
      d3.csv("/projections.csv").then(data => {
        d3.json("/us-states.json").then(us => {
          for (let i = 0; i < data.length; i++) {
            const state = data[i].state;
            for (let j = 0; j < us.features.length; j++) {
              if (state === us.features[j].properties.name) {
                if (!us.features[j].properties.projections) {
                  us.features[j].properties.projections = {};
                }
                us.features[j].properties.projections[data[i].modeldate] =
                  data[i];
              }
            }
          }
          this.states = us.features;
        });
      });
    },
    setupChart() {
      this.colorRange = d3
        .scaleThreshold()
        .domain(this.thresholds)
        .range(this.colors);

      this.namesRange = d3
        .scaleThreshold()
        .domain(this.thresholds)
        .range(this.threshold_names);

      this.projection = d3
        .geoAlbersUsa()
        .scale(this.settings.width)
        .translate([this.settings.width / 2, this.settings.height / 2]);

      this.path = d3.geoPath().projection(this.projection);
    },
    setupSlider() {
      const slider = document.getElementById("date-slider");
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      slider.setAttribute("min", 0);
      this.dayMax = this.daysBetween(new Date(this.startDate), today);
    },
    getNextDay(date) {
      const endDate = new Date();
      endDate.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 1);
      if (date >= endDate) {
        return new Date(this.startDate);
      }
      return date;
    },
    getPreviousDay(date) {
      const dayBefore = new Date(date);
      dayBefore.setDate(dayBefore.getDate() - 1);
      return dayBefore;
    },
    getLastDayInData(date, data) {
      if (this.formatDateString(date) in data) {
        return date;
      }
      return this.getLastDayInData(this.getPreviousDay(date), data);
    },
    formatDateString(date) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    daysBetween(start, end) {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((end - start) / ONE_DAY));
    },
    generateMap() {
      let svg = d3.select("#map svg");

      let paths = svg.selectAll("path").data(this.states);

      paths
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("class", "state")
        .style("fill", d => {
          const date = `${this.currentDate.getMonth() +
            1}/${this.currentDate.getDate()}/${this.currentDate
            .getFullYear()
            .toString()
            .substr(-2)}`;
          return this.colorRange(
            parseFloat(d.properties.projections[date].winstate_chal) * 100
          );
        });

      paths.exit().remove();
    }
  }
};
</script>

<style lang="scss">
.map-section {
  .map-controls {
    margin: 5px 22%;
    position: relative;
    width: 56%;
    text-align: left;
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: var(--gray);
    outline: none;
    opacity: 0.8;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 15px;
    margin-top: 20px;
  }
  .slider:hover {
    opacity: 1;
  }

  .map-controls label {
    font-size: 32px;
    font-family: "Poppins", serif;
    font-weight: 600;
    color: var(--primary-text);
    padding-left: 20px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 20px; /* Set a specific slider handle width */
    height: 20px; /* Slider handle height */
    background: var(--blue); /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 50%;
  }

  .slider::-moz-range-thumb {
    width: 20px; /* Set a specific slider handle width */
    height: 20px; /* Slider handle height */
    background: var(--blue); /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 50%;
  }

  #map {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #map svg path {
    fill: none;
    stroke: whitesmoke;
    stroke-width: 0.75px;
  }

  .state {
    opacity: 0.9;
  }

  .state:hover {
    opacity: 0.6;
  }

  .tooltip {
    position: absolute;
    text-align: left;
    width: max-content;
    height: min-content;
    padding: 8px;
    font: 12px;
    background: var(--primary-text);
    opacity: 0.9;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
    display: none;
    transition: 0.1s ease-in;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.8));
  }

  .tooltip h2,
  .tooltip p {
    color: var(--background);
    margin: 0;
  }

  .tooltip h2 {
    font-size: 15px;
  }

  .tooltip h4 {
    color: var(--tertiary-text);
    margin: 0;
    font-size: 12px;
    font-family: "Open Sans";
    font-weight: 400;
  }

  .tooltip h4.likely {
    color: var(--tertiary-text);
    padding-top: 6px;
    font-weight: 200;
    font-size: 11px;
  }

  .tooltip.active {
    display: block;
  }

  .tooltip p #Biden,
  #Trump {
    font-weight: bold;
  }

  .tooltip p {
    font-size: 13px;
  }

  .controls {
    position: absolute;
    top: 15px;
    right: 0;
    width: max-content;
  }

  .controls button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .controls button svg {
    font-size: 2em;
    color: var(--secondary-text);
    transition: color 0.3s ease;
  }

  .controls button.play-btn:hover svg,
  .controls button.pause-btn:hover svg {
    color: var(--middle-purple);
  }

  .controls button.back-btn:hover svg {
    color: var(--red);
  }

  .controls button.forward-btn:hover svg {
    color: var(--blue);
  }

  .controls button.pause-btn {
    display: none;
  }

  .controls button:disabled {
    cursor: not-allowed;
  }

  .controls button:disabled svg {
    color: var(--tertiary-text) !important;
  }

  .controls button.speed-btn {
    font-size: 20px;
    position: relative;
    color: var(--secondary-text);
    font-family: "Open Sans";
    font-weight: 400;
    padding-right: 20px;
  }

  .controls button.speed-btn:hover {
    color: var(--primary-text);
    transition: color 0.3s ease;
  }

  .controls button.speed-btn span.hide {
    visibility: hidden;
    opacity: 0;
  }

  .spacer {
    display: inline-block;
    width: 100px;
  }

  .controls button.speed-btn .options {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 18px;
  }

  .controls button.speed-btn .options ul {
    margin: 0;
    padding: 0;
  }

  .controls button.speed-btn .options ul li {
    list-style: none;
    position: relative;
    transition: 0.3s ease;
  }

  .controls button.speed-btn .options ul li button {
    font-size: 20px;
    color: var(--secondary-text);
    font-family: "Open Sans";
  }

  .controls button .settings-btn {
    width: 33%;
    position: relative;
    padding-left: 20px;
  }

  .controls button svg {
    font-size: 26px;
  }

  .settings-controls {
    width: 66%;
    display: flex;
  }

  .settings-popover {
    position: absolute;
    display: none;
    width: 100px;
    background: var(--primary-text);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  }

  .settings-popover.active {
    display: block;
  }

  .map-legend {
    display: table-column;
    position: absolute;
    right: 20px;
    top: 65%;
  }

  .legend {
    list-style: none;
  }
  .legend li {
    margin-right: 10px;
    font-family: "Open Sans";
    font-size: 13px;
    color: var(--secondary-text);
  }
  .legend span {
    border: 1px solid var(--tertiary-text);
    float: left;
    width: 12px;
    height: 12px;
    margin: 2px;
  }

  .legend .solidD {
    background-color: var(--blue);
  }
  .legend .likelyD {
    background-color: var(--bluestep2);
  }
  .legend .leanD {
    background-color: var(--bluestep3);
  }
  .legend .tossup {
    background-color: var(--middle-purple);
  }
  .legend .leanR {
    background-color: var(--redstep3);
  }
  .legend .likelyR {
    background-color: var(--redstep2);
  }
  .legend .solidR {
    background-color: var(--red);
  }
}
</style>
