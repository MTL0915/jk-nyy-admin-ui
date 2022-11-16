<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addCODevice"
      >添加猪群咳嗽分析设备</el-button>

      <el-button
        type="primary"
        size="mini"
        @click="addXJDevice"
      >添加巡检轨道机器人</el-button>
    </div>
    <CODevice ref="CODevice" />
    <XJDevice ref="XJDevice" />
  </div>
</template>
<script>
import CODevice from './CODevice'
import XJDevice from './XJDevice'

export default {
  components: { CODevice,XJDevice },
  data () {
    return {

    }
  },
  methods: {
    addCODevice () {
      this.$refs.CODevice.showDialog();
    },
    addXJDevice () {
      this.$refs.XJDevice.showDialog();
    }
  }
}
</script>