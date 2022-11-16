<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addNJDevice"
      >添加北斗农机设备</el-button>

    </div>
    <NJDevice ref="NJDevice" />
  </div>
</template>
<script>
import NJDevice from './NJDevice'

export default {
  components: { NJDevice },
  data () {
    return {

    }
  },
  methods: {
    addNJDevice () {
      this.$refs.NJDevice.showDialog();
    }
  }
}
</script>