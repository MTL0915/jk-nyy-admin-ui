<template>
  <div class="app-container">
    <div style="position: absolute;top: 34px;right: 33px;"><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a></div>

    <eHeader :query="query" :sup_this="sup_this" :agroProductCycle="agroProductCycle"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;" ref="multipleTable">
      <el-table-column
          type="selection"
          width="55"
          align="center"
        />
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="hd_sensor_type_function_name" label="传感器功能" align="center"/>

      <el-table-column prop="suitLower" label="适合最低值" align="center"/>
      <el-table-column prop="suitUpper" label="适合最高值" align="center"/>
      <el-table-column prop="warnLower" label="告警最低值" align="center"/>
      <el-table-column prop="warnUpper" label="告警最高值" align="center"/>
      <el-table-column prop="type" label="监听类型" align="center">
          <template slot-scope="scope">
            {{getTypeDes(scope.row.type)}}
          </template>
      </el-table-column>

      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          
          <edit :sup_this="sup_this" :data="scope.row" :agroProductCycle="agroProductCycle" />

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
import { del,batchDel } from '@/api/agroProductEnv'
import { getImage } from '@/utils/image_util'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  props:{
    
  },
  mounted (){
    var agroProductCycle = this.$route.query.agroProductCycle;
    this.agroProductCycle = agroProductCycle;
  },
  data() {
    return {
      delLoading: false,
      sup_this: this,
      agroProductCycle:""
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
    getTypeDes(type){
      // 测量类型，max最大值，min最小值，avg平均值，sum累积值，new最新值
      if ("max" === type){
        return "最大值";
      }else if ("min" === type){
        return "最小值";
      }else if ("avg" === type){
        return "平均值";
      }else if ("sum" === type){
        return "累积值";
      }else if ("new" === type){
        return "最新值";
      }else{
        return "未知";
      }
    },
    beforeInit() {
      this.url = 'api/agroProductEnv'
      const sort = 'id,asc'
      this.params = { page: this.page,agroProductCycle:this.agroProductCycle,size: this.size, sort: sort }

      if (this.query.name){
        this.params.name = this.query.name;
      }else{
        this.params.name = '';
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
