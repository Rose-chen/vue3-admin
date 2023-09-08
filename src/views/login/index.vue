<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { reqLogin, reqUserInfo } from '@/api/user.ts'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getTime } from '@/utils/times.ts'
let userStore = useUserStore()
console.log(userStore)

let $router = useRouter()
let $route = useRoute()

interface RuleForm {
  username: string
  password: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length > 4) {
    callback()
  } else {
    callback(new Error('账号长度不少于5位数'))
  }
}

const rules = reactive<FormRules>({
  username: [
    // {
    //   required: true,
    //   message: '请输入用户名',
    //   trigger: 'blur',
    // },
    // {
    //   min: 5,
    //   max: 15,
    //   message: '用户名不得少于5个字符',
    //   trigger: 'change',
    // },
    { validator: validateUsername, trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})

const formSize = ref('default')
const loading = ref(false)

const loginSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.userLogin(ruleForm)
        const query: any = $route.query
        // console.log(query)
        $router.push(query.redirect || '/home')
        ElMessage({
          message: `登录成功,${getTime()}好`,
          type: 'success',
        })
        userStore.getuserInfo()
      } catch (error) {
        console.log(error)
        ElMessage({
          message: (error as Error).message,
          type: 'error',
        })
      }
      loading.value = false
    } else {
      console.log('error', fields)
    }
  })
}

const loginReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="login-container">
    <el-row :gutter="20">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="loginSubmit(ruleFormRef)"
            >
              Create
            </el-button>
            <el-button @click="loginReset(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
