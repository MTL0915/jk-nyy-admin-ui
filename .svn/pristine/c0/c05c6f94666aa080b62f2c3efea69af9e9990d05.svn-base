<template>
  <div class="main">
    <div class="dk-div">
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
          <el-form-item label="颜色">
            <el-color-picker v-model="color" />
          </el-form-item>
          <el-form-item label="类别">
            <el-radio-group v-model="form.type">
              <el-radio-button
                v-for="item in type_list"
                :label="item"
                :key="item"
              >{{ item }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="面积">
            <el-col :span="12">
              <el-input
                v-model="form.area"
                placeholder="100"
              />
            </el-col>
            <el-col
              :span="2"
              class="line"
            > &nbsp;亩 </el-col>
          </el-form-item>
          <el-form-item label="排序">
            <el-col :span="4">
              <el-input
                v-model="form.order"
                placeholder="10"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="form.desc"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="示例图">
            <!-- upload html -->
            <el-upload
              :show-file-list="false"
              :on-change="handleChangeBack"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="' '"
            >
              <img
                v-if="form.pic"
                :src="form.pic"
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
              @click="saveEdit"
            >确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import ajaxApi from '@/api/map'
import { mapGetters } from 'vuex'
export default {
  name: 'AreaEdit',
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          name: '',
          code: '',
          type: '',
          order: '',
          pic: ''
        }
      }
    }
  },
  data () {
    return {
      color: 'rgba(19, 206, 102, 0.8)',
      type_list: [
        '温室大棚',
        '鱼塘',
        '养殖场',
        '果园',
        '加工厂',
        '车库'
      ],
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
  methods: {
    saveEdit () {
      //          this.$refs['form'].validate((valid) => {
      //              if (valid) {
      //                  alert('submit!');
      //                  this.$message.success('提交表单成功!');
      //                  bus.$emit('close_current_tags');
      //                  return true;
      //              } else {
      //                  console.log('error submit!!');
      //                  this.$message.error('表单验证不通过!');
      //                  return false;
      //              }
      //          });
      ajaxApi.update_DK({
        rs_facilities_id: null
      })
    },
    handleChangeBack (file, fileList) {
      this.form.pic = URL.createObjectURL(file.raw)
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
      //return isJPG && isLt2M
      return false
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

.dk-div
  margin-left 0px
  height 582px
  overflow hidden
  padding 15px
</style>

