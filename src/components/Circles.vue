<template>
  <div class="line-graph"></div>
</template>

<script>
import * as d3 from "d3";

src = "https://d3js.org/d3.v4.js";

export default {
  name: "Line",
  data() {
    return {
      width: 460,
      height: 400
    };
  },
  methods: {
    init() {
      const svg = d3.select("#line-graph");
      .append("svg")
        .attr("width")
        .attr("height")
        .append("g");
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
        function(d) {
          return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
        },
        function(data) {
          let x = d3
            .scaleTime()
            .domain(
              d3.extent(data, function(d) {
                return d.date;
              })
            )
            .range([0, 400]);
          svg
            .append("g")
            .attr("transform", "translate(0," + 400 + ")")
            .call(d3.axisBottom(x));

          // Add Y axis
          var y = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(data, function(d) {
                return +d.value;
              })
            ])
            .range([300, 0]);
          svg.append("g").call(d3.axisLeft(y));

          // Add the line
          svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              d3
                .line()
                .x(function(d) {
                  return x(d.date);
                })
                .y(function(d) {
                  return y(d.value);
                })
            );
        }
      );
    }
  }
};
</script>

<style scoped lang="scss"></style>
