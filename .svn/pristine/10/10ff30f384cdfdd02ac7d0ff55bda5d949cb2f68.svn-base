<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="name + '-通道配置'"
      append-to-body
      width="1700px"
    >
      <div style="margin-left:10px">
        <el-button
          type="primary"
          size="small"
          @click="add"
        >追加</el-button>
      </div>

      <el-table
        :data="channelConfigList"
        style="width: 100%;"
      >
        <el-table-column
          label="名称"
          fixed
          width="150px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="名称"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="通道号"
          width="100px"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.channel"
              placeholder="通道号"
              size="small"
            >
              <el-option
                v-for="channelItem in unSelectedChannel"
                :key="channelItem"
                :label="channelItem"
                :value="channelItem"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="通道类型"
          width="150px"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.channelType"
              placeholder="通道类型"
              size="small"
              @change="setType(scope.row,scope.$index)"
            >
              <el-option
                v-for="dict in channel_typeDicts"
                :key="dict.id"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="传感器类型"
          width="150px"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.hd_sensor_type_id"
              placeholder="传感器类型"
              filterable
              size="small"
              @change="sensorTypeChange(scope.row,scope.$index)"
            >
              <el-option
                v-for="codeItem in scope.row.sensorTypeList"
                :key="codeItem.id"
                :label="codeItem.name"
                :value="codeItem.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="设备类型功能"
          width="150px"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.hd_sensor_type_function_id"
              placeholder="设备类型功能"
              size="small"
            >
              <el-option
                v-for="typeItem in scope.row.sensorTypeFunctionList"
                :key="typeItem.id"
                :label="typeItem.name"
                :value="typeItem.id"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="地址"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.channelAddr"
              placeholder="地址"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="偏移量"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.channelOffset"
              placeholder="偏移量"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="通信协议"
          width="150px"
        >

          <template slot-scope="scope">
            <el-select
              v-model="scope.row.channelProtocol"
              placeholder="通信协议"
              size="small"
            >
              <el-option
                v-for="dict in channel_protocolDicts"
                :key="dict.id"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="分辨率"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.channelResolution"
              placeholder="分辨率"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="保留小数"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.toFixed"
              placeholder="保留小数"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="校正值"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.adjusted"
              placeholder="校正值"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="测量值量程"
          width="230px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.v1"
              placeholder="v1"
              size="small"
              style="width:80px"
            />
            ——
            <el-input
              v-model="scope.row.v2"
              placeholder="v2"
              size="small"
              style="width:80px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="模数转换量程"
          width="230px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.d1"
              placeholder="d1"
              size="small"
              style="width:80px"
            />
            ——
            <el-input
              v-model="scope.row.d2"
              placeholder="d2"
              size="small"
              style="width:80px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="配置信息"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.configuration"
              placeholder="配置信息"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="第三方ID"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.other_device_id"
              placeholder="第三方ID"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="copyChannel(scope.row)"
            >复制</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handelDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findByHd_factory_device_id } from '@/api/hd_device_sensor'
import { find as findSensorType } from '@/api/hd_sensor_type'
import { sensorTypeFunctionList } from '@/api/hd_sensor_type_function'

// import axios from 'axios'
import { getToken } from '@/utils/auth'
import initDict from '@/mixins/initDict'
export default {
  name: 'EquipAdd',
  mixins: [initDict],
  data () {
    return {
      hd_factory_device_id: '',
      name: '',

      dialogVisible: false,

      channel_typeDicts: null, // 通道类型字典
      channel_protocolDicts: null, // 通道协议字典

      sensorTypeList: [], // 所有传感器列表
      sensorTypeFunctionList: [], // 所有的设备类型功能列表
      channelConfigList: []
    }
  },
  computed: {
    unSelectedChannel () {
      var channelArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]

      var channels = []
      var len = this.channelConfigList.length
      for (var i = 0; i < len; i++) {
        var channelConfig = this.channelConfigList[i]
        var channel = channelConfig.channel
        channels.push(channel)
      }

      channelArr = channelArr.filter(num => {
        if (channels.indexOf(num) > -1) {
          return false
        } else {
          return true
        }
      })

      return channelArr
    }
  },
  created () {
    this.getDict2(this, 'channel_typeDicts', 'channel_type')
    this.getDict2(this, 'channel_protocolDicts', 'channel_protocol')
    this.getSensorTypeList()
    this.getSensorTypeFunctionList()
  },
  methods: {
    //复制通道号
    copyChannel (row) {
      let jl = JSON.parse(JSON.stringify(row))
      jl.channel = (this.channelConfigList[this.channelConfigList.length - 1].channel || 0) + 1
      this.channelConfigList.push(jl)
    },
    getSensorTypeFunctionList () {
      sensorTypeFunctionList().then(res => {
        this.sensorTypeFunctionList = res.data.content
      })
    },
    sensorTypeChange (data, index) {
      var slist = this.sensorTypeFunctionList
      var list = []
      for (var i = 0; i < slist.length; i++) {
        if (slist[i].sensor_type_id === data.hd_sensor_type_id) {
          list.push(slist[i])
        }
      }
      this.$set(this.channelConfigList[index], 'sensorTypeFunctionList', list)
    },
    showDialog (hd_factory_device_id, name) {
      this.hd_factory_device_id = hd_factory_device_id
      this.name = name
      this.dialogVisible = true

      this.getChannelConfigList(hd_factory_device_id)
    },
    getChannelConfigList (hd_factory_device_id) {
      findByHd_factory_device_id(hd_factory_device_id).then(res => {
        res.data.map(v => {
          v.sensorTypeList = []
          v.sensorTypeFunctionList = []
          for (var i = 0, len = this.sensorTypeList.length; i < len; i++) {
            if (this.sensorTypeList[i].channelTypes.indexOf(v.channelType) > -1) {
              v.sensorTypeList.push(this.sensorTypeList[i])
            }
          }
          for (var j = 0; j < this.sensorTypeFunctionList.length; j++) {
            if (this.sensorTypeFunctionList[j].sensor_type_id === v.hd_sensor_type_id) {
              v.sensorTypeFunctionList.push(this.sensorTypeFunctionList[j])
            }
          }
        })
        this.channelConfigList = res.data
        if (this.channelConfigList.length === 0) {
          this.add()
        }
      })
    },
    async getSensorTypeList () {
      await findSensorType({ 'size': 100 }).then(res => {
        this.sensorTypeList = res.data.content
      })
    },
    add () {
      this.channelConfigList.push({
        name: '',
        channel: '',
        channelType: '',
        hd_sensor_type_id: '',
        hd_sensor_type_function_id: '',
        channelAddr: '',
        channelOffset: '',
        channelProtocol: '',
        channelResolution: '',
        toFixed: null,
        adjusted: '',
        d1: '',
        d2: '',
        v1: '',
        v2: '',
        configuration: null,
        other_device_id: null
      })
    },
    setType (data, index) {
      var sensorTypeList = []
      var channelType = data.channelType
      for (var i = 0, len = this.sensorTypeList.length; i < len; i++) {
        if (this.sensorTypeList[i].channelTypes.indexOf(channelType) > -1) {
          sensorTypeList.push(this.sensorTypeList[i])
        }
      }
      this.channelConfigList[index].sensorTypeList = sensorTypeList
      this.$set(this.channelConfigList[index], 'sensorTypeFunctionList', [])
      data.hd_sensor_type_id = ''
      data.hd_sensor_type_function_id = ''
    },
    handelDelete (data, index) {
      this.$delete(this.channelConfigList, index)
    },
    saveEdit () {
      var channels = []

      var len = this.channelConfigList.length
      for (var i = 0; i < len; i++) {
        var channelConfig = this.channelConfigList[i]
        var channel = channelConfig.channel
        if (channels.indexOf(channel) > -1) {
          this.$message.error('通道号不能重复！')
          return
        }
        if (channel === '') {
          this.$message.error('通道号不为空！')
          return
        }
        if (channelConfig.channelType === '') {
          this.$message.error('通道类型不能为空！')
          return
        }

        if (channelConfig.hd_sensor_type_id === '') {
          this.$message.error('传感器类型不能为空！')
          return
        }

        //if (!channelConfig.hd_sensor_type_function_id) {
        //  this.$message.error('传感器类型功能不能为空！')
        //   return
        // }


        channels.push(channel)
      }
      var form = {}
      form.hd_factory_device_id = this.hd_factory_device_id
      form.channelSensorList = this.channelConfigList
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_factory_device/configSensorChannel', form, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>>
  .el-dialog
    width 75%

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 30px 10px
</style>
