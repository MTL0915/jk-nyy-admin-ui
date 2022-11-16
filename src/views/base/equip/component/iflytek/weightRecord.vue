<template>
  <div class="equip_component_div">
    <div class="component_title_div">猪群估重数据</div>
    <div style="display: flex;width:100%;justify-content: space-between">
      <!-- 日期选择 -->
      <chooseTimeSelect ref="chooseTimeSelect" :timeTypeConfig="timeTypeConfig" :defaultTimeType="'userDefined'" :userDefined="true" :triggerFun="timeChange"  />

      <div>
        <label style="font-size: 13px;color: #00BCD4;">标签值:</label>
        <el-select v-model="label" placeholder="请选择" size="mini" style="width:100px">
          <template v-for="(num,i) in labelNum">
            <el-option
              :key="num"
              :label="'标签' + num"
              :value="num">
            </el-option>
          </template>
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
import { weightData } from '@/api/iflytek'
import chooseTimeSelect from '@/views/base/equip/component/common/chooseTimeSelect';
import lineChart from '@/views/base/equip/component/common/chart/lineChart';


export default {
  name: 'cough_record',
  components: { chooseTimeSelect,lineChart },
  mixins: [], //混入
  props:{
    hd_device_id:{
      type:String
    },
    labelNum:{
      type:Object,
      default:8
    }
  },
  data() {
    return {
      // 时间选择配置
      timeTypeConfig:[],
      channelNum:8, // 通道数量
      start_time:"",
      end_time:"",
      label:1,
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
    communication:function(val){
      console.log(val);
    },
    hd_device_id:function(val){
      this.loadChart()
    },
    label:function(val){
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
        label:this.label,
        startTime:this.start_time,
        endTime:this.end_time,
        startPosition:this.startPosition,
        maxResult:this.maxResult,
        timeOrder:-1
      }
      weightData(params).then(res => {
        var data = res.data;
        var xAxis = [];
        var datas = [];
        for (var i = 0;i < data.length;i++){
          xAxis.push(formatDate(new Date(data[i].detTime), 'MM-dd hh:mm:ss'));
          datas.push(data[i].weight);
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