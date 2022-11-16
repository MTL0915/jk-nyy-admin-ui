<template>
  <div>
    <div>
      <!-- <div style="text-align:center;margin-bottom: 10px;">设备组</div> -->
      <div>
        <div
          v-for="(item,index) in blockList"
          :key="index"
          style="width:18%;display: inline-block;text-align: center;margin:5px;"
        >
          {{item.db_name}} <el-button
            type="primary"
            size="mini"
            @click="editBlock(item)"
          >编辑</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="devDialogVisible"
      :visible.sync="devDialogVisible"
      append-to-body
      title="编辑阀门组信息"
      width="1500px"
    >
      <div style="text-align:center;margin-bottom: 10px;">
        <el-input
          v-model="block.db_name"
          size="mini"
          clearable
          style="width:200px;"
          :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
        />
      </div>
      <div>
        <div
          v-for="(item,index) in devList"
          :key="index"
          style="width:50%;display: inline-block;text-align: center;margin-bottom: 10px;"
        >
          <el-checkbox
            :value="getDevValue(item)"
            @change="devChange(item)"
            :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
          />{{item.dev_name}}
        </div>
      </div>
      <div class="saveButton">
        <el-button
          type="primary"
          size="mini"
          @click="saveBlock"
          :disabled="!checkUserPermission( ['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
        >确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDev, getBlock, setBlock, getDevInBlock } from '@/utils/jkfm_websocket_util'
import checkUserPermission from '@/utils/user_permission'
export default {
  props: {
    device_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      block: null,//选中编组
      blockList: [],//设备组列表
      devList: [],//阀门列表
      devDialogVisible: false,
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
      this.getBlock()
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
    //保存阀门编组
    saveBlock () {
      if (!this.block.db_name) {
        this.$message.error('请输入编组名称')
        return
      }
      let d2db = []
      for (let i = 0; i < this.block.devs.length; i++) {
        d2db.push({
          "ddb_dev_id": this.block.devs[i]._id,
          "ddb_db_id": this.block._id
        })
      }
      let msgbd_content = {}
      let devBlock = JSON.parse(JSON.stringify(this.block))
      delete devBlock.devs
      msgbd_content.d2db = d2db
      msgbd_content.devBlock = devBlock

      setBlock(this.device_id, msgbd_content, this.$ws, this.$store.state.user.user.name)
        .then(res => {
          if (res.code === 200) {
            if (this.checkJkfmReturnSuccess(res.data)) {
              this.$message.success(res.msg)
              this.devDialogVisible = false
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

    },
    //勾选设备/取消勾选阀门
    devChange (dev) {
      for (let i = 0; i <= this.block.devs.length; i++) {
        if (i == this.block.devs.length) {
          this.block.devs.push(dev)
          break
        } else if (dev._id === this.block.devs[i]._id) {
          this.block.devs.splice(i, 1)
          break
        }
      }
      this.$forceUpdate()
    },
    //标记选中阀门
    getDevValue (dev) {
      for (let i = 0; i < this.block.devs.length; i++) {
        if (dev._id === this.block.devs[i]._id) {
          return true
        }
      }
      return false
    },
    //获取编组(设备组)
    getBlock () {
      getBlock(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            res.data.msgbd_content.map(v => {
              this.blockList.push(v)
            })
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //点击编辑编组
    editBlock (block) {
      getDevInBlock(this.device_id, block._id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            block.devs = res.data.msgbd_content
            this.block = block
            this.devDialogVisible = true
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
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
  }
}

</script>

<style scoped>
.saveButton {
  text-align: right;
  margin-top: 20px;
}
</style>
