<template>
  <div></div>
  <!--  <v-layout column justify-center align-center>-->
  <!--    <v-card class="w-100">-->
  <!--      <v-card-text :class="breakPoint === 'mobile' && 'font-size-10px'">-->
  <!--        <div class="chart-container">-->
  <!--          <client-only>-->
  <!--            <apexchart-->
  <!--              width="100%"-->
  <!--              height="400px"-->
  <!--              :options="chartOptions"-->
  <!--              :series="series"-->
  <!--            ></apexchart>-->
  <!--          </client-only>-->
  <!--        </div>-->
  <!--      </v-card-text>-->
  <!--    </v-card>-->
  <!--  </v-layout>-->
</template>

<script>
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },
  data() {
    return {
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              // reset: false | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
            autoSelected: 'zoom',
          },
        },
        stroke: {
          width: 2,
        },

        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Date',
              },
            },
          ],
          yAxes: [
            {
              stacked: false,
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Price',
              },
              ticks: {
                beginAtZero: false,
                reverse: false,
              },
            },
          ],
        },

        // grid: {
        //   show: true,
        //   strokeDashArray: 0,
        //   xaxis: {
        //     lines: {
        //       show: true
        //     }
        //   }
        // },

        // dropShadow: {
        //   enabled: true,
        //   opacity: 0.3,
        //   blur: 5,
        //   left: -7,
        //   top: 22
        // },

        xaxis: {
          categories: [
            '05/02/2020 ',
            '06/02/2020 ',
            '07/02/2020 ',
            '08/02/2020 ',
            '09/02/2020 ',
            '10/02/2020 ',
            '11/02/2020 ',
          ],
        },

        colors: ['#17ead9', '#f02fc2', '#FCCF31'],
        noData: {
          text: 'Loading...',
        },
        markers: {
          size: 3,
          colors: ['#000000'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 4,
          },
        },
      },
      series: [
        {
          name: 'Zing',
          data: [30, 40, 45, 50, 51, 60, 200],
        },
        {
          name: 'VTC',
          data: [20, 30, 35, 40, 41, 50, 60],
        },
        {
          name: 'Garena',
          data: [10, 20, 25, 30, 31, 40, 50],
        },
      ],
    }
  },

  computed: {
    breakPoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'desktop'
        case 'md':
          return 'desktop'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
        default:
          return 'desktop'
      }
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
}
</style>
