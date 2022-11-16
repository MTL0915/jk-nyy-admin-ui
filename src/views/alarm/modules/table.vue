<template>
  <div>
    <div>
      <el-table
        ref="multipleTable"
        :data="strategyList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30" />
        <el-table-column align="center" prop="name" label="告警名称" width="120" />
        <el-table-column align="center" prop="triggers_sensor_name" label="监控对象" width="120" />
        <el-table-column align="center" prop="rs_facilities_name" label="所属地块" width="120" />
        <el-table-column align="center" label="告警策略">
          <template slot-scope="scope">
            <span>{{ getAlarm(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="告警方式" width="240">
          <template slot-scope="scope">
            <span>{{ getType(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="120" >
          <template slot-scope="scope">
            <div v-show="scope.row.status === 1">
              <i class="el-icon-success" style="color:#67C23A"></i>
              <span style="color:#67C23A">正常状态</span>
            </div>
            <div v-show="scope.row.status === 0">
              <svg-icon
                icon-class="disable"
                style="width:14px;height:14px"
              />
              <span style="color:#cdcdcd">禁用</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="small" @click="detail(scope.row.id)">详情</el-button>
              <el-button v-show="scope.row.status===0" size="small" type="success" @click="openAndStop(scope.row, 'open')">启用</el-button>
              <el-button v-show="scope.row.status===1" size="small" type="warning" @click="openAndStop(scope.row, 'stop')">停用</el-button>
              <!-- <el-button size="small" type="info">告警历史</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="告警详情" :visible.sync="dialogVisible" width="80%" append-to-body>
      <myForm  ref="myForm"/>
    </el-dialog>
  </div>
</template>
<script>
import { batchUpdateStatus } from '@/api/hd_device_strategy'
import myForm from "./form"
export default {
  components: {
    myForm
  },
  props: {
    strategyList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkList: [], //批量选择
      dialogVisible: false
    }
  },
  methods: {
    // 查看详情
    detail(id) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.myForm.getAreaData()
        this.$refs.myForm.getDetail(id)
      })
    },
    handleSelectionChange(val) {
      this.checkList = val;
    },
    openAndStop(item, type) {
      const data = {
        ids: item.id
      }
      let tip = ""
      if (type === "open") {
        tip = "启用"
        data.status = 1
      } else {
        tip = "停用"
        data.status = 0
      }
      this.$confirm(`您确定${tip}该策略?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        batchUpdateStatus(data).then(res => {
          if (res.code === 200) {
            if (type === "open") {
              item.status = 1
            } else {
              item.status = 0
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    getAlarm(item) {
      let value_way = item.value_way === "og" ? "原始值" : item.value_way === "avg" ? "平均值" :item.value_way === "max" ? "最大值": "最小值"
      let value_num = item.value_num == "1" ? "持续1个周期" : item.value_num == "2" ? "持续2个周期" : item.value_num == "3" ? "持续3个周期" : item.value_num == "4" ? "持续4个周期" : "持续5个周期"
      let alarm_frequency = item.alarm_frequency == "1" ? "每天告警一次" : item.alarm_frequency == "2" ? "只告警一次" : "每次都告警"
      return `${item.triggers_sensor_name}  ${value_way}  ${item.upper ? ">" : "<"}  ${item.upper ? item.upper : item.lower}  ${item.triggers_sensor_type_unit}  ${value_num}  则告警  ${alarm_frequency}`
    },
    getType(item) {
      const arr = []
      if (item.phone_notice ===1) {
        arr.push("电话")
      }
      if (item.notice === 1) {
        arr.push("短信")
      }
      if (item.official === 1) {
        arr.push("公众号消息推送")
      }
      return arr.join("+")
    }
  }
}
</script>
<style lang="stylus" scoped>
  
</style>