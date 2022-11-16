<!-- sim卡历史流量 -->
<template>
  <div>
    <div>
      <el-date-picker
        v-model="updateTimeScope"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="时间范围"
        @change="init()"
      >
      </el-date-picker>
    </div>

    <el-table :data="simHistoryArray">
      <el-table-column label="卡片总容量">
        <template slot-scope="scope">
          {{getFlow(scope.row.totalFlow,scope.row.unit)}}
        </template>
      </el-table-column>

      <el-table-column label="卡片剩余容量">
        <template slot-scope="scope">
          {{getFlow(scope.row.surplus,scope.row.unit)}}
        </template>
      </el-table-column>

      <el-table-column label="卡片用量">
        <template slot-scope="scope">
          {{getFlow(scope.row.dosage,scope.row.unit)}}
        </template>
      </el-table-column>

      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{getDate(scope.row.updateTime)}}
        </template>
      </el-table-column>

    </el-table>
    <div>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="page + 1"
        :page-size="size"
        @current-change="pageChange"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>

import { simHistoryList } from '@/api/hd_device_sim'
import { formatDate } from "@/utils/date"

export default {
  props: {
    simId: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      simHistoryArray: [],
      page: 0,
      size: 10,
      total: 0,
      updateTimeScope: null,
    }
  },
  methods: {
    //获取流量文本
    getFlow (value, unit) {
      if (this.checkNotNull(value)) {
        return (value + (this.checkNotNull(unit) ? unit : ''))
      }
      return ''
    },
    //翻页
    pageChange (e) {
      this.page = e - 1;
      this.getHistoryFlow()
    },
    //日期转换
    formatDate,
    getDate (timestamp) {
      if (this.checkNotNull(timestamp)) {
        return this.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
      } else {
        return null
      }
    },
    //初始化
    init () {
      this.page = 0
      this.getHistoryFlow()
    },
    //获取sim卡流量
    getHistoryFlow () {
      let startUpdateTime = null
      let endUpdateTime = null
      if (this.updateTimeScope) {
        startUpdateTime = this.updateTimeScope[0]
        endUpdateTime = this.updateTimeScope[1]
      }
      simHistoryList({
        id: this.simId,
        startUpdateTime: startUpdateTime,
        endUpdateTime: endUpdateTime,
        page: this.page,
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          this.simHistoryArray = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
