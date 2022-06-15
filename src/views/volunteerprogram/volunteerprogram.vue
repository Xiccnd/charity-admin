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
                 @close="resetForm('form')"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false">
        <el-form :model="form" ref="refform">
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,submitpro()">
        提交</el-button>
      </span>
        </template>
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
          <el-table-column prop="pid" label="项目ID" width="70" />
          <el-table-column prop="pname" label="项目名称" width="170" />
          <el-table-column prop="location" label="项目地点" width="180" />
          <el-table-column prop="releaseDate" label="发布日期" width="170" />
          <el-table-column prop="recruitDate" label="招募日期" width="170" />
          <el-table-column prop="projectDate" label="项目日期" width="170" />
          <el-table-column prop="statusName" label="项目状态" width="80" />
          <el-table-column prop="list.operate" label="操作">
            <template #default>
              <el-button link type="danger" size="small" @click="handleClick($event)">踢出</el-button>
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
import { ref, computed, reactive, onBeforeMount } from "vue";
import { CountTo } from "vue3-count-to";
import addform from "@/components/program/index.vue";
import packpage from "../../../package.json";
import { useI18n } from "vue-i18n";
import { getResouceList } from "@/api/index";
import { useStore } from "vuex";
import { method } from "lodash-unified";
import { tableData, search } from "@/api/program";
import { ElMessage, ElMessageBox } from "element-plus";

const dialogFormVisible = ref(false);
const refform = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});
const submitpro = () => {
  console.log(form.name);


};
const resetForm = () => {
  Object.keys(form).map(key => {
    delete form[key];
  });
};

const formInline = reactive({
  name: "",
  id: ""
});

const tableDatalist = reactive({
  currentRowIndex: 1,
  pageSize: 3,
  currentPage: 1,
  teamid: 1,
  id: 1,
  list: [{
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
});
</script>
<style lang="scss" scoped>
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
