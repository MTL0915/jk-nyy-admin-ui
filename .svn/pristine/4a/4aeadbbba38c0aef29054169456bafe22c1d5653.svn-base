<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      append-to-body
      title="编辑基地信息"
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
              label="基地名称"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="所在地区"
              prop="area_id"
            >
              <el-cascader
                :options="provenceArray"
                v-model="form.area_id"
                :props="props"
                @active-item-change="handleItemChange"
              />
              <el-input
                v-model="form.address"
                style="width:200px"
                placeholder="详细地址"
              />
              <el-row>
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
              </el-row>
            </el-form-item>
            <el-form-item label="基地编码">
              {{ form.code }}
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.linkman" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.mobile" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
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
                  :src="form.http_image_path"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="简介">
              <el-input
                v-model="form.summary"
                type="textarea"
                rows="5"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="toSave(form)"
              >保存</el-button>
              <el-button @click="toCancel()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getById, allOrgList, getProvence, getArea, getAreaArr } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'

export default {
  components: {
  },
  props: {
    form: {
      name: '',
      image_path: '',
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入基地名称', trigger: 'blur' }
        ]
      },
      formData: '',
      org: [],
      area: [],
      provenceArray: [],
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  // watch: {
  //   dialogVisible(val) {
  //     if (val) {
  //       this.getData()
  //     }
  //   }
  // },
  created () {
    this.getData()
  },
  methods: {
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      return false
    },
    getData (bs_base_id) {
      if (bs_base_id) {
        getById({ bs_base_id: bs_base_id }).then(res => {
          this.form = res.data
          this.form.http_image_path = process.env.IMG_URL + this.form.image_path
          this.form.image_path = this.getLogo(this.form.image_path)
          this.form.map_screenshot = this.getLogo(this.form.map_screenshot)
          if (this.form.bs_area_id) {
            getAreaArr({ bs_area_sub_id: this.form.bs_area_id }).then(res => {
              this.reSetareaid(res.data)
            })
          }
          this.getAllOrgData()
          this.getProvenceData()
        })
      }
    },
    getAllOrgData () {
      allOrgList().then(res => {
        if (res.code === 200) {
          this.org = res.data
        }
      })
    },
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
                  this.form.area_name
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
    handleMapChange (file, fl) {
      if (file) {
        this.form.map_screenshot = URL.createObjectURL(file.raw)
        this.formData.append('map_screenshot', file.file)
      }
    },
    handleImgChange (file, fl) {
      if (file) {
        this.form.image_path = URL.createObjectURL(file.raw)
        this.formData.append('image_path', file.file)
      }
    },
    uploadFileMap (file) {
      this.formData.append('map_screenshot', file.file)
    },
    uploadFileImg (file) {
      this.formData.append('image_path', file.file)
    },
    toSave (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formData = new FormData()
          this.$refs.uploadimg.submit()
          this.formData.append('bs_base_id', form.id)
          this.formData.append('name', form.name)
          this.formData.append('address', form.address)
          if (form.area_id) {
            this.formData.append('bs_area_id', form.area_id[2])
            this.provenceArray.map(v => {
              if (v.id === form.area_id[0]) {
                form.bs_area_name = v.name
                v.children.map(u => {
                  if (u.id === form.area_id[1]) {
                    form.bs_area_name = form.bs_area_name + u.name
                    u.children.map(t => {
                      if (t.id === form.area_id[2]) {
                        form.bs_area_name = form.bs_area_name + t.name
                      }
                    })
                  }
                })
              }
            })
            this.formData.append('bs_area_name', form.bs_area_name)
          }
          this.formData.append('bs_org_id', form.bs_org_id)
          this.formData.append('code', form.code)
          this.formData.append('email', form.email)
          if (!form.latitude) form.latitude = ''
          this.formData.append('latitude', form.latitude)
          this.formData.append('linkman', form.linkman)
          if (!form.longitude) form.longitude = ''
          this.formData.append('longitude', form.longitude)
          this.formData.append('mobile', form.mobile)
          this.formData.append('summary', form.summary)
          const config = {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + getToken() }
          }
          this.$axios.post(process.env.BASE_API + '/bs/bs_base/update', this.formData, config).then(res => {
            if (res.data.code === 200) {
              this.$message.success('提交成功！')
              this.$parent.formVisible = false
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
    toCancel () {
      this.dialogVisible = false
    },
    dragend (msg) {
      this.form.longitude = msg.lng
      this.form.latitude = msg.lat
    },
    getLogo (img) {
      if (img === null || img === '') {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },
    reSetareaid (arr) {
      this.handleItemChange(arr.slice(0, 1))
        .then((res) => {
          this.handleItemChange(arr.slice(0, 2))
            .then(() => {
              this.form.area_id = arr
            })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  margin 30px

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
