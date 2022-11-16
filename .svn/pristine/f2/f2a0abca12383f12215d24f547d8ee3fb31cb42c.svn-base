<template>
  <div>
    <el-tree
      :data="baseList"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="'color-' + data.type">{{ data.name }} </span>
        <span>
          <el-select
            v-if="data.type === 'base'"
            v-model="data.roles"
            multiple
            collapse-tags
            size="mini"
            style="width:230px;"
            placeholder="角色分配(不选分配默认角色)"
          >
            <el-option
              v-for="item in data.roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- -1无权 0查看 1管理 -->
          <el-radio-group v-model="data.permission">
            <el-radio :label="-1" @change="changeRadio(node, data)"
              >无权</el-radio
            >
            <el-radio :label="0" @change="changeRadio(node, data)"
              >查看</el-radio
            >
            <el-radio :label="1" @change="changeRadio(node, data)"
              >管理</el-radio
            >
          </el-radio-group>
        </span>
      </span>
    </el-tree>
    <div style="text-align:right;margin-top: 15px;">
      <el-button
        type="primary"
        size="mini"
        @click="doSumbit"
        :loading="joinLoading"
      >
        {{ joinType === 1 ? "邀请" : "拉入" }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { getRolesByDeptBase } from "@/api/role";
import { getFacilitiesDeviceSensorByBase } from "@/api/hd_device_sensor";
import { getToken } from "@/utils/auth";

export default {
  props: {
    closeInviteDialog: {
      type: Function,
      default: new Function()
    }
  },
  data() {
    return {
      joinLoading: false,
      joinType: 1,
      baseList: [],
      bs_user_id: null,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    init(baseList, bs_user_id, joinType) {
      const _this = this;
      _this.bs_user_id = bs_user_id;
      _this.joinType = joinType; //1邀请 2拉入
      for (let i = 0; i < baseList.length; i++) {
        baseList[i].children = [];
        baseList[i].type = "base";
        baseList[i].permission = 0;
        baseList[i].joinType = joinType;
        baseList[i].invitee_user_id = bs_user_id;
        // baseList[i].roles = [];
      }

      _this.baseList = baseList;
      for (let k = 0; k < _this.baseList.length; k++) {
        let b1 = _this.baseList[k];
        //地块-设备
        getFacilitiesDeviceSensorByBase({ bs_base_id: b1.id }).then(f1 => {
          for (let i = 0; i < f1.data.length; i++) {
            let f2 = f1.data[i];
            f2.permission = 0; //地块默认查看
            f2.type = "facilities";
            for (let j = 0; j < f2.children.length; j++) {
              let d1 = f2.children[j];
              if (d1.children) {
                delete d1.children; //删除传感器层
              }
              d1.type = "device";
              d1.permission = 0; //设备默认查看
            }
          }
          b1.children = f1.data;
        });
        //角色
        getRolesByDeptBase({ bs_base_id: b1.id }).then(r1 => {
          b1.roleList = r1.data.content;
          b1.roles = [];
        });
      }
    },
    changeRadio(node, data) {
      if (data.children) {
        for (let i = 0; i < data.children.length; i++) {
          data.children[i].permission = data.permission;
          if (data.children[i].children) {
            for (let j = 0; j < data.children[i].children.length; j++) {
              data.children[i].children[j].permission = data.permission;
            }
          }
        }
      }
      if (
        data.type === "device" &&
        data.permission != -1 &&
        node.parent.data.permission === -1
      ) {
        node.parent.data.permission = 0;
        if (node.parent.parent.data.permission === -1) {
          node.parent.parent.data.permission = 0;
        }
      } else if (
        data.type === "facilities" &&
        data.permission != -1 &&
        node.parent.data.permission === -1
      ) {
        node.parent.data.permission = 0;
      }
    },
    doSumbit() {
      this.joinLoading = true;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken()
        }
      };
      this.$axios
        .post(
          process.env.BASE_API + "/bs/bs_base_invite/userPassivityJoinBase",
          this.baseList,
          config
        )
        .then(res => {
          this.joinLoading = false;
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.closeInviteDialog();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      return;
    }
  }
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.color-base {
  color: #7f0363;
}

.color-facilities {
  color: #056ac3;
}

.color-device {
  color: #000000;
}
</style>
