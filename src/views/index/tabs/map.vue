<template>
  <div class="map">
    <div id="mains" style="height: 650px; width: 100%"></div>
  </div>
</template>

<script>
// echarts5.0以上版本使用中国地图
import * as echarts from "echarts";
import dataJson from "../../../assets/data.json";
export default {
  data() {
    return {}
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("mains"));
    let uploadDataUrl = dataJson;
    console.log(uploadDataUrl);
    // 注册地图
    echarts.registerMap("china", uploadDataUrl);
    let option = {
      geo: {
        // 地理坐标系组件,支持在地理坐标系上绘制散点图、线图
        map: "china",
        aspectScale: 0.75,
        zoom: 1.1,
      },
      series: [
        {
          type: "map",
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#1DE9B6",
              },
            },
            emphasis: {
              textStyle: {
                color: "rgb(183, 185, 14)",
              },
            },
          },
          zoom: 1.1,
          map: "china",
        },
        // 地图的线路图动画效果相关设置
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.6,
            symbol: "arrow",
            symbolSize: 7,
          },
          lineStyle: {
            normal: {
              color: "#1DE9B6",
              width: 1,
              opacity: 0.1,
              curveness: 0.3,
            },
          },
          data: [
            // {name:'北京',value:200},
          ]
        },
      ],
    };
    myChart.setOption(option);
  }
}
</script>


