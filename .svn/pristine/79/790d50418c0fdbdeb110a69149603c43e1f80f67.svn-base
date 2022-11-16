<template>
  <div class="head-container">
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;float:left">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="showAddForm()">新增</el-button>
      <eForm ref="form" :is-add="true"/>  
    </div>
    <div style="text-align:right;margin-right:10px">
      <el-input
        v-model="keyword"
        placeholder="内容"
        class="handle-input ml10"
      />
      <el-button
        type="success"
        icon="el-icon-search"
        size="mini"
        @click="search"
      >搜索</el-button>
    </div>
  </div>
</template>

<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    params: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      keyword:""
    }
  },
  methods: {
    showAddForm(){
      this.$refs.form.dialog = true;
    },
    search() {
      this.sup_this.query && (this.sup_this.query.keyword = this.keyword);
      this.sup_this.page = 0
      this.sup_this.init()
    }
  }
}
</script>
<style lang="stylus" scoped>
  
.handle-input
  width 150px
  display inline-block

.ml10
  margin-right 10px

</style>
