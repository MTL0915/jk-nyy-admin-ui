<template>
  <div
    class="card"
    style="position: relative;"
  >
    <div ref="video" />
    <div
      v-show="showControl"
      style="width: 80px;text-align: center;position:absolute;right:25px;bottom:60px;"
    >
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { controlSxt, captureSxtDevice } from '@/api/sxt'
export default {
  name: 'Videoplay',
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
      msg: '',
      player: Function,
      lcCommand: '',
      lcStartTime: null,
      lcEndTime: null
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
    epCtr (command) {
      const comm_json = JSON.parse(this.row.communication)
      var cameraType = comm_json.type
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
      captureSxtDevice({ hd_device_id: this.row.id }).then(res => {
        if (res.code === 200) {
          this.$message.success('拍照成功')
        } else {
          this.$message.error('拍照失败')
        }
      })
    },
    playVideo () {

      /* eslint-disable */
      this.player = cyberplayer(this.$refs.video).setup({
        width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)this.$refs.video.offsetWidth
        height: 300, // 高度，也可以支持百分比
        title: '基本功能', // 标题
        file: this.videoAdress, // 播放地址
        autostart: true, // 是否自动播放
        stretching: 'uniform', // 拉伸设置
        repeat: false, // 是否重复播放
        volume: 100, // 音量
        controls: true, // controlbar是否显示
        starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
        ak: '8fa5f129aa3e4d52af02666e4d43884a', // 百度云的 AK
        controlbar: {
          barLogo: false
        }
      })
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
