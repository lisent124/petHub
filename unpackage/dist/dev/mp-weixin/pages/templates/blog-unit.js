"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
const common_util = require("../../common/util.js");
require("../../common/request.js");
require("../../common/operate.js");
require("../../common/statusCode.js");
const _sfc_main = {
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
      const id = common_vendor.index.getStorageSync("id");
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
      common_vendor.index.showActionSheet({
        itemList,
        success: (res) => {
          let sign = itemList[res.tapIndex];
          if (sign == "删除") {
            common_vendor.index.showModal({
              title: "确认删除吗？",
              confirmColor: "red",
              success: (options) => {
                if (options.confirm) {
                  common_api.api.deleteBlog({
                    "blog_id": this.blog.id
                  });
                  common_vendor.index.$emit("deleteBlog", {
                    "id": this.blog.id
                  });
                  common_vendor.index.showToast({
                    title: "删除成功",
                    icon: "success"
                  });
                }
              }
            });
          } else if (sign == "隐藏") {
            common_api.api.hideBlog({
              "blog_id": this.blog.id
            });
            common_vendor.index.$emit("hideBlog", {
              "id": this.blog.id
            });
          } else if (sign == "显示") {
            common_api.api.showBlog({
              "blog_id": this.blog.id
            });
          } else if (sign == "评论") {
            this.toComment();
          } else {
            common_api.api.toLike({
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
      common_api.api.toLike({
        "blog_id": this.blog.id
      }).then((res) => {
        this.user.like = !this.user.like;
      }, (err) => {
        common_vendor.index.showToast({
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
      common_vendor.index.navigateTo({
        url: "/pages/bar/blog/blog_info?flag=true&item=" + JSON.stringify(item)
      });
    },
    sendComment() {
      if (this.text == "") {
        common_vendor.index.showToast({
          title: "评论不能为空",
          icon: "error"
        });
        return;
      }
      common_api.api.sendComment({
        "comment": this.text,
        "blog_id": this.blog.id
      }).then((res) => {
        common_vendor.index.showToast({
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
      if (this.blog.picture)
        return true;
      else
        return false;
    },
    haveComment: function() {
      if (this.user.comment)
        return true;
      else
        return false;
    },
    blogTime: function() {
      return common_util.timeFormat(this.blog.release_time);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.user.head_picture,
    b: common_vendor.t($props.user.name),
    c: common_vendor.s(!$props.blog.visible && $data.hidedStyle),
    d: common_vendor.o(($event) => $options.moreInfo()),
    e: common_vendor.t($props.blog.content),
    f: common_vendor.o(($event) => $props.flag && $options.toDetail()),
    g: $options.havePicture
  }, $options.havePicture ? {
    h: $props.blog.picture
  } : {}, {
    i: common_vendor.t($options.blogTime),
    j: !$props.user.like
  }, !$props.user.like ? {
    k: common_vendor.o(($event) => $options.toLike())
  } : {}, {
    l: $props.user.like
  }, $props.user.like ? {
    m: common_vendor.o(($event) => $options.toLike())
  } : {}, {
    n: common_vendor.o(($event) => $options.toComment()),
    o: $data.focus,
    p: common_vendor.o(($event) => $data.focus = false),
    q: $data.text,
    r: common_vendor.o(($event) => $data.text = $event.detail.value),
    s: common_vendor.o(($event) => $options.sendComment()),
    t: $props.flag && $options.haveComment
  }, $props.flag && $options.haveComment ? {
    v: common_vendor.t($props.user.name),
    w: common_vendor.t($props.user.comment)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/blog-unit.vue"]]);
wx.createComponent(Component);
