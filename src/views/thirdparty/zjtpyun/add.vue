<template>
  <div>
    <el-steps :active="step">
      <el-step
        title="登录"
        description="请输入托普云农的账号密码"
      ></el-step>
      <el-step
        title="选择基地"
        description="选取某个基地，获取基地下的终端列表"
      ></el-step>
      <el-step
        title="选择终端"
        description="选取某个终端，获取终端下的设备列表"
      ></el-step>
      <el-step
        title="选择设备"
        description="将设备添加到出厂表中"
      ></el-step>
    </el-steps>
    <div
      v-show="step===1"
      style="text-align:center;"
    >
      <div>
        账号：
        <el-input
          v-model="user_name"
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
      v-show="step===2"
      style="margin-top:15px;"
    >
      <el-table
        :data="stationList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="longitude"
          label="经度"
        />
        <el-table-column
          prop="latitude"
          label="纬度"
        />
        <el-table-column
          prop="station_id"
          label="站点编号"
        />
        <el-table-column
          prop="unit_id"
          label="单位ID"
        />
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="chooseStation(scope.row.station_id)"
              type="primary"
              size="mini"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-show="step===3"
      style="margin-top:15px;"
    >
      <el-table
        :data="stationTerminalList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="终端名称"
        />
        <el-table-column label="终端类型">
          <template slot-scope="scope">
            {{getStationTerminalType(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="serialNum"
          label="终端序列号"
        />
        <el-table-column
          prop="terminalId"
          label="终端ID"
        />
        <el-table-column
          prop="status"
          label="终端状态"
        >
          <template slot-scope="scope">
            {{scope.row.status===1?'离线':'在线'}}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="chooseStationTerminal(scope.row.terminalId)"
              type="primary"
              size="mini"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-show="step===4"
      style="margin-top:15px;"
    >
      <el-table
        :data="terminalDeviceList"
        style="width: 100%"
      >
        <el-table-column
          prop="deviceName"
          label="设备名称"
        />
        <el-table-column label="设备类型">
          <template slot-scope="scope">
            {{getDeviceType(scope.row.deviceTypeId)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="serialNum"
          label="终端序列号"
        />
        <el-table-column
          prop="stationId"
          label="基地编号"
        />
        <el-table-column
          prop="status"
          label="终端状态"
        >
          <template slot-scope="scope">
            {{scope.row.status===1?'离线':'在线'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sensorTag"
          label="传感器编号"
        />
        <el-table-column
          prop="sensorTypeId"
          label="传感器类型编号"
        />
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              :disabled="canAdd(scope.row.deviceTypeId)"
              type="primary"
              size="mini"
              @click="addDevice(scope.row)"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
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
          <div style="margin-top:15px;">
            设备序列号:
            <el-input
              size="mini"
              style="width:300px;"
              v-model="device_id_suffix"
            >
              <template slot="prepend">{{device_id_prefix}}</template>
            </el-input>
          </div>
          <div style="margin-top:15px;">设备序列号为空时,系统将为其自动生成序列号</div>
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
    <el-button
      icon="el-icon-arrow-left"
      style="margin-top:15px;"
      v-show="step!==1"
      type="primary"
      size="mini"
      @click="step--"
    >上一步</el-button>
  </div>
</template>
<script>
import { stationList, stationTerminallist, terminalDevice, add } from '@/api/zjtpyun'

export default {
  data () {
    return {
      step: 1,
      user_name: 'nnwm',
      password: '123456',
      name: '',
      device_id_prefix: '',
      device_id_suffix: '',
      device_id: '',
      station_id: null,
      terminal_id: null,
      deviceSerial: null,
      zjtpyun_device_type_id: null,
      zjtpyun_device_name: null,
      zjtpyun_serial_num: null,
      loginLoading: false,
      stationList: [],//基地列表
      stationCount: 0,//基地数量
      stationTerminalList: [],//终端列表
      terminalDeviceList: [],//设备列表
      addDeviceVisible: false,
    }
  },
  methods: {
    save () {
      if (this.device_id_suffix !== '') {
        this.device_id = this.device_id_prefix + this.device_id_suffix
      }
      add({
        name: this.name,
        device_id: this.device_id,
        user_name: this.user_name,
        password: this.password,
        station_id: this.station_id,
        terminal_id: this.terminal_id,
        deviceSerial: this.deviceSerial,
        zjtpyun_device_type_id: this.zjtpyun_device_type_id,
        zjtpyun_device_name: this.zjtpyun_device_name,
        zjtpyun_serial_num: this.zjtpyun_serial_num
      }).then(res => {
        this.addDeviceVisible = false
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addDevice (row) {
      if (row.deviceTypeId === 3) {
        this.device_id_prefix = 'CQ01A-'
        this.device_id_suffix = ''
        this.device_id = ''
      } else {
        this.$message.error('暂不支持添加该类型设备')
        return
      }
      this.name = row.deviceName
      this.deviceSerial = row.deviceId
      this.zjtpyun_device_type_id = row.deviceTypeId
      this.zjtpyun_device_name = row.deviceName
      this.zjtpyun_serial_num = row.serialNum
      this.addDeviceVisible = true
    },
    login () {
      this.loginLoading = true
      stationList({ user_name: this.user_name, password: this.password }).then(res => {
        this.loginLoading = false
        if (res.code === 200) {
          this.stationList = res.data.datalist
          this.stationCount = res.data.count
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    chooseStation (station_id) {
      stationTerminallist({ user_name: this.user_name, password: this.password, station_id: station_id }).then(res => {
        if (res.code === 200) {
          this.station_id = station_id
          this.stationTerminalList = res.data
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    canAdd (type) {
      if (type === 3) {//只对接了虫情测报灯
        return false
      } else {
        return true
      }
    },
    chooseStationTerminal (terminal_id) {
      terminalDevice({ user_name: this.user_name, password: this.password, terminal_id: terminal_id }).then(res => {
        if (res.code === 200) {
          this.terminal_id = terminal_id
          this.terminalDeviceList = res.data
          this.step++
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDeviceType (type) {
      if (type === 1) {
        return '控制设备'
      } else if (type === 2) {
        return '传感器'
      } else if (type === 3) {
        return '虫情测报灯'
      } else if (type === 4) {
        return '孢子捕捉仪(旧)'
      } else if (type === 5) {
        return '苗情摄像机'
      } else if (type === 6) {
        return '墒情图像'
      } else if (type === 7) {
        return '视频设备'
      } else if (type === 8) {
        return '快照设备'
      } else if (type === 9) {
        return '性诱虫情设备'
      } else if (type === 10) {
        return 'modbus水肥设备'
      } else if (type === 11) {
        return '温控库体设备'
      } else if (type === 12) {
        return '联网杀虫灯'
      } else if (type === 13) {
        return '虚拟传感器'
      } else if (type === 14) {
        return '墒情管理设备'
      } else if (type === 15) {
        return '管式墒情管理设备'
      } else if (type === 16) {
        return 'GPRS通用数据采集器'
      } else if (type === 17) {
        return '大棚控制设备'
      } else if (type === 18) {
        return '孢子捕捉仪'
      } else if (type === 19) {
        return 'LED显示屏'
      } else if (type === 20) {
        return '萤石视频设备'
      } else if (type === 21) {
        return '大华DSS视频设备'
      } else if (type === 22) {
        return '海康9800视频设备'
      } else if (type === 23) {
        return '设施农业3.0设备'
      } else if (type === 24) {
        return 'FBox接入设备'
      } else if (type === 25) {
        return 'NBIOT设备'
      } else if (type === 26) {
        return '培养箱设备'
      } else if (type === 27) {
        return '农田排水机设备'
      } else {
        return '未知'
      }
    },
    getStationTerminalType (type) {
      if (type === 1) {
        return '虫情测报灯'
      } else if (type === 2) {
        return '早版本自产墒情'
      } else if (type === 3) {
        return '北京墒情'
      } else if (type === 16) {
        return '公共卫生'
      } else if (type === 17) {
        return '食品安全'
      } else if (type === 18) {
        return '温室通'
      } else if (type === 19) {
        return '温室小管家'
      } else if (type === 20) {
        return '自产墒情'
      } else if (type === 21) {
        return '设施农业2.1(http)'
      } else if (type === 22) {
        return '大田设备'
      } else if (type === 23) {
        return '畜禽养殖'
      } else if (type === 24) {
        return '智能型手持农业环境检测仪'
      } else if (type === 25) {
        return '树木生长仪'
      } else if (type === 32) {
        return '性诱智能害虫测报仪'
      } else if (type === 33) {
        return '设施农业2.1(socket)'
      } else if (type === 34) {
        return '横网式联网杀虫灯'
      } else if (type === 35) {
        return '管式墒情'
      } else if (type === 36) {
        return '风吸式联网杀虫灯'
      } else if (type === 37) {
        return 'GPRS通用数据采集器'
      } else if (type === 38) {
        return '大棚控制器'
      } else if (type === 39) {
        return '孢子捕捉仪'
      } else if (type === 40) {
        return '视频设备终端'
      } else if (type === 41) {
        return '设施农业3.0终端'
      } else if (type === 42) {
        return 'NBIOT终端'
      } else if (type === 43) {
        return '培养箱终端'
      } else if (type === 44) {
        return '玉米株高测量仪'
      } else if (type === 45) {
        return '农田排水机终端'
      } else {
        return '未知'
      }
    }
  }

}
</script>