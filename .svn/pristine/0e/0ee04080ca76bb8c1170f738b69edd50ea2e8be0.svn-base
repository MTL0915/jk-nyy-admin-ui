<template>
  <div>
    <div class="manageNav">
      <el-select
        v-model="rs_facilities_id"
        size="small"
        clearable
        placeholder="请选择地块"
        style="width:150px"
        @change="getData()"
      >
        <el-option
          v-for="item in facilitiesOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.dcount }}</span>
        </el-option>
      </el-select>
      <el-input
        placeholder="搜索种植作物"
        v-model="keyword"
        size="small"
        class="search"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
        <el-button
          slot="append"
          @click="getData"
        >搜索</el-button>
      </el-input>

      <div class="searchBtn">
        <span
          class="searchClick"
          v-for="(item, index) in timeTypeOptions"
          :key="index"
          :class="item.key===timeType ? 'searchClickActive': ''"
          @click="search(item)"
        >
          {{ item.name }}
        </span>
      </div>
      <div style="position:absolute;right:0px">
        气象预警
        <el-switch
          style="margin-right:10px;"
          v-model="weatherWarn"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @change="weatherWarnChange"
        />
        <el-button
          type="success"
          size="mini"
          @click="addPlant"
        >添加</el-button>
      </div>
    </div>
    <div style="margin-top:10px;overflow: hidden;*zoom: 1;">
      <div
        class="infoCard"
        v-for="(item, index) in plantList"
        :key="index"
      >
        <div style="display:flex">
          <div
            class="infoCardLeft"
            @click="enterDetail(item, 'plantInfo')"
          >
            <div class="plantStatusDiv" :style="{'background-color':getPlantStatusColor(item)}">
              {{getPlantStatus(item)}}
            </div>
            <div
              class="circle"
              :style="{'border-color': item.isEnd? 'red': ''}"
            >
              <img
                :src="item.classification_imagePath"
                style="width:100%;height:100%;border-radius:50%"
              />
            </div>

            <p style="margin-top:10px">{{item.produceScale + item.scaleUnit}}</p>
          </div>
          <div class="infoCardRight">
            <div
              style="position:absolute;right:0px;top:0px;cursor:pointer;color:#960707"
              @click="edit(item.id)"
            >编辑</div>
            <p style="color:#999;width:calc(100% - 25px)">{{ item.rs_facilities_name }}</p>
            <div
              class="name"
              @click="enterDetail(item, 'plantInfo')"
              style="color:rgb(153, 153, 153)"
            >
              <div style="height:20px;line-height:20px">
                名称：<span style="color:rgb(125, 55, 55)">{{item.name}}</span>
              </div>
              <div style="height:20px;line-height:20px">
                作物类型：<span style="color:rgb(125, 55, 55)">{{item.classification_name}}({{item.productBreed_name}})</span>
              </div>
            </div>
            <!--进度条开始-->
            <div
              class="bar"
              @click="enterDetail(item, 'farm')"
            >
              <div class="barBox">
                <div
                  class="progress"
                  :style="{width: getCurrentTimeProgress(item) + '%'}"
                ></div>
              </div>
              <div
                class="progressFlag"
                :style="{'margin-left': `calc(${getCurrentTimeProgress(item)}% - 25px)`}"
              >
                <span v-if="item.durationTime <= item.totalDay ">
                  {{ item.durationTime <= 0 ? "未开始":"第"+item.durationTime+"天" }}
                </span>
                <span v-if="item.durationTime > item.totalDay ">
                  已完成
                </span>
              </div>
            </div>
            <!--进度条结束-->
            <div
              style="margin-top:15px;color:#525252;cursor:pointer"
              @click="enterDetail(item, 'farm')"
            >
              <span style="float:left">{{ item.start_time }}</span>
              <span style="float:right">{{ item.end_time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination
        class='132456'
        background
        layout="total,prev, pager, next"
        :current-page="page + 1"
        :page-size="size"
        @current-change="change"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      v-if="plantDetailDialogVisible"
      :visible.sync="plantDetailDialogVisible"
      append-to-body
      width="920px"
    >
      <plantDetail
        ref="plantDetail"
        :cover="cover"
        :classificationName="classificationName"
        :agroProduceArchiveId="agroProduceArchiveId"
        :activeName="activeName"
        :info="info"
        :archiveSta="archiveSta"
        :facilitiesId="facilitiesId"
      />
    </el-dialog>
  </div>
</template>
<script>
import img from "@/assets/img/img.jpg"
import plantDetail from "./plantDetail"
import { agroProduceArchiveList } from '@/api/agroProduceArchive'
import { formatDate } from '@/utils/date'
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { baseWeatherWarn, getById } from '@/api/baseInfo'

export default {
  components: {
    plantDetail
  },
  created () {
    getById({ bs_base_id: this.bs_base_id || this.$store.state.baseinfo.cur_base_id }).then(res => {
      this.weatherWarn = 0
      let config = JSON.parse(res.data.config_json)
      if (config && config.weatherWarn && config.weatherWarn.sta) { 
        this.weatherWarn = config.weatherWarn.sta
      }
    })
    this.init()
  },
  props: {
    bs_base_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      keyword: "",
      timeTypeOptions: [
        { name: "全部", key: "all" },
        { name: "当前种植", key: "now" },
        { name: "历史种植", key: "history" },
        { name: "计划种植", key: "plan" },
      ],
      facilitiesOptions: [],
      timeType: "all",
      plantList: [],
      page: 0,
      size: 16,
      total: 0,
      rs_facilities_id: null,
      plantDetailDialogVisible: false,
      activeName: 'plantInfo',
      cover: null,
      classificationName: null,
      info: {},
      archiveSta: 'now',
      facilitiesId: null,
      weatherWarn: 0,
    }
  },
  methods: {
    formatDate,
    getPlantStatus(item){
      var produceStartTime = item.produceStartTime;
      var produceEndTime = item.produceEndTime;
      var nowTime = new Date().getTime();

      if (nowTime < produceStartTime){
        return "计划种植";
      }else if (nowTime > produceStartTime && nowTime < produceEndTime){
        return "当前种植";
      }else {
        return "历史种植";
      }
    },
    getPlantStatusColor(item){
      var produceStartTime = item.produceStartTime;
      var produceEndTime = item.produceEndTime;
      var nowTime = new Date().getTime();

      if (nowTime < produceStartTime){
        return "#84c710";
      }else if (nowTime > produceStartTime && nowTime < produceEndTime){
        return "rgb(16, 199, 18)";
      }else {
        return "rgb(204, 181, 48)";
      }
    },
    init () {
      if (this.bs_base_id === null) {
        this.bs_base_id = this.$store.state.baseinfo.cur_base_id
      }
      getFacilitiesCountArchive({ bs_base_id: this.bs_base_id }).then(res => {
        if (res.code === 200) {
          this.facilitiesOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.getData()
    },
    weatherWarnChange () {
      baseWeatherWarn({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        sta: this.weatherWarn
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
          if (this.weatherWarn === 1) {
            this.weatherWarn = 0
          } else {
            this.weatherWarn = 1
          }
        }
      })
    },
    getData () {
      agroProduceArchiveList({
        bs_base_id: this.bs_base_id,
        timeType: this.timeType,
        rs_facilities_id: this.rs_facilities_id,
        keyword: this.keyword,
        page: this.page,
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          const timestamp = new Date().getTime()
          res.data.content.map(v => {
            v.totalDay = Math.floor((v.produceEndTime - v.produceStartTime) / 86400000)
            if (timestamp >= v.produceEndTime) {
              v.isEnd = true
              v.durationTime = v.totalDay + 1
            } else {
              v.isEnd = false
              v.durationTime = Math.floor((timestamp - v.produceStartTime) / 86400000) + 1
            }
            if (v.durationTime < 0) {
              v.durationTime = 0;
            }
            v.start_time = formatDate(new Date(v.produceStartTime), 'yyyy-MM-dd')
            v.end_time = formatDate(new Date(v.produceEndTime), 'yyyy-MM-dd')
            v.classification_imagePath = v.classification_imagePath ? (v.classification_imagePath.indexOf('http') === -1 ? (process.env.IMG_URL + v.classification_imagePath) : v.classification_imagePath) : img
          })
          this.plantList = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    enterDetail (item, type) {
      this.classificationName = item.classification_name
      this.activeName = type
      this.agroProduceArchiveId = item.id
      this.facilitiesId = item.rs_facilities_id
      this.cover = item.classification_imagePath
      this.info = item
      let s = item.produceStartTime
      let e = new Date(item.end_time + ' 23:59:59').getTime()
      let n = new Date().getTime()
      if (s <= n && n <= e) {
        this.archiveSta = 'now'
      } else if (e <= n) {
        this.archiveSta = 'history'
      } else if (n <= s) {
        this.archiveSta = 'plan'
      }
      this.plantDetailDialogVisible = true
    },
    change (e) {
      this.page = e - 1;
      this.getData()
    },
    //获取当前时间的进度条
    getCurrentTimeProgress (item) {
      if (item.durationTime == 0) {
        return 0;
      } else if (item.durationTime > 0) {
        if (item.durationTime >= item.totalDay) {
          return 100;
        } else {
          return (item.durationTime / item.totalDay) * 100;
        }
      }
    },
    search (item) {
      if (item.key == this.timeType) {
        return
      }
      this.timeType = item.key;
      this.getData()
    },
    //添加作物
    addPlant () {
      this.$router.push("/addPlant")
    },
    edit (id) {
      this.$router.push({ path: '/addPlant', query: { agroProduceArchiveId: id, breadcrumb: 'hide' } })
    }
  }
}
</script>
<style lang="stylus" scoped>
.manageNav
  display flex
  align-items center
  position relative

.search
  width 250px
  margin-left 15px

.searchBtn
  margin-left 20px
  cursor pointer

.searchClick
  display inline-block
  height 30px
  line-height 30px
  padding 0 10px
  margin 0 5px
  font-size 14px
  border-radius 15px

.searchClickActive
  background #84C710
  color #fff

.infoCard
  float left
  padding 10px 20px 10px 10px
  display inline-block
  border-radius 5px
  min-width 188px
  width calc(25% - 20px)
  border 1px solid #ccc
  margin 0 10px 20px 10px
  box-shadow 2px 2px 3px #dcdcdc
  font-size 12px

.infoCardLeft
  flex 0 0 80px
  margin-right 10px
  text-align center
  cursor pointer

.infoCardRight
  flex 1
  position relative
  width calc(100% - 90px)

.circle
  width 70px
  height 70px
  border-radius 50%
  border 2px solid #9AC062
  box-sizing border-box
  padding 2px

.name
  cursor pointer
  margin-top 10px
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.bar
  margin-top 10px
  padding-top 15px
  position relative
  cursor pointer

.barBox
  background #999
  height 5px
  border-radius 2.5px
  background-color #f5f5f5
  overflow hidden
  box-shadow inset 0 1px 2px rgba(0, 0, 0, .3)

.progress
  height 100%
  background #9AC062
  border-radius 2.5px

.progressFlag
  z-index 2
  width 50px
  height 35px
  position absolute
  text-align center
  top 0
  // margin-left -25px
  background url('../../../../assets/images/progress.png') no-repeat center bottom

.plantStatusDiv
  background-color #84c710
  line-height 25px
  height 25px
  width 60px
  border-radius 8px
  color #FFF
  margin-bottom 5px
  margin-left 3px
</style>