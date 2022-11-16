<template>
  <div style="overflow-y:aotu">
    <div style="position: absolute;top: 20px;width: calc(100% - 40px);height: 45px;padding-left:20px;padding-right: 20px;">
      <div style="float: left;padding-left:70px;padding-top:6px;width: calc(100% - 160px);display: flex;overflow: auto;">
        <el-select
          v-model="dk_id"
          size="mini"
          placeholder="请选择"
          @change="clickDK"
        >
          <el-option
            v-for="(item, index) in dkList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div
        style="float:right;margin-right: -3px;line-height: 45px;padding:0 10px;cursor:pointer"
        @click="$router.push('/myresources/area')"
      >
        <!-- <a
          style="color:#5b5bca"
          href="javascript:window.history.back()"
        >返回</a> -->
        <span style="color:#5b5bca;">返回</span>
      </div>
    </div>
    <div class="app_info open">
      <div
        class="cover"
        @click="hideElement"
      />

      <div class="app_box">
        <div class="app_box_left">
          <div class="model info_model">
            <div
              class='goMap'
              style='height:135px;position: relative;'
            >
              <!-- 点击进入一张图 -->
              <div
                class='goMapCover'
                @click='goMap'
              >
                <div class='goMapCoverText'>查看地块</div>
              </div>
              <!-- 用的地块信息页面展示地块位置 -->
              <JKMap2d :load='mapinit'></JKMap2d>
            </div>
            <div class="model_content">
              <div
                class="model_content_row"
                style="margin-bottom:5px;padding-top:15px"
              >
                <span class="row_title">{{ facilitiesInfoname }}</span>
              </div>
              <div
                class="model_content_row"
                v-if="areaShow"
              >
                <!-- <span>地块类型</span>
              <span class="row_val">{{ dkInfo.facilities_type_name }}</span> -->
                <i
                  class="el-icon-location-information row_centent_img"
                  style="font-size:15px;color:#333;"
                ></i>
                <span class="row_centent">{{ bs_area_name }}</span>
              </div>
              <div
                class="model_content_row"
                v-if="baseShow"
              >
                <span class="row_centent">基地名称：{{ bs_base_name }}</span>
              </div>
              <div class="model_content_row">
                <span class="row_centent">地块类型：{{ rs_facilities_type_name }}</span>
              </div>
              <div class="model_content_row">
                <span class="row_centent">面积：{{ dkInfo.acreage }}亩</span>
              </div>
              <!-- <div class="model_content_row">
              <span>联系电话</span>
              <span class="row_val">{{ dkInfo.mobile }}</span>
            </div> -->
            </div>
          </div>
          <div class="model cgq_model">
            <div
              class="model_name"
              style="border-bottom:0px;"
            >
              <div style="float: left;">设备运行状态</div>
              <!-- 地块日志 -->
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
                          :style="
                            'border-radius:5px;color:#FFF;background:' +
                              item.color
                          "
                        >{{ item.type }}</span>
                      </div>
                      <p style="margin-top: 10px;">{{ item.title }}</p>
                      <div style="margin-top:10px;align-items: center;">
                        <div>
                          <img
                            style="width: 18px;height: 18px;align-self:center;position:absolute"
                            src="/static/img/timer.png"
                          />
                          <span style="margin-left: 24px;">{{
                            item.date
                          }}</span>
                        </div>
                        <div style="margin-left:24px">
                          操作人:{{ item.u_name }}
                        </div>
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>

        <div class="app_box_right">
          <div
            style="width: 50%;position: relative;"
            class="model video_model1"
          >
            <div
              class="model_name"
              style="border-bottom:0px;"
            >视频监控</div>
            <div style="position: absolute;top:5px;right:5px">
              <el-select
                v-model="selectedVideo"
                placeholder="请选择"
                size="mini"
                @change="playerIdx"
                style="width:180px"
              >
                <el-option
                  v-for="(item, idx) in videodata"
                  :key="idx"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-button
                size="mini"
                type="primary"
                @click="cameraPhoto()"
              >相册</el-button>
            </div>
            <div
              v-if="videodata.length==0"
              style="color:#909399;font-size: 14px;height: 100%;width: 100%;text-align: center;vertical-align: middle;padding-top:145px"
            >暂无数据</div>
            <div v-show="videodata.length > 0">
              <div class="videoIframeClass">
                <!-- <iframe
                  ref="video"
                  :src="
                    '/sxt?hd_device_id=' + sxt_hd_device_id + '&playWay=play'
                  "
                  style="width:100%;height:100%"
                /> -->
                <sxtifram
                  ref="video"
                  playWay="play"
                  :hd_device_id="sxt_hd_device_id"
                  :rs_facilities_id="dk_id"
                />
              </div>
            </div>
          </div>
          <div
            class="model"
            style="overflow-y: auto;width: calc(50% - 10px)"
          >
            <div class="model_name">设备控制</div>
            <div class="model_content">
              <el-table
                :data="controlSensor"
                row-key="id"
                height="250"
                style="width: 100%;font-size:13px"
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
                      :disabled="
                        !checkDeviceControl(scope.row.hd_device_id)
                      "
                    >
                    </el-switch>
                    <!-- 三挡开关 -->

                    <el-radio-group
                      v-if="scope.row.hd_sensor_type_code === '102'"
                      v-model="scope.row.value"
                      size="small"
                      v-loading="scope.row.loading"
                      :disabled="
                        !checkDeviceControl(scope.row.hd_device_id)
                      "
                      @change="handelWindow(scope.row, scope)"
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
                <el-table-column
                  label="配置"
                  width="50"
                >
                  <template slot-scope="scope">
                    <i
                      v-if="
                        checkDeviceControl(scope.row.hd_device_id)
                      "
                      title="预置点配置"
                      class="el-icon-s-tools"
                      @click="test(scope.row.id)"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <!-- <div
            class="model right_top_model"
            style="position: relative;min-height: 100px;height: auto;"
            v-if="avgSensorData.length!==0"
          >
            <div class="model_name">传感器平均值</div>
            <div
              class="mini_box"
              style="padding:10px;height: 126px;"
            >
              <div
                v-for="(items, index) in avgSensorData"
                :key="index"
                class="right_top_data"
              >
                <div
                  style="display:flex;color:#FFFFFF;padding-top: 6px;"
                  :title="items.hd_sensor_type_name"
                >
                  <img
                    class="right_top_data_img"
                    :src="urls + items.hd_sensor_type_small_image_path"
                    v-show="items.hd_sensor_type_small_image_path!=null"
                  />
                  <div style="margin-left:5px;width: 58px;text-align: center;">
                    <div style="font-size: 13px;margin:0 auto;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display: inline-block;width: 70px;">
                      {{ parseInt(items.count/items.sum) }} {{ items.hd_sensor_type_unit }}
                    </div>
                    <div style="font-size:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: 70px;display: inline-block;">{{ items.hd_sensor_type_name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- 相册 -->
          <div
            class="model"
            style="width: 100%;height: 250px;position: relative;"
            v-show="devicePictureShow"
          >
            <div class="model_name">{{ xc_device && xc_device.device_type_code === 'JK-ZS' ? '识别结果' : '相册' }}</div>
            <div style="display:flex;position: absolute;right: 10px;top:10px;">
              <div>
                <el-select
                  v-model="xcDevice"
                  placeholder="请选择"
                  size="mini"
                  value-key="id"
                  @change="xcDeviceChange"
                  style="width:180px;"
                >
                  <el-option
                    v-for="item in xcDeviceOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                style="display:flex;margin-left:5px;"
                v-if="xcDevice && xcDevice.device_type_code === 'JK-ZS'"
              >
                <el-button
                  type="text"
                  size="mini"
                  @click="loadAllCameraStatus(xcDevice.id)"
                >识别列表</el-button>
                <div
                  @click="configAIWarn(xcDevice)"
                  style="line-height: 30px;margin-left:5px;"
                ><i class="el-icon-s-tools"></i></div>
              </div>
              <div
                style="line-height: 30px;margin-left:5px;"
                @click="loadAllPicture(xcDevice.id)"
              >
                <i class="el-icon-full-screen"></i>
              </div>
            </div>
            <DevicePictureCard
              ref="devicePictureCard"
              style="padding-top:15px"
            />
          </div>

          <div
            class="model right_top_model"
            style="position: relative;height: auto;min-height: calc(100% - 553px);"
          >
            <div class="model_name">采集数据</div>
            <div style="position: absolute;top: 8px;right: 10px;">
              <div style="float:left">
                <el-select
                  v-model="selectedDevice"
                  placeholder="请选择"
                  value-key="hd_device_id"
                  size="mini"
                  @change="rightTopTypeClick"
                  style="width:150px"
                >
                  <el-option
                    v-for="item in collectSensor"
                    :key="item.hd_device_id"
                    :label="item.hd_device_name"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                style="float: left;padding:10px"
                @click="viewCollectedData"
              >
                <div style="margin-top: -2px;padding-right: 5px;cursor: pointer;"><i class="el-icon-more fullScreen"></i>
                </div>
              </div>
            </div>

            <div
              v-if="!rightTopShow"
              style="color:#909399;font-size: 14px;height: 100%;width: 100%;text-align: center;vertical-align: middle;padding-top: 19%;"
            >
              暂无数据
            </div>

            <!--  -->
            <div
              v-if="rightTopShow"
              style="height:auto;align-content:flex-start;flex-wrap: wrap;"
            >
              <div
                class="mini_box"
                style="margin:10px;"
              >
                <div
                  v-for="(items, index) in sensorList"
                  :key="index"
                  class="right_top_data"
                  :style="index === rightTopEchartsTypeChoose? 'background: #cfffff': 'background: #ffffff'"
                >
                  <div
                    style="display:flex;position: relative;color:#455a64;height: 100%;"
                    @click="rightTopEchartsTypeClick(items, index)"
                  >
                    <div
                      class='warnicon'
                      @click="showTrigger(items)"
                      v-show="true || items.isShowTrigger"
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
                            :style="{color:getStatusColor(items)}"
                          >{{ items.hd_device_sensor_value }}<span style="font-size: 13px;">&nbsp;&nbsp;{{ items.hd_sensor_type_unit }}</span></span>
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
                          <div style="float:left">{{ items.hd_device_sensor_name }}<i
                              class="el-icon-caret-bottom"
                              style="font-size:15px;color:#333;display: none;"
                            ></i></div>
                          <div
                            style="float:right;cursor: pointer;"
                            :style="{color:getStatusColor(items)}"
                          >{{getValueLevelLabel(items.config_json_obj,items.hd_device_sensor_value)}}</div>
                        </div>
                        <div style="height:4px;position: relative;z-index: 10;">
                          <div style="width: calc(100%);height: 3px;background-color: rgba(128, 128, 128);position: absolute;z-index: 10;">
                            <div
                              :style="{background:getStatusColor(items),width:getValueProportion(items,items.hd_device_sensor_value)+'%'}"
                              style="height:100%;"
                            ></div>
                          </div>
                        </div>
                        <div
                          style="height:10px"
                          v-if="items.isShowValueLevel"
                        >
                          <div style="position: relative;z-index: 9;">
                            <div style="height: 6px;width:2px;background-color: rgba(128, 128, 128);position: absolute;top:-3px;z-index: 2;left:0px;">
                              <div style="font-size: 12px;position: absolute;top: 8px;left: -3px;">{{items.config_json_obj[0].start_value}}</div>
                            </div>
                            <div
                              v-for="(config_row, index2) in items.config_json_obj"
                              :key="index2"
                              style="height: 6px;width:2px;background-color: rgba(128, 128, 128);position: absolute;top:-3px;z-index: 2;"
                              :style="{left:getValueProportion2(items,config_row,index2)}"
                            >
                              <div style="font-size: 12px;position: absolute;top: 8px;left: -3px;">{{config_row.end_value}}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        </div>
      </div>
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
    </div>
    <loading ref="loading" />
    <WarnConfig ref="warnConfig" />
    <el-dialog
      :visible.sync="switchSensorConfigVisible"
      title="阀门配置"
      width="1200px"
      :append-to-body="true"
    >
      <el-tabs
        v-model="switchSensorConfigTab"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="预置点配置"
          name="presetconfig"
        >
          <presetConfig
            :hd_device_sensor_id="switchSensorId"
            :hd_device_id="sxt_hd_device_id"
            :presets="sxt_presets"
          />
        </el-tab-pane>
        <!-- <el-tab-pane
          label="配置灌溉计划"
          name="irrigatePlan"
        >
          <irrigatePlan ref="irrigate" />
        </el-tab-pane> -->
      </el-tabs>
    </el-dialog>
    <!-- 智能识别 -->
    <ZSWarnTrigger ref="ZSWarnTrigger" />
    <!-- 智慧摄像头识别列表 -->
    <el-dialog
      v-if="listCameraStatusDialogVisible"
      :visible.sync="listCameraStatusDialogVisible"
      append-to-body
      title="识别列表"
    >
      <listCameraStatus :hd_device_id="xc_hd_device_id" />
    </el-dialog>
    <collectedData ref="collectedData" />
  </div>
</template>

<script>
import {
  openChannel,
  closeChannel,
  openOrCloseChannel,
  handelWindow
} from "@/utils/websocket_util.js";
// import { getToken } from "@/utils/auth";
import {
  getLogTypeDes,
  getLogTypeColor,
  getLogTypeIcon
} from "@/utils/logutil";
import ajaxApi from "@/api/map";
import CameraPhoto from "@/views/base/video/module/CameraPhoto";
import { mapGetters } from "vuex";
import {
  getById as getFacilitesById,
  getFacilitiesUserByFacilitiesId,
  updateFacilitiesConfigJsonInteger
} from "@/api/rs_facilities";
import { controlSxt, captureSxtDevice, getSxtUrlById } from "@/api/sxt";
import echarts from "echarts";
import {
  getDevicePropertyData,
  getHourData,
  getDayData
} from "@/api/hd_device_property";
import { parseTime } from "@/utils/index";
import {
  getDetailById,
  getFacilitiesDetails,
  selectSensorData2,
} from "@/api/equip";
import { baseList } from "@/api/baseinfo";
import { findByBs_base_id } from "@/api/rs_facilities";
import { loadChartq } from "./chart/qxzchart";
import { loadCharts } from "./chart/serchart";
import loading from "@/components/loading";
import sxtifram from "@/views/base/video/module/Sxt_ifram";
import sensorEcharts from "@/views/sensorEcharts";
import TriggerPanel from "@/views/device/components/TriggerPanel";
import checkDeviceControl from "@/utils/device_permission";
import { sensorMoveSxtPreset } from "@/api/hd_device_sensor";
import presetConfig from "@/views/base/video/module/presetConfig";
import irrigatePlan from "./irrigatePlan";
import WarnConfig from "@/views/base/equip/module/WarnConfig";
import bus from "@/components/common/bus.js";
import DevicePictureCard from '@/views/base/equip/module/DevicePictureCard'
import ZSWarnTrigger from '@/views/device/components/ZSWarnTrigger'
import { existPhotoDevice } from '@/api/hd_device_camera'
import listCameraStatus from '@/views/base/equip/module/listCameraStatus'
import CollectedData from '@/views/base/equip/module/CollectedData';

import { map2d } from "@/utils/jiankun_map";

// this.even_par(this.dom.find(".data .par")[0]);
export default {
  name: "DkInfoNew",
  myPlayer: null,
  components: {
    CameraPhoto,
    loading,
    sxtifram,
    sensorEcharts,
    TriggerPanel,
    presetConfig,
    WarnConfig,
    irrigatePlan,
    listCameraStatus,
    DevicePictureCard,
    ZSWarnTrigger,
    CollectedData
  },
  props: {
    modelColor: {
      type: String,
      default: "#333a4c"
    }
  },
  data () {
    return {
      listCameraStatusDialogVisible: false,
      xcDevice: null,
      xcDeviceOptions: [],
      switchSensorConfigVisible: false,
      switchSensorConfigTab: "presetconfig",
      switchSensorId: "",
      dk_id: "",
      currentIds: [],
      currentID: null,
      baseShow: false,
      orgShow: false,
      areaShow: false,
      sxtShow: false,
      dialogVisible: false,
      photoDialogVisible: false,
      xc_hd_device_id: null,
      selectedDevice: "",
      selectedVideo: "",
      hd_device_id: "",
      communication: "",
      hd_device_name: "",
      device_id: "",
      device_id1: "",
      data: [],
      dkList: [],
      devicePictureShow: false,
      sensorDataShow: false,
      fertigation: false,
      list: [],
      startPosition: 0, //设备日志分页第几页
      maxResult: 10, //一页多少条
      value: false,
      btnLoad: false,
      btn: [],
      video: [],
      videoActiveIdx: null,
      nowplayercam: null,
      sbArray: [],
      videodata: [],
      videodataChoose: 0,
      btnArray: [],
      selectSB: [{ name: "测试1", id: "adsdasd" }],
      selectSB_id: "",
      dkInfo: {
        id: "/",
        name: "/",
        facilities_type_name: "/",
        acreage: "/",
        hd_device_num: "/",
        linkman: "/",
        mobile: "/"
      },
      bases: [],
      cgqs: [],
      cgq: {},
      rightTopType: [
        { name: "土地养分速测仪" },
        { name: "墒情监测" },
        { name: "气象站" }
      ], //右1 类型
      rightTopTypeChoose: 0,
      rightTopTypeChoose1: 0,
      rightTopdata: [
        { name: "磷", value: "25.3" },
        { name: "铵", value: "25.3" },
        { name: "氮", value: "25.3" }
      ], //右1 类型下的数据
      rightTopEchartsType: [
        { name: "铵态氮" },
        { name: "速效磷" },
        { name: "有效磷" }
      ], //右1 echarts类型
      rightTopEchartsTypeChoose: 0,
      optirightTopEchartsTypeConditiononsValue: 0,
      rightTopEchartsTypeCondition: [
        { name: "实时", value: 0, num: "20", type: "5" },
        { name: "近24小时", value: 1, num: "24", type: "4" },
        { name: "近7天", value: 2, num: "6", type: "3" },
        { name: "近30天", value: 3, num: "30", type: "3" }
      ],
      appBoxCenterRightEchartsType: [{ name: "温度" }, { name: "电压" }],
      appBoxCenterRightEchartsTypeChoose: 0,
      sbkzArr: [
        {
          no: 1,
          name: "鱼语控制器1",
          code: "TC01A-1910028",
          state: "1",
          date: "2020-05-26 16:36:52",
          journal: "查看",
          operation: true
        },
        {
          no: 2,
          name: "鱼语控制器2",
          code: "TC01A-1910028",
          state: "1",
          date: "2020-05-26 16:36:52",
          journal: "查看",
          operation: true
        },
        {
          no: 3,
          name: "鱼语控制器3",
          code: "TC01A-1910028",
          state: "0",
          date: "2020-05-26 16:36:52",
          journal: "查看",
          operation: false
        },
        {
          no: 4,
          name: "鱼语控制器4",
          code: "TC01A-1910028",
          state: "1",
          date: "2020-05-26 16:36:52",
          journal: "查看",
          operation: true
        }
      ],
      option: {
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [52, 93, 70, 63, 129, 133, 102],
            type: "line",
            smooth: true
          }
        ]
      },
      option1: {
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [52, 93, 70, 63, 129, 133, 102],
            type: "line",
            smooth: true
          }
        ]
      },
      total: 0,
      activities: [],
      facilitiesInfo: [],
      facilitiesInfoname: "",
      facilities_image_path: "",
      urls: process.env.IMG_URL,
      collectSensor: [],
      controlSensor: [],
      sensorList: [],
      ids: "",
      sxt_hd_device_id: "",
      sxt_presets: [],
      rightTopShow: false,
      rightBottomShow: false,
      sxtContent: [],
      form: {
        id: "",
        acreage: 0,
        bs_org_id: this.$store.state.baseinfo.cur_org_id
      },
      cgqShow: false,
      times: [],
      files: [],
      bs_base_name: "",
      rs_facilities_type_name: "",
      bs_org_name: "",
      bs_area_name: "",
      facilities_type_name: "",
      nyyDevice: [],
      nyyConfig: [],
      nyyState: [],
      nyyShow: false,
      nyyName: [],
      times1: [],
      avgSensorData: [],
      fw:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODkyOTU3NjkzNSIsImV4cCI6MTU5Mjk3ODAzOCwiaWF0IjoxNTkxNjgyMDM4fQ.wVzDFuHLXrSmPtXWoABTwRCQnz_Gafqvaroe7aG5eFiusyAyuuM2-OkSCxsiEaW1Ntof-omPZSMFBWAl2qeBjw"
    };
  },
  updated (a, b, c, d) {
    // console.log(this.list);
  },
  computed: {
    ...mapGetters(["id", "token", "user"])
  },
  created () {
  },
  mounted () {

    var dk_id = this.$route.query.id;
    this.dk_id = dk_id;
    // 获取地块列表
    this.loadDKList(dk_id);
    this.show(dk_id);
    // ,function(){
    //   this.show(dk_id)
    // }
  },
  filters: {
    ellipsis (value) {
      if (!value) return "";
      if (value.length > 4) {
        return value.slice(0, 4) + "...";
      }
      return value;
    },
    ellipsis1 (value) {
      if (!value) return "";
      if (value.length > 7) {
        return value.slice(0, 7) + "...";
      }
      return value;
    }
  },
  methods: {
    // 查看传感器数据
    viewCollectedData () {
      this.$refs.collectedData.showDialog(this.hd_device_id)
    },
    //查看所有照片
    loadAllPicture (id) {
      this.xc_hd_device_id = id;
      this.photoDialogVisible = true
    },
    //配置智能识别提醒
    configAIWarn (deviceObj) {
      this.$refs.ZSWarnTrigger.showPanel(deviceObj.id, deviceObj.name, deviceObj.device_id)
    },
    //查看智慧摄像头识别列表
    loadAllCameraStatus (id) {

      this.xc_hd_device_id = id
      this.listCameraStatusDialogVisible = true
    },
    handleClick () {
      // if (this.switchSensorConfigTab == "irrigatePlan") {
      //   this.$refs.irrigate.dataLoad();
      //   this.$refs.irrigate.addShow = false
      //   bus.$emit("irrigateActive", 0)
      // }
    },
    // test (id) {
    //   this.switchSensorConfigVisible = true;
    //   this.switchSensorId = id;
    // },
    getValueLevelLabel (config_json_obj, value) {
      if (config_json_obj != undefined) {
        for (var i = 0; i < config_json_obj.length; i++) {
          if (config_json_obj[i].end_value == null || config_json_obj[i].end_value == "") {
            config_json_obj[i].end_value = Infinity

          }
          if (value * 1 >= config_json_obj[i].start_value * 1 && value * 1 < config_json_obj[i].end_value * 1) {
            return config_json_obj[i].name;
          }
        }
      }

    },
    getValueProportion (items, cur_value) {
      if (items.end_value == 0 && items.start_value == 0) return 0;
      var proportion = (cur_value / (items.end_value - items.start_value) * 100);
      if (proportion > 100) proportion = 100;
      return proportion;
    },
    getValueProportion2 (items, config_row, index) {
      if (config_row.start_value == null || config_row.start_value == "") return "0";
      if (config_row.end_value == null || config_row.end_value == "") config_row.end_value = items.end_value;
      var proportion = (config_row.end_value / (items.end_value - items.start_value) * 100);
      if (index == 0) {
        return proportion + "%"
      } else {
        return "calc(" + proportion + "% - 2px)"
      }

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
    // 地图加载完毕事件
    mapinit (map) {
      console.log("************")
      console.log("地图成功启动")
      console.log("************")
      this.map = map;
      this.view = map;
      this.dk_id && this.showDkMap();
    },
    getStatusColor (items) {
      var config_jsonStr = items.config_json;
      var value = items.hd_device_sensor_value;
      if (config_jsonStr != null) {
        let config_json = JSON.parse(config_jsonStr);
        for (var i = 0; i < config_json.length; i++) {
          if (config_json[i].end_value == null || config_json[i].end_value == "") {
            config_json[i].end_value = Infinity
          }
          if (value >= config_json[i].start_value * 1 && value < config_json[i].end_value * 1) {
            return config_json[i].color;
          }
        }
      }
      return '#068D74';

      /*
      var state=items.state;
      if(state == 2){
        return 'red';
      }else if(state == 3 || state == 4){
        return '#afaf36';
      }else{
        return '#068D74';
      }
      */
    },
    // 显示地块位置
    showDkMap () {

      var esri = map2d.esri;
      // 加载地块数据
      ajaxApi.getFacilitiesByid(this.dk_id, (e) => {
        map2d.Util.load(["esri/symbols/PictureMarkerSymbol"]).then((argu) => {
          var PictureMarkerSymbol = argu[0];
          // 将获取地块数据
          var dkJson = JSON.parse(e.data.geometry_json);
          // 将地块数据转换为几何
          var graphic = new esri.Polygon({ rings: dkJson.rings, spatialReference: { wkid: 102100 } });
          // 几何墨卡托坐标系转换
          // graphic = esri.geometry.geographicToWebMercator( graphic );
          // 获取几何中心点
          graphic = graphic.centroid.clone();
          // 创建图标
          var symbol = new PictureMarkerSymbol(require("@/assets/img/Plan/biaoshi.png"), 32, 32);
          // 将图标添加到地图中 
          graphic = new esri.Graphic(graphic, symbol);
          map2d.Util.addGraphic(graphic, "dk_info_new", this.view);
          this.view.center = graphic.geometry.clone();
          this.view.zoom = 17;
        })
      })
    },

    goMap () {
      window.open("../map3d?base_id=" + this.$store.state.baseinfo.cur_base_id + "&selectDk=" + this.dk_id);
    },

    test (id) {
      this.switchSensorConfigVisible = true
      this.switchSensorId = id
      this.$refs.irrigate.addShow = false
      this.switchSensorConfigTab = "presetconfig";
      bus.$emit("irrigateActive", 0)
    },
    checkDeviceControl,
    parseTime,
    showTrigger (items) {
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
    cameraPhoto () {
      if (this.selectedVideo) {
        this.xc_hd_device_id = this.selectedVideo
        this.photoDialogVisible = true
      } else {
        this.$message.warning("暂无相册");
      }
    },
    loadAllLog () {
      this.$router.push({
        path: "/deviceLog",
        query: { rs_facilities_id: this.dk_id }
      });
    },
    loadDKList (dk_id) {
      this.selectedVideo = null;
      findByBs_base_id({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        order: 'ord_asc'
      }).then(res => {
        if (res.code === 200) {
          this.dkList = [];
          let cur_dk_id = "";
          if (dk_id == null || dk_id == "") {
            dk_id = res.data[0].id;
          }
          for (var i = 0; i < res.data.length; i++) {
            var dkObj = res.data[i];
            if (dkObj.id == dk_id) {
              cur_dk_id = dkObj.id;
              this.show(dk_id);
            }
            this.dkList.push(dkObj);
          }
          //如果地块id不是该基地的
          if (cur_dk_id == "") {
            this.$router.push({ path: "/dkInfo" });
            return;
          } else {
            this.dk_id = dk_id;
          }

          // 获取了地块id后 看看地图加载完成了吗？
          this.map && this.showDkMap();

        } else {
          this.$message.error(res.msg);
        }
      });
    },
    clickDK (itemId) {

      this.dk_id = itemId;
      //this.loadDKList(itemId);
      this.show(this.dk_id);
    },
    // initeCharts1 () {
    //   let rightTopEchart = echarts.init(this.$refs.rightTopEcharts);
    //   loadChartq(rightTopEchart, this.times, this.files);
    //   window.addEventListener("resize", () => {
    //     rightTopEchart.resize();
    //   });
    //   this.$forceUpdate();
    // },
    // initeCharts2 () {
    //   // this.appBoxCenterRightEchart = echarts.init(this.$refs.appBoxCenterRightEcharts, 'macarons')
    //   // this.appBoxCenterRightEchart.setOption(this.option1)
    // },
    rightTopTypeClick (item) {
      this.hd_device_id = item.hd_device_id
      const _this = this;
      _this.currentIds = [];
      this.rightTopTypeChoose = item.id;
      this.sensorList = item.sensorList;
      this.sensorList.map(v => {
        _this.currentIds.push(v.hd_device_sensor_id);
      });
      this.rightTopEchartsTypeChoose = 0;
      this.getSensorTb();
      //this.sensorList =
      // getFacilitiesDetails({ Authorization: this.fw, rs_facilities_id: this.ids }).then(res => {
      //   this.sensorList = res.data.collectSensor[index].sensorList
      //   this.rightTopEchartsTypeChoose = 0
      //   this.getSensorTb();
      // })
    },
    rightTopTypeClick1 (item, index) {
      this.rightTopTypeChoose1 = index;
      this.appBoxCenterRightEchartsTypeChoose = 0;
    },
    rightTopEchartsTypeClick (item, index) {
      this.rightTopEchartsTypeChoose = index;
      this.getSensorTb();
    },
    appBoxCenterRightEchartsTypeClick (item, index) {
      this.appBoxCenterRightEchartsTypeChoose = index;
      var id = this.nyyName[this.rightTopTypeChoose1].id;
      var name = this.nyyState[this.rightTopTypeChoose1][index].name;
      this.getDevicePropertyData(id, null, name);
    },
    getDevicePropertyData (hd_device_id, device_id, name) {
      getDevicePropertyData({
        hd_device_id: hd_device_id,
        device_id: device_id,
        time_order: 1,
        names: name,
        maxResult: 20
      }).then(res => {
        this.times1 = res.data;
        //刷新图表
        let appBoxCenterRightEchart = echarts.init(
          this.$refs.appBoxCenterRightEcharts
        );
        loadCharts(appBoxCenterRightEchart, this.times1, name);
        window.addEventListener("resize", () => {
          appBoxCenterRightEchart.resize();
        });
        this.$forceUpdate();
      });
    },
    epCtr (command) {
      controlSxt({ hd_device_id: this.nowplayercam.id, command: command }).then(
        res => {
          if (res.code === 200) {
            // 操作成功
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    captureSxtDevice () {
      captureSxtDevice({ hd_device_id: this.nowplayercam.id }).then(res => {
        if (res.code === 200) {
          this.$message.success("拍照成功");
        } else {
          this.$message.error("拍照失败");
        }
      });
    },
    // video列表被点击事件
    // videoClick (it) {
    //   this.$refs.viedeIframe.src = '/static/cam/index.html?url=' + it.url
    // },

    closeEcharts (index) {
      this.$refs.echarts[index].style.display = "none";
    },

    video_container_dbClick () {
      var a = $(this.$refs.video_container);
      if (a.hasClass("big")) {
        a.addClass("big");
      } else {
        a.removeClass("big");
      }
    },
    handleClose () {
      this.dialogVisible = false;
      if (this.sxtShow) {
        this.$refs.video.closeSxt();
      }
    },
    handelSwitch (row, scope) {
      var hd_sensor_id = row.id;
      sensorMoveSxtPreset({ hd_device_sensor_id: hd_sensor_id }).then(
        res => { }
      );
      if (row.loading) {
        return;
      }

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
    handelWindow (row, scope) {
      var hd_sensor_id = row.id;
      sensorMoveSxtPreset({ hd_device_sensor_id: hd_sensor_id }).then(
        res => { }
      );
      if (row.loading) {
        return;
      }

      var index = scope.$index;
      var obj = this.controlSensor[index];

      row.loading = true;

      handelWindow(hd_sensor_id, row.value, this.$ws)
        .then(res => {
          obj.value2 = obj.value;
          this.controlSensor.splice(index, 1, obj);

          row.loading = false;
        })
        .catch(err => {
          this.$message.error(err.msg);
          obj.value = obj.value2;
          this.controlSensor.splice(index, 1, obj);

          row.loading = false;
        });
    },
    // 控制函数
    opt (it) {
      // // 设置为请求状态禁止访问
      // it.load = true
      // this.btnLoad = true
      // if (it.status === true) {
      //   // 调整为状态
      //   openOrCloseChannel(it.id, this.$ws).then(() => {
      //     // 设置为请求状态禁止访问
      //     it.load = false
      //     this.btnLoad = false
      //   }).catch((e) => {
      //     // 设置为请求状态禁止访问
      //     it.load = false
      //     this.btnLoad = false
      //     it.status = false
      //     this.$message.error(e.msg)
      //   })
      // } else if (it.status === false) {
      //   // 调整为状态
      //   closeChannel(it.id, this.$ws).then(() => {
      //     // 设置为请求状态禁止访问
      //     it.load = false
      //     this.btnLoad = false
      //   }).catch((e) => {
      //     // 设置为请求状态禁止访问
      //     it.load = false
      //     this.btnLoad = false
      //     it.status = true
      //     this.$message.error(e.msg)
      //   })
      // }
      // this.$notify({
      //   title: it + '操作成功',
      //   type: 'success',
      //   duration: 2500
      // })
      var hd_sensor_id = it.hd_device_sensor_id;
      var oldValue = it.hd_device_sensor_value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue === "0" ? "1" : "0";

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then(res => {
          //obj.value = row.value2
          //this.sensorList.splice(index, 1, obj)
          it.hd_device_sensor_value = newValue;
          this.$refs.loading.closeLoadInstance();
        })
        .catch(err => {
          this.$message.error(err.msg);
          //obj.value2 = row.value
          //this.sensorList.splice(index, 1, obj)
          it.hd_device_sensor_value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },

    hideElement: function () {
      this.$parent.show.isshowDKInfo = false;
      this.$options.myPlayer.stop();
      this.$options.myPlayer.remove();
    },
    getSensorTb () {
      const _this = this;
      var sensor = this.sensorList[this.rightTopEchartsTypeChoose];
      if (sensor.hd_sensor_type_code !== "22") {
        this.currentID = sensor.hd_device_sensor_id;
      }
    },
    initXc (id) {
      existPhotoDevice({ rs_facilities_id: id }).then(res => {
        if (res.code === 200) {
          if (res.data.length >= 1) {
            this.xcDeviceOptions = res.data
            this.xcDevice = res.data[0]
            this.xcDeviceChange()
          }
        } else {

          this.$message.error(res.msg)
        }
      })
    },
    xcDeviceChange () {
      this.devicePictureShow = true;
      this.$refs.devicePictureCard.show(this.xcDevice.id, this.xcDevice.device_type_code);
    },
    // 根据地块id显示数据
    show (id) {

      //用于tab切换地块时，变量恢复初始状态
      this.rightTopTypeChoose = 0;
      this.rightTopEchartsTypeChoose = 0;
      const _this = this;
      this.getDK(id);
      this.getDeviceRunLogListByr_id(id, this.startPosition, this.maxResult);

      //相册
      if (id) {
        this.initXc(id)
      }

      // this.getVideo(id)
      // this.getBtn(id)
      // this.getSB(id)

      this.ids = id;

      getFacilitiesDetails({
        Authorization: this.fw,
        rs_facilities_id: id
      }).then(res => {
        if (res.data == null || res.data.facilitiesInfo == null) {
          return;
        }
        this.currentIds = [];
        this.facilitiesInfoname = res.data.facilitiesInfo.name;
        if (res.data.facilitiesInfo.bs_base_name) {
          this.bs_base_name = res.data.facilitiesInfo.bs_base_name;
          this.rs_facilities_type_name =
            res.data.facilitiesInfo.facilities_type_name;
          this.baseShow = true;
        }
        if (res.data.facilitiesInfo.bs_org_name) {
          this.bs_org_name = res.data.facilitiesInfo.bs_org_name;
          this.orgShow = true;
        }
        if (res.data.facilitiesInfo.bs_area_name) {
          this.bs_area_name = res.data.facilitiesInfo.bs_area_name;
          this.areaShow = true;
        }
        this.facilities_image_path =
          res.data.facilitiesInfo.image_path ||
          res.data.facilitiesInfo.facilities_type_image_path;
        if (res.data.nyyDevice.content) {
          this.nyyConfig = [];
          this.nyyDevice = [];
          this.nyyName = [];
          res.data.nyyDevice.content.map(ele => {
            ele.config_json = JSON.parse(ele.config_json);
            if (
              ele.config_json !== null &&
              (ele.config_json.state || ele.config_json.config)
            ) {
              this.nyyShow = true;
              this.nyyName.push(ele);
              if (ele.config_json.state) {
                this.nyyState.push(ele.config_json.state);
              } else {
                this.nyyState.push(null);
              }
              if (ele.config_json.config) {
                this.nyyConfig.push(ele.config_json.config);
              } else {
                this.nyyConfig.push(null);
              }
            } else {
              this.nyyShow = false;
            }
          });
          //config_json数据处理
          this.nyyConfig = this.nyyConfig.map(e => {
            var ary = [];
            for (var i in e) {
              ary.push({ name: i, value: e[i] });
            }
            return ary;
          });
          this.nyyState = this.nyyState.map(e => {
            var ary1 = [];
            for (var i in e) {
              ary1.push({ name: i, value: e[i] });
            }
            return ary1;
          });
          //第一次加载config_json内部数据
          if (this.nyyName.length !== 0 && this.nyyState[0] !== null) {
            this.getDevicePropertyData(
              this.nyyName[0].id,
              null,
              this.nyyState[0][0].name
            );
          }
        } else {
          this.nyyConfig = [];
          this.nyyDevice = [];
          this.nyyName = [];
        }

        if (res.data.collectSensor.length > 0) {
          res.data.collectSensor.map(items => {
            var wind = "";
            items.sensorList.map(item => {
              item.isShowValueLevel = false;
              item.config_json_obj = JSON.parse(item.config_json);
              if (item.config_json_obj == null || item.config_json_obj.length == 0) {
                item.config_json_obj = [];
                item["start_value"] = 0;
                item["end_value"] = 0;
              } else {
                item["start_value"] = item.config_json_obj[0].start_value;
                item["end_value"] = item.config_json_obj[item.config_json_obj.length - 1].end_value;
              }

              if (item.hd_sensor_type_code == "22") {
                var s = item.hd_device_sensor_value;
                if (s <= 22.5 || s >= 337.5) {
                  item.hd_device_sensor_value = "北风";
                } else if (s <= 67.5) {
                  item.hd_device_sensor_value = "东北风";
                } else if (s <= 112.5) {
                  item.hd_device_sensor_value = "东风";
                } else if (s <= 157.5) {
                  item.hd_device_sensor_value = "东南风";
                } else if (s <= 202.5) {
                  item.hd_device_sensor_value = "南风";
                } else if (s <= 247.5) {
                  item.hd_device_sensor_value = "西南风";
                } else if (s <= 292.5) {
                  item.hd_device_sensor_value = "西风";
                } else if (s <= 337.5) {
                  item.hd_device_sensor_value = "西北风";
                }
                wind = item.hd_device_sensor_id + "," + wind;
              }
              // else if (item.hd_sensor_type_code === "21") {
              //   wind = item.hd_device_sensor_id + "," + wind;
              //   _this.setAvgSensorData(item);
              // }
              else {
                _this.setAvgSensorData(item);
              }
            });
            items.wind = wind;
          });
          this.collectSensor = res.data.collectSensor;
          this.selectedDevice = this.collectSensor[0].hd_device_name;
          this.hd_device_id = res.data.collectSensor[0].hd_device_id;
          this.sensorList = res.data.collectSensor[this.rightTopTypeChoose].sensorList;
          this.sensorList.map(v => {
            _this.currentIds.push(v.hd_device_sensor_id);
          });

          this.getSensorTb();
          this.rightTopShow = true;
        } else {
          this.collectSensor = [];
          this.sensorList = [];
          this.currentIds = [];
          this.rightTopShow = false;
        }
        if (res.data.controlSensor.length > 0) {
          this.controlSensor = res.data.controlSensor;
          for (var i = 0, len = this.controlSensor.length; i < len; i++) {
            this.controlSensor[i].loading = false;
            this.controlSensor[i].value2 = this.controlSensor[i].value;
          }

          this.rightBottomShow = true;
        } else {
          this.controlSensor = [];
          this.rightBottomShow = false;
        }
        this.sxtContent = res.data.sxtDevice.content;
        this.videodata = [];
        var ary = res.data.sxtDevice.content;
        if (!ary) return;
        ary = ary.map(e => {
          var mapp = {
            id: e.id,
            name: e.name,
            communication: JSON.parse(e.communication)
          };
          return mapp;
        });

        this.videodata = ary;
        this.selectedVideo = '';
        if (ary.length > 0) {
          this.$set(this, "sxt_hd_device_id", this.videodata[0].id);
          this.$set(
            this,
            "sxt_presets",
            this.videodata[0].communication.presets
          );

          this.sxtShow = true;
          this.list.push({ type: "sxt", data: ary });
          this.$nextTick(function () {
            this.playerIdx(ary[0].id);
          });
        } else {
          this.sxtShow = false;
        }
      });

      this.dialogVisible = true;
    },
    //设置同类型传感器平均数据数组
    setAvgSensorData (item) {
      var a = this.avgSensorData;
      for (var i = 0; i <= a.length; i++) {
        if (i === a.length) {
          if (item.hd_device_sensor_value) {
            a.push({
              hd_sensor_type_name: item.hd_sensor_type_name,
              hd_sensor_type_code: item.hd_sensor_type_code,
              hd_sensor_type_unit: item.hd_sensor_type_unit,
              hd_sensor_type_image_path: item.hd_sensor_type_image_path,
              hd_sensor_type_small_image_path:
                item.hd_sensor_type_small_image_path,
              count: Number(item.hd_device_sensor_value),
              sum: 1
            });
          }
          break;
        } else if (item.hd_sensor_type_code === a[i].hd_sensor_type_code) {
          a[i].count = a[i].count + Number(item.hd_device_sensor_value);
          a[i].sum = a[i].sum + 1;
          break;
        }
      }
      this.avgSensorData = a;
    },
    optionEcharts () {
      this.getSensorTb();
    },
    // 获取地块信息
    getDK (id) {
      ajaxApi.getFacilitiesByid(id, e => {
        this.dkInfo.id = e.data.id || "/";
        this.dkInfo.name = e.data.name || "/";
        this.dkInfo.facilities_type_name = e.data.facilities_type_name || "/";
        this.dkInfo.acreage = e.data.acreage || "/";
        this.dkInfo.hd_device_num = e.data.hd_device_num || "/";
        this.dkInfo.linkman = e.data.linkman || "/";
        this.dkInfo.mobile = e.data.mobile || "/";
      });
    },

    getDeviceRunLogListByr_id (id, startPosition, maxResult) {
      ajaxApi.getDeviceRunLogListByr_id(id, startPosition, maxResult, e => {
        this.activities = [];
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
          this.activities.push(obj);
        }
        if (e.data.content.length > 0) {
          this.cgqShow = true;
        } else {
          this.cgqShow = false;
        }
      });
    },

    cgq_load_more () {
      var id = this.dkInfo.id;
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

    // 获取操作按钮列表
    getBtn (id) {
      this.btnArray = [];
      ajaxApi.getSwitchSensorsByRs_facilities_id(id, event => {
        var data = event.data;
        if (!data) return;
        var btn = data.map(e => {
          return {
            name: e.name,
            status: !!(e.value * 1),
            load: false,
            id: e.id
          };
        });
        this.btnArray = btn;
        // this.btn = btn
        btn.length && this.list.push({ type: "kzq", data: btn });
      });
    },

    // 获取视频接口
    // getVideo (id) {
    //   this.videodata = []
    //   // 调用接口
    //   ajaxApi.getLiveVideoList2(id, (event) => {
    //     var ary = event.data.content
    //     if (!ary) return
    //     ary = ary.map((e) => {
    //       var mapp = {
    //         'id': e.id,
    //         'name': e.name,
    //         'cam_tag_id': e.cam_tag_id,
    //         'communication': JSON.parse(e.communication)
    //       }
    //       return mapp
    //     })
    //     this.videodata = ary
    //     if (ary.length > 0) {
    //       this.list.push({ type: 'sxt', data: ary })
    //       this.$nextTick(function () { this.playerIdx(0) })
    //     }
    //   })
    // },

    // 获取设备信息
    getSB (id) {
      this.cgq = [];
      ajaxApi.getValueSensorsByRs_facilities_id(id, event => {
        var data = event.data;
        var ary = [];
        for (var i in data) {
          var it = data[i];
          var sb = ary.find(e => {
            return e.name === it.hd_device_name;
          });
          if (!sb) {
            sb = {
              name: it.hd_device_name,
              id: it.hd_device_id,
              device: it.device,
              sb: []
            };
            ary.push(sb);
          }
          sb.sb.push(it);
        }
        this.cgqs = ary;
        this.cgq = ary[0] || {};
      });
    },

    // 播放视频
    playerIdx (id) {
      if (id) {
        this.selectedVideo = id;
        for (let i = 0; i < this.videodata.length; i++) {
          if (id === this.videodata[i].id) {
            this.$set(
              this,
              "sxt_presets",
              this.videodata[i].communication.presets
            );
            break;
          }
        }
        this.$set(this, "sxt_hd_device_id", id);
        this.sxtShow = true;
      }
    }
  }
};
</script>

<style>
.app_info .esriSimpleSlider {
  display: none;
}
.esri-zoom.esri-widget {
  display: none;
}
.esri-component.esri-attribution.esri-widget {
  display: none;
}
</style>

<style>
.right_top_data .warnicon {
  display: none;
}
.right_top_data:hover .warnicon {
  display: block;
}
</style>

<style lang="stylus" scoped>
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
  height calc(100% - 303px)
  width 100%
  color #000000

.app_info .btn_model
  height 170px

.app_info .video_model1
  height 300px

.app_info .info_model
  height 300px

.app_info .cgq_model
  height calc(100% - 300px)
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
  padding-left 10px

.row_centent
  color #000000
  padding-left 5px

.row_centent_img
  width 15px
  height 15px
  margin-left 3px

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

.rightTopEchartsTypeConditionClass
  width 95px

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
  height 256px
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
  overflow auto
  clear both

.cgq_model_div::-webkit-scrollbar
  /* 滚动条整体样式 */
  width 0px /* 高宽分别对应横竖滚动条的尺寸 */
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
  width 50%
  height 100%

.flex
  display flex
  align-items center

.goMap:hover .goMapCover
  display block

.goMapCover
  display none
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background #000000A8
  z-index 22
  cursor pointer

.goMapCoverText
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
  padding 8px
  color #ffffff
  border solid 1px #fff
  border-radius 4px
</style>
