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
    <div class="panels">
      <div class="left-panel">
        <div class="where">
          <DataTable></DataTable>
          <Pie></Pie>
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top"></div>
        <div class="right-bottom"></div>
      </div>
    </div>
  </section>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import Pie from "@/components/Pie.vue";

export default {
  name: "Insights",
  components: {
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

section {
  width: 80vw;
}

.panels {
  display: flex;
}

.left-panel {
  position: relative;
  width: 39vw;
  background: var(--gray-50);
  border-radius: 5px;
  height: min-content;
}

.right-top {
  width: 39vw;
  height: 60vh;
  background: var(--gray-50);
  border-radius: 5px;
  margin-left: 2vw;
}

.right-bottom {
  width: 39vw;
  height: 30vh;
  background: var(--gray-50);
  border-radius: 5px;
  margin-left: 2vw;
  margin-top: 2vw;
}
</style>
