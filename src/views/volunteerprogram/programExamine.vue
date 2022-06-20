<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目ID">
            <el-input v-model="formInline.id" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="项目名称">
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
          <el-table-column prop="pid" label="项目ID" width="100" />
          <el-table-column prop="pname" label="项目名称" width="230" />
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column prop="telephone" label="联系电话" width="130" />
          <el-table-column prop="post_name" label="岗位" width="120" />
          <el-table-column prop="joinTime" label="申请时间" width="160" />
          <el-table-column prop="status" label="申请事项" width="140" />
          <el-table-column prop="list.operate" label="操作">
            <template #default="scope">
              <el-button link type="danger" size="small" @click="refusehandleClick(scope.row)">拒绝</el-button>
              <el-button link type="success" size="small" @click="agreehandleClick(scope.row)">同意</el-button>
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
  import { ref, reactive} from 'vue';
  import { CountTo } from 'vue3-count-to';
  import Addform from '@/components/program/index.vue';
  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';
  import { getResouceList } from '@/api/index';
  import { useStore } from 'vuex';
  import { method } from 'lodash-unified';
  import { cencortableData,cencorsearch,refusejoin,agreejoin,refusejoinpro,refusequitpro} from '@/api/program';
  import { getTeamid} from '@/utils/accessToken';
  import { useRouter } from "vue-router";
  import { ElMessage, ElMessageBox } from 'element-plus'
  components: {
    Addform
  }
  const router = useRouter(); 
const refform = ref(false)
let dialogFormVisible = ref(false)
const addform = ref(false)
const formLabelWidth = '140px'
const ruleForm = reactive({
  status:"",
  pname: "",
  telephone:"",
  location: "",
  releaseDate: "",
  projectDate: "",
  recruitDate: "",
  serviceObject: "",
  volunteerUpport: "",
  serviceDescription: "",
  projectDetails: "",
  postDesc: "",
  postCondition: "",
  postName: "",
  targetNum: "",
  type: []
});
const formInline = reactive({
  name: "",
  id: ""
});
const tableDatalist = reactive({
  currentRowIndex: 1,
  pageSize: 3,
  currentPage: 1,
  teamid: getTeamid(),
  id: 1,
  list: [{
    name:"",
    post_name:"",
    joinTime:"",
    pname: "",
    location: "",
    releaseDate: "",
    recruitDate: "",
    projectDate: "",
    statusName: "",
    prop: "",
    pid: ""
  }
  ]

});
const onSubmit = () => {
  cencorsearch(tableDatalist.teamid, formInline.id, formInline.name).then(res => {
    tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
};
const agreehandleClick = (row) =>{
if(row.status == "加入申请中"){
      if (window.confirm("是否同意其加入项目") == true) {
          agreejoin(row.id,row.pid,row.postid).then(res => {
            console.log(row.id+row.pid+row.postid)
            selectAll();
          }).catch(err => {
              console.error(err);
            });
        } else {
          console.log("你取消了操作");
        }
  }else if(row.status == "退出申请中"){
       if (window.confirm("是否同意其退出项目") == true) {
          refusejoinpro(row.id,row.pid,row.postid).then(res => {
            selectAll();
          }).catch(err => {
              console.error(err);
            });
        } else {
          console.log("你取消了操作");
        }
  }
}
const refusehandleClick = (row) => {

<<<<<<< HEAD
if(row.status == "加入申请中"){
      if (window.confirm("是否拒绝其加入项目") == true) {
          refusejoin(row.id,row.pid,row.postid).then(res => {
            selectAll();
          }).catch(err => {
              console.error(err);
            });
        } else {
          console.log("你取消了操作");
        }
  }else if(row.status == "退出申请中"){
   if (window.confirm("是否拒绝其退出队伍") == true) {
    refusequitpro(row.id,row.pid,row.postid).then(res => {
      selectAll();
    })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.log("你取消了操作");
  }
}
};
const selectAll = () => {
  cencortableData(tableDatalist.teamid).then(res => {
    console.log(res.data)
=======

};
const selectAll = (id) => {
  cencortableData(tableDatalist.teamid,id).then(res => {
>>>>>>> 36db5b56fe91615af31b3667b37277aa2c18cd5f
    tableDatalist.list = res.data;
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
  if(router.currentRoute.value.query.id!==undefined&&router.currentRoute.value.query.id!==''){
     cencorsearch(tableDatalist.teamid,router.currentRoute.value.query.id).then(res => {
     tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
  }
  else{
    selectAll();
   }
});
</script>

<style lang="scss" scoped>
.el-dialog {
  .el-form {
    max-height: 500px !important;
    min-height: 50px;
    overflow-y: auto;
  }
}


.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
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

}
</style>
