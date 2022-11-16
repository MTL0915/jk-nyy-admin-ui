<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      append-to-body
      custom-class="role-dialog"
      width="700px"
      title="分配角色"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-row>
          <el-col
            :span="12"
            style="height:50px"
          >
            <el-form-item
              style="width:520px"
              label="基地角色："
            >
              <el-select
                v-model="form.bs_role_id"
                placeholder="请选择"
                @change="roleChange"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="设备权限："
              style="width:600px"
            >
              <el-tree
                v-if="updateTree"
                ref="deviceTree"
                :data="deviceTreeNodes"
                style="height:200px;overflow: auto;"
                show-checkbox
                node-key="id"
                @check-change="treeCheck"
              >
                <span
                  slot-scope="{ node, data }"
                  class="custom-tree-node"
                >
                  <span style="display: block;float: left;width:130px;padding-top: 6px;overflow:hidden">{{ node.label }}</span>
                  <span style="display: block;float: left;margin-left:50px;padding: 5px;">
                    <el-radio
                      :disabled="isDisabled"
                      v-model="data.deviceOper"
                      label="1"
                      style="font-size:12px"
                      @change="changeRadio(data)"
                    >管理</el-radio>
                    <el-radio
                      :disabled="isDisabled"
                      v-model="data.deviceOper"
                      label="0"
                      style="font-size:12px"
                      @change="changeRadio(data)"
                    >查看</el-radio>
                  </span>
                </span>
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center;"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="saveData"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateApplyBase, getApplyBaseById } from '@/api/baseInfo'
import { findByBs_base_id as findFacilitiesByBs_base_id } from '@/api/rs_facilities'
import { findByBs_base_id as findDeviceByBs_base_id } from '@/api/equip'
import { getRolesByDeptBase } from '@/api/role'

export default {
  name: 'RolePermission',
  components: {},
  data () {
    return {
      devices: [],
      facilities: [],
      dialogVisible: false,
      updateTree: true,
      isDisabled: false,
      roleOptions: [],
      bs_base_apply: {},
      bs_base_apply_id: null,
      msg_id: null,
      bs_base_apply_sta: null,
      form: {},
      deviceTreeNodes: [],
      loading: false
    }
  },
  methods: {
    // 选择改变时
    treeCheck (data1, data2, data3) {
      data1.isCheck = data2
      if (data1.children) { // 地块
        // 全选或全不选的状态下才做批量修改状态处理
        if (data2 === true || (data2 === false && data3 === false)) {
          data1.children.forEach(element => {
            element.isCheck = data2
          })
        }
      }
    },
    changeRadio (data) {
      if (data.children) {
        data.children.forEach(element => {
          element.deviceOper = data.deviceOper
        })
      }
    },
    show (bs_base_apply_id, bs_base_id, sta, msg_id) {
      this.bs_base_apply_id = bs_base_apply_id
      this.msg_id = msg_id;
      this.bs_base_apply_sta = sta
      if (sta === 1) {//通过
        this.load(bs_base_id)
        this.dialogVisible = true
      } else if (sta === 2) {//不通过
        this.saveData()
      }
    },
    saveData () {
      if (this.bs_base_apply_sta === 1) {//通过
        if (this.form.bs_role_id == null) {
          this.$message.success('自动分配基地默认角色！')
        }
        this.facilities = []
        this.devices = []
        var _this = this
        // 地块 设备
        this.deviceTreeNodes.forEach(facilitiesElement => {
          if (facilitiesElement.isCheck) { // 全选地块节点
            _this.facilities.push(facilitiesElement.id)
            facilitiesElement.children.forEach(deviceElement => {
              _this.devices.push(deviceElement.id + ':' + deviceElement.deviceOper)
            })
          } else {
            var flag = false
            facilitiesElement.children.forEach(deviceElement => {
              if (deviceElement.isCheck) {
                _this.devices.push(deviceElement.id + ':' + deviceElement.deviceOper)
                flag = true
              }
            })
            if (flag) {
              _this.facilities.push(facilitiesElement.id)
            }
          }
        })
      }
      this.loading = true
      updateApplyBase({
        bs_base_apply_id: this.bs_base_apply_id,
        bs_base_apply_sta: this.bs_base_apply_sta,
        msg_id: this.msg_id,
        roles: this.form.bs_role_id,
        facilities: this.facilities.join(','),
        devices: this.devices.join(',')
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.msg)
        }
        this.dialogVisible = false
        this.$parent.markReaded()
      })
      // inviteUserJoinBase({ bs_base_id: this.bs_base_id, invitee_user_id: this.bs_user_id, roles: this.form.bs_role_id, facilities: this.facilities.join(','), devices: this.devices.join(',') }).then(res => {
      //   if (res.code === 200) {
      //     this.$message.success('邀请成功')
      //   } else {
      //     this.$message.error(res.meg)
      //   }
      //   this.dialogVisible = false
      // })
    },
    load (bs_base_id) {
      findFacilitiesByBs_base_id({ bs_base_id: bs_base_id }).then(res => {
        this.deviceTreeNodes = []
        for (var i = 0; i < res.data.length; i++) {
          var rowData = res.data[i]
          this.deviceTreeNodes.push({ id: rowData.id, label: rowData.name, deviceOper: -1, children: [] })
        }
        this.bindDevice(bs_base_id)
      })
      getRolesByDeptBase({ bs_base_id: bs_base_id }).then(res => {
        this.roleOptions = res.data.content
      })
    },
    bindDevice (bs_base_id) {
      findDeviceByBs_base_id({ bs_base_id: bs_base_id }).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var rowData = res.data[i]
          for (var j = 0; j < this.deviceTreeNodes.length; j++) {
            if (rowData.facilities_id === this.deviceTreeNodes[j].id) {
              this.deviceTreeNodes[j].children.push({ id: rowData.id, label: rowData.name, deviceOper: -1 })
            }
          }
        }
      })
    },
    roleChange (e) {
      var level = 9999
      for (var i = 0; i < this.roleOptions.length; i++) {
        if (e === this.roleOptions[i].id) {
          level = this.roleOptions[i].level
          break
        }
      }
      if (level <= 3) {
        this.checkedDevice('1')
        // this.updateTree=false;
        this.isDisabled = true
      } else {
        this.checkedDevice('0')
        this.isDisabled = false
        // this.updateTree=true;
      }
    },
    checkedDevice (deviceOper) {
      this.$refs.deviceTree.setCheckedNodes(this.deviceTreeNodes)
      for (var i = 0; i < this.deviceTreeNodes.length; i++) {
        this.deviceTreeNodes[i].deviceOper = deviceOper
        if (deviceOper === '1') {
          this.deviceTreeNodes[i].disabled = true
        } else {
          this.deviceTreeNodes[i].disabled = false
        }
        var childrens = this.deviceTreeNodes[i].children
        for (var j = 0; j < childrens.length; j++) {
          childrens[j].deviceOper = deviceOper
          if (deviceOper === '1') {
            childrens[j].disabled = true
          } else {
            childrens[j].disabled = false
          }
        }
      }
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.role-dialog {
  .el-dialog__body {
    height: 360px !important;
    min-height: 360px !important;
  }
}

.custom-tree-node {
  .el-checkbox {
    margin-right: 0px;
  }
  .el-checkbox__inner {
    width: 10px !important;
    height: 10px !important;
  }
  .el-checkbox__label {
    font-size: 11px !important;
  }
}
</style>
