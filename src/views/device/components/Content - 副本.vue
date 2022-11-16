<template>
  <div style="padding-bottom: 30px;" class="Content">
    <p class="in_sen_title">传感器在线监测</p>
    <div
      role="tablist"
      aria-multiselectable="true"
    >
      <div
        v-for="(item,index) in sensorList"
        :key="item.hd_sensor_id"
      >
        <div role="tab">
          <div class="el-collapse-item__header">
            <el-row
              class="infos_imgsTitle"
              type="flex"
              align="middle"
            >
              <el-col :span="6">
                <img :src="getLogo(item.hd_sensor_type_image_path)" min-width="40" height="40" >
                <p>ID:{{ item.device_id }}({{ item.device_name }})</p>
              </el-col>
              <el-col :span="8">
                <h4>{{ item.name }}</h4>
                <p>更新时间：{{ item.system_response_time }}</p>
              </el-col>

              <!-- 传感器值展示、二项阀门、三项阀门 -->
              <el-col :span="4">
                <div v-if="item.hd_sensor_type_code === '101'">
                  <el-switch
                    v-model="item.value"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="handelSwitch(item.hd_sensor_id,index)"
                  />
                </div>
                <div v-else-if="item.hd_sensor_type_code === '102'">
                  <el-radio-group v-model="item.value" @change="handelWindow($event,item.hd_sensor_id,index)">
                    <el-radio-button key="8" label="8" >打开</el-radio-button>
                    <el-radio-button key="9" label="9" >关闭</el-radio-button>
                    <el-radio-button key="10" label="10" >暂停</el-radio-button>
                  </el-radio-group>
                </div>
                <div v-else>
                  <span>{{ item.value }}</span>
                  <span>{{ item.sensor_type_unit }}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="clickBtn">
                  <span @click="showNowData(item.hd_sensor_id)">∨ 实时曲线</span>
                  &lt;
                  <span @click="showHistoryData(item.hd_sensor_id)">历史查询</span>
                  &lt;
                  <span @click="showTrigger(item)">触发器</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <sensor-now-data ref="sensorNowData"/>
    <sensor-history-data ref="sensorHistoryData"/>

    <trigger-panel ref="triggerPanel"/>
  </div>
</template>

<script>
import { getSensor } from '@/api/device'
import { isFloat } from '@/utils/basetype'
import SensorNowData from './SensorNowData'
import SensorHistoryData from './SensorHistoryData'
import TriggerPanel from './TriggerPanel'
export default {
  name: 'DeviceContent',
  components: {
    SensorNowData,
    SensorHistoryData,
    TriggerPanel
  },
  data() {
    return {
      sensorList: [],
      rs_facilities_id: ''
    }
  },

  methods: {
    // 展示实时数据
    showNowData(hd_device_sensor_id) {
      this.$refs.sensorNowData.showData(hd_device_sensor_id)
    },
    showHistoryData(hd_device_sensor_id) {
      this.$refs.sensorHistoryData.showData(hd_device_sensor_id)
    },
    showTrigger(obj) {
      this.$refs.triggerPanel.showPanel(obj)
    },
    getData() {
      getSensor({ rs_facilities_id: this.rs_facilities_id }).then(res => {
        this.chooseIndex = null
        this.sensorList = res.data
        for (var i = 0, len = this.sensorList.length; i < len; i++) {
          var value = this.sensorList[i].value
          this.sensorList[i].value = isFloat(value) ? value.toFixed(1) : value
        }
      })
    },
    getLogo(img) {
      if (img === null) {
        return '/static/img/lg/ck-1.jpg'
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },

    handelWindow(value, hd_sensor_id, index) {
      value = parseInt(value)
      var obj
      if (value === 8) {
        obj = {
          'socket_type': 0,
          'message_id': '1',
          'hd_device_sensor_id': null,
          'message_type': 'OpenWindow'
        }
      } else if (value === 9) {
        obj = {
          'socket_type': 0,
          'message_id': '1',
          'hd_device_sensor_id': null,
          'message_type': 'CloseWindow'
        }
      } else if (value === 10) {
        obj = {
          'socket_type': 0,
          'message_id': '1',
          'hd_device_sensor_id': null,
          'message_type': 'StopWindow'
        }
      }
      obj.hd_device_sensor_id = hd_sensor_id

      this.$ws.send(obj).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handelSwitch(hd_sensor_id, index) {
      if (this.sensorList[index].value === 0) {
        this.sensorList[index].value = 1
        var obj = {
          'socket_type': 0,
          'message_id': '1',
          'hd_device_sensor_id': null,
          'message_type': 'CloseChannel',
          'message_body': {}
        }
        obj.hd_device_sensor_id = hd_sensor_id
      } else {
        this.sensorList[index].value = 0
        obj = {
          'socket_type': 0,
          'message_id': '1',
          'hd_device_sensor_id': null,
          'message_type': 'OpenChannel',
          'message_body': {}
        }
        obj.hd_device_sensor_id = hd_sensor_id
      }
      this.$ws.send(obj).then((res) => {
        if (res.code === 200) {
          if (this.sensorList[index].value === 0) {
            this.sensorList[index].value = 1
          } else {
            this.sensorList[index].value = 0
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.in_sen_title
  border-bottom solid #dadddf 1px
  line-height 55px
  font-size 17px
  margin 0px
  background-color #eeede8
  padding-left 20px
  color #333

.el-collapse-item__header
  height auto
  line-height inherit

.el-collapse-item__wrap
  transition all .45s

.infos_imgsTitle
  border-bottom 1px solid #eee
  text-align center
  padding 10px 0
  width 100%

.clickBtn
  span
    padding 0 5px

</style>
