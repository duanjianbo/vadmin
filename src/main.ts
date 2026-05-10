import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import App from './App.vue'
import router from './router'
import HomeContentLayout from '@/components/HomeContentLayout.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// vue-cookies 1.8.x 默认导出运行时即 VueCookies 实例本身（带 install），其 TS 类型与运行时不一致，
// 这里使用 install 函数侧的类型即可正常注册
app.use(VueCookies as any, { expires: '6h' })
app.use(ViewUIPlus)

app.component('HomeContentLayout', HomeContentLayout)

console.log('当前 NODE_ENV：' + import.meta.env.MODE)
console.log('当前 API_URL：' + import.meta.env.VITE_API_URL)

app.mount('#app')
