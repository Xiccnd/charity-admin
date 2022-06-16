<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="审核项目" name="first">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="137">
          <template #default>
            <el-button link type="primary" size="small" @click="btnClick"
              >Detail</el-button
            >
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="审核人员" name="second">
 
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="150" />
        <el-table-column prop="sex" label="性别" width="120" />
        <el-table-column prop="telephone" label="联系电话" width="120" />
        <el-table-column prop="mailbox" label="邮箱" width="120" />
        <el-table-column prop="address" label="地址" width="350" />
        <el-table-column prop="area" label="区域" width="120" />
        <el-table-column fixed="right" label="Operations" width="137">
          <template #default>
            <el-button link type="primary" size="small" @click="btnClick"
              >Detail</el-button
            >
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table> 

      
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { onMounted, ref ,reactive,toRaw,onBeforeUpdate, onBeforeMount, toRefs} from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Table from './Table.vue'
const activeName = ref('first')


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const btnClick = () => {
  // console.log(tableDatas)
}
const props = defineProps({
  tableData: { 
    type: Object, 
    default: () => [] 
    }
})
onBeforeMount(() => {
  const tableData = props.tableData
});

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>