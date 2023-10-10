<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import type {
//   productListData,
//   respProductListData,
// } from '@/api/produce/tradmark/types'
// import { reqTrademarkList, reqTrademarkRemove } from '@/api/product/tradmark'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/tradmark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/tradmark/types'
import Dialog from './dialog.vue'

let loading = ref<boolean>(false)
let currentPage = ref<number>(1)
let pageSize = ref<number>(7)
let total = ref<number>(123)
const tableData = ref<Records>([])

let dialogShow = ref<boolean>(false)
let info = ref()

const handleSizeChange = () => {
  getTradmarkList()
}

const getTradmarkList = async (pager = 1) => {
  loading.value = true
  currentPage.value = pager
  try {
    const resp: TradeMarkResponseData = await reqHasTrademark(
      currentPage.value,
      pageSize.value,
    )
    if (resp.code === 200) {
      tableData.value = resp.data.records
      total.value = resp.data.total
    }
  } finally {
    loading.value = false
  }
}

const add = () => {
  info.value = null
  dialogShow.value = true
}

const editRow = (row: TradeMark) => {
  info.value = row
  dialogShow.value = true
}

const delRow = async (id: number) => {
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    let resp = await reqDeleteTrademark(id)
    if (resp.code === 200) {
      getTradmarkList(
        tableData.value.length > 1 ? currentPage.value : currentPage.value - 1,
      )
      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败！',
      })
    }
  })
}

// const changeVisable = (flag: boolean) => {
//   dialogShow.value = flag
// }

onMounted(async () => {
  getTradmarkList()
})
</script>
<template>
  <el-card class="box-card">
    <el-button type="primary" icon="plus" @click="add">新增品牌</el-button>
    <el-table
      border
      :data="tableData"
      v-loading="loading"
      style="margin: 10px 0"
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="100"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName">
        <!-- <template #default="scope">
          <span>{{ scope.row.tmName }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="品牌logo" prop="logoUrl">
        <template #default="scope">
          <img style="height: 80px" :src="scope.row.logoUrl" />
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="240">
        <template #="{ row, $index }">
          <el-button type="primary" icon="Edit" @click="editRow(row)">
            编辑
          </el-button>
          <el-button type="danger" icon="Delete" @click="delRow(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[7, 10, 20, 300, 400]"
      :small="false"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="getTradmarkList"
    />
  </el-card>
  <Dialog
    v-model:dialogShow="dialogShow"
    :info="info"
    @update="getTradmarkList"
  ></Dialog>
</template>

<style lang="scss" scoped></style>
