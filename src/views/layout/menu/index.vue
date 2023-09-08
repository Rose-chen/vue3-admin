<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
defineProps(['menuList'])
// console.log(menuList)
// const isCollapse = ref(true)
const $router = useRouter()
const goRoute = (item: any) => {
  console.log(item)
  $router.push(item.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<template>
  <template v-for="(item, i) in menuList">
    <template v-if="!item.children">
      <el-menu-item
        :key="i"
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <template #title>
          <!-- <span>标&nbsp;</span> -->
          <el-icon :size="20">
            <component :is="item.meta && item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :key="i"
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :key="i" :index="item.path" v-if="!item.meta.hidden">
        <template #title>
          <el-icon :size="20">
            <component :is="item.meta && item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<style lang="scss" scoped></style>
