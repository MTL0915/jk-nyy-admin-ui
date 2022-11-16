<template>
  <div>
    <el-dialog
      :visible.sync="dialogForm"
      append-to-body
      title="底线安全策略设置"
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
            <el-col :style="{'width':'50%'}">
              <el-form-item label="目标传感器">
                <el-cascader
                  v-model="strategy.target_sensor_ids"
                  :options="switch_sensor_list"
                  :props="{ multiple: true,label:'name',value:'id' }"
                  size="small"
                  placeholder="请选择传感器"
                  collapse-tags
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :style="{'width':'50%'}">
              <el-form-item label="判断类型">
                &nbsp;&nbsp;
                <el-radio-group
                  v-model="strategy.condition_configs[0].type"
                  size="small"
                >
                  <el-radio-button label="opentime">开启时长</el-radio-button>
                  <el-radio-button label="closetime">关闭时长</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :style="{'width':'50%'}">
              <el-form-item label="持续时间">
                &nbsp;&nbsp;
                <el-input-number
                  v-model="strategy.condition_configs[0].duration"
                  :min="1"
                  :precision="0"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :style="{'width':'50%'}">
              <el-form-item label="执行动作">
                &nbsp;&nbsp;
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
          <div style="clear:both" />
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
import { add, getOrgBaseFacilitiesDevices } from '@/api/hd_device_strategy'
import { findByHd_device_id } from '@/api/hd_device_sensor'
export default {
  name: 'SecureStrategy',
  data () {
    return {
      dialogForm: false,
      switch_sensor_list: [], // 开关输入量传感器列表
      target_sensor_ids: [],
      strategy: {
        id: '',
        controlType: 0,
        action: -1,
        condition_configs: [{
          'type': 'opentime',
          'duration': 60
        }],
        target_sensor_ids: [],
        notice_status: 0
      },
      hd_device_id: '',
      strategyVue: null,
      orgBaseFacilitiesDevices: [],
      deviceSelectedShow: false,
      target_device_id: []
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
    initStrategy () {
      this.strategy = {
        id: '',
        controlType: 0,
        action: -1,
        condition_configs: [{
          'type': 'opentime',
          'duration': 60
        }],
        target_sensor_ids: [],
        notice_status: 0
      }
    },
    showDialog (hd_device_id, strategyVue) {
      this.hd_device_id = hd_device_id
      this.strategyVue = strategyVue

      this.switch_sensor_list = []
      findByHd_device_id({ hd_device_id: hd_device_id }).then(res => {
        var data = res.data
        var _this = this
        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i].channelType === 1) { // 开关输入量传感器
            _this.switch_sensor_list.push({
              name: data[i].name,
              id: data[i].id
            })
          }
        }
        if (_this.switch_sensor_list.length === 0) {
          _this.$message.error('该设备无开关输入量传感器，无法配置底线安全策略！')
          return
        }
        this.initStrategy()
        this.dialogForm = true
      })
    },

    showStrategyDialog (strategy, strategyVue) {
      this.deviceSelectedShow = false
      this.strategy = strategy
      this.strategyVue = strategyVue
      this.switch_sensor_list = []
      strategy.target_sensor_ids = this.getTarget_sensor_ids(strategy.hd_device_sensor_ids)

      var hd_device_id = strategy.hd_device_id
      this.hd_device_id = hd_device_id
      findByHd_device_id(hd_device_id).then(res => {
        var data = res.data
        var _this = this
        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i].channelType === 1) { // 开关输入量传感器
            _this.switch_sensor_list.push({
              name: data[i].name,
              id: data[i].id
            })
          }
        }
        if (_this.switch_sensor_list.length === 0) {
          _this.$message.error('该设备无开关输入量传感器，无法配置底线安全策略！')
          return
        }

        this.dialogForm = true
      })
    },
    save () {
      var strategy = this.strategy

      var target_sensor_ids = strategy.target_sensor_ids
      var hd_device_sensor_ids = this.getHd_device_sensor_ids(target_sensor_ids)

      if (hd_device_sensor_ids.length === 0) {
        this.$message.error('请选择目标传感器！')
      }
      strategy.hd_device_id = this.hd_device_id
      strategy.controlType = 0
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
    getHd_device_sensor_ids (target_sensor_ids) {
      var hd_device_sensor_ids = []
      for (var i = 0, len = target_sensor_ids.length; i < len; i++) {
        hd_device_sensor_ids.push(target_sensor_ids[i][0])
      }

      return hd_device_sensor_ids
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
  padding-bottom 0px
</style>

