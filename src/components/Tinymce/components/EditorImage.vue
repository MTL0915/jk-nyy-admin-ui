<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >
      上传
    </el-button>
    <el-dialog
      :append-to-body='true'
      :modal-append-to-body='true'
      title='我的图片库'
      :visible.sync="dialogVisible"
    >
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="action"
        :headers="headers"
        list-type="picture-card"
        :on-preview='preview'
      >
        <el-button
          size="small"
          type="primary"
        >
          点击上传
        </el-button>
      </el-upload>
      <!-- <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button> -->
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { getToken } from '@/utils/auth'
import { getUserUpload, deleteUpload } from "@/api/bsUserUpload"

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      action: process.env.BASE_API + "/api/bs_user_upload/uploadAdd", //"https://httpbin.org/post"
      headers: {
        Authorization: 'Bearer ' + getToken(),
      }
    }
  },
  mounted () {
    this.getImageList();
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSuccess (response, file) {
      this.fileList = [];
      setTimeout(() => {
        this.getImageList();
      }, 1000)
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     this.listObj[objKeyArr[i]].url = response.files.file
      //     this.listObj[objKeyArr[i]].hasSuccess = true
      //     return
      //   }
      // }
    },
    handleRemove (file) {
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      deleteUpload({ id: file.id }).then((res) => {
        if (res.code == "200") {
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    preview (e) {
      this.$emit('successCBK', [e])
    },

    getImageList () {
      getUserUpload().then((res) => {

        this.fileList = res.data.content.map((e) => {
          e.url = this.getUrl(e.filePath)
          return e;
        });
      })
    },
    getUrl (info) {
      return process.env.STATIC_RESOURCE_PREFIX + info;
    },
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  //   ::v-deep .el-upload--picture-card {
  //     width: 100%;
  //   }
}
</style>
