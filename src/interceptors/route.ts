/**
 * by wxfeiang on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单，看业务需要选哪一个
 * 我这里应为大部分都可以随便进入，所以使用黑名单
 */
import store, { useUserStore } from '@/store'
import { needLoginPages as _needLoginPages, getNeedLoginPages, needLoginFeacePages } from '@/utils'
import { Modal } from '@/utils/uniapi/prompt'

// TODO Check
const loginRoute = '/pages/login/index'
const feaceRouter = '/pages/login/loginsmrz'

const isLogined = () => {
  const userStore = useUserStore()
  return userStore.isLogined
}
const isIdcard = () => {
  const userStore = useUserStore()
  return (
    userStore.userInfo.idCardNumber &&
    userStore.userInfo.cardId &&
    userStore.userInfo.isReal === '1'
  )
}

const isDev = import.meta.env.DEV

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    const path = url.split('?')[0]
    let needLoginPages: string[] = []
    // 为了防止开发时出现BUG，这里每次都获取一下。生产环境可以移到函数外，性能更好
    if (isDev) {
      needLoginPages = getNeedLoginPages()
    } else {
      needLoginPages = _needLoginPages
    }

    const isNeedLogin = needLoginPages.includes(path)

    if (!isNeedLogin) {
      return true
    }
    const hasLogin = isLogined()
    const hasFeace = needLoginFeacePages.includes(path)
    if (hasLogin && !hasFeace) {
      return true
    } else {
      if (!hasLogin) {
        // isRouterCheckd({ url })
        Modal({
          title: '提示',
          content: '您还没有登录,请先登录？',
          showCancel: true,
        }).then((res: any) => {
          if (res.confirm) {
            // 重定向
            const router = loginRoute
            const redirectRoute = `${router}?redirect=${encodeURIComponent(url)}`
            uni.navigateTo({ url: redirectRoute })
          }
        })
      } else if (hasFeace && !isIdcard()) {
        isRouterCheckd({ url, flog: true })
      } else {
        return true
      }

      return false
    }
  },
}

export const isRouterCheckd = (data: {
  url?: string
  flog?: boolean
  showTps?: number
  title?: string
}) => {
  const { url = '', flog = false, title = '', showTps = 2 } = data
  let curl = url
  if (!curl) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    // 获取当前页面的路径
    curl = currentPage.route
  }

  const authStore = useUserStore(store)
  authStore.setShowGlobalDialog(true, { url: curl, flog, showTps, title })
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
  },
}
