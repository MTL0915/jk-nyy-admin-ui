<template>
  <div class="alarmBox">
    <div class="menus">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="add">创建告警规则</el-button>
      <el-button size="small" type="success" @click="openAndStop('open')">启用</el-button>
      <el-button size="small" type="warning" @click="openAndStop('stop')">停用</el-button>
      <el-button size="small" type="danger" icon="el-icon-close" @click="del">删除</el-button>
      <div style="float:right;display:flex">
        <el-select v-model="rs_facilities_id" size="small" clearable placeholder="请选择地块" style="flex:1;" @change="areaChange">
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input placeholder="输入关键字" v-model="keyWord" size="small" style="flex:1;margin:0 10px" clearable @clear="search" />
        <el-button type="success" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <listTable :strategyList="strategyList" ref="listTable" />
    </div>
    <div style="height:52px;padding:10px">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="page.totalNum"
        :page-sizes="[10,20,30]"
        :current-page="page.page"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import listTable from "./modules/table"
import { find } from '@/api/strategy'
import { findByBs_base_id } from '@/api/rs_facilities'
import { batchUpdateStatus, batchDeleteById } from '@/api/hd_device_strategy'
import bus from '@/components/common/bus'
export default {
  components: {
    listTable
  },
  data() {
    return {
      rs_facilities_id: "", // 地块id
      areaList: [], // 地块列表
      keyWord: "",
      strategyList: [], //策略列表
      page: {
        size: 10,
        page: 1,
        totalNum: 0
      }
    }
  },
  created() {
    bus.$on("strategySave", () => {
      this.page.page = 1
      this.page.size = 10
      this.keyWord = ""
      this.getData()
    })
  },
  mounted() {
    this.getAreaList()
    this.getData()
  },
  methods: {
    // 启用 、停用
    openAndStop(type) {
      const checkList = this.$refs.listTable.checkList
      const arr = []
      if (checkList.length === 0) {
        if (type === "open") {
          this.$message({
            message: "请选择需要启用的策略！",
            type: "warning"
          })
        } else {
          this.$message({
            message: "请选择需要停用的策略！",
            type: "warning"
          })
        }
        return
      }
      for (let i = 0; i < checkList.length; i++) {
        arr.push(checkList[i].id)
      }
      const data = {
        ids: arr.join(",")
      }
      let tip = ""
      if (type === "open") {
        data.status = 1
        tip = "启用"
      } else {
        data.status = 0
        tip = "停用"
      }
      this.$confirm(`您确定${tip}选中的策略?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        batchUpdateStatus(data).then(res => {
          if (res.code === 200) {
            for (let i = 0; i < checkList.length; i++) {
              if (type === "open") {
                checkList[i].status = 1
              } else {
                checkList[i].status = 0
              }
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 删除
    del() {
      const checkList = this.$refs.listTable.checkList
      const arr = []
      if (checkList.length === 0) {
        this.$message({
          message: "请选择需要删除的策略！",
          type: "warning"
        })
        return
      }
      for (let i = 0; i < checkList.length; i++) {
        arr.push(checkList[i].id)
      }
      this.$confirm(`是否删除选中的策略?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        batchDeleteById({ids: arr.join(",")}).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "删除成功！",
              type: "success"
            })
            this.keyWord = ""
            this.search()
          }
        })
      })
    },
    // 搜索
    search() {
      this.areaChange()
    },
    // 地块过滤
    areaChange() {
      this.page.page = 1
      this.page.size = 10
      this.getData()
    },
    add() {
      this.$router.push("/addAlarm")
    },
    // 分页
    currentChange(e) {
      this.page.page = e
      this.getData()
    },
    sizeChange(e) {
      this.page.page = 1
      this.page.size = e
      this.getData()
    },
    // 地块列表
    getAreaList() {
      findByBs_base_id({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.areaList = res.data
        }
      })
    },
    // 策略列表
    getData() {
      let queryCondition = {}
      queryCondition.rs_facilities_id = this.rs_facilities_id
      queryCondition.keyword = this.keyWord
      queryCondition.page = this.page.page
      queryCondition.size = this.page.size
      queryCondition.strategy_types = "AlarmInform"
      queryCondition.bs_base_id = this.$store.state.baseinfo.cur_base_id;

      find(queryCondition).then(res => {
        this.strategyList = res.data.content
        this.page.totalNum = res.data.totalElements
      })
    },
  },
  beforeDestroy() {
    bus.$off("strategySave")
  }
}
</script>
<style lang="stylus" scoped>
.alarmBox
  height calc(100% - 45px)
  background  #fff
.menus
  padding 10px
  height 53px
.table
  height calc(100% - 106px)
  overflow auto
</style>