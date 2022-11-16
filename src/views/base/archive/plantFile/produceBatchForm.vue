<template>
  <div class="farmBox">
    <el-form
      :model="form"
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
            :label="item.classification_name"
            :value="item.id"
          >
            <span style="float: left">{{ item.classification_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.productBreed_name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采收名称">
        <el-input
          style="width:400px;"
          size="mini"
          v-model="form.name"
        />
      </el-form-item>

      <el-form-item label="采收类型">
        <el-select
          style="width:400px;"
          size="mini"
          v-model="form.agro_product_pluck_type_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in productPluckTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品等级">
        <el-select
          style="width:400px;"
          size="mini"
          v-model="form.level"
          placeholder="请选择"
        >
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="采收时间">
        <el-date-picker
          size="mini"
          v-model="form.pluck_time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          unlink-panels
          align="right"
        />
      </el-form-item>
      <el-form-item label="采收重量">
        <el-input
          style="width:100px;"
          size="mini"
          v-model="form.weight"
        />　公斤
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          style="width:400px;"
          size="mini"
          v-model="form.comment"
        />
      </el-form-item>
      <el-form-item label="图片">
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
            style="position: relative;"
            v-if="image"
          >
            <img
              :src="image.imagePath"
              class="avatar"
            >
            <i
              @click="deleteImg()"
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
          @click="save"
        >确定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getAgroProduceBatch, agroProductPluckTypeList, deleteBatchImage } from '@/api/agroProduceBatch'
import { formatDate } from "@/utils/date"
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { agroProduceArchiveList } from '@/api/agroProduceArchive'
import { getToken } from '@/utils/auth'

export default {
  components: {

  },
  props: {
    agroProduceBatchId: {
      type: Number,
      default: null,
    },
    agroProduceArchiveId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      productPluckTypeList: [],
      levelOptions: [
        {
          name: '一等品',
          value: 1
        },
        {
          name: '二等品',
          value: 2
        },
        {
          name: '三等品',
          value: 3
        },
        {
          name: '四等品',
          value: 4
        },
        {
          name: '五等品',
          value: 5
        },
      ],
      rs_facilities_id: null,
      form: {
        agro_product_pluck_type_id: null,
        name: null,
        comment: null,
        pluck_time: null,
        level: 1,
        weight: 0,
      },
      isShow: true,
      facilitiesList: [],
      image: null
    }
  },
  created () {
    if (this.agroProduceBatchId || this.agroProduceArchiveId) {
      this.isShow = false
    } else {
      getFacilitiesCountArchive({ type: 'now', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.facilitiesList = res.data
          if (this.facilitiesList && this.facilitiesList.length != 0) {
            this.rs_facilities_id = this.facilitiesList[0].id
            this.agroProduceArchiveList()
            this.form.pluck_time = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }

    if (this.agroProduceBatchId) {
      getAgroProduceBatch({ id: this.agroProduceBatchId }).then(res => {
        if (res.code === 200) {
          this.agroProduceArchiveId = res.data.agro_produce_archive_id
          this.form.agro_product_pluck_type_id = res.data.agro_product_pluck_type_id
          this.form.name = res.data.name
          this.form.comment = res.data.comment
          this.form.pluck_time = this.formatDate(new Date(res.data.pluckTime), 'yyyy-MM-dd hh:mm:ss')
          this.form.level = res.data.level
          this.form.weight = res.data.weight
          if (res.data.imagePath) {
            this.image = {}
            this.image.imagePath = process.env.IMG_URL + res.data.imagePath
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
    agroProductPluckTypeList().then(res => {
      if (res.code === 200) {
        this.productPluckTypeList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    formatDate,
    deleteImg () {
      if (this.agroProduceBatchId) {//修改
        deleteBatchImage({ id: this.agroProduceBatchId }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      this.image = null
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
        this.image = {}
        this.image.fileRaw = file.raw
        this.image.imagePath = URL.createObjectURL(file.raw)
      }
    },
    beforeAvatarUpload (file) {
      return false
    },
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
    save () {
      if (!this.agroProduceArchiveId) {
        this.$message.error('生产档案不能为空')
        return
      }
      if (!this.form.name) {
        this.$message.error('采收名称不能为空!')
        return
      }
      if (!this.form.agro_product_pluck_type_id) {
        this.$message.error('采收类型不能为空!')
        return
      }
      if (!this.form.pluck_time) {
        this.$message.error('采收时间不能为空')
        return
      }
      if (this.form.comment === null) {
        this.form.comment = ''
      }
      let formData = new FormData()
      formData.append('agro_produce_archive_id', this.agroProduceArchiveId)
      formData.append('agro_product_pluck_type_id', this.form.agro_product_pluck_type_id)
      formData.append('name', this.form.name)
      formData.append('comment', this.form.comment)
      formData.append('pluck_time', this.form.pluck_time)
      formData.append('level', this.form.level)
      if (this.form.weight != null) { formData.append('weight', this.form.weight) }
      if (this.image && this.image.fileRaw) {
        formData.append('img', this.image.fileRaw)
      }
      if (this.agroProduceBatchId != null) {//修改
        formData.append('id', this.agroProduceBatchId)
      }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/api/addOrUpdateAgroProduceBatch', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$parent.$parent.produceBatchFormDialogVisible = false
          this.$parent.$parent.init()
        } else {
          this.$message.error(res.data.msg)
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