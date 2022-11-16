<template>
  <div class="equip_component_div">
    <div class="component_title_div">实时数据</div>
    <div style="display: flex;width:100%;justify-content: space-between">
      <!-- 日期选择 -->
      <chooseTimeSelect ref="chooseTimeSelect" :timeTypeConfig="timeTypeConfig" :defaultTimeType="'userDefined'" :userDefined="true" :triggerFun="timeChange"  />

      <div>
        <label style="font-size: 13px;color: #00BCD4;">类型:</label>
        <el-select v-model="type" placeholder="请选择" size="mini" style="width:100px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>


    </div>
    <div style="display: flex;width:100%;margin-top:10px">
      <lineChart ref="lineChart" :chartData="chartData"/>
    </div>

  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { yunmuData } from '@/api/yunmu'
import chooseTimeSelect from '@/views/base/equip/component/common/chooseTimeSelect';
import lineChart from '@/views/base/equip/component/common/chart/lineChart';


export default {
  name: 'cough_record',
  components: { chooseTimeSelect,lineChart },
  mixins: [], //混入
  props:{
    hd_device_id:{
      type:String
    }
  },
  data() {
    return {
      options: [{
          value: 1,
          label: '下料量'
        }, {
          value: 3,
          label: '下水量'
        }, {
          value: 8,
          label: '触碰次数'
        }],
      type:1,
      // 时间选择配置
      timeTypeConfig:[],
      start_time:"",
      end_time:"",
      startPosition:0,
      maxResult:10,
      timeOrder:-1,
      chartData:{
        xAxis: [1,2,3,4,5],
        datas: [1,2,3,4,5]
      }

    }
  },
 
  created() {
    // dom载入后触发
    this.$nextTick(() => {
      this.loadChart()
    })
  },
  watch:{
    hd_device_id:function(val){
      this.loadChart()
    },
    type:function(val){
      this.loadChart()
    }
  },
  methods: {
    timeChange(start_time,end_time){
      this.start_time = start_time;
      this.end_time = end_time;
      this.maxResult = -1
      this.loadChart()
    },
    formatColumnTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    },
    loadChart(){
      if (!this.hd_device_id){
        return;
      }
      var params = {
        hd_device_id:this.hd_device_id,
        type:this.type,
        startTime:this.start_time,
        endTime:this.end_time,
        startPosition:this.startPosition,
        maxResult:this.maxResult,
        timeOrder:1
      }
      yunmuData(params).then(res => {
        var data = res.data;
        var xAxis = [];
        var datas = [];
        for (var i = 0;i < data.length;i++){
          xAxis.push(formatDate(new Date(data[i].time), 'MM-dd hh:mm:ss'));
          datas.push(data[i].value);
        }
        var chartData = {
          xAxis:xAxis,
          datas:datas
        }
        this.$refs.lineChart.showChart(chartData);
      });
    }
  }
}
</script>

<style lang="stylus">
  
</style>