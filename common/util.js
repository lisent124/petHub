let timeFormat = function(temp) {
	let time = new Date(temp)
	let now = new Date()
	let res = "";
	let day = Math.floor((now - time) / 86400000);
	if (day >= 356) {
		res = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate()() + "日"
	} else if (day >= 3) {
		res = time.getMonth() + 1 + "月" + time.getDate() + "日"
	} else if (day == 2) {
		res = "前天"
	} else if (day == 1) {
		res = "昨天"
	} else if (day == 0) {
		res = "今天"
	} else {
		// console.log("check the date")
		res = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日"
	}
	res = res + " " + time.getHours() + ":" + time.getSeconds()
	return res;
}

export {
	timeFormat
}
