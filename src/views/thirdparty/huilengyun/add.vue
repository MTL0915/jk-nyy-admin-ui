<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addWGDevice"
      >添加网关设备</el-button>

      <el-button
        type="primary"
        size="mini"
        @click="addCJDevice"
      >添加采集设备</el-button>
    </div>
    <WGDevice ref="WGDevice" />
    <CJDevice ref="CJDevice" />
  </div>
</template>
<script>
import WGDevice from './WGDevice'
import CJDevice from './CJDevice'

export default {
  components: { WGDevice,CJDevice },
  data () {
    return {

    }
  },
  methods: {
    addWGDevice () {
      this.$refs.WGDevice.showDialog();
    },
    addCJDevice() {
        this.$refs.CJDevice.showDialog();
    }
  }
}
</script>