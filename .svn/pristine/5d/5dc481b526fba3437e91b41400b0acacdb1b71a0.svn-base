<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      append-to-body
      custom-class="role-dialog"
      width="700px"
      title="分配角色"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item style="width:520px" label="所属组织：">
              {{ bs_org_name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="height:50px">
            <el-form-item style="width:520px" label="基地角色：">
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
            <el-form-item label="设备权限：" style="width:600px">
              <el-tree
                v-if="updateTree"
                ref="deviceTree"
                :data="deviceTreeNodes"
                style="height:200px;overflow: auto;"
                show-checkbox
                node-key="id"
                @check-change="treeCheck"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span
                    style="display: block;float: left;width:130px;padding-top: 6px;overflow:hidden"
                    >{{ node.label }}</span
                  >
                  <span
                    style="display: block;float: left;margin-left:50px;padding: 5px;"
                  >
                    <el-radio
                      :disabled="isDisabled"
                      v-model="data.deviceOper"
                      label="1"
                      style="font-size:12px"
                      @change="changeRadio(data)"
                      >管理</el-radio
                    >
                    <el-radio
                      :disabled="isDisabled"
                      v-model="data.deviceOper"
                      label="0"
                      style="font-size:12px"
                      @change="changeRadio(data)"
                      >查看</el-radio
                    >
                  </span>
                </span>
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveData" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { inviteUserJoinBase, dragUserJoinBase } from "@/api/baseInfo";
import { findByBs_base_id as findFacilitiesByBs_base_id } from "@/api/rs_facilities";
import { findByBs_base_id as findDeviceByBs_base_id } from "@/api/equip";
import { getRolesByDeptBase } from "@/api/role";

export default {
  name: "RolePermission",
  components: {},
  data() {
    return {
      devices: [],
      facilities: [],
      bs_org_name: "",
      bs_org_id: null,
      bs_user_id: null,
      bs_base_id: null,
      dialogVisible: false,
      updateTree: true,
      isDisabled: false,
      roleOptions: [],
      bs_base_apply: {},
      bs_base_apply_sta: "",
      form: {},
      deviceTreeNodes: [],
      type: null,
      loading: false
    };
  },
  props: {
    closeDialog: {
      type: Function,
      default: new Function()
    }
  },
  methods: {
    // 选择改变时
    treeCheck(data1, data2, data3) {
      data1.isCheck = data2;
      if (data1.children) {
        // 地块
        // 全选或全不选的状态下才做批量修改状态处理
        if (data2 === true || (data2 === false && data3 === false)) {
          data1.children.forEach(element => {
            element.isCheck = data2;
          });
        }
      }
    },
    changeRadio(data) {
      if (data.children) {
        data.children.forEach(element => {
          element.deviceOper = data.deviceOper;
        });
      }
    },
    show(bs_base_id, bs_user_id, bs_org_id, bs_org_name, type) {
      this.type = type;
      if (bs_org_name) {
        this.bs_org_name = bs_org_name;
      } else {
        this.bs_org_name = "无组织";
      }
      this.bs_org_id = bs_org_id;
      this.bs_base_id = bs_base_id;
      this.bs_user_id = bs_user_id;
      this.dialogVisible = true;
      getRolesByDeptBase({ bs_base_id: this.bs_base_id }).then(res => {
        this.roleOptions = res.data.content;
      });
      this.loadDeviceTree(this.bs_base_id);
    },
    loadDeviceTree(bs_base_id) {
      findFacilitiesByBs_base_id({ bs_base_id: bs_base_id }).then(res => {
        this.deviceTreeNodes = [];
        for (var i = 0; i < res.data.length; i++) {
          var rowData = res.data[i];
          this.deviceTreeNodes.push({
            id: rowData.id,
            label: rowData.name,
            deviceOper: -1,
            children: []
          });
        }
        this.bindDevice(bs_base_id);
      });
    },
    bindDevice(bs_base_id) {
      findDeviceByBs_base_id({ bs_base_id: bs_base_id }).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          var rowData = res.data[i];
          for (var j = 0; j < this.deviceTreeNodes.length; j++) {
            if (rowData.facilities_id === this.deviceTreeNodes[j].id) {
              this.deviceTreeNodes[j].children.push({
                id: rowData.id,
                label: rowData.name,
                deviceOper: -1
              });
            }
          }
        }
      });
    },
    roleChange(e) {
      var level = 9999;
      for (var i = 0; i < this.roleOptions.length; i++) {
        if (e === this.roleOptions[i].id) {
          level = this.roleOptions[i].level;
          break;
        }
      }
      if (level <= 3) {
        this.checkedDevice("1");
        // this.updateTree=false;
        this.isDisabled = true;
      } else {
        this.checkedDevice("0");
        this.isDisabled = false;
        // this.updateTree=true;
      }
    },
    checkedDevice(deviceOper) {
      for (var i = 0; i < this.deviceTreeNodes.length; i++) {
        this.deviceTreeNodes[i].disabled = false;

        var childrens = this.deviceTreeNodes[i].children;
        for (var j = 0; j < childrens.length; j++) {
          childrens[j].disabled = false;
        }
      }

      this.$refs.deviceTree.setCheckedNodes(this.deviceTreeNodes);
      for (var i = 0; i < this.deviceTreeNodes.length; i++) {
        this.deviceTreeNodes[i].deviceOper = deviceOper;
        if (deviceOper === "1") {
          this.deviceTreeNodes[i].disabled = true;
        } else {
          this.deviceTreeNodes[i].disabled = false;
        }
        var childrens = this.deviceTreeNodes[i].children;
        for (var j = 0; j < childrens.length; j++) {
          childrens[j].deviceOper = deviceOper;
          if (deviceOper === "1") {
            childrens[j].disabled = true;
          } else {
            childrens[j].disabled = false;
          }
        }
      }
    },
    saveData(data_json, bs_base_apply_sta) {
      this.facilities = [];
      this.devices = [];
      var _this = this;
      // 地块 设备
      this.deviceTreeNodes.forEach(facilitiesElement => {
        if (facilitiesElement.isCheck) {
          // 全选地块节点
          _this.facilities.push(facilitiesElement.id);
          facilitiesElement.children.forEach(deviceElement => {
            _this.devices.push(
              deviceElement.id + ":" + deviceElement.deviceOper
            );
          });
        } else {
          var flag = false;
          facilitiesElement.children.forEach(deviceElement => {
            if (deviceElement.isCheck) {
              _this.devices.push(
                deviceElement.id + ":" + deviceElement.deviceOper
              );
              flag = true;
            }
          });
          if (flag) {
            _this.facilities.push(facilitiesElement.id);
          }
        }
      });
      if (this.type === 2) {
        //拉入
        dragUserJoinBase({
          bs_base_id: this.bs_base_id,
          invitee_user_id: this.bs_user_id,
          roles: this.form.bs_role_id,
          facilities: this.facilities.join(","),
          devices: this.devices.join(",")
        }).then(res => {
          if (res.code === 200) {
            this.$message.success("拉入成功");
          } else {
            this.$message.error(res.msg);
          }
          this.dialogVisible = false;
        });
      } else {
        //邀请
        this.loading = true;
        inviteUserJoinBase({
          bs_base_id: this.bs_base_id,
          invitee_user_id: this.bs_user_id,
          roles: this.form.bs_role_id,
          facilities: this.facilities.join(","),
          devices: this.devices.join(",")
        }).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.$message.success("邀请成功");
          } else {
            this.$message.error(res.msg);
          }
          this.dialogVisible = false;
        });
      }
    }
  }
};
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
