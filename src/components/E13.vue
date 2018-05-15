<template>
  <div>
    <e-chart height="calc(100vh - 130px)" name="chart" :options="options"/>
  </div>
</template>

<script>
  import EChart from './EChart'

  export default {
    name: 'e13',
    components: {
      EChart
    },
    data() {
      return {
        data: [7, 12, 2, 11, 1, 8, 17, 4, 16, 5, 15, 3, 9, 18, 6, 10, 13, 14],
        width: '100px',
        options: {},
        interval: null
      }
    },
    mounted() {
      let dataBuffer = []
      this.sort(this.data, (data, j) => {
        dataBuffer.push(data)
      })
      let a = this.data
      this.interval = setInterval(() => {
        a = dataBuffer.shift()
        if (a === undefined) {
          clearInterval(this.interval)
        } else {
          this.options = this.getOptions(a)
        }
      }, 200)
    },
    beforeRouteLeave(from, to, next) {
      clearInterval(this.interval)
      next()
    },
    methods: {
      sort(data, cb) {
        for (let i = 1; i <= 10; i++) {
          for (let j = 0; j < data.length - i + 1; j++) {
            if (data[j] > data[j + 1]) {
              [data[j + 1], data[j]] = [data[j], data[j + 1]]
              cb(Object.assign([], data), j)
            }
          }
        }
      },
      getOptions(data) {
        return {
          title: {
            left: 'center',
            text: '冒泡排序'
          },
          xAxis: {
            type: 'category',
            data
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data,
            type: 'bar'
          }]
        }
      }
    }
  }
</script>

<style scoped>

</style>
