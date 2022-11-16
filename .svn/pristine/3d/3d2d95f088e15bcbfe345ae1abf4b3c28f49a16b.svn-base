<template>
  <div>
    <el-button
      :disabled="!(sup_this.userLevel===1 || sup_this.userLevel===2 || (sup_this.userLevel===3 && this.data.level>3))"
      size="mini"
      type="primary"
      icon="el-icon-edit"
      @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './baseRoleForm'
import { get } from '@/api/role'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      get(this.data.id).then(res => {
        const _this = this.$refs.form
        // 初始化基础信息
        _this.form = { id: this.data.id, name: this.data.name, remark: this.data.remark, level: this.data.level, bs_org: { id: null }, bs_base: { id: null }}
        // 系统角色不可编辑组织基地，其角色跟随组织基地的创建删除
        if (this.data.level !== 1 && this.data.level !== 2 && this.data.level !== 3) {
        	_this.canEdit = true
        } else {
        	_this.canEdit = false
        }
        _this.dialog = true
      })
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
