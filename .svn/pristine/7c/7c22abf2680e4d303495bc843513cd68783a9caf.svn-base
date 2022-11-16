<template>
  <div>
    <eHeader
      :query="query"
      :sup_this="sup_this"
      :baseid="baseid"
      :orgid="orgid"
    />
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col
        :xs="24"
        :sm="24"
        :md="20"
        :lg="20"
        :xl="20"
      >
        <el-card
          class="box-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span class="role-span">角色列表</span>
            <div
              id="opt"
              style="float: right"
            >
              <el-radio-group
                v-model="opt"
                size="mini"
              >
                <el-radio-button label="菜单分配" />
                <el-radio-button label="权限分配" />
              </el-radio-group>
            </div>
          </div>

          <el-table
            v-loading="loading"
            :data="data"
            highlight-current-row
            size="small"
            style="width: 100%;"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="name"
              label="名称"
            />
            <el-table-column
              :formatter="levelReplace"
              prop="level"
              label="角色级别"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="remark"
              label="描述"
            />
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
              v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_EDIT','ROLES_DELETE'])"
              label="操作"
              width="130px"
              align="center"
            >
              <template slot-scope="scope">
                <edit
                  v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
                  :data="scope.row"
                  :sup_this="sup_this"
                />
                <el-popover
                  v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']"
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
                    slot="reference"
                    :disabled="!(sup_this.userLevel<=3 && scope.row.level===999)"
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
        </el-card>
      </el-col>
      <!-- 授权 -->
      <el-col
        :xs="24"
        :sm="24"
        :md="4"
        :lg="4"
        :xl="3"
      >
        <el-card
          v-show="opt === '菜单分配'"
          class="box-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="选择指定角色分配菜单"
              placement="top"
            >
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
            >保存</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"
          />
        </el-card>
        <el-card
          v-show="opt === '权限分配'"
          class="box-card"
          shadow="never"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="选择指定角色分配权限"
              placement="top"
            >
              <span class="role-span">权限分配</span>
            </el-tooltip>
            <el-button
              v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"
              :disabled="!showButton"
              :loading="permissionLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="savePermission"
            >保存</el-button>
          </div>
          <el-tree
            ref="permission"
            :data="permissions"
            :default-checked-keys="permissionIds"
            :props="defaultProps"
            show-checkbox
            accordion
            node-key="id"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { getPermissionTree } from '@/api/permission'
import { getMenusTree } from '@/api/menu'
import { parseTime } from '@/utils/index'
import eHeader from './baseRoleHeader'
import edit from './baseRoleEdit'
import { del, editPermission, editMenu, get } from '@/api/role'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  props: {
    baseid: {
      type: String,
      default: ''
    },
    orgid: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      sup_this: this,
      cur_page: 1,
      pageSize: 10,
      total: 0,
      userLevel: 999,
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      currentId: 0, permissionLoading: false, menuLoading: false, showButton: false, opt: '菜单分配',
      delLoading: false, permissions: [], permissionIds: [], menus: [], menuIds: []
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
    this.userLevel = this.$store.state.baseinfo.cur_user_level
    this.getPermissions()
    this.getMenus()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    renderContent (h, {
      node,
      data,
      store
    }) {
      console.log('ddd', {
        node,
        data,
        store
      })
      return (
        <span>
          <i class={data.icon}></i>
          <span>{node.label}</span>
        </span>
      )
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
    levelReplace (row, column) {
      if (row.level === 1) {
        return '超级管理员'
      } else if (row.level === 2) {
        return '组织管理员'
      } else if (row.level === 3) {
        return '基地管理员'
      } else if (row.level === 4) {
        return '地块管理员'
      } else if (row.level === 900) {
        return '默认角色'
      } else {
        return '自定义角色'
      }
    },
    beforeInit () {
      this.params = {
        base_id: this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id,
        startPosition: (this.cur_page - 1) * this.pageSize,
        maxResult: this.pageSize
      }
      this.url = 'api/roles/roleList'
      return true
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.$message.error(err.response.data.msg)
      })
    },
    getPermissions () {
      getPermissionTree().then(res => {
        this.permissions = res.data
      })
    },
    getMenus () {
      getMenusTree().then(res => {
        this.menus = res.data
      })
    },
    handleCurrentChange (val) {
      if (val) {
        const _this = this
        // 保存当前的角色id
        this.currentId = val.id
        // 点击后显示按钮
        if (this.userLevel === 1) {
          this.showButton = true
        } else if (this.userLevel === 2 && (this.deptId !== this.user.orgId || val.level > 2)) {
          this.showButton = true
        } else if (this.userLevel === 3 && val.level > 3) {
          this.showButton = true
        } else {
          this.showButton = false
        }

        get(val.id).then(res => {
          // 初始化
          _this.menuIds = []
          _this.permissionIds = []
          // 清空权限与菜单的选中
          _this.$refs.permission.setCheckedKeys([])
          _this.$refs.menu.setCheckedKeys([])
          var menuArray = []
          var permissionArray = []
          // 菜单数据需要特殊处理
          res.data.menus.forEach(function (data, index) {
            let add = true
            for (let i = 0; i < res.data.menus.length; i++) {
              if (data.id === res.data.menus[i].pid) {
                add = false
                break
              }
            }
            if (add) {
              menuArray.push(data.id)
            }
          })
          // 处理权限数据
          res.data.permissions.forEach(function (data, index) {
            permissionArray.push(data.id)
          })
          _this.menuIds = menuArray
          _this.permissionIds = permissionArray
        })
      }
    },
    savePermission () {
      this.permissionLoading = true
      const role = { id: this.currentId, permissions: [] }
      this.$refs.permission.getCheckedKeys().forEach(function (data, index) {
        const permission = { id: data }
        role.permissions.push(permission)
      })
      editPermission(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.permissionLoading = false
        this.update()
      }).catch(err => {
        this.permissionLoading = false
        console.log(err.response.data.message)
      })
    },
    saveMenu () {
      this.menuLoading = true
      const role = { id: this.currentId, menus: [] }
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function (data, index) {
        const permission = { id: data.id }
        role.menus.push(permission)
      })
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function (data, index) {
        const permission = { id: data }
        role.menus.push(permission)
      })
      editMenu(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.menuLoading = false
        this.update()
      }).catch(err => {
        this.menuLoading = false
        console.log(err.response.data.message)
      })
    },
    update () {
      // 无刷新更新 表格数据
      get(this.currentId).then(res => {
        for (let i = 0; i < this.data.length; i++) {
          if (res.id === this.data[i].id) {
            this.data[i] = res.data
            break
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.role-span {
  font-weight: bold;
  color: #303133;
  font-size: 15px;
}
</style>
