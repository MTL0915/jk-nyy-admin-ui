<template>
  <el-dialog
    title="预警配置"
    :visible.sync="valueLevelVisible"
    append-to-body
    customClass="dialogClass"
    @close="closeDialog"
  >
    <div style="padding-bottom: 50px;display: none">
      <div style="float: left;padding-left: 15px; ">
        <el-button
          type="primary"
          size="mini"
        >预警配置</el-button>
      </div>
      <div style="float: right;">
        <el-select
          v-model="colorObj"
          size="mini"
          placeholder="请选择"
          @change="generateTableColorBar"
        >
          <el-option
            v-for="item in  colorBarList"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
            <div
              v-for="(colorValue, index) in item.data"
              style="float:left;width:15px;height:15px;"
              :style="{background:colorValue}"
              :key="index"
            />
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        prop="number"
        width="60"
        align="center"
      />
      <el-table-column
        label="区间名称"
        width="100"
        prop="name"
        align="center"
      >
      </el-table-column>
      <el-table-column label="区间值" align="center">
        <template slot-scope="scope">
          {{scope.row.start_value}}~{{scope.row.end_value}}
        </template>
      </el-table-column>
      <el-table-column label="是否预警" width="80px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.warn"
            active-color="#13ce66"
            size="mini"
            inactive-color="#909399">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;padding-top:20px;text-align: center;">
      <!-- <el-button
        type="primary"
        size="mini"
        @click="setting"
      >新增</el-button> -->
      <el-button
        type="primary"
        size="mini"
        @click="saveConfig"
      >保存</el-button>

      <el-button
        type="info"
        size="mini"
        @click="valueLevelVisible=false"
      >取消</el-button>
    </div>
    <ValueLevel ref="valueLevel" />
  </el-dialog>
</template>

<script>
import colorUtil from '@/utils/colorUtil'
import { getToken } from '@/utils/auth';
import { addWarnStrategy } from "@/api/hd_device_sensor";
import ValueLevel from './ValueLevel'

export default {
  components: {
    ValueLevel
  },
  data () {
    return {
      parentObj:{},
      id: '',
      tableData: [],
      start_value: null,
      end_value: null,
      valueLevelVisible: false,
      colorBarConfigList: [
        { label: "绿~蓝", startColor: "#07d207", endColor: "#0804f3", num: 10 },
        { label: "绿~红", startColor: "#07d207", endColor: "#ff0303", num: 10 },
        { label: "绿~黄", startColor: "#00ff00", endColor: "#ecdb0a", num: 10 },
        { label: "黄~红", startColor: "#ecdb0a", endColor: "#ff0303", num: 10 }
      ],
      predefineColors: [
        '#ffff00',
        '#0000ff',
        '#008000',
        '#ffa500',
        '#ff0000',
      ],
      colorBarList: [],
      colorObj: null
    };
  },
  computed: {},
  created () {
    for (var i = 0; i < this.colorBarConfigList.length; i++) {
      var cb = this.colorBarConfigList[i];
      var colorArr = colorUtil.generateColourBar(cb.startColor, cb.endColor, cb.num);
      this.colorBarList.push({ label: cb.label, data: colorArr });
    }
  },
  methods: {
    setting() {
      let config_json = this.tableData;
      if (config_json != null) {
        this.$refs.valueLevel.tableData = config_json;
      } else {
        this.$refs.valueLevel.tableData = [];
      }
      this.$refs.valueLevel.id = this.parentObj.id;
      this.$refs.valueLevel.start_value = this.start_value;
      this.$refs.valueLevel.end_value = this.end_value;
      this.$refs.valueLevel.id = this.parentObj.id;
      this.$refs.valueLevel.valueLevelVisible = true;
      this.$refs.valueLevel.parentObj = this.parentObj;
    },
    generateTableColorBar (val) {
      if (!val){
        return
      }
      var cb = this.colorBarConfigList.find(function (item) {
        return item.label === val;
      });

      var colorArr = colorUtil.generateColourBar(cb.startColor, cb.endColor, this.tableData.length);
      this.tableData.forEach(function (item, index) {
        Vue.set(item, "color", colorArr[index]);
      });
    },
    subDelete (number) {
      this.tableData.forEach((v, i) => {
        if (number === v.number) {
          // i 为选中的索引
          this.tableData.splice(i, 1);
          this.$message.success('删除成功!');
          this.$refs[number].doClose();
        }
      });
    },
    saveConfig () {
      var config_json = JSON.stringify(this.tableData);
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() }
      };
      this.$axios.post(process.env.BASE_API + '/hd/hd_device_sensor/addWarnStrategy', {hd_device_sensor_id:this.id,config_json:config_json}, config).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '保存成功！',type: 'success'});
          this.valueLevelVisible=false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addLevel (command) {
      if(!isNaN(command)){
        var len=this.tableData.length;
        for(var i=1;i<=command*1-len;i++){
          this.tableData.push({ number: i+len });
        }
      }else{
        this.tableData.push({ number: this.tableData.length + 1 });
      }
      this.generateTableColorBar(this.colorObj);
    },
    closeDialog () {
      this.parentObj.start_value = this.start_value;
      this.parentObj.end_value = this.end_value;
      this.parentObj.config_json = JSON.stringify(this.tableData);
    }
  }
};
</script>

<style>
  .dialogClass{
    width:500px
  }
</style>
