<script setup lang="ts">
import { ref, reactive } from 'vue'
const $emit = defineEmits(['changeSence'])
const spuForm = reactive({
  spuName: '',
  tmId: null,
  description: '',
})

const spuCancel = () => {
  $emit('changeSence', 0)
}
</script>
<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input v-model="spuForm.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" prop="tmId">
      <el-select v-model="spuForm.tmId">
        <el-option label="OPPO" :value="1"></el-option>
        <el-option label="华为" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" prop="description">
      <el-input
        v-model="spuForm.description"
        :rows="4"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <div style="width: 100%">
        <el-select></el-select>
        <el-button icon="Plus" type="primary" style="margin-left: 8px">
          添加销售属性
        </el-button>
        <!-- <div> -->
        <el-table border style="margin: 8px 0">
          <el-table-column label="序号" width="80px"></el-table-column>
          <el-table-column label="属性名"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- </div> -->
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="spuCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
