<template>
  <div>
    <div style="position: absolute;top: 34px;right: 33px;">
      <el-button
        v-if="checkDeviceControl(hd_device_id)"
        :loading="saveEditLoading"
        type="primary"
        @click="saveEdit"
        size="mini"
      >保存</el-button>

      <a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-row v-show="noshowInfo">
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="设备名称："
                prop="name"
              >
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.name"
                  size="small"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
              style="height:50px"
              v-show="noshowInfo"
            >
              <el-form-item
                style="min-width:100px"
                label="设备功能："
                prop="name"
              >
                <el-select
                  v-model="form.hd_device_function_id"
                  placeholder="请选择设备功能"
                  clearable="true"
                  :disabled="!checkDeviceControl(hd_device_id)"
                >
                  <el-option
                    v-for="item in hd_device_functionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="绑定地块："
                prop="name"
              >
                <el-select
                  v-model="form.rs_facilities_id"
                  placeholder="请选择绑定地块"
                  @change="facilitiesChange"
                  :disabled="!checkDeviceControl(hd_device_id)"
                >
                  <el-option
                    v-for="item in facilitiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="分享地块："
                prop="name"
              >
                <el-select
                  v-model="form.enjoy_facilities_ids"
                  collapse-tags
                  multiple
                  placeholder="请选择分享地块"
                  :disabled="!checkDeviceControl(hd_device_id)"
                >
                  <el-option
                    :disabled="item.id === form.rs_facilities_id"
                    v-for="item in facilitiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="noshowInfo">
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="经纬度："
                prop="longitude"
              >
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.longitude"
                  size="small"
                  style="width:100px;font-size: 12px;"
                />，
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.latitude"
                  size="small"
                  style="width:100px;font-size: 12px"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="经纬度采集："
                prop="location_update_status"
                label-width="140px"
              >
                <el-switch
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.location_update_status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="noshowInfo">
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="采集间隔（分钟）："
                prop="collect_minute"
                label-width="140px"
              >
                <el-input-number
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.collect_minute"
                  :min="0"
                  :max="1440"
                  size="small"
                  label="采集间隔（分钟）"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="12"
              style="height:70px"
            >
              <el-form-item
                style="min-width:100px;margin-bottom: 0px;"
                label="是否分享："
                prop="share_sta"
                label-width="140px"
              >
                <el-switch
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.share_sta"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />

                <span
                  v-show="form.share_sta==1"
                  style="margin-left:30px"
                >
                  控制密码:
                  <el-input
                    :disabled="!checkDeviceControl(hd_device_id)"
                    size="mini"
                    style="width:120px;padding-left:3px;padding-right:3px;"
                    v-model="form.share_pwd"
                  />
                </span>
              </el-form-item>
              <div
                style="color:blue"
                v-show="form.share_sta==1"
              >
                <span>
                  分享URL：
                  <el-input
                    :disabled="!checkDeviceControl(hd_device_id)"
                    size="mini"
                    class="tag-read"
                    style="width:calc(100% - 280px)"
                    :value="'https://'+DOMAIN+'/deviceshow?hd_device_id='+hd_device_id"
                  />
                  <el-button
                    :disabled="!checkDeviceControl(hd_device_id)"
                    type="primary"
                    size="mini"
                    @click="copy"
                  >复制</el-button>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row v-show="noshowInfo">
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="排序："
                prop="ord"
                label-width="140px"
              >
                <el-input-number
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="form.ord"
                  :min="0"
                  :max="1440"
                  size="small"
                  label="排序"
                />
              </el-form-item>
            </el-col>

            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="标签："
                prop="labels"
                label-width="140px"
              >
                <el-tag
                  :key="tag"
                  v-for="tag in labels"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  style="margin-right:10px"
                >
                  {{tag}}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                  style="width:100px"
                >
                </el-input>
                <el-button
                  v-else
                  style="width:100px"
                  size="small"
                  @click="showInput"
                >+ 添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-show="noshowInfo">
            <el-col
              :span="12"
              style="height:50px"
            >
              <el-form-item
                style="min-width:100px"
                label="备注："
                prop="remark"
                label-width="140px"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.remark"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <span style="font-size:15px;color: #606266;font-weight: bold;">通道配置：</span>

          <!-- <el-button type="primary" size="small" @click="listAdd" >添加</el-button> -->

          <el-table
            :data="form.sensorList"
            class="table_row_qgq"
            style="width: 100%;"
          >
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.name"
                  placeholder="名称"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="通道号"
              width="100"
            >
              <template slot-scope="scope">
                <el-select
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.channel"
                  placeholder="通道号"
                  size="small"
                >
                  <el-option
                    v-for="channelItem in channels"
                    :key="channelItem"
                    :label="channelItem"
                    :value="channelItem"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="所属地块">
              <template slot-scope="scope">
                <el-select
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.rs_facilities_id"
                  placeholder="请选择地块"
                >
                  <el-option
                    v-for="item in facilitiesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              label="排序"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.ord"
                  placeholder="排序"
                  size="small"
                />
              </template>
            </el-table-column>

            <el-table-column
              label="传感器功能"
              width="150"
            >
              <template slot-scope="scope">
                <el-select
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.hd_sensor_type_function_id"
                  placeholder="传感器类型"
                  size="small"
                  @change="getSensorType($event, scope.$index)"
                >
                  <el-option
                    v-for="codeItem in scope.row.sensorTypeFunctions"
                    :key="codeItem.id"
                    :label="codeItem.name"
                    :value="codeItem.id"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="关联传感器"
              width="250"
            >
              <template slot-scope="scope">
                <el-cascader
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.hd_sensor_relationArr"
                  :key="cascaderKey + scope.row.channel"
                  :options="cascaderDeviceSensorData"
                  :props="{ multiple: true }"
                  collapse-tags
                  :show-all-levels="false"
                ></el-cascader>
              </template>
            </el-table-column>

            <el-table-column
              label="代码块"
              width="250"
              v-if="this.$store.state.baseinfo.cur_user_level === 1"
            >
              <template slot-scope="scope">
                <el-input
                  :disabled="!checkDeviceControl(hd_device_id)"
                  placeholder="代码块"
                  v-model="scope.row.javascript_code"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="是否分析"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.analysis_sta"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
                <!-- <el-button type="danger" size="small" @click="handelDelete(scope.row,scope.$index)" >删除</el-button> -->
              </template>
            </el-table-column>

            <el-table-column
              label="激活状态"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  :disabled="!checkDeviceControl(hd_device_id)"
                  v-model="scope.row.sta"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
                <!-- <el-button type="danger" size="small" @click="handelDelete(scope.row,scope.$index)" >删除</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              label="阈值设置"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  :disabled="!checkDeviceControl(hd_device_id)"
                  type="infor"
                  size="small"
                  @click="configValueLevel(scope.row)"
                >设置</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-form>
      </el-tab-pane>
      <el-tab-pane
        label="关联配置"
        v-if="checkDeviceControl(hd_device_id)"
      >
        <configInfo
          ref="configInfo"
          :show-phone-note="true"
        />
      </el-tab-pane>
    </el-tabs>
    <ValueLevel ref="valueLevel" />
    <JavascriptCodeConfig ref="javascriptCodeConfig" />
  </div>
</template>

<script>
import { getDetailById } from '@/api/equip';
import { findByBs_base_id } from '@/api/rs_facilities';
import { findByHd_device_id as findSensorTypeFunction } from '@/api/hd_sensor_type_function';
import { queryDeviceFunction } from '@/api/hd_device_function';
import { deleteById, findCascaderDeviceSensorByRs_facilities_id, findByHd_device_id } from '@/api/hd_device_sensor';
import { getToken } from '@/utils/auth';
import initDict from '@/mixins/initDict';
import configInfo from './configInfo'
import ValueLevel from './ValueLevel'
import JavascriptCodeConfig from '@/views/base/common/javascriptCodeConfig/index'
import checkDeviceControl from "@/utils/device_permission";
export default {
  name: 'EquipAdd',
  components: {
    configInfo, ValueLevel, JavascriptCodeConfig
  },
  mixins: [initDict],
  props: {
    noshowInfo: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      channels: [],
      inputVisible: false,
      inputValue: '',
      labels: [],
      hd_device_id: '',
      form: {
        name: '',
        longitude: '',
        latitude: '',
        collect_minute: 0,
        share_sta: 0,
        share_pwd: "",
        location_update_status: 0,
        rs_facilities_id: '', // 绑定的地块id
        enjoy_facilities_ids: [], //分享的地块id
        hd_device_function_id: '',
        sensorList: [],
        ord: null,
        labels: null,
        remark: null,
      },
      dialogFormAdd: false,
      // noshowInfo: true,
      facilitiesList: [],

      hd_device_functionList: [],

      sensorTypeList: [],
      sensorTypeFunctionList: [],
      cascaderDeviceSensorData: [],
      cascaderKey: 1000,
      saveEditLoading: false,
      DOMAIN: process.env.DOMAIN
    };
  },
  mounted () {
    var hd_device_id = this.$route.query.id;
    if (hd_device_id != null && hd_device_id != '') {
      this.handelEdit(hd_device_id, this.$store.state.baseinfo.cur_base_id);
    }
  },
  async created () {
    this.getDict('channel_type');

    await queryDeviceFunction({ size: 300 }).then(res => {
      this.hd_device_functionList = res.data.content;
    });

    await findSensorTypeFunction().then(res => {
      this.sensorTypeFunctionList = res.data;

    });

    var bs_base_id = this.$store.state.baseinfo.cur_base_id;

    await findByBs_base_id({ bs_base_id: bs_base_id }).then(res => {
      this.facilitiesList = res.data;
    });
  },
  methods: {
    checkDeviceControl,

    handleClose (tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.labels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    facilitiesChange () {
      if (this.form.enjoy_facilities_ids && this.form.enjoy_facilities_ids.length !== 0) {
        for (let i = 0; i < this.form.enjoy_facilities_ids.length; i++) {
          if (this.form.rs_facilities_id === this.form.enjoy_facilities_ids[i]) {
            this.form.enjoy_facilities_ids.splice(i, 1)
            break;
          }
        }
      }
    },
    copy () {
      var dom = $(".tag-read")[0];
      var selection = window.getSelection()
      var range = document.createRange()
      // 选择复制目标
      range.selectNodeContents(dom)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
    },
    async handelEdit (hd_device_id, bs_base_id) {
      this.hd_device_id = hd_device_id;

      getDetailById({
        hd_device_id: hd_device_id,
        returnInnerStatus: false,
      }).then(res => {

        var data = res.data;

        if (this.checkDeviceControl(hd_device_id)) {
          this.$refs.configInfo.configByDevice(data);
        }

        let labels = []
        if (data.labels) {
          labels = data.labels.split(',')
        }
        this.labels = labels

        this.form.name = data.name;
        this.form.longitude = data.longitude;
        this.form.latitude = data.latitude;
        this.form.share_sta = data.share_sta;
        this.form.share_pwd = data.share_pwd;
        this.form.collect_minute = data.collect_minute;
        this.form.ord = data.ord
        this.form.remark = data.remark

        this.form.location_update_status = data.location_update_status == null ? 0 : data.location_update_status;

        var bind_rs_facilities_id = data.bind_rs_facilities && data.bind_rs_facilities.id;
        this.form.rs_facilities_id = bind_rs_facilities_id;

        var enjoy_facilities_ids = [];
        var enjoy_rs_facilities = data.enjoy_rs_facilities;
        for (var i = 0, len = enjoy_rs_facilities.length; i < len; i++) {
          enjoy_facilities_ids.push(enjoy_rs_facilities[i].id);
        }

        this.form.enjoy_facilities_ids = enjoy_facilities_ids;

        this.form.hd_device_function_id = data.hd_device_function_id;

        findByHd_device_id({ hd_device_id: hd_device_id }).then(res2 => {
          res2.data.map(v => {
            v.hd_device_sensor_id = v.id;
            v.sensorTypeFunctions = [];

            for (var i = 0, len = this.sensorTypeFunctionList.length; i < len; i++) {
              if (this.sensorTypeFunctionList[i].hd_sensor_type_id === v.hd_sensor_type_id) {
                v.sensorTypeFunctions.push(this.sensorTypeFunctionList[i]);
              }
            }
          });

          var sensorList = res2.data;
          this.form.sensorList = sensorList;
          this.initChannels()

          findCascaderDeviceSensorByRs_facilities_id(bind_rs_facilities_id).then(cascaderDeviceSensorRes => {
            this.cascaderDeviceSensorData = cascaderDeviceSensorRes.data;
            for (var i = 0, len = sensorList.length; i < len; i++) {
              this.cascaderKey++;
              var hd_device_sensor_relation_ids = sensorList[i].hd_device_sensor_relation_ids;
              if (!hd_device_sensor_relation_ids) {
                sensorList[i].hd_sensor_relationArr = [];
                continue;
              }

              var hd_sensor_relationArr = [];

              for (var j = 0, len2 = hd_device_sensor_relation_ids.length; j < len2; j++) {
                var hd_device_sensor_relation_id = hd_device_sensor_relation_ids[j];

                var arr = this.getCascaderDeviceSensor(hd_device_sensor_relation_id, this.cascaderDeviceSensorData);
                if (arr) {
                  hd_sensor_relationArr.push(arr);
                }
              }
              sensorList[i].hd_sensor_relationArr = hd_sensor_relationArr;
            }
          });

          this.dialogFormAdd = true;
        });
      });
    },
    initChannels () {
      let max = 0
      for (let i = 0; i < this.form.sensorList.length; i++) {
        if (this.form.sensorList[i].channel > max) {
          max = this.form.sensorList[i].channel
        }
      }
      for (let j = 1; j <= max; j++) {
        this.channels.push(j)
      }
      this.$forceUpdate()
    },
    configJavascriptCode (row) {
      alert(row.id);
    },
    configValueLevel (row) {

      let config_json = JSON.parse(row.config_json);
      if (config_json != null) {
        this.$refs.valueLevel.tableData = config_json;
      } else {
        this.$refs.valueLevel.tableData = [];
      }
      this.$refs.valueLevel.id = row.id;
      this.$refs.valueLevel.start_value = row.start_value;
      this.$refs.valueLevel.end_value = row.end_value;
      this.$refs.valueLevel.id = row.id;
      this.$refs.valueLevel.valueLevelVisible = true;
      this.$refs.valueLevel.parentObj = row;
    },
    getCascaderDeviceSensor (hd_device_sensor_relation_id, cascaderDeviceSensorData) {
      var arr = undefined;
      for (var l = 0, len3 = cascaderDeviceSensorData.length; l < len3; l++) {
        var children = cascaderDeviceSensorData[l].children;
        if (!children) {
          continue;
        }
        for (var m = 0, len4 = children.length; m < len4; m++) {
          if (children[m].value === hd_device_sensor_relation_id) {
            arr = [];
            arr.push(cascaderDeviceSensorData[l].value);
            arr.push(children[m].value);
            return arr;
          }
        }
      }
    },
    listAdd () {
      this.form.sensorList.push({
        name: '',
        channel: '',
        ord: null,
        channelType: null,
        hd_device_sensor_id: '',
        hd_device_type_id: '',
        sensorTypeList: []
      });
    },
    getSensorType (hd_sensor_type_id, index) {
      // this.form.sensorList[index].hd_sensor_type_id = hd_sensor_type_id ，直接赋值不会刷新界面
      var obj = this.form.sensorList[index];
      obj.hd_sensor_type_id = hd_sensor_type_id;
      this.form.sensorList.splice(index, 1, obj);
    },
    setRelationSensor (data, index) { },
    handelDelete (data, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (data.hd_device_sensor_id === '') {
          this.$delete(this.form.sensorList, index);
          this.$message.success('删除成功!');
        } else {
          deleteById({ bs_user_id: this.id, hd_device_sensor_id: data.hd_device_sensor_id }).then(res => {
            this.$delete(this.form.sensorList, index);
            this.$message.success('删除成功!');
          });
        }
      });
    },
    saveEdit () {

      this.saveEditLoading = true
      var sensorList = this.form.sensorList;
      if (sensorList) {
        for (var i = 0, len = sensorList.length; i < len; i++) {

          //if (!sensorList[i].hd_sensor_type_function_id) {
          // this.$message.error('传感器功能不能为空！')
          // this.saveEditLoading = false
          // return
          // }

          var hd_sensor_relationArr = sensorList[i].hd_sensor_relationArr;
          if (!hd_sensor_relationArr) {
            continue;
          }

          var hd_sensor_relations = [];
          for (var j = 0, len2 = hd_sensor_relationArr.length; j < len2; j++) {
            hd_sensor_relations.push(hd_sensor_relationArr[j][1]);
          }
          sensorList[i].hd_sensor_relations = hd_sensor_relations;
        }
      }
      this.form.hd_device_id = this.hd_device_id;

      if (this.labels.length !== 0) {
        this.form.labels = this.labels.join(',')
      } else {
        this.form.labels = null
      }

      const config = {
        // headers: { 'Content-Type': 'application/json', 'access_token': getToken() }
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() }
      };
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/editAndSave', this.form, config).then(res => {
        this.saveEditLoading = false
        if (res.data.code === 200) {
          this.$message.success('编辑成功');
          // this.$emit('editDeviceSuccess', this.form)
          this.dialogFormAdd = false;
          this.$parent.init();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
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
