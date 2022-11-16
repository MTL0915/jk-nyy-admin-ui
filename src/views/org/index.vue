<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="tabCilck"
    >
      <el-tab-pane
        label="组织管理"
        name="deptinfo"
      >
        <Dept
          v-if="deptShow"
          ref="deptinfo"
          :s_this="sup_this"
        />
      </el-tab-pane>
      <el-tab-pane
        label="基地管理"
        name="baseinfo"
      >
        <BaseInfo
          v-if="baseShow"
          ref="baseinfo"
        />
      </el-tab-pane>
      <el-tab-pane
        label="用户管理"
        name="userinfo"
      >
        <User
          v-if="userShow"
          ref="userinfo"
        />
      </el-tab-pane>
      <el-tab-pane
        label="角色管理"
        name="roleinfo"
      >
        <Role
          v-if="roleShow"
          ref="roleinfo"
        />
      </el-tab-pane>
      <el-tab-pane
        v-if="$store.state.baseinfo.cur_user_level === 1"
        label="无组织用户管理"
        name="nuserinfo"
      >
        <Nuser
          v-if="nuserShow"
          ref="nuserinfo"
        />
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import Dept from '../system/dept/index'
import User from '../system/user/index'
import Nuser from '../system/user/nuser'
import Role from '../system/role/index'
import BaseInfo from '../base/info/index'
export default {
  name: 'OrgIndex',
  components: {
    Dept, User, Role, BaseInfo, Nuser
  },
  data () {
    return {
      deptShow: true,
      baseShow: false,
      userShow: false,
      roleShow: false,
      nuserShow: false,
      activeName: 'deptinfo',
      sup_this: this
    }
  },
  created () {
    this.deptShow = true
  },
  methods: {
    tabCilck (data) {
      if (data.name === 'deptinfo') {
        this.deptShow = true
        this.baseShow = false
        this.userShow = false
        this.roleShow = false
        this.nuserShow = false
      } else if (data.name === 'baseinfo') {
        this.deptShow = false
        this.baseShow = true
        this.userShow = false
        this.roleShow = false
        this.nuserShow = false
      } else if (data.name === 'userinfo') {
        this.deptShow = false
        this.baseShow = false
        this.userShow = true
        this.roleShow = false
        this.nuserShow = false
      } else if (data.name === 'roleinfo') {
        this.deptShow = false
        this.baseShow = false
        this.userShow = false
        this.roleShow = true
        this.nuserShow = false
      } else if (data.name === 'nuserinfo') {
        this.deptShow = false
        this.baseShow = false
        this.userShow = false
        this.roleShow = false
        this.nuserShow = true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
