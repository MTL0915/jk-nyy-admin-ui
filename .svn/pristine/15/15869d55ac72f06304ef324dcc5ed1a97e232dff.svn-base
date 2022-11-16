<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="username"
        label="用户名"
      />
      <el-table-column
        prop="userphone"
        label="联系电话"
      />
      <el-table-column
        prop="dept_name"
        label="组织"
      />
      <el-table-column
        fixed="right"
        label="故障提醒"
        width="300"
      >
        <template slot-scope="scope">
          <label><input
              :checked="scope.row.phone_sta==1"
              type="checkbox"
              value="1"
              @click="updateDeviceWarnUser(scope.row.user_id,'phone',$event)"
            >电话</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <label><input
              :checked="scope.row.note_sta==1"
              type="checkbox"
              value="1"
              @click="updateDeviceWarnUser(scope.row.user_id,'note',$event)"
            >短信</label>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserListByDevice } from '@/api/equip'
import { updateDeviceWarnUser } from '@/api/deviceWarn'
export default {
  name: 'Users',
  props: {
    device_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    device_id (val) {
      if (val) {
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getUserListByDevice({ device_id: this.device_id }).then(res => {
        this.tableData = res.data
      })
    }, updateDeviceWarnUser (user_id, type, e) {
      var isChecked = e.currentTarget.checked ? 1 : 0
      var config = []
      if (type === 'phone') {
        config.push({ 'user_id': user_id, 'isPhone': isChecked })
      } else if (type === 'note') {
        config.push({ 'user_id': user_id, 'isNote': isChecked })
      }
      console.log({ 'device_id': this.device_id, 'config': config })
      updateDeviceWarnUser({ 'device_id': this.device_id, 'list': config }).then(res => {
        this.$message({
          message: '设置成功！',
          type: 'success',
          duration: 500
        })
      })
    }
  }
}
</script>
