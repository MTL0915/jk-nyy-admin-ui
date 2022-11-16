<template>
  <div style="">
    <!-- 新增 -->
    <div style="display: flex;justify-content: space-between;background: #ffffff;">
      <div style="margin: 5px;">
        <el-button
          v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_CREATE']"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >新增</el-button>
      </div>
      <div style="margin: 5px;">
        <el-input
          style="width:200px;"
          size="mini"
          v-model="keyword"
        />
        <el-button
          size="mini"
          type="success"
          @click="search"
        >搜索</el-button>
      </div>
    </div>
    <eForm
      ref="form"
      :is-add="true"
    />
  </div>
</template>

<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      keyword: null,
    }
  },
  methods: {
    add () {
      // 显示新增模板
      this.$refs.form.dialog = true
    },
    search () {
      this.query.keyword = this.keyword
      this.$parent.init()
    },
  }
}
</script>
