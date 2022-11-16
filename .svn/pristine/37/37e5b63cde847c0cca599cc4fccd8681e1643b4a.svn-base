<template>
  <div style="text-align:center;">
    <div class="lineDiv">
      设备名称：
      <el-input
        v-model="name"
        size="mini"
        style="width:180px;margin-top:15px;"
      />
    </div>
    <div class="lineDiv">
      设备验证码：
      <el-input
        v-model="verification_code"
        size="mini"
        style="width:180px;margin-top:15px;"
      />
    </div>
    <div class="lineDiv">
      赛诺光谱仪ID：
      <el-input
        v-model="deviceSerial"
        size="mini"
        style="width:180px;margin-top:15px;"
      />
    </div>
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
      >确定添加</el-button>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      name: '赛诺光谱仪',//设备名称
      verification_code: 'A12345',//设备验证码
      deviceSerial: null,//赛诺光谱仪ID
      verticalAngle: 0,//摄像头垂直角度 0~90
      horizontalAngle: 0,//摄像头水平角度 0~270
    }
  },
  methods: {
    save () {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/sainuo/add', {
        name: this.name,
        verification_code: this.verification_code,
        deviceSerial: this.deviceSerial,
        verticalAngle: this.verticalAngle,
        horizontalAngle: this.horizontalAngle
      }, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.lineDiv {
  margin-top: 15px;
}
</style>
