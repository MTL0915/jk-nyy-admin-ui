<template>
  <div>
    <!-- 传感器值 -->
    <div class="sensor_list_div">
      <div
        v-for="(items, index) in sensorCj"
        :key="index"
        class="sensor_container"
        :style="index === rightTopEchartsTypeChoose ? 'background: #cfffff' : 'background: #ffffff'"
      >

        <div
          class="sensor_content"
          @click="sensorCollectClick(items, index)"
        >
          <div
            @click="showTrigger(items)"
            class="trigger_button"
          >
            <i
              class="el-icon-message-solid"
              style="font-size: 14px;"
              title="预警配置"
            ></i>
          </div>
          <div class="sensor_data_div">
            <div style="height: calc(100% - 21px);">
              <img
                class="sensor_type_img"
                :src="getImage(items.hd_sensor_type_small_image_path)"
              />

              <div class="sensor_value_div">
                <span
                  v-show="items.state != 2"
                  :style="{ color: getStatusColor(items) }"
                >
                  {{ items.hd_device_sensor_value }}
                  <span style="font-size: 13px;">&nbsp;&nbsp;{{ items.hd_sensor_type_unit }}</span>
                </span>
                <span
                  v-show="items.state == 2"
                  style="font-size:13px;color:red"
                >数据异常</span>
                <img
                  v-show="items.state == 2"
                  src="@/assets/img/warn.png"
                  style="width:15px;height:15px"
                />
              </div>
            </div>
            <div style="height: 35px;">
              <div
                style="height: calc(100% - 17px);"
                @click="showValueLevel(items)"
              >
                <div style="float:left">
                  {{ items.hd_device_sensor_name }}
                  <i
                    class="el-icon-caret-bottom"
                    style="font-size:15px;color:#333;display: none;"
                  ></i>
                </div>
                <div
                  style="float:right;cursor: pointer;"
                  :style="{ color: getStatusColor(items) }"
                >
                  {{ getValueLevelLabel(items.config_json_obj, items.hd_device_sensor_value) }}
                </div>
              </div>
              <div style="height:4px;position: relative;z-index: 10;">
                <div style="width: calc(100%);height: 3px;background-color: rgba(128, 128, 128);position: absolute;z-index: 10;">
                  <div
                    :style="{ background: getStatusColor(items), width: getValueProportion(items, items.hd_device_sensor_value) + '%' }"
                    style="height:100%;"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <sensorHistoryEchart
      style="margin-top:15px"
      ref="sensorHistoryEchart"
      :currentID="currentID"
      :currentIds="currentIds"
      :hd_device_id="hd_device_id"
    />

    <!-- 预警设置 -->
    <WarnConfig ref="warnConfig" />

    <trigger-panel ref="triggerPanel" />
  </div>
  </div>
</template>

<script>

import TriggerPanel from "@/views/device/components/TriggerPanel";
import { formatDate } from '@/utils/date'
import sensorEcharts from '@/views/sensorEcharts';
import { getImage } from '@/utils/image_util'
import sensorHistoryEchart from '@/views/base/equip/component/common/sensorHistoryEchart';
import WarnConfig from "@/views/base/equip/module/WarnConfig";

export default {
  name: 'sensorDataShow',
  components: { sensorEcharts, sensorHistoryEchart, WarnConfig, TriggerPanel },
  mixins: [], //混入
  props: {
    sensorCj: {
      type: Object,
      default: []
    },
    hd_device_id: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      rightTopEchartsTypeChoose: 0,
      currentID: "",
      currentIds: []
    }
  },

  created () {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  watch: {
    sensorCj: function () {
      for (var sensor of this.sensorCj) {
        this.currentIds.push(sensor.id)
      }

      this.currentID = this.currentIds[0];
    }
  },
  methods: {
    getImage: getImage,
    //点击采集类传感器
    sensorCollectClick (item, index) {
      this.rightTopEchartsTypeChoose = index;
      if (item.hd_sensor_type_code !== '22') {
        this.currentID = item.id;
      }
    },
    showWarnTrigger (items) {
      items['hd_sensor_type_name'] = items.sensor_type_name;
      items['hd_device_name'] = items.device_name;
      let config_json = JSON.parse(items.config_json);
      if (config_json != null) {
        this.$refs.warnConfig.tableData = config_json;
      } else {
        this.$refs.warnConfig.tableData = [];
      }
      this.$refs.warnConfig.id = items.id;
      this.$refs.warnConfig.start_value = items.start_value;
      this.$refs.warnConfig.end_value = items.end_value;
      this.$refs.warnConfig.id = items.id;
      this.$refs.warnConfig.valueLevelVisible = true;
      this.$refs.warnConfig.parentObj = items;
    },
    showTrigger (row) {
      this.$refs.triggerPanel.showPanel(row);
    },
    //获取状态颜色
    getStatusColor (items) {
      var value = items.hd_device_sensor_value;
      let config_json = items.config_json_obj;
      for (var i = 0; i < config_json.length; i++) {
        if (config_json[i].end_value == null || config_json[i].end_value == '') {
          config_json[i].end_value = Infinity;
        }
        if (value >= config_json[i].start_value * 1 && value < config_json[i].end_value * 1) {
          return config_json[i].color;
        }
      }
      return '#068D74';
    },
    showValueLevel (items) {
      if (true) return Vue.set(items, 'isShowValueLevel', false);
      if (items.isShowValueLevel) {
        Vue.set(items, 'isShowValueLevel', false);
      } else {
        if (items.config_json_obj.length > 0) {
          Vue.set(items, 'isShowValueLevel', true);
        }
      }
    },
    getValueLevelLabel (config_json, value) {
      for (var i = 0; i < config_json.length; i++) {
        if (config_json[i].end_value == null || config_json[i].end_value == '') {
          config_json[i].end_value = Infinity;
        }
        if (value >= config_json[i].start_value * 1 && value < config_json[i].end_value * 1) {
          return config_json[i].name;
        }
      }
    },
    getValueProportion (items, cur_value) {
      if (items.end_value == 0 && items.start_value == 0) return 0;
      var proportion = (cur_value / (items.end_value - items.start_value)) * 100;
      if (proportion > 100) proportion = 100;
      return proportion;
    },
    // 查看传感器数据
    viewCollectedData () {
      this.$refs.collectedData.showDialog(this.hd_device_id)
    },
  }
}
</script>

<style lang="stylus" scoped>
.sensor_list_div
  display flex
  width 100%
  min-height 68px
  flex-wrap wrap

.sensor_container
  margin 5px 15px 0px 0px
  padding 4px 15px
  background #FFFFFF
  border-radius 5px
  min-width 205px
  flex 1
  height 88px
  border 1px solid #e6e6e6

.sensor_content
  display flex
  position relative
  color #455a64
  height 100%

.sensor_data_div
  flex 1
  text-align center
  margin auto
  height 100%

.trigger_button
  cursor pointer
  position absolute
  right -12px
  top -1px

.sensor_value_div
  float right
  font-size 28px
  margin 0 auto
  padding 0
  padding-right 3px
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
  width auto

.sensor_type_img
  display block
  float left
  width 30px
  height 30px
  align-self center

.right_top_echartsType
  margin 5px 15px 0px 0px
  padding 5px 10px
  border-radius 5px
  cursor pointer

.app_box_center_right_echartsType
  margin-right 15px
  padding 5px 10px
  border-radius 5px
  cursor pointer
</style>