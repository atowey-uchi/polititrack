<template>
  <section class="insights" id="insights">
    <div class="gradient-swoosh">
      <img src="@/assets/images/brush1.svg" />
    </div>
    <div class="title">
      <h1>
        Insights
      </h1>
    </div>
    <div class="panels">
      <div class="left-panel">
        <div class="where">
          <DataTable></DataTable>
          <Pie></Pie>
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top">
          <h2>Events Over Time</h2>
        </div>
        <div class="right-bottom">
          <h2>Events By Person</h2>
          <BubbleChart></BubbleChart>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>Sunburst charts for state/person</p>
    </div>
  </section>
</template>

<script>
import BubbleChart from "@/components/BubbleChart.vue";
import DataTable from "@/components/DataTable.vue";
import Pie from "@/components/Pie.vue";

export default {
  name: "Insights",
  components: {
    BubbleChart,
    DataTable,
    Pie
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
}

.bottom {
  width: 1100px;
  height: 500px;
  background: var(--panel-back);
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08),
    0 10px 20px 0 rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
}
</style>
