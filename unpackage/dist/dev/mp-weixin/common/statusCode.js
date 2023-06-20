"use strict";
const common_vendor = require("./vendor.js");
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
  ID_MISSING: 465
};
var exceptionProcess = function(status, msg) {
  let message = "" + msg;
  if (status == Code.SUCCESS) {
    return;
  } else if (status == Code.NO_REQUEST_DATA) {
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
  } else if (status == Code.USER_IS_NOT_EXIST) {
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
  } else if (status == Code.USER_REGISTERED) {
    common_vendor.index.showToast({
      title: message,
      icon: "none"
    });
  } else if (status == Code.PASSWD_NOT_THE_SAME) {
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
  } else if (status == Code.ID_VALIDATION_FAILED) {
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
    common_vendor.index.reLaunch({
      url: "/pages/entre/login"
    });
  } else if (status == Code.ID_MISSING) {
    common_vendor.index.showToast({
      title: message,
      icon: "error"
    });
    common_vendor.index.reLaunch({
      url: "/pages/entre/login"
    });
  }
};
exports.Code = Code;
exports.exceptionProcess = exceptionProcess;
