<template>
  <div>
    <div
      style="text-align:center;"
      v-show="step===1"
    >
      <div>
        选择：
        <el-select
          v-model="hairuiUser"
          placeholder="请选择"
          value-key="username"
          size="mini"
          @change="hairuiUserChange"
          style="width:300px;margin-top:15px;"
          clearable
        >
          <el-option
            v-for="item in hairuiUserOptions"
            :key="item.username"
            :label="item.username"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        账号：
        <el-input
          v-model="username"
          placeholder="请输入账号"
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <div>
        密码：
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <el-button
        :loading="loading1"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="getInsectList"
      >获取植保设备</el-button>

      <el-button
        :loading="loading1"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="getMonitorList"
      >获取环境监测设备</el-button>
    </div>

    <div v-show="step===2">
      <!-- 由于海睿服务器时间存在问题，经常出错，屏蔽批量添加操作，防止前半部分订阅了，后半部分出现时间戳错误的情况 -->
      <!-- <el-button
        type="primary"
        size="mini"
        @click="batchAdd"
        style="text-align:left;"
        :loading="loading2"
      >
        批量添加
      </el-button> -->

      <!-- 植保类设备 -->
      <div v-show="insectDeviceList.length!==0">
        <el-table
          :data="insectDeviceList"
          style="width: 100%"
          @selection-change="insectHandleSelectionChange"
        >
          <!-- <el-table-column
          type="selection"
          width="55"
        /> -->
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            prop="imei"
            label="imei"
          />
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="showAdd(scope.row)"
              >添加</el-button>
              <el-button
                type="success"
                size="mini"
                @click="subscribeInfo(scope.row)"
              >订阅信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 环境监测类设备 -->
      <div v-show="monitorDeviceList.length!==0">
        <el-table
          :data="monitorDeviceList"
          style="width: 100%"
          @selection-change="monitorHandleSelectionChange"
        >
          <!-- <el-table-column
          type="selection"
          width="55"
        /> -->
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            prop="code"
            label="设备编码"
          />
          <el-table-column
            prop="cycle"
            label="设备采集周期"
          />
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="showAdd(scope.row)"
              >添加</el-button>
              <el-button
                type="success"
                size="mini"
                @click="subscribeInfo(scope.row)"
              >订阅信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div>
      <el-dialog
        append-to-body
        title="添加到出厂设备"
        :visible.sync="addDialogVisible"
        v-if="addDialogVisible"
      >
        <div style="text-align:center;">
          <div style="margin-top:15px;">
            设备名称：
            <el-input
              size="mini"
              style="width:300px;"
              v-model="name"
              clearable
            />
            设备验证码：
            <el-input
              size="mini"
              style="width:300px;"
              v-model="verification_code"
              clearable
            />
          </div>
        </div>
        <div style="text-align:right;margin-top:15px;">
          <el-button
            type="primary"
            size="mini"
            @click="save"
            :loading="loading2"
          >确定添加</el-button>
        </div>
      </el-dialog>
      <el-dialog
        append-to-body
        :title="name+'订阅信息'"
        :visible.sync="subscribeInfoDialogVisible"
        v-if="subscribeInfoDialogVisible"
      >
        <el-button
          type="primary"
          size="mini"
          @click="showAddSubscribe"
        >
          新增订阅
        </el-button>
        <el-table
          :data="subscribeInfoList"
          style="width: 100%"
        >
          <el-table-column
            prop="url"
            label="订阅网址"
          />
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="removeSubscribe(scope.row,scope.$index)"
              >
                删除订阅
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        append-to-body
        title="新增订阅"
        :visible.sync="addSubscribeDialogVisible"
        v-if="addSubscribeDialogVisible"
      >
        <el-input
          v-model="addSubscribeUrl"
          style="width:90%;"
          clearable
          size="mini"
        />
        <el-button
          type="primary"
          size="mini"
          @click="addSubscribe()"
        >
          确定
        </el-button>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import {
  insectList, monitorList,//设备列表
  insectSubscribelist, monitorSubscribelist,//订阅信息列表
  addSubscribe,//增加订阅
  removeSubscribeById, removeSubscribeByDeviceserialAndUrl,//删除订阅
} from '@/api/hairui'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      step: 1,
      username: null,
      password: null,
      loading1: false,
      loading2: false,
      insectDeviceList: [],//植保类设备列表
      monitorDeviceList: [],//环境监测类设备列表
      insectMultipleSelection: [],//植保类设备勾选
      monitorMultipleSelection: [],//环境监测类设备勾选
      deviceSerial: null,
      name: null,
      hrImei: null,
      hrCode: null,
      hrCycle: null,
      verification_code: 'A12345',
      addDialogVisible: false,
      subscribeInfoList: [],//订阅信息列表
      addSubscribeUrl: null,//新增订阅网址
      subscribeInfoDialogVisible: false,
      addSubscribeDialogVisible: false,
      hairuiUser: null,//海睿用户
      hairuiUserOptions: [//海睿用户数组
        {
          username: '健坤网络',
          password: '888888',
        },
        {
          username: '茂名移动',
          password: '888888',
        },
        {
          username: '广州建通测绘地理信息技术股份有限公司',
          password: '888888',
        },
      ],
      type: null,//海睿设备类型
    }
  },
  methods: {
    //选中海睿用户
    hairuiUserChange () {
      if (this.hairuiUser) {
        this.username = this.hairuiUser.username
        this.password = this.hairuiUser.password
      } else {
        this.username = null
        this.password = null
      }
    },
    //获取植保类设备
    getInsectList () {
      this.loading1 = true
      insectList({
        username: this.username,
        password: this.password
      }).then(res => {
        this.loading1 = false
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.$message.warning('无该类型设备')
            return
          }
          this.type = 'zb'
          this.$message.success(res.msg)
          this.step = 2
          this.insectDeviceList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //获取环境监测类设备
    getMonitorList () {
      this.loading1 = true
      monitorList({
        username: this.username,
        password: this.password
      }).then(res => {
        this.loading1 = false
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.$message.warning('无该类型设备')
            return
          }
          this.type = 'qx'
          this.$message.success(res.msg)
          this.step = 2
          this.monitorDeviceList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //植保 table 勾选触发
    insectHandleSelectionChange (val) {
      this.insectMultipleSelection = val
    },
    //环境监测 table 勾选触发
    monitorHandleSelectionChange (val) {
      this.monitorMultipleSelection = val
    },
    //展示添加弹窗
    showAdd (row) {
      if ('zb' === this.type) {//植保设备
        this.name = 'HR植保设备:' + row.name
        this.hrImei = row.imei
      } else if ('qx' === this.type) {//环境监控设备
        this.name = 'HR环境监测设备:' + row.name
        this.hrCode = row.code
        this.hrCycle = row.cycle
      }
      this.deviceSerial = row.id
      this.addDialogVisible = true
    },
    //将设备添加到出厂表
    save () {
      let list = []
      list.push({
        name: this.name,
        verification_code: this.verification_code,
        username: this.username,
        password: this.password,
        deviceSerial: this.deviceSerial,
        imei: this.hrImei,
        code: this.hrCode,
        cycle: this.hrCycle,
        type: this.type,
      })
      this.addFactoryDevice(list)
    },
    //调用添加到出厂表接口
    addFactoryDevice (list) {
      this.loading2 = true
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hairui/add', list, config).then(res => {
        this.loading2 = false
        if (res.data.code === 200) {
          this.addDialogVisible = false
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //批量添加
    batchAdd () {
      let length = 0
      if (this.type === 'zb') {
        this.insectMultipleSelection.length
      } else if (this.type === 'qx') {
        this.monitorMultipleSelection.length
      } else {
        this.$message.error('暂不支持该类型设备添加')
      }

      if (length === 0) {
        this.$message.error("请选择需要添加的设备!");
        return false;
      }

      let list = []
      for (let i = 0; i < length; i++) {
        let device = null
        let name = null
        if (this.type === 'zb') {
          device = this.insectMultipleSelection[i]
          name = ('HR植保设备:' + device.name)
        } else if (this.type === 'qx') {
          device = this.monitorMultipleSelection[i]
          name = ('HR环境监测设备:' + device.name)
        }
        list.push({
          name: name,
          verification_code: 'A12345',
          username: this.username,
          password: this.password,
          deviceSerial: device.id,
          imei: device.imei,
          code: device.code,
          cycle: device.cycle,
          type: this.type,
        })
      }
      this.addFactoryDevice(list)
    },
    //展示新增订阅弹窗
    showAddSubscribe () {
      this.addSubscribeDialogVisible = true
    },
    //获取设备订阅信息
    subscribeInfo (row) {
      if (this.type === 'zb') {
        insectSubscribelist({
          username: this.username,
          password: this.password,
          deviceSerial: row.id
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.deviceSerial = row.id
            this.name = row.name
            this.subscribeInfoDialogVisible = true
            this.subscribeInfoList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.type === 'qx') {
        monitorSubscribelist({
          username: this.username,
          password: this.password,
          deviceSerial: row.id
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.deviceSerial = row.id
            this.name = row.name
            this.subscribeInfoDialogVisible = true
            this.subscribeInfoList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    //新增订阅
    addSubscribe () {
      addSubscribe({
        username: this.username,
        password: this.password,
        deviceSerial: this.deviceSerial,
        url: this.addSubscribeUrl,
        type: this.type
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.addSubscribeDialogVisible = false
          this.subscribeInfoList.push({
            url: this.addSubscribeUrl
          })
          this.addSubscribeUrl = null
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //删除订阅
    removeSubscribe (row, index) {
      if (row.id) {
        removeSubscribeById({
          username: this.username,
          password: this.password,
          subscribeId: row.id,
          type: this.type
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.subscribeInfoList.splice(index, 1);
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        removeSubscribeByDeviceserialAndUrl({
          username: this.username,
          password: this.password,
          deviceSerial: this.deviceSerial,
          url: row.url,
          type: this.type
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.subscribeInfoList.splice(index, 1);
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
}
</script>
