//用户相关
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user.ts'
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
        this.token = resp.data as string
        SET_TOKEN(resp.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.data))
      }
    },

    async getuserInfo() {
      const resp: respUserInfoData = await reqUserInfo()
      console.log('getuserInfo', resp)
      if (resp.code === 200) {
        this.userInfo = resp.data as userInfoData
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.message))
      }
    },

    async logout() {
      const resp: any = await reqLogout()
      if (resp.code === 200) {
        this.token = null
        this.userInfo = null
        sessionStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(resp.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
