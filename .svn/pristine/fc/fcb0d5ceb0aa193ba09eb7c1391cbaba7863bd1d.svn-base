<template>
  <div>
    <el-dialog
      :visible.sync="dialogForm"
      :style="{'padding-top':'0px'}"
      append-to-body
      title="设备策略管理"
      width="960px"
    >
      <div>
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="small"
          @click="handelAdd1"
        >底线安全策略</el-button>
        <el-button
          icon="el-icon-plus"
          type="success"
          size="small"
          @click="handelAdd2"
        >条件控制策略</el-button>
      </div>
      <el-table :data="deviceStrategyList" size="small" style="width: 100%;">
        <!-- <el-table-column label="关联设备" width="250px" >
          <template slot-scope="scope">
            <span>{{ scope.row.hd_device_name }}（{{ scope.row.device_id }}）</span>
          </template>
        </el-table-column> -->

        <el-table-column label="策略类型" width="150px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.controlType === 0" >底线安全策略</span>
            <span v-else-if="scope.row.controlType === 2" >条件控制策略</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column label="执行动作" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.action === 0" >关闭</span>
            <span v-else-if="scope.row.action === 1" >开启</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="是否通知" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.notice_status === 0" >否</span>
            <span v-else-if="scope.row.notice_status === 1" >是</span>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column prop="logicNum" label="逻辑编号" align="center"/>
        <el-table-column :formatter="formatTime" prop="create_time" label="创建时间" align="center" width="200px"/>

        <el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="detail(scope.row.id)"
            >查看</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="confirmDelete(scope.row.id)"
            >删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog :visible.sync="delVisible" append-to-body title="提示" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <conditional-strategy ref="conditionalStrategy" />
    <secure-strategy ref="secureStrategy" />
  </div>
</template>
<script>
import { findByHd_device_id, deleteById, get } from '@/api/hd_device_strategy'
import ConditionalStrategy from './ConditionalStrategy'
import SecureStrategy from './SecureStrategy'

import { formatDate } from '@/utils/date'
// import { isFloat } from '@/utils/basetype'
export default {
  name: 'DeviceStrategy',
  components: {
    ConditionalStrategy,
    SecureStrategy
  },
  data() {
    return {
      deviceStrategyList: [],
      hd_device_id: '',
      dialogForm: false,
      delVisible: false,
      selected_hd_device_strategy_id: ''
    }
  },
  methods: {
    handelAdd1() {
      this.$refs.secureStrategy.showDialog(this.hd_device_id, this)
    },
    handelAdd2() {
      this.$refs.conditionalStrategy.showDialog(this.hd_device_id, this)
    },
    formatTime(obj) {
      if (!obj.create_time) {
        return ''
      }
      return formatDate(new Date(obj.create_time), 'yyyy-MM-dd hh:mm:ss')
    },
    showDialog(hd_device_id) {
      this.hd_device_id = hd_device_id
      findByHd_device_id(hd_device_id).then(res => {
        this.deviceStrategyList = res.data
        this.dialogForm = true
      })
    },
    refresh() {
      findByHd_device_id(this.hd_device_id).then(res => {
        this.deviceStrategyList = res.data
      })
    },
    confirmDelete(hd_device_strategy_id) {
      this.selected_hd_device_strategy_id = hd_device_strategy_id
      this.delVisible = true
    },
    deleteRow() {
      deleteById(this.selected_hd_device_strategy_id).then(res => {
        if (res.code === 200) {
          var deviceStrategyList = this.deviceStrategyList
          for (var i = 0, len = deviceStrategyList.length; i < len; i++) {
            if (deviceStrategyList[i].id === this.selected_hd_device_strategy_id) {
              deviceStrategyList.splice(i, 1)
              break
            }
          }
          this.delVisible = false
        }
      })
    },
    detail(hd_device_strategy_id) {
      get(hd_device_strategy_id).then(res => {
        if (res.code === 200) {
          var strategy = res.data
          if (strategy.controlType === 0) { // 底线安全策略
            this.$refs.secureStrategy.showStrategyDialog(strategy, this)
          } else if (strategy.controlType === 2) { // 条件控制策略
            this.$refs.conditionalStrategy.showStrategyDialog(strategy, this)
          }
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .el-dialog__wrapper>>>.el-dialog__body
    padding-top: 0px;
</style>
