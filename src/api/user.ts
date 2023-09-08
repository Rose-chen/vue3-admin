import request from '@/utils/request'

import type { loginFormData, respLoginData, respUserInfoData } from './types'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

export const reqLogin = (data: loginFormData) =>
  request.post<any, respLoginData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<any, respUserInfoData>(API.USERINFO_URL)
