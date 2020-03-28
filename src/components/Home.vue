<template>
  <div class="home">
    <HomeLeft/>
    <div class="home-right">
      <div class="home-right-header">
          <div class="path-guide">
              <Icon type="ios-menu-outline" class="icon-menu" size="26" @click.native="toggleLeftLayout"></Icon>
              <Icon type="ios-refresh" class="icon-refresh" size="26" @click.native="refresh"></Icon>
              <Breadcrumb class="breadcrumb">
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem v-for="item in $route.matched" :key="item.path">{{item.meta.title || '未设置路由meta.title'}}</BreadcrumbItem>
              </Breadcrumb>
          </div>
          <div class="option-bar">
              <Badge dot style="margin-right: 20px;cursor: pointer">
                  <Icon type="ios-notifications-outline" size="26" @click.native="goProfile"></Icon>
              </Badge>
              <Icon type="ios-hammer-outline" size="26" style="cursor: pointer" @click="isShowingSetting=true"></Icon>
              <div class="login-user">
                  <Tag color="green">{{loggedUser.role}}</Tag>
                  <Dropdown style="margin-left: 10px" transfer-class-name="login-user-dropdown">
                      <a href="javascript:void(0)" style="color:#515a6e">
                          {{loggedUser.name}}
                          <Icon type="ios-arrow-down"></Icon>
                      </a>
                      <DropdownMenu slot="list">
                          <DropdownItem @click.native="goProfile">个人信息</DropdownItem>
                          <DropdownItem divided @click.native="logout">退出登录</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </div>
          </div>
          <Drawer title="系统设置" :closable="false" v-model="isShowingSetting">
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>一些其他设置项...</p>
          </Drawer>
      </div>
      <div class="home-content">
        <Tabs type="card" :animated="false" :value="$route.path" @on-click="handleTabClick" @on-tab-remove="handleTabRemove">
          <TabPane :name="tab.path" :label="tab.title" v-for="(tab,index) in tabs" :key="tab.path" :closable="index>0"></TabPane>  <!-- 这里tabPanne并没有作用，仅仅是当作tab页的导航头-->
          <!--
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="打发打发打发打发"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          <TabPane label="dfdf"></TabPane>
          -->
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

export default {
  name: 'home',
  components: {
    HomeLeft
  },
  computed: {
    tabs () {
      return this.$store.state.tabs
    }
  },
  data(){
      return {
          isShowingSetting:false,
          loggedUser:{
              name:'DuanJianbo',
              role:'管理员',
          },
      }
  },
  watch: {
    // 侦听路由变化
    $route() {
      console.log('路由变化:'+this.$route.path);
      this.newTab({
        componentName:this.$route.matched[1].components.default.name,
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
      componentName:this.$route.matched[1].components.default.name,
      title:this.$route.meta.title,
      path:this.$route.path,
      keepAlive:this.$route.meta.keepAlive,
      query:this.$route.query,
      params:this.$route.params
    });
    //查询该用户当前是否有未读的通知消息列表，如果有显示未读消息徽标
    //如果今天的、未读的消息中，有消息级别比较重要，可以弹出全局通知
    this.checkNotices();
    //同时准备接收系统推送
    this.enableBroadcastReceiver();
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
    //检查通知
    checkNotices(){
    },
    //启用广播接收者（系统主动推送）
    enableBroadcastReceiver(){
        const that=this;
        //模拟websocket收到一条推送消息，先将header栏通知图标增加徽记
        //如果消息级别比较重要，开启全局通知
        setTimeout(()=>{
            that.notice('重要通知','今晚凌晨01:00~01:30将会升级系统，以改善XX功能，升级期间部分功能不可用。');
        },10000);
    },
    logout(){
        this.$Modal.confirm({
            title: '提示',
            content: '<p>确定退出吗？</p>',
            onOk: () => {
                //清除登录状态
                this.$cookies.remove('vadmin_token');
                //回到登录页
                this.$router.replace('/login');
            },
            onCancel: () => {
            }
        });
    },
    goProfile(){
        this.$Message.info('没有编写示例页面')
    },
    toggleLeftLayout(){
        this.$store.commit('toggleLeftLayout');
    },
    refresh(){
        this.$store.commit('refresh',{time:Date.now(),route:this.$route});
    },
    //重要的全局通知，需要用户手动点击关闭
    notice(title,content){
        this.$Notice.open({
            title: title,
            desc: content,
            duration: 0
        });
    }
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
.option-bar .login-user .login-user-dropdown{
    top:61px !important;
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
      .home-right-header{
          position: absolute;
          left:0;
          right:0;
          top:0;
          z-index: 30;
          padding: 0 20px;
          align-items: center;
          height: 60px;
          background-color: white;
          box-shadow: 0 1px 4px rgba(0,21,41,.08);
          display: flex;
          justify-content: space-between;
          .path-guide{
              display: flex;
              align-items: center;
              .icon-menu,.icon-refresh{margin-right: 20px;cursor: pointer}
              .icon-menu:hover,.icon-refresh:hover{background-color:#f5f7f9 }
              @media only screen and (min-width: 320px) and (max-width: 767px) {
                  .breadcrumb{display: none}
              }
          }
          .option-bar{
              display: flex;
              align-items: center;
              .login-user{
                  display: flex;
                  align-items: center;
                  padding: 0 0 0 20px;
              }
          }
      }
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
