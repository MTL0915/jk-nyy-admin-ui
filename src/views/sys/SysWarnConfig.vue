<template>
  <div style="background: #ffffff;">
    <div style="display:flex;">
      <div class="width1 title"><b>消息类型</b></div>
      <div class="width2 title"><b>联系方式</b></div>
      <div class="width3 title"><b>接收人</b></div>
      <div class="width4 title"><b>状态</b></div>
      <div class="width5 title"><b>操作</b></div>
    </div>
    <div
      v-for="(item,index) in sysWarnConfigList"
      :key="index"
      :style="{ background: (index%2===0)?'#F0F9EB':'#FDF5E6' }"
    >
      <div class="width1 title2">{{item.name}}</div>
      <div class="line"></div>
      <div
        v-for="(item2,index2) in item.details"
        :key="index2"
        style="display:flex;margin-top:5px;"
      >
        <div class="width1">{{item2.name}}
          <el-tooltip
            class="item"
            :content="item2.info"
            placement="right"
            effect="light"
            v-if="item2.info"
          >
            <i
              style="color:#168FFF;"
              class="el-icon-question"
            />
          </el-tooltip>
        </div>
        <div class="width2">
          <div v-if="item2.noteSta === 1 || item2.phoneSta === 1 || item2.officialSta === 1">
            <el-tag v-if="item2.noteSta === 1">短信</el-tag>
            <el-tag v-if="item2.phoneSta === 1">电话</el-tag>
            <el-tag v-if="item2.officialSta === 1">公众号</el-tag>
          </div>
          <div v-else>
            \
          </div>
        </div>
        <div class="width3">
          <div v-if="item2.receiveUser">
            <div
              v-for="(item3,index3) in item2.receiveUser.split('|')"
              :key="index3"
            >
              <el-tag>
                {{item3}}
              </el-tag>
            </div>
          </div>
          <div v-else>
            \
          </div>
        </div>
        <div class="width4">
          <el-tag
            v-if="item2.sta === 1"
            type="success"
          >开启</el-tag>
          <el-tag
            v-else
            type="danger"
          >关闭</el-tag>
        </div>
        <div class="width5">
          <el-button
            type="text"
            size="mini"
            @click="changeReceive(item2)"
          >修改接收人</el-button>
          <el-button
            type="text"
            size="mini"
            @click="changeSetting(item2)"
          >配置</el-button>
        </div>
      </div>

    </div>
    <el-dialog
      v-if="changeReceiveUserDialogVisible"
      :visible.sync="changeReceiveUserDialogVisible"
      append-to-body
      title="修改接收人"
      width="1000px"
      @close="updateReceiveUser"
    >
      <div style="display:flex;">
        <div style="width:50%">
          <div
            v-for="(item,index) in sysWarnConfigDetailsUsers"
            :key="index"
          >
            <el-tag
              closable
              @close="deleteSysWarnConfigDetailsUser(item,index)"
            >
              <span v-if="item.userName">{{item.userUsername+'('+item.userName+')'}}</span>
              <span v-else>{{item.userUsername}}</span>
            </el-tag>
          </div>
        </div>
        <div style="width:50%">
          <div style="text-align:right;">
            <el-input
              v-model="userKeyword"
              size="mini"
              style="width:120px;"
            />
            <el-button
              size="mini"
              type="primary"
              @click="userPage=0;getUserList()"
            >搜索</el-button>
          </div>
          <el-table
            :data="userList"
            style="width: 100%"
          >

            <el-table-column
              prop="username"
              label="账号"
              width="180"
            />

            <el-table-column
              prop="name"
              label="姓名"
            />

            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="addSysWarnConfigDetailsUser(scope.row)"
                  type="primary"
                  size="mini"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="userTotal"
            :page-size="userSize"
            :current-page="userPage "
            @current-change="userPageChange"
          />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-if="changeSettingDialogVisible"
      :visible.sync="changeSettingDialogVisible"
      append-to-body
      title="更改配置"
      width="500px"
    >
      <div style="display:flex;margin:15px;">
        <div class="center">{{sysWarnConfigDetails.prefix}}</div>
        <div class="center">
          <el-input
            v-model="sysWarnConfigDetails.value"
            size="mini"
            style="width:100px"
          />
        </div>
        <div class="center">{{sysWarnConfigDetails.suffix}}</div>
        <div class="center">
          <el-switch
            v-model="sysWarnConfigDetails.sta"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            style="margin-left: 15px;"
          >
          </el-switch>
        </div>
      </div>
      <div style="display:flex;margin:15px;">
        <div>
          通知方式：
        </div>
        <div>
          <el-checkbox
            v-model="sysWarnConfigDetails.noteSta"
            :true-label="1"
            :false-label="0"
          >短信</el-checkbox>
          <el-checkbox
            v-model="sysWarnConfigDetails.phoneSta"
            :true-label="1"
            :false-label="0"
          >电话</el-checkbox>
          <el-checkbox
            v-model="sysWarnConfigDetails.officialSta"
            :true-label="1"
            :false-label="0"
          >公众号</el-checkbox>
        </div>
      </div>
      <div style="text-align:right;">
        <el-button
          type="primary"
          size="mini"
          @click="saveSetting()"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { listSysWarnConfig, updateSysWarnConfigDetails, listSysWarnConfigDetailsUser, addSysWarnConfigDetailsUser, deleteSysWarnConfigDetailsUser, getSysWarnConfigDetails } from '@/api/sys_warn_config'
import { userList as getUserList } from '@/api/user'

export default {
  data () {
    return {
      sysWarnConfigList: [],//预警配置列表
      changeSettingDialogVisible: false,//更改配置弹窗
      sysWarnConfigDetails: null,//预警配置详情
      sysWarnConfigDetailsUsers: [],//预警配置详情关联通知用户列表
      userList: [],//用户列表
      userTotal: 0,//总条数
      userPage: 0,//页数
      userSize: 10,//页码
      userKeyword: null,//查询用户列表关键词
      changeReceiveUserDialogVisible: false,//更改接收人弹窗
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //初始化
    init () {
      this.listSysWarnConfig()
    },
    //更新关联用户
    updateReceiveUser () {
      getSysWarnConfigDetails({
        sysWarnConfigDetailsId: this.sysWarnConfigDetails.id
      }).then(res => {
        if (res.code === 200) {
          this.updateList(res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //翻页
    userPageChange (val) {
      this.userPage = val
      this.getUserList()
    },
    //获取用户列表
    getUserList () {
      getUserList({
        keyword: this.userKeyword,
        page: this.userPage,
        size: this.userSize
      }).then(res => {
        if (res.code === 200) {
          this.userList = res.data.content
          this.userTotal = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //添加通知用户
    addSysWarnConfigDetailsUser (item) {
      addSysWarnConfigDetailsUser({
        sysWarnConfigDetailsId: this.sysWarnConfigDetails.id,
        userId: item.id
      }).then(res => {
        if (res.code === 200) {
          this.sysWarnConfigDetailsUsers.push({
            id: res.data,
            userId: item.id,
            userName: item.name,
            userUsername: item.username
          })
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //删除通知用户
    deleteSysWarnConfigDetailsUser (item, index) {
      deleteSysWarnConfigDetailsUser({
        id: item.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.sysWarnConfigDetailsUsers.splice(index, 1)
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //获取配置信息
    listSysWarnConfig () {
      listSysWarnConfig().then(res => {
        if (res.code === 200) {
          this.sysWarnConfigList = res.data
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //点击更改接收人
    changeReceive (item) {
      listSysWarnConfigDetailsUser({
        sysWarnConfigDetailsId: item.id
      }).then(res => {
        if (res.code === 200) {
          this.sysWarnConfigDetailsUsers = res.data
          this.userPage = 0
          this.getUserList()
          this.sysWarnConfigDetails = JSON.parse(JSON.stringify(item))
          this.changeReceiveUserDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //点击更改设置
    changeSetting (item) {
      this.sysWarnConfigDetails = JSON.parse(JSON.stringify(item))
      this.changeSettingDialogVisible = true
    },
    //保存设置
    saveSetting () {
      updateSysWarnConfigDetails(
        this.sysWarnConfigDetails
      ).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.updateList(res.data)
          this.changeSettingDialogVisible = false
        } else {
          this.$message.error(res.msg)
          this.changeSettingDialogVisible = false
        }
      })
    },
    //更改成功刷新列表
    updateList (data) {
      for (let i = 0; i < this.sysWarnConfigList.length; i++) {
        for (let j = 0; j < this.sysWarnConfigList[i].details.length; j++) {
          if (this.sysWarnConfigList[i].details[j].code === data.code) {
            this.sysWarnConfigList[i].details[j] = data
          }
        }
      }
      this.$forceUpdate()
    },
  }
}
</script>
<style scoped>
.width1 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width2 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width3 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width4 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width5 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.title {
  font-size: 22px;
  padding: 15px;
  background: #fafafa;
}

.title2 {
  font-size: 18px;
  padding: 15px;
}

.line {
  width: 100%;
  height: 1px;
  background: rgb(203 207 211);
}

.center {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>