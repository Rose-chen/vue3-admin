import request from '@/utils/request'

import type { loginFormData, respLoginData, respUserInfoData } from './types'

enum API {
  LOGIN_URL = '/api/admin/acl/index/login',
  USERINFO_URL = '/api/admin/acl/index/info',
  LOGOUT_URL = '/api/admin/acl/index/logout',
}

export const reqLogin = (data: loginFormData) =>
  request.post<any, respLoginData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<any, respUserInfoData>(API.USERINFO_URL)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
