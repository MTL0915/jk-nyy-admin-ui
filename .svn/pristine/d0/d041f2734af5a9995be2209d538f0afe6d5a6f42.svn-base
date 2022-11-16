<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center"
      />
        <!-- sortable -->
      <el-table-column
        prop="name"
        label="设备名称"
        align="center"
      />
      <el-table-column
        prop="type"
        label="设备类型"
        align="center"
      />
      <el-table-column
        prop="sbVersion"
        label="设备版本"
        align="center"
      />
      <el-table-column
        prop="version"
        label="版本号"
        align="center"
      />
      <el-table-column
        prop="status"
        label="升级状态"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.status === 1 ? '成功':'失败'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="升级创建时间"
        align="center"
      />
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { findAllList } from '@/api/hd_device_upgrade_journal'
export default {
  data () {
    return {
      tableData: [],
      totalNum: 0,
      cur_page: 1,
      pageSize: 10

    }
  },
  created () {
    this.getFindAllList()
  },
  methods: {
    getFindAllList(){
      const _params = {
        page: this.cur_page,
        size: this.pageSize
      }
      findAllList(_params).then(res => {
        this.data = []
        if (res.code === 200) {
          this.tableData = res.data.content
          this.totalNum = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(val){
      console.log(val)
      this.cur_page = val
      this.getFindAllList()
    },
    handleSizeChange(val){
      console.log(val)
      this.pageSize = val
      this.getFindAllList()
    }
  }
}
</script>

