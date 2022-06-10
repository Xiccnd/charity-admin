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
          <el-table :row-class-name="tableRowClassName" @row-click="onRowClick" 
          :data="tableDatalist.list" ref="multipleTable"
          stripe style="width: 100%;" >
              <el-table-column prop="id" label="ID" width="80"/>
              <el-table-column prop="name" label="姓名" width="80" />
               <el-table-column prop="telephone" label="手机" width="150"/>
                 <el-table-column prop="sex" label="性别" width="80" />
                  <el-table-column prop="nativeplace" label="居住地" width="150" />
                   <el-table-column prop="joinTime" label="加入时间" width="190" />
                <el-table-column prop="list.operate" label="操作" >
            <template #default>
             <el-button link type="primary" size="small" @click="handleClick()">踢出</el-button>
             <el-button link type="primary" size="small">查看</el-button>
             </template>
                </el-table-column>
               
            </el-table>
     </div>
    </div>
  </div>
  <div>
  </div>

</template>

<script setup>
  import { ref, computed, reactive, onBeforeMount } from 'vue';
  import { CountTo } from 'vue3-count-to';
  import Echarts from '@/components/Echarts/index.vue';
  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';
  import { getResouceList } from '@/api/index';
  import { useStore } from 'vuex';
  import { method } from 'lodash-unified';
  import { tableData,search,del} from '@/api/volunteer';
let multipleTable =ref(null)
const tableRowClassName=({row, rowIndex}) =>{
    row.row_index = rowIndex;
}
// const onRowClick= (row, event, column) => {
//     tableDatalist.currentRowIndex = row.row_index;
//     console.log(tableDatalist.currentRowIndex);
// }
const formInline = reactive({
        name: '',
        id: '',
      })

const tableDatalist = reactive({
    currentRowIndex:1,
     teamid:1,
     id:1,
     list:[{
              id:'',  
              telephone: '2016-05-03',
              name: 'Tom',
              telephone:'',
              sex:'',
              nativeplace: 'No. 189, Grove St, Los Angeles',
              joinTime:''
     }
     
     ]
    
})

const onSubmit = () => {
  search(tableDatalist.teamid,formInline.id,formInline.name).then(res => {
                console.log(res.data)  
                 tableDatalist.list=res.data
              })
              .catch(err => {
                console.error(err); 
              })
}
const handleClick = () => {
  console.log(multipleTable.value);
  //  const _selectData =ref.multipleTable;
  //     console.log(_selectData);
  // console.log(tableRowClassName)
  // console.log(tableDatalist.list[tableDatalist.currentRowIndex])
  // console.log(tableDatalist.id)
  //  del(tableDatalist.id).then(res => {
  //             location. reload()
  //             this.$router.go(0)

  //             })
  //             .catch(err => {
  //               console.error(err); 
  //             })
}
const selectAll = () => {
 tableData(tableDatalist.teamid).then(res => {
                console.log(res.data)  
                 tableDatalist.list=res.data
              })
              .catch(err => {
                console.error(err); 
              })
}

onMounted(() => {
     selectAll();
    });

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
