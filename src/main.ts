import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import HomeContentLayout from '@/components/HomeContentLayout.vue'

Vue.config.productionTip = false
Vue.use(VueCookies);
Vue.use(ViewUI);
Vue.component("HomeContentLayout", HomeContentLayout);

console.log("当前NODE_ENV："+process.env.NODE_ENV);
console.log("当前API_URL："+process.env.VUE_APP_API_URL);

/**配置cookies开始**/
Vue.prototype.$cookies.config('6h','/') //默认保存6小时 根目录下
/**配置cookies结束**/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
