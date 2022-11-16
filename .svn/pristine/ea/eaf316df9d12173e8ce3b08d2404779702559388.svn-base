<template>
  <div>
    <div class="timeTypeChose" >
        <span v-for="(config,index) in timeTypeConfig" @click="chooseTime(config.timeType)" :class="getSpanClass(config.timeType)">
            {{config.des}}
        </span>
        <span v-show="userDefined" v-if="timeTypeConfig.length > 0" @click="userDefinedSelect() " :class="getSpanClass('userDefined')" >自定义</span>
    </div>
    <div class="timeSelectDiv" v-show="timeType == 'userDefined'" >
        <el-date-picker
            v-model="timeValue"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-button type="primary" @click="dateChange()" size="mini">确定</el-button>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'

export default {
  name: 'chooseTimeSelect',
  props:{
      timeTypeConfig:{
          type:Array,
          default:[{
              timeType:'1',
              des:"今天"
          },{
              timeType:'7',
              des:"7天"
          },{
              timeType:'15',
              des:"15天"
          },{
              timeType:'30',
              des:"30天"
          }]
      },
      userDefined:{
          type:Boolean,
          default:true
      },
      triggerFun:{
          type:Function,
          default:null
      },
      defaultTimeType:{
          type:String,
          default:'1'
      }
  },
  data() {
    return {
        start_time:'',
        end_time:'',
        timeValue:'',
        timeType:this.defaultTimeType
    }
  },
  mounted() {
    this.$nextTick(() => {
        this.chooseTime(this.timeType);
    });
  },
  methods: {
    getSpanClass(timeTypeVal){
        if (this.timeType === timeTypeVal){
            return 'timeActive';
        }else{
            return '';
        }
    },
    //自定义按钮事件
    userDefinedSelect () {
      this.timeType = "userDefined";
      var nowTime = new Date();
      this.end_time = formatDate(nowTime,"yyyy-MM-dd");
      this.start_time = formatDate(new Date(nowTime.getTime() - 24 * 60 * 60 * 1000),"yyyy-MM-dd");
    },
    //时间选择
    chooseTime (timeType) {
        this.timeType = timeType;
        var value = parseInt(timeType);
        if (isNaN(value) ){
            console.log("timeType:" + timeType + ",应该是整形格式!");
            return;
        }
        if (value <= 0) {
            value = 1;
        }
        var nowTime = new Date();
        this.end_time = formatDate(nowTime,"yyyy-MM-dd");
        this.start_time = formatDate(new Date(nowTime.getTime() - 24 * 60 * 60 * 1000 * (value - 1)),"yyyy-MM-dd");
        this.triggerAction();
    },
    dateChange(){
        this.start_time = formatDate(this.timeValue[0],"yyyy-MM-dd");
        this.end_time = formatDate(this.timeValue[1],"yyyy-MM-dd");
        this.triggerAction();
    },
    triggerAction(){
        console.log("类型timeType:"+this.timeType+",开始时间:" + this.start_time + "," + "结束时间：" + this.end_time);
        this.triggerFun && this.triggerFun(this.start_time,this.end_time);
    }
  }
}
</script>

<style lang="stylus" scoped>
.timeActive
  background #0196f2

.timeTypeChose
    border-radius 5px
    overflow hidden
    background #0196f28a
    float left
    color #fff
    font-size 12px
    margin 0 auto

.timeTypeChose span
    padding 10px 0
    text-align center
    width 60px
    display inline-block
    cursor pointer

.timeSelectDiv
    margin-top 2px
    float left
    margin-left 15px
    z-index 10
    line-height 28px

</style>
