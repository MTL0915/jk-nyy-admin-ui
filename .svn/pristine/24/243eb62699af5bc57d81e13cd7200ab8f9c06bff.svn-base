<template>
  <div
    class="body"
    :style="{backgroundColor:'#eeeeee',width:'100%',height:'100%'}"
  >
    <div style="line-height:40px;height:40px">
      <a href="/function/qrcode?id=319">
        <i
          class="el-icon-arrow-left"
          style="font-size:25px"
        ></i>
        <span style="font-size:16px;vertical-align:top;height:30px;line-height:30px">返回</span>
      </a>
    </div>
    <div style="height: 60px;line-height: 60px;text-align: center;font-size: 18px;">
      <p>设置</p>
    </div>
    <div style="text-align:center">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-upload
          class="avatar-uploader"
          action="''"
          ref="qr_file_ref"
          :show-file-list="false"
          :on-change="handleChangeQr"
          :before-upload="beforeAvatarUpload"
          name="qr_file"
        >
          <img
            v-if="form.qr_url"
            :src="form.qr_url"
            class="avatar"
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
          <div>
            <el-button
              type="primary"
              style="width:100px;margin-top:10px;"
            >上传二维码</el-button>
          </div>
        </el-upload>
        <div style="margin-top:10px;margin-bottom:10px">
          <el-input
            v-model="params.title"
            placeholder="群名称"
            style="width:60%"
          ></el-input>
        </div>
        <div>
          <div style="float:left;width:50%">
            <el-upload
              class="avatar-uploader2"
              action="''"
              ref="icon_file_ref"
              :show-file-list="false"
              :on-change="handleChangeIcon"
              :before-upload="beforeAvatarUpload"
              name="icon_file"
            >
              <img
                v-if="form.icon_url"
                :src="form.icon_url"
                class="avatar"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <div>
                <el-button
                  type="primary"
                  style="width:100px;margin-top:10px;"
                >上传小图标</el-button>
              </div>
            </el-upload>
          </div>
          <div style="float:left;width:50%">
            <el-upload
              class="avatar-uploader2"
              action="''"
              :show-file-list="false"
              :on-change="handleChangeBack"
              :before-upload="beforeAvatarUpload"
              name="background_image_file"
            >
              <img
                v-if="form.background_image"
                :src="form.background_image"
                class="avatar"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <div>
                <el-button
                  type="primary"
                  style="width:100px;margin-top:10px;"
                >上传背景图</el-button>
              </div>
            </el-upload>
          </div>
          <div style="clear:both"></div>
          <div style="margin-top:20px">
            <el-button
              type="success"
              style="width:120px;margin-top:10px;"
              @click="save"
            >保存</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import default_icon_url from '@/assets/open/qrcode/u4.svg'
import default_qr_url from '@/assets/open/qrcode/qrcodeblank.png'

import { add, getById } from './qrcode'

export default {
  data () {
    return {
      form: {
        background_image: '',
        icon_url: '',
        qr_url: ''
      },
      params: {
        id: '',
        passkey: '',
        icon_file: null,
        qr_file: null,
        background_image_file: null,
        title: ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      var id = this.$route.query.id;
      this.params.id = id;

      this.params.passkey = localStorage.getItem('passkey')

      getById(id).then(res => {
        if (res.code === 200) {
          var data = res.data
          if (data.background_image) {
            this.form.background_image = data.background_image
          }

          if (data.title) {
            this.form.title = data.title
          }

          if (data.icon_url) {
            this.form.icon_url = data.icon_url
          }

          if (data.qr_url) {
            this.form.qr_url = data.qr_url
          }
        }
      })
    })
  },
  methods: {
    uploadQr () { },
    handleChangeIcon (file, fileList) {
      if (file.raw) {
        this.form.icon_url = URL.createObjectURL(file.raw)
        this.params.icon_file = file.raw
      }
    },
    save () {
      add(this.params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    handleChangeQr (file, fileList) {
      if (file.raw) {
        this.form.qr_url = URL.createObjectURL(file.raw)
        this.params.qr_file = file.raw
      }
    },
    handleChangeBack (file, fileList) {
      if (file.raw) {
        this.form.background_image = URL.createObjectURL(file.raw)
        this.params.background_image_file = file.raw
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      return false
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .avatar-uploader-icon {
  border: 2px solid #fff;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader2 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader2 .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader2 .avatar-uploader-icon {
  border: 2px solid #fff;
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar-uploader2 .avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>