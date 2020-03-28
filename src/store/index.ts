import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowingLeftLayout:true,//是否显示侧边栏
    refresh:{//上次刷新操作（记录header中刷新按钮被点击事件）
      time:Date.now(),
      route:''
    },
    tabs:new Array<any>()//在右侧内容区域应当显示的tab页集合
  },
  mutations: {
    toggleLeftLayout(state){
      state.isShowingLeftLayout=!state.isShowingLeftLayout
    },
    refresh(state,obj){
      state.refresh=obj;
    },
    newTab(state,tabObj){
      state.tabs.push(tabObj)
    },
    closeTab(state,path){
      state.tabs=state.tabs.filter(item=>item.path!==path);
    },
    updateTab(state,tabObj){
      state.tabs.map(item=>{
        if(item.path===tabObj.path){
          item.componentName=tabObj.componentName;
          item.title=tabObj.title;
          item.keepAlive=tabObj.keepAlive;
          item.query=tabObj.query;
          item.params=tabObj.params;
        }
        return item;
      });
    },
    closeAllTabs(state){
      state.tabs=[];
    },
    keepAliveTab(state,data){
      state.tabs.map(item=>{if(item.path===data.path){item.keepAlive=data.keepAlive;}return item;});
    },
  },
  actions: {
  },
  modules: {
  }
})
