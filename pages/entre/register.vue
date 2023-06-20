<template>
	<view class="content">
		<image class="logo" src="/static/icon/logo.png"></image>
		<view class="text-area">
			<text class="title">注册并绑定手机号</text>
		</view>
		<form @submit="register">
			<view class="register">
				<input class="register-input" v-model="FormData.phone" name="phone" type="number"
					placeholder="请输入手机号" />
			</view>
			<view class="register">
				<input class="register-input" v-model="FormData.password0" name="password0" password
					placeholder="请输入密码" />
			</view>
			<view class="register">
				<input class="register-input" v-model="FormData.password" name="password" password
					placeholder="请重复密码" />
			</view>
			<view class="register">
				<button class="register-btn" @click="register(FormData)">{{registerText}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	import code from "@/common/statusCode.js"
	export default {
		data() {
			return {
				FormData: {
					phone: "",
					password0: "",
					password: ""
				},

				registerText: "注册",
			}
		},
		onLoad() {

		},
		methods: {
			register(data) {
				for (let foo in data) {
					if (data[foo] === "") {
						let messsage = foo == "phone" ? "电话" : "密码";
						uni.showToast({
							title: "请输入" + info,
							icon: "error"
						})
						return
					}
				}
				if (data.password != data.password0) {
					uni.showToast({
						title: "两次密码不同",
						icon: "error"
					})
				}
				api.register(data).then((res) => {
					console.log(res)
					uni.reLaunch({
						url: "login"
					})
				}, (err) => {
					this.FormData.phone = ""
					this.FormData.password = ""
					this.FormData.password0 = ""
				})

			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}

	.logo {
		height: 100rpx;
		width: 100rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 25px;
		color: black;
		font-weight: 400;
	}

	.register {
		margin-top: 70rpx;
	}

	.register-input {
		border: 1rpx;
		border-radius: 25rpx;
		background-color: white;
		height: 100rpx;
		width: 350rpx;
		padding: 0 50rpx;
		font-size: 35rpx;
	}

	.register-btn {
		background: aquamarine;
		width: 350rpx;
		height: 90rpx;
		border-radius: 35rpx;
	}
</style>