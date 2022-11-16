<template>
  <div class="repairBox">
    <div style="height: 40px;line-height:40px;padding:0 10px;text-align:right">
      <el-select
        filterable
        clearable
        size="mini"
        v-model="bs_base_id"
        placeholder="请选择基地"
        @change="baseChange"
        style="margin-right:10px"
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
        v-model="register_id"
        placeholder="请选择登记人"
        @change="userChange"
        style="margin-right:10px"
      >
        <el-option
          v-for="item in userList"
          :key="item.register_id"
          :label="item.register_name"
          :value="item.register_id"
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
      >
        <el-option
          v-for="item in statusList"
          :key="item.status"
          :label="item.text"
          :value="item.status"
        >
        </el-option>
      </el-select>
    </div>
    <div style="height: calc(100% - 80px);overflow:auto">
      <checkRepairList
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
  </div>
</template>
<script>
import checkRepairList from "./checkRepairList"
import { getRepairList, baseList, registerList } from "@/api/equip_repair"
import { formatDate } from "@/utils/date"
export default {
  components: {
    checkRepairList
  },
  data () {
    return {
      bs_base_id: "",
      baseList: [],
      register_id: "",
      userList: [],
      status: "",
      statusList: [
        {
          text: "待处理",
          status: "0"
        }, {
          text: "已处理",
          status: "1"
        }
      ],
      total: 0,
      page: 1,
      size: 10,
      tableData: []
    }
  },
  mounted () {
    this.getBaseList();
    this.getRegisterList();
  },
  methods: {
    // 选择状态过滤
    statusChange (e) {
      this.status = e;
      this.page = 1;
      this.getRepairListInfo();
    },
    // 选择登记人过滤
    userChange (e) {
      this.register_id = e;
      this.page = 1;
      this.getRepairListInfo();
    },
    // 选择基地过滤
    baseChange (e) {
      this.bs_base_id = e;
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
    // 获取故障设备基地
    getBaseList () {
      baseList().then(res => {
        if (res.code === 200) {
          this.baseList = res.data;
          this.getRepairListInfo()
        }
      })
    },
    // 获取故障设备登记人员列表
    getRegisterList () {
      registerList().then(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.userList = res.data
        }
      })
    },
    // 获取故障设备列表
    getRepairListInfo () {
      const data = {
        page: this.page - 1,
        size: this.size
      }
      if (this.bs_base_id !== "") {
        data.bs_base_id = this.bs_base_id
      }
      if (this.status !== "") {
        data.status = this.status
      }
      if (this.register_id !== "") {
        data.register_id = this.register_id
      }
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