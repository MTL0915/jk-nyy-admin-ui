<template>
  <div>
    <div style="position: absolute;top: 20px;width: calc(100% - 40px);height: 45px;padding-left:20px;padding-right: 20px;">
      <div style="float:right;margin-right: -3px;line-height: 45px;">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="农事日历"
            name="calendar"
          >
          </el-tab-pane>
          <el-tab-pane
            label="农事记录"
            name="manager"
          >
          </el-tab-pane>
          <el-tab-pane
            label="农事计划"
            name="plan"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div>
      <farmCalendar
        ref="farmCalendar"
        v-if="activeName == 'calendar'"
      />
      <produceRecord
        ref="produceRecord"
        v-if="activeName == 'manager'"
      />
      <producePlan
        ref="producePlan"
        v-if="activeName == 'plan'"
      />
    </div>
  </div>
</template>
<script>
import farmCalendar from './farmCalendar'
import produceRecord from './produceRecord'
import producePlan from './producePlan'

export default {
  components: {
    farmCalendar,
    produceRecord,
    producePlan
  },
  data () {
    return {
      activeName: "calendar"
    }
  },
  watch: {
    activeName (val) {

    }
  },
  mounted () {
    this.$refs.farmCalendar.calendarInit()
    // this.$refs.farmCalendar.dataLoad()
    //this.$refs.farmCalendar.weekInit()
  }
}
</script>