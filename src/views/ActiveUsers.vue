<template>
    <HomeContentLayout>
        <p>活跃用户</p>
        <p>本页测试长内容，滚动条状态</p>
        <div class="test-content"></div>
    </HomeContentLayout>
</template>

<script>

    export default {
        name: "ActiveUsers",
        components: {

        },
        created(){
            console.log('ActiveUsers created');
        },
        mounted(){
            console.log('ActiveUsers mounted');
        },
        activated(){
            console.log('ActiveUsers activated');
        },
        deactivated(){
            console.log('ActiveUsers deactivated');
        },
        destroyed(){
            console.log('ActiveUsers destroyed');
        },
    }
</script>

<style scoped lang="less">
p{
    width: 100%;
}
.test-content{
    width: 100%;
    height: 2000px;

}
</style>
