<template>
  <div>
    <!-- 编辑弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="设备类型编辑"
      append-to-body
      width="1000px"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        :inline="true"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="name"
            >
              <el-input
                v-model="form.name"
                width="200px"
                style="width:200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="类型编号"
              prop="code"
            >
              <el-input
                v-model="form.code"
                placeholder="设备类型编号"
                style="width:200px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="网络层级"
              prop="function_code"
            >
              <el-radio-group v-model="form.function_code">
                <el-radio-button
                  v-for="item in $parent.device_functionDicts"
                  :label="item.value"
                  :key="item.value"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品">
              <el-select
                v-model="form.hd_product_id"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in $parent.prod_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number
                v-model="form.ord"
                :min="1"
                :max="300"
                controls-position="right"
                style="width:120px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标">
              <el-upload
                ref="upload"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="' '"
              >
                <img
                  v-if="form.image_path"
                  :src="form.image_path"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { getImage } from '@/utils/image_util'
import { update } from '@/api/equiptype'
// import channelConfig from './module/channelConfig'
// import initDict from '@/mixins/initDict'
export default {
  name: 'Basetable',
  // components: { channelConfig },
  // mixins: [initDict],
  data () {
    return {
      dialogVisible: false,
      form: {
        hd_device_type_id: '',
        name: '',
        code: '',
        function_code: '',
        ord: '',
        hd_product_id: '',
        hd_product_name: '',
        image_path: ''
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入设备类型编号', trigger: 'blur' }
        ],
        function_code: [
          // 单选
          { required: true, message: '功能类别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    // 保存编辑
    saveEdit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form
          if (form.fileRaw) {
            form.image_path = form.fileRaw
          }
          update(form).then(res => {
            if (res.code === 200) {
              this.$message.success('编辑成功')
              this.dialogVisible = false
              this.$parent.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    show (item) {
      this.form = {
        name: item.name,
        code: item.code,
        function_code: item.function_code,
        ord: item.ord,
        hd_product_id: item.hd_product_id,
        hd_device_type_id: item.id,
        image_path: item.image_path
      }
      this.form.image_path = getImage(item.image_path)
      this.dialogVisible = true
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
      //return isJPG && isLt2M
    },
    handleChange (file, fl) {
      // 生成上传file数据 file.raw
      if (file) {
        this.form.fileRaw = file.raw
        this.form.image_path = URL.createObjectURL(file.raw)
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
