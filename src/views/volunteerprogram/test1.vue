<template>
  <el-button type="primary" @click="handlerDialog"
  >添加用户
  </el-button>
  <test v-model="dialogFormVisible"
        v-if="dialogFormVisible"/>
</template>
 
<script setup>
  import { reactive, ref } from "vue";
  import test from '@/volunteerprogram/test'
 
  const dialogFormVisible = ref(false)
 
  const handlerDialog = () => {
    dialogFormVisible.value = true
  }
</script>
 
<style scoped>
 
</style>