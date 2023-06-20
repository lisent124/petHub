<template>
	<view class="content">
		<view v-for="item in interactives">
			<view class="unit" v-if="item.comment">
				<view class="top">
					<view class="user-info">
						<image class="head" :src="item.user.head_picture"></image>
						<view class="name"> {{item.user.name}}</view>
					</view>
				</view>
				<view class="middle">{{item.comment}}</view>
				<view class="bottom"> {{ getFormatTime(item.create_time) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		timeFormat
	} from "@/common/util.js"
	export default {
		methods: {
			getFormatTime(time) {
				return timeFormat(time)
			}
		},
		computed: {
			commmentTime: function() {
				return true
				// return timeFormat(options)
			}
		},
		computed: {
			haveComment: function() {
				let sign = this.item.comment
				if (sign === true || sign === null) return true
				return false
			}
		},
		props: {
			interactives: Array,
		}
	}
</script>

<style>
	.content {
		background-color: antiquewhite;
		margin: 15px;
		border-radius: 20px;
		padding: 15px;
		display: flex;
		flex-flow: column nowrap;
	}

	.content .title {}

	.content .unit {
		display: flex;
		flex-flow: column nowrap;
		margin: 10px 0;
		width: 310px;
	}

	.unit .top {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.top .user-info {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.user-info .name {
		font-size: 20px;
		margin-left: 10px;
	}

	.user-info .head {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.top .icon {
		width: 30px;
		height: 30px;
	}

	.middle {
		font-size: 15px;
	}

	.bottom {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		padding-bottom: 5px;
		border-bottom: 1px gray solid;
		font-size: 10px;
	}
</style>