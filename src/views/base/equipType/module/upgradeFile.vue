<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog"
      title="版本升级文件管理"
      width="1000px"
    >

      <el-button icon="el-icon-upload" type="success" @click="showUpload">上传</el-button>

      <el-table
        :data="datas"
        style="width: 100%;margin-top:10px"
        border
        class="table">

        <el-table-column label="软件程序版本" width="180" prop="version" align="center"/>
        <el-table-column :formatter="formatInsertTime" prop="insert_time" label="上传时间" width="180" align="center"/>
        <el-table-column label="文件大小（KB）" align="center" width="180" prop="size"/>

        <el-table-column label="注释" prop="description" align="center">
          <template slot-scope="scope">
            <div style="max-height:100px;overflow:auto;width:100%">{{ scope.row.description }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="confirmDel(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="showUpdateUpload(scope.row)">更新</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-dialog
      :visible.sync="uploadDialog"
      :append-to-body="true"
      title="上传版本升级文件"
      width="1000px"
      @close="hideUpload()"
    >
      <el-form ref="uploadForm" :model="uploadFormData" :rules="rules" :inline="true" label-width="130px">
        <el-row>
          <el-form-item label="软件程序版本" prop="version">
            V&nbsp;<el-input-number v-model="uploadFormData.version" :readonly="versionreadonly" :min="1" :max="10" :precision="1" :step="0.1" size="small" controls-position="right" style="width:120px"/>
          </el-form-item>
          <el-form-item label="升级文件" prop="file">
            <input ref="uploadFile" type="file" name="file">
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="注释" prop="description">
            <el-input
              v-model="uploadFormData.description"
              :rows="6"
              resize="none"
              style="width:330px;"
              maxlength="1000"
              type="textarea"
              show-word-limit
              placeholder="注释"/>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmUploadForm()">上 传</el-button>
        <el-button @click="hideUpload()">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>
import { queryByHd_hardware_version_id, del, add } from '@/api/hd_device_upgrade_file'
import { formatDate } from '@/utils/date'
export default {
  data() {
    return {
      dialog: false,
      uploadDialog: false,
      versionreadonly: false,
      hd_hardware_version_id: '',
      datas: [],
      uploadFormData: {
        version: '',
        hd_hardware_version_id: '',
        description: ''
      },
      rules: {
        version: [{ required: true, message: '请输入固件版本号', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  methods: {
    show(obj) {
      this.hd_hardware_version_id = obj.id
      this.uploadFormData.hd_hardware_version_id = obj.id
      this.dialog = true

      this.getData()
    },
    getData() {
      queryByHd_hardware_version_id(this.hd_hardware_version_id).then(res => {
        this.datas = res.data
      })
    },
    formatInsertTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm')
    },
    confirmUploadForm() {
      var form = this.uploadFormData
      form.file = this.$refs['uploadFile'].files[0]
      if (!form.file) {
        this.$message.error('请选择程序升级文件')
        return
      }

      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          add(form).then(res => {
            if (res.code === 200) {
              this.$message.success('添加成功')
              if (this.fileRaw) {
                this.fileRaw = null
              }
              this.hideUpload()
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    hideUpload() {
      this.uploadDialog = false
      this.dialog = true
    },
    showUpload() {
      this.dialog = false
      this.uploadDialog = true
      this.versionreadonly = false
      this.uploadFormData.description = ''
      this.uploadFormData.version = '1.0'
      this.$refs['uploadFile'] && (this.$refs['uploadFile'].value = null)
    },
    showUpdateUpload(obj) {
      this.dialog = false
      this.uploadDialog = true
      this.versionreadonly = true
      var version = obj.version
      if (version && version.startsWith('V')) {
        version = version.substring(1, version.length)
      }

      this.uploadFormData.version = version
      this.uploadFormData.description = obj.description
      this.$refs['uploadFile'] && (this.$refs['uploadFile'].value = null)
    },
    confirmDel(idx, item) {
      this.$confirm('您确定删除该升级程序文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        del(item.id).then(res => {
          if (res.code === 200) {
            this.datas.splice(this.idx, 1)
            this.$message.success('删除成功!')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }

  }
}
</script>

<style scoped>
 .el-dialog__wrapper >>> .el-dialog__body{
    padding-top: 5px;
  }
</style>
