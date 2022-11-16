<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="编辑机构"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="名称："
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="组织类型："
          prop="bs_org_type_code"
        >
          <el-radio-group v-model="form.bs_org_type_code">
            <el-radio
              v-for="item in org_type_list"
              :label="item.code"
              :key="item.id"
            >{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="所属组织"
          prop="bs_org_id"
        >
          <el-select
            v-model="form.bs_org_parent_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in org"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="编号：">
          <el-input v-model="form.code" />
        </el-form-item>

        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input v-model="form.email" />
        </el-form-item>

        <!-- <el-form-item label="所在地区" prop="area_id">
          <el-cascader
            :options="provenceArray"
            v-model="form.area_id"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </el-form-item> -->

        <area-code
          ref="myarea"
          :area_code="form.area_id"
        />

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
              v-if="logo_path"
              :src="logo_path"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>

        <el-form-item label="详细地址：">
          <el-input v-model="form.website" />
        </el-form-item>

        <el-form-item
          label="联系电话："
          prop="phone"
        >
          <el-input v-model="form.phone" />
        </el-form-item>

        <el-form-item label="简介：">
          <el-input
            v-model="form.summary"
            type="textarea"
          />
        </el-form-item>

        <el-form-item label="主题：">
          <el-input v-model="form.topic_code" />
        </el-form-item>

        <el-form-item label="公司网址：">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="form.linkman" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button
          type="primary"
          @click="editOrg"
        >修 改</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import areaCode from '@/components/common/area'
import { allOrgList, getProvence, getArea } from '@/api/baseInfo'
import { editOrg } from '@/api/org.js'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgEdit',
  components: {
    areaCode
  },
  props: {
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      org: [],
      area: [],
      provenceArray: [],
      props: {
        label: 'name',
        value: 'id'
      },
      logo_path: '',
      fileRaw: null,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ pattern: /^1[34578]\d{9}$|^\d{6,8}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['org_type_list'])
  },
  created () {
    this.getAllOrgData()
  },
  methods: {
    getAreaCodeArr (bcode) {
      console.log('bcode', bcode)
      return [bcode.substring(0, 2) + '0000', bcode.substring(0, 4) + '00', bcode]
    },
    dialogShow () {
      this.dialogFormVisible = true
    },
    reSetareaid (arr) {
      if (arr.length === 3) {
        // 设置默认数据
        this.handleItemChange(arr.slice(0, 1))
          .then((res) => {
            this.handleItemChange(arr.slice(0, 2))
              .then(() => {
                this.form.area_id = arr
              })
          })
      }
    },
    getAllOrgData () {
      allOrgList().then(res => {
        if (res.code === 200) {
          this.org = res.data.content
        }
      })
    },
    getProvenceData () {
      getProvence().then(res => {
        if (res.code === 200) {
          res.data.forEach((item, index) => {
            res.data[index]['children'] = []
          })
          this.provenceArray = res.data
          console.log('this.provenceArray == ', this.provenceArray)
        }
      })
    },
    async handleItemChange (val) {
      const length = val.length
      new Promise((resolve, reject) => {
        if (length === 1) {
          const bs_area_parent_id = val[0]
          getArea({ bs_area_parent_id }).then(res => {
            const area = res.data
            this.provenceArray.map((item, index) => {
              if (item.id === bs_area_parent_id) {
                area.forEach((v, i) => {
                  this.$set(area[i], 'children', [])
                })
                this.$set(this.provenceArray[index], 'children', area)
              }
            })
          })
        } else if (length === 2) {
          const bs_area_parent_id = val[1]
          getArea({ bs_area_parent_id }).then(res => {
            const area = res.data
            this.provenceArray.map((item, index) => {
              if (item.id === val[0]) {
                item.children.map((v, i) => {
                  this.$set(this.provenceArray[index].children[i], 'children', area)
                })
              }
            })
          })
        }
      })
    },
    editOrg () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 成功去提交表单
          // if(this.form.area_id.length > 0){
          //   this.form.bs_area_code = this.form.area_id[this.form.area_id.length - 1];
          // }
          const areaId = this.$refs.myarea.getAreaid()
          if (areaId) {
            this.form.bs_area_id = areaId
          }
          console.log('update bs_area_id', this.form.bs_area_id)
          if (this.fileRaw) { // 图片
            this.form.logo_path = this.fileRaw
          }
          const _param = this.form
          _param.bs_org_id = this.form.id

          console.log(' up data _param is === ', _param)
          editOrg(_param)
            .then(res => {
              console.log('submit res', res)
              if (res.code === 200 && res.msg === '成功') {
                this.$message.success(res.msg)
                this.$refs.form.resetFields()
                this.dialogFormVisible = false
                // 主动通知父组件刷新页面.
                this.$emit('upOrgData')
              }
            })
        } else {
          this.$message.error('数据不完整!')
        }
      })
    },
    handleChange (file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw = file.raw
      this.logo_path = URL.createObjectURL(file.raw)
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
    cancelEdit () {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>>
  .el-dialog
    width 60%

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 30px 50px

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
