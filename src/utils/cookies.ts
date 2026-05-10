import VueCookiesPkg, { type VueCookies } from 'vue-cookies'

// vue-cookies 1.8.x 的运行时 default 导出即 VueCookies 实例本身（同时挂着 install 方法），
// 但 TS 声明把 default 写成了 { VueCookies, install } —— 这里做一次类型断言以拿到正确类型。
export const cookies = VueCookiesPkg as unknown as VueCookies
