<template>
  <div>
    <el-dialog
      append-to-body
      title="添加OneNet采集类设备"
      :visible.sync="dialogVisible"
    >
        <el-form ref="form" label-width="100px">
            <el-form-item label="设备编号" width="200px" > 
                <el-input v-model="device_id" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" > 
                <el-input v-model="device_name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="验证码" > 
                <el-input v-model="verification_code" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="APIKey" > 
                <el-input v-model="apiKey" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="环境监测类型" > 
                <el-select v-model="category" placeholder="请选择">
                    <el-option label="鸡舍环境监测" value="chicken_house_env" ></el-option>
                </el-select>
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
import {  addCJDeviceFactory } from '@/api/onenet'

export default {
  data () {
    return {
        dialogVisible:false,
        device_id:"",
        device_name:"",
        verification_code:"A12345",
        apiKey:"",
        category:"chicken_house_env",
        confirmLoading:false,
    }
  },
  methods: {
    cancel(){
        this.device_id = "";
        this.device_name = ""
        this.apiKey = ""
        this.dialogVisible = false;
    },
    showDialog(){
        this.dialogVisible = true;
    },
    saveEdit(){
        var data = {
            device_id:this.device_id,
            device_name:this.device_name,
            apiKey:this.apiKey,
            verification_code:this.verification_code,
            category:this.category
        }
        this.confirmLoading = true;
        addCJDeviceFactory(data).then(res => {
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