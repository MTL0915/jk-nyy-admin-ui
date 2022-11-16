<template>
  <div ref="video" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      player: Function
    }
  },
  computed: {
    ...mapGetters(['yingshi_token'])
  },
  mounted() {
    this.playVideo()
  },
  beforeDestroy() {
    this.player.remove()
  },
  methods: {
    playVideo() {
      /* eslint-disable */
      this.player = cyberplayer(this.$refs.video).setup({
        width: 600, // 宽度，也可以支持百分比(不过父元素宽度要有)
        height: 400, // 高度，也可以支持百分比
        title: '基本功能', // 标题
        file: this.value.communication.url.hd.rtmp, // 播放地址
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
