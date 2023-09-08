<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
// console.log($route.matched)
const logout = () => {
  userStore.logout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>
<template>
  <div class="tabbar-container">
    <div class="left">
      <el-icon size="20px" @click="changeIcon">
        <component
          :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, i) in $route.matched"
          :key="i"
          :to="item.path"
          v-show="item.meta.title"
        >
          <el-icon
            size="16px"
            @click="changeIcon"
            style="vertical-align: middle"
          >
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button icon="Refresh" circle @click="updateRefresh" />
      <el-button icon="FullScreen" circle />
      <el-button icon="Operation" circle />
      <img
        :src="userStore.userInfo && userStore.userInfo.avatar"
        :style="{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          margin: '0 10px',
        }"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo && userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background: linear-gradient(90deg, #f3f3f3, #eee5e5, #e6d7d7);
  .left {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 10px;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
}
</style>
