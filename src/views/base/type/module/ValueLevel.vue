<template>
  <el-dialog
    title="阈值配置"
    :visible.sync="valueLevelVisible"
    append-to-body
    @close="closeDialog"
    width="300"
    height="200"
  >
    <div style="padding-bottom: 40px;">
      <div style="float: left;">
        <el-dropdown
          split-button
          type="primary"
          size="mini"
          @command="addLevel"
          @click="addLevel"
        >
          添加区间
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">1区</el-dropdown-item>
            <el-dropdown-item command="2">2区</el-dropdown-item>
            <el-dropdown-item command="3">3区</el-dropdown-item>
            <el-dropdown-item command="4">4区</el-dropdown-item>
            <el-dropdown-item command="5">5区</el-dropdown-item>
            <el-dropdown-item command="6">6区</el-dropdown-item>
            <el-dropdown-item command="7">7区</el-dropdown-item>
            <el-dropdown-item command="8">8区</el-dropdown-item>
            <el-dropdown-item command="9">9区</el-dropdown-item>
            <el-dropdown-item command="10">10区</el-dropdown-item>
            <el-dropdown-item command="11">11区</el-dropdown-item>
            <el-dropdown-item command="12">12区</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
              v-for="colorValue in item.data"
              style="float:left;width:15px;height:15px;"
              :style="{background:colorValue}"
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
      />
      <el-table-column
        label="区间名称"
        width="120"
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            v-model="scope.row.name"
          />
        </template>
      </el-table-column>
      <el-table-column label="区间起始值">
        <template slot-scope="scope">
          <el-input
            type="number"
            size="mini"
            v-model="scope.row.start_value"
          />
        </template>
      </el-table-column>
      <el-table-column label="区间结束值">
        <template slot-scope="scope">
          <el-input
            type="number"
            size="mini"
            v-model="scope.row.end_value"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="目标区间"
        width="90"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.objective">是</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="权重(负影响%)"
        width="120"
      >
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            style="width:90px;padding-left:0px;padding-right:0px"
            v-model="scope.row.proportion"
            controls-position="right"
            :min="0"
            :max="100"
            label="影响程度"
          />
        </template>
      </el-table-column>
      <el-table-column label="颜色">
        <template slot-scope="scope">
          <el-color-picker
            v-model="scope.row.color"
            show-alpha
            :predefine="predefineColors"
          >
          </el-color-picker>
        </template>
      </el-table-column>
      <el-table-column label="启用预警">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.warn"
            active-color="#13ce66"
            inactive-color="#909399"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popover
            :ref="scope.row.number"
            placement="top"
            width="180"
          >
            <p>确定删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.number].doClose()"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="subDelete(scope.row.number)"
              >确定</el-button>
            </div>
            <el-button
              title="删除用户"
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getGroupFacilitiesByVideo } from '@/api/rs_facilities'
import colorUtil from '@/utils/colorUtil'
export default {
  data () {
    return {
      id: '',
      tableData: [],
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
    }
  },
  computed: {

  },
  created () {
    for (var i = 0; i < this.colorBarConfigList.length; i++) {
      var cb = this.colorBarConfigList[i];
      var colorArr = colorUtil.generateColourBar(cb.startColor, cb.endColor, cb.num);
      this.colorBarList.push({ label: cb.label, data: colorArr });
    }
  },
  methods: {
    generateTableColorBar (val) {
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
          this.tableData.splice(i, 1)
          this.$message.success('删除成功!')
          this.$refs[number].doClose()
        }
      })
    },
    closeDialog () {
      this.$parent.sensorTypeConfigData.forEach((v, i) => {
        if (this.id === v.id) {

          v.config_json = JSON.stringify(this.tableData);
        }
      })
    },
    addLevel (command) {
      if (!isNaN(command)) {
        var len = this.tableData.length;
        for (var i = 1; i <= command * 1 - len; i++) {
          this.tableData.push({ number: i + len });
        }
      } else {
        this.tableData.push({ number: this.tableData.length + 1 });
      }
      this.generateTableColorBar(this.colorObj);
    }
  }
}
</script>

<style lang="stylus" scoped></style>
