"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      message: "to test",
      data: ""
    };
  },
  methods: {
    toHome() {
      let id = common_vendor.index.getStorageSync("id");
      console.log(id);
    },
    toTest() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8000/test",
        header: {
          "hello": "lisent",
          "id": common_vendor.index.getStorageSync("id")
        },
        success(res) {
          let id = res.header["id"];
          console.log(id);
          common_vendor.index.setStorageSync("id", id);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toHome()),
    b: common_vendor.t($data.message),
    c: common_vendor.o(($event) => $options.toTest()),
    d: common_vendor.t($data.data)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
