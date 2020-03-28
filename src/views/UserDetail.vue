<template>
    <HomeContentLayout>
        <div class="test">用户详情页面{{this.$route.query.id}}</div>
    </HomeContentLayout>
</template>

<script>
    export default {
        name: "UserDetail",
        mounted() {
        }
    }
</script>

<style scoped>
.test{
    height:400px;
    color:red;
}
</style>
