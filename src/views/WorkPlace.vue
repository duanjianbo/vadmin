<template>
    <HomeContentLayout>
        <div class="test">这是工作台</div>
    </HomeContentLayout>
</template>

<script>
    export default {
        name: "WorkPlace",
        mounted() {
            //监听刷新按钮被点击事件
            this.$watch(
                function () {
                    return this.$store.state.refresh
                },
                function (newVal, oldVal) {
                    console.log('WorkPlace监听到refresh');
                    //做点什么
                }
            )
        }
    }
</script>

<style scoped>
.test{
    background-color: blue;
    height:1200px;
}
</style>
