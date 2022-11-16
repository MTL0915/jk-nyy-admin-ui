<template>
  <div class="wrap">
    <div class="header">
      <div class="btnBox">
        <div
          class="btn"
          :class="[type === 'day' ? 'btnActive' : '']"
          @click="type = 'day'"
        >天</div>
        <div
          class="btn"
          :class="[type === 'custom' ? 'btnActive' : '']"
          @click="type = 'custom'"
        >自定义</div>
      </div>
      <el-date-picker
        v-model="timeDay"
        v-show="type === 'day'"
        :clearable="false"
        value-format="yyyy-MM-dd"
        size="small"
        style="margin: 0 10px;width: 150px"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-date-picker
        v-if="type === 'custom'"
        v-model="timeValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        :clearable="false"
        size="small"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="timeChange()"
        style="margin: 0 10px;width: 380px"
      />
      <div>
        <el-button
          type="success"
          size="small"
          @click="updateList"
        >查询</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        size="small"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column
          prop="gpsTime"
          label="时间"
          :formatter="formatDate"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="lng"
          align="center"
          label="经度"
        ></el-table-column>
        <el-table-column
          prop="lat"
          align="center"
          label="纬度"
        ></el-table-column>
        <el-table-column
          prop="altitude"
          align="center"
          label="海拔"
        ></el-table-column>
        <el-table-column
          prop="gpsAzimuth"
          :formatter="getDirection"
          align="center"
          label="方位角/方向"
        ></el-table-column>
        <el-table-column
          prop="gpsSpeed"
          align="center"
          label="速度"
        ></el-table-column>
        <el-table-column
          prop="gpsSatelliteNum"
          align="center"
          label="卫星数量"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div style="height: 300px;" ref="map">
      <div style="height: 100%;position:relative">
        <div style="position: absolute;top: 20px;right: 20px;z-index: 999;" @click="fullScreen">
          <img v-if="!isFullScreen" src="@/assets/img/qp.png" title="全屏" style="width: 30px;height: 30px">
          <img v-if="isFullScreen" src="@/assets/img/xp.png" title="小屏" style="width: 30px;height: 30px">
        </div>
        <div
        id="map"
        style="height: 100%" />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
import { getDirectionByArimuth } from '@/utils/device_util'
import { getDeviceHistoryDataPage } from "@/api/hd_device_data.js"
import startImg from '@/assets/img/location_start.png'
import endImg from '@/assets/img/location_end.png'
import { Convertor } from '@/utils/pointTransition'
export default {
  props: {
    device_id: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      type: 'day',
      timeValue: null,
      timeDay: '',
      tableData: [],
      lineData: [], // 经纬度坐标点
      total: 0,
      currentPage: 1,
      page: 1,
      size: 10,
      map: null,
      lng: '113.23333',
      lat: '23.16667',
      zoom: 15,
      isFullScreen: false
    }
  },
  watch: {
    device_id: function () {
      this.updateList();
    }
  },
  created () {
    getDeviceHistoryDataPage({"device_id": this.device_id, message_type: "UploadSta", "startPosition": 0, "maxResult": 1}).then(result => {
      if (result.code === 200) {
        this.timeDay = formatDate(new Date(result.data.data[0].response_body.gpsTime), 'yyyy-MM-dd')
        this.updateList();
      }
    })
  },
  mounted () {
    this.initMap()
  },
  methods: {
    // 地图组件全屏按钮
    fullScreen() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        // 全屏
        this.$refs.map.style.position = 'fixed'
        this.$refs.map.style.top = '0'
        this.$refs.map.style.bottom = '0'
        this.$refs.map.style.left = '0'
        this.$refs.map.style.right = '0'
        this.$refs.map.style.height = '100%'
        this.$refs.map.style.zIndex = '9999'
      } else {
        // 全屏
        this.$refs.map.style.position = 'relative'
        this.$refs.map.style.height = '300px'
        this.$refs.map.style.zIndex = '10'
      }
    },
    // 生成轨迹
    line () {
      if (this.lineData.length === 0) {
        return
      }
      const arr = [];
      for (let i = 0; i < this.lineData.length; i++) {

        const temp = this.lineData[i];
        let poi = Convertor(temp.lng, temp.lat)
        arr.push(new window.BMapGL.Point(poi.lng, poi.lat))
      }
      var polyline = new BMapGL.Polyline(
        arr,
        {
          strokeColor: "#83EC2C",
          strokeWeight: 7,
          strokeOpacity: 1
        });   //创建折线
      this.map.addOverlay(polyline);
      this.location()
      this.start_end(endImg, arr[0])
      this.start_end(startImg, arr[arr.length - 1])
    },
    initMap () {
      this.map = new window.BMapGL.Map("map", {
        // eslint-disable-next-line no-undef
        mapType: BMAP_SATELLITE_MAP
      });
      var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
      this.map.addControl(scaleCtrl);
      //允许鼠标双击放大地图
      this.map.enableScrollWheelZoom();
      this.location()
    },
    // 清除标记
    removeMarket () {
      const market = this.map.getOverlays();
      if (market && market.length > 0) {
        for (let i = 0; i < market.length; i++) {
          this.map.removeOverlay(market[i]);
        }
      }
    },
    start_end (img, point) {
      var myIcon = new BMapGL.Icon(img, new BMapGL.Size(25, 37));
      // 创建标注对象并添加到地图  
      var marker = new BMapGL.Marker(point, { icon: myIcon });
      this.map.addOverlay(marker);
    },
    location () {
      this.map.centerAndZoom(
        new window.BMapGL.Point(this.lng, this.lat),
        this.zoom
      ); // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      // 添加标记
      // const market = new window.BMapGL.Marker(
      //   new window.BMapGL.Point(this.lng, this.lat)
      // );
      // this.map.addOverlay(market);
    },
    handleSizeChange (size) {
      this.size = size;
      this.updateList();
    },
    handleCurrentChange (page) {
      this.page = page;
      this.updateList();
    },
    getDirection (obj) {
      return getDirectionByArimuth(obj.gpsAzimuth);
    },
    formatDate (obj) {
      return formatDate(new Date(obj.gpsTime), "yyyy-MM-dd hh:mm:ss");
    },
    timeChange () {
      console.log("timeValue", this.timeValue);
    },
    updateList () {
      var startPosition = (this.page - 1) * this.size;
      var maxResult = this.size;
      var params = { "device_id": this.device_id, message_type: "UploadSta", "startPosition": startPosition, "maxResult": maxResult };
      if (this.type === 'day') {
        params.starttime = this.timeDay + ' 00:00:00';
        params.endtime = this.timeDay + ' 23:59:59';
        this.getLineData()
      } else {
        if (this.timeValue) {
          params.starttime = this.timeValue[0];
          params.endtime = this.timeValue[1];
        }
      }
      getDeviceHistoryDataPage(params).then(res => {
        if (res.code === 200) {
          var data = res.data;
          var dataArr = data.data;
          if (!dataArr || dataArr.length === 0) {
            this.tableData = [];
          }
          var tableData = [];
          for (var dataObj of dataArr) {
            tableData.push(dataObj.response_body);
          }
          this.tableData = tableData;
          this.total = data.count;
        }
      });
    },
    getLineData() {
      var params = { "device_id": this.device_id, message_type: "UploadSta", "startPosition": 0, "maxResult": 99999 };
      params.starttime = this.timeDay + ' 00:00:00';
      params.endtime = this.timeDay + ' 23:59:59';
      getDeviceHistoryDataPage(params).then(res => {
        if (res.code === 200) {
          var dataArr = res.data.data;
          if (!dataArr || dataArr.length === 0) {
            this.lineData = [];
          }
          var lineData = [];
          for (var dataObj of dataArr) {
            lineData.push(dataObj.response_body);
          }
          this.lineData = lineData;
          if (this.lineData.length > 0) {
            this.lng = this.lineData[0].lng
            this.lat = this.lineData[0].lat
            this.removeMarket()
          }
          this.line()
        }
      });
    },
  }
}
</script>
<style lang="stylus" scoped>
.wrap
  width 100%

.header
  display flex
  justify-content flex-end

.btnBox
  display inline-block
  border 1px solid #ccc
  border-radius 5px
  overflow hidden

.btn
  display inline-block
  width 50px
  height 30px
  line-height 30px
  text-align center
  cursor pointer

.btnActive
  color #fff
  background #409EFF

>>>.anchorBL img
  display none !important
>>>.BMap_cpyCtrl
  display none !important
</style>