<template>
  <el-descriptions
    title="Vertical list with border"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="队伍名称">kooriookami</el-descriptions-item>
    <el-descriptions-item label="队伍联系人">
      	李兵
    </el-descriptions-item>
    <el-descriptions-item label="队伍编号">18100000000</el-descriptions-item>
    <el-descriptions-item label="手机号">12123131123</el-descriptions-item>
    <el-descriptions-item label="地址">Suzhou</el-descriptions-item>
        <el-descriptions-item label="详细地址"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
    <el-descriptions-item label="加入方式">	免审加入（需要填写免审密码）</el-descriptions-item>
    <el-descriptions-item label="登记机关">
      		北京市密云区渔阳口腔医院
    </el-descriptions-item>
    <el-descriptions-item label="登记部门">
      		北京市密云区渔阳口腔医院
    </el-descriptions-item>
    <el-descriptions-item label="成立日期">
      	2018-05-05
    </el-descriptions-item>
    <el-descriptions-item label="人员规模">
      200
    </el-descriptions-item>
    <el-descriptions-item label="正式成员">
      200
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>