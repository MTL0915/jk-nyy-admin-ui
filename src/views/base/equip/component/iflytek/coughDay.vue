<template>
  <div class="equip_component_div">
    <div class="component_title_div">猪群咳嗽每天记录</div>
    <!-- 日期选择 -->
    <div style="display: flex;width:100%;">
      <chooseTimeSelect ref="chooseTimeSelect" style="margin:auto" :timeTypeConfig="timeTypeConfig" :userDefined="true" :triggerFun="timeChange" :defaultTimeType="'1'" />
    </div>
    <!-- 猪群咳嗽每天记录列表 -->
    <div style="display: flex;width:100%;margin-top:10px">
      <el-table :data="coughRecordList" style="width: 100%" height="250">
        <el-table-column fixed type="index" width="50" label="序号"  align="center" />
        <el-table-column fixed prop="detTime" :formatter="formatColumnTime" label="检测日期" width="150"  align="center" />
        <el-table-column :label="'通道' + num" v-for="(num,i) in channelNum"  align="center" >
          <template slot-scope="scope">  
            {{scope.row.coughDetails[num - 1]}}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="合计"  align="center" />
      </el-table>
    </div>

  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { listAllCoughDay } from '@/api/iflytek'
import chooseTimeSelect from '@/views/base/equip/component/common/chooseTimeSelect';

export default {
  name: 'cough_record',
  components: { chooseTimeSelect },
  mixins: [], //混入
  props:{
    hd_device_id:{
      type:String
    },
    communication:{
      type:Object
    }
  },
  data() {
    return {
      // 时间选择配置
      timeTypeConfig:[{
        timeType:'1',
        des:"今天"
      },{
        timeType:'3',
        des:"近3天"
      },{
        timeType:'7',
        des:"近一周"
      },{
        timeType:'21',
        des:"近3周"
      }],
      channelNum:8, // 通道数量
      // 咳嗽明细数据
      coughRecordList:[],
      start_time:"",
      end_time:""

    }
  },
 
  created() {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  watch:{
    communication:function(val){
      var communicationConfig = JSON.parse(val);
      var config = communicationConfig.config;
      if (config.channelType === 1){
        this.channelNum = 8;
      }else{
        this.channelNum = 16;
      }
    },
    hd_device_id:function(val){
      this.listAllCoughDay();
    }
  },
  methods: {
    timeChange(start_time,end_time){
      this.start_time = start_time;
      this.end_time = end_time;

      this.listAllCoughDay();
    },
    formatColumnTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd')
    },
    listAllCoughDay(){
      if (!this.start_time || !this.end_time){
        return;
      }
      var start_time = this.start_time + " 00:00:00";
      var end_time = this.end_time + " 23:59:59";
      listAllCoughDay({
        hd_device_id:this.hd_device_id,
        startTime:start_time,
        endTime:end_time
      }).then(res => {
        this.coughRecordList = res.data;
      });
    }
  }
}
</script>

<style lang="stylus">
  .equip_component_div
    width 100%
    height 100%  
    margin-bottom 5px
  
  .component_title_div
    padding-bottom 3px
    font-size 14px
    color #aeb3c6
    position relative
</style>