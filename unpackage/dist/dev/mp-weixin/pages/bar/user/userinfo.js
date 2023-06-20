"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const _sfc_main = {
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
    console.log(this.changed);
    if (e.from === "navigateBack")
      return false;
    if (this.changed) {
      common_vendor.index.showModal({
        title: "确认修改信息吗？",
        success: (res) => {
          if (res.confirm) {
            common_api.api.updateUserInfo(this.user).then((res2) => {
              common_vendor.index.showToast({
                title: "更新成功",
                icon: "success"
              });
            });
          }
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2];
          common_vendor.index.navigateBack({
            success: () => {
              beforePage.user = this.user;
            }
          });
        }
      });
    } else {
      common_vendor.index.navigateBack();
    }
    return true;
  },
  methods: {
    changeHead() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (options) => {
          common_api.api.updateUserHead({
            "head": options.tempFilePaths[0]
          }).then(
            (res) => {
              common_vendor.index.reLaunch({
                url: "/pages/bar/user/index"
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    },
    changeName() {
      common_vendor.index.showModal({
        title: "名字",
        content: this.user.name,
        confirmText: "确认",
        editable: true,
        success: (res) => {
          if (res.confirm) {
            if (res.content.length < 3) {
              common_vendor.index.showToast({
                title: "名字太短咯亲！",
                icon: "none",
                duration: 2e3
              });
            } else if (res.content.length > 16) {
              common_vendor.index.showToast({
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
      common_vendor.index.showActionSheet({
        itemList: ["男", "女"],
        success: (res) => {
          let gender = this.user.gender;
          if (res.tapIndex == 0) {
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
      common_vendor.index.showModal({
        title: "地区",
        content: this.user.location,
        confirmText: "确认",
        editable: true,
        success: (res) => {
          if (res.confirm) {
            this.changed = true;
            this.user.location = res.content;
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.user.head_picture,
    b: common_vendor.o(($event) => $options.changeHead()),
    c: common_vendor.t($data.user.name),
    d: common_vendor.o(($event) => $options.changeName()),
    e: common_vendor.t($options.gender),
    f: common_vendor.o(($event) => $options.changeGender()),
    g: common_vendor.t($data.user.location),
    h: common_vendor.o(($event) => $options.changeLocation())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/userinfo.vue"]]);
wx.createPage(MiniProgramPage);
