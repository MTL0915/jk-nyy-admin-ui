<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="基地宣传图"
      append-to-body
      width="400px"
    >
      <div class="card">
        <div style="width:710px">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
          >
            <!-- 基地宣传图 -->
            <el-form-item label="">
              <el-upload
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-change="handleImgChange"
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
            <!-- 确认 & 取消 -->
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
  </div>
</template>

<script>
import AreaCode from '@/components/common/area'
import { mapGetters } from 'vuex'
import { getById, getProvence, getArea, getAreaArr } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    AreaCode,
    Treeselect,
    ...mapGetters([
      'id',
      'token'
    ])
  },
  data: function () {
    return {
      dialogVisible: false,
      formData: null,
      form: {
        id: '',
        bs_base_id: '',
        bs_org_id: '',
        bs_area_id: [],
        bs_area_name: '',
        name: '',
        code: '',
        kind: '',
        scale: '',
        headcount: '',
        linkman: '',
        mobile: '',
        email: '',
        longitude: '',
        latitude: '',
        address: '',
        geometry: '',
        summary: '',
        introduction: '',
        farm_size: '',
        grow_size: '',
        variety_num: '',
        image_path: '',
        map_screenshot: '',
        http_image_path: '',
        http_map_screenshot: ''
      },
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
  // 创建
  created () {
    this.getProvenceData()
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
      this.formData = new FormData()
    },
    getData (bs_base_id) {
      if (bs_base_id) {
        getById({ bs_base_id: bs_base_id }).then(res => {
          this.form = res.data
          this.form.http_image_path = this.getImgPath(this.form.image_path)
          this.form.http_map_screenshot = this.getImgPath(this.form.map_screenshot)
          if (this.form.bs_area_id) {
            getAreaArr({ bs_area_sub_id: this.form.bs_area_id }).then(res => {
              this.reSetareaid(res.data)
            })
          }
        })
      }
    },
    reSetareaid (arr) {
      this.handleItemChange(arr.slice(0, 1))
        .then((res) => {
          this.handleItemChange(arr.slice(0, 2))
            .then(() => {
              this.form.bs_area_id = arr
            })
        })
    },
    getImgPath (img) {
      if (img === null || img === '') {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },
    // 获取省级区域
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
    handleMapChange (file, fl) {
      // this.form.map_screenshot = URL.createObjectURL(file.raw)
      fl = fl.splice(0, fl.length - 1)
      this.formData.set('map_screenshot', file.raw)
    },
    handleImgChange (file, fl) {
      // this.form.image_path = URL.createObjectURL(file.raw)
      if (file) {
        fl = fl.splice(0, fl.length - 1)
        this.formData.set('image_path', file.raw)
        this.form.image_path = URL.createObjectURL(file.raw)
        this.form.http_image_path = URL.createObjectURL(file.raw)
      }

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
          form.bs_base_id = form.id
          var json = { ...this.form }

          for (var i in json) {
            if (json[i] && i !== 'bs_area_id') {
              this.formData.append(i, json[i])
            }
          }
          const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
          }

          this.$axios.post(process.env.BASE_API + '/bs/bs_base/update', this.formData, config).then(res => {
            if (res.data && res.data.code === 200) {
              this.$message.success('保存成功！')
            } else {
              this.$message.error(res.data.msg)
            }
            this.$parent.$parent.deptId = form.bs_org_id
            if (typeof (eval(this.$parent.$parent.init)) === 'function') {
              this.$parent.$parent.init()
            }
            if (typeof (eval(this.$parent.getData)) === 'function') {
              this.$parent.getData()
            }

            this.formData = new FormData()
          })

          this.redefine()
          this.dialogVisible = false
        } else {
          this.$message.warning('请输入基地名称')
          return false
        }
      })
    },
    dragend (msg) {
      this.form.longitude = msg.lng
      this.form.latitude = msg.lat
    },
    handleMapSuccess (res, file) {
      this.form.map_screenshot = URL.createObjectURL(file.raw)
      this.form.http_map_screenshot = URL.createObjectURL(file.raw)
    },
    handleImgSuccess (res, file) {
      this.form.image_path = URL.createObjectURL(file.raw)
      this.form.http_image_path = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      return false
      //return isLt2M
    },
    redefine () {
      this.form = {        id: '',
        bs_base_id: '',
        bs_org_id: '',
        bs_area_id: [],
        bs_area_name: '',
        name: '',
        code: '',
        kind: '',
        scale: '',
        headcount: '',
        linkman: '',
        mobile: '',
        email: '',
        longitude: '',
        latitude: '',
        address: '',
        geometry: '',
        summary: '',
        introduction: '',
        farm_size: '',
        grow_size: '',
        variety_num: '',
        image_path: '',
        map_screenshot: '',
        http_image_path: '',
        http_map_screenshot: ''      }
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
