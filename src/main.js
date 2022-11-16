//import Vue from 'vue'

import ImageViewer from "vue2-viewer";
Vue.use(ImageViewer);
import 'babel-polyfill'; 
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
//import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router/routers";
import permission from "./components/permission";
import store from "./store";
//import axios from "axios";

import "@/icons"; // icon
import "./router/index"; // permission control

// 引入echarts
import Echarts from "vue-echarts";
import * as echarts from "echarts";
Vue.component("v-chart", Echarts);
Vue.prototype.$echarts = echarts;
//Vue.use(Echarts);

// 引入打印
import Print from "vue-print-nb";

// 引入新手指引插件
import VueIntro from "vue-introjs";
import "intro.js/introjs.css";
Vue.use(VueIntro);

// 引入地图插件
import { vue } from "@/utils/jiankun_map";
Vue.use(vue);

// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// // 引入拖动排序插件
// import VueDND from 'awe-dnd'
// Vue.use(VueDND)

//引入video
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video //引入Video播放器

// 引入vr
import * as Three from "three";
import conf from "@/api/config.js";
Vue.prototype.T = Three;
Vue.prototype.conf = conf;

import { Loading } from 'element-ui'
import { message } from './utils/message';
Vue.prototype.$message = message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.openLoading = function() {
  const loading = this.$loading({
    // 声明一个loading对象
    lock: true, // 是否锁屏
    text: "正在加载...", // 加载动画的文字
    spinner: "el-icon-loading", // 引入的loading图标
    background: "rgba(0, 0, 0, 0.3)", // 背景颜色
    target: ".sub-main", // 需要遮罩的区域
    body: true,
    customClass: "mask" // 遮罩层新增类名
  });
  setTimeout(function() {
    // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close(); // 关闭遮罩层
  }, 10000);
  return loading;
};

// 引入cookies控制器
// import VueCookies from 'vue-cookies'
// Vue.prototype.$cookies = VueCookies
// VueCookies.save = (list)=>{ VueCookies.set("dk_info_list", [{dkid:"",list}]); };
// VueCookies.get = ()=> { return VueCookies.get("dk_info_list") }
// Vue.use(VueCookies)
Vue.use(mavonEditor);
Vue.use(permission);
// Vue.use(ELEMENT, {
//   locale
// });

Vue.prototype.openLoading = function() {
  const loading = this.$loading({
    // 声明一个loading对象
    lock: true, // 是否锁屏
    text: "正在加载...", // 加载动画的文字
    spinner: "el-icon-loading", // 引入的loading图标
    background: "rgba(0, 0, 0, 0.3)", // 背景颜色
    target: ".sub-main", // 需要遮罩的区域
    body: true,
    customClass: "mask" // 遮罩层新增类名
  });
  return loading;
};

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
ELEMENT.Dialog.props.closeOnClickModal.default = false;
// require("babel-polyfill");
new Vue({
  el: "#app",
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; //为了让$bus有Vue原型对象prototype上的$on、$emit、$off等，所以让它等于this，即指向vm
  },
  render: h => h(App)
});

Vue.filter("getStateDes", function(state) {
  if (state === -1 || state === "-1") {
    return "无此设备";
  } else if (state === 0 || state === "0") {
    return "离线";
  } else if (state === 1 || state === "1") {
    return "正常";
  } else if (state === 2 || state === "2") {
    return "休眠";
  } else if (state === 3 || state === "3") {
    return "供电";
  } else if (state === 4 || state === "4") {
    return "故障";
  } else if (state === 5 || state === "5") {
    return "待机";
  } else {
    return "未知";
  }
});

Vue.filter("getStateClass", function(state) {
  if (state === -1 || state === "-1") {
    return "grep";
  } else if (state === 0 || state === "0") {
    return "grep";
  } else if (state === 1 || state === "1") {
    return "normal";
  } else if (state === 2 || state === "2") {
    return "grep";
  } else if (state === 3 || state === "3") {
    return "normal";
  } else if (state === 4 || state === "4") {
    return "abnormal";
  } else if (state === 5 || state === "5") {
    return "grep";
  } else {
    return "grep";
  }
});