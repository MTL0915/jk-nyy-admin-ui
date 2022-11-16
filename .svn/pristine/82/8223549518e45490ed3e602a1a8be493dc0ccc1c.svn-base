<template>
  <div v-loading="loading">
    <!-- 头部 -->
    <div style="display:flex;justify-content: space-between;padding: 10px;">
      <el-date-picker
        size="mini"
        v-model="photoTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        unlink-panels
        align="right"
        @change="page=1;init()"
      />
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{getTime(scope.row.insert_date)}}
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div v-if="scope.row.hd_device_camera_thumbnail_path">
            <el-image
              :src="scope.row.hd_device_camera_thumbnail_path"
              fit="cover"
              style="width: 190px; height: 150px;margin:3px;"
              @click="recognition(scope.row.hd_device_camera_upload_id)"
            />
          </div>
          <div v-else>
            暂无图片
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="识别状态"
      >
        <template slot-scope="scope">
        {{getRecognitionResult(scope.row.status,'JK-ZS')}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="page"
      @current-change="pageChange"
    />
    <CameraPhotoDetails ref="CameraPhotoDetails" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/date"
import { getRecognitionResult } from '@/utils/image_util'
import { listCameraStatus } from '@/api/hd_device_camera'
import CameraPhotoDetails from '@/views/base/video/module/CameraPhotoDetails'
export default {
  components: {
    CameraPhotoDetails
  },
  props: {
    hd_device_id: {
      type: String,
      default: null
    },
    device_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      photoTime: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '一天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '三天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '五天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 366);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    }
  },
  created () {
    this.init()
  },
  methods: {
    getRecognitionResult,
    formatDate,
    init () {
      this.loading = true
      let start_time = null
      let end_time = null
      if (this.photoTime) {
        start_time = this.photoTime[0]
        end_time = this.photoTime[1]
      }
      listCameraStatus({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        start_time: start_time,
        end_time: end_time,
        page: this.page - 1,
        size: this.size
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          const _this = this
          res.data.content.map(v => {
            if (v.hd_device_camera_thumbnail_path) {
              v.hd_device_camera_thumbnail_path = _this.getImage(v.hd_device_camera_thumbnail_path)
            }
          })
          this.tableData = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    recognition (id) {

      this.$refs.CameraPhotoDetails.getData(id)
    },
    // 分页
    pageChange (val) {
      this.page = val
      this.init()
    },
    getTime (time) {
      return this.formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
    },
    getImage (path) {
      return process.env.IMG_URL + path
    }
  }
}
</script>