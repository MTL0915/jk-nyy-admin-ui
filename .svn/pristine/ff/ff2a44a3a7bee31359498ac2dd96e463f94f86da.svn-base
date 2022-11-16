<template>
  <div class="screenBox">
    <el-dialog :visible.sync="dialogVisible" width="70%">
      <div style="text-align:right">
        <el-select v-model="day1" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="height:calc(100% - 56px)">
        <everyChart :chooseDeviceList="chooseDeviceList" :day="day" v-if="chooseDeviceList.length > 0" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import everyChart from './everyChart';
export default {
  props: {
    chooseDeviceList: {
      type: Array,
      default: () => []
    },
    day: {
      type: String,
      default: ""
    }
  },
  components: {
    everyChart
  },
  data() {
    return {
      day1: 7,
      dialogVisible: false,
      options: [
        {value: 7, label: "近7天"},
        {value: 15, label: "近15天"},
        {value: 30, label: "近30天"}
      ]
    }
  },
  watch: {
    day1(val) {
      this.$parent.day = val
    }
  }
}
</script>
<style lang="stylus" scoped>
.screenBox
  >>>.el-dialog__body
    height 500px
</style>