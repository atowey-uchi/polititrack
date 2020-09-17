<template>
  <div style="position: relative;">
    <div class="slidercontainer">
      <label for="date-slider">
        {{ prettyDateString }}
      </label>
      <input
        type="range"
        min="1"
        max="100"
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
          ></path>
        </transition-group>
      </svg>
    </div>
    <div class="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
// import { feature, mesh } from "topojson";
// import * as moment from "moment";
// import * as _ from "underscore";
// import "../lib/d3.slider";

export default {
  name: "Map",
  data() {
    return {
      states: {},
      colors: [
        // "#ff0000",
        // "#ff3333",
        // "#ff6b6b",
        // "#ffa8a8",
        // "#ffd1d1",
        // "#ffffff",
        // "#cbd9eb",
        // "#aac1de",
        // "#759bc9",
        // "#4779b7",
        // "#2661aa",
        // "#094c9e"

        "#FF0000", // Near Certain Republican
        "#E7060E", // Strong Republican
        "#D00B1B", // Likely Republican
        "#B81129", // Lean Republican
        "#A11736", // Slightly Republican
        "#891D44", // Toss-Up
        "#712251", // Slightly Democrat
        "#5A285F", // Lean Democrat
        "#422E6C", // Likely Democrat
        "#2B337A", // Strong Democrat
        "#133987" // Near Certain Democrat
      ],
      threshold_names: [
        "Near Certain Trump",
        "Strong Trump",
        "Likely Trump",
        "Lean Trump",
        "Slight Lean Trump",
        "Toss-Up",
        "Slight Lean Biden",
        "Lean Biden",
        "Likely Biden",
        "Strong Biden",
        "Near Certain Biden"
      ],
      thresholds: [12, 28, 38, 44, 48, 52, 56, 62, 72, 88],
      currentDate: "",
      startDate: "June 1, 2020 00:00:00",
      width: "",
      height: 600,
      chart: "",
      colorRange: "",
      namesRange: "",
      projection: "",
      path: "",
      day: 0,
      settings: {
        width: 1280,
        height: 600
      }
    };
  },
  created() {
    this.currentDate = new Date(this.startDate);
    this.fetchData();
  },
  mounted() {
    this.width = window.innerWidth;
    this.setupSlider();
    this.setupChart();
  },
  watch: {
    day: function() {
      this.currentDate = new Date(this.startDate);
      this.currentDate.setDate(
        new Date(this.startDate).getDate() + parseInt(this.day)
      );
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
                  d.properties.projections[that.currentDateString].Biden
                ) * 100
              )
            }
          };
        });
      } else {
        return [];
      }
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
    getTooltipData(stateName) {
      let data = "";
      for (let state of this.states) {
        if (stateName === state.properties.name) {
          const projections =
            state.properties.projections[this.currentDateString];
          data += `<h2>${stateName}</h2>`;
          data += `<h4><i>${this.namesRange(
            parseFloat(projections.Biden) * 100
          )}</i></h4>`;
          data += `<h4 class="likely">Likelihood to win state:</h4>`;
          data += `<p><span class="blue--text" id="Biden">Biden:</span> ${(
            parseFloat(projections.Biden) * 100
          ).toFixed(2)}%</p>`;
          data += `<p><span class="red--text" id="Trump">Trump:</span> ${(
            parseFloat(projections.Trump) * 100
          ).toFixed(2)}%</p>`;
          return data;
        }
      }
    },
    showTooltip(event) {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.add("active");
      tooltip.style.left =
        event.pageX - tooltip.parentElement.offsetLeft + "px";
      tooltip.style.top = event.pageY - tooltip.parentElement.offsetTop + "px";
      tooltip.innerHTML = this.getTooltipData(event.target.id);
    },
    hideTooltip() {
      const tooltip = document.querySelector(".tooltip");
      tooltip.classList.remove("active");
      tooltip.innerHTML = "";
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
        .scale(1180)
        .translate([this.width / 2, this.height / 2]);

      this.path = d3.geoPath().projection(this.projection);
    },
    setupSlider() {
      const slider = document.getElementById("date-slider");
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      slider.setAttribute("min", 0);
      slider.setAttribute(
        "max",
        this.daysBetween(new Date(this.startDate), today)
      );
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
            parseFloat(d.properties.projections[date].Biden) * 100
          );
        });

      paths.exit().remove();
    }
  }
};
</script>

<style>
.slidercontainer {
  margin: 0 22%;
  position: absolute;
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
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 15px;
}

.slider:hover {
  opacity: 1;
}

.slidercontainer label {
  font-size: 28px;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 400;
  color: var(--secondary-text);
  bottom: 35px;
  position: absolute;
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
  padding-top: 20px;
}

path {
  fill: none;
  stroke: whitesmoke;
  stroke-width: 0.75px;
}

.state {
  opacity: 0.83;
}

.state:hover {
  opacity: 0.6;
}

.land-boundary {
  stroke-width: 3px;
}

.county-boundary {
  stroke: #ddd;
}

.site {
  stroke-width: 0.5px;
  stroke: #333;
  fill: #9cf;
}

#slider3 {
  margin: 20px 0 10px 20px;
  width: 900px;
}

.d3-slider {
  position: relative;
  font-family: Verdana, Arial, sans-serif;
  font-size: 1.1em;
  border: 1px solid var(--light-gray);
  z-index: 2;
}

.d3-slider-horizontal {
  height: 0.8em;
}

.d3-slider-range {
  background: #2980b9;
  left: 0px;
  right: 0px;
  height: 0.8em;
  position: absolute;
}

.d3-slider-range-vertical {
  background: #2980b9;
  left: 0px;
  right: 0px;
  position: absolute;
  top: 0;
}

.d3-slider-vertical {
  width: 0.8em;
  height: 100px;
}

.d3-slider-handle {
  position: absolute;
  width: 1.2em;
  height: 1.2em;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  background: #eee;
  background: linear-gradient(to bottom, #eee 0%, #ddd 100%);
  z-index: 3;
}

.d3-slider-handle:hover {
  border: 1px solid #999999;
}

.d3-slider-horizontal .d3-slider-handle {
  top: -0.3em;
  margin-left: -0.6em;
}

.d3-slider-axis {
  position: relative;
  z-index: 1;
}

.d3-slider-axis-bottom {
  top: 0.8em;
}

.d3-slider-axis-right {
  left: 0.8em;
}

.d3-slider-axis path {
  stroke-width: 0;
  fill: none;
}

.d3-slider-axis line {
  fill: none;
  stroke: #aaa;
  shape-rendering: crispEdges;
}

.d3-slider-axis text {
  font-size: 11px;
}

.d3-slider-vertical .d3-slider-handle {
  left: -0.25em;
  margin-left: 0;
  margin-bottom: -0.6em;
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
</style>
