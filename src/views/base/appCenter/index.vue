<template>
  <el-card class="manage">
    <!-- 表格S -->
    <el-dialog
      :title="operateType === 'add' ? '新增水肥机' : '更新水肥机'"
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
              <el-option v-for="item in firstEquipmentList" :key="item.device_id" :label="item.name + ' ' + item.device_id" :value="item.device_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="副设备" prop="secondEquipment">
            <el-select v-model="shuifeiForm.secondEquipment" placeholder="请选择副设备" :disabled="secondEquipmentBan">
              <el-option v-for="item in deviceListArr" :key="item.device_id" :label="item.name" :value="item.device_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采集设备" prop="pickEquipment">
            <el-select v-model="shuifeiForm.pickEquipment" multiple placeholder="请选择采集设备">
              <el-option v-for="item in pickEquipmentList" :key="item.device_id" :label="item.name" :value="item.device_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="摄像头" prop="sxtCheckList">
            <!-- <el-checkbox-group v-model="shuifeiForm.sxtCheckList">
              <el-checkbox v-for="item in sxtListArr" :key="item.id" :label="item.name" name="sxtCheckList"></el-checkbox>
            </el-checkbox-group> -->
            <el-select v-model="shuifeiForm.sxtCheckList" multiple placeholder="请选择摄像头">
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
              <el-radio v-model="shuifeiForm.firstRadio" label="1">环境数据</el-radio>
              <el-radio v-model="shuifeiForm.firstRadio" label="2">视频监控</el-radio>
              <el-radio v-model="shuifeiForm.firstRadio" label="3">操作日志</el-radio>
              <!-- <el-cascader
                v-if="shuifeiForm.firstRadio==1"
                placeholder="请选择具体环境数据"
                :options="options"
                :props="{ multiple: true }"
                clearable>
              </el-cascader> -->
              <el-select v-if="shuifeiForm.firstRadio==1" v-model="shuifeiForm.AData" multiple placeholder="请选择环境数据">
                <el-option v-for="item in pickEquipmentList" :key="item.device_id" :label="item.name" :value="item.device_id"></el-option>
              </el-select>
              <el-select v-if="shuifeiForm.firstRadio==2" v-model="shuifeiForm.AData" multiple placeholder="请选择摄像头">
                <el-option v-for="item in pickEquipmentList" :key="item.device_id" :label="item.name" :value="item.device_id"></el-option>
              </el-select>
              <el-select v-if="shuifeiForm.firstRadio==3" v-model="shuifeiForm.AData" multiple placeholder="请选择日志">
                <el-option v-for="item in pickEquipmentList" :key="item.device_id" :label="item.name" :value="item.device_id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="B模块">
              <el-radio v-model="shuifeiForm.secondRadio" label="1">环境数据</el-radio>
              <el-radio v-model="shuifeiForm.secondRadio" label="2">视频监控</el-radio>
              <el-radio v-model="shuifeiForm.secondRadio" label="3">操作日志</el-radio>
              <el-cascader
                v-if="shuifeiForm.secondRadio==1"
                placeholder="请选择具体环境数据"
                :options="options"
                :props="{ multiple: true }"
                clearable>
              </el-cascader>
          </el-form-item>
          <el-form-item label="C模块">
              <el-radio v-model="shuifeiForm.thirdRadio" label="1">环境数据</el-radio>
              <el-radio v-model="shuifeiForm.thirdRadio" label="2">视频监控</el-radio>
              <el-radio v-model="shuifeiForm.thirdRadio" label="3">操作日志</el-radio>
              <el-cascader
                v-if="shuifeiForm.thirdRadio==1"
                placeholder="请选择具体环境数据"
                :options="options"
                :props="{ multiple: true }"
                clearable>
              </el-cascader>
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
      <el-row class="header-row">
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-row>
    </div>

    <div class="manage-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column fixed prop="name" label="名称" sortable>
        </el-table-column>
        <el-table-column
          prop="firstEquipment"
          label="主设备"
          sortable
        ></el-table-column>
        <el-table-column
          prop="secondEquipment"
          label="副设备"
          sortable
        >
        </el-table-column>
        <el-table-column prop="sensor" label="传感器" sortable>
        </el-table-column>
        <el-table-column
          prop="camera"
          label="摄像头"
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
export default {
  created(){
    // 获取当前基地id
    this.bs_base_id = this.$store.state.baseinfo.cur_base_id
    // 获取当前基地设备，用于主设备与副设备
    this.getDeviceList()
    // 获取当前基地摄像头
    this.getGetSxtList()
  },
  data() {
    return {
      // 基地id
      bs_base_id: "",
      // 默认第一步
		  active: 0,
      // 设备列表
      deviceListArr: "",
      // 主设备列表
      firstEquipmentList: [],
      // 采集设备列表
      pickEquipmentList: [],
      // 摄像头列表
      sxtListArr: "",
      // 存储第一步的采集设备数据，为第二步使用
      
      operateType: "add",
      isShow: false,
      secondEquipmentBan: true,
      shuifeiForm: {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        pickEquipment: [],
        sxtCheckList: [],
        firstRadio: "",
        secondRadio: "",
        thirdRadio: "",
        AData:[],
        BData:[],
        CData:[],
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        firstEquipment: [
          { required: true, message: '请选择主设备', trigger: 'change' }
        ],
        secondEquipment: [
          { required: false, message: '请选择副设备', trigger: 'change' }
        ],
        pickEquipment: [
          { type: 'array', required: false, message: '请选择环境数据', trigger: 'change' }
        ],
        sxtCheckList: [
          { type: 'array', required: false, message: '请选择摄像头', trigger: 'change' }
        ],
      },
      // 环境数据
      envAllList: ['气象台','网关'],
      // 级联选择框数据
      options: [
        {
          value: 'qixiangzhan',
          label: '气象站',
          children: [{
            value: 'xuliang',
            label: '雨量'
          }, {
            value: 'daqiwendu',
            label: '大气温度'
          }, {
            value: 'fengxiang',
            label: '风向'
          }]
        },
        {
          value: 'shangqing',
          label: '网关',
          children: [{
            value: 'ph',
            label: 'ph值'
          }, {
            value: 'EC',
            label: 'EC值'
          }, {
            value: 'shuiya',
            label: '水压'
          }]
        },
      ],
      // 表格列表数据
      tableData: [
        {
          id: "00001",
          name: "水肥01",
          firstEquipment: "SF02A-2110019",
          firstEquipmentPK: "PK01B-2110019",
          firstEquipmentPC: "PC01B-2110019",
          secondEquipment: "PK01B-2111020",
          sensor: "气象台、网关",
          camera: "摄像头01、摄像头02",
        },
        {
          id: "00002",
          name: "水肥02",
          firstEquipment: "SF02A-2110014",
          firstEquipmentPK: "PK01B-2110014",
          firstEquipmentPC: "PC01B-2110014",
          secondEquipment: "PK01B-2111020",
          sensor: "气象台、网关",
          camera: "摄像头02",
        },
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
            console.log(this.deviceListArr)
            // 过滤出主设备的SF与FM
            for(let i=0;i<this.deviceListArr.length;i++){
              if(this.deviceListArr[i].device_id.substr(0, 2) == ('SF' || 'FM')){
                this.firstEquipmentList.push(this.deviceListArr[i])
              }
            }
            // 过滤出采集设备
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
    // 选择了主设备后，判断是否能选择副设备
    selectFirstEquipment(){
      console.log(this.shuifeiForm.firstEquipment)
      if(this.shuifeiForm.firstEquipment.substr(0, 2) == 'SF'){
        this.secondEquipmentBan = false
      }else{
        this.shuifeiForm.secondEquipment = ""
        this.secondEquipmentBan = true
      }
    },
    handleLook(row) {
      console.log(row);
      this.$router.push({
        path: "/bigScreen",
        query: {
          row: JSON.stringify(row),
        },
      });
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.shuifeiForm = {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        pickEquipment: [],
        sxtCheckList: [],
        firstRadio: "",
        secondRadio: "",
        thirdRadio: "",
      }
    },
    next() {
      console.log('next!');
      this.$refs.form.validate().then(valdid => {
        if (!valdid) {
          return
        }
        this.active = 1
      })
    },
    prev() {
      this.active = 0
    },
    submit() {
      console.log('submit!');
      this.$refs.form.validate().then(valdid => {
        if (!valdid) {
          return
        }
        console.log(this.shuifeiForm)
        this.isShow = false
      })
    },
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
