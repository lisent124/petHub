"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
require("../../../common/request.js");
require("../../../common/operate.js");
require("../../../common/statusCode.js");
const _sfc_main = {
  data() {
    return {
      item: Object,
      flag: true,
      count: 1
    };
  },
  onLoad(options) {
    this.flag = "false" == options.flag ? false : true;
    this.item = JSON.parse(options.item);
  },
  methods: {
    toParlour(id) {
      common_vendor.index.redirectTo({
        url: "pages/bar/commodity/parlour?id=" + id
      });
    },
    count_add() {
      let stock = this.item.stock;
      if (this.count < stock)
        this.count++;
      else
        this.count = stock;
    },
    count_reduce() {
      if (this.count > 1)
        this.count--;
      else
        this.count = 1;
    },
    createOrder1() {
      common_vendor.index.showModal({
        title: "确认支付\n" + this.sum + "元",
        success: (res) => {
          if (res.confirm) {
            common_api.api.createOrder({
              "commodity_id": this.item.id,
              "count": this.count
            }).then((res2) => {
              common_vendor.index.showToast({
                title: "下单成功",
                icon: "success"
              });
            });
          }
        }
      });
    }
  },
  computed: {
    sum: function() {
      let price = this.item.price;
      if (this.count < 0)
        this.count = 1;
      return this.count * price;
    },
    showTop: function() {
      console.log(this.isShowTop);
      return this.isShowTop;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.flag
  }, $data.flag ? {
    b: common_vendor.o(($event) => $options.toParlour($data.item.parlour_id))
  } : {}, {
    c: $data.item.picture,
    d: common_vendor.t($data.item.name),
    e: common_vendor.t($data.item.stock),
    f: common_vendor.t($data.item.price),
    g: common_vendor.t($data.item.unit),
    h: common_vendor.o(($event) => $options.count_reduce()),
    i: $data.count,
    j: common_vendor.o(($event) => $data.count = $event.detail.value),
    k: common_vendor.o(($event) => $options.count_add()),
    l: common_vendor.t($options.sum),
    m: common_vendor.o(($event) => $options.createOrder1())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/pages/bar/commodity/commodity_info.vue"]]);
wx.createPage(MiniProgramPage);
