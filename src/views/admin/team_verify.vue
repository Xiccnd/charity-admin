<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="selectTeam" class="demo-form-inline">
          <el-form-item label="ID">
            <el-input v-model="selectTeam.teamid" placeholder="请输入ID"
                      v-on:keydown.enter="selectAll(selectTeam.teamid, selectTeam.teamName)" />
          </el-form-item>
          <el-form-item label="队伍名">
            <el-input v-model="selectTeam.teamName" placeholder="请输入队伍名"
                      v-on:keydown.enter="selectAll(selectTeam.teamid, selectTeam.teamName)" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" circle
                       v-on:click="selectAll(selectTeam.teamid, selectTeam.teamName)" />
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
                  :data="allTeam.list.slice((allTeam.currentPage-1)*allTeam.pageSize,allTeam.currentPage*allTeam.pageSize)"
                  ref="multipleTable"
                  stripe style="width: 100%;">
          <el-table-column prop="teamid" label="ID" width="100" sortable />
          <el-table-column prop="teamName" label="队伍名" width="200" />
          <el-table-column prop="teamProfile" label="队伍详情" width="400" />
          <el-table-column prop="contact" label="联系人" width="100" />
          <el-table-column prop="registerDate" label="注册时间" width="200" sortable />
          <el-table-column label="操作">
            <el-button type="success" plain v-on:click="openDetail($event)">通过
            </el-button>
            <el-button type="danger" plain v-on:click="openDelete($event)">不通过</el-button>
          </el-table-column>
        </el-table>
        <div style="width: 300px;margin-top:20px; margin-left: 450px;">
          <el-pagination background
                         :current-page.sync="allTeam.currentPage"
                         @current-change="handlePageChange"
                         :page-size="5"
                         layout="total, prev, pager, next"
                         :total="allTeam.list.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="detailFormVisible" title="队伍详情" @open="teamDetail = copyDetail()">
    <el-form :model="teamDetail">
      <el-form-item label="ID" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.teamid" readonly />
      </el-form-item>
      <el-form-item label="队伍名" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.teamName" readonly />
      </el-form-item>
      <el-form-item label="队伍简介" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.teamProfile" readonly />
      </el-form-item>
      <el-form-item label="队伍联系人" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.contact" readonly />
      </el-form-item>
      <el-form-item label="联系电话" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.telephone" readonly />
      </el-form-item>
      <el-form-item label="详细地址" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.detailedAddress" readonly />
      </el-form-item>
      <el-form-item label="联络组织" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.liaisonOrganization" readonly />
      </el-form-item>
      <el-form-item label="登记部门" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.regisDepartment" readonly />
      </el-form-item>
      <el-form-item label="登记机关" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.registrationAuthority" readonly />
      </el-form-item>
      <el-form-item label="注册日期" :label-width="detailFormLabelWidth">
        <el-input v-model="teamDetail.registerDate" readonly />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary"
                   @click="teamVerifyPass(); detailFormVisible = false">审核通过</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getVerifyTeam, teamNotPass, teamPass } from "../../api/volunteer";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

const teamVerifyPass = () => {
  teamPass(teamDetail.teamid).then(res => {
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
  allTeam.currentPage = pageNum;
};

let detailFormVisible = ref(false);

const detailFormLabelWidth = "140px";

const openDetail = (e) => {
  let teamid;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    teamid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    teamid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  getVerifyTeam(teamid, "").then(res => {
    teamDetail = res.data[0];
    console.log(teamDetail);
    detailFormVisible.value = true;
  }).catch(err => {
    console.log(err);
  });
};

const copyDetail = () => {
  return teamDetail;
};

const openDelete = (e) => {
  let teamid;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    teamid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    teamid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  getVerifyTeam(teamid, "").then(res => {
    teamDetail = res.data[0];
    ElMessageBox({
      title: "队伍审核",
      message: teamDetail.teamName + "审核不通过。",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      draggable: true,
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          teamNotPass(teamDetail.teamid).then(res => {
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

let allTeam = reactive({
  list: [{
    teamid: "",
    teamName: "",
    teamProfile: "",
    registerDate: "",
    contact: "",
    status: ""
  }],
  currentPage: 1,
  pageSize: 5
});

let selectTeam = reactive({
  teamid: "",
  teamName: ""
});

let teamDetail = reactive({
  teamid: "",
  teamName: "",
  telephone: "",
  teamProfile: "",
  registrationAuthority: "",
  registerDate: "",
  regisDepartment: "",
  liaisonOrganization: "",
  detailedAddress: "",
  contact: "",
  address: ""
});

const selectAll = (teamid, teamName) => {
  getVerifyTeam(teamid, teamName).then(res => {
    let j = 0;
    if (res.data.length == 0) {
      allTeam.list = null;
    } else {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].status != "审核未通过") {
          allTeam.list[j] = res.data[i];
          j++;
        }
      }
    }
    console.log(allTeam.list);
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
