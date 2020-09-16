<template>
  <div>
    <h1>{{ formatDateString(currentDate) }}</h1>
    <div class="slidercontainer">
    <input type="range" min="1" max="100" value="50" class="slider">
    </div>
    <div id="map"></div>
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
      thresholds: [
        22,
        28.22,
        34.44,
        40.66,
        46.88,
        53.1,
        59.32,
        65.54,
        71.76,
        78
      ],
      currentDate: "",
      width: "",
      height: 600,
      chart: "",
      colorRange: "",
      projection: "",
      path: ""
    };
  },
  created() {
    this.currentDate = new Date(2020, 6, 1);
    this.fetchData();
  },
  mounted() {
    this.width = window.innerWidth;
    this.setupChart();
    this.generateMap();
  },
  watch: {
    states: function() {
      this.generateMap();
    }
  },
  methods: {
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

      d3.select("#map")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    },
    getNextDay(date) {
      const endDate = new Date(2020, 9, 13);
      date.setDate(date.getDate() + 1);
      if (date >= endDate) {
        return new Date(2020, 6, 1);
      }
      return date;
    },
    formatDateString(date) {
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    },
    generateMap() {
      this.currentDate = this.getNextDay(this.currentDate);

      let svg = d3.select("#map svg");
      let tooltip = d3.select(".tooltip");

      svg
        .selectAll("path")
        .data(this.states)
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("class", "state")
        .style("fill", d => {
          const date = `${this.currentDate.getMonth()}/${this.currentDate.getDate()}/${this.currentDate
            .getFullYear()
            .toString()
            .substr(-2)}`;
          console.log(date);
          return this.colorRange(
            parseFloat(d.properties.projections[date].Biden) * 100
          );
        })
        .on("mouseover", function(d) {
          const date = `${this.currentDate.getMonth()}/${this.currentDate.getDate()}/${this.currentDate
            .getFullYear()
            .toString()
            .substr(-2)}`;
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip
            .text(
              `Biden: ${d.properties.projections[date].Biden}\nTrump: ${d.properties.projections[date].Trump}`
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function() {
          tooltip
            .transition()
            .duration(500)
            .style("opacity", 0.0);
        });
      // d3.json("/us.json").then(function(us) {

      //   svg
      //     .append("path")
      //     .datum(feature(us, us.objects.land))
      //     .attr("d", path)
      //     .attr("class", "land-boundary");

      //   svg
      //     .append("path")
      //     .datum(
      //       mesh(us, us.objects.counties, function(a, b) {
      //         return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0);
      //       })
      //     )
      //     .attr("d", path)
      //     .attr("class", "county-boundary");

      //   svg
      //     .append("path")
      //     .datum(
      //       mesh(us, us.objects.states, function(a, b) {
      //         return a !== b;
      //       })
      //     )
      //     .attr("d", path)
      //     .attr("class", "state-boundary");

      //   svg
      //     .selectAll("path")
      //     .data(feature(us, us.objects.states).features)
      //     .enter()
      //     .append("path")
      //     .attr("d", path)
      //     .attr("class", "state")
      //     .style("fill", function(d) {
      //       if (d.id === 4) {
      //         return "purple";
      //       } else {
      //         return "yellow";
      //       }
      //     });
      // });

      //   d3.tsv(dataPath)
      //     .row(function(d) {
      //       return {
      //         permalink: d.permalink,
      //         lat: parseFloat(d.lat),
      //         lng: parseFloat(d.long),
      //         city: d.city,
      //         created_at: moment(d.created_at, "YYYY-MM-DD HH:mm:ss").unix()
      //       };
      //     })
      //     .get(function(err, rows) {
      //       if (err) return console.error(err);
      //       window.site_data = rows;
      //     });
      // });

      // var displaySites = function(data) {
      //   var sites = svg.selectAll(".site").data(data, function(d) {
      //     return d.permalink;
      //   });

      //   sites
      //     .enter()
      //     .append("circle")
      //     .attr("class", "site")
      //     .attr("cx", function(d) {
      //       return projection([d.lng, d.lat])[0];
      //     })
      //     .attr("cy", function(d) {
      //       return projection([d.lng, d.lat])[1];
      //     })
      //     .attr("r", 1)
      //     .transition()
      //     .duration(400)
      //     .attr("r", 5);

      //   sites
      //     .exit()
      //     .transition()
      //     .duration(200)
      //     .attr("r", 1)
      //     .remove();
      // };

      // var minDateUnix = moment("2014-07-01", "YYYY MM DD").unix();
      // var maxDateUnix = moment("2015-07-21", "YYYY MM DD").unix();
      // var secondsInDay = 60 * 60 * 24;

      // d3.select("#slider3").call(
      //   d3
      //     .slider()
      //     .axis(true)
      //     .min(minDateUnix)
      //     .max(maxDateUnix)
      //     .step(secondsInDay)
      //     .on("slide", function(evt, value) {
      //       var newData = _(site_data).filter(function(site) {
      //         return site.created_at < value;
      //       });
      //       // console.log("New set size ", newData.length);

      //       displaySites(newData);
      //     })
      // );
    }
  }
};
</script>

<style>

.slidercontainer {
  margin: 0 22%;
  position: absolute;
  width: 56%;
}

.slider {
  -webkit-appearance: none; 
  appearance: none;
width: 100%;
  height: 10px;
  background: var(--gray);
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 15px;
}

.slider:hover {
  opacity: 1;
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
  opacity: .73;
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
	text-align: center;           
	width: 60px;                  
	height: 28px;                 
	padding: 2px;             
	font: 12px sans-serif;        
	background: white;   
	border: 0px;      
	border-radius: 8px;           
	pointer-events: none;         
}
</style>
