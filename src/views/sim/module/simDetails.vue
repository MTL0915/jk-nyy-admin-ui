<template>
  <div>
    <div style="text-align:right;background: #ffffff;">
      <el-date-picker
        v-model="selectTime"
        align="right"
        type="daterange"
        placeholder="选择日期"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="selectTimeChange()"
        value-format="yyyy-MM-dd"
        size="mini"
        :disabled="selectTimeDisabled"
      />
    </div>
    <div>
      <el-table
        height="472"
        :data="timeList"
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="日期"
        >
        </el-table-column>
        <el-table-column
          prop="number"
          label="数量"
        >
        </el-table-column>
        <el-table-column label="总共消耗流量">
          <template slot-scope="scope">
            {{transitionFlow(scope.row.sumValue)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="viewTime(scope.row)"
              type="primary"
              size="mini"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        style="height:300px;background: #ffffff;"
        v-if="timeList.length >0"
      >
        <v-chart
          style="width:100%;height:100%"
          :options="timeOption"
          :autoresize="true"
        />
      </div>
      <div v-else>
      </div>
    </div>

    <el-dialog
      v-if="datasVisible"
      :visible.sync="datasVisible"
      append-to-body
      title="该日流量详情"
      width="1000px"
    >

      <el-table
        height="500"
        style="width: 100%"
        :data="time.datas.filter(data => !search 
         || (data.device_id && data.device_id.toLowerCase().includes(search.toLowerCase()))
         || (data.hd_device_name && data.hd_device_name.toLowerCase().includes(search.toLowerCase()))
         || (data.name && data.name.toLowerCase().includes(search.toLowerCase()))
        )"
        :default-sort="{prop: 'sumValue', order: 'descending'}"
      >

        <el-table-column
          prop="name"
          label="iccid"
        >
        </el-table-column>

        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <div
              v-if="scope.row.device_id"
              @click="view(scope.row)"
            >
              <div>{{scope.row.hd_device_name}}</div>
              <div style="color:#ff005e">({{scope.row.device_id}})</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="总共消耗流量"
          prop="sumValue"
        >
          <template slot-scope="scope">
            {{transitionFlow(scope.row.sumValue)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click="viewData(scope.row)"
              type="primary"
              size="mini"
            >查看</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="updateWarnConfig(scope.row)"
            >预警配置</el-button>
          </template>
        </el-table-column>

        <el-table-column width="150">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      :visible.sync="detailsVisible"
      append-to-body
      title="流量时段使用情况"
      width="1000px"
    >
      <div style="height:500px;">
        <v-chart
          style="width:100%;height:100%"
          :options="option"
          :autoresize="true"
        />
      </div>
    </el-dialog>

    <el-dialog
      v-if="updateSysWarnConfigVisible"
      :visible.sync="updateSysWarnConfigVisible"
      append-to-body
      title="预警配置"
      width="1000px"
    >
      <updateSysWarnConfig :hd_device_sim_id="hd_device_sim_id" />
    </el-dialog>
  </div>
</template>
<script>
import { dailyTimeQuantum } from '@/api/iot_time_quantumrest'
import { getSimIdByIccid } from '@/api/hd_device_sim'
import { formatDate } from "@/utils/date";
import updateSysWarnConfig from './updateSysWarnConfig'
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";

export default {
  components: { updateSysWarnConfig },
  data () {
    return {
      selectTimeDisabled: false,
      selectTime: null,
      timeList: [],//时间表格
      time: null,//选中的那一天数据
      datasVisible: false,//详情弹窗
      detailsVisible: false,//图表弹窗
      option: {},//图表配置
      search: null,
      timeOption: {},//时间图表
      hd_device_sim_id: null,
      updateSysWarnConfigVisible: false,//修改预警信息弹窗
    }
  },
  props: {
    closeFunction: {
      type: Function
    }
  },
  mounted () {

    this.init()
  },
  methods: {
    formatDate,
    //流量转换
    transitionFlow (value) {
      value = value * 1
      let unit = 'M'
      if (value >= 1024) {
        value = value / 1024
        unit = 'G'
      }
      return (value.toFixed(2) + unit)
    },
    //初始化
    init () {
      let now = new Date()
      let time = []
      time.push(this.formatDate(new Date(now.getTime() - (7 * 86400000)), 'yyyy-MM-dd'))//七天前
      time.push(this.formatDate(now, 'yyyy-MM-dd'))//当前时间
      this.selectTime = time
      this.dailyTimeQuantum()
    },
    //修改配置
    updateWarnConfig (row) {
      getSimIdByIccid({
        iccid: row.name
      }).then(res => {
        if (res.code === 200) {
          this.hd_device_sim_id = res.data
          this.updateSysWarnConfigVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //点击跳转到设备页面
    view (row) {

      var base = this.$router && this.$router.options && this.$router.options.base;
      if (base === undefined) {
        base = "";
      }
      if (row.hd_device_type_code === 'JK-WT') {//无人投料车 || 无人投料船
        window.open("http://121.32.129.19:8100/zljqr/#/sb_caozuo?device_id=" + row.device_id + "&device_type=" + row.hd_device_type_code.substring(3))
      } else if (row.hd_device_type_code === 'JK-FM') {
        this.$router.push({ path: '/jkfmDeviceInfo', query: { device_id: row.device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'JK-WA' || row.hd_device_type_code === 'JK-WC') {
        // 开沟施肥机、无人喷药车
        window.open("/unmannedMap?device_id=" + row.device_id + "&id=" + row.hd_device_id)
      } else if (row.hd_device_type_code === 'JK-GY') {
        // 轨道运输车
        window.open("/unmannedMapGdc?device_id=" + row.device_id + "&id=" + row.hd_device_id);
      } else if (row.device_id === "CD01A-1900001") {//托普云农页面
        // this.$refs.zjtpyunForm.submit();
      } else if (row.hd_device_type_code === 'IK-CO') {
        this.$router.push({ path: '/equipIflytekCO', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'IK-XJ') {
        this.$router.push({ path: '/equipIflytekXJ', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'YM-FW') {
        this.$router.push({ path: '/equipYunmuFW', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else {
        //this.$refs.equipJkl.handelWatch(row.hd_device_id, row.device_id)
        this.$router.push({ path: '/deviceInfo', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      }
      this.datasVisible = false//详情弹窗
      this.detailsVisible = false//图表弹窗
      this.closeFunction()//关闭最外层弹窗
    },
    //按天统计一段时期内的汇总统计
    dailyTimeQuantum () {
      if (!this.selectTime) {
        let now = new Date()
        let time = []
        time.push(new Date(now.getTime() - (7 * 86400000)))//七天前
        time.push(now)//当前时间
        this.selectTime = time
      }
      this.selectTimeDisabled = true
      this.timeList = []
      dailyTimeQuantum({
        type: 'simFlow',
        startTime: (this.selectTime[0] + ' 00:00:00'),
        endTime: (this.selectTime[1] + ' 23:59:59')
      }).then(res => {
        this.selectTimeDisabled = false
        if (res.code === 200) {
          this.$message.success(res.msg)
          let xAxisData = []
          let serieData = []
          let unit = 'M'
          for (let i = 0; i < res.data.length; i++) {
            let d = res.data[i]
            xAxisData.push(d.time)
            serieData.push(d.sumValue.toFixed(2))
          }
          this.timeOption = this.initChat('流量', xAxisData, serieData, unit)
          this.timeList = res.data.reverse()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //查看时间详情
    viewTime (row) {
      this.time = row
      this.datasVisible = true
    },
    //查看sim卡当天流量使用图表
    viewData (row) {
      let xAxisData = []
      let serieData = []
      for (let i = 0; i < row.details.length; i++) {
        let d = row.details[i]
        xAxisData.push(d.time)
        serieData.push(d.value)
      }
      this.option = this.initChat('流量', xAxisData, serieData)
      this.detailsVisible = true
    },
    //查询时间改变
    selectTimeChange () {
      this.dailyTimeQuantum()
    },
    //初始图表
    initChat (name, xAxisData, serieData) {
      let _this = this
      return Object.assign(
        {},
        {
          name: name,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              return `<p>${'时间：' + params[0].axisValue}</p><p>${name + '：' + _this.transitionFlow(params[0].data)}</p>`
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: name,
              type: 'line',
              barMaxWidth: 30,
              barWidth: '60%',
              data: serieData,
              itemStyle: {
                color: '#02B4DD'
              }
            }
          ]
        }
      );
    },
  }
}
</script>
<style scoped>
.noData {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  font-size: 28px;
}
</style>