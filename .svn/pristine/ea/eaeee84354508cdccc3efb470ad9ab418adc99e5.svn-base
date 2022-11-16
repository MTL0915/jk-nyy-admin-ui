<template>
  <div>
    <el-dialog
      append-to-body
      title="添加巡检轨道机器人"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="设备编号"
          width="200px"
        >
          <el-input
            v-model="other_device_id"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="标签数量"
          width="200px"
        >
          <el-input
            v-model="labelNum"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="账号"
          width="200px"
        >
          <el-input
            v-model="username"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="加密密码"
          width="200px"
        >
          <el-input
            v-model="encryptionPassword"
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
import { addXJFactoryDevice } from '@/api/iflytek'

export default {
  data () {
    return {
      dialogVisible: false,
      other_device_id: null,
      labelNum:8,
      username:null,
      encryptionPassword:null,
      deviceName: '巡检轨道机器人',
      verification_code: "A12345",
      isLoading: false,
    }
  },
  methods: {
    cancel () {
      this.username = null
      this.encryptionPassword = null
      
      this.other_device_id = null
      this.labelNum = 8
      this.deviceName = '巡检轨道机器人'
      this.verification_code = "A12345"
      this.dialogVisible = false;
    },
    showDialog () {
      this.dialogVisible = true;
    },
    saveEdit () {
      if (!this.other_device_id) {
        this.$message.error('设备编号不能为空!')
        return
      }
      if (isNaN(parseInt(this.labelNum)) || parseInt(this.labelNum) < 1 ){
        this.$message.error('请输入正确的标签数量！')
        return
      }
      if (!this.username || !this.encryptionPassword) {
        this.$message.error('账号或密码不能为空!')
        return
      }

      this.isLoading = true;
      addXJFactoryDevice({
        code: this.code,
        username: this.username,
        encryptionPassword: this.encryptionPassword,

        other_device_id: this.other_device_id,
        labelNum: this.labelNum,
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