<template>
  <div>
    <!-- :disabled="!checkClick()" -->
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
      :dicts="dicts"
      :data="data"
    />
  </div>
</template>
<script>
import eForm from './form'
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
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkClick () {
      //:disabled="!(sup_this.user.orgCode==='jk-000' || sup_this.userLevel===1 || (sup_this.userLevel===2 && sup_this.user.orgId !== data.id))"
      if (this.sup_this.userLevel === 1) {
        return true
      } else if (this.sup_this.user.orgCode === 'jk-000') {
        if (this.data.code === 'jk' || this.data.code === 'jk-000') {
          return false
        } else {
          return true
        }
      } else if (this.sup_this.userLevel === 2 && this.sup_this.user.orgId !== this.data.id) {
        return true
      }
      return false
    },
    to () {
      const _this = this.$refs.form
      if (this.data._level === 1) {
        _this.canEdit = false
      } else {
        _this.canEdit = true
      }
      _this.getDepts()
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        pid: this.data.pid,
        createTime: this.data.createTime,
        enabled: this.data.enabled.toString(),
        config_json: this.data.config_json
      }
      if (this.data.config_json) {
        let json = JSON.parse(this.data.config_json)
        _this.zUsedMemory = json.memoryConfig.usedMemory || 0
        _this.zTotalMemory = json.memoryConfig.totalMemory || 0
        _this.zOldTotalMemory = json.memoryConfig.totalMemory || 0
        _this.distributableMemory = json.memoryConfig.totalMemory || 0
        _this.zFreeMemory = json.memoryConfig.freeMemory || 0
        _this.zOldFreeMemory = json.memoryConfig.freeMemory || 0
        let overwrite = true
        if (json.memoryConfig.overwrite !== null && json.memoryConfig.overwrite !== undefined) {
          overwrite = json.memoryConfig.overwrite
        }
        _this.overwrite = overwrite
      }
      _this.deptChange()
      _this.dialog = true
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
