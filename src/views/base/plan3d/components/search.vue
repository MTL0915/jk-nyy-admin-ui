<template>
  <div class='plan3dSearch'>
    <el-autocomplete
      v-show='isSearch'
      class="plan3dSearchInput"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
      <!-- <i class="el-icon-edit el-icon-search" style='font-size: 17px;margin-top: 11px;' slot="suffix" @click="autocompleteChange"></i>  -->
    </el-autocomplete>
    <!-- <div class='tabSearch' @click='isSearch = true'>搜索</div> -->
    <div
      class='baseInfoBox'
      v-show='!dkId'
      :style='taggleShow ? "" : "bottom: auto;"'
    >
      <!-- 名称 -->
      <div class='baseMode'>
        <div class='baseName'>
          <img
            v-if="form.image_path"
            :src="form.image_path"
            class="jd_info_logo"
          >
          <img
            v-else
            class="jd_info_logo"
            src="@/assets/img/Plan/nc.png"
          >
          <span class='jdName'>{{ form.name }}</span>
          <i
            class="el-icon-search"
            style='font-size: 17px;position: absolute;right: 20px;cursor: pointer;'
            slot="suffix"
            v-show='!isSearch'
            @click="taggleShow=false;isSearch=true"
          />
          <i
            class="el-icon-close"
            style='font-size: 17px;position: absolute;right: 20px;cursor: pointer;'
            slot="suffix"
            v-show='isSearch'
            @click="taggleShow=false;isSearch=false"
          />
          <i
            v-show='taggleShow'
            class='el-icon-arrow-down taggle'
            @click='taggleShow = false;isSearch=false;'
          ></i>
          <i
            v-show='!taggleShow'
            class='el-icon-arrow-up taggle'
            @click='taggleShow = true;isSearch=false;'
          ></i>
        </div>
        <div
          class='baseInfo'
          v-show='taggleShow'
        >
          <div>
            <div>基地面积</div>
            <div class='fontValue'>{{form.farm_size}}亩</div>
          </div>
          <div>
            <div>种养面积</div>
            <div class='fontValue'>{{form.grow_size}}亩</div>
          </div>
          <div>
            <div>地块数量</div>
            <div class='fontValue'>{{form.facilitiesNum}}块</div>
          </div>
          <div>
            <div>设备数量</div>
            <div class='fontValue'>{{ form.deviceNum }}台</div>
          </div>
        </div>
      </div>
      <!-- 地块列表 -->
      <div
        v-show='taggleShow'
        class='baseMode'
        style='height: calc(100% - 169px);'
      >
        <div class='baseDkListName'>地块列表</div>
        <div
          class='scrollbarNone'
          style='height: calc(100% - 50px);'
        >
          <div
            class='baseDkListModel'
            v-for='(its,i) in dkList'
            :key='i'
            @click='clickDkList(its.id)'
          >
            <div
              style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:22;'
              @mouseover="SceneMouseover(its,$event)"
              @mouseout="SceneMouseout(its,$event)"
            ></div>
            <div class='baseDkListModelName'>
              <span>{{its.name}}</span>
              <!-- <span class='yj'>预警</span> -->
            </div>
            <div class='baseDkListModelList'>
              <div
                class='box'
                v-for='(it,is) in its.sensors'
                :key='is'
              >
                <div
                  :class='"stateColor"+it.state'
                  class='va'
                >{{it.state === 2 ? "数据异常" : it.value + it.sensor_type_unit}}</div>
                <div>{{it.name}}</div>
              </div>
              <div v-show='its.sensors.length == 0'>
                <span>沒有相关的传感器数据</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i
      v-show='dkId'
      class='el-icon-error'
      @click='closeSearch'
      style="position: absolute;left: 350px;top: 39px;font-size: 22px;color: #00abff;"
    ></i>
    <!-- <iframe class='plan3dSearchModel' style='height:650px' src='./dkInfoMap3d?dkInfo=ff80808173277bab0173314f2e2f00f6' /> -->
    <div
      class='plan3dSearchModel'
      v-show='dkId'
    >
      <!-- 相册区 -->
      <div class='imgBox'>
        <img
          v-show='sxtList.length === 0'
          :src='require("@/assets/img/imgny.png")'
        />
        <iframe
          dbbig='sada'
          v-show='sxtList.length > 0'
          ref="video"
          :src="
                    './sxt?hd_device_id=' + this.sxt + '&playWay=play'
                  "
          style="z-index: 99999;"
        />
        <div
          class='imgBox_btn'
          @click='cameraPhoto'
        >相冊</div>
        <select
          style="position: absolute;bottom: 0;right: 0;background: #000000A8;color: #fff;border: none;"
          v-model='selectSxt'
          @change="setSxt"
        >
          <option
            v-for='(it,i) in sxtList'
            :key='i'
            :value='it.id'
          >{{it.name}}</option>
        </select>
      </div>
      <!-- 名称 -->
      <div
        class='boxName'
        @click='openPlan'
      >
        <span>{{dk.name}}</span>
        <i class='el-icon-arrow-right' />
        <!-- <i class='edit el-icon-s-tools' /> -->
      </div>
      <!-- 地址 -->
      <div class='boxAdress'>
        <i class='el-icon-map-location' />
        <span>{{dk.bs_base_name}}</span>
      </div>
      <!-- 面积 -->
      <div class='boxArea'>
        <i class='el-icon-menu' />
        <span>{{dk.acreage}}亩</span>
      </div>
      <!-- 联系人 -->
      <div class='boxMaster'>
        <div><i
            class='el-icon-user-solid'
            style='margin-right: 3px;'
          />{{dk.linkman}}</div>
        <!-- <div><i class='el-icon-phone' />18321406920</div> -->
      </div>
      <!-- tab选项卡 -->
      <div class='tabType'>
        <div
          :class='selectShowType === 0 ? "active" : ""'
          @click='changeShowType(0)'
        >
          <div class='imgTop'><i class='el-icon-s-data' /></div>
          <div>数据</div>
        </div>
        <div
          :class='selectShowType === 1 ? "active" : ""'
          @click='changeShowType(1)'
        >
          <div class='imgTop'><i class='el-icon-turn-off' /></div>
          <div>控制</div>
        </div>
        <div
          :class='selectShowType === 2 ? "active" : ""'
          @click='changeShowType(2)'
        >
          <div class='imgTop'><i class='el-icon-notebook-2' /></div>
          <div>日志</div>
        </div>
        <div
          :class='selectShowType === 3 ? "active" : ""'
          @click='changeShowType(3)'
        >
          <div class='imgTop'><i class='el-icon-warning-outline' /></div>
          <div>预警</div>
        </div>
      </div>
      <!-- 数据展示区 -->
      <div
        v-show='selectShowType === 0'
        class='scrollbarNone'
        style='height: calc(100% - 405px);'
      >
        <div>
          <el-select
            style='width:100%'
            size='mini'
            @change='selectCollectSensor'
            v-model="chartId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in collectSensor"
              :key="item.hd_device_id"
              :label="item.hd_device_name"
              :value="item.hd_device_id"
            >
            </el-option>
          </el-select>
        </div>
        <sensorEcharts
          style="padding: 26px 0 ;width:100%;height:350px"
          v-if="currentID"
          :ids="currentIds.join(',')"
          :currentID="currentID"
          :mobilePlatform="false"
        />
        <!-- 
          <div class='selectTimer'>
            <div :class='selectEchartTime === 0 ? "active" : ""' @click='changeEchartsTime(0)'>今天</div>
            <div :class='selectEchartTime === 1 ? "active" : ""' @click='changeEchartsTime(1)'>一周</div>
            <div :class='selectEchartTime === 2 ? "active" : ""' @click='changeEchartsTime(2)'>15天</div>
            <div :class='selectEchartTime === 3 ? "active" : ""' @click='changeEchartsTime(3)'>30天</div>
            <div :class='selectEchartTime === 4 ? "active" : ""' @click='changeEchartsTime(4)'>自定</div>
          </div>
          <div style='height: 200px;' ref='chart'></div> 
        -->
        <!-- 设备信息 -->
        <div class='deviceList'>
          <div
            class='deviceInfo'
            :class='it.id === currentID ? "active" : ""'
            v-for='(it,i) in sensorList'
            :key='i'
            @click='changeSensor(it.id)'
          >
            <div>
              <img :src='"http://121.32.129.19:8100"+it.hd_sensor_type_small_image_path' />
              <!-- <img :src='require("@/assets/img/qxz.png")' /> -->
            </div>
            <div>{{it.hd_device_sensor_name}}</div>
            <div>{{it.value + it.hd_sensor_type_unit}}</div>
          </div>
        </div>
        <!-- <sea-echart></sea-echart> -->

      </div>
      <!-- 控制展示区 -->
      <div
        v-show='selectShowType === 1'
        style='height: calc(100% - 405px);'
      >
        <!-- <div>
                    <span>主风机</span>
                    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                </div> -->
        <el-table
          :data="controlSensor"
          row-key="id"
          class='scrollbarNone'
          style="width: 100%;font-size:13px;height: 100%;"
        >
          <el-table-column
            property="hd_device_sensor_name"
            label="名称"
          />
          <el-table-column
            property="hd_device_sensor_channel"
            label="通道号"
          />
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <!-- 二挡开关 -->
              <el-switch
                v-if="scope.row.hd_sensor_type_code == '101'"
                v-model="scope.row.value"
                @change="handelSwitch(scope.row, scope)"
                v-loading="scope.row.loading"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#BBB7B7"
                :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
              >
              </el-switch>
              <!-- 三挡开关 -->

              <el-radio-group
                v-if="scope.row.hd_sensor_type_code === '102'"
                v-model="scope.row.value"
                size="small"
                v-loading="scope.row.loading"
                @change="handelWindow(scope.row, scope)"
                :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
              >
                <el-radio-button
                  key="8"
                  :label="8"
                >开</el-radio-button>
                <el-radio-button
                  key="10"
                  :label="10"
                >停</el-radio-button>
                <el-radio-button
                  key="9"
                  :label="9"
                >关</el-radio-button>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        v-show='selectShowType === 2'
        class='scrollbarNone'
        style='height: calc(100% - 405px);overflow: auto;'
      >
        <div class="cgq_model_div">
          <div
            v-if="!cgqShow"
            style="color:#909399;font-size: 14px;height: 100%;width: 100%;text-align: center;vertical-align: middle;padding-top: 50%;"
          >
            暂无数据
          </div>
          <div
            v-if="cgqShow"
            class="cgq_model_timeLine"
            style="margin-top:15px;margin-right: 2px;"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in activities"
                :key="index"
                size="large"
                :icon="item.icon"
                :color="item.color"
                placement="top"
              >
                <el-card>
                  <div>
                    <span
                      style="padding: 3px 6px;"
                      :style="'border-radius:5px;color:#FFF;background:' +item.color"
                    >{{ item.type }}</span>
                  </div>
                  <p style="margin-top: 10px;">{{ item.title }}</p>
                  <div style="margin-top:10px;display: flex;align-items: center;">
                    <img
                      style="width: 18px;height: 18px;align-self:center"
                      src="/static/img/timer.png"
                    />
                    <span style="margin-left: 5px;">{{ item.date }}</span>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
          <div style="color: #aeb3c6;text-align: center;">
            <span
              style="cursor:pointer;"
              @click='cgq_load_more'
            >加载更多>></span>
          </div>
        </div>
      </div>
      <div
        v-show='selectShowType === 3'
        class='scrollbarNone'
        style='height: calc(100% - 405px);overflow: auto;'
      >
        <div class="cgq_model_div">
          <div
            v-if="warnList.length == 0"
            style="color:#909399;font-size: 14px;height: 100%;width: 100%;text-align: center;vertical-align: middle;padding-top: 50%;"
          >
            暂无数据
          </div>
          <div
            class='warnInfo'
            :class='"state"+it.state'
            v-for='(it,i) in warnList'
            :key='i'
          >
            <div class='warnTitle'>{{it.hd_device_sensor_name}}</div>
            <div class='warnContent'>{{it.state_msg}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <search-info></search-info> -->
    <camera-photo ref="cameraPhoto" />

    <div
      class='arrow'
      v-show='arrowShow'
      ref='arrow'
    >

    </div>
  </div>
</template>

<script>
// import seaEchart from './echarts'
// import searchInfo from '../../plan/components/Dk_info_New_map3d'
// 相册插件
import cameraPhoto from "@/views/base/video/module/CameraPhoto";
import { openChannel, closeChannel, openOrCloseChannel } from "@/utils/websocket_util.js";
import { getSxtListByDkId, getDkInfoByDkId, getSbByDkId, getFacilitiesDetails, getMyFacilitiesList } from '@/api/map3d/index'
import sensorEcharts from "@/views/sensorEcharts";
import ajaxApi from "@/api/map";
import checkDeviceControl from "@/utils/device_permission";
import { parseTime } from "@/utils/index";
import { getLogTypeDes, getLogTypeColor, getLogTypeIcon } from "@/utils/logutil";
export default {
  props: {
    restaurants: {
      type: Array,
      default: function () {
        return []
      }
    },
    restaurants1: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  components: {
    // seaEchart
    // searchInfo
    sensorEcharts,
    cameraPhoto
  },
  watch: {
    dkId () {
      if (this.dkId) {
        this.huanyuan();
        this.loadDK()
      }
    },
    baseId () {
      if (this.baseId) {
        this.getBaseInfo()
      }
    },
  },
  data () {
    return {
      dkList: [],
      taggleShow: false,
      // 基地id
      baseId: "",
      state2: '',
      value: true,
      chartId: '',
      sbList: [],
      selectEchartTime: 0,
      selectShowType: 0,

      // 地块信息
      dk: {},
      // 摄像头序列号
      sxt: "",
      dkId: "",
      sbId: "",
      // 摄像头列表
      sxtList: [],
      // 传感器列表
      collectSensor: [],
      // 选中显示IDE传感器数据
      // selectCollectSensor: { },
      sensorList: [],

      currentID: null,
      currentIds: [],
      selectSxt: "",

      controlSensor: [],
      // 日志消息
      activities: [],
      // 预警消息
      warnList: [],
      cgqShow: false,
      startPosition: 0, //设备日志分页第几页
      maxResult: 10, //一页多少条

      // 基地信息
      form: {
        name: '/',
        farm_size: '/',
        grow_size: '/',
        facilitiesNum: '/',
        deviceNum: '/',
        image_path: null
      },

      isSearch: false,

      showSearchDevice: false
    };
  },
  created () {
  },
  mounted () {
    // this.restaurants = this.loadAll();
    // this.showCharts();
    // this.dkId = "ff8080817300ea3f017302ccb812002c"// 吃糖
    // this.dkId = "ff8080817300eb5f017302ca86970007"
    this.iframeClick();
  },
  methods: {
    checkDeviceControl,
    huanyuan () {
      this.state2 = '';
      this.value = true;
      this.chartId = '';
      this.sbList = [];
      this.selectEchartTime = 0;
      this.selectShowType = 0;

      // 地块信息
      this.dk = {};
      // 摄像头序列
      this.sxt = "";
      // 设备id
      // this.sbId="";
      // 摄像头列表
      this.sxtList = [];
      // 传感器列表
      this.collectSensor = [];
      // 选中显示IDE传感器数据
      // selectCollectSensor: { },
      this.sensorList = [];

      this.currentID = null;
      this.currentIds = [];
      this.selectSxt = "";

      this.controlSensor = [];

      this.activities = [];
      this.cgqShow = false;
      this.startPosition = 0; //设备日志分页第几页
      this.maxResult = 10; //一页多少条
    },

    closeSearch () {
      this.dkId = '';
      this.state2 = '';
      this.sxt = "";
    },

    // 获取更多的预警信息
    cgq_load_more () {
      var id = this.dkId;
      var startPosition = this.startPosition + 1;
      var maxResult = this.maxResult;
      ajaxApi.getDeviceRunLogListByr_id(id, startPosition, maxResult, e => {
        for (let index = 0; index < e.data.content.length; index++) {
          const element = e.data.content[index];
          var obj = {
            title: element.tle,
            content: element.cont,
            date: parseTime(element.i_date),
            type: getLogTypeDes(element.type),
            color: getLogTypeColor(element.type),
            icon: "el-icon-more"
          };
          this.activities.push(obj);
        }
      });
    },

    // 获取预警信息
    getDeviceRunLogListByr_id (id, startPosition, maxResult) {
      ajaxApi.getDeviceRunLogListByr_id(id, startPosition, maxResult, e => {
        this.activities = [];
        for (let index = 0; index < e.data.content.length; index++) {
          const element = e.data.content[index];
          var obj = {
            title: element.tle,
            content: element.cont,
            date: parseTime(element.i_date),
            type: getLogTypeDes(element.type),
            color: getLogTypeColor(element.type),
            icon: getLogTypeIcon(element.type)
          };
          this.activities.push(obj);
        }
        if (e.data.content.length > 0) {
          this.cgqShow = true;
        } else {
          this.cgqShow = false;
        }
      });
    },

    // 摄像头相册
    cameraPhoto () {
      if (this.selectSxt) {
        this.$refs.cameraPhoto.dialogVisible = true;
        this.$refs.cameraPhoto.hd_device_id = this.selectSxt;
        this.$refs.cameraPhoto.getData();
      } else {
        this.$message.warning("暂无相册");
      }
    },
    // 选择展示什么内容
    changeShowType (index) {
      this.selectShowType = index;
    },
    // 改变echarts的时间属性
    changeEchartsTime (index) {
      this.selectEchartTime = index;
    },

    changeSensor (id) {
      this.currentID = id;
    },
    autocompleteChange () {
      var value = this.state2;
      // 判断类型 

    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants.concat(this.restaurants1);
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 如果查询的内容内部包括, 判断为经纬度查询
      if (queryString.indexOf(",") > -1) {
        queryString = queryString.replace("查询经纬度:", "");
        results.push({
          name: `${queryString}`, value: `查询经纬度: ${queryString}`, jwd: queryString.split(","), type: 'jwd'
        })
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
          || (!restaurant.rs_facilities_type_name || restaurant.rs_facilities_type_name.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
          || (restaurant.id.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    handleSelect (e) {
      if (e.type === 'jwd') {
        var cc = view.camera.clone();
        cc.position.longitude = e.jwd[0] * 1;
        cc.position.latitude = e.jwd[1] * 1;
        view.goTo(cc, {
          duration: 1000
        });
        return;
      }

      this.clickDkList(e.rs_facilities_id || e.id)

      if (e.rs_facilities_id) {
        this.showSearchDevice = true;
        setTimeout(() => {
          // 如果是设备 则默认显示 延迟跳过重置
          this.sbId = e.id;
        }, 100)
      }

      // this.dkId = 
    },


    // 显示echarts数据
    showCharts () {
      // 创建echarts实例
      this.echarts = echarts.init(this.$refs.chart);
      // 创建option
      this.echarts.setOption(this.getOption());
    },

    getOption () {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 10,
          right: 10,
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      };
    },

    // 加载地块显示
    loadDK () {
      // 获取地块信息
      this.getDkInfo()
      // 获取地块日志信息
      this.getDeviceRunLogListByr_id(this.dkId, this.startPosition, this.maxResult);
      // 获取地块的预警信息
      this.getWarnList();
    },

    // 获取地块的预警信息
    getWarnList () {
      var list = this.$parent.warnList.find((e) => { return e.rs_facilities_id === this.dkId });
      if (list) {
        this.warnList = list.sensorList;
        if (this.warnList.length > 0) {
          if (this.showSearchDevice === true) {
            this.showSearchDevice = false;
            this.selectShowType = 0;
          } else {
            this.selectShowType = 3
          }
        }

      }
    },

    // 获取地块信息
    getDkInfo () {
      // 获取地块信息
      getFacilitiesDetails(this.dkId).then((event) => {
        // 绑定地块信息
        this.dk = event.data.facilitiesInfo;
        // 绑定摄像头设备
        this.optSXT(event.data.sxtDevice.content);
        // 绑定传感器信息设备
        this.getCollectSensor(event.data.collectSensor);
        // 绑定控制设备信息
        this.controlSensor = event.data.controlSensor;
        for (var i = 0, len = this.controlSensor.length; i < len; i++) {
          this.controlSensor[i].loading = false;
          this.controlSensor[i].value2 = this.controlSensor[i].value;
        }
      })

      // // 获取地块信息
      // getDkInfoByDkId(this.dkId).then((event)=>{
      //     this.dk = event.data;
      // })
    },

    // 处理摄像头设备
    optSXT (data) {
      var ary = data;
      if (!ary) return;
      ary = ary.map(e => {
        var mapp = {
          id: e.id,
          name: e.name,
          communication: JSON.parse(e.communication).url.hd.hls
        };
        return mapp;
      });
      this.sxtList = ary;
      if (ary.length == 0) {
        return;
      }
      this.setSxt(ary[0].id);
      this.selectSxt = ary[0].id;
    },

    setSxt (id) {
      this.sxt = id;
    },

    // 处理设备传感器用来显示设备历史数据和最新数据
    getCollectSensor (data) {
      this.collectSensor = data;

      this.chartId = this.sbId || data[0].hd_device_id;
      // 加载第一条数据
      this.showCollectSensor(data[0]);
    },

    selectCollectSensor (e) {
      var it = this.collectSensor.find((a) => { return a.hd_device_id === e })
      this.showCollectSensor(it);
    },

    showCollectSensor (it) {
      // this.selectCollectSensor = it;
      this.sensorList = it.sensorList;
      this.currentID = it.sensorList[0].id;
      this.currentIds = it.sensorList.map((e) => { return e.id })
    },

    handelSwitch (row, scope) {
      if (row.loading) {
        return;
      }
      var hd_sensor_id = row.id;

      var index = scope.$index;
      var obj = this.controlSensor[index];

      row.loading = true;
      if (row.value == 1) {
        openChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 1;
            this.controlSensor.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 0;
            this.controlSensor.splice(index, 1, obj);
            row.loading = false;
          });
      } else {
        closeChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 0;
            this.controlSensor.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 1;
            this.controlSensor.splice(index, 1, obj);
            row.loading = false;
          });
      }
    },

    // 进入地图的详细页面
    openPlan () {
      open("/dkInfo?id=" + this.dk.id)
    },

    _iframeClick () {
      var IframeOnClick = {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
          this.element = arguments[0];
          this.cb = arguments[1];
          this.hasTracked = false;
        },
        track: function (element, cb) {
          this.iframes.push(new this.Iframe(element, cb));
          if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
          }
        },
        checkClick: function () {
          if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
              if (activeElement === this.iframes[i].element) {
                document.activeElement.blur();
                // 如果点击的是这个iframe 这个iframe处于未被点击的状态
                if (this.iframes[i].hasTracked == false) {
                  // 标记为被点击并等待下一次点击
                  this.iframes[i].hasTracked = true;
                  // 如果200毫秒内没有被在此点击重置次状态
                  this.iframes[i].setTimeout = setTimeout(function (iframe) {
                    iframe.hasTracked = false;
                  }, 800, this.iframes[i]);
                } else {
                  // 如果判断这个已经是被点击的状态了
                  // 清除掉等待事件
                  clearTimeout(this.iframes[i].setTimeout);
                  // 修改为未选择状态
                  this.iframes[i].hasTracked = false;
                  // 触发事件
                  this.iframes[i].cb.apply(window, []);
                }
              } else {
                this.iframes[i].hasTracked = false;
              }
            }
          }
        }
      };

      IframeOnClick.track(this.$refs.video, () => {
        if (this.$refs.video.isBig) {
          this.$refs.video.isBig = false;
          // 如果已经是放大状态了
          this.$refs.video.style.cssText = "";
        } else {
          this.$refs.video.isBig = true;
          this.$refs.video.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 9999;
                    `;
        }
      })
    },

    iframeClick () {
      var IframeOnClick = {
        resolution: 200,
        iframes: [],
        cb: null,
        interval: null,
        Iframe: function () {
          this.element = arguments[0];
          this.cb = arguments[1];
          this.hasTracked = false;
        },
        track: function (cb) {
          this.cb = cb;
          // this.iframes.push(new this.Iframe(element, cb));  
          if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
          }
        },
        checkClick: function () {
          if (document.activeElement) {
            var activeElement = document.activeElement;
            if (activeElement && activeElement.getAttribute("dbbig")) {
              document.activeElement.blur();
              // 如果点击的是这个iframe 这个iframe处于未被点击的状态
              if (activeElement.hasTracked == false) {
                // 标记为被点击并等待下一次点击
                activeElement.hasTracked = true;
                // 如果200毫秒内没有被在此点击重置次状态
                activeElement.setTimeout = setTimeout(function (iframe) {
                  iframe.hasTracked = false;
                }, 800, activeElement);
              } else {
                // 如果判断这个已经是被点击的状态了
                // 清除掉等待事件
                clearTimeout(activeElement.setTimeout);
                // 修改为未选择状态
                activeElement.hasTracked = false;
                // 触发事件
                this.cb.apply(window, []);
              }
            } else {
              activeElement.hasTracked = false;
            }
          }
        }
      };

      IframeOnClick.track(() => {
        if (this.$refs.video.isBig) {
          this.$refs.video.isBig = false;
          // 如果已经是放大状态了
          this.$refs.video.style.cssText = "";
        } else {
          this.$refs.video.isBig = true;
          this.$refs.video.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 9999;
                    `;
        }
      })
    },

    getBaseInfo () {
      ajaxApi.getJDById(this.baseId, (e) => {

        this.form.name = e.data.name || '/'
        this.form.farm_size = e.data.farm_size || '/'
        this.form.grow_size = e.data.grow_size || '/'
        this.form.facilitiesNum = e.data.facilitiesNum || '/'
        this.form.deviceNum = e.data.deviceNum || '/'
        this.form.image_path = e.data.image_path ? process.env.IMG_URL + e.data.image_path : null

        this.taggleShow = true;
      })

      // 获取地块列表
      getMyFacilitiesList(this.baseId).then((e) => {
        e.data.forEach((e) => {
          e.stateLength = 0;
          e.sensors.forEach((e1) => {
            if (e1.state == 3) {
              e.stateLength += 10;
            } else {
              e.stateLength += e1.state;
            }
          });
        })
        e.data.sort(function (a, b) {
          return b.stateLength - a.stateLength;
        })
        // .reverse();
        this.dkList = e.data;
      })
    },

    // 鼠标一上去显示动画
    SceneMouseover (it, event) {
      var dom = event.toElement;
      var x = event.pageX - event.layerX + dom.offsetWidth;
      var y = event.pageY - event.layerY + dom.offsetHeight / 2;
      // event.layerY

      event.stopPropagation();
      // 如果不存在几何
      var layer = view.map.findLayerById("地块");
      if (!layer) { return }
      var graphic = layer.graphics.items.find((e) => { return e.attributes.id === it.id })
      if (!graphic) { return }
      var xy = view.toScreen(graphic.geometry.centroid);
      var deff = { x: 0, y: 0, z: 0 }
      deff.x = Math.abs(xy.x - x);
      deff.y = Math.abs(xy.y - y);
      deff.z = Math.sqrt(Math.abs(Math.pow(deff.x, 2)) + Math.abs(Math.pow(deff.y, 2)))

      var angle = Math.abs(Math.asin(deff.y / deff.z) / Math.PI * 180)
      // 对角度进行象限判断
      if (xy.x - x > 0) {
        if (xy.y - y > 0) {
          // 第一现象
          angle = angle * -1;
        } else {
          // 第二现象
          angle = angle;
        }
      } else {
        if (xy.y - y > 0) {
          // 第四现象
          angle = 180 + angle;
        } else {
          // 第三现象
          angle = 180 - angle;
        }
      }

      this.arrow = document.createElement("div");
      this.arrow.className = 'arrowLine '
      this.arrow.style.cssText = `
        top: ${y}px;
        left: ${x}px;
        transform-origin: 0;
        transform: rotateZ(${angle * -1}deg);
        z-index: 9;
        width: 0px;
        transition: width 0.75s; 
      `;
      document.body.appendChild(this.arrow);

      $(this.arrow).animate({ width: deff.z }, 100);
      //.style.width = `${deff.z}px`
      // setTimeout(()=>})
    },

    SceneMouseout () {
      this.arrow.remove()
    },

    clickDkList (id) {
      this.dkId = id;
      var layer = view.map.findLayerById("地块");
      if (!layer) { return }
      var graphic = layer.graphics.items.find((e) => { return e.attributes.id === id })
      if (!graphic) { return }
      view.goTo({
        target: graphic.geometry.extent,
        tilt: 0,
        zoom: 19
      })
    }

  }
}
</script>

<style scoped>
.jdName {
  white-space: nowrap;
  overflow: hidden;
  width: 190px;
  text-overflow: ellipsis;
}
</style>

<style>
.plan3dSearch {
  /* position: absolute; */
  top: 0;
  left: 0;
  user-select: none;
}

.plan3dSearch .plan3dSearchInput {
  position: absolute;
  top: 80px;
  left: 30px;
  width: 300px;
}

.plan3dSearch .plan3dSearchModel {
  position: absolute;
  top: 35px;
  bottom: 15px;
  left: 15px;
  width: 330px;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  border: solid 1px #ababab;
  /* max-height: 650px; */
  overflow: auto;
}

.plan3dSearch .plan3dSearchModel::-webkit-scrollbar {
  width: 1px;
}

.plan3dSearch .imgBox {
  /* height: 145px; */
  height: 240px;
  position: relative;
  margin: -10px -10px 0;
}
.plan3dSearch .imgBox .imgBox_btn {
  background: #000000a8;
  padding: 6px;
  position: absolute;
  right: 5px;
  top: 5px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.plan3dSearch .imgBox > iframe,
.plan3dSearch .imgBox > img {
  height: 100%;
  width: 100%;
  border: none;
  /* width: 100%; */
}

.plan3dSearch .boxName {
  height: 30px;
  line-height: 35px;
  font-size: 14px;
  position: relative;
}

.plan3dSearch .boxName .edit {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.plan3dSearch .boxAdress {
  height: 22px;
  line-height: 22px;
}

.plan3dSearch .boxArea {
  height: 22px;
  line-height: 22px;
}

.plan3dSearch .boxMaster {
  height: 22px;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
}

.plan3dSearch .tabType {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-top: solid 1px #aba6a6;
  border-bottom: solid 1px #aba6a6;
  padding: 9px 0;
  margin: 5px 0;
}

.plan3dSearch .tabType .active {
  color: #0097de;
}

.plan3dSearch .tabType .active .imgTop {
  background: #0097de;
  color: #ffffff;
}

.plan3dSearch .tabType .imgTop {
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  border: solid 1px #a29999;
  margin-bottom: 5px;
}

.plan3dSearch .selectTimer {
  display: flex;
  width: 184px;
  margin: 10px auto 0;
  height: 27px;
  line-height: 17px;
  justify-content: center;
  border-radius: 9px;
  overflow: hidden;
  font-size: 12px;
  color: #fff;
}
.plan3dSearch .selectTimer > div {
  padding: 6px;
  background: #98e0cc;
  cursor: pointer;
}
.plan3dSearch .selectTimer > div.active,
.plan3dSearch .selectTimer > div:hover {
  background: #53cca9;
}
.plan3dSearch .deviceInfo {
  font-size: 12px;
  text-align: center;
  width: 33%;
}
.plan3dSearch .deviceInfo.active {
  color: #0097de;
  background: #00adff66;
  border-radius: 7px;
}
.plan3dSearch .deviceInfo img {
  height: 37px;
  width: 37px;
}

.plan3dSearch .deviceList {
  display: flex;
  flex-wrap: wrap;
}

.plan3dSearch .cgq_model_div::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 0;
  height: 100%;
  width: 2px;
  border: #0097de 1px solid;
}

.plan3dSearch .cgq_model_div {
  /* max-height: 260px; */
  overflow: auto;
  position: relative;
}

.plan3dSearch .cgq_model_div::-webkit-scrollbar {
  overflow: auto;
}

.plan3dSearch
  .el-table--scrollable-y
  .el-table__body-wrapper::-webkit-scrollbar {
  width: 1px;
}

.plan3dSearch .scrollbarNone::-webkit-scrollbar {
  width: 1px;
}

.plan3dSearch .scrollbarNone {
  overflow-y: auto;
}

.plan3dSearch .is-scrolling-left {
  overflow: hidden;
}

.plan3dSearch .warnInfo {
  padding: 10px;
  margin: 5px;
  background: #1075a5;
  border-radius: 4px;
  color: #fff;
  width: 95%;
  margin-left: 5%;
  position: relative;
}

.plan3dSearch .warnInfo.state2 {
  color: #ff0000;
}

.plan3dSearch .warnInfo.state2::after {
  background: #ff0000;
}

.plan3dSearch .warnInfo.state3 {
  color: #f7c507;
}

.plan3dSearch .warnInfo.state3::after {
  background: #f7c507;
}

.plan3dSearch .warnInfo::after {
  content: "";
  position: absolute;
  left: -5%;
  top: 10px;
  border-radius: 50%;
  padding: 6px;
  background: #f7c507;
}

.plan3dSearch .warnTitle {
  font-size: 14px;
  /* color: #ffca00; */
}

.plan3dSearch .warnContent {
  text-indent: 2em;
  margin-top: 11px;
  color: #cacaca;
}

.plan3dSearch .baseInfoBox {
  position: absolute;
  top: 30px;
  left: 30px;
  background: #000000a8;
  bottom: 30px;
  width: 300px;
  color: #ffffff;
}

.plan3dSearch .baseMode {
  padding: 0 15px;
}

.plan3dSearch .baseName {
  font-size: 16px;
  padding: 12px;
  border-bottom: solid 1px #646873;
  position: relative;
  display: flex;
  align-items: center;
}

.plan3dSearch .baseInfo {
  display: flex;
  flex-wrap: wrap;
}

.plan3dSearch .baseInfo > div {
  width: 50%;
  text-align: center;
  padding: 8px;
}

.plan3dSearch .fontValue {
  color: #2376ac;
  font-size: 16px;
  font-weight: 800;
  padding: 5px;
}

.plan3dSearch .baseDkListName {
  font-size: 16px;
  padding: 12px;
  border-top: solid 1px #646873;
  text-align: center;
}

.plan3dSearch .baseDkListModel {
  background: #00000061;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
}

.plan3dSearch .baseDkListModel:hover {
  /* border:solid 1px #000000; */
  background: #000000;
}

.plan3dSearch .baseDkListModelName {
  font-size: 14px;
  padding-bottom: 10px;
  position: relative;
}

.plan3dSearch .baseDkListModelName .yj {
  position: absolute;
  font-size: 12px;
  right: 5px;
}
.plan3dSearch .baseDkListModelName .yj::after {
  content: "";
  border-radius: 50%;
  background: #ff0000;
  padding: 3px;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.plan3dSearch .baseDkListModelList {
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: wrap;
}

.plan3dSearch .baseDkListModelList .box {
  width: 30%;
  padding: 7px;
}

.plan3dSearch .box .va {
  color: #40d440;
  padding: 0 0 5px;
}

.plan3dSearch .taggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.plan3dSearch .jd_info_logo {
  height: 21px;
  margin-right: 6px;
}

.plan3dSearch .stateColor2 {
  color: crimson !important;
}

.plan3dSearch .stateColor3 {
  color: chocolate !important;
}

.plan3dSearch .stateColor4 {
  color: chocolate !important;
}

.arrowLine {
  background: #ffffff;
  height: 2px;
  position: absolute;
  box-shadow: 0 0 3px #000;
}

.arrowLine::after {
  content: "";
  border-radius: 50%;
  padding: 3px;
  background: #b5b0b0;
  box-shadow: 0px 0px 7px #000000;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.arrowLine::before {
  content: "";
  border-radius: 50%;
  padding: 2px;
  background: #78daff;
  box-shadow: 0px 0px 3px #000000;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>