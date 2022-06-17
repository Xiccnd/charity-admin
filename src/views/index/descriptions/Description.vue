<template>
  <el-descriptions
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="队伍名称">{{ info.teamName }}</el-descriptions-item>
    <el-descriptions-item label="队伍联系人">
      {{ info.contact }}
    </el-descriptions-item>
    <el-descriptions-item label="队伍编号">{{ info.teamid }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ info.telephone }}</el-descriptions-item>
    <el-descriptions-item label="地址">{{ info.address }}</el-descriptions-item>
    <el-descriptions-item label="详细地址"
    >{{ info.detailedAddress }}
    </el-descriptions-item>
    <el-descriptions-item label="加入方式"> 免审加入（需要填写免审密码）</el-descriptions-item>
    <el-descriptions-item label="登记机关">
      {{ info.registrationAuthority }}
    </el-descriptions-item>
    <el-descriptions-item label="登记部门">
      {{ info.regisDepartment }}
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
import { computed, ref, onMounted, toRef, toRefs } from "vue";

const size = ref("");

const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px"
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default
  };
});
const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    },
    required: true
  }
});
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
