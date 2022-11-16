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
      <eForm ref="form" :is-add="true" :sup_this="sup_this"/>

      <el-button
        class="filter-item"
        size="mini"
        type="danger"
        icon="el-icon-minus"
        @click="batchDelete()">批量删除</el-button>

    </div>
    <div style="text-align:right;margin-right:10px">
      <el-select v-model="agroProductCycle" placeholder="生长周期" :collapse-tags="true" style="width:180px" :clearable="true">
        <el-option
          v-for="item in agroProductCycleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

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
import { find as findAgroProductCycle } from '@/api/agroProductCycle'
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
  created(){
    this.$nextTick(() => {
      var params = {page: 0,agroProductClassification:this.agroProductClassification,size: 1000, sort: 'ord,asc'};
      findAgroProductCycle(params).then(res => {
          this.agroProductCycleList = res.data.content;
      });

    });
  },
  data() {
    return {
      name:'',
      agroProductCycle:'',
      agroProductCycleList:[]
    }
  },
  methods: {
    add(){
      this.$refs.form.showDialog(this.agroProductClassification);
    },
    batchDelete(){
      this.sup_this.batchDelete();
    },
    search() {
      if (this.sup_this.query){
        this.sup_this.query.name = this.name
        this.sup_this.query.agroProductCycle = this.agroProductCycle
      }
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
