<template>
  <div class="pie-chart">
    <!-- Add 2 buttons -->
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
          ></path>
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
      transform: "",
      colorRange: [],
      totals: [],
      colors: [],
      trumpOnly: false,
      bidenOnly: false,
      radius: 0,
      data: []
    };
  },
  methods: {
    setupChart() {
      this.colorRange = d3
        .scaleOrdinal()
        .domain(["a", "b", "c", "d", "e", "f"])
        .range(this.colors);

      this.transform = `translate(${this.width / 2}, ${this.height / 2})`;
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
          console.log(that.totals);
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns/totals", true);
      xhr.send();
    }
  },
  created() {
    this.fetchColors();
    this.setupChart();
    this.fetchTotalsData();
  },
  computed: {
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
              strokeWidth: "2px",
              opacity: 1
            },
            title: d.data.State
          };
        });
      }
      return [];
    }
  }
};
</script>

<style>
#pie {
  max-width: 100%;
}

#pie path {
  transition: all 1s ease;
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
