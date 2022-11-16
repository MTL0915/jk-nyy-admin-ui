<template>
  <div class="app-container">
    <div style="position: absolute;top: 34px;right: 33px;"><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a></div>

    <eHeader :query="query" :sup_this="sup_this" :agroProductClassification="agroProductClassification"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;" ref="multipleTable">
      <el-table-column
          type="selection"
          width="55"
          align="center"
        />
      <el-table-column prop="bs_pest_name" label="病虫害名称"/>
      <el-table-column prop="bs_pest_sname" label="别名"/>
      <el-table-column prop="agroProductCycleName" label="生长周期"/>
      <el-table-column prop="bs_pest_summary" label="病虫害概述"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          
          <el-button size="mini" type="primary" icon="el-icon-document" @click="showPestDetail(scope.row.bs_pest_id)" >查看</el-button>

          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del,batchDel } from '@/api/agroProductPest'
import { getImage } from '@/utils/image_util'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  props:{
    
  },
  mounted (){
    var agroProductClassification = this.$route.query.agroProductClassification;
    this.agroProductClassification = agroProductClassification;
  },
  data() {
    return {
      delLoading: false,
      sup_this: this,
      agroProductClassification:""
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    getImage:getImage,
    checkPermission,
    showPestDetail(bs_pest_id){
       this.$router.push({ path: '/pestDetail', query: { id: bs_pest_id, breadcrumb: 'hide' } })
    },
    beforeInit() {
      this.url = 'api/agroProductPest'
      const sort = 'id,asc'

      this.params = { page: this.page,agroProductClassification:this.agroProductClassification,size: this.size, sort: sort }

      if (this.query.name){
        this.params.keyword = this.query.name;
      }else{
        this.params.keyword = '';
      }

      if (this.query.agroProductCycle){
        this.params.agroProductCycle = this.query.agroProductCycle;
      }else{
        this.params.agroProductCycle = '';
      }

      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
    
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    batchDelete(){
      var selection = this.$refs.multipleTable.selection;
      if (selection.length == 0){
        this.$message.error("请选择删除的关联病虫害!");
        return;
      }
      this.$confirm('确定删除选中的信息吗', '警告', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
      var ids = [];
      for (let i = 0,len = selection.length; i < len; i++) {
        ids.push(selection[i].id);
       }
       batchDel(ids).then(res => {
         this.init();
       });

     }).catch(() => {
     })

    }
  }
}
</script>

<style scoped>

</style>
