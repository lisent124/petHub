"use strict";
const common_api = require("../../../common/api.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const comlist = () => "../../templates/commodity-list.js";
const _sfc_main = {
  data() {
    return {
      parlour: Object,
      dataList: Array
    };
  },
  onLoad(options) {
    let id = options.id;
    common_api.api.getParlourInfo({
      "parlour_id": id
    }).then((res) => {
      this.parlour = res.data.parlour;
      this.dataList = res.data.dataList;
    });
  },
  methods: {},
  components: {
    comlist
  }
};
if (!Array) {
  const _component_comlist = common_vendor.resolveComponent("comlist");
  _component_comlist();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.parlour.head_picture,
    b: common_vendor.t($data.parlour.name),
    c: common_vendor.t($data.parlour.phone),
    d: common_vendor.t($data.parlour.location),
    e: common_vendor.p({
      showStatus: true,
      dataList: $data.dataList,
      flag: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/parlour.vue"]]);
wx.createPage(MiniProgramPage);
