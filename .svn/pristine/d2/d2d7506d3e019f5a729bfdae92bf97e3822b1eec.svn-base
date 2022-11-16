<template>
  <div class="main-panel">
    <div class="head-container">
      <div style="text-align:right;margin-right:10px">
        <el-input
          v-model="keyword"
          clearable
          placeholder="输入关键字搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="pageChange(1)"
        />
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="pageChange(1)"
        >搜索</el-button>
      </div>
    </div>
    <el-card shadow="never">
      <div>
        <!--表格渲染-->
        <el-table
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
          <el-table-column
            prop="phone"
            label="电话"
          />
          <el-table-column
            prop="email"
            label="邮箱"
          />
          <!-- <el-table-column
            label="状态"
            align="center"
            width="60px"
          >
            <template slot-scope="scope">
              <div
                v-for="item in dicts"
                :key="item.id"
              >
                <el-tag
                  v-if="scope.row.enabled.toString() === item.value"
                  :type="scope.row.enabled ? '' : 'info'"
                >{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="创建日期"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="checkPermission(['ADMIN'])"
            label="操作"
            width="200px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                title="编辑用户"
                size="mini"
                type="primary"
                style="margin-left:0px"
                icon="el-icon-edit"
                @click="edit(scope.row.id)"
              />

              <!-- 重置密码 -->
              <el-popover
                :ref="'resetPass'+scope.row.id"
                placement="top"
                width="180"
              >
                <p>确定为该用户重置密码吗?</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs['resetPass'+scope.row.id].doClose()"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="subResetPass(scope.row.id)"
                  >确定</el-button>
                </div>
                <el-button
                  title="重置密码"
                  v-if="$store.state.baseinfo.cur_user_level <= 2"
                  slot="reference"
                  type="warning"
                  icon="el-icon-refresh"
                  size="mini"
                />
              </el-popover>

              <!-- 删除 -->
              <el-popover
                v-permission="['ADMIN','USER_ALL','USER_DELETE']"
                :ref="scope.row.id"
                placement="top"
                width="180"
              >
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs[scope.row.id].doClose()"
                  >取消</el-button>
                  <el-button
                    :loading="delLoading"
                    type="primary"
                    size="mini"
                    @click="subDelete(scope.row.id)"
                  >确定</el-button>
                </div>
                <el-button
                  title="删除用户"
                  v-if="scope.row.inOrg !== 0 && scope.row.id != sup_this.user.id"
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popover>
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
        <eForm
          ref="form"
          :sup_this="sup_this"
          :dicts="dicts"
          :is-add="false"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initDict from '@/mixins/initDict'
import { mapGetters } from 'vuex'
import { del, getById, nuserList, resetPassByAdmin } from '@/api/user'
import { getShareBaseByUserId, getUserNoJoinBase } from '@/api/baseInfo'
// import { getDepts } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import eForm from './module/form'
import { treeOrgRootNode, treeChildOrgAndBase } from '@/api/org'
export default {
  components: { eHeader, eForm },
  mixins: [initDict],
  data () {
    return {
      total: 0,
      size: 10,
      page: 1,
      height: document.documentElement.clientHeight - 180 + 'px;',
      delLoading: false,
      sup_this: this,
      data: [],
      deptName: '',
      deptId: null,
      baseId: null,
      keyword: '',
      userLevel: 999
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created () {
    // this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('user_status')
    })
  },
  mounted: function () {
    const that = this
    window.onresize = function temp () {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    parseTime,
    checkPermission,
    sizeChange: function (size) { // 每页条数切换
      this.size = size
      this.pageChange(this.page)
    },
    // 翻页
    pageChange (val) {
      this.page = val
      this.init()
    },
    init () {
      nuserList({ keyword: this.keyword, page: this.page, size: this.size }).then(res => {
        if (res.code === 200) {
          this.total = res.data.totalElements
          this.data = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    subResetPass (id) {
      resetPassByAdmin({ bs_user_id: id }).then(res => {
        if (res.code === 200) {
          this.$notify.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
        this.$refs['resetPass' + id].doClose()
      })
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        } else {
          this.$message.error(res.msg)
        }
        this.delLoading = false
        this.$refs[id].doClose()
        //this.dleChangePage()
        this.init()
      })
    },
    edit (id) {
      getById({ id: id }).then(res => {
        if (res.code == 200) {
          const _this = this.$refs.form
          _this.form.isShare = false
          _this.form.id = res.data.id
          _this.form.name = res.data.name
          _this.form.username = res.data.username
          _this.form.phone = res.data.phone
          _this.form.email = res.data.email
          _this.form.dept = null
          _this.dialog = true
          if (this.$store.state.baseinfo.cur_user_level === 1) {
            getUserNoJoinBase({ bs_user_id: id, page: 0, size: 10 }).then(res => {
              if (res.code === 200) {
                _this.noJoinForm.list = res.data.content
                _this.noJoinForm.total = res.data.totalElements
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.main-panel {
  height: calc(100% - 100px);
  background: #ffffff;
}
.el-card__body {
  padding: 0px;
}
</style>
