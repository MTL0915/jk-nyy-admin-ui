<template>
  <div>
    <div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="card">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 250px" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="所在地块">
            <el-select v-model="form.rs_facilities_id" placeholder="请选择所在地块" @change="areaChange" style="width: 250px">
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in areaList" :key="index" />
            </el-select>
          </el-form-item>
        </div>
        <div class="card">
          <!--有用-->
          <!-- <el-form-item label="选择类型">
            <span :class="type==='default'?'chooseTypeActive':'chooseType'" @click="type='default'">自定义创建</span>
            <span :class="type==='module'?'chooseTypeActive':'chooseType'" @click="type='module'">从模板导入</span>
          </el-form-item> -->
          <el-form-item label="触发策略" prop="alarmRules">
            <div v-for="(rules, indexs) in form.alarmRules" :key="indexs">
              若<el-select v-model="rules.hd_device_sensor_id" placeholder="请选择传感器" style="margin-left:5px" @focus="choose('传感器')">
                <el-option :label="item.name+'('+item.device+')'" :value="item.id" v-for="(item, index) in sensorList" :key="index" />
              </el-select>
              <el-select v-model="rules.valueType" placeholder="值类型" style="width:100px">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in options" :key="index" />
              </el-select>
              <el-select v-model="rules.operation" placeholder="等式" style="width:90px">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in operation" :key="index" />
              </el-select>
              <el-input placeholder="请输入数值" v-model="rules.value" clearable type="number" style="width:130px;" />
              且
              <el-select v-model="rules.value_num" placeholder="请选择周期" style="width:130px;margin:0 5px;">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in weeks" :key="index" />
              </el-select>
              则
              <el-select v-model="rules.alarm_frequency" placeholder="请选择操作" style="width:140px;margin:0 5px">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in warnType" :key="index" />
              </el-select>
              <!--添加多个告警规则  部分-->
              <!-- <div style="display:inline-block;cursor:pointer;color:#545454">
                <i class="el-icon-remove-outline rule" style="padding:5px" v-show="form.alarmRules.length > 1" @click="ruleDel(indexs)"></i>
                <i class="el-icon-circle-plus-outline rule" style="padding:5px" v-show="form.alarmRules.length - 1 === indexs" @click="ruleAdd"></i>
              </div> -->
            </div>

          </el-form-item>
          <div class="tip">注：当前传感器每5分钟为一次采集周期</div>
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
            <el-select v-model="form.users" multiple placeholder="请选择" style="width:500px">
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
import { findByBs_base_id } from '@/api/rs_facilities'
import { getValueSensorsByRs_facilities_id } from '@/api/hd_device_sensor'
import { userFacilitiesList } from "@/api/user"
import { addAlarmStrategy, strategyDetail, strategyUpdate } from "@/api/hd_device_strategy"
import bus from '@/components/common/bus'
export default {
  props: {},
  data() {
    return {
      type: "default",
      areaList: [], // 地块列表
      sensorList: [], // 策略传感器列表
      options: [
        {
          label: "原始值",
          value: "原始值"
        },
        {
          label: "平均值",
          value: "平均值"
        },
        {
          label: "最大值",
          value: "最大值"
        },
        {
          label: "最小值",
          value: "最小值"
        }
      ],
      operation: [
        {
          label: "大于",
          value: "大于"
        },
        {
          label: "小于",
          value: "小于"
        }
      ],
      weeks: [
        {
          label: "持续1个周期",
          value: "1"
        },
        {
          label: "持续2个周期",
          value: "2"
        },
        {
          label: "持续3个周期",
          value: "3"
        },
        {
          label: "持续4个周期",
          value: "4"
        },
        {
          label: "持续5个周期",
          value: "5"
        }
      ],
      warnType: [
        {
          label: "打开",
          value: "1"
        },
        {
          label: "关闭",
          value: "2"
        },
        {
          label: "暂停",
          value: "3"
        }
      ],
      usersList: [],
      form: {
        name: "",
        rs_facilities_id: "", //地块id
        id: "", //策略id
        alarmRules: [
          {
            hd_device_sensor_id: "",
            condition: "SENSOR",
            valueType: "",
            value_way: "",
            operation: "", //运算
            upper: "", // 上限
            lower: "", // 下限
            value: "",
            value_num: "",
            alarm_frequency: "",
          }
        ],
        infoType: [],
        users: []
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        alarmRules: [{ required: true, message: "请选择", trigger: 'ddd'}],
        infoType: [{ required: true, message: "请选择", trigger: 'blur'}],
        users: [{ required: true, message: "请选择", trigger: 'blur'}]
      }
    }
  },
  methods: {
    init() {
      this.form= {
        name: "",
        rs_facilities_id: "", //地块id
        id: "", //策略id
        alarmRules: [
          {
            hd_device_sensor_id: "",
            condition: "SENSOR",
            valueType: "",
            value_way: "",
            operation: "", //运算
            upper: "", // 上限
            lower: "", // 下限
            value: "",
            value_num: "",
            alarm_frequency: "",
          }
        ],
        infoType: [],
        users: []
      }
    },
    back() {
      if (!this.form.id) {
        this.$router.back(-1)
      } else {
        this.$parent.$parent.dialogVisible = false
      }
    },
    save() {
      if (!this.form.name) {
        this.$message({
          message: "名称不能为空！",
          type: "warning"
        })
        return
      }
      
      for (let i = 0; i < this.form.alarmRules.length; i++) {
        const data = this.form.alarmRules[i]
        if (data.hd_device_sensor_id === "") {
          this.$message({
            message: "传感器不能为空！",
            type: "warning"
          })
          return
        }
        if (data.valueType === "") {
          this.$message({
            message: "值类型不能为空！",
            type: "warning"
          })
          return
        }
        if (data.operation === "") {
          this.$message({
            message: "等式不能为空！",
            type: "warning"
          })
          return
        }
        if (data.value === "") {
          this.$message({
            message: "数值不能为空！",
            type: "warning"
          })
          return
        }
        if (data.value_num === "") {
          this.$message({
            message: "周期不能为空！",
            type: "warning"
          })
          return
        }
        if (data.warn === "") {
          this.$message({
            message: "通知类型不能为空！",
            type: "warning"
          })
          return
        }
        if (this.form.infoType.length === 0) {
          this.$message({
            message: "请选择通知方式！",
            type: "warning"
          })
          return
        }
        if (this.form.users.length === 0) {
          this.$message({
            message: "请选择通知对象！",
            type: "warning"
          })
          return
        }
        if (data.valueType === "原始值") {
          data.value_way = "og"
        } else if (data.valueType === "平均值") {
          data.value_way = "avg"
        } else if (data.valueType === "最大值") {
          data.value_way = "max"
        } else if (data.valueType === "最小值") {
          data.value_way = "min"
        }

        if (data.operation === "大于") {
          data.upper = data.value
        } else if (data.operation === "小于") {
          data.lower = data.value
        }
      }
      const postData = {
        name: this.form.name,
        rs_facilities_id: this.form.rs_facilities_id,
      }
      if (this.form.infoType.indexOf("电话") > -1) {
        postData.phone_notice = 1
      } else {
        postData.phone_notice = 0
      }
      if (this.form.infoType.indexOf("短信") > -1) {
        postData.notice = 1
      } else {
        postData.notice = 0
      }
      if (this.form.infoType.indexOf("公众号消息推送") > -1) {
        postData.official = 1
      } else {
        postData.official = 0
      }
      postData.triggers = this.form.alarmRules
      postData.users = this.form.users
      if (!this.form.id) {
        addAlarmStrategy(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            })
            bus.$emit("strategySave")
            this.init() // 初始化变量
            this.$router.back(-1)
          }
        })
      } else {
        postData.id = this.form.id
        strategyUpdate(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            })
            this.$parent.$parent.dialogVisible = false
            this.$parent.$parent.$parent.getData()
          }
        })
      }

    },
    //选择地块
    areaChange() {
      this.form.alarmRules = [
          {
            hd_device_sensor_id: "",
            valueType: "",
            value_way: "",
            operation: "", //运算
            condition: "SENSOR",
            upper: "",
            lower: "",
            value: "",
            value_num: "",
            alarm_frequency: "",
          }
        ],
      this.getSensorsData()
      this.getUser()
    },
    choose(type) {
      if (type === "传感器") {
        if(!this.form.rs_facilities_id) {
          this.$message({
            message: "请选择地块",
            type: "warning"
          })
          return
        }
      }
    },
    // 获取策略详情
    getDetail(id) {
      strategyDetail({id: id}).then(res => {
        if (res.code === 200) {
          this.form.rs_facilities_id = res.data.rs_facilities_id
          this.form.name = res.data.name
          if (res.data.notice && res.data.notice === 1) {
            this.form.infoType.push("短信")
          }
          if (res.data.phone_notice && res.data.phone_notice === 1) {
            this.form.infoType.push("电话")
          }
          if (res.data.official && res.data.official === 1) {
            this.form.infoType.push("公众号消息推送")
          }
          this.getSensorsData()
          this.getUser()
          for (let i = 0; i < res.data.triggers.length; i++) {
            const valueType = res.data.triggers[i]
            if (valueType.value_way === "og") {
              valueType.valueType = "原始值"
            } else if (valueType.value_way === "avg") {
              valueType.valueType = "平均值"
            } else if (valueType.value_way === "max") {
              valueType.valueType = "最大值"
            } else if (valueType.value_way === "min") {
              valueType.valueType = "最小值"
            }
            if (valueType.upper) {
              valueType.operation = "大于"
              valueType.value = valueType.upper
            } else {
              valueType.operation = "小于"
              valueType.value = valueType.lower
            }
            valueType.value_num = ""+valueType.value_num
          }
          this.form.id = res.data.id
          this.form.users = res.data.users
          this.form.alarmRules = res.data.triggers
        }
      })
    },
    // 获取地块列表
    getAreaData() {
      findByBs_base_id({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.areaList = res.data
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
    // 获取地块下传感器
    getSensorsData() {
      getValueSensorsByRs_facilities_id(this.form.rs_facilities_id).then(res => {
        if (res.code === 200) {
          this.sensorList = res.data
        }
      })
    },
    ruleDel(index) {
      this.form.alarmRules.splice(index, 1)
    },
    ruleAdd() {
      this.form.alarmRules.push(
        {
          hd_device_sensor_id: "",
          valueType: "",
          value_way: "",
          operation: "", //运算
          upper: "",
          lower: "",
          value: "",
          condition: "SENSOR",
          value_num: "",
          alarm_frequency: "",
        }
      )
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
.chooseType
  color #545454
  background #ccc
  cursor pointer
  padding 8px 15px
  border-radius 5px
.chooseTypeActive
  color #fff
  background #409EFF
  cursor pointer
  padding 8px 15px
  border-radius 5px
.tip
  margin-left 20px
  color red
  font-size 12px
.rule
 font-size 20px
 color #545454
.rule:hover 
  color #409EFF
</style>