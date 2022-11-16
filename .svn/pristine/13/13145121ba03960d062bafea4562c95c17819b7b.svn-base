<template>
  <div class="card">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
    >
      <el-table-column
        prop="base_name"
        label="设备名称"
        min-width="180"
      />
      <el-table-column
        prop="device_id"
        label="设备编号"
        min-width="140"
      />
      <el-table-column
        prop="log_msg"
        label="故障原因"
        min-width="220"
      />
      <el-table-column
        prop="log_time"
        label="故障时间"
        width="160"
      />
      <el-table-column
        prop="facilities_name"
        label="地块名称"
        width="180"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleSelect(scope.row)"
          >设置</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex bottom-bar">
      <div class="bottom-text">第{{ startNum }}到{{ totalNum }}条，共{{ totalNum }}条记录。</div>
      <div class="pagination">
        <el-pagination
          :total="total"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { selectDeviceErrorLog, deleteDeviceErrorLog } from '@/api/report'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      cur_page: 1,
      pageSize: 10
    }
  },
  computed: {
    startNum() {
      if (this.tableData.length > 0) {
        return 1
      } else {
        return 0
      }
    },
    totalNum() {
      return this.tableData.length
    }
  },
  created() {
    this.cur_page = 1
    this.getData()
  },
  methods: {
    handleCurrentChange(val) {
      this.cur_page = val
    },
    getData() {
      selectDeviceErrorLog().then(res => {
        res.data.map(v => {
          v.log_time = parseTime(v.log_time)
        })
        this.tableData = res.data
        this.total = res.page.totalNum
      })
    },
    handleSelect(row) {
      
    },
    handleDelete(row) {
      deleteDeviceErrorLog({ device_error_log_id: row.log_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()

.flex
  display flex
  align-items center

.el-form >>> label
  padding 0

.el-form-item
  margin-bottom 0

.left-btn
  .el-button+.el-button
    margin-left 5px

.bottom-content
  justify-content space-between

.el-table
  font-size 14px

.table-span
  color #fff
  padding 2px 5px
  border-radius 25px

.normal
  background #1AB394

.abnormal
  background #F56C6C

.grep
  background #909399

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777
</style>
