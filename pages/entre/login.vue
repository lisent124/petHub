<template>
	<view class="plot">
		<view>
			<image class="logo" src="/static/icon/logo.png"></image>
		</view>
		<form>
			<view>
				<input class="login-input" type="number" name="phone" v-model="FormData.phone" placeholder="请输入电话" />
			</view>
			<view>
				<input class="login-input" password v-model="FormData.password" name="password" placeholder="请输入密码" />
			</view>
			<view class="to-register" @click="toRegister()">没有账号？去注册</view>
			<view>
				<button class="login-btn" @click="login(FormData)">登录</button>
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
					phone: "15185205004",
					password: "password"
				}
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "/pages/entre/register"
				})
			},
			login(data) {
				// 判断是否输入数据
				for (let foo in data) {
					if (data[foo] === "") {
						let messsage = foo == "phone" ? "电话" : "密码";
						uni.showToast({
							title: "请输入" + messsage,
							icon: "error"
						})
						return
					}
				}

				// 发送请求
				api.login(data).then((res) => {
						if (res.statusCode == 200) {
							// 记录cookie
							uni.setStorageSync("id", res.header['id'])
							// 转到主页
							uni.reLaunch({
								url: "/pages/bar/blog/index"
							})
							uni.showToast({
								title: "登录成功",
								icon: "success"
							})
						} else {

						}
					},
					(err) => {
						this.FormData.phone = ""
						this.FormData.password = ""
					})

			}
		}
	}
</script>

<style>
	.plot {
		/* background-color: #f5f5f5; */
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 60%;
		width: 80%;

		border-radius: 30px;
		/* box-shadow: 0 0 500rpx lightgreen; */
	}

	.logo {
		height: 300rpx;
		width: 250rpx;
		/* margin-top: 50rpx; */
		margin-left: auto;
		margin-right: auto;
	}

	form {
		/* box-shadow: 0 0 100rpx rgba(1, 1, 1, 0.2); */
	}


	form view {
		margin-top: 50px;
	}

	form view .title {
		font-size: 20px;
		color: black;
		font-weight: 400;
		text-align: center;
		margin-bottom: 10rpx;
	}

	form view .login-input {
		border: 1rpx;
		border-radius: 25rpx;
		box-shadow: 0 0 5rpx black;
		background-color: white;
		height: 100rpx;
		width: 350rpx;
		padding: 0 50rpx;
		font-size: 35rpx;

	}

	form view .login-btn {
		background: aquamarine;
		width: 350rpx;
		height: 90rpx;
		border-radius: 35rpx;
	}

	.to-register {
		margin-top: 10px;
		font-size: 13px;
	}

	.to-register:hover {
		color: aqua;
	}
</style>