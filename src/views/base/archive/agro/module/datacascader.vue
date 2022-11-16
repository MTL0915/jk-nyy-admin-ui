<template>
  <div class="cascader-container">
    <el-cascader
    v-model="value"
    :props="{ checkStrictly: true }"
    :options="options"
    :disabled="disabled"
    @change="handleChange"></el-cascader>
    <el-button type="primary" v-show="buttonShow" @click="refresh" size="mini" icon="el-icon-refresh">刷新</el-button>
  </div>
</template>

<script>
import { getAgroProductClassificationCascader,getParentLevelById } from '@/api/agroProductClassification'
export default {
  props: {
    buttonShow:{
      type: Boolean,
      default:true
    },
    disabled:{
      type: Boolean,
      default:false
    },
    cascaderChange:{
      type:Function
    }
  },
  data() {
    return {
      options: [],
      value:[]
    }
  },
  created() {
    // dom载入后触发
    this.$nextTick(() => {
      this.refresh();
    })
  },
  methods: {
    refresh(){
      getAgroProductClassificationCascader().then(res => {
        if (res.code == 200){
          this.options = res.data;
        }
      });
    },
    initValue(id){
      getParentLevelById(id).then(res => {
        if (res.code == 200){
          var initValue = [];
          var data = res.data;
          
          while (data && data.length > 0){
            initValue.push(data[0].value);
            data = data[0].children;
          }
          this.value = initValue;

          this.cascaderChange && this.cascaderChange(this.getSelectedValue());
        }
      });
    },
    setValue(agroProductClassificationId){

    },
    getSelectedValue(){
      return this.value && this.value[this.value.length - 1]
    },
    handleChange(idArr) {
      var data = this.getDataByOption(idArr);

      this.cascaderChange && this.cascaderChange(this.getSelectedValue());
    },
    getDataByOption(idArr){
      var datas = this.options;
      for (var i = 0,len = idArr.length;i < len;i++){
        for (var j = 0,len2 = datas.length;j < len2;j++){
          if (datas[j].value == idArr[i]){
            if (i == (len - 1) ){
              return datas[j];
            }else{
              datas = datas[j].children;
              break;
            }
          }
        }
      }
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
