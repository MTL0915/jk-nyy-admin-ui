<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '添加策略' : '编辑策略'"
    width="700px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="策略类型">
        <el-radio
          v-model="form.type"
          label="timer"
        >定时策略</el-radio>
        <el-radio
          v-model="form.type"
          label="trigger"
        >触发策略</el-radio>
        <el-radio
          v-model="form.type"
          label="custom"
        >自定义策略</el-radio>
      </el-form-item>
      <el-form-item label="条件">
        <el-select
          v-model="form.timer_type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in timerTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-card
          v-if="form.type=='timer'"
          class="box-card"
        >
          <el-date-picker
            v-model="condition_config[0].date"
            :picker-options="timerDate"
            align="right"
            type="date"
            placeholder="选择日期"
          />

          <el-time-picker
            v-model="condition_config[0].time"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="选择时间"
          />
        </el-card>
        <template v-if="form.type==='trigger'">
          <el-card
            v-for="(v,i) in condition_config"
            :key="i"
            class="box-card"
          >
            当
            <el-cascader
              v-model="condition_config[i].hd_device_sensor_id"
              :options="deviceData"
              :props="{ multiple: false,label:'name',value:'id' }"
              collapse-tags
              placeholder="请选择或搜索传感器"
              filterable
              clearable
              style="width:280px"
            />

            <el-select
              v-model="condition_config[i].operator"
              placeholder="请选择"
              style="width:90px"
            >
              <el-option
                v-for="item in operatorData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-model="condition_config[i].value"
              style="width: 50px;"
            />
            <el-dropdown
              split-button
              size="mini"
              type="primary"
              @command="handleCommand($event,i)"
            >
              {{ condition_config[i].opt_text }}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="and">并且</el-dropdown-item>
                <el-dropdown-item command="or">或者</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-card>
        </template>
      </el-form-item>
      <el-form-item label="执行动作">
        <el-select
          v-model="form.action"
          placeholder="请选择"
        >
          <el-option
            v-for="item in action_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目标设备">
        <el-cascader
          v-model="target_sensor_ids"
          :options="controlDeviceData"
          :props="{ multiple: true,label:'name',value:'id' }"
          placeholder="请选择或搜索传感器"
          filterable
          clearable
          style="width:550px;"
          height="80"
        />
      </el-form-item>
      <el-form-item label="通知方式">
        <el-radio
          v-model="form.notice_type"
          label="timer"
        >无</el-radio>
        <el-radio
          v-model="form.notice_type"
          label="timer"
        >短信</el-radio>
        <el-radio
          v-model="form.notice_type"
          label="trigger"
        >电话</el-radio>
        <el-radio
          v-model="form.notice_type"
          label="custom"
        >短信+电话</el-radio>
      </el-form-item>
      <el-form-item label="接收人">
        <span style="color:#d0d0d0">目标设备负责人</span>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="cancel"
      >取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="doSubmit"
      >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { add } from '@/api/hd_device_strategy'
// import { getSensorTypeByUser } from '@/api/report'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      condition_config: [{ 'hd_device_sensor_id': '', 'opt_text': '操作', 'operator': '=', 'value': '', 'where': '', 'date': '', 'time': '' }],
      operatorData: [{ 'label': '等于', 'value': '=' }, { 'label': '大于', 'value': '>' }, { 'label': '小于', 'value': '<' }, { 'label': '不等于', 'value': '!=' }, { 'label': '大于等于', 'value': '>=' }, { 'label': '小于等于', 'value': '<=' }],
      timerTypeData: [{ 'label': '执行一次', 'value': 'once' }, { 'label': '重复', 'value': 'repeat' }],
      deviceData: [], controlDeviceData: [],
      form: {
        id: '',
        name: '',
        hd_device_id: '',
        sourceid: '',
        condition_config: '',
        action: ''
      },
      action_options: [{
        value: 'notice',
        label: '通知'
      }, {
        value: 'open',
        label: '打开'
      }, {
        value: 'close',
        label: '关闭'
      }],
      timerDate: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      rules: {
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    this.getDeviceData()
  },
  methods: {
    getDeviceData() {
      // getSensorTypeByUser({ user_id: this.id }).then(res => {
      //   this.deviceData = res.data
      //   for (var i = 0; i < res.data.length; i++) {
      //     if (res.data[i].channelType === 1) {
      //       this.controlDeviceData.push(res.data[i])
      //     }
      //   }
      // }).catch({})
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      // edit(this.form).then(res => {
      //   this.resetForm()
      //   this.$notify({
      //     title: '修改成功',
      //     type: 'success',
      //     duration: 2500
      //   })
      //   this.loading = false
      //   this.sup_this.init()
      // }).catch(err => {
      //   this.loading = false
      //   console.log(err.response.data.message)
      // })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        name: '',
        hd_device_dd: '',
        sourceid: '',
        condition_config: '',
        target_sensor_ids: '',
        action: ''
      }
    }, handleCommand(commandText, index) {
      if (commandText === 'and' || commandText === 'or') {
        this.condition_config.push({ 'hd_device_sensor_id': '', 'opt_text': '操作', 'operator': '=', 'value': '', 'where': '' })
        this.condition_config[index].opt_text = (commandText === 'and') ? '并且' : '或者'
      } else if (commandText === 'delete') {
        if (this.condition_config.length === 1) {
          this.$message({
            message: '最后一个条件不能删除！',
            type: 'warning'
          })
          return false
        }
        this.condition_config.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
</style>
