<template>
  <div>
    <el-dialog
      v-if="dialog"
      :append-to-body="true"
      :visible.sync="dialog"
      :title="isAdd ? '添加用户' : '编辑用户'"
      width="670px"
      @close="closeDialog"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="用户基础信息"
          name="baseInfo"
        >
          <el-form
            ref="form"
            :inline="false"
            :model="form"
            :rules="rules"
            size="small"
            label-width="90px"
          >
            <!-- 用户基础信息 -->
            <el-form-item label="单位">
              <treeselect
                v-if="!form.isShare"
                v-model="form.dept"
                :options="depts"
                placeholder="选择单位"
                @input="deptChange"
              />
              <span v-if="form.isShare"> {{ form.deptName }}</span>
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input
                v-show="!form.isShare"
                v-model="form.name"
              />
              <span v-if="form.isShare"> {{ form.name }}</span>
            </el-form-item>
            <el-form-item
              label="登录账号"
              prop="username"
            >
              <el-input
                v-show="!form.isShare"
                v-model="form.username"
              />
              <span v-if="form.isShare"> {{ form.username }}</span>
            </el-form-item>
            <el-form-item
              label="电话"
              prop="phone"
            >
              <el-input
                v-if="!form.isShare"
                v-model="form.phone"
              />
              <span v-if="form.isShare"> {{ form.phone }}</span>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="enabled"
              v-show="false"
            >
              <el-radio
                v-for="item in dicts"
                :disabled="form.isShare"
                :key="item.id"
                v-model="form.enabled"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-form-item>

            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input
                v-if="!form.isShare"
                v-model="form.email"
              />
              <span v-if="form.isShare"> {{ form.email }}</span>
            </el-form-item>

            <!-- 用户角色信息 -->
            <div>
              <el-form-item
                v-show="
                  !form.isShare &&
                    form.dept !== $store.state.baseinfo.implement_org_id
                "
                label="是否管理员"
              >
                <el-radio-group
                  v-model="form.orgManage"
                  @change="orgManageChange"
                >
                  <el-radio label="A">是</el-radio>
                  <el-radio label="B">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="form.orgManage == 'B'"
                v-show="form.dept !== $store.state.baseinfo.implement_org_id"
                label="基地角色"
              >
                <el-cascader
                  v-model="form.baseRole"
                  :options="baseRoleOptions"
                  :props="baseRoleprops"
                  style="width: 450px;"
                  clearable
                  @change="baseRoleChange"
                />
              </el-form-item>
            </div>
          </el-form>
          <div style="text-align: right;">
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
        </el-tab-pane>

        <el-tab-pane
          label="已关注的基地"
          name="joinBase"
        >
          <el-input
            v-model="shareForm.keyword"
            clearable
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 200px;"
            class="filter-item"
          />
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-search"
            @click="pageChange(1)"
          >搜索</el-button>
          <!-- 用户加入其它组织基地列表 -->
          <el-table
            v-loading="loading"
            :data="shareForm.list"
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="bs_org_name"
              label="单位名称"
            />
            <el-table-column
              prop="bs_base_name"
              label="基地名称"
            />
            <el-table-column
              prop="bs_base_name"
              label="基地角色"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.level && scope.row.level === 3"
                  type="success"
                >基地管理员</el-tag>
                <el-tag
                  v-else
                  type="info"
                >普通成员</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="300px"
              align="center"
            >
              <template slot-scope="scope">
                <!-- 删除 -->
                <el-popover
                  v-permission="['ADMIN', 'USER_ALL', 'USER_DELETE']"
                  :ref="scope.row.bs_base_id"
                  placement="top"
                  width="180"
                >
                  <p>确定要取消关注吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs[scope.row.bs_base_id].doClose()"
                    >取消</el-button>
                    <el-button
                      :loading="delLoading"
                      type="primary"
                      size="mini"
                      @click="exitBase(form.id, scope.row.bs_base_id)"
                    >确定</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="danger"
                    size="mini"
                  >取消关注</el-button>
                </el-popover>
                <!-- 编辑 -->
                <el-button
                  :disabled="canPermissionSet(scope.row.bs_org_code)"
                  type="primary"
                  size="mini"
                  @click="permissionSet(scope.row.bs_base_id)"
                >权限配置</el-button>
                <el-button
                  :disabled="canPermissionSet(scope.row.bs_org_code)"
                  type="success"
                  size="mini"
                  @click="editBaseUser(scope.row)"
                >编辑用户</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="shareForm.total"
            :page-size="shareForm.pageSize"
            small
            @size-change="sizeChange"
            @current-change="pageChange"
          />
        </el-tab-pane>
        <el-tab-pane
          v-if="$store.state.baseinfo.cur_user_level === 1 && form.id"
          label="快速加入基地"
          name="joinBaseByAdmin"
        >
          <el-input
            v-model="noJoinForm.keyword"
            clearable
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 200px;"
            class="filter-item"
          />
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-search"
            @click="noJoinFormPageChange(1)"
          >搜索</el-button>
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            @click="batchDragUser()"
          >批量拉入</el-button>
          <!-- 快速加入基地 -->
          <el-table
            :data="noJoinForm.list"
            size="small"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="bs_org_name"
              label="单位名称"
            />
            <el-table-column
              prop="bs_base_name"
              label="基地名称"
            />
            <el-table-column
              label="操作"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="$store.state.baseinfo.cur_user_level === 1"
                  type="primary"
                  round
                  size="mini"
                  @click="dragUser(scope.row)"
                >拉入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="noJoinForm.total"
            :page-size="noJoinForm.pageSize"
            @current-change="noJoinFormPageChange"
            small
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="permessionFormDialog"
      title="权限配置"
      width="780px"
      v-if="permessionFormDialog"
    >
      <permessionForm
        :bs_base_id="permessionFormBaseId"
        :user_id="permessionFormUserId"
      />
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="userPassivityJoinBaseDialogVisible"
      title="加入基地配置"
      width="1000px"
    >
      <userPassivityJoinBase
        ref="userPassivityJoinBase"
        :closeInviteDialog="closeInviteDialog"
      />
    </el-dialog>
    <baseUserForm
      :orgid="orgid"
      :baseid="baseid"
      ref="baseUserForm"
      :sup_this="sup_this"
      :dicts="dicts"
    />
  </div>
</template>

<script>
import { getShareBaseByUserId, getUserNoJoinBase } from "@/api/baseInfo";
import { treeBaseRole as getBaseRole } from "@/api/org";
import { add, edit, removeUserBase, setUserBecomeAdmin, getById } from "@/api/user";
import { getDepts, checkOrgAdmin } from "@/api/dept";
import { getLevel } from "@/api/role";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import checkPermission from "@/utils/permission";
import permessionForm from "@/views/base/info/module/baseUserPermission";
import userPassivityJoinBase from "./userPassivityJoinBase.vue";
import baseUserForm from '@/views/base/info/module/baseUserForm'

export default {
  components: { Treeselect, permessionForm, userPassivityJoinBase, baseUserForm },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        // callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };

    return {
      userPassivityJoinBaseDialogVisible: false,
      permessionFormDialog: false,
      permessionFormBaseId: null,
      permessionFormUserId: null,
      multipleSelection: [],
      lr: false,
      activeName: "baseInfo",
      baseRoleprops: { multiple: true },
      dialog: false,
      loading: false,
      form: {
        isShare: false,
        deptName: null,
        name: null,
        username: null,
        email: null,
        enabled: "true",
        baseRole: [],
        roles: [],
        bases: [],
        orgManage: "B",
        dept: null,
        phone: null,
        initialized: true,
        updateRoleByDeptId: null,
        filtration: null
      },
      shareForm: {
        list: [],
        total: 0,
        pageSize: 10,
        cur_page: 1,
        keyword: null
      },
      noJoinForm: {
        list: [],
        total: 0,
        pageSize: 10,
        cur_page: 1,
        keyword: null
      },
      roleIds: [],
      baseIds: [],
      roles: [],
      bases: [],
      depts: [],
      baseRoleOptions: [],
      deptId: null,
      style: "width: 184px",
      level: 999,
      rules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        enabled: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialog (val, oldval) {
      if (val) {
        this.getDepts();
      }
    }
  },
  created () {
    const explorer = navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
      this.style = "width: 184px";
    } else {
      this.style = "width: 172px";
    }
    // this.getDepts()
  },
  methods: {
    editBaseUser (data) {
      getById({ id: this.form.id }).then(res => {
        if (res.code === 200) {
          var bid = data.bs_base_id
          const _this = this.$refs.baseUserForm
          let isShare = true
          // if (data.share_sta === 1) { isShare = true }
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
    canPermissionSet (bs_org_code) {
      if (bs_org_code.indexOf(this.$store.state.user.user.orgCode) === -1) {
        return true;
      } else {
        return false;
      }
    },
    permissionSet (bs_base_id) {
      this.permessionFormBaseId = bs_base_id;
      this.permessionFormUserId = this.form.id;
      this.permessionFormDialog = true;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    closeInviteDialog () {
      this.userPassivityJoinBaseDialogVisible = false;
      if (!this.form.isShare) {
        getShareBaseByUserId({
          bs_user_id: this.form.id,
          page: 0,
          size: 10
        }).then(res => {
          this.shareForm.list = res.data.content;
          this.shareForm.total = res.data.totalElements;
          if (res.data.totalElements === 0) {
            this.activeName = "baseInfo";
          }
        });
      } else {
        getShareBaseByUserId({
          bs_user_id: this.form.id,
          bs_org_id: this.form.filtration,
          page: 0,
          size: 10
        }).then(res => {
          this.shareForm.list = res.data.content;
          this.shareForm.total = res.data.totalElements;
          if (res.data.totalElements === 0) {
            this.activeName = "baseInfo";
          }
        });
      }
      if (this.$store.state.baseinfo.cur_user_level === 1) {
        getUserNoJoinBase({ bs_user_id: this.form.id, page: 0, size: 10 }).then(
          res => {
            if (res.code === 200) {
              this.noJoinForm.list = res.data.content;
              this.noJoinForm.total = res.data.totalElements;
              if (res.data.totalElements === 0) {
                this.activeName = "baseInfo";
              }
            } else {
              this.$message.error(res.msg);
            }
          }
        );
      }
      this.lr = false;
    },
    //批量拉入基地
    batchDragUser () {
      let baseList = [];
      this.multipleSelection.map(v => {
        baseList.push({ id: v.id, name: v.bs_base_name });
      });
      if (baseList.length === 0) {
        this.$message.warning("未选中基地!");
        return;
      }
      this.userPassivityJoinBaseDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.userPassivityJoinBase.init(baseList, this.form.id, 2);
      });
    },
    // 将用户拉入组织(无需用户同意邀请)
    dragUser (item) {
      checkOrgAdmin({
        bs_base_id: this.to_base_id
          ? this.to_base_id
          : this.$store.state.baseinfo.cur_base_id
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            let baseList = [];
            baseList.push({ id: item.id, name: item.bs_base_name });
            this.userPassivityJoinBaseDialogVisible = true;
            this.$nextTick(() => {
              this.$refs.userPassivityJoinBase.init(baseList, this.form.id, 2);
            });
          } else {
            this.$confirm(
              "该基地的组织仍未存在组织管理员,是否将其设为组织管理员?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                setUserBecomeAdmin({
                  bs_base_id: item.id,
                  bs_user_id: this.form.id
                }).then(res => {
                  if (res.code === 200) {
                    this.$message.success(res.msg);
                  } else {
                    this.$message.error(res.msg);
                  }
                });
              })
              .catch(() => {
                let baseList = [];
                baseList.push({ id: item.id, name: item.bs_base_name });
                this.userPassivityJoinBaseDialogVisible = true;
                this.$nextTick(() => {
                  this.$refs.userPassivityJoinBase.init(
                    baseList,
                    this.form.id,
                    2
                  );
                });
              });
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    checkPermission,
    exitBase (bs_user_id, bs_base_id) {
      removeUserBase({ bs_user_id: bs_user_id, bs_base_id: bs_base_id }).then(
        res => {
          if (res.code === 200) {
            this.$message.success("退出成功");
            this.closeInviteDialog();
            this.$refs[bs_base_id].doClose();
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    sizeChange: function (pageSize) {
      // 每页条数切换
      this.shareForm.pageSize = pageSize;
      this.pageChange(this.shareForm.cur_page);
    },
    // 分页
    pageChange (val) {
      this.shareForm.cur_page = val;
      getShareBaseByUserId({
        keyword: this.shareForm.keyword,
        bs_user_id: this.form.id,
        page: this.shareForm.cur_page - 1,
        size: this.shareForm.pageSize
      }).then(res => {
        this.shareForm.list = res.data.content;
        this.shareForm.total = res.data.totalElements;
      });
    },
    noJoinFormPageChange (val) {
      this.noJoinForm.cur_page = val;
      getUserNoJoinBase({
        bs_user_id: this.form.id,
        keyword: this.noJoinForm.keyword,
        keyword: this.noJoinForm.keyword,
        page: this.noJoinForm.cur_page - 1,
        size: this.noJoinForm.pageSize
      }).then(res => {
        this.noJoinForm.list = res.data.content;
        this.noJoinForm.total = res.data.totalElements;
      });
    },
    getBaseRole (deptId) {
      this.form.filtration = deptId;
      this.form.baseRole = [];
      getBaseRole({ org_id: deptId })
        .then(res => {
          this.baseRoleOptions = res.data;
          if (this.form.dept === this.$store.state.baseinfo.implement_org_id) {
            this.$set(this.form, "baseRole", [
              [res.data[0].value, res.data[0].children[0].value]
            ]);
          }
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    deptChange (value) {
      this.form.orgManage = "B";
      this.getBaseRole(value);
      this.form.updateRoleByDeptId = value;
    },
    orgManageChange () {
      if (!this.form.updateRoleByDeptId) {
        this.form.updateRoleByDeptId = this.form.dept;
      }
    },
    baseRoleChange () {
      if (!this.form.updateRoleByDeptId) {
        this.form.updateRoleByDeptId = this.form.dept;
      }
    },
    cancel () {
      this.resetForm();
    },
    doSubmit () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (!this.form.phone) {
            this.$message.error("请输入电话号码");
            return;
          } else if (!this.isvalidPhone(this.form.phone)) {
            this.$message.error("请输入正确的11位手机号码");
            return;
          }
          if (this.form.email !== null && this.form.email.trim() === "") {
            this.form.email = null;
          }
          if (this.form.dept === null || this.form.dept === undefined) {
            this.$message({
              message: "组织不能为空",
              type: "warning"
            });
          } else {
            this.form.bases = [];
            this.form.roles = [];
            const _this = this;

            this.form.baseRole.forEach(function (data, index) {
              data.forEach(function (data2, index2) {
                if (index2 === 0) {
                  _this.form.bases.push(data2);
                }
                if (index2 === 1) {
                  _this.form.roles.push(data2);
                }
              });
            });
            if (this.form.orgManage === "B") {
              // 非组织管理者
              if (this.form.bases.length === 0) {
                this.$message.warning("基地不能为空");
                return false;
              }
              if (this.form.roles.length === 0) {
                this.$message.warning("角色不能为空");
                return false;
              }
            }
            this.loading = true;
            if (this.isAdd) {
              this.doAdd();
            } else this.doEdit();
          }
        } else {
          return false;
        }
      });
    },
    doAdd () {
      if (this.form.email === "") {
        this.form.email = null;
      }
      add(this.form).then(res => {
        if (res.code === 200) {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            message: "默认密码：123456",
            type: "success",
            duration: 2500
          });
          this.sup_this.init();
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      });
    },
    closeDialog () {
      this.sup_this.init();
    },
    doEdit () {
      if (this.form.email === "") {
        this.form.email = null;
      }
      edit(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
        } else {
          this.$message.error(res.msg);
        }
        this.resetForm();
        this.loading = false;
        this.sup_this.init();
      });
    },
    resetForm () {
      this.dialog = false;

      this.$refs["form"].resetFields();
      //this.deptId = null
      //this.roleIds = []
      //this.baseIds = []
      //this.form = { username: '', email: null, enabled: 'true', baseRole: [], roles: [], bases: [], orgManage: 'B', dept: { id: '' }, phone: null, initialized: true }
    },
    getDepts () {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.data.content;
      });
    },
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
      return reg.test(str);
    }
  }
};
</script>

<style scoped>
.dropdownStyle {
  overflow: auto;
  height: 200px;
}
</style>
