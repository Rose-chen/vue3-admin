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
<script lang="ts">
export default {
  name: 'Login',
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="login_form"
          status-icon
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item label="" prop="username">
            <el-input prefix-icon="User" v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              prefix-icon="Lock"
              v-model="ruleForm.password"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login_btn"
              @click="loginSubmit(ruleFormRef)"
            >
              登录
            </el-button>
            <!-- <el-button @click="loginReset(ruleFormRef)">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
