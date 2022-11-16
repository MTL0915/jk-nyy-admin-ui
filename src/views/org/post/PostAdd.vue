<template>
  <div>
    <el-dialog
      :title=" title + ' 岗位'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item
          :label-width="'120px'"
          label="所在组织："
        >
          <el-input v-model="curOrgName" readonly=""/>
        </el-form-item>

        <el-form-item
          :label-width="'120px'"
          label="岗位名称："
          prop="name"
        >
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="岗位编码："
        >
          <el-input v-model="form.code"/>
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="显示顺序："
        >
          <el-input v-model="form.ord" type="number"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addPost"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addPost, editPost } from '@/api/orgPost'
import { mapGetters } from 'vuex'
export default {
  name: 'PostAdd',
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    types: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['curOrgId', 'curOrgName']),
    title() { // 显示title
      if (this.types === 'add') {
        return '添加'
      }
      return '编辑'
    }
  },
  methods: {
    handelAdd() {
      this.dialogFormVisible = true
    },
    addPost() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.bs_org_id = this.curOrgId
          if (this.types === 'add') {
            addPost(this.form)
              .then(res => {
                this.$refs.form.resetFields()
                // 通知父类更新列表
                this.$emit('updateList')
                this.dialogFormVisible = false
              })
          } else {
            editPost(this.form)
              .then(res => {
                this.$refs.form.resetFields()
                // 通知父类更新列表
                this.$emit('updateList')
                this.dialogFormVisible = false
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
