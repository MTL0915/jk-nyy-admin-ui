<template>
  <div>
    <div
      v-show="step===1"
      style="text-align:center;"
    >
      <div>
        秘钥（16位字符串）：
        <el-input
          v-model="secretKey"
          placeholder="请输入秘钥"
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <el-button
        :loading="loginLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="login"
      >获取设备列表</el-button>
    </div>
    <div
      v-show="step===2"
      style="text-align:center;"
    >
      <el-table
        :data="deviceList"
        style="width: 100%"
      >
        <el-table-column
          prop="deviceNumber"
          label="设备编号"
        />
        <el-table-column
          prop="connectType"
          label="设备类型"
        />
        <el-table-column
          prop="name"
          label="设备名称"
        />
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="addDevice(scope.row)"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      append-to-body
      title="添加到出厂设备"
      :visible.sync="addDeviceVisible"
      v-if="addDeviceVisible"
    >
      <div style="text-align:center;">
        <div style="margin-top:15px;">
          设备名称：
          <el-input
            size="mini"
            style="width:300px;"
            v-model="device_name"
            clearable
          />
        </div>
        <div style="margin-top:15px;">
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
          :loading="saveLoading"
          type="primary"
          size="mini"
          @click="save"
        >确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { list, addJingxunDeviceFactory } from '@/api/jingxun'

export default {
  data () {
    return {
      step: 1,
      loginLoading: false,
      saveLoading: false,
      secretKey: '70D0E881BF9A78DE',//精讯云秘钥
      other_device_id: '',//精讯云设备编号
      device_name: '',//设备名称
      verification_code: 'A12345',//设备验证码
      deviceList: [],
      addDeviceVisible: false,
    }
  },
  methods: {
    login () {
      this.loginLoading = true
      list({
        secretKey: this.secretKey
      }).then(res => {
        this.loginLoading = false
        if (res.code === 200) {
          this.deviceList = res.data
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addDevice (row) {
      this.other_device_id = row.deviceNumber
      this.device_name = row.name
      this.addDeviceVisible = true
    },
    save () {
      this.saveLoading = true
      addJingxunDeviceFactory({
        other_device_id: this.other_device_id,
        device_name: this.device_name,
        secretKey: this.secretKey,
        verification_code: this.verification_code
      }).then(res => {
        this.saveLoading = false
        this.addDeviceVisible = false
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>