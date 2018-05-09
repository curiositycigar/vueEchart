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
      let ss = new this.Sort(this.data, (data) => {
        this.options = this.getOptions(data)
      })
      this.interval = setInterval(() => {
        if (!ss.next()) {
          clearInterval(this.interval)
        }
      }, 300)
    },
    beforeRouteLeave(from, to, next) {
      clearInterval(this.interval)
      next()
    },
    methods: {
      Sort(data, cb) {
        let i = 1
        let l = data.length
        let j = l - 1
        this.next = function () {
          console.log('next')
          if (j >= l - i) {
            i++
            j = 0
          } else if (j < l - i) {
            j++
          }
          while (j < l - i && data[j + 1] >= data[j]) {
            j++
          }
          if (data[j + 1] < data[j]) {
            [data[j + 1], data[j]] = [data[j], data[j + 1]]
            cb(data)
          }
          return i < l
        }
      },
      sort(data, cb) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data.length - i; j++) {
            cb(data)
            if (data[j] > data[j + 1]) {
              [data[j + 1], data[j]] = [data[j], data[j + 1]]
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
