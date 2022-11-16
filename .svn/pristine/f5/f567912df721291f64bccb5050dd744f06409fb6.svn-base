<template>
  <div>
    <div>
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button
            class="filter-item"
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
          >添加</el-button>
          <el-button
            class="filter-item"
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleBathAdd"
          >批量添加</el-button>
          <el-button
            class="filter-item"
            icon="el-icon-close"
            type="danger"
            size="mini"
            @click="confiramDelAll"
          >删除</el-button>
          <el-button
            class="filter-item"
            icon="el-icon-print"
            type="primary"
            size="mini"
            @click="printTag"
          >打印标签</el-button>
          <el-button
            class="filter-item"
            icon="el-icon-upload2"
            type="success"
            size="mini"
            @click="batchUpdate"
          >批量更新</el-button>
          <el-button
            class="filter-item"
            icon="el-icon-circle-plus-outline"
            type="warning"
            size="mini"
            @click="addThirdPartyDeviceVisible=true"
          >添加第三方设备</el-button>
        </div>

        <div style="text-align:right;margin-right:10px">
          <el-input
            v-model="s_name"
            placeholder="名称"
            class="handle-input ml10"
          />
          <el-input
            v-model="s_device_id"
            placeholder="设备序列号"
            class="handle-input ml10"
          />
          <el-select
            v-model="s_hd_device_type_id"
            placeholder="设备类型"
            class="mr10 ml10"
            filterable
            clearable
          >
            <el-option
              v-for="item in deviceTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            clearable
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
          sortable
          prop="name"
          label="设备名称"
        />
        <el-table-column
          sortable
          prop="hd_device_type_name,hd_device_type_code"
          label="设备类型"
        >
          <template slot-scope="scope">
            {{ scope.row.hd_device_type_name }}({{
              scope.row.hd_device_type_code
            }})
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="device_id"
          label="设备序列号"
        />

        <el-table-column
          sortable
          prop="verification_code"
          label="验证码"
        />
        <el-table-column
          sortable
          prop="version"
          label="版本号"
        />
        <el-table-column
          label="操作"
          width="210"
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
              style="margin-left:10px"
              @command="handleCommand($event, scope.row)"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-more" /><i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-document-copy"
                  command="copyDevice"
                >复制</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-setting"
                  command="channelConfig"
                >通道配置</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-setting"
                  command="deviceUpdate"
                >更新设备</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-connection"
                  command="attributeDefine"
                >属性定义</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-upload"
                  command="updateVersion"
                >固件版本更新</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-picture"
                  command="QRCode"
                >生成二维码</el-dropdown-item>

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
          :page-sizes="[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]"
          layout="total, sizes,prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <upgrade ref="upgradeHtml" />
    <channelConfig ref="channelConfig" />
    <bathAdd ref="bathAdd" />

    <!-- 编辑弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editVisible"
      append-to-body
      width="60%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="100px"
      >
        <el-form-item
          label="设备名称"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="设备类型">
          <el-cascader
            filterable
            v-model="typeVersion"
            :options="typeVersionOptions"
            clearable
            @change="changeTypeVersion"
          />
          <!--:props="{ checkStrictly: true }"-->
        </el-form-item>

        <!--
        <el-form-item label="设备类型" prop="hd_device_type_id">
          <el-select v-model="form.hd_device_type_id" placeholder="请选择">
            <el-option
              v-for="item in deviceTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        -->

        <el-form-item
          label="MQTT服务器"
          prop="describe"
        >
          <el-select
            v-model="form.bs_server_id"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in serverList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="所属应用"
          prop="describe"
        >
          <el-select
            v-model="form.hd_product_id"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in hd_productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备功能"
          prop="describe"
        >
          <el-select
            v-model="form.hd_device_function_id"
            placeholder="请选择"
            clearable="true"
            filterable
          >
            <el-option
              v-for="item in hd_device_functionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="设备序列号"
          prop="device_id"
        >
          <el-input v-model="form.device_id">
            <template slot="prepend">{{ deviceHeader }}</template>
          </el-input>
        </el-form-item>

        <el-form-item
          label="验证码"
          prop="verification_code"
        >
          <el-input
            v-model="form.verification_code"
            style="width:250px;"
          />
          <el-button @click="refreshVerificationCode()">刷新</el-button>
        </el-form-item>
        <!-- <el-form-item
          label="软件版本号"
          prop="version"
        >
          <el-input v-model="form.version" />
        </el-form-item> -->
        <el-form-item
          label="设备详细信息"
          prop="detail_json"
        >
          <el-input v-model="form.detail_json" />
        </el-form-item>
        <el-form-item
          label="通信地址"
          prop="communication"
        >
          <el-input v-model="form.communication" />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="describe"
        >
          <el-input v-model="form.describe" />
        </el-form-item>
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

    <el-dialog
      :visible.sync="delAllVisible"
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
        <el-button @click="delAllVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="delAll"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="qrCodeVisible"
      append-to-body
      title="设备二维码"
      width="300px"
    >
      <div style="width:100%">
        <div
          id="qrCode"
          ref="qrCodeDiv"
          style="width: 200px;margin:0 auto;"
        />
      </div>
    </el-dialog>

    <!-- 批量更新 -->
    <el-dialog
      :visible.sync="batchUpdateVisible"
      append-to-body
      width="80%"
      class="batchUpdateDialogClass"
    >
      <div style="color: #a09f9f;font-size: 16px;margin-top: -10px;cursor:pointer;">
        <span
          style="margin-left:20px;"
          :style="{ color: batchUpdateTitle == 1 ? '#000' : '' }"
          @click="(batchUpdateTitle = 1), (batchUpdateContent = true)"
        >批量更新</span>
        <span
          style="margin-left:20px;"
          :style="{ color: batchUpdateTitle == 2 ? '#000' : '' }"
          @click="(batchUpdateTitle = 2), (batchUpdateContent = false)"
        >更新日志</span>
        <div style="height: 1px;margin: 10px 20px 0px 0px;background: #e2e2e2;" />
      </div>

      <div
        v-if="batchUpdateContent"
        style="width:100%;margin-top: 15px;"
      >
        <!-- 查询条件 -->
        <div>
          <span>类型</span>
          <el-select
            v-model="batchUpdateType"
            placeholder="请选择"
            :filterable="true"
            @change="batchUpdateTypeChange"
          >
            <el-option
              v-for="item in batchUpdateTypeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span style="margin-left:20px;">设备版本</span>
          <el-select
            v-model="batchUpdateDeviceVersion"
            placeholder="请选择"
            :filterable="true"
            @change="batchUpdateDeviceVersionChange"
          >
            <el-option
              v-for="item in batchUpdateDeviceVersionArr"
              :key="item.id"
              :label="item.hardware_version"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span style="margin-left:20px;">升级版本</span>
          <el-select
            v-model="batchUpdateVersion"
            placeholder="请选择"
            :filterable="true"
          >
            <el-option
              v-for="item in batchUpdateVersionArr"
              :key="item.id"
              :label="item.version"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-button
            type="success"
            icon="el-icon-search"
            size="mini"
            style="margin-left:20px;"
            @click="batchUpdateSelect"
          >搜索</el-button>
        </div>

        <!-- 列表 -->
        <el-table
          :data="batchUpdateData"
          stripe
          style="width: 100%"
          @selection-change="batchUpdateSelection"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          />
          <!-- sortable -->
          <el-table-column
            prop="name"
            label="设备名称"
          />
          <el-table-column
            prop="hd_device_type_name,hd_device_type_code"
            label="设备类型"
          >
            <template slot-scope="scope">
              {{ scope.row.hd_device_type_name }}({{
                scope.row.hd_device_type_code
              }})
            </template>
          </el-table-column>
          <el-table-column
            prop="device_id"
            label="设备序列号"
          />

          <el-table-column
            prop="verification_code"
            label="验证码"
          />
          <el-table-column
            prop="version"
            label="版本号"
          />
        </el-table>

        <el-pagination
          @size-change="batchUpdateHandleSizeChange"
          @current-change="batchUpdateHandleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="batchUpdatePageSize"
          layout="total, sizes, prev, pager, next"
          :total="batchUpdateTotalNum"
        >
        </el-pagination>
      </div>

      <div
        v-if="!batchUpdateContent"
        style="width:100%;margin-top: 15px;"
      >
        <upgradeJournal ref="upgradeJournalHtml" />
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="batchUpdateVisible = false">取 消</el-button>
        <el-button
          v-if="batchUpdateContent"
          type="primary"
          @click="saveBatchUpdate"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      append-to-body
      title="添加第三方设备"
      v-if="addThirdPartyDeviceVisible"
      :visible.sync="addThirdPartyDeviceVisible"
    >
      <addThirdPartyDevice />
    </el-dialog>
    <el-dialog
      append-to-body
      title="出厂设备属性定义"
      v-if="factoryDeviceAttributeDialogVisible"
      :visible.sync="factoryDeviceAttributeDialogVisible"
    >
      <factoryDeviceAttribute :hd_factory_device_id="factoryDeviceAttributeId" />
    </el-dialog>
  </div>
</template>

<script>
import {
  find,
  add,
  update,
  deleteById,
  batchDelete,
  serverList,
  findHd_factory_deviceByTypeHardware,
  copyFactoryDevice
} from "@/api/factorydevice";
import { getList, getTypeHardware } from "@/api/equiptype";
import { updaFactoryDeviceToDevice } from "@/api/equip";
import initDict from "@/mixins/initDict";
import upgrade from "./module/upgrade";
import channelConfig from "./module/channelConfig";
import bathAdd from "./module/bathAdd";
import QRCode from "qrcodejs2";
import { queryProduct } from "@/api/product";
import { queryDeviceFunction } from "@/api/hd_device_function";
import ajaxApi from "@/api/map";
import { hardwareVersionFind } from "@/api/hd_hardware_version";
import { queryByHd_hardware_version_id } from "@/api/hd_device_upgrade_file";
import { getToken } from "@/utils/auth";
import upgradeJournal from "./module/upgradeJournal";
import addThirdPartyDevice from '@/views/thirdparty/addThirdPartyDevice'
import factoryDeviceAttribute from './module/factoryDeviceAttribute'

export default {
  name: "Basetable",
  components: { upgrade, channelConfig, bathAdd, upgradeJournal, addThirdPartyDevice, factoryDeviceAttribute },
  mixins: [initDict],
  data () {
    return {
      factoryDeviceAttributeId: null,
      factoryDeviceAttributeDialogVisible: false,
      addThirdPartyDeviceVisible: false,
      batchUpdateTitle: 1,
      batchUpdateContent: true,
      batchUpdateData: [],
      batchUpdateTotalNum: 0,
      batchUpdateCur_page: 1,
      batchUpdatePageSize: 10,
      batchUpdateType: "",
      batchUpdateTypeArr: [],
      batchUpdateDeviceVersion: "",
      batchUpdateDeviceVersionArr: [],
      batchUpdateVersion: "",
      batchUpdateVersionArr: [],
      batchUpdateSelectionArr: [],
      deviceHeader: "",
      tableData: [],
      pageSize: 10,
      totalNum: 0,
      cur_page: 1,
      multipleSelection: [],
      s_name: "",
      s_hd_device_type_id: "",
      s_hd_hardware_version_id: "",
      s_device_id: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      delAllVisible: false,
      batchUpdateVisible: false,
      deviceTypeList: [],

      hd_productList: [],
      hd_device_functionList: [],

      serverList: [],
      typeVersionOptions: [],
      typeVersion: [],
      form: {
        hd_factory_device_id: "",
        name: "",
        device_id: "",
        verification_code: "A12345",
        version: "V1.0",
        hd_device_type_id: "",
        hd_hardware_version_id: "",
        production_date: "",
        describe: "",
        communication: "",
        detail_json: "",
        bs_server_id: "",
        hd_product_id: "",
        hd_device_function_id: ""
      },
      idx: -1,
      dialogTitle: "编辑",
      image_path: "",
      logo_path: "",
      dev_list: [],
      valid: true,
      qrCodeVisible: false,
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        device_id: [
          { required: true, message: "请输入设备序列号", trigger: "blur" }
        ],
        verification_code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        version: [
          { required: true, message: "请输入设备固件版本号", trigger: "blur" }
        ],
        hd_device_type_id: [
          { required: true, message: "请输入设备类型", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    data () {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (
            d.hd_factory_device_id === this.del_list[i].hd_factory_device_id
          ) {
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
    this.getData();
    this.getDeviceTypeList();
    this.getServerList();
    queryProduct().then(res => {
      this.hd_productList = res.data.content;
    });
    queryDeviceFunction({ size: 300 }).then(res => {
      this.hd_device_functionList = res.data.content;
    });
  },
  methods: {
    refreshVerificationCode () {
      let arr = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ];
      this.form.verification_code =
        arr[Math.floor(Math.random() * 36)] +
        arr[Math.floor(Math.random() * 36)] +
        arr[Math.floor(Math.random() * 36)] +
        arr[Math.floor(Math.random() * 36)] +
        arr[Math.floor(Math.random() * 36)] +
        arr[Math.floor(Math.random() * 36)];
    },
    //保存批量更新
    saveBatchUpdate () {
      if (this.batchUpdateSelectionArr.length < 1) {
        this.$message.error("请选择一个或多个设备更新");
        return;
      }
      console.log(this.batchUpdateSelectionArr);
      var upgradeArr = [];
      var date = new Date();
      for (
        let index = 0;
        index < this.batchUpdateSelectionArr.length;
        index++
      ) {
        const element = this.batchUpdateSelectionArr[index];
        var upgradeObj = {};
        upgradeObj.hd_factory_device_id = element.hd_factory_device_id;
        upgradeObj.hd_device_type_id = this.batchUpdateType;
        upgradeObj.hd_hardware_version_id = this.batchUpdateDeviceVersion;
        upgradeObj.hd_device_upgrade_file_id = this.batchUpdateVersion;
        upgradeObj.createTime = date;
        upgradeArr.push(upgradeObj);
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken()
        }
      };
      this.$axios
        .post(
          process.env.BASE_API + "/hd/hd_device_upgrade_journal/add",
          upgradeArr,
          config
        )
        .then(res => {
          if (res.status === 200) {
            this.$message.success("保存批量更新成功");
            this.batchUpdateVisible = false;
          } else {
            this.$message.error(res.msg);
            this.batchUpdateVisible = false;
          }
        });
    },
    //批量更新多选改变事件
    batchUpdateSelection (val) {
      this.batchUpdateSelectionArr = val;
      console.log(this.batchUpdateSelectionArr);
    },
    //批量更新查询
    batchUpdateSelect () {
      if (this.batchUpdateType === "") {
        this.$message.error("请选择类型");
      } else if (this.batchUpdateDeviceVersion === "") {
        this.$message.error("请选择设备版本");
      } else if (this.batchUpdateVersion === "") {
        this.$message.error("请选择升级版本");
      } else {
        this.getFindHd_factory_deviceByTypeHardware();
      }
    },
    //点击批量更新
    batchUpdate () {
      this.batchUpdateVisible = true;
      this.batchUpdateTitle = 1;
      this.batchUpdateContent = true;
      this.batchUpdateTotalNum = 0;
      this.batchUpdateCur_page = 1;
      this.batchUpdatePageSize = 10;
      this.batchUpdateType = "";
      this.batchUpdateDeviceVersion = "";
      this.batchUpdateVersion = "";
      this.batchUpdateData = [];
      this.batchUpdateSelectionArr = [];
      this.getDeviceTypeAllList();
    },
    //选择类型
    batchUpdateTypeChange () {
      this.batchUpdateDeviceVersion = "";
      this.batchUpdateVersion = "";
      this.batchUpdateData = [];
      // 加载所属类型的设备版本
      this.getHardwareVersionFind(this.batchUpdateType);
    },
    //选择设备版本
    batchUpdateDeviceVersionChange () {
      this.batchUpdateVersion = "";
      this.batchUpdateData = [];
      // 加载所属设备版本的升级版本
      this.getQueryByHd_hardware_version_id(this.batchUpdateDeviceVersion);
    },
    //获取所有类型
    getDeviceTypeAllList () {
      ajaxApi.getAllList(e => {
        this.batchUpdateTypeArr = e.data;
      });
    },
    //根据类型获取设备版本号
    getHardwareVersionFind (device_type_id) {
      hardwareVersionFind({ hd_device_type_id: device_type_id }).then(res => {
        this.batchUpdateDeviceVersionArr = [];
        if (res.code === 200) {
          this.batchUpdateDeviceVersionArr = res.data.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //根据版本id获取升级版本
    getQueryByHd_hardware_version_id (batchUpdateVersionId) {
      queryByHd_hardware_version_id(batchUpdateVersionId).then(res => {
        this.batchUpdateVersionArr = [];
        if (res.code === 200) {
          if (res.data.length > 0) {
            this.batchUpdateVersionArr = res.data;
          } else {
            this.batchUpdateDeviceVersion = "";
            this.$message.error("该设备版本暂无可升级版本");
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //根据类型和设备版本查询
    getFindHd_factory_deviceByTypeHardware () {
      this.batchUpdateData = [];
      const _params = {
        page: this.batchUpdateCur_page,
        size: this.batchUpdatePageSize
      };
      _params.hd_device_type_id = this.batchUpdateType;
      _params.hd_hardware_version_id = this.batchUpdateDeviceVersion;
      findHd_factory_deviceByTypeHardware(_params).then(res => {
        if (res.code === 200) {
          this.batchUpdateData = res.data.content;
          this.batchUpdateTotalNum = res.data.totalElements;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 批量更新的分页
    batchUpdateHandleCurrentChange (val) {
      console.log(val);
      this.batchUpdateCur_page = val;
      if (this.batchUpdateType === "") {
        return;
      } else if (this.batchUpdateDeviceVersion === "") {
        return;
      } else if (this.batchUpdateVersion === "") {
        return;
      } else {
        this.getFindHd_factory_deviceByTypeHardware();
      }
    },
    batchUpdateHandleSizeChange (val) {
      console.log(val);
      this.batchUpdatePageSize = val;
      if (this.batchUpdateType === "") {
        return;
      } else if (this.batchUpdateDeviceVersion === "") {
        return;
      } else if (this.batchUpdateVersion === "") {
        return;
      } else {
        this.getFindHd_factory_deviceByTypeHardware();
      }
    },
    getServerList () {
      serverList({ type: "mqtt" }).then(res => {
        if (res.code === 200) {
          this.serverList = res.data.content;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCommand: function (command, row) {
      if (command === "copyDevice") {
        copyFactoryDevice({
          hd_factory_device_id: row.hd_factory_device_id
        }).then(res => {
          if (res.code === 200) {
            this.$message.success("复制成功");
            this.getData();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else if (command === "updateVersion") {
        this.$refs.upgradeHtml.versionUpdateDialogOpen(
          row.device_id,
          row.hd_hardware_version_id,
          row.version
        );
      } else if (command === "channelConfig") {
        this.$refs.channelConfig.showDialog(row.hd_factory_device_id, row.name);
      } else if (command === "QRCode") {
        this.qrCodeVisible = true;
        this.$nextTick(() => {
          document.getElementById("qrCode").innerHTML = "";
          var qRCode = new QRCode(this.$refs.qrCodeDiv, {
            text:
              '{"type":"1","code":"' + row.device_id + '","vcode":"A12345"}',
            width: 200,
            height: 200,
            colorDark: "#333333", // 二维码颜色
            colorLight: "#ffffff", // 二维码背景色
            correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
          });
        });
      } else if (command === "deviceUpdate") {
        this.$confirm('您确定更新出厂设备配置到设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          width: '250px'
        }).then(() => {
          updaFactoryDeviceToDevice({ hd_factory_device_id: row.hd_factory_device_id }).then(res => {
            if (res.code === 200) {
              this.$message.success("更新出厂设备配置到设备成功");
            } else {
              this.$message.error(res.msg);
            }
          });
        })
      } else if (command === 'attributeDefine') {
        this.factoryDeviceAttributeId = row.hd_factory_device_id
        this.factoryDeviceAttributeDialogVisible = true
      }
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
        if (this.s_hd_device_type_id) {
          _params.hd_device_type_id = this.s_hd_device_type_id;
        }
        if (this.s_hd_hardware_version_id) {
          _params.s_hd_hardware_version_id = this.s_s_hd_hardware_version_id;
        }
        if (this.s_device_id) {
          _params.device_id = this.s_device_id;
        }
      }
      find(_params).then(res => {
        this.tableData = res.data.content;
        this.totalNum = res.data.totalElements;
      });
    },
    changeTypeVersion (data) {
      this.form.hd_device_type_id = data[0];
      this.form.hd_hardware_version_id = data[1];
      const _this = this;
      this.typeVersionOptions.forEach(function (data1, index1) {
        if (data1.value === _this.form.hd_device_type_id) {
          data1.children.forEach(function (data2, index2) {
            if (data2.value === _this.form.hd_hardware_version_id) {
              var code = data1.code;
              var version = _this.prefixIntrger(data2.label, 2);
              var functionCode = data1.functionCode;

              // _this.form.device_id
              _this.deviceHeader =
                code.substring(3, code.length) + version + functionCode + "-";
            }
          });
        }
      });
    },
    prefixIntrger (num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    search () {
      this.is_search = true;
      this.cur_page = 0;
      this.getData();
      //      this.getDict('user_status')
    },
    clearSearch () {
      this.is_search = false;
      this.s_name = "";
      this.s_hd_device_type_id = "";
      this.s_hd_hardware_version_id = "";
      this.s_device_id = "";
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
      this.dialogTitle = "编辑";
      const item = row;
      const _index = this.tableData.findIndex(function (e) {
        if (e.id === row.hd_factory_device_id) {
          return true;
        }
      });
      this.idx = _index > -1 ? _index : index;
      this.fileRaw = null;
      this.typeVersion = [];
      this.typeVersion[0] = item.hd_device_type_id;
      if (item.hd_hardware_version_id) {
        this.typeVersion[1] = item.hd_hardware_version_id;
      }
      this.form = {
        hd_factory_device_id: item.hd_factory_device_id,
        name: item.name,
        device_id: item.device_id,
        verification_code: item.verification_code,
        version: item.version,
        hd_device_type_id: item.hd_device_type_id,
        hd_hardware_version_id: item.hd_hardware_version_id,
        production_date: item.production_date,
        hd_device_type_code: item.hd_device_type_code,
        hd_device_type_name: item.hd_device_type_name,
        describe: item.describe,
        communication: item.communication,
        detail_json: item.detail_json,
        bs_server_id: item.bs_server_id,
        hd_product_id: item.hd_product_id,
        hd_device_function_id: item.hd_device_function_id
      };
      var headerIndex = item.device_id.indexOf("-");
      if (headerIndex !== -1) {
        this.deviceHeader = item.device_id.substring(0, headerIndex + 1);
        this.form.device_id = item.device_id.substring(headerIndex + 1);
      }
      this.editVisible = true;
    },
    handleAdd () {
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
      this.dialogTitle = "添加";
      this.editVisible = true;
      this.fileRaw = null;
      this.typeVersion = [];
      this.deviceHeader = "";
      this.form = {
        hd_factory_device_id: "",
        name: "",
        device_id: "",
        verification_code: "A12345",
        version: "V1.0",
        hd_device_type_id: "",
        production_date: "",
        describe: "",
        communication: "",
        detail_json: "",

        bs_server_id: "",
        hd_product_id: "",
        hd_device_function_id: ""
      };
      this.refreshVerificationCode();
      this.image_path = "";
    },
    // 点击批量添加按钮
    handleBathAdd () {
      this.$refs.bathAdd.dialogVisible = true;
    },
    handleDelete (index, row) {
      // this.idx = index;
      // fixed order bug.
      const _index = this.tableData.findIndex(function (e) {
        if (e.hd_factory_device_id === row.hd_factory_device_id) {
          return true;
        }
      });
      this.idx = _index > -1 ? _index : index;
      this.delVisible = true;
    },
    confiramDelAll () {
      var length = this.multipleSelection.length;
      if (length === 0) {
        this.$message.error("请选择删除的设备!");
        return false;
      }
      this.delAllVisible = true;
    },

    delAll () {
      const length = this.multipleSelection.length;
      let hd_factory_device_ids = "";
      for (let i = 0; i < length; i++) {
        hd_factory_device_ids +=
          this.multipleSelection[i].hd_factory_device_id + ",";
      }
      this.del_list = this.del_list.concat(this.multipleSelection);
      batchDelete({ hd_factory_device_ids: hd_factory_device_ids }).then(
        res => {
          if (res.code === 200) {
            this.multipleSelection = [];
            this.$message.success("删除成功");
            this.delAllVisible = false;
            this.getData();
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form;
          if (this.fileRaw) {
            form.image_path = this.fileRaw;
          }

          var old_device_id = form.device_id;
          form.device_id = this.deviceHeader + form.device_id;
          if (this.dialogTitle === "添加") {
            add(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false;
                if (this.fileRaw) {
                  this.fileRaw = null;
                }
                this.getData();
              } else {
                form.device_id = old_device_id;
                this.$message.error(res.msg);
              }
            });
          } else {
            update(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false;
                this.getData();
              } else {
                form.device_id = old_device_id;
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          this.valid = false;
          console.log("valid fail, return");
        }
      });
    },
    // 确定删除
    deleteRow () {
      deleteById({
        hd_factory_device_id: this.tableData[this.idx]["hd_factory_device_id"]
      }).then(res => {
        if (res.code === 200) {
          this.tableData.splice(this.idx, 1);
          this.$message.success("删除成功");
          this.delVisible = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleAvatarSuccess (res, file) {
      console.log("res", res);
      console.log("file", file);
      // 提示上传结果.
      // this.image_path = URL.createObjectURL(file.raw);
    },
    handleChange (file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw = file.raw;
      this.image_path = URL.createObjectURL(file.raw);
    },
    handleChange2 (file, fl) {
      this.logo_path = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getLogo (img) {
      if (img === null) {
        return "";
      }
      if (img.indexOf("blob") > -1) {
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
      return "";
    },
    // 获取prod数据
    getDeviceTypeList () {
      getList({ size: 300 }).then(res => {
        this.deviceTypeList = res.data.content;
      });
      getTypeHardware().then(res => {
        this.typeVersionOptions = res.data;
      });
    },
    // 打印二维码标签
    printTag () {
      var _this = this;
      if (this.multipleSelection.length == 0) {
        this.$message.info("请选择要打印的设备!");
        return;
      }
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var row = this.multipleSelection[i];
        if (row.device_id == null || row.device_id == "") {
          this.$message.error("【" + row.name + "】未填写设备序列号!");
          return;
        }
        if (row.verification_code == null || row.verification_code == "") {
          this.$message.error("【" + row.name + "】未填写设备验证码!");
          return;
        }
        if (row.hd_device_type_name == null || row.hd_device_type_name == "") {
          this.$message.error("【" + row.name + "】未指定设备类型!");
          return;
        }
        if (row.version == null || row.version == "") {
          this.$message.error("【" + row.name + "】未填写设备版本号!");
          return;
        }
      }
      var flag = false;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (flag) break;
        var row = this.multipleSelection[i];
        var jsonString =
          '{"qrcode":{"type":"1","code":"' +
          row.device_id +
          '","vcode":"' +
          row.verification_code +
          '"},"data":{"设备名称":"' +
          row.hd_device_type_name +
          '","型号":"' +
          row.hd_device_type_code +
          '","版本号":"' +
          row.version +
          '","序列号":"' +
          row.device_id +
          '","验证码":"' +
          row.verification_code +
          '"}}';
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:28001/printService/addTask",
          data: { jsonString: jsonString },
          async: false,
          success: function (data) {
            console.log(data);
          },
          error: function (e) {
            _this.$message.error("未检测到本地打印服务，请启动后再打印!");
            flag = true;
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-dropdown-link
  cursor pointer
  color #409EFF

.el-icon-arrow-down
  font-size 12px

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

<style>
.batchUpdateDialogClass .el-dialog__body {
  padding-top: 0px;
}
</style>
