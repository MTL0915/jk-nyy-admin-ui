<template>
  <div>
    <!-- <el-steps :active="step">
      <el-step
        title="登录"
        description="请输入瑞丰的 账号与密码"
      ></el-step>
      <el-step
        title="添加设备"
        description="从列表中选择需要添加的设备"
      ></el-step>
    </el-steps> -->
    <div
      v-show="step===1"
      style="text-align:center;"
    >
      <div>
        威光客户账号：
        <el-input
          v-model="username"
          placeholder="请输入账号"
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <div>
        威光客户密码：
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
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
      >登录</el-button>
    </div>
    <div
      v-show="step===2"
      style="text-align:center;"
    >
      <el-table
        :data="deviceCodeList"
        style="width: 100%"
      >
        <el-table-column
          prop="deviceCode"
          label="设备编号"
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
        <div style="margin-top:15px;">
          采集单位：
          <el-select
            v-model="collectUnit"
            placeholder="请选择"
            size="mini"
            style="width:300px;"
          >
            <el-option
              v-for="item in collectUnitOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="margin-top:15px;color: #ff003b;">
          <div>威视百科设备采集需发送接口进行调整，该平台有的设备以小时为单位设置，有的设备以分钟为单位设置，</div>
          <div>需要在出厂的时间确认同步单位，已出厂的设备可编辑设备修改，之后点击更新设备将出厂信息同步到设备中</div>
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
import { list, addVispekDeviceFactory } from '@/api/vispek'

export default {
  data () {
    return {
      step: 1,
      loginLoading: false,
      saveLoading: false,
      username: 'sdja001',//威光客户账号
      password: '123456',//威光客户密码
      other_device_id: '',//威视佰科设备编号
      device_name: '',//设备名称
      verification_code: 'A12345',//设备验证码
      deviceCodeList: [],
      addDeviceVisible: false,
      collectUnit: 'minute',
      collectUnitOptions: [
        {
          name: '小时',
          value: 'hour'
        },
        {
          name: '分钟',
          value: 'minute'
        }
      ]
    }
  },
  methods: {
    login () {
      this.loginLoading = true
      list({
        username: this.username,
        password: this.password
      }).then(res => {
        this.loginLoading = false
        if (res.code === 200) {
          let array = []
          res.data.map(v => {
            array.push({ deviceCode: v })
          })
          this.deviceCodeList = array
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addDevice (row) {
      this.other_device_id = row.deviceCode
      this.addDeviceVisible = true
    },
    save () {
      this.saveLoading = true
      addVispekDeviceFactory({
        other_device_id: this.other_device_id,
        device_name: this.device_name,
        username: this.username,
        password: this.password,
        verification_code: this.verification_code,
        collectUnit: this.collectUnit
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