<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addCZDevice"
      >添加智能插座设备</el-button>

    </div>
    <CZDevice ref="CZDevice" />
  </div>
</template>
<script>
import CZDevice from './CZDevice'

export default {
  components: { CZDevice },
  data () {
    return {

    }
  },
  methods: {
    addCZDevice () {
      this.$refs.CZDevice.showDialog();
    }
  }
}
</script>