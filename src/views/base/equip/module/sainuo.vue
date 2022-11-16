<template>
  <div v-loading="loading">
    <div class="lineDiv">
      摄像头垂直角度：
      <el-input-number
        size="mini"
        v-model="verticalAngle"
        :min="0"
        :max="90"
        label="摄像头垂直角度 0~90"
      ></el-input-number>
    </div>
    <div class="lineDiv">
      摄像头水平角度：
      <el-input-number
        size="mini"
        v-model="horizontalAngle"
        :min="0"
        :max="270"
        label="摄像头水平角度 0~270"
      ></el-input-number>
    </div>
    <div style="text-align:right;">
      <el-button
        type="primary"
        @click="save"
        size="mini"
      >保存</el-button>
    </div>
  </div>
</template>

<script>
import { getDetailById } from '@/api/equip'
import { setAngle } from '@/api/sainuo'

export default {
  data () {
    return {
      verticalAngle: 0,
      horizontalAngle: 0,
      loading: true
    }
  },
  props: {
    hd_device_id: {
      default: null,
      type: String
    },
    device_id: {
      default: null,
      type: String
    }
  },
  mounted () {
    getDetailById({
      hd_device_id: this.hd_device_id,
      device_id: this.device_id,
    }).then(res => {
      this.loading = false
      let comm_json = JSON.parse(res.data.communication)
      this.verticalAngle = comm_json.config.verticalAngle || 0
      this.horizontalAngle = comm_json.config.horizontalAngle || 0
    })
  },
  methods: {
    save () {
      setAngle({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        verticalAngle: this.verticalAngle,
        horizontalAngle: this.horizontalAngle,
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
.lineDiv {
  text-align: center;
  margin-top: 15px;
}
</style>
