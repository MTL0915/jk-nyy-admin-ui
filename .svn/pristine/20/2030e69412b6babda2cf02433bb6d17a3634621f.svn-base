<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :open="openDialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" size="small" label-width="100px">
      <el-row>
          <el-form-item label="名称">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="传感器功能">
            <el-cascader
              v-model="form.hd_sensor_type_function_Arr"
              :collapse-tags="true"
              :options="options"
              filterable
              style="width:250px"></el-cascader>
          </el-form-item>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="适合最低值">
            <el-input v-model="form.suitLower" style="width:120px" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="适合最高值">
            <el-input v-model="form.suitUpper" style="width:120px" ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="告警最低值">
            <el-input v-model="form.warnLower" style="width:120px" ></el-input>
          </el-form-item>
        </el-row>
        
        <el-row>
          <el-form-item label="告警最高值">
            <el-input v-model="form.warnUpper" style="width:120px" ></el-input>
          </el-form-item>
        </el-row>
        
        <el-row>
          <el-form-item label="监听类型">
            <el-select
              v-model="form.type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>

          </el-form-item>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPestCascader } from '@/api/bs_pest'
import { sensorTypeFunctionList } from '@/api/hd_sensor_type_function'
import { addOrEdit } from '@/api/agroProductEnv'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  created(){
    sensorTypeFunctionList().then(res => {
      if (res.code == 200){
        this.sensorTypeFunctionList = res.data.content;
        this.options = this.getOptions(this.sensorTypeFunctionList);
      }
    });
  },
  data() {
    return {
      loading: false, 
      dialog: false,
      options: [],
      typeList:[
        {name:"最大值",value:"max"},
        {name:"最小值",value:"min"},
        {name:"平均值",value:"avg"},
        {name:"累积值",value:"sum"},
        {name:"最新值",value:"new"}
      ],
      sensorTypeFunctionList:[],
      agroProductCycle:'',
      form:{
        id:'',
        agroProductCycle:'',
        hd_sensor_type_function_id:'',
        name:'',
        type:'',
        suitLower:'',
        suitUpper:'',
        warnLower:'',
        warnUpper:''
      },
    }
  },
  methods: {
    showAdd(agroProductCycle){
      this.agroProductCycle = agroProductCycle;
      this.form.agroProductCycle = agroProductCycle;
      this.dialog = true;
    },
    showEdit(row,agroProductCycle){
      this.agroProductCycle = agroProductCycle;
      this.form = row;
      if (this.form.hd_sensor_type_function_id){
        this.form.hd_sensor_type_function_Arr = this.gethd_sensor_type_functionArr(this.form.hd_sensor_type_function_id);
      }
      this.dialog = true;
    },
    gethd_sensor_type_functionArr(hd_sensor_type_function_id){
      var options = this.options;
      for (var i = 0,len = options.length;i < len;i++){
        var children = options[i].children;
        for (var j = 0,len2 = children.length;j < len2;j++){
          if (children[j].value === hd_sensor_type_function_id){
            return [options[i].value,hd_sensor_type_function_id]
          }
        }
      }
    },
    getOptions(sensorTypeFunctionList){
      var options = [];
      for (var i = 0,len = sensorTypeFunctionList.length;i < len;i++ ){
        var sensorTypeFunction = sensorTypeFunctionList[i];
        var sensor_type_id = sensorTypeFunction.sensor_type_id;
        var sensor_type_name = sensorTypeFunction.sensor_type_name;
        var id = sensorTypeFunction.id;
        var name = sensorTypeFunction.name;

        var temp = null;
        for (var j = 0,len2 = options.length;j < len2;j++){
          if (options[j].value === sensor_type_id ){
            temp = options[j];
            break;
          }
        }
        if (temp === null){
          temp = {
            value : sensor_type_id,
            label : sensor_type_name,
            children : []
          };
          options.push(temp);
        }

        temp.children.push({
            value : id,
            label : name
        });
      }
      return options;
    },
    initValue(){
       if (this.form.p_id && this.form.code){
            getParentLevel(this.form.code).then(res => {
              if (res.code == 200){
                var initValue = [];
                var data = res.data;
                
                while (data && data.length > 0 && data[0].value != this.form.id){
                  initValue.push(data[0].value);
                  data = data[0].children;
                }
                this.value = initValue;
              }
            });
          }
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
    
      this.form.hd_sensor_type_function_id = this.form.hd_sensor_type_function_Arr[1];

      if (!this.form.name){
        this.$message.error("名称不能为空！");
        return;
      }
      if (!this.form.hd_sensor_type_function_id){
        this.$message.error("传感器功能不能为空！");
        return;
      }
      if (!this.form.type){
        this.$message.error("监听类型不能为空！");
        return;
      }
      if (this.form.suitLower === "" || this.form.suitLower === undefined){
        this.$message.error("适合最低值不能为空！");
        return;
      }
      if (!this.form.suitUpper === "" || this.form.suitLower === undefined){
        this.$message.error("适合最高值不能为空！");
        return;
      }
      
      this.loading = true
      
      this.form.agroProductCycle = this.agroProductCycle;

      addOrEdit(this.form).then(res => {
        this.loading = false
        if (res.code == 200){
          this.dialog = false;
          this.sup_this.init();
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id:'',
        hd_sensor_type_function_id:'',
        agroProductCycle:'',
        name:'',
        type:'',
        suitLower:'',
        suitUpper:'',
        warnLower:'',
        warnUpper:''
      }
    }
  }
}
</script>

<style scoped>

</style>
