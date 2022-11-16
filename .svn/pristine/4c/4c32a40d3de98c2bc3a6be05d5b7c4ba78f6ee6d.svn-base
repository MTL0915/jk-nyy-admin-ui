<template>
  <div>
    <div style="text-align:center;">
      <div>
        设备名称：
        <el-input
          v-model="name"
          size="mini"
          style="width:300px;margin-top:15px;"
          clearable
        />
      </div>

      <div>
        设备验证码：
        <el-input
          v-model="verification_code"
          size="mini"
          style="width:300px;margin-top:15px;"
          clearable
        />
      </div>

      <div style="margin-top: 26px;">
        <div style="margin-left:10px;text-align:left;">
          <el-button
            type="primary"
            size="small"
            @click="addChannel"
          >增加</el-button>
        </div>
        <el-table
          :data="channelConfigList"
          style="width: 100%;"
        >
          <el-table-column
            label="传感器名称"
            prop="name"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="传感器类型"
            prop="hd_sensor_type_code"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.hd_sensor_type_code"
                placeholder="请选择"
                size="small"
                style="width:150px"
                filterable
              >
                <el-option
                  v-for="item in sensorTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            label="营养液元素监测仪编号"
            prop="deviceSerial"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.deviceSerial"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="样品标记名称"
            prop="sign"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.sign"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="copyChannel(scope.row)"
              >
                复制
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteChannel(scope.row,scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="营养液元素监测仪账号"
            fixed
            width="150px"
            prop="username"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.username"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="营养液元素监测仪密码"
            fixed
            width="150px"
            prop="password"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.password"
                size="small"
              />
            </template>
          </el-table-column> -->

        </el-table>
        <div style="margin-top:15px;">
          <el-button
            type="primary"
            @click="save"
          >
            保存
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

import { find as findSensorType } from '@/api/hd_sensor_type'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      filtrationSensorCodes: [
        '80',
        '81',
        '82',
      ],//过滤传感器code
      sensorTypeList: [],//传感器类型
      name: '营养液元素监测仪',
      verification_code: 'A12345',
      channelConfigList: [],//传感器配配置
    }
  },
  created () {
    findSensorType({
      code: this.filtrationSensorCodes.join(','),
      page: 1,
      size: 999
    }).then(res => {

      this.sensorTypeList = res.data.content
    })
  },
  methods: {
    //新增通道
    addChannel () {
      this.channelConfigList.push({
        name: null,
        hd_sensor_type_code: null,
        deviceSerial: null,
        sign: null,
      })
    },
    //复制通道
    copyChannel (row) {
      const newRow = JSON.parse(JSON.stringify(row))
      this.channelConfigList.push(newRow)
    },
    //删除通道
    deleteChannel (row, index) {
      this.$delete(this.channelConfigList, index)
    },
    //新增设备
    save () {
      if (!this.name) {
        this.$message.error('请输入设备名称')
      }
      if (!this.verification_code) {
        this.$message.error('请输入设备验证码')
      }
      if (!this.channelConfigList || this.channelConfigList.length === 0) {
        this.$message.error('传感器配配置不能为空')
      }

      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      const addBean = {
        name: this.name,
        verification_code: this.verification_code,
        channelConfigList: this.channelConfigList
      }
      this.$axios.post(process.env.BASE_API + '/yingyangye/add', addBean, config).then(res => {

        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })

    },
  }
}
</script>
