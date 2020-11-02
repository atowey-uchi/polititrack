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
    <!-- Create a div where the graph will take place -->
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
          <text :key="hoveredState + '-title'" text-anchor="middle" >
            {{ hoveredState }}
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
      width: 450,
      height: 450,
      margin: 40,
      detailsTransform: "",
      totals: [],
      colors: [],
      trumpOnly: false,
      bidenOnly: false,
      radius: 0,
      data: [],
      states: {},
      hoveredState: ""
    };
  },
  methods: {
    setupChart() {
      this.radius = Math.min(this.width, this.height) / 2 - this.margin;
      this.data = this.data1;
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
      this.width = pie.parentElement.getBoundingClientRect().width;
      this.height = this.width;
    },
    stateTransform(d) {
      let bounds = this.path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.25 / Math.max(dx / this.width, dy / this.height),
        translate = [-scale * x, -scale * y];
      return `translate(${translate})scale(${scale})`;
    },
    showDetails(event) {
      this.hoveredState = event.target.getAttribute("name");
    }
  },
  created() {
    this.fetchColors();
    this.setupChart();
    this.fetchTotalsData();
    this.fetchStates();
  },
  mounted() {
    this.updateSize();
    window.addEventListener("resize", () => {
      this.updateSize();
    });
  },
  computed: {
    transform() {
      return `translate(${this.width / 2}, ${this.height / 2})`;
    },
    colorRange() {
      return d3
        .scaleOrdinal()
        .domain(this.stateList)
        .range(this.colors);
    },
    stateList() {
      return this.totals
        .filter(total => total["State"] != "Total")
        .map(total => total["State"])
        .sort();
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
            fill: this.colorRange(d.data.State),
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
            fill: this.colorRange(stateData.properties.name)
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
.pie-chart {
}

#pie {
  max-width: 100%;
}

#pie .slices path {
  transition: d 1s ease;
}

#pie .slices path:hover {
  opacity: 0.75;
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
  padding: 8px 16px;
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
