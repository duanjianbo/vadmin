<template>
  <div class="home">
    <HomeLeft/>
    <div class="home-right">
      <HomeHeader/>
      <div class="home-content">
        <Tabs type="card" :animated="false" :value="$route.path" @on-click="handleTabClick" @on-tab-remove="handleTabRemove">
          <TabPane :name="tab.path" :label="tab.title" v-for="(tab,index) in tabs" :key="tab.path" :closable="index>0"></TabPane>  <!-- 这里tabPanne并没有作用，仅仅是当作tab页的导航头-->
        </Tabs>
        <keep-alive :include="this.tabs.filter(i=>i.keepAlive).map(item=>{return item.componentName})">
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeLeft from '@/components/HomeLeft.vue'
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  name: 'home',
  components: {
    HomeLeft,
    HomeHeader
  },
  computed: {
    tabs () {
      return this.$store.state.tabs
    }
  },
  data(){
      return {

      }
  },
  watch: {
    // 侦听路由变化
    $route() {
      console.log('路由变化:'+this.$route.path);
      this.newTab({
        componentName:this.getCurrentRouteComponentName(),
        title:this.$route.meta.title,
        path:this.$route.path,
        keepAlive:this.$route.meta.keepAlive,
        query:this.$route.query,
        params:this.$route.params
      });
    },
  },
  created() {
    console.log('home created');
    //首先检查一次本地有没有token，没有去登录。页面长久停留，在接口请求中也会处理token的情况
    let token=this.$cookies.get('vadmin_token');
    if(!token){
      this.$router.replace('/login');
      return;
    }
    //console.log(this.$route);
    //打开默认加载的主Tab
    this.newTab({componentName:'Main',title:'主控台',path:'/dashboard/main',keepAlive:true});
    //打开初次加载的路由Tab
    this.newTab({
      componentName:this.getCurrentRouteComponentName(),
      title:this.$route.meta.title,
      path:this.$route.path,
      keepAlive:this.$route.meta.keepAlive,
      query:this.$route.query,
      params:this.$route.params
    });
  },
  mounted(){
    console.log('home mounted');
    //console.log(this.tabs);
    /*
    //测试脚本
    setTimeout(() => {
      this.$router.push('/dashboard/main');
    }, 5000);
    */
  },
  destroyed(){
    console.log('home destroyed');
    //清除所有tab 销毁所有保活组件（被缓存的）
    this.$store.commit('closeAllTabs');
  },
  methods:{
    //新增标签页 {组件name、页面标题、页面路由path、是否保活,路由query参数，路由params参数}
    //{componentName,title,path,keepAlive,query,params}  其中componentName,title,path为必填
    newTab(tabdata){ 
      let {componentName,title,path,keepAlive,query,params}=tabdata;
      if(this.tabs.filter(item=>item.path===path).length){//如果当前路由在tab列表中
        //不创建新的tab 但要将参数覆盖，因为路由参数可能已变化
        this.$store.commit('updateTab',{componentName,title,path,keepAlive,query,params});
        return;
      }
      if(!path){
        console.error('新增标签页：缺少参数path，请联系技术支持');
        this.$Modal.error({
            title: '系统错误',
            content: '新增标签页：缺少参数path，请联系技术支持'
        });
        return;
      }
      if(!componentName){
        console.error('新增标签页('+path+')：缺少参数componentName，请联系技术支持');
        this.$Modal.error({
            title: '系统错误',
            content: '新增标签页('+path+')：缺少参数componentName，请联系技术支持'
        });
        return;
      }
      if(this.tabs.filter(i=>i.componentName===componentName).length){
        console.error('新增标签页('+path+')：componentName重复，请联系技术支持');
        this.$Modal.error({
            title: '系统错误',
            content: '新增标签页('+path+')：componentName重复，请联系技术支持'
        });
        return;
      }
      if(!title){
        console.error('新增标签页('+path+')：缺少参数title，请联系技术支持');
        this.$Modal.error({
            title: '系统错误',
            content: '新增标签页('+path+')：缺少参数title，请联系技术支持'
        });
        return;
      }
      if(!keepAlive && keepAlive!==false){
        console.warn('新增标签页('+path+')：未显示指定keepAlive，将默认使用false(不保活)特性');
      }

      this.$store.commit('newTab',{componentName,title,path,keepAlive,query,params});
    },
    // 切换标签页  这个参数里的name值是对应tab页的路由path
    handleTabClick(name) {
      if(this.$route.path!==name){
        let tabs=this.tabs.filter(i=>i.path===name);
        if(tabs && tabs.length){
          this.$router.push({path:name,query:tabs[0].query||{},params:tabs[0].params||{}});
        }
      }
    },
    // 关闭标签页 这个参数里的name值是对应tab页的路由path
    handleTabRemove(name) {
      console.log('准备关闭tab:'+name);
      //如果要关闭的tab===当前激活的tab页，那么需要找到相邻的tab页
      if(this.$route.path===name){
        let nextPath; // 相邻路径
        for (var i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].path === name) {
            // 获取当前相邻标签页
            var nextTab = this.tabs[i + 1] || this.tabs[i - 1];
            nextPath = nextTab ? nextTab.path : "/";
            break;
          }
        }
        console.log('跳转至相邻页面或主页：'+nextPath);
        this.handleTabClick(nextPath);
      }
      //清除组件
      let closingTab=this.tabs.filter(item=>item.path===name); //根据路径找到该tab
      if(closingTab.length && closingTab[0].keepAlive){//只有该tab声明为需要保活，关闭标签时才需要清除；不保活本身在路径切换时自动销毁
        console.log('Tab keepAlive已被设置true，销毁组件:'+name);
        //手动先将该Tab设置为不保活，会被自动销毁
        this.$store.commit("keepAliveTab", {path:name,keepAlive:false}); 
      }
      this.$store.commit("closeTab", name); // 关闭标签
    },
    getCurrentRouteComponentName(){
      var matched=this.$route.matched;
      return matched[matched.length-1].components.default.name;
    },
    toggleLeftLayout(){
        this.$store.commit('toggleLeftLayout');
    },
  }
}
</script>
<style>
.home-content .ivu-tabs-bar{
  border-bottom:0;
  margin-bottom: 0px;
  max-height: 31px;
  overflow: hidden;
}
.home-content .ivu-tabs-tab{
  background: white !important;
  border: 0 !important;
  color:#808695;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .home{
    width: 100%;
    height: 100%;
    /*background-color: #f5f7f9;*/
    background-color: #E8ECF0;
    overflow: hidden;
    display: flex;
    .home-right{
      z-index: 10;
      flex-grow: 1;
      position: relative;
      .home-content{
        box-sizing: border-box;
        position: absolute;
        z-index: 20;
        top:0;
        width: 100%;
        height: 100%;
        padding: 70px 10px 10px 10px;
        .paging{
          margin: auto;
          text-align: center;
        }
      }
    }
  }

</style>
