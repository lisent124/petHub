"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const _sfc_main = {
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
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.imagePath = res.tempFilePaths[0];
          console.log(this.haveImage);
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
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "error"
        });
        return;
      }
      common_api.api.createBlog({
        "content": this.text,
        "image": this.imagePath
      }).then((res) => {
        common_vendor.index.showToast({
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
  return common_vendor.e({
    a: $data.text,
    b: common_vendor.o(($event) => $data.text = $event.detail.value),
    c: !$data.haveImage
  }, !$data.haveImage ? {
    d: common_vendor.o(($event) => $options.addPicture())
  } : {}, {
    e: $data.haveImage
  }, $data.haveImage ? {
    f: $data.imagePath
  } : {}, {
    g: $data.haveImage
  }, $data.haveImage ? {
    h: common_vendor.o(($event) => $options.removeImage())
  } : {}, {
    i: common_vendor.t($data.nowTime),
    j: common_vendor.o(($event) => $options.createBlog())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/create_blog.vue"]]);
wx.createPage(MiniProgramPage);
