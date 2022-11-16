<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      title="添加基地信息"
      fullscreen
    >
      <div class="card">
        <div style="width:710px">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="100px"
          >
            <el-form-item
              label="所属组织"
              prop="bs_org_id"
            >
              <treeselect
                v-model="form.bs_org_id"
                :options="depts"
                style="width: 370px;"
                placeholder="选择组织"
              />
            </el-form-item>
            <area-code
              ref="myarea"
              :area_code="form.area_id"
            />
            <div class="flex">
              <el-form-item
                label="详细地址"
                prop="address"
              >
                <el-input
                  v-model="form.address"
                  style="width:200px"
                  placeholder="详细地址"
                />
                <span>（经度：</span>
                <el-input
                  v-model="form.longitude"
                  class="ll-input"
                />
                <span>纬度：</span>
                <el-input
                  v-model="form.latitude"
                  class="ll-input"
                />
                <span>）</span>
                <el-button
                  type="primary"
                  @click="$refs.map.dialogMapVisible = true"
                >定位</el-button>
              </el-form-item>
            </div>
            <el-form-item
              label="基地名称"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="基地编号"
              prop="code"
            >
              <el-input v-model="form.code" />
            </el-form-item>
            <el-form-item
              label="联系人"
              prop="linkman"
            >
              <el-input v-model="form.linkman" />
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="mobile"
            >
              <el-input v-model="form.mobile" />
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="地图截图">
              <!-- <div class="avatar-uploader">
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
            </div> -->
              <el-upload
                ref="uploadmap"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleMapChange"
                :http-request="uploadFileMap"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="' '"
                accept=".jpg,.jpeg,.png,.gif,.bmp"
              >
                <img
                  v-if="form.map_screenshot"
                  :src="form.map_screenshot"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="基地宣传图">
              <el-upload
                ref="uploadimg"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleImgChange"
                :http-request="uploadFileImg"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="' '"
                accept=".jpg,.jpeg,.png,.gif,.bmp"
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
            <el-form-item
              label="简介"
              prop="summary"
            >
              <el-input
                v-model="form.summary"
                type="textarea"
                rows="5"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit(form)"
              >提交</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <info-map
      ref="map"
      @dragend="dragend"
    />
  </div>
</template>

<script>
import InfoMap from './Map'
import AreaCode from '@/components/common/area'
import { mapGetters } from 'vuex'
import { getProvence, getArea } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'
import { getDepts } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    InfoMap,
    AreaCode,
    Treeselect
  },
  data: function () {
    return {
      dialogVisible: false,
      form: {
        bs_org_id: '',
        area_id: [],
        address: '',
        longitude: '',
        latitude: '',
        name: '',
        code: '',
        linkman: '',
        mobile: '',
        email: '',
        summary: '',
        map_screenshot: '',
        image_path: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入基地名称', trigger: 'blur' }
        ]
      },
      formData: '',
      depts: [],
      area: [],
      provenceArray: [],
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  watch: {
    dialogVisible (val, oldval) {
      if (val) {
        getDepts().then(res => {

          this.depts = res.data.content
        })
      }
    }
  },
  created () {
    this.getProvenceData()
  },
  activated: function () {
    // this.$refs.form.resetFields()
    this.form.longitude = ''
    this.form.latitude = ''
    this.form.map_screenshot = ''
    this.form.path_image = ''
  },
  methods: {
    getProvenceData () {
      getProvence().then(res => {
        if (res.code === 200) {
          this.provenceArray = res.data
          this.provenceArray.forEach((item, index) => {
            this.$set(this.provenceArray[index], 'children', [])
          })
        }
      })
    },
    handleItemChange (val) {
      const length = val.length
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
    },
    beforeAvatarUpload (file) {
      return false
    },
    handleMapChange (file, fl) {
      this.form.map_screenshot = URL.createObjectURL(file.raw)
    },
    handleImgChange (file, fl) {
      this.form.image_path = URL.createObjectURL(file.raw)
    },
    uploadFileMap (file) {
      this.formData.append('map_screenshot', file.file)
    },
    uploadFileImg (file) {
      this.formData.append('image_path', file.file)
    },
    onSubmit (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formData = new FormData()
          this.$refs.uploadmap.submit()
          this.$refs.uploadimg.submit()
          this.formData.append('name', form.name)
          this.formData.append('address', form.address)
          const areaId = this.$refs.myarea.getAreaid()
          this.formData.append('bs_area_id', areaId)
          this.formData.append('bs_org_id', form.bs_org_id)
          console.log(this.id)
          this.formData.append('bs_user_id', this.id)
          this.formData.append('code', form.code)
          this.formData.append('email', form.email)
          this.formData.append('latitude', form.latitude)
          this.formData.append('linkman', form.linkman)
          this.formData.append('longitude', form.longitude)
          this.formData.append('mobile', form.mobile)
          this.formData.append('summary', form.summary)
          const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
          }
          this.$axios.post(process.env.BASE_API + '/bs/bs_base/save', this.formData, config).then(res => {
            if (res.data.code === 200) {
              this.$message.success('提交成功！')
              this.$emit('upDateInfoList', form.bs_org_id)
              this.dialogVisible = false
              this.$parent.$parent.init()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.warning('请输入基地名称')
          return false
        }
      })
    },
    dragend (msg) {
      this.form.longitude = msg.lng
      this.form.latitude = msg.lat
    }
  }
}
</script>

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
