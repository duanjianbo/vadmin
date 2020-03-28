<template>
  <div class="home-left" v-if="isShowingLeftLayout">
    <div class="home-left-top">
      <img class="logo" alt="logo" src="../assets/logo.png"/>
    </div>
    <Menu width="240px" style="overflow-y:auto;" :active-name="$route.path" :open-names="[$route.matched[0].path]">
      <Submenu name="/dashboard">
        <template slot="title">
          <Icon type="ios-paper" />
          Dashboard
        </template>
        <MenuItem name="/dashboard/main" to="/dashboard/main">主控台</MenuItem>
        <MenuItem name="/dashboard/workplace" to="/dashboard/workplace">工作台</MenuItem>
      </Submenu>
      <Submenu name="/users">
        <template slot="title">
          <Icon type="ios-people" />
          用户管理
        </template>
        <MenuItem name="/users/new-users" to="/users/new-users">新增用户</MenuItem>
        <MenuItem name="/users/active-users" to="/users/active-users">活跃用户</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  computed: {
    isShowingLeftLayout () {
      return this.$store.state.isShowingLeftLayout
    }
  },
  data(){
    return {
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .home-left{
    display: flex;
    flex-direction: column;
    width: auto;
    background-color: white;
    z-index:40;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    .home-left-top{
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #eee;
    }
    .home-left-top .logo{
      height:40px;
      width: auto;
      margin: 10px;
    }
    .ivu-menu-vertical.ivu-menu-light:after{
      width: 0;
    }
    .ivu-menu::-webkit-scrollbar{width: 2px;}
    .ivu-menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        background: #ededed;
    }
    .ivu-menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #f1f1f1;
    }
  }
</style>
