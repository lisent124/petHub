<template>
	<view>
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
				dataList: [],
				self: 1
			}
		},
		onLoad() {
			api.getBlogs({
					"self": this.self
				}).then((res) => {
					this.dataList = res.data.data
					this.self += 1
				}),
				uni.$on("deleteBlog", (data) => {
					this.deleteBlog(data)
				})
		},
		methods: {
			deleteBlog(data) {
				for (let i = 0; i < this.dataList.length; i++) {
					let blog = this.dataList[i].blog
					if (blog.id == data.id) {
						this.dataList.splice(i, 1)
						uni.showToast({
							title: "删除成功",
							icon: "success"
						})
						break
					}

				}
			}
		},
		onReachBottom() {
			if (this.self == false) {
				uni.showToast({
					title: "已经到底了！",
					icon: "none"
				})
				return;
			};
			api.getBlogs({
				"self": this.self
			}).then((res) => {
				console.log(this.self, res.data.data.length)
				this.dataList = this.dataList.concat(res.data.data)
				console.log(this.self, this.dataList.length)
				this.self += 1
			}, (err) => {
				this.self = false
			})
		},
		components: {
			blogUnit: blogUnit
		}
	}
</script>

<style>

</style>