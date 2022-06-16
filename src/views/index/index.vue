<template>
<div id="main"></div>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="avatar">
        <el-avatar :size="50" :src="avatar"></el-avatar>
      </div>
      <div class="head-card-content">
        <h2 class="title">{{ sayHi }}! Admin, {{ t('indexPage.descTitle') }}</h2>
        <p class="desc">
        </p>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> 
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">队伍信息</h3>
            </template>
            <description :info="teaminfo"></description>
            <collapse :info="teaminfo"></collapse>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> 
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">待办事项</h3>
            </template>
            <Tab :tableData="review.list"></Tab>
          </el-card>
        </el-col>
      </el-row>
       <el-row :gutter="10">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">人员分布</h3>
            </template>
              <Map></Map>
          </el-card>
        </el-col>
      </el-row>
     
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
  import { ref, computed, reactive, onBeforeMount, onMounted,toRaw} from 'vue';
  import {indexinfo,reviewed} from  '../../api/volunteer';
  import { CountTo } from 'vue3-count-to';
  import Description from 'views/index/descriptions/Description.vue';
  import Collapse from 'views/index/descriptions/Collapse.vue';
  import Table from 'views/index/tabs/Table.vue'
  import Tab from 'views/index/tabs/Tab.vue'
  import Map from 'views/index/tabs/map.vue'
  // import TabSecond from 'views/index/tabs/Tabs.vue';
  // import Chart from 'views/index/tabs/Chart.vue';
  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';
  import { getResouceList } from '@/api/index';
  import { useStore } from 'vuex';
  const activeName = ref('first')
  const store = useStore();

  const { t } = useI18n();

  const state = reactive({
    list: [],
    prefix: '',
    orderList: [],
    skillList: [],
  });
  
  const teaminfo = reactive({
      teamid: '',
      teamName: '',
      contact: '',
      telephone: '',
      address: '',
      detailedAddress: '',
      registrationAuthority: '',
      regisDepartment: '',
      teamProfile:'',
  })

  let review = reactive({
    list: [{
      name:'',
      sex:'',
      area:'',
      address:'',
      telephone:'',
      mailbox:''
    }]
  })
  
 
  const hour = new Date().getHours();
  const thisTime =
    hour < 8
      ? t('sayHi.early')
      : hour <= 11
      ? t('sayHi.morning')
      : hour <= 13
      ? t('sayHi.noon')
      : hour < 18
      ? t('sayHi.afternoon')
      : t('sayHi.evening');
  const sayHi = ref(thisTime);
  const avatar = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif');

  const series2 = reactive([
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ]);

  const xAxis = reactive({
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });

  const yAxis = reactive({
    type: 'value',
  });

  const toolbox = reactive({
    show: true,
  });

  const isMobile = computed(() => {
    return store.getters['setting/isMobile'];
  });
      
  const onGetResouceList = () => {
    getResouceList().then((res) => {
      const { list, prefix, orderList, skillList } = res.data;
      Object.assign(state, { list, prefix, orderList, skillList});
    });
  };
 
  const handleToDetail = (url) => {
    window.open(url);
  };
  const baseinfo = (teamid) =>{
    indexinfo(teamid).then(res =>{
      const {teamid,contact,teamName,telephone,address,detailedAddress,registrationAuthority,regisDepartment,teamProfile} = res.data;
      Object.assign(teaminfo,{ teamid,contact,teamName,telephone,address,detailedAddress,registrationAuthority,regisDepartment,teamProfile})
    }).catch(err =>{
      console.log(err)
    })
  }
  const basereviewed = (teamid) =>{
    reviewed(teamid).then(res =>{
      review.list = res.data 
    }).catch(err =>{
      console.log(err)
    })
  }
  onBeforeMount(() => {
    
    onGetResouceList();
    baseinfo(1)
    basereviewed(1)
  });
</script>


<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
  .index-conntainer {
    width: $base-width;
    .head-card {
      display: flex;
      align-items: center;
      padding: $base-main-padding;
      background-color: $base-color-white;
      &-content {
        padding-left: 15px;
        .desc {
          color: $base-font-color;
        }
      }
    }
    .content {
      margin: 15px 0;
      .count-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          text-align: center;
          .label {
            padding: 10px 0;
            font-size: $base-font-size-big;
          }
          .count {
            font-size: $base-font-size-max;
            font-weight: bolder;
            color: $base-color-primary;
            &.error {
              color: var(--el-color-danger);
            }
            &.success {
              color: var(--el-color-success);
            }
          }
        }
      }
      .title {
        margin: 0;
      }
      .skill-title {
        padding: 10px 0;
        font-weight: 500;
      }
      .card {
        margin-bottom: 15px;
        &-body {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          &.mobile {
            grid-template-columns: repeat(1, 1fr);
          }
          .item {
            box-sizing: border-box;
            padding: 10px 20px;
            margin-top: -1px;
            margin-left: -1px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid black;
            border: 1px solid #eee;
            transition: box-shadow 0.5;
            .lf {
              display: flex;
              align-items: center;
              max-width: 140px;
              .img {
                width: auto;
                max-width: 120px;
                height: auto;
                max-height: 40px;
              }
            }
            &:hover {
              box-shadow: $base-box-shadow;
            }
            .title {
              padding-left: 5px;
              font-size: 18px;
              font-weight: bold;
            }
            .desc {
              padding: 5px 0;
              font-size: 13px;
              line-height: 1.5;
              color: $base-font-color;
            }
          }
        }
      }
    }
  }
</style>
