interface loginFormData {
  username: string
  password: string
}

//返回值公共数据
interface respData {
  code: number
  message: string
  ok: boolean
}

interface respLoginData extends respData {
  data: string
}

interface userInfoData {
  name: string
  avatar: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface respUserInfoData extends respData {
  data?: userInfoData | null
}

export type { loginFormData, respLoginData, userInfoData, respUserInfoData }
