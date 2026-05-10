<template>
  <div class="home">
    <HomeLeft />
    <div class="home-right">
      <HomeHeader />
      <div class="home-content">
        <Tabs
          type="card"
          :animated="false"
          :model-value="route.path"
          @on-click="handleTabClick"
          @on-tab-remove="handleTabRemove"
        >
          <!-- TabPane 仅作为 tab 头展示，路由切换由下方 router-view 处理 -->
          <TabPane
            v-for="(tab, index) in tabs"
            :key="tab.path"
            :name="tab.path"
            :label="tab.title"
            :closable="index > 0"
          />
        </Tabs>
        <!--
          Vue 3 中 <router-view> + <keep-alive> 必须只保留一个 <component :is>，
          靠 :include 白名单决定哪些组件缓存；不在白名单里的会正常 mount/unmount。
          切勿在 v-slot 内并列两个 <component :is>，否则会触发
          'parentComponent.ctx.activate/deactivate is not a function' 之类内部错误。
        -->
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAliveNames">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'view-ui-plus'
import HomeLeft from '@/components/HomeLeft.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import { useAppStore, type TabItem } from '@/stores'
import { cookies } from '@/utils/cookies'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const tabs = computed(() => store.tabs)
const keepAliveNames = computed(() =>
  store.tabs.filter((t) => t.keepAlive).map((t) => t.componentName)
)

function getCurrentRouteComponentName(): string {
  const matched = route.matched
  const def = matched[matched.length - 1]?.components?.default as any
  return def?.name ?? def?.__name ?? ''
}

function newTab(tabdata: Partial<TabItem>) {
  const { componentName, title, path, keepAlive, query, params } = tabdata
  if (!path) {
    console.error('新增标签页：缺少参数 path，请联系技术支持')
    Modal.error({ title: '系统错误', content: '新增标签页：缺少参数 path，请联系技术支持' })
    return
  }
  // 已存在则只更新参数
  if (store.tabs.some((item) => item.path === path)) {
    store.updateTab({
      componentName: componentName ?? '',
      title: title ?? '',
      path,
      keepAlive: !!keepAlive,
      query,
      params
    })
    return
  }
  if (!componentName) {
    console.error(`新增标签页(${path})：缺少参数 componentName，请联系技术支持`)
    Modal.error({ title: '系统错误', content: `新增标签页(${path})：缺少参数 componentName，请联系技术支持` })
    return
  }
  if (store.tabs.some((i) => i.componentName === componentName)) {
    console.error(`新增标签页(${path})：componentName 重复，请联系技术支持`)
    Modal.error({ title: '系统错误', content: `新增标签页(${path})：componentName 重复，请联系技术支持` })
    return
  }
  if (!title) {
    console.error(`新增标签页(${path})：缺少参数 title，请联系技术支持`)
    Modal.error({ title: '系统错误', content: `新增标签页(${path})：缺少参数 title，请联系技术支持` })
    return
  }
  if (keepAlive === undefined || keepAlive === null) {
    console.warn(`新增标签页(${path})：未显示指定 keepAlive，将默认使用 false (不保活) 特性`)
  }
  store.newTab({ componentName, title, path, keepAlive: !!keepAlive, query, params })
}

// 切换标签页：name 即对应 tab 页的路由 path
function handleTabClick(name: string) {
  if (route.path !== name) {
    const target = store.tabs.find((i) => i.path === name)
    if (target) {
      // vue-router 4 中 path 形式忽略 params，仅传 query
      router.push({ path: name, query: target.query || {} })
    }
  }
}

// 关闭标签页：name 即对应 tab 页的路由 path
function handleTabRemove(name: string) {
  console.log('准备关闭 tab:' + name)
  // 关闭的是当前激活的 tab，需要跳到相邻 tab
  if (route.path === name) {
    let nextPath = '/'
    for (let i = 0; i < store.tabs.length; i++) {
      if (store.tabs[i].path === name) {
        const nextTab = store.tabs[i + 1] || store.tabs[i - 1]
        nextPath = nextTab ? nextTab.path : '/'
        break
      }
    }
    console.log('跳转至相邻页面或主页：' + nextPath)
    handleTabClick(nextPath)
  }
  const closing = store.tabs.find((item) => item.path === name)
  // 保活的 tab 关闭前先取消保活，触发组件销毁
  if (closing?.keepAlive) {
    console.log('Tab keepAlive 已被设置 true，销毁组件:' + name)
    store.keepAliveTab({ path: name, keepAlive: false })
  }
  store.closeTab(name)
}

watch(
  () => route.path,
  () => {
    console.log('路由变化:' + route.path)
    newTab({
      componentName: getCurrentRouteComponentName(),
      title: route.meta.title as string,
      path: route.path,
      keepAlive: route.meta.keepAlive as boolean,
      query: route.query as Record<string, any>,
      params: route.params as Record<string, any>
    })
  }
)

onMounted(() => {
  console.log('home mounted')
  // 检查本地 token，没有则去登录
  const token = cookies.get('vadmin_token')
  if (!token) {
    router.replace('/login')
    return
  }
  // 默认主控台 tab
  newTab({ componentName: 'Main', title: '主控台', path: '/dashboard/main', keepAlive: true })
  // 当前加载路由 tab
  newTab({
    componentName: getCurrentRouteComponentName(),
    title: route.meta.title as string,
    path: route.path,
    keepAlive: route.meta.keepAlive as boolean,
    query: route.query as Record<string, any>,
    params: route.params as Record<string, any>
  })
})

onUnmounted(() => {
  console.log('home unmounted')
  store.closeAllTabs()
})
</script>

<style>
.home-content .ivu-tabs-bar {
  border-bottom: 0;
  margin-bottom: 0px;
  max-height: 31px;
  overflow: hidden;
}
.home-content .ivu-tabs-tab {
  background: white !important;
  border: 0 !important;
  color: #808695;
}
</style>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #e8ecf0;
  overflow: hidden;
  display: flex;
  .home-right {
    z-index: 10;
    flex-grow: 1;
    position: relative;
    .home-content {
      box-sizing: border-box;
      position: absolute;
      z-index: 20;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 70px 10px 10px 10px;
      .paging {
        margin: auto;
        text-align: center;
      }
    }
  }
}
</style>
