<template>
  <div style="text-align:center;">
    <div v-if="resultData">
      <div style="line-height: 40px;">
        <p style="font-size: 28px;">{{resultData.name}}</p>
        <p
          style="font-size: 22px;"
          v-show="showTimeHorizon"
        >{{resultData.startTimeStr + ' 至 '+resultData.endTimeStr}}</p>
      </div>
      <div style="display:flex;flex-wrap: wrap;">
        <div
          v-for="(item,index) in resultData.envList"
          :key="index"
          style="width:200px;border: 1px solid #ccc!important;padding: 14px;margin: 10px;line-height: 24px;border-radius: 16px!important;"
        >
          <img
            :src="item.hd_sensor_type_ImagePath"
            style="width:50px;height:50px;"
          >
          <!-- <p>{{item.hd_sensor_type_name}}</p> -->
          <p>{{item.name}}</p>
          <p>传感器类型：{{item.hd_sensor_type_function_name}}</p>
          <p>类型：{{item.typeStr}}</p>
          <p
            v-if="item.value"
            :style="'color:'+item.color"
          >数值：{{item.value+item.unit}}</p>
          <p v-else>暂未监测到数据</p>
        </div>
      </div>
    </div>
    <div v-else>
      <span>当前时间非生产档案计划时间</span>
    </div>
  </div>
</template>
<script>
import { getNowAgroProduceArchiveEnvByArchive } from '@/api/agroProduceArchiveEnv'
import { formatDate } from "@/utils/date";

export default {
  props: {
    agroProduceArchiveId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      resultData: null,
      showTimeHorizon: false,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.agroProduceArchiveId) {
        getNowAgroProduceArchiveEnvByArchive({ id: this.agroProduceArchiveId }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              if (res.data.startTime && res.data.endTime) {
                res.data.startTimeStr = formatDate(new Date(res.data.startTime), 'yyyy年MM月dd日')
                res.data.endTimeStr = formatDate(new Date(res.data.endTime), 'yyyy年MM月dd日')
                this.showTimeHorizon = true
              }
              if (res.data.envList) {
                res.data.envList.map(v => {
                  v.hd_sensor_type_ImagePath = v.hd_sensor_type_image_path ? (process.env.IMG_URL + v.hd_sensor_type_image_path) : ''
                  v.hd_sensor_type_SmallImagePath = v.hd_sensor_type_small_image_path ? (process.env.IMG_URL + v.hd_sensor_type_small_image_path) : ''
                  if (v.type === 'avg') {
                    v.typeStr = '平均值'
                  } else if (v.type === 'sum') {
                    v.typeStr = '累积值'
                  } else if (v.type === 'max') {
                    v.typeStr = '最大值'
                  } else if (v.type === 'min') {
                    v.typeStr = '最小值'
                  } else if (v.type === 'new') {
                    v.typeStr = '最新值'
                  }
                  if (v.value) {

                    if (v.suitLower != null && v.suitUpper != null && (v.suitLower <= v.value && v.value <= v.suitUpper)) {
                      v.color = '#3CB371'//正常
                    } else if (v.suitLower != null && v.suitUpper != null && v.warnUpper != null && v.warnLower != null
                      && ((v.warnLower <= v.value && v.value <= v.suitLower)) || (v.suitUpper <= v.value && v.value <= v.warnUpper)) {
                      v.color = '#DAA520'//预警
                    } else if ((v.warnUpper != null && v.value > v.warnUpper) || (v.warnLower != null && v.value < v.warnLower)) {
                      v.color = '#FF4500'//警告
                    } else {
                      v.color = '#000000'
                    }
                  } else {
                    v.color = '#000000'
                  }
                })
              } else {
                res.data.envList = []
              }
              this.resultData = res.data
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('农产品生产档案不存在!')
      }
    }
  }
}
</script>