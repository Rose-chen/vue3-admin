<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'

const categoryState = useCategoryStore()

onMounted(() => {
  categoryState.getC1List()
})

const getCategory2List = () => {
  categoryState.c2Id = ''
  categoryState.c3Id = ''
  categoryState.c3List = []
  categoryState.getC2List()
}

const getCategory3List = () => {
  categoryState.c3Id = ''
  categoryState.getC3List()
}

onBeforeUnmount(() => {
  categoryState.$reset()
})
</script>
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryState.c1Id" @change="getCategory2List">
          <el-option
            v-for="(item, i) in categoryState.c1List"
            :key="i"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryState.c2Id"
          :disabled="!categoryState.c1Id"
          @change="getCategory3List"
        >
          <el-option
            v-for="(item, i) in categoryState.c2List"
            :key="i"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryState.c3Id" :disabled="!categoryState.c2Id">
          <el-option
            v-for="(item, i) in categoryState.c3List"
            :key="i"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
