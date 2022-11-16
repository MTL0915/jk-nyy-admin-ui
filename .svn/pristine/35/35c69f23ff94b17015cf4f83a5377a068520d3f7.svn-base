<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addCQDevice"
      >添加杀虫灯设备</el-button>
    </div>
    
    <CQDevice ref="CQDevice" />
  </div>
</template>
<script>
import CQDevice from './CQDevice'

export default {
  components:{CQDevice},
  data () {
    return {

    }
  },
  methods: {
    addCQDevice(){
      this.$refs.CQDevice.showDialog();
    }
  }
}
</script>