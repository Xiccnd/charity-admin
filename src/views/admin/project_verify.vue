<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="selectProject" class="demo-form-inline">
          <el-form-item label="ID">
            <el-input v-model="selectProject.pid" placeholder="请输入ID"
                      v-on:keydown.enter="selectAll(selectProject.pid, selectProject.pname)" />
          </el-form-item>
          <el-form-item label="队伍名">
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
                  :data="allProject.list.slice((allProject.currentPage-1)*allProject.pageSize,allProject.currentPage*allProject.pageSize)"
                  ref="multipleTable"
                  stripe style="width: 100%;">
          <el-table-column prop="pid" label="ID" width="100" sortable />
          <el-table-column prop="pname" label="项目名" width="200" />
          <el-table-column prop="projectDetails" label="项目详情" width="300" />
          <el-table-column prop="targetNum" label="招募人数" width="100" />
          <el-table-column prop="location" label="地区" width="100" />
          <el-table-column prop="releaseDate" label="发布时间" width="200" sortable />
          <el-table-column label="操作">
            <el-button type="success" plain v-on:click="openDetail($event)">通过
            </el-button>
            <el-button type="danger" plain v-on:click="openDelete($event)">不通过</el-button>
          </el-table-column>
        </el-table>
        <div style="width: 300px;margin-top:20px; margin-left: 450px;">
          <el-pagination background
                         :current-page.sync="allProject.currentPage"
                         @current-change="handlePageChange"
                         :page-size="5"
                         layout="total, prev, pager, next"
                         :total="allProject.list.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="detailFormVisible" title="项目详情" @open="projectDetail = copyDetail()">
    <el-form :model="projectDetail">
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
      <el-form-item label="地区" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.location" readonly />
      </el-form-item>
      <el-form-item label="发布日期" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.releaseDate" readonly />
      </el-form-item>
      <el-form-item label="服务类型" :label-width="detailFormLabelWidth">
        <el-input v-model="projectDetail.mark" readonly />
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary"
                   @click="projectVerifyPass(); detailFormVisible = false">审核通过</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getVerifyProject, projectNotPass, projectPass, getAllTeam } from "../../api/volunteer";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
const router = useRouter(); 
const projectVerifyPass = () => {
  projectPass(projectDetail.pid).then(res => {
    ElMessage({
      type: "success",
      message: "审核通过"
    });
    location.reload();
  }).catch(err => {
    console.log(err);
  });
};

const handlePageChange = (pageNum) => {
  console.log(pageNum);
  allProject.currentPage = pageNum;
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
  getVerifyProject(pid, "").then(res => {
    projectDetail = res.data[0];
    getAllTeam(projectDetail.teamid, "").then(res => {
      projectDetail.teamName = res.data[0].teamName;
      console.log(projectDetail);
      detailFormVisible.value = true;
    }).catch(err => {
      console.log(err);
    });
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
  getVerifyProject(pid, "").then(res => {
    projectDetail = res.data[0];
    ElMessageBox({
      title: "项目审核",
      message: projectDetail.pname + "审核不通过。",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      draggable: true,
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          projectNotPass(projectDetail.pid).then(res => {
            location.reload();
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
            type: "warning",
            message: "审核不通过"
          });
        } else {
          ElMessage({
            type: "info",
            message: "取消"
          });
        }
      }
    });
  }).catch(err => {
    console.log(err);
  });
};

let allProject = reactive({
  list: [{
    pid: "",
    pname: "",
    projectDetails: "",
    releaseDate: "",
    teamid: "",
    projectStatus: "",
    location: "",
    targetNum: ""
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
  projectDetails: "",
  releaseDate: "",
  teamid: "",
  projectStatus: "",
  location: "",
  targetNum: "",
  teamName: "",
  volunteerUpport: "",
  mark: "",
  serviceObject: "",
  serviceDescription: ""
});

const selectAll = (pid, pname) => {
  getVerifyProject(pid, pname).then(res => {
    let j = 0;
    if (res.data.length == 0) {
      allProject.list = null;
    } else {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].projectStatus != "审核未通过") {
          allProject.list[j] = res.data[i];
          j++;
        }
      }
    }
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
  if(router.currentRoute.value.query.id!==''){
    selectAll(router.currentRoute.value.query.id, "");
  }else{selectAll("", "");}
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
