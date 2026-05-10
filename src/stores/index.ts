import { defineStore } from 'pinia'

export interface TabItem {
  componentName: string
  title: string
  path: string
  keepAlive: boolean
  query?: Record<string, any>
  params?: Record<string, any>
}

interface AppState {
  isShowingLeftLayout: boolean
  tabs: TabItem[]
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isShowingLeftLayout: true, // 是否显示侧边栏
    tabs: [] // 在右侧内容区域应当显示的 tab 页集合
  }),
  actions: {
    toggleLeftLayout() {
      this.isShowingLeftLayout = !this.isShowingLeftLayout
    },
    newTab(tab: TabItem) {
      this.tabs.push(tab)
    },
    closeTab(path: string) {
      this.tabs = this.tabs.filter((item) => item.path !== path)
    },
    updateTab(tab: TabItem) {
      this.tabs = this.tabs.map((item) => {
        if (item.path === tab.path) {
          item.componentName = tab.componentName
          item.title = tab.title
          item.keepAlive = tab.keepAlive
          item.query = tab.query
          item.params = tab.params
        }
        return item
      })
    },
    closeAllTabs() {
      this.tabs = []
    },
    keepAliveTab(data: { path: string; keepAlive: boolean }) {
      this.tabs = this.tabs.map((item) => {
        if (item.path === data.path) {
          item.keepAlive = data.keepAlive
        }
        return item
      })
    }
  }
})
