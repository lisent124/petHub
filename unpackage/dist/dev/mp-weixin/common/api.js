"use strict";
const common_vendor = require("./vendor.js");
const common_request = require("./request.js");
const common_operate = require("./operate.js");
let request = new common_request.Request().http;
let baseUrl = common_operate.operate.api();
const api = {
  // 请求样式
  test: function(data) {
    return request({
      url: "test",
      //请求头
      method: "GET",
      //请求方式
      data,
      //请求数据
      header: {}
      //添加请求头
    });
  },
  login: function(data) {
    return request({
      url: "login",
      method: "POST",
      data: {
        "phone": data.phone,
        "password": data.password
      }
    });
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
    });
  },
  getCommodities(data) {
    return request({
      url: "index/commodities",
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  getParlourInfo(data) {
    return request({
      url: "index/parlour",
      data: {
        "parlour_id": data.parlour_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  getUserInfo(data) {
    return request({
      url: "index/user",
      data: {
        "user_id": data.user_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  getBlogs(data) {
    return request({
      url: "index/blogs",
      data: {
        "self": data.self || false
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  createBlog(data) {
    if (data.image == "")
      return request({
        url: "index/blogs",
        method: "POST",
        data: {
          "content": data.content
        },
        header: {
          "id": common_vendor.index.getStorageSync("id")
        }
      });
    else
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: baseUrl + "index/blogs",
          // fileType: Image,
          name: "image",
          filePath: data.image,
          formData: {
            "content": data.content
          },
          header: {
            "id": common_vendor.index.getStorageSync("id")
          },
          success(res) {
            resolve(res);
          },
          fail(e) {
            reject(e);
          }
        });
      });
  },
  deleteBlog(data) {
    return request({
      url: "index/blogs/delete",
      method: "POSt",
      data: {
        "blog_id": data.blog_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  hideBlog(data) {
    return request({
      url: "index/blogs/show",
      data: {
        "blog_id": data.blog_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  showBlog(data) {
    return request({
      url: "index/blogs/show",
      method: "POSt",
      data: {
        "blog_id": data.blog_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  toLike(data) {
    return request({
      url: "index/blogs/like",
      data: {
        "blog_id": data.blog_id
      },
      hideLoading: true,
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  getComment(data) {
    return request({
      url: "index/blogs/comment",
      data: {
        "blog_id": data.blog_id
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  sendComment(data) {
    return request({
      url: "index/blogs/comment",
      method: "POST",
      data: {
        "blog_id": data.blog_id,
        "comment": data.comment
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  updateUserInfo(data) {
    return request({
      url: "index/user/update",
      data: {
        "name": data.name,
        "gender": data.gender,
        "location": data.location
      },
      method: "POST",
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  updateUserHead(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: baseUrl + "index/user/head",
        // fileType: image,
        name: "head",
        filePath: data.head,
        header: {
          "id": common_vendor.index.getStorageSync("id")
        },
        success(res) {
          resolve(res);
        },
        fail(e) {
          reject(e);
        }
      });
    });
  },
  createOrder(data) {
    return request({
      url: "index/commodities/order",
      method: "POST",
      data: {
        "commodity_id": data.commodity_id,
        "count": data.count
      },
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  },
  getOrder(data) {
    return request({
      url: "index/commodities/order",
      header: {
        "id": common_vendor.index.getStorageSync("id")
      }
    });
  }
};
exports.api = api;
