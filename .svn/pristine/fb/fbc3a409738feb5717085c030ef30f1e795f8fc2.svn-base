<template>

  <div class="map_search_vue">

    <el-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入地址、地名"
      @select="handleSelect"
      :trigger-on-focus="false"
      v-on:keyup.enter="find"
      :hide-loading='true'
      :popper-class='autoCompleteListClass ? "" : "autoCompleteListHide"'
    >
    </el-autocomplete>

    <div>
      <el-button style='padding: 12px 12px;' slot="append" @click='find()' icon="el-icon-search"></el-button>
      <el-button v-show='oldExtent' title='退回上一步位置' style='padding: 12px 12px;margin: -5px;' slot="append" @click='back()' icon="el-icon-back"></el-button>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ajaxApi from '@/api/map'
import request from '@/utils/request'
export default {
  name: 'GeometrySearch',
  data () {
    return {
      state1: "",
      autoCompleteListClass : false,
      oldExtent : null,
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  mounted () {
    // this.restaurants = this.loadAll();
    // this.getData()
  },
  methods: {
    go (keyWord, fn) {
      // 全国
        $.ajax({
          url : "http://api.map.baidu.com/place/v2/search?query="+keyWord+"&region=广州市&output=json&scope=2&ak=YG6MZvfvWzdwYiNCB4Goh2N0Khmc4jAO",
          dataType : "jsonp",
          success : function(e){
            var data = e.result||e.results;
            fn && fn(data.map((e)=>{ e.value = e.name ; return e; }))
          }
        })
    },
    querySearch (queryString, cb) {
      this.autoCompleteListClass = false;
      if( queryString.indexOf(",") > -1 ){
        // 判断为经纬度查询
        queryString.split(",")
        return;
      }
      if( this.key ){ clearTimeout(this.key); this.key = null;};
      this.key = setTimeout(()=>{
        clearTimeout(this.key);
        this.key = null;
        this.go(queryString, (e) => {
          this.autoCompleteListClass = true;
          // 调用 callback 返回建议列表的数据
          cb(e);
        })
      },1000)
    },
    handleSelect (item) {
      var point = {x:item.location.lng,y:item.location.lat};
      if( 180 < point.x || point.x < -180 || 90 < point.y || point.y < -90 ){
        return this.$message({ message: `纬度,经度格式不正确！示例如：113.982667,22.962145
纬度在前，中间逗号，纬度范围-90~90，经度范围-180~180`, type: 'warning' });
      }
      point = esri.geometry.geographicToWebMercator(new esri.geometry.Point(point));
      this.oldExtent = map.extent;
      map.centerAndZoom(point,14);
        var pictureMarkerSymbol = new window.esri.symbol.PictureMarkerSymbol('/static/map/img/dw.png', 32, 24);
        var graphic = new window.esri.Graphic(point,pictureMarkerSymbol);
        map.graphics.add(graphic);
        var key = setInterval(() => {
          graphic.visible ? graphic.hide() : graphic.show();
        }, 500);
        setTimeout(() => {
          clearInterval(key);
          graphic.hide();
        }, 3100);
    },
    find (keyWord = this.state1 , fn ){
      var xy = keyWord.replace(/\s/g,"").split(",");
      if( xy.length === 2 && !isNaN(xy[0]*1) && !isNaN(xy[1]*1) ){
        // var point = esri.geometry.geographicToWebMercator(new esri.geometry.Point([xy[0]*1,xy[1]*1]));
        this.handleSelect({location : { lng : xy[0]*1, lat : xy[1]*1 }});
        return;
      };
      $.ajax({
          url : "http://api.map.baidu.com/geocoding/v3/?address="+keyWord+"&output=json&ak=YG6MZvfvWzdwYiNCB4Goh2N0Khmc4jAO",
          dataType : "jsonp",
          success : (e)=>{
            this.handleSelect(e.result);
            fn && fn(e.result);
          }
      })
    },
    back (){
      if( this.oldExtent ){
        map.setExtent(this.oldExtent);
        this.oldExtent = null;
        this.state1 = "";
      } 
    } 
  }
}

</script>

<style>
.map_search_vue {
  position: absolute;
  left: 15px;
  top: 15px;
  background: #ffffff;
  display: flex;
  border-radius: 8px;
}
.autoCompleteListHide {
  display: none;
}
</style>
