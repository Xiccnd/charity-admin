<template>
  <Echarts
          :title="t('成员分布')"
          headerIcon="icon-chart-histogram"
          :style="{
            height: '300px',
          }"
          :options="{
            tooltip,
            series,
            xAxis,
            yAxis,
            grid,
            legend
          }"
        />
  <Echarts
    :index="1"
    :title="t('进行中项目')"
    headerIcon="icon-chart-histogram"
    :style="{
    height: '300px',
    }"
    :options="{
      tooltip:tooltip1,
      series:series1,
      grid:grid1,
      legend:legend1
    }"
        />
</template>

<script>
import { reactive, toRefs } from 'vue';
import Echarts from '@/components/Echarts/index.vue';
import { useI18n } from 'vue-i18n';
  export default {
    components: { Echarts },
    setup() {
      const { t } = useI18n();

      const state = reactive({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['15-20', '21-25', '26-30', '31-35']
        },
        series: [
          {
            name: '男',
            type: 'bar',
            data: [10, 20, 20, 4]
          },
          {
            name: '女',
            type: 'bar',
            data: [11, 13, 5, 12]
          }
        ],
        legend1: {
          orient: 'vertical',
          left: 'left'
        },
        tooltip1: {
          trigger: 'item'
        },
        series1: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'chan' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis1: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      return {
        ...toRefs(state),
        t,
      };
    },
  };
</script>

<style>

</style>