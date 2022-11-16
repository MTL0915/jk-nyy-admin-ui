<template>
  <el-dialog
    class='form'
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="500px"
    @close="closeDialog"
  >
    <div style="text-align: center;margin-bottom: 25px;">
      <template>
        <el-radio
          v-model="qjType"
          label="1"
        >自定义全景</el-radio>
        <el-radio
          v-model="qjType"
          label="2"
        >第三方全景</el-radio>
      </template>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="地址"
        v-if="qjType==='2'"
      >
        <el-input
          v-model="form.url"
          style="width: 370px;"
        />
      </el-form-item>
      <!-- <el-form-item label="全景图" class='picUpdate' >
        <img :src='form.pic' style="width: 370px;" />
        <div class='coverCurUpdate'>
          <i class='el-icon-edit-outline curUpdate'></i>
        </div>
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
            v-if="form.http_image_path"
            :src="form.http_image_path"
            style="width:200px;height:150px;"
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
//import { add, edit } from '@/api/rsPanor'
import { getToken } from '@/utils/auth'

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
  data () {
    return {
      qjType: '1',
      loading: false, dialog: false,
      form: {
        name: '新建全景',
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        // image_path : "",
        url: null
      },
      formData: new FormData(),
      rules: {
      }
    }
  },
  methods: {
    closeDialog () {
      this.resetForm()
    },
    handleFileChange (file, fl) {
      if (file) {
        fl = fl.splice(0, fl.length - 1)
        //this.form.http_image_path = URL.createObjectURL(file.raw)
        this.$set(this.form, 'http_image_path', URL.createObjectURL(file.raw))
        this.formData.set('image_path', file.raw)
        this.$forceUpdate()
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        file = null
        this.$set(this.form, 'http_image_path', null)
        this.formData.delete('image_path')
      }
      return false
    },
    show () {
      this.dialog = true;
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd () {
      this.formData.append('name', this.form.name)
      this.formData.append('bs_base_id', this.form.bs_base_id)
      if (this.form.url && this.qjType === '2') {
        if (this.form.url.startsWith('http://') || this.form.url.startsWith('https://')) {
          this.formData.append('url', this.form.url)
        } else {
          this.loading = false
          this.formData = new FormData()
          this.$message.error('URL格式错误')
          return
        }
      }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/api/rsPanor', this.formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
        this.formData = new FormData()
        this.$parent.$parent.init()
        this.resetForm()
      })
      // add(this.formData).then(res => {
      //   this.resetForm()
      //   this.loading = false
      //   if (res.code === 200) {
      //     this.$notify({
      //       title: '添加成功',
      //       type: 'success',
      //       duration: 2500
      //     })
      //     this.formData = new FormData()
      //     this.$parent.$parent.init()
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },
    doEdit () {
      this.formData.append('id', this.form.id)
      this.formData.append('name', this.form.name)
      this.formData.append('bs_base_id', this.form.bs_base_id)
      if (this.form.url && this.qjType === '2') {
        if (this.form.url.startsWith('http://') || this.form.url.startsWith('https://')) {
          this.formData.append('url', this.form.url)
        } else {
          this.loading = false
          this.formData = new FormData()
          this.$message.error('URL格式错误')
          return
        }
      }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.put(process.env.BASE_API + '/api/rsPanor', this.formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
        this.formData = new FormData()
        this.$parent.$parent.$parent.$parent.$parent.init()
        this.resetForm()
      })
      // edit(this.formData).then(res => {
      //   this.resetForm()
      //   this.loading = false
      //   if (res.code === 200) {
      //     this.$notify({
      //       title: '修改成功',
      //       type: 'success',
      //       duration: 2500
      //     })
      //     this.formData = new FormData()
      //     this.$parent.$parent.$parent.$parent.$parent.init()
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        name: '新建全景',
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
      }
    }
  }
}
</script>

<style>
.form .picUpdate:hover .coverCurUpdate {
  display: block;
}

.form .coverCurUpdate {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000088;
  display: none;
  cursor: pointer;
  transition: all 0.25s;
}

.form .curUpdate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 71px;
}
</style>
<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.flex
  display flex
  align-items center

.title
  text-align center
  font-size 18px
  margin-bottom 10px

.ll-input
  width 100px

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
