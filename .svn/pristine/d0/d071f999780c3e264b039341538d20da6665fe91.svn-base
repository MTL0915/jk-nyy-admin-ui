<template>
  <div
    style="padding-bottom: 30px;"
    class="Content"
  >
    <el-dialog
      id="trigger_dialog"
      :visible.sync="triggerVisible"
      title="预警报警设置"
      class="dialog_header1"
      append-to-body
      width="500px"
      top="10vh"
      @open="getSensorTriggerInfo"
    >
      <table id="trigger_table">
        <tr>
          <td style="width:35%">传感器名称：</td>
          <td>{{ sensorInfo.name }}</td>
        </tr>
        <tr>
          <td>传感器类型：</td>
          <td>{{ sensorInfo.hd_sensor_type_name }},单位:{{ sensorInfo.sensor_type_unit ? sensorInfo.sensor_type_unit:'无' }}</td>
        </tr>
        <tr>
          <td>隶属设备：</td>
          <td>{{ sensorInfo.device_name }}（{{ sensorInfo.device_id }}）</td>
        </tr>
        <tr>
          <td>通道号：</td>
          <td>{{ sensorInfo.channel }}</td>
        </tr>
        <tr>
          <td>触发条件：</td>
          <td>
            <div v-show="sensor_data_show">
              <div class="demo-input">
                超出：
                <el-input
                  v-model="x"
                  placeholder="上限值"
                  @blur="isXNumber"
                />
              </div>
              <div
                class="demo-input"
                style="margin-top:10px;"
              >
                低于：
                <el-input
                  v-model="y"
                  placeholder="下限值"
                  @blur="isYNumber"
                />
              </div>
              <div style="margin-top:10px;">
                持续时间（分钟）：
                <el-input-number
                  v-model="m"
                  :min="0"
                  :max="180"
                  :precision="0"
                  size="small"
                />
              </div>
            </div>
            <div v-show="sensor_switch_show">
              <template>
                <el-radio-group v-model="channel_value">
                  <el-radio :label="1">打开</el-radio>
                  <el-radio :label="2">关闭</el-radio>
                </el-radio-group>
                <div style="margin-top:10px;">
                  持续时间（分钟）：
                  <el-input-number
                    v-model="m"
                    :min="0"
                    :max="180"
                    :precision="0"
                    size="small"
                  />
                </div>
              </template>
            </div>
            <div v-show="sensor_window_show">
              <template>
                <el-radio-group v-model="channel_value">
                  <el-radio :label="8">打开</el-radio>
                  <el-radio :label="9">关闭</el-radio>
                  <el-radio :label="10">暂停</el-radio>
                  <div style="margin-top:10px;">
                    持续时间（分钟）：
                    <el-input-number
                      v-model="m"
                      :min="0"
                      :max="180"
                      :precision="0"
                      size="small"
                    />
                  </div>
                </el-radio-group>
              </template>
            </div>
          </td>
        </tr>
        <tr>
          <td>是否报警：</td>
          <td>
            <el-switch v-model="status" />
          </td>
        </tr>
        <tr>
          <td
            style="text-align:center;"
            colspan="2"
          >
            <el-button @click="triggerVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="saveTrigger"
            >确 定</el-button>
          </td>
        </tr>
      </table>

    </el-dialog>
  </div>

</template>

<script>
import { isFloat } from '@/utils/basetype'
import { addSensorTrigger, getSensorTrigger } from '@/api/trigger'
export default {
  name: 'TriggerPanel',
  data () {
    return {
      triggerVisible: false,
      sensorInfo: {},
      sensor_data_show: false,
      sensor_switch_show: false,
      sensor_window_show: false,
      channel_value: 0,
      status: 0,
      x: '',
      y: '',
      m: 0,
      id: ''
    }
  },
  methods: {
    getSensorTriggerInfo () {
      getSensorTrigger({
        'hd_device_sensor_id': this.sensorInfo.id
      }).then(res => {
        var data = res.data
        if (res.code === 200 && data) {
          this.id = data.id
          this.x = data.x ? data.x : ''
          this.y = data.y ? data.y : ''
          this.m = data.m ? data.x : 0
          this.status = data.status === 1
          this.channel_value = data.channel_value
        } else {
          this.id = ''
          this.x = ''
          this.y = ''
          this.m = 0
          this.status = false
          this.channel_value = 0
        }
      })
    },
    showPanel (obj) {
      this.sensorInfo = obj
      var channelType = obj.channelType
      var hd_sensor_type_code = obj.hd_sensor_type_code
      if (channelType === 1) {
        if (hd_sensor_type_code === '101') {
          this.sensor_switch_show = true
          this.sensor_window_show = false
        } else {
          this.sensor_switch_show = false
          this.sensor_window_show = true
        }
        this.sensor_data_show = false
      } else if (channelType === 3 || channelType === 5) {
        this.sensor_data_show = true
        this.sensor_switch_show = false
        this.sensor_window_show = false
      } else {
        this.$message.info('暂不支持触发器设置！')
        return
      }
      this.triggerVisible = true
    },
    isXNumber (e) {
      if (this.x === '') {
        return
      }
      if (!isFloat(this.x)) {
        this.x = ''
        e.currentTarget.focus()
      }
    },
    isYNumber (e) {
      if (this.y === '') {
        return
      }
      if (!isFloat(this.y)) {
        this.y = ''
        e.currentTarget.focus()
      }
    },
    saveTrigger () {
      var channelType = this.sensorInfo.channelType
      if (channelType === 3 || channelType === 5) {
        if (this.x === '' && this.y === '') {
          this.$message.error('上限值或下限值不能同时为空！')
          return
        }
      }

      var form = {
        'hd_device_sensor_id': this.sensorInfo.id,
        'status': this.status ? 1 : 0,
        'x': this.x,
        'y': this.y,
        'm': this.m,
        'channel_value': this.channel_value,
        'id': this.id
      }
      addSensorTrigger(form).then(res => {
        if (res.code === 200) {
          this.$message.success('设置成功！')
          this.triggerVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
.demo-input >>> .el-input
  width 100px

.demo-input >>> .el-input__inner
  height 35px
  line-height 35px

.dialog_header1 >>> .el-dialog__header
  padding-top 10px

.dialog_header1 >>> .el-dialog__headerbtn
  top 13px

.dialog_header1 >>> .el-dialog__body
  padding 10px 20px

.dialog_header1 >>> .button-is-selected
  background #1890ff
  border-color #1890ff
  color #FFFFFF

.dialog_header1 >>> .button-is-not-selected
  color #1890ff
  background #e8f4ff
  border-color #a3d3ff

#trigger_table
  width 100%
  font-size 16px

#trigger_table tr
  height 30px
  line-height 30px

#trigger_table td
  vertical-align super
</style>
