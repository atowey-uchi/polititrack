<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["width"],
  methods: {
    daysBetween(start, end) {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((end - start) / ONE_DAY));
    },
    prettyDateString(date) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
          that.totals = that.computeTotalsByData();
          that.datacollection.labels = that.totals.map(total => total.day);
          that.datacollection.datasets[0].data = that.totals.map(total => {
            return {
              x: total.day,
              y: total.Biden
            };
          });
          that.datacollection.datasets[1].data = that.totals.map(total => {
            return {
              x: total.day,
              y: total.Trump
            };
          });
          that.addPlugin({
            id: "chart-area-color",
            beforeDraw: function(chart) {
              if (
                chart.config.options.chartArea &&
                chart.config.options.chartArea.backgroundColor
              ) {
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;

                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(
                  chartArea.left,
                  chartArea.top,
                  chartArea.right - chartArea.left,
                  chartArea.bottom - chartArea.top
                );
                ctx.restore();
              }
            }
          });
          that.renderChart(that.datacollection, that.options);
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns", true);
      xhr.send();
    },
    computeTotalsByData() {
      let totals = {};
      // populate every date
      for (
        let i = 0;
        i <= this.daysBetween(new Date(2020, 7, 1), new Date(2020, 10, 3));
        i++
      ) {
        let date = new Date(2020, 7, 1, 0, 0, 0, 0);
        date.setDate(date.getDate() + i);
        totals[this.prettyDateString(date)] = {
          Trump: 0,
          Biden: 0,
          day: this.prettyDateString(date),
          date: date
        };
      }
      for (let stop of this.campaignStops) {
        if (stop && stop.date in totals) {
          totals[stop.date][stop.candidate] += 1;
        }
      }
      return Object.values(totals);
    },
    computeTotals(stops) {
      let totals = {};
      let states = new Set();
      for (let stop of stops) {
        states.add(stop.state);
        let people = stop.who.split(",");
        for (let person of people) {
          person = person.trim();
          if (person in totals) {
            if (stop.state in totals[person]["states"]) {
              totals[person]["states"][stop.state] += 1;
            } else {
              totals[person]["states"][stop.state] = 1;
            }
          } else {
            totals[person] = {
              states: {}
            };
            totals[person]["states"][stop.state] = 1;
          }
        }
      }

      // fill out states for each person
      for (let person in totals) {
        for (let state in states) {
          if (!(state in totals[person][states])) {
            totals[person][states][state] = 0;
          }
        }
      }
      console.log("totals ", totals);
      // flatten sums to array
      // let totalArray = [];
      // for (let person of Object.keys(totals)) {
      //   totalArray.push({
      //     person: person,
      //     events: totals[person]
      //   });
      // }
      let labels = new Set();
      let datasets = {};
      for (let person in totals) {
        labels.add(person);
        for (let state in totals[person]["states"]) {
          const stops = totals[person]["states"][state]
            ? totals[person]["states"][state]
            : 0;
          if (state in datasets) {
            datasets[state]["data"].push(stops);
          } else {
            datasets[state] = {
              label: state,
              data: [stops]
            };
          }
        }
      }
      console.log(totals);
      console.log(labels);
      console.log(datasets);
      // return totalArray;
    },
    fetchData() {
      let that = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let campaignStops = JSON.parse(this.responseText);
          // add ids
          for (let i = 0; i < campaignStops.length; i++) {
            campaignStops[i].id = i;
          }
          that.computeTotals(campaignStops);
        }
      };
      xhr.open("GET", "https://api.polititrack.us/campaigns", true);
      xhr.send();
    }
  },
  data: function() {
    return {
      timeFormat: "M/D/YYYY",
      datacollection: {
        labels: [],

        datasets: [
          {
            label: "Biden Campaign",
            backgroundColor: "#0D2791",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            data: [],
            barThickness: 4
          },
          {
            label: "Trump Campaign",
            backgroundColor: "#EB2019",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            data: [],
            barThickness: 4
          }
        ]
      },
      options: {
        chartArea: {
          backgroundColor: "rgba(105, 105, 105, 0.75)"
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Daily Events",
                fontColor: "white",
                fontFamily: "Open Sans"
              },
              ticks: {
                beginAtZero: true,
                fontColor: "white",
                fontFamily: "Open Sans"
              },
              gridLines: {
                display: true,
                color: "white",
                beginAtZero: true,
                drawBorder: true,
                zeroLineColor: "white"
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                format: this.timeFormat,
                unit: "week",
                displayFormats: {
                  week: "MMM D"
                }
              },
              ticks: {
                beginAtZero: true,
                fontColor: "white",
                fontFamily: "Open Sans"
              },
              gridLines: {
                display: false,
                drawBorder: true,
                zeroLineColor: "white"
              }
            }
          ]
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "white",
            fontFamily: "Open Sans"
          }
        },
        tooltips: {
          fontFamily: "Open Sans",
          backgroundColor: "#1a1a1a",
          enabled: true,
          mode: "single",
          callbacks: {
            label: function(tooltipItems) {
              return tooltipItems.yLabel + " events";
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      }
    };
  },
  mounted() {
    this.fetchCampaignData();
    this.fetchData();
  }
};
</script>

<style scoped></style>
