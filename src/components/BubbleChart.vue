<template>
  <div class="bubble-chart">
    <svg :width="width" :height="height">
      <transition-group
        tag="g"
        class="circles"
        name="circles"
        v-for="circle in circles"
        :key="circle.id"
      >
        <circle
          :key="circle.id + '--circle'"
          :cx="circle.x"
          :cy="circle.y"
          :r="circle.r"
          :style="circle.style"
          :data-cx="circle.x"
        >
          <title>{{ circle.person }}: {{ circle.events }} events</title>
        </circle>
        <text
          text-anchor="middle"
          alignment-baseline="middle"
          :key="circle.id + '--name'"
          :x="circle.x"
          :y="circle.y"
          :font-size="circle.r > 40 ? '16px' : '10px'"
          font-family="Open Sans"
        >
          {{ circle.r > 30 ? circle.person : "" }}
        </text>
        <text
          text-anchor="middle"
          alignment-baseline="middle"
          :key="circle.id + '--events'"
          :x="circle.x"
          :y="circle.y"
          :dy="circle.r > 30 ? 18 : 0"
          font-size="16px"
          font-family="Open Sans"
        >
          {{ circle.r > 5 ? circle.events : "" }}
        </text>
      </transition-group>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "BubbleChart",
  data() {
    return {
      width: 350,
      height: 350,
      campaignStops: {},
      scaleFactor: 2,
      totals: [],
      circles: [],
      dems: new Set(),
      reps: new Set(),
      simulation: d3
        .forceSimulation()
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter())
        .on("tick", this.tick)
    };
  },
  watch: {
    campaignStops() {
      const people = this.computeTotals();
      this.simulation.nodes(this.circles);
      this.totals = people;
    },
    totals() {
      this.simulation
        .nodes(this.circles)
        .alpha(0.9)
        .restart();
    },
    circles() {
      console.warn("Circles have changed!");
      this.simulation.nodes(this.circles).restart();
    }
  },
  methods: {
    tick() {
      for (let total of this.totals) {
        total.cx = total.x;
        total.cy = total.y;
      }
    },
    computeTotals() {
      let totals = {};
      for (let stop of this.campaignStops) {
        let people = stop.who.split(",");
        for (let person of people) {
          person = person.trim();
          if (stop.candidate == "Trump") {
            this.reps.add(person);
          } else if (stop.candidate == "Biden") {
            this.dems.add(person);
          }
          if (person in totals) {
            totals[person] += 1;
          } else {
            totals[person] = 1;
          }
        }
      }
      // flatten sums to array
      let totalArray = [];
      for (let person of Object.keys(totals)) {
        totalArray.push({
          person: person,
          events: totals[person]
        });
      }
      this.initCircles(totalArray);
      return totalArray;
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
          that.computeTotals();
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns", true);
      xhr.send();
    },
    updateSize() {
      if (this.$el) {
        const { width } = this.$el.getBoundingClientRect();
        this.width = width;
        this.height = width;
      }
    },
    initCircles(totals) {
      this.circles = totals.map((person, i) => {
        return {
          id: i,
          person: person.person,
          events: person.events,
          style: {
            fill: this.reps.has(person.person)
              ? getComputedStyle(document.body).getPropertyValue("--red")
              : getComputedStyle(document.body).getPropertyValue("--blue")
          },
          r: person.events * this.scaleFactor,
          cx: 0,
          cy: 0,
          x: 0,
          y: 0,
          strokeWidth: 2,
          stroke: getComputedStyle(document.body).getPropertyValue(
            "--primary-text"
          )
        };
      });
      console.log(this.circles);
    }
  },
  computed: {
    center() {
      return [this.width * 0.5, this.height * 0.5];
    },
    transform() {
      return `translate(${this.width / 2}, ${this.height / 2})`;
    }
  },
  mounted() {
    this.updateSize();

    // this.simulation.force("x").x(() => this.center[0]);
    // this.simulation.force("y").y(() => this.center[1]);
    this.simulation
      .force("center")
      .x(this.width * 0.5)
      .y(this.height * 0.5);
    this.simulation
      .force("collide")
      .strength(0.4)
      .radius(d => d.r);
    this.fetchCampaignData();
    window.addEventListener("resize", () => {
      this.updateSize();
    });
  }
};
</script>

<style>
circle:hover {
  opacity: 0.75;
  transition: opacity 0.5s ease;
}

text {
  user-select: none;
}
</style>
