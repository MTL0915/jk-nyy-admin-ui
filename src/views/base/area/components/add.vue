<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="'添加地块'"
    append-to-body
    @close="closeDialog"
  >
    <div class="dk-content">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="90px"
      >
        <el-form-item
          label="地块名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="地块名称"
          />
        </el-form-item>
        <el-form-item label="类别">
          <el-radio-group v-model="form.rs_facilities_type_id">
            <el-radio-button
              v-for="item in type_list"
              :label="item.id"
              :key="item.id"
            >{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面积">
          <el-col :span="12">
            <el-input
              v-model="form.acreage"
              placeholder="100"
            />
          </el-col>
          <el-col
            :span="2"
            class="line"
          > &nbsp;亩 </el-col>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
        <el-form-item label="示例图">
          <el-upload
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-change="handleFileChange"
            class="avatar-uploader"
            action="' '"
          >
            <img
              v-if="form.image_path"
              :src="form.http_image_path"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveAdd"
          >确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>

import { mapGetters } from 'vuex'
import { getList } from '@/api/rs_facilities_type'
import { add } from '@/api/rs_facilities'

export default {
  name: 'AreaEdit',
  props: {
  },
  data () {
    return {
      dialogVisible: false,
      color: 'rgba(19, 206, 102, 0.8)',
      type_list: [],
      form: {
        name: null,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_type_id: null,
        acreage: 0,
        image_path: null
      },
      fileRaw: null,
      rules: {
        name: [{ required: true, message: '请输入地块名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token'
    ])
  },
  created () {
    getList({ size: 999 }).then(res => {
      this.type_list = res.data.content
    })
  },
  methods: {
    saveAdd () {
      var data = { ...this.form }
      data.image_path = this.fileRaw
      add(data).then(res => {
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.$parent.loadTableData()
        } else {
          this.$message.error(res.msg)
        }
        this.fileRaw = null
        this.dialogVisible = false
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        file = null
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
        file = null
      }
      return false
      //return isJPG && isLt10M
    },
    handleFileChange (file, fl) {
      if (file.raw) {
        this.form.image_path = URL.createObjectURL(file.raw)
        this.form.http_image_path = URL.createObjectURL(file.raw)
        this.fileRaw = file.raw
      }
    },
    closeDialog () {
      this.form.image_path = null
      this.form.http_image_path = null
      this.fileRaw = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  background #ffffff
  width 100%
  padding 10px

/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  verflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.avatar
  width 178px
  height 178px
  display block

.dk-map
  float left
  width 800px
  height 582px

  img
    max-width 800px
    display block
    margin 0 auto

.dk-div
  margin-left 800px
  height 582px
  overflow hidden
  padding 15px
</style>

