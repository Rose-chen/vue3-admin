interface loginFormData {
  username: string
  password: string
}

interface respData {
  token?: string
  message?: string
}

interface respLoginData {
  code: number
  data: respData
}

interface userInfoData {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface respUserInfoData {
  code: number
  data?: userInfoData | null
  message?: string
}

export type { loginFormData, respLoginData, userInfoData, respUserInfoData }
