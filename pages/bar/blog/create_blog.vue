<template>
	<view>
		<view class="editor">
			<textarea class="text" v-model="text" auto-height auto-focus placeholder="...聊点什么吧"></textarea>
			<view v-if="!haveImage" class="picture_box" @tap="addPicture()">
				+
			</view>
			<image v-if="haveImage" :src="imagePath" mode="widthFix">
			</image>
			<view v-if="haveImage" class="remove-image" @click="removeImage()">X</view>
		</view>
		<view class="info">
			<view class="time">{{nowTime}}</view>
		</view>
		<view class="save" @click="createBlog()">发布</view>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	export default {
		data() {
			return {
				text: "",
				imagePath: "",
				haveImage: false,
				nowTime: ""
			}
		},
		methods: {
			addPicture() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.imagePath = res.tempFilePaths[0]
						console.log(this.haveImage)
						this.haveImage = true
					},
					fail() {

					}
				})
			},
			removeImage() {
				this.haveImage = false;
				this.imagePath = "";
			},
			createBlog() {
				if (this.text == "" && this.imagePath == "") {
					uni.showToast({
						title: "请输入内容",
						icon: "error"
					})
					return
				}
				api.createBlog({
					"content": this.text,
					"image": this.imagePath
				}).then((res) => {
					uni.showToast({
						title: "创建成功",
						icon: "success"
					})
					this.text = ""
					this.haveImage = false
					this.imagePath = ""
				})
			}
		},
		onLoad() {
			setInterval(() => {
				let now = new Date()
				this.nowTime = now.toLocaleString()
			}, 1000)
		}
	}
</script>


<style>
	.editor {
		margin: 10px;
		padding: 10px;
		background-color: white;
	}

	.editor .text {
		min-height: 200px;
		font-size: 16px;
		font-weight: 500;
		color: black;
	}

	.editor image {
		width: 200px;

	}

	.editor .remove-image {
		position: relative;
		color: red;
		font-size: 20px;
		left: 180px;
		top: -35px
	}

	.editor .picture_box {
		width: 80px;
		height: 80px;
		line-height: 70px;
		text-align: center;
		font-size: 100px;
		font-weight: 100;
		color: gainsboro;
		border: 2px gainsboro solid;
	}

	.editor .picture_box:hover {
		color: gray;
		border: 4px gray solid;
	}

	.info {}

	.info .time {
		position: absolute;
		right: 20px;
	}

	.save {
		width: 50px;
		height: 28px;
		line-height: 28px;
		font-weight: 600;
		text-align: center;
		background-color: aquamarine;
		color: gray;
		border: 2px gainsboro solid;
		border-radius: 25%;
		position: fixed;
		top: 8px;
		right: 10px;
		z-index: 999;
	}
</style>