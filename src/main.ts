import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
//svg插件需要的配置项
import 'virtual:svg-icons-register'
import globalComp from '@/components/index.ts'
import router from './router'
import pinia from './store'
import App from '@/App.vue'
// import axios from "axios";

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComp)
app.use(router)
app.use(pinia)

app.mount('#app')

// console.log(import.meta.env);

// axios.post<
