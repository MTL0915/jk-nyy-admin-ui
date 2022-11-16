<template>
  <div>
    <el-dialog
      :visible.sync="dialogForm"
      :style="{'padding-top':'0px'}"
      append-to-body
      title="策略添加"
      width="1200px"
    >
      <div style="padding-left:15px;padding-right:10px">
        <el-form>
          <el-row>
            <el-col :style="{'width':'100%'}">
              <el-form-item label="名称">
                <el-input
                  v-model="strategy.name"
                  placeholder="请输入策略名称"
                  size="small"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :style="{'width':'100%'}">
              <el-form-item label="地块选择">
                <!-- <el-radio-group v-model="strategy.targetObj" size="small">
                  <el-radio-button label="rs_facilities">地块</el-radio-button>
                  <el-radio-button label="hd_device">设备</el-radio-button>
                  <el-radio-button label="hd_device_sensor">传感器</el-radio-button>
                </el-radio-group> -->

                <el-select
                  v-show="strategy.targetObj === 'rs_facilities'"
                  v-model="strategy.rs_facilities_id"
                  :disabled="rs_facilitiesDisabled"
                  size="small"
                  placeholder="请选择地块"
                  style="width:200px;"
                  @change="changeRs_facilities"
                >
                  <el-option
                    v-for="item in facilitieList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                  </el-option>
                </el-select>
                <!-- 
                <el-cascader
                  v-model="strategy.rs_facilities_id"
                  :options="orgBaseFacilitiesDevices"
                  :props="{ label:'name',value:'id' }"
                  size="small"
                  placeholder="请选择操作设备"
                  collapse-tags
                  clearable
                  @change="targetDeviceSelected"
                /> 
                -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="font-size: 15px;font-weight: bold;color: #606266;">触发条件：</span>
              <el-card
                v-for="(trigger,i) in strategy.triggers"
                :key="i"
                :style="{'margin-top':'5px'}"
                class="box-card"
              >
                判断类型：
                <el-select
                  v-model="trigger.condition"
                  placeholder="请选择"
                  style="width:100px"
                  size="small"
                >
                  <el-option
                    label="测量值"
                    value="SENSOR"
                  >测量值</el-option>
                  <el-option
                    label="定时"
                    value="TIMER"
                  >定时</el-option>
                </el-select>
                <template v-if="trigger.condition === 'SENSOR'">
                  &nbsp;&nbsp;当
                  <el-cascader
                    v-model="trigger.hd_device_sensor_idArr"
                    :options="valueSensors"
                    :key="valueSensorCascaderKey + i"
                    :props="{ multiple: false,label:'name',value:'id' }"
                    placeholder="请选择数值传感器"
                    clearable
                    style="width:220px"
                    size="small"
                  />
                  &nbsp;
                  下限值:&nbsp;
                  <el-input
                    v-model="trigger.lower"
                    style="width: 70px;"
                    size="small"
                  />&nbsp;
                  上限值:&nbsp;
                  <el-input
                    v-model="trigger.upper"
                    style="width: 70px;"
                    size="small"
                  />&nbsp;
                </template>
                <template v-if="trigger.condition === 'TIMER'">
                  &nbsp;&nbsp;在
                  <el-cascader
                    v-model="trigger.weekArr"
                    :options="week_day"
                    :key="weekCascaderKey + i"
                    :props="{ multiple: true}"
                    :style="{'width':'130px'}"
                    size="mini"
                    placeholder="为空表示单次"
                    collapse-tags
                    clearable
                  />
                  &nbsp;
                  开始日期：
                  <el-date-picker
                    v-model="trigger.start_date"
                    :style="{'width':'150px'}"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    size="small"
                    placeholder="开始日期"
                  />
                  &nbsp;&nbsp;
                  开始时间：
                  <el-time-select
                    v-model="trigger.start_time"
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
                  结束时间：
                  <el-time-select
                    v-model="trigger.end_time"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30'
                    }"
                    :style="{'width':'100px'}"
                    size="small"
                    placeholder="请选择执行时间"
                  />
                </template>
                <el-button
                  v-show="(strategy.triggers.length === i + 1) "
                  type="success"
                  size="mini"
                  style="margin-left:10px"
                  @click="addTrigger"
                >添加</el-button>
                <el-button
                  v-show="strategy.triggers.length !== 1"
                  type="danger"
                  size="mini"
                  @click="deleteTrigger(i)"
                >删除</el-button>
              </el-card>
            </el-col>
          </el-row>

          <el-row>
            <el-col :style="{width:'100%'}">
              <el-form-item label="开启传感器设备">
                <el-cascader
                  v-model="strategy.hd_device_sensor_idsArr"
                  :options="switch_sensor_list"
                  :props="{ multiple: true,label:'name',value:'id' }"
                  :key="switchSensorCascaderKey"
                  :style="{'width':'300px'}"
                  size="mini"
                  collapse-tags
                  placeholder="请选择传感器"
                  clearable
                />

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :style="{width:'100%'}">
              <el-form-item label="时长">
                <el-input-number
                  v-model="strategy.duration"
                  :min="0"
                  :step="10"
                  label="时长"
                  size="small"
                />&nbsp;&nbsp;分钟
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="短信通知">
                <el-radio-group v-model="strategy.notice">
                  <el-radio
                    :style="{'margin-right':'15px'}"
                    :label="0"
                    :value="0"
                  >关闭</el-radio>
                  <el-radio
                    :value="1"
                    :label="1"
                  >开启</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="电话通知">
                <el-radio-group v-model="strategy.phone_notice">
                  <el-radio
                    :style="{'margin-right':'15px'}"
                    :label="0"
                    :value="0"
                  >关闭</el-radio>
                  <el-radio
                    :value="1"
                    :label="1"
                  >开启</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="手机号">
                <el-tag
                  v-for="tag in strategy.notice_phonesArr"
                  :key="tag"
                  :disable-transitions="false"
                  closable
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="phone"
                  style="width:120px"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+ 添加手机号</el-button>
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
import { findByBs_base_id } from '@/api/rs_facilities'
import { addCommonStrategy, get, updateCommonStrategy } from '@/api/strategy'

import { getValueSensorsByRs_facilities_id, getSwitchSensorsByRs_facilities_id } from '@/api/hd_device_sensor'

export default {
  name: 'AddStrategy',
  data () {
    return {
      dialogForm: false,
      weekCascaderKey: 1,
      valueSensorCascaderKey: 1000,
      switchSensorCascaderKey: 1,
      week_day: [{ 'label': '周一', 'value': '1' }, { 'label': '周二', 'value': '2' }, { 'label': '周三', 'value': '3' }, { 'label': '周四', 'value': '4' }, { 'label': '周五', 'value': '5' }, { 'label': '周六', 'value': '6' }, { 'label': '周日', 'value': '7' }],
      strategy: {
        name: '',
        duration: 1,
        targetObj: 'rs_facilities',
        rs_facilities_id: '',
        notice: 0,
        phone_notice: 0,
        status: 0,
        notice_phonesArr: [],
        hd_device_sensor_idsArr: [],
        triggers: [{
          condition: 'SENSOR',
          hd_device_sensor_id: '',
          upper: '',
          lower: ''
        }]
      },

      rs_facilitiesDisabled: false,
      rs_facilities_id: '',
      facilitieList: [],
      valueSensors: [],
      filter_data_sensor_list: [],
      switch_sensor_list: [],
      valueSensorList: [],
      switchSensorsList: [],
      inputVisible: false,
      phone: ''
    }
  },

  watch: {
    rs_facilities_id: function (rs_facilities_id) {
      this.switchSensorCascaderKey++;
      getValueSensorsByRs_facilities_id(rs_facilities_id).then((res) => {
        this.valueSensorList = res.data
        this.valueSensors = this.groupHd_device(res.data)
      })

      getSwitchSensorsByRs_facilities_id({ 'rs_facilities_id': rs_facilities_id }).then((res) => {
        this.switchSensorsList = res.data
        this.switch_sensor_list = this.groupHd_device(res.data)
      })
    }
  },
  created () {
    findByBs_base_id({
      'bs_base_id': this.$store.state.baseinfo.cur_base_id
    }).then(res => {
      this.facilitieList = res.data
    })
  },
  methods: {
    deleteTrigger (index) {
      this.strategy.triggers.splice(index, 1)
    },
    addTrigger () {
      this.strategy.triggers.push({
        condition: 'SENSOR',
        hd_device_sensor_id: '',
        hd_device_sensor_idArr: [],
        upper: '',
        lower: '',
        weeks: '',
        weekArr: [],
        start_date: '',
        start_time: '',
        end_time: ''
      })
    },
    groupHd_device (sensorList) {
      var valueSensors = []
      if (!sensorList) {
        return valueSensors;
      }
      for (var i = 0, len = sensorList.length; i < len; i++) {
        var sensor = sensorList[i]
        var device = null
        for (var j = 0, len2 = valueSensors.length; j < len2; j++) {
          if (sensor.hd_device_id === valueSensors[j].id) {
            device = valueSensors[j]
            break
          }
        }
        if (device === null) {
          valueSensors.push({
            name: sensor.hd_device_name,
            id: sensor.hd_device_id,
            disabled: false,
            children: [{
              name: sensor.name,
              id: sensor.id
            }]
          })
        } else {
          device.children.push({
            name: sensor.name,
            id: sensor.id
          })
        }
      }

      return valueSensors
    },
    changeRs_facilities () {
      this.rs_facilities_id = this.strategy.rs_facilities_id
    },
    showDialog (rs_facilities_id) {
      this.dialogForm = true
      this.rs_facilitiesDisabled = false
      this.rs_facilities_id = rs_facilities_id
      this.initStrategy()
      this.strategy.rs_facilities_id = rs_facilities_id
    },
    detail (rs_facilities_id, strategy_id) {
      this.rs_facilitiesDisabled = true
      this.weekCascaderKey++;
      this.valueSensorCascaderKey++;

      get(strategy_id).then(res => {
        if (res.code === 200) {
          res.data.notice_phonesArr = [];
          this.strategy = res.data

          this.strategy.hd_device_sensor_idsArr = []
          if (this.strategy.rs_facilities_id) {
            this.strategy.targetObj = 'rs_facilities'
          }
          if (this.strategy.notice_phones) {
            this.strategy.notice_phonesArr = this.strategy.notice_phones.split(',')
          } else {
            this.strategy.notice_phonesArr = []
          }

          // 获取触发器对应的操作星期
          var triggers = this.strategy.triggers
          for (var i = 0, len = triggers.length; i < len; i++) {
            var trigger = triggers[i]
            if (trigger.condition === 'TIMER') {
              var weeks = trigger.weeks
              if (!weeks) {
                break;
              }
              trigger.weekArr = []
              var weekTemArr = weeks.split(",");
              for (var i = 0, len = weekTemArr.length; i < len; i++) {
                trigger.weekArr.push([weekTemArr[i]]);
              }
            }
          }

          // 获取地块下的数值传感器
          getValueSensorsByRs_facilities_id(rs_facilities_id).then((res) => {
            this.valueSensorList = res.data
            this.valueSensors = this.groupHd_device(res.data)
          }).then(res => {
            var triggers = this.strategy.triggers
            var valueSensorList = this.valueSensorList
            for (var i = 0, len = triggers.length; i < len; i++) {
              var trigger = triggers[i]
              trigger.hd_device_sensor_idArr = []
              if (trigger.condition === 'SENSOR') {
                var hd_device_sensor_id = trigger.hd_device_sensor_id

                for (var j = 0, len2 = valueSensorList.length; j < len2; j++) {
                  if (valueSensorList[j].id === hd_device_sensor_id) {
                    trigger.hd_device_sensor_idArr.push(valueSensorList[j].hd_device_id)
                    trigger.hd_device_sensor_idArr.push(hd_device_sensor_id)
                    break
                  }
                }
              }
            }

            this.strategy.triggers = triggers
          })

          // 获取策略操作的阀门传感器
          getSwitchSensorsByRs_facilities_id({ 'rs_facilities_id': rs_facilities_id }).then((res) => {
            this.switchSensorsList = res.data
            this.switch_sensor_list = this.groupHd_device(res.data)
          }).then(() => {
            var switchSensorsList = this.switchSensorsList
            var hd_device_sensor_ids = this.strategy.hd_device_sensor_ids
            for (var i = 0, len = hd_device_sensor_ids.length; i < len; i++) {
              var hd_device_sensor_id = hd_device_sensor_ids[i]
              for (var j = 0, len2 = switchSensorsList.length; j < len2; j++) {
                if (switchSensorsList[j].id === hd_device_sensor_id) {
                  var a = []
                  a.push(switchSensorsList[j].hd_device_id)
                  a.push(hd_device_sensor_id)
                  this.strategy.hd_device_sensor_idsArr.push(a)
                  break
                }
              }
            }
            this.switchSensorCascaderKey++;
          })

          this.rs_facilities_id = rs_facilities_id
          this.dialogForm = true
        }
      })
    },
    save () {
      var strategy = this.strategy
      if (strategy.name === '') {
        this.$message.error('策略名称不能为空')
        return
      }
      if (strategy.rs_facilities_id === '') {
        this.$message.error('请选择策略所属地块')
        return
      }

      // 生成控制的操作阀门
      var hd_device_sensor_idsArr = strategy.hd_device_sensor_idsArr
      var hd_device_sensor_ids = []
      if (hd_device_sensor_idsArr !== undefined && hd_device_sensor_idsArr.length > 0) {
        for (var i = 0, len = hd_device_sensor_idsArr.length; i < len; i++) {
          hd_device_sensor_ids.push(hd_device_sensor_idsArr[i][1])
        }
      }
      strategy.hd_device_sensor_ids = hd_device_sensor_ids

      // 通知电话号码
      var notice_phonesArr = strategy.notice_phonesArr
      var notice_phones = ''
      if (notice_phonesArr !== undefined && notice_phonesArr.length > 0) {
        for (i = 0, len = notice_phonesArr.length; i < len; i++) {
          notice_phones = notice_phones + notice_phonesArr[i]
          if (i !== len - 1) {
            notice_phones = notice_phones + ','
          }
        }
      }
      strategy.notice_phones = notice_phones
      if ((strategy.phone_notice == 1 || strategy.notice == 1) && notice_phones == '') {
        this.$message.error('通知手机号不能为空')
        return
      }

      var triggers = strategy.triggers
      if (triggers !== undefined && triggers.length > 0) {
        for (i = 0, len = triggers.length; i < len; i++) {
          var trigger = triggers[i]
          if (trigger.condition === 'SENSOR') {
            var hd_device_sensor_idArr = trigger.hd_device_sensor_idArr
            if (hd_device_sensor_idArr !== undefined && hd_device_sensor_idArr.length > 0) {
              trigger.hd_device_sensor_id = hd_device_sensor_idArr[1]
            }

            if (trigger.upper === '' && trigger.lower === '') {
              this.$message.error('传感器测量值上限值与下限值不能同时为空')
              return
            }
          } else if (trigger.condition === 'TIMER') {
            if (!trigger.start_date) {
              this.$message.error("开始日期不能为空");
              return
            }
            if (!trigger.start_time) {
              this.$message.error("开始时间不能为空");
              return
            }
            if (!trigger.weekArr) {
              this.$message.error("请选择周期");
              return
            }

            var weekArr = trigger.weekArr
            var weeks = "";
            for (var j = 0, len2 = weekArr.length; j < len2; j++) {
              if (j === (len2 - 1)) {
                weeks += weekArr[j][0]
              } else {
                weeks += weekArr[j][0]
                weeks += ","
              }
            }
            trigger.weeks = weeks
          }
        }
      }
      if (strategy.id) {
        updateCommonStrategy(strategy).then((res) => {
          if (res.code === 200) {
            this.dialogForm = false
            this.$emit('getData')
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        addCommonStrategy(strategy).then((res) => {
          if (res.code === 200) {
            this.dialogForm = false
            this.$emit('getData')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    initStrategy () {
      this.strategy = {
        name: '',
        duration: 0,
        targetObj: 'rs_facilities',
        rs_facilities_id: '',
        notice: 0,
        phone_notice: 0,
        status: 0,
        notice_phonesArr: [],
        hd_device_sensor_idsArr: [],
        triggers: [{
          condition: 'SENSOR',
          hd_device_sensor_id: '',
          upper: '',
          lower: ''
        }]
      }
    },
    handleClose (tag) {
      var notice_phonesArr = this.strategy.notice_phonesArr
      notice_phonesArr.splice(notice_phonesArr.indexOf(tag), 1)
      this.strategy.notice_phonesArr = notice_phonesArr;
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const phone = this.phone
      if (phone) {
        this.strategy.notice_phonesArr.push(phone)
      }
      this.inputVisible = false
      this.phone = ''
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

.el-tag + .el-tag
  margin-left 10px

.button-new-tag
  margin-left 10px
  height 32px
  line-height 30px
  padding-top 0
  padding-bottom 0

.input-new-tag
  width 90px
  margin-left 10px
  vertical-align bottom
</style>
