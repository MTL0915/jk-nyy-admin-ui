<template>
  <div ref="player_div" style="width:100%;height:100px">
  </div>
</template>

<script>

export default {
  name: 'BaiduPlayer',
  components: { },
  mixins: [], //混入
  props:{
    address:{
      type:String,
      default:""
    }
  },
  data() {
    return {
        baiduPlayer:null
    }
  },
 
  created() {
    let script = document.createElement('script');
    script.id = "cyberplayerJs";
    let url = '/static/player/cyberplayer.js';
    script.src = url
    document.head.appendChild(script);
  },
  watch:{
      address:function(){
        this.play();
      }
  },
  methods: {
      play(){
        console.log("百度播放器流地址：" + this.address);
        if (!this.address){
          return;
        }
        this.baiduPlayer = cyberplayer(this.$refs.player_div).setup({
            width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)
            height: '100%', // 高度，也可以支持百分比
            title: '', // 标题
            file: this.address, // 播放地址
            autostart: true, // 是否自动播放
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
      }
  }
}
</script>

<style lang="stylus" scoped>
</style>