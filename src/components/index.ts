//引入所有全局组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComp = { SvgIcon, Category }
//对外暴露插件对象
export default {
  install(app) {
    // console.log(app)
    // console.log('aaaaaa')
    Object.keys(allGlobalComp).forEach((key: string) => {
      app.component(key, allGlobalComp[key] as any)
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
