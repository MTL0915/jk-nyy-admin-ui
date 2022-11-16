<template>
  <div class="strategy">
    <div style="position: absolute;top: 20px;width: calc(100% - 40px);height: 45px;padding-left:20px;padding-right: 20px;">
      <div style="float:right;margin-right: -3px;line-height: 45px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="定时任务" name="timer" />
          <el-tab-pane label="触发任务" name="trigger" />
        </el-tabs>
      </div>
    </div>
    <div style="height:100%;">
      <myTimer v-show="activeName === 'timer'" ref="timer" />
      <myTrigger v-show="activeName === 'trigger'" ref="trigger" />
    </div>
  </div>
</template>
<script>
import myTimer from "./modules/timer"
import myTrigger from "./modules/trigger"
export default {
  components: {
    myTimer,
    myTrigger
  },
  data() {
    return {
      activeName: "timer"
    }
  },
  mounted() {
    this.$refs.timer.getAreaList()
    this.$refs.timer.getData()
    this.$refs.trigger.getAreaList()
    this.$refs.trigger.getData()
  },
  methods: {
    handleClick() {}
  }
}
</script>
<style lang="stylus" scoped>
.strategy
  height calc(100% - 45px)
  background #fff
</style>