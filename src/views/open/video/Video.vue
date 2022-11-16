<template>
  <div
    class="card"
    style="position: relative;width:100%;height:100%"
  >
    <div style="width:100%;height:100%">
      <div ref="video" />
    </div>
    <div
      v-show="showControl"
      style="width: 80px;text-align: center;position:absolute;right:25px;bottom:60px;"
    >
      <div>
        <el-button
          type="text"
          class="el-icon-caret-top tb"
          @click.native="move('up','stop_up')"
        />
      </div>
      <div style="float">
        <el-button
          type="text"
          class="el-icon-caret-left tb"
          @click.native="move('left','stop_left')"
        />
        <el-button
          type="text"
          class="el-icon-camera tb"
          @click.native="captureSxtDevice()"
        />
        <el-button
          type="text"
          class="el-icon-caret-right tb"
          @click.native="move('right','stop_right')"
        />
      </div>
      <div>
        <el-button
          type="text"
          class="el-icon-caret-bottom tb"
          @click.native="move('down','stop_down')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  controlSxt,
  captureSxtDevice
} from '@/api/sxt'
export default {
  name: "videoplay",
  props: {
    videoAdress: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => { }
    },
    play: {
      type: Boolean,
      default: false
    },
    showControl: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      capture: false,
      msg: '',
      player: Function,
      lcCommand: '',
      lcStartTime: null,
      lcEndTime: null,
      nowAction: '',
      timeoutid: undefined
    }
  },
  computed: {
    ...mapGetters(['yingshi_token'])
  },
  watch: {
    play (val) {
      if (val) {
        this.playVideo()
      } else {
        this.player.remove()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.playVideo()
    })
  },
  methods: {
    move (action1, action2) {
      var this_ = this;

      if (this_.nowAction === action1) {

        this.timeoutid && clearTimeout(this.timeoutid)
        this.timeoutid = setTimeout(function () {
          this_.nowAction = ''
          this_.epCtr(action2);
        }, 800)

        return;
      }
      this_.epCtr(action1);
      this_.nowAction = action1;

      this.timeoutid && clearTimeout(this.timeoutid)
      this.timeoutid = setTimeout(function () {
        this_.nowAction = ''
        this_.epCtr(action2);
      }, 800)
    },
    epCtr (command) {
      var cameraType = this.row.type
      if (!cameraType) {
        cameraType = "JK-SXT"
      }
      if (cameraType === 'JK-SXT' || cameraType === 'JK-SXT3') {
        controlSxt({ hd_device_id: this.row.id, command: command }).then(
          res => {
            if (res.code === 200) {
              // 操作成功
            } else {
              this.$message.error(res.msg)
            }
          }
        )
      } else if (cameraType === 'JK-SXT4') {
        if (command.indexOf('stop') === -1) { // 开始按下
          this.lcCommand = command
          this.lcStartTime = new Date()
        } else { // 停止按下

          this.lcEndTime = new Date()
          var dateDiff = this.lcEndTime.getTime() - this.lcStartTime.getTime()
          controlSxt({ hd_device_id: this.row.id, command: this.lcCommand, duration: dateDiff }).then(
            res => {
              if (res.code === 200) {
                // 操作成功
              } else {
                this.$message.error(res.msg)
              }
            }
          )
        }
      }
    },
    captureSxtDevice () {

      if (this.capture) {
        return;
      }
      this.capture = true;
      captureSxtDevice({ hd_device_id: this.row.id }).then(res => {
        if (res.code === 200) {
          // this.$message.success('拍照成功')
          this.downloadIamge(res.data.storeUrl);
          this.capture = false;
        } else {
          this.capture = false;
          this.$message.error('拍照失败')
        }
      }).catch(res => {
        this.capture = false;
        this.$message.error('拍照失败')
      })
    },

    downloadIamge (imgsrc) {
      let name = "截图"
      let url = process.env.IMG_URL + imgsrc
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          this.download(url, name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }

    },
    download (href, name) {
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },
    playVideo () {
      /* eslint-disable */
      this.player = cyberplayer(this.$refs.video).setup({
        width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)this.$refs.video.offsetWidth
        height: '100%', // 高度，也可以支持百分比
        title: '基本功能', // 标题
        file: this.videoAdress, // 播放地址
        autostart: true, // 是否自动播放
        stretching: 'exactfit', // 拉伸设置
        repeat: false, // 是否重复播放
        volume: 100, // 音量
        controls: true, // controlbar是否显示
        starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
        ak: '8fa5f129aa3e4d52af02666e4d43884a', // 百度云的 AK
        controlbar: {
          barLogo: false
        }
      })
      //this.player.setFullscreen(true)
    }
  }
}
</script>
<style>
.tb {
  text-align: center;
  width: 10px;
  height: 10px;
}
.card {
  padding: 0px !important;
  margin: 0px !important;
}
.card .bar {
  width: 100%;
}
.card .bar table {
  width: 100%;
}
</style>
