<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="批量添加"
    append-to-body
    width="1700px"
    @close="dialogVisible = false;deviceList=[];add();$parent.getData()"
  >
    <div style="margin-left:10px">
      <el-button
        type="primary"
        size="small"
        @click="add"
      >增加</el-button>
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
          <el-input
            v-model="scope.row.name"
            placeholder="名称"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="设备类型"
        width="200px"
      >
        <template slot-scope="scope">
          <el-cascader
            v-model="scope.row.typeVersion"
            :options="typeVersionOptions"
            clearable
            @change="changeTypeVersion(scope.row.typeVersion,scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="MQTT服务器"
        width="200px"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.bs_server_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in serverList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        label="所属应用"
        width="200px"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.hd_product_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hd_productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        label="设备序列号"
        width="300px"
        prop="deivce_id"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.deviceBody">
            <template slot="prepend">{{ scope.row.deviceHeader }}</template>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="设备验证码"
        width="150px"
        prop="verification_code"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.verification_code" />
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="软件版本号"
        width="150px"
        prop="version"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.version" />
        </template>
      </el-table-column> -->
      <el-table-column
        label="设备详细信息"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.detail_json" />
        </template>
      </el-table-column>
      <el-table-column
        label="通信地址"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.communication" />
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        width="150px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.describe" />
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="400px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="channelConfig(scope.row.channelConfigList,scope.$index)"
          >通道配置</el-button>
          <el-button
            type="primary"
            size="small"
            @click="copy(scope.row)"
          >复制</el-button>
          <el-input
            v-model="scope.row.copynum"
            size="small"
            style="width:50px;"
          />
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
      <el-button @click="dialogVisible = false;deviceList=[];add();$parent.getData()">取 消</el-button>
      <el-button
        type="primary"
        @click="saveAdd"
      >确 定</el-button>
    </div>
    <bathChannelConfig ref="bathChannelConfig" />
  </el-dialog>
</template>

<script>
import { serverList } from '@/api/factorydevice'
import { getTypeHardware } from '@/api/equiptype'
import bathChannelConfig from './bathChannelConfig'
import initDict from '@/mixins/initDict'
import { getToken } from '@/utils/auth'
import { queryProduct } from '@/api/product'

export default {
  components: { bathChannelConfig },
  mixins: [initDict],
  data () {
    return {
      name: null,
      typeVersion: [],
      typeVersionOptions: [],
      serverList: [],
      hd_productList: [],
      device_id: null,
      verification_code: null,
      version: null,
      detail_json: null,
      communication: null,
      describe: null,
      dialogVisible: false,
      deviceList: [],
      index: null
    }
  },
  computed: {
  },
  created () {
    getTypeHardware().then(res => {
      this.typeVersionOptions = res.data
    })
    this.getServerList()

    queryProduct().then(res => {
      this.hd_productList = res.data.content
    })

    if (this.deviceList.length === 0) {
      this.add()
    }
  },
  methods: {
    //获取MQTT服务器列表
    getServerList () {
      serverList({ type: 'mqtt' }).then(res => {
        if (res.code === 200) {
          this.serverList = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 改变设备类型
    changeTypeVersion (data, row) {
      if (data[0] == null || data[1] == null) {
        row.hd_device_type_id = null
        row.hd_hardware_version_id = null
        row.deviceHeader = null
        return
      }
      row.hd_device_type_id = data[0]
      row.hd_hardware_version_id = data[1]
      this.getDeviceHeader(row)
    },
    // 自动更换设备序列号前缀
    getDeviceHeader (row) {
      const _this = this
      this.typeVersionOptions.forEach(function (data1, index1) {
        if (data1.value === row.hd_device_type_id) {
          data1.children.forEach(function (data2, index2) {
            if (data2.value === row.hd_hardware_version_id) {
              var code = data1.code
              var version = _this.prefixIntrger(data2.label, 2)
              var functionCode = data1.functionCode

              row.deviceHeader = code.substring(3, code.length) + version + functionCode + '-'
            }
          })
        }
      })
    },
    prefixIntrger (num, length) {
      return (Array(length).join('0') + num).slice(-length)
    },
    // 通道配置
    channelConfig (list, index) {
      this.index = index
      this.$refs.bathChannelConfig.channelConfigList = []
      this.$refs.bathChannelConfig.getChannelConfigList(list)
      this.$refs.bathChannelConfig.dialogVisible = true
    },
    //随机验证码
    refreshVerificationCode () {
      let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      return arr[Math.floor((Math.random() * 36))] + arr[Math.floor((Math.random() * 36))] + arr[Math.floor((Math.random() * 36))] + arr[Math.floor((Math.random() * 36))] + arr[Math.floor((Math.random() * 36))] + arr[Math.floor((Math.random() * 36))]
    },
    // 添加一条记录
    add () {
      let yzm = this.refreshVerificationCode()
      this.deviceList.push({
        name: null,
        typeVersion: [],
        device_id: null,
        verification_code: yzm,
        version: 'V1.0',
        detail_json: null,
        communication: null,
        describe: null,
        deviceHeader: null,
        deviceBody: null,
        hd_device_type_id: null,
        hd_hardware_version_id: null,
        bs_server_id: null,
        hd_product_id: null,
        channelConfigList: []
      })
    },
    // 复制一条记录
    copy (data) {
      var copynum = data.copynum
      if (!copynum) { copynum = 1 }

      const newArr = JSON.parse(JSON.stringify(data))
      for (var i = 0; i < copynum; i++) {
        var num = data.deviceBody
        if (num) {
          var length = num.length
          if (this.isNumber(num)) {
            num = Number(num) + 1 + i
            num = this.prefixIntrger(num, length)
          }
        }
        newArr.deviceBody = num
        let jl = JSON.parse(JSON.stringify(newArr))
        jl.verification_code = this.refreshVerificationCode()
        this.deviceList.push(jl)
      }
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
    // 赋值通道列表
    assignChannel (list) {
      var index = this.index
      this.$set(this.deviceList[index], 'channelConfigList', list)
    },
    // 删除
    handelDelete (data, index) {
      this.$delete(this.deviceList, index)
    },
    // 保存
    saveAdd () {
      const _this = this
      for (var i = 0; i < this.deviceList.length; i++) {
        var data = this.deviceList[i]
        data.device_id = data.deviceHeader + data.deviceBody
        if (!data.name) {
          _this.$message.warning('名字不能为空')
          return
        }
        if (!data.hd_device_type_id) {
          _this.$message.warning('设备类型不能为空')
          return false
        }
        if (!data.deviceBody) {
          _this.$message.warning('设备序列号不能为空')
          return false
        }
        if (!data.verification_code) {
          _this.$message.warning('设备验证码不能为空')
          return false
        }
        if (!data.version) {
          _this.$message.warning('出厂时程序固件版本不能为空')
          return false
        }
      }
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_factory_device/bathAdd', this.deviceList, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          //this.dialogVisible = false
          if (this.deviceList.length != 0) {
            const newArr = JSON.parse(JSON.stringify(this.deviceList[this.deviceList.length - 1]))
            var num = this.deviceList[this.deviceList.length - 1].deviceBody
            if (num) {
              var length = num.length
              if (this.isNumber(num)) {
                num = Number(num) + 1
                num = this.prefixIntrger(num, length)
              }
            }
            newArr.deviceBody = num
            this.deviceList = []
            this.deviceList.push(JSON.parse(JSON.stringify(newArr)))

          }
          this.$parent.getData()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}

</script>
