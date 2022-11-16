<template>
  <div>
    <el-dialog
      append-to-body
      title="添加云牧饲喂育肥设备"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="设备SN号"
          width="200px"
        >
          <el-input
            v-model="other_device_id"
            style="width:200px;"
          />
        </el-form-item>

        <el-form-item label="设备名称">
          <el-input
            v-model="deviceName" 
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
            v-model="verification_code" 
            style="width:200px;"
          />
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
        style="text-align:center"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          v-loading="isLoading"
          @click="saveEdit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addFWFactoryDevice } from '@/api/yunmu'

export default {
  data () {
    return {
      dialogVisible: false,
      other_device_id: null,
      deviceName: '云牧饲喂育肥设备',
      verification_code: "A12345",
      isLoading: false,
    }
  },
  methods: {
    cancel () {
      this.other_device_id = null
      this.deviceName = '云牧饲喂育肥设备'
      this.verification_code = "A12345"
      this.dialogVisible = false;
      this.isLoading && (this.loading = false);
    },
    showDialog () {
      this.dialogVisible = true;
    },
    saveEdit () {
      if (!this.other_device_id) {
        this.$message.error('设备编号不能为空!')
        return
      }

      this.isLoading = true;
      addFWFactoryDevice({
        other_device_id: this.other_device_id,
        deviceName: this.deviceName,
        verification_code: this.verification_code,
      }).then(res => {
        this.isLoading = false;
        if (res.code === 200) {
          this.$message.success("添加成功，出厂设备序列号：" + res.data.device_id);
          this.cancel();
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  }
}
</script>