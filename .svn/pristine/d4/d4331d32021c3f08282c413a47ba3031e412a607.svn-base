<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="id === ''?'新增摄像头':'修改摄像头'"
      :width="dialogWidth+'px'"
      append-to-body
      @close="closeDialog"
    >
      <div
        v-if="id===''"
        style="margin-bottom: 15px;"
      >
        <div style="font-size: 20px;margin-bottom: 20px;">添加方式</div>
        <el-row style="display: flex;padding:5px;">
          <el-radio-group
            v-model="sxt_type"
            @change="typeChange"
          >
            <el-radio
              label="1"
              style="margin-top:10px;"
            >萤石云(海康)添加</el-radio>
            <el-radio
              label="2"
              style="margin-top:10px;"
            >流媒体添加</el-radio>
            <el-radio
              label="0"
              style="margin-top:10px;"
            >农语云添加</el-radio>
            <el-radio
              label="3"
              style="margin-top:10px;"
            >海康安防平台添加</el-radio>
            <el-radio
              label="4"
              style="margin-top:10px;"
            >乐橙云(大华)添加</el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <!-- 农语云添加 || 萤石云添加 || 乐橙云添加 -->
      <div v-if="sxt_type==='0' || sxt_type==='1' || sxt_type==='4'">
        <el-tabs
          v-model="activeName"
          @tab-click="tabClick"
        >
          <el-tab-pane
            :label="sxt_type_name+'基本信息'"
            name="first"
          >
            <el-row style="display: flex;padding:5px;">
              <el-col>绑定地块:
                <el-select
                  v-model="sxtForm.rs_facilities_id"
                  size="small"
                  style="width:150px"
                  placeholder="绑定地块"
                >
                  <el-option
                    v-for="item in facilities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <el-button
                  v-if="!id"
                  type="primary"
                  size="small"
                  @click="addLand()"
                >添加</el-button>
              </el-col>

              <el-col v-if="id">分享地块:
                <el-select
                  v-model="sxtForm.enjoy_facilities_ids"
                  collapse-tags
                  multiple
                  size="small"
                  style="width:150px"
                  placeholder="请选择分享地块"
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
              <el-col>设备名称:
                <el-input
                  v-model="sxtForm.name"
                  size="small"
                  style="width:200px"
                  clearable
                />
              </el-col>
            </el-row>

            <el-row style="display: flex;padding:5px;">
              <el-col>序列号:
                <el-input
                  @change="isUpdate=true"
                  v-model="sxtForm.deviceSerial"
                  size="small"
                  style="width:215px"
                  clearable
                  @blur="checkSerial()"
                />
              </el-col>
              <el-col>验证码:
                <el-input
                  @change="isUpdate=true"
                  v-model="sxtForm.validateCode"
                  size="small"
                  style="width:215px"
                  clearable
                />
              </el-col>
            </el-row>
            <el-row
              v-if="id"
              style="display: flex;padding:5px;"
            >
              <el-col>经度:
                <el-input
                  v-model="sxtForm.longitude"
                  size="small"
                  style="width:215px"
                  clearable
                />
              </el-col>
              <el-col>纬度:
                <el-input
                  v-model="sxtForm.latitude"
                  size="small"
                  style="width:215px"
                  clearable
                />
              </el-col>
            </el-row>
            <el-row
              style="display: flex;padding:5px;"
              v-if="id"
            >
              <el-col>是否分享：
                <el-switch
                  v-model="sxtForm.share_sta"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
                <div
                  style="padding-top:8px;color:blue;"
                  v-show="sxtForm.share_sta==1"
                >分享URL：
                  <el-input
                    class="tag-read"
                    size="mini"
                    style="width:calc(100% - 190px)"
                    :value="'https://'+DOMAIN+'/openvideo?device_id='+sxtForm.device_id"
                  />
                  <el-button
                    type="primary"
                    size="mini"
                    @click="copy"
                  >复制</el-button>
                </div>
              </el-col>
              <el-col>视频加密：
                <el-switch
                  v-model="sxtForm.encrypt"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeEncrypt"
                />
              </el-col>
            </el-row>
            <el-row
              style="display: flex;padding:5px;"
              v-if="id"
            >
              <el-col>排序：
                <el-input-number
                  v-model="sxtForm.ord"
                  :min="0"
                  :max="1440"
                  size="small"
                  label="排序"
                />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            v-if="sxt_type!=='0' && id!==''"
            label="网络配置"
            name="second"
          >
            <el-row style="display: flex;padding:5px;">
              <el-col>用户名:
                <el-input
                  v-model="sxtForm.username"
                  size="small"
                  style="width:215px"
                  clearable
                />
              </el-col>
              <el-col>密码:
                <el-input
                  v-model="sxtForm.password"
                  size="small"
                  style="width:230px"
                  clearable
                />
              </el-col>
            </el-row>
            <el-row style="display: flex;padding:5px;">
              <el-col>IP:
                <el-input
                  v-model="sxtForm.ip"
                  size="small"
                  style="width:244px"
                  clearable
                />
              </el-col>
              <el-col>RTSP端口:
                <el-input
                  v-model="sxtForm.rtsp_port"
                  size="small"
                  style="width:190px"
                  clearable
                  placeholder="554"
                />
              </el-col>
            </el-row>
            <el-row style="display: flex;padding:5px;">
              <el-col>HTTP端口:
                <el-input
                  v-model="sxtForm.http_port"
                  size="small"
                  style="width:195px"
                  clearable
                  placeholder="80"
                />
              </el-col>
              <el-col>服务端口:
                <el-input
                  v-model="sxtForm.service_port"
                  size="small"
                  style="width:205px"
                  clearable
                  placeholder="8000"
                />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            v-if="id"
            label="权限配置"
            name="glconfig"
          >
            <configInfo
              v-if="activeName==='glconfig'"
              ref="configInfo"
              :show-phone-note="false"
            />
          </el-tab-pane>
          <el-tab-pane
            v-if="id"
            label="预置点配置"
            name="presetconfig"
          >
            <presetConfig
              v-if="activeName==='presetconfig'"
              :hd_device_id="sxtForm.hd_device_id"
              :device_id="sxtForm.device_id"
              :presets="presets"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- IP端口方式添加 -->
      <div v-if="sxt_type==='2'">
        <el-row style="display: flex;padding:5px;">
          <el-col>绑定地块:
            <el-select
              v-model="sxtForm.rs_facilities_id"
              size="small"
              style="width:150px"
              placeholder="绑定地块"
            >
              <el-option
                v-for="item in facilities"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-button
              v-if="!id"
              type="primary"
              size="small"
              @click="addLand()"
            >添加</el-button>
          </el-col>
          <el-col>设备名称:
            <el-input
              v-model="sxtForm.name"
              size="small"
              style="width:200px"
              clearable
            />
          </el-col>
        </el-row>
        <el-row
          v-if="id"
          style="display: flex;padding:5px;"
        >
          <el-col>分享地块:
            <el-select
              v-model="sxtForm.enjoy_facilities_ids"
              collapse-tags
              multiple
              size="small"
              style="width:150px"
              placeholder="请选择分享地块"
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
          <el-col>用户名:
            <el-input
              v-model="sxtForm.username"
              size="small"
              style="width:215px"
              clearable
            />
          </el-col>
          <el-col>密码:
            <el-input
              v-model="sxtForm.password"
              size="small"
              style="width:230px"
              clearable
            />
          </el-col>
        </el-row>
        <el-row style="display: flex;padding:5px;">
          <el-col>IP:
            <el-input
              v-model="sxtForm.ip"
              size="small"
              style="width:244px"
              clearable
            />
          </el-col>
          <el-col>HTTP端口:
            <el-input
              v-model="sxtForm.http_port"
              size="small"
              style="width:195px"
              clearable
              placeholder="80"
            />
          </el-col>
        </el-row>
        <el-row style="display: flex;padding:5px;">
          <el-col>RTSP端口:
            <el-input
              v-model="sxtForm.rtsp_port"
              size="small"
              style="width:190px"
              clearable
              placeholder="554"
            />
          </el-col>
          <el-col>服务端口:
            <el-input
              v-model="sxtForm.service_port"
              size="small"
              style="width:205px"
              clearable
              placeholder="8000"
            />
          </el-col>
        </el-row>
      </div>
      <!-- 海康威视安防平台添加 -->
      <div v-if="sxt_type==='3'">
        <!-- 新增页面 -->
        <div v-show="id===''">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              :label="sxt_type_name+'基础配置'"
              name="first"
            >
              <el-row style="display: flex;padding:5px;">
                <el-col>网关服务器ip端口:
                  <el-input
                    v-model="hikvisionForm.host"
                    size="small"
                    style="width:180px"
                    clearable
                  />
                </el-col>
                <el-col style="margin: auto;">传输协议:
                  <el-radio-group v-model="hikvisionForm.transportProtocol">
                    <el-radio label="http">http</el-radio>
                    <el-radio label="https">https</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>秘钥appkey:
                  <el-input
                    v-model="hikvisionForm.appKey"
                    size="small"
                    style="width:215px"
                    clearable
                  />
                </el-col>
                <el-col>秘钥appSecret:
                  <el-input
                    v-model="hikvisionForm.appSecret"
                    size="small"
                    style="width:200px"
                    clearable
                  />
                </el-col>
              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>所属地块:
                  <el-select
                    v-model="hikvisionForm.rs_facilities_id"
                    size="small"
                    style="width:170px"
                    placeholder="选择所在地块"
                  >
                    <el-option
                      v-for="item in facilities"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                  <el-button
                    v-if="!id"
                    type="primary"
                    size="small"
                    @click="addLand()"
                  >添加</el-button>
                </el-col>
                <el-col>
                  <el-button
                    type="primary"
                    size="small"
                    @click="hikvisionForm.pageNo=1;getHikvisionList()"
                  >获取摄像头列表</el-button>
                </el-col>
              </el-row>

              <div v-if="hikvisionList.length!==0">
                <el-table
                  :data="hikvisionList"
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column label="名称">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.cameraName"
                        clearable
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cameraTypeName"
                    label="监控点类型说明"
                    align="center"
                  />
                  <el-table-column
                    prop="cameraIndexCode"
                    label="监控点编号"
                  />
                  <el-table-column
                    label="操作"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        :disabled="scope.row.isAdd === true"
                        size="mini"
                        type="primary"
                        @click="addHikvision(scope.row)"
                      >添加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!--分页组件-->
                <el-pagination
                  :total="hikvisionForm.total"
                  :current-page="hikvisionForm.pageNo"
                  :page-size="hikvisionForm.pageSize"
                  style="margin-top: 8px;"
                  layout="total, prev, pager, next"
                  @current-change="pageChange"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 编辑页面 -->
        <div v-show="id!==''">
          <el-tabs v-model="activeName">
            <el-tab-pane
              :label="sxt_type_name+'基本信息'"
              name="first"
            >
              <el-row style="display: flex;padding:5px;">
                <el-col>设备名称:
                  <el-input
                    v-model="hikvisionForm.name"
                    size="small"
                    style="width:200px"
                    clearable
                  />
                </el-col>

                <el-col>是否分享：
                  <el-switch
                    v-model="hikvisionForm.share_sta"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-col>

              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>绑定地块:
                  <el-select
                    v-model="hikvisionForm.rs_facilities_id"
                    size="small"
                    style="width:150px"
                    placeholder="选择绑定地块"
                  >
                    <el-option
                      v-for="item in facilities"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>
                <el-col>分享地块:
                  <el-select
                    v-model="hikvisionForm.enjoy_facilities_ids"
                    collapse-tags
                    multiple
                    size="small"
                    style="width:150px"
                    placeholder="选择分享地块"
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
                <el-col>ip端口:
                  <el-input
                    v-model="hikvisionForm.host"
                    :disabled="id!==''"
                    size="small"
                    style="width:220px"
                    clearable
                  />
                </el-col>
                <!-- <el-col style="margin: auto;">传输协议:
                  <el-radio-group
                    v-model="hikvisionForm.transportProtocol"
                    :disabled="id!==''"
                  >
                    <el-radio label="http">http</el-radio>
                    <el-radio label="https">https</el-radio>
                  </el-radio-group>
                </el-col> -->
              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>经度:
                  <el-input
                    v-model="hikvisionForm.longitude"
                    size="small"
                    style="width:215px"
                    clearable
                  />
                </el-col>
                <el-col>纬度:
                  <el-input
                    v-model="hikvisionForm.latitude"
                    size="small"
                    style="width:215px"
                    clearable
                  />
                </el-col>
              </el-row>
              <!-- <el-row style="display: flex;padding:5px;">
            <el-col>编号:
              <el-input v-model="hikvisionForm.cameraIndexCode" :disabled="id!==''" size="small" style="width:230px" clearable/>
            </el-col>
          </el-row> -->
            </el-tab-pane>
            <el-tab-pane
              v-if="sxt_type!=='0' && id!==''"
              label="网络配置"
              name="second"
            >
              <el-row style="display: flex;padding:5px;">
                <el-col>用户名:
                  <el-input
                    v-model="hikvisionForm.username"
                    size="small"
                    style="width:215px"
                    clearable
                  />
                </el-col>
                <el-col>密码:
                  <el-input
                    v-model="hikvisionForm.password"
                    size="small"
                    style="width:230px"
                    clearable
                  />
                </el-col>
              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>IP:
                  <el-input
                    v-model="hikvisionForm.ip"
                    size="small"
                    style="width:244px"
                    clearable
                  />
                </el-col>
                <el-col>HTTP端口:
                  <el-input
                    v-model="hikvisionForm.http_port"
                    size="small"
                    style="width:195px"
                    clearable
                    placeholder="80"
                  />
                </el-col>
              </el-row>
              <el-row style="display: flex;padding:5px;">
                <el-col>RTSP端口:
                  <el-input
                    v-model="hikvisionForm.rtsp_port"
                    size="small"
                    style="width:190px"
                    clearable
                    placeholder="554"
                  />
                </el-col>
                <el-col>服务端口:
                  <el-input
                    v-model="hikvisionForm.service_port"
                    size="small"
                    style="width:205px"
                    clearable
                    placeholder="8000"
                  />
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div style="margin-top: 40px;margin-right:15px;text-align: right;">
        <el-button
          :loading="bindLoading"
          v-if="!(id === '' && sxt_type === '3')&& sxtForm.state===0"
          size="small"
          type="success"
          @click="bind()"
        > 重新绑定</el-button>
        <el-button
          v-if="!(id === '' && sxt_type === '3')"
          size="small"
          type="primary"
          @click="save()"
          :loading="saveLoading"
        >保存</el-button>
        <el-button
          size="small"
          @click="dialogVisible=false"
        >取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="addLandVisible"
      title="新增地块"
      width="750px"
      append-to-body
    >
      <div style="text-align: center;">
        <el-input
          v-model="newLandName"
          size="small"
          style="width:500px"
        />
        <el-button
          type="primary"
          size="small"
          @click="saveLand()"
        >添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { findByBs_base_id, add } from '@/api/rs_facilities'
import { getDetailById, addDevice } from '@/api/equip'
import { hikvisionList, addHikvisionDevice, addSxtDevice, updateSxtDevice, bindSxtDevice, sxtEncryptOn, sxtEncryptOff } from '@/api/sxt'
import configInfo from '@/views/base/equip/module/configInfo'
// import timingPhoto from './timingPhoto'
import presetConfig from './presetConfig'
import Clipboard from 'clipboard';

export default {
  components: {
    configInfo,
    //timingPhoto, 
    presetConfig
  },
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      dialogWidth: 750,
      saveLoading: false,
      bindLoading: false,
      id: '',
      sxt_type: '1', // 默认萤石云方式添加
      sxt_type_name: '萤石云',
      communication: {},
      sxtForm: {
        id: '',
        device_id: '',
        name: '',
        rs_facilities_id: '',
        share_sta: 0,
        enjoy_facilities_ids: [],
        deviceSerial: '',
        validateCode: '',
        longitude: '',
        latitude: '',
        ip: '',
        username: '',
        password: '',
        http_port: '',
        rtsp_port: '554',
        service_port: '',
        state: null,
        encrypt: 0
      },
      hikvisionForm: {
        id: '',
        device_id: '',
        rs_facilities_id: '',
        share_sta: 0,
        host: '',
        appKey: '',
        appSecret: '',
        transportProtocol: 'https',
        name: '',
        ip: '',
        username: '',
        password: '',
        http_port: '',
        rtsp_port: '',
        service_port: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        longitude: '',
        latitude: '',
      },
      facilities: [],
      hikvisionList: [],
      dialogVisible: false,
      addLandVisible: false,
      newLandName: '',
      isChange: false,// 是否改变数据
      activeName: 'first',
      isUpdate: false,//是否修改摄像头序列号或验证码
      presets: [],
    }
  },
  created () {
  },
  methods: {
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
    //开启或关闭视频加密
    changeEncrypt (val) {
      if (val === 1) {//开启
        sxtEncryptOn({ hd_device_id: this.id }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.sxtForm.encrypt = 0
            this.$message.error(res.msg)
          }
        })
      } else {//关闭
        sxtEncryptOff({ hd_device_id: this.id }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.sxtForm.encrypt = 1
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 关闭新增编辑弹窗刷新列表
    closeDialog () {
      this.presets = []
      this.dialogWidth = 750
      if (this.isChange) {
        this.isChange = false
        this.sup_this.init()
      }
    },
    tabClick (event) {
      this.dialogWidth = 750
      if (event.label == "权限配置") {
        this.$nextTick(() => {
          this.$refs.configInfo.getList(this.id);
        })
      }
      // else if (event.label == "定时拍照") {
      //   let timeinterval = 0
      //   let cj = this.communication
      //   if (cj.timing) {
      //     timeinterval = cj.timing.timeinterval
      //   }
      //   this.$refs.timingPhoto.show(this.id, timeinterval)
      // } 
      else if (event.label == "预置点配置") {
        this.dialogWidth = 1200
      }
    },
    // 确定添加地块
    saveLand () {
      add({ name: this.newLandName, bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.addLandVisible = false
          this.getFacilities()
        } else {
          this.addLandVisible = false
          this.$message.error(res.msg)
        }
      })
    },
    // 添加地块
    addLand () {
      this.addLandVisible = true
    },
    // 展示弹窗
    showDialog () {
      this.clearData()
      this.dialogVisible = true
    },
    // 清空数据
    clearData () {
      this.id = ''
      this.sxt_type = '1'
      this.sxt_type_name = '萤石云'
      this.sxtForm = {
        id: '',
        device_id: '',
        name: '',
        rs_facilities_id: '',
        share_sta: 0,
        enjoy_facilities_ids: [],
        deviceSerial: '',
        validateCode: '',
        longitude: '',
        latitude: '',
        ip: '',
        username: '',
        password: '',
        http_port: '',
        rtsp_port: '',
        service_port: '',
        state: null,
        ord: null
      }
      this.hikvisionForm = {
        id: '',
        device_id: '',
        rs_facilities_id: '',
        share_sta: 0,
        enjoy_facilities_ids: [],
        host: '',
        appKey: '',
        appSecret: '',
        transportProtocol: 'https',
        name: '',
        ip: '',
        username: '',
        password: '',
        http_port: '',
        rtsp_port: '',
        service_port: '',
        pageNo: 1,
        pageSize: 5,
        total: 0,
        longitude: '',
        latitude: '',
      }
      this.hikvisionList = []
      this.getFacilities()
      this.activeName = 'first'
    },
    // 翻页
    pageChange (val) {
      this.hikvisionForm.pageNo = val
      this.getHikvisionList()
    },
    // 挂载上云
    bind () {
      if (this.isUpdate) {
        this.save()
        this.isUpdate = false
        return
      }
      this.bindLoading = true
      bindSxtDevice({ hd_device_id: this.id }).then(res => {
        this.bindLoading = false
        if (res.code === 200) {
          this.isChange = true
          this.dialogVisible = false
          if (res.data.state === 1) {//绑定成功
            this.$message.success(res.data.msg)
          } else if (res.data.state === 0) {//绑定失败
            this.$message.error(res.data.msg)
            this.$alert(res.data.msg, '失败提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存
    save () {
      this.saveLoading = true
      if (this.id === '') { // 新增
        if (this.sxt_type === '0') { // 平台添加
          addDevice({
            name: this.sxtForm.name,
            device_id: this.sxtForm.deviceSerial,
            verification_code: this.sxtForm.validateCode,
            rs_facilities_id: this.sxtForm.rs_facilities_id,
            share_sta: this.sxtForm.share_sta
          }).then(res => {
            this.saveLoading = false
            if (res.code === 200) {
              this.isChange = true
              this.$message.success('添加成功')
              this.dialogVisible = false
              this.clearData()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else if (this.sxt_type === '1' || this.sxt_type === '2' || this.sxt_type === '4') { // 萤石云 || 乐橙云
          if (this.sxt_type === '1' && this.sxtForm.deviceSerial.length !== 9) {
            this.$message.error('海康设备序列号为9位!')
            this.saveLoading = false
            return
          }
          addSxtDevice({
            sxt_type: this.sxt_type,
            rs_facilities_id: this.sxtForm.rs_facilities_id,
            share_sta: this.sxtForm.share_sta,
            deviceSerial: this.sxtForm.deviceSerial,
            validateCode: this.sxtForm.validateCode,
            name: this.sxtForm.name,
            ip: this.sxtForm.ip,
            username: this.sxtForm.username,
            password: this.sxtForm.password,
            http_port: this.sxtForm.http_port,
            rtsp_port: this.sxtForm.rtsp_port,
            service_port: this.sxtForm.service_port
          }).then(res => {
            this.saveLoading = false
            if (res.code === 200) {
              this.isChange = true
              this.dialogVisible = false
              this.clearData()
              if (res.data.state === 1) {
                this.$message.success(res.data.msg)
              } else {
                this.$alert(res.data.msg, '失败提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                });
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.error('类型错误!')
        }
      } else { // 修改
        let rs_facilities_id = ''
        let share_sta = 0;
        let name = ''
        let deviceSerial = ''
        let validateCode = ''
        let longitude = ''
        let latitude = ''
        let ip = ''
        let username = ''
        let password = ''
        let http_port = ''
        let rtsp_port = ''
        let service_port = ''
        let enjoy_facilities_ids = []
        let ord = null
        if (this.sxt_type === '3') {
          rs_facilities_id = this.hikvisionForm.rs_facilities_id
          share_sta = this.hikvisionForm.share_sta
          name = this.hikvisionForm.name
          ip = this.hikvisionForm.ip
          username = this.hikvisionForm.username
          password = this.hikvisionForm.password
          share_sta = this.hikvisionForm.share_sta
          http_port = this.hikvisionForm.http_port
          rtsp_port = this.hikvisionForm.rtsp_port
          service_port = this.hikvisionForm.service_port
          enjoy_facilities_ids = this.hikvisionForm.enjoy_facilities_ids
          ord = this.hikvisionForm.ord
          longitude = this.hikvisionForm.longitude
          latitude = this.hikvisionForm.latitude
        } else if (this.sxt_type === '1' || this.sxt_type === '2' || this.sxt_type === '4') {
          if (this.sxt_type === '1' && this.sxtForm.deviceSerial.length !== 9) {
            this.$message.error('海康设备序列号为9位!')
            this.saveLoading = false
            return
          }
          rs_facilities_id = this.sxtForm.rs_facilities_id
          share_sta = this.sxtForm.share_sta
          name = this.sxtForm.name
          deviceSerial = this.sxtForm.deviceSerial
          validateCode = this.sxtForm.validateCode
          longitude = this.sxtForm.longitude
          latitude = this.sxtForm.latitude
          ip = this.sxtForm.ip
          username = this.sxtForm.username
          password = this.sxtForm.password
          http_port = this.sxtForm.http_port
          rtsp_port = this.sxtForm.rtsp_port
          service_port = this.sxtForm.service_port
          enjoy_facilities_ids = this.sxtForm.enjoy_facilities_ids
          ord = this.sxtForm.ord
        }
        updateSxtDevice({
          id: this.id,
          rs_facilities_id: rs_facilities_id,
          share_sta: share_sta,
          name: name,
          deviceSerial: deviceSerial,
          validateCode: validateCode,
          longitude: longitude,
          latitude: latitude,
          ip: ip,
          username: username,
          password: password,
          http_port: http_port,
          rtsp_port: rtsp_port,
          enjoy_facilities_ids: enjoy_facilities_ids.join(","),
          service_port: service_port,
          ord: ord
        }).then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.isChange = true
            this.$message.success('修改成功')
            this.dialogVisible = false
            this.clearData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 添加海康威视安防平台设备
    addHikvision (row) {
      if (this.hikvisionForm.rs_facilities_id === '') {
        this.$message.error('请选择地块')
        return
      } else if (row.name === '') {
        this.$message.error('请输入设备名称')
        return
      }
      addHikvisionDevice({
        rs_facilities_id: this.hikvisionForm.rs_facilities_id,
        share_sta: this.hikvisionForm.share_sta,
        host: this.hikvisionForm.host,
        appKey: this.hikvisionForm.appKey,
        appSecret: this.hikvisionForm.appSecret,
        transportProtocol: this.hikvisionForm.transportProtocol,
        cameraIndexCode: row.cameraIndexCode,
        name: row.cameraName
      }).then(res => {
        if (res.code === 200) {
          this.$set(row, 'isAdd', true)
          this.isChange = true
          this.$message.success('添加成功!')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 类型改变
    typeChange () {
      if (this.sxt_type === '0') {
        this.sxt_type_name = '农语云'
        this.activeName = 'first'
      } else if (this.sxt_type === '1') {
        this.sxt_type_name = '萤石云'
        this.activeName = 'first'
      } else if (this.sxt_type === '3') {
        this.sxt_type_name = '海康安防平台'
        this.activeName = 'first'
      } else if (this.sxt_type === '4') {
        this.sxt_type_name = '乐橙云'
        this.activeName = 'first'
      }
    },
    // 获取地块列表
    getFacilities () {
      findByBs_base_id({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.code === 200) {
          this.facilities = res.data
          if (this.facilities.length !== 0) {
            if (this.id !== '') { return }
            this.sxtForm.rs_facilities_id = this.facilities[0].id
            this.hikvisionForm.rs_facilities_id = this.facilities[0].id
          } else {
            this.$message.warning('该基地无地块,请先添加一个地块!')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取设备信息(修改页面)
    getDeviceData (hd_device_id) {
      getDetailById({ hd_device_id: hd_device_id }).then(res => {
        if (res.code === 200) {
          this.id = res.data.id
          const comm_json = JSON.parse(res.data.communication)
          this.communication = comm_json
          if (this.communication.presets) { this.presets = this.communication.presets }
          var type = comm_json.type

          var enjoy_facilities_ids = [];
          var enjoy_rs_facilities = res.data.enjoy_rs_facilities;
          for (var i = 0, len = enjoy_rs_facilities.length; i < len; i++) {
            enjoy_facilities_ids.push(enjoy_rs_facilities[i].id);
          }

          if (type === 'JK-SXT' || type === 'JK-SXT2' || type === 'JK-SXT4') { // 萤石云平台 || 乐橙云平台
            if (type === 'JK-SXT') {
              this.sxt_type = '1'
            } else if (type === 'JK-SXT2') {
              this.sxt_type = '2'
            } else if (type === 'JK-SXT4') {
              this.sxt_type = '4'
            }
            this.sxtForm.id = res.data.id
            this.sxtForm.device_id = res.data.device_id
            this.sxtForm.name = res.data.name
            this.sxtForm.rs_facilities_id = res.data.rs_facilities_id
            this.sxtForm.share_sta = res.data.share_sta
            this.sxtForm.encrypt = comm_json.config.encrypt === null ? 0 : comm_json.config.encrypt
            this.sxtForm.deviceSerial = comm_json.config.deviceSerial
            this.sxtForm.validateCode = comm_json.config.validateCode
            this.sxtForm.longitude = res.data.longitude
            this.sxtForm.latitude = res.data.latitude
            this.sxtForm.ip = comm_json.config.ip
            this.sxtForm.username = comm_json.config.username
            this.sxtForm.password = comm_json.config.password
            this.sxtForm.http_port = comm_json.config.http_port
            this.sxtForm.rtsp_port = comm_json.config.rtsp_port
            this.sxtForm.service_port = comm_json.config.service_port
            this.sxtForm.state = res.data.state
            this.sxtForm.enjoy_facilities_ids = enjoy_facilities_ids
            this.sxtForm.ord = res.data.ord
          } else if (type === 'JK-SXT3') { // 海康威视安防系统
            this.sxt_type = '3'
            this.hikvisionForm.id = res.data.id
            this.hikvisionForm.device_id = res.data.device_id
            this.hikvisionForm.name = res.data.name
            this.hikvisionForm.rs_facilities_id = res.data.rs_facilities_id
            this.hikvisionForm.share_sta = res.data.share_sta
            this.hikvisionForm.host = comm_json.config.host
            this.hikvisionForm.appKey = comm_json.config.appKey
            this.hikvisionForm.appSecret = comm_json.config.appSecret
            this.hikvisionForm.transportProtocol = comm_json.config.transportProtocol
            this.hikvisionForm.cameraIndexCode = comm_json.config.cameraIndexCode
            this.hikvisionForm.ip = comm_json.config.ip
            this.hikvisionForm.username = comm_json.config.username
            this.hikvisionForm.password = comm_json.config.password
            this.hikvisionForm.http_port = comm_json.config.http_port
            this.hikvisionForm.rtsp_port = comm_json.config.rtsp_port
            this.hikvisionForm.service_port = comm_json.config.service_port
            this.hikvisionForm.longitude = res.data.longitude
            this.hikvisionForm.latitude = res.data.latitude
            this.hikvisionForm.enjoy_facilities_ids = enjoy_facilities_ids
            this.hikvisionForm.ord = res.data.ord
          } else {
            this.$message.error('未能成功识别出摄像头类型')
            return
          }
          this.typeChange()
          this.dialogVisible = true
          this.getFacilities()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 海康威视安防平台视频列表
    getHikvisionList () {
      if (this.hikvisionForm.host === '') {
        this.$message.error('网关服务器ip端口不能为空')
        return
      } else if (this.hikvisionForm.appKey === '') {
        this.$message.error('秘钥appkey不能为空')
        return
      } else if (this.hikvisionForm.appSecret === '') {
        this.$message.error('秘钥appSecret不能为空')
        return
      }
      hikvisionList({
        host: this.hikvisionForm.host,
        appKey: this.hikvisionForm.appKey,
        appSecret: this.hikvisionForm.appSecret,
        transportProtocol: this.hikvisionForm.transportProtocol,
        page: this.hikvisionForm.pageNo,
        size: this.hikvisionForm.pageSize
      }).then(res => {
        if (res.code === 200) {
          res.data.content
          this.$set(this, 'hikvisionList', res.data.content)
          this.$set(this.hikvisionForm, 'total', res.data.totalElements)
          this.$message.success('获取列表成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    checkSerial () {
      if (this.sxt_type === '1' && this.sxtForm.deviceSerial.length !== 9) {
        this.$message.error('海康设备序列号为9位!')
      }
    }
  }
}
</script>
