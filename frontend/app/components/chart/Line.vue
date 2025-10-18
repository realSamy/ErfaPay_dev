<template>
  <VChart :option="option" autoresize />
</template>

<script lang="ts" setup>
const echarts = await import('echarts')
const option = ref<ECOption>({
  xAxis: {type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']},
  yAxis: {type: 'value', min: 0, max: 100},
  series: [{
    type: 'line',
    data: [50, 60, 45, 70, 55, 65, 80, 40, 90, 75],
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {color: '#3B82F6', width: 2},
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(59, 130, 246, 0.4)'},
        {offset: 1, color: 'rgba(59, 130, 246, 0.0)'}
      ])
    }
  }]
})
</script>

