<!--登陆页面UI来自网络素材@itskodinger-->
<template>
    <div class="page">
        <div class="lowin">
            <div class="lowin-brand">
                <img src="../assets/login_logo.jpg" alt="logo">
            </div>
            <div class="lowin-wrapper">
                <div class="lowin-box lowin-login">
                    <div class="lowin-box-inner">
                        <div>
                            <p>后 台 管 理 系 统</p>
                            <div class="lowin-group">
                                <label>邮箱</label>
                                <input type="email" autocomplete="email" name="email" class="lowin-input">
                            </div>
                            <div class="lowin-group password-group">
                                <label>密码 <a href="#" class="forgot-link">忘记密码?</a></label>
                                <input @keyup.enter="normalLogin" type="password" name="password" autocomplete="current-password" class="lowin-input">
                            </div>
                            <Button class="lowin-btn" style="height: 51px;display: flex;justify-content: center;" type="primary" :loading="loading" @click="normalLogin">
                                <span v-if="!loading">登 录</span>
                                <span v-else>登录中...</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="lowin-footer">
            Login Page Designed By @itskodinger. 说明文字  <a href="#" target="_blank" title="链接">网页链接</a> - 版权信息等
        </footer>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                loading:false,
            }
        },
        mounted() {
        },
        methods:{
            normalLogin(){
                const that=this;
                that.loading=true;
                setTimeout(()=>{
                    that.$router.replace('/dashboard/main');
                },1000)

            },
        }
    }
</script>

<style scoped lang="less">
    .page {
        margin: 0;
        background-color: #fbfbfb;
        text-align: center;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .lowin {
        /* variables */
        --color-primary: #44a0b3;
        --color-grey: rgba(68, 160, 179, .06);
        --color-dark: rgba(68, 160, 179, .5);
        --color-semidark: rgba(68, 160, 179, .5);

        text-align: center;
        margin: 10% 0 0 0;
        font-family: 'Segoe UI';
        font-size: 14px;
    }

    .lowin .lowin-wrapper {
        -webkit-transition: all 1s;
        -o-transition: all 1s;
        transition: all 1s;
        -webkit-perspective: 1000px;
        perspective: 1000px;
        position: relative;
        height: 100%;
        width: 360px;
        margin: 0 auto;
    }

    .lowin.lowin-red {
        --color-primary: #ff6464;
        --color-grey: rgba(255, 100, 100, .06);
        --color-dark: rgba(255, 100, 100, .8);
        --color-semidark: rgba(255, 100, 100, .55);
    }

    .lowin.lowin-green {
        --color-primary: #D0EF84;
        --color-grey: rgba(208, 239, 132, .15);
        --color-dark: rgba(208, 239, 132, 1);
        --color-semidark: rgba(208, 239, 132, .6);
    }

    .lowin.lowin-purple {
        --color-primary: #6C567B;
        --color-grey: rgba(108, 86, 123, .08);
        --color-dark: rgba(108, 86, 123, .7);
        --color-semidark: rgba(108, 86, 123, .45);
    }

    .lowin.lowin-blue {
        --color-primary: #0081C6;
        --color-grey: rgba(0, 129, 198, .05);
        --color-dark: rgba(0, 129, 198, .7);
        --color-semidark: rgba(0, 129, 198, .45);
    }

    .lowin a {
        color: var(--color-primary);
        text-decoration: none;
        border-bottom: 1px dashed var(--color-semidark);
        margin-top: -3px;
        padding-bottom: 2px;
    }

    .lowin * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .lowin .lowin-brand {
        overflow: hidden;
        width: 100px;
        height: 100px;
        margin: 0 auto -50px auto;
        border-radius: 50%;
        -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
        box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
        padding: 10px;
        background-color: #fff;
        z-index: 1;
        position: relative;
    }

    .lowin .lowin-brand img {
        width: 100%;
    }

    .lowin .lowin-box {
        width: 100%;
        position: absolute;
        left: 0;
    }

    .lowin .lowin-box-inner {
        background-color: #fff;
        -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
        box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
        padding: 60px 25px 40px 25px;
        text-align: left;
        border-radius: 3px;
    }

    .lowin .lowin-box.lowin-flip {
        -webkit-transform: rotate3d(0, 1, 0, -180deg);
        transform: rotate3d(0, 1, 0, -180deg);
        display: none;
        opacity: 0;
    }

    .lowin .lowin-box p {
        color: var(--color-semidark);
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
    }

    .lowin .lowin-box .lowin-group {
        margin-bottom: 30px;
    }

    .lowin .lowin-box label {
        margin-bottom: 5px;
        display: inline-block;
        width: 100%;
        color: var(--color-semidark);
        font-weight: 700;
    }

    .lowin .lowin-box label a {
        float: right;
    }

    .lowin .lowin-box .lowin-input {
        background-color: var(--color-grey);
        color: var(--color-dark);
        border: none;
        border-radius: 3px;
        padding: 15px 20px;
        width: 100%;
        outline: 0;
    }

    .lowin .lowin-box .lowin-btn {
        display: inline-block;
        width: 100%;
        border: none;
        color: #fff;
        padding: 15px;
        border-radius: 3px;
        background-color: var(--color-primary);
        -webkit-box-shadow: 0 2px 7px var(--color-semidark);
        box-shadow: 0 2px 7px var(--color-semidark);
        font-weight: 700;
        outline: 0;
        cursor: pointer;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
    }

    .lowin .lowin-box .lowin-btn:active {
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .lowin .lowin-box .lowin-btn:hover {
        opacity: .9;
    }


    .lowin-footer {
        text-align: center;
        font-size: 12px;
        color:  rgba(68, 160, 179, .5);
        font-weight: 700;
        position: absolute;
        bottom: 50px;
        width: 100%;
    }

    @media screen and (max-width: 320px) {
        .lowin .lowin-wrapper {
            width: 100%;
        }
        .lowin .lowin-box {
            padding: 0 10px;
        }
    }
</style>
