<template>
  <HomeContentLayout>
    <p>活跃用户</p>
    <p>本页测试长内容，滚动条状态</p>
    <div class="test-content"></div>
  </HomeContentLayout>
</template>

<script setup lang="ts">
import { onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

defineOptions({ name: 'ActiveUsers' })

console.log('ActiveUsers created')

onMounted(() => console.log('ActiveUsers mounted'))
onActivated(() => console.log('ActiveUsers activated'))
onDeactivated(() => console.log('ActiveUsers deactivated'))
onUnmounted(() => console.log('ActiveUsers unmounted'))
</script>

<style scoped lang="less">
p {
  width: 100%;
}
.test-content {
  width: 100%;
  height: 2000px;
}
</style>
