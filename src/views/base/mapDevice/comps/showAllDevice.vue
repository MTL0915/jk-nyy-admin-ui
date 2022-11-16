<template>
  <div
    class="showAllDevice"
    :style="showList ? 'height: calc(100% - 50px);' : ''"
  >
    <!-- 查询搜索框 -->
    <el-autocomplete
      id="searchArea"
      ref="searchInput"
      class="filter_key"
      v-model="filter_key"
      placeholder="请输入内容"
      v-show="isShowSearch"
      :fetch-suggestions="querySearchAsync"
      @select="filter_key_select"
      @blur="isSearchBlur = true"
      @focus="isSearchBlur = false"
    >
      <!-- 搜索建议 -->
      <template slot-scope="{ item }">
        <div class="searchReturnBox">
          <div>
            <div class="name">
              {{ item.device.name }} ({{ item.device.hd_device_type_code }})
            </div>
            <div class="addr">{{ item.device.bs_base_name }}</div>
          </div>
        </div>
      </template>
      <!-- 建议结束 -->
    </el-autocomplete>
    <i
      slot="suffix"
      @click="chaxun"
      class="el-input__icon el-icon-search"
      id="searchBotton"
    ></i>
    <!-- 汇总页面 -->
    <div class="contentBox" v-show="showBox && isSearchBlur">
      <!-- 上方状态总览 -->
      <div class="contentBoxHeader">
        <div class="contentBoxData">
          <div
            class="contentBoxDataModel"
            @click="search(it.name, it.value)"
            v-for="(it, i) in deviceStatus"
            :key="i"
          >
            <div style="font-size: 16px; color: #0087ff; margin-bottom: 5px">
              {{ it.value }}
            </div>
            <div>{{ it.name }}</div>
          </div>
        </div>
      </div>
      <!-- 结束 -->
      <!-- 中间地区总览 -->
      <div class="contentBoxBody">
        <div class="contentBoxTitle">设备分布</div>
        <div class="contentBoxDistributed">
          <div v-for="(it, i) in area" :key="i">
            <div class="cityListName">{{ it.shen }}</div>
            <div class="cityListModel">
              <div
                class="contentBoxDataModel"
                @click="filter(null, its)"
                v-for="(its, i) in it.shi"
                :key="i"
              >
                <span style="color: rgb(0, 135, 255)">{{
                  its.shi_area_name
                }}</span>
                <span>({{ its.device_num }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结束 -->
      <div>
        <div class="chart" ref="chart"></div>
      </div>
    </div>
    <!-- 设备列表 -->
    <div class="contentBox" v-show="showList && isSearchBlur">
      <div @click="blackList" class="backBaseInfoDiv">
        <span>{{ "<" + "返回" }}</span>
      </div>
      <div class="filterArray" style="display: flex">
        <div class="filterModel">
          <div class="menuName">{{ shiName || "全部城市" }}</div>
          <i class="el-icon-caret-bottom filterI"></i>
          <div class="menus">
            <div
              style="
                width: 100px;
                border-right: solid 1px #ffffff;
                height: 100%;
              "
            >
              <div class="areamenus" v-for="(it, i) in area" :key="i">
                <div class="areamenusname">{{ it.shen }}</div>
                <div class="areamenuslist">
                  <div
                    v-for="(its, i) in it.shi"
                    :key="i"
                    @click="selectCity(its)"
                    class="curText"
                  >
                    {{ its.shi_area_name }}({{ its.device_num }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="filterModel">
          <div class="menuName">{{ base_name || "全部基地" }}</div>
          <i class="el-icon-caret-bottom filterI"></i>
          <div class="menus">
            <div
              class="divCenter curText"
              @click="selectBase({ id: '', name: '全部基地' })"
            >
              全部基地
            </div>
            <div
              class="divCenter curText"
              v-for="(it, i) in city"
              :key="i"
              @click="selectBase(it)"
            >
              {{ it.name }}
            </div>
          </div>
        </div>
        <div class="filterModel">
          <div class="menuName">{{ device_status || "全部" }}设备</div>
          <i class="el-icon-caret-bottom filterI"></i>
          <div class="menus">
            <div class="divCenter curText" @click="selectStatus('')">全部</div>
            <div class="divCenter curText" @click="selectStatus('在线')">
              在线
            </div>
            <div class="divCenter curText" @click="selectStatus('离线')">
              离线
            </div>
            <div class="divCenter curText" @click="selectStatus('故障')">
              故障
            </div>
          </div>
        </div>
      </div>
      <div class="deviceInfoList">
        <div
          class="deviceInfoListModel"
          @click="listRowClick(it)"
          v-for="(it, i) in datas"
          :key="i"
        >
          <!-- 图标 -->
          <div>
            <img :src="require('@/assets/img/Plan/juhe1.png')" />
          </div>
          <!-- 内容 -->
          <div>
            <!-- 标题 -->
            <div class="deviceInfoName">{{ it.name }}({{ it.device_id }})</div>
            <div style="width: 100%">{{ it.bs_base_name }}</div>
            <div>广东省广州市天河区林和街27号中意花园A栋首层</div>
          </div>
          <!-- 图片 -->
          <div>
            <img class="deviceImg" :src="require('@/assets/img/imgny.png')" />
          </div>
        </div>
      </div>
      <c-page
        ref="page"
        :page="page"
        :change="changePage"
        :count="count"
        :max="max"
      ></c-page>
    </div>
    <!-- 返回按钮 -->
    <div class="blackInfo" @click="backInfo" v-show="showInfo">返回</div>
    <!-- 按钮结束 -->
    <device-info ref="info" :datas="device"></device-info>
  </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
import cPage from "./page.vue";
import { getDevicesByUser } from "@/api/map3d/index";
import {
  findMapBaseShiAreaByBs_user_id,
  baseListByOrgIds,
  userDevicesStatus,
  userMapDeviceShiArea,
} from "@/api/map3d/index";
import deviceInfo from "./deviceInfo";
export default {
  name: "showAllBase",
  components: {
    deviceInfo,
    cPage,
  },
  props: {
    page: 1,
    max: 100,
    count: 5,
    datas: {
      type: Array,
      default: () => [],
    },
    change: {
      type: Function,
      default: () => {},
    },
    backToHome: {
      type: Function,
      default: () => {},
    },
    flag: true,
  },
  watch: {
    datas(e) {},
  },
  data() {
    return {
      showBox: true,
      showList: false,
      showInfo: false,
      isShowSearch: true,
      citys: [],
      deviceId: "",
      status1: 0,
      status2: 0,
      status3: 0,
      filter_status: 0,
      filter_key: "",
      state: "",
      device: {},
      area: [],
      city: [],
      shi: "",
      base_id: "",
      device_status: "",
      deviceStatus: [],

      querySearchAsyncIng: false, //查询状态
      isSearchBlur: true, //查询框是否没被选中
    };
  },
  mounted() {
    this.getAreaData();
    this.getBaseData();
    this.getDeviceData();
  },
  methods: {
    getDeviceImage(json) {
      var it = json.device;
      return require("@/assets/img/Plan/sbIcon/" +
        it.hd_device_type_code +
        "_" +
        it.state +
        ".png");
    },

    // 获取设备状态数量
    getDeviceData() {
      userDevicesStatus().then((e) => {
        var ary = [];
        for (var i in e.data) {
          ary.push({ name: i, value: e.data[i] });
        }
        this.deviceStatus = ary;
      });
    },
    // 获取行政区域菜单内容
    getAreaData() {
      userMapDeviceShiArea().then((e) => {
        // 对数据结果进行预处理
        var data = e.data;
        var ary = [];
        for (var i in data) {
          var it = data[i];
          // 判断是那个省的
          var shen = it.sheng_area_name;
          if (!shen) {
            shen = "其他";
            it.shi_area_name = "其他区域";
          }
          var cityName = it.shi_area_name || "其他";
          var itCity = this.citys.find((e) => {
            return e.name === cityName;
          });
          if (!itCity) {
            itCity = { name: cityName, value: it.device_num };
            this.citys.push(itCity);
          } else {
            itCity.value += it.device_num;
          }
          // 判断这个省有没有收录
          var dat = ary.find((e) => {
            return e.shen === shen;
          });
          if (!dat) {
            dat = { shen, shi: [] };
            ary.push(dat);
          }
          dat.shi.push(it);
        }
        this.area = ary;

        this.renderEcharts();
      });
    },

    // 获取行政区域菜单内容
    getBaseData() {
      baseListByOrgIds().then((e) => {
        this.city = e.data;
      });
    },
    // 分页函数
    changePage(i) {
      this.change(i);
    },
    // 标签点击事件
    search(status, num) {
      this.$parent.showalldevice_max = Math.ceil(num / 10);
      this.filter(status);
    },
    filter(status, city, filter_key) {
      if (city) {
        this.$parent.showalldevice_max = Math.ceil(city.device_num / 10);
      }
      this.$parent.flag = false;
      this.showList = true;
      this.showBox = false;
      if (city) {
        this.shi = city.shi_area_id;
        this.shiName = city.shi_area_name;
      }
      if (status) {
        this.device_status = status;
      }
      // 点击两种标签的任何一个
      if (status || city) {
        // 设备信息重新获取，更新页面
        this.$parent.baseChange(status, city);
      }
    },
    // 返回按钮事件
    blackList() {
      this.showList = false;
      this.showBox = true;
      this.$parent.showalldevice_page = 1;
      this.shi = "";
      this.filter_key = "";
      this.base_id = "";
      this.device_status = "";
      // 修改地图标记显示
      this.backToHome();
    },

    backInfo() {
      this.showList = true;
      this.showBox = false;
      this.showInfo = false;
      this.isShowSearch = true;
      // 清除掉攝像頭
      this.$refs.info.sxt = "";
      this.$refs.info.showInfoModel = false;
      // 清除掉设备显示
      this.$parent.hideDeviceInfo();
    },
    renderEcharts() {
      var dom = this.$refs.chart;
      if (!this.echarts) {
        this.echarts = echarts.init(dom);
      }
      var color = [
        "#0087ff",
        "#c1232b",
        "#b5c334",
        "#fcce10",
        "#e87b10",
        "#277c7b",
        "#fe8463",
      ];
      this.echarts.setOption({
        color: color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          data: this.citys.map((e) => {
            return e.name;
          }),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.citys.map((e, i) => {
              return {
                value: e.value,
                itemStyle: { color: color[i % 6] },
              };
            }),
            type: "bar",
            showBackground: true,
          },
        ],
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    listRowClick(it) {
      this.showBox = false;
      this.showList = false;
      this.$refs.info.showInfoModel = true;
      this.showInfo = true;
      this.device = it;
      this.$refs.info.listRowClick(it);
      this.isShowSearch = false;
    },
    // 修改頁碼
    setPage(i) {
      // 页码
      this.$refs.page.setPage(i);
    },

    // 搜索框查询事件
    chaxun() {
      // 显示列表
      this.showList = true;
      this.showBox = false;
      this.$refs.searchInput.$el.querySelector("input").blur();
      // 数据
      this.$parent.baseChange("allDevice");
      this.setPage(1)
    },

    selectCity(it) {
      this.shi = it.shi_area_id;
      this.shiName = it.shi_area_name;
      this.$parent.baseChange("allDevice");
    },

    selectBase(it) {
      this.base_id = it.id;
      this.base_name = it.name;
      this.$parent.baseChange("allDevice");
    },

    selectStatus(status) {
      this.device_status = status;
      this.$parent.baseChange("allDevice");
    },

    showName(shi) {
      var it = this.area.find((e) => {
        return e.shi_area_id === shi;
      });
      return it.shi_area_name;
    },

    // 远距离查询的结果
    querySearchAsync(queryString, cb) {
      // 如果还有查询状态没做完 则退出禁止叠加
      if (this.querySearchAsyncIng) return;
      var restaurants = this.restaurants;
      // 开始调用查询接口
      var json = {
        count: 0,
        page: 0,
        size: 10,
        sort: [],
        shi_area_id: this.shi || "",
        keyword: this.filter_key || "",
        bs_base_id: this.base_id || "",
        customStatus: this.device_status,
      };
      this.querySearchAsyncIng = true;
      // 查询设备
      getDevicesByUser(json).then((e) => {
        this.querySearchAsyncIng = false;
        cb(
          e.data.map((e) => {
            return { value: e.name, device: e };
          })
        );
      });
    },

    // 点击搜索框联想查询结果
    filter_key_select(res) {
      var json = {
        count: 0,
        page: 0,
        size: 10,
        sort: [],
        shi_area_id: this.shi || "",
        keyword: this.filter_key || "",
        bs_base_id: this.base_id || "",
        customStatus: this.device_status,
      };
      getDevicesByUser(json).then((e) => {
        this.datas = e.data;
        this.showList = true;
        this.isShowSearch = false;
        if (this.$parent.deviceLocLayer)
          this.$parent.deviceLocLayer.removeAll();
        var it = e.data.find((e2) => {
          return e2.id === res.device.id;
        });
        var p = JSON.parse(it.geometry_json);
        if (!p) {
          console.log("图形缺失！");
        } else {
          for (let i = 0; i < this.$parent.deviceLayer.graphics.length; i++) {
            this.$parent.deviceLayer.graphics.items[i].symbol.size *= 1 / 3;
            this.$parent.deviceLayer.graphics.items[
              i
            ].symbol = this.$parent.deviceLayer.graphics.items[
              i
            ].symbol.clone();
          }
          for (
            let i = 0;
            i < this.$parent.deviceNameLayer.graphics.length;
            i++
          ) {
            if (this.$parent.deviceNameLayer.graphics.items[i].attributes.id != it.id)this.$parent.deviceNameLayer.graphics.items[i].visible = false;
            else this.$parent.deviceNameLayer.graphics.items[i].visible = true
          }
          view.goTo({
            zoom: 7.999,
          });
          p = this.$parent.mercatorTolonlat(p.point);
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
          this.$parent.deviceLocLayer = map3d.Util.addGraphic(
            polygonGraphic,
            "设备坐标点"
          );
          this.$parent.isSearch = true;
          console.log(this.$parent.deviceLocLayer);
        }
        it && this.listRowClick(it);
      });
    },
  },
};
</script>

<style>
.showAllDevice {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  border-radius: 4px;
  width: 375px;
  height: calc(100% - 50px);
}
.showAllDevice .contentBox {
  margin-top: 15px;
  background: #ffffff;
  border-radius: 4px;
  height: calc(100% - 60px);
  padding: 0 8px;
}
.showAllDevice .contentBoxHeader {
  bottom: solid 1px #ffffff;
}
.showAllDevice .contentBoxData {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  text-align: center;
  padding: 15px;
  border-bottom: solid 1px #bdbdbd;
  margin-bottom: 15px;
}
.showAllDevice .contentBoxData > div {
  width: 33%;
  padding: 8px 0;
}
.showAllDevice .chart {
  width: 100%;
  height: 300px;
}
.showAllDevice .deviceInfoList {
  padding: 10px;
  height: calc(100% - 119px);
  overflow: auto;
}
.showAllDevice .deviceInfoListModel {
  display: flex;
  padding: 7px 0;
  cursor: pointer;
}
.showAllDevice .deviceInfoListModel:hover {
  background: #ececec;
}
.showAllDevice .deviceImg {
  width: 70px;
  height: 100%;
  border-radius: 6px;
}
.showAllDevice .deviceInfoName {
  font-size: 13px;
  margin-bottom: 5px;
  color: #0087ff;
}
.showAllDevice .contentBoxDataModel {
  cursor: pointer;
}
.showAllDevice .blackInfo {
  position: absolute;
  top: 15px;
  background: #fff;
  width: calc(100% - 10px);
  left: 10px;
  padding: 9px;
  border-radius: 4px;
  cursor: pointer;
}
.showAllDevice .filterArray {
  display: flex;
}
.showAllDevice .filterModel {
  width: 100%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.showAllDevice .filterModel .filterI {
  transition: all 0.25s;
  height: 12px;
}
.showAllDevice .filterModel:hover > .filterI {
  transform: rotateZ(-180deg);
}
.showAllDevice .filterModel:hover > .menus {
  display: block;
}
.showAllDevice .filterModel .menuName {
  background: #adadad;
  padding: 6px;
  border-radius: 4px;
}
.showAllDevice .filterModel .menus {
  display: none;
  position: absolute;
  width: 311px;
  background: #3e3e3e;
  left: 0;
  height: 200px;
  top: 100%;
  overflow: auto;
}
.showAllDevice .filterModel .menus::-webkit-scrollbar {
  width: 0px;
}
.showAllDevice .filterModel .menus .areamenus {
  padding: 5px 0;
  font-size: 12px;
  border-bottom: solid 1px #ffffff;
  cursor: pointer;
}

.showAllDevice .filterArray {
  display: flex;
  width: 90%;
  margin: auto;
  background: #adadad;
  position: relative;
}

.showAllDevice .blackBaseInfo {
  position: fixed;
  z-index: 99;
  right: 15px;
  top: 15px;
  color: #000000;
  border: solid 1px;
  padding: 8px;
}

.showAllDevice .backBaseInfoDiv {
  height: 35px;
  line-height: 35px;
  background: #fff;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
}

.showAllDevice .backBaseInfoDiv > span {
  border-radius: 4px;
  padding: 4px;
  border: solid 1px #c5c5c5;
}

.showAllDevice .backBaseInfoDiv:hover {
  color: #0087ff;
}

.showAllDevice .areamenus {
  /* position:relative; */
}

.showAllDevice .areamenus:hover .areamenuslist {
  display: block;
}

.showAllDevice .areamenusname {
}

.showAllDevice .areamenuslist {
  display: none;
  position: absolute;
  left: 101px;
  top: 0;
  width: calc(100% - 101px);
  background: #3e3e3e;
  height: 100%;
}
.showAllDevice .areamenuslist > div {
  padding: 4px;
}

.showAllDevice .divCenter {
  padding: 8px;
  text-align: center;
}

.showAllDevice .curText:hover {
  color: #0087ff;
}

.showAllDevice .cityListName {
  text-align: left;
  padding: 3px 7px;
}

.showAllDevice .cityListModel {
  display: flex;
  flex-wrap: wrap;
}

.shoAllDevice .contentBoxDistributed {
  max-height: 120px;
  overflow: auto;
}

.showAllDevice .cityListModel .contentBoxDataModel {
  margin: 6px 0px;
  width: 33%;
  padding: 0px 13px;
}

.filter_key {
  width: 345px;
}

.el-input__icon {
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: 20px;
  top: 16px;
  font-size: 16px;
}

.el-input__icon:hover {
  color: #0087ff;
}

.searchReturnBox {
  display: flex;
  margin-bottom: 8px;
  /* border-bottom: solid 1px #cecece; */
}

.searchReturnBox .name {
  color: #000;
  font-weight: 800;
  font-size: 13px;
  line-height: 23px;
}

.searchReturnBox .addr {
  font-size: 12px;
  line-height: 15px;
}
</style>