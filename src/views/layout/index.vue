<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
// const userStore = useUserStore()

import Logo from './logo/index.vue'
import Menu from './menu//index.vue'
import Tabbar from './tabbar/index.vue'
let copmKey = ref(Math.random())
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

const $route = useRoute()
console.log($route)

watch(
  () => layoutSettingStore.refresh,
  () => {
    copmKey.value = Math.random()
  },
)
</script>
<template>
  <div class="layout-container">
    <div class="layout-slider" :class="layoutSettingStore.fold ? 'fold' : ''">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#001529"
          text-color="#fff"
          active-text-color="yellowGreen"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-tabbar" :class="layoutSettingStore.fold ? 'fold' : ''">
      <Tabbar></Tabbar>
    </div>
    <div class="layout-main" :class="layoutSettingStore.fold ? 'fold' : ''">
      <!-- <Transition name="fade">
        <router-view></router-view>
      </Transition> -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" :key="copmKey" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: $slider-left-width;
    height: 100vh;
    color: white;
    background-color: $slider-left-color;
    transition: all 0.3s;

    &.fold {
      width: $slider-left-min-width;
    }

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none 0;
      }
    }
  }
  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $slider-left-width;
    width: calc(100% - $slider-left-width);
    height: $slider-bar-height;
    background-color: rgb(196, 231, 255);
    transition: all 0.3s;

    &.fold {
      left: $slider-left-min-width;
      width: calc(100% - $slider-left-min-width);
    }
  }

  .layout-main {
    position: absolute;
    top: $slider-bar-height;
    left: $slider-left-width;
    width: calc(100% - $slider-left-width);
    height: calc(100vh - $slider-bar-height);
    padding: 15px;
    background-color: rgb(238, 251, 255);
    transition: all 0.3s;

    &.fold {
      left: $slider-left-min-width;
      width: calc(100% - $slider-left-min-width);
    }

    & > div {
      height: 100%;
      background: rgba(133, 196, 255, 0.342);
    }
  }
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: transform 0.3s;
// }

// .fade-enter-from,
// .fade-leave-to {
//   transform: scale(0);
// }
</style>
