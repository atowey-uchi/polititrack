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
          <table>
            <tr class="header">
              <th></th>
              <th>Biden</th>
              <th>Trump</th>
              <th class="total" id="total-column-label"><i>Total</i></th>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total top">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr>
              <td class="state">Minnesota</td>
              <td class="biden">11</td>
              <td class="trump">10</td>
              <td class="total">21</td>
            </tr>
            <tr class="totals-row">
              <td id="total-row-label"><i>Total</i></td>
              <td class="biden">13</td>
              <td class="trump">15</td>
              <td class="total">200</td>
            </tr>
          </table>

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
import Pie from "@/components/Pie.vue";

export default {
  name: "Insights",
  components: {
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

table {
  color: var(--primary-text);
  font-family: "Open Sans";
  font-weight: 500;
  padding: 20px;
  border-radius: 5px;
  border-spacing: 0;
  width: 80%;
  margin: 0 auto;
}

table .state {
  font-weight: 300;
}

td {
  padding-right: 18px;
  padding-left: 18px;
  font-weight: 700;
  font-size: 18px;
}

td.biden {
  text-shadow: 4px 4px 20px var(--blue);
}

td.trump {
  text-shadow: 2px 2px 20px var(--red);
}

td.total {
  font-size: 18px;
  background: var(--gray-75);
  text-align: center;
}

.totals-row .biden {
  background: var(--gray-75);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.totals-row .trump {
  background: var(--gray-75);
}

.totals-row .total {
  background: var(--gray);
  border-bottom-right-radius: 5px;
}

.total.top {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

tr.totals-row td {
  font-size: 18px;
  border: none;
  outline: none;
}

tr.totals-row td#total-row-label {
  font-size: 16px;
  font-weight: 500;
}

#total-column-label {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

td.state {
  font-size: 16px;
  text-align: left;
}

table tr.header th {
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}
</style>
