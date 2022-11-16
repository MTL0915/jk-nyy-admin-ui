import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)


/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
         {
           path: "/autoLogin",
           meta: {
             title: "登录",
             noCache: true
           },
           component: () => {
             return import("@/views/login/autoLogin");
           },
           hidden: true
         },
         {
           path: "/sxt",
           meta: {
             title: "摄像头",
             noCache: true
           },
           component: () => import("@/views/base/video/module/Sxt"),
           hidden: true
         },
         {
           path: "/map3d",
           meta: {
             title: "农语云一张图",
             noCache: true
           },
           component: () => import("@/views/base/plan3d/index"),
           hidden: true
         },
         {
           path: "/planNavigation",
           meta: {
             title: "导航页面",
             noCache: true
           },
           component: () => {
             return import("@/views/base/planNavigation/planNavigation");
           },
           hidden: true
         },
         {
           path: "/drawLineMap",
           meta: {
             title: "绘制路径",
             noCache: true
           },
           component: () => import("@/views/base/plan3d/drawLine"),
           hidden: true
         },
         {
           path: "/unmannedMap",
           meta: {
             // unmanned
             title: "绘制路径",
             noCache: false
           },
           component: () => import("@/views/base/planDevice/planDevice"),
           hidden: true
         },
         {
           path: "/unmannedMapNew",
           meta: {
             // unmanned
             title: "无人车",
             noCache: false
           },
           component: () => import("@/views/base/planDeviceNew/index"),
           hidden: true
         },
         {
           path: "/unmannedMapGdc",
           meta: {
             // unmanned
             title: "轨道车",
             noCache: false
           },
           component: () => import("@/views/base/planDeviceGdc/index"),
           hidden: true
         },
         {
           path: "/gyMap",
           meta: {
             // unmanned
             title: "轨道运输车",
             noCache: true
           },
           component: () => import("@/views/devicemap/gyMap"),
           hidden: true
         },
         {
           path: "/login",
           meta: {
             title: "登录",
             noCache: true
           },
           component: () => import("@/views/login/login"),
           hidden: true
         },
         {
           path: "/wechatLoading",
           meta: {
             title: "微信登录",
             noCache: true
           },
           component: () => import("@/views/login/wechatLoading")
         },
         {
           path: "/ln_login",
           meta: {
             title: "登录 ",
             noCache: true
           },
           component: () => import("@/views/login/ln_login"),
           hidden: true
         },
         {
           path: "/wechatLoginBind",
           name: "wechatLoginBind",
           meta: {
             title: "绑定账号",
             noCache: true
           },
           component: () => import("@/views/login/wechatLoginBind"),
           hidden: true
         },
         {
           path: "/register",
           meta: {
             title: "注册",
             noCache: true
           },
           component: () => import("@/views/register/index"),
           hidden: true
         },
         {
           path: "/forgetPassword",
           meta: {
             title: "忘记密码",
             noCache: true
           },
           component: () => import("@/views/register/forgetPassword"),
           hidden: true
         },
         {
           path: "/api",
           meta: {
             title: "api",
             noCache: true
           },
           component: () => import("@/views/test/index"),
           hidden: true
         },
         {
           path: "/nav",
           meta: {
             title: "首页",
             noCache: false
           },
           component: () => import("@/views/test/demo/index"),
           hidden: true
         },
         {
           path: "/expEcharts",
           meta: {
             title: "图表",
             name: "expEcharts",
             hideTitle: false,
             noCache: true
           },
           component: () => import("@/views/expEcharts"),
           hidden: true
         },
         {
           path: "/deviceDetails",
           meta: {
             title: "设备详情",
             name: "deviceDetails",
             noCache: true
           },
           component: () => import("@/views/base/equip/module/EquipJkl"),
           hidden: true
         },
         {
           path: "/deviceLogList",
           meta: {
             title: "设备日志",
             name: "deviceLogList",
             noCache: true
           },
           component: () => import("@/views/base/equip/module/Log"),
           hidden: true
         },
         {
           path: "/vr",
           meta: {
             title: "全景图",
             noCache: true
           },
           component: () => import("@/views/base/vr/index"),
           hidden: true
         },
         {
           path: "/vr_video",
           meta: {
             title: "全景视频",
             noCache: true
           },
           component: () => import("@/views/base/vr/index_video"),
           hidden: true
         },
         {
           path: "/maptest",
           meta: {
             title: "测试地图",
             noCache: true
           },
           component: () => import("@/views/base/plan/Plan1"),
           hidden: true
         },
         {
           path: "/dataViewMap",
           meta: {
             title: "大屏地图组件",
             noCache: true
           },
           component: () => import("@/views/dashboard/admin/charts/map"),
           hidden: true
         },
         {
           path: "/applyBase",
           meta: {
             title: "创建基地",
             noCache: true
           },
           component: () => import("@/views/register/applyBase"),
           hidden: true
         },
         {
           path: "/map",
           meta: {
             title: "展示基地",
             noCache: true
           },
           component: () => import("@/views/base/plan/Plan"),
           hidden: true
         },
         {
           path: "/MonitoringAndData",
           meta: {
             title: "实施农业专家控制与数据展示系统",
             noCache: true
           },
           component: () =>
             import("@/views/dataview/model/monitoringAndData/index.vue"),
           hidden: true
         },
         {
           path: "/deviceshow",
           meta: {
             title: "设备数据展示",
             noCache: true
           },
           component: () => import("@/views/open/deviceshow/index"),
           hidden: true
         },
         {
           path: "/sensorShow",
           meta: {
             title: "传感器数据展示",
             noCache: true
           },
           component: () => import("@/views/open/deviceshow/sensor"),
           hidden: true
         },
         {
           path: "/swtichshow",
           meta: {
             title: "设备数据展示",
             noCache: true
           },
           component: () => import("@/views/open/deviceshow/switch.vue"),
           hidden: true
         },
         {
           path: "/openvideo",
           meta: {
             title: "设备数据展示",
             noCache: true
           },
           component: () => import("@/views/open/video/index"),
           hidden: true
         },
         {
           path: "/function/qrcode",
           meta: {
             title: "二维码链接",
             noCache: true
           },
           component: () => import("@/views/open/qrcode/index"),
           hidden: true
         },
         {
           path: "/function/qrcode/login",
           meta: {
             title: "二维码设置登录",
             noCache: true
           },
           component: () => import("@/views/open/qrcode/login"),
           hidden: true
         },
         {
           path: "/function/qrcode/setting",
           meta: {
             title: "二维码设置",
             noCache: true
           },
           component: () => import("@/views/open/qrcode/setting"),
           hidden: true
         },
         {
           path: "/404",
           component: () => import("@/views/errorPage/404"),
           hidden: true
         },
         {
           path: "/401",
           component: () => import("@/views/errorPage/401"),
           hidden: true
         },
         {
           path: "/redirect",
           component: Layout,
           hidden: true,
           children: [
             {
               path: "/redirect/:path*",
               component: () => "@/views/redirect/index"
             }
           ]
         },
         {
           path: "/vr_edit",
           meta: {
             title: "编辑全景",
             name: "vrEdit",
             hideTitle: false,
             noCache: true
           },
           component: () => import("@/views/base/vr/edit"),
           hidden: true
         },
         {
           path: "/map_device",
           meta: {
             title: "全部设备",
             name: "map_device",
             hideTitle: false,
             noCache: true
           },
           component: () => import("@/views/base/mapDevice/mapDevice"),
           hidden: true
         },
         {
           path: "/",
           component: Layout,
           redirect: "dashboard",
           children: [
             {
               path: "/sim",
               meta: {
                 title: "sim卡管理",
                 name: "sim",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/sim/index"),
               hidden: true
             },
             {
               //电白区对虾产业园 演示
               path: "duixiaTable",
               meta: {
                 title: "电白区对虾产业园",
                 name: "duixiaTable",
                 hideTitle: true,
                 noCache: true
               },
               component: () => import("@/views/yanshi/duixueTable"),
               params: {},
               hidden: true
             },
             {
               path: "dashboard",
               // component: () => import('@/views/base/plan/Plan'),
               component: () => import("@/views/dashboard/admin/index"),
               name: "总览",
               meta: {
                 title: "总览",
                 name: "dashboard",
                 hideTitle: true,
                 icon: "icon",
                 noCache: true,
                 affix: true
               }
             },
             {
               path: "/search",
               meta: {
                 title: "搜索结果",
                 name: "search",
                 hideTitle: true,
                 noCache: true
               },
               component: () => import("@/views/search/index"),
               params: {},
               hidden: true
             },
             {
               path: "/orgIntro",
               meta: {
                 title: "组织简介",
                 name: "orgIntro",
                 hideTitle: true,
                 noCache: true
               },
               component: () => import("@/views/org/introduce"),
               params: {},
               hidden: true
             },
             {
               path: "/userIndex",
               meta: {
                 title: "用户管理",
                 name: "userIndex",
                 hideTitle: true,
                 noCache: true
               },
               component: () => import("@/views/system/user/index"),
               params: {},
               hidden: true
             },
             {
               path: "/orgIndex",
               meta: {
                 title: "组织管理",
                 name: "orgIndex",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/org/index"),
               params: {},
               hidden: true
             },
             {
               path: "/mycamera",
               meta: {
                 title: "我的摄像头",
                 name: "mycamera",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/base/video/index"),
               hidden: true
             },
             {
               path: "/cameraPhoto",
               meta: {
                 title: "我的相册",
                 name: "cameraPhoto",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/video/module/CameraPhoto"),
               hidden: true
             },
              {
                path: "/appcenter/fertilizer",
                meta: {
                  title: "水肥系统",
                  name: "fertilizer",
                  hideTitle: false,
                  noCache: true
                },
                component: () =>
                  import("@/views/base/appCenter/index.vue"),
                hidden: true
              },
             {
               path: "/map",
               meta: {
                 title: "空间数据",
                 name: "videoIndex",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/base/plan/Plan"),
               hidden: true
             },
             {
               path: "/deviceInfo",
               meta: {
                 title: "设备详情",
                 name: "deviceInfo",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/EquipJkl"),
               hidden: true
             },
             {
               path: "/jkfmDeviceInfo",
               meta: {
                 title: "新水肥灌溉",
                 name: "jkfmDeviceInfo",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/jkfm/JkfmDevice"),
               hidden: true
             },
             {
               path: "/equipIflytekCO",
               meta: {
                 title: "猪群咳嗽及分析检测系统",
                 name: "EquipIflytekCO",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/EquipIflytekCO"),
               hidden: true
             },
             {
               path: "/equipIflytekXJ",
               meta: {
                 title: "巡检轨道机器人系统",
                 name: "EquipIflytekXJ",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/EquipIflytekXJ"),
               hidden: true
             },
             {
               path: "/equipYunmuFW",
               meta: {
                 title: "巡检轨道机器人系统",
                 name: "EquipYunmuFW",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/EquipYunmuFW"),
               hidden: true
             },
             {
               path: "/breedManager",
               meta: {
                 title: "品种管理",
                 name: "breedManager",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/archive/breed/index"),
               hidden: true
             },
             {
               path: "/envConfig",
               meta: {
                 title: "生长环境配置",
                 name: "envConfig",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/base/archive/env/index"),
               hidden: true
             },
             {
               path: "/cycleManager",
               meta: {
                 title: "农产品生长周期",
                 name: "cycleManager",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/archive/cycle/index"),
               hidden: true
             },
             {
               path: "/pestManager",
               meta: {
                 title: "关联病虫害",
                 name: "pestManager",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/archive/pest/index"),
               hidden: true
             },
             {
               path: "/pestDetail",
               meta: {
                 title: "病虫害详情",
                 name: "pestDetail",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/archive/pest/module/detail"),
               hidden: true
             },
             {
               path: "/addPlant",
               meta: {
                 title: "添加作物",
                 name: "addPlant",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/archive/plantFile/addPlant"),
               hidden: true
             },
             {
               path: "/deviceEdit",
               meta: {
                 title: "设备编辑",
                 name: "deviceEdit",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/EquipEdit"),
               hidden: true
             },
             {
               path: "/dkInfo",
               meta: {
                 title: "地块详情",
                 name: "dkInfo",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/plan/components/Dk_info_New"),
               hidden: true
             },
             {
               path: "/dkInfoMap3d",
               meta: {
                 title: "地块详情",
                 name: "dkInfo",
                 hideTitle: true,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/plan/components/Dk_info_New_map3d"),
               hidden: true
             },
             {
               path: "/deviceLog",
               meta: {
                 title: "设备日志",
                 name: "deviceLog",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/base/equip/module/Log"),
               hidden: true
             },
             {
               path: "/thirdParty/:thirdID",
               meta: {
                 name: "servicePlatform",
                 hideTitle: false,
                 noCache: true
               },
               component: () => import("@/views/servicePlatform"),
               hidden: true
             },
             {
               path: "/devicePicture",
               meta: {
                 title: "设备相册",
                 name: "devicePicture",
                 hideTitle: false,
                 noCache: true
               },
               component: () =>
                 import("@/views/base/equip/module/DevicePicture"),
               hidden: true
             },
             {
               path: "/addAlarm",
               name: "addAlarm",
               meta: {
                 title: "创建告警规则",
                 name: "addAlarm",
                 hideTitle: false,
                 noCache: true
               },
               hidden: true,
               component: () => import("@/views/alarm/modules/addAlarm")
             },
             {
               path: "/addtriggerPlan",
               name: "addtriggerPlan",
               meta: {
                 title: "创建触发策略",
                 name: "addAlarm",
                 hideTitle: false,
                 noCache: true
               },
               hidden: true,
               component: () =>
                 import("@/views/strategyPlan/modules/addTrigger")
             },
             {
               path: "/addTimerPlan",
               name: "addTimerPlan",
               meta: {
                 title: "创建定时任务",
                 name: "addAlarm",
                 hideTitle: false,
                 noCache: true
               },
               hidden: true,
               component: () =>
                 import("@/views/strategyPlan/modules/addTimer")
             }
           ]
         },
         {
           path: "/user",
           component: Layout,
           hidden: true,
           redirect: "noredirect",
           children: [
             {
               path: "center",
               component: () => import("@/views/system/user/center"),
               name: "个人中心",
               meta: {
                 title: "个人中心",
                 icon: "user"
               }
             }
           ]
         },
         {
           path: "/introduce",
           name: "introduce",
           title: "农语-云平台",
           hidden: true,
           component: () => import("@/views/login/introduce")
         },
         {
           path: "/garden",
           name: "garden",
           title: "数字菜园",
           hidden: true,
           component: () => import("@/views/garden")
         },
         {
           path: "/myAreaDetail",
           name: "myAreaDetail",
           title: "地块详情",
           hidden: true,
           component: () =>
             import("@/views/base/plan/components/screen_DK_info")
         },
         {
           path: "/bigScreen",
           meta: {
             title: "水肥大屏",
             name: "bigScreen",
             hideTitle: false
           },
           component: () =>
             import("@/views/base/appCenter/module/shuifeiScreen/shuifeiji"),
            //  import("@/views/base/equip/module/daping/shuifeiji"),
           hidden: true
         }
         // { path: '*', redirect: '/404', hidden: true }
       ];

export default new VueRouter({
  //飞宏修改
  //无

  //82
  //mode: 'history',
  //base: 'wlw_admin',

  //华为
  mode: 'history',
  
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
