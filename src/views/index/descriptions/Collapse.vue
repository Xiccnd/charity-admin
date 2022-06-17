<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template #title>
          <div class="title">队伍简介</div>
        </template>
        <div class="narrative">
          {{ info.teamProfile }}
        </div>

      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};
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
.title {
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 700;
}

.narrative {
  font-size: 15px;
  color: var(--el-text-color-primary);
}
</style>
