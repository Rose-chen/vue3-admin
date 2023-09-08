//用户相关
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user.ts'
import type {
  loginFormData,
  respLoginData,
  userInfoData,
  respUserInfoData,
} from '@/api/types.ts'
import { UserState } from './types.ts'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
import { constantRoutes } from '@/router/routes.ts'
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      userInfo: null,
    }
  },
  actions: {
    async userLogin(ruleForm: loginFormData) {
      const resp: respLoginData = await reqLogin(ruleForm)
      console.log(resp)
      if (resp.code === 200) {
        this.token = resp.data.token as string
        SET_TOKEN(resp.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.data.message))
      }
    },

    async getuserInfo() {
      const resp: respUserInfoData = await reqUserInfo()
      console.log(resp)
      if (resp.code === 200) {
        this.userInfo = resp.data as userInfoData
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.message))
      }
    },

    logout() {
      this.token = null
      this.userInfo = null
      sessionStorage.removeItem('TOKEN')
    },
  },
  getters: {},
})

export default useUserStore
