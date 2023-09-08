import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('layoutSetting', {
  state: () => {
    return {
      fold: false, //菜单是否展开收起
      refresh: false, //点击tabbar上的刷新按钮
    }
  },
})

export default useLayoutSettingStore
