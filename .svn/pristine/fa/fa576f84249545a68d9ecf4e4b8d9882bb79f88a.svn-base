<template>
  <div>
    <el-table
      :data="todayTaskList"
      style="width: 100%"
    >
      <el-table-column
        prop="time"
        label="时间"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="任务"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getTodayTask } from '@/utils/jkfm_websocket_util'

export default {
  props: {
    device_id: {
      type: String,
      default: null,
    },
  },
  data () {
    return {
      todayTaskList: [],//今日任务列表
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //初始化
    init () {
      this.getTodayTask()
    },
    //获取今日任务
    getTodayTask () {
      getTodayTask(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.todayTaskList = []
            for (let i = 0; i < res.data.msgbd_content.length; i++) {
              let d = res.data.msgbd_content[i]
              let index = d.indexOf(' ')
              this.todayTaskList.push({
                time: d.substring(0, index),
                name: d.substring(index + 1, d.length)
              })
            }
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
  },
}
</script>
