if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const operate = {
    //接口
    api: function() {
      let version = "trial";
      switch (version) {
        case "develop":
          return "http://127.0.0.1:8000/petHub/";
        case "trial":
          return "http://192.168.98.85:8000/petHub/";
        case "release":
          return "";
        default:
          return "http://192.168.118.1:8000/petHub/";
      }
    }
  };
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
    SERVICE_ERROR: 540
  };
  var exceptionProcess = function(status, msg) {
    let message = "" + msg;
    if (message === "")
      message = "未知错误";
    if (status == Code.ID_VALIDATION_FAILED) {
      uni.showToast({
        title: message,
        icon: "error"
      });
      uni.reLaunch({
        url: "/pages/entre/login"
      });
    } else if (status == Code.ID_MISSING) {
      uni.showToast({
        title: message,
        icon: "error"
      });
      uni.reLaunch({
        url: "/pages/entre/login"
      });
    } else {
      uni.showToast({
        title: message,
        icon: "error"
      });
    }
  };
  class Request {
    http(param) {
      var url = param.url, method = param.method || "GET", header = param.header || {}, data = param.data || {};
      param.token || "";
      var hideLoading = param.hideLoading || false;
      var requestUrl = operate.api() + url;
      if (method) {
        method = method.toUpperCase();
        if (method == "POST") {
          header["content-type"] = "application/x-www-form-urlencoded";
        } else {
          header["content-type"] = "application/json";
        }
      }
      if (!hideLoading) {
        uni.showLoading({
          title: "加载中..."
        });
      }
      return new Promise((resolve, reject) => {
        uni.request({
          url: requestUrl,
          data,
          method,
          header,
          success: (res) => {
            if (res.data.code <= Code.SUCCESS_END) {
              resolve(res);
              return;
            }
            exceptionProcess(res.data.code, res.data.message);
            hideLoading = true;
            reject(res.data.code);
          },
          //请求失败
          fail: (e) => {
            uni.showToast({
              title: "请检查网络连接" + e.data.message,
              icon: "error"
            });
            reject();
          },
          //请求完成
          complete() {
            if (!hideLoading) {
              uni.hideLoading();
            }
            resolve();
            return;
          }
        });
      });
    }
  }
  let request = new Request().http;
  let baseUrl = operate.api();
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
        url: "parlour/commodities",
        header: {
          "id": uni.getStorageSync("id")
        }
      });
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
      });
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
      });
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
      });
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
      });
    },
    createBlog(data) {
      if (data.image == "")
        return request({
          url: "blogs",
          method: "POST",
          data: {
            "content": data.content
          },
          header: {
            "id": uni.getStorageSync("id")
          }
        });
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
        url: "blogs/delete",
        method: "POSt",
        data: {
          "blog_id": data.blog_id
        },
        header: {
          "id": uni.getStorageSync("id")
        }
      });
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
      });
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
      });
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
      });
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
      });
    },
    sendComment(data) {
      return request({
        url: "blogs/comment",
        method: "POST",
        data: {
          "blog_id": data.blog_id,
          "comment": data.comment
        },
        header: {
          "id": uni.getStorageSync("id")
        }
      });
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
      });
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
        url: "order",
        method: "POST",
        data: {
          "commodity_id": data.commodity_id,
          "count": data.count
        },
        header: {
          "id": uni.getStorageSync("id")
        }
      });
    },
    getOrder(data) {
      return request({
        url: "order",
        header: {
          "id": uni.getStorageSync("id")
        }
      });
    }
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$h = {
    data() {
      return {
        FormData: {
          phone: "15185205004",
          password: "password"
        }
      };
    },
    methods: {
      toRegister() {
        uni.navigateTo({
          url: "/pages/entre/register"
        });
      },
      login(data) {
        for (let foo in data) {
          if (data[foo] === "") {
            let messsage = foo == "phone" ? "电话" : "密码";
            uni.showToast({
              title: "请输入" + messsage,
              icon: "error"
            });
            return;
          }
        }
        api.login(data).then(
          (res) => {
            if (res.statusCode == 200) {
              uni.setStorageSync("id", res.header["id"]);
              uni.reLaunch({
                url: "/pages/bar/blog/index"
              });
              uni.showToast({
                title: "登录成功",
                icon: "success"
              });
            }
          },
          (err) => {
            this.FormData.phone = "";
            this.FormData.password = "";
          }
        );
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "plot" }, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("image", {
          class: "logo",
          src: "/static/icon/logo.png"
        })
      ]),
      vue.createElementVNode("form", null, [
        vue.createElementVNode("view", null, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "login-input",
              type: "number",
              name: "phone",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.FormData.phone = $event),
              placeholder: "请输入电话"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.FormData.phone]
          ])
        ]),
        vue.createElementVNode("view", null, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "login-input",
              password: "",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.FormData.password = $event),
              name: "password",
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.FormData.password]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "to-register",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.toRegister())
        }, "没有账号？去注册"),
        vue.createElementVNode("view", null, [
          vue.createElementVNode("button", {
            class: "login-btn",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.login($data.FormData))
          }, "登录")
        ])
      ])
    ]);
  }
  const PagesEntreLogin = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/entre/login.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main$g = {
    data() {
      return {};
    },
    methods: {
      exchangeShow() {
        this.showStatus = !this.showStatus;
      },
      toParlour(id) {
        uni.navigateTo({
          url: "/pages/bar/commodity/parlour?id=" + id
        });
      },
      toCommidity(item) {
        uni.navigateTo({
          url: "/pages/bar/commodity/commodity_info?flag=" + this.flag + "&item=" + JSON.stringify(item)
        });
      }
    },
    props: {
      showStatus: Boolean,
      dataList: Array,
      flag: Boolean
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      !$props.showStatus ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "row-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.dataList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", null, [
              vue.createElementVNode("view", {
                class: "row-unit",
                onClick: ($event) => $options.toCommidity(item)
              }, [
                vue.createElementVNode("image", {
                  src: item.picture
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "price" },
                  vue.toDisplayString(item.price) + " 元 / " + vue.toDisplayString(item.unit),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "stock" },
                  "余量：" + vue.toDisplayString(item.stock),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "parlour",
                  onClick: vue.withModifiers(($event) => $options.toParlour(item.parlour_id), ["stop"])
                }, vue.toDisplayString(item.parlour), 9, ["onClick"])
              ], 8, ["onClick"])
            ]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true),
      $props.showStatus ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "column-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.dataList, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", null, [
              vue.createElementVNode("view", {
                class: "column-unit",
                onClick: ($event) => $options.toCommidity(item)
              }, [
                vue.createElementVNode("image", {
                  class: "column-image",
                  src: item.picture
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "column-unit-content" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "price" },
                    vue.toDisplayString(item.price) + " 元 / " + vue.toDisplayString(item.unit),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "stock" },
                    "余量：" + vue.toDisplayString(item.stock),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", {
                    class: "parlour",
                    onClick: vue.withModifiers(($event) => $options.toParlour(item.parlour_id), ["stop"])
                  }, vue.toDisplayString(item.parlour), 9, ["onClick"])
                ])
              ], 8, ["onClick"])
            ]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const comlist = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-77baf1b8"], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/commodity-list.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        mode: true,
        commodities: []
      };
    },
    onLoad() {
      this.getCommodities();
    },
    methods: {
      changeMode() {
        this.mode = !this.mode;
      },
      getCommodities() {
        api.getCommodities().then(
          (res) => {
            this.commodities = this.commodities.concat(res.data.data);
          },
          (err) => {
            formatAppLog("log", "at pages/bar/commodity/index.vue:35", err);
          }
        );
      }
    },
    onReachBottom() {
      this.getCommodities();
    },
    components: {
      showCommodities: comlist
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_showCommodities = vue.resolveComponent("showCommodities");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "top" }, [
        !$data.mode ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          onClick: _cache[0] || (_cache[0] = ($event) => $options.changeMode()),
          src: "/static/icon/show_line.png"
        })) : vue.createCommentVNode("v-if", true),
        $data.mode ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          onClick: _cache[1] || (_cache[1] = ($event) => $options.changeMode()),
          src: "/static/icon/show_block.png"
        })) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createVNode(_component_showCommodities, {
        dataList: $data.commodities,
        showStatus: $data.mode,
        flag: true
      }, null, 8, ["dataList", "showStatus"])
    ]);
  }
  const PagesBarCommodityIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/index.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        message: "to test",
        data: ""
      };
    },
    methods: {
      toHome() {
        let id = uni.getStorageSync("id");
        formatAppLog("log", "at pages/index/index.vue:23", id);
      },
      toTest() {
        uni.request({
          url: "http://127.0.0.1:8000/test",
          header: {
            "hello": "lisent",
            "id": uni.getStorageSync("id")
          },
          success(res) {
            let id = res.header["id"];
            formatAppLog("log", "at pages/index/index.vue:34", id);
            uni.setStorageSync("id", id);
          }
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", null, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.toHome())
        }, "Home"),
        vue.createElementVNode(
          "button",
          {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.toTest())
          },
          vue.toDisplayString($data.message),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode(
        "view",
        null,
        vue.toDisplayString($data.data),
        1
        /* TEXT */
      )
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/index/index.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        FormData: {
          phone: "",
          password0: "",
          password: ""
        },
        registerText: "注册"
      };
    },
    onLoad() {
    },
    methods: {
      register(data) {
        for (let foo in data) {
          if (data[foo] === "") {
            uni.showToast({
              title: "请输入" + info,
              icon: "error"
            });
            return;
          }
        }
        if (data.password != data.password0) {
          uni.showToast({
            title: "两次密码不同",
            icon: "error"
          });
        }
        api.register(data).then((res) => {
          formatAppLog("log", "at pages/entre/register.vue:64", res);
          uni.reLaunch({
            url: "login"
          });
        }, (err) => {
          this.FormData.phone = "";
          this.FormData.password = "";
          this.FormData.password0 = "";
        });
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: "/static/icon/logo.png"
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "title" }, "注册并绑定手机号")
      ]),
      vue.createElementVNode(
        "form",
        {
          onSubmit: _cache[4] || (_cache[4] = (...args) => $options.register && $options.register(...args))
        },
        [
          vue.createElementVNode("view", { class: "register" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "register-input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.FormData.phone = $event),
                name: "phone",
                type: "number",
                placeholder: "请输入手机号"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.FormData.phone]
            ])
          ]),
          vue.createElementVNode("view", { class: "register" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "register-input",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.FormData.password0 = $event),
                name: "password0",
                password: "",
                placeholder: "请输入密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.FormData.password0]
            ])
          ]),
          vue.createElementVNode("view", { class: "register" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "register-input",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.FormData.password = $event),
                name: "password",
                password: "",
                placeholder: "请重复密码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.FormData.password]
            ])
          ]),
          vue.createElementVNode("view", { class: "register" }, [
            vue.createElementVNode(
              "button",
              {
                class: "register-btn",
                onClick: _cache[3] || (_cache[3] = ($event) => $options.register($data.FormData))
              },
              vue.toDisplayString($data.registerText),
              1
              /* TEXT */
            )
          ])
        ],
        32
        /* HYDRATE_EVENTS */
      )
    ]);
  }
  const PagesEntreRegister = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/entre/register.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        parlour: Object,
        dataList: []
      };
    },
    onLoad(options) {
      let id = options.id;
      api.getParlourCommodities({
        "parlour_id": id
      }).then((res) => {
        this.dataList = res.data.data;
      }, (err) => {
        formatAppLog("log", "at pages/bar/commodity/parlour.vue:33", err);
      });
      api.getParlourInfo({
        "parlour_id": id
      }).then((res) => {
        this.parlour = res.data.data;
      });
    },
    methods: {},
    components: {
      comlist
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_comlist = vue.resolveComponent("comlist");
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("image", {
          class: "top-image",
          src: $data.parlour.head_picture
        }, null, 8, ["src"]),
        vue.createElementVNode(
          "view",
          { class: "top-name" },
          vue.toDisplayString($data.parlour.name),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "middle" }, [
        vue.createElementVNode(
          "view",
          { class: "info" },
          "联系电话：" + vue.toDisplayString($data.parlour.phone),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "view",
          { class: "info" },
          "地址：" + vue.toDisplayString($data.parlour.location),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "pad" }),
      vue.createVNode(_component_comlist, {
        showStatus: true,
        dataList: $data.dataList,
        flag: false
      }, null, 8, ["dataList"])
    ]);
  }
  const PagesBarCommodityParlour = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/parlour.vue"]]);
  let timeFormat = function(temp) {
    let time = new Date(temp);
    let now = /* @__PURE__ */ new Date();
    let res = "";
    let day = Math.floor((now - time) / 864e5);
    if (day >= 356) {
      res = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate()() + "日";
    } else if (day >= 3) {
      res = time.getMonth() + 1 + "月" + time.getDate() + "日";
    } else if (day == 2) {
      res = "前天";
    } else if (day == 1) {
      res = "昨天";
    } else if (day == 0) {
      res = "今天";
    } else {
      res = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日";
    }
    res = res + " " + time.getHours() + ":" + time.getSeconds();
    return res;
  };
  const _sfc_main$b = {
    data() {
      return {
        text: "",
        focus: false,
        hidedStyle: {
          "color": "gainsboro"
        }
      };
    },
    props: {
      blog: Object,
      user: Object,
      flag: Boolean
    },
    methods: {
      moreInfo() {
        let itemList = [];
        const id = uni.getStorageSync("id");
        if (this.user.id == id) {
          if (this.blog.visible)
            itemList = ["删除", "隐藏"];
          else
            itemList = ["删除", "显示"];
        } else {
          if (this.user.like)
            itemList = ["取消赞", "评论"];
          else
            itemList = ["赞", "评论"];
        }
        uni.showActionSheet({
          itemList,
          success: (res) => {
            let sign = itemList[res.tapIndex];
            if (sign == "删除") {
              uni.showModal({
                title: "确认删除吗？",
                confirmColor: "red",
                success: (options) => {
                  if (options.confirm) {
                    api.deleteBlog({
                      "blog_id": this.blog.id
                    });
                    uni.$emit("deleteBlog", {
                      "id": this.blog.id
                    });
                    uni.showToast({
                      title: "删除成功",
                      icon: "success"
                    });
                  }
                }
              });
            } else if (sign == "隐藏") {
              api.hideBlog({
                "blog_id": this.blog.id
              });
              uni.$emit("hideBlog", {
                "id": this.blog.id
              });
            } else if (sign == "显示") {
              api.showBlog({
                "blog_id": this.blog.id
              });
            } else if (sign == "评论") {
              this.toComment();
            } else {
              api.toLike({
                "blog_id": this.blog.id
              });
              this.user.like = !this.user.like;
            }
          }
        });
      },
      toComment() {
        this.focus = true;
      },
      toLike() {
        api.toLike({
          "blog_id": this.blog.id
        }).then((res) => {
          this.user.like = !this.user.like;
        }, (err) => {
          uni.showToast({
            icon: "error",
            title: "请重试"
          });
        });
      },
      toDetail() {
        let item = {
          "user": this.user,
          "blog": this.blog
        };
        uni.navigateTo({
          url: "/pages/bar/blog/blog_info?flag=true&item=" + JSON.stringify(item)
        });
      },
      sendComment() {
        if (this.text == "") {
          uni.showToast({
            title: "评论不能为空",
            icon: "error"
          });
          return;
        }
        api.sendComment({
          "comment": this.text,
          "blog_id": this.blog.id
        }).then((res) => {
          uni.showToast({
            title: "评论成功",
            icon: "success"
          });
        });
        this.text = "";
      }
    },
    onLoad() {
    },
    computed: {
      havePicture: function() {
        let sign = this.blog.picture;
        if (sign)
          return true;
      },
      haveComment: function() {
        let sign = this.user.comment;
        if (sign)
          return true;
        else
          return false;
      },
      blogTime: function() {
        return timeFormat(this.blog.release_time);
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "unit" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode("image", {
            class: "head",
            src: $props.user.head_picture
          }, null, 8, ["src"]),
          vue.createElementVNode(
            "view",
            {
              class: "name",
              style: vue.normalizeStyle(!$props.blog.visible && $data.hidedStyle)
            },
            vue.toDisplayString($props.user.name),
            5
            /* TEXT, STYLE */
          )
        ]),
        vue.createElementVNode("view", {
          class: "more",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.moreInfo())
        }, "...")
      ]),
      vue.createElementVNode("view", { class: "middle" }, [
        vue.createElementVNode(
          "view",
          {
            class: "text",
            onClick: _cache[1] || (_cache[1] = ($event) => $props.flag && $options.toDetail())
          },
          vue.toDisplayString($props.blog.content),
          1
          /* TEXT */
        ),
        $options.havePicture ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "picture"
        }, [
          vue.createElementVNode("image", {
            class: "image",
            mode: "widthFix",
            src: $props.blog.picture
          }, null, 8, ["src"])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "bottom" }, [
        vue.createElementVNode(
          "view",
          { class: "create-time" },
          vue.toDisplayString($options.blogTime),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "inter" }, [
          !$props.user.like ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "icon",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.toLike()),
            src: "/static/icon/heart-gary.png"
          })) : vue.createCommentVNode("v-if", true),
          $props.user.like ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: "icon",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.toLike()),
            src: "/static/icon/heart-red.png"
          })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "to-comment",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.toComment())
          }, "##")
        ])
      ]),
      vue.createElementVNode("view", { class: "submit-comment" }, [
        vue.withDirectives(vue.createElementVNode("input", {
          class: "text",
          focus: $data.focus,
          onBlur: _cache[5] || (_cache[5] = ($event) => $data.focus = false),
          placeholder: "说点什么吧...",
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.text = $event)
        }, null, 40, ["focus"]), [
          [vue.vModelText, $data.text]
        ]),
        vue.createElementVNode("view", {
          class: "send",
          onClick: _cache[7] || (_cache[7] = ($event) => $options.sendComment())
        }, "评论")
      ]),
      $props.flag && $options.haveComment ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "comment"
      }, [
        vue.createElementVNode(
          "view",
          { class: "name" },
          vue.toDisplayString($props.user.name) + ":",
          1
          /* TEXT */
        ),
        vue.createTextVNode(
          " " + vue.toDisplayString($props.user.comment),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const blogUnit = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-8b1c243c"], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/blog-unit.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        dataList: Array
      };
    },
    onLoad() {
      api.getBlogs({
        "self": false
      }).then((res) => {
        this.dataList = res.data.data;
      });
      uni.$on("deleteBlog", (data) => {
        this.deleteBlog(data);
      });
      uni.$on("hideBlog", (data) => {
        this.deleteBlog(data);
      });
      uni.startPullDownRefresh();
    },
    methods: {
      addNewBLog() {
        uni.navigateTo({
          url: "create_blog"
        });
      },
      deleteBlog(data) {
        for (let i = 0; i < this.dataList.length; i++) {
          let blog = this.dataList[i].blog;
          if (blog.id == data.id) {
            this.dataList.splice(i, 1);
            break;
          }
        }
      }
    },
    onReachBottom(option) {
      api.getBlogs({
        "self": false
      }).then((res) => {
        this.dataList = this.dataList.concat(res.data.data);
      });
    },
    onPullDownRefresh() {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 1e3);
      formatAppLog("log", "at pages/bar/blog/index.vue:65", "pulldown");
    },
    components: {
      blogUnit
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_blogUnit = vue.resolveComponent("blogUnit");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        class: "add_new",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.addNewBLog())
      }, [
        vue.createElementVNode("image", { src: "/static/icon/add_new.png" })
      ]),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.dataList, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", null, [
            vue.createVNode(_component_blogUnit, {
              blog: item.blog,
              user: item.user,
              flag: true
            }, null, 8, ["blog", "user"])
          ]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesBarBlogIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/index.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        user: Object
      };
    },
    onLoad() {
      let id = uni.getStorageSync("id");
      api.getUserInfo({
        "user_id": id
      }).then((res) => {
        this.user = res.data.data;
      });
    },
    computed: {
      gender: function() {
        return this.user.gender === "m" ? true : false;
      }
    },
    methods: {
      toUserInfo() {
        uni.navigateTo({
          url: "/pages/bar/user/userinfo?user=" + JSON.stringify(this.user)
        });
      },
      toMyOrder() {
        uni.navigateTo({
          url: "myOrder"
        });
      },
      toPaySetting() {
        uni.navigateTo({
          url: "paySetting"
        });
      },
      toMyBlog() {
        uni.navigateTo({
          url: "myBlog"
        });
      },
      toLogout() {
        uni.showModal({
          title: "确认退出",
          confirmColor: "red",
          success: function(res) {
            if (res.confirm) {
              uni.reLaunch({
                url: "/pages/entre/login"
              });
            } else if (res.cancel) {
              formatAppLog("log", "at pages/bar/user/index.vue:87", "用户点击取消");
            }
          }
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", {
        class: "top",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.toUserInfo())
      }, [
        vue.createElementVNode("image", {
          class: "image",
          src: $data.user.head_picture
        }, null, 8, ["src"]),
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode(
            "view",
            { class: "name" },
            vue.toDisplayString($data.user.name),
            1
            /* TEXT */
          ),
          !$options.gender ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "gender",
            src: "/static/icon/gender-female.png"
          })) : vue.createCommentVNode("v-if", true),
          $options.gender ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: "gender",
            src: "/static/icon/gender-male.png"
          })) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "unit-sp user-sp" }, " > ")
      ]),
      vue.createElementVNode("view", { class: "middle" }, [
        vue.createElementVNode("view", {
          class: "unit",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.toMyOrder())
        }, [
          vue.createElementVNode("view", { class: "order" }, "我的订单"),
          vue.createElementVNode("view", { class: "unit-sp" }, " > ")
        ]),
        vue.createElementVNode("view", {
          class: "unit",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.toPaySetting())
        }, [
          vue.createElementVNode("view", { class: "pay-setting" }, "安全设置"),
          vue.createElementVNode("view", { class: "unit-sp" }, " > ")
        ]),
        vue.createElementVNode("view", {
          class: "unit",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.toMyBlog())
        }, [
          vue.createElementVNode("view", { class: "blogs" }, "个人Blog"),
          vue.createElementVNode("view", { class: "unit-sp" }, " > ")
        ]),
        vue.createElementVNode("view", {
          class: "unit",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.toLogout())
        }, [
          vue.createElementVNode("view", { class: "order" }, "退出登录"),
          vue.createElementVNode("view", { class: "unit-sp" }, " > ")
        ])
      ])
    ]);
  }
  const PagesBarUserIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/index.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        item: Object,
        flag: true,
        count: 1
      };
    },
    onLoad(options) {
      this.flag = "false" == options.flag ? false : true;
      this.item = JSON.parse(options.item);
    },
    methods: {
      toParlour(id) {
        uni.redirectTo({
          url: "/pages/bar/commodity/parlour?id=" + id
        });
      },
      count_add() {
        let stock = this.item.stock;
        if (this.count < stock)
          this.count++;
        else
          this.count = stock;
      },
      count_reduce() {
        if (this.count > 1)
          this.count--;
        else
          this.count = 1;
      },
      createOrder1() {
        uni.showModal({
          title: "确认支付\n" + this.sum + "元",
          success: (res) => {
            if (res.confirm) {
              api.createOrder({
                "commodity_id": this.item.id,
                "count": this.count
              }).then((res2) => {
                uni.showToast({
                  title: "下单成功",
                  icon: "success"
                });
              });
            }
          }
        });
      }
    },
    computed: {
      sum: function() {
        let price = this.item.price;
        if (this.count < 0)
          this.count = 1;
        return this.count * price;
      },
      showTop: function() {
        formatAppLog("log", "at pages/bar/commodity/commodity_info.vue:94", this.isShowTop);
        return this.isShowTop;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      $data.flag ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "top"
      }, [
        vue.createElementVNode("view", { class: "top-parlour" }, "店铺名"),
        vue.createElementVNode("view", {
          class: "top-into",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.toParlour($data.item.parlour_id))
        }, "进入店铺")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "middle" }, [
        vue.createElementVNode("view", { class: "middle-container" }, [
          vue.createElementVNode("image", {
            class: "middle-image",
            src: $data.item.picture
          }, null, 8, ["src"])
        ]),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode(
            "view",
            { class: "name" },
            vue.toDisplayString($data.item.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "detail" }, [
            vue.createElementVNode(
              "view",
              { class: "stock" },
              "余量：" + vue.toDisplayString($data.item.stock),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "price" },
              vue.toDisplayString($data.item.price) + " 元 / " + vue.toDisplayString($data.item.unit),
              1
              /* TEXT */
            )
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "bottom" }, [
        vue.createElementVNode("view", { class: "selector" }, [
          vue.createElementVNode("view", {
            class: "selector_icon",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.count_reduce())
          }, "-"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "selector_show",
              type: "number",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.count = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.count]
          ]),
          vue.createElementVNode("view", {
            class: "selector_icon",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.count_add())
          }, "+")
        ]),
        vue.createElementVNode(
          "view",
          { class: "getSum" },
          "共 " + vue.toDisplayString($options.sum) + " 元",
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "bottom_buttons" }, [
          vue.createElementVNode("button", {
            class: "button online",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.createOrder1())
          }, "到店自取"),
          vue.createElementVNode("button", { class: "button offline" }, "上门服务")
        ])
      ])
    ]);
  }
  const PagesBarCommodityCommodity_info = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/commodity_info.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        dataList: [],
        color: "yellow"
      };
    },
    onLoad() {
      api.getOrder().then((res) => {
        this.dataList = res.data.data;
      });
    },
    methods: {
      formatTime(time) {
        return timeFormat(time);
      },
      stateShow(state) {
        if (state)
          return "已完成";
        else
          return "未完成";
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.dataList, (i) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "unit" }, [
            vue.createElementVNode("view", { class: "unit-info" }, [
              vue.createElementVNode("view", { class: "head" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(i.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "parlour" },
                  vue.toDisplayString(i.parlour),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "body" }, [
                vue.createElementVNode(
                  "view",
                  { class: "price" },
                  vue.toDisplayString(i.price) + "元",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "count" },
                  "X" + vue.toDisplayString(i.count),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "tail" }, [
                vue.createElementVNode(
                  "view",
                  { class: "state" },
                  vue.toDisplayString($options.stateShow(i.state)),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode(
              "view",
              { class: "time" },
              vue.toDisplayString($options.formatTime(i.start_time)),
              1
              /* TEXT */
            )
          ]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesBarUserMyOrder = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/myOrder.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesBarUserPaySetting = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/paySetting.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        dataList: [],
        self: 1
      };
    },
    onLoad() {
      api.getBlogs({
        "self": this.self
      }).then((res) => {
        this.dataList = res.data.data;
        this.self += 1;
      }), uni.$on("deleteBlog", (data) => {
        this.deleteBlog(data);
      });
    },
    methods: {
      deleteBlog(data) {
        for (let i = 0; i < this.dataList.length; i++) {
          let blog = this.dataList[i].blog;
          if (blog.id == data.id) {
            this.dataList.splice(i, 1);
            uni.showToast({
              title: "删除成功",
              icon: "success"
            });
            break;
          }
        }
      }
    },
    onReachBottom() {
      if (this.self == false) {
        uni.showToast({
          title: "已经到底了！",
          icon: "none"
        });
        return;
      }
      api.getBlogs({
        "self": this.self
      }).then((res) => {
        formatAppLog("log", "at pages/bar/user/myBlog.vue:57", this.self, res.data.data.length);
        this.dataList = this.dataList.concat(res.data.data);
        formatAppLog("log", "at pages/bar/user/myBlog.vue:59", this.self, this.dataList.length);
        this.self += 1;
      }, (err) => {
        this.self = false;
      });
    },
    components: {
      blogUnit
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_blogUnit = vue.resolveComponent("blogUnit");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.dataList, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", null, [
            vue.createVNode(_component_blogUnit, {
              blog: item.blog,
              user: item.user,
              flag: true
            }, null, 8, ["blog", "user"])
          ]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesBarUserMyBlog = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/myBlog.vue"]]);
  const _sfc_main$4 = {
    methods: {
      getFormatTime(time) {
        return timeFormat(time);
      }
    },
    computed: {
      commmentTime: function() {
        return true;
      }
    },
    computed: {
      haveComment: function() {
        let sign = this.item.comment;
        if (sign === true || sign === null)
          return true;
        return false;
      }
    },
    props: {
      interactives: Array
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.interactives, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", null, [
            item.comment ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "unit"
            }, [
              vue.createElementVNode("view", { class: "top" }, [
                vue.createElementVNode("view", { class: "user-info" }, [
                  vue.createElementVNode("image", {
                    class: "head",
                    src: item.user.head_picture
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "view",
                    { class: "name" },
                    vue.toDisplayString(item.user.name),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode(
                "view",
                { class: "middle" },
                vue.toDisplayString(item.comment),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "bottom" },
                vue.toDisplayString($options.getFormatTime(item.create_time)),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      ))
    ]);
  }
  const comment = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1e26b47f"], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/comment_info.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        item: Object,
        interactives: [],
        flag: false,
        likes: 0
      };
    },
    onLoad(options) {
      this.item = JSON.parse(options.item);
      api.getComment({
        "blog_id": this.item.blog.id
      }).then((res) => {
        this.interactives = res.data.data;
        this.likes = this.likeCount();
      });
    },
    methods: {
      likeCount() {
        let count = 0;
        for (let i = 0; i < this.interactives.length; i++) {
          if (this.interactives[i]["like"])
            count++;
        }
        return count;
      }
    },
    computed: {
      haveComment() {
        if (this.interactives.length == 0)
          return false;
        else
          return true;
      }
    },
    components: {
      blogUnit,
      comment
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_blogUnit = vue.resolveComponent("blogUnit");
    const _component_comment = vue.resolveComponent("comment");
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_blogUnit, {
        user: $data.item.user,
        blog: $data.item.blog,
        flag: false
      }, null, 8, ["user", "blog"]),
      vue.createElementVNode(
        "view",
        null,
        "有" + vue.toDisplayString($data.likes) + "人赞了",
        1
        /* TEXT */
      ),
      $options.haveComment ? (vue.openBlock(), vue.createBlock(_component_comment, {
        key: 0,
        interactives: $data.interactives
      }, null, 8, ["interactives"])) : vue.createCommentVNode("v-if", true),
      !$options.haveComment ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "text"
      }, "还没有人评论哦......")) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesBarBlogBlog_info = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/blog_info.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        user: Object,
        changed: false
      };
    },
    onLoad(options) {
      let user = JSON.parse(options.user);
      this.user = user;
    },
    onBackPress(e) {
      if (e.from === "navigateBack")
        return false;
      if (this.changed) {
        uni.showModal({
          title: "确认修改信息吗？",
          success: (res) => {
            if (res.confirm) {
              api.updateUserInfo(this.user).then((res2) => {
                uni.showToast({
                  title: "更新成功",
                  icon: "success"
                });
              });
              let pages = getCurrentPages();
              let beforePage = pages[pages.length - 2];
              uni.navigateBack({
                success: () => {
                  beforePage.user = this.user;
                }
              });
              return;
            }
            uni.navigateBack();
          }
        });
      } else {
        uni.navigateBack();
      }
      return true;
    },
    methods: {
      changeHead() {
        uni.chooseImage({
          count: 1,
          success: (options) => {
            api.updateUserHead({
              "head": options.tempFilePaths[0]
            }).then(
              (res) => {
                uni.reLaunch({
                  url: "/pages/bar/user/index"
                });
              },
              (error) => {
                formatAppLog("log", "at pages/bar/user/userinfo.vue:90", error);
              }
            );
          }
        });
      },
      changeName() {
        uni.showModal({
          title: "名字",
          content: this.user.name,
          confirmText: "确认",
          editable: true,
          success: (res) => {
            if (res.confirm) {
              if (res.content.length < 1) {
                uni.showToast({
                  title: "名字太短咯亲！",
                  icon: "none",
                  duration: 2e3
                });
              } else if (res.content.length > 16) {
                uni.showToast({
                  title: "名字太长咯亲！",
                  icon: "none",
                  duration: 2e3
                });
              }
              if (res.content == this.user.name)
                return;
              this.user.name = res.content;
              this.changed = true;
            }
          }
        });
      },
      changeGender() {
        let itemList = ["男", "女"];
        uni.showActionSheet({
          itemList,
          success: (res) => {
            let gender = this.user.gender;
            let sign = itemList[res.tapIndex];
            if (sign == "男") {
              if (gender == "w")
                this.changed = true;
              this.user.gender = "m";
            } else {
              if (gender == "m")
                this.changed = true;
              this.user.gender = "w";
            }
          }
        });
      },
      changeLocation() {
        uni.showModal({
          title: "地区",
          content: this.user.location,
          confirmText: "确认",
          editable: true,
          success: (res) => {
            if (res.confirm) {
              if (res.content != "") {
                this.changed = true;
                this.user.location = res.content;
              }
            }
          }
        });
      }
    },
    computed: {
      gender: function() {
        return this.user.gender == "m" ? "男" : "女";
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", {
        class: "unit head",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.changeHead())
      }, [
        vue.createElementVNode("view", { class: "title" }, "头像"),
        vue.createElementVNode("view", { class: "bottom" }, [
          vue.createElementVNode("image", {
            class: "picture",
            src: $data.user.head_picture
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "tail" }, ">")
        ])
      ]),
      vue.createElementVNode("view", {
        class: "unit other",
        onClick: _cache[1] || (_cache[1] = ($event) => $options.changeName())
      }, [
        vue.createElementVNode("view", { class: "title" }, "名字"),
        vue.createElementVNode("view", { class: "bottom" }, [
          vue.createElementVNode(
            "view",
            { class: "text" },
            vue.toDisplayString($data.user.name),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "tail" }, ">")
        ])
      ]),
      vue.createElementVNode("view", {
        class: "unit other",
        onClick: _cache[2] || (_cache[2] = ($event) => $options.changeGender())
      }, [
        vue.createElementVNode("view", { class: "title" }, "性别"),
        vue.createElementVNode("view", { class: "bottom" }, [
          vue.createElementVNode(
            "view",
            { class: "text" },
            vue.toDisplayString($options.gender),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "tail" }, ">")
        ])
      ]),
      vue.createElementVNode("view", {
        class: "unit other",
        onClick: _cache[3] || (_cache[3] = ($event) => $options.changeLocation())
      }, [
        vue.createElementVNode("view", { class: "title" }, "地区"),
        vue.createElementVNode("view", { class: "bottom" }, [
          vue.createElementVNode(
            "view",
            { class: "text" },
            vue.toDisplayString($data.user.location),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "tail" }, ">")
        ])
      ])
    ]);
  }
  const PagesBarUserUserinfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/userinfo.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        text: "",
        imagePath: "",
        haveImage: false,
        nowTime: ""
      };
    },
    methods: {
      addPicture() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.imagePath = res.tempFilePaths[0];
            formatAppLog("log", "at pages/bar/blog/create_blog.vue:36", this.haveImage);
            this.haveImage = true;
          },
          fail() {
          }
        });
      },
      removeImage() {
        this.haveImage = false;
        this.imagePath = "";
      },
      createBlog() {
        if (this.text == "" && this.imagePath == "") {
          uni.showToast({
            title: "请输入内容",
            icon: "error"
          });
          return;
        }
        api.createBlog({
          "content": this.text,
          "image": this.imagePath
        }).then((res) => {
          uni.showToast({
            title: "创建成功",
            icon: "success"
          });
          this.text = "";
          this.haveImage = false;
          this.imagePath = "";
        });
      }
    },
    onLoad() {
      setInterval(() => {
        let now = /* @__PURE__ */ new Date();
        this.nowTime = now.toLocaleString();
      }, 1e3);
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "editor" }, [
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.text = $event),
            "auto-height": "",
            "auto-focus": "",
            placeholder: "...聊点什么吧"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.text]
        ]),
        !$data.haveImage ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "picture_box",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.addPicture())
        }, " + ")) : vue.createCommentVNode("v-if", true),
        $data.haveImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          src: $data.imagePath,
          mode: "widthFix"
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
        $data.haveImage ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "remove-image",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.removeImage())
        }, "X")) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode(
          "view",
          { class: "time" },
          vue.toDisplayString($data.nowTime),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", {
        class: "save",
        onClick: _cache[3] || (_cache[3] = ($event) => $options.createBlog())
      }, "发布")
    ]);
  }
  const PagesBarBlogCreate_blog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/create_blog.vue"]]);
  __definePage("pages/entre/login", PagesEntreLogin);
  __definePage("pages/bar/commodity/index", PagesBarCommodityIndex);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/entre/register", PagesEntreRegister);
  __definePage("pages/bar/commodity/parlour", PagesBarCommodityParlour);
  __definePage("pages/bar/blog/index", PagesBarBlogIndex);
  __definePage("pages/bar/user/index", PagesBarUserIndex);
  __definePage("pages/bar/commodity/commodity_info", PagesBarCommodityCommodity_info);
  __definePage("pages/bar/user/myOrder", PagesBarUserMyOrder);
  __definePage("pages/bar/user/paySetting", PagesBarUserPaySetting);
  __definePage("pages/bar/user/myBlog", PagesBarUserMyBlog);
  __definePage("pages/bar/blog/blog_info", PagesBarBlogBlog_info);
  __definePage("pages/bar/user/userinfo", PagesBarUserUserinfo);
  __definePage("pages/bar/blog/create_blog", PagesBarBlogCreate_blog);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
