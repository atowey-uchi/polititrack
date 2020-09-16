<template>
  <div style="position: relative;">
    <div class="slidercontainer">
      <label for="date-slider">
        {{ currentDateString }}
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
        "#FF0000",
        "#E7060E",
        "#D00B1B",
        "#B81129",
        "#A11736",
        "#891D44",
        "#712251",
        "#5A285F",
        "#422E6C",
        "#2B337A",
        "#133987"
      ],
      thresholds: [20, 35, 40, 45, 49, 51, 56, 60, 65, 80],
      currentDate: "",
      startDate: "June 1, 2020 00:00:00",
      width: "",
      height: 600,
      chart: "",
      colorRange: "",
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
        1}/${this.currentDate.getDate()}/${this.currentDate
        .getFullYear()
        .toString()
        .substr(-2)}`;
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
          data += `<p><span class="blue--text">Biden:</span> ${(
            parseFloat(projections.Biden) * 100
          ).toFixed(2)}%</p>`;
          data += `<p><span class="red--text">Trump:</span> ${(
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
  text-align: center;
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
  font-size: 24px;
  font-family: "Bai Jamjuree", sans-serif;
  font-weight: 300;
  color: var(--primary-text);
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
  padding-top: 40px;
}

path {
  fill: none;
  stroke: white;
  stroke-width: 0.5px;
}

.state {
  opacity: 0.73;
}

.state:hover {
  opacity: 0.4;
}

.land-boundary {
  stroke-width: 1px;
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
  border: 1px solid #aaaaaa;
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
  padding: 4px;
  font: 12px sans-serif;
  background: var(--primary-text);
  opacity: 0.9;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
  display: none;
  transition: 0.1s;
}

.tooltip h2,
.tooltip p {
  color: var(--background);
  margin: 0;
}

.tooltip.active {
  display: block;
}
</style>
