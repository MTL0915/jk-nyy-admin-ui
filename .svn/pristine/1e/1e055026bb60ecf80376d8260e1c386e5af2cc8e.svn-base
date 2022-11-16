<template>
  <div class="main-panel">
    <eHeader
      :query="query"
      :sup_this="sup_this"
      :dicts="dicts"
      :orgid="orgid"
    />
    <el-card shadow="never">
      <!-- <div style="float:left;width:200px">
        <el-tree
          ref="tree"
          :expand-on-click-node="true"
          :props="defaultProps"
          :load="loadNode"
          :render-content="renderContent"
          highlight-current
          accordion
          lazy
          @node-click="handleNodeClick" />

      </div>
      <div style="float:left;width:calc(100% - 200px)"> -->
      <div>
        <!--表格渲染-->
        <el-table
          v-loading="loading"
          :data="data"
          size="small"
          style="width: 100%;"
        >
          <el-table-column
            prop="username"
            label="账号"
          >

            <template slot-scope="scope">
              {{scope.row.username}}
              <el-tag
                v-if="scope.row.bs_org_code === 'jk-000'"
                type="primary"
              >实施人员</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="phone"
            label="电话"
          />
          <!-- <el-table-column
            :show-overflow-tooltip="true"
            prop="email"
            label="邮箱"
          /> -->
          <el-table-column label="单位">
            <template slot-scope="scope">
              <div v-if="scope.row.bs_org_id"><label>{{ scope.row.bs_org_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ '('+scope.row.bs_org_code+')' }}</label></div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="角色名称">
            <template slot-scope="scope">
              <div><label>{{ scope.row.role_name }}</label></div>
            </template>
          </el-table-column> -->
          <el-table-column
            v-if="query.bs_org_id"
            label="用户身份"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="query.bs_org_id">
                <el-tag
                  v-if="checkInOrg(scope,query)"
                  type="success"
                >组织成员</el-tag>
                <el-tag
                  v-else
                  type="warning"
                >分享成员</el-tag>
              </div>
            </template>
          </el-table-column>
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
          <!-- <el-table-column
            :show-overflow-tooltip="true"
            prop="createTime"
            label="创建日期"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT','USER_DELETE'])"
            label="操作"
            width="300px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                title="编辑用户"
                v-permission="['ADMIN','USER_ALL','USER_EDIT']"
                size="mini"
                type="primary"
                style="margin-left:0px"
                icon="el-icon-edit"
                @click="edit(scope.row,scope.row.bs_org_id !== query.bs_org_id,scope.row.bs_org_name)"
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
                  :disabled="!checkClick(scope.row)"
                  slot="reference"
                  type="info"
                  icon="el-icon-refresh"
                  size="mini"
                />
              </el-popover>

              <!-- 移出组织 -->
              <el-popover
                :ref="'removeOrg'+scope.row.id"
                placement="top"
                width="180"
              >
                <p>确定将该成员移出组织吗?</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs['removeOrg'+scope.row.id].doClose()"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="subRemoveOrg(scope.row.id)"
                  >确定</el-button>
                </div>
                <el-button
                  title="移出组织"
                  :disabled="!checkClickRemove(scope.row)"
                  slot="reference"
                  type="warning"
                  icon="el-icon-close"
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
                <p>确定删除该用户？</p>
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
                  :disabled="!checkClick(scope.row)"
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <eForm
          ref="form"
          :sup_this="sup_this"
          :dicts="dicts"
          :is-add="false"
        />
        <!--分页组件-->
        <el-pagination
          :total="total"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { mapGetters } from 'vuex'
import { del, getById, removeUserBase, removeUserOrg, resetPassByAdmin } from '@/api/user'
import { getShareBaseByUserId, getUserNoJoinBase } from '@/api/baseInfo'
// import { getDepts } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import eForm from './module/form'
import { treeOrgRootNode, treeChildOrgAndBase } from '@/api/org'
export default {
  components: { eHeader, eForm },
  mixins: [initData, initDict],
  data () {
    return {
      pageSize: 10,
      cur_page: 1,
      height: document.documentElement.clientHeight - 180 + 'px;',
      delLoading: false,
      sup_this: this,
      deptName: '',
      // depts: [],
      deptId: null,
      baseId: null,
      userLevel: 999,
      // defaultProps: {
      //   children: 'children',
      //   label: 'name',
      //   isLeaf: 'leaf'
      // }
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
  props: {
    orgid: {
      type: Number,
      default: null
    }
  },
  mounted: function () {
    const that = this
    window.onresize = function temp () {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    checkClickRemove (row) {//移出组织
      let userLevel = this.$store.state.baseinfo.cur_user_level
      if (userLevel === 1 || userLevel === 2) {//管理员
        return true
      }
      if (this.user.orgCode === 'jk-000') {//实施人员
        if (row.bs_org_code === 'jk') {//实施人员不能移出系统级用户
          return false
        }
        return true
      }
      return false
    },
    checkClick (row) {//1重置密码  2删除用户
      // :disabled="!(scope.row.id != sup_this.user.id && (typeof(scope.row.inOrg) == 'undefined' || scope.row.inOrg))"
      if (row.id === this.user.id) {//不能删除自己
        return false
      }
      if (this.query && this.query.bs_org_id) {
        if (row.bs_org_id !== this.query.bs_org_id) {
          return false
        }
      }
      let userLevel = this.$store.state.baseinfo.cur_user_level
      if (userLevel === 1 || userLevel === 2) {//管理员
        return true
      }
      if (this.user.orgCode === 'jk-000') {//实施人员
        if (row.bs_org_code === 'jk') {//实施人员不能删除系统级用户
          return false
        }
        return true
      }
      return false
    },
    checkInOrg (scope, query) {
      if (scope.row.bs_org_id === query.bs_org_id) {
        scope.row.inOrg = true
        return true
      } else {
        scope.row.inOrg = false
        return false
      }
    },
    // renderContent(h, {
    //   node,
    //   data,
    //   store
    // }) {
    //   console.log('ddd', {
    //     node,
    //     data,
    //     store
    //   })
    //   return (
    //     <span>
    //       <i class={data.icon}></i>
    //       <span>{node.label}</span>
    //     </span>
    //   )
    // },

    parseTime,
    checkPermission,
    removeUserOrg (row) {
      const _this = this
      removeUserOrg({ bs_org_id: row.role_bs_org_id, bs_user_id: row.id }).then(res => {
        if (res.code === 200) {
          _this.$message.success(res.msg)
          _this.init()
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    removeUserBase (row) {
      const _this = this
      removeUserBase({ bs_base_id: row.role_bs_base_id, bs_user_id: row.id }).then(res => {
        if (res.code === 200) {
          _this.$message.success(res.msg)
          _this.init()
        } else {
          _this.$message.error(res.msg)
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
      this.init()
    },
    beforeInit () {

      const query = this.query
      if (this.orgid) { query.bs_org_id = this.orgid }
      this.params = {
        org_id: query.bs_org_id,
        base_id: query.bs_base_id,
        keyword: query.value,
        page: this.cur_page,
        size: this.pageSize
      }
      const enabled = query.enabled
      // if (type && value) { this.params[type] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      this.url = 'api/userList'
      return true
    },
    // 移出组织
    subRemoveOrg (id) {
      removeUserOrg({ bs_user_id: id, bs_org_id: this.orgid || this.query.bs_org_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置密码
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
    // 删除用户
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
    // 编辑用户
    edit (data, isShare, deptName) {
      this.$nextTick(() => {
        if (!this.query.bs_org_id) {
          isShare = false
        }
        getById({ id: data.id }).then(res => {
          const _this = this.$refs.form
          _this.activeName = 'baseInfo'
          var filtration = data.bs_org_id
          _this.form.updateRoleByDeptId = null
          if (this.query.bs_org_id) {
            filtration = this.query.bs_org_id
          }
          var manage = 'B'
          var tArray = []
          res.data.roles.forEach(function (data, index) {

            if (data.bs_org.id === filtration && (data.level === 1 || data.level === 2)) {
              manage = 'A'
            } else {
              if (data.bs_base != null && data.bs_base.bs_org.id === filtration) {
                tArray[index] = [data.bs_base.id, data.id]
              }
            }
          })
          _this.getBaseRole(filtration)
          _this.form = { isShare: isShare, deptName: deptName, updateRoleByDeptId: this.deptId || this.orgid, id: res.data.id, name: res.data.name, username: res.data.username, phone: res.data.phone, email: res.data.email, enabled: res.data.enabled.toString(), roles: [], dept: res.data.dept.id, orgManage: manage, baseRole: tArray }
          _this.shareForm.total = 0
          if (!isShare) {
            getShareBaseByUserId({ bs_user_id: data.id, page: 0, size: 10 }).then(res => {
              _this.shareForm.list = res.data.content
              _this.shareForm.total = res.data.totalElements
            })
          } else {
            getShareBaseByUserId({ bs_user_id: data.id, bs_org_id: this.query.bs_org_id, page: 0, size: 10 }).then(res => {
              _this.shareForm.list = res.data.content
              _this.shareForm.total = res.data.totalElements
            })
          }
          if (this.$store.state.baseinfo.cur_user_level === 1) {
            getUserNoJoinBase({ bs_user_id: data.id, page: 0, size: 10 }).then(res => {
              if (res.code === 200) {
                _this.noJoinForm.list = res.data.content
                _this.noJoinForm.total = res.data.totalElements
              } else {
                this.$message.error(res.msg)
              }
            })
          }
          // 显示编辑弹窗
          _this.dialog = true
        })
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
