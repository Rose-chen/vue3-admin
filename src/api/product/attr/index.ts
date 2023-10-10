import request from '@/utils/request'
import { RespCategoryData, RespAttrList } from './types'

enum API {
  CATEGORY1_URL = '/admin-api/admin/product/getCategory1',
  CATEGORY2_URL = '/admin-api/admin/product/getCategory2/',
  CATEGORY3_URL = '/admin-api/admin/product/getCategory3/',
  ATTR_LIST_URL = '/admin-api/admin/product/attrInfoList/',
  SAVE_INFO_URL = '/admin-api/admin/product/saveAttrInfo',
  DELETE_ATTE_URL = '/admin-api/admin/product/deleteAttr/',
}

export const getCategory1 = () =>
  request.get<any, RespCategoryData>(API.CATEGORY1_URL)

export const getCategory2 = (id: number) =>
  request.get<any, RespCategoryData>(API.CATEGORY2_URL + id)

export const getCategory3 = (id: number) =>
  request.get<any, RespCategoryData>(API.CATEGORY3_URL + id)

export const getAttrList = (id1: number, id2: number, id3: number) =>
  request.get<any, RespAttrList>(API.ATTR_LIST_URL + `${id1}/${id2}/${id3}`)

export const saveAttrInfo = (data: any) =>
  request.post<any, any>(API.SAVE_INFO_URL, data)

export const deleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETE_ATTE_URL + `${id}`)
