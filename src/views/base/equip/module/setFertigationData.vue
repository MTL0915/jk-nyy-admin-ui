<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="肥桶设置"
      width="30%"
      append-to-body
    >
      <div>
        <div style="margin-bottom:10px">
          <span class="name">肥桶名称</span>
          <el-input v-model="barrelName" size="size" placeholder="请输入肥桶名称" />

          <span class="name">肥桶容量(单位: L)</span>
          <el-input v-model="total_capacity" size="size" placeholder="请输入肥桶容量" />

          <span class="name">肥桶容量传感器</span>
          <el-select v-model="barrelTotalSensorID" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in totalSensorID"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
          <span class="name">肥桶流量传感器</span>
          <el-select v-model="barrelTrafficSensorID" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in trafficSensorID"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </div>
        <el-row style="text-align:center">
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" type="danger" @click="del">删除</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateFertigation, deleteFertigation, addFertigation } from '@/api/getFertifation'
// import bus from '@/components/common/bus'
export default {
  props: {
    hd_device_id: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      addFertigation: false,
      total: 0,
      name: '',
      totalSensorID: [],
      trafficSensorID: [],
      barrelName: '', // 肥桶名称
      total_capacity: '', // 当前肥桶容量
      barrelTotalSensorID: '', // 肥桶容量传感器ID
      barrelTrafficSensorID: '', // 肥桶流量传感器ID
      barrelId: ''
    }
  },
  methods: {
    setData(item, totalSensorID, trafficSensorID) {
      this.dialogVisible = true
      this.barrelName = item.name
      this.total = item.total_capacity
      this.barrelId = item.id
      this.total_capacity = item.total_capacity
      this.barrelTotalSensorID = item.capacity_sensor_id
      this.barrelTrafficSensorID = item.flow_sensor_id
      this.totalSensorID = totalSensorID
      this.trafficSensorID = trafficSensorID
    },
    save() {
      // console.log(this.barrelTotalSensorID)
      // console.log(this.barrelTrafficSensorID)
      var postData = new FormData()
      postData.append('id', this.barrelId)
      postData.append('name', this.barrelName)
      postData.append('total_capacity', this.total_capacity)
      postData.append('capacity_sensor_id', this.barrelTotalSensorID)
      postData.append('flow_sensor_id', this.barrelTrafficSensorID)
      updateFertigation(postData).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$emit('updateBarrel')
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    del() {
      deleteFertigation({ 'id': this.barrelId }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$emit('delBarrel')
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()
  margin 0
.el-dialog__wrapper >>> .el-dialog__body
  padding-top 0px
.el-dialog__wrapper >>> .el-dialog__header
  padding-top 10px

.name,.total
  display block
  font-size 16px
  margin 10px 0
.total
  margin-top 10px
</style>
