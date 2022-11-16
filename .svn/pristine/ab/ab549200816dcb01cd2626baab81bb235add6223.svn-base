<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="迁移基地"
    append-to-body
    width="25%"
    @close="cancel"
  >
    <el-form
      ref="form"
      :inline="false"
      :model="form"
      size="small"
      label-width="90px"
    >
      <el-form-item label="所属组织">
        <treeselect
          v-model="form.dept"
          :options="depts"
          placeholder="选择变更组织"
        />
      </el-form-item>
    </el-form>
    <div style="text-align: right;">
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getDepts } from '@/api/dept'
import { transferBase } from '@/api/baseInfo'

export default {
  components: { Treeselect },
  data () {
    return {
      dialogVisible: false,
      depts: [],
      form: {
        dept: null,
        base: ''
      }
    }
  },
  created () {
    getDepts({ enabled: true }).then(res => {
      this.depts = res.data.content
    })
  },
  methods: {
    cancel () {
      this.form.dept = null
      this.form.base = ''
      this.dialogVisible = false
    },
    showDialog (bs_org_id, bs_base_id) {
      this.form.dept = bs_org_id
      this.form.base = bs_base_id
      this.dialogVisible = true
    },
    doSubmit () {
      transferBase({
        bs_org_id: this.form.dept,
        bs_base_id: this.form.base
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.form.dept = null
          this.$parent.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>>