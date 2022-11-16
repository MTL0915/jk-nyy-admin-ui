<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
    >
      <el-table
        :data="sensorKz"
        row-key="id"
        style="width: 100%;height: 100%;font-size:13px"
      >
        <el-table-column
          property="name"
          label="名称"
        />
        <el-table-column
          property="device_id"
          label="设备序列号"
        />
        <el-table-column
          property="channel"
          label="通道号"
        />
        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <!-- 二挡开关 -->
            <el-switch
              v-if="scope.row.hd_sensor_type_code == '101'"
              v-model="scope.row.value"
              @change="handelSwitch(scope.row, scope)"
              v-loading="scope.row.loading"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#BBB7B7"
              :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
            ></el-switch>
            <!-- 三挡开关 -->

            <el-radio-group
              v-if="scope.row.hd_sensor_type_code === '102'"
              v-model="scope.row.value"
              size="small"
              v-loading="scope.row.loading"
              @change="handelWindow(scope.row, scope)"
              :disabled="!checkDeviceControl(scope.row.hd_device_id || scope.row.id)"
            >
              <el-radio-button
                key="8"
                :label="8"
              >开</el-radio-button>
              <el-radio-button
                key="10"
                :label="10"
              >停</el-radio-button>
              <el-radio-button
                key="9"
                :label="9"
              >关</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import checkDeviceControl from '@/utils/device_permission';
import { openChannel, closeChannel, openOrCloseChannel, handelWindow } from '@/utils/websocket_util.js';
export default {
  data () {
    return {
      dialogVisible: false,
      sensorKz: []
    }
  },
  methods: {
    //判断设备控制权限
    checkDeviceControl,
    //二挡开关控制
    handelSwitch (row, scope) {
      if (row.loading) {
        return;
      }
      var hd_sensor_id = row.id;

      var index = scope.$index;
      var obj = this.sensorKz[index];

      row.loading = true;
      if (row.value == 1) {
        openChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 1;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 0;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          });
      } else {
        closeChannel(hd_sensor_id, this.$ws)
          .then(res => {
            row.value = 0;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          })
          .catch(err => {
            this.$message.error(err.msg);
            row.value = 1;
            this.sensorKz.splice(index, 1, obj);
            row.loading = false;
          });
      }
    },
  }
}
</script>