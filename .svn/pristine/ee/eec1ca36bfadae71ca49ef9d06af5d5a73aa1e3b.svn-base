<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormAdd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      title="添加设备"
    >
      <el-form
        id="loading-div"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row
          v-show="deviceInfoFormShow"
          :gutter="40"
        >
          <el-col :span="12">
            <el-form-item
              label="设备序列号："
              prop="device_id"
            >
              <el-input v-model="form.device_id" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="设备验证码："
              prop="verification_code"
            >
              <el-input v-model="form.verification_code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-show="facilitiesFormShow"
          :gutter="40"
        >
          <el-col :span="24">
            <el-form-item
              v-show="selectFacilitiesItem"
              label="请选择地块："
              label-width="150px"
              prop="rs_facilities_id"
            >
              <el-select
                v-model="form.rs_facilities_id"
                clearable
                placeholder="请选择地块"
                style="width:350px"
              >
                <el-option
                  v-for="item in facilitieList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.name }}</span>
                </el-option>
              </el-select>
              <el-button
                v-show="isShowSelectNewfacilities"
                type="primary"
                style="margin-left:10px"
                @click="showAddFacilitiesInput"
              >添加</el-button>
            </el-form-item>
            <el-form-item
              v-show="addFacilitiesItem"
              prop="new_rs_facilities_name"
              label="请输入添加地块名称："
              label-width="180px"
            >
              <el-input
                v-model="form.new_rs_facilities_name"
                placeholder="请输入添加地块名称"
                style="width:350px"
              />
              <el-button
                type="primary"
                style="margin-left:10px"
                @click="addFacilities"
              >确定</el-button>
              <el-button
                type="primary"
                style="margin-left:10px"
                @click="cancelAddFacilities"
              >上一步</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-show="netDeviceFormShow"
          :gutter="40"
        >
          <el-col :span="24">
            <el-form-item
              label="请选择网关设备："
              label-width="150px"
              prop="hd_device_parent_id"
            >
              <el-cascader
                v-model="facilitieDevice"
                :options="netDeviceOptions"
                style="width:350px"
                @change="facilitieDeviceChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="hide">取 消</el-button>
        <el-button
          v-show="nextButtonShow"
          type="primary"
          @click="next"
        >下一步</el-button>
        <el-button
          v-show="saveButtonShow"
          type="primary"
          @click="save"
        >确 定</el-button>
      </div>
    </el-dialog>
    <loading ref="loading" />
  </div>
</template>

<script>
import { addDevice, addSubDevice, checkDeviceValidity, getNetDevicesByBs_base_id, getDetailById } from '@/api/equip'
import { findByBs_base_id } from '@/api/rs_facilities'
import loading from '@/components/loading'
import { isNetDevice, isSubNetDevice,isOtherDevice } from '@/utils/device_util'
import { bindDevice } from '@/utils/websocket_util'
import { add } from '@/api/rs_facilities'
import { mapGetters } from 'vuex'

// 默认回调函数
var fndefine = new Function()

export default {
  name: 'EquipAdd',
  components: { loading },
  props: {
    fn: {
      type: Function,
      default: fndefine
    },

    back: {
      type: Function,
      default: fndefine
    }
  },
  data () {
    return {
      dialogFormAdd: false,
      bs_base_id: '',
      form: {
        device_id: '',
        verification_code: 'A12345',
        rs_facilities_id: '',
        hd_device_parent_id: '',
        new_rs_facilities_name: ''
      },

      facilitieDevice: [],
      netDeviceOptions: [],
      facilitieList: [],

      deviceInfoFormShow: true,
      facilitiesFormShow: false,
      netDeviceFormShow: false,
      nextButtonShow: true,
      saveButtonShow: false,
      hd_device_parent_idRequired: false,
      rs_facilities_idRequired: false,

      rules: {
        device_id: [{ required: true, message: '请输入设备序列号', trigger: 'blur' }],
        verification_code: [{ required: true, message: '请输入设备验证码', trigger: 'blur' }],
        hd_device_parent_id: [{ required: false, message: '请选择网关类设备', trigger: 'blur' }],
        rs_facilities_id: [{ required: false, message: '请选择地块', trigger: 'blur' }],
        new_rs_facilities_name: [{ required: false, message: '请输入添加地块名称', trigger: 'blur' }]
      },

      selectFacilitiesItem: true,
      addFacilitiesItem: false,
      new_rs_facilities_name: '',

      // 是否显示添加地块
      isShowSelectNewfacilities: true

    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created () {

  },
  methods: {
    show (param) {
      var baseId = param.baseId
      var facilitiesId = param.facilitiesId
      var fnCall = param.fnCall
      var backCall = param.backCall
      var baseId = param.baseId
      var facilitiesId = param.facilitiesId
      var fnCall = param.fnCall
      var backCall = param.backCall
      this.fnCall = fnCall || new Function()
      this.backCall = backCall || new Function()
      this.handelAdd(baseId, facilitiesId)
      this.dialogFormAdd = true
    },
    success (param) {
      this.fnCall(param)
      this.fnCall = fndefine
      this.fn(param)
      this.dialogFormAdd = false
    },
    hide () {
      this.dialogFormAdd = false
      this.backCall = fndefine
    },
    clear () {
      this.backCall()
      this.backCall = fndefine
      this.back()
    },
    // 添加地块
    addFacilities () {
      this.rules.new_rs_facilities_name[0].required = true
      this.$refs.form.validateField('new_rs_facilities_name', (a, errorList, c) => {
        this.rules.new_rs_facilities_name[0].required = false
        if (errorList) {
          return
        }
        add({
          name: this.form.new_rs_facilities_name,
          create_user_id: this.user.id,
          bs_base_id: this.bs_base_id
        }).then(res => {
          if (res.code === 200) {
            this.form.rs_facilities_id = res.data
            this.facilitieList.push({
              id: res.data,
              name: this.form.new_rs_facilities_name
            })
            this.cancelAddFacilities()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    showAddFacilitiesInput () {
      this.selectFacilitiesItem = false
      this.addFacilitiesItem = true
      this.new_rs_facilities_name = ''
    },
    cancelAddFacilities () {
      this.selectFacilitiesItem = true
      this.addFacilitiesItem = false
      this.new_rs_facilities_name = ''
    },
    handelAdd (bs_base_id, rs_facilities_id) {
      this.bs_base_id = bs_base_id
      this.form.rs_facilities_id = rs_facilities_id
      this.dialogFormAdd = true
      this.showDeviceInfoForm()
    },
    showDeviceInfoForm () {
      this.deviceInfoFormShow = true
      this.facilitiesFormShow = false
      this.netDeviceFormShow = false
      this.nextButtonShow = true
      this.saveButtonShow = false
    },
    showFacilitiesForm () {
      this.deviceInfoFormShow = false
      this.facilitiesFormShow = true
      this.netDeviceFormShow = false
      this.nextButtonShow = false
      this.saveButtonShow = true
    },
    showNetDeviceForm () {
      this.deviceInfoFormShow = false
      this.facilitiesFormShow = false
      this.netDeviceFormShow = true
      this.nextButtonShow = false
      this.saveButtonShow = true
    },
    next () {
      var device_id = this.form.device_id
      var validateResult = false
      this.rules.hd_device_parent_id[0].required = false
      this.rules.rs_facilities_id[0].required = false
      this.$refs.form.validate(result => {
        validateResult = result
      })
      if (!validateResult) {
        return false
      }
      this.form.bs_base_id = this.$store.state.baseinfo.cur_base_id
      checkDeviceValidity(this.form).then(res => {
        if (res.code === 200) {
          if (isNetDevice(device_id)) {
            this.showFacilitiesForm()
            findByBs_base_id({
              'bs_base_id': this.$store.state.baseinfo.cur_base_id
            }).then(res => {
              if (res.data) {
                this.facilitieList = res.data
              }
            })
          } else if (isSubNetDevice(device_id)) {
            this.showNetDeviceForm()
            getNetDevicesByBs_base_id({ 'bs_base_id': this.bs_base_id }).then(res => {
              var deviceList = res.data
              this.netDeviceOptions = this.getNetDeviceOptions(deviceList)
            })
          } else {
            this.showFacilitiesForm()
            findByBs_base_id({
              'bs_base_id': this.$store.state.baseinfo.cur_base_id
            }).then(res => {
              if (res.data) {
                this.facilitieList = res.data
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    facilitieDeviceChange (param) {
      this.form.hd_device_parent_id = param[1]
    },
    getNetDeviceOptions (deviceList) {
      var netDeviceOptions = []
      for (var i = 0, len = deviceList.length; i < len; i++) {
        var deviceInfo = deviceList[i]
        var rs_facilities_id = deviceInfo.rs_facilities_id
        var rs_facilities_name = deviceInfo.rs_facilities_name
        var device_id = deviceInfo.device_id
        var id = deviceInfo.id
        var name = deviceInfo.name
        var option = null
        for (var j = 0, len2 = netDeviceOptions.length; j < len2; j++) {
          if (rs_facilities_id === netDeviceOptions[j].value) {
            option = netDeviceOptions[j]
            break
          }
        }
        if (option === null) {
          option = {
            label: rs_facilities_name,
            value: rs_facilities_id,
            children: []
          }
          netDeviceOptions.push(option)
        }
        option.children.push({
          label: name + '(' + device_id + ')',
          value: id
        })
      }
      return netDeviceOptions
    },
    save () {
      var device_id = this.form.device_id
      var validateResult = false
      
      if (isNetDevice(device_id) || isOtherDevice(device_id)) {
        this.rules.hd_device_parent_id[0].required = false
        this.rules.rs_facilities_id[0].required = true
        validateResult = false
        this.$refs.form.validate((result) => {
          validateResult = result
        })
        if (validateResult) {
          addDevice(this.form).then(res => {
            if (res.code === 200) {
              this.hide()
              var hd_device_id = res.data
              getDetailById({ hd_device_id: hd_device_id }).then(res => {
                if (res.data.hd_device_type_code === 'JK-SX') {
                  this.$message.success('添加成功')
                  this.$router.push('/mycamera')
                  return
                }
                this.$refs.loading.loading_dialog_text = '正在绑定设备，请等待！'
                this.$refs.loading.openLoadInstance()
                bindDevice(hd_device_id, this.$ws).then(res => {
                  this.$message.success(res.msg)
                  this.$refs.loading.closeLoadInstance()
                  this.$emit('refreshList')
                  this.success({ code: 200, data: { form: this.form, hd_device_id }, mes: res.msg, res: res })
                }).catch(res => {
                  this.$message.error(res.msg)
                  this.$refs.loading.closeLoadInstance()
                  this.$emit('refreshList')
                  this.success({ code: 500, data: { form: this.form, hd_device_id }, mes: res.msg, res: res })
                })
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      } else if (isSubNetDevice(device_id)) {
        this.rules.hd_device_parent_id[0].required = true
        this.rules.rs_facilities_id[0].required = false
        validateResult = false
        this.$refs.form.validate((result) => {
          validateResult = result
        })
        if (validateResult) {
          addSubDevice(this.form).then(res => {
            if (res.code === 200) {
              this.hide()
              var hd_device_id = ''
              if ((typeof res.data) === 'string') {
                hd_device_id = res.data
              } else {//摄像头返回Map
                hd_device_id = res.data.hd_device_id
              }
              res.data
              this.$refs.loading.loading_dialog_text = '正在绑定设备，请等待！'
              this.$refs.loading.openLoadInstance()
              bindDevice(hd_device_id, this.$ws).then(res => {
                this.$message.success(res.msg)
                this.$refs.loading.closeLoadInstance()
                this.$emit('refreshList')
                this.success({ code: 500, data: { form: this.form, hd_device_id }, mes: res.msg, res: res })
              }).catch(res => {
                this.$message.error(res.msg)
                this.$refs.loading.closeLoadInstance()
                this.$emit('refreshList')
                this.success({ code: 500, data: { form: this.form, hd_device_id }, mes: res.msg, res: res })
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }else { // 网关设备

      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// dialog
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
