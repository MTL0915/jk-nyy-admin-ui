<template>
  <div class="card">
    <iframe
      id="ysOpenDevice"
      width="100%"
      height="500px"
      :src="url"
    />
  </div>
</template>
<script>

import { getSxtUrlById, getHikcloudToken, getYingShiToken } from '@/api/sxt'
import { getDetailById } from '@/api/equip'

export default {
  props: {
    hd_device_id: {
      type: String,
      default: null
    },
    device_id: {
      type: String,
      default: null
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    yingshiBegin: {
      type: String,
      default: null
    },
    yingshiEnd: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      url: null,
      token: null,
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.hd_device_id || this.device_id) {
        getDetailById({
          hd_device_id: this.hd_device_id,
          device_id: this.device_id,
          returnInnerStatus: false
        }).then(res => {
          if (res.code === 200) {
            let communication = JSON.parse(res.data.communication)
            if ('JK-SXT' === communication.type) {
              getYingShiToken().then(res2 => {
                if (res2.code === 200) {
                  this.token = res2.data
                  this.getSxtUrlById()
                } else {
                  this.$message.error(res2.msg)
                }
              })
            } else if ('JK-SXT5' === communication.type) {
              getHikcloudToken().then(res2 => {
                if (res2.code === 200) {
                  this.token = res2.data
                  this.getSxtUrlById()
                } else {
                  this.$message.error(res2.msg)
                }
              })
            } else {
              this.$message.error('该设备不支持此播放方式')
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('设备不存在')
      }
    },
    getSxtUrlById () {
      getSxtUrlById({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        protocol: 'ezopen',
      }).then(res3 => {
        if (res3.code === 200) {
          let autoplay = ''
          if (this.autoplay) {
            autoplay = '&autoplay=1'
          }
          let yingshiBegin = ''
          if (this.yingshiBegin) {
            yingshiBegin = '&begin=' + this.yingshiBegin.replace(/\D/g, '')
          }
          let yingshiEnd = ''
          if (this.yingshiEnd) {
            yingshiEnd = '&end=' + this.yingshiEnd.replace(/\D/g, '')
          }
          this.url = 'https://open.ys7.com/ezopen/h5/iframe_se?url=' + res3.data + autoplay + '&accessToken=' + this.token + yingshiBegin + yingshiEnd
        } else {
          this.$message.error(res3.msg)
        }
      })
    },

    // getSrc () {
    //   let autoplay = ''
    //   if (this.autoplay) {
    //     autoplay = '&autoplay=1'
    //   }
    //   let yingshiBegin = ''
    //   if (this.yingshiBegin) {
    //     yingshiBegin = '&begin=' + this.yingshiBegin.replace(/\D/g, '')
    //   }
    //   let yingshiEnd = ''
    //   if (this.yingshiEnd) {
    //     yingshiEnd = '&end=' + this.yingshiEnd.replace(/\D/g, '')
    //   }
    //   let url = 'https://open.ys7.com/ezopen/h5/iframe_se?url=' + this.yingshiAddress + autoplay + '&accessToken=' + this.yingshiToken + yingshiBegin + yingshiEnd
    //   return url
    // }
  }
}
</script>
<style>
.full {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
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
</style>