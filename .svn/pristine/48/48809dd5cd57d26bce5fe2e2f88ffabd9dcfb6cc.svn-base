<template>
  <el-dialog
    v-if="dialog"
    :visible.sync="dialog"
    append-to-body
    title="传感器数据"
    width="800px"
  >
    <div class="head-container">
      <div style="display: inline-block;float:left">
        <!-- 导出 -->
        <!-- <el-button
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="warning"
          icon="el-icon-download"
          @click="download"
        >导出</el-button> -->
      </div>
      <div style="text-align:right;margin-right:10px">
        <el-date-picker
          v-model="timeValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="timeChange()"
        />
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <template v-for="(col,index) in header">
        <el-table-column
          :key="index"
          :prop="col.prop"
          :label="col.label"
          align="center"
          min-width="170"
        />
      </template>
    </el-table>
    <div class="bottom-bar">
      <div class="pagination">
        <el-pagination
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getWsenDataByHd_device_id } from '@/api/equip'
export default {
  name: 'CollectedData',
  props: {
    activeName: {
      type: String,
      default: ''
    },
    hd_device_id: {
      type: String,
      default: ''
    },
    hd_device_name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      downloadLoading: false,
      timeValue: null,
      start_time: null,
      end_time: null,
      pageSize: 10,
      cur_page: 1,
      total: 0,
      header: [],
      tableData: [],
      dialog: false
    }
  },
  watch: {
    // activeName (val) {
    //   if (val === 'second') {
    //     this.cur_page = 1
    //     this.getData()
    //   }
    // }
  },
  methods: {
    // 导出
    download () {
      getWsenDataByHd_device_id({ hd_device_id: this.hd_device_id, startPosition: 0, maxResult: this.total, start_time: this.start_time, end_time: this.end_time }).then(res => {
        if (res.code === 200) {
          this.total = res.data.count
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = []
            const filterVal = []
            res.data.head.forEach(element => {
              tHeader.push(element.label)
              filterVal.push(element.prop)
            })
            const data = this.formatJson(filterVal, res.data.data)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.hd_device_name + '传感器数据'
            })
            this.downloadLoading = false
          })
        }
      })
    },
    // 数据转换
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    timeChange () {
      this.start_time = null
      this.end_time = null
      if (this.timeValue) {
        this.start_time = this.timeValue[0]
      }
      if (this.timeValue) {
        this.end_time = this.timeValue[1]
      }
      this.cur_page = 1
      this.getWsenDataByHd_device_id(this.hd_device_id, null, (this.cur_page - 1) * this.pageSize, this.pageSize, this.start_time, this.end_time)
    },
    showDialog (id, name) {
      this.dialog = true
      if (id) { this.hd_device_id = id }
      if (name) { this.hd_device_name = name }
      this.getData()
    },
    getData () {
      this.cur_page = 1
      this.getWsenDataByHd_device_id(this.hd_device_id, null, (this.cur_page - 1) * this.pageSize, this.pageSize, null, null)
    },
    // 获取列表数据接口
    getWsenDataByHd_device_id (hd_device_id, device_id, startPosition, maxResult, start_time, end_time) {
      getWsenDataByHd_device_id({ hd_device_id: hd_device_id, device_id: device_id, startPosition: startPosition, maxResult: maxResult, start_time: start_time, end_time: end_time }).then(res => {
        if (res.code === 200) {
          this.header = res.data.head
          this.tableData = res.data.data
          this.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 翻页
    handleCurrentChange (val) {
      this.cur_page = val
      this.getWsenDataByHd_device_id(this.hd_device_id, null, (this.cur_page - 1) * this.pageSize, this.pageSize, this.start_time, this.end_time)
    }
  }
}
</script>


