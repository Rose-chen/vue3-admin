<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getSpuProductList } from '@/api/product/spu/index'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
const cateGoryState = useCategoryStore()
let senceFlag = ref<number>(0)
let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
const tableList = ref([])

watch(
  () => cateGoryState.c3Id,
  async () => {
    tableList.value = []
    if (!cateGoryState.c3Id) return
    currentChange()
  },
)

const getSpuList = async () => {
  const resp = await getSpuProductList(
    cateGoryState.c3Id,
    pageNo.value,
    limit.value,
  )
  if (resp.code === 200) {
    tableList.value = resp.data.records
    total.value = resp.data.total
  }
}

const sizeChange = (val) => {
  limit.value = val
  currentChange()
}

const currentChange = (val = 1) => {
  pageNo.value = val
  getSpuList()
}

const addSpu = () => {
  changeSence(1)
}

const EditRow = (row, $index) => {
  console.log(row)
  console.log($index)
}

const changeSence = (type: number) => {
  senceFlag.value = type
}
</script>
<template>
  <div>
    <Category :senceFlag="senceFlag" />
    <el-card style="margin-top: 15px">
      <div v-show="senceFlag === 0">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!cateGoryState.c3Id"
          @click="addSpu"
        >
          新增
        </el-button>
        <el-table :data="tableList" border style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU" prop="spuName"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button
                icon="Plus"
                type="primary"
                @click="EditRow(row, $index)"
              ></el-button>
              <el-button
                icon="Edit"
                type="warning"
                @click="EditRow(row, $index)"
              ></el-button>
              <el-button
                icon="View"
                type="success"
                @click="EditRow(row, $index)"
              ></el-button>
              <el-button
                icon="Delete"
                type="danger"
                @click="EditRow(row, $index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :pager-count="9"
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[10, 20, 50, 100]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
        />
      </div>
      <SpuForm v-show="senceFlag === 1" @changeSence="changeSence"></SpuForm>
      <skuForm v-show="senceFlag === 2"></skuForm>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
