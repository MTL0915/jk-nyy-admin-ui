<template>
  <div>
    <div v-if="step === 1">
      <el-table
        :data="stationList"
        style="width: 100%"
      >
        <el-table-column
          prop="station_name"
          label="基地名称"
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
          prop="address"
          label="地址"
        />

        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
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
    <div v-if="step === 2">
      <div style="text-align:right">
        <el-button
          type="primary"
          size="mini"
          @click="batchAdd"
        >
          批量添加
        </el-button>
      </div>
      <el-table
        :data="terminalList"
        :key="terminalListKey"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>

        <el-table-column label="终端名称">
          <template slot-scope="scope">
            <div>
              <el-input
                v-model="scope.row.name"
                size="mini"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="验证码">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.verification_code"
              size="mini"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="longitude"
          label="经度"
        />

        <el-table-column
          prop="latitude"
          label="纬度"
        />

        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="addTerminal(scope.row)"
              type="primary"
              size="mini"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getUserStationList, getUserTerminalList, add } from '@/api/zjtpyunGdhk'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      step: 1,
      stationList: [],//基地列表
      terminalList: [],//终端列表
      multipleSelection: [],
      terminalListKey: Math.random()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getUserStationList()
    },
    //获取用户拥有基地列表
    getUserStationList () {
      getUserStationList().then(res => {
        if (res.code === 200) {
          this.stationList = res.data.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //选择基地
    chooseStation (station_id) {
      this.station_id = station_id
      getUserTerminalList({
        station_id: station_id
      }).then(res => {
        if (res.code === 200) {
          this.step = 2
          let list = res.data.result
          for (let i = 0; i < list.length; i++) {
            list[i].verification_code = 'A12345'
            list[i].zjtpyun_device_name = list[i].name
            list[i].zjtpyun_serial_num = list[i].serial_num
            list[i].zjtpyun_device_type_id = list[i].type
          }
          this.terminalList = list
          this.terminalListKey = Math.random()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //添加终端
    addTerminal (row) {
      let list = []
      list.push(row)
      this.add(list)
    },
    //多选
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    //批量添加
    batchAdd () {
      if (this.multipleSelection === null || this.multipleSelection.length === 0) {
        this.$message.error('未选择设备')
        return
      }
      this.add(this.multipleSelection)
    },
    //调用添加接口
    add (list) {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/zjtpyunGdhk/add', list, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
  }
}
</script>
