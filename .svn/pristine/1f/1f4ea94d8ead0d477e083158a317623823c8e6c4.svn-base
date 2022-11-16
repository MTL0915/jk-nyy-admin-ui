<template>
  <div style="padding-bottom: 30px;height:100%;overflow:auto">
    <div>
      <div role="tablist" aria-multiselectable="true">
        <el-table
          ref="filterTable"
          :data="sensorList"
          row-key="id"
          style="width: 100%;font-size:13px"
           v-loading="loading"
        >
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              <div style="text-align:center">
                <img :src="getLogo(scope.row.hd_sensor_type_image_path)" min-width="40" height="40" >
                <div>
                  <span
                    style="margin-left: 10px"
                  >{{ scope.row.name }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            property="system_response_time"
            label="更新时间"
            width="150"
          />
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-radio-group
                v-if="scope.row.hd_sensor_type_code =='101'"
                v-model="scope.row.value2"
                size="small"
                @change="handelSwitch(scope.row,scope)"
              >
                <el-radio-button :label="1">打开</el-radio-button>
                <el-radio-button :label="0">关闭</el-radio-button>
              </el-radio-group>
              <el-radio-group
                v-if="scope.row.hd_sensor_type_code === '102'"
                v-model="scope.row.value2"
                size="small"
                @change="handelWindow(scope.row.value2,scope.row.id,scope.$index)"
              >
                <el-radio-button key="8" label="8">打开</el-radio-button>
                <el-radio-button key="9" label="9">关闭</el-radio-button>
                <el-radio-button key="10" label="10">暂停</el-radio-button>
              </el-radio-group>
            </template>

          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import WebSocket from '@/utils/OpenWebSocket'
import { openOrCloseChannel, handelWindow } from '@/utils/websocket_util'
import { findByHd_device_idOrDevice_id } from "@/api/hd_device_sensor";
import initData from '@/mixins/initData'
export default {
  name: 'Swtichshow',
  components: {
    initData
  },
  mixins: [initData],
  props: {
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hd_device_id: '',
      device_id: '',
      sensorList: [],
      loading_dialog: false,
      ws:null,
      loading:false
    }
  },
  created() {
    this.$nextTick(() => {
        this.hd_device_id = this.$route.query.hd_device_id;
        this.device_id = this.$route.query.device_id;
        this.token = this.$route.query.token;
        // 博罗项目演示使用
        this.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzgwMDEzODEwMCIsImV4cCI6MTU5MjAxNzI0NCwiaWF0IjoxNTkwNzIxMjQ0fQ.jJ71cuatBX2yWVAQolSvMiN-tz2hJ7YKi03F4znY43utSe9zNMfjzhOepiezCalr3HzLeKsonfoVyX1vdWtOiw";
        
        this.showSensorList(this.hd_device_id,this.device_id)
        this.ws = new WebSocket(process.env.WEBSOCKET_URL, this.token)

        this.ws.open()
        // 当浏览器界面关闭或刷新时触发该事件
        window.addEventListener('beforeunload', e => {
            this.ws.close()
        })
    })
  },
  methods: {
    
    showSensorErrorInfo(id) {
      this.$alert(
        '数据异常',
        '异常信息',
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        }
      )
    },
    
    showSensorList(data) {
       findByHd_device_idOrDevice_id(this.hd_device_id,this.device_id).then(res => {
        var data = res.data;
        for (var i = 0, len = data.length; i < len; i++) {
            data[i].value2 = data[i].value
        }
        this.sensorList = data
      })

    },
    getLogo(img) {
      if (img === null) {
        return '/static/img/lg/ck-1.jpg'
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },

    handelWindow(value, hd_sensor_id, index) {
      var obj = this.sensorList[index]
      this.loading = true;
      handelWindow(hd_sensor_id, value, this.ws)
        .then(res => {
          obj.value = obj.value2
          this.sensorList.splice(index, 1, obj)
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.msg)
          obj.value2 = obj.value
          this.sensorList.splice(index, 1, obj)
          this.loading = false;
        })
    },
    handelSwitch(row, scope) {
      var hd_sensor_id = row.id

      var index = scope.$index
      var obj = this.sensorList[index]

      this.loading = true;
      openOrCloseChannel(hd_sensor_id, row.value2, this.ws)
        .then(res => {
          obj.value = row.value2
          this.sensorList.splice(index, 1, obj)
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.msg)
          obj.value2 = row.value
          this.sensorList.splice(index, 1, obj)
          this.loading = false;
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.in_sen_title {
  border-bottom: solid #dadddf 1px;
  line-height: 55px;
  font-size: 17px;
  margin: 0px;
  background-color: #eeede8;
  padding-left: 20px;
  color: #333;
}

.el-collapse-item__header {
  height: auto;
  line-height: inherit;
}

.el-collapse-item__wrap {
  transition: all 0.45s;
}

.infos_imgsTitle {
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}

.clickBtn {
  span {
    padding: 0 5px;
  }
}
</style>
