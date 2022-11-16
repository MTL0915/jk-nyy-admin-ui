<template>
  <div class="farmBox">
    <el-form label-width="100px">
      <el-tabs type="border-card">
        <el-tab-pane label="计划信息">
          <el-form-item
            label="所属地块"
            prop="rs_facilities_id"
            v-show="isShow"
          >
            <el-select
              size="mini"
              v-model="rs_facilities_id"
              placeholder="请选择地块"
              @change="agroProduceArchiveList()"
            >
              <el-option
                v-for="item in facilitiesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="生产档案"
            prop="rs_facilities_id"
            v-show="isShow"
          >
            <el-select
              size="mini"
              :disable="this.form.id"
              v-model="agroProduceArchiveId"
              placeholder="请选择种植档案"
              width="250px"
            >
              <el-option
                v-for="item in archiveList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.classification_name+'('+item.productBreed_name+')' }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="农事类型"
            prop="operation"
          >
            <el-select
              clearable
              style="width:220px;"
              size="mini"
              v-model="form.agro_produce_record_type_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="计划名称">
            <el-input
              clearable
              style="width:220px;"
              size="mini"
              v-model="form.name"
            />
          </el-form-item>
          <el-form-item label="负责人">
            <el-select
              style="width:220px;"
              size="mini"
              clearable
              multiple
              v-model="form.users"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-radio
              v-model="form.taskType"
              :label=0
            >独立任务</el-radio>
            <el-radio
              v-model="form.taskType"
              :label=1
            >团体任务</el-radio>
          </el-form-item>
          <el-form-item label="启动状态">
            <el-radio
              v-model="form.sta"
              :label=1
            >启用</el-radio>
            <el-radio
              v-model="form.sta"
              :label=0
            >停止</el-radio>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              :rows="2"
              size="mini"
              type="textarea"
              placeholder="请输入内容"
              v-model="form.description"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="时间配置">
          <el-form-item label="计划方式">
            <el-switch
              size="mini"
              v-model="isCycle"
              active-text="周期循环"
              inactive-text="单次计划"
            />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:220px;"
              size="mini"
              v-model="form.start_time"
              type="datetime"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            v-if="isCycle"
            label="结束时间"
          >
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:220px;"
              size="mini"
              v-model="form.end_time"
              type="datetime"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            v-if="isCycle"
            label="任务周期"
          >
            <el-select
              multiple
              size="mini"
              v-model="cycle"
              placeholder="请选择"
              style="width:220px;"
            >
              <el-option
                v-for="item in cycleOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="isCycle"
            label="任务时间"
          >
            <el-select
              size="mini"
              style="width:80px;"
              v-model="hour"
              placeholder="请选择"
            >
              <el-option
                v-for="item in hourOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>时　
            <el-select
              size="mini"
              style="width:80px;"
              v-model="minute"
              placeholder="请选择"
            >
              <el-option
                v-for="item in minuteOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>分
          </el-form-item>
          <el-form-item label="预估工时">
            <el-input-number
              :min="0"
              v-model="gongshi"
              size="mini"
            />
            <el-select
              size="mini"
              style="width:80px;"
              v-model="timeType"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <div style="text-align:right;margin-top:8px">
        <el-button
          v-show="form.finish != 1"
          :loading="loading"
          size="mini"
          type="primary"
          @click="save"
        >确定</el-button>
        <el-button
          v-show="form.id && form.finish != 1"
          size="mini"
          type="warning"
          @click="finish"
        >完成</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date"
import { addOrUpdateAgroProducePlan, getAgroProducePlan, finishAgroProducePlan } from '@/api/agroProducePlan'
import { agroProduceRecordTypeList } from '@/api/agroProduceRecord'
import { facilitiesUsers } from '@/api/user'
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { agroProduceArchiveList, get } from '@/api/agroProduceArchive'

export default {
  components: {

  },
  props: {
    agroProducePlanId: {
      type: Number,
      default: null,
    },
    agroProduceArchiveId: {
      type: Number,
      default: null,
    }
  },
  data () {
    return {
      isCycle: true,
      form: {
        id: null,
        agro_produce_archive_id: null,
        name: null,
        start_time: null,
        end_time: null,
        sta: 1,
        description: null,
        cycle: null,
        hourMinute: null,
        duration: null,
        users: [],
        taskType: 0,
        finish: null
      },
      typeOptions: [],
      isShow: true,
      facilitiesList: [],
      gongshi: 1,
      loading: false,
      rs_facilities_id: null,
      cycle: [],
      staOptions: [{ name: '停止', value: 0 }, { name: '启用', value: 1 }],
      timeType: 'hour',
      timeOptions: [{ name: '天', value: 'day' }, { name: '小时', value: 'hour' }, { name: '分钟', value: 'minute' }],
      hour: '00',
      minute: '00',
      hourOptions: [],
      minuteOptions: [],
      userList: [],
      facilitiesId: null,
      cycleOptions: [
        { name: '星期一', value: '1' },
        { name: '星期二', value: '2' },
        { name: '星期三', value: '3' },
        { name: '星期四', value: '4' },
        { name: '星期五', value: '5' },
        { name: '星期六', value: '6' },
        { name: '星期日', value: '0' },
      ],
    }
  },
  created () {
    this.initHourMinute()
    agroProduceRecordTypeList().then(res => {
      this.typeOptions = res.data
    })
    if (this.agroProducePlanId || this.agroProduceArchiveId) {
      this.isShow = false
    } else {
      getFacilitiesCountArchive({ type: 'nowplan', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.facilitiesList = res.data
          if (this.facilitiesList && this.facilitiesList.length != 0) {
            this.rs_facilities_id = this.facilitiesList[0].id
            this.getUserList()
            this.agroProduceArchiveList()
            this.form.pluck_time = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
    this.archiveInit()
    this.planInit()
  },
  methods: {
    formatDate,
    finish () {
      this.$confirm('提前结束农事计划，执行后，将无法进行修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        finishAgroProducePlan({ id: this.agroProducePlanId }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$parent.$parent.producePlanFormDialogVisible = false
            if (this.$parent.$parent.init) {
              this.$parent.$parent.init()
            }
            if (this.$parent.$parent.dataLoad) {
              this.$parent.$parent.dataLoad()
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    },
    archiveInit () {
      if (this.agroProduceArchiveId) {
        get(this.agroProduceArchiveId).then(res => {
          this.rs_facilities_id = res.data.rs_facilities_id
          this.getUserList()
        })
      }
    },
    planInit () {
      if (this.agroProducePlanId) {
        getAgroProducePlan({ id: this.agroProducePlanId }).then(res => {
          if (res.code === 200) {
            const _this = this
            let u = []
            res.data.users.map(v => {
              u.push(v.id)
            })
            if (res.data.cycle) {//周期
              this.form.end_time = this.formatDate(new Date(res.data.endTime), 'yyyy-MM-dd hh:mm:ss')
              res.data.cycle.split(',').map(p => {
                _this.cycle.push(p)
              })
            } else {//特定时间
              this.isCycle = false
            }
            if (res.data.hourMinute) {
              this.form.hourMinute = res.data.hourMinute
              let hm = res.data.hourMinute.split(':')
              this.hour = hm[0]
              this.minute = hm[1]
            }
            let dur = res.data.duration
            if (dur) {//工时
              if (dur % 86400000 === 0) {
                this.timeType = 'day'
                this.gongshi = dur / 86400000
              } else if (dur % 3600000 === 0) {
                this.timeType = 'hour'
                this.gongshi = dur / 3600000
              } else {
                this.timeType = 'minute'
                this.gongshi = dur / 60000
              }
            }
            this.rs_facilities_id = res.data.rs_facilities_id
            this.getUserList()
            this.form.users = u
            this.form.id = res.data.id
            this.form.agro_produce_archive_id = res.data.agro_produce_archive_id
            this.form.name = res.data.name
            this.form.start_time = this.formatDate(new Date(res.data.startTime), 'yyyy-MM-dd hh:mm:ss')
            this.form.sta = res.data.sta
            this.form.description = res.data.description
            this.form.cycle = res.data.cycle
            this.form.taskType = res.data.taskType
            this.form.finish = res.data.finish
            this.form.agro_produce_record_type_id = res.data.agro_produce_record_type_id
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getUserList () {
      if (this.rs_facilities_id) {
        facilitiesUsers({ rs_facilities_id: this.rs_facilities_id }).then(res => {
          if (res.data.length === 0) {
            this.$message.error('地块未关联用户!')
          }
          this.userList = res.data
        })
      }
    },
    initHourMinute () {
      for (let i = 0; i < 24; i++) {
        let n = ''
        if (i < 10) {
          n = '0' + i
        } else {
          n = i + ''
        }
        this.hourOptions.push({ name: n })
      }
      for (let i = 0; i < 60; i++) {
        let n = ''
        if (i < 10) {
          n = '0' + i
        } else {
          n = i + ''
        }
        this.minuteOptions.push({ name: n })
      }
    },
    agroProduceArchiveList () {
      agroProduceArchiveList({
        timeType: 'nowplan',
        rs_facilities_id: this.rs_facilities_id
      }).then(res => {
        if (res.code === 200) {
          this.archiveList = res.data.content
          if (this.archiveList && this.archiveList.length != 0) {
            this.agroProduceArchiveId = this.archiveList[0].id
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    save () {
      this.loading = true
      if (!this.form.name) {
        this.$message.error('计划名称不能为空!')
        this.loading = false
        return
      }
      if (!this.form.start_time) {
        this.$message.error('计划开始时间不能为空')
        this.loading = false
        return
      }
      if (!this.form.agro_produce_record_type_id) {
        this.$message.error('计划农事类型不能为空')
        this.loading = false
        return
      }
      if (this.isCycle) {
        if (!this.form.end_time) {
          this.$message.error('计划结束时间不能为空')
          this.loading = false
          return
        }
        if (this.cycle.length === 0) {
          this.$message.error('周期不能为空')
          this.loading = false
          return
        }
        this.form.cycle = this.cycle.join(',')
        this.form.hourMinute = this.hour + ':' + this.minute
      } else {
        this.form.cycle = null
      }
      if (this.form.users.length === 0) {
        this.$message.error('请指定负责人')
        this.loading = false
        return
      }
      if (this.form.id === null) {
        this.form.agro_produce_archive_id = this.agroProduceArchiveId
      }
      if (this.gongshi === null || this.gongshi < 0) {
        this.gongshi = 1
      }
      if (this.timeType === 'day') {
        this.form.duration = this.gongshi * 86400000
      } else if (this.timeType === 'hour') {
        this.form.duration = this.gongshi * 3600000
      } else if (this.timeType === 'minute') {
        this.form.duration = this.gongshi * 60000
      }

      addOrUpdateAgroProducePlan(this.form).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$parent.$parent.producePlanFormDialogVisible = false
          if (this.$parent.$parent.init) {
            this.$parent.$parent.init()
          }
          if (this.$parent.$parent.dataLoad) {
            this.$parent.$parent.dataLoad()
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
.farmBox
  >>>.el-dialog__body
    overflow hidden

.avatar
  margin-right 10px
  vertical-align middle
  width 100px
  height 100px

>>>.img-uploader
  display inline-block
  width 100px
  height 100px
  text-align center
  line-height 100px
  border 1px dashed #ccc
</style>