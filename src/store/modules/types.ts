import type { RouteRecordRaw } from 'vue-router'
import type { userInfoData } from '@/api/types.ts'
import type { CategoryData } from '@/api/product/attr/types.ts'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userInfo: userInfoData | null
}

export interface CategoryState {
  c1Id: number | string
  c2Id: number | string
  c3Id: number | string
  c1List: CategoryData[]
  c2List: CategoryData[]
  c3List: CategoryData[]
}
