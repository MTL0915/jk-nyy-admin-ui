<template>
  <div>
    <el-dialog
      append-to-body
      title="添加全产业链溯源平台采集类设备"
      :visible.sync="dialogVisible"
    >
        <el-form ref="form" label-width="100px">
            <el-form-item label="设备编号" width="200px" > 
                <el-input v-model="other_device_id" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" > 
                <el-input v-model="deviceName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="验证码" > 
                <el-input v-model="verification_code" style="width:200px;"></el-input>
            </el-form-item>
        </el-form>

         <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" v-loading="confirmLoading" @click="saveEdit" >确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import {  addFactoryDevice } from '@/api/suyuan51'

export default {
  data () {
    return {
        dialogVisible:false,
        other_device_id:"",
        deviceName:"",
        verification_code:"A12345",
        confirmLoading:false,
    }
  },
  methods: {
    cancel(){
        this.other_device_id = "";
        this.deviceName = ""
        this.apiKey = ""
        this.dialogVisible = false;
    },
    showDialog(){
        this.dialogVisible = true;
    },
    saveEdit(){
        var data = {
            other_device_id:this.other_device_id,
            deviceName:this.deviceName,
            verification_code:this.verification_code,
        }
        this.confirmLoading = true;
        addFactoryDevice(data).then(res => {
            this.confirmLoading = false;
            if (res.code === 200){
                this.$message.success("添加成功，出厂设备序列号：" + res.data.device_id);
                this.cancel();
            }else{
                this.$message.error(res.msg);
            }
        })
    }
  }
}
</script>