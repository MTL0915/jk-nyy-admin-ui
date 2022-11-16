<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="添加人员"
    append-to-body
    @close="closeDialog"
  >
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%;"
    >
      <el-table-column
        prop="username"
        label="账号"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="subAdd(scope.row)"
          >添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      background
      layout="total, sizes,prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </el-dialog>
</template>

<script>
import { getBaseUserNotInFacilities } from '@/api/rs_facilities'
import { getToken } from '@/utils/auth'

export default {
  props: {

  },
  data () {
    return {
      rs_facilities_id: '',
      data: [],
      total: 0,
      pageSize: 10,
      cur_page: 1,
      dialogVisible: false
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    closeDialog () {
      this.$parent.$parent.getFacilitiesUserByFacilitiesId(this.rs_facilities_id, 1, 10)
    },
    // 添加用户
    subAdd (row) {
      var list = []
      list.push({
        bs_user_id: row.id,
        rs_facilities_id: this.rs_facilities_id,
        phone_sta: 0,
        note_sta: 0,
        facilities_sta: 0
      })
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/updateUserFacilitiesRelevance', list, config).then(res => {
        if (res.data && res.data.code === 200) {
          this.$message.success('添加成功')
          getBaseUserNotInFacilities({ rs_facilities_id: this.rs_facilities_id, page: 1, size: 10 }).then(res => {
            if (res.code === 200) {
              this.dialogVisible = true
              this.data = res.data.content
              this.total = res.data.totalElements
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      getBaseUserNotInFacilities({ rs_facilities_id: this.rs_facilities_id, page: this.cur_page, size: this.pageSize }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getList (rs_facilities_id) {
      this.rs_facilities_id = rs_facilities_id
      getBaseUserNotInFacilities({ rs_facilities_id: rs_facilities_id, page: 1, size: 10 }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = true
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
