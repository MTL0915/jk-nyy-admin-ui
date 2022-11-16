<template>
  <div>
    <el-dialog
      append-to-body
      title="添加冠辰杀虫灯设备"
      :visible.sync="dialogVisible"
    >
        <el-form ref="form" label-width="100px">
            <el-form-item label="设备编号" width="200px" > 
                <el-input v-model="guanchen_device_id" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" > 
                <el-input v-model="guanchen_device_name" style="width:200px;"></el-input>
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
import {  addCDDeviceFactory } from '@/api/guanchen'

export default {
  data () {
    return {
        dialogVisible:false,
        guanchen_device_id:"",
        guanchen_device_name:"",
        verification_code:"A12345",
        confirmLoading:false,
    }
  },
  methods: {
    cancel(){
        this.guanchen_device_id = "";
        this.guanchen_device_name = ""
        this.dialogVisible = false;
    },
    showDialog(){
        this.dialogVisible = true;
    },
    saveEdit(){
        var data = {
            guanchen_device_id:this.guanchen_device_id,
            guanchen_device_name:this.guanchen_device_name,
            verification_code:this.verification_code
        }
        this.confirmLoading = true;
        addCDDeviceFactory(data).then(res => {
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