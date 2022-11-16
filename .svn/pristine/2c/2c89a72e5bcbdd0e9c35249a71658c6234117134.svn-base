<template>
  <el-dialog
    :visible.sync="dialog"
    :title="isAdd ? '添加角色' : '编辑角色'"
    append-to-body
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item
        label="角色名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input
          v-model="form.remark"
          style="width: 370px;"
          rows="5"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="cancel"
      >取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="doSubmit"
      >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/role'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    baseid: {
      type: String,
      default: ''
    },
    orgid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      loading: false, dialog: false, orgs: [], bases: [], canEdit: true,
      form: {
        name: '',
        remark: '',
        level: 999,
        bs_base_id: this.baseid !== '' ? this.baseid : this.$store.state.baseinfo.cur_base_id,
        bs_org_id: this.orgid !== null ? this.orgid : this.$store.state.baseinfo.cur_org_id
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  methods: {
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd () {
      add(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 2500
          })
          this.resetForm()
          this.$parent.$parent.init()
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    doEdit () {
      edit(this.form).then(res => {
        if (res.code === 200) {
          this.resetForm()
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 2500
          })
          this.sup_this.init()
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form.name = ''
      this.form.remark = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
}
</style>
