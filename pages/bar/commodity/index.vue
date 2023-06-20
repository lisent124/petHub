<template>
	<view>
		<view class="top">
			<image v-if="!mode" @click="changeMode()" src="../../../static/icon/show_line.png"></image>
			<image v-if="mode" @click="changeMode()" src="../../../static/icon/show_block.png"></image>
		</view>
		<showCommodities :dataList="commodities" :showStatus="mode" :flag="true"></showCommodities>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	import showCommodities from "@/pages/templates/commodity-list.vue"
	export default {
		data() {
			return {
				mode: true,
				commodities: [],
			}
		},
		onLoad() {
			this.getCommodities()
		},
		methods: {
			changeMode() {
				this.mode = !this.mode
			},
			getCommodities() {
				api.getCommodities().then((res) => {
						// console.log(res.data.data)
						// this.commodities = [...this.commodities, ...res.data.dataList]
						this.commodities = this.commodities.concat(res.data.data)
					},
					(err) => {
						console.log(err)
					})
			}
		},
		onReachBottom() {
			this.getCommodities()
		},
		components: {
			showCommodities: showCommodities
		}
	}
</script>

<style>
	.top {
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 999;
	}

	.top image {
		width: 30px;
		height: 30px;
	}
</style>