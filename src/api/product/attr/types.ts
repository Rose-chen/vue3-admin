export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryData {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export interface RespCategoryData extends ResponseData {
  data: CategoryData[]
}

export interface AttrValue {
  id: number | string
  valueName: string
  attrId: number
}

export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface RespAttrList extends ResponseData {
  data: AttrList
}
