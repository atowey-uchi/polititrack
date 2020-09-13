<template>
  <div id="slider3"></div>
</template>

<script>
import * as d3 from "d3";
import * as d3geo from "d3-geo";
import * as topojson from "topojson";
import * as moment from "moment";
// import * as _ from "underscore";
// import "../lib/d3.slider";

export default {
  name: "Map",
  mounted() {
    var width = 960,
      height = 600;

    var mapPath = "/cmdoptesc/raw/4714c586f69425043ae3/us.json";
    var projection = d3geo
      .albersUsa()
      .scale(1280)
      .translate([width / 2, height / 2]);

    var path = d3geo.path().projection(projection);

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.json(mapPath, function(error, us) {
      if (error) return console.error(error);

      svg
        .append("path")
        .datum(topojson.feature(us, us.objects.land))
        .attr("d", path)
        .attr("class", "land-boundary");

      svg
        .append("path")
        .datum(
          topojson.mesh(us, us.objects.counties, function(a, b) {
            return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0);
          })
        )
        .attr("d", path)
        .attr("class", "county-boundary");

      svg
        .append("path")
        .datum(
          topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
          })
        )
        .attr("d", path)
        .attr("class", "state-boundary");

      d3.tsv("../assets/rest_777.txt")
        .row(function(d) {
          return {
            permalink: d.permalink,
            lat: parseFloat(d.lat),
            lng: parseFloat(d.long),
            city: d.city,
            created_at: moment(d.created_at, "YYYY-MM-DD HH:mm:ss").unix()
          };
        })
        .get(function(err, rows) {
          if (err) return console.error(err);

          window.site_data = rows;
        });
    });

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
    //       var newData = _(window.site_data).filter(function(site) {
    //         return site.created_at < value;
    //       });
    //       // console.log("New set size ", newData.length);

    //       displaySites(newData);
    //     })
    // );
  }
};
</script>

<style>
path {
  fill: none;
  stroke: #333;
  stroke-width: 0.5px;
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
</style>
