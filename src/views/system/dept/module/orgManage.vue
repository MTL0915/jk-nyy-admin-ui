<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="tabCilck"
    >
      <el-tab-pane
        label="基地管理"
        name="baseinfo"
      >
        <BaseInfo
          :orgid="orgid"
          v-if="baseShow"
          ref="baseinfo"
        />
      </el-tab-pane>
      <el-tab-pane
        label="用户管理"
        name="userinfo"
      >
        <User
          :orgid="orgid"
          v-if="userShow"
          ref="userinfo"
        />
      </el-tab-pane>
      <el-tab-pane
        label="角色管理"
        name="roleinfo"
      >
        <Role
          :orgid="orgid"
          v-if="roleShow"
          ref="roleinfo"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import { parseTime } from '@/utils/index'
import User from '@/views/system/user/index'
import Role from '@/views/system/role/index'
import BaseInfo from '@/views/base/info/index'

export default {
  components: { User, Role, BaseInfo },
  mixins: [],
  data () {
    return {
      activeName: 'baseinfo',
      baseShow: true,
      userShow: false,
      roleShow: false,
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  props: {
    orgid: {
      type: Number,
      default: null
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    parseTime,
    checkPermission,
    tabCilck (data) {
      if (data.name === 'baseinfo') {
        this.baseShow = true
        this.userShow = false
        this.roleShow = false
      } else if (data.name === 'userinfo') {
        this.baseShow = false
        this.userShow = true
        this.roleShow = false
      } else if (data.name === 'roleinfo') {
        this.baseShow = false
        this.userShow = false
        this.roleShow = true
      }
    }
  }
}
</script>
