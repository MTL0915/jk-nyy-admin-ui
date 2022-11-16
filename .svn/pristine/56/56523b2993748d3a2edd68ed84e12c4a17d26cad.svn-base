<template>
  <div>
    <eHeader
      ref="eHeader"
      :query="query"
      :sup_this="sup_this"
    />
    <el-card shadow="never">
      <div
        class="flex bottom-content"
        style="text-align: left;"
      />
      <div
        v-if="vstate"
        id="bodyDiv"
        style="width:100%;height:100%;"
      >
        <el-row>
          <el-col
            v-for="(item, index) in data"
            :key="index"
            :span="8"
          >
            <div style="position:relative;height:400px;margin:1px;border:1px solid #000;background: #eeeeee;">
              <sxtifram
                :ref="'video' + item.id"
                playWay="play"
                :hd_device_id="item.id"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-table
          v-show="showList"
          ref="multipleTable"
          :data="data"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="rs_facilities_name"
            label="所在地块"
          />
          <el-table-column
            prop="name"
            label="设备名称"
            min-width="140"
          />
          <el-table-column
            prop="device_id"
            label="设备编号"
            min-width="140"
          />
          <el-table-column
            label="摄像头序列号"
            min-width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.deviceSerial }}
            </template>
          </el-table-column>
          <el-table-column label="通道号">
            <template slot-scope="scope">
              {{ scope.row.channel }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="流量汇总">
            <template slot-scope="scope">
              {{ conver(scope.row.allFlowCount) }}
            </template>
          </el-table-column> -->
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.state === 1 || scope.row.state === null"
                type="success"
              >正常</el-tag>
              <el-tag
                :title="scope.row.errorMsg"
                v-else-if="scope.row.state === 0"
                type="danger"
              >离线</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="left"
            width="400"
          >
            <template slot-scope="scope">
              <!-- <el-dropdown
                v-if="scope.row.state === 1 || scope.row.state === null" -->
              <el-dropdown
                split-button
                size="mini"
                type="primary"
                @click="handlePlay(scope.row, 'play')"
              >
                播放
                <!-- 列表 -->
                <el-dropdown-menu slot="dropdown">
                  <el-button
                    v-if="scope.row.type === 'JK-SXT' || scope.row.type === 'JK-SXT5'"
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="yingshiSecurityPlay(scope.row)"
                  >萤石云安防播放器</el-button>
                  <el-button
                    v-if="scope.row.type === 'JK-SXT' || scope.row.type === 'JK-SXT5'"
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'sd-ezopen')"
                  >萤石云播放器(流畅)</el-button>
                  <el-button
                    v-if="scope.row.type === 'JK-SXT' || scope.row.type === 'JK-SXT5'"
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'hd-ezopen')"
                  >萤石云播放器(高清)</el-button>
                  <el-button
                    v-if="
                      scope.row.type === 'JK-SXT' ||
                        scope.row.type === 'JK-SXT2' ||
                        scope.row.type === 'JK-SXT3' ||
                        scope.row.type === 'JK-SXT4' ||
                       scope.row.type === 'JK-SXT5'
                    "
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'sd-hls')"
                  >Html播放器(流畅)</el-button>
                  <el-button
                    v-if="
                      scope.row.type === 'JK-SXT' ||
                        scope.row.type === 'JK-SXT2' ||
                        scope.row.type === 'JK-SXT3' ||
                        scope.row.type === 'JK-SXT4' ||
                        scope.row.type === 'JK-SXT5'
                    "
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'hd-hls')"
                  >Html播放器(高清)</el-button>

                  <el-button
                    v-if="scope.row.type === 'JK-SXT2'"
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'sd-cj')"
                  >海康插件播放器(流畅)</el-button>
                  <el-button
                    v-if="scope.row.type === 'JK-SXT2'"
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'hd-cj')"
                  >海康插件播放器(高清)</el-button>

                  <el-button
                    v-if="
                      scope.row.type === 'JK-SXT' ||
                        scope.row.type === 'JK-SXT3' ||
                        scope.row.type === 'JK-SXT5'
                    "
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'sd-rtmp')"
                  >Flash播放器(流畅)</el-button>
                  <el-button
                    v-if="
                      scope.row.type === 'JK-SXT' ||
                        scope.row.type === 'JK-SXT3' ||
                        scope.row.type === 'JK-SXT5'
                    "
                    style="display:block;margin-left:5px;margin-top:3px;"
                    @click="handlePlay(scope.row, 'hd-rtmp')"
                  >Flash播放器(高清)</el-button>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                size="mini"
                type="primary"
                style="margin-left:10px"
                @click="cameraPhoto(scope.row)"
              >相册</el-button>
              <template>
                <el-dropdown
                  split-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.row)"
                  @command="handleCommand($event, scope.row)"
                  v-if="checkDeviceControl(scope.row.id)"
                >
                  配置
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="checkDeviceControl(scope.row.id)"
                      command="timingPhoto"
                    >定时拍照设置</el-dropdown-item>
                    <el-dropdown-item
                      v-if="checkDeviceControl(scope.row.id)"
                      command="recognitionPhoto"
                    >拍照识别设置</el-dropdown-item>
                    <el-dropdown-item
                      command="videoRec"
                      v-if="scope.row.type === 'JK-SXT'"
                    >观看录像</el-dropdown-item>
                    <el-dropdown-item
                      command="videoAddress"
                      v-if="scope.row.type === 'JK-SXT'"
                    >视频地址</el-dropdown-item>
                    <!-- <el-dropdown-item
                      command="sxtTraffic"
                      v-if="scope.row.type === 'JK-SXT'"
                    >查询流量</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button
                  v-if="checkDeviceControl(scope.row.id)"
                  size="mini"
                  type="danger"
                  @click="handelDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 删除提示框 -->
      <el-dialog
        :visible.sync="delVisible"
        append-to-body
        title="提示"
        width="300px"
        center
      >
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="deleteRow"
            :loading="deleteSxtDeviceLoading"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!--分页组件-->
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        style="margin-top: 8px;"
        layout="total, prev, pager, next"
        @current-change="pageChange"
      />
    </el-card>
    <div
      v-if="!showList"
      class="flex"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
      >
        <video-play :value="item" />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="false"
      title="视频播放"
      @close="closeSxt"
      width="900px"
    >
      <div style="height:500px;">
        <sxtifram
          v-if="dialogVisible"
          ref="sxt"
          :deviceinfo="item"
          :hd_device_id="sxt_hd_device_id"
          :device_id="sxt_device_id"
          :playWay="sxt_playWay"
        />
      </div>
    </el-dialog>
    <videoAddEdit
      ref="videoAddEdit"
      :sup_this="sup_this"
    />
    <!-- <VideoEdit ref="yingShiEdit" :play="dialogVisible" :video-address="videoAddress" :row="childRow" @upDateData="init"/> -->
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
    <el-dialog
      :visible.sync="configInfoVisible"
      title="关联用户配置"
      append-to-body
    >
      <configInfo
        ref="configInfo"
        :show-phone-note="false"
      />
    </el-dialog>
    <timingPhoto ref="timingPhoto" />
    <el-dialog
      v-if="recognitionPhotoVisible"
      :visible.sync="recognitionPhotoVisible"
      title="拍照识别设置"
      append-to-body
      width="30%"
    >
      <recognitionPhoto
        :hd_device_id="rowId"
        ref="recognitionPhoto"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="videoAddressDialogVisible"
      title="视频地址"
      append-to-body
    >
      <videoAddress ref="videoAddress" />
    </el-dialog>
    <el-dialog
      :visible.sync="videoRecDialogVisible"
      title="录像列表"
      append-to-body
    >
      <el-date-picker
        v-model="videoRecDay"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="录像时间范围"
      >
      </el-date-picker>
      <el-button
        type="primary"
        @click="getVideoRecList()"
      >
        查询
      </el-button>
      <el-table
        :data="videoRecList"
        height="500"
        v-loading="videoRecLoading"
      >
        <el-table-column
          prop="startTime"
          label="开始时间"
        />
        <el-table-column
          prop="endTime"
          label="结束时间"
        />
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="viewVideoRec(scope.row, 'hd')"
            >
              高清
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="viewVideoRec(scope.row, 'sd')"
            >
              标清
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      :visible.sync="yingshiSecurityPlayVisible"
      v-if="yingshiSecurityPlayVisible"
      append-to-body
      width="1000px"
    >
      <yingshiSecurityPlay
        :hd_device_id="sxt_hd_device_id"
        :device_id="sxt_device_id"
        :yingshiBegin="yingshiBegin"
        :yingshiEnd="yingshiEnd"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="sxtTrafficDialogVisible"
      append-to-body
      width="1500px"
    >
      <sxtTraffic
        v-if="sxtTrafficDialogVisible"
        ref="sxtTraffic"
        :hd_device_id="sxt_hd_device_id"
      />
    </el-dialog>
  </div>
</template>

<script>
//import initData from '@/mixins/initData'
import { mapGetters } from "vuex";
// import vPlay from './module/Video'
import sxt from "./module/Sxt";
import sxtifram from "./module/Sxt_ifram";
import videoAddEdit from "./module/videoAddEdit";
import CameraPhoto from "./module/CameraPhoto";
import timingPhoto from "./module/timingPhoto";
import recognitionPhoto from './module/recognitionPhoto';
import eHeader from "./module/header";
import {
  deleteSxtDevice,
  getYingShiToken,
  getSxtList,
  videoRecList
} from "@/api/sxt";
import configInfo from "@/views/base/equip/module/configInfo";
import checkDeviceControl from "@/utils/device_permission";
import { formatDate } from "@/utils/date";
import yingshiSecurityPlay from "./module/YingshiSecurityPlay";
import videoAddress from "./module/videoAddress";
import sxtTraffic from "./module/sxtTraffic";

export default {
  name: "VideoContent",
  components: {
    configInfo,
    eHeader,
    // vPlay,
    sxt,
    sxtifram,
    videoAddEdit,
    CameraPhoto,
    timingPhoto,
    recognitionPhoto,
    videoAddress,
    yingshiSecurityPlay,
    sxtTraffic
  },
  //mixins: [initData],
  data () {
    return {
      rowId: null,
      recognitionPhotoVisible: false,
      sxtTrafficDialogVisible: false,
      videoAddressDialogVisible: false,
      videoRecLoading: false,
      videoRecDialogVisible: false,
      videoRecList: [],
      videoRecDay: this.getNow(),
      yingshiSecurityPlayVisible: false,
      yingshiAddress: null,
      yingshiToken: null,
      yingshiBegin: null,
      yingshiEnd: null,
      nowPlay: null,
      query: {},
      data: [],
      sxt_hd_device_id: "",
      sxt_device_id: "",
      sxt_communication: null,
      sxt_playWay: null,
      vstate: false, //false列表 true九宫格
      idx: 0,
      delVisible: false,
      deviceId: null,
      sup_this: this,
      dialogVisible: false,
      configInfoVisible: false,
      photoDialogVisible: false,
      videoAddress: "",
      childRow: {},
      icon: "el-icon-menu",
      xc_hd_device_id: null,
      showList: true,
      page: 1, // 当前页
      total: 0,
      pageSize: 9,
      whetherOnline: this.vstate ? true : null, //true成功上云 false未成功上云
      // orgId: null,
      // baseId: null,
      // facilitiesId: null,
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      },
      deleteSxtDeviceLoading: false,//删除摄像头loading
    };
  },
  computed: {
    ...mapGetters(["id"])
  },
  activated: function () {
    // this.init().then(data => {
    //   if (this.vstate) { // 九宫格时,获取默认流地址
    //     this.getDefaultUrl(data)
    //   }
    // })
    this.$refs.eHeader.getFacilitiesList();
  },
  created () {
    this.init();
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.init()
    // })
  },
  methods: {
    conver (limit) {
      if (!limit) {
        limit = 0
      }
      var size = "";
      if (limit < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    yingshiSecurityPlay (row) {
      this.sxt_hd_device_id = row.id
      this.sxt_device_id = row.device_id
      this.yingshiSecurityPlayVisible = true
    },
    getNow () {
      let a = [];
      a.push(formatDate(new Date(), "yyyy-MM-dd") + " 00:00:00");
      a.push(formatDate(new Date(), "yyyy-MM-dd") + " 23:59:59");
      return a;
    },
    //观看录像
    viewVideoRec (row, definition) {
      getYingShiToken().then(res => {
        if (res.code === 200) {
          this.yingshiAddress =
            "ezopen://" +
            this.sxt_communication.config.validateCode +
            "@open.ys7.com/" +
            this.sxt_communication.config.deviceSerial +
            "/" +
            this.sxt_communication.config.channel +
            (row.recType === 2 ? ".local" : ".cloud") +
            ".rec";
          this.yingshiToken = res.data;
          this.yingshiBegin = row.startTime;
          this.yingshiEnd = row.endTime;
          this.yingshiSecurityPlayVisible = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    checkDeviceControl,
    // getUrlError () {
    //   this.$set(this, 'sxt_hd_device_id', '')
    //   this.$set(this, 'sxt_device_id', '')
    //   this.dialogVisible = false
    // },
    handleCommand (command, row) {
      this.rowId = row.id
      this.sxt_communication = JSON.parse(row.communication);
      if (command === "configInfo") {
        this.configInfoVisible = true;
        this.$refs.configInfo.getList(row.id);
      } else if (command === "timingPhoto") {
        let timeinterval = 0;
        let date = new Date();
        let cj = JSON.parse(row.communication);
        if (cj.timing) {
          timeinterval = cj.timing.timeinterval;
        }
        if (cj.timing && cj.timing.startTimestamp) {
          date = new Date(cj.timing.startTimestamp);
        }
        this.$refs.timingPhoto.show(row.id, timeinterval, date);
      } else if (command === 'recognitionPhoto') {
        this.recognitionPhotoVisible = true
      } else if (command === "videoRec") {
        this.sxt_hd_device_id = row.id;
        this.getVideoRecList();
      } else if (command === "videoAddress") {
        this.videoAddressDialogVisible = true;
        this.$nextTick(() => {
          this.$refs.videoAddress.init(this.sxt_communication);
        });
      } else if (command === "sxtTraffic") {
        this.sxtTrafficDialogVisible = true;
        this.sxt_hd_device_id = row.id;
        this.$nextTick(() => {
          this.$refs.sxtTraffic.init();
        });
      }
    },
    getVideoRecList () {
      if (!this.videoRecDay) {
        this.videoRecDay = this.getNow();
      }
      this.videoRecDialogVisible = true;
      this.videoRecLoading = true;
      videoRecList({
        hd_device_id: this.sxt_hd_device_id,
        startTime: this.videoRecDay[0],
        endTime: this.videoRecDay[1]
      }).then(res => {
        this.videoRecLoading = false;
        if (res.code === 200) {
          this.videoRecList = res.data;
          this.$message.success("查询成功!");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 翻页
    async pageChange (val) {
      this.page = val;
      this.init();
      // await this.init().then(data => {
      //   this.getDefaultUrl(data.data.contepnt)
      // })
    },
    init () {
      const query = this.query;
      const keyword = query.keyword;
      const rs_facilities_id = query.rs_facilities_id;
      getSxtList({
        page: this.page,
        size: this.pageSize,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: rs_facilities_id,
        whetherOnline: this.whetherOnline,
        keyword: keyword
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.totalElements;
          this.data = res.data.content;
          const _this = this;
          this.data.forEach(sxt => {
            const comm_json = JSON.parse(sxt.communication);
            sxt.type = comm_json.type;
            sxt.deviceSerial = comm_json.config.deviceSerial;
            sxt.channel = comm_json.config.channel;
            if (comm_json.errorMsg) {
              sxt.errorMsg = comm_json.errorMsg;
            }
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 点击播放
    handlePlay (row, playWay) {
      if (row.state === 1 || row.state === null) {
        //13877412541账号点击SX01A-1900015摄像头跳到指定页面
        let username = this.$store.state.user.user.username;
        if (username === "13798112293" && row.device_id === "SX01A-1900015") {
          window.open(
            "http://121.32.129.19:8100/vision_ui/#/InsideAutoLogin?code=34c5d45a4e9196f40b8c94b9212b504e577d5884d27514dcf33b2daa9a6d5fafd2d69b452ad8c5e2c4deff189c92a073&device_id=SX01A-1900015"
          );
          return;
        }
        if (username === "13877412541" && row.device_id === "SX01A-1900015") {
          window.open(
            "http://121.32.129.19:8100/vision_ui/#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-1900015"
          );
          return;
        }
        if (username === "13929576935" && row.device_id === "SX01A-2001878") {
          window.open(
            "http://121.32.129.19:8100/vision_ui/#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000173"
          );
          return;
        }

        if (this.vstate) {
          this.$refs["video" + row.id][0].src =
            "/sxt?hd_device_id=" +
            row.id +
            "&playWay=" +
            playWay +
            "&isInit=true";
        } else {
          //type play自动选择播放方式 sd-hls sd-rtmp hd-hls hd-rtmp 使用百度播放器
          this.$set(this, "sxt_hd_device_id", row.id);
          this.$set(this, "sxt_playWay", playWay);
          this.dialogVisible = true;
          // this.$nextTick(() => {
          //   this.$refs.sxt.initSxt()
          // })
        }
      } else {
        this.$message({
          message: "该设备已离线！",
          type: "warning"
        });
        return;
      }
    },
    closeSxt () { },

    // 查看相册
    cameraPhoto (row) {
      this.xc_hd_device_id = row.id;
      this.photoDialogVisible = true;
    },
    // 编辑摄像头
    handleEdit (row) {
      this.$nextTick(() => {
        this.$refs.videoAddEdit.getDeviceData(row.id);
      });
    },
    handelDelete (index, row) {
      this.deviceId = row.id;
      this.delVisible = true;
      this.idx = index;
    },
    qiehuan () {
      // this.init().then(data => {
      //   if (this.vstate) { // 九宫格时,获取默认流地址
      //     this.getDefaultUrl(data.data.content)
      //   }
      // })
      this.init();
    },
    // 删除摄像头
    deleteRow () {
      this.deleteSxtDeviceLoading = true
      deleteSxtDevice({ id: this.deviceId }).then(res => {
        this.deleteSxtDeviceLoading = false
        if (res.code === 200) {
          this.$refs.eHeader.getFacilitiesList();
          this.deviceId = null;
          this.$message.success("删除成功");
          if (this.data.length === 1) {
            this.page = 1;
            this.init();
            // this.init().then(data => {
            //   if (this.vstate) { // 九宫格时,获取默认流地址
            //     this.getDefaultUrl(data.data.content)
            //   }
            // })
          } else {
            this.data.splice(this.idx, 1);
          }
        } else {
          this.$message.error(res.msg);
        }
        this.delVisible = false;
      });
    },
    handleClick () {
      if (this.showList) {
        this.showList = false;
        this.icon = "el-icon-more";
      } else {
        this.showList = true;
        this.icon = "el-icon-menu";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()

.flex
  display flex
  align-items center

.el-form >>> label
  padding 0

.el-form-item
  margin-bottom 0

.left-btn
  .el-button+.el-button
    margin-left 5px

.bottom-content
  justify-content space-between

.el-table
  font-size 14px

.table-span
  color #fff
  padding 2px 5px
  border-radius 25px

.normal
  background #1AB394

.abnormal
  background #F56C6C

.grep
  background #909399

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777

.opacityClass
  opacity 0

.opacityClass:hover
  opacity 1
</style>
