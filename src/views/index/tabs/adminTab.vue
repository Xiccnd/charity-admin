<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="待审核项目" name="first">
      <el-table :data="tableData2 " style="width: 100%" max-height="250" >
        <el-table-column sortable fixed prop="pid" label="项目id" width="150" />
        <el-table-column prop="pname" label="项目名称" width="120" />
        <el-table-column prop="postName" label="申请人" width="200" />
        <el-table-column prop="location" label="区域" width="350" />
        <el-table-column sortable prop="state" label="项目状态" width="200" />
         <el-table-column fixed="right" label="Operations" width="137">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="btnClick('project_verify',$event)"
            >详情
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="待审核队伍" name="second">
      <el-table :data="tableData" style="width: 100%" max-height="250">
         <el-table-column sortable prop="teamid" label="ID" width="242.8" />
          <el-table-column prop="teamName" label="队伍名" width="242.8" />
          <el-table-column prop="teamProfile" label="队伍详情" width="242.8" />
          <el-table-column prop="contact" label="联系人" width="242.8" />
        <el-table-column fixed="right" label="操作" width="242.8">
          <template #default>
              <el-button link type="primary" size="small" @click="btnClick('team_verify',$event)"
              >详情
              </el-button
              >
          </template>
        </el-table-column>
      </el-table>


    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref ,watch,reactive} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from "vue-router";
const activeName = ref('first')
const router = useRouter(); 

const handleClick = (tab: TabsPaneContext, event: Event) => {
}
const btnClick = (index,e) => {
  let id;
  if (e.target.toString() == "[object HTMLSpanElement]") {
    id = e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  } else {
    id = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.innerText;
  }
  router.push({path:index,query:{id}});
};
const props = defineProps({
  tableData: { 
    type: Object, 
    default: () => [] 
    },
  tableData2: { 
    type: Object, 
    default: () => [] 
    }
})

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
