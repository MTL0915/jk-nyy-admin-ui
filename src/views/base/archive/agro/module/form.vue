<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >

      <el-form-item label="所属分类">
        <datacascader ref="datacascader" />
      </el-form-item>

      <el-form-item label="名称">
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="编码">
        <el-input
          v-model="form.code"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="别名">
        <el-input
          v-model="form.alias"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="英文名">
        <el-input
          v-model="form.enName"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="说明">
        <el-input
          v-model="form.description"
          type="textarea"
          style="width: 370px;"
          rows="3"
        />
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleImgChange"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="' '"
        >
          <img
            v-if="form.imagePath"
            :src="getImage(form.imagePath)"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>

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
import { getImage } from '@/utils/image_util'
import datacascader from './datacascader'
import { add, edit, addOrEdit } from '@/api/agroProductClassification'
export default {
  components: { datacascader },
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
  data () {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        p_id: '',
        code: '',
        name: '',
        alias: '',
        enName: '',
        description: '',
        imagePath: ''
      },
      rules: {
      }
    }
  },
  methods: {
    getImage: getImage,
    cancel () {
      this.resetForm()
    },
    showDialog () {
      this.dialog = true
      this.$nextTick(res => {
        this.$refs.datacascader.initValue(this.form.p_id);
      });
    },
    handleImgChange (file, fl) {
      // 生成上传file数据 file.raw
      if (file) {
        this.form.fileRaw = file.raw
        this.form.imagePath = URL.createObjectURL(file.raw)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        file = null
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      return false
    },
    doSubmit () {
      this.loading = true
      this.form.p_id = this.$refs.datacascader.getSelectedValue();


      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd () {
      if (!this.form.code || !this.form.name) {
        this.$message.error("名称或编码不能为空");
        this.loading = false
        return;
      }
      addOrEdit(this.form).then(res => {
        if (res.code == 200) {
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.$parent.init()
        } else {
          this.loading = false
          this.$message.error(res.msg);
        }
      }).catch(err => {
      })
    },
    doEdit () {
      if (!this.form.code || !this.form.name) {
        this.$message.error("名称或编码不能为空");
        this.loading = false
        return;
      }
      addOrEdit(this.form).then(res => {
        if (res.code == 200) {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.sup_this.init()
        } else {
          this.loading = false
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        p_id: '',
        code: '',
        name: '',
        alias: '',
        enName: '',
        useCode: '',
        description: '',
        imagePath: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

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
</style>