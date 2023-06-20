"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const blogUnit = () => "../../templates/blog-unit.js";
const _sfc_main = {
  data() {
    return {
      dataList: Array
    };
  },
  onLoad() {
    common_api.api.getBlogs({}).then((res) => {
      this.dataList = res.data.dataList;
    });
    common_vendor.index.$on("deleteBlog", (data) => {
      this.deleteBlog(data);
    });
    common_vendor.index.$on("hideBlog", (data) => {
      this.deleteBlog(data);
    });
    common_vendor.index.startPullDownRefresh();
  },
  methods: {
    addNewBLog() {
      common_vendor.index.navigateTo({
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
    common_api.api.getBlogs({}).then((res) => {
      this.dataList = this.dataList.concat(res.data.dataList);
    });
  },
  onPullDownRefresh() {
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
    console.log("pulldown");
  },
  components: {
    blogUnit
  }
};
if (!Array) {
  const _component_blogUnit = common_vendor.resolveComponent("blogUnit");
  _component_blogUnit();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.addNewBLog()),
    b: common_vendor.f($data.dataList, (item, k0, i0) => {
      return {
        a: "04525177-0-" + i0,
        b: common_vendor.p({
          blog: item.blog,
          user: item.user,
          flag: true
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/blog/index.vue"]]);
wx.createPage(MiniProgramPage);
