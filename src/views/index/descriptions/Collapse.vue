<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
     <el-collapse-item name="1">
        <template #title>
          <div class="title">队伍简介</div>
        </template>
        <div class="narrative">
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div class="narrative">
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
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