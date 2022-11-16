<template>
  <div>
    <div
      style="text-align:center;"
      v-show="step===1"
    >
      <div>
        账号：
        <el-input
          v-model="username"
          placeholder="请输入账号"
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <div>
        密码：
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <el-button
        :loading="getLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="getDevices"
      >获取设备</el-button>
    </div>
    <div v-show="step===2">
      <el-button
        type="primary"
        size="mini"
        @click="batchAdd"
        style="text-align:left;"
      >
        批量添加
      </el-button>
      <el-table
        :data="deviceList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="nm"
          label="车牌号"
        />
        <el-table-column
          prop="pt"
          label="车牌颜色"
        />
        <el-table-column
          prop="deviceId"
          label="设备号"
        />
        <el-table-column
          prop="deviceSim"
          label="SIM卡号"
        />
        <el-table-column
          prop="deviceUs"
          label="设备状态"
        >
          <template slot-scope="scope">
            {{scope.row.deviceUs===0?'启用':'禁用'}}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showAdd(scope.row)"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      append-to-body
      title="添加到出厂设备"
      :visible.sync="addDialogVisible"
      v-if="addDialogVisible"
    >
      <div style="text-align:center;">
        <div style="margin-top:15px;">
          设备名称：
          <el-input
            size="mini"
            style="width:300px;"
            v-model="name"
            clearable
          />
          设备验证码：
          <el-input
            size="mini"
            style="width:300px;"
            v-model="verification_code"
            clearable
          />
        </div>
      </div>
      <div style="text-align:right;margin-top:15px;">
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryUserVehicle } from '@/api/ruide'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      step: 1,
      username: 'zdsl',
      password: '000000',
      getLoading: false,
      deviceList: [],
      addDialogVisible: false,
      name: null,
      verification_code: 'A12345',
      deviceSerial: null,
      multipleSelection: [],
    }
  },
  methods: {
    batchAdd () {
      let length = this.multipleSelection.length;
      if (length === 0) {
        this.$message.error("请选择需要添加的设备!");
        return false;
      }
      let list = []
      for (let i = 0; i < length; i++) {
        let device = this.multipleSelection[i]
        list.push({
          name: ('瑞德设备:' + device.nm),
          verification_code: 'A12345',
          username: this.username,
          password: this.password,
          deviceSerial: device.deviceId
        })
      }
      this.addFactoryDevice(list)
    },
    save () {
      let list = []
      list.push({
        name: this.name,
        verification_code: this.verification_code,
        username: this.username,
        password: this.password,
        deviceSerial: this.deviceSerial
      })
      this.addFactoryDevice(list)
    },
    addFactoryDevice (list) {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/ruide/add', list, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    showAdd (row) {
      this.addDialogVisible = true
      this.name = '瑞德设备:' + row.nm
      this.deviceSerial = row.deviceId
    },
    getDevices () {
      queryUserVehicle({
        username: this.username,
        password: this.password,
      }).then(res => {
        if (res.code === 200) {
          let list = res.data
          for (let i = 0; i < list.length; i++) {
            let list2 = list[i].dl
            for (let j = 0; j < list2.length; j++) {
              let deviceData = {
                id: list[i].id,//车辆ID
                nm: list[i].nm,//车牌号
                ic: list[i].lc,//车辆图标
                pt: list[i].pt,//车牌颜色
                deviceId: list2[j].id,//设备号
                devicePid: list2[j].pid,//设备所属公司
                deviceIc: list2[j].ic,//IO数目
                deviceIo: list2[j].io,//IO名称 以','分隔
                deviceCc: list2[j].cc,//通道数目
                deviceCn: list2[j].cn,//通道名称 以','分隔
                deviceTc: list2[j].tc,//温度传感器数目
                deviceTn: list2[j].tn,//温度传感器名称 以','分隔
                deviceMd: list2[j].md,//外设参数 按位表示，每位表示一种外设，第一位为支持视频，第二位为油路控制，第三位为电路控制，第四位为tts语音，第五位为数字对讲，第六位为支持抓拍，第七位为支持监听，第八位为油量传感器，第九位为支持对讲，第十位为ODB外设。
                deviceSim: list2[j].sim,//SIM卡号
                deviceVt: list2[j].vt,//车辆类型：1危险品运输车,2普通客运车辆,3农村客运车辆,4出租车,5货运车辆,6渣土车,7环卫车,8混凝土车,9挖掘机,10工程车
                deviceNflt: list2[j].nflt,//月流量超限：0超限后忽略，1表示超限后禁用媒体业务
                deviceDid: list2[j].did,//设备号
                deviceIsb: list2[j].isb,//设备类型 1苏标 2陕标
                deviceUs: list2[j].us,//设备使用状态 是否启用 0 启用 1禁用
              }
              this.deviceList.push(deviceData)
            }
          }
          this.step = 2
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>