<template>
  <div class="farmBox">
    <el-form
      :model="form"
      ref="ruleForm"
      label-width="100px"
    >
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
          v-model="agroProduceArchiveId"
          placeholder="请选择档案"
        >
          <el-option
            v-for="item in archiveList"
            :key="item.id"
            :label="item.classification_name+'('+item.productBreed_name+')'"
            :value="item.id"
          >
            <span style="float: left">{{ item.classification_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.productBreed_name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="创建用户"
        v-if="recordId"
      >
        {{create_user_name}}
      </el-form-item>
      <div v-if="agro_produce_plan_id">
        <el-form-item label="任务名称">
          {{agro_produce_plan_name}}
        </el-form-item>
        <el-form-item label="任务负责人">
          {{workPrincipal}}
        </el-form-item>
        <el-form-item label="任务开始时间">
          {{workStartTime}}
        </el-form-item>
        <el-form-item label="预计工作时长">
          {{workDuration}}
        </el-form-item>
      </div>
      <el-form-item
        label="农事类型"
        prop="operation"
      >
        <el-select
          style="width:400px;"
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

      <el-form-item
        label="标题"
        prop="name"
      >
        <el-input
          style="width:400px;"
          size="mini"
          v-model="form.name"
        />
      </el-form-item>

      <el-form-item
        label="具体描述"
        prop="description"
      >
        <el-input
          type="textarea"
          style="width:400px;"
          size="mini"
          v-model="form.description"
        />
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker
          size="mini"
          v-model="form.start_time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right"
        />
        <!-- <el-date-picker
          size="mini"
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          unlink-panels
          align="right"
        /> -->
      </el-form-item>
      <el-form-item label="工作时长">
        <el-input-number
          v-model="timeNum"
          :min="0"
          size="mini"
        />
        <el-select
          style="width:90px;"
          size="mini"
          v-model="defaultTime"
        >
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="农事图片">
        <div style="display:flex;width: 100%;overflow: auto;">
          <el-upload
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleImgChange"
            :before-upload="beforeAvatarUpload"
            style="width:100px;display:inline-block;margin-right:10px"
            action="' '"
          >
            <i class="el-icon-plus img-uploader" />
          </el-upload>
          <div
            v-show="images.length > 0"
            v-for="(item, index) in images"
            :key="index"
            style="position: relative;"
          >
            <img
              :src="item.imagePath"
              class="avatar"
            >
            <i
              @click="deleteImg(item,index)"
              style="position: absolute;top: 0px;right: 0px;"
              class="el-icon-circle-close"
            />
          </div>
        </div>
      </el-form-item>

      <div style="text-align:right;">
        <el-button
          size="mini"
          type="primary"
          @click="add"
        >确定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { agroProduceRecordTypeList, deleteRecordImage, getAgroProduceRecordById } from '@/api/agroProduceRecord'
import { getToken } from '@/utils/auth'
import { formatDate } from "@/utils/date";
import { agroProduceArchiveList } from '@/api/agroProduceArchive'
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import form1 from '../../info/module/form1.vue';

export default {
  components: { form1 },
  props: {
    recordId: {
      type: Number,
      default: null
    },
    agroProduceArchiveId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      dialogVisible: false,
      rs_facilities_id: null,
      form: {
        agro_produce_record_type_id: null,
        name: null,
        description: null,
        start_time: null,
        end_time: null,
      },
      typeOptions: [],
      archiveList: [],
      images: [],
      time: null,
      rules: {
        operation: [{ required: true, message: "请选择操作内容", trigger: "change" }],
        person: [{ required: true, message: "请选择执行人", trigger: "change" }],
        operaTime: [{ required: true, message: "请选择操作时间", trigger: "change" }],
        manHour: [{ required: true, message: "操作工时不能为空", trigger: "blur" }]
      },
      isShow: true,
      timeNum: 0,
      defaultTime: 'hour',
      timeOptions: [{ name: '小时', value: 'hour' }, { name: '分钟', value: 'minute' }],
      workStartTime: '',
      workDuration: '',
      workPrincipal: '',
      create_user_name: '',
      agro_produce_plan_id: null,
      agro_produce_plan_name: null,
    }
  },
  created () {
    if (this.agroProduceArchiveId || this.recordId) {
      this.isShow = false
    } else {
      getFacilitiesCountArchive({ type: 'now', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.facilitiesList = res.data
          if (this.facilitiesList && this.facilitiesList.length != 0) {
            this.rs_facilities_id = this.facilitiesList[0].id
            this.agroProduceArchiveList()

            this.form.start_time = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
    if (this.recordId) {
      getAgroProduceRecordById({ id: this.recordId }).then(res => {
        //计划
        this.agro_produce_plan_id = res.data.agro_produce_plan_id
        let dur = res.data.agro_produce_plan_duration
        if (this.agro_produce_plan_id) {
          this.agro_produce_plan_name = res.data.agro_produce_plan_name
          let names = []
          res.data.users.map(v => {
            names.push(v.name)
          })
          this.workPrincipal = names.join(',')
          if (res.data.agro_produce_plan_cycle) {//周期计划
            this.workStartTime = formatDate(new Date(res.data.agro_produce_plan_createTime), 'yyyy-MM-dd') + ' ' + res.data.agro_produce_plan_hourMinute + ':00'
          } else {//特定时间
            this.workStartTime = formatDate(new Date(res.data.agro_produce_plan_startTime), 'yyyy-MM-dd hh:mm:ss')
          }
          if (dur % 86400000 === 0) {
            this.timeType = 'day'
            this.workDuration = (dur / 86400000) + '天'
          } else if (dur % 3600000 === 0) {
            this.timeType = 'hour'
            this.workDuration = (dur / 3600000) + '小时'
          } else {
            this.timeType = 'minute'
            this.workDuration = (dur / 60000) + '分钟'
          }
        }
        //记录
        this.agroProduceArchiveId = res.data.agro_produce_archive_id
        this.form.agro_produce_record_type_id = res.data.agro_produce_record_type_id
        this.form.name = res.data.name
        this.form.description = res.data.description
        this.create_user_name = res.data.create_user_name

        if (res.data.startTime) {
          this.form.start_time = formatDate(new Date(res.data.startTime), 'yyyy-MM-dd hh:mm:ss')
        } else {
          this.form.start_time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        }

        var duration = res.data.duration;
        if (!duration) {
          duration = dur;
        }
        if (duration % 86400000 === 0) {
          this.defaultTime = 'day'
          this.timeNum = (duration / 86400000)
        } else if (duration % 3600000 === 0) {
          this.defaultTime = 'hour'
          this.timeNum = (duration / 3600000)
        } else {
          this.defaultTime = 'minute'
          this.timeNum = (duration / 60000)
        }


        res.data.images.map(v => {
          v.imagePath = process.env.IMG_URL + v.imagePath
        })
        this.images = res.data.images
      })
    }
  },
  mounted () {
    agroProduceRecordTypeList().then(res => {
      this.typeOptions = res.data
    })
  },
  methods: {
    formatDate,
    agroProduceArchiveList () {
      agroProduceArchiveList({
        timeType: 'now',
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
    deleteImg (item, index) {
      if (this.recordId && item.id) {//修改
        deleteRecordImage({ id: item.id }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      this.images.splice(index, 1)
      this.$forceUpdate()
    },
    handleImgChange (file, fl) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      //   file = null
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      if (file) {
        let i = {}
        i.fileRaw = file.raw
        i.imagePath = URL.createObjectURL(file.raw)
        this.images.push(i)
      }
    },
    beforeAvatarUpload (file) {
      return false
    },
    add () {
      if (!this.agroProduceArchiveId) {
        this.$message.error('农产品生产档案不能为空')
        return
      }
      if (!this.form.agro_produce_record_type_id) {
        this.$message.error('农事记录类型不能为空')
        return
      }
      if (!this.form.name) {
        this.$message.error('名称不能为空')
        return
      }
      if (!this.form.start_time) {
        this.$message.error('开始时间不能为空')
        return
      }
      if (this.timeNum === null || this.timeNum <= 0) {
        this.$message.error('工时不能为0')
        return
      }
      let b = 0
      if (this.defaultTime === 'hour') {
        b = 60 * 60 * 1000
      } else if (this.defaultTime === 'minute') {
        b = 60 * 1000
      }
      let sjc = new Date(this.form.start_time).getTime() + (this.timeNum * b)
      this.form.end_time = formatDate(new Date(sjc), 'yyyy-MM-dd hh:mm:ss')
      let formData = new FormData()
      formData.append('agro_produce_archive_id', this.agroProduceArchiveId)
      formData.append('agro_produce_record_type_id', this.form.agro_produce_record_type_id)
      formData.append('name', this.form.name)
      if (this.form.description) {
        formData.append('description', this.form.description)
      }
      formData.append('start_time', this.form.start_time)
      formData.append('end_time', this.form.end_time)

      let a = []
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].fileRaw) {
          a.push(this.images[i].fileRaw)
        }
      }
      for (let j = 0; j < a.length; j++) {
        formData.append('img' + j, a[j])
      }
      formData.append('imgSize', a.length)

      if (this.recordId) {//修改
        formData.append('id', this.recordId)
      }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/api/addOrUpdateAgroProduceRecord', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          if (this.$parent.$parent.produceRecordFormDialogVisible) {
            this.$parent.$parent.produceRecordFormDialogVisible = false
          }
          if (this.$parent.$parent.$refs.farm) {
            this.$parent.$parent.$refs.farm.init()
          } else if (this.$parent.$parent.init) {
            this.$parent.$parent.init()
          } else if (this.$parent.$parent.getAagroProduceArchiveList) {
            this.$parent.$parent.getAagroProduceArchiveList()
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
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