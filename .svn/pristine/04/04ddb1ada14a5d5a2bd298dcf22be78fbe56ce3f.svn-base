<template>
  <div>
    <div
      style="position: absolute;top: 34px;right: 33px;"
      v-if="webType !== 'router-url'"
    ><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a></div>
    <el-card shadow="never">
      <div style="text-align:right;">
        <el-select
          size="mini"
          v-model="rs_facilities_id"
          placeholder="选择地块"
          @click="cur_page=1;init()"
          clearable
        >
          <el-option
            v-for="item in facilitiesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          size="mini"
          v-model="hd_device_id"
          placeholder="选择设备"
          @click="cur_page=1;init()"
          clearable
        >
          <el-option
            v-for="item in deviceOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-select
          size="mini"
          v-model="operator"
          placeholder="操作人"
          @click="cur_page=1;init()"
          clearable
        >
          <el-option
            v-for="item in operatorOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
          </el-option>
        </el-select>
        <el-select
          size="mini"
          v-model="type"
          placeholder="类型"
          @click="cur_page=1;init()"
          clearable
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        选择日期：
        <el-date-picker
          size="mini"
          v-model="start_time"
          value-format="yyyy-MM-dd HH:mm:ss"
          @click="cur_page=1;init()"
          clearable
          type="datetime"
        />
        -
        <el-date-picker
          size="mini"
          v-model="end_time"
          value-format="yyyy-MM-dd HH:mm:ss"
          @click="cur_page=1;init()"
          clearable
          type="datetime"
        />
        <el-button
          type="primary"
          size="mini"
          @click="cur_page=1;init()"
        >搜索</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="margin-top:15px;width: 100%"
        border
      >

        <el-table-column
          prop="i_date"
          label="时间"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.i_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          min-width="80"
        />
        <el-table-column
          prop="u_name"
          label="操作人"
          min-width="80"
        />
        <!--
      <el-table-column
        prop="tle"
        label="标题"
        min-width="80"
      />
      -->
        <el-table-column
          prop="cont"
          label="消息"
          min-width="250"
        />
      </el-table>
      <div class="flex bottom-bar">
        <div class="pagination">
          <!--分页组件-->
          <el-pagination
            :total="total"
            :current-page="cur_page"
            background
            layout="total, sizes,prev, pager, next"
            @size-change="sizeChange"
            @current-change="pageChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
import { getDeviceRunLogOperatorList, deviceList } from '@/api/equip'
import { findByBs_base_id as facilitiesList } from '@/api/rs_facilities'
import {
  getLogTypeDes,
  getLogTypeColor,
  getLogTypeIcon
} from "@/utils/logutil";
export default {
  name: 'CollectedData',
  mixins: [initData],
  props: {
    hd_device_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hd_device_id: null,
      rs_facilities_id: null,
      cur_page: 1,
      pageSize: 10,
      start_time: null,
      end_time: null,
      operator: null,
      operatorOptions: [],
      facilitiesOptions: [],
      deviceOptions: [],
      type: null,
      typeOptions: [
        {
          name: "绑定设备",
          value: "BindDevice"
        },
        {
          name: "关闭阀门",
          value: "CloseChannel"
        },
        {
          name: "打开阀门",
          value: "OpenChannel"
        },
        {
          name: "设备状态更新",
          value: "Sta"
        },
        {
          name: "设备上线",
          value: "Online"
        },
        {
          name: "设备解绑",
          value: "UnBindDevice"
        },
        {
          name: "关闭通道",
          value: "CloseWindow"
        },
        {
          name: "打开通道",
          value: "OpenWindow"
        },
        {
          name: "暂停通道",
          value: "StopWindow"
        },
        {
          name: "设备离线",
          value: "Offline"
        },
        {
          name: "传感器值预警",
          value: "SensorException"
        },
        {
          name: "控制设备日志",
          value: "ControlDevice"
        },
        {
          name: "设备报警日志",
          value: "DeviceAlarm"
        },
      ],
      webType: ''
    }
  },
  mounted () {
    var hd_device_id = this.$route.query.id;
    var rs_facilities_id = this.$route.query.rs_facilities_id;
    if (hd_device_id != null && hd_device_id != '') {
      this.hd_device_id = hd_device_id;
      this.showDate();
    } else if (rs_facilities_id != null && rs_facilities_id != '') {
      this.rs_facilities_id = rs_facilities_id;
      this.showDate();
    }
    deviceList({
      bs_base_id: this.$store.state.baseinfo.cur_base_id,
      page: 1,
      size: 999
    }).then(res => {
      this.deviceOptions = res.data.content
    })
    facilitiesList({
      bs_base_id: this.$store.state.baseinfo.cur_base_id,
    }).then(res => {
      this.facilitiesOptions = res.data
    })
  },

  methods: {
    getDeviceRunLogOperatorList () {
      getDeviceRunLogOperatorList({
        b_id: this.$store.state.baseinfo.cur_base_id,
        r_id: this.rs_facilities_id,
        h_id: this.hd_device_id
      }).then(res => {
        if (res.code === 200) {
          this.operatorOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    parseTime,
    initPage () {
      this.cur_page = 1;
    },
    // 初始化列表
    beforeInit () {
      // if (this.hd_device_id) {
      //   this.url = '/hd/device/getDeviceRunLogListByh_id'
      //   this.params = {
      //     h_id: this.hd_device_id,
      //     u_id: this.operator,
      //     startPosition: (this.cur_page - 1) * this.pageSize,
      //     maxResult: this.pageSize,
      //     type: this.type,
      //     start_time: this.start_time,
      //     end_time: this.end_time
      //   }
      // } else if (this.rs_facilities_id) {
      //   this.url = '/hd/device/getDeviceRunLogListByr_id'
      //   this.params = {
      //     r_id: this.rs_facilities_id,
      //     u_id: this.operator,
      //     startPosition: (this.cur_page - 1) * this.pageSize,
      //     maxResult: this.pageSize,
      //     type: this.type,
      //     start_time: this.start_time,
      //     end_time: this.end_time
      //   }
      // }
      this.url = '/hd/device/deviceRunLogList'
      this.params = {
        b_id: this.$store.state.baseinfo.cur_base_id,
        r_id: this.rs_facilities_id,
        h_id: this.hd_device_id,
        u_id: this.operator,
        startPosition: (this.cur_page - 1) * this.pageSize,
        maxResult: this.pageSize,
        type: this.type,
        start_time: this.start_time,
        end_time: this.end_time
      }
      this.getDeviceRunLogOperatorList()
      return true
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      this.init().then((data) => {
        this.replaceType(data.data.content)
      })
    },
    showDate () {
      this.init().then((data) => {
        this.replaceType(data.data.content)
      })
    },
    replaceType (data) {
      data.forEach(element => {
        element.type = getLogTypeDes(element.type);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex
  display flex
  align-items center

.el-table
  font-size 14px

.table-span
  background #1AB394
  color #fff
  padding 2px 5px
  border-radius 25px

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777
</style>
