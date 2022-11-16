<template>
  <div class="box">
    <div class="header">操作日志</div>
    <div class="boxContont">
      <ul>
        <li v-for="item in logList" :key="item.id" class="log-item">
          <div class="log-time">{{item.time}}</div>
          <div class="log-detail">{{item.detail}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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