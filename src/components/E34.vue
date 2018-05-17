<template>
  <div style="display: flex">
    <div
      style="height: calc(100vh - 130px); text-align: center; border-radius: 10px; background: #45fffa; font-size: 16px;">
      <div
        :style="`width: 200px; height: calc((100vh - 130px) / ${swims.length}); line-height: calc((100vh - 130px) / ${swims.length})`"
        v-for="item in swims"
        :key="item.name">
        {{item.name}}
      </div>
    </div>
    <div class="businessEffectSvgWrapper"
         style="flex: 1; height: calc(100vh - 130px);overflow: hidden;">
      <svg id="bs" class="businessEffectSvg"></svg>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'e33',
    data() {
      return {
        options: {},
        swims: [
          {name: '超能勇士', type: 1},
          {name: '龙珠', type: 2},
          {name: '猫和老鼠', type: 3},
          {name: '水浒传', type: 4},
          {name: '西游记', type: 5},
          {name: '其他', type: 6}
        ],
        data: {
          boxes: [
            {id: '1', name: '黑猩猩队长', type: 1},
            {id: '2', name: '孙悟空', type: 2},
            {id: '3', name: '龟仙人', type: 2},
            {id: '31', name: '龟仙人1', type: 2},
            {id: '32', name: '龟仙人1', type: 2},
            {id: '33', name: '龟仙人1', type: 2},
            {id: '34', name: '龟仙人1', type: 2},
            {id: '35', name: '龟仙人1', type: 2},
            {id: '4', name: '比克大魔王', type: 2},
            {id: '5', name: '汤姆', type: 3},
            {id: '8', name: '杰瑞', type: 3},
            {id: '41', name: '林冲', type: 4},
            {id: '6', name: '猪八戒', type: 5},
            {id: '7', name: '唐僧', type: 5},
            {id: '9', name: '沙悟净', type: 5},
            {id: '10', name: '其他', type: 6}
          ],
          rel: [
            {from: '1', to: '2', text: '喜欢'},
            {from: '1', to: '3', text: '不喜欢'},
            {from: '1', to: '4', text: '属于'},
            {from: '2', to: '5', text: '不属于'},
            {from: '3', to: '5', text: '创造'},
            {from: '5', to: '6', text: '吃'},
            {from: '5', to: '7', text: '属于'},
            {from: '8', to: '7', text: '属于'},
            {from: '41', to: '9', text: '创造'},
            {from: '7', to: '9', text: '其他'},
            {from: '9', to: '10', text: '其他'}
          ]
        }
      }
    },
    mounted() {
      // 测试
      let data = this.data
      let field = d3.select('#bs')
      field.append('g')
      let options = this.makeData(data, document.querySelector('#bs').parentNode.offsetWidth, document.querySelector('#bs').parentNode.offsetHeight - 20)
      this.draw(field, options)
      window.onresize = () => {
        let options = this.makeData(data, document.querySelector('#bs').parentNode.offsetWidth, document.querySelector('#bs').parentNode.offsetHeight - 20)
        this.draw(field, options)
      }
      window.d3 = d3
    },
    methods: {
      makeData(data, w = 600, height, margin = 40) {
        let boxes = this.swims
        let nodes = {}
        data.boxes.map(item => {
          nodes[item.id] = item
        })
        let indexMap = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6
        }
        let swimHeight = height / boxes.length
        // 计算资产位置...
        let lengths = {}
        let maxAssetsLength = 0
        data.boxes.map(item => {
          // 计算每行最大资产数
          if (lengths[item.type]) {
            lengths[item.type]++
          } else {
            lengths[item.type] = 1
          }
          item.index = lengths[item.type]
          if (item.index > maxAssetsLength) {
            maxAssetsLength = item.index
          }
        })
        // 资产间距
        let assetDistence = 150
        // 根据每行最大资产数计算最小宽度
        w = w < maxAssetsLength * assetDistence ? maxAssetsLength * assetDistence : w
        let width = w - margin
        // 防止元素超出
        let containerWidth = width
        // 左侧空出距离
        let leftTextWidth = 0
        // 中心距离
        let computedFieldMiddle = leftTextWidth + (containerWidth - leftTextWidth) / 2
        data.boxes.map(item => {
          let begin = computedFieldMiddle - assetDistence * (lengths[item.type] + 1) / 2
          item.cx = begin + item.index * assetDistence
          item.cy = swimHeight * (indexMap[item.type] - 0.5)
        })
        // 计算线条位置
        data.rel.map(d => {
          d.x1 = nodes[d.from].cx
          d.y1 = nodes[d.from].cy
          d.x2 = nodes[d.to].cx
          d.y2 = nodes[d.to].cy
          let dx = d.x2 - d.x1
          let dy = d.y2 - d.y1
          let ab = 40 / Math.sqrt(dx * dx + dy * dy)
          d.dx = dx * ab
          d.dy = dy * ab
        })
        return {
          data, boxes, swimHeight, w, width, height, margin, indexMap, nodes
        }
      },
      draw(field, options) {
        /* ----------数据部分---------- */
        let {
          data, boxes, swimHeight, w, width, height, margin, indexMap, nodes
        } = options
        /* ----------页面拖动部分,仅拖动x轴---------- */
        // 记录当前页面最小left
        let minLeft = document.querySelector('.businessEffectSvgWrapper').offsetWidth - w
        // 记录当前页面位置
        let x = 0
        let drag = d3.drag()
        drag.on('start', function () {
          x = d3.event.x + Math.abs(parseInt(d3.select(this).style('left')))
        })
        drag.on('drag', function () {
          let left = d3.event.x - x
          d3.select(this)
            .style('left', left > 0 ? 0 : left < minLeft ? minLeft : left)
        })
        field.call(drag)
        /* ----------绘图部分---------- */
        // 箭头
        let defs = field.selectAll('.arrowField').data([1])
        defs.enter().append('defs').attr('class', 'arrowField')
          .append('marker')
          .attr('id', 'arrow')
          .attr('markerUnits', 'strokeWidth')
          .attr('markerWidth', '12')
          .attr('markerHeight', '12')
          .attr('viewBox', '0 0 12 12')
          .attr('refX', '6')
          .attr('refY', '6')
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
          .attr('fill', '#3333ff')
        // 绘制chart尺寸
        let chart = field.attr('width', w)
          .attr('height', height + margin).select('g')
        chart.attr('width', width)
          .attr('height', height + margin)
          .attr('transform', `translate(${margin / 2}, 0)`)
        // 绘制swim
        let swim = chart.selectAll('.swimLine').data(boxes)
        swim.enter()
          .append('line')
          .attr('class', 'swimLine')
        chart.selectAll('.swimLine').attr('x1', 0)
          .attr('y1', (d, i) => swimHeight * indexMap[d.type])
          .attr('x2', width)
          .attr('y2', (d, i) => swimHeight * indexMap[d.type])
        // 资产拖拽
        let assetGrag = d3.drag()
        assetGrag.on('drag', function () {
          let {x, y} = d3.event
          x = x < 30 ? 30 : x > width - 30 ? width - 30 : x
          let node = nodes[d3.select(this).attr('node-id')]
          node.assetDom
            .attr('x', x)
//            .attr('y', y)
          node.assetDesDom
            .attr('x', x)
//            .attr('y', y + 33)
          if (node.from) {
            node.from.map(item => {
              let {node, text} = item
              let {x2, y2, y1} = item.data
              let data = getMx(x, y, x2, y2, y1, y2)
              Object.assign(item.data, data)
              node
                .attr('x1', data.x1 + data.dx)
                .attr('y1', data.y1 + data.dy)
                .attr('x2', data.x2 - data.dx)
                .attr('y2', data.y2 - data.dy)
              text
                .attr('x', (data.x2 + data.x1) / 2)
                .attr('y', (data.y1 + data.y2) / 2)
            })
          }
          if (node.to) {
            node.to.map(item => {
              let {node, text} = item
              let {x1, y1, y2} = item.data
              let data = getMx(x1, y1, x, y, y1, y2)
              Object.assign(item.data, data)
              node
                .attr('x1', data.x1 + data.dx)
                .attr('y1', data.y1 + data.dy)
                .attr('x2', data.x2 - data.dx)
                .attr('y2', data.y2 - data.dy)
              text
                .attr('x', (data.x2 + data.x1) / 2)
                .attr('y', (data.y1 + data.y2) / 2)
            })
          }
        })
        function getMx(x1, y1, x2, y2, oy1, oy2) {
          // 仅y轴拖动
          let dx = x2 - x1
          let dy = oy2 - oy1
          let ab = 40 / Math.sqrt(dx * dx + dy * dy)
          dx *= ab
          dy *= ab
          return {
            x1,
            y1: oy1,
            x2,
            y2: oy2,
            dx,
            dy
          }
//          // 全部轴拖动
//          let dx = x2 - x1
//          let dy = y2 - y1
//          let ab = 40 / Math.sqrt(dx * dx + dy * dy)
//          dx *= ab
//          dy *= ab
//          return {
//            x1, y1, x2, y2, dx, dy
//          }
        }

        // 绘制资产
        let assets = chart.selectAll('.asset').data(data.boxes)
        assets.enter().append('image')
          .attr('class', 'asset')
        chart.selectAll('.asset').attr('xlink:href', d => `./static/img/asset${d.type}.svg`)
          .attr('node-id', d => d.id)
          .each(function (d) {
            d.assetDom = d3.select(this)
          })
          .attr('width', 50)
          .attr('height', 50)
          .attr('x', (d) => d.cx)
          .attr('y', (d) => d.cy)
          .attr('transform', 'translate(-25, -25)')
          .call(assetGrag)
        // 绘制资产文本
        let textes = chart.selectAll('.assetDes').data(data.boxes)
        textes.enter().append('text')
          .attr('class', 'assetDes')
        chart.selectAll('.assetDes')
          .each(function (d) {
            d.assetDesDom = d3.select(this)
          })
          .attr('x', (d) => d.cx)
          .attr('y', (d) => d.cy + 33)
          .attr('text-anchor', 'middle')
          .text(d => d.name)
        // 绘制线条
        let lines = chart.selectAll('.rel').data(data.rel)
        lines.enter().append('line')
          .attr('class', 'rel')
          .attr('stroke-dashoffset', (d, i) => i % 2 === 0 ? 200 : '')
          .attr('stroke', (d, i) => i % 2 !== 0 ? '#f00' : '#3333ff')
        chart.selectAll('.rel')
          .each(function (d, i) {
            // 把线条加入资产
            if (!nodes[d.from].from) {
              nodes[d.from].from = []
            }
            if (!nodes[d.to].to) {
              nodes[d.to].to = []
            }
            nodes[d.from].from[i] = nodes[d.to].to[i] = {}
            nodes[d.from].from[i].node = nodes[d.to].to[i].node = d3.select(this)
            nodes[d.from].from[i].data = nodes[d.to].to[i].data = d
          })
          .attr('x1', d => d.x1 + d.dx)
          .attr('y1', d => d.y1 + d.dy)
          .attr('x2', d => d.x2 - d.dx)
          .attr('y2', d => d.y2 - d.dy)
          .attr('marker-end', 'url(#arrow)')
        // 绘制线条文本
        let lineTextes = chart.selectAll('.relDes').data(data.rel)
        lineTextes.enter().append('text')
          .attr('class', 'relDes')
        chart.selectAll('.relDes')
          .each(function (d, i) {
            // 把线条文本加入资产
            nodes[d.from].from[i].text = d3.select(this)
            nodes[d.to].to[i].text = d3.select(this)
          })
          .attr('x', d => (d.x2 + d.x1) / 2)
          .attr('y', d => (d.y2 + d.y1) / 2)
          .text(d => d.text)
      }
    }
  }
</script>

<style>
  .businessEffectSvgWrapper {
    position: relative;
  }

  .businessEffectSvg {
    position: absolute;
    left: 0;
    top: 0;
    cursor: move;
  }

  .businessEffectSvg line.swimLine {
    stroke: #4ce9ff;
  }

  .businessEffectSvg image.asset {
    cursor: pointer;
  }

  .businessEffectSvg text.assetDes {
    cursor: text;
    fill: #6f75ff;
  }

  .businessEffectSvg line.rel {
    stroke-dasharray: 5, 5;
  }

  .businessEffectSvg text.relDes {
    cursor: text;
    fill: #6f75ff;
  }

  .businessEffectSvg line.rel {
    animation: dash 5s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
