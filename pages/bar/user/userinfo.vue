<template>
	<view class="content">
		<view class="unit head" @click="changeHead()">
			<view class="title">头像</view>
			<view class="bottom">
				<image class="picture" :src="user.head_picture"></image>
				<view class="tail">></view>
			</view>
		</view>
		<view class="unit other" @click="changeName()">
			<view class="title">名字</view>
			<view class="bottom">
				<view class="text">{{user.name}}</view>
				<view class="tail">></view>
			</view>
		</view>
		<view class="unit other" @click="changeGender()">
			<view class="title">性别</view>
			<view class="bottom">
				<view class="text">{{gender}}</view>
				<view class="tail">></view>
			</view>
		</view>
		<view class="unit other" @click="changeLocation()">
			<view class="title">地区</view>
			<view class="bottom">
				<view class="text">{{user.location}}</view>
				<view class="tail">></view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	export default {
		data() {
			return {
				user: Object,
				changed: false
			}
		},
		onLoad(options) {
			let user = JSON.parse(options.user)
			this.user = user
		},
		onBackPress(e) {
			if (e.from === "navigateBack") return false
			if (this.changed) {
				uni.showModal({
					title: "确认修改信息吗？",
					success: (res) => {
						if (res.confirm) {
							api.updateUserInfo(this.user).then((res) => {
								uni.showToast({
									title: "更新成功",
									icon: "success"
								})
							})
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 上一页
							uni.navigateBack({
								success: () => {
									beforePage.user = this.user
								}
							});
							return;
						}
						uni.navigateBack()
					}
				})
			} else {
				uni.navigateBack()
			}
			return true
		},
		methods: {
			changeHead() {
				uni.chooseImage({
					count: 1,
					success: (options) => {
						api.updateUserHead({
							"head": options.tempFilePaths[0]
						}).then((res) => {
								uni.reLaunch({
									url: "/pages/bar/user/index",
								})
							},
							(error) => {
								console.log(error)
							})
					}
				})
			},
			changeName() {
				uni.showModal({
					title: "名字",
					content: this.user.name,
					confirmText: "确认",
					editable: true,
					success: (res) => {
						if (res.confirm) {
							if (res.content.length < 1) {
								uni.showToast({
									title: "名字太短咯亲！",
									icon: "none",
									duration: 2000
								})
							} else if (res.content.length > 16) {
								uni.showToast({
									title: "名字太长咯亲！",
									icon: "none",
									duration: 2000
								})
							}
							if (res.content == this.user.name) return
							this.user.name = res.content
							this.changed = true
						}
					}
				})
			},
			changeGender() {
				let itemList = ["男", "女"]
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						let gender = this.user.gender
						let sign = itemList[res.tapIndex]
						if (sign == "男") {
							if (gender == "w") this.changed = true
							this.user.gender = "m"
						} else {
							if (gender == "m") this.changed = true
							this.user.gender = "w"
						}
					}
				})
			},
			changeLocation() {
				uni.showModal({
					title: "地区",
					content: this.user.location,
					confirmText: "确认",
					editable: true,
					success: (res) => {
						if (res.confirm) {
							if (res.content != "") {
								this.changed = true
								this.user.location = res.content
							}

						}
					}
				})
			}
		},
		computed: {
			gender: function() {
				return this.user.gender == 'm' ? "男" : "女";
			}
		},

	}
</script>

<style>
	.content {
		display: flex;
		flex-flow: column nowrap;
	}

	.unit {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		background-color: white;
		justify-content: space-between;
		margin-top: 10px;
		padding: 5px 15px;
	}

	.title {
		font-size: 18px;
		font-weight: 600;
		color: gray;
	}

	.bottom {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.picture {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.tail {
		margin-left: 15px;
		font-size: 20px;
		font-weight: bold;
		color: darkgray;
		transform: scale(1, 1.5);
	}

	.other {
		height: 30px;
	}

	.bottom .text {
		font-size: 15px;
		color: gray;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>