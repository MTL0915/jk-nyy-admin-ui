<template>
  <div>
    <el-dialog
      append-to-body
      title="修改模板"
      :visible.sync="dialogVisible"
      :close="closeDialog"
      fullscreen
    >
      <!-- 模板配置 -->
      <div v-if="customBase">
        <!-- <div style="text-align: center;font-size:30px;">

        </div> -->
        <div style="display:flex;margin-top:20px;">
          <div style="width:50%;border: 1px solid rgba(0, 0, 0, 0.17);padding: 10px;">
            <span style="font-size:33px;">模板配置</span>
            <div
              style="margin-top:15px;"
              v-if="!isNull && customBase.config && customBase.config.length!==0"
            >
              <div style="text-align: center;">
                模板名称
                <el-input
                  v-model="customBase.cb_name"
                  style="width:200px;"
                />
              </div>
              <el-tabs>
                <el-tab-pane
                  label="登录页配置"
                  v-if="customBase.config2"
                >
                  <div style="height:550px;overflow:auto;">
                    <!-- 标题 -->
                    <el-row v-if="customBase.config2.mainTitle">
                      <div style="font-size:25px;">{{customBase.config2.mainTitle.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.mainTitle.config2.text"
                          style="width:20%;display:inline-block"
                        >
                          <p>{{customBase.config2.mainTitle.config2.text.name}}：</p>
                          <el-input v-model="customBase.config2.mainTitle.config2.text.value" />
                        </div>
                        <div
                          v-if="customBase.config2.mainTitle.config2.fontSize"
                          style="width:20%;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.mainTitle.config2.fontSize.name}}：</p>
                          <el-input-number
                            v-model="customBase.config2.mainTitle.config2.fontSize.value"
                            :min="16"
                            :max="100"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.mainTitle.config2.color"
                          style="width:60px;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.mainTitle.config2.color.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.mainTitle.config2.color.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.mainTitle.config2.backgroundColor"
                          style="width:60px;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.mainTitle.config2.backgroundColor.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.mainTitle.config2.backgroundColor.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.mainTitle.config2.backgroundImage"
                          style="width:20%;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.mainTitle.config2.backgroundImage.name}}：</p>
                          <el-upload
                            :show-file-list="false"
                            :on-change="handleChangeBack.bind(this,customBase.config2.mainTitle)"
                            :before-upload="beforeAvatarUpload"
                            class="avatar-uploader"
                            style="width:40px;"
                            action="' '"
                          >
                            <img
                              v-if="customBase.config2.mainTitle.pic"
                              :src="customBase.config2.mainTitle.pic"
                              class="avatar_"
                            >
                            <i
                              v-else
                              class="el-icon-plus avatar-uploader-icon_"
                            />
                          </el-upload>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="restoreDefault(customBase.config2.mainTitle)"
                          >恢复默认</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="clearImg(customBase.config2.mainTitle)"
                          >清除图片</el-button>
                        </div>
                      </div>
                    </el-row>
                    <!-- 副标题 -->
                    <el-row
                      v-if="customBase.config2.subTitle"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.subTitle.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.subTitle.config2.text"
                          style="width:20%;display:inline-block"
                        >
                          <p>{{customBase.config2.subTitle.config2.text.name}}：</p>
                          <el-input v-model="customBase.config2.subTitle.config2.text.value" />
                        </div>
                        <div
                          v-if="customBase.config2.subTitle.config2.fontSize"
                          style="width:20%;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.subTitle.config2.fontSize.name}}：</p>
                          <el-input-number
                            v-model="customBase.config2.subTitle.config2.fontSize.value"
                            :min="16"
                            :max="100"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.subTitle.config2.color"
                          style="width:60px;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.subTitle.config2.color.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.subTitle.config2.color.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.subTitle.config2.backgroundColor"
                          style="width:60px;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.subTitle.config2.backgroundColor.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.subTitle.config2.backgroundColor.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                        <div
                          v-if="customBase.config2.subTitle.config2.backgroundImage"
                          style="width:20%;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.subTitle.config2.backgroundImage.name}}：</p>
                          <el-upload
                            :show-file-list="false"
                            :on-change="handleChangeBack.bind(this,customBase.config2.subTitle)"
                            :before-upload="beforeAvatarUpload"
                            class="avatar-uploader"
                            style="width:40px;"
                            action="' '"
                          >
                            <img
                              v-if="customBase.config2.subTitle.pic"
                              :src="customBase.config2.subTitle.pic"
                              class="avatar_"
                            >
                            <i
                              v-else
                              class="el-icon-plus avatar-uploader-icon_"
                            />
                          </el-upload>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="restoreDefault(customBase.config2.subTitle)"
                          >恢复默认</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="clearImg(customBase.config2.subTitle)"
                          >清除图片</el-button>
                        </div>
                      </div>
                    </el-row>
                    <!-- 登录按钮 -->
                    <el-row
                      v-if="customBase.config2.loginColor"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.loginColor.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.loginColor.config2.backgroundColor"
                          style="width:60px;display:inline-block;"
                        >
                          <p>{{customBase.config2.loginColor.config2.backgroundColor.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.loginColor.config2.backgroundColor.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                      </div>
                    </el-row>
                    <!-- Logo -->
                    <el-row
                      v-if="customBase.config2.logo"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.logo.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.logo.config2.backgroundImage"
                          style="width:30%;display:inline-block;"
                        >
                          <p>{{customBase.config2.logo.config2.backgroundImage.name}}：</p>
                          <el-upload
                            :show-file-list="false"
                            :on-change="handleChangeBack.bind(this,customBase.config2.logo)"
                            :before-upload="beforeAvatarUpload"
                            class="avatar-uploader"
                            style="width:40px;"
                            action="' '"
                          >
                            <img
                              v-if="customBase.config2.logo.pic"
                              :src="customBase.config2.logo.pic"
                              class="avatar_"
                              style="width:40px;"
                            >
                            <i
                              v-else
                              style="width:40px;"
                              class="el-icon-plus avatar-uploader-icon_"
                            />
                          </el-upload>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="restoreDefault(customBase.config2.logo)"
                          >恢复默认</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="clearImg(customBase.config2.logo)"
                          >清除图片</el-button>
                        </div>
                      </div>
                    </el-row>
                    <!-- 背景图-->
                    <el-row
                      v-if="customBase.config2.background"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.background.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.background.config2.backgroundImage"
                          style="width:20%;display:inline-block;"
                        >
                          <p>{{customBase.config2.background.config2.backgroundImage.name}}：</p>
                          <el-upload
                            :show-file-list="false"
                            :on-change="handleChangeBack.bind(this,customBase.config2.background)"
                            :before-upload="beforeAvatarUpload"
                            class="avatar-uploader"
                            style="width:40px;"
                            action="' '"
                          >
                            <img
                              v-if="customBase.config2.background.pic"
                              :src="customBase.config2.background.pic"
                              class="avatar"
                            >
                            <i
                              v-else
                              class="el-icon-plus avatar-uploader-icon"
                            />
                          </el-upload>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="restoreDefault(customBase.config2.background)"
                          >恢复默认</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="clearImg(customBase.config2.background)"
                          >清除图片</el-button>
                        </div>
                      </div>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="首页配置">
                  <div style="height:400px;overflow:auto;">
                    <el-row
                      v-if="customBase.config2.documentTitle"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.documentTitle.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.documentTitle.config2.text"
                          style="width:20%;display:inline-block"
                        >
                          <p>{{customBase.config2.documentTitle.config2.text.name}}：</p>
                          <el-input v-model="customBase.config2.documentTitle.config2.text.value" />
                        </div>
                      </div>
                    </el-row>
                    <el-row
                      v-if="customBase.config2.sidebarBgc"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.sidebarBgc.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">

                        <div
                          v-if="customBase.config2.sidebarBgc.config2.backgroundColor"
                          style="width:20%;display:inline-block"
                        >
                          <p>{{customBase.config2.sidebarBgc.config2.backgroundColor.name}}：</p>
                          <el-color-picker
                            style="width:100%;"
                            v-model="customBase.config2.sidebarBgc.config2.backgroundColor.value"
                            show-alpha
                            :predefine="predefineColors"
                          />
                        </div>
                      </div>
                    </el-row>
                    <el-row
                      v-if="customBase.config2.indexTitle"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.indexTitle.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.indexTitle.config2.text"
                          style="width:20%;display:inline-block"
                        >
                          <p>{{customBase.config2.indexTitle.config2.text.name}}：</p>
                          <el-input v-model="customBase.config2.indexTitle.config2.text.value" />
                        </div>
                        <div
                          v-if="customBase.config2.indexTitle.config2.fontSize"
                          style="width:20%;display:inline-block;margin-left:15px;"
                        >
                          <p>{{customBase.config2.indexTitle.config2.fontSize.name}}：</p>
                          <el-input-number
                            v-model="customBase.config2.indexTitle.config2.fontSize.value"
                            :min="12"
                            :max="26"
                          />
                        </div>
                      </div>
                    </el-row>
                    <el-row
                      v-if="customBase.config2.indexLogo"
                      style="margin-top:15px;"
                    >
                      <div style="font-size:25px;">{{customBase.config2.indexLogo.cff_name}} 配置</div>
                      <div style="margin-top:15px;display:flex;align-items:center;">
                        <div
                          v-if="customBase.config2.indexLogo.config2.backgroundImage"
                          style="width:20%;display:inline-block;"
                        >
                          <p>{{customBase.config2.indexLogo.config2.backgroundImage.name}}：</p>
                          <el-upload
                            :show-file-list="false"
                            :on-change="handleChangeBack.bind(this,customBase.config2.indexLogo)"
                            :before-upload="beforeAvatarUpload"
                            class="avatar-uploader"
                            style="width:40px;"
                            action="' '"
                          >
                            <img
                              v-if="customBase.config2.indexLogo.pic"
                              :src="customBase.config2.indexLogo.pic"
                              class="avatar_"
                              style="width:40px;"
                            >
                            <i
                              v-else
                              style="width:40px;"
                              class="el-icon-plus avatar-uploader-icon_"
                            />
                          </el-upload>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="restoreDefault(customBase.config2.indexLogo)"
                          >恢复默认</el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="clearImg(customBase.config2.indexLogo)"
                          >清除图片</el-button>
                        </div>
                      </div>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!-- <el-tabs>
              <el-tab-pane
                v-for="(item, index) in customBase.config"
                :key="index"
                :label="item.cff_name"
              >
                <div style="margin-top: 25px;font-size:20px;">{{item.cff_name+' 配置'}}</div>
                <div
                  v-if="item.cf_id === cf_id"
                  style="margin-top: 15px;height:500px;"
                >
                  <div
                    style="width:50%;display:inline-block"
                    v-for="(item2, index2) in item.cff_config"
                    :key="index2"
                  >
                    <div
                      v-if="item2.property==='text'"
                      style="height:100px;"
                    >
                      {{item2.name}}：
                      <el-input
                        style="width:300px"
                        v-model="item.cbf_data[item2.data]"
                        clearable
                      />
                    </div>
                    <div
                      v-else-if="item2.property==='color'"
                      style="height:100px;"
                    >
                      {{item2.name}}：
                      <el-color-picker
                        v-model="item.cbf_data[item2.data]"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                    <div
                      v-else-if="item2.property==='img'"
                      style="height:300px;"
                    >
                      {{item2.name}}：
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,item)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        action="' '"
                      >
                        <img
                          v-if="item.pic"
                          :src="item.pic"
                          class="avatar"
                        >
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon"
                        />
                      </el-upload>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="restoreDefault(item)"
                      >恢复默认</el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="clearImg(item)"
                      >清除图片</el-button>
                    </div>
                    <div
                      v-else-if="item2.property==='number'"
                      style="height:100px;"
                    >
                      {{item2.name}}：
                      <el-input-number
                        v-model="item.cbf_data[item2.data]"
                        :min="16"
                        :max="100"
                      />
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs> -->
            </div>
            <div
              style="font-size: 30px;margin-top: 140px;"
              v-else
            >
              该模板暂无可配置项
            </div>
          </div>
          <div style="width:50%;margin-left:15px;border: 1px solid rgba(0, 0, 0, 0.17);padding: 10px;">
            <span style="font-size:33px;">模板预览</span>
            <loginIframe
              ref="laborAgree"
              style="margin-top:15px;"
              :custom_base_id="custom_base_id"
              :sx="sx"
            />
          </div>
        </div>
        <div style="margin-top:30px;text-align:right;">
          <!-- <el-button
            @click="changeFormwork"
            type="success"
          >模板转换</el-button> -->
          <el-button
            @click="preview"
            type="success"
            :loading="buttomLoading"
          >
            预览</el-button>
          <el-button
            @click="update"
            type="primary"
            :loading="buttomLoading"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :title="showFormwork?'选择模板':'提示'"
      append-to-body
      :visible.sync="changeFormworkVisible"
    >
      <div v-show="!showFormwork">
        <div style="text-align: center;font-size: 30px;">
          <span>提示：模板之间内容可能不一致，是否进行转换</span>
        </div>
        <div style="text-align: right; margin-top: 15px;">
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="changeFormworkVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="showFormworkList"
            >确 定</el-button>
          </span>
        </div>
      </div>
      <div v-show="showFormwork">
        <div style="text-align: right;margin-right: 15px;">
          <!-- 搜索框 -->
          <el-input
            size="mini"
            style="width:200px;"
            v-model="keyword"
            clearable
          />
          <el-button
            type="success"
            size="mini"
            @click="search"
          >搜索</el-button>
        </div>
        <el-table
          :data="formworkList"
          style="width: 100%"
        >
          <el-table-column label="示例图">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="getLogo(scope.row.image_path)"
                :preview-src-list="[getLogo(scope.row.image_path)]"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
          > </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="chooseFormwork(scope.row.id)"
                size="mini"
              >选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="size"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { customFormworkList, getCustomFormwork, getCustomBaseById, clearCustomBaseImage } from '@/api/custom_base'
import loginIframe from "./loginIframe"
import { getToken } from '@/utils/auth'
import bus from "@/components/common/bus.js";

export default {
  components: {
    loginIframe
  },
  data () {
    return {
      sx: 0,
      custom_base_id: null,
      customBase: null,
      dialogVisible: false,
      changeFormworkVisible: false,
      showFormwork: false,
      formworkList: [],
      keyword: '',
      page: 1,
      size: 10,
      total: 0,
      isNull: false,
      cf_id: null,
      buttomLoading: false
    }
  },
  methods: {
    preview () {
      this.update(true)
    },
    update (yl) {
      if (!this.customBase.cb_name) {
        this.$message.error('请输入名称!')
        return
      }
      var formData = new FormData()
      formData.append('id', this.customBase.cb_id)
      formData.append('name', this.customBase.cb_name)
      formData.append('custom_formwork_id', this.customBase.cf_id)
      const _this = this

      _this.customBase.config.map(v => {
        if (v.cf_id === _this.cf_id) {
          const b = _this.customBase.config2[v.cff_code]
          b.cff_config.map(p => {
            if (p.data, b.config2[p.data].value) {
              formData.append(b.cff_code + '-' + p.data, b.config2[p.data].value)
            }
          })
        }
      })
      this.buttomLoading = true



      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/custom/base/update', formData, config).then(res => {
        this.buttomLoading = false
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          if (yl === true) {
            this.sx = this.sx + 1
          } else {
            //用于修改首页字体时，关闭弹窗，刷新页面获取修改后的效果
            bus.$emit("getBaseList");
            this.closeDialog()
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    changeFormwork () {
      this.changeFormworkVisible = true
    },
    search () {
      this.page = 1
      this.customFormworkList()
    },
    //选择模板
    chooseFormwork (id) {
      getCustomFormwork({ id: id }).then(res => {
        if (res.code === 200) {
          this.cf_id = id
          var nConfig = res.data.config
          var oConfig = this.customBase.config
          this.customBase.cf_id = res.data.id
          this.customBase.cf_image_path = res.data.image_path

          if (nConfig.length !== 0) {
            //旧->新
            for (var i = 0; i < nConfig.length; i++) {
              var oldLength = oConfig.length
              nConfig[i].config = JSON.parse(nConfig[i].config)
              nConfig[i].data = JSON.parse(nConfig[i].data)
              for (var j = 0; j <= oldLength; j++) {
                if (j == oConfig.length) {
                  var d = {}
                  d.cff_code = nConfig[i].code
                  d.cff_name = nConfig[i].name
                  d.cf_id = nConfig[i].cf_id
                  d.cbf_data = nConfig[i].data
                  d.cff_config = nConfig[i].config
                  this.customBase.config.push(d)
                } else if (nConfig[i].code === oConfig[j].cff_code) {
                  this.customBase.config[j].cff_name = nConfig[i].name
                  this.customBase.config[j].cf_id = nConfig[i].cf_id
                  this.customBase.config[j].cff_config = nConfig[i].config
                  break
                }
              }
            }
            for (var k = this.customBase.config.length - 1; k >= 0; k--) {
              if (this.cf_id !== this.customBase.config[k].cf_id) {
                this.customBase.config.splice(k, 1)
              }
            }
            this.isNull = false
          } else {
            this.isNull = true
          }
          this.keyword = ''
          this.page = 1
          this.showFormwork = false
          this.changeFormworkVisible = false
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //模板列表
    customFormworkList () {
      customFormworkList({ keyword: this.keyword, page: this.page - 1, size: this.size }).then(res => {
        if (res.code === 200) {
          this.formworkList = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    //翻页
    handleCurrentChange (val) {
      this.page = val
      this.customFormworkList()
    },
    showDialog (id) {
      this.custom_base_id = id
      getCustomBaseById({ custom_base_id: id }).then(res => {
        if (res.code === 200) {

          const _this = this
          res.data.config.map(v => {
            v.cbf_data = JSON.parse(v.cbf_data)
            v.cff_data = JSON.parse(v.cff_data)
            v.cff_config = JSON.parse(v.cff_config)

            if (v.cbf_data['backgroundImage']) {
              v.pic = _this.getLogo(v.cbf_data['backgroundImage'])
            }
          })
          this.cf_id = res.data.cf_id
          this.mbTransition(res.data)
          this.dialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    mbTransition (mb) {

      let config2 = {}
      mb.config.map(v => {
        let config3 = {}
        v.cff_config.map(p => {
          p.value = v.cbf_data[p.data]
          config3[p.data] = p
        })
        v.config2 = config3
        config2[v.cff_code] = v
      })
      mb.config2 = config2

      this.customBase = mb
    },
    //展示模板
    showFormworkList () {
      this.showFormwork = true
      this.customFormworkList()
    },
    //关闭弹窗
    closeDialog () {
      this.customBase = null
      this.dialogVisible = false
      this.changeFormworkVisible = false
      this.showFormwork = false
      this.formworkList = []
      this.keyword = ''
      this.page = 1
      this.size = 10
      this.total = 0
      this.isNull = false
      this.$parent.customBaseList()
    },
    //清除图片
    clearImg (item) {
      this.$set(item.config2.backgroundImage, 'value', null)
      this.$set(item, 'pic', null)
    },
    //恢复默认
    restoreDefault (item) {
      this.$set(item.config2.backgroundImage, 'value', item.cff_data.backgroundImage)
      this.$set(item, 'pic', item.cff_data.backgroundImage)
    },
    handleChangeBack (item, file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        file = null
      } else {
        this.$set(item, 'pic', URL.createObjectURL(file.raw))
        this.$set(item.config2.backgroundImage, 'value', file.raw)
        this.$forceUpdate()
      }
    },
    getLogo (img) {
      if (img === null || img === "") {
        return ""
      } else if (img.indexOf('http://') !== -1 || img.indexOf('https://') !== -1) {
        return img
      }
      return process.env.IMG_URL + img
    },
    beforeAvatarUpload (file) {
      return false
    },
  }
}
</script>

<style lang="stylus" scoped>
.main
  background #ffffff
  width 100%
  padding 10px

/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  verflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.avatar-uploader-icon_
  font-size 28px
  color #8c939d
  width 178px
  height 40px
  line-height 40px
  text-align center

.avatar
  width 178px
  height 178px
  display block

.avatar_
  width 178px
  height 40px
  display block

.dk-div
  margin-left 0px
  height 582px
  overflow hidden
  padding 15px
</style>