<template>
  <div>
    <el-dialog
      :append-to-body="true"
      title="快速创建"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <el-steps
        :active="step"
        finish-status="success"
      >
        <el-step title="创建/选择 组织" />
        <el-step title="创建基地" />
        <el-step title="创建地块" />
        <el-step title="创建/邀请 用户" />
      </el-steps>
      <!-- 创建/选择 组织 -->
      <div v-show="step===0">
        <div style="text-align: center;margin: 30px;">
          <template>
            <el-radio
              v-model="orgSelect"
              label="create"
            >创建新组织</el-radio>
            <el-radio
              v-model="orgSelect"
              label="select"
            >选择已有组织</el-radio>
          </template>
        </div>
        <el-form
          style="width: 50%;margin: auto;"
          :model="orgForm"
          size="small"
          label-width="80px"
        >
          <el-form-item
            style="margin-bottom: 15px;"
            :label="orgSelect==='create'?'上级组织':'选择组织'"
          >
            <treeselect
              @input="deptChange"
              v-model="orgForm.pid"
              :options="depts"
              style="width: 370px;"
              placeholder="选择组织"
            />
          </el-form-item>
          <el-form-item
            v-if="orgForm.pid !== 0"
            label="剩余内存"
          >
            {{orgForm.nc}}
          </el-form-item>
          <el-form-item
            v-if="orgForm.pid !== 0"
            label="分配内存"
          >
            <div style="width:400px;display: flex;">
              <el-slider
                style="width:300px;"
                :disabled="orgForm.memory_max===0"
                :max="orgForm.memory_max"
                v-model="orgForm.memory"
                :show-tooltip="false"
                @input="memoryChange"
              />{{'　'+orgForm.memory_nc}}
            </div>
          </el-form-item>
          <el-form-item
            v-if="orgSelect==='create'"
            label="组织名称"
            prop="name"
          >
            <el-input
              clearable
              v-model="orgForm.name"
              style="width: 370px;"
            />
          </el-form-item>
        </el-form>
      </div>
      <!-- 创建基地 -->
      <div v-show="step===1">
        <el-form
          style="margin-top: 30px;"
          ref="baseForm"
          :model="baseForm"
          label-width="100px"
        >
          <el-row style="display: flex;padding:5px;">
            <el-col>
              <!-- 基地名称 -->
              <el-form-item
                label="基地名称"
                prop="name"
              >
                <el-input
                  clearable
                  style="width:200px"
                  v-model="baseForm.name"
                />
              </el-form-item>
            </el-col>
            <el-col>
              <!-- 所在地区 -->
              <el-form-item
                label="所在地区"
                prop="bs_area_id"
              >
                <el-cascader
                  style="width:200px"
                  :options="provenceArray"
                  v-model="baseForm.bs_area_id"
                  :props="props"
                  @active-item-change="handleItemChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display: flex;padding:5px;">
            <el-col>
              <!-- 联系人 -->
              <el-form-item
                label="联系人"
                prop="linkman"
              >
                <el-input
                  clearable
                  style="width:200px"
                  v-model="baseForm.linkman"
                />
              </el-form-item>
            </el-col>
            <el-col>
              <!-- 联系电话 -->
              <el-form-item
                label="联系电话"
                prop="mobile"
              >
                <el-input
                  clearable
                  style="width:200px"
                  v-model="baseForm.mobile"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 详细地址 -->
          <el-row style="display: flex;padding:5px;">
            <el-form-item
              label="详细地址"
              prop="address"
            >
              <el-input
                clearable
                v-model="baseForm.address"
                style="width:200px"
              />
              <span>（经度：</span>
              <el-input
                clearable
                v-model="baseForm.longitude"
                class="ll-input"
              />
              <span>纬度：</span>
              <el-input
                clearable
                v-model="baseForm.latitude"
                class="ll-input"
              />
              <span>）</span>
              <el-button
                type="primary"
                @click="mapLocation()"
              >定位</el-button>
            </el-form-item>
          </el-row>
          <!-- 邮箱 -->
          <!-- <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              style="width:200px"
              v-model="baseForm.email"
            />
          </el-form-item> -->
          <!-- 基地宣传图 -->
          <el-form-item label="基地宣传图">
            <el-upload
              :show-file-list="false"
              :on-success="handleImgSuccess"
              :before-upload="beforeAvatarUpload"
              :on-change="handleImgChange"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
            >
              <img
                v-if="baseForm.image_path"
                :src="baseForm.http_image_path"
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
              clearable
              v-model="baseForm.summary"
              type="textarea"
              rows="5"
            />
          </el-form-item>
        </el-form>
        <!-- 定位地图 -->
        <el-dialog
          v-if="c"
          :visible.sync="dialogMapVisible"
          append-to-body
          title="地图标注"
          width="80%"
        >
          <info-map
            :lng="baseForm.longitude"
            :lat="baseForm.latitude"
          />
        </el-dialog>
      </div>
      <!-- 创建地块 -->
      <div v-show="step===2">
        <el-form
          style="margin-top: 30px;"
          :model="landForm"
          size="small"
          label-width="80px"
        >
          <el-form-item
            label="地块名称"
            prop="name"
          >
            <el-input
              clearable
              v-model="landForm.name"
              style="width: 370px;"
            />
          </el-form-item>
          <el-form-item label="地块类别">
            <el-radio-group v-model="landForm.rs_facilities_type_id">
              <el-radio-button
                v-for="item in landTypeList"
                :label="item.id"
                :key="item.id"
              >{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 创建/邀请用户 -->
      <div
        v-show="step===3"
        style=" text-align: center;margin-top: 30px;"
      >
        <el-button
          type="primary"
          plain
          @click="createUser"
        >创建用户</el-button>
        <el-button
          type="warning"
          plain
          @click="inviteUser"
        >邀请用户</el-button>
        <userForm
          ref="userForm"
          :dicts="dicts"
          :is-add="true"
        />
        <inviteUser
          v-if="bs_base_id"
          ref="inviteUser"
          :to_base_id="bs_base_id"
        />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="step===3"
          size="small"
          type="primary"
          @click="over"
        >完成</el-button>
        <el-button
          v-if=" step!==0 && !(step===1 && orgSelect==='create') && step!==2 && step!==3 "
          type="info"
          plain
          icon="el-icon-arrow-left"
          size="small"
          @click="last"
        >上一步</el-button>
        <el-button
          :loading="nextLoading"
          v-if="step!==3"
          type="primary"
          size="small"
          @click="next"
        >下一步<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { add as addOrg, getDepts, checkOrgAdmin } from '@/api/dept'
import { baseList, getProvence, getArea } from '@/api/baseInfo'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getToken } from '@/utils/auth'
import { getList as getLandType } from '@/api/rs_facilities_type'
import { add as addLand } from '@/api/rs_facilities'
import initDict from '@/mixins/initDict'
import InfoMap from '@/views/base/info/module/Map'
import bus from '@/components/common/bus.js'
import inviteUser from '@/views/system/user/module/invite'
import userForm from '@/views/system/user/module/form'
import { setUserBecomeAdmin } from '@/api/user'

export default {
  components: {
    InfoMap,
    Treeselect,
    userForm,
    inviteUser
  },
  mixins: [initDict],
  props: {

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
      step: 0,//步骤数
      dialogVisible: false,
      nextLoading: false,
      //--- 组织
      depts: [],
      orgSelect: 'create',
      orgForm: {
        name: '',
        pid: null,
        enabled: true,
        nc: '0',
        memory: 0,
        memory_max: 0,
        memory_nc: ''
      },
      bs_org_id: '',//创建或选择的组织ID 以用作后续的创建基地
      //--- 基地
      // baseRules: {
      //   name: [{ required: true, message: '请输入基地名称', trigger: 'blur' }],
      //   email: [
      //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      //   ],
      //   mobile: [{ trigger: 'blur', validator: validPhone }]
      // },
      props: {
        label: 'name',
        value: 'id'
      },
      formData: null,
      baseForm: {
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
      provenceArray: [],
      landTypeList: [],
      bs_base_id: '',//创建基地的ID 以用作后续的创建地块
      //--- 地块
      landTypeList: [],
      landForm: {
        name: '',
        rs_facilities_type_id: ''
      }
    }
  },

  created () {
    getDepts({ enabled: true, excludeImplement: true }).then(res => {
      this.$set(this, 'depts', res.data.content)
    })
    getLandType({ size: 999 }).then(res => {
      this.landTypeList = res.data.content
    })
    //加载字典
    this.getDict('user_status')
    //获取省级区域
    this.getProvenceData()
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
    memoryChange () {
      this.orgForm.memory_nc = this.conver(this.orgForm.memory)
    },
    //内存转换
    conver (limit) {
      var size = "";
      if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else { //其他转化成GB  
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {//当小数点后为00时 去掉小数部分  
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    deptChange () {
      getDepts({ ids: this.orgForm.pid }).then(res => {
        if (res.code === 200) {
          let c = res.data.content[0].config_json
          if (c) {
            let config_json = JSON.parse(c)
            this.orgForm.nc = this.conver(config_json.memoryConfig.freeMemory)
            this.orgForm.memory_max = config_json.memoryConfig.freeMemory
            if (this.orgForm.memory_max > 10737418240) { this.orgForm.memory_max = 10737418240 }
            if (orgForm.pid === 1) {
              if (config_json.memoryConfig.freeMemory >= 1073741824) {//剩余内存大于1G
                this.orgForm.memory = 1073741824
              } else {//剩余内存不足1G
                this.orgForm.memory = config_json.memoryConfig.freeMemory
              }
            } else {
              if (config_json.memoryConfig.freeMemory >= 104857600) {//剩余内存大于100M
                this.orgForm.memory = 104857600
              } else {//剩余内存不足100M
                this.orgForm.memory = config_json.memoryConfig.freeMemory
              }
            }
            this.orgForm.memory_nc = this.conver(this.orgForm.memory)
            this.$forceUpdate()
          }
        }
      })
    },
    over () {
      this.dialogVisible = false
      this.step = 0
      this.bs_org_id = ''
      this.bs_base_id = ''
      bus.$emit('getBaseList')
    },
    createUser () {
      checkOrgAdmin({
        bs_org_id: this.bs_org_id
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.$refs.userForm.loading = false
            this.$refs.userForm.form.dept = this.bs_org_id
            this.$refs.userForm.getBaseRole(this.bs_org_id)
            this.$refs.userForm.dialog = true
          } else {
            this.$alert('该组织仍未存在组织管理员,请及时创建', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$refs.userForm.loading = false
                this.$refs.userForm.form.dept = this.bs_org_id
                this.$refs.userForm.getBaseRole(this.bs_org_id)
                this.$refs.userForm.dialog = true
              }
            });
          }
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    inviteUser () {
      this.$refs.inviteUser.dialog = true
    },
    //关闭弹窗
    closeDialog () {
      this.dialogVisible = false
    },
    //上一步
    last () {
      this.step--
    },
    //下一步
    next () {
      //----- 创建/选择 组织 ----------
      if (this.step === 0) {
        this.nextLoading = true//防止重复点击
        if (this.orgSelect === 'create') {
          if (!this.orgForm.name) {
            this.$message.error('组织名称不能为空')
            this.nextLoading = false
            return
          }
          if (!this.orgForm.pid) {
            this.$message.error('父组织不能为空')
            this.nextLoading = false
            return
          }
          addOrg(this.orgForm).then(res => {
            this.nextLoading = false
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.bs_org_id = res.data
              this.step++//创建成功，进入下一步
              this.formData = new FormData()
            } else {
              this.$message.error(res.msg)
              return
            }
          })
        } else if (this.orgSelect === 'select') {
          this.nextLoading = false
          if (!this.orgForm.pid) {
            this.$message.error('请选择组织')
            this.nextLoading = false
            return
          }
          if (this.orgForm.pid === 1) {
            this.$message.error('不能在系统下直接创建基地')
            this.nextLoading = false
            return
          }
          this.bs_org_id = this.orgForm.pid
          this.step++//选择成功，进入下一步
          this.formData = new FormData()
        } else {
          this.$message.error('选择组织类型错误!')
          this.nextLoading = false
          return
        }
      }
      //----- 创建基地 ----------
      else if (this.step === 1) {
        if (!this.baseForm.name) {
          this.$message.error('基地名称不能为空')
          return
        }
        this.nextLoading = true
        if (this.baseForm.bs_area_id && this.baseForm.bs_area_id.length !== 0) {
          const form = this.baseForm
          form.bs_area_name = ''
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
          this.nextLoading = false
          return
        }
        this.baseForm.bs_org_id = this.bs_org_id
        var json = { ...this.baseForm }
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
        this.$axios.post(process.env.BASE_API + '/bs/bs_base/save', this.formData, config).then(res => {
          this.nextLoading = false
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.$set(this, 'bs_base_id', res.data.data)
            //this.bs_base_id = res.data.data
            this.step++//创建成功，进入下一步
          } else {
            this.$message.error(res.data.msg)
            return
          }
        })
      }
      //----- 创建地块 ----------
      else if (this.step === 2) {
        this.nextLoading = true
        if (!this.landForm.name) {
          this.landForm.name = '默认地块'
          this.$message.warning('没检测到名字,自动创建默认地块')
        }
        addLand({
          name: this.landForm.name,
          bs_base_id: this.bs_base_id,
          rs_facilities_type_id: this.landForm.rs_facilities_type_id
        }).then(res => {
          this.nextLoading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.step++
          } else {
            this.$message.error(res.msg)
            return
          }
        })
      }
    },
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    handleImgChange (file, fl) {
      // this.form.image_path = URL.createObjectURL(file.raw)
      fl = fl.splice(0, fl.length - 1)
      this.formData.set('image_path', file.raw)
    },
    handleImgSuccess (res, file) {
      this.baseForm.image_path = URL.createObjectURL(file.raw)
      this.baseForm.http_image_path = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    updatePosition (position) {
      this.baseForm.longitude = position.lng
      this.baseForm.latitude = position.lat
      this.dialogMapVisible = false
    },
    // 获取省级区域
    async getProvenceData () {
      await getProvence().then(res => {
        if (res.code === 200) {
          this.provenceArray = res.data
          this.provenceArray.forEach((item, index) => {
            this.$set(this.provenceArray[index], 'children', [])
          })
        }
      })
    },
    //选择区域
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
