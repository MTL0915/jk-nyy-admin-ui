<template>
  <div class='irrigation'>
    <div class='title'>
      <span>智能灌溉设备</span>
    </div>
    <table class='table'>
      <thead>
        <tr>
          <td>序号</td>
          <td>设备名称</td>
          <td>状态</td>
          <td style='width: 145px;'>控制模式</td>
          <td>更新时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(it , i) in dataList" :key='i' >
          <td>{{i*1+1}}</td>
          <td>{{it.name}}</td>
          <td>
            <div v-show='it.stats == 1' style='background:#605252' @click='it.stats = 1' class='yuan'>  </div>
            <div v-show='it.stats == 0' style='background:green' @click='it.stats = 0' class='yuan'>  </div>
          </td>
          <td>
            <!-- <div v-show='it.model == 0' > 智能 </div> -->
            <div>  
              <select v-model="it.model">
                <option value='1'>手动</option>
                <option value='0'>智能</option>
              </select>
              <span v-show='it.model==0' @click='to(it)'>
                {{ it.stats == 0 ? "自动中" : "设置" }}
              </span>
            </div></td>
          <td>{{it.updateTime}}</td>
          <td>
            <div class='btn' style='background: rgb(22, 155, 213);border-radius: 12px;padding: 2px;' v-show='it.stats == 0' @click='it.stats = 1'>停止</div>
            <div class='btn' style='background: rgb(22, 155, 213);border-radius: 12px;padding: 2px;' v-show='it.stats == 1' @click='it.stats = 0'>启动</div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  
</template>

<script>
var a = function(date){
    var d = new Date();
    d = new Date(d.getTime() - Math.random()*1000000); 
    var str = "";
    str += d.getFullYear()+"/";
    str += (d.getMonth()+1)+"/";
    str += d.getDate()+" ";
    str += d.getHours()+":";
    str += d.getMinutes()+":";
    str += d.getSeconds();
    return str;
}

export default {
    components : {

    },
    data (){

      return {
        sup_this : this,
        dataList : [
          {name: "分组1" , stats: 0 , model : 0 , updateTime: a() , opt : { open : true }},
          {name: "分组2" , stats: 1 , model : 1 , updateTime: a() , opt : { open : true }},
          {name: "分组3" , stats: 1 , model : 1 , updateTime: a() , opt : { open : true }},
          {name: "分组4" , stats: 0 , model : 1 , updateTime: a() , opt : { open : true }},
          {name: "分组5" , stats: 1 , model : 1 , updateTime: a() , opt : { open : true }}
        ]
      }
    },
    methods :{
      to (it){
        if( it.stats == 0 ){
          this.$alert('设备正在启动中，修改设置请先停止任务', '灌溉策略', {
            confirmButtonText: '停止任务',
            cancelButtonText: '取消',
            showCancelButton: true,
            callback: action => {
              if( action == "confirm" ){
                it.stats = 1;
                this.$parent.dialogVisible = true;
              }else{

              }
            }
          });
          return;
        }
        this.$parent.dialogVisible = true;
      }
    }
}
</script>

<style>
  .irrigation .table { 
    border: solid 2px #b2b2b1;
    width: 100%;
    text-align: center; 
    height: calc(100% - 34px);
  }
  .irrigation .table td {
    border: solid 1px #b2b2b1;
    /* padding: 8px; */
  }

  .irrigation {
    background: #ffffff;
    padding: 4px;
    border-radius: 8px;
    height: 100%;
  }

  .irrigation .title{
    font-size: 12px;
    padding: 5px 1px 13px;
  }
  .yuan {
        width: 15px;
    height: 15px;
    background: red;
    border-radius: 50%;
    margin: auto;
  }
  .btn {
    cursor: pointer;
  }
</style>