"use strict";
const common_util = require("../../common/util.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    getFormatTime(time) {
      return common_util.timeFormat(time);
    }
  },
  computed: {
    commmentTime: function() {
      return true;
    }
  },
  props: {
    interactives: Array
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.interactives, (item, k0, i0) => {
      return common_vendor.e({
        a: item.user.head_picture,
        b: common_vendor.t(item.user.name),
        c: !item.like
      }, !item.like ? {} : {}, {
        d: item.like
      }, item.like ? {} : {}, {
        e: common_vendor.t(item.comment),
        f: common_vendor.t($options.getFormatTime(item.create_time))
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/comment_info.vue"]]);
wx.createComponent(Component);
