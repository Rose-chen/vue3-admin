<script setup lang="ts">
import setting from '@/setting.ts'
console.log(setting)
</script>
<template>
  <div class="login-container" v-if="setting.loginShow">
    <img :src="setting.logo" />
    <div class="title">{{ setting.title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: $base-logo-title-fontSize;
  img {
    height: 40px;
    margin-right: 10px;
  }
}
</style>
