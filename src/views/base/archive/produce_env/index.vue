<template>
  <div class="app-container">
     <el-dialog
      :visible.sync="dialog"
      append-to-body
      title="生长环境配置"
      width="900px"
    >
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add()">新增</el-button>
      <eForm ref="form" :is-add="true" />

      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-view"
        @click="complete()">完成</el-button>

      <!--表格渲染-->
      <el-table v-loading="loading" :data="agroProduceArchiveEnvDTOs" size="small" style="width: 100%;" ref="multipleTable">
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
            
            <edit :data="scope.row" />

            <el-popover
              :ref="scope.row.id + scope.$index"
              placement="top"
              width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id + scope.$index].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id,scope.$index)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import eForm from './module/form'
import edit from './module/edit'
import { del as del } from '@/api/agroProduceArchiveEnv'
export default {
  components: { edit,eForm },
  props:{
    
  },
  mounted (){
  },
  data() {
    return {
      dialog:false,
      delLoading: false,
      agroProduceArchiveEnvDTOs: [],
      agroProduceArchiveCycleId:"",
      agroProductEnvId:"",
    }
  },
  created() {
  },
  methods: {
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
    add(){
      this.$refs.form.showAdd(this.agroProduceArchiveCycleId,this.agroProductEnvId,this.agroProduceArchiveEnvDTOs);
    },
    showDialog(agroProduceArchiveCycleId,agroProductEnvId,agroProduceArchiveEnvDTOs){
      this.dialog = true;
      this.agroProduceArchiveCycleId = agroProduceArchiveCycleId;
      this.agroProductEnvId = agroProductEnvId;
      
      this.agroProduceArchiveEnvDTOs = agroProduceArchiveEnvDTOs
    },
    complete(){
      this.dialog = false;
    },
    subDelete(id,index) {
      this.delLoading = true
      
      if (id){
        del(id).then(res => {
          this.delLoading = false;  
          if (res.code === 200){
            this.agroProduceArchiveEnvDTOs.splice(index,1);
          }else{
            this.$message.error(res.msg);
          }
        })
      }else{
        this.agroProduceArchiveEnvDTOs.splice(index,1);
        this.delLoading = false;
      }

       this.$refs[id+index].doClose();
    }
  }
}
</script>

<style scoped>

</style>
