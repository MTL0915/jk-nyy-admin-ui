<template>
  <div style="padding-bottom: 30px;" class="Content">
    <el-dialog
      id="trigger_dialog"
      :visible.sync="triggerVisible"
      title="报警设置"
      class="dialog_header1"
      append-to-body
      width="500px"
      top="10vh"
    >
      <table id="trigger_table" border="1" cellspacing="0" cellpadding="0" style="border-color:#eaeaea57;font-size: 13px;">
        <tr>
          <td style="width:105px">传感器名称：</td>
          <td>{{ sensorInfo.name }}</td>
        </tr>
        <tr style="display: none;">
          <td>传感器类型：</td>
          <td>{{ sensorInfo.hd_sensor_type_name }},单位:{{ sensorInfo.hd_sensor_type_unit ? sensorInfo.hd_sensor_type_unit:'无' }}</td>
        </tr>
        <tr tr style="display: none;">
          <td>隶属设备：</td>
          <td>{{ sensorInfo.hd_device_name }}（{{ sensorInfo.device_id }}）</td>
        </tr>
        <tr style="display: none;">
          <td>通道号：</td>
          <td>{{ sensorInfo.channel }}</td>
        </tr>
        <tr>
          <td style="vertical-align: middle;">触发条件：</td>
          <td style="vertical-align: middle;">
            <div>
              <div class="demo-input"  style="float: left;">
                大于：<el-input v-model="strategy.upper" size="mini"  type="number" />
              </div>
              <div class="demo-input" style="padding-left:10px;float: left;">
                小于：<el-input v-model="strategy.lower" size="mini"  type="number"/>
              </div>
            </div>

          </td>
        </tr>
        <tr>
          <td>报警方式：</td>
          <td>
             <div>
            短信:
            <el-switch
              v-model="strategy.notice"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            电话：
            <el-switch
              v-model="strategy.phone_notice"
            />
            </div>
            <div style="font-size: 12px;color:#b9b9b9">
              默认会通过平台和公众号进行推送
            </div>
          </td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>
            <el-tag
                  v-for="tag in strategy.notice_phones"
                  :key="tag"
                  :disable-transitions="false"
                  size="small"
                  style="margin-right:5px"
                  closable
                  @close="handleClose(tag)">
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="phone"
                  style="width:120px"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag"  size="small" @click="showInput">+ 添加手机号</el-button>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;" colspan="2">
            <div style="margin-top:10px">
              <el-button @click="triggerVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="saveTrigger"
              >确 定</el-button>
            </div>
          </td>
        </tr>
      </table>

    </el-dialog>
  </div>

</template>

<script>
import { isFloat } from '@/utils/basetype'
import { getSensorMonitor, addOrUpdateSensorMonitor } from '@/api/strategy'
export default {
  name: 'TriggerPanel',
  data() {
    return {
      strategy:{
        hd_device_sensor_id:"",
        notice_phones:[],
        notice:1,
        phone_notice:1,
        upper:"",
        lower:""
      },
      inputVisible:false,
      phone:'',

      triggerVisible: false,
      sensorInfo: {},
    }
  },
  methods: {
    initStrategy(){
      this.strategy = {
        hd_device_sensor_id:"",
        notice_phones:[],
        notice:false,
        phone_notice:false,
        upper:"",
        lower:""
      }
    },
     handleClose(tag) {
      var notice_phones = this.strategy.notice_phones
      notice_phones.splice(notice_phones.indexOf(tag), 1)
      this.strategy.notice_phones = notice_phones;
    },
    handleInputConfirm() {
      const phone = this.phone
      if (phone) {
        this.strategy.notice_phones.push(phone)
      }
      this.inputVisible = false
      this.phone = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    getSensorMonitorInfo() {

      getSensorMonitor(this.sensorInfo.id).then(res => {
        var data = res.data
        if (res.code === 200 && data != null) {
          this.strategy = {
            hd_device_sensor_id:this.sensorInfo.id,
            notice_phones:data.notice_phones,
            notice:data.notice == 1 ? true : false,
            phone_notice:data.phone_notice == 1 ? true : false,
            upper:data.upper,
            lower:data.lower
          }
        }
      })
    },
    showPanel(obj) {
      this.sensorInfo = obj
      this.getSensorMonitorInfo();
      this.triggerVisible = true
    },
    isYNumber(e) {
      if (this.strategy.lower === '') {
        return
      }
      if (!isFloat(this.strategy.lower)) {
        this.strategy.lower = ''
        e.currentTarget.focus()
      }
    },
    isXNumber(e) {
      if (this.strategy.upper === '') {
        return
      }
      if (!isFloat(this.strategy.upper)) {
        this.strategy.upper = ''
        e.currentTarget.focus()
      }
    },
    saveTrigger() {
      /*
     if (!this.strategy.lower && !this.strategy.upper ) {
        this.$message.error('上限值或下限值不能同时为空！')
        return
      }
      if (!this.strategy.phone_notice || this.strategy.phone_notice.length == 0) {
        this.$message.error('通知手机号不能为空！')
        return
      }
      */

      var strategy = {
        hd_device_sensor_id:this.sensorInfo.id,
        notice_phones:this.strategy.notice_phones,
        notice:this.strategy.notice ? 1 : 0,
        phone_notice:this.strategy.phone_notice ? 1 : 0,
        upper:this.strategy.upper,
        lower:this.strategy.lower
      }

      addOrUpdateSensorMonitor(strategy).then(res => {
        if (res.code === 200) {
          this.$message.success('设置成功！')
          this.triggerVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }

  }
}
</script>

<style lang="stylus" scoped>

.demo-input >>> .el-input{
    width: 100px;
}
.demo-input >>> .el-input__inner{
    height: 35px;
    line-height: 35px;
}
.dialog_header1 >>> .el-dialog__header
  padding-top 10px

.dialog_header1 >>> .el-dialog__headerbtn
  top 13px

.dialog_header1 >>> .el-dialog__body
    padding: 10px 20px;

.dialog_header1 >>> .button-is-selected {
    background: #1890ff;
    border-color: #1890ff;
    color: #FFFFFF;
}

.dialog_header1 >>> .button-is-not-selected {
    color: #1890ff;
    background: #e8f4ff;
    border-color: #a3d3ff;
}
#trigger_table{
    width:100%;
    font-size:16px;
}
#trigger_table tr{
    height:30px;
    line-height :30px;
}
#trigger_table td{
    vertical-align: super;
}
table td{
  padding:10px;
}
</style>
