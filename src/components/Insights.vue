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
          <div class="table">
            <h2>Campaign Events by State</h2>
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
          </div>
          <Pie></Pie>
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top">
          <p>Line Graph of Stops over Time</p>
        </div>
        <div class="right-bottom">
          <p>Bubble chart for Number of stops per person</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>Sunburst charts for state/person</p>
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
  height: 1000px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.right-top {
  width: 535px;
  height: 485px;
  background: var(--panel-back);
  border-radius: 5px;
  margin-left: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.right-bottom {
  width: 535px;
  height: 485px;
  background: var(--panel-back);
  border-radius: 5px;
  margin-left: 30px;
  margin-top: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bottom {
  width: 1100px;
  height: 500px;
  background: var(--panel-back);
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

h2 {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
}

table {
  color: var(--primary-text);
  font-family: "Open Sans";
  font-weight: 500;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 60px;
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
