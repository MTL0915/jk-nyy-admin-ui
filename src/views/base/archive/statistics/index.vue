<template>
  <div class="statisticsBox">
    <div class="statisticsCard">
      <div
        class="card"
        style="margin:0 10px 10px 0"
        @click="archiveRecordBtn"
        :style="{
          background:activeTitle=='archiveRecord'?'linear-gradient(to right,#3FC5F2,#4397F9)':'#F5F5F5',
          color:activeTitle=='archiveRecord'?'#fff':'#000'
        }"
      >
        <p class="cardTitle">
          <img v-show="activeTitle!='archiveRecord'" src="@/assets/images/ico_web_jdzz.png" style="width:20px;height:20px;margin-right:5px">
          <img v-show="activeTitle=='archiveRecord'" src="@/assets/images/ico_web_jdzz_c.png" style="width:20px;height:20px;margin-right:5px">
          基地种植档案
        </p>
        <div class="amount">
          <p class="totalNum" :style="{color:activeTitle=='archiveRecord'?'#fff':'#1E7993'}">{{ archiveRecord.total }}</p>
          <p class="totalText">总数量(条)</p>
        </div>
        <div style="font-size:0;margin-top:20px">
          <span style="display:inline-block;font-size:12px;width:33.3333%;text-align:center">当前种植：
            <span style="font-size:16px" :style="{color:activeTitle=='archiveRecord'?'#fff':'#6AA9F8'}">{{ archiveRecord.nowTotal }}</span>(条)
          </span>
          <span style="display:inline-block;font-size:12px;width:33.3333%;text-align:center">计划种植: 
            <span style="font-size:16px" :style="{color:activeTitle=='archiveRecord'?'#fff':'#6AA9F8'}">{{ archiveRecord.planTotal }}</span>(条)
          </span>
          <span style="display:inline-block;font-size:12px;width:33.3333%;text-align:center">历史种植：
            <span style="font-size:16px" :style="{color:activeTitle=='archiveRecord'?'#fff':'#6AA9F8'}">{{ archiveRecord.historyTotal }}</span>(条)
          </span>
        </div>
      </div>
      <div
        class="card"
        style="margin: 0 10px 10px 10px"
        @click="recordBtn"
        :style="{
          background:activeTitle=='record'?'linear-gradient(to right,#3FC5F2,#4397F9)':'#F5F5F5',
          color:activeTitle=='record'?'#fff':'#000'
        }"
      >
        <p class="cardTitle">
          <img v-show="activeTitle!='record'" src="@/assets/images/ico_web_nsjl.png" style="width:20px;height:20px;margin-right:5px">
          <img v-show="activeTitle=='record'" src="@/assets/images/ico_web_nsjl_c.png" style="width:20px;height:20px;margin-right:5px">
          农事记录
        </p>
        <div class="amount" style="font-size:0">
          <div style="display:inline-block;width:50%">
            <p class="totalNum" :style="{color:activeTitle=='record'?'#fff':'#1E7993'}">{{ record.total }}</p>
            <p class="totalText">记录总数(条)</p>
          </div>
          <div style="display:inline-block;width:50%">
            <p class="totalNum" :style="{color:activeTitle=='record'?'#fff':'#1E7993'}">{{ record.durationTotal }}</p>
            <p class="totalText">总时长(小时)</p>
          </div>
        </div>
        <div style="font-size:0;height: calc(100% - 120px);margin-top:20px;">
          <el-carousel indicator-position="outside" style="height:100%;overflow:hidden">
            <el-carousel-item v-for="(item, index) in record.produceCountStatistics" :key="index" style="height:100%">
              <p style="display:inline-block;width:50%;font-size:12px;text-align:center" v-for="(data, i) in item" :key="i">
                <span>{{data.name}}</span>
                <span><span style="font-size:16px" :style="{color:activeTitle=='record'?'#fff':'#6AA9F8'}">{{data.num}}</span>(条)</span>
                <span><span style="font-size:16px" :style="{color:activeTitle=='record'?'#fff':'#6AA9F8'}">{{data.duration}}</span>(小时)</span>
              </p>
            </el-carousel-item>
          </el-carousel>
        </div>

      </div>
      <div
        class="card"
        style="margin: 0 0 10px 10px"
        @click="batchRecordBtn"
        :style="{
          background:activeTitle=='batchRecord'?'linear-gradient(to right,#3FC5F2,#4397F9)':'#F5F5F5',
          color:activeTitle=='batchRecord'?'#fff':'#000'
        }"
      >
        <p class="cardTitle">
          <img v-show="activeTitle!='batchRecord'" src="@/assets/images/ico_web_scpc.png" style="width:20px;height:20px;margin-right:5px">
          <img v-show="activeTitle=='batchRecord'" src="@/assets/images/ico_web_scpc_c.png" style="width:20px;height:20px;margin-right:5px">
          生产批次
        </p>
        <div class="amount">
          <p class="totalNum" :style="{color:activeTitle=='batchRecord'?'#fff':'#1E7993'}">{{ batchRecord.weightTotal }}</p>
          <p class="totalText">总重量(公斤)</p>
        </div>
        <div style="font-size:0;height: calc(100% - 120px);margin-top:20px;">
          <el-carousel indicator-position="outside" style="height:100%;overflow:hidden">
            <el-carousel-item v-for="(item, index) in batchRecord.arr" :key="index" style="height:100%">
              <p v-for="(data, i) in item" :key="i" style="display:inline-block;width:33%;font-size:12px;;margin-bottom:10px">
                {{ data.name }}:
                <span style="margin-left:10px;font-size:16px" :style="{color:activeTitle=='batchRecord'?'#fff':'#6AA9F8'}">{{ data.weight }}</span>(公斤)
              </p>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="statisticsEchart" v-show="activeTitle !='record'">
      <div style="border:1px solid #3DC4F1;height:100%;padding:10px;border-radius:10px">
        <div style="display:flex">
          <p class="cardTitle" style="flex:1">{{ title }}</p>
          <span style="color:#999">{{chartTitle}}({{unit}})</span>
        </div>
        <bar-chart v-if="xArr.length > 0" :xArr="xArr" :yArr="yArr" :title="chartTitle" :unit="unit" ref="barChart" />
      </div>
    </div>
    <div class="statisticsEchart" style="display:flex" v-show="activeTitle =='record'">
      <div style="flex:1;border:1px solid #3DC4F1;height:100%;padding:10px;border-radius:10px;margin-right:30px">
        <div style="display:flex">
          <p class="cardTitle" style="flex:1">记录总数趋势</p>
          <span style="color:#999">总数量(条)</span>
        </div>
        <bar-chart v-if="record.xArr.length > 0" :xArr="record.xArr" :yArr="record.countYArr" title="总数量" unit="条" ref="barChart" />
      </div>
      <div style="flex:1;border:1px solid #3DC4F1;height:100%;padding:10px;border-radius:10px">
        <div style="display:flex">
          <p class="cardTitle" style="flex:1">记录总时长趋势</p>
          <span style="color:#999">总时长(小时)</span>
        </div>
        <bar-chart v-if="record.xArr.length > 0 > 0" :xArr="record.xArr" :yArr="record.timeYArr" title="总时长" unit="小时" ref="barChart" />
      </div>
    </div>
  </div>
</template>
<script>
import barChart from "./module/barChart"
import { baseArchiveStatistics } from '@/api/agroProduceArchive'
import { baseRecordStatistics } from '@/api/agroProduceRecord'
import { baseBatchStatistics } from '@/api/agroProduceBatch'
export default {
  components: {
    barChart
  },
  data() {
    return {
      archiveRecord: { // 种植档案
        total: 0,
        nowTotal: 0,
        planTotal: 0,
        historyTotal: 0,
        xArr: [],
        yArr: [],
        yearCountStatistics: []
      },
      record: { // 农事记录
        durationTotal: 0,
        total: 0,
        produceCountStatistics: [],
        xArr: [],
        timeYArr: [],
        countYArr: []
      },
      batchRecord: { // 生产批次
        weightTotal: 0,
        arr: [],
        xArr: [],
        yArr: []
      },
      title: '',
      xArr: [],
      yArr: [],
      chartTitle: '',
      activeTitle: '',
      unit: ''
    }
  },
  mounted() {
    this.getBaseArchiveStatistics();
    this.getBaseRecordStatistics();
    this.getBaseBatchStatistics();
  },
  methods: {
    // 切换种植档案总数
    archiveRecordBtn() {
      if (this.activeTitle == 'archiveRecord') {
        return;
      }
      this.xArr = this.archiveRecord.xArr;
      this.yArr = this.archiveRecord.yArr
      this.title = '种植档案总数量趋势';
      this.chartTitle = '总数量';
      this.unit = '条';
      this.activeTitle = 'archiveRecord'
      this.$nextTick(() => {
        this.$refs.barChart.getData();
      })
    },
    // 切换到农事记录
    recordBtn() {
      if (this.activeTitle == 'record') {
        return;
      }
      this.activeTitle = 'record'
    },
    // 切换批次统计
    batchRecordBtn() {
      if (this.activeTitle == 'batchRecord') {
        return;
      }
      this.activeTitle = 'batchRecord'
      this.xArr = this.batchRecord.xArr;
      this.yArr = this.batchRecord.yArr;
      this.title = '生产批次总重量趋势';
      this.chartTitle = '重量';
      this.unit = '公斤';
      this.$nextTick(() => {
        this.$refs.barChart.getData();
      })
    },
    // 获取种植档案统计
    getBaseArchiveStatistics() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      };
      baseArchiveStatistics(data).then(res => {
        if (res.code === 200) {
          const xArr = [];
          const yArr = [];
          res.data.yearCountStatistics.map(item => {
            xArr.push(item.time)
            yArr.push(item.num)
          })
          this.archiveRecord.total = res.data.total;
          this.archiveRecord.nowTotal = res.data.nowTotal;
          this.archiveRecord.planTotal = res.data.planTotal;
          this.archiveRecord.historyTotal = res.data.historyTotal;
          this.archiveRecord.xArr = xArr;
          this.archiveRecord.yArr = yArr;
          this.archiveRecord.yearCountStatistics = res.data.yearCountStatistics;
          // 图表显示变量
          this.xArr = this.archiveRecord.xArr;
          this.yArr = this.archiveRecord.yArr
          this.title = '种植档案总数量趋势';
          this.chartTitle = '总数量';
          this.unit = '条';
          this.activeTitle = 'archiveRecord'
        }
      })
    },
    // 基地农事记录统计
    getBaseRecordStatistics() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      };
      baseRecordStatistics(data).then(res => {
        if (res.code === 200) {
          const xArr = [];
          const timeYArr = [];
          const countYArr = [];
          res.data.produceCountStatistics.map(item => {
            item.duration = ( item.duration / 3600000).toFixed(2);
          })
          for (let i = 0; i< res.data.yearCountStatistics.length; i++) {
            xArr.push(res.data.yearCountStatistics[i].time);
            timeYArr.push(( res.data.yearCountStatistics[i].duration / 3600000).toFixed(2));
            countYArr.push(res.data.yearCountStatistics[i].num);
          }
          this.record.durationTotal = (res.data.durationTotal / 3600000).toFixed(2);
          this.record.total = res.data.total;
          this.record.produceCountStatistics = this.burst(res.data.produceCountStatistics, 2);
          this.record.xArr = xArr;
          this.record.timeYArr = timeYArr;
          this.record.countYArr = countYArr;
        }
      })
    },
    // 基地农事记录批次统计
    getBaseBatchStatistics() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      };
      baseBatchStatistics(data).then(res => {
        if (res.code === 200) {
          const temp = []
          const xArr = [];
          const yArr = [];
          for (let i = 0; i < res.data.produceCountStatistics.length; i++) {
            if (temp.length <= 12) {
              temp.push(res.data.produceCountStatistics[i]);
            }  
          }
          for (let i = 0; i< res.data.yearCountStatistics.length; i++) {
            xArr.push(res.data.yearCountStatistics[i].time);
            yArr.push(res.data.yearCountStatistics[i].weight);
          }
          this.batchRecord.weightTotal = res.data.weightTotal;
          this.batchRecord.arr = this.burst(temp, 3);
          this.batchRecord.xArr = xArr;
          this.batchRecord.yArr = yArr;
        }
      })
    },
        //数组分片函数
    burst(arr, size) {
      let len = arr.length;
      let newArr = [];
      let times = Math.ceil(len / size);
      if (!size || size < 0) {
        return `分片数组的长度不存在或者小于0`;
      } else {
        for (let i = 0; i < times; i++) {
          let start = i * size;
          let end = start + size;
          end = end > len ? len : end;
          let tempArr = arr.slice(start, end);
          newArr.push(tempArr);
        }
      }
      return newArr;
    },
  }
}
</script>
<style lang="stylus" scoped>
.statisticsBox
  height calc(100% - 44px)
  background #fff
  padding 20px
.statisticsCard
  display flex
.card
  flex 1
  height 200px
  box-sizing border-box
  border-radius 10px
  padding 20px 10px
  cursor pointer
.cardTitle
  display flex
  align-items center
  font-size 16px
  font-weight 700
.amount
  margin-top 20px
  height 60px
  text-align center
.totalText
  font-size 12px
  margin-bottom 5px
.totalNum
  font-size 40px
.totalDetail
  height calc(100% - 68px)
  padding-top 10px
.statisticsEchart
  height calc(100% - 220px)
  background #fff
  margin-top 10px
>>>.el-carousel__container
  height 100%
</style>