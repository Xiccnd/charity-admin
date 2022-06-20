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
          :data="tableDatalist.list.slice((tableDatalist.currentPage-1)*tableDatalist.pageSize,tableDatalist.currentPage*tableDatalist.pageSize)" ref="multipleTable"
          stripe style="width: 100%;" >
              <el-table-column prop="id" label="ID" width="70"/>
              <el-table-column prop="name" label="姓名" width="100" />
               <el-table-column prop="telephone" label="手机" width="170"/>
                 <el-table-column prop="sex" label="性别" width="70" />
                  <el-table-column prop="nativeplace" label="居住地" width="170" />
                   <el-table-column prop="joinTime" label="申请时间" width="210" />
                   <el-table-column prop="mark" label="申请内容" width="150">
                    <template v-slot="scope">
                      <span v-if="scope.row.mark== -1">
                          退出申请
                      </span>
                      <span v-if="scope.row.mark== 0">
                          加入申请
                      </span>
                   </template>
                   </el-table-column>
                <el-table-column prop="list.operate" label="操作" >
            <template #default="scope">
              <el-button link type="danger" size="small" @click="refusevo($event,scope.row)">拒绝</el-button>
              <el-button link type="success" size="small" @click="agreevo($event,scope.row)">同意</el-button>
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

  import { ref,reactive} from 'vue';
  import { CountTo } from 'vue3-count-to';
  import { getTeamid} from '@/utils/accessToken';
  import Echarts from '@/components/Echarts/index.vue';
  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';
  import { getResouceList } from '@/api/index';
  import { useStore } from 'vuex';
  import { method } from 'lodash-unified';
  import { useRouter } from "vue-router";
  import { cencortableData,censorsearch,refuse,agree,refusequit,agreequit} from '@/api/volunteer';
  const router = useRouter(); 
  let multipleTable =ref(null)



const tableRowClassName=({row, rowIndex}) =>{
    row.row_index = rowIndex;
}
const formInline = reactive({
  name: "",
  id: ""
});

const tableDatalist = reactive({

     currentRowIndex:1,
     pageSize:3,
     currentPage:1,
     teamid:getTeamid(),
     id:1,
     list:[{
              id:'',  
              telephone: '',
              name: '',
              sex:'',
              nativeplace: '',
              joinTime:'',
              mark:''
     },
     
     ]
    
})

const onSubmit = () => {
  console.log(tableDatalist.teamid + formInline.id + formInline.name);
  censorsearch(tableDatalist.teamid, formInline.id, formInline.name).then(res => {
    console.log(tableDatalist.teamid + formInline.id + formInline.name);
    tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
};

const agreevo = (e) => {
  var vid = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  let opstatus;
  if (vid != "" && vid != null)
    {opstatus = e.target.parentElement.parentElement.parentElement.children[6].innerText;
    }else {
    opstatus = e.target.parentElement.parentElement.parentElement.parentElement.children[6].innerText
    vid = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
if(opstatus == "加入申请"){
 if (window.confirm("是否同意其加入队伍") == true) {
    agree(vid, tableDatalist.teamid).then(res => {
      selectAll();
    })
      .catch(err => {
        console.error(err);
      });
    alert("操作成功");
  } else {
    console.log("你取消了操作");
  }
}else if(opstatus == "退出申请"){
if (window.confirm("是否同意其退出队伍") == true) {
    agreequit(vid, tableDatalist.teamid).then(res => {
      selectAll();
    })
      .catch(err => {
        console.error(err);
      });
    alert("操作成功");
  } else {
    console.log("你取消了操作");
  }
}
 

};
const selectAll = (id) => {
  cencortableData(tableDatalist.teamid,id).then(res => {
    tableDatalist.list = res.data;
  })
    .catch(err => {
      console.error(err);
    });
};
const handlePageChange = (pageNum) => {
  tableDatalist.currentPage = pageNum;
};
onMounted(() => {
  
  if(router.currentRoute.value.query.id!==undefined&&router.currentRoute.value.query.id!==''){
     censorsearch(tableDatalist.teamid,router.currentRoute.value.query.id).then(res => {
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
