<template>
  <div>
    <e-chart height="calc(100vh - 130px)" name="chart" :options="options"/>
  </div>
</template>

<script>
  import EChart from './EChart'

  export default {
    name: 'e12',
    components: {
      EChart
    },
    data() {
      return {
        width: '100px',
        options: {
          title: {
            text: '柱状图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '广告',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '广告',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '广告',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data: [
                  [{type: 'min'}, {type: 'max'}]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            }
          ]
        },
        interval: null
      }
    },
    beforeRouteLeave(from, to, next) {
      clearInterval(this.interval)
      next()
    },
    mounted() {
      this.interval = setInterval(() => {
        this.options = {
          title: {
            text: '柱状图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度']
          },
          grid: {
            top: '50px',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              data: [r(300), r(300), r(300), r(300), r(300), r(300), r(300)]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '广告',
              data: [r(180), r(180), r(180), r(180), r(180), r(180), r(180)]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '广告',
              data: [r(300), r(300), r(300), r(300), r(300), r(300), r(300)]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '广告',
              data: [r(400), r(400), r(400), r(400), r(400), r(400), r(400)]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [r(1500), r(1500), r(1500), r(1500), r(1500), r(1500), r(1500)],
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data: [
                  [{type: 'min'}, {type: 'max'}]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [r(1100), r(1100), r(1100), r(1100), r(1100), r(1100), r(1100)]
            }
          ]
        }
      }, 1000)

      function r(n = 80) {
        return 20 + Math.floor(Math.random() * n)
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
