<template>
  <div>
    <eHeader ref="eHeader" :query-condition="queryCondition" @add="add" @query="query" />
    <!--表格渲染-->
    <el-card shadow="never">
      <el-table :data="strategyList" size="small" style="width: 100%;">

        <el-table-column prop="name" label="名称" width="250px" />

        <el-table-column label="绑定地块" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.rs_facilities_id !== null" >{{ scope.row.rs_facilities_name }}地块</span>
            <span v-else-if="scope.row.hd_device_id !== null" >{{ scope.row.hd_device_name }}设备</span>
            <span v-else-if="scope.row.hd_device_sensor_id !== null" >{{ scope.row.hd_device_sensor_name }}传感器</span>
          </template>
        </el-table-column>

        <el-table-column label="执行目标" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.target === 'SENSOR'" >开关类传感器</span>
            <span v-else-if="scope.row.target === 'ITEM'" >分组</span>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column label="动作" width="150px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.action === 'SwitchChannel'" >开启阀门</span>
            <span v-else-if="scope.row.action === 'Rotation'" >轮灌</span>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column prop="notice" label="短信通知" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.notice === 1 ">开启</span>
            <span v-else>关闭</span>
          </template>
        </el-table-column>


        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1 ">启动</span>
            <span v-else>停止</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatTime" prop="create_time" label="创建时间" align="center" width="200px"/>

        <el-table-column
          label="操作"
          align="center"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.status === 0 "
              size="mini"
              type="success"
              @click="start(scope.row)"
            >启动</el-button>
            <el-button
              v-show="scope.row.status === 1 "
              size="mini"
              type="info"
              @click="stop(scope.row)"
            >停止</el-button>

            <el-button
              size="mini"
              type="primary"
              @click="detail(scope.row.rs_facilities_id,scope.row.id)"
            >详情</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="confirmDelete(scope.row.id)"
            >删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <div class="pagination" style="margin-top:10px">
        <el-pagination
          :total="page.totalNum"
          :page-size="page.maxResult"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <add-strategy ref="addStrategy" @getData="getData" />

  </div>
</template>

<script>
import { find, deleteById, updateStatus } from '@/api/strategy'
import { formatDate } from '@/utils/date'
import eHeader from './module/header'
import addStrategy from './module/AddStrategy'
export default {
  components: {
    eHeader, addStrategy
  },
  data() {
    return {
      strategyList: [],
      page: {
        size: 10,
        page: 1,
        totalNum: 2
      },
      queryCondition: {
        rs_facilities_id: '',
        keyword: ''
      }
    }
  },
  methods: {
    query() {
      this.getData()
    },
    add() {
      this.$refs.addStrategy.showDialog(this.queryCondition.rs_facilities_id)
    },
    handleSizeChange(size) {
      this.page.size = size
      this.getData()
    },
    handleCurrentChange(page) {
      this.page.page = page
      this.getData()
    },
    refresh() {
      this.getData()
    },
    start(obj) {
      this.$confirm('您确定启动选定策略?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        updateStatus(obj.id, 1).then(res => {
          if (res.code === 200) {
            obj.status = 1
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    stop(obj) {
      this.$confirm('您确定停止选定策略?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        updateStatus(obj.id, 0).then(res => {
          if (res.code === 200) {
            obj.status = 0
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    getData() {
      var queryCondition = this.queryCondition
      queryCondition.page = this.page.page
      queryCondition.size = this.page.size
      queryCondition.bs_base_id = this.$store.state.baseinfo.cur_base_id;

      find(queryCondition).then(res => {
        this.strategyList = res.data.content
        this.page.totalNum = res.data.totalElements
      })
    },
    formatTime(obj) {
      if (!obj.create_time) {
        return ''
      }
      return formatDate(new Date(obj.create_time), 'yyyy-MM-dd hh:mm:ss')
    },
    confirmDelete(strategy_id) {
      this.$confirm('您确定删除该策略?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        deleteById(strategy_id).then(res => {
          if (res.code === 200) {
            this.getData()
          }
        })
      })
    },
    detail(rs_facilities_id,id) {
      this.$refs.addStrategy.detail(rs_facilities_id, id)
    }
  }
}
</script>

<style scoped>

</style>
