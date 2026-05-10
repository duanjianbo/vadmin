import type { VueCookies } from 'vue-cookies'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cookies: VueCookies
    $Modal: any
    $Message: any
    $Notice: any
    $Spin: any
    $Loading: any
  }
}

declare module 'vue-cookies'

export {}
