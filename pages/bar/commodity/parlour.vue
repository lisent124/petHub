<template>
	<view class="content">
		<view class="top">
			<image class="top-image" :src="parlour.head_picture"></image>
			<view class="top-name"> {{parlour.name }}</view>
		</view>
		<view class="middle">
			<view class="info">联系电话：{{parlour.phone}}</view>
			<view class="info">地址：{{parlour.location}}</view>
		</view>
		<view class="pad"></view>
		<comlist :showStatus="true" :dataList="dataList" :flag="false"></comlist>
	</view>
</template>

<script>
	import comlist from "@/pages/templates/commodity-list.vue"
	import api from "@/common/api.js"
	export default {
		data() {
			return {
				parlour: Object,
				dataList: [],
			}
		},
		onLoad(options) {
			let id = options.id
			api.getParlourCommodities({
				"parlour_id": id
			}).then((res) => {
				this.dataList = res.data.data
			}, (err) => {
				console.log(err)
			})
			api.getParlourInfo({
				"parlour_id": id
			}).then((res) => {
				this.parlour = res.data.data

			})


		},
		methods: {},
		components: {
			comlist: comlist
		}
	}
</script>

<style>
	.content {
		margin: 0 3px;
	}

	.top {
		display: flex;
		flex-flow: row nowrap;
		padding: 20px;
		justify-content: space-between;
		align-items: center;
		background-color: yellowgreen;
		border-radius: 10px;
	}

	.top-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: orange 2px solid;
	}

	.top-name {
		font-size: 35px;
		font-weight: bold;
	}

	.middle {
		margin-top: 20px;
		padding: 10px;
		background-color: green;
		border-radius: 10px;
		display: flex;
		flex-flow: column nowrap;
	}

	.middle .info {
		margin-top: 5px;
		color: antiquewhite;
	}

	.pad {
		margin-top: 10px;
		border: orange 1px solid;
	}
</style>