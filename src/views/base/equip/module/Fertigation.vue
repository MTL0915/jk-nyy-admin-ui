<template>
  <div>
    <div class="container">
      <div v-for="(item, index) in barrelArr" :key="index" class="barrelBox">
        <el-row :gutter="30" type="flex" justify="cneter">
          <el-col v-for="(data, i) in item" :key="i" :span="8" >
            <div class="barrel">
              <div class="barrel-content">
                <span class="name">
                  {{ data.name }}
                </span>
                <i class="el-icon-edit" @click="set(data,totalSensorID,trafficSensorID)" />
              </div>
              <div>
                <span style="font-size:12px;color:#fff">
                  {{ data.total_capacity }}L&nbsp;&nbsp;&nbsp;
                  {{ !isNaN(data.surplus_ratio) && data.surplus_ratio.toFixed(1) }}%
                </span>
              </div>
              <img :src="data.barrelImg" class="barrel-bg">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <set-fertifation-data ref="setting" :list="list" :hd_device_id="hd_device_id" @addBarrel="addBarrel" @delBarrel="delBarrel" @updateBarrel="updateBarrel" />
    <el-button size="small" type="success" @click="add">新增</el-button>
    <el-dialog
      :visible.sync="addFertigation"
      title="新增肥桶"
      width="30%"
      append-to-body
    >
      <div>
        <div style="margin-bottom:10px">
          <span class="name">肥桶名称</span>
          <el-input v-model="name" size="size" placeholder="请输入肥桶名称" />
          <span class="name">肥桶容量(单位: L)</span>
          <el-input v-model="total" size="size" placeholder="请输入肥桶容量" />
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
          <el-button size="small" type="primary" @click="addSave">保存</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getFertigation, getFertigationSensorID,addFertigation  } from '@/api/getFertifation'
import setFertifationData from './setFertigationData'
// import bus from '@/components/common/bus.js'
export default {
  components: {
    setFertifationData
  },
  props: {
    hd_device_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      addFertigation:false,
      name:"",
      total:"",
      barrelTotalSensorID:"",
      barrelTrafficSensorID:"",

      list: [],
      barrelArr: [],
      totalSensorID: [],
      trafficSensorID: []
    }
  },
  methods: {
    // 分片数组
    burst(arr, size) {
      const len = arr.length
      const newArr = []
      const times = Math.ceil(len / size)
      if (!size || size < 0) {
        return `分片数组的长度不存在或者小于0`
      } else {
        for (let i = 0; i < times; i++) {
          const start = i * size
          let end = start + size
          end = end > len ? len : end
          const tempArr = arr.slice(start, end)
          newArr.push(tempArr)
        }
      }
      return newArr
    },
    // 设置
    set(item, totalSensorID, trafficSensorID) {
      this.$refs.setting.setData(item, totalSensorID, trafficSensorID)
    },
    addBarrel() {
      this.dataLoad()
    },
    delBarrel() {
      this.dataLoad()
    },
    updateBarrel() {
      this.dataLoad()
    },
    dataLoad() {
      // 获取肥桶数据
      getFertigation({ 'hd_device_id': this.hd_device_id }).then(
        res => {
          if (res.code === 200) {
            res.data.map(v => {
              v.surplus_ratio = v.surplus_ratio * 100
              if (v.surplus_ratio >= 0 && v.surplus_ratio <= 10) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-0.png')
              } else if (v.surplus_ratio > 10 && v.surplus_ratio <= 20) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-20.png')
              } else if (v.surplus_ratio > 20 && v.surplus_ratio <= 40) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-40.png')
              } else if (v.surplus_ratio > 40 && v.surplus_ratio <= 60) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-60.png')
              } else if (v.surplus_ratio > 60 && v.surplus_ratio <= 80) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-80.png')
              } else if (v.surplus_ratio > 80 && v.surplus_ratio <= 100) {
                v['barrelImg'] = require('@/assets/img/fertigation/barrel-100.png')
              }
            })
            this.list = res.data
            this.barrelArr = this.burst(res.data, 3)
          }
        }
      )
      // 获取肥桶传感器ID数据
      getFertigationSensorID({ 'hd_device_id': this.hd_device_id }).then(
        res => {
          if (res.code === 200) {
            this.totalSensorID = []
            this.trafficSensorID = []
            res.data.map(v => {
              if (v.hd_sensor_type_name === '容量') {
                this.totalSensorID.push(v)
              }
              if (v.hd_sensor_type_name === '流量') {
                this.trafficSensorID.push(v)
              }
            })
            // console.log(this.totalSensorID)
            // console.log(this.trafficSensorID)
          }
        }
      )
    },
    add() {
      if (this.list.length >= 6) {
        this.$message({
          message: '肥桶数量已达上限',
          type: 'warning'
        })
      } else {
        this.total = 0
        this.name = ''
        this.barrelTotalSensorID = ''
        this.barrelTrafficSensorID = ''
        this.addFertigation = true
        this.dialogVisible = false
      }
    },
    addSave() {
      const reg = /^[1-9]+[0-9]*]*$/
      if (this.name === '' || this.total === 0 || this.total === '' || this.barrelTotalSensorID === '' || this.barrelTrafficSensorID === '') {
        this.$message({
          message: '肥桶名称、容量、容量ID或流量ID不能为空',
          type: 'warning'
        })
      } else if (reg.test(this.total)) {
        var postData = new FormData()
        postData.append('hd_device_id', this.hd_device_id)
        postData.append('name', this.name)
        postData.append('total_capacity', this.total)
        postData.append('capacity_sensor_id', this.barrelTotalSensorID)
        postData.append('flow_sensor_id', this.barrelTrafficSensorID)
        addFertigation(postData).then(res => {
          if (res.code === 200) {
            this.$emit('addBarrel')
            this.addFertigation = false
            this.dataLoad()
          }
        })
      } else {
        this.$message({
          message: '肥桶容量不是数字或不是整数',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.barrelBox
  margin-bottom 15px
.barrel
  text-align center
  background #ccc
  border-radius 5px
  height:170px
  padding:5px
.barrel-content
  display flex
  background #fff
  border-radius 5px
  line-height 20px
  padding-left 3px
.barrel-bg
  width auto
  height 70%
.name
  color #07C160
  display inline-block
  flex 1
  line-height 30px
  text-align left
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.el-icon-edit
  display inline-block
  flex 0 0 30px
  padding 5px
  vertical-align middle
</style>
