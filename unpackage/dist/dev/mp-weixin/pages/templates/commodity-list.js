"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    exchangeShow() {
      this.showStatus = !this.showStatus;
    },
    toParlour(id) {
      common_vendor.index.navigateTo({
        url: "/pages/index/parlour?id=" + id
      });
    },
    toCommidity(item) {
      common_vendor.index.navigateTo({
        url: "/pages/bar/commodity/commodity_info?flag=" + this.flag + "&item=" + JSON.stringify(item)
      });
    }
  },
  props: {
    showStatus: Boolean,
    dataList: Array,
    flag: Boolean
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.showStatus
  }, !$props.showStatus ? {
    b: common_vendor.f($props.dataList, (item, k0, i0) => {
      return {
        a: item.picture,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.unit),
        e: common_vendor.t(item.stock),
        f: common_vendor.t(item.parlour),
        g: common_vendor.o(($event) => $options.toParlour(item.parlour_id)),
        h: common_vendor.o(($event) => $options.toCommidity(item))
      };
    })
  } : {}, {
    c: $props.showStatus
  }, $props.showStatus ? {
    d: common_vendor.f($props.dataList, (item, k0, i0) => {
      return {
        a: item.picture,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.unit),
        e: common_vendor.t(item.stock),
        f: common_vendor.t(item.parlour),
        g: common_vendor.o(($event) => $options.toParlour(item.parlour_id)),
        h: common_vendor.o(($event) => $options.toCommidity(item))
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/templates/commodity-list.vue"]]);
wx.createComponent(Component);
