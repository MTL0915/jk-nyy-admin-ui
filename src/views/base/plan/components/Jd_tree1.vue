<template>
  <el-collapse class='jdTree' v-model="activeNames" accordion @change="handleChange">
    <el-collapse-item title="地块" name="1">
      <div v-for=" (it,i) in dk " :key='i' style='margin-left: 5px;position: relative;'>
        <p> {{it.name }} </p>
        <span style='color: red;position: absolute;top: 0;right: 0;cursor: pointer;' @click='addDK(it)'>绘制</span>
      </div>
    </el-collapse-item>
    <el-collapse-item title="设备" name="2">
      <div v-for=" (it,i) in sb " :key='i' style='margin-left: 5px;position: relative;'>
        <p> {{it.name}} </p>
        <span style='color: red;position: absolute;top: 0;right: 0;cursor: pointer;' @click='addSB(it)'>绘制</span>
      </div>
    </el-collapse-item>
  </el-collapse>
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
  mounted(){
    
    var id;
    this.queryDevice(id,()=>{
      this.getDKByJDId(id,()=>{
        
      });
    });

  },
  methods: {
    handleChange(val) {
        // console.log(val);
    },
    render (){
      this.show();
    },
    // 为已创建的添加几何数据
    addSB: function(dk) {
      
    },
    // 为已创建的添加几何数据
    addDK: function(dk) {
      
    },
    // 查询设备
    queryDevice :function (id, call) {
      request({
        url: '/hd/hd_device/queryDevice',
        method: 'get',
        params: { bs_base_id: id }
      }).then((event)=> {
        this.dk = event.data.content;
        call && call(event)
      })
    },
    // 根据基地id获取基地内部的地块
    getDKByJDId :function(id, call) {
      return request({
        url: '/rs/rs_facilities/findByBs_base_id',
        method: 'get',
        params: { bs_base_id : id }
      }).then((event)=> {
        this.dk = event.data;
        call && call(event)
      })
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
