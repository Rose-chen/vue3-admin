import { defineStore } from 'pinia'
import { CategoryState } from './types.ts'
import { RespCategoryData } from '@/api/product/attr/types.ts'
import { getCategory1, getCategory2, getCategory3 } from '@/api/product/attr'

const useCategoryStore = defineStore('category', {
  state: (): CategoryState => {
    return {
      c1Id: '',
      c2Id: '',
      c3Id: '',
      c1List: [],
      c2List: [],
      c3List: [],
    }
  },
  actions: {
    async getC1List() {
      const resp: RespCategoryData = await getCategory1()
      if (resp.code === 200) {
        this.c1List = resp.data
      }
    },
    async getC2List() {
      const resp: RespCategoryData = await getCategory2(this.c1Id)
      if (resp.code === 200) {
        this.c2List = resp.data
      }
    },
    async getC3List() {
      const resp: RespCategoryData = await getCategory3(this.c2Id)
      if (resp.code === 200) {
        this.c3List = resp.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
