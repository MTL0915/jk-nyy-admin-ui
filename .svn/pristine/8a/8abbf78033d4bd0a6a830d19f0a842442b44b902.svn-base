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
      <el-form-item label="组织">
        <treeselect
          :disabled="sup_this.userLevel > 2 || form.id"
          v-model="form.bs_org_id"
          :options="orgs"
          placeholder="选择组织"
          @input="deptChange"
        />
      </el-form-item>

      <el-form-item label="基地：">
        <el-select
          :disabled="sup_this.userLevel > 2 || form.id"
          v-model="form.bs_base_id"
          style="width:100%;"
          placeholder="请先选择组织"
        >

          <el-option
            v-for="item in bases"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

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
import { treeBase } from '@/api/org'
import { getDepts } from '@/api/dept'
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
    }
  },
  data () {
    return {
      loading: false, dialog: false, orgs: [], bases: [], canEdit: true,
      form: {
        name: '',
        remark: '',
        bs_org_id: null,
        bs_base_id: null
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDepts()
  },
  methods: {
    deptChange () {
      this.getBases(this.form.bs_org_id)
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      if (this.form.bs_org_id === null) {
        this.$message({
          message: '组织不能为空',
          type: 'warning'
        })
      } else if (this.form.bs_base_id === null) {
        this.$message({
          message: '基地不能为空',
          type: 'warning'
        })
      } else {
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
      }
    },
    doAdd () {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit () {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', remark: '', bs_org_id: null, bs_base_id: null }
    },
    getDepts () {
      getDepts({ enabled: true }).then(res => {
        this.orgs = res.data.content
      })
    },
    getBases (org_id) {
      this.bases = []
      this.form.bs_base_id = null
      treeBase({ org_id: org_id }).then(res => {
        this.bases = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
}
</style>
