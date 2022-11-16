<!-- sim卡历史绑定设备 -->
<template>
  <div>
    <el-table :data="simHistoryArray">
      <el-table-column
        prop="hd_device_name"
        label="设备名称"
      />

      <el-table-column label="解绑时间">
        <template slot-scope="scope">
          {{getDate(scope.row.changeTime)}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { simList } from '@/api/hd_device_sim'
import { formatDate } from "@/utils/date"
export default {
  data () {
    return {
      simHistoryArray: [],
    }
  },
  created () {
    if (this.simId) {
      this.historyBindDevice()
    }
  },
  props: {
    simId: {
      type: String,
      default: null
    },
  },
  methods: {
    //日期转换
    formatDate,
    getDate (timestamp) {
      if (this.checkNotNull(timestamp)) {
        return this.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
      } else {
        return null
      }
    },
    //历史信息
    historyBindDevice () {
      simList({
        old_hd_device_sim_id: this.simId
      }).then(res => {
        if (res.code === 200) {
          this.simHistoryArray = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

