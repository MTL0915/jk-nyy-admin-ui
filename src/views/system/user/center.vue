<template>
  <div>
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :md="8"
        :lg="6"
        :xl="5"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center">
              <!-- <el-upload
                :show-file-list="false"
                :on-success="handleSuccess"
                :on-error="handleError"
                :headers="headers"
                :action="updateAvatarApi"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader">
                <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload> -->

              <el-upload
                :show-file-list="false"
                :on-error="handleError"
                :on-change="handleChangeQr"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="' '"
              >
                <img
                  v-if="user.avatar"
                  :src="http_avatar_path"
                  title="点击上传头像"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </div>
            <ul class="user-info">
              <li>
                <svg-icon icon-class="user1" /> 用户名称 <div class="user-right">{{ user.name }}</div>
              </li>
              <li>
                <svg-icon icon-class="user1" /> 登录账号 <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ user.phone }}</div>
              </li>
              <li>
                <svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ user.email }}</div>
              </li>
              <li>
                <svg-icon icon-class="dept" /> 所属单位 <div class="user-right"> {{ user.orgName }}</div>
              </li>
              <li>
                <svg-icon icon-class="date" /> 创建日期 <div class="user-right">{{ parseTime(user.createTime) }}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="showUpdateInfo">修改基础信息</a>
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <!-- <a @click="$refs.name.dialog = true">修改名称</a> -->
                  <!-- <a @click="$refs.email.dialog = true">修改邮箱</a> -->
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="16"
        :lg="18"
        :xl="19"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>操作日志</span>
            <div
              style="display:inline-block;float: right;cursor: pointer"
              @click="refresh"
            ><i :class="ico" /></div>
          </div>
          <log ref="log" />
        </el-card>
      </el-col>
    </el-row>
    <updatePass
      ref="pass"
      :name="user.name"
    />
    <updateInfo
      ref="info"
      :user="user"
    />
    <!-- <updateEmail ref="email" :email="user.email"/>
    <updateName ref="name"/> -->
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { regEmail } from '@/utils/index'
import updatePass from './center/updatePass'
import updateInfo from './center/updateInfo'
// import updateEmail from './center/updateEmail'
// import updateName from './center/updateName'
import log from './center/log'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { parseTime } from '@/utils/index'
export default {
  name: 'Center',
  components: { updatePass, updateInfo, log },
  data () {
    return {
      ico: 'el-icon-refresh',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      http_avatar_path: ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'updateAvatarApi'
    ])
  },
  // created () {
  //   store.dispatch('GetInfo').then(() => { })
  //   this.http_avatar_path = this.getImgPath(this.user.avatar)
  // },
  methods: {
    handleChangeQr (file, fileList) {
      var formData = new FormData()
      formData.set('image_path', file.raw)
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/api/users/updateAvatar', formData, config).then(res => {
        if (res.data.code === 200) {
          this.http_avatar_path = URL.createObjectURL(file.raw)
          this.$message.success('头像上传成功')
        }
      })
    },
    showUpdateInfo () {
      this.$refs.info.dialog = true
      this.$refs.info.form.name = this.user.name
      this.$refs.info.form.email = this.user.email
    },
    // handleImgSuccess(res, file) {
    //   var formData = new FormData()
    //   formData.set('image_path', file.raw)
    //   const config = {
    //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
    //   }
    //   this.$axios.post(process.env.BASE_API + '/api/users/updateAvatar', formData, config).then(res => {
    //     if (res.data.code === 200) {
    //       this.http_avatar_path = URL.createObjectURL(file.raw)
    //       this.$message.success('头像上传成功')
    //     }
    //   })
    // },
    getImgPath (img) {
      if (img === null || img === '') {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return img
    },
    parseTime,
    formatEmail (mail) {
      return regEmail(mail)
    },
    // handleSuccess(response, file, fileList) {
    //   this.$notify({
    //     title: '头像修改成功',
    //     type: 'success',
    //     duration: 2500
    //   })
    //   store.dispatch('GetInfo').then(() => {})
    // },
    // 监听上传失败
    handleError (e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
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
    refresh () {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
.user-info {
  padding-left: 0px;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    border-top: 1px solid #f0f3f4;
    padding: 11px 0px;
    font-size: 13px;
  }
  .user-right {
    float: right;

    a {
      color: #317ef3;
    }
  }
}
.el-card__body {
  padding: 10px !important;
}
</style>
