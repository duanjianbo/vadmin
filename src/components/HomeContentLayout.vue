<template>
    <div class="home-content-layout">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        mounted(){
 
        },
        methods:{

        }
    }
</script>
<style scoped lang="less">
    .home-content-layout{
        background-color: white;
        box-sizing: border-box;
        padding: 15px;
        border-radius: 4px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        overflow: auto;
        width: 100%;
        max-height: 90%;
        max-height:-webkit-calc(100% - 31px);
        max-height:-moz-calc(100% - 31px);
        max-height: calc(100% - 31px);
        position: relative;
    }
</style>
