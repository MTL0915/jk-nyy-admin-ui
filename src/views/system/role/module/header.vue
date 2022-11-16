<template>
  <div class="head-container">
    <!-- 搜索 -->
    <!--<el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>-->
    <!-- 添加 -->
    <div
      v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']"
      style="display: inline-block;margin: 0px 2px;"
    >
      <el-button
        :disabled="sup_this.userLevel > 3"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >添加</el-button>
      <eForm
        ref="form"
        :is-add="true"
        :sup_this="sup_this"
      />
    </div>

  </div>
</template>

<script>
import eForm from './form'

// 查询条件
export default {
  components: { eForm },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      downloadLoading: false
    }
  },
  methods: {
    toQuery () {
      this.$parent.page = 0
      this.$parent.init()
    },
    add () {
      const _this = this.$refs.form
      _this.form.bs_org_id = this.sup_this.deptId
      _this.getBases(this.sup_this.deptId)
      _this.form.bs_base_id = this.sup_this.baseId
      _this.canEdit = true
      this.$refs.form.dialog = true
    }
  }
}
</script>
