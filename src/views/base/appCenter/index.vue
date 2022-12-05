<template>
  <el-card class="manage">
    <!-- 表格S -->
    <el-dialog
      :title="operateType === 'add' ? '水肥应用系统' : '水肥应用系统'"
      :visible.sync="isShow"
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
          <el-form-item label="主设备" prop="firstEquipment">
            <el-select v-model="shuifeiForm.firstEquipment" placeholder="请选择主设备" @change="selectFirstEquipment">
              <el-option v-for="item in firstEquipmentList" :key="item.id" :label="item.name + ' ' + item.device_id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采集设备" prop="pickEquipment">
            <el-select v-model="shuifeiForm.pickEquipment" multiple placeholder="请选择采集设备" @change="getSensorList">
              <el-option v-for="item in pickEquipmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摄像头" prop="sxtCheckList">
            <el-select v-model="shuifeiForm.sxtCheckList" multiple placeholder="请选择摄像头" @change="getCameraList">
              <el-option
                v-for="item in sxtListArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="active == 1">
          <el-form-item label="A模块">
            <el-radio-group v-model="shuifeiForm.firstRadio" @change="firstRadioChange">
              <el-radio label="1">环境数据</el-radio>
              <el-radio label="2">视频监控</el-radio>
              <el-radio label="3">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.firstRadio==1" v-model="shuifeiForm.AData" multiple placeholder="请选择环境数据">
              <el-option v-for="item in sensorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.firstRadio==2" v-model="shuifeiForm.AData" multiple placeholder="请选择摄像头">
              <el-option v-for="item in cameraList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.firstRadio==3" v-model="shuifeiForm.AData" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="B模块">
           <el-radio-group v-model="shuifeiForm.secondRadio" @change="secondRadioChange">
              <el-radio label="1">环境数据</el-radio>
              <el-radio label="2">视频监控</el-radio>
              <el-radio label="3">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.secondRadio==1" v-model="shuifeiForm.BData" multiple placeholder="请选择环境数据">
              <el-option v-for="item in sensorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.secondRadio==2" v-model="shuifeiForm.BData" multiple placeholder="请选择摄像头">
              <el-option v-for="item in cameraList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.secondRadio==3" v-model="shuifeiForm.BData" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="C模块">
           <el-radio-group v-model="shuifeiForm.thirdRadio" @change="thirdRadioChange">
              <el-radio label="1">环境数据</el-radio>
              <el-radio label="2">视频监控</el-radio>
              <el-radio label="3">日志</el-radio>
            </el-radio-group>
            <el-select v-if="shuifeiForm.thirdRadio==1" v-model="shuifeiForm.CData" multiple placeholder="请选择环境数据">
              <el-option v-for="item in sensorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.thirdRadio==2" v-model="shuifeiForm.CData" multiple placeholder="请选择摄像头">
              <el-option v-for="item in cameraList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-if="shuifeiForm.thirdRadio==3" v-model="shuifeiForm.CData" multiple placeholder="请选择日志">
              <el-option v-for="item in logList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
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
    <!-- 表格E -->

    <div class="manage-header">
      <el-row class="header-row" style="text-align:right">
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-row>
    </div>

    <div class="manage-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column fixed prop="name" label="名称" sortable>
        </el-table-column>
        <el-table-column
          prop="hd_device_name"
          label="主设备"
          sortable
        ></el-table-column>
        <el-table-column
          prop="device_id"
          label="主设备编号"
          sortable
        ></el-table-column>
        <el-table-column prop="productSfDevices" label="传感器" :formatter="sensorData" sortable>
        </el-table-column>
        <el-table-column
          prop="productSfDevices"
          label="摄像头"
          :formatter="sxtData"
          sortable
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleLook(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { deviceList } from '@/api/device'
import { getSxtList } from '@/api/sxt'
import { productSfList, getDetailById } from '@/api/shuifei'
export default {
  created(){
    // 获取当前基地id
    this.bs_base_id = this.$store.state.baseinfo.cur_base_id
    // 获取当前基地设备，用于form表单
    this.getDeviceList()
    // 获取当前基地摄像头，用于form表单
    this.getGetSxtList()
    // 获取当前基地水肥应用，用于table列表
    this.getProductSfList()
  },
  data() {
    return {
      // 基地id
      bs_base_id: "",

      // 表单新增还是编辑
      operateType: "add",
      // 表单显示隐藏
      isShow: false,
      // 表单默认展示第一步
		  active: 0,
      // 设备列表
      deviceListArr: "",
      // 主设备列表，第一步
      firstEquipmentList: [],
      // 采集设备列表，第一步
      pickEquipmentList: [],
      // 摄像头列表，第一步
      sxtListArr: [],
      // 存储第一步的采集设备数据，第二步
      sensorList: [],
      // 存储第一步的摄像头数据，第二步
      cameraList: [],
      // 日志模拟列表，第二步
      logList: [
        {
          id:"001",
          name: '操作日志'
        },
        {
          id:"002",
          name: '警报日志'
        }
      ],

      // 表单要再处理
      

      // 要提交的表单
      shuifeiForm: {
        name: '',
        firstEquipment: "",
        pickEquipment: [],
        sxtCheckList: [],
        firstRadio: "",
        secondRadio: "",
        thirdRadio: "",
        AData:[],
        BData:[],
        CData:[],
      },
      // form:{
      //   name: "",
      //   hd_device_id: "",
      //   productSfDevices: [],
      //   productSfModels: [],

      // },
      // 表单规则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        firstEquipment: [
          { required: true, message: '请选择主设备', trigger: 'change' }
        ],
        pickEquipment: [
          { type: 'array', required: false, message: '请选择环境数据', trigger: 'change' }
        ],
        sxtCheckList: [
          { type: 'array', required: false, message: '请选择摄像头', trigger: 'change' }
        ],
      },

      // table表格列表数据
      tableData: [
        // {
        //   id: "00001",
        //   name: "水肥01",
        //   firstEquipment: "SF02A-2110019",
        //   firstEquipmentPK: "PK01B-2110019",
        //   firstEquipmentPC: "PC01B-2110019",
        //   secondEquipment: "PK01B-2111020",
        //   sensor: "气象台、网关",
        //   camera: "摄像头01、摄像头02",
        // },
        // {
        //   id: "00002",
        //   name: "水肥02",
        //   firstEquipment: "SF02A-2110014",
        //   firstEquipmentPK: "PK01B-2110014",
        //   firstEquipmentPC: "PC01B-2110014",
        //   secondEquipment: "PK01B-2111020",
        //   sensor: "气象台、网关",
        //   camera: "摄像头02",
        // },
      ],
    };
  },
  methods: {
    // 获取所有设备
    getDeviceList(){
      const data = {
        bs_base_id: this.bs_base_id,
      }
      deviceList(data)
        .then(res => {
          if (res.code === 200) {
            this.deviceListArr = res.data.content
            // 主设备：过滤出主设备的SF与FM
            for(let i=0;i<this.deviceListArr.length;i++){
              if(this.deviceListArr[i].device_id.substr(0, 2) == ('SF' || 'FM')){
                this.firstEquipmentList.push(this.deviceListArr[i])
              }
            }
            // 采集设备：过滤出采集设备
            for(let i=0;i<this.deviceListArr.length;i++){
              if(this.deviceListArr[i].device_id.substr(0, 2) != 'SF'
                && this.deviceListArr[i].device_id.substr(0, 2) != 'SX'
                && this.deviceListArr[i].device_id.substr(0, 2) != 'GK'
                && this.deviceListArr[i].device_id.substr(0, 2) != 'PK'
                && this.deviceListArr[i].device_id.substr(0, 2) != 'PC'
                && this.deviceListArr[i].device_id.substr(0, 2) != 'FM'
                )
              {
                this.pickEquipmentList.push(this.deviceListArr[i])
              }
            }
          } else {

          }
        })
        .catch(() => {})
    },
    // 获取所有摄像头
    getGetSxtList(){
      const data = {
        bs_base_id: this.bs_base_id,
      }
      getSxtList(data)
        .then(res => {
          if (res.code === 200) {
            this.sxtListArr = res.data.content
          } else {

          }
        })
        .catch(() => {})
    },
    // 获取水肥应用列表（主列表）
    getProductSfList(){
      const data = {
        bs_base_id: this.bs_base_id,
      }
      productSfList(data)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.content
            console.log(res)
          } else {

          }
        })
        .catch(() => {})
    },
    // table列表显示传感器的值，排除掉摄像头
    sensorData(row){
      let sensorArr = [];
      row.productSfDevices.forEach((item)=>{
        if(item.hd_device_type_code != 'JK-SX'){
          sensorArr.push(item.hd_device_name);
        };
      });
      return sensorArr.join('、');
    },
    // table列表显示摄像头的值
    sxtData(row){
      let sxtArr = [];
      row.productSfDevices.forEach((item)=>{
        if(item.hd_device_type_code == 'JK-SX'){
          sxtArr.push(item.hd_device_name);
        };
      });
      return sxtArr.join('、');
    },
    //获取环境数据数组列表(根据采集设备选中的值，用于第二步)
    getSensorList(val){
      // this.envList = []
      // for(let i=0;i<=val.length-1;i++){
      //   this.pickEquipmentList.find((item)=>{
      //     if(item.id == val[i]){
      //       this.envList.push(item)
      //     }
      //   });
      // }
      this.sensorList = []
      if(val){
        for(let i=0;i<val.length;i++){
          let data = {
            hd_device_id: val[i],
          }
          getDetailById(data)
            .then(res => {
              if (res.code === 200) {
                this.sensorList.push.apply(this.sensorList, res.data.sensor);
              } else {

              }
            })
            .catch(() => {})
        }
      }
    },
    //获取视频监控数组列表(根据摄像头选中的值，用于第二步)
    getCameraList(val){
      this.cameraList = []
      for(let i=0;i<=val.length-1;i++){
        this.sxtListArr.find((item)=>{
          if(item.id == val[i]){
            this.cameraList.push(item)
          }
        });
      }
    },
    //A模块单选改变的时候
    firstRadioChange(){
      this.shuifeiForm.AData = []
    },
    //B模块单选改变的时候
    secondRadioChange(){
      this.shuifeiForm.BData = []
    },
    //C模块单选改变的时候
    thirdRadioChange(){
      this.shuifeiForm.CData = []
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
        console.log(this.shuifeiForm)
        this.isShow = false
        this.active = 0
      })
    },
    // 新增按钮
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.shuifeiForm = {
        name: '',
        firstEquipment: "",
        pickEquipment: [],
        sxtCheckList: [],
        firstRadio: "",
        secondRadio: "",
        thirdRadio: "",
        AData:[],
        BData:[],
        CData:[],
      }
    },
    // 查看按钮
    handleLook(row) {
      console.log(row);
      this.$router.push({
        path: "/bigScreen",
        query: {
          row: JSON.stringify(row),
        },
      });
    },
    // 编辑按钮
    // 删除按钮
  },
};
</script>

<style scoped>
.manage {
  line-height: normal;
  text-align: left;
}
.manage-header {
  height: 60px;
}
.header-row {
  height: 100%;
  text-align: left;
}
.manage-body {
}
::v-deep .el-dialog .el-dialog__body{
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
/* 默认当前激活步骤显示的是黑色，这里修改显示为蓝色 */
::v-deep .el-step__head.is-process {
  color: #1890ff !important; 
  border-color: #1890ff !important;
}
::v-deep .el-step__title.is-process {
  color: #1890ff !important;
}
</style>
