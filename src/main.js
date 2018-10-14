// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store.js'

import 'styles/bootstrap.min.css'
// import 'styles/bootstrap-grid.min.css'
// import 'styles/bootstrap-reboot.min.css'
// import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'

Vue.config.productionTip = false

// 自定义指令
Vue.directive('rainbow', {
  bind (el, binding, vnode) {
    el.style.borderColor = '#' + Math.random().toString(16).slice(2, 8)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
