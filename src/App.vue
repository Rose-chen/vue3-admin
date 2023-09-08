<script setup lang="ts">
// import { Plus, Edit } from "@element-plus/icons-vue";

// import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<template>
  <!-- <el-button type="primary" :icon="Plus" size="default">新增</el-button>
  <el-button type="primary" :icon="Edit" size="small">编辑</el-button>
  <SvgIcon name="home" color="red" width="30px" height="30px"></SvgIcon>
  <Pagintation></Pagintation> -->
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
