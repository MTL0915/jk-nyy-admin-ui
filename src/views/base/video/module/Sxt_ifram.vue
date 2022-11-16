<template>
  <div
    ref='divs'
    :class="full?'full':'card'"
  >
    <!-- <div
      @dblclick="fullScreenVideo"
      style="position: absolute;height: 100%;width: calc(100% - 80px);z-index:100;"
    /> -->
    <div
      v-if="autoPlay===false"
      style="position: absolute;height: 100%;width: 100%;z-index:100;"
      @click="autoPlay=true"
    />
    <!-- <div style="width:100%;height:100%;border-width: 0px">
      <sxt
        :hd_device_id="hd_device_id"
        :device_id="device_id"
        :playWay="playWay"
        :rs_facilities_id="rs_facilities_id"
        :autoPlay="autoPlay"
      />
    </div> -->
    <iframe
      ref="sxt"
      style="width:100%;height:100%;border-width: 0px"
      :src="'/sxt?hd_device_id='+hd_device_id+'&device_id='+device_id+'&playWay='+playWay+'&rs_facilities_id='+rs_facilities_id+'&autoPlay='+autoPlay+'&unableControl='+unableControl"
    />
  </div>
</template>
<script>
// import sxt from './Sxt'

export default {
  components: {
    // sxt
  },
  props: {
    autoPlay: {
      //是否自动播放
      type: Boolean,
      default: true
    },
    deviceinfo: {
      // 设备ID
      type: Object,
      default: null
    },
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
    playWay: {
      //播放方式
      type: String,
      default: ''
    },
    rs_facilities_id: {
      type: String,
      default: ''
    },
    unableControl: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      full: false
    };
  },
  mounted () {
    if (!this.unableControl) {
      var IframeOnClick = {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
          this.element = arguments[0];
          this.cb = arguments[1];
          this.hasTracked = false;
        },
        track: function (element, cb) {
          this.iframes.push(new this.Iframe(element, cb));
          if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
          }
        },
        checkClick: function () {
          if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
              if (activeElement === this.iframes[i].element) {
                document.activeElement.blur();
                // 如果点击的是这个iframe 这个iframe处于未被点击的状态
                if (this.iframes[i].hasTracked == false) {
                  // 标记为被点击并等待下一次点击
                  this.iframes[i].hasTracked = true;
                  // 如果200毫秒内没有被在此点击重置次状态
                  this.iframes[i].setTimeout = setTimeout(function (iframe) {
                    iframe.hasTracked = false;
                  }, 800, this.iframes[i]);
                } else {
                  // 如果判断这个已经是被点击的状态了
                  // 清除掉等待事件
                  clearTimeout(this.iframes[i].setTimeout);
                  // 修改为未选择状态
                  this.iframes[i].hasTracked = false;
                  // 触发事件
                  this.iframes[i].cb.apply(window, []);
                }
              } else {
                this.iframes[i].hasTracked = false;
              }
            }
          }
        }
      };

      IframeOnClick.track(this.$refs.sxt, () => {

        this.fullScreenVideo()
      })
    }
  },
  watch () {
    // const _this = this
    // if (this.full) {
    //   document.onkeydown = function (e) {
    //     if (e.code === 'Escape') {
    //       _this.full = false
    //     }
    //   }
    // }
  },
  methods: {

    fullScreenVideo () {
      this.full = !this.full
      const _this = this
      if (this.full) {
        document.onkeydown = function (e) {
          if (e.code === 'Escape') {
            _this.full = false
          }
        }
      }
    }
  }
}
</script>
<style>
.card {
  position: relative;
  width: 100%;
  height: 100%;
}
.full {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
}
</style>