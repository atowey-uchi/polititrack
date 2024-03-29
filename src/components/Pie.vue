<template>
  <div class="pie-chart">
    <div class="buttons">
      <button
        @click="
          trumpOnly = false;
          bidenOnly = false;
        "
        :class="{
          active: !trumpOnly && !bidenOnly
        }"
        class="all-btn"
      >
        All
      </button>
      <button
        @click="
          trumpOnly = false;
          bidenOnly = true;
        "
        :class="{
          active: bidenOnly
        }"
        class="biden-only-btn"
      >
        Biden
      </button>
      <button
        @click="
          bidenOnly = false;
          trumpOnly = true;
        "
        :class="{
          active: trumpOnly
        }"
        class="trump-only-btn"
      >
        Trump
      </button>
    </div>
    <div id="pie">
      <svg :width="width" :height="height">
        <transition-group
          tag="g"
          :transform="transform"
          class="slices"
          name="slices"
        >
          <path
            v-for="slice in slices"
            :id="slice.id"
            :key="slice.id"
            :fill="slice.fill"
            :d="slice.d"
            :stroke="slice.stroke"
            :style="slice.style"
            :title="slice.title"
            :aria-label="slice.title"
            :name="slice.name"
            @mouseover="showDetails($event)"
          ></path>
        </transition-group>
        <transition-group
          tag="g"
          name="details"
          class="details"
          v-if="hoveredState"
          :transform="transform"
        >
          <path
            v-if="state"
            :id="state.id"
            :d="state.d"
            :style="state.style"
            :key="state.id"
            :transform="state.transform"
          ></path>
          <text
            :key="hoveredState + '-title'"
            text-anchor="middle"
            font-family="Open Sans"
            font-size="24px"
            :fill="mainColor"
          >
            {{ hoveredState }}
          </text>
          <text
            key="visits"
            text-anchor="middle"
            dy="20"
            :fill="mainColor"
            font-size="14px"
            font-family="Open Sans"
          >
            Visited {{ numberOfEvents }}
            {{ numberOfEvents == 1 ? "time" : "times" }}
          </text>
          <text
            key="visits-percentage"
            text-anchor="middle"
            dy="40"
            :fill="mainColor"
            font-size="14px"
            font-family="Open Sans"
          >
            {{ eventsPercentage }}% of all events
          </text>
        </transition-group>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Pie",
  data() {
    return {
      width: 350,
      height: 350,
      margin: 30,
      detailsTransform: "",
      totals: [],
      colors: [],
      trumpOnly: false,
      bidenOnly: false,
      data: [],
      states: {},
      hoveredState: ""
    };
  },
  methods: {
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
    fetchTotalsData() {
      let that = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          that.totals = JSON.parse(this.responseText);
          let totals = [];
          for (let total in that.totals) {
            if (total != "Total") {
              that.totals[total]["State"] = total;
              totals.push(that.totals[total]);
            }
          }
          that.totals = totals;
          // add ids
          for (let i = 0; i < that.totals.length; i++) {
            that.totals[i].id = i;
          }
          that.updateSize();
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns/totals", true);
      xhr.send();
    },
    fetchStates() {
      d3.json("/us-states.json").then(us => {
        let states = {};
        for (let state of us.features) {
          states[state.properties.name] = state;
        }
        this.states = states;
      });
    },
    updateSize() {
      let pie = document.querySelector(".pie-chart");
      if (!pie) return;
      const { width, height } = pie.parentElement.getBoundingClientRect();
      this.width = Math.min(width, height) * 0.8;
      this.height = this.width;
    },
    stateTransform(d) {
      let bounds = this.path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.3 / Math.max(dx / this.width, dy / this.height),
        translate = [-scale * x, -scale * y];
      return `translate(${translate})scale(${scale})`;
    },
    showDetails(event) {
      this.hoveredState = event.target.getAttribute("name");
    }
  },
  created() {
    this.fetchColors();
    this.fetchTotalsData();
    this.fetchStates();
  },
  mounted() {
    this.updateSize();
    window.addEventListener("resize", () => {
      this.updateSize();
    });
    this.$nextTick(() => {
      this.updateSize();
    });
  },
  computed: {
    activeKey() {
      if (this.trumpOnly) {
        return "Trump";
      } else if (this.bidenOnly) {
        return "Biden";
      } else {
        return "Total";
      }
    },
    eventsPercentage() {
      return (
        (this.totals.filter(state => state["State"] == this.hoveredState)[0][
          this.activeKey
        ] /
          this.totals
            .map(d => d[this.activeKey])
            .reduce((total, current) => {
              return total + current;
            }, 0)) *
        100
      ).toFixed(1);
    },
    numberOfEvents() {
      return this.totals.filter(
        state => state["State"] == this.hoveredState
      )[0][this.activeKey];
    },
    highestTotal() {
      return this.stateTotals[this.stateTotals.length - 1];
    },
    mainColor() {
      return getComputedStyle(document.body).getPropertyValue("--primary-text");
    },
    radius() {
      return Math.min(this.width, this.height) / 2 - this.margin;
    },
    transform() {
      return `translate(${this.width / 2}, ${this.height / 2})`;
    },
    colorRange() {
      if (this.trumpOnly) {
        return d3
          .scaleSequential(d3.interpolate("#f9c3c1", "#eb2019")) // reds
          .domain([1, this.highestTotal]);
      } else if (this.bidenOnly) {
        return d3
          .scaleSequential(d3.interpolate("#a8b7f7", "#0d2691")) // blues
          .domain([1, this.highestTotal]);
      } else {
        return d3
          .scaleSequential(d3.interpolate("#ebcbf5", "#360c43")) // purples
          .domain([1, this.highestTotal]);
      }
    },
    stateList() {
      return this.totals
        .filter(total => total["State"] != "Total")
        .map(total => total["State"])
        .sort();
    },
    stateTotals() {
      return this.totals
        .filter(total => total["State"] != "Total")
        .map(total => total[this.activeKey])
        .sort((a, b) => a - b);
    },
    slices() {
      if (this.totals && this.colors) {
        let data = d3
          .pie()
          .value(d => {
            if (this.trumpOnly) {
              return d.Trump;
            } else if (this.bidenOnly) {
              return d.Biden;
            } else {
              return d.Total;
            }
          })
          .sort((a, b) => d3.ascending(a.Total, b.Total))(this.totals);
        return data.map((d, i) => {
          return {
            id: i,
            d: d3
              .arc()
              .innerRadius(this.radius * 0.7)
              .outerRadius(this.radius)
              .startAngle(d.startAngle)
              .endAngle(d.endAngle)(),
            fill: this.colorRange(d.data.Total),
            stroke: "white",
            style: {
              strokeWidth: "2px"
            },
            title: d.data.State,
            name: d.data.State
          };
        });
      }
      return [];
    },
    projection() {
      return d3.geoAlbersUsa().scale(this.width);
    },
    path() {
      return d3.geoPath().projection(this.projection);
    },
    state() {
      if (this.states && this.hoveredState) {
        let stateData = this.states[this.hoveredState];
        return {
          id: stateData?.properties.name,
          d: this.path(stateData),
          style: {
            fill: this.colorRange(this.numberOfEvents)
          },
          transform: this.stateTransform(stateData)
        };
      }
      return {};
    },
    textPosition() {
      return {};
    }
  }
};
</script>

<style>
#pie {
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

#pie .slices path {
  transition: d 1s ease;
}

#pie .slices path:hover {
  opacity: 0.75;
}

#pie text {
  text-shadow: 4px 4px 8px black;
}

.buttons {
  width: max-content;
  text-align: center;
  margin: 0 auto;
}

button {
  background: var(--gray-75);
  color: var(--primary-text);
  border: none;
  padding: 8px 8px;
  text-align: center;
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  margin: 4px 4px;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}

.all-btn.active {
  background: var(--middle-purple);
}

.trump-only-btn.active {
  background: var(--red);
}

.biden-only-btn.active {
  background: var(--blue);
}
</style>
// colors: #0D2791 #f58d32 #eb2019 #ffd247 #8fe367 #1c9323 #249dce #6D1886
#d054a4
