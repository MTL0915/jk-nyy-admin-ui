<template>
  <div
    :class="full?'full':'card'"
    ref="sxtBox"
  >
    <div
      v-if="autoPlay"
      :class="full?'full':'card'"
    >
      <div
        v-if="!s_unableControl"
        style="position: absolute;top:0px;left:0px;z-index: 99;width: 100%;height: 100%;background: rgba(0, 0, 0, 0);"
        @dblclick="fullScreenVideo"
      />
      <div
        v-show="nowPlay === 'ezopen'"
        id="ezopen"
        ref="ezopen"
      />
      <div
        v-show="nowPlay === 'baidu'"
        id="baidu"
        ref="baidu"
      />
      <div
        style="width:100%;height:100%;z-index: 100;position: absolute;top:0px;left:0px;"
        v-show="nowPlay === 'hikvisionCJ'"
      >
        <iframe
          src=""
          ref="iframediv"
          style="width:100%;height:100%"
        >
        </iframe>
      </div>
      <!-- <video
        v-show="!(nowPlay === 'baidu' || nowPlay === 'ezopen')"
        ref="videoPlayer"
        class="video-js"
      /> -->
      <div
        style="position:absolute;z-index: 100;right:0;top:10px;"
        v-show="nowPlay !== 'hikvisionCJ'"
      >
        <div
          style="border-radius:5px;overflow:hidden;font-size:0;"
          :style="{margin:`${10*scale}px`}"
        >
          <span
            class="playType"
            :style="{
              background: playType.indexOf('sd') > -1?'#01c7ba':'#181818',
              color: playType.indexOf('sd') > -1? '#fff': '#999',
              padding: `${8*scale}px ${12*scale}px`,
              'font-size': `${14*scale}px`
            }"
            @click="switchSD"
          >
            流畅
          </span>
          <span
            class="playType"
            :style="{
              background: playType.indexOf('hd') > -1?'#01c7ba':'#181818',
              color: playType.indexOf('hd') > -1? '#fff': '#999',
              padding: `${8*scale}px ${12*scale}px`,
              'font-size': `${14*scale}px`
            }"
            @click="switchHD"
          >
            高清
          </span>
        </div>
        <div
          class="control"
          :style="{'margin-top': `${20*scale}px`}"
          @click.stop
        >
          <div class="control-switch">
            <span
              class="control-show"
              @click="zoom = !zoom"
              v-if="scale == 1"
            >
              <i
                class="el-icon-d-arrow-left"
                style="position:absolute;left:6px"
                v-show="!zoom"
              ></i>
              <i
                class="el-icon-d-arrow-right"
                style="position:absolute;left:6px"
                v-show="zoom"
              ></i>
            </span>
            <span
              class="control-show1"
              @click="zoom = !zoom"
              v-if="scale != 1"
            >
              <i
                class="el-icon-d-arrow-left"
                style="position:absolute;left:1px"
                v-show="!zoom"
              ></i>
              <i
                class="el-icon-d-arrow-right"
                style="position:absolute;left:1px"
                v-show="zoom"
              ></i>
            </span>
            <div
              style="background: rgba(0,0,0,.65);font-size:0"
              :style="{width: zoom ?`${225*scale}px`: `${50*scale}px`,height: zoom ? `${300*scale}px`: `${225*scale}px`,padding:`${10*scale}px`}"
            >
              <span
                title="重载"
                class="control-Btn"
                @click="_init"
                :style="{'margin-bottom': `${scale*5}px`}"
              >
                <i
                  class="el-icon-refresh"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <span
                title="拍照"
                class="control-Btn"
                @click="captureSxtDevice"
                :style="{'margin-bottom': `${scale*5}px`}"
              >
                <i
                  class="el-icon-camera"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <span
                title="放大"
                class="control-Btn"
                :style="{'margin-bottom': `${scale*5}px`}"
                @mousedown="epCtr('amplification')"
                @mouseup="epCtr('stop_amplification')"
              >
                <i
                  class="el-icon-zoom-in"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <span
                title="缩小"
                class="control-Btn"
                :style="{'margin-bottom': `${scale*5}px`}"
                @mousedown="epCtr('narrow')"
                @mouseup="epCtr('stop_narrow')"
              >
                <i
                  class="el-icon-zoom-out"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <span
                title="近焦距"
                class="control-Btn"
                :style="{'margin-bottom': `${scale*5}px`}"
                @mousedown="epCtr('focalNear')"
                @mouseup="epCtr('stop_focalNear')"
              >
                <i
                  class="el-icon-aim"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <span
                title="远焦距"
                class="control-Btn"
                :style="{'margin-bottom': `${scale*5}px`}"
                @mousedown="epCtr('focalFar')"
                @mouseup="epCtr('stop_focalFar')"
              >
                <i
                  class="el-icon-full-screen"
                  :style="{'font-size':`${20*scale}px`, padding: `${scale*5}px`}"
                ></i>
              </span>
              <div
                v-show="zoom"
                style="overflow:hidden"
                :style="{width:`${200*scale}px`,height:`${200*scale}px`}"
              >
                <div
                  style="font-size:0;transform:rotate(45deg);border-radius:50%;display:inline-block"
                  :style="{height:scale == 1?'100%':'120px',width:scale == 1?'100%':'120px'}"
                >
                  <div
                    class="switch"
                    title="上"
                    :style="{'line-height':`${scale*100}px`}"
                    @mousedown="epCtr('up')"
                    @mouseup="epCtr('stop_up')"
                  >
                    <!-- <i class="el-icon-arrow-left" style="transform:rotate(45deg)"></i> -->
                    <div class="controlImg controlUp"></div>
                  </div>
                  <div
                    class="switch"
                    title="右"
                    :style="{'line-height':`${scale*100}px`}"
                    @mousedown="epCtr('right')"
                    @mouseup="epCtr('stop_right')"
                  >
                    <!-- <i class="el-icon-arrow-up" style="transform:rotate(45deg)"></i> -->
                    <div class="controlImg controlRight"></div>
                  </div>
                  <div
                    class="switch"
                    title="左"
                    :style="{'line-height':`${scale*100}px`}"
                    @mousedown="epCtr('left')"
                    @mouseup="epCtr('stop_left')"
                  >
                    <!-- <i class="el-icon-arrow-down" style="transform:rotate(45deg)"></i> -->
                    <div class="controlImg controlLeft"></div>
                  </div>
                  <div
                    class="switch"
                    title="下"
                    :style="{'line-height':`${scale*100}px`}"
                    @mousedown="epCtr('down')"
                    @mouseup="epCtr('stop_down')"
                  >
                    <!-- <i class="el-icon-arrow-right" style="transform:rotate(45deg)"></i> -->
                    <div class="controlImg controlDown"></div>
                  </div>
                </div>
              </div>
              <div
                v-show="zoom"
                style="font-size:0;text-align:center;margin-top:10px"
              >
                <span
                  class="speed"
                  style="border-radius:15px 0 0 15px"
                  :style="{
                    background: speed == 1? '#54a7e8': '',
                    border: speed == 1 ? '2px solid #54a7e8' : '2px solid #fff',
                    padding: `${5*scale}px ${20*scale}px`,
                    height: `${30*scale}px`,
                    'font-size':`${14*scale}px`
                  }"
                  @click.stop="speed = 1"
                >
                  慢
                </span>
                <span
                  class="speed"
                  style="border-radius: 0 15px 15px 0"
                  :style="{
                    background: speed == 2? '#54a7e8': '',
                    border: speed == 2 ? '2px solid #54a7e8' : '2px solid #fff',
                    padding: `${5*scale}px ${20*scale}px`,
                    height: `${30*scale}px`,
                    'font-size':`${14*scale}px`
                  }"
                  @click.stop="speed = 2"
                >
                  快
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- <div
        v-show="showControl"
        @mouseover="showControl=true"
        @mouseleave="showControl=false"
        style="width: 80px;text-align: center;position:absolute;z-index: 100;right:10px;bottom:10px;background: #0000008a;border-radius: 50%;"
      >
        <div style="float">
          <el-button
            type="text"
            style="color:#FFFFFF;"
            class="el-icon-circle-plus"
            @mousedown.native="epCtr('amplification')"
            @mouseup.native="epCtr('stop_amplification')"
          />
          <el-button
            type="text"
            style="color:#FFFFFF;"
            class="el-icon-remove"
            @mousedown.native="epCtr('narrow')"
            @mouseup.native="epCtr('stop_narrow')"
          />
        </div>

        <div>
          <div>
            <el-button
              type="text"
              class="el-icon-caret-top tb"
              @mousedown.native="epCtr('up')"
              @mouseup.native="epCtr('stop_up')"
            />
          </div>
          <div style="float">
            <el-button
              type="text"
              class="el-icon-caret-left tb"
              @mousedown.native="epCtr('left')"
              @mouseup.native="epCtr('stop_left')"
            />
            <el-button
              type="text"
              class="el-icon-camera tb"
              @click.native="captureSxtDevice()"
            />
            <el-button
              type="text"
              class="el-icon-caret-right tb"
              @mousedown.native="epCtr('right')"
              @mouseup.native="epCtr('stop_right')"
            />
          </div>
          <div>
            <el-button
              type="text"
              class="el-icon-caret-bottom tb"
              @mousedown.native="epCtr('down')"
              @mouseup.native="epCtr('stop_down')"
            />
          </div>
        </div>
      </div> -->

    </div>
    <div
      v-else
      style="width:100%;height:100%"
      :style="cover?'':'background:#000;'"
    >
      <img
        style="position: absolute;width:80px;height:80px;top: calc(50% - 40px);left: calc(50% - 40px);"
        src='@/assets/img/zd_1.png'
      />
      <img
        v-if="cover"
        :src="cover"
        style="width:100%;height:100%"
      />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { controlSxt, captureSxtDevice, getSxtUrlById, getYingShiToken, getHikcloudToken } from '@/api/sxt'
import { getDetailById } from '@/api/equip'
import { getImage } from '@/utils/image_util'
import img1 from "@/assets/images/control_inact.png"
import img2 from "@/assets/images/control_act.png"
import { encode64gb2312 } from '@/utils/base64gb2312'
// import videojs from 'video.js';

export default {
  props: {
    hd_device_id: {
      // 设备ID
      type: String,
      default: ''
    },
    device_id: {
      // 设备序列号
      type: String,
      default: ''
    },
    autostart: {
      //是否自动播放
      type: Boolean,
      default: true
    },
    showControl: {
      // 是否显示控制拍照按钮
      type: Boolean,
      default: false
    },
    playWay: {
      //播放方式
      type: String,
      default: ''
    },
    getUrlError: {
      //取流出错回调方法
      type: Function,
      default: new Function()
    },
    rs_facilities_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      baiduPlayer: null, //百度播放器
      ezopenPlayer: null, //萤石云播放器
      nowPlay: '',
      s_hd_device_id: '',
      s_device_id: '',
      s_playWay: '',
      s_rs_facilities_id: '',
      full: false,
      moveTimestamp: 0,
      cover: null,
      autoPlay: true,
      s_unableControl: false,
      speed: 1, // 控制摄像头转动速度， 1：慢， 2：快
      zoom: false,
      playType: '',
      img_inact: img1,
      img_act: img2,
      scale: 1, //控制面板缩放倍数
      scaleType: 'normal'
    };
  },
  created () {
    const _this = this
    document.onmousemove = function move (event) {  // 鼠标移动处理函数
      _this.showControl = true
      _this.moveTimestamp = new Date().getTime()
    }
    setInterval(() => {
      if (new Date().getTime() - _this.moveTimestamp >= 5000) {
        _this.showControl = false
      }
    }, 1000);
  },
  mounted () {
    this.init();
  },
  methods: {
    // 切换流畅
    switchSD () {
      if (this.playType.indexOf('sd') > -1) {
        return;
      }
      if (this.playType == 'hd-ezopen') {
        this.playType = 'sd-ezopen';
        this.s_playWay = 'sd-ezopen';
      } else if (this.playType == 'hd-hls') {
        this.playType = 'sd-hls';
        this.s_playWay = 'sd-hls';
      } else if (this.playType == 'hd-rtmp') {
        this.playType = 'sd-rtmp';
        this.s_playWay = 'sd-rtmp';
      }
      this.init();
    },
    // 切换高清
    switchHD () {

      if (this.playType.indexOf('hd') > -1) {
        return;
      }
      if (this.playType == 'sd-ezopen') {
        this.playType = 'hd-ezopen';
        this.s_playWay = 'hd-ezopen';
      } else if (this.playType == 'sd-hls') {
        this.playType = 'hd-hls';
        this.s_playWay = 'hd-hls';
      } else if (this.playType == 'sd-rtmp') {
        this.playType = 'hd-rtmp';
        this.s_playWay = 'hd-rtmp';
      }
      this.init();
    },
    getImage,
    _init () {
      this.init()
    },
    init (fn) {
      var i = 0;
      var load = () => {
        if (--i == 0) {
          fn && fn()
          this.initSxt();
        }
      }
      if (!document.querySelector("#ezuikitJs")) {

        i++;
        let s = document.createElement('script');
        s.id = "ezuikitJs";
        let url1 = '/static/yingshi/ezuikit.js';
        s.src = url1
        s.onload = load;
        document.head.appendChild(s);
      }

      if (!document.querySelector("#cyberplayerJs")) {

        i++;
        let script1 = document.createElement('script');
        script1.id = "cyberplayerJs";
        let url = '/static/player/cyberplayer.js';
        script1.src = url
        script1.onload = load;
        document.head.appendChild(script1);
      }

      if (i == 0) {
        fn && fn()
        this.initSxt();
      }
    },
    // 初始化摄像头
    initSxt () {
      if (this.$refs.sxtBox.offsetHeight < 400) {
        this.scale = 0.6
        this.scaleType = 'mini'
      } else {
        this.scale = 1
        this.scaleType = 'normal'
      }
      //---------url传参方式初始化-------------
      if (this.playType == "") {
        if (this.$route.query.hd_device_id) {
          this.s_hd_device_id = this.$route.query.hd_device_id;
        }
        if (this.$route.query.device_id) {
          this.s_device_id = this.$route.query.device_id;
        }
        if (this.$route.query.playWay) {
          this.s_playWay = this.$route.query.playWay;
        }
        if (this.$route.query.rs_facilities_id) {
          this.s_rs_facilities_id = this.$route.query.rs_facilities_id
        }
        if (this.$route.query.unableControl === 'true') {
          this.s_unableControl = true
        }
        if (this.hd_device_id) {
          this.s_hd_device_id = this.hd_device_id;
        }
        if (this.device_id) {
          this.s_device_id = this.device_id;
        }
        if (this.playWay) {
          this.s_playWay = this.playWay;
        }
        if (this.rs_facilities_id) {
          this.s_rs_facilities_id = this.rs_facilities_id
        }

        if (!this.s_playWay) {
          this.s_playWay = 'play'; //不指定时采用自动选择播放器
        }
      }

      this.closeSxt();
      if (this.s_hd_device_id == false && this.s_device_id == false) {
        return;
      }

      getDetailById({
        hd_device_id: this.s_hd_device_id,
        device_id: this.s_device_id,
        returnInnerStatus: false
      }).then(res => {
        if (res.code === 200) {
          const communication = JSON.parse(res.data.communication);
          //是否播放
          if (this.$route.query.autoPlay === 'false') {
            this.autoPlay = false
            if (communication.cover) {

              this.cover = getImage(communication.cover)
            }
            return
          }

          if (this.s_playWay === 'play') {
            //自动选择
            //----------- 萤石云优先自身播放器-----------
            if (communication.type === 'JK-SXT') {
              this.playType = 'sd-ezopen'
              this.ezopenPlay(communication, 'sd', communication.type)
            }
            else if (communication.type === 'JK-SXT2') {
              this.s_playWay = 'hd-hls';
              this.playType = 'hd-hls'
              this.baiduPlay();
            }
            //------------安防系统优先HLS---------------
            else if (communication.type === 'JK-SXT3') {
              this.s_playWay = 'hd-hls';
              this.playType = 'hd-hls'
              this.baiduPlay();
            }
            //------------乐橙云优先HLS --------------------
            else if (communication.type === 'JK-SXT4') {
              this.s_playWay = 'hd-hls';
              this.playType = 'hd-hls'
              this.baiduPlay();
            }
            //------------ 海康云眸优先萤石云播放器 --------------------
            else if (communication.type === 'JK-SXT5') {
              this.playType = 'sd-ezopen'
              this.ezopenPlay(communication, 'sd', communication.type)
            }
            else {
              this.$message.error('暂无该类型摄像头');
              return;
            }
          } else if (this.s_playWay && this.s_playWay.indexOf('ezopen') !== -1) {
            if (communication.type === 'JK-SXT' || communication.type === 'JK-SXT5') {
              this.playType = this.s_playWay
              let a = this.s_playWay.split('-')
              this.ezopenPlay(communication, a[0], communication.type)
            } else {
              this.$message.error('萤石云播放器不支持该摄像头播放');
            }
          } else if (this.s_playWay === 'sd-cj' || this.s_playWay === 'hd-cj') {
            this.hikvisionCJPlay(communication, this.s_playWay);
          } else {
            this.playType = this.s_playWay
            this.baiduPlay();
            // if (this.playType.indexOf('hls') !== -1) {
            //   this.videoPlay();
            // } else {
            //   this.baiduPlay();
            // }
          }
        } else {
          //获取设备信息失败
          this.$message.error(res.msg);
          return;
        }
      });
    },
    hikvisionCJPlay (communication, playWay) {
      this.nowPlay = "hikvisionCJ";
      var ip = communication.config.ip;
      var port = communication.config.http_port;
      var token = encode64gb2312(communication.config.username + ":" + communication.config.password);

      if (playWay === 'hd-cj') {
        this.$refs["iframediv"].src = location.protocol + "//" + this.DOMAIN + "/camera/hikvision/video.html?ip=" + ip + "&port=" + port + "&token=" + token + "&controlshow=true&streamtype=0";
      } else {
        this.$refs["iframediv"].src = location.protocol + "//" + this.DOMAIN + "/camera/hikvision/video.html?ip=" + ip + "&port=" + port + "&token=" + token + "&controlshow=true&streamtype=1";
      }
    },
    ezopenPlay (communication, definition, sxtType) {
      if (sxtType === 'JK-SXT') {//萤石云
        getYingShiToken().then(res => {
          if (res.code === 200) {
            let token = res.data
            getSxtUrlById({
              hd_device_id: this.s_hd_device_id,
              device_id: this.s_device_id,
              protocol: 'ezopen',
              definition: definition
            }).then(res2 => {
              if (res2.code === 200) {
                let playUrl = res2.data
                this.$nextTick(() => {
                  this.playEzopen(playUrl, token);
                });
              } else {
                this.$message.error(res2.msg)
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (sxtType === 'JK-SXT5') {//海康云眸
        getHikcloudToken().then(res => {
          if (res.code === 200) {
            let token = res.data
            getSxtUrlById({
              hd_device_id: this.s_hd_device_id,
              device_id: this.s_device_id,
              protocol: 'ezopen',
              definition: definition
            }).then(res2 => {
              if (res2.code === 200) {
                let playUrl = res2.data
                this.$nextTick(() => {
                  this.playEzopen(playUrl, token);
                });
              } else {
                this.$message.error(res2.msg)
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    baiduPlay () {
      //取流使用百度播放器
      var s = this.s_playWay.split('-');
      // 取视频流
      getSxtUrlById({
        hd_device_id: this.s_hd_device_id,
        device_id: this.s_device_id,
        protocol: s[1],
        definition: s[0]
      }).then(res => {
        if (res.code === 200) {
          var videoAddress = res.data
          // videoAddress = res.data.replace('http://', 'https://');
          if (videoAddress !== '') {
            this.$nextTick(() => {
              this.playBaidu(videoAddress);
            });
          }
        } else {
          this.$message.error(res.msg);
          this.getUrlError();
          return;
        }
      });
    },
    videoPlay () {
      var s = this.s_playWay.split('-');
      // 取视频流
      getSxtUrlById({
        hd_device_id: this.s_hd_device_id,
        device_id: this.s_device_id,
        protocol: s[1],
        definition: s[0]
      }).then(res => {
        if (res.code === 200) {
          var videoAddress = res.data
          // videoAddress = res.data.replace('http://', 'https://');
          if (videoAddress !== '') {
            this.$nextTick(() => {
              this.playVideo(videoAddress);
            });
          }
        } else {
          this.$message.error(res.msg);
          this.getUrlError();
          return;
        }
      });
    },
    // 关闭摄像头
    closeSxt () {
      if (this.baiduPlayer) {
        this.baiduPlayer.remove();
      }
      if (this.ezopenPlayer) {
        try {
          this.ezopenPlayer.stop();
          this.ezopenPlayer.destroy();
          this.ezopenPlayer = null;
        } catch (err) {
          this.ezopenPlayer = null;
        }
      }
    },
    // 控制摄像头
    epCtr (command) {
      controlSxt({ hd_device_id: this.s_hd_device_id, device_id: this.s_device_id, command: command, speed: this.speed }).then(res => {
        if (res.code === 200) {
          // 操作成功
        } else {
          if (command.indexOf('stop') !== -1) {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 拍照
    captureSxtDevice () {
      captureSxtDevice({ hd_device_id: this.s_hd_device_id, device_id: this.s_device_id, rs_facilities_id: this.s_rs_facilities_id }).then(res => {
        if (res.code === 200) {
          this.$message.success('拍照成功');
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //初始化萤石云播放器
    playEzopen (playUrl, token) {
      this.nowPlay = 'ezopen';
      this.ezopenPlayer = new EZUIKit.EZUIPlayer({
        id: 'ezopen',
        autoplay: true,
        url: playUrl,
        accessToken: token,
        decoderPath: window.location.protocol + '//' + window.location.host + '/static/yingshi'
      });
    },
    //初始化百度播放器
    playBaidu (videoAddress) {
      this.nowPlay = 'baidu';
      this.baiduPlayer = cyberplayer(this.$refs.baidu).setup({
        width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)this.$refs.video.offsetWidth
        height: '100%', // 高度，也可以支持百分比
        title: '基本功能', // 标题
        file: videoAddress, // 播放地址
        autostart: this.autostart, // 是否自动播放
        stretching: 'uniform', // 拉伸设置
        repeat: false, // 是否重复播放
        volume: 100, // 音量
        controls: true, // controlbar是否显示
        starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
        ak: '8fa5f129aa3e4d52af02666e4d43884a', // 百度云的 AK
        controlbar: {
          barLogo: false
        },
      });
    },
    playVideo (videoAddress) {
      this.nowPlay = 'video'
      this.videoPlayer = this.$video(this.$refs.videoPlayer, {
        autoplay: 'muted',//自动播放
        controls: true,//用户可以与之交互的控件
        loop: true,//视频一结束就重新开始
        muted: false,//默认情况下将使所有音频静音
        aspectRatio: "16:9",//显示比率
        fullscreen: {
          options: { navigationUI: 'hide' }
        },
        sources: [
          {
            src: videoAddress,
            type: "application/x-mpegURL"
          },
        ]
      })
      this.$forceUpdate()
    },
    fullScreenVideo () {
      this.full = !this.full
      if (this.full) {
        this.scale = 1
      } else {
        this.scale = 0.6
        if (this.scaleType == 'mini') {
          this.scale = 0.6
        } else {
          this.scale = 1
        }
      }
      return false
    }
  }
};
</script>
<style>
.tb {
  text-align: center;
  width: 10px;
  height: 10px;
  color: #ffffff;
}
.card {
  padding: 0px !important;
  margin: 0px !important;
}
.card {
  height: 100%;
  position: relative;
}
.card .bar {
  width: 100%;
}
.card .bar table {
  width: 100%;
}

#ezopen {
  width: 100% !important;
  height: 100% !important;
}
#ezopen .parent-wnd > div {
  width: 100% !important;
  height: 100% !important;
}
#ezopen canvas {
  width: 100% !important;
  height: 100% !important;
}
.full {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
}
.playType {
  display: inline-block;
  cursor: pointer;
}
.control {
  position: relative;
}
.control-switch {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
}
.control-show {
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 160px;
  cursor: pointer;
  position: relative;
  /* border: 25px solid transparent; */
  border-bottom: 25px solid transparent;
  border-right: 25px solid #54a7e8;
  border-top: 25px solid transparent;
  border-left: 0;
  margin: auto;
  border-color: transparent #54a7e8 transparent transparent;
}
.control-show1 {
  color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 80px;
  position: relative;
  /* border: 12px solid transparent; */
  border-bottom: 12px solid transparent;
  border-right: 12px solid #54a7e8;
  border-top: 12px solid transparent;
  border-left: 0;
  margin: auto;
  border-color: transparent #54a7e8 transparent transparent;
}
.control-show:hover,
.control-show1:hover {
  border-color: transparent rgba(84, 167, 232, 0.6) transparent transparent;
}
.control-Btn {
  color: #fff;
  display: inline-block;
  /* margin-bottom: 5px; */
  cursor: pointer;
}
.control-Btn:hover {
  color: #54a7e8;
}
.switch {
  box-sizing: border-box;
  width: 50%;
  height: 50%;
  display: inline-block;
  color: #fff;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}
.switch:hover {
  color: #54a7e8;
}
.speed {
  color: #fff;
  margin: 0 5px;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
}
.controlImg {
  display: inline-block;
  width: 50px;
  height: 40px;
  background-size: initial;
  background-image: url("../../../../assets/images/control_inact.png");
}
.controlImg:hover {
  background-image: url("../../../../assets/images/control_act.png");
}
.controlUp {
  transform: rotate(135deg);
}
.controlLeft {
  transform: rotate(45deg);
}
.controlDown {
  transform: rotate(-45deg);
}
.controlRight {
  transform: rotate(-135deg);
}
</style>
