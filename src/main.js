import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueQuillEditor from 'vue-quill-editor'
import InowingPlugin from './InowingPlugin.js'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(InowingPlugin)

// 이벤트버스 생성
window.EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
