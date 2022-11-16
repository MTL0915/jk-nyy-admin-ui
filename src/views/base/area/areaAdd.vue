<template>
  <div class="areaAddDiv">
     <el-dialog
      :visible.sync="visible"
      title="种植信息"
      width="750px"
      append-to-body
      class="areaAddDiv"
    >
      <el-row style="display: flex;padding:5px;">
          <el-col>所在地块:
              <el-select
              v-model="form.rs_facilities_id"
              size="small"
              style="width:200px"
              placeholder="选择所在地块"
              >
              <el-option
                  v-for="item in facilities"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
              </el-select>
          </el-col>
      </el-row>

      <el-row style="display: flex;padding:5px;">
          <el-col>作物名称:
              <el-select
              v-model="form.crop_id"
              filterable
              size="small"
              placeholder="请选择"
              >
              <el-option
                  v-for="item in cropOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
              </el-select>
          </el-col>
          <el-col>种植面积:
              <el-input
              v-model="form.acreage"
              style="width:100px"
              size="small"
              /> 亩
          </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
          <el-col>种植开始时间:
              <el-date-picker
              v-model="form.plantStartTime"
              size="small"
              style="width:140px"
              value-format="yyyy-MM-dd"
              />
          </el-col>
          <el-col>种植结束时间:
              <el-date-picker
              v-model="form.plantEndTime"
              size="small"
              style="width:140px"
              value-format="yyyy-MM-dd"
              @change="checkStartEndTime()"
              />
          </el-col>
      </el-row>

      <div style="font-size: 20px;margin-bottom: 5px;margin-top: 15px;">检测数据</div>
      <el-row style="display: flex;padding:5px;">
        <el-col>检测日期:
          <el-date-picker
              v-model="form.checkTime"
              size="small"
              style="width:140px"
              value-format="yyyy-MM-dd"
              />
        </el-col>
        <el-col>检测机构:
          <el-input
            v-model="form.checkOrg"
            size="small"
            style="width:200px"
            clearable
          />
        </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>PH值:
          <el-input
            v-model="form.ph"
            size="small"
            style="width:100px"
          />
        </el-col>
        <el-col>土壤盐分:
          <el-input
            v-model="form.ec"
            size="small"
            style="width:100px"
          />&nbsp;单位:%
        </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>全氮:
          <el-input
            v-model="form.nitrogen"
            size="small"
            style="width:100px"
          />&nbsp;单位:g/Kg
        </el-col>
        <el-col>全磷:
          <el-input
            v-model="form.phosphorus"
            size="small"
            style="width:100px"
          />&nbsp;单位:g/Kg
        </el-col>
      </el-row>
      <el-row style="display: flex;padding:5px;">
        <el-col>全钾:
          <el-input
            v-model="form.kalium"
            size="small"
            style="width:100px"
          />&nbsp;单位:g/Kg
        </el-col>
        <el-col>有机质:
          <el-input
            v-model="form.organic"
            size="small"
            style="width:100px"
          />&nbsp;单位:g/Kg
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

import {findByBs_base_id,vegetablesList } from '@/api/rs_facilities'
import { parseTime } from '@/utils/index'
import { add,get,edit } from '@/api/rs_facilities/rsFacilitiesPlant'
import { getToken } from '@/utils/auth'
export default {
  components: {
  },
  props: {
    getPlant: {
      type: Function,
      default: new Function
    }
  },
  data () {
    return {
      visible:false,
      facilities:[],
      cropOptions:{},
      form: {
        id: null,
        rs_facilities_id: '',
        crop_id: '',
        acreage: null,
        plantStartTime: null, // 氮
        plantEndTime: null, // 磷
        checkTime: null, // 钾
        checkOrg: null, // 尿素
        ph: null, // 磷酸二铵
        ec: null, // 有机肥
        nitrogen: null,
        phosphorus: null,
        kalium: null,
        organic: null
      }
    }
  },
  created () {
    // 获取基地下的地块
    findByBs_base_id({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.facilities = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    vegetablesList().then(res => {
      if (res.code === 200) {
        this.cropOptions = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    show(rs_facilities_id,id){
      this.resetForm();
      if (id){
        get({id:id}).then(res=>{
          var content = res.data.content;
          if (content.length > 0){
            this.form = content[0];
          }else{
            this.form.rs_facilities_id= rs_facilities_id;    
          }
          this.visible = true
        })
      }else{
        this.form.rs_facilities_id= rs_facilities_id;
        this.visible = true
      }
    },
    cancel(){
      this.visible = false
    },
    parseTime,
    // 判断输入的时间是否合理
    checkStartEndTime () {
       if (new Date(this.form.plantStartTime.replace(/-/g, '/')).getTime() >= new Date(this.form.plantEndTime.replace(/-/g, '/')).getTime()) {
          this.$message.warning('种植结束时间不能种植开始时间!')
          this.form.plantEndTime = null
          return
        }
    },
    // 保存
    save () {
      if (!this.form.rs_facilities_id) {
        this.$message.error('请选择地块!')
        return
      }
      if (!this.form.crop_id) {
        this.$message.error('请选择作物')
        return
      }
      if (!this.form.plantStartTime) {
        this.$message.error('请输入种植开始时间!')
        return
      }
      if (!this.form.plantEndTime) {
        this.$message.error('请输入种植结束时间!')
        return
      }

      if (!this.form.checkTime) {
        this.$message.error('检测日期不能为空!')
        return
      }

      if (!this.form.checkOrg) {
        this.$message.error('检测机构不能为空!')
        return
      }
      if (this.form.id){
        edit(this.form).then(res => {
          if (res.code === 200){
            this.getPlant()
            this.cancel()
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        add(this.form).then(res => {
          if (res.code === 200){
            this.getPlant()
            this.cancel()
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 获取编辑数据
    getData (id) {
      
    },
    // 重置表单
    resetForm () {
      this.form = {
        id: null,
        rs_facilities_id: '',
        crop_id: '',
        acreage: null,
        plantStartTime: null, // 氮
        plantEndTime: null, // 磷
        checkTime: null, // 钾
        checkOrg: null, // 尿素
        ph: null, // 磷酸二铵
        ec: null, // 有机肥
        nitrogen: null,
        phosphorus: null,
        kalium: null,
        organic: null
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>