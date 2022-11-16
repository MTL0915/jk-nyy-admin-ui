<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :title="hd_device_type_name+' - 传感器功能定义'"
      width="1000px"
    >
       <el-button icon="el-icon-upload" type="success" size="small" @click="showAdd()">添加</el-button>
      <div style="max-height:600px;overflow-y:auto">
        <el-table :data="sensorTypeFunctionList" style="width: 100%">
          <el-table-column label="名称" prop="name" align="center"/>
          <el-table-column label="编号" prop="code" align="center" />
          <el-table-column label="所属应用" prop="product_name" align="center" />
          <el-table-column label="单位" prop="unit" align="center" />
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="showEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="addOrEditDialog"
      :append-to-body="true"
      title="添加或更新"
      width="500px"
      @close="hideAddOrEdit()"
    >
      <el-form ref="sensorTypeFunctionForm" :model="formData" :rules="rules" :inline="true" label-width="80px">
        <el-row>
          <el-form-item label="名称">
            <el-input v-model="formData.name" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="编号">
            <el-input v-model="formData.code" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="单位">
            <el-input v-model="formData.unit" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="功能描述">
            <el-input type="textarea" v-model="formData.des" :rows="5" style="width:300px" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="序号">
            <el-input v-model="formData.ord" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="所属应用">
            <el-select
              v-model="formData.hd_product_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in hd_productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

          </el-form-item>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAddOrEdit()">确 定</el-button>
        <el-button @click="hideAddOrEdit()">取 消</el-button>
      </span>

    </el-dialog>

  </div>
</template>
<script>
import { sensorTypeFunctionList as findByHd_sensor_type_id,addOrEdit,deleteById } from '@/api/hd_sensor_type_function'
import { queryProduct } from "@/api/product";

export default {
  data() {
    return {
      hd_sensor_type_id: '',
      hd_device_type_name: '',
      hd_productList:[],
      formData:{
        id:"",
        name:"",
        code:"",
        unit:"",
        ord:"",
        hd_product_id:""
      },
      dialogVisible: false,
      addOrEditDialog:false,
      sensorTypeFunctionList: [], // 当前传感器分类功能列表

    }
  },
  created(){
    queryProduct().then(res => {
      this.hd_productList = res.data.content;
    });
  },
  computed: {},
  watch: {
  },
  methods: {
    confirmAddOrEdit(){
      if (!this.formData.name){
        this.$message.error("名称不能为空");
        return;
      }

      if (!this.formData.code){
        this.$message.error("编号不能为空");
        return;
      }

      if (!this.formData.hd_product_id){
        this.$message.error("所属应用不能为空");
        return;
      }

      this.formData.hd_sensor_type_id = this.hd_sensor_type_id;
      addOrEdit(this.formData).then(res => {
        if (res.code == 200){
          this.addOrEditDialog = false;
          this.refreshData();
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    showEdit(index,obj){
      this.formData = {
        id:obj.id,
        name:obj.name,
        code:obj.code,
        unit:obj.unit,
        ord:obj.ord,
        hd_product_id:obj.product_id
      };
      this.addOrEditDialog = true;
    },
    showAdd(){
      this.formData = {
        id:"",
        name:"",
        code:"",
        unit:"",
        ord:"",
        hd_product_id:""
      };
      this.addOrEditDialog = true;
    },
    hideAddOrEdit(){
      this.addOrEditDialog = false;
    },
    showDialog(hd_sensor_type_id, hd_device_type_name) {
      this.hd_sensor_type_id = hd_sensor_type_id
      this.hd_device_type_name = hd_device_type_name
      this.dialogVisible = true

      this.refreshData();
    },
    refreshData(){
       findByHd_sensor_type_id({ 'hd_sensor_type_id': this.hd_sensor_type_id }).then(res => {
        this.sensorTypeFunctionList = res.data.content
      })
    },
    deleteRow(idx, item) {
      if (!item.id) {
        return;
      }
      this.$confirm('确定删除选中的信息吗', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(item.id).then(res => {
          if (res.code === 200) {
            this.sensorTypeFunctionList.splice(idx, 1)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      })


     
    }
  }
}
</script>

<style scoped lang="stylus">
.el-dialog__wrapper >>> .el-dialog__body
  padding-top 10px
</style>
