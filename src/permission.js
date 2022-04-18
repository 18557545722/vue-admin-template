import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const token = await getToken()
  const token2 = localStorage.getItem('token')
  const token3 = store.getters.token
  console.log('token---', token)
  console.log('token2---', token2)
  console.log('store---', store)
  console.log('token3---', token3)

  // console.log('this.$store.state---', this.$store.state)
  // console.log('this.$store.state---', store.getters.token)

  console.log('to.path---', to.path)

  if (to.path === '/login') {
    if (token2) {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (token2) {
      next()
      NProgress.done()
    } else {
      next({path: '/login'})
      NProgress.done()
    }
  }


  // if (token) {
  //   if (to.path === '/login') {
  //     removeToken()
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  //   NProgress.done()
  // }



  // next()


  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }


})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
