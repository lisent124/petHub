<template>
	<view class="content">
		<view class="top" v-if="flag">
			<view class="top-parlour">店铺名</view>
			<view class="top-into" @click="toParlour(item.parlour_id)">进入店铺</view>
		</view>
		<view class="middle">
			<view class="middle-container">
				<image class="middle-image" :src="item.picture"></image>
			</view>
			<view class="info">
				<view class="name">{{item.name}}</view>
				<view class="detail">
					<view class="stock">余量：{{item.stock}}</view>
					<view class="price">
						{{item.price}} 元 / {{item.unit}}
					</view>
				</view>

			</view>
		</view>
		<view class="bottom">
			<view class="selector">
				<view class="selector_icon" @click="count_reduce()">-</view>
				<input class="selector_show" type="number" v-model="count" />
				<view class="selector_icon" @click="count_add()">+</view>
			</view>
			<view class="getSum">共 {{sum}} 元</view>
			<view class="bottom_buttons">
				<button class="button online" @click="createOrder1()">到店自取</button>
				<button class="button offline">上门服务</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	export default {
		data() {
			return {
				item: Object,
				flag: true,
				count: 1,
			}
		},
		onLoad(options) {
			this.flag = "false" == options.flag ? false : true
			this.item = JSON.parse(options.item)

		},
		methods: {
			toParlour(id) {
				uni.redirectTo({
					url: "/pages/bar/commodity/parlour?id=" + id,
				})
			},
			count_add() {
				let stock = this.item.stock;
				if (this.count < stock) this.count++;
				else this.count = stock
			},
			count_reduce() {
				if (this.count > 1) this.count--;
				else this.count = 1
			},
			createOrder1() {
				uni.showModal({
					title: "确认支付\n" + this.sum + "元",
					success: (res) => {
						if (res.confirm) {
							api.createOrder({
								"commodity_id": this.item.id,
								"count": this.count
							}).then((res) => {
								uni.showToast({
									title: "下单成功",
									icon: "success"
								})
							})
						}
					}
				})

			}
		},
		computed: {
			sum: function() {
				let price = this.item.price
				if (this.count < 0) this.count = 1
				return this.count * price
			},
			showTop: function() {
				console.log(this.isShowTop)
				return this.isShowTop
			}
		}
	}
</script>

<style>
	.content {}

	.top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin-bottom: 10px;
		background-color: white;
		padding: 10px;
		border-radius: 10px;
	}

	.top-parlour {
		font-size: 20px;
		color: darkorange;
		font-weight: 550;
	}

	.middle {
		display: flex;
		align-items: center;
		flex-flow: column;
		margin-top: 10px;
		background-color: white;
		border-radius: 20px;
		padding-top: 10px;
		/* pad: 20px 10px; */
		/* margin: 3px 15px; */
	}

	.middle-image {
		border-radius: 20px;
		margin-bottom: 10px;
		border: #f5f5f5 10px double;
	}

	.middle-image:hover {
		box-shadow: 5px 5px 10px gray;
	}

	.info {
		width: 300px;
		display: flex;
		flex-flow: column nowrap;
		/* background-color: aqua; */
		padding: 10px;
		padding-top: 0px;
		border-top: 3px greenyellow solid;
		/* border-radius: 10px; */
	}

	.info .detail {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: flex-end;
	}

	.info .name {
		font-size: 25px;
	}

	.info .stock {
		color: gray;
		font-size: 10px;
	}

	.info .price {
		font-size: 25px;
		align-self: center;
	}

	.bottom {
		position: flex;
		bottom: 0;
		left: 0;
		background-color: white;
		width: 100%;
		height: 150px;
		/* border-top-left-radius: 20px; */
		padding: 10px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	.selector {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	.selector_icon {
		background-color: #FD9617;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		padding: auto;
		font-size: 25px;
		font-weight: 500;
		color: white;
		text-align: center;
		line-height: 25px;
		padding-bottom: 2px;
	}

	.selector_icon:hover {
		background-color: red;
	}

	.selector_show {
		background-color: #f5f5f5;
		border-radius: 10px;
		font-weight: 700;
		/* padding: 8px 60px; */
		margin: 0 30px;
		width: 200px;
		height: 35px;
		text-align: center;
	}

	.getSum {
		margin: 20px;
	}

	.bottom_buttons {
		display: flex;
		width: 100%;
		flex-flow: row;
		justify-content: space-evenly;
	}

	.bottom_buttons .button {
		width: 150px;
		border-radius: 15px;
		border: #FD9617 1px solid;
		height: 40px;
		font-size: 20px;
		font-weight: 600;
		line-height: 40px;
		background-color: orange;
		color: white;
	}

	.bottom_buttons .button:hover {
		color: black;
	}
</style>