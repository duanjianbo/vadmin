<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul{
  outline: 0;
  list-style: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height:100%;
}
/** 覆盖iview ui框架的样式 start**/
.ivu-table th{
  background-color: unset!important;
}
.ivu-menu-dark {
    background: #191a23 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #101117 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #191a23 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #fff;
    background: #191a23 !important;
}
/** 覆盖iview ui框架的样式 end**/
/** iPad **/
@media only screen and (min-width: 768px) and (max-width: 1024px) {}
/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {}
</style>
