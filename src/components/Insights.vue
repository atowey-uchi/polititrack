<template>
  <section class="insights fade-up-and-in" id="insights">
    <div class="gradient-swoosh">
      <img src="@/assets/images/brush1.svg" />
    </div>
    <div class="title">
      <h1>
        Insights
      </h1>
    </div>
    <div class="panels">
      <div class="left-panel pop-in">
        <h2>Number of Events Per State</h2>
        <div class="where">
          <div>
            <DataTable></DataTable>
          </div>
          <div>
            <Pie></Pie>
          </div>
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top pop-in">
          <h2>Number of Events Per Person, By State</h2>
          <!-- <div>
            <StackedChart></StackedChart>
          </div>  -->
          <h3><i>Coming soon.</i></h3>
        </div>
        <div class="right-bottom pop-in">
          <h2>Number of Events Per Person</h2>
          <div>
            <BubbleChart></BubbleChart>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom pop-in">
      <h2>Number of Events Per Day, By Candidate</h2>
      <div class="histogram">
        <Histogram :width="900"></Histogram>
      </div>
    </div>
  </section>
</template>

<script>
import BubbleChart from "@/components/BubbleChart.vue";
import DataTable from "@/components/DataTable.vue";
import Histogram from "@/components/Histogram.vue";
// import StackedChart from "@/components/StackedChart.vue";
import Pie from "@/components/Pie.vue";

export default {
  name: "Insights",
  components: {
    BubbleChart,
    DataTable,
    Histogram,
    Pie
    // StackedChart
  }
};
</script>

<style scoped lang="scss">
.insights {
  min-height: 100vh;
  position: relative;
  padding-top: 40px;
  padding-bottom: 120px;
  width: 1100px;
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

section {
  width: 80vw;
}

.panels {
  display: flex;
}

.left-panel {
  position: relative;
  width: 535px;
  background: var(--panel-back);
  border-radius: 5px;
  height: 1100px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08),
    0 10px 20px 0 rgba(0, 0, 0, 0.08);
}

.right-top {
  width: 535px;
  height: 535px;
  background: var(--panel-back);
  border-radius: 5px;
  margin-left: 30px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08),
    0 10px 20px 0 rgba(0, 0, 0, 0.08);
  animation-delay: 0.3s;
}

.right-bottom {
  width: 535px;
  height: 535px;
  background: var(--panel-back);
  border-radius: 5px;
  margin-left: 30px;
  margin-top: 30px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08),
    0 10px 20px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.right-bottom > div {
  flex-grow: 1;
}

.bottom {
  width: 1100px;
  height: 500px;
  background: var(--panel-back);
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08),
    0 10px 20px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.bottom > div {
  flex-grow: 1;
  margin: 0 auto;
}

h2 {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  padding-top: 20px;
  padding-bottom: 10px;
}

h3 {
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
}
</style>
