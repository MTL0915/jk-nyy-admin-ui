<template>
  <div
    style="padding-bottom: 30px;"
    class="Content"
  >
    <el-dialog
      id="trigger_dialog"
      :visible.sync="triggerVisible"
      title="预警设置"
      class="dialog_header1"
      append-to-body
      width="500px"
      top="10vh"
    >
      <table
        id="trigger_table"
        border="1"
        cellspacing="0"
        cellpadding="0"
        style="border-color:#eaeaea57;font-size: 13px;"
      >
        <tr>
          <td style="width:105px">设备名称：</td>
          <td>{{ name }}({{device_id}})</td>
        </tr>
        <tr>
          <td>是否启动：</td>
          <td>
            <el-switch
              v-model="strategy.status"
              :active-value="1"
              :inactive-value="0"
            />
          </td>
        </tr>
        <tr>
          <td>识别传感器:</td>
          <td>
            <el-select
              v-model="strategy.hd_device_sensor_ids"
              collapse-tags
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in zsSensors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: middle;">识别状态：</td>
          <td style="vertical-align: middle;">
            <div>
              <div
                class="demo-input"
                style="float: left;"
              >
                <el-radio
                  v-model="strategy.recognize_result"
                  label="open"
                >开启</el-radio>
              </div>
              <div
                class="demo-input"
                style="padding-left:10px;float: left;"
              >
                <el-radio
                  v-model="strategy.recognize_result"
                  label="close"
                >关闭</el-radio>
              </div>
            </div>

          </td>
        </tr>
        <tr>
          <td
            style="text-align:center;"
            colspan="2"
          >
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
import { findByHd_device_id } from '@/api/hd_device_sensor'
import { getSensorZSStrategy, addOrUpdateSensorZSStrategy } from '@/api/strategy'
export default {
  name: 'TriggerPanel',
  data () {
    return {
      hd_device_id: '',
      name: '',
      device_id: '',
      strategy: {
        hd_device_id: "",
        status: 0,
        hd_device_sensor_ids: [],
        recognize_result: ""
      },
      zsSensors: [],
      zsSensorIds: [],

      triggerVisible: false,
      sensorInfo: {},
    }
  },
  methods: {
    initStrategy () {
      this.strategy.hd_device_id = "";
      this.strategy.status = 0;
      this.strategy.hd_device_sensor_ids = [];
      this.strategy.recognize_result = "close";
    },
    async showPanel (hd_device_id, name, device_id) {
      this.hd_device_id = hd_device_id;
      this.name = name;
      this.device_id = device_id;
      this.init();

      await findByHd_device_id({ hd_device_id: this.hd_device_id }).then(res => {
        if (res.code == 200) {
          var datas = res.data;
          for (var i = 0, len = datas.length; i < len; i++) {
            if (datas[i].hd_sensor_type_code === "801") {
              this.zsSensors.push(datas[i]);
            }
          }
        }
      })

      getSensorZSStrategy(hd_device_id).then(res => {
        console.log("this.zsSensors:", this.zsSensors);
        this.triggerVisible = true;
        if (res.data != null) {
          this.strategy.status = res.data.status;
          this.strategy.hd_device_sensor_ids = res.data.hd_device_sensor_ids;
          this.strategy.recognize_result = res.data.recognize_result;
        }
      })

    },
    init () {
      this.zsSensors = [];
      this.initStrategy();
    },
    saveTrigger () {
      if (this.strategy.status != 1 && this.strategy.status != 0) {
        this.$message.error("请选择是否启动");
        return
      }
      if (!this.strategy.hd_device_sensor_ids || this.strategy.hd_device_sensor_ids.length == 0) {
        this.$message.error("请选择识别传感器");
        return
      }

      var strategy = {
        hd_device_id: this.hd_device_id,
        status: this.strategy.status,
        hd_device_sensor_ids: this.strategy.hd_device_sensor_ids,
        recognize_result: this.strategy.recognize_result
      }

      addOrUpdateSensorZSStrategy(strategy).then(res => {
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
.demo-input >>> .el-input
  width 100px

.demo-input >>> .el-input__inner
  height 35px
  line-height 35px

.dialog_header1 >>> .el-dialog__header
  padding-top 10px

.dialog_header1 >>> .el-dialog__headerbtn
  top 13px

.dialog_header1 >>> .el-dialog__body
  padding 10px 20px

.dialog_header1 >>> .button-is-selected
  background #1890ff
  border-color #1890ff
  color #FFFFFF

.dialog_header1 >>> .button-is-not-selected
  color #1890ff
  background #e8f4ff
  border-color #a3d3ff

#trigger_table
  width 100%
  font-size 16px

#trigger_table tr
  height 30px
  line-height 30px

#trigger_table td
  vertical-align super

table td
  padding 10px
</style>
