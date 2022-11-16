<template>
  <div class="app_info open">
    <div
      class="cover"
      @click="hideElement"
    />

    <div class="app_box">

      <el-button
        class="back_"
        type="primary"
        icon="el-icon-circle-close"
        @click="hideElement"
      />

      <div class="app_box_left">
        <div
          :style="cgqs.length > 0 ? &quot;&quot; : &quot;height:calc(100% - 14px)&quot;"
          class="model info_model"
        >
          <div class="model_name">
            地块信息
          </div>
          <div class="model_content">
            <div class="model_content_row">
              <span>地块名称</span>
              <span class="row_val">{{ dkInfo.name }}</span>
            </div>
            <div class="model_content_row">
              <span>地块类型</span>
              <span class="row_val">{{ dkInfo.facilities_type_name }}</span>
            </div>
            <div class="model_content_row">
              <span>种植面积</span>
              <span class="row_val">{{ dkInfo.acreage }}</span>
            </div>
            <div class="model_content_row">
              <span>管理人员</span>
              <span class="row_val">{{ dkInfo.linkman }}</span>
            </div>
            <div class="model_content_row">
              <span>联系电话</span>
              <span class="row_val">{{ dkInfo.mobile }}</span>
            </div>
          </div>
        </div>
        <div
          v-show="cgqs.length > 0"
          class="model cgq_model"
        >
          <div class="model_name">
            传感器信息
            <select
              v-model="selectSB_id"
              style="height: 16px;width: 18px;position: absolute;right: 0px;margin: 0;padding: 0;font-size: 12px;"
              placeholder="请选择"
              @change="setSB"
            >
              <option
                v-for="item in cgqs"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="model_content">
            <!-- v-for="(it,i) in cgq" :key='i' -->
            <div
              v-show="cgqs.length > 0"
              class="sb_qgq_info"
            >
              <div class="sb_qgq_info_head">
                <img
                  src="@/assets/img/Plan/cgq.png"
                  style="height: 60px;margin-right: 7px;"
                >
                <div>
                  <div class="model_content_row">
                    <span>设备名称</span>
                    <span class="row_val">{{ cgq.name }}</span>
                  </div>
                  <div class="model_content_row">
                    <span>设备编号</span>
                    <span class="row_val">{{ cgq.device }}</span>
                  </div>
                  <div class="model_content_row">
                    <span>设备状态</span>
                    <span class="row_val">正常</span>
                  </div>
                </div>
              </div>
              <div class="sb_qgq_info_body">
                <div>
                  <div
                    v-for="(its,u) in cgq.sb"
                    :key="u"
                    class="sb_qgq_info_model"
                  >
                    <div class="sb_qgq_info_model_val">{{ (!its.value || its.value == "null") ? "/" : its.value + its.unit }}</div>
                    <div class="sb_qgq_info_model_name">{{ its.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app_box_right">
        <div
          v-show="btnArray.length > 0"
          class="model btn_model"
        >
          <div class="model_name">
            设备控制
          </div>
          <div class="model_content">
            <div class="yykzq_info_body">
              <div>
                <div
                  v-for="(it,i) in btnArray"
                  :key="i"
                  class="yykzq_info_model"
                >
                  <div class="yykzq_info_name">
                    <div class="yuan" />
                    <div>{{ it.name }}</div>
                  </div>
                  <div class="yykzq_info_val">
                    <el-switch
                      :disabled="btnLoad"
                      v-model="it.status"
                      active-color="#2085df"
                      inactive-color="#9b9b9b"
                      @change="opt(it)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          :style="btnArray.length > 0 ?&quot;&quot;:&quot;height: calc(100% - 14px)&quot;"
          class="model video_model"
        >
          <div class="model_name">
            {{ videodata.length === 1 ? videodata[0].name : "摄像头" }}
          </div>
          <div class="model_content">
            <div
              class="sb_jksp_info_body"
              style="display:flex;"
            >
              <img
                v-show="videodata.length <= 0"
                style="position: absolute;left:0;top:0;width:100%;height:100%;z-index: 999;"
                src="@/assets/img/Plan/camer.png"
              >
              <!-- 摄像头列表 -->
              <div
                v-show="videodata.length > 1"
                class="sb_jksp_info_body_left_"
              >
                <!-- <div :class='i==0 ? "active":""' v-for='(it,i) in it.data' :key='i' @click='videoClick(it)'>{{it.name}}</div> -->
                <div
                  v-for="(item ,idx) in videodata"
                  :class="idx==videoActiveIdx?&quot;active&quot;:&quot;&quot;"
                  :key="idx"
                  @click="playerIdx(idx)"
                >{{ item.name }}</div>
              </div>
              <div class="sb_jksp_info_body_right_">
                <div class="sb_jksp_info_body_video">
                  <!-- <div
                    ref="video_container"
                    class="video_jksp"
                  /> -->
                  <iframe
                    ref="video_container"
                    style="width:100%;height:100%;"
                  />
                </div>
                <!-- <div class="sb_jksp_info_body_opt">
               
                  
                </div> -->
              </div>
            </div>
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
      <CameraPhoto ref="cameraPhoto" />
    </el-dialog>
  </div>
</template>

<script>

import { openChannel, closeChannel } from '@/utils/websocket_util.js'
import { getToken } from '@/utils/auth'
import ajaxApi from '@/api/map'
import CameraPhoto from '@/views/base/video/module/CameraPhoto'
import { mapGetters } from 'vuex'
import { controlSxt, captureSxtDevice, getSxtUrlById } from '@/api/sxt'
// this.even_par(this.dom.find(".data .par")[0]);
export default {
  name: 'DkInfo',
  myPlayer: null,
  components: {
    CameraPhoto
  },
  props: {
    modelColor: {
      type: String,
      default: '#333a4c'
    }
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      list: [],
      value: false,
      btnLoad: false,
      btn: [
        { name: '测试按钮1', status: false, load: false, id: '4028b8816e43841c016e4385c2390002' }
      ],
      video: [],
      videoActiveIdx: null,
      nowplayercam: null,
      photoDialogVisible: false,
      xc_hd_device_id: null,
      sbArray: [],
      videodata: [],
      btnArray: [],
      selectSB: [
        { name: '测试1', id: 'adsdasd' }
      ],
      selectSB_id: '',
      dkInfo: {
        name: '/',
        facilities_type_name: '/',
        acreage: '/',
        hd_device_num: '/',
        linkman: '/',
        mobile: '/'
      },
      cgqs: [],
      cgq: {}
    }
  },
  updated (a, b, c, d) {
    console.log(this.list)
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  mounted () { },
  methods: {
    // 查看相册
    cameraPhoto () {
      this.xc_hd_device_id = this.nowplayercam.id
      this.photoDialogVisible = true
    },
    epCtr (command) {
      controlSxt({ hd_device_id: this.nowplayercam.id, command: command }).then(res => {
        if (res.code === 200) {
          // 操作成功
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    captureSxtDevice () {
      captureSxtDevice({ hd_device_id: this.nowplayercam.id }).then(res => {
        if (res.code === 200) {
          this.$message.success('拍照成功')
        } else {
          this.$message.error('拍照失败')
        }
      })
    },
    // video列表被点击事件
    // videoClick (it) {
    //   this.$refs.viedeIframe.src = '/static/cam/index.html?url=' + it.url
    // },

    closeEcharts (index) {
      this.$refs.echarts[index].style.display = 'none'
    },

    video_container_dbClick () {
      var a = $(this.$refs.video_container)
      if (a.hasClass('big')) {
        a.addClass('big')
      } else {
        a.removeClass('big')
      }
    },

    // 控制函数
    opt (it) {
      // 设置为请求状态禁止访问
      it.load = true
      this.btnLoad = true
      if (it.status === true) {
        // 调整为状态
        openChannel(it.id, this.$ws).then(() => {
          // 设置为请求状态禁止访问
          it.load = false
          this.btnLoad = false
        }).catch((e) => {
          // 设置为请求状态禁止访问
          it.load = false
          this.btnLoad = false
          it.status = false
          this.$message.error(e.msg)
        })
      } else if (it.status === false) {
        // 调整为状态
        closeChannel(it.id, this.$ws).then(() => {
          // 设置为请求状态禁止访问
          it.load = false
          this.btnLoad = false
        }).catch((e) => {
          // 设置为请求状态禁止访问
          it.load = false
          this.btnLoad = false
          it.status = true
          this.$message.error(e.msg)
        })
      }
    },

    hideElement: function () {
      this.$parent.show.isshowDKInfo = false
      this.$options.myPlayer.stop()
      this.$options.myPlayer.remove()
    },

    // 根据地块id显示数据
    show (id) {
      this.getDK(id)
      this.getVideo(id)
      this.getBtn(id)
      this.getSB(id)
    },

    // 获取地块信息
    getDK (id) {
      ajaxApi.getFacilitiesByid(id, (e) => {
        this.dkInfo.name = e.data.name || '/'
        this.dkInfo.facilities_type_name = e.data.facilities_type_name || '/'
        this.dkInfo.acreage = e.data.acreage || '/'
        this.dkInfo.hd_device_num = e.data.hd_device_num || '/'
        this.dkInfo.linkman = e.data.linkman || '/'
        this.dkInfo.mobile = e.data.mobile || '/'
      })
    },

    // 获取操作按钮列表
    getBtn (id) {
      this.btnArray = []
      ajaxApi.getSwitchSensorsByRs_facilities_id(id, (event) => {
        var data = event.data
        if (!data) return
        var btn = data.map((e) => {
          return { name: e.name, status: !!(e.value * 1), load: false, id: e.id }
        })
        this.btnArray = btn
        // this.btn = btn
        btn.length && this.list.push({ type: 'kzq', data: btn })
      })
    },

    // 获取视频接口
    getVideo (id) {
      this.videodata = []
      // 调用接口
      ajaxApi.getLiveVideoList2(id, (event) => {
        var ary = event.data.content
        if (!ary) return
        ary = ary.map((e) => {
          var mapp = {
            'id': e.id,
            'name': e.name,
            'cam_tag_id': e.cam_tag_id,
            'communication': JSON.parse(e.communication)
          }
          return mapp
        })
        this.videodata = ary
        if (ary.length > 0) {
          this.list.push({ type: 'sxt', data: ary })
          this.$nextTick(function () { this.playerIdx(0) })
        }
      })
    },

    // 获取设备信息
    getSB (id) {
      this.cgq = []
      ajaxApi.getValueSensorsByRs_facilities_id(id, (event) => {
        var data = event.data
        var ary = []
        for (var i in data) {
          var it = data[i]
          var sb = ary.find((e) => { return e.name === it.hd_device_name })
          if (!sb) {
            sb = {
              name: it.hd_device_name,
              id: it.hd_device_id,
              device: it.device,
              sb: []
            }
            ary.push(sb)
          }
          sb.sb.push(it)
        }
        this.cgqs = ary
        this.cgq = ary[0] || {}
      })
    },

    setSB () {
      var id = this.selectSB_id
      var cgq = this.cgqs.find((e) => {
        return e.id === id
      })
      this.cgq = cgq || {}
    },

    // 播放视频
    playerIdx (idx) {
      this.videoActiveIdx = idx
      let cam
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index]
        if (element.type === 'sxt') {
          cam = element.data[idx]
          break
        }
      }

      this.$refs.video_container.src = 'https://' + this.DOMAIN + '/wlw_admin/openvideo?device_id=SX01A-2000072'

      // this.$refs.video_container.src = '/sxt?hd_device_id=' + cam.id + '&playWay=play&isInit=true'
      // getSxtUrlById({ hd_device_id: cam.id, protocol: 'hls', definition: 'hd' }).then(res => {
      //   if (res.code === 200) {
      //     window.testd = this.$refs.video_container[0]
      //     window.testu = res.data

      //     this.nowplayercam = cam

      //     this.$options.myPlayer = cyberplayer(this.$refs.video_container).setup({
      //       width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)
      //       height: '100%', // 高度，也可以支持百分比
      //       file: res.data, // 播放地址
      //       autostart: true, // 是否自动播放
      //       stretching: 'uniform', // 拉伸设置
      //       repeat: false, // 是否重复播放
      //       volume: 100, // 音量
      //       controls: false, // controlbar是否显示
      //       starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
      //       ak: '8fa5f129aa3e4d52af02666e4d43884a', // 百度云的 AK
      //       controlbar: {
      //         barLogo: false
      //       }
      //     })
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },

    goCameraVision () {
      let cam
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index]
        if (element.type === 'sxt') {
          cam = element.data[this.videoActiveIdx]
          break
        }
      }

      const config = cam.communication.config
      if (config.deviceSerial &&
        config.username &&
        config.password &&
        config.ip &&
        config.service_port
      ) {
        window.open(process.env.VIDEO_URL + '/#/index?token=' + getToken() + '&id=' + cam.id)
        // this.$router.push("http://192.168.33.181:8123/#/index?token="+getToken())
      } else {
        alert('该摄像头必须具有[序列号], [用户名], [密码], [IP], [服务端口]!')
      }
    }
  }
}

</script>

<style>
.app_info {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  overflow-y: hidden;
  /* background: #ffffff; */
  /* background: #333a4c88; */
}

.app_info .box::-webkit-scrollbar {
  width: 3px;
}

.app_info .cover {
  height: 100%;
  background: #ffffff;
  opacity: 0.45;
}

.app_info .app_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: #9296a0;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  padding-right: 7px;
  /* padding-top: 30px; */
}

.app_info .model {
  padding: 10px;
  width: calc(100% - 7px);
  background: #1e1e28;
  border-radius: 5px;
  margin: 7px 0 7px 7px;
}

.app_info .model .model_name {
  padding-bottom: 3px;
  border-bottom: solid 1px #43485b;
  font-size: 14px;
  color: #aeb3c6;
  position: relative;
}

.app_info .model .model_content {
  padding: 1px 0;
  height: calc(100% - 20px);
  position: relative;
}

.app_info .model .model_content .model_content_row {
  padding: 5px 0;
  font-size: 12px;
  color: #aeb3c6;
}

.app_info .model .model_content .model_content_row .row_val {
  color: #408dc3;
}

.app_info .video_model {
  height: calc(100% - 176px);
}

.app_info .app_box_left {
  width: 300px;
  flex-shrink: 0;
}

.app_info .btn_model {
  height: 155px;
}

.app_info .info_model {
  height: 155px;
}

.app_info .cgq_model {
  height: calc(100% - 176px);
}

.app_info .app_box_right {
  width: 100%;
}

/************************ */

.app_info .btn_box_model {
  float: left;
  padding: 12px;
  color: #249eff;
  line-height: 24px;
  width: 50%;
  text-align: center;
}

.app_info .btn_box {
  overflow: hidden;
  width: 180px;
  margin: 15px;
  border: solid 1px #42b983;
  flex-shrink: 0;
  border-radius: 3px;
}

.app_info .box_top {
  display: flex;
}

.app_info .box_head {
  padding: 8px;
  color: #ffffff;
  background: #42b983;
}

.app_info .sb_head {
  padding: 8px;
  color: #ffffff;
  background: #42b983;
}

.app_info .video_box {
  overflow: hidden;
  margin: 15px;
  border: solid 1px #42b983;
  width: 100%;
  border-radius: 3px;
}

.app_info .video_name {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  padding: 3px;
  background: #ffffff88;
  color: #4c4949;
}

.app_info .video_box_model {
  position: relative;
  float: left;
  width: 25%;
}

.app_info .video_model {
  overflow: hidden;
}

.app_info .sb_box {
  margin: 15px;
  border-radius: 3px;
  border: solid 1px #3fa54c;
}

.app_info .sb_model_box {
  color: #000000;
}

.app_info .sb_data_realTime {
  display: flex;
  justify-content: space-around;
  margin: 3px 0;
  padding: 6px 0;
  background: #e8e8e8;
  position: relative;
}

.app_info .sb_data_realTime_model {
  padding: 3px 15px;
  font-size: 22px;
  color: #b33434;
  text-align: center;
  cursor: pointer;
}

.app_info .sb_data_realTime_model:hover {
  border-bottom: solid 1px #b33434;
}

.app_info .sb_mode {
  margin: 14px 3px;
  /* padding: 0 8px; */
  border: solid 1px #a2c4b5;
}

.app_info .sb_name {
  font-size: 16px;
  font-weight: 800;
  color: #42b983;
  background: #ccf8e4;
  padding: 8px 0;
}

.app_info .echatrs {
  width: 100%;
  height: 300px;
}

.app_info .back_ {
  position: absolute;
  right: 2px;
  top: 2px;
  background: none;
  padding: 10px;
  border: none;
  font-size: 22px;
  z-index: 99;
}

.app_info .line_preagge {
  /* animation: line 5s; */
  transition: width 5s;
}

.app_info .sb_data_name {
}

.app_info .sb_data_value {
  color: #005050;
}

.app_info .box_left {
  width: 30%;
  height: 100%;
  border-right: solid 1px #cdc9c9;
  flex-shrink: 0;
}

.app_info .box_right {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app_info .sb_qgq_info_model {
  width: 33%;
  padding: 12px;
  text-align: center;
  color: #aeb3c6;
}

.app_info .sb_qgq_info_model_val {
  font-size: 16px;
  padding: 9px;
  color: #3d8dac;
}

.app_info .sb_qgq_info {
  height: 100%;
}

.app_info .sb_qgq_info_body {
  height: calc(100% - 85px);
  overflow-y: auto;
}

.app_info .sb_qgq_info_body > div {
  display: flex;
  flex-wrap: wrap;
}

.app_info .sb_qgq_info_head {
  font-size: 14px;
  /* height: 33px; */
  /* line-height: 33px; */
  /* text-indent: 2em; */
  color: #4a9bd0;
  display: flex;
  align-items: center;
  /* margin-left: 2em; */
}

.app_info .sb_qgq_info_title {
  color: #888888;
  height: 33px;
  line-height: 33px;
  text-indent: 2em;
}

.app_info .sb_qgq_info_title::after {
  content: "";
}

.app_info .yykzq_info_body {
  color: #aeb3c6;
  height: 100%;
  overflow-y: auto;
}

.app_info .yykzq_info_body > div {
  display: flex;
  flex-wrap: wrap;
}

.app_info .yykzq_info_model {
  display: flex;
  width: calc(25% - 60px);
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0px 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 50px;
}

.app_info .yuan {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: #3677c3;
  margin: 0 5px 0 0;
}

.app_info .yykzq_info_name {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.app_info .sb_jksp_info_body {
  width: 100%;
  height: 100%;
  position: absolute;
}

.app_info .sb_jksp_info_body_left_ {
  width: 200px;
  padding: 0 2em 0 0;
  flex-shrink: 0;
  box-sizing: border-box;
}

.app_info .sb_jksp_info_body_left_ > div {
  padding: 8px 3px;
  font-size: 14px;
  color: #4f4c4c;
  border-bottom: solid 1px #bdbcbc;
  cursor: pointer;
}

.app_info .sb_jksp_info_body_left_ > div.active {
  color: #a57f5b;
}

.app_info .sb_jksp_info_body {
}

.app_info .sb_jksp_info_body_left_ > div {
  padding: 8px 3px;
  font-size: 14px;
  color: #4f4c4c;
  border-bottom: solid 1px #bdbcbc;
}

.app_info .sb_jksp_info_body_left_ > div.active {
  color: #a57f5b;
}

.app_info .sb_jksp_info_body_right_ {
  width: 100%;
  display: flex;
  position: relative;
}

.app_info .sb_jksp_info_body_video {
  width: 100%;
  height: 100%;
  position: absolute;
}

.app_info .sb_jksp_info_body_video:hover + .sb_jksp_info_body_opt {
  opacity: 1;
}

.sb_jksp_info_body_opt:hover {
  opacity: 1 !important;
}

.app_info .sb_jksp_info_body_opt {
  opacity: 0;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  height: 100px;
  position: absolute;
  bottom: 0;
  justify-content: space-around;
  background: #eeeeee88;
}

.app_info .video_jksp_opt {
  position: relative;
  height: 100%;
  width: 100px;
}

.app_info .video_jksp_opt_btn {
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  text-align: center;
  justify-content: space-around;
}

.app_info .video_jksp_opt_btn > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
}

.app_info .video_jksp_opt > div {
  position: absolute;
  left: calc(50% - 10px);
  top: calc(50% - 10px);
  transform: translate(-50%, -50%);
}

.app_info .video_jksp_opt > div > img {
  position: absolute;
  border: solid 1px #999999;
  border-radius: 50%;
  cursor: pointer;
}

.app_info .video_jksp_opt > div > img {
  position: absolute;
  cursor: pointer;
  /* border: solid 1px red; */
}

.app_info .video_jksp {
  width: 100%;
  height: 100%;
  /* border: solid 1px red; */
}

.app_info .sb_jksp_info_body.big {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.app_info iframe {
  border: none;
}

.app_info .nodata {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  /* border: solid 1px; */
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 0 54px #1e1e28;
  animation: zhengdong 0.25s;
  text-align: center;
  z-index: 99;
}

@keyframes zhengdong {
  0% {
    transform: translate(-40%, -50%);
  }
  20% {
    transform: translate(-60%, -50%);
  }
  40% {
    transform: translate(-40%, -50%);
  }
  60% {
    transform: translate(-60%, -50%);
  }
  80% {
    transform: translate(-40%, -50%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

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

.app_info .draggable_item {
  width: calc(50% - 30px);
  height: 400px;
  margin: 15px;
  background: #fff;
}

.app_info .wrapper {
  height: calc(100% - 53px);
  overflow: auto;
  height: 100%;
  background: #e8ecf0;
}

.app_info *::-webkit-scrollbar {
  width: 15px;
  height: 3px;
}

.app_info .wrapper_box {
  display: flex;
  flex-wrap: wrap;
}

.app_info .yykzq_info_val {
  display: flex;
  align-items: center;
}
</style>
