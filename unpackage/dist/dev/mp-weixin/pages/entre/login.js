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
        password: ""
      }
    };
  },
  methods: {
    toRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/entre/register"
      });
    },
    login(data) {
      for (let foo in data) {
        if (data[foo] === "") {
          let messsage = foo == "phone" ? "电话" : "密码";
          common_vendor.index.showToast({
            title: "请输入" + messsage,
            icon: "error"
          });
          return;
        }
      }
      common_api.api.login(data).then(
        (res) => {
          if (res.statusCode == 200) {
            common_vendor.index.setStorageSync("id", res.header["id"]);
            common_vendor.index.reLaunch({
              url: "/pages/bar/blog/index"
            });
            common_vendor.index.showToast({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.FormData.phone,
    b: common_vendor.o(($event) => $data.FormData.phone = $event.detail.value),
    c: $data.FormData.password,
    d: common_vendor.o(($event) => $data.FormData.password = $event.detail.value),
    e: common_vendor.o(($event) => $options.toRegister()),
    f: common_vendor.o(($event) => $options.login($data.FormData))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/entre/login.vue"]]);
wx.createPage(MiniProgramPage);
