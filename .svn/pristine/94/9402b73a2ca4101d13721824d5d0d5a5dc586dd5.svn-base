<template>
  <div>
    <el-row>
      <el-col>
        <label>设备名称:
          <span>{{ form.name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>设备类型:
          <span>{{ form.hd_device_type_name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>所在区域:
          <span>{{ form.area_name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>所属组织:
          <span>{{ form.bs_org_name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>所属基地:
          <span>{{ form.bs_base_name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>所属地块:
          <span>{{ form.rs_facilities_name }}</span>
        </label>
      </el-col>
      <el-col>
        <label>创建人:
          <span>{{ form.create_user }}</span>
        </label>
      </el-col>
      <!-- <el-col>
        <label>经纬度:
          <span>{{ form.longitude }}{{ form.latitude ? ',':'' }}{{ form.latitude }}</span>
          <span style="margin-left:10px"><el-button :loading="button_loading" type="success" size="mini" @click="showLocation">设备定位</el-button></span>
        </label>
      </el-col> -->
      <!-- <el-col>
        <label>经纬度:
          <span>{{ form.longitude }}</span>
        </label>
      </el-col>
      <el-col>
        <label>纬度:
          <span>{{ form.latitude }}</span>
        </label>
      </el-col> -->
      <el-col>
        <label>创建时间:
          <span>{{ form.create_date }}</span>
        </label>
      </el-col>
      <!--
      <el-col>
        <label>设备图片:
          <img
            :src="form.image_path"
            class="avatar"
          >
        </label>
      </el-col>
      -->
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import { formatDate } from '@/utils/date'
export default {
  name: 'BaseInfo',
  props: {
    hd_device_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      button_loading: false
    }
  },
  methods: {
    formatResponseTime(system_response_time) {
      if (!system_response_time) {
        return ''
      }
      return formatDate(new Date(system_response_time), 'yyyy-MM-dd hh:mm:ss')
    },
    setData(data) {
      this.form = data
      this.form.image_path = this.form.image_path && this.getLogo(this.form.image_path)
      this.form.create_date = this.form.create_date && parseTime(this.form.create_date)
    },
    showLocation() {
      var form = this.form
      var longitude = form.longitude
      var latitude = form.latitude

      if (!longitude) {
        longitude = 113.35063189750892 - Math.random() * 0.000001
        latitude = 22.182511280308976 - Math.random() * 0.000001

        longitude = 113.35063189750892 - Math.random() * 0.0001
        latitude = 22.182511280308976 - Math.random() * 0.0001
      }

      var my = this
      this.button_loading = true
      setTimeout(function() {
        form.longitude = longitude + ''
        form.latitude = latitude + ''
        my.button_loading = false
      }, 1000)
    },
    getLogo(img) {
      if (img === null || img === '') {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    }
  }
}
</script>

<style lang="stylus" scoped>
label
  text-align right
  float left
  font-size 14px
  color #606266
  line-height 40px
  padding 0 12px 0 0
  -webkit-box-sizing border-box
  box-sizing border-box
</style>
