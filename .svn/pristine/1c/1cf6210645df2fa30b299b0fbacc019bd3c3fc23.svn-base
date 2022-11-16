<template>
  <div class="screenBox">
    <el-dialog :title="name" :visible.sync="dialogVisible" width="70%">
      <v-chart style="width:100%;height:100%" :options="option" :autoresize="true" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    name: {
      tupe: String,
      default: ""
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.screenBox
  >>>.el-dialog__body
    height 400px
</style>