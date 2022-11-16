<template>
  <div>
    <div style="position: absolute;top: 34px;right: 33px;">
      <a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a>
    </div>

    <div class="app_info open">
      <div
        class="cover"
        @click="hideElement"
      />

      <!-- 设备信息区 -->
      <div class="app_box">
        <!-- 左侧 -->
        <div class="app_box_left">
          <!-- 设备信息 -->
          <div
            v-show="deviceInfoShow"
            class="model info_model"
            style="height: 250px;"
          >
            <img
              :src="urls + deviceObj.hd_device_type_image_path"
              style="width:100px;height:100px;margin-left: 5px"
            />
            <div
              class="model_content"
              style="margin-top: 15px;"
            >
              <div
                class="model_content_row"
                style="margin-bottom:5px;padding-left: 15px;"
              >
                <div class="row_title">{{ deviceObj.name }}</div>
                <div style="">({{ deviceObj.device_id }})</div>
              </div>
              <div class="model_content_row">
                <i
                  class="el-icon-position row_centent_img"
                  style="font-size:15px;color:#333;"
                ></i>
                <span class="row_centent">{{ deviceObj.hd_device_type_name }}</span>
              </div>
              <!-- 地块跳转 -->
              <router-link :to="'/dkInfo?id=' + deviceObj.rs_facilities_id">
                <div
                  class="model_content_row"
                  style="cursor: pointer"
                >
                  <i
                    class="el-icon-menu row_centent_img"
                    style="font-size:15px;color:#333;"
                  ></i>
                  <span
                    class="row_centent"
                    style="color:blue;cursor: pointer;"
                  >{{ deviceObj.rs_facilities_name }}</span>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 设备日志 -->
          <div
            v-show="deviceLogShow"
            class="model cgq_model"
            id="logPanel"
          >
            <div
              class="model_name"
              style="border-bottom:0px;"
            >
              <div style="float: left;">设备日志</div>
              <div style="float: right;">
                <div
                  @click="loadAllLog"
                  style="margin-top: -2px;padding-right: 5px;cursor: pointer;"
                >
                  <i class="el-icon-full-screen fullScreen"></i>
                </div>
              </div>
            </div>
            <div class="cgq_model_div">
              <div
                class="cgq_model_timeLine"
                style="margin-top:15px;margin-right: 2px;"
              >
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in deviceRunLogList"
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
                          :style="'border-radius:5px;color:#FFF;background:' + item.color"
                        >{{ item.type }}</span>
                      </div>
                      <p style="margin-top: 10px;">{{ item.title }}</p>
                      <div style="margin-top:10px;align-items: center;">
                        <div>
                          <img
                            style="width: 18px;height: 18px;align-self:center;position:absolute"
                            src="/static/img/timer.png"
                          />
                          <span style="margin-left: 24px;">{{ item.date }}</span>
                        </div>
                        <div style="margin-left:24px">操作人:{{ item.u_name }}</div>
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 -->
        <div class="app_box_right">
          <!-- 采集类传感器 -->
          <div
            v-show="sensorCollectShow"
            style="width:100%;"
          >
            <!-- 传感器值 -->
            <div class="mini_box">
              <div
                v-for="(items, index) in sensorCj"
                :key="index"
                class="right_top_data"
                :style="index === rightTopEchartsTypeChoose ? 'background: #cfffff' : 'background: #ffffff'"
              >
                <div
                  style="display:flex;position: relative;color:#455a64;height: 100%;"
                  @click="sensorCollectClick(items, index)"
                >
                  <div
                    @click="showTrigger(items)"
                    v-show="items.isShowTrigger"
                    style="cursor: pointer;position: absolute;right: -12px;top: -1px;"
                  >
                    <i
                      class="el-icon-message-solid"
                      style="font-size: 14px;"
                      title="预警配置"
                    ></i>
                  </div>
                  <div style="flex:1;text-align: center;margin:auto;height: 100%;">
                    <div style="height: calc(100% - 21px);">
                      <img
                        class="right_top_data_img"
                        :src="urls + items.hd_sensor_type_small_image_path"
                      />
                      <div style="float:right;font-size: 28px;margin:0 auto;padding:0;padding-right:3px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: auto;">
                        <span
                          v-show="items.state != 2"
                          :style="{ color: getStatusColor(items) }"
                        >
                          {{ items.hd_device_sensor_value }}
                          <span style="font-size: 13px;">&nbsp;&nbsp;{{ items.hd_sensor_type_unit }}</span>
                        </span>
                        <span
                          v-show="items.state == 2"
                          style="font-size:13px;color:red"
                        >数据异常</span>
                        <img
                          v-show="items.state == 2"
                          src="@/assets/img/warn.png"
                          style="width:15px;height:15px"
                        />
                      </div>
                    </div>
                    <div style="height: 35px;">
                      <div
                        style="height: calc(100% - 17px);"
                        @click="showValueLevel(items)"
                      >
                        <div style="float:left">
                          {{ items.hd_device_sensor_name }}
                          <i
                            class="el-icon-caret-bottom"
                            style="font-size:15px;color:#333;display: none;"
                          ></i>
                        </div>
                        <div
                          style="float:right;cursor: pointer;"
                          :style="{ color: getStatusColor(items) }"
                        >
                          {{ getValueLevelLabel(items.config_json_obj, items.hd_device_sensor_value) }}
                        </div>
                      </div>
                      <div style="height:4px;position: relative;z-index: 10;">
                        <div style="width: calc(100%);height: 3px;background-color: rgba(128, 128, 128);position: absolute;z-index: 10;">
                          <div
                            :style="{ background: getStatusColor(items), width: getValueProportion(items, items.hd_device_sensor_value) + '%' }"
                            style="height:100%;"
                          >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 数据Echart图 -->
            <div
              class="model right_top_model"
              style="position: relative;"
            >
              <div>
                <div
                  class="model_name"
                  style="float: left;"
                >历史曲线</div>
                <div style="float: right;">
                  <div
                    @click="viewCollectedData"
                    style="margin-top: -2px;padding-right: 5px;cursor: pointer;"
                  ><i class="el-icon-more fullScreen"></i>
                  </div>
                </div>
                <div style="clear: both;"></div>
              </div>
              <sensorEcharts
                style="padding-top:5px;width:100%;height:220px;"
                v-if="currentID"
                :ids="currentIds.join(',')"
                :currentID="currentID"
                :mobilePlatform="false"
              />
            </div>
          </div>

          <!-- 控制类传感器 -->
          <div
            v-show="sensorControlShow"
            style="width:100%;"
          >
            <!-- 控制开关 -->
            <div
              class="model"
              style="height: 250px;overflow-y: auto;width: 100%;"
            >
              <div class="model_name">
                设备控制
                <div style="float: right;">
                  <div
                    @click="openScreenEquipControl"
                    style="margin-top: -2px;padding-right: 5px;cursor: pointer;"
                  >
                    <i class="el-icon-full-screen fullScreen"></i>
                  </div>
                </div>
              </div>
              <div class="model_content">
                <el-table
                  :data="sensorKz"
                  row-key="id"
                  style="width: 100%;height: 100%;font-size:13px"
                >
                  <el-table-column
                    property="name"
                    label="名称"
                  />
                  <el-table-column
                    property="device_id"
                    label="设备序列号"
                  />
                  <el-table-column
                    property="channel"
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
                        :disabled="!checkDeviceControl(scope.row.hd_device_id)"
                      ></el-switch>
                      <!-- 三挡开关 -->

                      <el-radio-group
                        v-if="scope.row.hd_sensor_type_code === '102'"
                        v-model="scope.row.value"
                        size="small"
                        v-loading="scope.row.loading"
                        @change="handelWindow(scope.row, scope)"
                        :disabled="!checkDeviceControl(scope.row.hd_device_id)"
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
            </div>
            <!-- 控制开关时长排序 -->
            <div style="min-height: 270px;width: 100%;">
              <div
                class="model btn_model"
                style="width:calc(50% - 5px);float: left;height: 100%;"
              >
                <div class="flex row1">
                  <div class="row">
                    <div class="model_name">总开机时长排行</div>
                    <div
                      ref="chartl"
                      :style="{ height: '250px', width: '100%' }"
                      style="padding-top:5px"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                class="model btn_model"
                style="width:calc(50% - 5px);float: left;height: 100%;"
              >
                <div class="flex row1">
                  <div class="row">
                    <div class="model_name">持续开机时长排行</div>
                    <div
                      ref="chartn"
                      :style="{ height: '250px', width: '100%' }"
                      style="padding-top:5px"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 相册 -->
          <div
            class="model"
            style="width: 100%;height: 250px;position: relative;"
            v-show="devicePictureShow"
          >
            <div class="model_name">{{ deviceObj.device_type == 'JK-ZS' ? '识别结果' : '相册' }}</div>
            <div style="position: absolute;right: 10px;top:10px;">
              <template v-if="deviceObj.device_type == 'JK-ZS'">
                <el-button
                  style="cursor: pointer;float: left;padding: 0 15px;margin-left:5px;"
                  type="text"
                  size="mini"
                  @click="loadAllCameraStatus()"
                >识别列表</el-button>
                <div
                  @click="configAIWarn(deviceObj)"
                  style="cursor: pointer;float: left;"
                >
                  <i class="el-icon-s-tools"></i>
                </div>
              </template>
              <div
                @click="loadAllPicture"
                style="cursor: pointer;float: left;padding-left: 15px;"
              >
                <i class="el-icon-full-screen fullScreen"></i>
              </div>
            </div>
            <DevicePictureCard
              ref="devicePictureCard"
              style="padding-top:15px"
            />
          </div>

          <!-- 内部状态 -->
          <div
            class="model"
            v-show="deviceInteriorShow"
            style="width: 100%;position: relative;"
          >
            <div class="app_box_bottom_left">
              <div class="model_name">内部状态</div>
              <div style="display: flex;flex-wrap: nowrap;">
                <div style="width: 250px;">
                  <device-now ref="deviceNow" />
                </div>
                <div
                  class="model app_box_center_right"
                  style="width: auto;flex:1"
                >
                  <device-data
                    ref="deviceData"
                    style="width: 100%;height: 190px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 智慧摄像头识别列表 -->
    <el-dialog
      v-if="listCameraStatusDialogVisible"
      :visible.sync="listCameraStatusDialogVisible"
      append-to-body
      title="识别列表"
    >
      <listCameraStatus :hd_device_id="xc_hd_device_id" />
    </el-dialog>

    <!-- 相册 -->
    <el-dialog
      v-if="photoDialogVisible"
      :visible.sync="photoDialogVisible"
      append-to-body
      title="相册"
    >
      <CameraPhoto
        ref="cameraPhoto"
        :hd_device_id="xc_hd_device_id"
      />
    </el-dialog>

    <!-- 预警设置 -->
    <WarnConfig ref="warnConfig" />

    <!-- 智能识别 -->
    <ZSWarnTrigger ref="zsWarnTrigger" />

    <!--传感器数据-->
    <collectedData ref="collectedData" />
    <!-- 控制界面 -->
    <screenEquipControl ref="screenEquipControl" />
  </div>
</template>

<script>
import sensorEcharts from '@/views/sensorEcharts';
import { openChannel, closeChannel, openOrCloseChannel, handelWindow } from '@/utils/websocket_util.js';
import { getLogTypeDes, getLogTypeColor, getLogTypeIcon } from '@/utils/logutil';
import { getToken } from '@/utils/auth';
import ajaxApi from '@/api/map';
import bus from '@/components/common/bus';
import CameraPhoto from '@/views/base/video/module/CameraPhoto';
import WarnConfig from "@/views/base/equip/module/WarnConfig";
import ZSWarnTrigger from "@/views/device/components/ZSWarnTrigger";
import { getHourData, getDayData } from '@/api/hd_device_property';
import { mapGetters } from 'vuex';
import { getDetailById, getFacilitiesDetails, selectSensorData2, valveOpenTimeSort, getDeviceRunLogListByh_id } from '@/api/equip';
import { controlSxt, getSxtUrlById } from '@/api/sxt';
import echarts from 'echarts';
import { parseTime } from '@/utils/index';
import DeviceNow from './DeviceNow';
import CollectedData from './CollectedData';
import DevicePictureCard from './DevicePictureCard';
import DeviceData from './DeviceData';
import { loadChartl } from '../chart/linechart';
import { loadChartn } from '../chart/nbchart';
import checkDeviceControl from '@/utils/device_permission';
import listCameraStatus from './listCameraStatus'
import screenEquipControl from "./screenEquipControl"

export default {
  name: 'EquipJkl',
  myPlayer: null,
  components: {
    DeviceNow,
    CameraPhoto,
    WarnConfig,
    ZSWarnTrigger,
    CollectedData,
    DeviceData,
    DevicePictureCard,
    sensorEcharts,
    listCameraStatus,
    screenEquipControl
  },
  data () {
    return {
      deviceInfoShow: true,//设备基础信息
      deviceLogShow: false,//设备日志
      devicePictureShow: false,//设备图片
      sensorCollectShow: false,//采集类
      sensorControlShow: false,//控制类
      deviceInteriorShow: false,//内部状态
      currentIds: [],
      currentID: null,
      hd_device_id: '',
      deviceObj: {},
      communication: null,
      rightTopdata: [], //右1 类型下的数据
      rightTopEchartsType: [], //右1 echarts类型
      rightTopEchartsTypeChoose: 0,
      deviceRunLogList: [], // 设备日志列表
      urls: process.env.IMG_URL,
      photoDialogVisible: false,
      xc_hd_device_id: null,
      listCameraStatusDialogVisible: false,
      sensorKz: [],
      sensorCj: [],
    };
  },
  filters: {
    ellipsis (value) {
      if (!value) return '';
      if (value.length > 4) {
        return value.slice(0, 4) + '...';
      }
      return value;
    },
    ellipsis1 (value) {
      if (!value) return '';
      if (value.length > 3) {
        return value.slice(0, 3) + '...';
      }
      return value;
    }
  },
  props: {
    modelColor: {
      type: String,
      default: '#333a4c'
    }
  },
  computed: {
    ...mapGetters(['id', 'token', 'user'])
  },
  created () {
  },
  mounted () {
    var hd_device_id = this.$route.query.id;
    if (hd_device_id != null && hd_device_id != '') {
      this.handelWatch(hd_device_id);
    }
  },
  methods: {
    // 放大设备控制模块
    openScreenEquipControl () {
      this.$refs.screenEquipControl.dialogVisible = true;
      this.$refs.screenEquipControl.sensorKz = this.sensorKz
    },
    // 查看传感器数据
    viewCollectedData () {
      this.$refs.collectedData.showDialog(this.hd_device_id)
    },
    enterIntoGw () {
      if (this.enterIntoGwType === 1) {//1瑞丰官网 
        this.$refs.ruifengForm.submit();
      } else if (this.enterIntoGwType === 2) {//2托普云农官网
        this.$refs.zjtpyunForm.submit();
      }
    },
    //判断设备控制权限
    checkDeviceControl,
    //时间转换
    parseTime,
    //根据ID初始化页面
    handelWatch (hd_device_id) {
      this.hd_device_id = hd_device_id
      //获取设备详情
      this.getDetailById()
    },
    //判断需展示的模块
    checkModuleShow () {
      this.$nextTick(() => {
        //初始化
        this.deviceInfoShow = true//设备基础信息
        this.deviceLogShow = true//设备日志
        this.devicePictureShow = false//设备图片
        this.sensorCollectShow = false//采集类
        this.sensorControlShow = false//控制类
        this.deviceInteriorShow = true//内部状态
        let code = this.deviceObj.hd_device_type_code


        //根据Code展示或隐藏模块
        if (code === 'JK-LD') {//LED屏
          this.$refs.led.init(true, this.hd_device_id, this.communication);//预览LED界面
        } else if (code === 'JK-CQ') {//虫情灯
          if (this.communication) {
            let comm_json = JSON.parse(this.communication)
            let type = comm_json.type

          }
        } else if (code === 'BA-CQ') {
          this.deviceLogShow = false
          this.deviceInteriorShow = false
        } else {//其余设备

        }

        //是否显示设备日志
        if (this.deviceLogShow) {
          this.getDeviceRunLogListByh_id()
        }
        //是否显示内部状态模块
        if (this.deviceInteriorShow) {
          this.$refs.deviceNow.showDevicePropertyValue(this.hd_device_id)//左侧
          this.$refs.deviceData.showData(this.hd_device_id)//右侧
        }
        //是否显示相册模块
        if (this.deviceObj.pictureNum > 0) {
          this.devicePictureShow = true;
          this.$refs.devicePictureCard.show(this.hd_device_id, code);
        } else {
          this.devicePictureShow = false;
        }
        //是否显示采集模块
        if (this.sensorCj && this.sensorCj.length > 0) {
          //默认选中非风向
          for (var i = 0; i < this.sensorCj.length; i++) {
            if (this.sensorCj[i].hd_sensor_type_code !== 22) {
              this.currentID = this.sensorCj[i].id;
              this.rightTopEchartsTypeChoose = i;
              break;
            }
          }
          this.sensorCollectShow = true;
        }
        //是否显示控制模块
        if (this.sensorKz && this.sensorKz.length > 0) {
          this.sensorControlShow = true//控制类
          this.valveOpenTimeSort(this.hd_device_id, null);//阀门时长排序
        }


      })
    },
    //获取设备详情
    getDetailById () {
      getDetailById({ hd_device_id: this.hd_device_id }).then(res => {
        this.deviceObj = res.data
        this.communication = res.data.communication
        if (res.data.sensor && res.data.sensor.length !== 0) {
          let sensors = res.data.sensor
          this.sensorControlShow = false
          this.sensorCj = []
          this.sensorKz = []
          for (var i = 0; i < sensors.length; i++) {
            sensors[i]["hd_device_sensor_name"] = sensors[i].name
            sensors[i]["hd_device_sensor_value"] = sensors[i].value
            sensors[i]["hd_sensor_type_unit"] = sensors[i].sensor_type_unit

            if (sensors[i].sensor_type_code === '101' || sensors[i].sensor_type_code === '102') {
              sensors[i].loading = false
              sensors[i].value2 = sensors[i].value
              this.sensorKz.push(sensors[i])
            } else {
              var v = sensors[i]
              v.config_json_obj = JSON.parse(v.config_json)
              if (v.config_json_obj == null || v.config_json_obj.length == 0) {
                v.config_json_obj = []
                v["start_value"] = 0
                v["end_value"] = 0
              } else {
                v["start_value"] = v.config_json_obj[0].start_value
                v["end_value"] = v.config_json_obj[v.config_json_obj.length - 1].end_value
              }
              if (sensors[i].sensor_type_code === "801") {
                continue
              }
              this.sensorCj.push(sensors[i])
              this.currentIds.push(sensors[i].id)
            }
          }
        }
        this.checkModuleShow()
      });
    },
    //获取设备日志
    getDeviceRunLogListByh_id () {
      getDeviceRunLogListByh_id({ h_id: this.hd_device_id, startPosition: 0, maxResult: 10 }).then(e => {
        if (e.code === 200) {
          this.deviceRunLogList = [];
          for (let index = 0; index < e.data.content.length; index++) {
            const element = e.data.content[index];
            var obj = {
              title: element.tle,
              content: element.cont,
              u_name: element.u_name,
              date: parseTime(element.i_date),
              type: getLogTypeDes(element.type),
              color: getLogTypeColor(element.type),
              icon: getLogTypeIcon(element.type)
            };
            this.deviceRunLogList.push(obj);
          }
          //设置日志组件高度
          var main_height = $('.app-main')[0].scrollHeight;
          if (main_height > 0) {
            $('#logPanel').css('height', main_height - 320 + 'px');
          }
        }
      })
    },
    //点击采集类传感器
    sensorCollectClick (item, index) {
      this.rightTopEchartsTypeChoose = index;
      if (item.hd_sensor_type_code !== '22') {
        this.currentID = item.id;
      }
    },
    //获取状态颜色
    getStatusColor (items) {
      var value = items.hd_device_sensor_value;
      let config_json = items.config_json_obj;
      for (var i = 0; i < config_json.length; i++) {
        if (config_json[i].end_value == null || config_json[i].end_value == '') {
          config_json[i].end_value = Infinity;
        }
        if (value >= config_json[i].start_value * 1 && value < config_json[i].end_value * 1) {
          return config_json[i].color;
        }
      }
      return '#068D74';
    },
    getValueLevelLabel (config_json, value) {
      for (var i = 0; i < config_json.length; i++) {
        if (config_json[i].end_value == null || config_json[i].end_value == '') {
          config_json[i].end_value = Infinity;
        }
        if (value >= config_json[i].start_value * 1 && value < config_json[i].end_value * 1) {
          return config_json[i].name;
        }
      }
    },
    getValueProportion (items, cur_value) {
      if (items.end_value == 0 && items.start_value == 0) return 0;
      var proportion = (cur_value / (items.end_value - items.start_value)) * 100;
      if (proportion > 100) proportion = 100;
      return proportion;
    },
    showValueLevel (items) {
      if (true) return Vue.set(items, 'isShowValueLevel', false);
      if (items.isShowValueLevel) {
        Vue.set(items, 'isShowValueLevel', false);
      } else {
        if (items.config_json_obj.length > 0) {
          Vue.set(items, 'isShowValueLevel', true);
        }
      }
    },
    showTrigger (items) {
      items['hd_sensor_type_name'] = items.sensor_type_name;
      items['hd_device_name'] = items.device_name;
      let config_json = JSON.parse(items.config_json);
      if (config_json != null) {
        this.$refs.warnConfig.tableData = config_json;
      } else {
        this.$refs.warnConfig.tableData = [];
      }
      this.$refs.warnConfig.id = items.id;
      this.$refs.warnConfig.start_value = items.start_value;
      this.$refs.warnConfig.end_value = items.end_value;
      this.$refs.warnConfig.id = items.id;
      this.$refs.warnConfig.valueLevelVisible = true;
      this.$refs.warnConfig.parentObj = items;
    },
    //阀门时长排序
    valveOpenTimeSort (hd_device_id, device_id) {
      valveOpenTimeSort({
        hd_device_id: hd_device_id,
        device_id: device_id,
        isSort: true
      }).then(res => {
        const _this = this;
        var scName = [];
        var continueTime = [];
        var cxName = [];
        var zscTime = [];
        var continueListLength = res.data.continueList.length > 10 ? 10 : res.data.continueList.length;
        for (let index = 0; index < continueListLength; index++) {
          const element = res.data.continueList[index];
          scName.push(element.hd_device_sensor_name);
          continueTime.push(element.continueOpenTime);
        }
        var totalListLength = res.data.totalList.length > 10 ? 10 : res.data.totalList.length;
        for (let index = 0; index < totalListLength; index++) {
          const element = res.data.totalList[index];
          cxName.push(element.hd_device_sensor_name);
          zscTime.push(element.totalOpenTime);
        }
        // return;
        let chartl = echarts.init(this.$refs.chartl);
        let chartn = echarts.init(this.$refs.chartn);
        loadChartl(chartl, scName, zscTime);
        loadChartn(chartn, cxName, continueTime);
        window.addEventListener('resize', () => {
          chartl.resize();
          chartn.resize();
        });
        this.$forceUpdate();
      });
    },
    //二挡开关控制
    handelSwitch (row, scope) {
      if (row.loading) {
        return;
      }
      var hd_sensor_id = row.id;

      var index = scope.$index;
      var obj = this.sensorKz[index];

      row.loading = true;
      if (row.value == 1) {
        openChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 1;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 0;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          });
      } else {
        closeChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 0;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 1;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          });
      }
    },
    //三挡开关
    handelWindow (row, scope) {
      if (row.loading) {
        return;
      }

      var hd_sensor_id = row.id;

      var index = scope.$index;
      var obj = this.sensorKz[index];

      row.loading = true;
      this.sensorKz.splice(index, 1, obj);

      handelWindow(hd_sensor_id, row.value, this.$ws)
        .then(res => {
          obj.value2 = obj.value;
          this.sensorKz.splice(index, 1, obj);

          row.loading = false;
        })
        .catch(err => {
          this.$message.error(err.msg);
          obj.value = obj.value2;
          this.sensorKz.splice(index, 1, obj);

          row.loading = false;
        });
    },
    hideElement: function () {
      this.$parent.show.JKLVisible = false;
      this.$options.myPlayer.stop();
      this.$options.myPlayer.remove();
    },
    //查看所有日志
    loadAllLog () {
      this.$router.push({
        path: '/deviceLog',
        query: { id: this.hd_device_id }
      });
    },
    //配置智能识别提醒
    configAIWarn (deviceObj) {
      this.$refs.zsWarnTrigger.showPanel(deviceObj.id, deviceObj.name, deviceObj.device_id);
    },
    //查看所有照片
    loadAllPicture () {
      this.xc_hd_device_id = this.hd_device_id;
      this.photoDialogVisible = true
    },
    //查看智慧摄像头识别列表
    loadAllCameraStatus () {
      this.xc_hd_device_id = this.hd_device_id;
      this.listCameraStatusDialogVisible = true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.app_info
  width calc(100% - 30px)
  height calc(100% - 76px)
  position absolute
  background #E8ECF0
  top 45px
  left 0px
  margin 15px
  /* padding-top: 30px; */

.app_box
  display flex
  height 100%

.app_info .mini_box
  display flex
  width 100%
  min-height 68px
  flex-wrap wrap

.app_info .model
  padding 10px
  background #ffffff
  margin-right 5px
  margin-top 5px

.app_info .model .model_name
  padding-bottom 3px
  font-size 14px
  color #aeb3c6
  position relative

.app_info .model .model_content
  padding 1px 0
  position relative

.app_info .model .model_content .model_content_row
  padding 5px 0
  font-size 12px
  color #aeb3c6

.app_info .model .model_content .model_content_row .row_val
  color #408dc3

.app_info .video_model
  /* height: calc(100% - 176px); */
  height 450px

.app_info .app_box_left
  height 100%
  width 300px
  margin-left 5px
  flex-shrink 0

.app_box_center
  height 245px
  width 100%

.app_box_center_left
  width 380px
  height 100%

.app_box_center_left_div1
  display flex
  float left
  margin-top 20px

.app_box_center_left_div1 div
  width 100px
  text-align center
  background #92A6D7
  margin-left 20px
  padding 5px 0px
  border-radius 5px

.app_box_bottom_left
  width 100%
  height 100%

.app_box_bottom_left_div1
  display flex
  float left
  margin-top 20px

.app_box_bottom_left_div1 div
  width 100px
  text-align center
  background #92A6D7
  margin-right 20px
  padding 5px 0px
  border-radius 5px

.app_box_center_left_div2
  width 220px
  margin-top 20px
  text-align center
  background #92A6D7
  margin-left 20px
  padding 5px 0px
  border-radius 5px

.app_box_center_right
  width 100%
  height 100%

.app_info .right_top_model
  height auto
  width 100%
  color #000000

.app_info .btn_model
  height 170px

.app_info .video_model1
  height 300px

.app_info .info_model
  height 300px

.app_info .cgq_model
  height calc(100% - 260px)
  padding 10px 2px 10px 10px

.app_info .app_box_right
  width calc(100% - 300px)
  height 100%
  display flex
  align-content flex-start
  flex-wrap wrap

/* *********************** */
.app_info .btn_box_model
  float left
  padding 12px
  color #249eff
  line-height 24px
  width 50%
  text-align center

.app_info .btn_box
  overflow hidden
  width 180px
  margin 15px
  border solid 1px #42b983
  flex-shrink 0
  border-radius 3px

.app_info .box_top
  display flex

.app_info .box_head
  padding 8px
  color #ffffff
  background #42b983

.app_info .sb_head
  padding 8px
  color #ffffff
  background #42b983

.app_info .video_box
  overflow hidden
  margin 15px
  border solid 1px #42b983
  width 100%
  border-radius 3px

.app_info .video_name
  position absolute
  right 0
  top 0
  z-index 9
  padding 3px
  background #ffffff88
  color #4c4949

.app_info .video_box_model
  position relative
  float left
  width 25%

.app_info .video_model
  overflow hidden

.app_info .sb_box
  margin 15px
  border-radius 3px
  border solid 1px #3fa54c

.app_info .sb_model_box
  color #000000

.app_info .sb_data_realTime
  display flex
  justify-content space-around
  margin 3px 0
  padding 6px 0
  background #e8e8e8
  position relative

.app_info .sb_data_realTime_model
  padding 3px 15px
  font-size 22px
  color #b33434
  text-align center
  cursor pointer

.app_info .sb_data_realTime_model:hover
  border-bottom solid 1px #b33434

.app_info .sb_mode
  margin 14px 3px
  /* padding: 0 8px; */
  border solid 1px #a2c4b5

.app_info .sb_name
  font-size 16px
  font-weight 800
  color #42b983
  background #ccf8e4
  padding 8px 0

.app_info .echatrs
  width 100%
  height 300px

.app_info .back_
  position absolute
  right 2px
  top 2px
  background none
  padding 10px
  border none
  font-size 22px
  z-index 99

.app_info .line_preagge
  /* animation: line 5s; */
  transition width 5s

.app_info .sb_data_name, .app_info .sb_data_value
  color #005050

.app_info .box_left
  width 30%
  height 100%
  border-right solid 1px #cdc9c9
  flex-shrink 0

.app_info .box_right
  width 100%
  height 100%
  display flex
  flex-direction column

.app_info .sb_qgq_info_model
  width 33%
  padding 12px
  text-align center
  color #aeb3c6

.app_info .sb_qgq_info_model_val
  font-size 16px
  padding 9px
  color #3d8dac

.app_info .sb_qgq_info
  height 100%

.app_info .sb_qgq_info_body
  height calc(100% - 85px)
  overflow-y auto

.app_info .sb_qgq_info_body > div
  display flex
  flex-wrap wrap

.app_info .sb_qgq_info_head
  font-size 14px
  /* height: 33px; */
  /* line-height: 33px; */
  /* text-indent: 2em; */
  color #4a9bd0
  display flex
  align-items center
  /* margin-left: 2em; */

.app_info .sb_qgq_info_title
  color #888888
  height 33px
  line-height 33px
  text-indent 2em

.app_info .sb_qgq_info_title::after
  content ''

.app_info .yykzq_info_body
  color #aeb3c6
  height 100%
  overflow-y auto

.app_info .yykzq_info_body > div
  display flex
  flex-wrap wrap

.app_info .yykzq_info_model
  display flex
  width calc(25% - 60px)
  -webkit-box-pack justify
  -ms-flex-pack justify
  justify-content space-between
  margin 0px 30px
  -webkit-box-sizing border-box
  box-sizing border-box
  height 50px

.app_info .yuan
  border-radius 50%
  width 10px
  height 10px
  background #3677c3
  margin 0 5px 0 0

.app_info .yykzq_info_name
  display flex
  align-items center
  font-size 12px

.app_info .sb_jksp_info_body
  width 100%
  height 100%
  position absolute

.app_info .sb_jksp_info_body_left_
  width 200px
  padding 0 2em 0 0
  flex-shrink 0
  box-sizing border-box

.app_info .sb_jksp_info_body_left_ > div
  padding 8px 3px
  font-size 14px
  color #4f4c4c
  border-bottom solid 1px #bdbcbc
  cursor pointer

.app_info .sb_jksp_info_body_left_ > div.active
  color #a57f5b

.app_info .sb_jksp_info_body, .app_info .sb_jksp_info_body_left_ > div
  padding 8px 3px
  font-size 14px
  color #4f4c4c
  border-bottom solid 1px #bdbcbc

.app_info .sb_jksp_info_body_left_ > div.active
  color #a57f5b

.app_info .sb_jksp_info_body_right_
  width 100%
  display flex
  position relative

.app_info .sb_jksp_info_body_video
  width 100%
  height 100%
  position absolute

.app_info .sb_jksp_info_body_video:hover + .sb_jksp_info_body_opt
  opacity 1

.sb_jksp_info_body_opt:hover
  opacity 1 !important

.app_info .sb_jksp_info_body_opt
  opacity 0
  width 100%
  flex-shrink 0
  display flex
  height 100px
  position absolute
  bottom 0
  justify-content space-around
  background #eeeeee88

.app_info .video_jksp_opt
  position relative
  height 100%
  width 100px

.app_info .video_jksp_opt_btn
  height 100%
  display flex
  /* flex-direction: column; */
  text-align center
  justify-content space-around

.app_info .video_jksp_opt_btn > div
  display flex
  justify-content center
  align-items center
  padding 9px

.app_info .video_jksp_opt > div
  position absolute
  left calc(50% - 10px)
  top calc(50% - 10px)
  transform translate(-50%, -50%)

.app_info .video_jksp_opt > div > img
  position absolute
  border solid 1px #999999
  border-radius 50%
  cursor pointer

.app_info .video_jksp_opt > div > img
  position absolute
  cursor pointer
  /* border: solid 1px red; */

.app_info .video_jksp
  width 100%
  height 100%
  /* border: solid 1px red; */

.app_info .sb_jksp_info_body.big
  position absolute
  left 0
  top 0
  width 100%
  height 100%

.app_info iframe
  border none

.app_info .nodata
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
  font-size 22px
  /* border: solid 1px; */
  padding 15px
  border-radius 7px
  box-shadow 0 0 54px #1e1e28
  animation zhengdong .25s
  text-align center
  z-index 99

@keyframes zhengdong
  0%
    transform translate(-40%, -50%)

  20%
    transform translate(-60%, -50%)

  40%
    transform translate(-40%, -50%)

  60%
    transform translate(-60%, -50%)

  80%
    transform translate(-40%, -50%)

  100%
    transform translate(-50%, -50%)

/* .app_info .wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.app_info .item{
  width: 300px;
  height: 50px;
  background-color: #42b983;
  color: #ffffff;
} */
.app_info .draggable_item
  width calc(50% - 30px)
  height 400px
  margin 15px
  background #fff

.app_info .wrapper
  height calc(100% - 53px)
  overflow auto
  height 100%
  background #e8ecf0

.app_info *::-webkit-scrollbar
  width 15px
  height 3px

.app_info .wrapper_box
  display flex
  flex-wrap wrap

.app_info .yykzq_info_val
  display flex
  align-items center

.row_title
  font-size 16px
  color #000000
  font-weight 600

.row_centent
  color #000000
  padding-left 5px

.row_centent_img
  width 15px
  height 15px
  margin-left 15px

.dots_green
  width 15px
  height 15px
  border 1px solid #0baf09
  border-radius 15px
  background-color #0baf09
  opacity .5
  margin 0 auto

.dots_red
  width 15px
  height 15px
  border 1px solid red
  border-radius 15px
  background-color red
  opacity .5
  margin 0 auto

.right_top_type
  margin 5px 15px 0px 0px
  padding 5px
  border-radius 5px
  cursor pointer

.right_top_data
  margin 5px 15px 0px 0px
  padding 4px 15px
  background #FFFFFF
  border-radius 5px
  min-width 205px
  flex 1
  height 88px
  border 1px solid #e6e6e6

.right_top_data_img
  display block
  float left
  width 30px
  height 30px
  align-self center

.right_top_echartsType
  margin 5px 15px 0px 0px
  padding 5px 10px
  border-radius 5px
  cursor pointer

.app_box_center_right_echartsType
  margin-right 15px
  padding 5px 10px
  border-radius 5px
  cursor pointer

.el-input__inner
  height 25px
  line-height 25px

.el-input__suffix
  margin-top 8px

.videodataTitleClass
  color #000
  margin 5px 15px 0px 0px
  padding 10px
  border-radius 5px
  cursor pointer

.videoIframeClass
  width 100%
  height 350px
  margin-top 10px
  background #000

.el-timeline-item .el-timeline-item__node--normal
  left -6px
  width 25px
  height 25px

.cgq_model_timeLine .el-timeline-item__tail
  left 12px

.cgq_model_timeLine .el-timeline-item__node
  left 0

.cgq_model_div >>> .el-timeline-item__node--large
  left -9px
  width 30px
  height 30px

.cgq_model_div >>> .el-timeline-item__icon
  font-size 20px

.model_name
  padding-bottom 3px
  font-size 14px
  color #aeb3c6
  position relative

.cgq_model_div
  height calc(100% - 20px)
  padding-left 15px
  padding-right 8px
  overflow hidden
  clear both

.cgq_model_div::-webkit-scrollbar
  /* 滚动条整体样式 */
  width 8px /* 高宽分别对应横竖滚动条的尺寸 */
  height 1px

.cgq_model_div::-webkit-scrollbar-thumb
  /* 滚动条里面小方块 */
  border-radius 10px
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  background #31BFA6

.cgq_model_div::-webkit-scrollbar-track
  /* 滚动条里面轨道 */
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  border-radius 10px
  background #ededed

.row1
  justify-content space-between

.row
  width 100%
  height 100%

.flex
  display flex
  align-items center
</style>
