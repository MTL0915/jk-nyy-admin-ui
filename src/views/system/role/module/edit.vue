<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      @click="to"
    />
    <eForm
      ref="form"
      :sup_this="sup_this"
      :is-add="false"
    />
  </div>
</template>
<script>
import eForm from './form'
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
    to () {
      get(this.data.id).then(res => {
        const _this = this.$refs.form
        //初始化基础信息
        _this.getBases(res.data.bs_org.id)
        _this.form = { id: res.data.id, name: res.data.name, remark: res.data.remark, level: res.data.level, bs_org_id: res.data.bs_org.id, bs_base_id: res.data.bs_base ? res.data.bs_base.id : null }
        //系统角色不可编辑组织基地，其角色跟随组织基地的创建删除
        if (res.data.level !== 1 && res.data.level !== 2 && res.data.level !== 3) {
          _this.canEdit = true
        } else {
          _this.canEdit = false
        }
        //初始化所属组织基地
        _this.dialog = true
      })



      //_this.deptIds = []
      //_this.form = { id: this.data.id, name: this.data.name, remark: this.data.remark, depts: this.data.depts, dataScope: this.data.dataScope, level: this.data.level }
      /*if (_this.form.dataScope === '自定义') {
        _this.getDepts()
      }*/
      /*for (let i = 0; i < _this.form.depts.length; i++) {
        _this.deptIds[i] = _this.form.depts[i].id
      }*/

    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
