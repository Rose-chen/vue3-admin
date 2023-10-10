// interface respData {
//   code: number
//   message: string
//   ok: boolean
// }

// interface tradeMarkData {
//   id?: number
//   tmName: string
//   logoUrl: string
// }

// interface respProductListData extends respData {
//   data: {
//     records: tradeMarkData[]
//     total: number
//     size: number
//     pages: number
//   }
// }

// export type { tradeMarkData, respProductListData }

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有的品牌的ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[]

//获取的已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
