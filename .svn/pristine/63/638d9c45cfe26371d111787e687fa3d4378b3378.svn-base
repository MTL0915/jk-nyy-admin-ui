<template>
  <div>
    <div style="text-align:center;">
      上传时间：
      <el-date-picker
        size="mini"
        v-model="time"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right"
      />
    </div>
    <div style="margin-top:15px;display:flex;width: 100%;overflow: auto;">
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
    <div style="margin-top:15px;text-align:right;">
      <el-button
        type="primary"
        size="mini"
        @click="upload"
      >上传</el-button>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    hd_device_id: {
      type: String,
      default: null
    },
    device_id: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      images: [],
      time: null,
    }
  },
  methods: {
    upload () {
      if (this.images === null || this.images.length === 0) {
        this.$message.error('未添加图片')
        return
      }
      let formData = new FormData()
      let a = []
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].fileRaw) {
          a.push(this.images[i].fileRaw)
        }
      }
      for (let j = 0; j < a.length; j++) {
        formData.append('img' + j, a[j])
      }
      if (this.time) { formData.append('time', this.time) }
      if (this.hd_device_id) { formData.append('hd_device_id', this.hd_device_id) }
      if (this.device_id) { formData.append('device_id', this.device_id) }
      formData.append('imgSize', a.length)
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/deviceImgUpload', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$parent.$parent.deviceImgUploadDialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleImgChange (file, fl) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      //   file = null
      // }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
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
    deleteImg (item, index) {
      this.images.splice(index, 1)
      this.$forceUpdate()
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