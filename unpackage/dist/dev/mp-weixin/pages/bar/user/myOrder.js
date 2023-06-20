"use strict";
const common_api = require("../../../common/api.js");
const common_util = require("../../../common/util.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const _sfc_main = {
  data() {
    return {
      dataList: [],
      color: "yellow"
    };
  },
  onLoad() {
    common_api.api.getOrder().then((res) => {
      this.dataList = res.data.dataList;
    });
  },
  methods: {
    formatTime(time) {
      return common_util.timeFormat(time);
    },
    stateShow(state) {
      if (state)
        return "已完成";
      else
        return "未完成";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dataList, (i, k0, i0) => {
      return {
        a: common_vendor.t(i.name),
        b: common_vendor.t(i.parlour),
        c: common_vendor.t(i.price),
        d: common_vendor.t(i.count),
        e: common_vendor.t($options.stateShow(i.state)),
        f: common_vendor.t($options.formatTime(i.start_time))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/user/myOrder.vue"]]);
wx.createPage(MiniProgramPage);
