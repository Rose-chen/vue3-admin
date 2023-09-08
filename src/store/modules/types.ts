import type { RouteRecordRaw } from 'vue-router'
import type { userInfoData } from '@/api/types.ts'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userInfo: userInfoData | null
}
