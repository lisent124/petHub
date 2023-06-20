export default {
	//接口
	api: function() {
		let version = "develop";
		switch (version) {
			case "develop": //开发预览版
				return "http://127.0.0.1:8000/petHub/"
				break;
			case 'trial': //体验版
				return "http://192.168.31.12:8000/petHub/"
				break;
			case 'release': //正式版
				return ""
				break;
			default: //未知,默认调用正式版
				return "http://192.168.118.1:8000/petHub/"
				break;
		}
	}
}