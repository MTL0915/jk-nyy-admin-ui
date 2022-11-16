<template>
  <div>
    <el-steps :active="step">
      <el-step
        title="获取凭证"
        description="请输入瑞丰的 应用id与应用密匙"
      ></el-step>
      <el-step
        title="登录"
        description="请输入瑞丰的 账号与密码"
      ></el-step>
      <el-step
        title="获取设备列表"
        description="选择需要添加的设备"
      ></el-step>
    </el-steps>
    <div
      v-show="step===1"
      style="text-align:center;"
    >
      <div>
        应用id：
        <el-input
          v-model="appid"
          placeholder="请输入应用id"
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <div>
        应用密匙：
        <el-input
          v-model="appsecret"
          placeholder="请输入应用密匙"
          show-password
          size="mini"
          style="width:300px;margin-top:15px;"
        />
      </div>
      <el-button
        :loading="getTokenLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="getToken"
      >获取</el-button>
    </div>
    <div
      v-show="step===2"
      style="text-align:center;"
    >
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
        :loading="loginLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="login"
      >登录</el-button>
    </div>
    <div
      v-show="step===3"
      style="text-align:center;"
    >
      <el-tabs
        v-model="activeName"
        style="margin-top:15px;"
      >
        <el-tab-pane
          label="虫情测报设备"
          name="first"
        >
          <el-table
            :data="cqDeviceList"
            style="width: 100%"
          >
            <el-table-column
              prop="device_name"
              label="设备名称"
            />
            <el-table-column
              prop="device_number"
              label="设备编号"
            />
            <el-table-column
              prop="device_status"
              label="设备状态"
            >
              <template slot-scope="scope">
                {{scope.row.device_status==='1'?'可用':'停用'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="output_date"
              label="出厂日期"
            />
            <el-table-column
              prop="camera_num"
              label="摄像头编号"
            />
            <el-table-column
              prop="addtime"
              label="添加时间"
            />
            <el-table-column
              prop="baidu_gps"
              label="百度定位"
            />
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addCqdDevice(scope.row)"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="text"
            v-show="cqDevicePage!==1"
            @click="last(1)"
          >上一页</el-button>
          {{cqDevicePage}}
          <el-button
            type="text"
            @click="next(1)"
          >下一页</el-button>
        </el-tab-pane>
        <el-tab-pane
          label="苗情设备"
          name="second"
        >
          <el-table
            :data="miaoqingDeviceList"
            style="width: 100%"
          >
            <el-table-column
              prop="cameraName"
              label="监控点名称"
            />
            <el-table-column
              prop="id"
              label="设备id"
            />
            <el-table-column
              prop="encoderUuid"
              label="编码设备UUID（设备序列号）"
            />
            <el-table-column
              prop="cameraUuid"
              label="监控点UUID"
            />
            <!-- <el-table-column
              prop="area_id"
              label="地块id"
            />
            <el-table-column
              prop="company_id"
              label="公司id"
            /> -->
            <el-table-column
              prop="addtime"
              label="添加时间"
            />
            <!-- <el-table-column
              prop="p_province_id"
              label="省"
            />
            <el-table-column
              prop="p_city_id"
              label="市"
            />
            <el-table-column
              prop="p_area_id"
              label="区"
            /> -->
            <el-table-column
              prop="baidu_gps"
              label="百度定位"
            />
            <el-table-column
              prop="remark"
              label="备注设备名"
            />
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addMqDevice(scope.row)"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="text"
            v-show="miaoqingDevicePage!==1"
            @click="last(2)"
          >上一页</el-button>
          {{miaoqingDevicePage}}
          <el-button
            type="text"
            @click="next(2)"
          >下一页</el-button>
        </el-tab-pane>
        <el-tab-pane
          label="风吸式杀虫灯（旧）"
          name="third"
        >
          <el-table
            :data="shachongdengDeviceList"
            style="width: 100%"
          >
            <el-table-column
              prop="number"
              label="设备编号"
            />
            <el-table-column
              prop="status"
              label="设备状态"
            >
              <template slot-scope="scope">
                {{scope.row.status==='1'?'开启':'关闭'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="run_mode"
              label="工作模式"
            >
              <template slot-scope="scope">
                {{scope.row.run_mode==='1'?'光控':'时控'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="light_status"
              label="设备灯的运行状态"
            >
              <template slot-scope="scope">
                {{scope.row.light_status==='1'?'开灯':'关灯'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="work_date"
              label="工作时间"
            />
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addScdDevice(scope.row)"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="text"
            v-show="shachongdengDevicePage!==1"
            @click="last(3)"
          >上一页</el-button>
          {{shachongdengDevicePage}}
          <el-button
            type="text"
            @click="next(3)"
          >下一页</el-button>
        </el-tab-pane>
        <el-tab-pane
          label="风吸式杀虫灯（新）"
          name="fourthly"
        >
          <el-table
            :data="shachongdengDeviceList2"
            style="width: 100%"
          >
            <el-table-column
              prop="device_number"
              label="设备编号"
            />
            <el-table-column
              prop="name"
              label="设备名称"
            />
            <el-table-column
              prop="power"
              label="电量"
            />
            <el-table-column
              prop="run_mode"
              label="工作模式"
            >
              <template slot-scope="scope">
                {{scope.row.run_mode==='1'?'光控':'时控'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="light_status"
              label="设备灯的运行状态"
            >
              <template slot-scope="scope">
                {{scope.row.light_status==='1'?'开灯':'关灯'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="work_date"
              label="工作时间"
            />
            <el-table-column
              prop="request_interval"
              label="请求时间间隔(分钟)：最低1分钟"
            />
            <el-table-column
              prop="clean_interval"
              label="自动清虫间隔（按天）"
            />
            <el-table-column
              prop="motor_rotation"
              label="电机转动"
            >
              <template slot-scope="scope">
                {{scope.row.motor_rotation==='1'?'转':'停'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="gps_position"
              label="设备GPS定位"
            />

            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addScd2Device(scope.row)"
                >添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="shachongdengDevicePage2"
            :total="shachongdengDeviceTotal2"
            :page-size="size"
            layout="prev, pager, next"
            @current-change="getShachongdengDeviceList2"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      append-to-body
      title="添加到出厂设备"
      :visible.sync="addDeviceVisible"
      v-if="addDeviceVisible"
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
        </div>
      </div>
      <div style="text-align:right;margin-top:15px;">
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { token, login, chongqingDevices, miaoqingDevices, shachongdengDevices, shachongdengDevices2, add } from '@/api/ruifeng'


export default {
  data () {
    return {
      step: 1,
      getTokenLoading: false,
      loginLoading: false,
      appid: '100017',//应用id
      appsecret: 'ed87f7338a5727cb66b703c7102d2bd0',//应用密匙
      username: 'jiankun',//瑞丰账号
      // password: 'jiankun1688',//瑞丰密码
      password: 'jk123456',//瑞丰新密码
      user_id: null,//瑞丰用户id
      name: '',//设备名称
      ruifeng_device_type_id: '',//瑞丰设备类型 cqd虫情灯 mq苗情 scd杀虫灯(旧) scd2杀虫灯(新)
      deviceSerial: '',//瑞丰设备编号
      cqDeviceList: [],
      miaoqingDeviceList: [],
      shachongdengDeviceList: [],
      shachongdengDeviceList2: [],
      cqDevicePage: 1,
      miaoqingDevicePage: 1,
      shachongdengDevicePage: 1,
      shachongdengDevicePage2: 1,
      shachongdengDeviceTotal2: 0,
      size: 10,
      activeName: 'first',
      addDeviceVisible: false,
    }
  },
  methods: {
    save () {
      add({
        name: this.name,
        user_id: this.user_id,
        user_name: this.username,
        password: this.password,
        ruifeng_device_type_id: this.ruifeng_device_type_id,
        appid: this.appid,
        appsecret: this.appsecret,
        deviceSerial: this.deviceSerial,
      }).then(res => {
        this.addDeviceVisible = false
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //上一页
    last (type) {
      if (type === 1) {
        this.cqDevicePage--
        this.getCqDeviceList()
      } else if (type === 2) {
        this.miaoqingDevicePage--
        this.getMiaoqingDeviceList()
      } else if (type === 3) {
        this.shachongdengDevicePage--
        this.getShachongdengDeviceList()
      }
    },
    //下一页
    next (type) {
      if (type === 1) {
        this.cqDevicePage++
        this.getCqDeviceList(true)
      } else if (type === 2) {
        this.miaoqingDevicePage++
        this.getMiaoqingDeviceList(true)
      } else if (type === 3) {
        this.shachongdengDevicePage++
        this.getShachongdengDeviceList(true)
      }
    },
    addCqdDevice (row) {
      this.ruifeng_device_type_id = 'cqd'
      this.deviceSerial = row.device_number
      this.name = row.device_name
      this.addDeviceVisible = true
    },
    addMqDevice (row) {
      this.ruifeng_device_type_id = 'mq'
      this.deviceSerial = row.id
      this.name = row.cameraName
      this.addDeviceVisible = true
    },
    addScdDevice (row) {
      this.ruifeng_device_type_id = 'scd'
      this.deviceSerial = row.number
      this.name = row.number
      this.addDeviceVisible = true
    },
    addScd2Device (row) {
      this.ruifeng_device_type_id = 'scd2'
      this.deviceSerial = row.device_number
      this.name = row.name
      this.addDeviceVisible = true
    },
    getToken () {
      this.getTokenLoading = true
      token({ appid: this.appid, appsecret: this.appsecret }).then(res => {
        this.getTokenLoading = false
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    login () {
      this.loginLoading = true
      login({ appid: this.appid, appsecret: this.appsecret, username: this.username, password: this.password }).then(res => {
        this.loginLoading = false
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.user_id = res.data.user_info.user_id
          this.getCqDeviceList()
          this.getMiaoqingDeviceList()
          this.getShachongdengDeviceList()
          this.getShachongdengDeviceList2()
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getCqDeviceList (fy) {
      chongqingDevices({ appid: this.appid, appsecret: this.appsecret, user_id: this.user_id, page: this.cqDevicePage, size: this.size }).then(res => {
        if (res.code === 200) {
          this.cqDeviceList = res.data
        } else {
          this.$message.error(res.msg)
          if (fy) {
            this.cqDevicePage--
          }
        }
      })
    },
    getMiaoqingDeviceList (fy) {
      miaoqingDevices({ appid: this.appid, appsecret: this.appsecret, user_id: this.user_id, page: this.miaoqingDevicePage, size: this.size }).then(res => {
        if (res.code === 200) {
          this.miaoqingDeviceList = res.data
        } else {
          this.$message.error(res.msg)
          if (fy) {
            this.miaoqingDevicePage--
          }
        }
      })
    },
    //旧协议杀虫灯设备
    getShachongdengDeviceList (fy) {
      shachongdengDevices({ appid: this.appid, appsecret: this.appsecret, user_id: this.user_id, page: this.shachongdengDevicePage, size: this.size }).then(res => {
        if (res.code === 200) {
          this.shachongdengDeviceList = res.data
        } else {
          this.$message.error(res.msg)
          if (fy) {
            this.shachongdengDevicePage--
          }
        }
      })
    },
    //新协议杀虫灯设备
    getShachongdengDeviceList2 () {
      shachongdengDevices2({ appid: this.appid, appsecret: this.appsecret, user_id: this.user_id, page: this.shachongdengDevicePage2, size: this.size }).then(res => {
        if (res.code === 200) {
          this.shachongdengDeviceList2 = res.data.content
          this.shachongdengDeviceTotal2 = res.data.totalElements
        }
      })
    }
  }
}
</script>