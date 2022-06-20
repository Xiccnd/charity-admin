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
          <el-form-item>
            <el-button type="success" @click="dialogFormVisible = true">创建新项目</el-button>
            <!-- <el-button @click="open" type="success">创建新项目</el-button>
             <el-button type="success" @click="createpro">创建新项目</el-button> -->
          </el-form-item>
        </el-form>
      </div>


      <el-dialog v-model="dialogFormVisible" title="项目详情"
                 @close="resetForm('ruleForm')"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 width="1100px" top="10px">
        <el-form :model="form">
          <Addform ref="addform" @callback="callback" v-model:ruleForm="ruleForm"
                   v-model="ruleForm"></Addform>
        </el-form>
      </el-dialog>
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
          <el-table-column prop="pid" label="ID" width="100" />
          <el-table-column prop="pname" label="项目名" width="200" />
          <el-table-column prop="releaseDate" label="发布日期" width="200" />
          <el-table-column prop="projectDate" label="结束日期" width="200" />
          <el-table-column prop="location" label="项目地点" width="100" />
          <el-table-column prop="projectStatus" label="项目状态" width="100" />
          <el-table-column prop="list.operate" label="操作">
            <el-button type="success" plain v-on:click="openDetail($event)">查看详情
            </el-button>
            <!-- <el-button type="danger" plain v-on:click="openDelete($event)">删除项目</el-button> -->
            <!-- <el-button link type="danger" size="small" @click="handleClick($event)">踢出</el-button> -->
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
  <el-dialog v-model="detailFormVisible" @closed="pshow=false" @open="projectDetail = copyDetail()">
    <template #title>
      <div class="el-dialog__header">
        <span class="el-dialog__title">
          <span v-show="!pshow">项目详情</span>  
          <el-page-header v-show="pshow" content="成员" @back="goBack">
            <template #title>返回</template>
          </el-page-header>
        </span>
      </div>
    </template>
    <el-table v-show="pshow" :data="peopleNum.list" style="width: 100%" max-height="500">
      <el-table-column fixed prop="id" label="id" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="telephone" label="电话" width="150" />
      <el-table-column prop="area" label="所属区域" width="200" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="danger" plain v-on:click="openDelete(projectDetail.pid,$event)">Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="projectDetail" v-show="!pshow">
      <el-form-item label="ID" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.pid" readonly />
      </el-form-item>
      <el-form-item label="项目名称" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.pname" readonly />
      </el-form-item>
      <el-form-item label="项目详情" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.projectDetails" readonly />
      </el-form-item>
      <el-form-item label="负责队伍" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.teamName" readonly />
      </el-form-item>
      <el-form-item label="项目状态" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.statusName" readonly />
      </el-form-item>
      <el-form-item label="发布日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.releaseDate" readonly />
      </el-form-item>
      <el-form-item label="招募结束日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.recruitDate" readonly />
      </el-form-item>
      <el-form-item label="项目结束日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.projectDate" readonly />
      </el-form-item>
      <el-form-item label="服务类型" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceName" readonly />
      </el-form-item>
      <el-form-item label="服务对象" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceObject" readonly />
      </el-form-item>
      <el-form-item label="志愿者保障" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.volunteerUpport" readonly />
      </el-form-item>
      <el-form-item label="服务时间描述" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceDescription" readonly />
      </el-form-item>
      <el-form-item label="成员数量" :label-width="detailFormLabelWidth">
        <el-input v-model="peopleNum.list.length" readonly />
        &nbsp;&nbsp;<el-button type="primary" @click="pshow = true;">查看成员</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="detailFormVisible = false;">确定</el-button>
            </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { CountTo } from "vue3-count-to";
import Addform from "@/components/program/index.vue";
import { useI18n } from "vue-i18n";
import { getResouceList } from "../../api/index";
import { useStore } from "vuex";
import { method } from "lodash-unified";
import { tableData, search } from "../../api/program";
import { getAllProject, getAllTeam, countnumber, deleteprojectNum } from "../../api/volunteer";
import { getTeamid } from "../../utils/accessToken";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

components: {
  Addform;
}
const detailFormLabelWidth = "140px";
const refform = ref(false);
let dialogFormVisible = ref(false);
const addform = ref(false);
const formLabelWidth = "140px";
const ruleForm = reactive({
  pname: "",
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
  type: ""
});
const tableData1 = ref([]);
const goBack = () => {
  pshow.value = false;
};
let detailFormVisible = ref(false);
let pshow = ref(false);
const submitpro = () => {
  console.log(addform.value);
  // addform.value.handleClose()
  console.log(ruleForm.pname);
};
const resetForm = () => {
  Object.keys(ruleForm).map(key => {
    delete ruleForm[key];
  });
};


const formInline = reactive({
  name: "",
  id: ""
});
const callback = () => {
  dialogFormVisible.value = false;
};
const tableDatalist = reactive({
  currentRowIndex: 1,
  pageSize: 3,
  currentPage: 1,
  teamid: getTeamid(),
  id: 1,
  list: [{
    pname: "",
    location: "",
    releaseDate: "",
    recruitDate: "",
    projectDate: "",
    projectStatus: "",
    prop: "",
    pid: ""
  }]
});

let projectDetail = reactive({
  pid: "",
  pname: "",
  teamid: "",
  serviceName: "",
  serviceObject: "",
  statusName: "",
  serviceDescription: "",
  releaseDate: "",
  recruitDate: "",
  projectDate: "",
  projectDetails: "",
  location: "",
  volunteerUpport: "",
  teamName: ""
});

let peopleNum = reactive({
  list: [{
    id: "",
    name: "",
    telephone: "",
    area: ""
  }]
});
const onSubmit = () => {
  search(tableDatalist.teamid, formInline.id, formInline.name).then(res => {
    tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
};

const openDetail = (e) => {
  let pid;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    pid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    pid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  getAllProject(pid, "").then(res => {
    projectDetail = res.data[0];
    getAllTeam(projectDetail.teamid, "").then(res => {
      projectDetail.teamName = res.data[0].teamName;
      detailFormVisible.value = true;
    }).catch(err => {
      console.log(err);
    });
  });
  countnumber(pid).then(res => {
    peopleNum.list = res.data;
  }).catch(err => {
    console.log(err);
  });
};

const openDelete = (pid, e) => {
  let id, name;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    id = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
    name = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.innerText;
  } else {
    id = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
    name = e.target.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild.innerText;
  }
  ElMessageBox({
    title: "删除项目",
    message: "确认删除" + name + "吗?",
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "确认",
    draggable: true,
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        deleteprojectNum(pid, id).then(res => {
          countnumber(pid).then(res => {
            peopleNum.list = res.data;
          }).catch(err => {
            console.log(err);
          });
          done();
        }).catch(err => {
          console.log(err);
        });
      } else {
        done();
      }
    },
    callback: (action: Action) => {
      if (action == "confirm") {
        ElMessage({
          type: "success",
          message: "删除成功"
        });
      } else {
        ElMessage({
          type: "info",
          message: "取消删除"
        });
      }
    }
  });
};
const copyDetail = () => {
  return projectDetail;
};
const selectAll = () => {
  tableData(tableDatalist.teamid).then(res => {
    tableDatalist.list = res.data;
  }).catch(err => {
    console.error(err);
  });
};
const handlePageChange = (pageNum) => {
  console.log(pageNum);
  tableDatalist.currentPage = pageNum;
};

onMounted(() => {
  selectAll();
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
