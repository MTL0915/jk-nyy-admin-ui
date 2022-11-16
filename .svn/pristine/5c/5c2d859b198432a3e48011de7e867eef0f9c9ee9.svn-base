<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称" >
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="描述" >
        <el-input v-model="form.description" type="textarea" style="width: 370px;" rows="3"/>
      </el-form-item>
      <el-form-item label="缩略图" >
        <UploadImage :form="form" fileRawName="imageFile" imagePathName="imagePath" size="160px" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit,addOrEdit } from '@/api/agroProductBreed'
import UploadImage from '@/views/components/UploadImage'
export default {
  components:{UploadImage},
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, 
      dialog: false,
      form: {
        id: '',
        agroProductClassification: '',
        name: '',
        description: '',
        imagePath: '',
        imageFile:''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      if (!this.form.name){
        this.$message.error("名称不能为空!");
        return;
      }
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      addOrEdit(this.form).then(res => {
        if (res.code == 200){
          this.resetForm()
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.$parent.$parent.init()
        }else{
          this.loading = false
          this.$message.error(res.msg);  
        }
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      addOrEdit(this.form).then(res => {
        if (res.code == 200){
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.loading = false
          this.sup_this.init()
        }else{
          this.loading = false
          this.$message.error(res.msg);  
        }

      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      var agroProductClassification = this.form.agroProductClassification;
      this.form = {
        id: '',
        agroProductClassification: agroProductClassification,
        name: '',
        description: '',
        imagePath: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
