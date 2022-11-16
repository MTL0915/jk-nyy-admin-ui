<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="'设备信息('+ device_id +')'"
      append-to-body
      :before-close="handleClose"
    >
      <div
        class="card"
        style="padding:20px !important;"
      >
        <el-tabs
          v-model="activeName"
          @tab-click="changeTab"
        >
          <el-tab-pane
            label="基础信息"
            name="first"
          >
            <base-info ref="baseInfo" />
          </el-tab-pane>

          <el-tab-pane
            v-if="$store.state.baseinfo.cur_user_level <= 4"
            label="实时状态"
            name="device-now"
          >
            <device-now ref="deviceNow" />
          </el-tab-pane>
          <el-tab-pane
            v-if="$store.state.baseinfo.cur_user_level <= 4"
            label="设备数据"
            name="device-data"
          >
            <device-data ref="deviceData" />
          </el-tab-pane>
          <template v-if="devicePictureShow">
            <el-tab-pane
              label="上传照片"
              name="device-picture"
            >
              <device-picture ref="devicePicture" />
            </el-tab-pane>
          </template>
          <template v-if="sensorDataShow">
            <el-tab-pane
              label="传感器数据"
              name="second"
            >
              <collected-data
                :hd_device_name="hd_device_name"
                :hd_device_id="hd_device_id"
                :active-name="activeName"
              />
            </el-tab-pane>
          </template>
          <!-- <el-tab-pane
            label="关联用户"
            name="third"
          >
            <associated-users :device_id="hd_device_id" />
          </el-tab-pane> -->
          <el-tab-pane
            label="设备日志"
            name="fourth"
          >
            <operation-log
              ref="deviceLog"
              :hd_device_id="hd_device_id"
            />
          </el-tab-pane>
          <template v-if="fertigation">
            <el-tab-pane
              label="肥桶设置"
              name="five"
            >
              <fertigation
                ref="fertigation"
                :hd_device_id="hd_device_id"
              />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>

    </el-dialog>
    <form
      v-show="false"
      ref="form"
      action="http://wlw2.zjtpyun.com/user/vali/login"
      method="post"
      style="display:none"
      target="_blank"
    >
      <input
        type="text"
        name="username"
        value="nnwm"
      >
      <input
        type="password"
        name="password"
        value="123456"
      >
      <input
        type="hidden"
        name="redirectURL"
        value="/"
      >
      <input
        type="submit"
        name="提交"
      >
    </form>
  </div>
</template>

<script>
import { getDetailById } from '@/api/equip'
import BaseInfo from './BaseInfo'
import DeviceNow from './DeviceNow'
import CollectedData from './CollectedData'
import DevicePicture from './DevicePicture'
import DeviceData from './DeviceData'
import Fertigation from './Fertigation'
import AssociatedUsers from './Users'
import OperationLog from './Log'
import LedConfig from './LedConfig'

export default {
  name: 'EquipDetail',
  components: {
    LedConfig,
    DeviceNow,
    BaseInfo,
    CollectedData,
    AssociatedUsers,
    OperationLog,
    DeviceData,
    DevicePicture,
    Fertigation
  },
  data () {
    return {
      textarea: '',
      activeName: 'first',
      dialogVisible: false,
      hd_device_id: '',
      communication: '',
      hd_device_name: '',
      device_id: '',
      data: '',
      devicePictureShow: false,
      sensorDataShow: false,
      fertigation: false,
      isLED: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
      this.$refs.deviceLog.initPage();
    },
    changeTab () {
      if (this.activeName === 'device-now') {
        this.$refs.deviceNow.showDevicePropertyValue(this.hd_device_id)
      } else if (this.activeName === 'device-data') {
        this.$refs.deviceData.showData(this.hd_device_id)
      } else if (this.activeName === 'device-picture') {
        this.$refs.devicePicture.show(this.hd_device_id)
      } else if (this.activeName === 'fourth') {
        this.$refs.deviceLog.showDate()
      } else if (this.activeName === 'five') {
        this.$refs.fertigation.dataLoad()
      } else if (this.activeName === 'led') {
        this.$refs.ledconfig.getPara()
      }
    },
    handelWatch (hd_device_id, device_id) {
      if (device_id === 'CD01A-1900001') {
        this.$refs.form.submit()
      } else {
        this.hd_device_id = hd_device_id
        this.device_id = device_id
        this.activeName = 'first'
        this.dialogVisible = true
        this.sensorDataShow = false

        getDetailById({ 'hd_device_id': hd_device_id }).then(res => {
          this.hd_device_name = res.data.name
          this.communication = res.data.communication
          this.data = res.data
          this.$refs.baseInfo.setData(res.data)
          if (this.data.sensorNum > 0) {
            this.sensorDataShow = true
          } else {
            this.sensorDataShow = false
          }

          this.fertigation = false
          this.isLED = false
          if (this.data.device_id.slice(0, 2) === 'SF') {
            this.fertigation = true
          } else if (this.data.device_type === 'JK-LD') {
            this.isLED = true
          }

          if (this.data.pictureNum > 0) {
            this.devicePictureShow = true
          } else {
            this.devicePictureShow = false
          }

          if (this.activeName === 'second' && this.sensorDataShow) {
            this.activeName = 'second'
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()
  margin 0

.el-dialog__wrapper >>> .el-dialog__body
  padding-top 0px

.el-dialog__wrapper >>> .el-dialog__header
  padding-top 10px
</style>
