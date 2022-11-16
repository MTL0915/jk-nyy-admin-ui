<template>
  <div>
    <el-dialog
      :visible.sync="loading_dialog"
      append-to-body
      title="操作设备"
      width="400px"
    >
      <div style="text-align:center">
        <img
          width="100%"
          src="@/assets/images/shuifeiji/loading.gif"
          alt="正在操作设备，请等待！"
        >
      </div>
      <div id="loading-div" style="width:100%;text-align:center;font-size: 22px;font-family: '黑体';">{{ loading_dialog_text }}</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading_dialog: false,
      loading_dialog_text: '正在操作设备，请等待！'
    }
  },
  methods: {
    closeLoadInstance() {
      this.loading_dialog = false
    },
    openLoadInstance() {
      this.loading_dialog = true
    }
  }
}
</script>
<style scoped>

</style>
