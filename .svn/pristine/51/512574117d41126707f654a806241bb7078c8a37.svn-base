<template>
  <div>
    <!-- <div style="text-align:center;margin-bottom: 10px;">阀门</div> -->
    <div>
      <div
        v-for="(item,index) in devList"
        :key="index"
        style="width:30%;display: inline-block;text-align: center;margin: 10px;"
      >
        阀门名称:
        <el-input
          style="width:90px"
          size="mini"
          v-model="item.dev_name"
          :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
        />
        阀门参数:
        <el-input
          style="width:90px"
          size="mini"
          v-model="item.dev_param1"
          :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
        />
        <el-button
          type="primary"
          size="mini"
          @click="updateDev(item)"
          :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
        >修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>

import { getDev, setDev } from '@/utils/jkfm_websocket_util'
import checkUserPermission from '@/utils/user_permission'

export default {
  props: {
    device_id: {
      type: String,
      default: null,
    },
  },
  data () {
    return {
      devList: [],//阀门列表
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //判断权限
    checkUserPermission,
    //初始化
    init () {
      this.getDev()
    },
    //判断水肥设置后返回是否成功
    checkJkfmReturnSuccess (data) {
      if (data) {
        if (data.message_body) {
          if (data.message_body.msgbd_result === 0) {
            return true
          } else {
            this.$message.error(data.message_body.msgbd_result_detail)
            return false
          }
        }
      }
      return false
    },
    //获取附属设备(获取阀门)
    getDev () {
      getDev(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.devList = res.data.msgbd_content
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //修改附属设备(修改阀门名称)
    updateDev (dev) {
      setDev(this.device_id, dev, this.$ws, this.$store.state.user.user.name)
        .then(res => {
          if (res.code === 200) {
            if (this.checkJkfmReturnSuccess(res.data)) {
              this.$message.success(res.msg)
              this.$forceUpdate()
            } else {
              this.init()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    }
  }
}
</script>
<style scoped>
</style>
