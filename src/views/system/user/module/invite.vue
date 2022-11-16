<template>
  <el-dialog
    :visible.sync="dialog"
    append-to-body
    title="邀请用户加入基地"
    width="580px"
    @close="cancel"
  >
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="用户名搜索" name="tab_username">
        <el-input v-model="search_username" />
      </el-tab-pane>
      <el-tab-pane label="手机号搜索" name="tab_phone">
        <el-input v-model="search_phone" />
      </el-tab-pane>
    </el-tabs>
    <div style="display:flex;flex-wrap: wrap;padding-top:20px;">
      <div
        v-for="(item, index) in userList"
        :key="index"
        style="display:flex;flex-wrap: wrap;width:250px;padding:5px;"
      >
        <div>
          <img :src="item.avatar" width="50px" height="50px" />
        </div>
        <div style="padding-left:10px;">
          <div style="padding-bottom:3px;">账号：{{ item.username }}</div>
          <div style="padding-bottom:3px;">名称：{{ item.name }}</div>
          <div style="text-align: right;">
            <el-button
              type="primary"
              round
              size="mini"
              @click="inviteUser(item)"
              >+邀请</el-button
            >
            <!-- 超级管理员可直接拉入基地 -->
            <el-button
              v-if="$store.state.baseinfo.cur_user_level === 1"
              type="success"
              round
              size="mini"
              @click="dragUser(item)"
              >+拉入</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      v-show="total > 0"
      :total="total"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <!-- <inviteAllotRole ref="inviteAllotRole" /> -->
    <el-dialog
      append-to-body
      :visible.sync="userPassivityJoinBaseDialogVisible"
      title="加入基地配置"
      width="1000px"
    >
      <userPassivityJoinBase ref="userPassivityJoinBase" />
    </el-dialog>
  </el-dialog>
</template>

<script>
import { searchUser, setUserBecomeAdmin } from "@/api/user";
// import inviteAllotRole from './inviteAllotRole'
import userPassivityJoinBase from "./userPassivityJoinBase";
import { checkOrgAdmin } from "@/api/dept";
import { getById } from "@/api/baseInfo";

export default {
  components: {
    // inviteAllotRole
    userPassivityJoinBase
  },
  data() {
    return {
      userPassivityJoinBaseDialogVisible: false,
      total: 0,
      pageSize: 6,
      cur_page: 1,
      searchType: "type_username",
      activeName: "tab_username",
      dialog: false,
      search_username: "",
      search_phone: "",
      userList: []
    };
  },
  watch: {},
  created() {},
  props: {
    to_base_id: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 邀请用户加入基地
    inviteUser(item) {
      let baseList = [];
      let bid = this.to_base_id
        ? this.to_base_id
        : this.$store.state.baseinfo.cur_base_id;
      getById({ bs_base_id: bid }).then(res => {
        if (res.code === 200) {
          baseList.push({ id: bid, name: res.data.name });
          this.userPassivityJoinBaseDialogVisible = true;
          this.$nextTick(() => {
            this.$refs.userPassivityJoinBase.init(baseList, item.id, 1);
          });
        } else {
          this.$message.error(res.msg);
        }
      });

      // this.$refs.inviteAllotRole.show(this.to_base_id ? this.to_base_id : this.$store.state.baseinfo.cur_base_id, item.id, item.dept_id, item.dept_name, 1)
    },
    // 将用户拉入组织(无需用户同意邀请)
    dragUser(item) {
      checkOrgAdmin({
        bs_base_id: this.to_base_id
          ? this.to_base_id
          : this.$store.state.baseinfo.cur_base_id
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            // this.$refs.inviteAllotRole.show(
            //   this.to_base_id
            //     ? this.to_base_id
            //     : this.$store.state.baseinfo.cur_base_id,
            //   item.id,
            //   item.dept_id,
            //   item.dept_name,
            //   2
            // );
            let baseList = [];
            let bid = this.to_base_id
              ? this.to_base_id
              : this.$store.state.baseinfo.cur_base_id;
            getById({ bs_base_id: bid }).then(res => {
              if (res.code === 200) {
                baseList.push({ id: bid, name: res.data.name });
                this.userPassivityJoinBaseDialogVisible = true;
                this.$nextTick(() => {
                  this.$refs.userPassivityJoinBase.init(baseList, item.id, 2);
                });
              } else {
                this.$message.error(res.msg);
              }
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
                  bs_base_id: this.to_base_id
                    ? this.to_base_id
                    : this.$store.state.baseinfo.cur_base_id,
                  bs_user_id: item.id
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
                let bid = this.to_base_id
                  ? this.to_base_id
                  : this.$store.state.baseinfo.cur_base_id;
                getById({ bs_base_id: bid }).then(res => {
                  if (res.code === 200) {
                    baseList.push({ id: bid, name: res.data.name });
                    this.userPassivityJoinBaseDialogVisible = true;
                    this.$nextTick(() => {
                      this.$refs.userPassivityJoinBase.init(
                        baseList,
                        item.id,
                        2
                      );
                    });
                  } else {
                    this.$message.error(res.msg);
                  }
                });
                // this.$refs.inviteAllotRole.show(
                //   this.to_base_id
                //     ? this.to_base_id
                //     : this.$store.state.baseinfo.cur_base_id,
                //   item.id,
                //   item.dept_id,
                //   item.dept_name,
                //   2
                // );
              });
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    sizeChange: function(pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.pageChange(this.cur_page);
    },
    // 分页
    pageChange(val) {
      this.cur_page = val;
      this.searchUser(
        this.search_username,
        this.search_phone,
        this.cur_page,
        this.pageSize
      );
    },
    // 切换Tab
    tabClick() {
      this.username = "";
      this.phone = "";
      if (this.activeName === "tab_username") {
        this.searchType = "type_username";
      } else if (this.activeName === "tab_phone") {
        this.searchType = "type_phone";
      } else {
        this.$message.error("无此搜索方式！");
      }
    },
    // 搜索用户接口（用户名、电话）
    searchUser(username, phone, page, size) {
      var path = process.env.IMG_URL;
      searchUser({
        username: username,
        phone: phone,
        page: page,
        size: size
      }).then(res => {
        if (res.code === 200) {
          if (res.data.content.length === 0) {
            this.$message.warning("没有找到搜索的用户，请重新尝试！");
            return false;
          } else {
            res.data.content.map((v, i) => {
              if (v.avatar) {
                if (
                  v.avatar.indexOf("http") === -1 &&
                  v.avatar.indexOf("https") === -1
                ) {
                  v.avatar = path + v.avatar;
                }
              }
            });
            this.userList = res.data.content;
            this.total = res.data.totalElements;
          }
        } else {
          this.$message.error(res.msg);
          return false;
        }
      });
    },
    // 点击搜索
    search() {
      if (this.activeName === "tab_username") {
        if (this.search_username === "" || this.search_username === null) {
          this.$message.warning("请输入用户名");
          return false;
        }
        this.search_phone = "";
        this.searchUser(this.search_username, null, 1, this.pageSize);
      } else if (this.activeName === "tab_phone") {
        if (this.search_phone === "" || this.search_phone === null) {
          this.$message.warning("请输入电话号码");
          return false;
        }
        this.search_username = "";
        this.searchUser(null, this.search_phone, 1, this.pageSize);
      }
    },
    // 关闭弹窗
    cancel() {
      this.activeName = "tab_username";
      this.cur_page = 1;
      this.total = 0;
      this.userList = [];
      this.search_username = "";
      this.search_phone = "";
      this.dialog = false;
    }
  }
};
</script>

<style></style>
