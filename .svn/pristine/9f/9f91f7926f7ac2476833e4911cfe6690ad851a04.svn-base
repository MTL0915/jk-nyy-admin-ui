<template>
  <div>
    <div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div style="padding: 0 10px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width:220px" />
          </el-form-item>
        </div>
        <div class="card">
          <el-form-item label="选择周期" prop="weeks">
            <span v-for="(item, index) in weeks" :key="index" :class="form.weeks.indexOf(item.value) > -1 ? 'weeksActive': 'weeks'" @click="chooseWeeks(item)">
              {{ item.name }}
            </span>
          </el-form-item>
          <el-form-item label="配置时间段" prop="time">
            <div v-for="(item, index) in form.time" :key="index" style="margin-bottom:5px">
              <el-time-picker v-model="item.startTime" :editable="false" value-format="HH:mm:ss" placeholder="开始时间" />
              ~
              <el-time-picker v-model="item.endTime" :editable="false" value-format="HH:mm:ss" placeholder="结束时间" />
              <div style="display:inline-block;cursor:pointer;color:#545454">
                <i class="el-icon-circle-plus-outline time" style="padding:5px" v-show="form.time.length - 1 === index" @click="timeAdd"></i>
                <i class="el-icon-remove-outline time" style="padding:5px" v-show="form.time.length > 1" @click="timeDel(index)"></i>
              </div>
            </div>

          </el-form-item>
          <el-form-item label="开启设备" prop="device">
            <el-cascader v-model="form.open_device_id" :options="deviceList" :show-all-levels="false" style="width:460px" />
            <div style="display:inline-block;margin-left:5px">
              <i class="el-icon-refresh refresh"></i>
              <span style="color:#409EFF;margin-left:5px;cursor:pointer">添加分组</span>
            </div>
          </el-form-item>
        </div>
        <div class="card">
          <el-form-item label="通知方式" prop="infoType">
            <el-checkbox-group v-model="form.infoType">
              <el-checkbox label="电话"></el-checkbox>
              <el-checkbox label="短信"></el-checkbox>
              <el-checkbox label="公众号消息推送"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="通知对象" prop="users">
            <el-select v-model="form.users" multiple placeholder="请选择" style="width:460px">
              <el-option
                v-for="(item, index) in usersList"
                :key="index"
                :label="item.name + '('+item.phone+')'"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="text-align:right">
      <el-button size="small" @click="back">取消</el-button>
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
// import { findByBs_base_id } from '@/api/rs_facilities'
import { getFacilitiesDeviceSensorByBaseId } from '@/api/report'
export default {
  data() {
    return {
      weeks: [
        {
          name: "周一",
          value: 1
        },{
          name: "周二",
          value: 2
        },{
          name: "周三",
          value: 3
        },{
          name: "周四",
          value: 4
        },{
          name: "周五",
          value: 5
        },{
          name: "周六",
          value: 6
        },{
          name: "周日",
          value: 7
        }
      ],
      usersList: [], // 用户列表
      deviceList: [], // 开启设备列表
      form: {
        name: "",
        weeks: [], // 选择周期
        time: [{
          startTime: "",
          endTime: ""
        }], // 选择时间段
        open_device_id: "", // 开启设备的id
        infoType: [], // 通知方式
        users: [] // 通知对象
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        weeks: [{ required: true, message: '请选择', trigger: 'blur' }],
        time: [{ required: true, message: '请选择', trigger: 'blur' }],
        device: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    save() {
      console.log(this.form.time);
    },
    timeDel(index) {
      this.form.time.splice(index, 1)
    },
    timeAdd() {
      this.form.time.push(
        {
          startTime: "",
          endTime: ""
        }
      )
    },
    filterData(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].sensor_type_code && ["101", "102"].indexOf(arr[i].sensor_type_code) === -1) {
          arr.splice(i, 1);
          i--;
          continue;
        }
        if (arr[i].children) {
          this.filterData(arr[i].children)
        }
      }
    },
    handleData(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].label = arr[i].name
        arr[i].value = arr[i].id
        if (arr[i].children) {
          this.handleData(arr[i].children)
        }
      }
    },
    // 获取地块列表
    getAreaData() {
      getFacilitiesDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          // 过滤采集类传感器
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].children.length > 0) {
              this.filterData(res.data[i].children)
            }
          }
          for (let i = 0; i < res.data.length; i++) {
            const data = res.data[i]
            if (data.children.length > 0) {
              for (let j = 0; j < data.children.length; j++) {
                if (data.children[j].children.length === 0) {
                  data.children.splice(j, 1)
                  j--
                }
              }
            }
          }
          this.handleData(res.data)
          console.log("dddddddddd", res.data);
          this.deviceList = res.data
          // //this.areaList = res.data
          // this.deviceList = []
          // res.data.map(item => {
          //   this.deviceList.push({
          //     value: item.id,
          //     label: item.name,
          //     children: []
          //   })
          // })
          // if (this.deviceList.length === res.data.length) {
          //   this.deviceList.push({
          //     value: "device_group",
          //     label: "设备分组",
          //     children: []
          //   })
          // }
        }
      })
    },
    // 获取地块下用户
    getUser() {
      userFacilitiesList({rs_facilities_id: this.form.rs_facilities_id}).then(res => {
        if (res.code === 200) {
          this.usersList = res.data.content
        }
      })
    },
    // 选择周期
    chooseWeeks(item) {
      if (this.form.weeks.indexOf(item.value) > -1) {
        const index = this.form.weeks.indexOf(item.value)
        this.form.weeks.splice(index, 1)
      } else {
        this.form.weeks.push(item.value)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.card
  border 1px solid #eee
  padding 10px
  border-radius 5px
  margin-bottom 10px
.weeks
  background #f2f2f2
  color #545454
  padding 8px 15px
  border-radius 5px
  margin 3px
  cursor pointer
.weeksActive
  background #79DD47
  color #fff
  padding 8px 15px
  border-radius 5px
  margin 3px
  cursor pointer
.time
 font-size 20px
 color #545454
.time:hover 
  color #409EFF
.refresh
  font-size 20px
  color #ccc
  vertical-align middle
  cursor pointer
.refresh:hover
  color #409EFF
</style>