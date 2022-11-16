<template>
  <div class="areaAddDiv">
     <el-dialog
      :visible.sync="visible"
      title="投入品"
      width="450px"
      append-to-body
      class="areaAddDiv"
    >

      <el-row style="display: flex;padding:5px;">
          <el-col>类型:
              <el-select
              v-model="form.type"
              filterable
              size="small"
              placeholder="请选择"
              >
              <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
              >
              </el-option>
              </el-select>
          </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>名称:
          <el-input
            v-model="form.name"
            size="small"
            style="width:100px"
          />
        </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>重量:
            <el-input
            v-model="form.weight"
            size="small"
            style="width:100px"
          />&nbsp;单位:Kg
        </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
          <el-col>日期:
              <el-date-picker
              v-model="form.insertDate"
              size="small"
              style="width:140px"
              value-format="yyyy-MM-dd"
              />
          </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>描述:
          <el-input
            type="textarea"
            v-model="form.msg"
            size="small"
            style="width:250px;"
          />
        </el-col>
      </el-row>
      <div style="margin-top: 40px;margin-right:15px;text-align: right;">
        <el-button
          size="small"
          type="primary"
          @click="save()"
        >确定</el-button>
        <el-button
          size="small"
          @click="cancel()"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { parseTime } from '@/utils/index'
import { add,get } from '@/api/rs_facilities/rsFacilitiesPut'
export default {
  components: {
  },
  props: {
    showPuts: {
      type: Function,
      default: new Function
    }
  },
  data () {
    return {
      visible:false,
      typeOptions:[{name:"种子",value:1},{name:"农药",value:2},{name:"肥料",value:3},{name:"其它",value:10}],
      form: {
        id: null,
        rsFacilitiesPlantId: '',
        type: null,
        name: null,
        weight: null, 
        insertDate: null, 
        msg: null
      }
    }
  },
  created () {
    this.form = {
        id: null,
        rsFacilitiesPlantId: '',
        type: null,
        name: null,
        weight: null, 
        insertDate: null, 
        msg: null
      }
  },
  methods: {
    formInit(){
      this.form = {
        id: null,
        rsFacilitiesPlantId: '',
        type: null,
        name: null,
        weight: null, 
        insertDate: null, 
        msg: null
      }
    },
    show(rsFacilitiesPlantId,type){
      this.formInit()
      this.form.rsFacilitiesPlantId = rsFacilitiesPlantId;
      this.form.type = type;
      this.visible = true
    },
    showEdit(id){
      get({id:id}).then(res=>{
        var content = res.data.content;
        if (content.length > 0){
          this.form = content[0];
        }
        this.visible = true
      })
    },
    cancel(){
      this.visible = false
    },
    parseTime,
    // 保存
    save () {
      if (!this.form.name) {
        this.$message.error('名称不能为空!')
        return
      }
      if (!this.form.weight) {
        this.$message.error('重量不能为空')
        return
      }
       if (!this.form.insertDate) {
        this.$message.error('日期不能为空')
        return
      }

      add(this.form).then(res => {
        if (res.code === 200){
          this.showPuts(this.form.rsFacilitiesPlantId)
          this.cancel()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 获取编辑数据
    getData (id) {
      
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>