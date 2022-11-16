<template>
  <div>
    <div style="position: absolute;top: 34px;right: 33px;"><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a></div>
    <el-card shadow="never">
      <div style="padding:10px">
        <el-date-picker
          v-model="start_insert_date"
          value-format="yyyy-MM-dd"
          type="date"
          @change="change($event, 'start')"
          placeholder="选择日期">
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          v-model="end_insert_date"
          value-format="yyyy-MM-dd"
          type="date"
          @change="change($event, 'end')"
          placeholder="选择日期">
        </el-date-picker>
        <el-button style="margin-left:10px" size="middle" type="primary" @click="search">搜索</el-button>
      </div>
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(tlist,i) in pictureDatas"
            :key="i"
          >
            <label>{{ tlist.time }}</label>
            <div style="display:flex;flex-wrap: wrap;">
              <div
                v-for="(photo) in tlist.cameraList"
                :key="photo.id"
                style="margin:3px;"
                class="pp"
              >
                <el-image
                  :ref="photo.id"
                  :preview-src-list="[serviceUrl+photo.image_path]"
                  :src="serviceUrl+photo.thumbnail_path"
                  fit="cover"
                  style="width: 190px; height: 150px;margin:3px;"
                  @click="openPicture(photo)"
                />
              </div>
            </div>
          </el-timeline-item>

        </el-timeline>
      </div>
      <!-- <el-table
        ref="multipleTable"
        :data="pictureDatas"
        :default-sort="{prop: 'insert_date', order: 'descending'}"
        border
      >
        <el-table-column
          type="index"
          width="55"
          align="center"
          label="序号"
        />
        <el-table-column
          prop="image_path"
          label="上传图片"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              :ref="scope.row.id"
              :preview-src-list="[getLogo(scope.row.image_path)]"
              :src="getLogo(scope.row.thumbnail_path)"
              fit="cover"
              style="width: 190px; height: 150px;margin:3px;"
              @click="openPicture(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :formatter="getRecognitionResult"
          prop="status"
          label="识别结果"
          align="center"
          width="150"
        />
        <el-table-column
          :formatter="formatInsertDate"
          prop="insert_date"
          label="上传时间"
          align="center"
          width="200"
          sortable
        />
      </el-table> -->

      <div
        class="pagination"
        style="margin-top:10px"
        v-show="!searchShow"
      >
        <el-pagination
          :total="page.totalNum"
          :page-size="page.maxResult"
          :hide-on-single-page="true"
          background
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <div
      v-show="sensorShow"
      style="z-index: 9999;position: fixed;top: 0;left: 0;width:100%;height:20%;cursor: pointer;"
      @click="closePicture"
    >
      <div style="background: #404040;color: #ffffff;display:flex;">
        <div style="margin-left: 30px;">
          <!-- 温度 -->
          <div>
            <div v-if="photoSensor0">
              <span style="font-size: 50px;">{{photoSensor0.value+photoSensor0.unit+'   '}}</span>
              <span style="font-size: 25px;">{{photoSensor0.name}}</span>
            </div>
            <div v-else><span style="font-size: 50px;">暂无温度</span></div>
          </div>
          <!-- 时间 -->
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间</span>
            </div>
          </div>
        </div>
        <!-- 传感器 -->
        <div
          v-if="photoSensor1"
          style="text-align: center;font-size: 18px;margin-left: 30px;"
        >
          <div style="margin-top:18px;"><span>{{photoSensor1.name}}</span></div>
          <div><span>{{photoSensor1.value+photoSensor1.unit}}</span></div>
        </div>
        <div
          v-if="photoSensor2"
          style="text-align: center;font-size: 18px;margin-left: 30px;"
        >
          <div style="margin-top:18px;"><span>{{photoSensor2.name}}</span></div>
          <div><span>{{photoSensor2.value+photoSensor2.unit}}</span></div>
        </div>
        <div
          v-if="photoSensor3"
          style="text-align: center;font-size: 18px;margin-left: 30px;"
        >
          <div style="margin-top:18px;"><span>{{photoSensor3.name}}</span></div>
          <div><span>{{photoSensor3.value+photoSensor3.unit}}</span></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { getImage } from '@/utils/image_util'
import { findCameraByHd_device_id, cameraPictureList} from '@/api/hd_device_camera'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'
import { parseTime } from '@/utils/index'

export default {
  name: 'DeviceData',
  components: {
    Schart
  },
  data () {
    return {
      searchShow: false,
      hd_device_id: '',
      pictureDatas: [],
      serviceUrl: process.env.IMG_URL,
      onlypictureDatas: [],
      page: {
        maxResult: 10,
        num: 1,
        page: 0,
        startPosition: 0,
        totalNum: 10,
      },
      sensorShow: false,
      photoId: null,
      photoTime: null,
      photoSensor0: null,
      photoSensor1: null,
      photoSensor2: null,
      photoSensor3: null,
      start_insert_date: "",
      end_insert_date: ""
    }
  },
  mounted () {
    var hd_device_id = this.$route.query.id;
    if (hd_device_id != null && hd_device_id != '') {
      this.show(hd_device_id);
    }
  },
  filters: {
    formatDate (date) {
      if (!date) {
        return ''
      }
      return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    search() {
      if (
        ((this.start_insert_date == "" || this.start_insert_date == null) && this.end_insert_date != "")
      ) {
        this.$message({
          message: "时间不能为空",
          type: "warning"
        })
        return;
      }
      const start = new Date(this.start_insert_date).getTime();
      const end = new Date(this.end_insert_date).getTime();
      if (start > end) {
        this.$message({
          message: "开始时间不能大于结束时间",
          type: "warning"
        })
        return;
      }
      const data = {
        'hd_device_id': this.hd_device_id,
        'start_insert_date': this.start_insert_date + " 00:00:00",
        'end_insert_date': this.end_insert_date ==""|| this.end_insert_date == null ? "" :this.end_insert_date + " 23:59:59"
      }
      if (this.start_insert_date != "" && this.start_insert_date != null) {
        cameraPictureList(data).then(res => {
          this.pictureDatas = res.data.content
          this.searchShow = true;
        })
      } else {
        this.searchShow = false;
        this.getPictureData();
      }
    },
    change(value, type) {
      if (type === 'start') {
        this.start_insert_date == value
      } else {
        this.end_insert_date == value
      }
    },
    parseTime,
    openPicture (photo) {
      this.photoTime = null
      this.photoSensor0 = null
      this.photoSensor1 = null
      this.photoSensor2 = null
      this.photoSensor3 = null

      this.photoId = photo.id
      this.photoTime = photo.insert_date
      if (photo.sensor_json) {
        var list = JSON.parse(photo.sensor_json)
        for (var i = 0; i < list.length; i++) {
          var s = list[i]
          if (s.sensor_code !== '101' && s.sensor_code !== '102' && s.sensor_code !== "801") {
            if (s.sensor_code === '23' && this.photoSensor0 === null) {
              this.photoSensor0 = { name: s.sensor_name, value: s.sensor_value, unit: s.sensor_unit }
            } else {
              if (this.photoSensor1 === null) {
                this.photoSensor1 = { name: s.sensor_name, value: s.sensor_value, unit: s.sensor_unit }
              } else if (this.photoSensor2 === null) {
                this.photoSensor2 = { name: s.sensor_name, value: s.sensor_value, unit: s.sensor_unit }
              } else if (this.photoSensor3 === null) {
                this.photoSensor3 = { name: s.sensor_name, value: s.sensor_value, unit: s.sensor_unit }
                break
              }
            }
          }
        }
      }
      this.sensorShow = true
    },
    closePicture () {
      this.sensorShow = false
      if (this.photoId) {
        if (this.$refs[this.photoId][0]) {
          this.$refs[this.photoId][0].showViewer = false
        } else {
          this.$refs[this.photoId].showViewer = false
        }
      }
    },
    handleSizeChange (size) {
      this.page.size = size
      this.getPictureData()
    },
    handleCurrentChange (page) {
      this.page.page = page - 1
      this.getPictureData()
    },
    show (hd_device_id) {
      this.hd_device_id = hd_device_id
      this.getPictureData()
    },
    getPictureData () {
      cameraPictureList({ 'hd_device_id': this.hd_device_id, 'page': this.page.page, 'size': this.page.maxResult }).then(res => {
        this.pictureDatas = res.data.content
        this.page.totalNum = res.data.totalElements
      })
    },
    getLogo (img) {
      return getImage(img)
    },
    getRecognitionResult (obj) {
      var status = obj.status

      if (!status) {
        return '未知'
      }

      if (status === 'open') {
        return '开启'
      } else if (status === 'close') {
        return '关闭'
      } else if (status === 'none') {
        return '无设备'
      } else {
        return status
      }
    },
    formatInsertDate (obj) {
      if (!obj.insert_date) {
        return ''
      }
      return formatDate(new Date(obj.insert_date), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    next(vm=>{
      vm.searchShow = false
      vm.start_insert_date = ""
      vm.getPictureData();
    })
  },
}
</script>

<style lang="stylus" scoped>
.img_list img
  width 250px
  height 200px
</style>
