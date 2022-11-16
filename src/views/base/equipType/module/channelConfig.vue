<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="hd_device_type_name + '通道配置'"
      append-to-body
      width="700px"
    >
      <div style="margin-left:10px">
        硬件版本号：
        <el-select v-model="hd_hardware_version_id" placeholder="请选择" size="small" style="width:120px;margin-right:50px;">
          <el-option
            v-for="item in hardwareVersions"
            :key="item.id"
            :label="item.hardware_version"
            :value="item.id"/>
        </el-select>
        <el-button type="primary" size="small" @click="add">追加</el-button>
      </div>

      <el-table :data="channelConfigList" style="width: 100%" >
        <el-table-column label="通道号">
          <template slot-scope="scope">
            <el-select v-model="scope.row.channel" placeholder="通道号" size="small" >
              <el-option
                v-for="channelItem in unSelectedChannel"
                :key="channelItem"
                :label="channelItem"
                :value="channelItem"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="通道类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.channelType" placeholder="通道类型" size="small" @change="setType(scope.row,scope.$index)">
              <el-option
                v-for="dict in channel_typeDicts"
                :key="dict.id"
                :label="dict.label"
                :value="parseInt(dict.value)"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="传感器类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.hd_sensor_type_id" placeholder="传感器类型" size="small" >
              <el-option
                v-for="codeItem in scope.row.sensorTypeList"
                :key="codeItem.id"
                :label="codeItem.name"
                :value="codeItem.id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handelDelete(scope.row,scope.$index)" >删除</el-button>
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
import { find, findChannelConfigByHd_hardware_version_id } from '@/api/hd_hardware_version'
import { find as findSensorType } from '@/api/hd_sensor_type'
// import axios from 'axios'
import { getToken } from '@/utils/auth'
import initDict from '@/mixins/initDict'
export default {
  name: 'EquipAdd',
  mixins: [initDict],
  data() {
    return {
      hd_device_type_id: '',
      hd_device_type_name: '',

      dialogVisible: false,

      channel_typeDicts: null, // 通道类型字典

      sensorTypeList: [], // 所有传感器列表
      hardwareVersions: [],
      hd_hardware_version_id: '', // 选中的硬件版本号

      channelConfigList: []
    }
  },
  computed: {
    unSelectedChannel() {
      var channelArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128]

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
  watch: {
    // 更换硬件版本号时触发
    hd_hardware_version_id: function() {
      this.getChannelConfig()
    }
  },
  created() {
    this.getDict2(this, 'channel_typeDicts', 'channel_type')
    this.getSensorTypeList()
  },
  methods: {

    async showDialog(hd_device_type_id, hd_device_type_name) {
      this.hd_device_type_id = hd_device_type_id
      this.hd_device_type_name = hd_device_type_name
      this.dialogVisible = true

      find({ 'hd_device_type_id': hd_device_type_id }).then(res => {
        this.hardwareVersions = res.data.content
        if (this.hardwareVersions && this.hardwareVersions.length > 0) {
          this.hd_hardware_version_id = this.hardwareVersions[0].id
        }
      })
    },
    getChannelConfig() {
      findChannelConfigByHd_hardware_version_id({ hd_hardware_version_id: this.hd_hardware_version_id }).then(res => {
        res.data.map(v => {
          v.sensorTypeList = []
          for (var i = 0, len = this.sensorTypeList.length; i < len; i++) {
            if (this.sensorTypeList[i].channelTypes.indexOf(v.channelType) > -1) {
              v.sensorTypeList.push(this.sensorTypeList[i])
            }
          }
        })
        this.channelConfigList = res.data
        if (this.channelConfigList.length === 0) {
          this.add()
        }
      })
    },
    async getSensorTypeList() {
      await findSensorType({ 'size': 100 }).then(res => {
        this.sensorTypeList = res.data.content
      })
    },
    add() {
      this.channelConfigList.push({
        channel: '',
        channelType: '',
        hd_sensor_type_id: '',
        hd_hardware_version_id: this.hd_hardware_version_id
      })
    },
    setType(data, index) {
      var sensorTypeList = []
      var channelType = data.channelType
      for (var i = 0, len = this.sensorTypeList.length; i < len; i++) {
        if (this.sensorTypeList[i].channelTypes.indexOf(channelType) > -1) {
          sensorTypeList.push(this.sensorTypeList[i])
        }
      }
      this.channelConfigList[index].sensorTypeList = sensorTypeList
      data.hd_sensor_type_id = ''
    },
    handelDelete(data, index) {
      this.$delete(this.channelConfigList, index)
    },
    saveEdit() {
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

        channels.push(channel)
      }
      var form = {}
      form.hd_hardware_version_id = this.hd_hardware_version_id
      form.channelSensorList = this.channelConfigList
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_hardware_version/editDeviceChannelConfig', form, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          this.dialogForm = false
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
