<template>
	<view class="unit">
		<view class="top">
			<view class="user-info">
				<image class="head" :src="user.head_picture"></image>
				<view class="name" :style=" !blog.visible &&hidedStyle">{{user.name}}</view>
			</view>
			<view class="more" @click="moreInfo()">...</view>
		</view>
		<view class="middle">
			<view class="text" @click="flag && toDetail()">{{blog.content}}</view>
			<view class="picture" v-if="havePicture">
				<image class="image" mode="widthFix" :src="blog.picture"></image>
			</view>
		</view>
		<view class="bottom">
			<view class="create-time">{{blogTime}}</view>
			<view class="inter">
				<image class="icon" @click="toLike()" v-if="!user.like" src="../../static/icon/heart-gary.png"></image>
				<image class="icon" @click="toLike()" v-if="user.like" src="../../static/icon/heart-red.png"></image>
				<view class="to-comment" @click="toComment()">##</view>
			</view>
		</view>
		<view class="submit-comment">
			<input class="text" :focus="focus" @blur="focus = false" placeholder="说点什么吧..." v-model="text" />
			<view class="send" @click="sendComment()">评论</view>
		</view>
		<view class="comment" v-if="flag && haveComment">
			<view class="name">{{user.name}}:</view>
			{{user.comment}}
		</view>

	</view>
</template>

<script>
	import api from "@/common/api.js"
	import {
		timeFormat
	} from "@/common/util.js"
	export default {
		data() {
			return {
				text: "",
				focus: false,
				hidedStyle: {
					"color": "gainsboro"
				}
			}
		},
		props: {
			blog: Object,
			user: Object,
			flag: Boolean
		},
		methods: {
			moreInfo() {
				let itemList = []
				const id = uni.getStorageSync("id")
				if (this.user.id == id) {
					if (this.blog.visible)
						itemList = ["删除", "隐藏"]
					else
						itemList = ["删除", "显示"]
				} else {
					if (this.user.like)
						itemList = ["取消赞", "评论"]
					else itemList = ["赞", "评论"]
				}
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						let sign = itemList[res.tapIndex]
						if (sign == "删除") {
							uni.showModal({
								title: "确认删除吗？",
								confirmColor: "red",
								success: (options) => {
									if (options.confirm) {
										api.deleteBlog({
											"blog_id": this.blog.id
										})
										uni.$emit("deleteBlog", {
											"id": this.blog.id
										})
										uni.showToast({
											title: "删除成功",
											icon: "success"
										})
									};
								}
							})

						} else if (sign == "隐藏") {
							api.hideBlog({
								"blog_id": this.blog.id
							})
							uni.$emit("hideBlog", {
								"id": this.blog.id
							})
						} else if (sign == "显示") {
							api.showBlog({
								"blog_id": this.blog.id
							})
						} else if (sign == "评论") {
							this.toComment()
						} else {
							api.toLike({
								"blog_id": this.blog.id
							})
							this.user.like = !this.user.like
						}
					}
				})
			},
			toComment() {
				this.focus = true
			},
			toLike() {
				api.toLike({
					"blog_id": this.blog.id
				}).then((res) => {
					this.user.like = !this.user.like
				}, (err) => {
					uni.showToast({
						icon: "error",
						title: "请重试"
					})
				})
			},
			toDetail() {
				let item = {
					"user": this.user,
					"blog": this.blog
				}
				uni.navigateTo({
					url: "/pages/bar/blog/blog_info?flag=true&item=" + JSON.stringify(item),
				})
			},
			sendComment() {
				if (this.text == "") {
					uni.showToast({
						title: "评论不能为空",
						icon: "error"
					})
					return;
				}
				api.sendComment({
					"comment": this.text,
					"blog_id": this.blog.id
				}).then((res) => {
					uni.showToast({
						title: "评论成功",
						icon: "success"
					})
				})
				this.text = ""
			},
		},
		onLoad() {

		},
		computed: {
			havePicture: function() {
				let sign = this.blog.picture;
				if (sign) return true;
			},
			haveComment: function() {
				let sign = this.user.comment
				if (sign) return true;
				else return false;
			},
			blogTime: function() {
				return timeFormat(this.blog.release_time)
			}
		}
	}
</script>

<style>
	.unit {
		background-color: white;
		margin: 10px;
		padding: 15px;
		border-radius: 20px;
	}

	.top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;

	}

	.top .user-info {
		display: flex;
		flex-flow: row nowrap;
	}

	.user-info .head {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px gainsboro solid;
	}

	.top .name {
		margin-top: 5px;
		margin-left: 10px;
		width: 150px;
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top .more {
		font-size: 30px;
		font-weight: normal;
		width: 30px;
		text-align: end;
		line-height: 10px;
		padding-right: 5px;
	}

	.middle {
		margin: 15px 0;
	}

	.middle .text {
		font-size: 15px;
		margin-bottom: 10px;
		line-height: 23px;
		/* max-height: 200px; */
		/* text-overflow: ellipsis fade; */
		/* white-space: nowrap; */

		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 8;
		-webkit-box-orient: vertical;
	}

	.middle .picture {
		/* background-color: aqua; */
	}

	.middle .picture .image {
		/* max-width: 400px; */
	}

	.bottom {
		display: flex;
		flex-flow: row nowrap;
		/* background-color: antiquewhite; */
		justify-content: space-between;
		align-items: center;
		border-top: 2px aquamarine solid;
		padding-top: 5px;
	}

	.bottom .create-time {
		font-size: 10px;
	}

	.bottom .inter {
		/* background-color: aqua; */
		display: flex;
		flex-flow: row nowrap;
		width: 100px;
		justify-content: space-around;
		align-items: center;
	}

	.inter .icon {
		width: 30px;
		height: 30px;
	}

	.submit-comment {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 5px 0;
		margin: 5px 0;
	}

	.submit-comment .text {
		background-color: #f5f5f5;
		border: 1px solid gray;
		border-radius: 10px;
		padding: 0 5px;
		width: 250px;
		height: 25px;
		font-size: 15px;
		color: black;
	}

	.submit-comment .send {
		width: 50px;
		height: 25px;
		border: 1px black solid;
		border-radius: 10px;
		font-size: 15px;
		line-height: 25px;
		text-align: center;
		font-weight: 600;
		color: white;
		background-color: rgb(18, 183, 245);
	}

	.comment {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-height: 50px;
		font-size: 10px;
	}

	.comment .name {
		float: left;
		margin-right: 10px;
		font-size: 10px;
		font-weight: bold;
	}
</style>