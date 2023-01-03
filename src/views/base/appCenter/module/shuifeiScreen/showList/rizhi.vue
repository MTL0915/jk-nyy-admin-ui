<template>
  <div class="box">
    <!-- <div class="header">操作日志</div> -->
    <div class='boxContont'>
      <!-- <iframe src=''  style='border:1px solid #288c9d;width:100%;height:100%'></iframe> -->
      <div class="toggleHeader">
        <!-- 标签切换 -->
        <div class="tags_box">
          <div v-for="(item, index) in modelData" :key="index" class="tags">
            <div
              :class="{ isActive: index == toggleIndex }"
              class="tags_box_item_box"
              @click="HandelToggle(index,item.type)"
            >
              <span class="toggleSelect">{{item.hd_device_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="toggleBody">
        <div class="toggle-body-item">
          <ul>
            <li v-for="item in logList" :key="item._id" class="log-item">
              <div class="log-time">{{timestampToTime(item.i_date)}}</div>
              <div class="log-detail">{{item.cont}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceRunLogList } from '@/api/shuifei'
import { formatDate } from '@/utils/date'
export default {
  props:["bs_base_id","hd_device_id"],
  data(){
    return{
      toggleIndex: 0,
      type:"",
      modelData:[
        {
          hd_device_name: "警报日志",
          type:"Online"
        },
        {
          hd_device_name: "灌溉日志",
          type:"Offline"
        },
        {
          hd_device_name: "设备日志",
          type:"Sta"
        },
      ],
      logList:[
        {
          id:"001",
          time:"2022-10-28 15:00:00",
          detail:"模块连接异常，模块编号：0B"
        },
        {
          id:"002",
          time:"2022-10-28 15:00:00",
          detail:"模块连接异常，模块编号：12A"
        },
        {
          id:"003",
          time:"2022-10-28 15:00:00",
          detail:"模块连接异常，模块编号：8C"
        },
      ]
    }
  },
  mounted() {
    this.HandelToggle(0,"Online")
    this.getDeviceRunLogList()
  },
  methods:{
    HandelToggle(index,type){
      this.toggleIndex = index;
      this.type = type
      this.getDeviceRunLogList()
    },
    getDeviceRunLogList(){
      const _params = {
        b_id: this.bs_base_id,
        h_id: this.hd_device_id,
        startPosition:0,
        maxResult:3,
        type: this.type
      }
      deviceRunLogList(_params).then(res => {
        if (res.code === 200) {
          this.logList = res.data.content  
        }
        console.log(res)
      })
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y+M+D+h+m+s;
    }
  }
};
</script>

<style scoped>
.box{
    height: calc(30% - 10px);
    position: relative;
    margin: 10px 0;
    border: 1px solid #288c9d;
}

.box .header {
  font-size: 20px;
  color: #78F7F7;
  text-align: center;
  height: 38px;
  line-height: 38px;
}
.boxContont{
  padding: 10px;
  height: calc(100% - 58px)
}
.toggleHeader{
  height: 50px;
}
.toggleBody{
  height: calc(100% - 50px);
}
.toggle-body-item{
  height: 100%
}
.tags_box{
  display: flex;
  align-items: center;
  justify-content: right;
}
.tags{
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
}
.toggleSelect{
  display: inline-block;
  width: 101px;
  height: 38px;
  line-height: 38px;
  background: url(~@/assets/images/shuifeiji/select_bg.png) no-repeat;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}
.isActive .toggleSelect{
  background: url(~@/assets/images/shuifeiji/select_bg_on.png) no-repeat;
}
.boxContont ul{
  margin-left: 30px;
}
.boxContont ul li{
  margin-bottom: 10px;
}
.log-detail{
  background-color: #19405e;
  height: 30px;
  line-height: 30px;
  padding-left:10px;
  margin-top: 2px;
}
</style>