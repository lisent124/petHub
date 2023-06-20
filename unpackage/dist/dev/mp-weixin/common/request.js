"use strict";
const common_vendor = require("./vendor.js");
const common_operate = require("./operate.js");
const common_statusCode = require("./statusCode.js");
class Request {
  http(param) {
    var url = param.url, method = param.method || "GET", header = param.header || {}, data = param.data || {};
    param.token || "";
    var hideLoading = param.hideLoading || false;
    var requestUrl = common_operate.operate.api() + url;
    if (method) {
      method = method.toUpperCase();
      if (method == "POST") {
        header["content-type"] = "application/x-www-form-urlencoded";
      } else {
        header["content-type"] = "application/json";
      }
    }
    if (!hideLoading) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: requestUrl,
        data,
        method,
        header,
        success: (res) => {
          if (res.statusCode <= common_statusCode.Code.SUCCESS_END) {
            resolve(res);
            return;
          }
          common_statusCode.exceptionProcess(res.statusCode, res.data);
          reject(res.statusCode);
        },
        //请求失败
        fail: (e) => {
          common_vendor.index.showToast({
            title: "请检查网络连接" + e.data.msg,
            icon: "error"
          });
          reject();
        },
        //请求完成
        complete() {
          if (!hideLoading) {
            common_vendor.index.hideLoading();
          }
          resolve();
          return;
        }
      });
    });
  }
}
exports.Request = Request;
