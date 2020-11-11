<template>
  <div class="line-chart">
    <svg :width="settings.width" :height="settings.height">
      <g class="line-chart" :transform="transform">
        <g :transform="yTransform" class="axis">
          <g ref="yAxis"></g>
        </g>
        <g :transform="xTransform" class="axis">
          <g ref="xAxis"></g>
        </g>
        <path class="line" :d="line"></path>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "LineChart",
  data() {
    return {
      settings: {
        width: 400,
        height: 400
      },
      campaignStops: [],
      totals: [],
      transform: "translate(50, -20)",
      yTransform: "translate(0, 0)",
      xTransform: "translate(0, 400)",
      // line: "",
      stops: [
        {
          day: "01-11-2016",
          count: 80
        },
        {
          day: "02-12-2016",
          count: 250
        },
        {
          day: "03-13-2016",
          count: 150
        },
        {
          day: "04-14-2016",
          count: 496
        },
        {
          day: "05-15-2016",
          count: 140
        },
        {
          day: "06-16-2016",
          count: 380
        },
        {
          day: "07-17-2016",
          count: 140
        },
        {
          day: "08-17-2016",
          count: 240
        },
        {
          day: "09-18-2016",
          count: 100
        },
        {
          day: "10-18-2016",
          count: 260
        },
        {
          day: "11-18-2016",
          count: 100
        },
        {
          day: "12-18-2016",
          count: 150
        }
      ]
    };
  },
  methods: {
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
          that.totals = that.computeTotalsByData();
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns", true);
      xhr.send();
    },
    computeTotalsByData() {
      let totals = {};
      for (let stop of this.campaignStops) {
        if (stop) {
          if (stop.date in totals) {
            totals[stop.date][stop.candidate] += 1;
          } else {
            totals[stop.date] = {
              Trump: 0,
              Biden: 0,
              date: d3.timeParse("%m/%d/%Y")(stop.date)
            };
            totals[stop.date][stop.candidate] += 1;
          }
        }
      }
      return Object.values(totals);
    }
  },
  computed: {
    path() {
      return d3
        .line()
        .x(d => {
          return this.x(d.date);
        })
        .y(d => {
          return this.y(d.Biden);
        })
        .curve(d3.curveCardinal);
    },
    line() {
      return this.path(this.totals);
    },
    x() {
      return d3
        .scaleTime()
        .domain(
          // d3.extent(this.totals, function(d) {
          //   return d.date;
          // })
          [
            d3.timeParse("%m/%d/%Y")("6/1/2020"),
            d3.timeParse("%m/%d/%Y")("11/3/2020")
          ]
        )
        .rangeRound([0, this.settings.width]);
    },
    y() {
      return d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.totals, function(d) {
            return d.Biden;
          })
        ])
        .range([this.settings.height, 0]);
    },
    xAxis() {
      return d3
        .axisBottom()
        .scale(this.x)
        .tickFormat(d3.timeFormat("%b"))
        .tickValues(
          this.totals
            .map(function(d, i) {
              if (i > 0) {
                return d.date;
              }
              return false;
            })
            .splice(1)
        )
        .ticks(4);
    },
    yAxis() {
      return d3
        .axisLeft()
        .scale(this.y)
        .ticks(5);
    }
  },
  created() {
    this.fetchCampaignData();
  },
  mounted() {
    d3.select(this.$refs.xAxis).call(this.xAxis);
    d3.select(this.$refs.yAxis).call(this.yAxis);
  }
};
</script>

<style>
.axis path,
.axis line {
  stroke: var(--primary-text);
}

path.line {
  fill: none;
  stroke: #ecbc3a;
  stroke-width: 3px;
}

svg .line-chart > path {
  stroke: #ecbc3a;
  stroke-width: 3;
  stroke-dasharray: 4813.713;
  stroke-dashoffset: 4813.713;
  animation-name: draw;
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}

svg .line-chart text {
  color: var(--primary-text);
}

@keyframes draw {
  85% {
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
