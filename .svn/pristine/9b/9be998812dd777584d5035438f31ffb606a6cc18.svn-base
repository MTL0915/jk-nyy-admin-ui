<template>
  <div style="line-height:initial">
    <el-dialog title="设置传感器" :visible.sync="dialogVisible" width="70%">
      <div>
        <div style="height:30px;line-height:30px">
          <div style="display:inline-block">
            <p class="sensorTitle">已选择的传感器</p>
          </div>
          <div style="display:inline-block;float:right">
            <el-button size="mini" type="primary" @click="clearData">清空所选</el-button>
          </div>
        </div>
        <div class="choosedSensorBox">
          <!-- <p v-show="chooseSensorList.length == 0" style="color:#999;text-align:center;margin-top:30px">暂无数据</p> -->
          <div class="sensorCard sensorActive" v-for="(item, index) in chooseSensorList" :key="index" @click="delChoose(item)">
            <div style="display:inline-block;">
              <p>{{ item.name }}</p>
              <p>{{ item.rs_facilities_name }}</p>
            </div>
            <div style="display:inline-block;width:20px;height:36px;line-height:36px;float:right">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="allSensorBox">
        <div style="height:30px;line-height:30px">
          <div style="display:inline-block">
            <p class="sensorTitle">全部传感器</p>
          </div>
          <div style="display:inline-block;float:right">
            <el-input
              clearable
              size="mini"
              placeholder="输入传感器名称搜索"
              v-model="searchValue">
              <el-button slot="append" size="mini" icon="el-icon-search" @click="searchData"></el-button>
            </el-input>
          </div>
          <div style="height:35px;float:right;display:inline-block;margin-right:10px" v-show="chooseShow">
            <el-select v-model="chooseValue" filterable placeholder="请选择" size="mini" @change="areaChange">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="allSensor">
          <p v-if="sensorList.length == 0" style="color:#999;text-align:center;margin-top:30px">暂无数据</p>
          <div class="sensorCard" v-for="(item, index) in sensorList" :key="index" @click="choose(item)" :class="getActive.indexOf(item.id) > -1? 'sensorActive': ''">
            <p>{{ item.name }}</p>
            <p>{{ item.rs_facilities_name }}</p>
          </div>
        </div>
      </div>
      <div style="margin-top:10px;text-align:center">
        <el-button type="primary" size="mini" style="margin-right:10px" @click="save">确定</el-button>
        <el-button type="info" size="mini" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getNewsSensorList } from "@/api/device";
import { setUserSensorConfig } from "@/api/hd_device_sensor"
import { findByBs_base_id } from '@/api/rs_facilities'
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogVisible: false,
      sensorList: [],
      searchValue: "",
      chooseSensorList: [],
      areaOptions: [],
      chooseValue: "",
      chooseShow: true
    }
  },
  computed: {
    getActive() {
      const arr = [];
      for (let i = 0; i < this.chooseSensorList.length; i++) {
        arr.push(this.chooseSensorList[i].id);
      }
      return arr;
    }
  },
  methods: {
    //清空所选
    clearData() {
      this.chooseSensorList = [];
    },
    save() {
      const data = new FormData();
      data.append("hd_device_sensors", this.getActive.join(","));
      setUserSensorConfig(data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
          this.dialogVisible = false;
          this.$parent.page = 0;
          this.$parent.searchValue = "";
          this.$parent.getNewsSensorList();
        }
      })
    },
    //删除选择
    delChoose(item) {
      const index = this.chooseSensorList.indexOf(item);
      this.chooseSensorList.splice(index, 1);
    },
    //选择
    choose(item) {
      if (this.getActive.indexOf(item.id) > -1) {
        return;
      }
      this.chooseSensorList.push(item);
    },
    searchData() {
      this.getNewsSensorList();
    },
    areaChange(value) {
      this.getNewsSensorList()
    },
    getSettingSensorList() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        isFilter: true,
        keyword: this.searchValue,
        type: "collect"
      };
      if (this.chooseValue !== "all") {
        data.rs_facilities_id = this.chooseValue
      }
      getNewsSensorList(data).then(res => {
        const arr = []
        for (let i = 0; i < res.data.content.length; i++) {
          if (res.data.content[i].ord == null || res.data.content[i].ord == "" || res.data.content[i].ord == undefined || !res.data.content[i].ord) {
            arr.push(0)
          } else {
            arr.push(1)
          }
        }
        if (arr.indexOf(0) > -1) {
          return;
        }
        this.chooseSensorList = res.data.content;
      });
    },
    // 根据基地获取地块
    getFindByBs_base_id() {
      this.areaOptions = [{id: 'all', name: "全部"}]
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      }
      findByBs_base_id(data).then(res => {
        if (res.code === 200) {
          this.areaOptions = this.areaOptions.concat(res.data)
        }
      })
    },
    getNewsSensorList() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        keyword: this.searchValue,
        type: "collect"
      };
      if (this.chooseValue !== "all") {
        data.rs_facilities_id = this.chooseValue
      }
      getNewsSensorList(data).then(res => {
        this.sensorList = res.data.content;
      });
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.$nextTick(() => {
          if (this.chooseValue === "all") {
            this.getFindByBs_base_id();
          }
          this.getNewsSensorList();
          this.getSettingSensorList();
        })
      }
    },
    searchValue(val) {
      if (val == "") {
        this.getNewsSensorList();
      }
    }
  }
}
</script>\
<style lang="stylus" scoped>
.sensorTitle
  color #635e5e
  font-szie 14px
.choosedSensorBox
  margin-top 10px
  min-height 100px
.allSensorBox
  margin-top 10px
.allSensor
  min-height 200px
  max-height 350px
  margin-top 10px
  border 1px solid #cccccc
  border-radius 5px
  overflow-y auto 
.sensorCard
  height 46px
  overflow hidden
  display inline-block
  padding 5px
  max-width 150px
  min-width 100px
  background #C0C4CC
  margin 5px
  color #fff
  border-radius 5px
  overflow hidden
  text-align center
  cursor pointer
.sensorActive
  background #67C23A
.allSensor::-webkit-scrollbar
  width 2px
  height 100%
.allSensor::-webkit-scrollbar-track
  box-shadow inset 0 0 6px rgba(0,0,0,0.3)
  border-radius 10px
.allSensor::-webkit-scrollbar-thumb
  border-radius 10px
  box-shadow inset 0 0 6px rgba(0,0,0,0.3)
  background-color #1E1E28
</style>