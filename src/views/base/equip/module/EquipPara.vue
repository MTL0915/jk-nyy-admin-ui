<template>
  <div>
    <el-dialog
      :visible.sync="dialogForm"
      append-to-body
      title="设备参数设置"
      width="900px"
    >
      <el-form
        ref="form"
        label-width="100px"
      >
        <h2>设备参数:</h2>
        <el-input
          id="songResJson"
          v-model="paramBody"
          type="textarea"
        />
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="set"
        >设 置</el-button>
        <el-button
          type="success"
          @click="refresh"
        >刷 新</el-button>
        <el-button @click="dialogForm = false">退 出</el-button>
      </div>
    </el-dialog>
    <loading ref="loading" />
  </div>
</template>

<script>
import loading from '@/components/loading'
import { bindOrUnbindDevice, getPara, setPara } from '@/utils/websocket_util'
export default {
  name: 'EquipPara',
  components: { loading },
  props: {},
  data () {
    return {
      hd_device_id: '',
      dialogForm: false,
      paramBody: ''
    }
  },
  computed: {},
  created () { },
  methods: {
    set: function () {
      try {
        var requestBody = JSON.parse(this.paramBody)
      } catch (e) {
        this.$message.error(
          '设置设备参数格式不符合JSON格式，设置设备参数失败！'
        )
        return
      }
      this.$refs.loading.loading_dialog_text = '正在设置设备参数，请等待！'
      this.$refs.loading.openLoadInstance()
      setPara(this.hd_device_id, requestBody, this.$ws)
        .then(res => {
          this.$message.success(res.msg)
          this.$refs.loading.closeLoadInstance()
        })
        .catch(error => {
          this.$message.error(error.msg)
          this.$refs.loading.closeLoadInstance()
        })
    },
    showDialog: function (hd_device_id) {
      this.paramBody = ''
      this.hd_device_id = hd_device_id
      this.dialogForm = true
      this.$refs.loading.loading_dialog_text = '正在获取设备参数，请等待！'
      this.$refs.loading.openLoadInstance()
      getPara(this.hd_device_id, this.$ws)
        .then(res => {
          this.paramBody = JSON.stringify(res.data, null, 3)
          this.$refs.loading.closeLoadInstance()
        })
        .catch(err => {
          this.$message.error(err.msg)
          this.$refs.loading.closeLoadInstance()
        })
    },
    refresh () {
      this.paramBody = ''
      this.$refs.loading.loading_dialog_text = '正在获取设备参数，请等待！'
      this.$refs.loading.openLoadInstance()
      getPara(this.hd_device_id, this.$ws)
        .then(res => {
          this.paramBody = JSON.stringify(res.data, null, 3)
          console.log(this.paramBody)
          this.$refs.loading.closeLoadInstance()
        })
        .catch(err => {
          this.$message.error(err.msg)
          this.$refs.loading.closeLoadInstance()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
// dialog
.el-dialog__wrapper >>>
  .el-dialog
    width 580px

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 10px 50px

.el-dialog__wrapper >>> #songResJson
  border 1px solid #8d8c8c
  padding 5px
  white-space pre-wrap
  word-wrap break-word
  width 800px
  height 400px
  margin-top 10px
  resize none
  font-family 'Courier New'
  font-size 14px
  line-height 1.5
</style>
