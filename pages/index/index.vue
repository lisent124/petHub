<template>
	<view>
		<view>
			<button @click="toHome()">Home</button>
			<button @click="toTest()">{{message}}</button>
		</view>
		<view>{{data}}</view>
	</view>
</template>

<script>
	import code from "@/common/statusCode.js"
	export default {
		data() {
			return {
				message: "to test",
				data: ""
			}
		},
		methods: {
			toHome() {
				let id = uni.getStorageSync("id")
				console.log(id)
			},
			toTest() {
				uni.request({
					url: "http://127.0.0.1:8000/test",
					header: {
						"hello": "lisent",
						"id": uni.getStorageSync("id")
					},
					success(res) {
						let id = res.header['id']
						console.log(id)
						uni.setStorageSync("id", id)
					}
				})
			},
		}
	}
</script>

<style>
	.test {
		display: flex;
	}

	.swiper {
		width: 100%;
		height: 100px;
	}

	.swiper-item {
		display: block;
		width: 100%;
		height: 90px;
		line-height: 90px;
		text-align: center;
	}

	.list {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */
		width: 100%;
		height: 100px;
		justify-content: space-between;
		/* align-items: stretch; */
		background-color: antiquewhite;
	}

	.list-item {
		flex: 1;
		background-color: aqua;
	}

	.example {
		display: flex;
		width: 100%;
		height: 100px;
		align-items: stretch;
		background-color: azure;
	}

	.example view {
		/* flex: 1; */
		text-align: center;

	}

	.example view:hover {
		background-color: aliceblue;
	}

	.example-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* justify-content: center; */

	}

	.example1 {
		flex: 2;
		background-color: beige;
	}

	.example2 {
		order: -1;
		flex: 1;
	}
</style>
