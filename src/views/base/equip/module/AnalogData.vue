<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :width="dialogWidth + 'px'"
      title="数据上报"
      append-to-body
    >
      <div style="margin-left:10px">
        <el-button
          type="primary"
          size="small"
          @click="add"
        >增加</el-button>
        <el-button
          type="primary"
          size="small"
          @click="getLast"
        >获取最后数据</el-button>
        <el-button
          type="success"
          size="small"
          @click="importData"
        >导入数据</el-button>
      </div>
      <el-table
        :data="deviceList"
        style="width: 100%;"
      >
        <el-table-column
          label="设备名称"
          fixed
          width="150px"
          prop="name"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(sensor,index) in sensorList"
          :key="index"
          :label="sensor.name"
          width="100px"
        >
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.sensor.channel" placeholder="数值" size="small"/> -->
            <el-input
              v-model="scope.row.sensorList[sensor.channel]"
              placeholder="数值"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="上传时间"
          prop="upload_time"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.upload_time"
              style="width:200px"
              size="small"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="copy(scope.row)"
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
        <el-button @click="dialogVisible = false;deviceList=[];add()">取 消</el-button>
        <el-button
          type="primary"
          @click="saveAdd"
        >确 定</el-button>
      </div>
      <bathChannelConfig ref="bathChannelConfig" />
    </el-dialog>
    <el-dialog
      :visible.sync="importDataDialogVisible"
      v-if="importDataDialogVisible"
      width="400px"
      title="数据导入"
      append-to-body
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="通用模板上传"
          name="first"
        >

          <div>
            <el-upload
              class="upload-demo"
              drag
              multiple
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChangeTy"
              :before-upload="beforeUpload"
              action="' '"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
          <div style="margin: 5px;text-align: right;">
            <el-button
              type="primary"
              size="mini"
            >通用模板下载</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane
          label="特殊模板上传"
          name="second"
          v-if="checkSupportspecial()"
        >

          <div>
            <el-upload
              class="upload-demo"
              drag
              multiple
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChangeTs"
              :before-upload="beforeUpload"
              action="' '"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>

          </div>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
import { findByHd_device_id } from '@/api/hd_device_sensor'
import { getDetailById } from '@/api/equip'
import initDict from '@/mixins/initDict'
import { getToken } from '@/utils/auth'

export default {
  components: {},
  mixins: [initDict],
  data () {
    return {
      hd_device_id: null,
      device_id: null,
      hd_device_name: null,
      device_type: null,
      deviceList: [],
      sensorList: [],
      dialogVisible: false,
      maxChannel: 0,
      dialogWidth: 650,
      importDataDialogVisible: false,
      activeName: 'first',
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    handleChangeTs (file, fl) {
      this.uploadData(1, file)
      // if (file) {
      //   if (file.raw.type === 'application/vnd.ms-excel') {
      //   } else {
      //     this.$message.error('暂不支持此类型文件')
      //   }
      // }
    },
    handleChangeTy (file, fl) {
      if (file) {
        if (file.raw.type === 'application/vnd.ms-excel') {
          this.uploadData(0, file)
        } else {
          this.$message.error('暂不支持此类型文件')
        }
      }
    },
    uploadData (type, file) {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      let formData = new FormData()
      formData.append('device_id', this.device_id)
      formData.append('dataFileType', type)
      formData.append('dataFile', file.raw)

      this.$axios.post(process.env.BASE_API + '/hd/hd_device/importData', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('上传成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })

    },
    beforeUpload (file) {
      return false
    },
    //是否支持特殊导入
    checkSupportspecial () {
      if (this.device_type === 'NG-CJ') {//杭州农耕设备
        return true
      }
      return false
    },
    importData () {
      this.importDataDialogVisible = true
    },
    getTime (time = +new Date()) {
      var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
      return date.toJSON().substr(0, 19).replace('T', ' ')
    },
    getLast () {
      findByHd_device_id({ hd_device_id: this.hd_device_id, transition: false }).then(res => {
        if (res.code === 200) {
          const _this = this
          this.sensorList = res.data
          if (this.sensorList.length === 0) {
            this.$message.warning('无传感器数据')
            return
          } else {
            var lst = []
            var upload_time = ''
            this.sensorList.forEach(element => {
              lst[element.channel] = element.value
              upload_time = _this.getTime(element.system_response_time)
            })
            this.deviceList.push({
              name: this.hd_device_name,
              hd_device_id: this.hd_device_id,
              device_id: this.device_id,
              device_type: this.device_type,
              upload_time: upload_time,
              sensorList: lst,
              sensorArray: []
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getSensorList (hd_device_id) {
      this.hd_device_id = hd_device_id
      this.deviceList = []
      getDetailById({ hd_device_id: hd_device_id }).then(res1 => {
        if (res1.code === 200) {
          this.hd_device_id = res1.data.id
          this.device_id = res1.data.device_id
          this.hd_device_name = res1.data.name
          this.device_type = res1.data.device_type
        } else {
          this.$message.error(res1.msg)
        }
        findByHd_device_id({ hd_device_id: hd_device_id }).then(res => {
          if (res.code === 200) {
            this.sensorList = res.data
            if (this.sensorList.length === 0) {
              this.$message.warning('无传感器数据')
              return
            } else {
              this.dialogWidth = 650 + this.sensorList.length * 100
              if (this.dialogWidth > 1600) {
                this.dialogWidth = 1600
              }
              this.add()
              this.dialogVisible = true
              for (let i = 0; i < this.sensorList.length; i++) {
                if (this.sensorList[i].channel > this.maxChannel) {
                  this.maxChannel = this.sensorList[i].channel
                }
              }
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 添加一条记录
    add () {
      this.deviceList.push({
        name: this.hd_device_name,
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        device_type: this.device_type,
        upload_time: null,
        sensorList: [],
        sensorArray: [],
      })
    },
    // 复制一条记录
    copy (data) {
      const newArr = JSON.parse(JSON.stringify(data))
      this.deviceList.push(newArr)
    },
    isNumber (val) {
      var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
        return false
      }
    },
    // 删除
    handelDelete (data, index) {
      this.$delete(this.deviceList, index)
    },
    // 保存
    saveAdd () {
      for (var i = this.deviceList.length - 1; i >= 0; i--) {
        var flag = false
        for (var q = 0; q < this.maxChannel; q++) {
          this.deviceList[i].sensorArray.push(null)
        }
        for (var y = 0; y < this.sensorList.length; y++) {
          if (this.deviceList[i].sensorList[this.sensorList[y].channel]) {
            flag = true
            this.deviceList[i].sensorArray.splice((this.sensorList[y].channel - 1), 1, this.deviceList[i].sensorList[this.sensorList[y].channel])
          }
        }
        if (!flag) {
          this.deviceList.splice(i, 1)
        }
      }
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/analogDeviceData', this.deviceList, config).then(res => {
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
