<template>
  <div
    class="body"
    :style="{backgroundColor:'#eeeeee',width:'100%',height:'100%',backgroundImage:'url('+qrcode.background_image+')'}"
  >
    <div class="body_head">
      <a
        class="el-icon-setting set_link"
        style="float:right;margin-right:10px"
        href="/function/qrcode/login?id=319"
      />
    </div>
    <div class="body_text">欢迎加入{{qrcode.title}}</div>
    <div style="text-align:center;margin-bottom:40px">
      <img :src="qrcode.icon_url" style="max-width: 80px;min-width: 70px;max-height: 80px;min-height: 70px;" />
    </div>
    <div style="text-align:center">
      <img :src="qrcode.qr_url" style="max-width: 260px;min-width: 220px;max-height: 260px;min-height: 220px;" />
    </div>
    <div class="body_des">请长按二维码识别加入群</div>
  </div>
</template>
<script>

import default_icon_url from '@/assets/open/qrcode/u4.svg'
import default_qr_url from '@/assets/open/qrcode/qrcodeblank.png'
import {getById} from './qrcode'

export default {
  data() {
    return {
      id : '',
      qrcode: {
        title: '农语云平台',
        background_image: '',
        icon_url: default_icon_url,
        qr_url: default_qr_url
      }
    }
  },

  created(){
    var id = this.$route.query.id;
    this.id = id;
    this.$nextTick(() => {
      getById(this.id).then((res) => {
        if (res.code === 200){
          var data = res.data
          if (data.background_image){
            this.qrcode.background_image = data.background_image
          }

          if (data.title){
            this.qrcode.title = data.title
          }

          if (data.icon_url){
            this.qrcode.icon_url = data.icon_url
          }

          if (data.qr_url){
            this.qrcode.qr_url = data.qr_url
          }
        }
      })
    })
  }
}
</script>
<style scoped>
.body >>> .body_head {
  height: 30px;
  line-height: 30px;
}
.body >>> .set_link {
  float: right;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  font-size: 23px;
  margin-top: 15px;
  color: #3399cc;
  font-weight: 500;
  cursor: pointer;
}
.body >>> .body_text {
  text-align: center;
  color: #0057b6;
  font-weight: bold;
  font-size: 18px;
  height: 120px;
  line-height: 120px;
}
.body >>> .body_text img {
  min-height: 200px;
  min-width: 200px;
  width: 250px;
  height: 250px;
}
.body >>> .body_des {
  line-height: 30px;
  height: 30px;
  text-align: center;
  font-size: 16px;
}
</style>