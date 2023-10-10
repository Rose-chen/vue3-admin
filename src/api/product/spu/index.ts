import request from '@/utils/request'

enum API {
  /** 获取SPU列表 */
  SPU_LIST_URL = '/admin-api/admin/product/',
  /** */
  TRADEMARK_LIST_URL = '/admin-api/admin/product/baseTrademark/getTrademarkList',
  /**获取某个SPU下的全部的售卖商品的图片数据 */
  IMAGE_URL = '/admin/product/spuImageList/',
  /**获取某一个SPU下全部的已有的销售属性接口地址 */
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  /**获取整个项目全部的销售属性[颜色、版本、尺码] */
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}

export const getSpuProductList = (id: number, page: number, pageSize: number) =>
  request.get<any, any>(
    `${API.SPU_LIST_URL}${page}/${pageSize}?category3Id=${id}`,
  )

export const getTrademarkList = () =>
  request.get<any, any>(API.TRADEMARK_LIST_URL)

export const getSpuImageList = (spuId: number) => {
  request.get<any, any>(API.IMAGE_URL + spuId)
}

export const reqAllSaleAttr = () => request.get<any, any>(API.ALLSALEATTR_URL)
