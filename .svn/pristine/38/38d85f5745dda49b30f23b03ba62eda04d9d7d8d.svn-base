<template>
  <div class='warning'>
      <div class='title'>
          <span>预警信息</span>
      </div>
      <div style='height:calc(100% - 50px); overflow: auto;'>
          <div v-for='(it,i) in dataList' :key='i' class='warningInfo' :style='it.type == 0 ? "color:red" : "color:#858c1c"'>
              <span>
                  {{it.text}}
              </span>
          </div>
      </div>
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
    data(){
        return {
            dataList : [
                { text : "育苗地块1 土壤温度值（28.6℃）过高，"+ a() , type: 0 },
                { text : "育苗地块2 土壤温度值（28.1℃）过高，"+ a() , type: 0 },
                { text : "育苗地块1 土壤温度值（22.5℃）稍高，"+ a() , type: 1},
                { text : "育苗地块3 土壤温度值（27.1℃）过高，"+ a() , type: 0},
                { text : "育苗地块1 土壤温度值（23.5℃）稍高，"+ a() , type: 1},
                { text : "育苗地块1 土壤温度值（22.1℃）稍高，"+ a() , type: 1},
                { text : "育苗地块2 土壤温度值（25.2℃）过高，"+ a() , type: 0},
                { text : "育苗地块1 土壤温度值（26.6℃）过高，"+ a() , type: 0},
                { text : "育苗地块2 土壤温度值（26.3℃）过高，"+ a() , type: 0},
                { text : "育苗地块1 土壤温度值（27.9℃）过高，"+ a() , type: 0}
            ]
        }
    }
}
</script>

<style>
    .warning {
        height:100%;
    }
    .warning .title {
        padding: 15px 15px;
    }
    .warning .warningInfo {
        padding: 15px;
        /* height: 100%; */
    }
</style>