<template>
	<view>
		<view class="add_new" @click="addNewBLog()">
			<image src="../../../static/icon/add_new.png"></image>
		</view>
		<view v-for="item in dataList">
			<blogUnit :blog="item.blog" :user="item.user" :flag="true"></blogUnit>
		</view>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	import blogUnit from "@/pages/templates/blog-unit.vue"
	export default {
		data() {
			return {
				dataList: Array,
			}
		},
		onLoad() {
			api.getBlogs({
				"self": false
			}).then((res) => {
				this.dataList = res.data.data
			})
			uni.$on("deleteBlog", (data) => {
				this.deleteBlog(data)
			})
			uni.$on("hideBlog", (data) => {
				this.deleteBlog(data)
			})
			uni.startPullDownRefresh()
		},
		methods: {
			addNewBLog() {
				uni.navigateTo({
					url: "create_blog"
				})
			},
			deleteBlog(data) {
				for (let i = 0; i < this.dataList.length; i++) {
					let blog = this.dataList[i].blog
					if (blog.id == data.id) {
						this.dataList.splice(i, 1)
						break
					}

				}
			}
		},
		onReachBottom(option) {
			api.getBlogs({
				"self": false
			}).then((res) => {
				this.dataList = this.dataList.concat(res.data.data)
			})
		},
		onPullDownRefresh() {
			setTimeout(() => {
				//结束下拉刷新
				uni.stopPullDownRefresh();
			}, 1000);

			console.log("pulldown")
		},
		components: {
			blogUnit: blogUnit,
		}
	}
</script>

<style>
	.add_new {
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 999;
	}

	.add_new image {
		width: 30px;
		height: 30px;
	}
</style>