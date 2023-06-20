import Request from '@/common/request.js'
import operate from '@/common/operate.js'
let request = new Request().http
let baseUrl = operate.api()

//全局定义请求头
export default {
	// 请求样式
	test: function(data) {
		return request({
			url: "test", //请求头
			method: "GET", //请求方式
			data: data, //请求数据
			header: {} //添加请求头
		})
	},
	login: function(data) {
		return request({
			url: "login",
			method: "POST",
			data: {
				"phone": data.phone,
				"password": data.password
			}
		})
	},
	register: function(data) {
		return request({
			url: "register",
			method: "POST",
			data: {
				"phone": data.phone,
				"password0": data.password0,
				"password": data.password
			}
		})
	},
	getCommodities(data) {
		return request({
			url: "parlour/commodities",
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getParlourCommodities(data) {
		return request({
			url: "parlour/commoditiesByParlour",
			data: {
				"parlour_id": data.parlour_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getParlourInfo(data) {
		return request({
			url: "parlour",
			data: {
				"parlour_id": data.parlour_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getUserInfo(data) {
		return request({
			url: "user",
			data: {
				"user_id": data.user_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getBlogs(data) {
		return request({
			url: "blogs",
			data: {
				"self": data.self || false
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	createBlog(data) {
		if (data.image == "")
			return request({
				url: "blogs",
				method: "POST",
				data: {
					"content": data.content,
				},
				header: {
					"id": uni.getStorageSync("id")
				}
			})
		else
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: baseUrl + "blogs",
					// fileType: Image,
					name: "image",
					filePath: data.image,
					formData: {
						"content": data.content
					},
					header: {
						"id": uni.getStorageSync("id")
					},
					success(res) {
						resolve(res)
					},
					fail(e) {
						reject(e)
					}
				})
			})
	},
	deleteBlog(data) {
		return request({
			url: "blogs/delete",
			method: "POSt",
			data: {
				"blog_id": data.blog_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	hideBlog(data) {
		return request({
			url: "blogs/show",
			data: {
				"blog_id": data.blog_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	showBlog(data) {
		return request({
			url: "blogs/show",
			method: "POSt",
			data: {
				"blog_id": data.blog_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	toLike(data) {
		return request({
			url: "blogs/like",
			data: {
				"blog_id": data.blog_id
			},
			hideLoading: true,
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getComment(data) {
		return request({
			url: "blogs/comment",
			data: {
				"blog_id": data.blog_id
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	sendComment(data) {
		return request({
			url: "blogs/comment",
			method: "POST",
			data: {
				"blog_id": data.blog_id,
				"comment": data.comment,
			},
			header: {
				"id": uni.getStorageSync("id"),
			}
		})
	},
	updateUserInfo(data) {
		return request({
			url: "user/update",
			data: {
				"name": data.name,
				"gender": data.gender,
				"location": data.location
			},
			method: "POST",
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	updateUserHead(data) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: baseUrl + "user/head",
				// fileType: image,
				name: "head",
				filePath: data.head,
				header: {
					"id": uni.getStorageSync("id")
				},
				success(res) {
					resolve(res)
				},
				fail(e) {
					reject(e)
				}
			})
		})
	},
	createOrder(data) {
		return request({
			url: "order",
			method: "POST",
			data: {
				"commodity_id": data.commodity_id,
				"count": data.count
			},
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	},
	getOrder(data) {
		return request({
			url: "order",
			header: {
				"id": uni.getStorageSync("id")
			}
		})
	}
}