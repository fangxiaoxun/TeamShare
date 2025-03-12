<template>
    <div class="container" ref="container">
        <main>
            <div class="panelBox">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>Connect with your family and friends and share your moments.</h3>
                        <button class="register" @click="handleClickregister">Register</button>
                    </div>
                    <img src="../assets/login.svg" class="image">
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3>Share what's new and life moments with your friends.</h3>
                        <button class="login" @click="handleClickLogin">LOGIN</button>
                    </div>
                    <img src="../assets/register.svg" class="image">
                </div>
            </div>
            <div class="formBox">
                <div id="login" class="loginForm form">
                    <div class="user_pohto"><img src="../assets/profile.png" alt=""></div>
                    <h1 class="title">Welcome!</h1>
                    <div class="input-field">
                        <svg-icon class="username" name="username" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="text"
                         name="userId" autocomplete="off" placeholder="请输入用户账号"
                            v-model="loginInfo.userId">
                    </div>
                    <div class="input-field">
                        <svg-icon class="password" name="password" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="password" name="password" autocomplete="off" placeholder="请输入密码"
                            v-model="loginInfo.password">
                    </div>
                    <div><button type="submit" ref="login"
                            @click="handleLogin">LOGIN</button></div>
                </div>
                <div id="register" class="registerForm form">
                    <h1 class="title">Sign up</h1>
                    <div class="input-field">
                        <svg-icon class="username" name="username" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="text" name="username" autocomplete="off" placeholder="请输入用户名"
                            v-model="registerInfo.userName">
                    </div>
                    <div class="input-field">
                        <svg-icon class="userId" name="userId" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="email" name="userId" autocomplete="off" placeholder="请输入邮箱"
                            v-model="registerInfo.email">
                    </div>
                    <div class="input-field">
                        <svg-icon class="password" name="password" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="password" name="password" autocomplete="off" placeholder="请输入密码"
                            v-model="registerInfo.password">
                    </div>
                    <div class="input-field">
                        <svg-icon class="password" name="password" width="25px" height="25px" fill="#acacac"></svg-icon>
                        <input type="password" name="password" autocomplete="off" placeholder="请确认密码" v-model="password">
                    </div>
                    <button ref="register" @click="handleRegister">Let's Go !</button>
                </div>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { reqRegister, reqLogin } from '@/api/user/index'
import { ElMessage } from 'element-plus'
import router from '@/router/index';
import { AxiosResponse } from 'axios'
// import 
const container = ref<HTMLElement | null>(null)
const handleClickregister = () => {
    container.value?.classList.add('inRight')
}
const handleClickLogin = () => {
    container.value?.classList.remove('inRight')
}
interface REGISTER {
    userName: string,
    userId: string,
    password: string,
    email: string,
}
const password = ref<string>('')
const registerInfo = reactive<REGISTER>({
    userName: '',
    userId: '',
    password: '',
    email:''
})

// 登录
interface LOGIN {
    userId: string,
    password: string
}
const loginInfo = reactive<LOGIN>({
    userId: '',
    password: ''
})
const handleRegister = () => {
    if (password.value === registerInfo.password) {
        console.log(registerInfo, 'registerInfo')
        reqRegister(registerInfo)
        .then((res)=>{
            console.log(res.data?.userId, '用户注册')
            // 跳转登录
            loginInfo.userId = res.data?.userId
            loginInfo.password = registerInfo.password
            handleLogin()
        })
    } else {
        ElMessage.error('两次密码不一致，请重新输入')
        password.value = ''
    }
}

// todo: 登录逻辑优化

const handleLogin = () => {
    // console.log('handle 登录')
    reqLogin(loginInfo)
        .then((res) => {
            console.log(res, 'reqLogin')
            if (res.code === 200) { //登录成功
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('refresh_token', res.data.refresh_token)
                router.push('/desktop')
            }else if(!loginInfo.userId){
                ElMessage.warning('请输入账号！')
            }else if(!loginInfo.password){
                ElMessage.warning('请输入密码！')
            }else {  //登录失败
                ElMessage.error('账号或密码错误，请重新输入！')
                loginInfo.userId = ''
                loginInfo.password = ''
            }

        })
}


</script>
<style lang="less" scoped>
.container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    main {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;

        .formBox {
            top: 0;
            position: absolute;
            width: 50%;
            height: 100%;
            transform: translateX(110%);
            transition: 1s 0.7s ease-in-out;

            .form {
                box-sizing: content-box;
                z-index: 6;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 10rem 5rem;
                transition: all 0.2s 0.7s;
                overflow: hidden;

                .user_pohto {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }

                .title {
                    margin-bottom: 10px;
                }

                .input-field {
                    width: 380px;
                    width: 100%;
                    background-color: #f0f0f0;
                    margin: 10px 0;
                    height: 55px;
                    border-radius: 55px;
                    display: grid;
                    grid-template-columns: 15% 85%;
                    padding: 0 0.4rem;
                    position: relative;

                    .username,
                    .userId,
                    .password {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        transition: 0.5s;
                    }

                    input {
                        background: none;
                        outline: none;
                        border: none;
                        line-height: 1;
                        font-weight: 600;
                        font-size: 1.1rem;
                        color: #333;
                        width: 350px;

                    }

                    input::placeholder {
                        color: #bcbcbc;
                        font-weight: 400;
                    }
                }

                button {
                    width: 150px;
                    background-color: #623ca8;
                    border: none;
                    outline: none;
                    height: 49px;
                    border-radius: 49px;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin: 10px 0;
                    cursor: pointer;
                    transition: 0.5s;
                }
            }

            .registerForm {
                transform: translateX(70px);
            }
        }

        .panelBox {
            display: flex;
            position: absolute;

            .panel {
                position: relative;
                z-index: 6;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-around;
                text-align: center;
                pointer-events: all;
                padding: 50px 115px;

                .content {
                    color: #fff;
                    transition: transform 0.9s ease-in-out;
                    transition-delay: 0.6s;
                    padding: 0 20px;

                    h3 {
                        font-weight: 500;
                        line-height: 1.5;
                        font-size: 1.5rem;
                        color: #fff;
                        padding-bottom: 20px;
                    }

                    button {
                        cursor: pointer;
                        margin: 0;
                        background: none;
                        border: 2px solid #fff;
                        width: 150px;
                        height: 41px;
                        color: #fff;
                        font-weight: 600;
                        font-size: 0.8rem;
                        font-family: Poppins, sans-serif;
                        border-radius: 50px;
                    }
                }

                .image {
                    width: 545px;
                    transition: transform 1.1s ease-in-out;
                    transition-delay: 0.4s;
                    text-align: center;
                    margin: 0 auto;
                }
            }

            .right-panel {
                pointer-events: none;
            }
        }
    }
}


.container::after {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #5b42aa 0%, #6938a8 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 3;
    box-shadow: 5px 15px 20px #623ca8;
}



// 显示登录
.container {
    .registerForm {
        pointer-events: none;
        opacity: 0;
    }

    .panelBox {
        .left-panel {
            .content {
                transform: translateX(0);
            }

            .image {
                transform: translateX(0);
            }
        }

        .right-panel {
            // pointer-events: none!important;

            .content {
                transform: translateX(800px);
            }

            .image {
                transform: translateX(800px);
            }
        }
    }

}

// 显示注册
.container.inRight {
    main {
        .formBox {
            transform: translateX(20px);

            .loginForm {
                pointer-events: none;
                opacity: 0;
            }

            .registerForm {
                pointer-events: auto;
                opacity: 1;
            }
        }

        .panelBox {
            .left-panel {

                pointer-events: none;

                .content {
                    transform: translateX(-800px);
                }

                .image {
                    transform: translateX(-800px);
                }
            }

            .right-panel {
                pointer-events: auto;

                .content {
                    transform: translateX(0);
                }

                .image {
                    transform: translateX(0);
                }
            }
        }
    }
}

.container.inRight::after {
    transform: translate(100%, -50%);
    right: 52%;
}

.container.inRight .right-panel {
    transform: translateX(0px);
}
</style>
