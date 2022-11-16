<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog"
      :title="form.id==='' ? '添加用户' : '编辑用户'"
      :width="activeName==='userinfo'?'500px':'780px'"
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-form
          ref="form"
          :inline="false"
          :model="form"
          :rules="rules"
          size="small"
          label-width="90px"
        >
          <el-form-item
            label="姓名"
            prop="name"
          >
            <span v-if="form.isShare"> {{ form.name }}</span>
            <el-input
              v-else
              v-model="form.name"
            />
          </el-form-item>
          <el-form-item
            label="用户名"
            prop="username"
          >
            <span v-if="form.isShare"> {{ form.username }}</span>
            <el-input
              v-else
              v-model="form.username"
            />
          </el-form-item>
          <!-- <el-form-item
            label="状态"
            prop="enabled"
          >
            <el-radio
              v-for="item in dicts"
              :key="item.id"
              v-model="form.enabled"
              :label="item.value"
            >{{ item.label }}</el-radio>
          </el-form-item> -->
          <el-form-item
            label="电话"
            prop="phone"
          >
            <span v-if="form.isShare"> {{ form.phone }}</span>
            <el-input
              v-else
              v-model.number="form.phone"
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <span v-if="form.isShare"> {{ form.email }}</span>
            <el-input
              v-else
              v-model="form.email"
            />
          </el-form-item>
          <el-form-item
            label="角色"
            v-show="form.deptCode!=='jk-000'"
          >
            <el-select
              v-model="form.roles"
              style="width:100%"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="!(sup_this.$store.state.baseinfo.cur_user_level <= 2 || sup_this.$store.state.baseinfo.cur_user_level < item.level || $store.state.user.user.orgCode == 'jk-000')"
              />
            </el-select>
          </el-form-item>
        </el-form>

        <div style="text-align:right;">
          <el-button
            type="text"
            @click="cancel"
          >取消</el-button>
          <el-button
            :loading="loading"
            type="primary"
            @click="doSubmit"
          >确认</el-button>
        </div>
      </el-tabs>

    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog2"
      title="设备管理"
      width="780px"
    >
      <el-table
        :data="devices"
        size="small"
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          prop="device_name"
          label="设备名称"
        />
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
              @change="deviceChange(scope.row)"
              v-model="scope.row.device_sta"
              :label="-1"
            >无权</el-radio>
            <el-radio
              @change="deviceChange(scope.row)"
              v-model="scope.row.device_sta"
              :label="0"
            >查看</el-radio>
            <el-radio
              @change="deviceChange(scope.row)"
              v-model="scope.row.device_sta"
              :label="1"
            >管理</el-radio>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.facilities_sta===-1"
              type="primary"
              size="mini"
              @click="deviceManage(scope.row.facilities_id)"
            >设备分配</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import { add, edit } from '@/api/user'
import { getRolesByBase, getRolesByBaseAndUserid } from '@/api/role'
import { getById, findUserFacilitiesRelevance } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'
import { findUserDeviceRelevance } from '@/api/equip'

export default {
  components: {},
  props: {
    sup_this: {
      type: Object,
      default: null
    },
    dicts: {
      type: Array,
      required: true
    },
    baseid: {
      type: String,
      default: ''
    },
    orgid: {
      type: Number,
      default: null
    }
  },
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }

    return {
      activeName: 'userinfo',
      dialog: false,
      dialog2: false,
      loading: false,
      form: {
        id: '',
        name: '',
        username: '',
        email: null,
        enabled: 'true',
        phone: null,
        roles: [],
        facilities: [],
        devices: [],
        isShare: false
      },
      roleOptions: [],
      miniRoleLevel: 10000,
      style: 'width: 184px',
      level: 999,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        enabled: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
  },
  methods: {
    deviceManage (facilitiesId) {
      findUserDeviceRelevance({
        bs_user_id: this.form.id,
        rs_facilities_ids: facilitiesId,
        isGroup: false
      }).then(res => {
        if (res.code === 200) {
          this.dialog2 = true
          res.data.map(v => {
            if (!(v.device_sta === 0 || v.device_sta === 1)) {
              v.device_sta = -1
            }
          })
          this.devices = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deviceChange (row) {
      var a = [{ bs_user_id: this.form.id, hd_device_id: row.hd_device_id, device_sta: row.device_sta }]
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/updateDevicePermission', a, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    facilitiesChange (row) {
      var a = [{ bs_user_id: this.form.id, rs_facilities_id: row.facilities_id, facilities_sta: row.facilities_sta }]
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/updateUserFacilitiesRelevance', a, config).then(res => {
        if (res.data.code === 200) {
          //this.$message.success(res.data.msg)
          findUserDeviceRelevance({
            bs_user_id: this.form.id,
            rs_facilities_ids: row.facilities_id,
            isGroup: false
          }).then(res => {
            if (res.code === 200) {
              const _this = this
              var a = []
              res.data.map(v => {
                a.push({ bs_user_id: _this.form.id, hd_device_id: v.hd_device_id, device_sta: row.facilities_sta })
              })
              this.$axios.post(process.env.BASE_API + '/hd/hd_device/updateDevicePermission', a, config).then(res => {
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    showDialog (id) {

      this.miniRoleLevel = 10000;
      this.activeName = 'userinfo'
      if (id) { this.form.id = id }//传入ID为编辑
      this.dialog = true
      findUserFacilitiesRelevance({
        bs_user_id: this.form.id,
        bs_base_id: this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id
      }).then(res => {
        if (res.code === 200) {
          res.data.map(v => {
            if (!(v.facilities_sta === 0 || v.facilities_sta === 1)) {
              v.facilities_sta = -1
            }
          })
          this.facilities = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      getRolesByBase({ bs_base_id: this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.roleOptions = res.data
          this.setMiniRoleLevel();
        } else {
          this.$message.error(res.msg)
        }
      })

      getRolesByBaseAndUserid({ bs_base_id: this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id, user_id: this.form.id }).then(res => {
        if (res.code === 200) {
          var roles = res.data
          this.setMiniRoleLevel(roles);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    cancel () {
      this.resetForm()
    },
    setMiniRoleLevel (roles) {
      if (roles) {
        for (var i = 0, len = roles.length; i < len; i++) {
          if (this.miniRoleLevel > roles[i].level) {
            this.miniRoleLevel = roles[i].level;
          }
        }
      }
    },
    doSubmit () {
      if (!this.form.phone) {
        this.$message.error('请输入电话号码')
        return
      } else if (!this.isvalidPhone(this.form.phone)) {
        this.$message.error('请输入正确的11位手机号码')
        return
      }
      if (this.form.email !== null && this.form.email.trim() === '') {
        this.form.email = null
      }
      if (this.form.roles.length === 0) {
        this.$message({
          message: '角色不能为空',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      if (this.form.id === '') {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd () {
      var bases = []
      bases.push(this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id)
      add({
        name: this.form.name,
        username: this.form.username,
        email: this.form.email,
        phone: this.form.phone,
        enabled: this.form.enabled,
        orgManage: "B",
        updateRoleByDeptId: this.orgid !== null ? this.orgid : this.$store.state.baseinfo.cur_org_id,
        bases: bases,
        roles: this.form.roles,
        onlyBase: true,
        isShare: false,
        initialized: true,
        dept: this.orgid !== null ? this.orgid : this.$store.state.baseinfo.cur_org_id
      }).then(res => {
        this.resetForm()
        this.loading = false
        if (res.code === 200) {
          this.$notify({
            title: '添加成功',
            message: '默认密码：123456',
            type: 'success',
            duration: 2500
          })
          this.sup_this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //修改
    doEdit () {
      var bases = []
      bases.push(this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id)
      edit({
        id: this.form.id,
        name: this.form.name,
        username: this.form.username,
        email: this.form.email,
        phone: this.form.phone,
        enabled: this.form.enabled,
        orgManage: "B",
        updateRoleByDeptId: this.orgid !== null ? this.orgid : this.$store.state.baseinfo.cur_org_id,
        bases: bases,
        roles: this.form.roles,
        onlyBase: true,
        isShare: this.form.isShare,
        initialized: true,
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.sup_this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetForm () {
      this.dialog = false
      this.form.id = ''
      this.form.name = ''
      this.form.username = ''
      this.form.email = null
      this.form.enabled = 'true'
      this.form.phone = null
      this.form.roles = []
    },
    //检查电话号码
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      return reg.test(str)
    }
  }
}
</script>

<style scoped>
</style>
