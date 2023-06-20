"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/entre/login.js";
  "./pages/bar/commodity/index.js";
  "./pages/index/index.js";
  "./pages/entre/register.js";
  "./pages/bar/commodity/parlour.js";
  "./pages/bar/blog/index.js";
  "./pages/bar/user/index.js";
  "./pages/bar/commodity/commodity_info.js";
  "./pages/bar/user/myOrder.js";
  "./pages/bar/user/paySetting.js";
  "./pages/bar/user/myBlog.js";
  "./pages/bar/blog/blog_info.js";
  "./pages/bar/user/userinfo.js";
  "./pages/bar/blog/create_blog.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Projects/UniAppProjects/StudyTest/petHub/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
