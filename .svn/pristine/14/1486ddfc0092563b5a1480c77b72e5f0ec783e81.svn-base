<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addFWDevice"
      >添加云牧饲喂育肥设备</el-button>
    </div>
    <FWDevice ref="FWDevice" />
  </div>
</template>
<script>
import FWDevice from './FWDevice'

export default {
  components: { FWDevice },
  data () {
    return {

    }
  },
  methods: {
    addFWDevice () {
      this.$refs.FWDevice.showDialog();
    }
  }
}
</script>