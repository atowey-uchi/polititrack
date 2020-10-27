<template>
  <section class="insights" id="insights">
    <div class="gradient-swoosh">
      <img src="@/assets/images/brush1.svg" />
    </div>
    <div class="title">
      <h1>
        Campaign Insights
      </h1>
    </div>
    <div class="stops-date"></div>
  </section>
</template>

<script>
export default {
  name: "Insights"
};
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("stops-date")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./public/3-day-data.csv", function(data) {
  // group the data: I want to draw one line per group
  var sumstat = d3
    .nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) {
      return d.date;
    })
    .entries(data);

  // Add X axis --> it is a date format
  var x = d3
    .scaleLinear()
    .domain(
      d3.extent(data, function(d) {
        return d.date;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(10));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return +d.trump;
      })
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // color palette
  var res = sumstat.map(function(d) {
    return d.key;
  }); // list of group names
  var color = d3
    .scaleOrdinal()
    .domain(res)
    .range(["#e41a1c", "#377eb8"]);

  // Draw the line
  svg
    .selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function(d) {
      return color(d.key);
    })
    .attr("stroke-width", 1.5)
    .attr("d", function(d) {
      return d3
        .line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          return y(+d.trump);
        })(d.values);
    });
});
</script>

<style scoped lang="scss">
.insights {
  min-height: 100vh;
  position: relative;
  padding-top: 40px;
  padding-bottom: 120px;
  max-width: 1280px;
  margin: 0 auto;
}

.gradient-swoosh {
  position: absolute;
  top: 20px;
  left: -430px;
  z-index: -1;
  opacity: 0.3;
  // padding: 0;
  overflow: hidden;
}

.gradient-swoosh img {
  transform: rotate(180deg);
  width: 250vh;
  transform: scaleY(-1);
  // -webkit-filter-mask: linear-gradient(to right, var(--blue), var(--red));
}

div .title h1 {
  text-align: center;
  font-size: 48px;
  padding-top: 60px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1));
}
</style>
