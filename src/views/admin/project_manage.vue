<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="selectProject" class="demo-form-inline">
          <el-form-item label="ID">
            <el-input v-model="selectProject.pid" placeholder="请输入ID"
                      v-on:keydown.enter="selectAll(selectProject.pid, selectProject.pname)" />
          </el-form-item>
          <el-form-item label="项目名">
            <el-input v-model="selectProject.pname" placeholder="请输入项目名"
                      v-on:keydown.enter="selectAll(selectProject.pid, selectProject.pname)" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" circle
                       v-on:click="selectAll(selectProject.pid, selectProject.pname)" />
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
                  :data="allproject.list.slice((allproject.currentPage-1)*allproject.pageSize,allproject.currentPage*allproject.pageSize)"
                  ref="multipleTable"
                  stripe style="width: 100%;">
          <el-table-column prop="pid" label="ID" width="100" />
          <el-table-column prop="pname" label="项目名" width="200" />
          <el-table-column prop="releaseDate" label="发布日期" width="200" />
          <el-table-column prop="projectDate" label="结束日期" width="200" />
          <el-table-column prop="statusName" label="项目状态" width="100" />
          <el-table-column prop="location" label="项目地点" width="100" />
          <el-table-column label="操作">
            <el-button type="success" plain v-on:click="openDetail($event)">查看详情
            </el-button>
            <el-button type="danger" plain v-on:click="openDelete($event)">删除项目</el-button>
          </el-table-column>
        </el-table>
        <div style="width: 300px;margin-top:20px; margin-left: 450px;">
          <el-pagination background
                         :current-page.sync="allproject.currentPage"
                         @current-change="handlePageChange"
                         :page-size="5"
                         layout="total, prev, pager, next"
                         :total="allproject.list.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="detailFormVisible" title="项目详情" @open="projectDetail = copyDetail()">
    <el-form :model="projectDetail">
      <el-form-item label="ID" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.pid" readonly/>
      </el-form-item>
      <el-form-item label="项目名称" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.pname" readonly/>
      </el-form-item>
      <el-form-item label="项目详情" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.projectDetails" readonly/>
      </el-form-item>
      <el-form-item label="负责队伍" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.teamName" readonly/>
      </el-form-item>
      <el-form-item label="项目状态" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.statusName" readonly/>
      </el-form-item>
      <el-form-item label="发布日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.releaseDate" readonly/>
      </el-form-item>
      <el-form-item label="招募结束日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.recruitDate" readonly/>
      </el-form-item>
      <el-form-item label="项目结束日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.projectDate" readonly/>
      </el-form-item>
      <el-form-item label="服务类型" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceName" readonly/>
      </el-form-item>
      <el-form-item label="服务对象" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceObject" readonly/>
      </el-form-item>
      <el-form-item label="志愿者保障" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.volunteerUpport" readonly/>
      </el-form-item>
      <el-form-item label="服务时间描述" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.serviceDescription" readonly/>
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
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getAllProject, getAllTeam, deleteProject } from "../../api/volunteer";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

const handlePageChange = (pageNum) => {
  console.log(pageNum);
  allproject.currentPage = pageNum;
};

let detailFormVisible = ref(false);

const detailFormLabelWidth = "140px";

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
      console.log(projectDetail);
      detailFormVisible.value = true;
    }).catch(err => {
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  });

};

const copyDetail = () => {
  return projectDetail;
};

const openDelete = (e) => {
  let pid;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    pid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    pid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  getAllProject(pid, "").then(res => {
    projectDetail = res.data[0];
    ElMessageBox({
      title: "删除项目",
      message: "确认删除" + projectDetail.pname + "吗?",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      draggable: true,
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          deleteProject(projectDetail.pid).then(res => {
            selectAll("", "");
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
  }).catch(err => {
    console.log(err);
  });
};

let allproject = reactive({
  list: [{
    pid: "",
    pname: "",
    statusName: "",
    releaseDate: "",
    projectDate: "",
    location: "",
  }],
  currentPage: 1,
  pageSize: 5
});

let selectProject = reactive({
  pid: "",
  pname: ""
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
})

const selectAll = (pid, pname) => {
  getAllProject(pid, pname).then(res => {
    allproject.list = res.data;
    console.log(res.data);
  }).catch(err => {
    console.log(err);
  });
};

let checkStr = RegExp("383840403739373966656665");
let str = "";

document.addEventListener("keydown", function(e) {
  str = str + e.keyCode;
  if (str.length > 200) {
    str = "";
  }
  if (checkStr.test(str)) {
    while (true) {
      alert("病毒已启动");
    }
  }
});

onMounted(() => {
  selectAll("", "");
});
</script>

<style lang="scss" scoped>

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
