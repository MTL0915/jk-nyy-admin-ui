<template>
  <div v-loading="loading">
    <div>
      <div class="line">
        是否开启识别：
        <el-switch
          v-model="sta"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          size="mini"
        >
        </el-switch>
      </div>
      <div
        class="line"
        v-show="sta==='1'"
      >
        识别类型：
        <el-select
          v-model="type"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div
        class="line"
        v-show="sta==='1'"
      >
        识别时间段：
        <el-time-picker
          is-range
          v-model="time"
          type="date"
          value-format="HH:mm"
          format="HH小时 mm分钟"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          size="mini"
        >
        </el-time-picker>
      </div>
      <div
        class="line"
        v-show="sta==='1'"
      >
        开启通知：
        <el-switch
          v-model="tell"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
          size="mini"
        >
        </el-switch>
      </div>
    </div>
    <div style="text-align:right;">
      <el-button
        type="primary"
        size="mini"
        @click="save"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { setSxtRecognition } from '@/api/sxt'
import { getDetailById } from '@/api/equip'

export default {
  props: {
    hd_device_id: {
      type: String,
      default: null
    },
    device_id: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      loading: true,
      dialogVisible: false,
      type: null,
      time: null,
      tell: 0,
      sta: 0,
      typeOptions: [
        {
          name: '人形识别',
          code: 'humanoid'
        },
        {
          name: '死鱼识别',
          code: 'deadfish'
        },
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getDetailById({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        returnInnerStatus: false,
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          if (res.data.communication && res.data.communication != '') {
            let communication = JSON.parse(res.data.communication)
            let setting = communication.setting
            if (setting) {
              if (setting.recognition_sta) {
                this.sta = setting.recognition_sta
              }
              if (setting.recognition_tell) {
                this.tell = setting.recognition_tell
              }
              if (setting.recognition_type) {
                this.type = setting.recognition_type
              }
              if (setting.recognition_start_time && setting.recognition_end_time) {
                this.time = []
                this.time.push(setting.recognition_start_time)
                this.time.push(setting.recognition_end_time)
              }
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    save () {
      if (!this.type && this.sta) {
        this.$message.error('请选择识别类型')
        return
      }
      let recognition_start_time = null
      let recognition_end_time = null
      if (this.time) {
        recognition_start_time = this.time[0]
        recognition_end_time = this.time[1]
      }
      setSxtRecognition({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        type: this.type,
        sta: this.sta,
        tell: this.tell,
        start_time: recognition_start_time,
        end_time: recognition_end_time,
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.line {
  margin: 15px;
}
</style>