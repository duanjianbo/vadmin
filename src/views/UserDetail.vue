<template>
  <HomeContentLayout>
    <div class="test">用户详情页面 {{ route.query.id }}</div>
  </HomeContentLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineOptions({ name: 'UserDetail' })

const route = useRoute()
</script>

<style scoped>
.test {
  height: 400px;
  color: red;
}
</style>
