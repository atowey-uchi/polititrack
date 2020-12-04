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
          backgroundColor: document.body.classList.contains("dark-mode") ? "rgba(105, 105, 105, 0.75)" : "rgba(0, 0, 0, 0)"
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                  display: true,
                  labelString: "Daily Events",
                  fontColor: document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
                fontFamily: "Open Sans"
              },
              ticks: {
                beginAtZero: true,
                fontColor: document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
                fontFamily: "Open Sans"
              },
              gridLines: {
                display: true,
                color: document.body.classList.contains("dark-mode") ? "white" : "rgba(105, 105, 105, 0.3)",
                beginAtZero: true,
                drawBorder: true,
                zeroLineColor: document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
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
                fontColor: document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
                fontFamily: "Open Sans"
              },
              gridLines: {
                display: false,
                drawBorder: true,
                zeroLineColor:  document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
              }
            }
          ]
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: document.body.classList.contains("dark-mode") ? "white" : "#1a1a1a",
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
  }
};
</script>

<style scoped></style>
