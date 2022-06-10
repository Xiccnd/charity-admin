<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="志愿者ID">
      <el-input v-model="formInline.id" placeholder="请输入" />
    </el-form-item>
     <el-form-item label="志愿者姓名">
      <el-input v-model="formInline.name" placeholder="请输入" />
    </el-form-item>
    <!-- <el-form-item label="志愿者姓名">
      <el-select v-model="formInline.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
      
      </div>
    </div>
   
  </div>

  <div class="index-conntainer" style="margin-top:10px;">
    <div class="head-card" style="width:100%;">
      <div class="head-card-content" style="width:100%;">
          <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" label="ID" width="80" />
              <el-table-column prop="name" label="姓名" width="80" />
               <el-table-column prop="name" label="手机" width="150" />
                 <el-table-column prop="name" label="性别" width="80" />
                  <el-table-column prop="name" label="居住地" width="150" />
                   <el-table-column prop="name" label="加入时间" width="150" />
              <el-table-column prop="address" label="操作" />
            </el-table>
            
     </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
  import { ref, computed, reactive, onBeforeMount } from 'vue';

  import { CountTo } from 'vue3-count-to';
  import Echarts from '@/components/Echarts/index.vue';

  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';
  import { getResouceList } from '@/api/index';

  import { useStore } from 'vuex';
  const formInline = reactive({
         name: '',
        id: '',
      })
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  
]
const onSubmit = () => {
  console.log('submit!')
  console.log(formInline.id)
  console.log(formInline.name)
}
</script>

<style lang="scss" scoped>  
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
   
  }
</style>
