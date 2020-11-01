<template>
  <table class="data-table">
    <tr class="header">
      <th></th>
      <th>Biden</th>
      <th>Trump</th>
      <th class="total" id="total-column-label"><i>Total</i></th>
    </tr>
    <tr v-for="state in totals" :key="state['State']" class="state-row">
      <td class="state">{{ state["State"] }}</td>
      <td class="biden">{{ state["Biden"] }}</td>
      <td class="trump">{{ state["Trump"] }}</td>
      <td class="total" :class="{ top: state.id === 0 }">
        {{ state["Total"] }}
      </td>
    </tr>
    <tr class="totals-row">
      <td id="total-row-label"><i>Total</i></td>
      <td class="biden">{{ computeTotalForKey("Biden") }}</td>
      <td class="trump">{{ computeTotalForKey("Trump") }}</td>
      <td class="total">{{ computeTotalForKey("Total") }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DataTable",
  data() {
    return {
      totals: []
    };
  },
  created() {
    this.fetchTotalsData();
  },
  methods: {
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
          totals.sort((a, b) => {
            return b["Total"] - a["Total"];
          });
          that.totals = totals;
          // add ids
          for (let i = 0; i < that.totals.length; i++) {
            that.totals[i].id = i;
          }
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns/totals", true);
      xhr.send();
    },
    computeTotalForKey(key) {
      return this.totals
        .map(x => x[key])
        .reduce((total, current) => total + current, 0);
    }
  }
};
</script>

<style scoped>
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

tr.state-row:hover {
  background: rgba(0, 0, 0, 0.2);
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
