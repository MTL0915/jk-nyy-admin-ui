<template>
  <div
    id="bodyDiv"
    style="display:flex ;overflow-x:auto"
  >
    <div
      v-for="(item, index) in pictureDatas"
      :key="index"
      style="position: relative;padding: 0px;margin-right: 10px;"
      class="img_list"
    >
      <el-image
        :ref="item.id"
        :src="getImage(item.thumbnail_path)"
        fit="cover"
        style="width: 190px; height: 150px;margin:3px;"
        @click="recognition(item.id)"
      />
      <div style="position: absolute;top:5px;right: 5px;">
        <el-tag
          type="success"
          size="mini"
          v-show="device_type_code=='JK-ZS'"
        >{{getRecognitionResult(item.status,device_type_code)}}</el-tag>
      </div>
    </div>
    <CameraPhotoDetails ref="CameraPhotoDetails" />
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { getImage, getRecognitionResult } from '@/utils/image_util'
import { findCameraByHd_device_id } from '@/api/hd_device_camera'
//require('echarts/theme/macarons') // echarts theme
import { parseTime } from '@/utils/index'
import CameraPhotoDetails from '@/views/base/video/module/CameraPhotoDetails'

export default {
  components: {
    CameraPhotoDetails
  },
  data () {
    return {
      hd_device_id: '',
      device_type_code: '',
      pictureDatas: [],
      sensorShow: false,
    }
  },
  methods: {
    parseTime,
    getImage,
    getRecognitionResult,
    show (hd_device_id, device_type) {
      this.hd_device_id = hd_device_id
      this.device_type_code = device_type
      this.getPictureData()
    },
    setLogPanelHeight () {
      var main_height = $(".app-main")[0].scrollHeight;
      if (main_height > 0) {
        $("#logPanel").css("height", (main_height - 325) + "px");
      }
    },
    getPictureData () {
      this.$nextTick(() => {
        let count = parseInt($('#bodyDiv').width() / 200)
        findCameraByHd_device_id({ hd_device_id: this.hd_device_id, page: 1, size: count }).then(res => {
          this.pictureDatas = res.data.content
        })
      })
    },
    recognition (id) {
      this.$refs.CameraPhotoDetails.hd_device_id = this.hd_device_id
      this.$refs.CameraPhotoDetails.getData(id)
    },
    formatInsertDate (obj) {
      if (!obj.insert_date) {
        return ''
      }
      return formatDate(new Date(obj.insert_date), 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style lang="stylus" scoped>
.img_list img
  width 250px
  height 200px
</style>