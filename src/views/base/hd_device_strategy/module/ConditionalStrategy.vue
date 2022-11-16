<template>
  <div>
    <el-dialog
      :visible.sync="dialogForm"
      :style="{'padding-top':'0px'}"
      append-to-body
      title="条件控制策略设置"
      width="960px"
    >
      <div style="padding-left:15px;padding-right:10px">
        <el-form>
          <el-row v-if="deviceSelectedShow">
            <el-col :style="{'width':'100%'}">
              <el-form-item label="操作设备">
                &nbsp;&nbsp;
                <el-cascader
                  v-model="target_device_id"
                  :options="orgBaseFacilitiesDevices"
                  :props="{ label:'name',value:'id' }"
                  size="small"
                  placeholder="请选择操作设备"
                  collapse-tags
                  clearable
                  @change="targetDeviceSelected"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="font-size: 15px;font-weight: bold;color: #606266;">触发条件：</span>
              <el-card
                v-for="(condition_config,i) in strategy.condition_configs"
                :key="i"
                :style="{'margin-top':'5px'}"
                class="box-card"
              >
                判断类型：
                <el-select
                  v-model="condition_config.type"
                  placeholder="请选择"
                  style="width:90px"
                  size="small"
                  @change="changeConditionType(condition_config)"
                >
                  <el-option
                    value="value"
                    label="测量值"
                  >
                    测量值
                  </el-option>
                  <el-option
                    value="time"
                    label="定时"
                  >
                    定时
                  </el-option>
                </el-select>
                <template v-if="condition_config.type === 'value'">
                  &nbsp;&nbsp;当
                  <el-cascader
                    v-model="condition_config.condition_sensor"
                    :options="filter_data_sensor_list"
                    :props="{ multiple: false,label:'name',value:'id' }"
                    placeholder="请选择数值传感器"
                    clearable
                    style="width:220px"
                    size="small"
                    @change="dataSensorSelected"
                  />
                  &nbsp;
                  <el-select
                    v-model="condition_config.opt"
                    placeholder="运算符"
                    style="width:110px"
                    size="small"
                  >
                    <el-option
                      v-for="optLabel in optLabels"
                      :key="optLabel.value"
                      :label="optLabel.label"
                      :value="optLabel.value"
                    />
                  </el-select>
                  &nbsp;
                  值:
                  <el-input
                    v-model="condition_config.value"
                    style="width: 70px;"
                    size="small"
                  />
                  <!-- &nbsp;&nbsp;
                  持续时间（分）：
                  <el-input-number v-model="condition_config.duration" :min="0" :precision="0" size="small" /> -->

                  <el-dropdown
                    split-button
                    size="small"
                    type="primary"
                    @command="handleCommand($event,i)"
                  >
                    <template v-if=" condition_config.join === 'and'">
                      并且
                    </template>
                    <template v-else-if=" condition_config.join === 'or'">
                      或者
                    </template>
                    <template v-else>
                      操作
                    </template>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="and">并且</el-dropdown-item>
                      <el-dropdown-item command="or">或者</el-dropdown-item>
                      <el-dropdown-item command="delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
                <template v-if="condition_config.type === 'time'">
                  &nbsp;&nbsp;在
                  <el-cascader
                    v-model="condition_config.weeks"
                    :options="week_day"
                    :props="{ multiple: true}"
                    :style="{'width':'150px'}"
                    size="mini"
                    placeholder="为空表示单次"
                    collapse-tags
                    clearable
                  />
                  &nbsp;
                  时间：
                  <el-time-select
                    v-model="condition_config.value"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30'
                    }"
                    :style="{'width':'100px'}"
                    size="small"
                    placeholder="请选择执行时间"
                  />
                  &nbsp;&nbsp;
                  持续时间（分）：
                  <el-input-number
                    v-model="condition_config.duration"
                    :min="1"
                    :precision="0"
                    size="small"
                  />

                  <el-dropdown
                    split-button
                    size="small"
                    type="primary"
                    @command="handleCommand($event,i)"
                  >
                    <template v-if=" condition_config.join === 'and'">
                      并且
                    </template>
                    <template v-else-if=" condition_config.join === 'or'">
                      或者
                    </template>
                    <template v-else>
                      操作
                    </template>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="and">并且</el-dropdown-item>
                      <el-dropdown-item command="or">或者</el-dropdown-item>
                      <el-dropdown-item command="delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-card>
            </el-col>
          </el-row>

          <el-row :style="{'margin-top':'10px'}">
            <el-col>
              <el-form-item label="执行动作">
                <el-radio-group v-model="strategy.action">
                  <el-radio
                    :style="{'margin-right':'15px'}"
                    :label="-1"
                  >无</el-radio>
                  <el-radio
                    :style="{'margin-right':'15px'}"
                    :label="1"
                  >开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row v-if="strategy.action !== -1">
            <el-col :style="{width:'100%'}">
              <el-form-item label="目标传感器">
                <el-cascader
                  v-model="strategy.target_sensor_ids"
                  :options="switch_sensor_list"
                  :props="{ multiple: true,label:'name',value:'id' }"
                  :style="{'width':'220px'}"
                  size="mini"
                  collapse-tags
                  placeholder="请选择传感器"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :style="{width: '240px'}">
              <el-form-item label="用户通知">
                <el-radio-group v-model="strategy.notice_status">
                  <el-radio
                    :style="{'margin-right':'15px'}"
                    :label="0"
                  >关闭</el-radio>
                  <el-radio :label="1">开启</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllSensorByHd_device_id } from '@/api/hd_device_sensor'
import { add, getOrgBaseFacilitiesDevices } from '@/api/hd_device_strategy'
import { isFloat } from '@/utils/basetype'
export default {
  name: 'ConditionalStrategy',
  data () {
    return {
      strategyVue: null,
      optLabels: [{ 'label': '等于', 'value': '=' }, { 'label': '大于', 'value': '>' }, { 'label': '小于', 'value': '<' }, { 'label': '不等于', 'value': '!=' }, { 'label': '大于等于', 'value': '>=' }, { 'label': '小于等于', 'value': '<=' }],
      week_day: [{ 'label': '周一', 'value': '1' }, { 'label': '周二', 'value': '2' }, { 'label': '周三', 'value': '3' }, { 'label': '周四', 'value': '4' }, { 'label': '周五', 'value': '5' }, { 'label': '周六', 'value': '6' }, { 'label': '周日', 'value': '7' }],
      dialogForm: false,
      form: {},
      switch_sensor_list: [], // 开关输入量传感器列表
      data_sensor_list: [], // 数据传感器列表，示例
      hd_device_id: '',
      strategy: { // 策略列表
        condition_configs: [{
          type: 'value', // 判断类型
          channel: '', // 通道号/周期
          weeks: [],
          condition_sensor: [],
          opt: '', // 运算符
          value: '', // 值
          duration: '', // 持续时间
          join: '' // 关联方式
        }],
        target_sensor_ids: [],
        action: -1, //  -1 无，1 开启 ，0 关闭
        notice_status: 0 // 0 不通知，1 通知

      },
      sensor_hd_device_id: '', // 用于过滤设备传感器
      orgBaseFacilitiesDevices: [],
      deviceSelectedShow: false,
      target_device_id: []
    }
  },
  computed: {
    // 计算属性的 getter
    filter_data_sensor_list: function () {
      var data_sensor_list = this.data_sensor_list
      for (var i = 0, len = data_sensor_list.length; i < len; i++) {
        if (this.sensor_hd_device_id === '' || data_sensor_list[i].id === this.sensor_hd_device_id) {
          data_sensor_list[i].disabled = false
        } else {
          data_sensor_list[i].disabled = true
        }
      }
      return data_sensor_list
    }
  },
  methods: {
    async showOrgBaseFacilitiesDevices (strategyVue) {
      var res = await getOrgBaseFacilitiesDevices()
      this.orgBaseFacilitiesDevices = res.data
      this.deviceSelectedShow = true
      this.target_device_id = []
      this.strategyVue = strategyVue
      this.initStrategy()
      this.dialogForm = true
    },
    targetDeviceSelected () {
      var target_device_id = this.target_device_id
      target_device_id[3] && this.showDialog(target_device_id[3], this.strategyVue)
    },
    dataSensorSelected () {
      var condition_configs = this.strategy.condition_configs
      for (var i = 0, len = condition_configs.length; i < len; i++) {
        var condition_config = condition_configs[i]
        if (condition_config.condition_sensor !== undefined && condition_config.condition_sensor.length > 0) {
          this.sensor_hd_device_id = condition_config.condition_sensor[0]
          return
        }
      }
      this.sensor_hd_device_id = ''
    },
    showDialog (hd_device_id, strategyVue) {
      this.hd_device_id = hd_device_id
      this.strategy = {}
      this.switch_sensor_list = []
      this.data_sensor_list = []
      this.sensor_hd_device_id = ''
      this.strategyVue = strategyVue

      findAllSensorByHd_device_id(hd_device_id).then(res => {
        var data = res.data
        var _this = this
        _this.setData_sensorAndSwitch_sensor(data)

        this.initStrategy()
        this.dialogForm = true
      })
    },
    showStrategyDialog (strategy, strategyVue) {
      this.deviceSelectedShow = false
      this.strategy = strategy
      this.strategyVue = strategyVue
      var hd_device_id = strategy.hd_device_id
      this.hd_device_id = hd_device_id
      this.switch_sensor_list = []
      strategy.target_sensor_ids = this.getTarget_sensor_ids(strategy.hd_device_sensor_ids)

      findAllSensorByHd_device_id(hd_device_id).then(res => {
        var data = res.data
        var _this = this

        _this.setData_sensorAndSwitch_sensor(data)

        var condition_configs = strategy.condition_configs
        for (var i = 0, len = condition_configs.length; i < len; i++) {
          var condition_config = condition_configs[i]
          if (condition_config.type === 'time') {
            var channelTwo = condition_config.channel.toString(2).split('')
            var weeks = []
            for (var j = 0, len2 = channelTwo.length; j < len2; j++) {
              if (channelTwo[j] === '1') {
                weeks.push([j + 1])
              }
            }
            condition_config.weeks = weeks
          } else if (condition_config.type === 'value') {
            var hd_device_sensor_id = condition_configs[i].hd_device_sensor_id
            condition_configs[i].condition_sensor = this.getConditionSensor(hd_device_sensor_id)
          }
        }

        this.dialogForm = true
      })
    },
    // 设置阀门传感器与数值传感器
    setData_sensorAndSwitch_sensor (data) {
      var hd_device_id = this.hd_device_id
      for (var i = 0, len = data.length; i < len; i++) {
        // 设置数值传感器
        var sensor_list = data[i].sensor_list
        for (var j = 0, len2 = sensor_list.length; j < len2; j++) {
          var sensor = sensor_list[j]

          if (sensor.channelType === 3 || sensor.channelType === 5) {
            var data_sensor_list = this.data_sensor_list
            var data_sensor = null
            for (var z = 0, len3 = data_sensor_list.length; z < len3; z++) {
              if (data_sensor_list[z].id === data[i].id) {
                data_sensor = data_sensor_list[z]
              }
            }
            if (data_sensor !== null) {
              data_sensor.children.push({
                name: sensor.name,
                id: sensor.id
              })
            } else {
              data_sensor_list.push({
                name: data[i].name,
                id: data[i].id,
                disabled: false,
                children: [{
                  name: sensor.name,
                  id: sensor.id
                }]
              })
            }
          }
          // 设置开关输入量传感器
          if (data[i].id === hd_device_id && sensor.channelType === 1) {
            this.switch_sensor_list.push({
              name: sensor.name,
              id: sensor.id
            })
          }
        }
      }
    },
    save () {
      var strategy = this.strategy

      var hd_device_sensor_ids = []

      var condition_configs = strategy.condition_configs
      for (var i = 0, len = condition_configs.length; i < len; i++) {
        var condition_config = condition_configs[i]
        if (condition_config.type === 'value') {
          if (condition_config.condition_sensor === undefined || condition_config.condition_sensor.length === 0) {
            this.$message.error('数值传感器不能为空！')
            return
          }

          if (condition_config.opt === '') {
            this.$message.error('运算符不能为空！')
            return
          }

          if (!isFloat(condition_config.value)) {
            this.$message.error('请输入正确的测量数值！')
            return
          }

          condition_config.hd_device_sensor_id = condition_config.condition_sensor[1]
        } else if (condition_config.type === 'time') {
          if (condition_config.value === '') {
            this.$message.error('请选择定时执行时间！')
            return
          }

          if (condition_config.duration === '' || parseInt(condition_config.duration) <= 0) {
            this.$message.error('请输入正确的持续时间！')
            return
          }

          var weeks = condition_config.weeks
          var channel_2 = [0, 0, 0, 0, 0, 0, 0]
          if (weeks !== undefined && weeks.length > 0) {
            for (var j = 0, len2 = weeks.length; j < len2; j++) {
              var week = weeks[j][0]
              channel_2[7 - week] = 1
            }
            channel_2 = channel_2.join('')
            condition_config.channel = parseInt(channel_2, 2)
          } else {
            condition_config.channel = 0
          }
        }
      }

      if (strategy.action !== -1) {
        var target_sensor_ids = strategy.target_sensor_ids
        for (i = 0, len = target_sensor_ids.length; i < len; i++) {
          hd_device_sensor_ids.push(target_sensor_ids[i][0])
        }

        if (hd_device_sensor_ids.length === 0) {
          this.$message.error('请选择目标传感器！')
          return
        }
      }
      strategy.hd_device_id = this.hd_device_id
      strategy.controlType = 2
      strategy.hd_device_sensor_ids = hd_device_sensor_ids

      add(strategy).then(res => {
        if (res.code === 200) {
          this.dialogForm = false
          this.strategyVue && this.strategyVue.refresh()
          var hd_device_strategy_id = res.data
          this.strategy.id = hd_device_strategy_id

          if (this.strategy.action === -1) {
            this.$message.success('操作成功!')
          } else {
            this.sendSetLogic(hd_device_strategy_id, this.hd_device_id)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    sendSetLogic (hd_device_strategy_id, hd_device_id) {
      var obj = {
        'socket_type': 0,
        'message_id': '1',
        'hd_device__id': hd_device_id,
        'message_type': 'SetLogic',
        'message_body': {
          'hd_device_strategy_id': hd_device_strategy_id
        }
      }
      this.$ws.send(obj).then((res) => {
        this.$message.success(res.msg)
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    initStrategy () {
      this.strategy = {
        condition_configs: [{
          type: 'value',
          channel: '',
          weeks: [],
          condition_sensor: [],
          opt: '',
          value: '',
          duration: '',
          join: ''
        }],
        target_sensor_ids: [],
        action: -1,
        notice_status: 0
      }
    },
    handleCommand (join, index) {
      var condition_configs = this.strategy.condition_configs
      var len = condition_configs.length
      if (join === 'and' || join === 'or') {
        condition_configs[index].join = join
        if (len === (index + 1)) {
          var last_type = condition_configs[index].type
          var newCondition = {
            type: last_type,
            channel: '',
            opt: '',
            duration: '',
            value: '',
            join: ''
          }
          if (last_type === 'time') {
            newCondition.duration = '60'
          }
          condition_configs.push(newCondition)
        }
      } else if (join === 'delete') {
        if (len === 1) {
          this.$message({
            message: '最后一个条件不能删除！',
            type: 'warning'
          })
          return false
        } else {
          condition_configs.splice(index, 1)
        }
      }
    },
    changeConditionType (condition_config) {
      condition_config.channel = ''
      condition_config.value = ''
      condition_config.opt = ''
      condition_config.duration = ''
      condition_config.join = ''
      if (condition_config.type === 'time') {
        condition_config.duration = '60'
      }
    },
    // 设置 值传感器
    getConditionSensor (hd_device_sensor_id) {
      var condition_sensor = []

      var data_sensor_list = this.data_sensor_list
      for (var i = 0, len = data_sensor_list.length; i < len; i++) {
        var hd_device_id = data_sensor_list[i].id
        var children = data_sensor_list[i].children
        for (var j = 0, len2 = children.length; j < len2; j++) {
          if (children[j].id === hd_device_sensor_id) {
            condition_sensor.push(hd_device_id)
            condition_sensor.push(hd_device_sensor_id)
            this.sensor_hd_device_id = hd_device_id
            return condition_sensor
          }
        }
      }
      return condition_sensor
    },
    getTarget_sensor_ids (hd_device_sensor_ids) {
      var target_sensor_ids = []
      for (var i = 0, len = hd_device_sensor_ids.length; i < len; i++) {
        target_sensor_ids.push([hd_device_sensor_ids[i]])
      }

      return target_sensor_ids
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-dialog__wrapper>>>.el-dialog__body
  padding-top 0px

.el-card>>>.el-card__body
  padding-top 8px
  padding-bottom 8px

.el-form-item
  margin-bottom 0px
</style>
