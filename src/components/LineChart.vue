<template>
  <div class="line-chart">
    <svg width="100%" height="100%">
      <g class="line-chart-content" :transform="transform">
        <g :transform="yTransform" class="axis">
          <g ref="yAxis"></g>
        </g>
        <g :transform="xTransform" class="axis">
          <g ref="xAxis"></g>
        </g>
        <g ref="chart">
          <path
            :d="line.d"
            v-for="line in lines"
            :key="line.index"
            :class="line.class + ' line'"
          ></path>
        </g>
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
        height: 400,
        margin: {
          top: 5,
          left: 40,
          bottom: 40,
          right: 0
        }
      },
      campaignStops: [],
      totals: []
    };
  },
  methods: {
    updateSize() {
      if (this.$el) {
        this.settings.width = this.$el.clientWidth * 0.8;
        this.settings.height = this.$el.clientHeight * 0.8;
      }
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
          that.totals = that.computeTotalsByData();

          d3.select(that.$refs.xAxis).call(that.xAxis);
          d3.select(that.$refs.yAxis).call(that.yAxis);
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
              date: d3.timeParse("%m/%d/%Y")(stop.date),
              day: stop.date
            };
            totals[stop.date][stop.candidate] += 1;
          }
        }
      }
      return Object.values(totals);
    }
  },
  computed: {
    transform() {
      return `translate(${this.settings.width * 0.1}, ${this.settings.height *
        0.1 +
        5})`;
    },
    yTransform() {
      return `translate(${this.settings.margin.left}, 0)`;
    },
    xTransform() {
      return `translate(${this.settings.margin.left}, ${this.settings.height +
        this.settings.margin.top})`;
    },
    lines() {
      const selectors = [
        { selector: d => d.Trump, candidate: "trump" },
        { selector: d => d.Biden, candidate: "biden" }
      ];
      if (this.totals.length) {
        return selectors.map((selector, index) => {
          return {
            id: index,
            d: d3
              .line()
              .x(d => {
                return this.x(d.date);
              })
              .y(d => {
                return this.y(selector.selector(d));
              })
              .curve(d3.curveCardinal)(this.totals),
            class: selector.candidate
          };
        });
      }
      return "";
    },
    line() {
      if (this.path) {
        return this.path(this.totals);
      }
      return "";
    },
    x() {
      return d3
        .scaleTime()
        .domain([
          d3.timeParse("%m/%d/%Y")("6/1/2020"),
          d3.timeParse("%m/%d/%Y")("11/3/2020")
        ])
        .rangeRound([0, this.settings.width]);
    },
    y() {
      return d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.totals, function(d) {
            return Math.max(d.Biden, d.Trump);
          })
        ])
        .range([this.settings.height, 0]);
    },
    xAxis() {
      return d3
        .axisBottom()
        .scale(this.x)
        .tickFormat(d3.timeFormat("%b"));
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
    this.updateSize();
  }
};
</script>

<style>
.line-chart {
  width: 100%;
  height: 100%;
}

.axis path,
.axis line {
  stroke: var(--primary-text);
}

path.line {
  fill: none;
  stroke-width: 3px;
  stroke-opacity: 0.9;
}

path.line.trump {
  stroke: var(--red);
}

path.line.biden {
  stroke: var(--blue);
}

.in-view svg .line-chart > path {
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
