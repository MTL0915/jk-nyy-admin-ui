<template>
  <el-card class="manage">
    <!-- 表格S -->
    <el-dialog
      :title="operateType === 'add' ? '新增水肥机' : '更新水肥机'"
      :visible.sync="isShow"
      width="550px"
    >

      <el-form ref="form" :model="shuifeiForm" label-width="auto" :rules="rules">
        <el-form-item label="名称" prop="name" v-show="firstFormIsShow">
          <el-input v-model="shuifeiForm.name"></el-input>
        </el-form-item>
        <el-form-item label="主设备" prop="firstEquipment" v-show="firstFormIsShow">
          <el-select v-model="shuifeiForm.firstEquipment" placeholder="请选择主设备" @change="selectFirstEquipment">
            <el-option v-for="item in deviceListArr" :key="item.device_id" :label="item.device_id" :value="item.device_id"></el-option>
            <!-- <el-option label="SF02A-2110019" value="SF02A-2110019"></el-option>
            <el-option label="AB02A-0000001" value="AB02A-0000001"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="副设备" prop="secondEquipment" v-show="firstFormIsShow">
          <el-select v-model="shuifeiForm.secondEquipment" placeholder="请选择副设备" :disabled="secondEquipmentBan">
            <el-option v-for="item in deviceListArr" :key="item.device_id" :label="item.device_id" :value="item.device_id"></el-option>
            <!-- <el-option label="PK01B-2111020" value="PK01B-2111020"></el-option>
            <el-option label="PK01B-0000001" value="PK01B-0000001"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="环境数据大类" prop="envCheckList" v-show="firstFormIsShow">
          <el-checkbox-group v-model="shuifeiForm.envCheckList">
            <el-checkbox v-for="(item,index) in envAllList" :key="index" :label="item" name="envCheckList"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="摄像头" prop="sxtCheckList" v-show="firstFormIsShow">
          <el-checkbox-group v-model="shuifeiForm.sxtCheckList">
            <el-checkbox v-for="item in sxtListArr" :key="item.id" :label="item.name" name="sxtCheckList"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="A模块" v-show="secondFormIsShow">
            <el-radio v-model="shuifeiForm.firstRadio" label="1">环境数据</el-radio>
            <el-radio v-model="shuifeiForm.firstRadio" label="2">视频监控</el-radio>
            <el-radio v-model="shuifeiForm.firstRadio" label="3">操作日志</el-radio>
            <el-cascader
              v-if="shuifeiForm.firstRadio==1"
              placeholder="请选择具体环境数据"
              :options="options"
              :props="{ multiple: true }"
              clearable>
            </el-cascader>
        </el-form-item>
        <el-form-item label="B模块" v-show="secondFormIsShow">
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
        <el-form-item label="C模块" v-show="secondFormIsShow">
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
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="next" type="primary" v-show="firstFormIsShow">下一步</el-button>
        <!-- <el-button @click="prev" type="primary" v-show="secondFormIsShow">上一步</el-button> -->
        <el-button @click="submit" type="primary" v-show="secondFormIsShow">提交</el-button>
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
          prop="style"
          label="水肥系统样式"
          sortable
        ></el-table-column>
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
          label="枪机"
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
      // 设备列表
      deviceListArr: "",
      // 摄像头列表
      sxtListArr: "",
      operateType: "add",
      isShow: false,
      firstFormIsShow: true,
      secondFormIsShow: false,
      secondEquipmentBan: true,
      shuifeiForm: {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        envCheckList: [],
        sxtCheckList: [],
        firstRadio: "",
        secondRadio: "",
        thirdRadio: "",
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
        envCheckList: [
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
          style: "旁路式",
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
          style: "旁路式",
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
    getDeviceList(){
      const data = {
        bs_base_id: this.bs_base_id,
      }
      deviceList(data)
        .then(res => {
          if (res.code === 200) {
            this.deviceListArr = res.data.content
          } else {

          }
        })
        .catch(() => {})
    },
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
    // handleEdit(row) {
    //   console.log(row);
    //   this.isShow = true;
    //   this.operateType = "updata";
    //   this.firstFormIsShow = true
    //   this.secondFormIsShow = false
    //   this.shuifeiForm = {
    //     name: row.name,
    //     firstEquipment: row.firstEquipment,
    //     secondEquipment: row.secondEquipment,
    //     envCheckList: [],
    //     cameraCheckList: [],
    //     firstRadio: "",
    //     secondRadio: "",
    //     thirdRadio: "",
    //   };
    // },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.firstFormIsShow = true
      this.secondFormIsShow = false
      this.shuifeiForm = {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        envCheckList: [],
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
        this.firstFormIsShow = false
        this.secondFormIsShow = true
      })
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
