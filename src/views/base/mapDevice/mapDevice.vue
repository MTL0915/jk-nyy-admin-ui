<template>
  <div class="mapDevice" id="allparent">
    <JKMap3d :load="mapload"></JKMap3d>
    <!-- 项目名 -->
    <div class="mapDeviceTitle">农语云设备运行监控平台</div>
    <!-- 上方的工具栏 -->
    <pland-toolbar
      :isBack="isBack"
      :callBack="callBack"
      :allDeviceData="allDeviceData"
      :deviceLayer="deviceLayer"
      :deviceNameLayer="deviceNameLayer"
      :deviceGroupLayer="deviceGroupLayer"
      :currentType="currentType"
      :currentStatus="currentStatus"
      :view="view"
      v-show="!isCoverMode"
      ref="toolbar"
    ></pland-toolbar>
    <!-- 下方的图层选择器 -->
    <pland-bottom
      :currentType="currentType"
      :currentStatus="currentStatus"
      ref="bottom"
      :view="view"
      :allDeviceData="allDeviceData"
      :deviceLayer="deviceLayer"
      :deviceNameLayer="deviceNameLayer"
      :deviceGroupLayer="deviceGroupLayer"
    ></pland-bottom>
    <!-- 全部设备展示列表 -->
    <pland-showalldevice
      ref="showalldevice"
      v-if="isShowDeviceInfo"
      :backToHome="backToHome"
      :change="showalldevice_changePage"
      :max="showalldevice_max"
      :count="showalldevice_count"
      :page="showalldevice_page"
      :datas="searchResult"
      :flag="flag"
    ></pland-showalldevice>

    <!-- 显示地图弹窗 -->
    <div ref="dialogBox" style="position: absolute; top: 0"></div>
  </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
import plandToolbar from "./comps/toolbar";
import plandBottom from "./comps/bottom";
import plandShowalldevice from "./comps/showAllDevice";
import {
  getSensorByDeviceId,
  getWarnByBaseId,
  baseListByOrgId,
  getDevicesByUser,
} from "@/api/map3d/index";
export default {
  components: {
    plandToolbar,
    plandBottom,
    plandShowalldevice,
  },
  data() {
    return {
      // 存储当前页搜索结果
      searchResult: [],
      // 正处于搜索页面的标志
      isSearch: false,
      // 记录更新地图图层的次数
      times: 0,
      // 判断是否需要重新计算最大页码的标志
      flag: true,
      // 判断是否是第一次获取数据
      flag2: true,
      // 计算最大页面用存储数据
      calData: null,
      // 显示设备信息弹窗
      isShowDeviceInfo: true,

      showalldevice_max: 10,
      showalldevice_count: 5,
      showalldevice_page: 1,

      // 所有设备数据
      allDeviceData: [],

      // 图层
      deviceLayer: null, //设备图层
      deviceNameLayer: null, //设备名称图层
      deviceGroupLayer: null, //设备聚合图层
      deviceLocLayer: null, // 设备坐标图层
      group: null, // 根据设备位置为其分组

      // 筛选器
      currentType: [],
      currentStatus: [],

      view: {},

      // 弹窗集合
      dialogGraphic: [],
    };
  },
  watch: {
    // 计算最大页数
    calData() {
      let result = 0
      for (let i = 0; i < this.allDeviceData.length; i++) {
        let str = this.allDeviceData[i].name + this.allDeviceData[i].device_id
        if (str.indexOf(this.$refs.showalldevice.filter_key) >= 0) result++
      }
      if (result === 0) {
        this.showalldevice_max = 1
      } else {
        this.showalldevice_max = Math.ceil(result / 10)
      }
      console.log("max", this.showalldevice_max)
      // let json = {
      //   count: 0,
      //   page: this.showalldevice_page - 1,
      //   size: 1000,
      //   sort: [],
      //   shi_area_id: this.$refs.showalldevice.shi || "",
      //   keyword: this.$refs.showalldevice.filter_key || "",
      //   bs_base_id: this.$refs.showalldevice.base_id || "",
      //   customStatus: this.$refs.showalldevice.device_status,
      // };
      // getDevicesByUser(json).then((e) => {
      //   if (e.data.length === 0) {
      //     this.showalldevice_max = 1;
      //   } else {
      //     this.showalldevice_max = Math.ceil(e.data.length / 10)
      //   }
      // });
    },
  },
  mounted() {},
  methods: {
    // 判断是摄像头
    isSXT(graphic) {
      var attr = graphic.attributes;
      if (attr.hd_device_type_code === "JK-SX") {
        return true;
      } else {
        return false;
      }
    },

    deviceGraphicClick(graphic) {
      this.hideDeviceInfo();
      this.showDialogDevice(graphic);
    },

    showDialogDevice(graphic) {
      if (this.isSXT(graphic)) {
        // 如果是摄像头
        // 创建dom
        var html = `
                            <div class='iframeBox' v-show='iframeShow' style='top:-100%;'>
                                <div class='iframeTitle'>${graphic.attributes.name}
                                <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement.parentElement;dom.querySelector("iframe").remove();dom.remove();dom.graphics.dom = null'></i>
                                <i class='el-icon-full-screen closeIframe' style='right: 25px;' onclick='var dom =this.parentElement.parentElement.parentElement; openFullscreen(dom.querySelector("iframe"))'></i>
                                </div>
                                <div class='iframeWindow' style='width: 300px;height: 200px;background: #00000099;'>
                                <iframe
                                    dbbig='sadasd'
                                    style='height: 100%;' 
                                    src="/openvideo?hd_device_id=${graphic.attributes.id}&playWay=play"
                                    frameborder="0"
                                />
                                </div>
                            </div>
                        `;
        this.dialog(graphic, html, "摄像头");
        return;
      }

      getSensorByDeviceId(graphic.attributes.device_id).then((e) => {
        var html = "<div class='title'>" + graphic.attributes.name + "</div>";
        html +=
          "<i class='el-icon-close closeSonBox' onclick='this.parentElement.remove(); this.parentElement.graphics.dom = null;' ></i>";
        html += "<div class='sonBox'>";
        for (var i in e.data) {
          html += `<div>
                                <div>${e.data[i].name}</div>
                                <div class='stateColor${e.data[i].sta}'>${
            e.data[i].sta === 2 ? "数据异常" : e.data[i].value + e.data[i].unit
          }</div>
                            </div>`;
        }
        html += "</div>";
        this.dialog(graphic, html, "设备");
      });
    },

    // 弹窗浮层
    dialog(graphic, html, type) {
      var index = this.dialogGraphic.indexOf(graphic);
      if (index < 0) {
        // 定义浮窗类型
        graphic.dialogType = type;
        // 如果不存在
        this.dialogGraphic.push(graphic);
      } else {
        if (graphic.dom === null) {
          // 如果存在但是dom = null
          this.dialogGraphic.splice(index, 1);
          graphic.dom = undefined;
          return;
        }
      }
      // 如果不存在dom
      if (!graphic.dom) {
        graphic.dom = document.createElement("div");
        graphic.dom.graphics = graphic;
        graphic.dom.className = "map3d_dialog";
        graphic.dom.innerHTML = `
                            <div class='bor'></div>
                            ${html}
                        `;
        this.$refs.dialogBox.appendChild(graphic.dom);
      }
      // 获取屏幕坐标
      if (graphic.geometry.type === "point") {
        var p = this.view.toScreen(graphic.geometry);
      } else {
        var p = this.view.toScreen(graphic.geometry.centroid);
      }

      graphic.dom.style.cssText = `left: ${p.x}px;top:${p.y - 50}px;`;
    },

    // 翻页事件
    showalldevice_changePage(i) {
      this.showSearch = false;
      this.showalldevice_page = i;
      this.isShowDeviceInfo = true;
      this.searchForResult();
    },

    // 地图加载完毕事件
    mapload(view) {
      this.view = view;

      this.showAllDevice(() => {
        // 判断是否显示名称
        this.panduanIsShowName();
        // // 判断是否显示提示标注
        this.panduanIsShowMake();
        // 判断是否显示聚合
        this.panduanIsShowJuHe();
        // 判断是否显示坐标
        this.panduanIsShowLoc();

        view.watch("zoom", () => {
          // 判断是否显示名称
          this.panduanIsShowName();
          // // 判断是否显示提示标注
          this.panduanIsShowMake();
          // 判断是否显示聚合
          this.panduanIsShowJuHe();
          // 判断是否显示坐标
          this.panduanIsShowLoc();
        });

        // 监听摄像头的变化
        view.watch("camera", (camera) => {
          if (this.heading != camera.heading) {
            this.heading = -1 * camera.heading;
          }
          // 判断dialog浮动窗
          this.panduanIsDialog();
        });
      });
    },

    panduanIsDialog() {
      var data = this.dialogGraphic;
      for (var i in data) {
        this.dialog(data[i]);
      }
    },

    panduanIsShowName() {
      if (!this.deviceNameLayer) return;
      if (this.view.zoom > 17) {
        this.deviceNameLayer.visible = true;
        this.$refs.toolbar.nameflag = true;
        this.$refs.bottom.nameflag = true;
      } else {
        this.deviceNameLayer.visible = false;
        this.$refs.toolbar.nameflag = false;
        this.$refs.bottom.nameflag = false;
      }
    },

    panduanIsShowJuHe() {
      if (this.view.zoom <= 13 && !this.isSearch) {
        this.deviceGroupLayer.visible = true;
        this.$refs.toolbar.groupflag = true;
      } else {
        this.deviceGroupLayer.visible = false;
        this.$refs.toolbar.groupflag = false;
      }
    },

    // 判断是否显示标记
    // 主要是用来范围模型太小放大后找不到
    panduanIsShowMake() {
      if (this.view.zoom > 13) {
        this.deviceLayer.visible = true;
      } else {
        this.deviceLayer.visible = false;
      }
    },

    panduanIsShowLoc() {
      if (this.isSearch) {
        this.deviceLocLayer.visible = true;
      } else {
        this.deviceLocLayer.visible = false;
      }
    },

    // 清除弹窗
    hideDeviceInfo() {
      var data = this.dialogGraphic;
      for (var i = 0; i < data.length; i++) {
        var graphics = data[i];
        if (graphics.dom) {
          graphics.dom.remove();
          graphics.dom = null;
        }
        data.splice(i, 1);
        i--;
      }
    },

    // 清除图层
    clearLayer() {
      this.deviceNameLayer && this.deviceNameLayer.removeAll();
      this.deviceLayer && this.deviceLayer.removeAll();
      this.deviceGroupLayer && this.deviceGroupLayer.removeAll();
      this.deviceLocLayer && this.deviceLocLayer.removeAll();
    },

    arrayRemove(e, array) {
      for (let i = 0; i < array.length; i++) {
        if (e === array[i]) {
          for (let j = 0; j < i; j++) {
            let e2 = array[0];
            array.shift();
            array.push(e2);
          }
          array.shift();
          return;
        }
      }
    },

    getDistance(p1, p2) {
      return (
        (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1])
      );
    },

    createGroup(data, poslist) {
      const maxDistance = 0.1;
      const mul = 10000;
      var group = [];
      let groupNum = 0;
      // 给设备点分组
      while (data.length) {
        let pos = [poslist[0][0] / mul, poslist[0][1] / mul];
        let card = { group: groupNum, data: data[0] };
        group.push(card);
        // 删除data
        let dataElement = data[0];
        this.arrayRemove(dataElement, data);
        // 删除位置
        let posElement = poslist[0];
        this.arrayRemove(posElement, poslist);
        for (let j = 0; j < data.length; j++) {
          let pos2 = [poslist[j][0] / mul, poslist[j][1] / mul];
          // 归为一组
          if (this.getDistance(pos, pos2) < maxDistance) {
            let card2 = { group: groupNum, data: data[j] };
            group.push(card2);
            // 删除data
            let dataElement2 = data[j];
            let data2 = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i] != dataElement2) data2.push(data[i]);
            }
            data = data2;
            // 删除位置
            let posElement2 = poslist[j];
            let poslist2 = [];
            for (let i = 0; i < poslist.length; i++) {
              if (poslist[i] != posElement2) poslist2.push(poslist[i]);
            }
            poslist = poslist2;
            j--;
          }
        }
        groupNum++;
      }
      return group;
    },

    getMidPoint(poslist) {
      let x = 0;
      let y = 0;
      for (let i = 0; i < poslist.length; i++) {
        x += poslist[i][0];
        y += poslist[i][1];
      }
      x /= poslist.length;
      y /= poslist.length;
      return [x, y];
    },

    showAllDevice(fn) {
      this.hideDeviceInfo();
      this.clearLayer();
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var json = {
        count: 0,
        page: this.showalldevice_page - 1,
        size: 10,
        sort: [],
        shi_area_id: this.$refs.showalldevice.shi || "",
        keyword: this.$refs.showalldevice.filter_key || "",
        bs_base_id: this.$refs.showalldevice.base_id || "",
        customStatus: this.$refs.showalldevice.device_status,
      };

      if (this.flag2) {
        this.flag2 = false;
        json = {
          count: 0,
          page: 0,
          size: 1000,
          sort: [],
          shi_area_id: this.$refs.showalldevice.shi || "",
          keyword: this.$refs.showalldevice.filter_key || "",
          bs_base_id: this.$refs.showalldevice.base_id || "",
          customStatus: this.$refs.showalldevice.device_status,
        };
      }

      // 获取所有设备的位置
      getDevicesByUser(json).then((e) => {
        loading.close();
        console.log(e.data)
        // 记录已经出现的基地id
        var baseIds = [];
        var data = e.data;
        var nicedata = [];
        var nicedataposlist = [];
        var ary = {
          states1: [],
          states2: [],
          states3: [],
        };
        for (var i in data) {
          var it = data[i];
          ary["states" + it.state] && ary["states" + it.state].push(it);
          // 判断是否有几何模型
          if (!it.longitude || !it.latitude) continue;
          var p = JSON.parse(it.geometry_json);
          if (!p) continue;
          // 判断结束
          nicedata.push(it);
          p = this.mercatorTolonlat(p.point);
          nicedataposlist.push([p[0], p[1]]);
          var point = {
            type: "point",
            x: p[0],
            y: p[1],
            spatialReference: { wkid: 102100 },
          };
          var markerSymbol = {
            type: "simple-marker",
            color: [255, 0, 0],
            size: "20px",
          };
          if (it.state === 1 || it.state === 3) {
            markerSymbol = {
              type: "simple-marker",
              color: [0, 255, 0],
              size: "20px",
            };
          }
          if (it.state === 0) {
            markerSymbol = {
              type: "simple-marker",
              color: [192, 192, 192],
              size: "20px",
            };
          }
          var polygonGraphic = new map3d.esri.Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
              pointType: "设备",
              ...it,
            },
          });
          this.deviceLayer = map3d.Util.addGraphic(
            polygonGraphic,
            "全部设备标注"
          );
          it.graphic = polygonGraphic;
          polygonGraphic.click = this.deviceGraphicClick.bind(
            this,
            polygonGraphic
          );
          polygonGraphic.mouseover = function (e) {
            document.body.style.cursor = "pointer"
          };
          polygonGraphic.mouseout = function (e) {
            document.body.style.cursor = "default"
          };
          // 创建名称
          var point = polygonGraphic.geometry.clone();
          // 创建symbol
          var symbol = {
            type: "text",
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: it.name,
            xoffset: 0,
            yoffset: -15,
            font: {
              size: 8,
              family: "Josefin Slab",
              weight: "bold",
            },
          };
          var polygonGraphic = new map3d.esri.Graphic({
            geometry: point,
            symbol: symbol,
            attributes: it,
          });
          this.deviceNameLayer = map3d.Util.addGraphic(
            polygonGraphic,
            "全部设备名称"
          );
          polygonGraphic.click = this.deviceGraphicClick.bind(
            this,
            polygonGraphic
          );
          polygonGraphic.mouseover = function (e) {
            document.body.style.cursor = "pointer"
          };
          polygonGraphic.mouseout = function (e) {
            document.body.style.cursor = "default"
          };
        }

        // 创建聚合图层
        var groupNum = 0;
        this.group = this.createGroup(nicedata, nicedataposlist);
        var pointlist = [];
        var datalist = [];
        var lengthlist = [];
        for (let i = 0; i < this.group.length; i++) {
          if (this.group[i].group === groupNum) {
            datalist.push(this.group[i].data);
            if (i === this.group.length - 1) {
              var poslist = [];
              lengthlist.push(datalist.length);
              for (let j = 0; j < datalist.length; j++) {
                var p = JSON.parse(datalist[j].geometry_json);
                p = this.mercatorTolonlat(p.point);
                poslist.push([p[0], p[1]]);
              }
              var pos = this.getMidPoint(poslist);
              var point = {
                type: "point",
                x: pos[0],
                y: pos[1],
                spatialReference: { wkid: 102100 },
              };
              pointlist.push(point);
            }
          } else {
            // 将组成员添加到小组，并计算出最终聚合的点的位置
            var poslist = [];
            lengthlist.push(datalist.length);
            for (let j = 0; j < datalist.length; j++) {
              var p = JSON.parse(datalist[j].geometry_json);
              p = this.mercatorTolonlat(p.point);
              poslist.push([p[0], p[1]]);
            }
            var pos = this.getMidPoint(poslist);
            var point = {
              type: "point",
              x: pos[0],
              y: pos[1],
              spatialReference: { wkid: 102100 },
            };
            pointlist.push(point);
            // 添加结束
            datalist = [];
            groupNum++;
            i--;
          }
        }
        // 已生成点数组pointlist，组大小数组lengthlist
        for (let i = 0; i < pointlist.length; i++) {
          var width = 20 + 2 * lengthlist[i];
          var height = width;
          var markerSymbol = {
            type: "picture-marker",
            url: "./static/img/juhe-orange.png",
            // 根据聚集的设备的量增加圆的大小（20~40）
            width: width.toString() + "px",
            height: height.toString() + "px",
          };
          var polygonGraphic = new map3d.esri.Graphic({
            geometry: pointlist[i],
            symbol: markerSymbol,
          });
          // 注册鼠标事件
          polygonGraphic.click = function (e) {
            view.goTo({ target: e.geometry, zoom: 19 });
          };
          polygonGraphic.mouseover = function (e) {
            this.symbol.width *= 1.2;
            this.symbol.height *= 1.2;
            this.symbol.url = "./static/img/juhe-selected.png";
            this.symbol = this.symbol.clone();
          };
          polygonGraphic.mouseout = function (e) {
            this.symbol.width /= 1.2;
            this.symbol.height /= 1.2;
            this.symbol.url = "./static/img/juhe-orange.png";
            this.symbol = this.symbol.clone();
          };
          // 注册结束
          this.deviceGroupLayer = map3d.Util.addGraphic(
            polygonGraphic,
            "设备聚合点"
          );
        }
        // 创建结束
        // 初始化坐标图层
        var point = {
          type: "point",
          x: 0,
          y: 1,
          spatialReference: { wkid: 102100 },
        };

        var markerSymbol = {
          type: "picture-marker",
          url: "./static/img/loc.png",
          width: "20px",
          height: "20px",
        };
        var polygonGraphic = new map3d.esri.Graphic({
          geometry: point,
          symbol: markerSymbol,
        });

        this.deviceLocLayer = map3d.Util.addGraphic(
          polygonGraphic,
          "设备坐标点"
        );

        this.allDeviceData = e.data;

        fn && fn(this.allDeviceData);

        // 将视角调整到设备聚集区域
        view.goTo({
          target: [
            parseInt(this.allDeviceData[0].longitude),
            parseInt(this.allDeviceData[0].latitude),
          ],
          zoom: 8,
        });
      });
    },

    // 墨卡托转GPS坐标
    mercatorTolonlat(mercator, bool) {
      if (!bool) {
        return mercator;
      }
      var lonlat = [];
      var x = (mercator[0] / 20037508.34) * 180;
      var y = (mercator[1] / 20037508.34) * 180;
      y =
        (180 / Math.PI) *
        (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
      lonlat[0] = x;
      lonlat[1] = y;
      return lonlat;
    },

    transformStatus(status) {
      if (status === "离线") {
        return 0;
      } else if (status === "在线") {
        return 1;
      } else {
        return 3;
      }
    },

    searchForResult() {
      this.isSearch = true;
      this.deviceLocLayer.removeAll();
      var json = {
        count: 0,
        page: this.showalldevice_page - 1,
        size: 10,
        sort: [],
        shi_area_id: this.$refs.showalldevice.shi || "",
        keyword: this.$refs.showalldevice.filter_key || "",
        bs_base_id: this.$refs.showalldevice.base_id || "",
        customStatus: this.$refs.showalldevice.device_status,
      };
      getDevicesByUser(json).then((e) => {
        this.searchResult = e.data;
        console.log(this.searchResult)

        // 基础图形图层所有图形缩小
        for (let i = 0; i < this.deviceLayer.graphics.length; i++) {
          this.deviceLayer.graphics.items[i].symbol.size *= 1 / 3;
          this.deviceLayer.graphics.items[
            i
          ].symbol = this.deviceLayer.graphics.items[i].symbol.clone();
        }
        // 名称图层不可视，指定名称显示
        for (let i = 0; i < this.deviceNameLayer.graphics.length; i++) {
          this.deviceNameLayer.graphics.items[i].visible = false;
        }
        // 创建坐标图层，指定设备点添加定位标记，全缩放值显示
        if (this.deviceLocLayer) this.deviceLocLayer.removeAll();
        for (let i = 0; i < Math.min(10, this.searchResult.length); i++) {
          let data = this.searchResult[i];
          var p = JSON.parse(data.geometry_json);
          if (!p) continue;
          p = this.mercatorTolonlat(p.point);
          for (let j = 0; j < this.deviceNameLayer.graphics.length; j++) {
            if (
              this.deviceNameLayer.graphics.items[j].attributes.longitude ===
              data.longitude
            ) {
              this.deviceNameLayer.graphics.items[j].visible = true;
              break;
            }
          }
          var point = {
            type: "point",
            x: p[0],
            y: p[1],
            spatialReference: { wkid: 102100 },
          };
          var markerSymbol = {
            type: "picture-marker",
            url: "./static/img/loc.png",
            width: "20px",
            height: "20px",
          };
          var polygonGraphic = new map3d.esri.Graphic({
            geometry: point,
            symbol: markerSymbol,
          });
          polygonGraphic.click = function (e) {
            view.goTo({ target: e.geometry, zoom: 19 });
          };
          polygonGraphic.mouseover = function (e) {
            this.symbol.width *= 1.2;
            this.symbol.height *= 1.2;
            this.symbol = this.symbol.clone();
          };
          polygonGraphic.mouseout = function (e) {
            this.symbol.width /= 1.2;
            this.symbol.height /= 1.2;
            this.symbol = this.symbol.clone();
          };
          // 名称决定图层
          this.deviceLocLayer = map3d.Util.addGraphic(
            polygonGraphic,
            "设备坐标点"
          );
        }
        // 重置缩放等级更新图层
        view.goTo({
          zoom: 7.99,
        });
      });
    },

    backToHome() {
      this.deviceLocLayer.removeAll();
      this.isSearch = false;
      for (let i = 0; i < this.deviceLayer.graphics.length; i++) {
        this.deviceLayer.graphics.items[i].symbol.size = "20px";
        this.deviceLayer.graphics.items[
          i
        ].symbol = this.deviceLayer.graphics.items[i].symbol.clone();
      }
      for (let i = 0; i < this.deviceNameLayer.graphics.length; i++) {
        this.deviceNameLayer.graphics.items[i].visible = true;
      }
      view.goTo({
        zoom: 8.01,
      });
    },

    // 筛选(非翻页)
    baseChange() {
      this.time++;
      if (this.flag) {
        // 计算最大页数
        this.showalldevice_max = -1;
        this.calData++;
        // 计算结束
      }
      this.flag = true;
      this.showalldevice_page = 1;
      // 刷新数据显示
      if (!this.time) {
        this.showAllDevice(() => {
          setTimeout(() => {
            this.$refs.showalldevice.setPage(1);
          }, 100);
        });
      } else {
        this.searchForResult();
      }
    },
  },
};
</script>

<style>
.mapDevice .mapDeviceTitle {
  background: #000000;
  position: absolute;
  top: 15px;
  left: 15px;
  color: #fff;
  font-size: 25px;
  width: 345px;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  font-family: "楷体";
  text-align: center;
}

.mapDevice .iframeBox {
  /* position: absolute; */
  /* left: 50%; */
  /* top: 50%; */
  /* transform: translate(-50%, -50%); */
}
.mapDevice .iframeBox .iframeBox iframe {
  width: 100%;
  height: 100%;
}
.mapDevice .iframeBox .iframeWindow {
  /*background:#e6e6e6;*/
}
.mapDevice .iframeBox .iframeBox iframe::-webkit-scrollbar {
  width: 0;
}
.mapDevice .iframeBox .closeIframe {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.mapDevice .iframeBox .closeIframe:hover {
  color: red;
}
.mapDevice .iframeBox .iframeTitle {
  padding: 2px;
  color: #dadada;
  border-bottom: solid 1px;
  font-size: 12px;
}
.esri-ui-corner-container {
  /* display: none; */
}

.esri-ui-top-left.esri-ui-corner {
  display: none;
}

.esri-ui-inner-container.esri-ui-corner-container {
  top: 65px !important;
}

.esri-component.esri-attribution.esri-widget {
  display: none;
}

.map3d_dialog {
  background: #000000a8;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  transform: translate(-50%, -100%);
  color: #ffffff;
  cursor: pointer;
  /* width: 300px; */
  white-space: nowrap;
}

.map3d_dialog .sonBox {
  width: 300px;
}

.map3d_dialog::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  border-top: solid 5px #000000a8;
  border-left: solid 5px #ffffff00;
  border-right: solid 5px #ffffff00;
}

.map3d_dialog:hover > .bor {
  display: block;
}

.map3d_dialog .bor {
  display: none;
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translate(-50%, 0) rotateZ(45deg);
  border-right: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;
  padding: 3px;
}

.map3d_dialog .closeSonBox {
  position: absolute;
  top: 8px;
  right: 7px;
  display: none;
}

.map3d_dialog:hover > .closeSonBox {
  display: block;
}

.map3d_dialog .title {
  padding: 2px 2px 8px;
  font-size: 14px;
  text-align: center;
}

.map3d_dialog .sonBox {
  display: flex;
  flex-wrap: wrap;
}

.map3d_dialog .sonBox > div {
  width: 33%;
  text-align: center;
  padding: 3px;
}

.map3d_dialog .a {
}

.map3d_dialog:hover {
  border: solid 1px #ffffff;
  z-index: 9999;
  background: #000000;
}
</style>

<style scoped>
.mapDevice {
  height: 100%;
}
</style>