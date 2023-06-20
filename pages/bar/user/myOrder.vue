<template>
	<view>
		<view class="unit" v-for="i in dataList">
			<view class="unit-info">
				<view class="head">
					<view class="name">{{i.name}}</view>
					<view class="parlour">{{i.parlour}}</view>
				</view>
				<view class="body">
					<view class="price">{{i.price}}元</view>
					<view class="count">X{{i.count}}</view>

				</view>
				<view class="tail">
					<view class="state">{{stateShow(i.state)}}</view>
				</view>
			</view>
			<view class="time">{{formatTime(i.start_time)}}</view>
		</view>
	</view>
</template>

<script>
	import api from "@/common/api.js"
	import {
		timeFormat
	} from '@/common/util.js'
	export default {
		data() {
			return {
				dataList: [],
				color: "yellow"
			}
		},
		onLoad() {
			api.getOrder().then((res) => {
				this.dataList = res.data.data
			})
		},
		methods: {
			formatTime(time) {
				return timeFormat(time)
			},
			stateShow(state) {
				if (state)
					return "已完成"
				else return "未完成"
			}
		}
	}
</script>

<style>
	.unit {
		background-color: white;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 10px;
		border-bottom: 3px #f5f5f5 solid;
	}

	.unit-info {
		display: flex;
		flex-flow: row nowrap;
		/* padding: 10px 10px 0 10px; */
		justify-content: space-between;
	}

	.unit-info .head {}

	.head .name {
		font-size: 20px;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 200px;
	}

	.head .parlour {
		font-size: 15px;
	}

	.body {}

	.unit .time {
		display: flex;
		flex-flow: row-reverse;
		font-size: 5px;
	}

	.tail {
		display: flex;
		flex-flow: column;
		justify-content: space-around;
	}

	.tail .state {}
</style>