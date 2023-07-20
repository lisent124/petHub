const Code = {
	SUCCESS: 200,
	// 程序员自处理界限
	SUCCESS_END: 299,
	// 没有数据
	NO_REQUEST_DATA: 460,
	// 用户不存在
	USER_IS_NOT_EXIST: 461,
	// 用户已注册
	USER_REGISTERED: 462,
	// 前后密码不一致
	PASSWD_NOT_THE_SAME: 463,
	// cookie验证失败
	ID_VALIDATION_FAILED: 464,
	//  找不到ID
	ID_MISSING: 465,
	// 错误请求
	ERROR_REQUEST: 466,
	// 密码长度应大于8 小于64
	PASSWD_LEN_ERROR: 467,
	// 数据库出错了
	DATABASE_ERROR: 530,
	// 内部出错了
	SERVICE_ERROR: 540,
}

var exceptionProcess = function(status, msg) {
	let message = "" + msg
	if (message === "") message = "未知错误"
	if (status == Code.ID_VALIDATION_FAILED) {
		uni.showToast({
			title: message,
			icon: "error"
		})
		uni.reLaunch({
			url: "/pages/entre/login"
		})
	} else if (status == Code.ID_MISSING) {
		uni.showToast({
			title: message,
			icon: "error"
		})
		uni.reLaunch({
			url: "/pages/entre/login"
		})
	} else {
		uni.showToast({
			title: message,
			icon: "error",
		})
	}
}

export default Code;
export {
	exceptionProcess,
}