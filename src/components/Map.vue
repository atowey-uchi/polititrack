<template>
  <div style="position: relative;" class="map-section">
    <div class="how-to">
      <p>
        <b>&#9432;</b>
        <i> Press Play </i>( &#9658; )
        <i
          >to view campaign events over time or drag the slider to see campaign
          events on a particular day. To see information about each event, hover
          over the location on the map.
        </i>
      </p>
    </div>
    <div class="main">
      <div class="map-left">
        <div class="map-controls">
          <div class="controls">
            <button
              class="back-btn"
              @click="skipToStart()"
              :disabled="day <= 0"
            >
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
                    :class="{ active: selectedSpeed === speed }"
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
                <button
                  class="btn candidates-only"
                  @click="toggleCandidatesOnly()"
                >
                  Show History
                </button>
                <button
                  class="btn high-contrast"
                  :class="{ active: highContrast }"
                  @click="toggleHighContrast()"
                >
                  High-Contrast Colors
                </button>
                <button
                  class="btn candidates-only"
                  :class="{ active: candidatesOnly }"
                  @click="toggleCandidatesOnly()"
                >
                  Candidates Only
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
            <transition-group tag="g" name="state" class="states">
              <path
                v-for="state in statesData"
                class="state"
                :id="state.id"
                :key="state.id"
                :d="state.d"
                :style="state.style"
                @mouseover="showProjections($event)"
                @mouseout="hideProjections()"
              />
            </transition-group>
            <transition-group tag="g" name="stop">
              <circle
                v-for="stop in campaignStopsData"
                class="stop"
                :id="stop.id"
                :key="stop.id"
                :style="stop.style"
                :r="stop.r"
                :cx="stop.cx"
                :cy="stop.cy"
                :stroke="stop.stroke"
                :stroke-width="stop.strokeWidth"
                @mouseover="showTooltip($event)"
                @mouseout="hideTooltip($event)"
              />
            </transition-group>
          </svg>
        </div>
      </div>
      <div class="map-right">
        <div class="keys">
          <div class="polling-key">
            <h3>Polling Data</h3>
            <ul class="legend">
              <li><span class="solidD"></span> Solid Biden</li>
              <li><span class="likelyD"></span>Likely Biden</li>
              <li><span class="leanD"></span>Lean Biden</li>
              <li><span class="tossup"></span>Toss Up</li>
              <li><span class="leanR"></span>Lean Trump</li>
              <li><span class="likelyR"></span>Likely Trump</li>
              <li><span class="solidR"></span>Solid Trump</li>
            </ul>
          </div>
          <div class="stops-key">
            <h3>Campaign Events</h3>
            <div class="dot-and-text" id="biden">
              <span></span>
              <p>Biden Event</p>
            </div>
            <div class="dot-and-text" id="trump">
              <span></span>
              <p>Trump Event</p>
            </div>
          </div>
        </div>
        <div class="projections-data">
          <div v-if="hoveredState">
            <h2>{{ hoveredState }}</h2>
            <h4>
              <i>{{ projectionsData.chances }}</i>
            </h4>
            <h4 class="likely">Likelihood to win state:</h4>
            <p>
              <span class="blue--text" id="Biden">Biden: </span
              >{{ projectionsData.biden }}%
            </p>
            <p>
              <span class="red--text" id="Trump">Trump: </span
              >{{ projectionsData.trump }}%
            </p>
          </div>
          <div v-else>
            <h4>Hover over a state to view projections.</h4>
          </div>
        </div>
      </div>
      <div
        class="tooltip"
        v-html="tooltipData"
        @mouseout="hideTooltip($event)"
      ></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

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
      campaignStops: {},
      path: "",
      day: 0,
      dayMax: 0,
      mapInterval: "",
      hoveredState: "",
      hoveredStop: "",
      settings: {
        width: 950,
        height: 510
      },
      speeds: [
        {
          name: "4.0x",
          value: 2
        },
        {
          name: "2.0x",
          value: 1
        },
        {
          name: "1.0x",
          value: 0.5
        },
        {
          name: "0.5x",
          value: 0.25
        },
        {
          name: "0.2x",
          value: 0.125
        }
      ],
      selectedSpeed: "",
      speedSelectActive: false,
      highContrast: false,
      candidatesOnly: false
    };
  },
  created() {
    this.currentDate = new Date(this.startDate);
    this.fetchData();
    this.fetchCampaignData();
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
    campaignStopsData: function() {
      let that = this;
      if (this.campaignStops.length) {
        let stops = this.campaignStops
          .filter(function(stop) {
            return stop.date == that.formatDateString(that.currentDate);
          })
          .filter(function(stop) {
            return (
              !that.candidatesOnly || stop.who == "Biden" || stop.who == "Trump"
            );
          })
          .map(function(d) {
            const coords = that.projection([d["longitude"], d["latitude"]]);
            if (coords) {
              return {
                id: d.id,
                style: {
                  fill:
                    d.candidate == "Biden"
                      ? getComputedStyle(document.body).getPropertyValue(
                          "--blue"
                        )
                      : getComputedStyle(document.body).getPropertyValue(
                          "--red"
                        )
                },
                r: 5.5,
                cx: coords[0],
                cy: coords[1],
                x: coords[0],
                y: coords[1],
                strokeWidth: 2,
                stroke: getComputedStyle(document.body).getPropertyValue(
                  "--primary-text"
                )
              };
            }
          });
        d3.forceSimulation(stops)
          .force(
            "collision",
            d3
              .forceCollide()
              .radius(function(d) {
                return d.r;
              })
              .strength(0.01)
              .iterations(1)
          )
          .on("tick", function() {
            for (let stop of stops) {
              stop.cx = stop.x;
              stop.cy = stop.y;
            }
          });
        return stops;
      } else {
        return [];
      }
    },
    projectionsData() {
      if (this.hoveredState) {
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
            return {
              chances: this.namesRange(
                parseFloat(projections.winstate_chal) * 100
              ),
              biden: (parseFloat(projections.winstate_chal) * 100).toFixed(2),
              trump: (parseFloat(projections.winstate_inc) * 100).toFixed(2)
            };
          }
        }
      }
      return {};
    },
    tooltipData() {
      if (this.hoveredStop) {
        let data = "";
        for (let stop of this.campaignStops) {
          if (this.hoveredStop == stop.id) {
            data += `<h2>${stop.location}</h2>`;
            data += `<h3>${stop.who}</h3>`;
            data += `<h4>${stop.type}</h4>`;
            data += `<p>${stop.description}</p>`;
            data += `<a href="${stop.more_information}">Read More</a>`;
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
    toggleCandidatesOnly() {
      this.candidatesOnly = !this.candidatesOnly;
    },

    toggleSettings() {
      let popover = document.querySelector(".settings-popover");
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
      console.log(this.campaignStopsData);
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
    showProjections(event) {
      const projections = document.querySelector(".projections-data");
      const statesRect = document
        .querySelector("g.states")
        .getBoundingClientRect();
      projections.classList.add("active");
      projections.style.left =
        statesRect.right - projections.getBoundingClientRect().width / 2 + "px";
      projections.style.top = statesRect.height / 2 + "px";
      this.hoveredState = event.target.id;
    },
    hideProjections() {
      const projections = document.querySelector(".projections-data");
      projections.classList.remove("active");
      this.hoveredState = "";
    },
    showTooltip(event) {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.add("active");
      tooltip.style.left =
        event.pageX - tooltip.parentElement.offsetLeft + "px";
      tooltip.style.top = event.clientY + "px";
      this.hoveredStop = event.target.id;
    },
    hideTooltip() {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.remove("active");
      this.hoveredStop = "";
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
    fetchCampaignData() {
      let that = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          that.campaignStops = JSON.parse(this.responseText);
          // add ids
          for (let i = 0; i < that.campaignStops.length; i++) {
            that.campaignStops[i].id = i;
          }
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns", true);
      xhr.send();
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
        .attr("d", this.path.interpolate("cardinal"))
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
.how-to {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 16px;
}

.how-to p {
  margin: auto;
  text-align: center;
  width: 55%;
  color: var(--secondary-text);
}

.main {
  display: flex;
  width: 1280px;
  margin: 0 auto;
}

.map-section {
  padding-bottom: 100px;
}

.map-left {
  width: 900px;
}

.map-section {
  .map-controls {
    margin: 0 auto;
    position: relative;
    width: 700px;
    text-align: left;
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 700px;
    height: 10px;
    background: var(--gray);
    outline: none;
    opacity: 0.8;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 15px;
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.2));
  }

  #map svg path {
    position: relative;
    fill: none;
    stroke: rgba(235, 235, 235, 0.7);
    stroke-width: 1px;
    z-index: 1;
  }

  .state {
    opacity: 0.9;
  }

  .state:hover {
    opacity: 0.65;
  }

  .stop {
    cursor: pointer;
  }

  .tooltip {
    position: absolute;
    text-align: left;
    width: 170px;
    height: 130px;
    padding: 5px;
    font: 14px;
    background: var(--primary-text);
    opacity: 0.9;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
    display: none;
    transition: 0.1s ease-in;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.8));
  }

  .tooltip {
    width: 250px;
    height: max-content;
    z-index: 10000;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .tooltip h2,
  .tooltip h3,
  .tooltip h4,
  .tooltip p,
  .tooltip a {
    color: var(--black-ish);
    margin: 0;
    padding-left: 10px;
    padding-right: 10px;
  }

  .tooltip h2 {
    font-size: 18px;
    font-weight: 500;
    font-family: "Poppins";
  }

  .tooltip h3 {
    font-size: 18px;
    font-weight: 300;
    font-family: "Bai Jamjuree";
  }

  .tooltip h4 {
    color: var(--black-ish);
    margin: 0;
    font-size: 16px;
    font-family: "Open Sans";
    font-weight: 300;
    font-style: italic;
    padding-bottom: 10px;
  }

  .tooltip p {
    font-size: 13px;
  }

  .tooltip a {
    color: var(--blue);
    font-size: 13px;
    font-weight: 500;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .projections-data div {
    position: relative;
    padding: 5px;
    background: var(--panel-back);
    border-radius: 5px;
    width: 380px;
    height: 180px;
    opacity: 0.9;
  }

  .projections-data h2,
  .projections-data p {
    color: var(--primary-text);
    margin: 0;
  }

  .projections-data h4.likely {
    color: var(--secondary-text);
    padding-top: 10px;
    font-weight: 200;
    font-size: 14px;
    margin: 0;
  }

  .projections-data.active,
  .tooltip.active {
    display: block;
  }

  .projections-data p #Biden,
  #Trump {
    font-weight: 400;
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
    color: var(--primary-text);
    font-family: "Open Sans";
    font-weight: 400;
    padding-right: 20px;
    z-index: 1000;
    border-radius: 5px;
  }

  .controls button.speed-btn:hover {
    color: var(--primary-text);
    transition: color 0.3s ease;
    z-index: 10000;
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
    height: 20px;
    z-index: 10000;
  }

  .controls button.speed-btn .options ul {
    margin: 0;
    padding: 0;
    z-index: 10000;
    background: var(--light-gray);
    display: inline-block;
    text-align: left;
    border-radius: 5px;
  }

  .controls button.speed-btn .options ul li {
    list-style: none;
    position: relative;
    transition: 0.3s ease;
    z-index: 10000;
    display: inline-block;
    text-align: left;
    width: 100%;
  }

  .controls button.speed-btn .options ul li:hover {
    background: var(--blue-60);
  }

  .controls button.speed-btn .options ul li button {
    color: var(--black-ish);
    font-family: "Open Sans";
    z-index: 10000;
    font-size: 14px;
  }

  .controls button.speed-btn .options .active {
    background: var(--blue-75);
  }

  .controls button .settings-btn {
    width: 33%;
    position: relative;
    padding-left: 20px;
    z-index: 10000;
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
    width: 150px;
    background: var(--light-gray);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    margin-top: 4px;
    z-index: 10000;
  }

  .settings-popover button {
    font-family: "Open Sans";
    color: var(--black-ish);
    margin: 0 auto;
    padding: 4px 10px;
    z-index: 10000;
    width: 150px;
  }

  .settings-popover .btn.active {
    background: var(--blue-75);
  }

  .settings-popover button:hover {
    background: var(--blue-60);
  }

  .settings-popover.active {
    z-index: 10000;
    display: inline-block;
    text-align: left;
  }

  .map-right {
    width: 380px;
    margin: 0 auto;
    padding-top: 20vh;
  }

  .keys {
    width: 100%;
    height: 200px;
    display: flex;
  }

  .keys h3 {
    margin: 0;
    text-align: center;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 18px;
  }

  .polling-key {
    width: 180px;
    height: 180px;
    background: var(--panel-back);
    border-radius: 5px;
    margin-right: 20px;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .legend {
    list-style: none;
    width: 90%;
    margin: 0 auto;
  }

  .legend ul {
    display: table-column-group;
  }

  .legend li {
    margin-right: 10px;
    font-family: "Open Sans";
    font-size: 13px;
    color: var(--secondary-text);
    display: flex;
    align-items: center;
  }
  .legend span {
    border: 1px solid var(--tertiary-text);
    float: left;
    width: 12px;
    height: 12px;
    margin-right: 5px;
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

.stops-key {
  width: 180px;
  background: var(--panel-back);
  border-radius: 5px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stops-key #biden span {
  background: var(--blue);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  border: white 2px solid;
}

.stops-key #trump span {
  background: var(--red);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  border: white 2px solid;
}

.stops-key .dot-and-text {
  display: flex;
  max-width: 90%;
  width: inherit;
  align-items: center;
}

.stops-key div.dot-and-text p {
  font-size: 13px;
  font-weight: 400;
  font-family: "Open Sans";
  margin-left: 5px;
}
</style>
