<script setup lang="ts">
import { ref, reactive, watch, nextTick, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAttrList, saveAttrInfo, deleteAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'

const cateGoryState = useCategoryStore()
let loading = ref(false)
let attrList = ref([])
let senceFlag = ref<boolean>(true) //ture为显示列表
const inputArr = ref<any>([])

let attrParam = reactive<any>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

watch(
  () => cateGoryState.c3Id,
  () => {
    attrList.value = []
    if (!cateGoryState.c3Id) return
    getAttrInfoList()
  },
)

const getAttrInfoList = async () => {
  loading.value = true
  attrList.value = []
  const { c1Id, c2Id, c3Id } = cateGoryState
  try {
    const resp: any = await getAttrList(
      c1Id as number,
      c2Id as number,
      c3Id as number,
    )
    if (resp.code === 200) {
      attrList.value = resp.data
    }
  } finally {
    loading.value = false
  }
  // console.log(attrList.value)
}

const confirmDel = async (id: number) => {
  const resp = await deleteAttr(id)
  if (resp.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    getAttrInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}

/** 列表页面add按钮事件 */
const onAdd = () => {
  Object.assign(attrParam, {
    attrName: '',
    attrValueList: [],
    categoryId: cateGoryState.c3Id,
    categoryLevel: 3,
  })
  senceFlag.value = false
}

const onEdit = (row: any) => {
  Object.assign(attrParam, JSON.parse(JSON.stringify(row)))
  senceFlag.value = false
}

const addAttr = () => {
  attrParam.attrValueList.push({ valueName: '', isFocus: true })
  nextTick(() => {
    inputArr.value[attrParam.attrValueList.length - 1].focus()
  })
}

const editAttr = (row: any, $index: number) => {
  row.isFocus = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const iptBlur = (row: any, $index: number) => {
  if (!row.valueName.trim()) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    attrParam.attrValueList.splice($index, 1)
    return
  }
  row.isFocus = false
}

const delList = (idx: number) => {
  attrParam.attrValueList.splice(idx, 1)
}

const saveAttr = async () => {
  const resp = await saveAttrInfo(attrParam)
  if (resp.code === 200) {
    ElMessage({
      type: 'success',
      message: '新增成功！',
    })
    senceFlag.value = true
    getAttrInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: '新增失败！',
    })
  }
}

const cancel = () => {
  senceFlag.value = true
}
</script>
<template>
  <div>
    <Category />
    <el-card style="margin-top: 15px">
      <div v-show="senceFlag">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!cateGoryState.c3Id || loading"
          @click="onAdd"
        >
          新增属性
        </el-button>
        <el-table
          :data="attrList"
          border
          style="margin: 15px 0"
          v-loading="loading"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="200px"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="attrValueList">
            <template #default="{ row }">
              <el-tag
                v-for="tag in row.attrValueList"
                :key="tag"
                class="mx-1"
                :disable-transitions="false"
                style="margin-right: 6px"
              >
                {{ tag.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240px">
            <template #default="{ row }">
              <el-button type="primary" icon="Edit" @click="onEdit(row)">
                编辑
              </el-button>
              <!-- <el-button type="danger" icon="Delete">删除</el-button> -->
              <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="InfoFilled"
                icon-color="#626AEF"
                :title="`确定删除${row.attrName}?`"
                @confirm="confirmDel(row.id)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!senceFlag">
        <el-form :inline="true">
          <el-form-item label="新增属性名称">
            <el-input
              v-model="attrParam.attrName"
              :disabled="attrParam.attrValueList.length"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!attrParam.attrName"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table border :data="attrParam.attrValueList" style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            width="100px"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <el-input
                v-show="row.isFocus"
                v-model="row.valueName"
                :ref="(vc: any) => (inputArr[$index] = vc)"
                @blur="iptBlur(row, $index)"
              ></el-input>
              <div v-show="!row.isFocus" @click="editAttr(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button @click="delList($index)" icon="Delete" type="danger">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="Plus" @click="saveAttr">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
