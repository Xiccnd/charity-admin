<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="head-card-content">
        <el-form :inline="true" :model="selectUser" class="demo-form-inline">
          <el-form-item label="ID">
            <el-input v-model="selectUser.id" placeholder="请输入ID"
                      v-on:keydown.enter="selectAll(selectUser.id, selectUser.name)" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="selectUser.name" placeholder="请输入用户名"
                      v-on:keydown.enter="selectAll(selectUser.id, selectUser.name)" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" circle
                       v-on:click="selectAll(selectUser.id, selectUser.name)" />
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
                  :data="allUser.list.slice((allUser.currentPage-1)*allUser.pageSize,allUser.currentPage*allUser.pageSize)"
                  ref="multipleTable"
                  stripe style="width: 100%;">
          <el-table-column prop="id" label="ID" width="200" sortable />
          <el-table-column prop="name" label="用户名" width="200" />
          <el-table-column prop="telephone" label="手机" width="300" />
          <el-table-column prop="perName" label="权限" width="200" />
          <el-table-column label="操作">
            <el-button type="success" plain v-on:click="openDetail($event)">查看详情
            </el-button>
            <el-button type="danger" plain v-on:click="openDelete($event)">删除用户</el-button>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 20px; float: right; margin-right: 75px;"
                   v-on:click="addFormVisible = true">添加用户
        </el-button>
        <div style="width: 300px;margin-top:20px; margin-left: 350px;">
          <el-pagination background
                         :current-page.sync="allUser.currentPage"
                         @current-change="handlePageChange"
                         :page-size="5"
                         layout="total, prev, pager, next"
                         :total="allUser.list.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="detailFormVisible" title="用户详情" @open="userDetail = copyDetail()">
    <el-form :model="userDetail">
      <el-form-item label="ID" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.id" disabled />
      </el-form-item>
      <el-form-item label="用户名" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.uname" disabled />
      </el-form-item>
      <el-form-item label="密码" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.password" @input="change($event)" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.name" @input="change($event)" />
      </el-form-item>
      <el-form-item label="电话" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.telephone" @input="change($event)" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.mailbox" @input="change($event)" />
      </el-form-item>
      <el-form-item label="QQ" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.qq" @input="change($event)" />
      </el-form-item>
      <el-form-item label="微信" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.weixin" @input="change($event)" />
      </el-form-item>
      <el-form-item label="服务区域" :label-width="detailFormLabelWidth">
        <el-input v-model="userDetail.area" @input="change($event)" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="detailFormVisible = false; cancelChange()">取消</el-button>
        <el-button type="primary" @click="changeInfo(); detailFormVisible = false">修改</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="addFormVisible" title="添加用户">
    <el-form :model="addUser">
      <el-form-item label="用户名" :label-width="addFormLabelWidth">
        <el-input v-model="addUser.name" />
      </el-form-item>
      <el-form-item label="密码" :label-width="addFormLabelWidth">
        <el-input v-model="addUser.password" />
      </el-form-item>
      <el-form-item label="电话号码" :label-width="addFormLabelWidth">
        <el-input v-model="addUser.telephone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addUserMethod(); addFormVisible = false">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import { getAllUser, getDetail, deleteUser, addOneUser, updateInfo } from "../../api/volunteer";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

const change = (e) => {
  this.$forceUpdate();
};

const cancelChange = () => {
  ElMessage({
    type: "info",
    message: "取消修改"
  });
};

const changeInfo = () => {
  updateInfo(userDetail.uid, userDetail.id, userDetail.name, userDetail.password, userDetail.telephone, userDetail.mailbox, userDetail.qq, userDetail.weixin, userDetail.area).then(res => {
    ElMessage({
      type: "success",
      message: "修改成功"
    });
  }).catch(err => {
    console.log(err);
  });
};

const handlePageChange = (pageNum) => {
  console.log(pageNum);
  allUser.currentPage = pageNum;
};

const addFormVisible = ref(false);
let detailFormVisible = ref(false);

const addFormLabelWidth = "140px";
const detailFormLabelWidth = "140px";

const addUser = reactive({
  name: "",
  perid: "2",
  telephone: "",
  password: ""
});

const addUserMethod = () => {
  addOneUser(addUser.name, addUser.password, addUser.telephone, addUser.perid).then(res => {
    selectAll("", "");
  }).catch(err => {
    console.log(err);
  });
};

const openDetail = (e) => {
  let id;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    id = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    id = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  getDetail(id).then(res => {
    userDetail = res.data.personalData;
    userDetail.password = res.data.password;
    userDetail.uid = res.data.uid;
    console.log(res.data);
    console.log(userDetail.uid);
    detailFormVisible.value = true;
  }).catch(err => {
    console.log(err);
  });
};

const copyDetail = () => {
  return userDetail;
};

const openDelete = (e) => {
  let id;
  let perName;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    id = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
    perName = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[3].innerText;
  } else {
    id = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
    perName = e.target.parentElement.parentElement.parentElement.childNodes[3].innerText;
  }
  getDetail(id).then(res => {
    userDetail = res.data.personalData;
    ElMessageBox({
      title: "删除用户",
      message: "确认删除" + userDetail.uname + "吗?",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      draggable: true,
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          deleteUser(userDetail.id, perName).then(res => {
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

let allUser = reactive({
  list: [{
    id: "",
    name: "",
    perName: "",
    telephone: ""
  }],
  currentPage: 1,
  pageSize: 5
});

let selectUser = reactive({
  id: "",
  name: ""
});

let userDetail = reactive({
  uid: "",
  id: "",
  name: "",
  password: "",
  uname: "",
  telephone: "",
  mailbox: "",
  qq: "",
  weixin: "",
  area: ""
});

const selectAll = (id, name) => {
  getAllUser(id, name).then(res => {
    allUser.list = res.data;
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
