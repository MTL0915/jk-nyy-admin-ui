<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="form.id ? '编辑基地信息':'添加基地信息'"
      :modal-append-to-body="false"
      append-to-body
      width="1000px"
      @close="closeDialog"
    >
      <!-- <div class="card"> -->
      <div>
        <div style="width:710px">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="100px"
          >
            <!-- 所属组织 -->
            <el-form-item
              v-show="!form.id"
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
            <!-- 基地名称 -->
            <el-form-item
              label="基地名称"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <!-- 所在地区 -->
            <el-form-item
              label="所在地区"
              prop="bs_area_id"
            >
              <el-cascader
                :options="provenceArray"
                v-model="form.bs_area_id"
                :props="props"
                @active-item-change="handleItemChange"
              />
            </el-form-item>
            <!-- 详细地址 -->
            <div class="flex">
              <el-form-item
                label="详细地址"
                prop="address"
              >
                <el-input
                  v-model="form.address"
                  style="width:200px"
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
                  @click="mapLocation()"
                >定位</el-button>
              </el-form-item>
            </div>
            <!-- 基地编号 -->
            <el-form-item
              v-if="form.id"
              label="基地编号"
              prop="code"
            >
              <span>{{ form.code }}</span>
            </el-form-item>
            <!-- 联系人 -->
            <el-form-item
              label="联系人"
              prop="linkman"
            >
              <el-input v-model="form.linkman" />
            </el-form-item>
            <!-- 联系电话 -->
            <el-form-item
              label="联系电话"
              prop="mobile"
            >
              <el-input v-model="form.mobile" />
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="form.email" />
            </el-form-item>
            <!-- 地图截图 -->
            <!-- :auto-upload="false" -->
            <!-- :http-request="uploadFileMap" -->
            <!-- <el-form-item label="地图截图">
              <el-upload
                :show-file-list="false"
                :on-success="handleMapSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleMapChange"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/">
                <img v-if="form.map_screenshot" :src="form.http_map_screenshot" class="avatar" >
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>-->
            <!-- 基地宣传图 -->
            <el-form-item label="基地宣传图">
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
            <!-- 简介 -->
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

    <el-dialog
      v-if="dialogMapVisible"
      :visible.sync="dialogMapVisible"
      append-to-body
      title="地图标注"
      width="80%"
    >
      <info-map
        :lng="form.longitude"
        :lat="form.latitude"
        @updatePosition="updatePosition"
      />
    </el-dialog>
  </div>
</template>

<script>
import InfoMap from './Map'
import AreaCode from '@/components/common/area'
import { mapGetters } from 'vuex'
import { getById, getProvence, getArea, getAreaArr } from '@/api/baseInfo'
import { getToken } from '@/utils/auth'
import { getDepts } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import bus from '@/components/common/bus.js'

export default {
  components: {
    InfoMap,
    AreaCode,
    Treeselect,
    ...mapGetters(['id', 'token'])
  },
  data: function () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        // callback(new Error('请输入电话号码'))
        callback()
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialogMapVisible: false,//地图弹窗
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
      rules: {
        name: [{ required: true, message: '请输入基地名称', trigger: 'blur' }],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [{ trigger: 'blur', validator: validPhone }]
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
    ...mapGetters(['id'])
  },
  // 监听
  watch: {
    dialogVisible (val, oldval) {
      if (val) {
        getDepts().then(res => {
          this.depts = res.data.content
        })
      }
    }
  },
  // 创建
  created () {
    this.getProvenceData()
  },
  // 激活
  activated: function () {
    // this.$refs.form.resetFields()
    this.form.longitude = ''
    this.form.latitude = ''
    this.form.map_screenshot = ''
    this.form.path_image = ''
  },
  methods: {
    //点击定位按钮
    mapLocation () {
      this.dialogMapVisible = true
    },
    showDialog () {
      if (this.form.bs_org_id === '') {
        this.form.bs_org_id = this.$store.state.baseinfo.cur_org_id
      }
      this.dialogVisible = true
      this.formData = new FormData()
    },
    getData (bs_base_id) {
      if (bs_base_id) {
        getById({ bs_base_id: bs_base_id }).then(res => {
          this.form = res.data
          this.form.http_image_path = this.getImgPath(this.form.image_path)
          this.form.http_map_screenshot = this.getImgPath(
            this.form.map_screenshot
          )
          if (this.form.bs_area_id) {
            getAreaArr({ bs_area_sub_id: this.form.bs_area_id }).then(res => {

              this.reSetareaid(res.data)
            })
          }
        })
      }
    },
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    reSetareaid (arr) {
      this.form.bs_area_id = arr
      if (arr) {
        if (arr.length >= 1) {
          //二级
          getArea({ bs_area_parent_id: arr[0] }).then(res1 => {
            for (let i = 0; i < this.provenceArray.length; i++) {
              if (this.provenceArray[i].id === arr[0]) {
                this.$set(this.provenceArray[i], 'children', res1.data)
                //三级
                if (arr.length >= 2) {
                  getArea({ bs_area_parent_id: arr[1] }).then(res2 => {
                    for (let j = 0; j < this.provenceArray[i].children.length; j++) {
                      if (this.provenceArray[i].children[j].id === arr[1]) {
                        this.$set(this.provenceArray[i].children[j], 'children', res2.data)
                        break
                      }
                    }
                  })
                }
                break
              }
            }
          })
        }
      }
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
                this.$set(
                  this.provenceArray[index].children[i],
                  'children',
                  area
                )
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
    closeDialog () {
      this.form.image_path = null
      this.form.http_image_path = null
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
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!form.bs_org_id) {
            this.$message.error('请选择基地所属组织')
            return false
          }
          if (form.bs_area_id && form.bs_area_id.length !== 0) {
            this.provenceArray.map(v => {
              if (v.id === form.bs_area_id[0]) {
                form.bs_area_name = v.name
                v.children.map(u => {
                  if (u.id === form.bs_area_id[1]) {
                    form.bs_area_name = form.bs_area_name + u.name
                    u.children.map(t => {
                      if (t.id === form.bs_area_id[2]) {
                        form.bs_area_name = form.bs_area_name + t.name
                      }
                    })
                  }
                })
              }
            })
          } else {
            this.$message.error('请填写基地所在区域')
            return
          }
          // this.formData.append('bs_base_id', form.id)
          // this.formData.append('name', form.name)
          // this.formData.append('address', form.address)
          // this.formData.append('bs_area_id', form.bs_area_id)
          // this.formData.append('bs_area_name', form.bs_area_name)
          // this.formData.append('bs_org_id', form.bs_org_id)
          // this.formData.append('bs_user_id', this.id)
          // this.formData.append('code', form.code)
          // this.formData.append('email', form.email)
          // this.formData.append('linkman', form.linkman)
          // if (form.latitude) { this.formData.append('latitude', form.latitude) }
          // if (form.longitude) { this.formData.append('longitude', form.longitude) }
          // this.formData.append('mobile', form.mobile)
          // this.formData.append('summary', form.summary)
          // this.formData.append('bs_area_name', form.bs_area_name)

          form.bs_base_id = form.id
          var json = { ...this.form }

          for (var i in json) {
            if (json[i]) {
              this.formData.append(i, json[i])
            }
          }

          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getToken()
            }
          }
          if (form.id) {
            // 修改
            this.$axios
              .post(
                process.env.BASE_API + '/bs/bs_base/update',
                this.formData,
                config
              )
              .then(res => {
                if (res.data && res.data.code === 200) {
                  this.$message.success('修改成功！')
                  bus.$emit('getBaseList')
                } else {
                  this.$message.error(res.data.msg)
                }
                this.$parent.$parent.deptId = form.bs_org_id
                if (typeof eval(this.$parent.$parent.init) === 'function') {
                  this.$parent.$parent.init()
                }
                if (typeof eval(this.$parent.getData) === 'function') {
                  this.$parent.getData()
                }

                this.formData = new FormData()
              })
          } else {

            // 添加
            this.$axios
              .post(
                process.env.BASE_API + '/bs/bs_base/save',
                this.formData,
                config
              )
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success('添加成功！')
                  bus.$emit('getBaseList')
                  // this.$emit('upDateInfoList', form.bs_org_id)
                } else {
                  this.$message.error(res.data.msg)
                }
                this.$parent.$parent.deptId = form.bs_org_id
                this.$parent.$parent.init()
                this.formData = new FormData()
              })
          }
          this.redefine()
          this.dialogVisible = false
        }
      })
    },
    updatePosition (position) {
      this.form.longitude = position.lng
      this.form.latitude = position.lat
      this.dialogMapVisible = false
    },
    // handleMapSuccess (res, file) {
    //   this.form.map_screenshot = URL.createObjectURL(file.raw)
    //   this.form.http_map_screenshot = URL.createObjectURL(file.raw)
    // },
    // handleImgSuccess (res, file) {
    //   this.form.image_path = URL.createObjectURL(file.raw)
    //   this.form.http_image_path = URL.createObjectURL(file.raw)
    // },
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
      this.form = {
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
      }
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
