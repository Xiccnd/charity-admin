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
        <el-table :row-class-name="tableRowClassName"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{textAlign:'center'}"
                  @row-click="onRowClick"
                  :data="tableDatalist.list.slice((tableDatalist.currentPage-1)*tableDatalist.pageSize,tableDatalist.currentPage*tableDatalist.pageSize)"
                  ref="multipleTable"
                  stripe style="width: 100%;">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column prop="telephone" label="手机" width="170" />
          <el-table-column prop="sex" label="性别" width="100" />
          <el-table-column prop="nativeplace" label="居住地" width="170" />
          <el-table-column prop="joinTime" label="加入时间" width="210" />
          <el-table-column prop="list.operate" label="操作">
            <template #default>
              <el-button link type="danger" size="small" @click="handleClick($event)">踢出</el-button>
              <!-- <el-button link type="primary" size="small">查看</el-button> -->
            </template>
          </el-table-column>

        </el-table>

        <div style="width: 300px;margin:20px auto;">
          <el-pagination background
                         :current-page.sync="tableDatalist.currentPage"
                         @current-change="handlePageChange"
                         :page-size="3"
                         layout="total, prev, pager, next"
                         :total="tableDatalist.list.length"
          >
          </el-pagination>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup>


  import store from '@/store';
  import { getTeamid} from '@/utils/accessToken';
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
const formInline = reactive({
  name: "",
  id: ""
});

const tableDatalist = reactive({
  currentRowIndex: 1,
  pageSize: 3,
  currentPage: 1,
  teamid:getTeamid(),
  id: 1,
  list: [{
    id: "",
    telephone: "",
    name: "",
    sex: "",
    nativeplace: "",
    joinTime: ""
  }


  ]

});

const onSubmit = () => {
  search(tableDatalist.teamid, formInline.id, formInline.name).then(res => {
    console.log(tableDatalist.teamid);
    console.log(res.data);
    tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
};
const handleClick = (e) => {
  var vid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  if (vid != "" && vid != null)
    console.log(vid);
  else {
    vid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
    console.log(vid);
  }

  if (window.confirm("是否将该成员踢出队伍") == true) {
    del(vid).then(res => {
      selectAll();
    })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.log("你取消了操作");
  }


};
const selectAll = () => {
  tableData(tableDatalist.teamid).then(res => {
    console.log(res.data);
    tableDatalist.list = res.data;
    console.log(tableDatalist.list.length);

  })
    .catch(err => {
      console.error(err);
    });
};
const handlePageChange = (pageNum) => {
  console.log(pageNum);
  tableDatalist.currentPage = pageNum;
};
onMounted(() => {
  selectAll();
  //  console.log(hasto)
  let num = getTeamid();
  console.log("getTeamid:" + getTeamid());
  console.log("num:" + num);
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
