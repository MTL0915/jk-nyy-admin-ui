<template>
  <div>
    <div style="text-align: center;">
      <div class="divClass">
        　　　　设备名称:
        <el-input
          v-model="device_name"
          size="mini"
          clearable
          class="inputClass"
        />
      </div>
      <div class="divClass">
        　　　设备验证码:
        <el-input
          v-model="verification_code"
          size="mini"
          clearable
          class="inputClass"
        />
      </div>
      <div class="divClass">
        　　　　设备类型:
        <el-select
          v-model="deviceType"
          value-key="name"
          placeholder="请选择"
          size="mini"
          clearable
          class="inputClass"
        >
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.name"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="divClass">
        　　第三方设备ID:
        <el-input
          v-model="other_device_id"
          size="mini"
          clearable
          class="inputClass"
        />
      </div>
    </div>
    <div style="text-align: right;">
      <el-button
        type="primary"
        size="mini"
        @click="add"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>

import { addAlmsoundDeviceFactory } from '@/api/almsound'

export default {
  data () {
    return {
      device_name: '蓝奥声插座',
      verification_code: 'A12345',
      other_device_id: '',//插座ID
      deviceType: {
        name: '智能插座',
        other_device_type: '0042',
        other_device_sequence: '0000'
      },
      deviceTypeOptions: [
        {
          name: '智能插座',
          other_device_type: '0042',
          other_device_sequence: '0000'
        }
      ]
    }
  },
  methods: {
    add () {
      if (!this.device_name) {
        this.$message.error('请输入设备名称')
        return
      }
      if (!this.verification_code) {
        this.$message.error('请输入设备验证码')
        return
      }
      if (!this.other_device_id) {
        this.$message.error('请输入蓝奥声设备序列号')
        return
      }
      if (!this.deviceType) {
        this.$message.error('请选择设备类型')
        return
      }
      addAlmsoundDeviceFactory({
        other_device_id: this.other_device_id,
        device_name: this.device_name,
        verification_code: this.verification_code,
        other_device_type: this.deviceType.other_device_type,
        other_device_sequence: this.deviceType.other_device_sequence
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.divClass {
  margin-top: 8px;
}

.inputClass {
  width: 200px;
}
</style>