<template>
  <div class="head-container">
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;float:left">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add()">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
    <div style="text-align:right;margin-right:10px">
      <el-input
        v-model="name"
        placeholder="名称"
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
    sup_this: {
      type: Object,
      required: true
    },
    agroProductClassification:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      name:'',
    }
  },
  methods: {
    add(){
      this.$refs.form.dialog = true;
      this.$refs.form.form.agroProductClassification = this.agroProductClassification
    },
    search() {
      this.sup_this.query && (this.sup_this.query.name = this.name);
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
