"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
require("../../common/request.js");
require("../../common/operate.js");
require("../../common/statusCode.js");
const _sfc_main = {
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
          common_vendor.index.showToast({
            title: "请输入",
            icon: "error"
          });
          common_vendor.index.reLaunch({
            url: "register"
          });
          return;
        }
      }
      if (data.password != data.password0) {
        common_vendor.index.showToast({
          title: "两次密码不同",
          icon: "error"
        });
      }
      common_api.api.register(data).then((res) => {
        common_vendor.index.reLaunch({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.FormData.phone,
    b: common_vendor.o(($event) => $data.FormData.phone = $event.detail.value),
    c: $data.FormData.password0,
    d: common_vendor.o(($event) => $data.FormData.password0 = $event.detail.value),
    e: $data.FormData.password,
    f: common_vendor.o(($event) => $data.FormData.password = $event.detail.value),
    g: common_vendor.t($data.registerText),
    h: common_vendor.o(($event) => $options.register($data.FormData)),
    i: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/entre/register.vue"]]);
wx.createPage(MiniProgramPage);
