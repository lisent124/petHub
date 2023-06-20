<template>
	<view class="content">
		<view class="top" @click="toUserInfo()">
			<image class="image" :src="user.head_picture"></image>
			<view class="user-info">
				<view class="name"> {{user.name }} </view>
				<image class="gender" v-if="!gender" src="../../../static/icon/gender-female.png">
				</image>
				<image class="gender" v-if="gender" src="../../../static/icon/gender-male.png">
				</image>
			</view>
			<view class="unit-sp user-sp"> > </view>
		</view>
		<view class="middle">
			<view class="unit" @click="toMyOrder()">
				<view class="order">我的订单</view>
				<view class="unit-sp"> > </view>
			</view>
			<view class="unit" @click="toPaySetting()">
				<view class="pay-setting">安全设置</view>
				<view class="unit-sp"> > </view>
			</view>
			<view class="unit" @click="toMyBlog()">
				<view class="blogs">个人Blog</view>
				<view class="unit-sp"> > </view>
			</view>
			<view class="unit" @click="toLogout()">
				<view class="order">退出登录</view>
				<view class="unit-sp"> > </view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	export default {
		data() {
			return {
				user: Object,
			}
		},
		onLoad() {
			let id = uni.getStorageSync("id")
			api.getUserInfo({
				"user_id": id
			}).then((res) => {
				this.user = res.data.data
			})
		},
		computed: {
			gender: function() {
				return this.user.gender === 'm' ? true : false
			}
		},
		methods: {
			toUserInfo() {
				uni.navigateTo({
					url: "/pages/bar/user/userinfo?user=" + JSON.stringify(this.user)
				})
			},
			toMyOrder() {
				uni.navigateTo({
					url: "myOrder"
				})
			},
			toPaySetting() {
				uni.navigateTo({
					url: "paySetting"
				})
			},
			toMyBlog() {
				uni.navigateTo({
					url: "myBlog"
				})
			},
			toLogout() {
				uni.showModal({
					title: '确认退出',
					confirmColor: "red",
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: "/pages/entre/login"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-flow: column nowrap;
	}

	.top {
		display: flex;
		flex-flow: row nowrap;
		background-color: white;
		padding: 10px 20px;
		align-items: center;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	.top .image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.gender {
		width: 20px;
		height: 20px;
	}

	.top .user-info {
		display: flex;
		flex-flow: column nowrap;
		height: 60px;
		justify-content: space-evenly;
		margin-left: 10px;
	}

	.user-info .name {
		font-size: 20px;
	}

	.top .user-sp {
		position: absolute;
		right: 20px;
	}

	.middle {
		display: flex;
		flex-flow: column nowrap;
		margin: 20px 10px 0 10px;
		border-radius: 20px;
	}

	.middle .unit {
		background-color: white;
		margin: 2px;
		padding: 0 10px;
		border-top: 1px #f5f5f5 solid;
		height: 45px;
		line-height: 45px;
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 400;
		border-radius: 10px;
	}

	.unit-sp {
		color: gray;
		font-size: 20px;
		font-weight: 600;
		color: gainsboro;
	}
</style>