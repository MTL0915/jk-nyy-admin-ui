<template>
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    title="定时拍照设置"
  >
    <div style="text-align:center;">
      <div style="margin-top:15px;">
        拍照时间间隔：
        <el-select
          size="mini"
          style="width:150px"
          v-model="timeinterval"
          placeholder="请选择"
        >
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input-number
          v-show="timeinterval===-1"
          size="mini"
          v-model="num"
        />
        <el-select
          v-show="timeinterval===-1"
          size="mini"
          style="width:100px"
          v-model="timeType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in timeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-top:15px;">
        开始拍照时间：
        <!-- <el-time-picker
          type="datetimerange"
          arrow-control
          style="width:200px"
          v-model="startTime"
        /> -->
        <el-date-picker
          size="mini"
          v-model="startTime"
          type="datetime"
          align="right"
        />
      </div>
    </div>
    <div style="text-align:right;">
      <el-button
        type="primary"
        @click="save"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setSxtTimingPhoto } from '@/api/sxt'

export default {
  data () {
    return {
      dialogVisible: false,
      hd_device_id: null,
      timeinterval: null,
      startTime: null,
      openTimer: false,
      num: 5,
      timeOptions: [
        {
          label: '关闭定时拍照',
          value: 0
        },
        {
          label: '自定义',
          value: -1
        },
        {
          label: '5分钟',
          value: 300000
        },
        {
          label: '10分钟',
          value: 600000
        },
        {
          label: '30分钟',
          value: 1800000
        },
        {
          label: '1小时',
          value: 3600000
        },
        {
          label: '1天',
          value: 86400000
        },
        {
          label: '7天',
          value: 604800000
        },
        {
          label: '15天',
          value: 1296000000
        }
      ],
      timeType: 'minute',
      timeTypeOptions: [
        {
          label: '分',
          value: 'minute'
        },
        {
          label: '时',
          value: 'hour'
        },
        {
          label: '天',
          value: 'day'
        },
      ]
    }
  },
  methods: {
    save () {
      let timeinterval = 0
      if (this.timeinterval === -1) {
        let dw = 0
        if (this.timeType === 'minute') {
          dw = 60 * 1000
        } else if (this.timeType === 'hour') {
          dw = 60 * 60 * 1000
        } else {
          dw = 24 * 60 * 60 * 1000
        }
        timeinterval = dw * this.num
      } else {
        timeinterval = this.timeinterval
      }

      if (timeinterval !== 0 && timeinterval < 300000) {
        this.$message.error('拍照间隔最短不能小于5分钟')
        return
      }
      if (this.startTime === null) {
        this.startTime = new Date()
      }
      setSxtTimingPhoto({
        hd_device_id: this.hd_device_id,
        stratTimestamp: this.startTime.getTime(),
        timeinterval: timeinterval
      }).then(res => {
        this.dialogVisible = false
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$parent.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    show (id, timeinterval, date) {
      this.hd_device_id = id
      this.timeinterval = timeinterval
      let flag = true
      for (let i = 0; i < this.timeOptions.length; i++) {
        if (this.timeinterval === this.timeOptions[i].value) {
          flag = false
          break
        }
      }
      if (flag) {
        if (this.timeinterval % 86400000 === 0) {
          this.num = this.timeinterval / 86400000
          this.timeType = 'day'
        } else if (this.timeinterval % 3600000 === 0) {
          this.num = this.timeinterval / 3600000
          this.timeType = 'hour'
        } else {
          this.num = this.timeinterval / 60000
          this.timeType = 'minute'
        }
        this.timeinterval = -1
      }
      this.startTime = date
      this.dialogVisible = true
      this.$forceUpdate()
    },
    // dialogClose () {
    //   this.hd_device_id = null
    //   this.dialogVisible = false
    // }
  }
}
</script>