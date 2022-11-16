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
      <el-table-column align="center" prop="name" label="名称"/>
      <el-table-column align="center" prop="day" label="生长周期(天)"/>
      <el-table-column align="center" label="展示颜色" width="100px">
        <template slot-scope="scope">
          <div :style="{'background-color':scope.row.color,width:'35px',height:'20px',margin:'0 auto'}"/>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ord" label="排序"/>
      <el-table-column align="center" prop="description" label="描述"/>
      <el-table-column align="center" label="图标">
        <template slot-scope="scope">
          <img :src="getImage(scope.row.imagePath)" min-width="60" height="60" >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
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
          
          <el-button @click="envConfigView(scope.row.id)" type="success" size="mini" >环境配置</el-button>
          <!-- 生长环境配置 -->
          <!-- 
          <el-dropdown
              split-button
              size="mini"
              type="primary"
              @click="envConfigView(scope.row.id)"
              @command="handelDropdown($event, scope.row)"
            >
            环境配置
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cycle">生长周期管理</el-dropdown-item>
              <el-dropdown-item command="pest">病虫害关联</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          -->

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
import { del } from '@/api/agroProductCycle'
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
    envConfigView(id){
      this.$router.push({ path: '/envConfig', query: { agroProductCycle: id, breadcrumb: 'hide' } })
    },
    handelDropdown(){

    },
    beforeInit() {
      this.url = 'api/agroProductCycle'
      const sort = 'ord,asc'
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
