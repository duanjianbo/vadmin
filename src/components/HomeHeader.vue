<template>
  <div class="header">
      <div class="path-guide">
          <Icon type="ios-menu-outline" class="icon-menu" size="26" @click.native="toggleLeftLayout"></Icon>
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
</template>

<script>
export default {
  data(){
    return {
      isShowingSetting:false,
      loggedUser:{
          name:'DuanJianbo',
          role:'管理员',
      },
    }
  },
  mounted() {
    //查询该用户当前是否有未读的通知消息列表，如果有显示未读消息徽标
    //如果今天的、未读的消息中，有消息级别比较重要，可以弹出全局通知
    this.checkNotices();
    //同时准备接收系统推送
    this.enableBroadcastReceiver();
  },
  methods:{
    toggleLeftLayout(){
        this.$store.commit('toggleLeftLayout');
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
.option-bar .login-user .login-user-dropdown{
    top:61px !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header{
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
        .icon-menu{margin-right: 20px;cursor: pointer}
        .icon-menu:hover{background-color:#f5f7f9 }
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
</style>
