"use strict";
const operate = {
  //接口
  api: function() {
    let version = "trial";
    switch (version) {
      case "develop":
        return "http://127.0.0.1:8000/";
      case "trial":
        return "http://192.168.31.12:8000/";
      case "release":
        return "https://www.baidu.com/";
      default:
        return "http://www.baidu.com/";
    }
  }
};
exports.operate = operate;
