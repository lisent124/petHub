<template>
	<view class="content">
		<blogUnit :user="item.user" :blog="item.blog" :flag="false"></blogUnit>
		<view>有{{likes}}人赞了</view>
		<comment v-if="haveComment" :interactives="interactives"></comment>
		<view class="text" v-if="!haveComment">还没有人评论哦......</view>

	</view>
</template>

<script>
	import comment from "@/pages/templates/comment_info.vue"
	import blogUnit from "@/pages/templates/blog-unit.vue"
	import api from "@/common/api.js"
	export default {
		data() {
			return {
				item: Object,
				interactives: [],
				flag: false,
				likes: 0
			}
		},
		onLoad(options) {
			this.item = JSON.parse(options.item)
			api.getComment({
				"blog_id": this.item.blog.id
			}).then((res) => {
				this.interactives = res.data.data
				this.likes = this.likeCount()
			})
		},
		methods: {
			likeCount() {
				let count = 0;
				for (let i = 0; i < this.interactives.length; i++) {
					if (this.interactives[i]["like"]) count++;
				}
				return count;
			}
		},
		computed: {
			haveComment() {
				if (this.interactives.length == 0) return false;
				else return true;
			}

		},
		components: {
			blogUnit: blogUnit,
			comment: comment
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.text {
		margin-top: 10px;
		font-size: 15px;
		color: dimgray;
	}
</style>