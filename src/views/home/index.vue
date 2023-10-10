<script setup lang="ts">
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <el-card>
    <img
      :src="userStore.userInfo && userStore.userInfo.avatar"
      :style="{
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        margin: '0 10px',
      }"
    />
    <h1>欢迎回来 {{ userStore.userInfo && userStore.userInfo.name }}</h1>
  </el-card>
</template>

<style lang="scss" scoped>
// .home {
//   color: $base-color;
// }
:deep .el-card__body {
  padding: 20px;
  display: flex;
  align-items: center;
  img {
    margin-right: 20px;
  }
}
</style>
