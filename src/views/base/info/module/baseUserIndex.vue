<template>
  <div>
    <el-card
      shadow="hover"
      style="margin:10px"
    >
      <eHeader
        :orgid="orgid"
        :baseid="baseid"
        :query="query"
        :sup_this="sup_this"
        :dicts="dicts"
      />
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
          align="center"
          prop="name"
          label="姓名"
        />
        <el-table-column
          align="center"
          prop="phone"
          label="电话"
        />
        <!-- <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="email"
          label="邮箱"
        /> -->
        <!-- <el-table-column
          label="状态"
          align="center"
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
          label="用户身份"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.share_sta === 1"
              type="warning"
            >分享成员</el-tag>
            <el-tag
              v-else
              type="success"
            >组织成员</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="用户角色"
          align="center"
        >
          <template slot-scope="scope">
            {{getRoleName(scope.row.roles)}}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="createTime"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="$store.state.baseinfo.cur_user_level <= 3"
          label="操作"
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.row)"
            >编辑用户</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="permissionSet(scope.row.id)"
            >权限配置</el-button>
            <el-popover
              :ref="'removeBase'+scope.row.id"
              placement="top"
              width="180"
            >
              <p>确定将该用户移出基地吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="$refs['removeBase'+scope.row.id].doClose()"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="removeUserBase(scope.row.id)"
                >确定</el-button>
              </div>
              <el-button
                v-if="$store.state.baseinfo.cur_user_level <= 3"
                slot="reference"
                type="danger"
                size="mini"
              >移出基地</el-button>
            </el-popover>

          </template>
        </el-table-column>
        <eForm
          ref="form"
          :sup_this="sup_this"
          :dicts="dicts"
          :baseid="baseid"
          :orgid="orgid"
        />

        <el-dialog
          append-to-body
          :visible.sync="permessionFormDialog"
          title="权限配置"
          width="780px"
          v-if="permessionFormDialog"
        >
          <permessionForm
            :bs_base_id="bs_base_id"
            :user_id="user_id"
          />
        </el-dialog>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="size"
        layout="total, prev, pager, next"
        @current-change="pageChange"
        @size-change="sizeChange"
      />
    </el-card>
  </div>
</template>
<script>
import checkPermission from '@/utils/permission'
//import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { mapGetters } from 'vuex'
import { del, getById, userBaseList, removeUserBase } from '@/api/user'
import { parseTime } from '@/utils/index'
import eHeader from './baseUserHeader'
import eForm from './baseUserForm'
import permessionForm from './baseUserPermission'

export default {
  components: { eHeader, eForm, permessionForm },
  mixins: [initDict],
  props: {
    baseid: {
      type: String,
      default: null
    },
    orgid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      user_id: null,
      bs_base_id: null,
      permessionFormDialog: false,
      data: [],
      page: 1,
      size: 10,
      total: 0,
      height: document.documentElement.clientHeight - 180 + 'px;',
      delLoading: false,
      sup_this: this,
      deptName: '',
      depts: [],
      deptId: null,
      userLevel: 999,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      query: {}
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
    getRoleName (roles) {
      var role_names = "";
      if (roles) {
        for (var i = 0, len = roles.length; i < len; i++) {
          if (i == 0) {
            role_names = role_names + roles[i].name;
          } else {
            role_names = role_names + "," + roles[i].name;
          }
        }
      }
      if (role_names.length >= 10) {
        role_names = role_names.substring(0, 10) + '. . .'
      }
      return role_names;
    },
    getMinRoleLevel (roles) {
      var level = 10000;
      if (roles) {
        for (var i = 0, len = roles.length; i < len; i++) {
          if (level > roles[i].level) {
            level = roles[i].level;
          }
        }
      }
      return level;
    },
    parseTime,
    checkPermission,
    // 每页条数切换
    sizeChange: function (pageSize) {
      this.size = pageSize
      this.pageChange(1)
    },
    // 翻页
    pageChange (val) {
      this.page = val
      this.init()
    },
    removeUserBase (bs_user_id) {
      removeUserBase({ bs_user_id: bs_user_id, bs_base_id: this.baseid ? this.baseid : this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.init()
        } else {
          this.$message.error(res.msg)
        }
        this.$refs['removeBase' + bs_user_id].doClose()
      })
    },
    init () {
      userBaseList({
        bs_base_id: this.baseid ? this.baseid : this.$store.state.baseinfo.cur_base_id,
        page: this.page,
        size: this.size,
        keyword: this.query.value
      }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // beforeInit() {
    //   this.userLevel = this.$store.state.baseinfo.cur_user_level
    //   this.params = { org_id: this.$store.state.baseinfo.cur_org_id, base_id: this.$store.state.baseinfo.cur_base_id, startPosition: (this.cur_page - 1) * this.pageSize, maxResult: this.pageSize }
    //   const query = this.query
    //   const type = query.type
    //   const value = query.value
    //   const enabled = query.enabled
    //   if (type && value) { this.params[type] = value }
    //   if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
    //   this.url = 'api/userList'
    //   return true
    // },
    // subDelete (id) {
    //   this.delLoading = true
    //   del(id).then(res => {
    //     this.delLoading = false
    //     this.$refs[id].doClose()
    //     this.dleChangePage()
    //     this.init()
    //     this.$notify({
    //       title: '删除成功',
    //       type: 'success',
    //       duration: 2500
    //     })
    //   }).catch(err => {
    //     this.delLoading = false
    //     this.$refs[id].doClose()
    //     console.log(err.response.data.message)
    //   })
    // },
    edit (data) {
      getById({ id: data.id }).then(res => {
        if (res.code === 200) {
          var bid = this.baseid ? this.baseid : this.$store.state.baseinfo.cur_base_id
          const _this = this.$refs.form
          let isShare = false
          if (data.share_sta === 1) { isShare = true }
          _this.form = { id: res.data.id, name: res.data.name, username: res.data.username, phone: res.data.phone, email: res.data.email, enabled: res.data.enabled.toString(), roles: [], deptCode: res.data.dept.code, isShare: isShare }
          res.data.roles.forEach(function (data1, index1) {
            if (data1.bs_base && data1.bs_base.id === bid) {
              _this.form.roles.push(data1.id)
            }
          })
          _this.showDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    permissionSet (id) {
      this.user_id = id
      this.bs_base_id = this.baseid ? this.baseid : this.$store.state.baseinfo.cur_base_id
      this.permessionFormDialog = true
    }
  }
}
</script>
<style scoped>
</style>
