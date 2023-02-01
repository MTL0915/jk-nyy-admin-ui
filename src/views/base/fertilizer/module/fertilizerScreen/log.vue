<template>
  <div class="box">
    <div class="sidebar">
      <ul class="nav">
        <!-- <li @click="type='';init()">全部</li> -->
        <!-- <li @click="type='Sta';init()">灌溉日志</li>
        <li @click="type='DeviceAlarm';init()">警报日志</li>
        <li @click="type='Online';init()">设备日志</li> -->
        <li v-for="(item, index) in navList" :key="index" :class="{ isActive: index == toggleIndex }" @click="type=item.type;init();HandelToggle(index)">{{item.name}}</li>
      </ul>
    </div>
    <div class="content">
      <el-card shadow="never" class="card">
        <div style="text-align:right;color:#fff">
          <!-- <el-select
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
          </el-select> -->
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
        >

          <el-table-column
            prop="i_date"
            label="时间"
            min-width="120"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.i_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            min-width="100"
          />
          <el-table-column
            prop="u_name"
            label="操作人"
            min-width="100"
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
      </el-card>
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
    </div>
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
      webType: '',
      navList:[
        {
          name:'灌溉日志',
          type:'Sta',
        },
        {
          name:'警报日志',
          type:'DeviceAlarm',
        },
        {
          name:'设备日志',
          type:'Online',
        },
      ],
      toggleIndex: 0,
    }
  },
  mounted () {
    var hd_device_id = this.$route.query.hd_device_id;
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
    },
    // nav导航栏切换
    HandelToggle(index,router){
      this.toggleIndex = index;
    },
  }
}
</script>

<style scoped>
.box{
  display: flex;
  height: 100%;
  margin-top: 30px;
}
.sidebar{
  width: 15%;
  height: 82%;
  background: url(~@/assets/images/shuifeiji/log/log_left_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sidebar .nav{
  height:300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */
}
.sidebar .nav li{
  cursor: pointer;
  list-style-type: none;
  background: url(~@/assets/images/shuifeiji/log/log_choose.png) no-repeat;
  width: 159px;
  height: 64px;
  text-align: center;
  line-height: 64px;
  font-size: 20px;
  text-indent: 30px;
  margin: 0 auto;
}
.sidebar .nav li.isActive{
  background: url(~@/assets/images/shuifeiji/log/log_choose_on.png) no-repeat;
  width: 231px;
  height: 80px;
  line-height: 80px;
  font-size: 24px;
  text-indent: 80px;
  margin: 0;
}
.content{
  margin-left: 2%;
  width: 80%;
  height: 82%;
  background: url(~@/assets/images/shuifeiji/log/log_right_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.card{
  width:92%;
  margin:0 auto;
}
.bottom-bar{
  text-align: center;
  margin-bottom: 10px;
}
.el-card{
  background-color:unset;
  border: none;
}
::v-deep .el-table thead{
  color: #fff;
}
::v-deep .el-table tbody{
  color: #fff;
}
::v-deep .el-table thead tr th{
  background-color: #1d5480;
}
::v-deep .el-table tbody tr td{
  background-color: #063d6d;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #063d6d;
}
::v-deep .el-table td, .el-table th{
  padding:17px 0;
}
::v-deep .el-table th>.cell{
  padding-left: 45px;
  font-size: 16px;
}
::v-deep .el-table .cell{
  padding-left: 45px;
  font-size: 14px;
}
::v-deep .el-pagination__total{
  color:#008ffd;
}
::v-deep .el-pagination.is-background .btn-next,::v-deep .el-pagination.is-background .btn-prev,::v-deep .el-pagination.is-background .el-pager li {
  background-color: unset;
  color: #008ffd;
  border: 1px solid #008ffd;
}
</style>