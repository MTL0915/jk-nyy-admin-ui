<template>
  <div>
    <el-dialog  :visible.sync="dialogShow">
      <div style="height:30px;line-height:30px">
        <p style="font-size:16px;color:#303133">选择设备/阀门</p>
      </div>
      <div style="height:20px;line-height:20px">
        <p style="font-size:12px;color:#999">注：最多选择10个</p>
      </div>
      <el-checkbox-group v-model="result" size="small" :min="0" :max="10">
        <el-checkbox v-for="(item, index) in sensorList" :label="item.id" :key="index" border>
          <p style="font-size:14px">{{ item.name }}</p>
          <p style="font-size:12px">{{ item.device }}</p>
        </el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>
import { getSwitchSensorsByBs_base_id, getSwitchSensorsByRs_facilities_id } from "@/api/hd_device_sensor"
export default {
  data() {
    return {
      dialogShow: false,
      sensorList: [],
      result: []
    }
  },
  methods: {
    // 获取地块下开关类传感器
    getDeviceByAreaID(id) {
      const data = {
        rs_facilities_id: id
      }
      getSwitchSensorsByRs_facilities_id(data).then(res => {
        if (res.code === 200) {
          this.sensorList = res.data;
        }
      })
    },
    //根据基地获取设备
    getDevice() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      }
      getSwitchSensorsByBs_base_id(data).then(res => {
        if (res.code === 200) {
          this.sensorList = res.data;
          // if (this.result.length == 0) {
          //   for (let i = 0; i < 10; i++) {
          //     this.result.push(res.data[i].id);
          //   }
          // }
        }
      })
    }
  },
  watch: {
    dialogShow(val) {
      if (!val) {
        this.$emit("chartChoose", this.result)
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.el-checkbox
  margin 0 10px
  height 40px !important
  line-height 40px !important
</style>