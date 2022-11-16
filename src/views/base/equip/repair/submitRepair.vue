<template>
  <div class="repairBox">
    <div style="height: 40px;line-height:40px;padding:0 10px;text-align:right">
      <el-select
        filterable
        clearable
        size="mini"
        v-model="bs_org_id"
        placeholder="请选择组织"
        @change="orgChange"
        style="margin-right:10px"
        v-show="hd_device_id === ''"
      >
        <el-option
          v-for="item in orgList"
          :key="item.bs_org_id"
          :label="item.bs_org_name"
          :value="item.bs_org_id"
        >
        </el-option>
      </el-select>
      <el-select
        filterable
        clearable
        size="mini"
        v-model="bs_base_id"
        placeholder="请选择基地"
        @change="baseChange"
        style="margin-right:10px"
        v-show="hd_device_id === ''"
      >
        <el-option
          v-for="item in baseList"
          :key="item.bs_base_id"
          :label="item.bs_base_name"
          :value="item.bs_base_id"
        >
        </el-option>
      </el-select>
      <el-select
        filterable
        clearable
        size="mini"
        v-model="hd_device_type_id"
        placeholder="请选择设备类型"
        @change="deviceTypeChange"
        style="margin-right:10px"
        v-show="hd_device_id === ''"
      >
        <el-option
          v-for="item in deviceTypeList"
          :key="item.hd_device_type_id"
          :label="item.hd_device_type_name"
          :value="item.hd_device_type_id"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        size="mini"
        v-model="status"
        placeholder="请选择状态"
        @change="statusChange"
        style="margin-right:10px"
        v-show="hd_device_id === ''"
      >
        <el-option
          v-for="item in statusList"
          :key="item.status"
          :label="item.text"
          :value="item.status"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        size="mini"
        v-model="type"
        placeholder="请选择类型"
        @change="typeChange"
        style="margin-right:10px"
      >
        <el-option
          v-for="item in typeList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>

      <div style="display:inline-block;height:100%">
        <el-button
          type="primary"
          size="small"
          @click="add"
        >添加</el-button>
      </div>
    </div>
    <div style="height: calc(100% - 80px);overflow:auto">
      <submitRepairList
        :tableData="tableData"
        style="height:100%"
      />
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total,sizes, prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="故障申报"
      :visible.sync="dialogVisible"
      width="80%"
      append-to-body
    >
      <addRepair ref="addRepair" />
    </el-dialog>
  </div>
</template>
<script>
import submitRepairList from "./submitRepairList"
import addRepair from "./addRepair"
import { registerBaseList, getUserRepairList, orgList, baseList, deviceTypeList, getRepairList } from "@/api/equip_repair"
import { formatDate } from "@/utils/date"
export default {
  components: {
    submitRepairList,
    addRepair
  },
  data () {
    return {
      hd_device_id: "",
      bs_org_id: null,
      bs_base_id: "",
      hd_device_type_id: "",
      orgList: [],
      baseList: [],
      deviceTypeList: [],
      status: '',
      statusList: [
        {
          text: "待处理",
          status: "0"
        }, {
          text: "已处理",
          status: "1"
        }
      ],
      type: '',
      typeList: [
        {
          code: 'DeviceRepair',
          name: '设备报修'
        },
        {
          code: 'SensorFault',
          name: '传感器异常'
        },
        {
          code: 'DeviceOffline',
          name: '设备离线'
        }
      ],
      total: 0,
      page: 1,
      size: 10,
      tableData: [],
      dialogVisible: false,
      equipForm: {
        bs_base_id: "",
        bs_base_name: "",
        rs_facilities_id: "",
        rs_facilities_name: "",
        device_id: "",
        name: "",
      }
    }
  },
  mounted () {
    this.getOrgList();
    this.getBaseList();
    this.getDeviceTypeList();
  },
  methods: {
    // 新增
    add () {
      this.dialogVisible = true
      this.$nextTick(() => {
        if (this.hd_device_id !== "") {
          this.$refs.addRepair.status = 0;
          this.$refs.addRepair.edit = true;
          this.$refs.addRepair.id = "";
          this.$refs.addRepair.bs_base_id = this.equipForm.bs_base_id
          this.$refs.addRepair.baseList = [{
            id: this.equipForm.bs_base_id,
            name: this.equipForm.bs_base_name
          }];
          this.$refs.addRepair.rs_facilities_id = this.equipForm.rs_facilities_id;
          this.$refs.addRepair.areaList = [{
            id: this.equipForm.rs_facilities_id,
            name: this.equipForm.rs_facilities_name
          }];
          this.$refs.addRepair.hd_device_id = this.hd_device_id;
          this.$refs.addRepair.equipList = [{
            id: this.hd_device_id,
            device_id: this.equipForm.device_id,
            name: this.equipForm.name
          }];
          this.$refs.addRepair.images = [];
          this.$refs.addRepair.images_path = [];
          this.$refs.addRepair.des = "";
        } else {
          this.$refs.addRepair.status = 0;
          this.$refs.addRepair.edit = false;
          this.$refs.addRepair.id = "";
          this.$refs.addRepair.bs_base_id = "";
          this.$refs.addRepair.baseList = [];
          this.$refs.addRepair.rs_facilities_id = "";
          this.$refs.addRepair.areaList = [];
          this.$refs.addRepair.hd_device_id = "";
          this.$refs.addRepair.equipList = [];
          this.$refs.addRepair.images = [];
          this.$refs.addRepair.images_path = [];
          this.$refs.addRepair.des = "";
          this.$refs.addRepair.getBaseList()
        }

      })
    },
    //类型过滤
    typeChange (e) {
      this.type = e
      this.page = 1;
      this.getRepairListInfo();
    },
    // 选择状态过滤
    statusChange (e) {
      this.status = e;
      this.page = 1;
      this.getRepairListInfo();
    },
    //选择组织过滤
    orgChange (e) {
      this.bs_org_id = e;
      this.page = 1;
      this.getRepairListInfo();
    },
    // 选择基地过滤
    baseChange (e) {
      this.bs_base_id = e;
      this.page = 1;
      this.getRepairListInfo();
    },
    //选择设备类型过滤
    deviceTypeChange (e) {
      this.hd_device_type_id = e
      this.page = 1;
      this.getRepairListInfo();
    },
    // 每页显示条数
    sizeChange (e) {
      this.page = 1
      this.size = e
      this.getRepairListInfo()
    },
    // 翻页
    currentChange (e) {
      this.page = e
      this.getRepairListInfo()
    },
    // 获取故障设备组织
    getOrgList () {
      orgList().then(res => {
        if (res.code === 200) {
          this.orgList = res.data;
          this.getRepairListInfo()
        }
      })
    },
    // 获取故障设备基地
    getBaseList () {
      //registerBaseList
      baseList().then(res => {
        if (res.code === 200) {
          this.baseList = res.data;
          this.getRepairListInfo()
        }
      })
    },
    // 获取故障设备的设备类型
    getDeviceTypeList () {
      deviceTypeList().then(res => {
        if (res.code === 200) {
          this.deviceTypeList = res.data;
          this.getRepairListInfo()
        }
      })
    },
    // 获取故障设备报修记录
    getRepairListInfo () {
      console.log(this.equipForm);
      const data = {
        page: this.page - 1,
        size: this.size
      }
      if (this.bs_org_id !== null) {
        data.bs_org_id = this.bs_org_id
      }
      if (this.bs_base_id !== "") {
        data.bs_base_id = this.bs_base_id
      }
      if (this.hd_device_type_id !== "") {
        data.hd_device_type_id = this.hd_device_type_id
      }
      if (this.status !== "") {
        data.status = this.status
      }
      if (this.hd_device_id !== "") {
        data.hd_device_id = this.hd_device_id
      }
      if (this.type) {
        data.type = this.type
      }
      //getUserRepairList
      getRepairList(data).then(res => {
        if (res.code === 200) {
          res.data.content.map(item => {
            item.time = formatDate(new Date(item.register_time), "yyyy-MM-dd")
          })
          this.tableData = res.data.content;
          this.total = res.data.totalElements;
        }
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
.repairBox
  width 100%
  height calc(100% - 44px)
  background #fff
  // display flex
  // flex-direction column

.pagination
  height 40px
  line-height 40px
</style>