<template>
  <div>
    <svg id="bs"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'e33',
    data() {
      return {
        options: {}
      }
    },
    mounted() {
      // 测试
      let data = {
        boxes: [
          {id: '1', name: '黑猩猩队长', type: 1},
          {id: '2', name: '孙悟空', type: 2},
          {id: '3', name: '龟仙人', type: 2},
          {id: '4', name: '比克大魔王', type: 2},
          {id: '5', name: '汤姆', type: 3},
          {id: '8', name: '杰瑞', type: 3},
          {id: '41', name: '林冲', type: 4},
          {id: '6', name: '猪八戒', type: 5},
          {id: '7', name: '唐僧', type: 5},
          {id: '9', name: '沙悟净', type: 5}
        ],
        rel: [
          {from: '1', to: '2', text: 'to'},
          {from: '1', to: '3', text: 'to'},
          {from: '1', to: '4', text: 'to'},
          {from: '2', to: '5', text: 'to'},
          {from: '3', to: '5', text: 'to'},
          {from: '5', to: '6', text: 'to'},
          {from: '5', to: '7', text: 'to'},
          {from: '8', to: '7', text: 'to'},
          {from: '41', to: '9', text: 'to'},
          {from: '7', to: '9', text: 'to'}
        ]
      }
//      console.log(data)
      let field = d3.select('#bs')
      field.append('g')
      let defs = field.append('defs')

      let arrowMarker = defs.append('marker')
        .attr('id', 'arrow')
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', '12')
        .attr('markerHeight', '12')
        .attr('viewBox', '0 0 12 12')
        .attr('refX', '6')
        .attr('refY', '6')
        .attr('orient', 'auto')

      arrowMarker.append('path')
        .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
        .attr('fill', '#3333ff')
      this.draw(field, data, document.querySelector('#bs').parentNode.offsetWidth)
      window.d3 = d3
    },
    methods: {
      draw(field, data, w = 600, margin = 40) {
        let boxes = [
          {name: '超能勇士', type: 1},
          {name: '龙珠', type: 2},
          {name: '猫和老鼠', type: 3},
          {name: '水浒传', type: 4},
          {name: '西游记', type: 5}
        ]
        let nodes = {}
        data.boxes.map(item => {
          nodes[item.id] = item
        })
        let indexMap = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5
        }
        let swimHeight = 200
        let width = w - margin
        let height = boxes.length * swimHeight
        let chart = field.attr('width', w)
          .attr('height', height + margin).select('g')
        chart.attr('width', width)
          .attr('height', height)
          .attr('transform', `translate(${margin / 2}, ${margin / 2})`)
        // 绘制swim
        chart.selectAll('.swimLine').data(boxes).enter()
          .append('line')
          .attr('class', 'swimLine')
          .attr('x1', 0)
          .attr('y1', (d, i) => swimHeight * indexMap[d.type])
          .attr('x2', width)
          .attr('y2', (d, i) => swimHeight * indexMap[d.type])
          .style('stroke', '#000')
        // 绘制swim文本
        chart.selectAll('.swimName').data(boxes).enter()
          .append('text')
          .attr('class', 'swimName')
          .attr('x', 0)
          .attr('y', (d, i) => swimHeight * (indexMap[d.type] - 0.5))
          .text(d => d.name)
          .style('font-size', '20px')
          .attr('fill', '#3333ff')
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
        // 左侧空出100距离显示名称
        // 防止元素超出
        let containerWidth = width - 50
        let leftTextWidth = 0
        let maxAssetDistence = 200
        let assetDistence = (containerWidth - leftTextWidth) / maxAssetsLength
        let computedFieldMiddle = leftTextWidth + (containerWidth - leftTextWidth) / 2
        assetDistence = assetDistence > maxAssetDistence ? maxAssetDistence : assetDistence
        data.boxes.map(item => {
          let begin = computedFieldMiddle - assetDistence * lengths[item.type] / 2
          item.cx = begin + item.index * assetDistence
          item.cy = swimHeight * (indexMap[item.type] - 0.5)
        })
        // 绘制资产
        let assets = chart.selectAll('.asset').data(data.boxes)
        assets.enter().append('image')
          .attr('class', 'asset')
          .attr('xlink:href', d => `/static/img/asset${d.type}.svg`)
          .attr('width', 50)
          .attr('height', 50)
          .attr('x', (d) => d.cx)
          .attr('y', (d) => d.cy)
          .attr('transform', 'translate(-25, -25)')
        // 绘制资产文本
        let textes = chart.selectAll('.assetDes').data(data.boxes)
        textes.enter().append('text')
          .attr('class', 'assetDes')
          .attr('x', (d) => d.cx)
          .attr('y', (d) => d.cy + 40)
          .attr('text-anchor', 'middle')
          .text(d => d.name)
        // 计算线条位置
        data.rel.map(d => {
          d.x1 = nodes[d.from].cx
          d.y1 = nodes[d.from].cy
          d.x2 = nodes[d.to].cx
          d.y2 = nodes[d.to].cy
          d.mx = (d.x2 + d.x1) / 2
          d.my = (d.y2 + d.y1) / 2
          let dx = d.x2 - d.x1
          let dy = d.y2 - d.y1
          let ab = 50 / Math.sqrt(dx * dx + dy * dy)
          dx *= ab
          dy *= ab
          d.x1 += dx
          d.y1 += dy
          d.x2 -= dx
          d.y2 -= dy
        })
        // 绘制线条
        let lines = chart.selectAll('.rel').data(data.rel)
        lines.enter().append('line').attr('class', 'rel')
          .attr('x1', d => d.x1)
          .attr('y1', d => d.y1)
          .attr('x2', d => d.x2)
          .attr('y2', d => d.y2)
          .attr('stroke', '#3333ff')
          .attr('marker-end', 'url(#arrow)')
        // 心跳
        let heartLoop = 2000
        let lineHearts = chart.selectAll('.relHeart').data(data.rel)
        lineHearts.enter().append('circle').attr('class', 'relHeart')
          .attr('fill', '#0000ff')
          .attr('r', 2)
          .attr('opacity', 0.5)
          .attr('cx', d => d.x1)
          .attr('cy', d => d.y1)
          .transition()
          .duration(heartLoop)
          .attr('cx', d => d.x2)
          .attr('cy', d => d.y2)
          .attr('opacity', 1)
        d3.interval(() => {
          chart.selectAll('.relHeart')
            .attr('opacity', 0.5)
            .attr('cx', d => d.x1)
            .attr('cy', d => d.y1)
            .transition()
            .duration(heartLoop)
            .attr('cx', d => d.x2)
            .attr('cy', d => d.y2)
            .attr('opacity', 1)
        }, heartLoop + 200)
        // 绘制线条文本
        let lineTextes = chart.selectAll('.relDes').data(data.rel)
        lineTextes.enter().append('text').attr('class', 'relDes')
          .attr('x', d => d.mx)
          .attr('y', d => d.my)
          .text(d => d.text)
      }
    }
  }
</script>

<style>
  image.asset {
    cursor: pointer;
  }

  #e32 rect {
    transition: all .3s;
    fill: steelblue;
  }

  #e32 rect:hover {
    fill: #0000ff;
  }

  #e32 text {
    fill: white;
    font: 10px sans-serif;
    text-anchor: end;
  }

  #e32 .axis text {
    font: 10px sans-serif;
    fill: #000;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  #e321 text {
    font: bold 48px monospace;
  }

  #e321 .enter {
    fill: green;
  }

  #e321 .update {
    fill: #333;
  }

  #e321 .exit {
    fill: brown;
  }

  circle.point {
    fill: #fff;
    stroke: #000;
    transition: all .2s;
    cursor: pointer;
  }

  circle.point:hover {
    stroke-width: 3px;
  }
</style>
