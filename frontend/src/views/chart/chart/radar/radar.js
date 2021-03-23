import { hexColorToRGBA } from '@/views/chart/chart/util'
import { componentStyle } from '../common/common'

export function baseRadarOption(chart_option, chart) {
  // 处理shape attr
  let customAttr = {}
  if (chart.customAttr) {
    customAttr = JSON.parse(chart.customAttr)
    if (customAttr.color) {
      chart_option.color = customAttr.color.colors
    }
    // size
    if (customAttr.size) {
      chart_option.radar.shape = customAttr.size.radarShape
    }
    // tooltip
    if (customAttr.tooltip) {
      const tooltip = JSON.parse(JSON.stringify(customAttr.tooltip))
      const reg = new RegExp('\n', 'g')
      tooltip.formatter = tooltip.formatter.replace(reg, '<br/>')
      chart_option.tooltip = tooltip
    }
  }
  // 处理data
  if (chart.data) {
    chart_option.title.text = chart.title
    chart.data.x.forEach(function(ele) {
      chart_option.radar.indicator.push({ name: ele })
    })
    for (let i = 0; i < chart.data.series.length; i++) {
      const y = chart.data.series[i]
      // color
      y.itemStyle = {
        color: hexColorToRGBA(customAttr.color.colors[i % 9], customAttr.color.alpha)
      }
      // label
      if (customAttr.label) {
        y.label = customAttr.label
      }
      chart_option.legend.data.push(y.name)
      y.value = JSON.parse(JSON.stringify(y.data))
      chart_option.series[0].data.push(y)
    }
  }
  // console.log(chart_option);
  componentStyle(chart_option, chart)
  return chart_option
}

