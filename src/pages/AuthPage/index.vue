<template>
    <div class="login-page">
        <div :class="['modal', isLogin ? 'modal1': 'modal2']" ref="theModal">
            <form v-if="isLogin" @submit.prevent="(() => throttle(login))()" >
              <div class="title">
				<span>Login</span>
				<span class="changeModal" @click="changeModal(1)">Sign up</span>
			  </div>
              <input placeholder="Username" type="text" v-model="username" />
              <br />
              <input placeholder="Password" type="password" v-model="password" />
              <br />
              <button type="submit">Login</button>
          </form>

		  <form v-else @submit.prevent="(() => throttle(signup))()">
			<div class="title">
				<span>Sign Up</span>
				<span class="changeModal" @click="changeModal(2)">back to Login</span>
			</div>
			<input
				class="input"
				placeholder="Username"
				type="text"
				v-model="username"
			/>
			<br />
			<input placeholder="Password" type="password" v-model="password" />
			<br />
			<input placeholder="Email" type="text" v-model="email" />
			<br />
			<input placeholder="First name" type="text" v-model="first_name" />
			<br />
			<input placeholder="Last name" type="text" v-model="last_name" />
			<br />
			<button type="submit">Sign Up</button>
			</form>
        </div>
    </div>
  </template>
  
  <script setup>
import { reactive, toRefs, ref } from 'vue';
import { loginRest, signupRest } from "./api";
import Message from "@/components/Message/index.js"
import "@/components/Message/src/Message.less"

const state = reactive({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
	isLogin: true,
})

const emit  = defineEmits(["onAuth"])

const theModal = ref(null)

const { username, password, email, first_name, last_name, isLogin } = toRefs(state)

//methods:
const login = () => {
    loginRest(state.username, state.password)
        .then((response) => {
			Message.success("登录成功")
            emit("onAuth", { ...response.data, secret: state.password })
		})
        .catch((error) => {
			if(error.message){
				Message.error("登录失败: " + error.message)
			}else{
				Message.error("登录失败，请重新尝试");
			}
		});
}

const signup = () => {
    signupRest(
        state.username,
        state.password,
        state.email,
        state.first_name,
        state.last_name
    )
    .then((response) => {
		Message.success("成功注册")
        emit("onAuth", { ...response.data, secret: state.password })
	}
    )
    .catch((error) => {
		if(error.message){
			Message.error("注册失败: " + error.message)
		}else{
			Message.error("注册失败，请重新尝试");
		}
	});
}

const changeModal = (num) => {
	state.isLogin = num === 1 ? false : true
	state.username = ""
	state.password = ""
	state.email =  ""
	state.first_name =  ""
	state.last_name = ""

}

//节流函数
const throttle = (cb)=>{
	let lastCallTime = 0 
	return function(){
		const now = Date.now()
		if(now - lastCallTime >= 500){
			cb.apply(this)
			lastCallTime = now
		}
	}
}

</script>

<style scoped lang="less">
.login-page {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
		180deg,
		rgba(117, 84, 160, 1) 7%,
		rgba(117, 84, 160, 1) 17%,
		rgba(106, 95, 168, 1) 29%,
		rgba(99, 103, 174, 1) 44%,
		rgba(87, 116, 184, 1) 66%,
		rgba(70, 135, 198, 1) 83%,
		rgba(44, 163, 219, 1) 96%,
		rgba(22, 188, 237, 1) 100%,
		rgba(0, 212, 255, 1) 100%
    );
    position: relative;
    .modal{
		margin: 0 auto;
		box-shadow: -1px 4px 28px 0px rgba(0,0,0,0.75);
		border-radius: 15px;
		background: rgba(0, 0, 0, 0.4);
		width: 400px;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 40px;
		display: flex;
		height: 200px;
		overflow: hidden;
		form{
			width: 100%;
		}
		.title{
			width: 100%;
			font-size: 22px;
			color: white;
			font-weight: 700;
			display: flex;
			justify-content: space-between;
			.changeModal{
				font-size: 16px;
				cursor: pointer;
				line-height: 30px;
				text-decoration: underline;
				color: aquamarine;
			}
		}
		input {
			width: calc(100% - 16px);
			margin-top: 20px;
			padding: 8px;
			background-color: #e6f7ff;
			outline: none;
			border: 1px solid #e6f7ff;
		}
		button {
			margin-top: 20px;
			width: 100%;
			padding: 8px;
			border-radius: 20px;
			border: none;
		} 
  }
}

.modal1 {
	height: 200px !important;
	transition:height .5s ease-in-out;
}

.modal2{
	height: 370px !important;
	transition:height .5s ease-in-out;
}

</style>