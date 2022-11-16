<template>
  <div>
    <div style="display: flex;align-items: center;">
      <div style="padding: 10px;">
        <el-button
          size="mini"
          type="primary"
          @click="addUser()"
        >添加人员</el-button>
      </div>
      <div
        v-show="showPhoneNote"
        style="position: absolute;right:10px"
      >
        <div style="margin:10px;">
          开启设备异常短信通知
          <el-switch
            v-model="note_value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateDeviceNote"
          />
        </div>
        <div style="margin:10px;">
          开启设备异常电话通知
          <el-switch
            v-model="phone_value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateDevicePhone"
          />
        </div>
      </div>
    </div>
    <el-table
      :data="data"
      size="small"
      style="width: 100%;"
    >
      <el-table-column
        prop="user_username"
        label="账号"
      />
      <el-table-column
        prop="user_name"
        label="姓名"
      />
      <el-table-column
        v-if="showPhoneNote"
        label="开启异常短信通报"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.note_value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="noteChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showPhoneNote"
        label="开启异常电话通报"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.phone_value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="phoneChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-popover
            v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_DELETE']"
            :ref="scope.row.user_id"
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.user_id].doClose()"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="subDelete(scope.row)"
              >确定</el-button>
            </div>
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      background
      layout="total, sizes,prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <deviceUser ref="deviceUser" />
  </div>
</template>
<script>

import { getDeviceUserByDeviceId, updateDeviceConfigJsonInteger } from '@/api/device'
import deviceUser from './deviceUser'
import { getToken } from '@/utils/auth'
import { getDetailById } from '@/api/equip'

export default {
  components: { deviceUser },
  props: {
    showPhoneNote: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      phone_value: true,
      note_value: true,
      hd_device_id: '',
      data: [],
      total: 0,
      pageSize: 10,
      cur_page: 1,
      dialogVisible: false
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    addUser () {
      this.$refs.deviceUser.getList(this.hd_device_id)
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      getDeviceUserByDeviceId(this.hd_device_id, this.cur_page, this.pageSize)
    },
    // 修改设备短信开关
    updateDeviceNote () {
      var value = 1
      if (!this.note_value) {
        value = 0
      }
      updateDeviceConfigJsonInteger({ hd_device_id: this.hd_device_id, name: 'note_sta', value: value }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        } else {

          this.note_value = !this.note_value

          this.$message.error(res.msg)
        }
      })
    },
    // 修改设备电话开关
    updateDevicePhone () {
      var value = 1
      if (!this.phone_value) {
        value = 0
      }
      updateDeviceConfigJsonInteger({ hd_device_id: this.hd_device_id, name: 'phone_sta', value: value }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.phone_value = !this.phone_value
          this.$message.error(res.msg)
        }
      })
    },
    // 删除用户设备关联
    subDelete (row) {
      this.updateDevicePermission(row.user_id, row.device_id, row.phone_sta, row.note_sta, null)
    },
    // 修改设备用户短信开关
    noteChange (row) {
      if (row.note_value) {
        row.note_sta = 1
      } else {
        row.note_sta = 0
      }
      this.updateDevicePermission(row.user_id, row.device_id, row.phone_sta, row.note_sta, row.device_sta, row, 'note')
    },
    // 修改设备用户电话开关
    phoneChange (row) {
      if (row.phone_value) {
        row.phone_sta = 1
      } else {
        row.phone_sta = 0
      }
      this.updateDevicePermission(row.user_id, row.device_id, row.phone_sta, row.note_sta, row.device_sta, row, 'phone')
    },
    updateDevicePermission (bs_user_id, hd_device_id, phone_sta, note_sta, device_sta, row, type) {
      var list = []
      list.push({
        bs_user_id: bs_user_id,
        hd_device_id: hd_device_id,
        phone_sta: phone_sta,
        note_sta: note_sta,
        device_sta: device_sta
      })
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/updateDevicePermission', list, config).then(res => {
        if (res.data && res.data.code === 200) {
          this.$message.success(res.data.msg)
          if (device_sta === null) {
            this.getDeviceUserByDeviceId(this.hd_device_id, 1, 10)
            this.$refs[bs_user_id].doClose()
          }
        } else {
          if (type === 'note') {
            row.note_value = !row.note_value
          } else if (type === 'phone') {
            row.phone_value = !row.phone_value
          }
          this.$message.error(res.data.msg)

        }
      })
    },
    getList (hd_device_id) {
      this.hd_device_id = hd_device_id
      getDetailById({
        'hd_device_id': hd_device_id,
        returnInnerStatus: false
      }).then(res => {
        this.configByDevice(res.data)
      })
    },
    configByDevice (device) {
      var data = device

      const config_json = JSON.parse(data.config_json)
      if (config_json == null || config_json.phone_sta === 0) {
        this.phone_value = false
      } else {
        this.phone_value = true
      }
      if (config_json == null || config_json.note_sta === 0) {
        this.note_value = false
      } else {
        this.note_value = true
      }
      this.getDeviceUserByDeviceId(device.id, 1, 10)
    },
    // 获取列表数据接口
    getDeviceUserByDeviceId (hd_device_id, page, size) {
      getDeviceUserByDeviceId({ hd_device_id: hd_device_id, page: page, size: size }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
          this.dialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
