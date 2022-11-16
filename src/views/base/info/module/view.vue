<template>
  <div>
    <div style="position: absolute; top: 32px;right: 50px">
      <el-button
        v-permission="['ADMIN','BASE_ALL','BASE_CREATE']"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="addBase"
        style="display:none"
      >创建新基地</el-button>
    </div>
    <div v-show="formVisible==false">
      <div style="height:105px;background: #FFFFFF;">
        <div
          style="float:left"
          title="点击上传图片"
        >
          <img
            v-if="form.image_path!=null && form.image_path!=''"
            :src="form.http_image_path"
            style="width:85px;height:85px;margin-top:10px;margin-left:5px;border-radius:50%"
            @click="updateBaseImage"
          >
          <div
            v-if="form.image_path==null || form.image_path==''"
            style="width:85px;height:85px;margin-top:10px;margin-left:5px;border:1px solid lightgrey;line-height: 85px;text-align: center;"
            @click="updateBaseImage"
          >
            点击上传图片
          </div>
        </div>
        <div style="float:left;margin-left:15px;margin-top:25px">
          <div style="font-weight: 700!important;margin-bottom:5px;font-size:18px">{{ form.name }}</div>
          <div style="color: #a3a4a6!important;margin-bottom:10px">code:{{ form.code }}</div>
          <div style="">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              title="编辑基地"
              @click="edit()"
              :disabled="!checkBasePermission(orgid || $store.state.baseinfo.cur_org_id,baseid || $store.state.baseinfo.cur_base_id)"
            />
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-map-location"
              circle
              title="基地地图"
              @click="baseMap"
            />
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-s-data"
              circle
              title="基地数据"
              @click="baseDataView"
            />
            <!-- <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              circle
              title="邀请用户加入基地"
              @click="invite"
            /> -->
          </div>
        </div>
        <div style="height: 100%;">
          <div style="display: flex;float:right;height:100%;text-align: center">
            <div style="border: 1px solid rgba(24,28,33,.06);height:100%;width:200px;padding:20px">
              <a
                href="javascript:void(0)"
                class="card-body d-block text-dark"
              >
                <div style="font-size:11px;color:rgba(24,28,33,.5);margin-bottom:5px">地块数量</div>
                <div style="font-size:30px;opacity: 0.7;">{{ resourcesNum.facilitiesCount }}</div>
              </a>
            </div>
            <div style="border: 1px solid rgba(24,28,33,.06);border-left:0px;height:100%;width:200px;padding:20px">
              <a
                href="javascript:void(0)"
                class="card-body d-block text-dark"
              >
                <div style="font-size:11px;color:rgba(24,28,33,.5);margin-bottom:5px">设备数量</div>
                <div style="font-size:30px;opacity: 0.7;">{{ resourcesNum.deviceCount }}</div>
              </a>
            </div>
            <div style="border: 1px solid rgba(24,28,33,.06);border-left:0px;height:100%;width:200px;padding:20px">
              <a
                href="javascript:void(0)"
                class="card-body d-block text-dark"
              >
                <div style="font-size:11px;color:rgba(24,28,33,.5);margin-bottom:5px">摄像头数量</div>
                <div style="font-size:30px;opacity: 0.7;">{{ resourcesNum.cameraCount }}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-tabs
        v-model="baseTab"
        @tab-click="TabChange"
        type="border-card"
      >
        <el-tab-pane
          label="基本信息"
          name="baseinfo"
          style="position: relative;min-height: 400px;"
        >
          <div style="width:40%;float:left">
            <div v-if="form.bs_org_type">
              <label
                class="el-form-item__label"
                style="width: 100px"
              >所属组织:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ form.bs_org_name }}</span></div>
            </div>
            <div>
              <label
                class="el-form-item__label"
                style="width: 100px"
              >所在地区:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ (form.bs_area_name==null || form.bs_area_name=="null")?"":form.bs_area_name }} {{ (form.address==null || form.address=="null")?"":form.address }}</span><span>（经度：{{ form.longitude }}&nbsp;&nbsp;纬度：{{ form.latitude }}）</span></div>
            </div>
            <div>
              <label
                class="el-form-item__label"
                style="width: 100px"
              >联系人:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ form.linkman }}</span></div>
            </div>
            <div>
              <label
                class="el-form-item__label"
                style="width: 100px"
              >联系电话:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ form.mobile }}</span></div>
            </div>
            <div>
              <label
                class="el-form-item__label"
                style="width: 100px"
              >邮箱:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ (form.email==null || form.email=="null")?"":form.email }}</span></div>
            </div>
            <div>
              <label
                class="el-form-item__label"
                style="width: 100px"
              >简介:</label>
              <div
                class="el-form-item__content"
                style="margin-left: 100px"
              ><span>{{ form.summary }}</span></div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT'])"
          label="成员信息"
          name="userinfo"
        >
          <baseUserIndex
            ref="baseUserIndex"
            :baseid="baseid"
            :orgid="orgid"
          />
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['ADMIN','ROLE_ALL','ROLE_EDIT'])"
          label="角色信息"
          name="roleinfo"
        >
          <baseRoleIndex
            ref="baseRoleIndex"
            :baseid="baseid"
            :orgid="orgid"
          />
        </el-tab-pane>
        <el-tab-pane
          v-if="checkPermission(['ADMIN','BASE_ALL','BASE_EDIT'])"
          label="个性化界面配置"
          name="customBase"
        >
          <customBase
            ref="customBase"
            :baseid="baseid"
            :orgid="orgid"
            :basecode="basecode"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <eForm ref="eForm" />
    <baseImage ref="baseImage" />
    <invite ref="invite" />
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import checkPermission from '@/utils/permission'
import { getById, getBaseResourcesCount } from '@/api/baseInfo'
import eForm from './form1'
import baseImage from './baseImage'
import baseUserIndex from './baseUserIndex'
import baseRoleIndex from './baseRoleIndex'
import bus from '@/components/common/bus.js'
import invite from '@/views/system/user/module/invite'
import mapBox from '../../../dashboard/admin/charts/map'
import customBase from '@/views/base/info/module/customBase'
import checkBasePermission from '@/utils/base_permission'
export default {
  components: {
    baseUserIndex, baseRoleIndex,
    eForm, baseImage, invite, mapBox, customBase
  },
  props: {
    baseid: {
      type: String,
      default: ''
    },
    orgid: {
      type: Number,
      default: null
    },
    basecode: {
      type: String,
      default: null
    }
  },
  // props: ['baseid'],
  data () {
    return {
      form: {
        id: null,
        code: null,
        name: null,
        http_image_path: null,
        bs_org_name: null,
        bs_area_name: null,
        linkman: null,
        mobile: null,
        email: null,
        summary: null
      },
      resourcesNum: {
        facilitiesCount: null,
        deviceCount: null,
        cameraCount: null
      },
      baseTab: 'baseinfo',
      formVisible: false
    }
  },
  watch: {
    baseid: function (newVal, oldVal, a) {

      this.getData()
    }
  },
  created () {

    this.getData()
  },

  methods: {
    checkBasePermission,
    TabChange () {
      if (this.baseTab === 'userinfo') {
        this.$refs.baseUserIndex.init()
      } else if (this.baseTab === 'roleinfo') {
        this.$refs.baseRoleIndex.init()
      } else if (this.baseTab === 'customBase') {
        this.$refs.customBase.customBaseList()
      }
    },
    invite () {
      this.$refs.invite.dialog = true
    },
    addBase () {
      this.$refs.eForm.showDialog()
    },
    getData (bs_base_id) {

      if (!bs_base_id) {
        bs_base_id = this.baseid || this.$store.state.baseinfo.cur_base_id
      }
      getById({ bs_base_id: bs_base_id }).then(res => {
        this.baseid = res.data.id
        this.orgid = res.data.bs_org_id
        this.basecode = res.data.code
        this.form = res.data
        this.form.http_image_path = process.env.IMG_URL + this.form.image_path
      })
      getBaseResourcesCount({ bs_base_id: bs_base_id }).then(res => {
        this.resourcesNum = res.data
      })
    },
    baseMap () {
      if (this.form.id) {
        window.open('/map3d?base_id=' + this.form.id);
      }
    },
    baseDataView () {
      this.$router.push({ path: '/dkInfo' })
    },
    updateBaseImage () {
      this.$refs.baseImage.showDialog()
      this.$refs.baseImage.getData(this.form.id)
    },
    editBaseMap () {
      this.$router.push({ path: '/mydevicedata/map', query: {} })
    },
    edit () {
      // this.$refs.eForm.dialogVisible = true
      this.$refs.eForm.showDialog()
      this.$refs.eForm.getData(this.form.id)
    }, checkPermission
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

.between
  justify-content space-between

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

.el-button--mini.is-circle
  padding 3px
</style>
