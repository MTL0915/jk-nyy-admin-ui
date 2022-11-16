<template>
  <div>
    <el-collapse class='jdTree' v-show='dk.length!==0 || sb.length!==0' v-model="activeNames" accordion @change="handleChange">
      <el-collapse-item title="地块" v-show='dk.length!==0' name="1">
        <div v-for=" (it,i) in dk " :key='i' style='margin-left: 5px;position: relative;'>
          <p> {{it.option ? it.option.name : ""}} </p>
          <span style='color: red;position: absolute;top: 0;right: 0;cursor: pointer;' @click='addDK(it)'>绘制</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="设备" v-show='sb.length!==0' name="2">
        <div v-for=" (it,i) in sb " :key='i' style='margin-left: 5px;position: relative;'>
          <p> {{it.option ? it.option.name : ""}} <span style='font-size: 12px;color: #999;'>{{it.option ? it.option.rs_facilities_name : ""}}</span> </p>
          <div style='position: absolute;top: 0;right: 0;'>
            <span style='color: red;cursor: pointer;' @click='addSB(it)'>绘制</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import ajaxApi from '@/api/map'
export default {
  name: 'JdTree',
  data() {
    return {
      activeNames: '1',
      JdTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dk: [],
      sb: [],
      jd: []
    }
  },
  methods: {
    handleChange(val) {
        // console.log(val);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    show (){
      // 获取基地的数据
      var data = this.$parent.getJD()
      // 填充地块
      this.dk = data.dk ? data.dk.filter((e)=> { return !e.graphic; }) : []; 
      // 填充设备
      this.sb = data.sb ? data.sb.filter((e)=> { return !e.graphic; }) : [];
      if(this.dk.length == 0){
        if( this.sb.length == 0 ){
          // 如果没有设备的画默认显示设备
          this.activeNames = "";
        }else{
          // 如果没有地块的画默认显示设备
          this.activeNames = "2";
        }
      } 
    },
    render (){
      this.show();
    },
    // 为已创建的添加几何数据
    addSB: function(dk) {
      var data = dk.option;
      var name = data.name;
      var id = data.id
      this.$parent.createSheBei({ ...data , name, id },(geometry)=>{
        this.$parent.showSBEdit(geometry)
      });
    },
    // 为已创建的添加几何数据
    addDK: function(dk) {
      var data = dk.option;
      var name = data.name;
      var id = data.id
      this.$parent.createDiKuai({ name, id },function(geometry){

      });
    },
    // 解绑设备
    removeSB : function(it){
      this.$parent.removeDevice(it.option.id,(e)=>{
        var sbs = this.$parent.getJD().sb;
        var sb = sbs.find((e)=>{ return e.option.id === it.option.id });
        sbs = sbs.splice( sbs.indexOf(sb) , 1 );
        this.render();
      });
    }

  }
}
</script>

<style>
.jdTree {
  position: absolute;
  max-height: 400px;
  overflow: auto;
  top: 66px;
  left: 30px;
  border-radius: 4px;
  padding: 15px;
  border: solid 1px #6c6c6c;
  width: 260px;
  background: #fff;
}
.jdTree::-webkit-scrollbar {
  width: 0px;
}
</style>
