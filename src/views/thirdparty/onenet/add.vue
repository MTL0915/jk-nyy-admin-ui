<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addCJDevice"
      >添加采集类设备</el-button>
    </div>
    
    <CJDevice ref="CJDevice" />
  </div>
</template>
<script>
import CJDevice from './CJDevice'

export default {
  components:{CJDevice},
  data () {
    return {

    }
  },
  methods: {
    addCJDevice(){
      this.$refs.CJDevice.showDialog();
    }
  }
}
</script>