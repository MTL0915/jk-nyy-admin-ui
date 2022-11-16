<template>
  <div>
    <baidu-map
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      class="map"
      ak="SlwEsY1ump6pZG4w3KpstItyq6ZgeSpF"
      @ready="handler"
      @zoomend="syncCenterAndZoom"
    >
      <bm-marker
        :position="position"
        :dragging="true"
        @dragging="dragging"
        @dragend="dragend"
      />
      <bm-geolocation
        :show-address-bar="true"
        :auto-location="true"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        @locationSuccess="locationSuccess"
        @locationError="locationError"
      />
      <bm-control :offset="{width: '50px', height: '10px'}">
        <!-- 自动填充 -->
        <bm-auto-complete
          :sugStyle="{zIndex: 999999}"
          @searchcomplete="searchcomplete"
          @confirm="confirm"
        >
          <el-input
            v-model="inputValue"
            placeholder="输入关键字进行模糊查询"
            @change="confirmAddress"
          ></el-input>
        </bm-auto-complete>
      </bm-control>

    </baidu-map>
    <div class="flex">
      <div>
        <label>经度：</label>
        <el-input
          v-model="position.lng"
          @input='changeNumber'
        />
      </div>
      <div style="margin:0 10px">
        <label>纬度：</label>
        <el-input
          v-model="position.lat"
          @input='changeNumber'
        />
      </div>
      <el-button @click="handlerSureClick">确定</el-button>
    </div>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker } from 'vue-baidu-map'
import { BmGeolocation } from 'vue-baidu-map'
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗
import BmAutoComplete from "vue-baidu-map/components/others/AutoComplete";
import BmControl from "vue-baidu-map/components/controls/Control";
export default {
  name: 'Map',
  components: {
    BaiduMap,
    BmMarker,
    BmGeolocation,
    BmInfoWindow,
    BmAutoComplete,
    BmControl,
  },
  props: {
    lng: {
      type: Number,
    },
    lat: {
      type: Number
    },
  },
  created () {
    if (this.lng !== undefined && this.lng !== null
      && this.lat !== undefined && this.lat !== null) {
      this.position.lng = this.lng
      this.position.lat = this.lat

      this.center.lng = this.lng
      this.center.lat = this.lat
    }
  },
  data: function () {
    return {
      keyword: '',
      inputValue: '',
      center: { lng: 113.349561, lat: 23.149233 },
      position: { lng: 113.349561, lat: 23.149233 },
      zoom: 13,
      BMap: {},
      map: {}
    }
  },
  methods: {
    confirm (e) {
      console.log(e)
      const _this = this
      let address = e.item.value.province + e.item.value.city + e.item.value.district + e.item.value.business

      var myGeo = new BMapGL.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(address, function (point) {
        console.log(11, point)
        if (point) {
          // _this.map.centerAndZoom(point, 16);
          _this.position.lng = point.lng;
          _this.position.lat = point.lat;
          _this.center.lng = point.lng;
          _this.center.lat = point.lat;
          // map.addOverlay(new BMapGL.Marker(point, { title: e. }))
        } else {
          // alert('您选择的地址没有解析到结果！');
        }
      }, e.item.value.city)
    },
    searchcomplete (e) {
      // debugger
    },
    // 搜索框的搜索事件
    confirmAddress (e) {
      // // console.log("this.model.address:",this.model.address)
      // if (this.inputValue != '') {
      //   // console.log("搜索字段为:" + this.inputValue)
      //   this.keyword = this.inputValue
      // }

      // //为啥使用延时？？
      // //因为上面搜索框是change事件，变化的太快了看起来效果不好所以添加了延时
      // setTimeout(() => {
      //   // debugger

      //   //搜索时把需要标点的地址传入local.search中
      //   var local = new BMap.LocalSearch(this.map, {
      //     renderOptions: { map: this.map }
      //   });
      //   local.search(this.keyword);
      // }, 600)
    },
    handler ({ BMap, map }) {
      this.zoom = 13
      this.BMap = BMap
      this.map = map

      // geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      // if (this.model.hasOwnProperty('address')) {//如果当前model中包含address 则证明是修改弹框里面的地址数据（地址存在，打开弹框显示地址标点）
      //   this.keyword = this.model.address
      //   this.inputValue = this.model.address
      // } else {//否则显示默认标点（这里的经纬度代表成都）
      //   //第二个参数  10 代表地图缩 放级别,最大为19,最小为0

      //   setTimeout(() => {
      //     this.map.centerAndZoom(new BMap.Point(113.93588, 22.74894), 14);
      //   }, 1000);
      //   this.keyword = ''
      //   this.inputValue = ''
      // }
      // // 点击百度地图上的搜索出来的红色标记点
      // map.addEventListener("click", ({ point }) => {
      //   debugger
      //   this.position.lng = point.lng;
      //   this.position.lat = point.lat;
      //   this.center.lng = point.lng;
      //   this.center.lat = point.lat;
      //   geocoder.getLocation(point, res => {
      //     debugger
      //     this.inputValue = res.address;
      //     this.model.address = res.address;
      //     this.model.storeLongitude = point.lng
      //     this.model.storeLatitude = point.lat
      //     this.$forceUpdate();
      //   });
      // });
    },
    syncCenterAndZoom (e) {
      this.zoom = e.target.getZoom()
    },
    dragging (e) {
      this.position.lng = e.point.lng
      this.position.lat = e.point.lat
    },
    dragend (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    changeNumber () {
      // if( typeof this.lng*1 === 'number' && typeof this.lng*1 === 'number' ){
      this.center.lng = this.position.lng
      this.center.lat = this.position.lat
      // this.handlerSureClick()
      // }
    },
    handlerSureClick (e) {
      // var lng = this.center.lng;
      // var lat = this.center.lat;
      this.$emit('updatePosition', { lng: this.position.lng, lat: this.position.lat })
    },
    locationSuccess (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
      this.position.lng = e.point.lng
      this.position.lat = e.point.lat
    },
    locationError (error) {
      this.$notify({
        title: '错误',
        message: error.message,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>>
  .el-dialog__header
    padding 15px 20px

  .el-dialog__body
    padding 0

.map
  width 100%
  height 500px

  >>> .anchorBL
    display none

.flex
  display flex
  align-items center

  .el-input
    width 120px
</style>

