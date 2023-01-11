<template>
  <div>
    <!-- 编辑弹出框 -->
    <el-dialog
      :title='title'
      :visible.sync="dialogVisible"
      width="750px"
    >
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" space="50%" align-center="true" style="margin-bottom:20px">
        <el-step title="编辑设备" />
        <el-step title="配置显示" />
      </el-steps>
      <!-- 表单 -->
      <el-form ref="form" :model="shuifeiForm" label-width="auto" :rules="rules">
        <!-- 步骤1 -->
        <div v-show="active == 0">
          <el-form-item label="名称" prop="name">
            <el-input v-model="shuifeiForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主设备" prop="hd_device_id">
            <el-select v-model="shuifeiForm.hd_device_id" placeholder="请选择主设备" @change="chooseMain">
              <el-option v-for="item in $parent.hd_device_idListArr" :key="item.id" :label="item.name + ' ' + item.device_id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="副设备" prop="vice_hd_device_id" v-show="vice_show">
            <el-select v-model="shuifeiForm.vice_hd_device_id" placeholder="请选择副设备">
              <el-option v-for="item in $parent.vice_hd_device_idListArr" :key="item.id" :label="item.name + ' ' + item.device_id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采集设备" prop="pickEquipment">
            <el-checkbox-group v-model="shuifeiForm.pickEquipment" size="small" style="border: 1px solid #DCDFE6;border-radius: 4px;padding-top: 5px;">
              <el-checkbox border v-for="item in $parent.selectSensorListArr" :key="item.id" :label="item.id" @change="chooseSensorItem($event, item.id)">{{item.name + ' ' + item.device_id}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="摄像头" prop="pickSxt">
            <el-checkbox-group v-model="shuifeiForm.pickSxt" size="small" style="border: 1px solid #DCDFE6;border-radius: 4px;padding-top: 5px;">
              <el-checkbox border v-for="item in $parent.selectSxtListArr" :key="item.id" :label="item.id" @change="chooseSxtItem($event, item.id)">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <!-- 步骤2 -->
        <div v-show="active == 1">
          <el-form-item :label="'模块' + item" v-for="(item,index) in 3" :key="index">
            <el-radio-group v-model="shuifeiForm.productSfModels[index].type" @change="modelRadioChange(index)">
              <el-radio label="sensor">环境数据</el-radio>
              <el-radio label="sxt">视频监控</el-radio>
              <el-radio label="log">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.productSfModels[index].type=='sensor'" v-model="shuifeiForm.productSfModels[index].productSfModelDetails" multiple placeholder="请选择环境数据" value-key="id">
              <el-option v-for="item in needSensorListArr" :key="item.id" :label="item.device_name + ' - ' + item.name" :value="item"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.productSfModels[index].type=='sxt'" v-model="shuifeiForm.productSfModels[index].productSfModelDetails" multiple placeholder="请选择摄像头" value-key="id">
              <el-option v-for="item in needSxtListArr" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
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

import { getDetailById, deviceList, productSfDetail } from '@/api/shuifei'
import { getToken } from '@/utils/auth'
export default {
  name: 'addTable',
  data () {
    return {
      dialogVisible: false,
      title:"编辑水肥系统",
      // 表单默认展示第一步
		  active: 0,
      vice_show: false,
      shuifeiForm: {
        name: '',
        hd_device_id: "",
        vice_hd_device_id: "",
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
      // 存储主设备的PC传感器id，与采集设备合并后，在第二步用
      mainSensorId: [],
      // 存储第一步的采集设备数据，在第二步用
      needSensorListArr: [],
      needSensorId: [],
      // 存储第一步的摄像头数据，在第二步用
      needSxtListArr: [],
      needSxtId: [],
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
    // 展示表单
    show (row) {
      var sensorDevicesArr = row.productSfDevices.filter((item) => {
        return item.hd_device_type_code != "JK-SX"
      })
      for(var i=0;i<sensorDevicesArr.length;i++){
        this.needSensorId.push(sensorDevicesArr[i].hd_device_id)
      }

      var sxtDevicesArr = row.productSfDevices.filter((item) => {
        return item.hd_device_type_code == "JK-SX"
      })
      for(var i=0;i<sxtDevicesArr.length;i++){
        this.needSxtId.push(sxtDevicesArr[i].hd_device_id)
      }

      // const data = {
      //   id: row.id,
      // }
      // productSfDetail(data).then(res => {
      //   var PCArrObj = res.data.content.filter((item) => {
      //     return item.hd_device_type_code == "JK-PC"
      //   })
      //   this.mainSensorId = PCArrObj[0].id
      // })
      this.$nextTick(() => {
        this.shuifeiForm = {
          name: row.name,
          hd_device_id: row.hd_device_id,
          vice_hd_device_id: row.vice_hd_device_id,
          pickEquipment: this.needSensorId,
          pickSxt: this.needSxtId,
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
        console.log(this.shuifeiForm)
      })

      this.dialogVisible = true
      // this.needSensorId = []
      this.chooseMain(row.hd_device_id)
      
    },
    // 选择主设备，判断是旁路式还是在线式，在线式则隐藏副设备
    chooseMain(main_hd_id){
      let obj = {};
      obj = this.$parent.hd_device_idListArr.find((item) => { // 这里就是上面遍历的测试源
        return item.id == main_hd_id;// 筛选出匹配数据
      });
      if(obj.hd_device_type_code == "JK-SF"){
        this.vice_show = true
      }else{
        this.vice_show = false
        this.shuifeiForm.vice_hd_device_id = ""
      }
      // 筛选出主设备的PC传感器，用于第二步
      const data = {
        bs_base_id: this.$parent.bs_base_id,
        hd_device_parent_id: main_hd_id
      }
      deviceList(data).then(res => {
        var PCArrObj = res.data.content.filter((item) => {
          return item.hd_device_type_code == "JK-PC"
        })
        this.mainSensorId = PCArrObj[0].id
      })
    },
    // 获取环境数据数组列表(根据采集设备选中的值，用于第二步)
    chooseSensorItem(event,id){
      this.needSensorListArr = []
      // 如果是选中
      if (event) {
        // 把选中的id存入数组
        this.needSensorId.push(id);
      } else {
        //如果是取消选中则从数组中删除该id
        this.needSensorId.splice(this.needSensorId.indexOf(id), 1);
      }
    },
    //获取视频监控数组列表(根据摄像头选中的值，用于第二步)
    chooseSxtItem(event,id){
      this.needSxtListArr = []
      // 如果是选中
      if (event) {
        // 把选中的id存入数组
        this.needSxtId.push(id);
      } else {
        //如果是取消选中则从数组中删除该id
        this.needSxtId.splice(this.needSxtId.indexOf(id), 1);
      }
      for(let i=0;i<this.needSxtId.length;i++){
        this.$parent.selectSxtListArr.find((item)=>{
          if(item.id == this.needSxtId[i]){
            this.needSxtListArr.push(item)
            console.log(this.needSxtListArr)
          }
        });
      }
    },
    //模块单选改变的时候
    modelRadioChange(index){
      this.shuifeiForm.productSfModels[index].productSfModelDetails = []
    },

    // 下一步按钮
    next() {
      console.log('next!');
      this.$refs.form.validate().then(valdid => {
        if (!valdid) {
          return
        }
        // 根据主设备的PC传感器+所选的传感器设备，生成合并后的数组
        this.needSensorListArr = []
        var allSensorId = []
        var allSensorId = JSON.parse(JSON.stringify(this.needSensorId))
        allSensorId.push(this.mainSensorId)
        for(let i=0;i<allSensorId.length;i++){
          let data = {
            hd_device_id: allSensorId[i],
          }
          getDetailById(data)
            .then(res => {
              if (res.code === 200) {
                this.needSensorListArr.push.apply(this.needSensorListArr, res.data.sensor);
                console.log(this.needSensorListArr)
              }
            })
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
        let needSensor = (this.needSensorId).concat(this.needSxtId)
        let productSfModels = this.shuifeiForm.productSfModels
        // 构建所需提交的表单
        let formData = new FormData()
        formData.append('name', this.shuifeiForm.name)
        formData.append('hd_device_id', this.shuifeiForm.hd_device_id)
        formData.append('vice_hd_device_id', this.shuifeiForm.vice_hd_device_id)
        needSensor.forEach((value, index) => {
          formData.append(`productSfDevices[${index}]`, value)
        })
        productSfModels.forEach((value, index) => {
          formData.append(`productSfModels[${index}].type`, value.type);
          if(value.type == 'sxt'){
            productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
              formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].hd_device_id`, value2.id)
            })
          }
          if(value.type == 'sensor'){
            productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
              formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].hd_device_sensor_id`, value2.hd_device_sensor_id)
            })
          }
          productSfModels[index].productSfModelDetails.forEach((value2,index2)=>{
            formData.append(`productSfModels[${index}].productSfModelDetails[${index2}].type`, 'undefined')
          })

        })
        
        const config = {
          headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
        }
        this.$axios.post(process.env.BASE_API + '/hd/hd_product_sf/productSfAddOrUpdate', formData, config).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            console.log('提交成功')
            this.$parent.getData()
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
::v-deep .el-checkbox.is-bordered.el-checkbox--small{
  margin-left: 10px;
}
::v-deep .el-select{
  display: block;
}
</style>
