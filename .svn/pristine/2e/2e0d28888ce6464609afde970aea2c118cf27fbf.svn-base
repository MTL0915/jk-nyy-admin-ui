<template>
  <div style="overflow-y:aotu">
    <div style="position: absolute;top: 20px;width: 100%;height: 45px;padding-left:20px;padding-right: 20px;">
      <div style="float: left;padding-left:70px;padding-top:6px;width: calc(100% - 160px);display: flex;overflow: auto;">
        <el-button-group style="display: flex;overflow: auto;">
          <el-button
            size="mini"
            :type="item.buttonType"
            v-for="(item, index) in dkList"
            :key="index"
            @click="clickDK(item)"
          >{{ item.name }}</el-button>
        </el-button-group>
      </div>
      <div style="float:right;margin-right: 33px;line-height: 45px;">
        <a
          style="color:#5b5bca"
          href="javascript:window.history.back()"
        >返回</a>
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
            <img
              :src="urls + facilities_image_path"
              style="width:260px;height:140px;margin-left: 5px"
            />

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
                <!-- <span>种植面积</span>
              <span class="row_val">{{ dkInfo.acreage }}</span> -->
                <i
                  class="el-icon-position row_centent_img"
                  style="font-size:15px;color:#333;"
                ></i>
                <span class="row_centent">{{ bs_base_name }}</span>
              </div>
              <div
                class="model_content_row"
                v-if="orgShow"
              >
                <!-- <span>管理人员</span>
              <span class="row_val">{{ dkInfo.linkman }}</span> -->
                <i
                  class="el-icon-data-analysis row_centent_img"
                  style="font-size:15px;color:#333;"
                ></i>
                <span class="row_centent">{{ bs_org_name }}</span>
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
            >设备运行状态</div>
            <!-- 地块日志 -->
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
                  @click="cgq_load_more"
                >加载更多>></span>
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
            <div v-show="videodata.length > 0">
              <div class="videoIframeClass">
                <iframe
                  ref="video"
                  :src="
                    '/sxt?hd_device_id=' + sxt_hd_device_id + '&playWay=play'
                  "
                  style="width:100%;height:100%"
                />
                <!-- <sxt
                  ref="sxt"
                  :hd_device_id="sxt_hd_device_id"
                /> -->
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
          <div
            class="model right_top_model"
            style="position: relative;min-height: calc(100% - 305px);height: auto;"
          >
            <div class="model_name">采集数据</div>
            <div style="position: absolute;top: 8px;right: 10px;">
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
              <!-- <el-select
                @change="optionEcharts()"
                class="rightTopEchartsTypeConditionClass"
                size="mini"
                v-model="optirightTopEchartsTypeConditiononsValue"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in rightTopEchartsTypeCondition"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select> -->
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
              style="display: flex;height:calc(100% - 20px);align-content:flex-start;flex-wrap: wrap;"
            >
              <div
                class="mini_box"
                style="margin:10px;"
              >
                <div
                  v-for="(items, index) in sensorList"
                  :key="index"
                  class="right_top_data"
                  :style="
                    index === rightTopEchartsTypeChoose
                      ? 'background: #cfffff'
                      : 'background: #ffffff'
                  "
                >
                  <div
                    style="display:flex;color:#455a64;padding-top: 12px;"
                    @click="rightTopEchartsTypeClick(items, index)"
                  >
                    <img
                      class="right_top_data_img"
                      :src="urls + items.hd_sensor_type_small_image_path"
                    />
                    <div style="width: auto;text-align: center;margin:auto;position:relative">
                      <p
                        style="font-size: 16px;margin:0 auto;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: auto;"
                        :style="{
                          color:
                            items.state == 2
                              ? 'red'
                              : items.state == 3 || items.state == 4
                              ? '#e2e200'
                              : '#068D74'
                        }"
                      >
                        {{ items.hd_device_sensor_value }}
                        {{ items.sensor_type_unit }}
                      </p>
                      <span style="font-size:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: auto;">{{ items.hd_device_sensor_name }}</span>
                      <img
                        v-show="items.state == 2"
                        src="@/assets/img/warn.png"
                        style="position:absolute;top:10px;right:-22px;width:15px;height:15px"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div
                  v-for="(items, index) in sensorList"
                  :key="index"
                  :class="
                    rightTopEchartsTypeChoose == index
                      ? 'right_top_data_active'
                      : 'right_top_data'
                  "
                  class="right_top_data"
                  @click="rightTopEchartsTypeClick(item, index)"
                >
                  <div
                    style="display:flex;color:#FFFFFF;padding-top: 6px;"
                    :title="items.hd_device_sensor_name"
                  >
                    <img
                      class="right_top_data_img"
                      :src="urls + items.hd_sensor_type_small_image_path"
                      v-show="items.hd_sensor_type_small_image_path != null"
                    />
                    <div
                      style="margin-left:5px;width: 58px;text-align: center;position:relative"
                    >
                      <div
                        style="font-size: 13px;margin:0 auto;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display: inline-block;width: 70px;"
                        :style="{
                          color:
                            items.state == 2
                              ? 'red'
                              : items.state == 3 || items.state == 4
                              ? 'yellow'
                              : '#fff'
                        }"
                      >
                        {{ items.hd_device_sensor_value }}
                        {{ items.hd_sensor_type_unit }}
                      </div>
                      <div
                        style="font-size:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: 70px;display: inline-block;"
                      >
                        {{ items.hd_device_sensor_name }}
                      </div>
                      <img
                        v-show="items.state == 2"
                        src="@/assets/img/warn.png"
                        style="position:absolute;top:10px;right:-18px;width:15px;height:15px"
                      />
                    </div>
                  </div>
                </div> -->
              </div>

              <sensorEcharts
                style="padding-top:5px;height:calc(100% - 126px);width:100%"
                v-if="currentID"
                :ids="currentIds.join(',')"
                :currentID="currentID"
                :mobilePlatform="false"
              />

              <!-- <div
                ref="rightTopEcharts"
                style="padding-top:5px;width: 100%;height:calc(100% - 126px);"
              ></div> -->
            </div>
          </div>
        </div>
      </div>

      <!--
      <div class="app_box_center" v-show="nyyShow">
        <div class="app_box_bottom_left">
          <div style="display: flex;">
            <div
              @click="rightTopTypeClick1(item, index)"
              v-for="(item, index) in nyyName"
              :style="{ background: rightTopTypeChoose1 === index ? '#4FA9D8' : '', color: rightTopTypeChoose1 === index ? '#fff' : '' }"
              class="right_top_type"
              :key="index"
            >
              <div>{{ item.name }}</div>
            </div>
          </div>

          <div style="display:flex;">
            <div>
              <div class="app_box_bottom_left_div1" v-for="(itemn, index) in nyyConfig" :key="index">
                <div v-for="(it, i) in itemn" :key="i">
                  <p>{{ it.value.chinesename }}</p>
                  <span>{{ it.value.value }}{{ it.value.unit }}</span>
                </div>
              </div>
            </div>
            <div class="app_box_center_right">
              <div style="display: flex;justify-content: center;" v-for="(itemt, index) in nyyState" :key="index">
                <div
                  v-for="(itt, i) in itemt"
                  :key="i"
                  @click="appBoxCenterRightEchartsTypeClick(itt, i)"
                  :style="{ background: appBoxCenterRightEchartsTypeChoose === i ? '#31BFA6' : '', color: appBoxCenterRightEchartsTypeChoose === i ? '#fff' : '' }"
                  class="app_box_center_right_echartsType"
                >
                  <div>{{ itt.value.chinesename }}</div>
                </div>
              </div>
              <div ref="appBoxCenterRightEcharts" :style="{ height: '170px', width: '100%' }" style="padding-top:5px" />
            </div>
          </div>
        </div>
      </div>
      -->
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
  </div>
</template>

<script>
import {
  openChannel,
  closeChannel,
  openOrCloseChannel
} from "@/utils/websocket_util.js";
import { getToken } from "@/utils/auth";
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
  selectSensorData2
} from "@/api/equip";
import { baseList } from "@/api/baseinfo";
import { findByBs_base_id } from "@/api/rs_facilities";
import { loadChartq } from "./chart/qxzchart";
import { loadCharts } from "./chart/serchart";
import loading from "@/components/loading";
import sxt from "@/views/base/video/module/Sxt";
import sensorEcharts from "@/views/sensorEcharts";
import checkDeviceControl from "@/utils/device_permission";
// this.even_par(this.dom.find(".data .par")[0]);
export default {
  name: "DkInfoNew",
  myPlayer: null,
  components: {
    CameraPhoto,
    loading,
    sxt,
    sensorEcharts
  },
  props: {
    modelColor: {
      type: String,
      default: "#333a4c"
    }
  },
  data () {
    return {
      currentIds: [],
      currentID: null,
      baseShow: false,
      orgShow: false,
      areaShow: false,
      sxtShow: false,
      dialogVisible: false,
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
      photoDialogVisible: false,
      xc_hd_device_id: null,
      btn: [
        {
          name: "测试按钮1",
          status: false,
          load: false,
          id: "4028b8816e43841c016e4385c2390002"
        }
      ],
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
      //   {
      //   title: '开关',
      //   content: '支持使用图标',
      //   date: '2018-04-12 20:46',
      //   src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590560068118&di=ca0f053e630dc7d6d10d6277e4a2907d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F32%2F98573cf75c3bf04.jpg',
      //   icon: 'el-icon-more',
      //   color: '#ff0000'
      // }, {
      //   title: '开关',
      //   content: '支持使用图标',
      //   date: '2018-04-12 20:46',
      //   src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590560068118&di=ca0f053e630dc7d6d10d6277e4a2907d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F32%2F98573cf75c3bf04.jpg',
      //   icon: 'el-icon-more',
      //   color: '#ff00ff'
      // }, {
      //   title: '开关',
      //   content: '支持使用图标',
      //   date: '2018-04-12 20:46',
      //   src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590560068118&di=ca0f053e630dc7d6d10d6277e4a2907d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F32%2F98573cf75c3bf04.jpg',
      //   icon: 'el-icon-more',
      //   color: '#00ff00'
      // }, {
      //   title: '开关',
      //   content: '支持使用图标',
      //   date: '2018-04-12 20:46',
      //   src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590560068118&di=ca0f053e630dc7d6d10d6277e4a2907d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F32%2F98573cf75c3bf04.jpg',
      //   icon: 'el-icon-more',
      //   color: '#ffff00'
      // }]
    };
  },
  updated (a, b, c, d) {
    console.log(this.list);
  },
  computed: {
    ...mapGetters(["id", "token", "user"])
  },
  created () {
  },
  mounted () {
    var dk_id = this.$route.query.id;
    this.loadDKList(dk_id);
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
    checkDeviceControl,
    parseTime,
    cameraPhoto () {
      if (this.selectedVideo) {
        this.xc_hd_device_id = this.selectedVideo;
        this.photoDialogVisible = true
      } else {
        this.$message.warning("暂无相册");
      }
    },
    loadDKList (dk_id) {
      findByBs_base_id({
        bs_base_id: this.$store.state.baseinfo.cur_base_id
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
              dkObj["buttonType"] = "primary";
              this.show(dk_id);
            }
            this.dkList.push(dkObj);
          }
          if (cur_dk_id == "") {
            this.dkList[0]["buttonType"] = "primary";
            this.show(res.data[0].id);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    clickDK (item) {
      //this.$router.push({ path: '/dkInfo', query: { id: item.id } })
      this.loadDKList(item.id);
    },
    initeCharts1 () {
      let rightTopEchart = echarts.init(this.$refs.rightTopEcharts);
      loadChartq(rightTopEchart, this.times, this.files);
      window.addEventListener("resize", () => {
        rightTopEchart.resize();
      });
      this.$forceUpdate();
    },
    initeCharts2 () {
      // this.appBoxCenterRightEchart = echarts.init(this.$refs.appBoxCenterRightEcharts, 'macarons')
      // this.appBoxCenterRightEchart.setOption(this.option1)
    },
    rightTopTypeClick (item) {
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
        this.$refs.sxt.closeSxt();
      }
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
    handelWindow (row, scope) {
      if (row.loading) {
        return;
      }

      var hd_sensor_id = row.id;

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
      //
      // if (
      //   sensor.hd_sensor_type_code === "21" ||
      //   sensor.hd_sensor_type_code === "22"
      // ) {
      //   selectSensorData2({
      //     sensor_ids: this.collectSensor[this.rightTopTypeChoose].wind,
      //     group_type: this.rightTopEchartsTypeCondition[
      //       this.optirightTopEchartsTypeConditiononsValue
      //     ].type,
      //     interval: this.rightTopEchartsTypeCondition[
      //       this.optirightTopEchartsTypeConditiononsValue
      //     ].num
      //   }).then(res => {
      //     //时间处理
      //     var dataName =
      //       this.optirightTopEchartsTypeConditiononsValue === 0
      //         ? "data"
      //         : "avg_data";
      //     var dd = res.data.timestamp.map(v => {
      //       var t = _this.parseTime(v);
      //       if (_this.optirightTopEchartsTypeConditiononsValue === 0) {
      //         t = t.substring(11, 16);
      //       }
      //       if (_this.optirightTopEchartsTypeConditiononsValue === 1) {
      //         t = t.substring(11, 13);
      //       }
      //       //近7天
      //       else if (_this.optirightTopEchartsTypeConditiononsValue === 2) {
      //         t = t.substring(5, 10);
      //       }
      //       //近30天
      //       else if (_this.optirightTopEchartsTypeConditiononsValue === 3) {
      //         t = t.substring(5, 10);
      //       }
      //       return t;
      //     });
      //     //风力风向处理
      //     var files = [];
      //     var windDirection = [];
      //     res.data.sensor.map(v => {
      //       if (v.hd_sensor_type_code === "21") {
      //         if (dataName === "data") {
      //           files.push({
      //             hd_device_sensor_name: v.hd_device_sensor_name,
      //             data: v[dataName],
      //             hd_sensor_type_unit: v.hd_sensor_type_unit
      //           });
      //         } else {
      //           files.push({
      //             hd_device_sensor_name: v.hd_device_sensor_name,
      //             avg_data: v[dataName],
      //             hd_sensor_type_unit: v.hd_sensor_type_unit
      //           });
      //         }
      //       } else if (v.hd_sensor_type_code === "22") {
      //         v[dataName].map(s => {
      //           if (s) {
      //             s = Number(s);
      //             if (s <= 22.5 || s >= 337.5) {
      //               windDirection.push("北");
      //             } else if (s <= 67.5) {
      //               windDirection.push("东北");
      //             } else if (s <= 112.5) {
      //               windDirection.push("东");
      //             } else if (s <= 157.5) {
      //               windDirection.push("东南");
      //             } else if (s <= 202.5) {
      //               windDirection.push("南");
      //             } else if (s <= 247.5) {
      //               windDirection.push("西南");
      //             } else if (s <= 292.5) {
      //               windDirection.push("西");
      //             } else if (s <= 337.5) {
      //               windDirection.push("西北");
      //             }
      //           } else {
      //             windDirection.push(s);
      //           }
      //         });
      //       }
      //     });
      //     //初始化Echarts
      //     setTimeout(function() {
      //       let rightTopEchart = echarts.init(_this.$refs.rightTopEcharts);
      //       loadChartq(rightTopEchart, dd, files, windDirection, dataName);
      //       window.addEventListener("resize", () => {
      //         rightTopEchart.resize();
      //       });
      //       _this.$forceUpdate();
      //     }, 500);
      //   });
      // } else {
      //   selectSensorData2({
      //     sensor_ids: this.sensorList[this.rightTopEchartsTypeChoose]
      //       .hd_device_sensor_id,
      //     group_type: this.rightTopEchartsTypeCondition[
      //       this.optirightTopEchartsTypeConditiononsValue
      //     ].type,
      //     interval: this.rightTopEchartsTypeCondition[
      //       this.optirightTopEchartsTypeConditiononsValue
      //     ].num
      //   }).then(res1 => {
      //     var dataName =
      //       this.optirightTopEchartsTypeConditiononsValue === 0
      //         ? "data"
      //         : "avg_data";
      //     var dd = res1.data.timestamp.map(v => {
      //       var t = _this.parseTime(v);
      //       if (_this.optirightTopEchartsTypeConditiononsValue === 0) {
      //         t = t.substring(11, 16);
      //       }
      //       if (_this.optirightTopEchartsTypeConditiononsValue === 1) {
      //         t = t.substring(11, 13);
      //       }
      //       //近7天
      //       else if (_this.optirightTopEchartsTypeConditiononsValue === 2) {
      //         t = t.substring(5, 10);
      //       }
      //       //近30天
      //       else if (_this.optirightTopEchartsTypeConditiononsValue === 3) {
      //         t = t.substring(5, 10);
      //       }
      //       return t;
      //     });
      //     //初始化Echarts
      //     setTimeout(function() {
      //       let rightTopEchart = echarts.init(_this.$refs.rightTopEcharts);
      //       loadChartq(rightTopEchart, dd, res1.data.sensor, null, dataName);
      //       window.addEventListener("resize", () => {
      //         rightTopEchart.resize();
      //       });
      //       _this.$forceUpdate();
      //     }, 500);
      //   });
      // }
    },
    // 根据地块id显示数据
    show (id) {
      const _this = this;
      this.getDK(id);
      this.getDeviceRunLogListByr_id(id, this.startPosition, this.maxResult);

      // this.getVideo(id)
      // this.getBtn(id)
      // this.getSB(id)
      this.ids = id;
      getFacilitiesDetails({
        Authorization: this.fw,
        rs_facilities_id: id
      }).then(res => {
        this.facilitiesInfoname = res.data.facilitiesInfo.name;
        if (res.data.facilitiesInfo.bs_base_name) {
          this.bs_base_name = res.data.facilitiesInfo.bs_base_name;
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
          this.sensorList =
            res.data.collectSensor[this.rightTopTypeChoose].sensorList;
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
            communication: JSON.parse(e.communication).url.hd.hls
          };
          return mapp;
        });

        this.videodata = ary;
        if (ary.length > 0) {
          this.$set(this, "sxt_hd_device_id", this.videodata[0].id);
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

    setSB () {
      var id = this.selectSB_id;
      var cgq = this.cgqs.find(e => {
        return e.id === id;
      });
      this.cgq = cgq || {};
    },

    // 播放视频
    playerIdx (id) {
      if (id) {
        this.selectedVideo = id;

        this.$set(this, "sxt_hd_device_id", id);
        this.sxtShow = true;
        this.$nextTick(() => {
          this.$refs.sxt.initSxt();
        });
      }
    },

    goCameraVision () {
      let cam;
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index];
        if (element.type === "sxt") {
          cam = element.data[this.videoActiveIdx];
          break;
        }
      }

      const config = cam.communication.config;
      if (
        config.deviceSerial &&
        config.username &&
        config.password &&
        config.ip &&
        config.service_port
      ) {
        window.open(
          process.env.VIDEO_URL +
          "/#/index?token=" +
          getToken() +
          "&id=" +
          cam.id
        );
        // this.$router.push("http://192.168.33.181:8123/#/index?token="+getToken())
      } else {
        alert("该摄像头必须具有[序列号], [用户名], [密码], [IP], [服务端口]!");
      }
    }
  }
};
</script>

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
  min-width 130px
  flex 1
  height 65px
  border 1px solid #00ffe5

.right_top_data_img
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
  width 50%
  height 100%

.flex
  display flex
  align-items center
</style>
