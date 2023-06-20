"use strict";
const common_api = require("../../../common/api.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const showCommodities = () => "../../templates/commodity-list.js";
const _sfc_main = {
  data() {
    return {
      mode: true,
      commodities: Array
    };
  },
  onLoad() {
    common_api.api.getCommodities().then(
      (res) => {
        this.commodities = res.data.dataList;
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    changeMode() {
      this.mode = !this.mode;
    }
  },
  onReachBottom() {
    common_api.api.getCommodities().then((res) => {
      this.commodities = this.commodities.concat(res.data.dataList);
      console.log(this.commodities.length);
    });
  },
  components: {
    showCommodities
  }
};
if (!Array) {
  const _component_showCommodities = common_vendor.resolveComponent("showCommodities");
  _component_showCommodities();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.mode
  }, !$data.mode ? {
    b: common_vendor.o(($event) => $options.changeMode())
  } : {}, {
    c: $data.mode
  }, $data.mode ? {
    d: common_vendor.o(($event) => $options.changeMode())
  } : {}, {
    e: common_vendor.p({
      dataList: $data.commodities,
      showStatus: $data.mode,
      flag: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/index.vue"]]);
wx.createPage(MiniProgramPage);
