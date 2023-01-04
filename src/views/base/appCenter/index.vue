<template>
  <div class="manage">

    <div class="manage-header">
      <el-row class="header-row" style="text-align:right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-row>
    </div>

    <div class="manage-body">
      <el-table :data="tableData" stripe style="width: 100%">
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
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div
      class="pagination"
      style="margin-top:10px"
    >
      <el-pagination
        :current-page.sync="cur_page"
        :total="totalNum"
        background
        layout="total, sizes,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <edit ref="edit" />
    <add ref="add" />
  </div>
</template>

<script>
import { deviceList } from '@/api/device'
import { getSxtList } from '@/api/sxt'
import { productSfList, getDetailById, deleteById } from '@/api/shuifei'
import { getToken } from '@/utils/auth'
import edit from './module/edit'
import add from './module/add'
export default {
  components: { edit, add},
  created(){
    this.$nextTick(() => {
      // 获取当前基地设备，用于form表单
      this.getDeviceList()
      // 获取当前基地摄像头，用于form表单
      this.getGetSxtList()
      // 获取当前基地水肥应用，用于table列表
      this.getData()
    })
    // 获取当前基地id
    this.bs_base_id = this.$store.state.baseinfo.cur_base_id
  },
  data() {
    return {
      // 基地id
      bs_base_id: "",
      // 分页相关
      // pageSize: 10,
      // totalNum: 0,
      // cur_page: 0,
      // 表单新增还是编辑
      operateType: "add",
      // 表单显示隐藏
      isShow: false,
      // 表单默认展示第一步
		  active: 0,
      // 设备列表
      deviceListArr: "",
      // 主设备列表，第一步
      hd_device_idListArr: [],
      // 副设备列表，第一步
      vice_hd_device_idListArr: [],
      // 采集设备列表，第一步
      selectSensorListArr: [],
      // 摄像头列表，第一步
      selectSxtListArr: [],
      // 存储第一步的采集设备数据，第二步
      needSensorListArr: [],
      // 存储第一步的摄像头数据，第二步
      needSxtListArr: [],
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

      

      // 要提交的表单
      shuifeiForm: {
        name: '',
        hd_device_id: "",
        pickEquipment: [],
        pickSxt: [],
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

      // table表格列表数据
      tableData: [],
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
              if(this.deviceListArr[i].device_id.substr(0, 2) == ('SF' || 'FM' )){
                this.hd_device_idListArr.push(this.deviceListArr[i])
              }
            }
            // 副设备：过滤出副设备的SF与FM
            for(let i=0;i<this.deviceListArr.length;i++){
              if(this.deviceListArr[i].device_id.substr(0, 2) == ('GK')){
                this.vice_hd_device_idListArr.push(this.deviceListArr[i])
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
                this.selectSensorListArr.push(this.deviceListArr[i])
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
            this.selectSxtListArr = res.data.content
          } else {

          }
        })
        .catch(() => {})
    },
    // 获取水肥应用列表（主列表）
    getData(){
      const _params = {
        bs_base_id: this.bs_base_id,
        // size: this.pageSize,
        // page: this.cur_page
      }
      // if (this.is_search) {
      //   if (this.s_name) {
      //     _params.name = this.s_name
      //   }
      //   if (this.s_prod) {
      //     _params.hd_product_name = this.s_prod
      //   }
      //   if (this.s_code) {
      //     _params.function_code = this.s_code
      //   }
      // }
      productSfList(_params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content  
          this.totalNum = res.data.totalElements
          console.log(res)
        }
      })
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
        this.selectSxtListArr.find((item)=>{
          if(item.id == val[i]){
            this.needSxtListArr.push(item)
            console.log(this.needSxtListArr)
          }
        });
      }
    },

    // 新增按钮
    handleAdd () {
      this.$refs.add.show()
    },
    // 查看按钮
    handleLook(row) {
      console.log(row);
      this.$router.push({
        path: "/bigScreen",
        query: {
          bs_base_id: this.bs_base_id,
          id: row.id,
        },
      });
    },
    // 编辑按钮
    handleEdit (row) {
      console.log(row)
      this.$refs.edit.show(row)
    },
    // 删除按钮
    handleDelete (index, row) {
      this.$confirm('是否确认删除该水肥应用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        deleteById({ id: row.id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        }
        )
      })
    },
    // // 每页条数切换
    // handleSizeChange: function (pageSize) {
    //   this.pageSize = pageSize
    //   this.handleCurrentChange(this.cur_page)
    // },
    // // 分页导航
    // handleCurrentChange (val) {
    //   this.cur_page = val
    //   this.getData()
    // },
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
