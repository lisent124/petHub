import operate from './operate.js'
import Code from './statusCode.js';
import {
	exceptionProcess
} from './statusCode.js';

// vuex 的使用  详情参考官网 https://uniapp.dcloud.io/vue-vuex
// import store from '../store/index.js'

export default class Request {
	http(param) {
		// 请求参数
		var url = param.url,
			method = param.method || "GET",
			header = param.header || {},
			data = param.data || {},
			token = param.token || "",
			hideLoading = param.hideLoading || false;

		//拼接完整请求地址
		// var requestUrl = operate.api + url;
		//拼接完整请求地址（根据环境切换）
		var requestUrl = operate.api() + url;

		//请求方式:GET或POST(POST需配置
		// header: {'content-type' : "application/x-www-form-urlencoded"},)
		if (method) {
			method = method.toUpperCase(); //小写改为大写
			if (method == "POST") {
				header["content-type"] = "application/x-www-form-urlencoded";
			} else {
				header['content-type'] = "application/json"
			}
		}

		//加载圈
		if (!hideLoading) {
			uni.showLoading({
				title: '加载中...',
			});
		}
		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {

					// 将结果抛出
					if (res.data.code <= Code.SUCCESS_END) {
						resolve(res)
						return
					}
					// 对错误预处理
					exceptionProcess(res.data.code, res.data.message)
					// 结果拒绝
					hideLoading = true
					reject(res.data.code)

				},
				//请求失败
				fail: (e) => {
					uni.showToast({
						title: "请检查网络连接" + e.data.message,
						icon: 'error'
					});
					reject()
				},
				//请求完成
				complete() {

					// 隐藏加载
					if (!hideLoading) {
						uni.hideLoading();
					}
					resolve();
					return;
				}
			})
		})
	}
}