<template>
  <div class="header">
    <div class="path-guide">
      <Icon type="ios-menu-outline" class="icon-menu" size="26" @click="store.toggleLeftLayout()" />
      <Breadcrumb class="breadcrumb">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem v-for="item in route.matched" :key="item.path">
          {{ (item.meta?.title as string) || '未设置路由 meta.title' }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="option-bar">
      <Badge dot style="margin-right: 20px;cursor: pointer">
        <Icon type="ios-notifications-outline" size="26" @click="goProfile" />
      </Badge>
      <Icon
        type="ios-hammer-outline"
        size="26"
        style="cursor: pointer"
        @click="isShowingSetting = true"
      />
      <div class="login-user">
        <Tag color="green">{{ loggedUser.role }}</Tag>
        <Dropdown style="margin-left: 10px" transfer-class-name="login-user-dropdown">
          <a href="javascript:void(0)" style="color:#515a6e">
            {{ loggedUser.name }}
            <Icon type="ios-arrow-down" />
          </a>
          <template #list>
            <DropdownMenu>
              <DropdownItem @click="goProfile">个人信息</DropdownItem>
              <DropdownItem divided @click="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </template>
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

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal, Message, Notice } from 'view-ui-plus'
import { useAppStore } from '@/stores'
import { cookies } from '@/utils/cookies'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const isShowingSetting = ref(false)
const loggedUser = reactive({
  name: 'DuanJianbo',
  role: '管理员'
})

function logout() {
  Modal.confirm({
    title: '提示',
    content: '<p>确定退出吗？</p>',
    onOk: () => {
      cookies.remove('vadmin_token')
      router.replace('/login')
    },
    onCancel: () => {}
  })
}

function goProfile() {
  Message.info('没有编写示例页面')
}

// 检查通知
function checkNotices() {}

// 启用广播接收者（系统主动推送）
function enableBroadcastReceiver() {
  // 模拟 websocket 收到一条推送，先将 header 通知图标增加徽记；
  // 如果消息级别比较重要，开启全局通知
  setTimeout(() => {
    notice('重要通知', '今晚凌晨 01:00~01:30 将会升级系统，以改善 XX 功能，升级期间部分功能不可用。')
  }, 10000)
}

// 重要的全局通知，需要用户手动点击关闭
function notice(title: string, content: string) {
  Notice.open({
    title,
    desc: content,
    duration: 0
  })
}

onMounted(() => {
  // 查询当前用户是否有未读通知，有则展示徽标
  // 重要消息可弹出全局通知
  checkNotices()
  enableBroadcastReceiver()
})
</script>

<style>
.option-bar .login-user .login-user-dropdown {
  top: 61px !important;
}
</style>

<style scoped lang="less">
.header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 30;
  padding: 0 20px;
  align-items: center;
  height: 60px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  .path-guide {
    display: flex;
    align-items: center;
    .icon-menu {
      margin-right: 20px;
      cursor: pointer;
    }
    .icon-menu:hover {
      background-color: #f5f7f9;
    }
    @media only screen and (min-width: 320px) and (max-width: 767px) {
      .breadcrumb {
        display: none;
      }
    }
  }
  .option-bar {
    display: flex;
    align-items: center;
    .login-user {
      display: flex;
      align-items: center;
      padding: 0 0 0 20px;
    }
  }
}
</style>
