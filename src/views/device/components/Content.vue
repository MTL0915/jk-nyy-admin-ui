<template>
  <div style="padding-bottom: 5px;">
    <eHeader
      v-show="showHeader"
      ref="eHeader"
      :query="query"
      :sup_this="sup_this"
      @refreshList="init"
    />
    <div>
      <facilitiesContent
        v-show="vstate"
        ref="facilitiesContent"
      />
      <div
        v-show="!vstate"
        role="tablist"
        aria-multiselectable="true"
      >
        <el-table
          ref="filterTable"
          :data="sensorList"
          row-key="id"
          style="width: 100%;font-size:13px"
        >
          <el-table-column label="设备名称">
            <template slot-scope="scope">
              <div style="text-align:center">
                <img
                  :src="getLogo(scope.row.hd_sensor_type_image_path)"
                  min-width="40"
                  height="40"
                >
                <div>
                  <span style="margin-left: 10px">{{ scope.row.device_id }}({{ scope.row.hd_device_name }})</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="传感器名称"
          />
          <el-table-column
            property="channel"
            label="通道号"
          />
          <el-table-column label="数据">
            <template slot-scope="scope">
              <div v-if="scope.row.hd_sensor_type_code === '101'">{{ getTextStatus(scope.row)}}</div>
              <div v-else-if="scope.row.hd_sensor_type_code === '102'">{{ getTextStatus(scope.row)}}</div>
              <div v-else>
                <!-- <span v-show="scope.row.state != 2">{{ scope.row.value }}</span>
                <span v-show="scope.row.state != 2">{{ scope.row.hd_sensor_type_unit }}</span> -->
                <span :style="{
                  color:
                    scope.row.state == 2
                      ? 'red'
                      : scope.row.state == 3 || scope.row.state == 4
                      ? 'yellow'
                      : '#068D74'
                }">{{ scope.row.value }}{{ scope.row.hd_sensor_type_unit }}</span>
                <!-- <span
                  v-show="scope.row.state === 2"
                  style="color:red;cursor:pointer"
                  @click="showSensorErrorInfo(scope.row.id)"
                >（传感器故障）</span> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            property="system_response_time"
            label="更新时间"
            width="150"
          />
          <el-table-column
            label="操作"
            width="250"
          >
            <template slot-scope="scope">

              <el-switch
                v-if="scope.row.hd_sensor_type_code =='101'"
                v-model="scope.row.value"
                @change="handelSwitch(scope.row,scope)"
                v-loading="scope.row.loading"
                :active-value=1
                :inactive-value=0
                active-color="#13ce66"
                inactive-color="#BBB7B7"
              >
                :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
              </el-switch>

              <el-radio-group
                v-if="scope.row.hd_sensor_type_code === '102'"
                v-model="scope.row.value"
                size="small"
                v-loading="scope.row.loading"
                @change="handelWindow(scope.row,scope)"
                :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
              >
                <el-radio-button
                  key="8"
                  :label="8"
                >开</el-radio-button>
                <el-radio-button
                  key="10"
                  :label="10"
                >停</el-radio-button>
                <el-radio-button
                  key="9"
                  :label="9"
                >关</el-radio-button>
              </el-radio-group>

              <!--
              <el-button
                v-if="scope.row.hd_sensor_type_code != '101' && scope.row.hd_sensor_type_code != '102'"
                size="mini"
                type="primary"
                @click="showNowData(scope.row.id,scope.row)"
              >实时曲线</el-button>
              <el-button
                v-if="scope.row.hd_sensor_type_code != '101' && scope.row.hd_sensor_type_code != '102'"
                size="mini"
                type="primary"
                @click="showHistoryData(scope.row.id)"
              >历史查询</el-button>
              -->
              <el-dropdown
                split-button
                size="mini"
                v-if="scope.row.hd_sensor_type_code != '101' && scope.row.hd_sensor_type_code != '102'"
                type="primary"
                @click="showNowData(scope.row.id,scope.row)"
                @command="commandControl($event, scope.row.id,scope.row)"
              >
                实时曲线
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="historyData">历史查询</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                v-if="scope.row.hd_sensor_type_code != '101' && scope.row.hd_sensor_type_code != '102'"
                size="mini"
                type="primary"
                @click="showTrigger(scope.row)"
              >预警设置</el-button>

            </template>
          </el-table-column>
        </el-table>

        <!--分页组件-->
        <el-pagination
          :total="total"
          :current-page="page + 1"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>

      <sensor-now-data ref="sensorNowData" />
      <sensor-history-data ref="sensorHistoryData" />

      <trigger-panel ref="triggerPanel" />

    </div>
  </div>
</template>

<script>
import { openOrCloseChannel, handelWindow, openChannel, closeChannel } from '@/utils/websocket_util'
import initData from '@/mixins/initData'
import { getSensor } from '@/api/device'
import { isFloat } from '@/utils/basetype'
import SensorNowData from './SensorNowData'
import SensorHistoryData from './SensorHistoryData'
import TriggerPanel from './TriggerPanel'
import eHeader from './module/header'
import facilitiesContent from './FacilitiesContent'
import checkDeviceControl from "@/utils/device_permission";
export default {
  name: 'DeviceContent',
  components: {
    facilitiesContent,
    eHeader,
    SensorNowData,
    SensorHistoryData,
    TriggerPanel
  },
  mixins: [initData],
  props: {
    sensorcontentdeviceid: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      vstate: false,
      sup_this: this,
      sensorList: [],
      rs_facilities_id: '',
      loading_dialog: false,
      testV: {},
      query: { "keyword": "" }
    }
  },
  watch: {
    sensorcontentdeviceid: function (newVal, oldVal, a) {
      this.init().then(data => {
        this.showSensorList(data.data.content)
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.init().then(data => {
        this.showSensorList(data.data.content)
      })
    })
  },
  methods: {
    checkDeviceControl,
    getTextStatus (item) {
      if (item.hd_sensor_type_code == '101') {
        if (item.state == 1) {
          return '开'
        } else if (item.state == 0) {
          return "关"
        } else {
          return "未知"
        }
      } else if (item.hd_sensor_type_code == '102') {
        if (item.state == 8) {
          return '开'
        } else if (item.state == 9) {
          return "关"
        } else if (item.state == 10) {
          return "停"
        } else {
          return "未知"
        }
      }
    },
    commandControl (command, id) {
      if (command === "historyData") {
        this.showHistoryData(id);
      }
    },
    showSensorErrorInfo (id) {
      this.$alert(
        '数据异常',
        '异常信息',
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        }
      )
    },
    beforeInit () {

      const rs_facilities_id = this.query.rs_facilities_id
      const hd_device_type_id = this.query.hd_device_type_id
      const hd_sensor_type_id = this.query.hd_sensor_type_id
      const keyword = this.query.keyword
      this.url = 'hd/hd_device_sensor/getNewsSensorList'
      this.params = {
        hd_device_id: this.sensorcontentdeviceid,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: rs_facilities_id,
        hd_device_type_id: hd_device_type_id,
        hd_sensor_type_id: hd_sensor_type_id,
        keyword: keyword,
        page: this.page,
        size: this.size
      }
      return true
    },
    sizeChange: function (pageSize) {
      this.page = 0
      this.size = pageSize;

      this.init().then(data => {
        this.showSensorList(data.data.content)
      })
    },
    // 分页
    pageChange (val) {
      this.page = val - 1

      this.init().then(data => {
        this.showSensorList(data.data.content)
      })
    },
    // 展示实时数据
    showNowData (hd_device_sensor_id, row) {
      this.$refs.sensorNowData.showData(hd_device_sensor_id)
    },
    showHistoryData (hd_device_sensor_id) {
      this.$refs.sensorHistoryData.showData(hd_device_sensor_id)
    },
    showTrigger (obj) {
      this.$refs.triggerPanel.showPanel(obj)
    },
    getData () {
      getSensor({ rs_facilities_id: this.rs_facilities_id }).then(res => {
        this.chooseIndex = null
        this.showSensorList(res.data)
      })
    },
    showSensorList (data) {
      for (var i = 0, len = data.length; i < len; i++) {
        data[i].loading = false;
        data[i].value2 = data[i].value
      }
      this.sensorList = data
    },
    getLogo (img) {
      if (img === null) {
        return '/static/img/lg/ck-1.jpg'
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },

    handelWindow (row, scope) {
      if (row.loading) {
        return;
      }

      var hd_sensor_id = row.id

      var index = scope.$index
      var obj = this.sensorList[index]

      row.loading = true;

      handelWindow(hd_sensor_id, row.value, this.$ws)
        .then(res => {
          obj.value2 = obj.value
          this.sensorList.splice(index, 1, obj)

          row.loading = false;
        })
        .catch(err => {
          this.$message.error(err.msg)
          obj.value = obj.value2
          this.sensorList.splice(index, 1, obj)

          row.loading = false;
        })
    },
    handelSwitch (row, scope) {
      if (row.loading) {
        return;
      }
      var hd_sensor_id = row.id

      var index = scope.$index
      var obj = this.sensorList[index]

      row.loading = true;
      if (row.value == 1) {
        openChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 1
            this.sensorList.splice(index, 1, obj)
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg)
            row.value = 0
            this.sensorList.splice(index, 1, obj)
            row.loading = false;
          })
      } else {
        closeChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 0
            this.sensorList.splice(index, 1, obj)
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg)
            row.value = 1
            this.sensorList.splice(index, 1, obj)
            row.loading = false;
          })
      }
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
