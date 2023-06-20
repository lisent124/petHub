"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const _sfc_main = {
  data() {
    return {
      user: Object
    };
  },
  onLoad() {
    let id = common_vendor.index.getStorageSync("id");
    common_api.api.getUserInfo({
      "user_id": id
    }).then((res) => {
      this.user = res.data.user;
    });
  },
  computed: {
    gender: function() {
      return this.user.gender === "m" ? true : false;
    }
  },
  methods: {
    toUserInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/bar/user/userinfo?user=" + JSON.stringify(this.user)
      });
    },
    toMyOrder() {
      common_vendor.index.navigateTo({
        url: "myOrder"
      });
    },
    toPaySetting() {
      common_vendor.index.navigateTo({
        url: "paySetting"
      });
    },
    toMyBlog() {
      common_vendor.index.navigateTo({
        url: "myBlog"
      });
    },
    toLogout() {
      common_vendor.index.showModal({
        title: "确认退出",
        confirmColor: "red",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/entre/login"
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.user.head_picture,
    b: common_vendor.t($data.user.name),
    c: !$options.gender
  }, !$options.gender ? {} : {}, {
    d: $options.gender
  }, $options.gender ? {} : {}, {
    e: common_vendor.o(($event) => $options.toUserInfo()),
    f: common_vendor.o(($event) => $options.toMyOrder()),
    g: common_vendor.o(($event) => $options.toPaySetting()),
    h: common_vendor.o(($event) => $options.toMyBlog()),
    i: common_vendor.o(($event) => $options.toLogout())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/index.vue"]]);
wx.createPage(MiniProgramPage);
