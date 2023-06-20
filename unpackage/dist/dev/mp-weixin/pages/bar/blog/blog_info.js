"use strict";
const common_api = require("../../../common/api.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const comment = () => "../../templates/comment_info.js";
const blogUnit = () => "../../templates/blog-unit.js";
const _sfc_main = {
  data() {
    return {
      item: Object,
      interactives: Array,
      flag: false
    };
  },
  onLoad(options) {
    this.item = JSON.parse(options.item);
    common_api.api.getComment({
      "blog_id": this.item.blog.id
    }).then((res) => {
      this.interactives = res.data.dataList;
    });
  },
  methods: {},
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
if (!Array) {
  const _component_blogUnit = common_vendor.resolveComponent("blogUnit");
  const _component_comment = common_vendor.resolveComponent("comment");
  (_component_blogUnit + _component_comment)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      user: $data.item.user,
      blog: $data.item.blog,
      flag: false
    }),
    b: $options.haveComment
  }, $options.haveComment ? {
    c: common_vendor.p({
      interactives: $data.interactives
    })
  } : {}, {
    d: !$options.haveComment
  }, !$options.haveComment ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/blog_info.vue"]]);
wx.createPage(MiniProgramPage);
