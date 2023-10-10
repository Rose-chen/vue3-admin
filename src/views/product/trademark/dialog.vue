<script setup lang="ts">
import { ref, reactive, watch, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
// import { reqTrademarkAdd, reqTrademarkUpdate } from '@/api/product/tradmark'
import { reqAddOrUpdateTrademark } from '@/api/product/tradmark'
let props = defineProps(['dialogShow', 'isAdd', 'info'])
let $emit = defineEmits(['update:dialogShow', 'update'])

let isShow = computed(() => props.dialogShow)

let tradeMarkParam = reactive({
  id: null,
  tmName: '',
  logoUrl: '',
})

const tradeMarkRef = ref()
const rules = reactive({
  tmName: [{ required: true, message: '品牌名称不能为空', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '品牌logo不能为空', trigger: 'change' }],
})

watch(
  () => props.info,
  async (val) => {
    if (props.dialogShow) {
      if (val) {
        tradeMarkParam = { ...props.info }
      } else {
        tradeMarkParam.id = null
        tradeMarkParam.tmName = ''
        tradeMarkParam.logoUrl = ''
        // tradeMarkParam = {
        //   tmName: '',
        //   logoUrl: '',
        // }
        // tradeMarkRef.value?.resetFields()
        // nextTick(() => {
        //   tradeMarkRef.value?.resetFields()
        // })
      }
      // nextTick()
      nextTick()
      console.log(tradeMarkParam)
    }
  },
)

const confirm = async () => {
  // $emit('update:dialogShow', false)
  await tradeMarkRef.value.validate()
  // let resp: any = null
  let resp: any = await reqAddOrUpdateTrademark(tradeMarkParam)
  if (resp.code === 200) {
    cancel()
    ElMessage.success(`${!props.info ? '新增' : '编辑'}成功！`)
    $emit('update')
  } else {
    ElMessage.error(`${!props.info ? '新增' : '编辑'}失败！`)
  }
}

const cancel = () => {
  $emit('update:dialogShow', false)
}

const handlUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log(response)
  tradeMarkParam.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforeUploadUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>
<template>
  <el-dialog
    v-model="isShow"
    :title="`${info ? '编辑' : '新增'}品牌`"
    :close-on-click-modal="false"
    width="800px"
  >
    <el-row v-if="isShow">
      <el-col :span="12">
        <el-form
          :model="tradeMarkParam"
          :rules="rules"
          ref="tradeMarkRef"
          label-width="100px"
        >
          <el-form-item label="品牌名称" prop="tmName">
            <el-input v-model="tradeMarkParam.tmName"></el-input>
          </el-form-item>
          <el-form-item label="品牌Logo" prop="logoUrl">
            <el-upload
              class="avatar-uploader"
              action="/admin-api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handlUploadSuccess"
              :before-upload="beforeUploadUpload"
            >
              <img
                v-if="tradeMarkParam.logoUrl"
                :src="tradeMarkParam.logoUrl"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <!-- <el-input v-model="tradeMarkParam.logoUrl"></el-input> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
