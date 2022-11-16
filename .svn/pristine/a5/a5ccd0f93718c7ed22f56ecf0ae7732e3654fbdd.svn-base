<template>
  <div>
    <el-table
      :data="facilities"
      size="small"
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        prop="facilities_name"
        label="地块名称"
      />
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-radio
            @change="facilitiesChange(scope.row)"
            v-model="scope.row.facilities_sta"
            :label="-1"
            :disabled="miniRoleLevel <= 3"
          >无权</el-radio>
          <el-radio
            @change="facilitiesChange(scope.row)"
            v-model="scope.row.facilities_sta"
            :label="0"
            :disabled="miniRoleLevel <= 3"
          >查看</el-radio>
          <el-radio
            @change="facilitiesChange(scope.row)"
            v-model="scope.row.facilities_sta"
            :label="1"
          >管理</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            :disabled="miniRoleLevel <= 3 || scope.row.facilities_sta === -1 || scope.row.facilities_sta === 1"
            type="primary"
            size="mini"
            @click="deviceManage(scope.row.facilities_id,scope.row.facilities_sta)"
          >设备分配</el-button>
        </template>
      </el-table-column>
    </el-table>

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
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import { add, edit, getById } from '@/api/user'
import { getRolesByBase, getRolesByBaseAndUserid } from '@/api/role'
import { findUserFacilitiesRelevance } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'
import { findUserDeviceRelevance } from '@/api/equip'

export default {
  components: {},
  props: {
    bs_base_id: {
      type: String,
      default: ''
    },
    user_id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      dialog2: false,
      loading: false,
      facilities: [],
      roleOptions: [],
      miniRoleLevel: 10000,
    }
  },
  created () {
    this.init()
  },
  methods: {
    deviceManage (facilitiesId, facilities_sta) {
      findUserDeviceRelevance({
        bs_user_id: this.user_id,
        rs_facilities_ids: facilitiesId,
        isGroup: false
      }).then(res => {
        if (res.code === 200) {
          this.dialog2 = true
          res.data.map(v => {
            v.facilities_sta = 1;
            if (facilities_sta == 1) {
              v.device_sta = 1
            } else {
              if (!(v.device_sta === 0 || v.device_sta === 1)) {
                v.device_sta = -1
              }
            }
          })
          this.devices = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deviceChange (row) {
      var a = [{ bs_user_id: this.user_id, hd_device_id: row.hd_device_id, device_sta: row.device_sta }]
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
      var a = [{ bs_user_id: this.user_id, rs_facilities_id: row.facilities_id, facilities_sta: row.facilities_sta }]
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/updateUserFacilitiesRelevance', a, config).then(res => {
        if (res.data.code === 200) {
          //this.$message.success(res.data.msg)
          findUserDeviceRelevance({
            bs_user_id: this.user_id,
            rs_facilities_ids: row.facilities_id,
            isGroup: false
          }).then(res => {
            if (res.code === 200) {
              const _this = this
              var a = []
              res.data.map(v => {
                a.push({ bs_user_id: _this.user_id, hd_device_id: v.hd_device_id, device_sta: row.facilities_sta })
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
    init () {
      this.miniRoleLevel = 10000;
      let rs = []
      getById({ id: this.user_id }).then(res1 => {
        if (res1.code === 200) {
          const _this = this
          res1.data.roles.forEach(function (data1, index1) {
            if (data1.bs_base && data1.bs_base.id === _this.bs_base_id) {
              rs.push(data1.id)
            }
          })
          this.setMiniRoleLevel(rs)
          findUserFacilitiesRelevance({
            bs_user_id: this.user_id,
            bs_base_id: this.bs_base_id
          }).then(res2 => {
            if (res2.code === 200) {
              res2.data.map(v => {
                if (this.miniRoleLevel <= 3) {
                  v.facilities_sta = 1
                } else {
                  if (!(v.facilities_sta === 0 || v.facilities_sta === 1)) {
                    v.facilities_sta = -1
                  }
                }
              })
              this.facilities = res2.data
            } else {
              this.$message.error(res2.msg)
            }
          })
        } else {
          this.$message.error(res1.msg)
        }
      })
    },
    setMiniRoleLevel (roles) {
      if (roles) {
        for (var i = 0, len = roles.length; i < len; i++) {
          if (this.miniRoleLevel > roles[i].level) {
            this.miniRoleLevel = roles[i].level;
          }
        }
      }
    }
  }
}
</script>

