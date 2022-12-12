<template>
  <div>
    <!-- 编辑弹出框 -->
    <el-dialog
      :title='水肥应用系统编辑'
      :visible.sync="dialogVisible"
      width="550px"
    >
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" space="50%" align-center="true" style="margin-bottom:20px">
        <el-step title="编辑设备" />
        <el-step title="配置显示" />
      </el-steps>
      <!-- 表单 -->
      <el-form ref="form" :model="shuifeiForm" label-width="auto" :rules="rules">
        <div v-show="active == 0">
          <el-form-item label="名称" prop="name">
            <el-input v-model="shuifeiForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主设备" prop="hd_device_id">
            <el-select v-model="shuifeiForm.hd_device_id" placeholder="请选择主设备" @change="selectHd_device_id">
              <el-option v-for="item in $parent.hd_device_idListArr" :key="item.id" :label="item.name + ' ' + item.device_id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采集设备" prop="pickEquipment">
            <el-select v-model="shuifeiForm.pickEquipment" multiple placeholder="请选择采集设备" @change="getSensorList">
              <el-option v-for="item in $parent.selectSensorListArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摄像头" prop="sxtCheckList">
            <el-select v-model="shuifeiForm.sxtCheckList" multiple placeholder="请选择摄像头" @change="getCameraList">
              <el-option
                v-for="item in $parent.selectSxtListArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="active == 1">
          <el-form-item label="A模块">
            <el-radio-group v-model="shuifeiForm.productSfModels[0].type" @change="firstRadioChange">
              <el-radio label="sensor">环境数据</el-radio>
              <el-radio label="sxt">视频监控</el-radio>
              <el-radio label="log">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.productSfModels[0].type=='sensor'" v-model="shuifeiForm.productSfModels[0].productSfModelDetails" multiple placeholder="请选择环境数据" value-key="id">
              <el-option v-for="item in needSensorListArr" :key="item.id" :label="item.device_name + ' - ' + item.name" :value="item"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.productSfModels[0].type=='sxt'" v-model="shuifeiForm.productSfModels[0].productSfModelDetails" multiple placeholder="请选择摄像头" value-key="id">
              <el-option v-for="item in needSxtListArr" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <!-- <el-select v-if="shuifeiForm.productSfModels[0].type=='log'" v-model="shuifeiForm.arrA" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="B模块">
           <el-radio-group v-model="shuifeiForm.productSfModels[1].type" @change="secondRadioChange">
              <el-radio label="sensor">环境数据</el-radio>
              <el-radio label="sxt">视频监控</el-radio>
              <el-radio label="log">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.productSfModels[1].type=='sensor'" v-model="shuifeiForm.productSfModels[1].productSfModelDetails" multiple placeholder="请选择环境数据" value-key="id">
              <el-option v-for="item in needSensorListArr" :key="item.id" :label="item.device_name + ' - ' + item.name" :value="item"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.productSfModels[1].type=='sxt'" v-model="shuifeiForm.productSfModels[1].productSfModelDetails" multiple placeholder="请选择摄像头" value-key="id">
              <el-option v-for="item in needSxtListArr" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <!-- <el-select v-if="shuifeiForm.productSfModels[1].type=='log'" v-model="shuifeiForm.arrB" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="C模块">
           <el-radio-group v-model="shuifeiForm.productSfModels[2].type" @change="thirdRadioChange">
              <el-radio label="sensor">环境数据</el-radio>
              <el-radio label="sxt">视频监控</el-radio>
              <el-radio label="log">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.productSfModels[2].type=='sensor'" v-model="shuifeiForm.productSfModels[2].productSfModelDetails" multiple placeholder="请选择环境数据" value-key="id">
              <el-option v-for="item in needSensorListArr" :key="item.id" :label="item.device_name + ' - ' + item.name" :value="item"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.productSfModels[2].type=='sxt'" v-model="shuifeiForm.productSfModels[2].productSfModelDetails" multiple placeholder="请选择摄像头" value-key="id">
              <el-option v-for="item in needSxtListArr" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <!-- <el-select v-if="shuifeiForm.productSfModels[2].type=='log'" v-model="shuifeiForm.arrC" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
          </el-form-item>
        </div>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="next" type="primary" v-if="active == 0">下一步</el-button>
        <el-button @click="prev" type="primary" v-if="active == 1">上一步</el-button>
        <el-button @click="submit" type="primary" v-if="active == 1">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { update } from '@/api/equiptype'
export default {
  name: 'editTable',
  data () {
    return {
      dialogVisible: false,
      // 表单默认展示第一步
		  active: 0,
      shuifeiForm: {
        name: '',
        hd_device_id: "",
        pickEquipment: [],
        sxtCheckList: [],
        productSfDevices: [],
        productSfModels: [
          {
            type:"",
            productSfModelDetails:[
              // {
              //   hd_device_sensor_id:'11111',
              //   name:'风速',
              //   config:'{"color":"#FFFFFFF",}'
              // },
              // {
              //   hd_device_sensor_id:'11111',
              //   name:'雨量',
              //   config:'{"color":"#FFFFFFF",}'
              // },
            ]
          },
          {
            type:"",
            productSfModelDetails:[]
          },
          {
            type:"",
            productSfModelDetails:[]
          },
        ],
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入设备类型编号', trigger: 'blur' }
        ],
        function_code: [
          // 单选
          { required: true, message: '功能类别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    // 保存编辑
    saveEdit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form
          if (form.fileRaw) {
            form.image_path = form.fileRaw
          }
          update(form).then(res => {
            if (res.code === 200) {
              this.$message.success('编辑成功')
              this.dialogVisible = false
              this.$parent.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    show (item) {
      console.log(item)
      this.shuifeiForm = {
        name: item.name,
        hd_device_id: item.hd_device_id,
        pickEquipment: [],
        sxtCheckList: [],
        productSfDevices: [],
        productSfModels: [
          {
            type:"",
            productSfModelDetails:[
              // {
              //   hd_device_sensor_id:'11111',
              //   name:'风速',
              //   config:'{"color":"#FFFFFFF",}'
              // },
              // {
              //   hd_device_sensor_id:'11111',
              //   name:'雨量',
              //   config:'{"color":"#FFFFFFF",}'
              // },
            ]
          },
          {
            type:"",
            productSfModelDetails:[]
          },
          {
            type:"",
            productSfModelDetails:[]
          },
        ]
      }
      this.dialogVisible = true
    },
    // 下一步按钮
    next() {
      console.log('next!');
      this.$refs.form.validate().then(valdid => {
        if (!valdid) {
          return
        }
        this.active = 1
      })
    },
    // 上一步按钮
    prev() {
      this.active = 0
    },
  }
}
</script>

<style scoped>

</style>
