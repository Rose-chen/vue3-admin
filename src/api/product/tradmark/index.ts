// import request from '@/utils/request'

// // import type { loginFormData, respLoginData, respUserInfoData } from './types'
// import type { productListData, respProductListData } from './types'

// enum API {
//   TRADEMARK_URL = '/admin-api/admin/product/baseTrademark/',
//   TRADEMARK_ADD_URL = '/admin-api/admin/product/baseTrademark/save',
//   TRADEMARK_UPDATE_URL = '/admin-api/admin/product/baseTrademark/update',
//   TRADEMARK_DELETE_URL = '/admin-api/admin/product/baseTrademark/remove/',
// }

// export const reqTrademarkList = (page: number, limit: number) =>
//   request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)

// export const reqTrademarkAdd = (data: any) =>
//   request.post<any, any>(API.TRADEMARK_ADD_URL, data)

// export const reqTrademarkUpdate = (data: any) =>
//   request.put<any, any>(API.TRADEMARK_UPDATE_URL, data)

// export const reqTrademarkRemove = (id: number) =>
//   request.delete<any, any>(API.TRADEMARK_DELETE_URL + `${id}`)

//书写品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './types.ts'
//品牌管理模块接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin-api/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin-api/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin-api/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETE_URL = '/admin-api/admin/product/baseTrademark/remove/',
}
//获取已有品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //修改已有品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
