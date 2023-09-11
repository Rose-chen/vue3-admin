import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.ts'
import useUserStore from '@/store/modules/user.ts'
import nprogress from 'nprogress'
import setting from '@/setting'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const userStore = useUserStore()
  const token: string | null = userStore.token
  const userInfo = userStore.userInfo
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (userInfo) {
        next()
      } else {
        try {
          await userStore.getuserInfo()
          next({ ...to })
        } catch {
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
      // next()
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to: any, from: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.done()
})

export default router
