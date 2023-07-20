<template>
	<view class="content">
		<view class="row-list" v-if="!showStatus">
			<view v-for="item in dataList">
				<view class="row-unit" @click="toCommidity(item)">
					<image :src="item.picture"></image>
					<view class="name"> {{item.name}}</view>
					<view class="price"> {{item.price}} 元 / {{item.unit}}</view>
					<view class="stock">余量：{{item.stock}}</view>
					<view class="parlour" @click.stop="toParlour(item.parlour_id)"> {{item.parlour}} </view>
				</view>
			</view>
		</view>
		<view class="column-list" v-if="showStatus">
			<view v-for="item in dataList">
				<view class="column-unit" @click="toCommidity(item)">
					<image class="column-image" :src="item.picture"></image>
					<view class="column-unit-content">
						<view class="name"> {{item.name}}</view>
						<view class="price"> {{item.price}} 元 / {{item.unit}}</view>
						<view class="stock">余量：{{item.stock}}</view>
						<view class="parlour" @click.stop="toParlour(item.parlour_id)"> {{item.parlour}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			exchangeShow() {

				this.showStatus = !this.showStatus
			},
			toParlour(id) {
				uni.navigateTo({
					url: "/pages/bar/commodity/parlour?id=" + id,
				})
			},
			toCommidity(item) {
				uni.navigateTo({
					url: "/pages/bar/commodity/commodity_info?flag=" + this.flag + "&item=" + JSON
						.stringify(item)
				})

			}
		},
		props: {
			showStatus: Boolean,
			dataList: Array,
			flag: Boolean
		}
	}
</script>

<style>
	.row-list {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.row-list view image {
		margin-top: 10px;
		border-radius: 5px;
		width: 140px;
		height: 140px;
	}

	.row-list .row-unit {
		width: 165px;
		height: 240px;
		margin: 10px 10px 5px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		background-color: white;
		border-radius: 10px;
		align-items: center;
	}

	.row-unit .name {
		width: 140px;
		text-align: center;
		font-weight: 800;
		font-size: 18px;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	.row-unit .name:hover {
		color: aqua;
	}

	.row-unit .price {
		color: green;
	}

	.row-unit .stock {
		font-size: 10px;
	}

	.row-unit .parlour {
		font-size: 10px;
		color: darkblue;
	}


	.column-list {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: center;


	}

	.column-list .column-unit {
		display: flex;
		flex-direction: row;
		width: 330px;
		padding: 5px 5px;
		margin: 7px 10px;
		background-color: white;
		border-radius: 10px;
		justify-content: space-between;
	}

	.column-image {
		width: 150px;
		height: 125px;
		border-radius: 5px;
		margin: 10px 10px;
	}

	.column-unit-content {
		display: flex;
		flex-direction: column;
		width: 160px;
		justify-content: space-evenly;
		margin-right: 10px;
	}

	.column-unit-content .name {
		font-size: 20px;
		font-weight: 700;
		word-break: break-all;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.column-unit-content .name:hover {
		color: aqua;
	}

	.column-unit-content .price {
		color: green;
		font-weight: 600;
	}

	.column-unit-content .stock {
		font-weight: 400;
		font-size: 13px;
	}

	.column-unit-content .parlour {
		font-size: 10px;
		font-weight: 600;
		color: darkblue;
		align-self: flex-end;
	}
</style>