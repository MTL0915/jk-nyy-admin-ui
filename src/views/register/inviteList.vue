<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="收到基地邀请"
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
        prop="org_name"
        label="单位"
      />
      <el-table-column
        prop="base_name"
        label="基地"
      />
      <el-table-column label="邀请人">
        <template slot-scope="scope">
          <div><label>{{ scope.row.inviter_user_username }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <label v-show="scope.row.inviter_user_name">({{ scope.row.inviter_user_name }})</label></div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="inviter_info"
        label="邀请信息"
      /> -->
      <el-table-column
        :show-overflow-tooltip="true"
        prop="inviter_time"
        label="创建日期"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inviter_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="agreeInvite(scope.row)"
          >同意</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="refuseInvite(scope.row)"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      background
      layout="total, sizes,prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </el-dialog>
</template>

<script>

import { mapGetters } from 'vuex'
import { inviteList, disposeInvite } from '@/api/baseInfo'
import { parseTime } from '@/utils/index'

export default {
  props: {

  },
  data() {
    return {
      sta: 0,
      data: [],
      total: 0,
      pageSize: 10,
      cur_page: 1,
      dialogVisible: false,
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {

  },
  methods: {
    parseTime,
    // 同意邀请
    agreeInvite(row) {
      this.disposeInvite(row.id, 1)
    },
    // 拒绝邀请
    refuseInvite(row) {
      this.disposeInvite(row.id, -1)
    },
    // 处理邀请接口
    disposeInvite(id, sta) {
      disposeInvite({ id: id, sta: sta }).then(res => {
        if (res.code === 200) {
          if (sta === 1) {
            this.$message.success('加入成功')
            this.flag = true
          } else if (sta === -1) {
            this.$message.success('已拒绝加入该基地')
          } else {
            this.error('状态码不存在')
          }
          // 刷新表单数据
          this.cur_page = 1
          this.inviteList(this.user.id, this.sta, this.cur_page, this.pageSize)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 邀请列表接口
    inviteList(invitee_user_id, sta, page, size) {
      inviteList({ invitee_user_id: invitee_user_id, sta: sta, page: page, size: size }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      if (this.flag) {
        window.location.href = '/dashboard'
      }
    },
    sizeChange: function(pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange(val) {
      this.cur_page = val
      this.inviteList(this.user.id, this.sta, this.cur_page, this.pageSize)
    },
    getList() {
      this.flag = false
      this.cur_page = 1
      this.pageSize = 10
      this.inviteList(this.user.id, this.sta, this.cur_page, this.pageSize)
      this.dialogVisible = true
    }
  }
}
</script>
