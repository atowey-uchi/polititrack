<template>
  <div class="pie-chart">
    <!-- Add 2 buttons -->
    <button @click="data = data1">Data 1</button>
    <button @click="data = data2">Data 2</button>

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
      data1: [
        {
          name: "a",
          value: 9
        },
        {
          name: "b",
          value: 20
        },
        {
          name: "c",
          value: 30
        },
        {
          name: "d",
          value: 8
        },
        {
          name: "e",
          value: 12
        }
      ],
      data2: [
        {
          name: "a",
          value: 6
        },
        {
          name: "b",
          value: 16
        },
        {
          name: "c",
          value: 20
        },
        {
          name: "d",
          value: 14
        },
        {
          name: "e",
          value: 19
        },
        {
          name: "f",
          value: 12
        }
      ],
      colors: "",
      radius: 0,
      data: []
    };
  },
  methods: {
    setupChart() {
      this.colors = d3
        .scaleOrdinal()
        .domain(["a", "b", "c", "d", "e", "f"])
        .range(d3.schemeDark2);

      this.transform = `translate(${this.width / 2}, ${this.height / 2})`;
      this.radius = Math.min(this.width, this.height) / 2 - this.margin;
      this.data = this.data1;
    }
  },
  created() {
    this.setupChart();
  },
  computed: {
    slices() {
      if (this.data && this.colors) {
        console.log(this.data);
        let data = d3.pie().value(d => d.value)(this.data);
        console.info(data);
        return data.map((d, i) => {
          return {
            id: i,
            d: d3
              .arc()
              .innerRadius(this.radius * 0.7)
              .outerRadius(this.radius)
              .startAngle(d.startAngle)
              .endAngle(d.endAngle)(),
            fill: this.colors(d.value),
            stroke: "white",
            style: {
              strokeWidth: "2px",
              opacity: 1
            }
          };
        });
      }
      return [];
    }
  }
};
</script>

<style></style>

// colors: #0D2791 #f58d32 #eb2019 #ffd247 #8fe367 #1c9323 #249dce #6D1886
#d054a4
