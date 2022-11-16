<template>
  <div>
    <div style="text-align:center;">
      <div>
        设备名称：
        <el-input
          v-model="device_name"
          size="mini"
          style="width:300px;margin-top:15px;"
          clearable
        />
      </div>
      <div>
        设备验证码：
        <el-input
          v-model="verification_code"
          size="mini"
          style="width:300px;margin-top:15px;"
          clearable
        />
      </div>
      <div>
        海豹设备序列号：
        <el-input
          size="mini"
          style="width:300px;margin-top:15px;"
          v-model="other_device_id"
          clearable
        />
      </div>
      <div>
        海豹设备类型：
        <el-select
          v-model="type"
          style="width:300px;margin-top:15px;"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div style="text-align: right;padding-right: 15px;">
      <el-button
        :loading="addLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="addDevice"
      >添加设备</el-button>
    </div>
  </div>
</template>
<script>
import { addJingxunDeviceFactory } from '@/api/seal'

export default {
  data () {
    return {
      addLoading: false,
      other_device_id: '',//海豹设备序列号
      device_name: '',//设备名称
      verification_code: 'A12345',//设备验证码
      type: 'sz',
      typeOptions: [
        {
          name: '水质监测器',
          value: 'sz'
        }
      ]
    }
  },
  methods: {
    addDevice () {
      addJingxunDeviceFactory({
        other_device_id: this.other_device_id,
        device_name: this.device_name,
        verification_code: this.verification_code,
        type: this.type
      }).then(res => {
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