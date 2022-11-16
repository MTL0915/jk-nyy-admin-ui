<template>
  <div>
    <el-dialog
      append-to-body
      title="添加为动智能插座"
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
          label="productkey"
          width="200px"
        >
          <el-input
            v-model="productkey"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="querykey"
          width="200px"
        >
          <el-input
            v-model="querykey"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="cmdkey"
          width="200px"
        >
          <el-input
            v-model="cmdkey"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="cmdsecret"
          width="200px"
        >
          <el-input
            v-model="cmdsecret"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="secretkey"
          width="200px"
        >
          <el-input
            v-model="secretkey"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item
          label="操作密码"
          width="200px"
        >
          <el-input
            v-model="operationPass"
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
import { addCZFactoryDevice } from '@/api/weidkz'

export default {
  data () {
    return {
      dialogVisible: false,
      code: 'WD-CZ', 
      other_device_id: null,
      productkey:null,
      querykey:null,
      cmdkey:null,
      cmdsecret:null,
      secretkey:null,
      operationPass:null,
      deviceName: '为动智能插座',
      verification_code: "A12345",
      isLoading: false,
    }
  },
  methods: {
    cancel () {
      this.productkey = null
      this.querykey = null
      this.cmdkey = null
      this.cmdsecret = null
      this.secretkey = null
      this.operationPass = null
      
      this.other_device_id = null
      this.deviceName = '为动智能插座'
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
      if (!this.productkey || !this.querykey || !this.cmdkey || !this.cmdsecret || !this.secretkey || !this.operationPass) {
        this.$message.error('为动设备属性不能为空!')
        return
      }

      this.isLoading = true;
      addCZFactoryDevice({
        code: this.code,
        
        productkey: this.productkey,
        querykey: this.querykey,
        cmdkey: this.cmdkey,
        cmdsecret: this.cmdsecret,
        secretkey: this.secretkey,
        operationPass: this.operationPass,

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