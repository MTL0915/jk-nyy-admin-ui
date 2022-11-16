<template>
  <div class="app-container">
    <div style="position: absolute;top: 34px;right: 33px;"><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a></div>

    <eHeader :query="query" :sup_this="sup_this" :agroProductClassification="agroProductClassification"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column
          type="selection"
          width="55"
          align="center"
        />
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column align="center" label="缩略图">
        <template slot-scope="scope">
          <img :src="getImage(scope.row.imagePath)" min-width="60" height="60" >
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','AGROPRODUCTBREED_ALL','AGROPRODUCTBREED_EDIT','AGROPRODUCTBREED_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','AGROPRODUCTBREED_ALL','AGROPRODUCTBREED_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','AGROPRODUCTBREED_ALL','AGROPRODUCTBREED_DELETE']"
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
import { del } from '@/api/agroProductBreed'
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
    beforeInit() {
      this.url = 'api/agroProductBreed'
      const sort = 'id,desc'
      if (this.query.name){
        this.params = { page: this.page,agroProductClassification:this.agroProductClassification,name:this.query.name,size: this.size, sort: sort }
      }else{
        this.params = { page: this.page,agroProductClassification:this.agroProductClassification,size: this.size, sort: sort }
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
