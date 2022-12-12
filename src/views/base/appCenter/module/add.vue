<template>
  <div>
    <!-- 新增弹出框 -->
    <el-dialog
      :title='水肥应用系统新增'
      :visible.sync="dialogVisible"
      width="550px"
    >
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" space="50%" align-center="true" style="margin-bottom:20px">
        <el-step title="添加设备" />
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
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="next" type="primary" v-if="active == 0">下一步</el-button>
        <el-button @click="prev" type="primary" v-if="active == 1">上一步</el-button>
        <el-button @click="submit" type="primary" v-if="active == 1">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { getDetailById } from '@/api/shuifei'
import { getToken } from '@/utils/auth'
export default {
  name: 'addTable',
  data () {
    return {
      dialogVisible: false,
      // 表单默认展示第一步
		  active: 0,
      shuifeiForm: {
        name: '',
        hd_device_id: "",
        pickEquipment: [],
        pickSxt: [],
        productSfDevices: [],
        productSfModels: [
          {
            type:"",
            productSfModelDetails:[]
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
      // 存储第一步的采集设备数据，第二步
      needSensorListArr: [],
      // 存储第一步的摄像头数据，第二步
      needSxtListArr: [],
      // 表单规则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        hd_device_id: [
          { required: true, message: '请选择主设备', trigger: 'change' }
        ],
        pickEquipment: [
          { type: 'array', required: false, message: '请选择环境数据', trigger: 'change' }
        ],
        pickSxt: [
          { type: 'array', required: false, message: '请选择摄像头', trigger: 'change' }
        ],
      },
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
          add(form).then(res => {
            if (res.code === 200) {
              this.$message.success('添加设备类型成功！')
              this.dialogVisible = false
              this.$parent.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    show () {
      this.shuifeiForm = {
        name: '',
        hd_device_id: "",
        pickEquipment: [],
        pickSxt: [],
        productSfDevices: [],
        productSfModels: [
          {
            type:"",
            productSfModelDetails:[]
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
      }
      this.dialogVisible = true
    },
    //获取环境数据数组列表(根据采集设备选中的值，用于第二步)
    getSensorList(val){
      this.needSensorListArr = []
      if(val){
        for(let i=0;i<val.length;i++){
          let data = {
            hd_device_id: val[i],
          }
          getDetailById(data)
            .then(res => {
              if (res.code === 200) {
                this.needSensorListArr.push.apply(this.needSensorListArr, res.data.sensor);
                console.log(this.needSensorListArr)
              } else {

              }
            })
            .catch(() => {})
        }
      }
    },
    //获取视频监控数组列表(根据摄像头选中的值，用于第二步)
    getCameraList(val){
      this.needSxtListArr = []
      for(let i=0;i<=val.length-1;i++){
        this.$parent.selectSxtListArr.find((item)=>{
          if(item.id == val[i]){
            this.needSxtListArr.push(item)
            console.log(this.needSxtListArr)
          }
        });
      }
    },
    //A模块单选改变的时候
    firstRadioChange(){
      this.shuifeiForm.productSfModels[0].productSfModelDetails = []
    },
    //B模块单选改变的时候
    secondRadioChange(){
      this.shuifeiForm.productSfModels[1].productSfModelDetails = []
    },
    //C模块单选改变的时候
    thirdRadioChange(){
      this.shuifeiForm.productSfModels[2].productSfModelDetails = []
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
    // 提交按钮
    submit() {
      console.log('submit!');
      this.$refs.form.validate().then(valdid => {
        if (!valdid) {
          return
        }
        // 所需传入的传感器设备
        let needSensor = (this.shuifeiForm.pickEquipment).concat(this.shuifeiForm.pickSxt)
        let productSfModels = this.shuifeiForm.productSfModels
        // 构建所需提交的表单
        let formData = new FormData()
        formData.append('name', this.shuifeiForm.name)
        formData.append('hd_device_id', this.shuifeiForm.hd_device_id)
        needSensor.forEach((value, index) => {
          formData.append(`productSfDevices[${index}]`, value)
        })
        productSfModels.forEach((value, index) => {
          formData.append(`productSfModels[${index}].type`, value.type);
          if(value.type == 'sxt'){
            productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
              console.log(value2)
              formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].hd_device_id`, value2.id)
            })
          }
          if(value.type == 'sensor'){
            productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
              formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].hd_device_sensor_id`, value2.hd_device_sensor_id)
              formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].type`, 'chart')
            })
          }
          productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
            formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].type`, 'chart')
          })

        })
        
        const config = {
          headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
        }
        this.$axios.post(process.env.BASE_API + '/hd/hd_product_sf/productSfAddOrUpdate', formData, config).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            console.log('提交成功')
          } else {
            this.$message.error(res.data.msg)
            console.log(res)
          }
        })

        this.dialogVisible = false
        this.active = 0
      })
    },
  }
}
</script>

<style scoped>

</style>
