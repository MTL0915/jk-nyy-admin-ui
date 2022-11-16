<template>
  <div>
    <div>
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
          >添加</el-button>
          <el-button
            icon="el-icon-close"
            type="danger"
            size="mini"
            @click="delAll"
          >删除</el-button>
        </div>
        <div style="text-align:right;margin-right:10px">
          <el-input
            v-model="s_name"
            placeholder="名称"
            class="handle-input ml10"
          />
          <el-select
            v-model="s_catogory"
            placeholder="传感器分类"
            class="mr10 ml10"
            clearable
          >
            <el-option
              v-for="item in sensorCategoryDicts"
              :key="item.label"
              :value="item.label"
            />
          </el-select>
          <el-button
            type="success"
            icon="el-icon-search"
            size="mini"
            @click="search"
          >搜索</el-button>
          <el-button
            v-if="is_search"
            size="mini"
            type="primary"
            @click="clearSearch"
          >清空</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        :default-sort="{ prop: 'order', order: 'descending' }"
        border
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          prop="name"
          label="类型名称"
          width="150"
        />
        <el-table-column
          prop="code"
          label="类型编号"
          width="120"
        />
        <el-table-column
          prop="category"
          label="传感器分类"
        />

        <el-table-column
          prop="channelTypes"
          label="通道类型"
        >
          <template slot-scope="scope">
            <el-tag
              v-for="(item, index) in scope.row.channelTypes"
              :key="index"
              effect="plain"
              style="margin-left:3px;"
            >{{ getChannelTypeValue(item) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="unit"
          label="单位"
        />
        <el-table-column
          prop="image_path"
          label="大图标"
        >
          <template slot-scope="scope">
            <img
              :src="getLogo(scope.row.image_path)"
              min-width="40"
              height="40"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="small_image_path"
          label="小图标"
        >
          <template slot-scope="scope">
            <img
              :src="getLogo(scope.row.small_image_path)"
              min-width="40"
              height="40"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>

            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>

            <el-dropdown
              split-button
              size="mini"
              type="primary"
              @command="handleCommand($event,scope.row)"
            >
              更多
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-setting"
                  command="sensorTypeFunction"
                >传感器功能类型</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page.sync="cur_page"
          :total="totalNum"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editVisible"
      append-to-body
      width="930px"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form-item
              label="类型名称"
              prop="name"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="类型编号"
                  prop="code"
                >
                  <el-input v-model="form.code" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="单位"
                  prop="unit"
                >
                  <el-input v-model="form.unit" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="故障下限"
                  prop="lower"
                >
                  <el-input v-model="form.lower" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="故障上限"
                  prop="upper"
                >
                  <el-input v-model="form.upper" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              label="传感器分类"
              prop="category"
            >
              <el-radio-group
                v-model="form.category"
                size="mini"
              >
                <el-radio-button
                  v-for="item in sensorCategoryDicts"
                  :label="item.label"
                  :key="item.label"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="通道类型"
              prop="channelTypes"
            >
              <el-checkbox-group
                v-model="form.channelTypes"
                size="mini"
              >
                <el-checkbox-button
                  v-for="item in channelTypeDicts"
                  :label="item.value"
                  :key="item.value"
                >{{ item.label }}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="大图标">
                  <el-upload
                    ref="upload"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :before-upload="beforeAvatarUpload"
                    class="avatar-uploader"
                    action="' '"
                  >
                    <img
                      v-if="image_path"
                      :src="image_path"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    />
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="小图标">
                  <el-upload
                    ref="upload"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="smallHandleChange"
                    :before-upload="beforeAvatarUpload"
                    class="avatar-uploader"
                    action="' '"
                  >
                    <img
                      v-if="small_image_path"
                      :src="small_image_path"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="阈值配置">
            <div style="padding-bottom: 50px;">
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

                <el-button
                  size="mini"
                  type="success"
                  v-loading="updateSensorConfigJsonLoading"
                  @click="updateSensorConfig_json"
                >更新传感器阈值配置</el-button>
              </div>
              <div style="float: right;">
                <el-select
                  v-model="form.colorObj"
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
              :data="form.valueLevelTableData"
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
              <el-table-column
                label="区间起始值"
                width="100"
              >
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    size="mini"
                    v-model="scope.row.start_value"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="区间结束值"
                width="100"
              >
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
              <el-table-column
                label="启用预警"
                width="90"
              >
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
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >确 定</el-button>
      </span>
    </el-dialog>
    <trigger-panel ref="triggerPanel" />
    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="delVisible"
      append-to-body
      title="提示"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>

    <sensorTypeFunction ref="sensorTypeFunction" />
  </div>
</template>

<script>
import { find, add, update, deleteById, updateSensorConfigJson } from '@/api/hd_sensor_type';
import initDict from '@/mixins/initDict';
import colorUtil from '@/utils/colorUtil'
import TriggerPanel from "@/views/device/components/TriggerPanel";
import sensorTypeFunction from './module/sensorTypeFunction'

export default {
  name: 'Basetable',
  mixins: [initDict],
  components: { TriggerPanel, sensorTypeFunction },
  data () {
    return {
      updateSensorConfigJsonLoading: false,
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
      fileRaw: null,
      fileRaw2: null,
      tableData: [],
      pageSize: 10,
      totalNum: 0,
      cur_page: 1,
      multipleSelection: [],
      s_name: '',
      s_prod: '',
      s_catogory: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: '',
        code: '',
        ord: '',
        category: '',
        category_code: '',
        lower: '',
        upper: '',
        channelTypes: [],
        colorObj: ''
      },
      idx: -1,
      dialogTitle: '编辑',
      image_path: '',
      small_image_path: '',
      logo_path: '',
      dev_list: [],
      valid: true,
      sensorCategoryDicts: [],
      channelTypeDicts: [],
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入设备类型编号', trigger: 'blur' }],
        category: [{ required: true, message: '请选择传感器分类', trigger: 'blur' }],
        function_code: [
          // 单选
          { required: true, message: '功能类别', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    data () {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          console.log(d.channelTypes);
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          return d;
        }
      });
    }
  },
  created () {
    for (var i = 0; i < this.colorBarConfigList.length; i++) {
      var cb = this.colorBarConfigList[i];
      var colorArr = colorUtil.generateColourBar(cb.startColor, cb.endColor, cb.num);
      this.colorBarList.push({ label: cb.label, data: colorArr });
    }

    this.getDict2(this, 'sensorCategoryDicts', 'sensor_category');
    this.getDict2(this, 'channelTypeDicts', 'channel_type');
    this.getData();
  },
  methods: {
    handleCommand (command, row) {
      if (command === 'sensorTypeFunction') {
        this.$refs.sensorTypeFunction.showDialog(row.id, row.name)
      }
    },
    generateTableColorBar (val) {
      var cb = this.colorBarConfigList.find(function (item) {
        return item.label === val;
      });

      var colorArr = colorUtil.generateColourBar(cb.startColor, cb.endColor, this.form.valueLevelTableData.length);
      this.form.valueLevelTableData.forEach(function (item, index) {
        Vue.set(item, "color", colorArr[index]);
      });
    },
    addLevel (command) {
      if (!isNaN(command)) {
        var len = this.form.valueLevelTableData.length;
        for (var i = 1; i <= command * 1 - len; i++) {
          this.form.valueLevelTableData.push({ number: i + len });
        }
      } else {
        this.form.valueLevelTableData.push({ number: this.form.valueLevelTableData.length + 1 });
      }
      this.generateTableColorBar(this.form.colorObj);
    },
    showTrigger (row) {
      this.$refs.triggerPanel.showPanel(this.form);
    },
    getChannelTypeValue: function (value) {
      for (var item of this.channelTypeDicts) {
        if (item.value === value) {
          return item.label;
        }
      }
      return '未定义';
    },
    handleSizeChange: function (pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.handleCurrentChange(this.cur_page);
    },
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val;
      this.getData();
    },

    // 获取列表数据
    getData () {
      const _params = {
        size: this.pageSize,
        page: this.cur_page
      };
      if (this.is_search) {
        if (this.s_name) {
          _params.name = this.s_name;
        }
        if (this.s_catogory) {
          _params.category = this.s_catogory;
        }
      }
      find(_params).then(res => {
        for (var obj of res.data.content) {
          obj.channelTypes = obj.channelTypes.split(',');
        }
        this.tableData = res.data.content;
        this.totalNum = res.data.totalElements;
      });
    },
    search () {
      this.is_search = true;
      this.cur_page = 1;
      this.getData();
    },
    clearSearch () {
      this.is_search = false;
      this.s_name = '';
      this.s_catogory = '';
      this.cur_page = 1;
      this.getData();
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    handleEdit (index, row) {
      if (!this.valid) {
        this.$refs.form.resetFields();
      }
      this.dialogTitle = '编辑';
      const item = row;
      const _index = this.tableData.findIndex(function (e) {
        if (e.id === row.id) {
          return true;
        }
      });
      this.idx = _index > -1 ? _index : index;
      this.fileRaw = null;
      this.fileRaw2 = null;

      let config_json = JSON.parse(item.config_json);

      this.form = {
        name: item.name,
        code: item.code,
        category: item.category,
        category_code: item.category_code,
        unit: item.unit,
        lower: item.lower,
        upper: item.upper,
        start_value: item.start_value,
        end_value: item.end_value,
        hd_sensor_type_id: item.id,
        channelTypes: item.channelTypes,
        valueLevelTableData: (config_json != null ? config_json : [])
      };
      console.log(this.form.channelTypes);
      this.image_path = this.getLogo(item.image_path);
      this.small_image_path = this.getLogo(item.small_image_path);
      this.editVisible = true;
    },
    handleAdd () {
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.dialogTitle = '添加';
      this.editVisible = true;
      this.fileRaw = null;
      this.fileRaw2 = null;
      this.form = {
        name: '',
        code: '',
        category: '',
        category_code: '',
        unit: '',
        lower: '',
        upper: '',
        hd_sensor_type_id: '',
        channelTypes: [],
        start_value: '',
        end_value: '',
        valueLevelTableData: []
      };
      this.image_path = '';
      this.small_image_path = '';
    },
    handleDelete (index, row) {
      // this.idx = index;
      // fixed order bug.
      const _index = this.tableData.findIndex(function (e) {
        if (e.id === row.id) {
          return true;
        }
      });
      this.idx = _index > -1 ? _index : index;
      this.delVisible = true;
    },
    subDelete (number) {
      this.form.valueLevelTableData.forEach((v, i) => {
        if (number === v.number) {
          // i 为选中的索引
          this.form.valueLevelTableData.splice(i, 1);
          this.$message.success('删除成功!');
          this.$refs[number].doClose();
        }
      });
    },
    delAll () {
      const length = this.multipleSelection.length;
      let str = '';
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error('删除了' + str);
      this.multipleSelection = [];
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    getCategoryCode (category) {
      for (var i = 0, len = this.sensorCategoryDicts.length; i < len; i++) {
        if (this.sensorCategoryDicts[i].label === category) {
          return this.sensorCategoryDicts[i].value;
        }
      }
    },
    // 保存编辑
    saveEdit () {

      if (this.form.start_value == null) {
        this.form.start_value = ""
      }
      if (this.form.end_value == null) {
        this.form.end_value = ""
      }
      if (this.form.unit == null) {
        this.form.unit = ""
      }
      if (this.form.lower == null) {
        this.form.lower = ""
      }
      if (this.form.upper == null) {
        this.form.upper = ""
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form;
          form.config_json = JSON.stringify(this.form.valueLevelTableData);
          if (this.fileRaw) {
            form.image_path = this.fileRaw;
          }
          if (this.fileRaw2) {
            form.small_image_path = this.fileRaw2;
          }
          if (this.dialogTitle === '添加') {
            form.category_code = this.getCategoryCode(form.category);

            add(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false;
                if (this.fileRaw) {
                  this.fileRaw = null;
                }
                if (this.fileRaw2) {
                  this.fileRaw2 = null;
                }
                this.getData();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            form.category_code = this.getCategoryCode(form.category);

            update(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false;
                const form = this.form;
                if (this.fileRaw) {
                  form.image_path = URL.createObjectURL(this.fileRaw);
                  this.fileRaw = null;
                } else {
                  form.image_path = this.tableData[this.idx]['image_path'];
                }
                if (this.fileRaw2) {
                  form.small_image_path = URL.createObjectURL(this.fileRaw2);
                  this.fileRaw2 = null;
                } else {
                  form.small_image_path = this.tableData[this.idx]['small_image_path'];
                }
                form.id = form.hd_sensor_type_id;
                this.$set(this.tableData, this.idx, form);
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          this.valid = false;
          console.log('valid fail, return');
        }
      });
    },
    // 确定删除
    deleteRow () {
      deleteById({ hd_sensor_type_id: this.tableData[this.idx]['id'] }).then(res => {
        console.log('del res', res);
        this.tableData.splice(this.idx, 1);
        this.$message.success('删除成功');
        this.delVisible = false;
      });
    },
    // 更新阀值配置到地块类型传感器配置与传感器配置
    updateSensorConfig_json () {
      this.$confirm('注意：此操作将更新所有传感器阀值配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateSensorConfigJsonLoading = true;
        updateSensorConfigJson(this.form.hd_sensor_type_id).then(res => {
          this.updateSensorConfigJsonLoading = false;
          if (res.code === 200) {
            this.$message.success("更新传感器阀值配置成功!");
          }
        });
      })
    },
    handleAvatarSuccess (res, file) {
      console.log('res', res);
      console.log('file', file);
      // 提示上传结果.
      // this.image_path = URL.createObjectURL(file.raw);
    },
    handleChange (file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw = file.raw;
      this.image_path = URL.createObjectURL(file.raw);
    },
    smallHandleChange (file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw2 = file.raw;
      this.small_image_path = URL.createObjectURL(file.raw);
    },
    handleChange2 (file, fl) {
      this.logo_path = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        file = null;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        file = null;
      }
      return false;
      //return isJPG && isLt2M
    },
    getLogo (img) {
      if (img === null) {
        return '';
      }
      if (img.indexOf('blob') > -1) {
        return img;
      }
      return process.env.IMG_URL + img;
    },
    getDevName (row, column) {
      const _curProd = this.dev_list.find(function (element) {
        return element.code === row.function_code;
      });
      if (_curProd) {
        return _curProd.name;
      }
      return '';
    }
  }
};
</script>

<style lang="stylus" scoped>
.handle-input
  width 120px
  display inline-block

.del-dialog-cnt
  font-size 16px
  text-align center

.table
  width 100%
  font-size 14px

.red
  color #ff0000

.ml10
  margin-left 10px

/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.avatar
  width 178px
  height 178px
  display block
</style>
