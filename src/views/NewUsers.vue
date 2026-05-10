<template>
  <HomeContentLayout>
    <div class="filter-tools">
      <div class="filter-options">
        <label>
          所在城市：
          <Select v-model="filters.city" style="width:200px">
            <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </label>
      </div>
      <div class="btns">
        <Button type="primary" html-type="submit" @click="query">查询</Button>
        <Button html-type="reset" style="margin-left:10px">重置</Button>
      </div>
    </div>

    <div class="list-area">
      <Spin size="large" fix v-if="isLoading"></Spin>
      <Table :columns="listColumns" :data="list">
        <template #actions>
          <a @click="router.push({ path: '/users/user-detail', query: { id: Date.now() } })">编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </template>
      </Table>
    </div>

    <Page :total="100" show-total show-elevator class-name="paging" />
  </HomeContentLayout>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'NewUsers' })

const router = useRouter()

const isLoading = ref(false)
const cityList = ref(['南京', '北京', '上海'])
const filters = reactive({
  city: '',
  sex: ''
})
const listColumns = ref([
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  { title: '操作', slot: 'actions', width: 150, align: 'center' }
])
const list = ref<Array<Record<string, any>>>([])

console.log('NewUsers created')

onMounted(() => console.log('NewUsers mounted'))
onActivated(() => console.log('NewUsers activated'))
onDeactivated(() => console.log('NewUsers deactivated'))
onUnmounted(() => console.log('NewUsers unmounted'))

function query() {
  isLoading.value = true
  setTimeout(() => {
    list.value = [
      { name: 'John Brown', age: 18, address: 'New York No. 1 Lake Park', date: '2016-10-03' },
      { name: 'Jim Green', age: 24, address: 'London No. 1 Lake Park', date: '2016-10-01' },
      { name: 'Joe Black', age: 30, address: 'Sydney No. 1 Lake Park', date: '2016-10-02' },
      { name: 'Jon Snow', age: 26, address: 'Ottawa No. 2 Lake Park', date: '2016-10-04' },
      { name: 'Joe Black', age: 30, address: 'Sydney No. 1 Lake Park', date: '2016-10-02' },
      { name: 'Jon Snow', age: 26, address: 'Ottawa No. 2 Lake Park', date: '2016-10-04' },
      { name: 'Joe Black', age: 30, address: 'Sydney No. 1 Lake Park', date: '2016-10-02' },
      { name: 'Jon Snow', age: 26, address: 'Ottawa No. 2 Lake Park', date: '2016-10-04' }
    ]
    isLoading.value = false
  }, 1000)
}
</script>

<style scoped lang="less">
.filter-tools {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.list-area {
  width: 100%;
  margin: 10px auto;
  position: relative;
}
</style>
