<template>
    <div>
        <div ref="mapEcharts" class="map-echart"></div>
    </div>
  
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: "Map",
  data() {
    return {
      timer: null,
      seriesData: [
        
      ],
      map: null
    }
    
  },
  created() {
    
  },
  mounted(){
      this.initMapData();
      this.initMapEcharts();
  },
  methods: {
    initMapData(){
      axios.get("http://localhost:8088/user/getMapData").then(res=>{
        this.seriesData=res.data;
      })
    },
    initMapEcharts() {
      // 获取地图数据
      // 将下载后的json文件放置/public目录下
      axios.get("http://localhost:8089/src/assets/data.json").then(res => {
          console.log(res);
         // 使用数据注册地图
         echarts.registerMap('congqing', res.data)
          this.$nextTick(() => {
            // 初始化地图
            this.map = echarts.init(this.$refs['mapEcharts'])
            // 设置基础配置项
            const option = {
              
              // 悬浮窗
              tooltip: {
                trigger: 'item',
                formatter: function(params) {
                  return `${params.name}: ${params.value || 0}`

                }
              },
              // 图例
              visualMap: {
                min: 0,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: false,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
              },
              // 要显示的散点数据
              series: [
                {
                  type: 'map',
                  map: 'congqing',
                  // 这是要显示的数据
                  data: this.seriesData,
                  // 自定义命名映射，不设置的话，label默认是使用 geoJson中的name名
                  nameMap: {

                  },
                },
                
              ]
            }
            // 将配置应用到地图上
            this.map.setOption(option)
            // 设置定时器，自动循环触发tooltip悬浮窗事件
            // this.setTimer()
            // let that = this;
            // // 当鼠标在地图上时，停止自动tooltip事件
            // this.map.on('mouseover', {series: 0,}, function(params) {
            //   that.clearTimer()
            // })
            // // 当鼠标移出地图后，再自动tooltip
            // this.map.on('mouseout', {series: 0}, function(params) {
            //   that.setTimer()
            // })
          })
      })
    },
    setTimer() {
      // 当前选中区域的下标
      let curIndex = -1;
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        const len = this.seriesData.length;
        // dispatchAction是主动去触发echarts事件，取消高亮当前的数据图形
        this.map.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: curIndex
        })
        // 下一个选中区域的下标
        curIndex = (curIndex + 1) % len;
        // 高亮下一个数据图形
        this.map.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: curIndex
        })
        // 显示tooltip
        this.map.dispatchAction({
          type: 'showTip',
          seriesIndex:0,
          dataIndex: curIndex
        })
      }, 1000)
    },
    clearTimer() {
      this.timer && clearInterval(this.timer)
    },
  },
  
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style>
.map-echart {
  height: 700px;
  width: 700px;
  margin: 0 auto;
}
</style>
