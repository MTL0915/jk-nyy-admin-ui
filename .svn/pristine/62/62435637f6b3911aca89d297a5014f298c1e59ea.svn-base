<template>
  <div>
    <el-table
      :data="planList"
      style="width: 100%"
    >
      <el-table-column
        prop="irr_name"
        label="计划名称"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="startPlan(scope.row)"
            type="primary"
            size="mini"
            :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
          >启动</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { startPlan, stopPlan, getPlan } from '@/utils/jkfm_websocket_util'
import checkUserPermission from '@/utils/user_permission'

export default {
  props: {
    device_id: {
      type: String,
      default: null,
    },
    rtd_irr: {//当前运行计划(如果正在启动计划,则要先进行停止再进行启动)
      type: String,
      default: null,
    },
    startPlanSuccessFunction: {
      type: Function
    }
  },
  data () {
    return {
      planList: [],//计划列表    
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
      this.getPlan()
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
    //获取任务列表
    getPlan () {
      getPlan(this.device_id, 0, this.$ws)
        .then(res => {
          if (res.code === 200) {
            let list = []
            for (let i = 0; i < res.data.msgbd_content.length; i++) {
              let p = res.data.msgbd_content[i]
              if (p.irr_enable === 1) {//计划启用状态
                list.push(p)
              }
            }
            this.planList = list
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    startPlan (plan) {
      let text = ''
      if (this.rtd_irr !== null && this.rtd_irr !== undefined) {
        text = '正在运行【' + this.rtd_irr + '】,是否停止当前计划，运行计划【' + plan.irr_name + '】'
      } else {
        text = '是否运行计划【' + plan.irr_name + '】'
      }
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.rtd_irr !== null && this.rtd_irr !== undefined) {
          stopPlan(this.device_id, this.$ws)
            .then(res => {
              if (res.code === 200) {
                if (this.checkJkfmReturnSuccess(res.data)) {
                  setTimeout(() => {
                    startPlan(this.device_id, plan._id, this.$ws, this.$store.state.user.user.name)
                      .then(res => {
                        if (res.code === 200) {
                          if (this.checkJkfmReturnSuccess(res.data)) {
                            this.$message.success('启动成功')
                            this.startPlanSuccessFunction()
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
                  }, 2000);
                } else {
                  this.init()
                }
              } else {
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err.msg)
            });
        } else {
          startPlan(this.device_id, plan._id, this.$ws)
            .then(res => {
              if (res.code === 200) {
                if (this.checkJkfmReturnSuccess(res.data)) {
                  this.$message.success('启动成功')
                  this.startPlanSuccessFunction()
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
      }).catch(() => {

      });
    }
  }
}
</script>
