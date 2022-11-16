<template>
  <el-dialog
    append-to-body
    title="新增模板"
    :visible.sync="dialogVisible"
    :close="closeDialog"
  >
    <!-- <el-steps
      :active="step"
      finish-status="success"
    >
      <el-step title="选择模板"></el-step>
      <el-step title="模板配置 "></el-step>
      <el-step title="完成配置"></el-step>
    </el-steps> -->
    <!-- 选择模板 -->
    <div v-show="step === 0">
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
    <!-- 模板配置 -->
    <div v-if="step === 1 && formwork!==null">
      <div style="text-align: center;font-size:30px;"> {{formwork.name}}</div>
      <div>
        <div style="text-align: center;">
          <el-image
            style="width: 400px; height: 300px"
            :src="getLogo(formwork.image_path)"
            :preview-src-list="[getLogo(formwork.image_path)]"
          />
        </div>
        <div
          style="margin-top:20px;"
          v-if="formwork.config && formwork.config.length!==0"
        >
          <el-tabs>
            <el-tab-pane
              label="登录页配置"
              v-if="formwork.config2"
            >
              <div style="height:400px;overflow:auto;">
                <!-- 标题 -->
                <el-row v-if="formwork.config2.mainTitle">
                  <div style="font-size:25px;">{{formwork.config2.mainTitle.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.mainTitle.config2.text"
                      style="width:20%;display:inline-block"
                    >
                      <p>{{formwork.config2.mainTitle.config2.text.name}}：</p>
                      <el-input v-model="formwork.config2.mainTitle.config2.text.value" />
                    </div>
                    <div
                      v-if="formwork.config2.mainTitle.config2.fontSize"
                      style="width:20%;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.mainTitle.config2.fontSize.name}}：</p>
                      <el-input-number
                        v-model="formwork.config2.mainTitle.config2.fontSize.value"
                        :min="16"
                        :max="100"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.mainTitle.config2.color"
                      style="width:60px;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.mainTitle.config2.color.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.mainTitle.config2.color.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.mainTitle.config2.backgroundColor"
                      style="width:60px;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.mainTitle.config2.backgroundColor.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.mainTitle.config2.backgroundColor.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.mainTitle.config2.backgroundImage"
                      style="width:20%;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.mainTitle.config2.backgroundImage.name}}：</p>
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,formwork.config2.mainTitle)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        style="width:40px;"
                        action="' '"
                      >
                        <img
                          v-if="formwork.config2.mainTitle.pic"
                          :src="formwork.config2.mainTitle.pic"
                          class="avatar_"
                        >
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon_"
                        />
                      </el-upload>
                    </div>
                  </div>
                </el-row>
                <!-- 副标题 -->
                <el-row
                  v-if="formwork.config2.subTitle"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.subTitle.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.subTitle.config2.text"
                      style="width:20%;display:inline-block"
                    >
                      <p>{{formwork.config2.subTitle.config2.text.name}}：</p>
                      <el-input v-model="formwork.config2.subTitle.config2.text.value" />
                    </div>
                    <div
                      v-if="formwork.config2.subTitle.config2.fontSize"
                      style="width:20%;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.subTitle.config2.fontSize.name}}：</p>
                      <el-input-number
                        v-model="formwork.config2.subTitle.config2.fontSize.value"
                        :min="16"
                        :max="100"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.subTitle.config2.color"
                      style="width:60px;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.subTitle.config2.color.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.subTitle.config2.color.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.subTitle.config2.backgroundColor"
                      style="width:60px;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.subTitle.config2.backgroundColor.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.subTitle.config2.backgroundColor.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                    <div
                      v-if="formwork.config2.subTitle.config2.backgroundImage"
                      style="width:20%;display:inline-block;margin-left:15px;"
                    >
                      <p>{{formwork.config2.subTitle.config2.backgroundImage.name}}：</p>
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,formwork.config2.subTitle)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        style="width:40px;"
                        action="' '"
                      >
                        <img
                          v-if="formwork.config2.subTitle.pic"
                          :src="formwork.config2.subTitle.pic"
                          class="avatar_"
                        >
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon_"
                        />
                      </el-upload>
                    </div>
                  </div>
                </el-row>
                <!-- 登录按钮 -->
                <el-row
                  v-if="formwork.config2.loginColor"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.loginColor.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.loginColor.config2.backgroundColor"
                      style="width:60px;display:inline-block;"
                    >
                      <p>{{formwork.config2.loginColor.config2.backgroundColor.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.loginColor.config2.backgroundColor.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                  </div>
                </el-row>
                <!-- Logo -->
                <el-row
                  v-if="formwork.config2.logo"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.logo.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.logo.config2.backgroundImage"
                      style="width:20%;display:inline-block;"
                    >
                      <p>{{formwork.config2.logo.config2.backgroundImage.name}}：</p>
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,formwork.config2.logo)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        style="width:40px;"
                        action="' '"
                      >
                        <img
                          v-if="formwork.config2.logo.pic"
                          :src="formwork.config2.logo.pic"
                          class="avatar_"
                          style="width:40px;"
                        >
                        <i
                          v-else
                          style="width:40px;"
                          class="el-icon-plus avatar-uploader-icon_"
                        />
                      </el-upload>
                    </div>
                  </div>
                </el-row>
                <!-- 背景图-->
                <el-row
                  v-if="formwork.config2.background"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.background.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.background.config2.backgroundImage"
                      style="width:20%;display:inline-block;"
                    >
                      <p>{{formwork.config2.background.config2.backgroundImage.name}}：</p>
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,formwork.config2.background)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        style="width:40px;"
                        action="' '"
                      >
                        <img
                          v-if="formwork.config2.background.pic"
                          :src="formwork.config2.background.pic"
                          class="avatar"
                        >
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon"
                        />
                      </el-upload>
                      <!-- <el-button
                        type="primary"
                        size="mini"
                        @click="restoreDefault(formwork.config2.background)"
                      >恢复默认</el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="clearImg(formwork.config2.background)"
                      >清除图片</el-button> -->
                    </div>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="首页配置">
              <div style="height:400px;overflow:auto;">
                <el-row
                  v-if="formwork.config2.documentTitle"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.documentTitle.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.documentTitle.config2.text"
                      style="width:20%;display:inline-block"
                    >
                      <p>{{formwork.config2.documentTitle.config2.text.name}}：</p>
                      <el-input v-model="formwork.config2.documentTitle.config2.text.value" />
                    </div>
                  </div>
                </el-row>
                <el-row
                  v-if="formwork.config2.sidebarBgc"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.sidebarBgc.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.sidebarBgc.config2.backgroundColor"
                      style="width:20%;display:inline-block"
                    >
                      <p>{{formwork.config2.sidebarBgc.config2.backgroundColor.name}}：</p>
                      <el-color-picker
                        style="width:100%;"
                        v-model="formwork.config2.sidebarBgc.config2.backgroundColor.value"
                        show-alpha
                        :predefine="predefineColors"
                      />
                    </div>
                  </div>
                </el-row>
                <el-row
                  v-if="formwork.config2.indexTitle"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.indexTitle.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.indexTitle.config2.text"
                      style="width:20%;display:inline-block"
                    >
                      <p>{{formwork.config2.indexTitle.config2.text.name}}：</p>
                      <el-input v-model="formwork.config2.indexTitle.config2.text.value" />
                    </div>
                  </div>
                </el-row>
                <el-row
                  v-if="formwork.config2.indexLogo"
                  style="margin-top:15px;"
                >
                  <div style="font-size:25px;">{{formwork.config2.indexLogo.name}} 配置</div>
                  <div style="margin-top:15px;display:flex;align-items:center;">
                    <div
                      v-if="formwork.config2.indexLogo.config2.backgroundImage"
                      style="width:20%;display:inline-block;"
                    >
                      <p>{{formwork.config2.indexLogo.config2.backgroundImage.name}}：</p>
                      <el-upload
                        :show-file-list="false"
                        :on-change="handleChangeBack.bind(this,formwork.config2.indexLogo)"
                        :before-upload="beforeAvatarUpload"
                        class="avatar-uploader"
                        style="width:40px;"
                        action="' '"
                      >
                        <img
                          v-if="formwork.config2.indexLogo.pic"
                          :src="formwork.config2.indexLogo.pic"
                          class="avatar_"
                          style="width:40px;"
                        >
                        <i
                          v-else
                          style="width:40px;"
                          class="el-icon-plus avatar-uploader-icon_"
                        />
                      </el-upload>
                    </div>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- <el-tabs>
            <el-tab-pane
              v-for="(item, index) in formwork.config"
              :key="index"
              :label="item.name"
            >
              <div style="margin-top: 15px;height:500px;">
                <div
                  style="width:50%;display:inline-block"
                  v-for="(item2, index2) in item.config"
                  :key="index2"
                >
                  <div
                    v-if="item2.property==='text'"
                    style="height:100px;"
                  >
                    {{item2.name}}：
                    <el-input
                      style="width:300px"
                      v-model="item.data[item2.data]"
                      clearable
                    />
                  </div>
                  <div
                    v-else-if="item2.property==='color'"
                    style="height:100px;"
                  >
                    {{item2.name}}：
                    <el-color-picker
                      v-model="item.data[item2.data]"
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
                      @click="clearImg(item)"
                      type="danger"
                      size="mini"
                    >清除图片</el-button>
                  </div>
                  <div
                    v-else-if="item2.property==='number'"
                    style="height:100px;"
                  >
                    {{item2.name}}：
                    <el-input-number
                      v-model="item.data[item2.data]"
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
      <div style="text-align: center;margin-top:30px;">
        <el-button-group>
          <el-button
            size="mini"
            icon="el-icon-arrow-left"
            @click="last"
          >上一步</el-button>
          <el-button
            type="primary"
            @click="next"
            size="mini"
          >下一步<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 完成配置 -->
    <div
      style="text-align: center;"
      v-show="step===2"
    >
      <div style="margin-top: 20px;">
        模板名称：
        <el-input
          size="mini"
          v-model="name"
          style="width:200px"
        />
      </div>
      <div style="margin-top: 20px;">
        应用范围：
        <el-select
          size="mini"
          v-model="addType"
          placeholder="请选择"
          style="width:200px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 20px;">
        个性化登录地址：https://{{DOMAIN}}?basecode={{basecode}}
      </div>
      <div style="margin-top: 30px;">
        <el-button
          size="mini"
          icon="el-icon-arrow-left"
          @click="last"
        >上一步</el-button>
        <el-button
          type="success"
          size="mini"
          @click="add(0)"
        >仅添加</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="add(1)"
        >添加并使用</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { customFormworkList, getCustomFormwork } from "@/api/custom_base"
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      addType: 1,
      dialogVisible: false,
      step: 0, //步数
      formworkList: [], //模板列表
      formwork: null, //选择模板
      keyword: "",
      page: 1,
      size: 10,
      total: 0,
      name: '',//个性化名称
      typeOptions: [
        {
          label: "当前基地",
          value: 1
        },
        {
          label: "当前组织下的基地",
          value: 2
        },
        {
          label: "当前组织及子组织下的基地",
          value: 3
        },
      ],
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c71445'
      ],
      DOMAIN: process.env.DOMAIN
    };
  },
  props: {
    orgid: {
      type: Number,
      default: null
    },
    baseid: {
      type: String,
      default: null
    },
    basecode: {
      type: String,
      default: null
    }
  },
  methods: {
    // //清除图片
    // clearImg (item) {
    //   this.$set(item.data, 'backgroundImage', null)
    //   this.$set(item, 'pic', null)
    // },
    // //恢复默认
    // restoreDefault (item) {
    //   if (item.cff_data.backgroundImage) {
    //     this.$set(item.cbf_data, 'backgroundImage', item.cff_data.backgroundImage)
    //     this.$set(item, 'pic', item.cff_data.backgroundImage)
    //   }
    // },
    //关闭弹窗
    closeDialog () {
      this.addType = 1
      this.dialogVisible = false
      this.step = 0 //步数
      this.formworkList = [] //模板列表
      this.formwork = null //选择模板
      this.keyword = ""
      this.page = 1
      this.size = 10
      this.total = 0
      this.name = ''//个性化名称
      this.$parent.customBaseList()
    },
    //添加
    add (sta) {
      if (!this.name) {
        this.$message.error('请输入名称!')
        return
      }
      var formData = new FormData()
      formData.append('bs_org_id', this.orgid)
      formData.append('bs_base_id', this.baseid)
      formData.append('name', this.name)
      formData.append('type', this.addType)
      formData.append('sta', sta)
      formData.append('custom_formwork_id', this.formwork.id)
      const _this = this
      _this.formwork.config.map(v => {
        const b = _this.formwork.config2[v.code]
        b.config.map(p => {
          if (b.config2[p.data].value) {
            formData.append(b.code + '-' + p.data, b.config2[p.data].value)
          }
        })
      })
      // if (this.formwork.config && this.formwork.config.length !== 0) {
      //   for (var i = 0; i < this.formwork.config.length; i++) {
      //     var setting = this.formwork.config[i]
      //     var c = setting.config
      //     for (var j = 0; j < c.length; j++) {
      //       if (setting.data[c[j].data]) {
      //         formData.append(setting.code + '-' + c[j].data, setting.data[c[j].data])
      //       }
      //     }
      //   }
      // }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/custom/base/add', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.closeDialog()
          if (this.addType === 1) {
            localStorage.setItem("basecode", this.basecode)
            //this.$store.dispatch("setBaseCode", this.basecode)
          }
          if (res.data.data) {
            this.$parent.update(res.data.data)
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    last () {
      this.step--
    },
    next () {
      this.step++
    },
    //展示弹窗
    showDialog () {
      this.keyword = ""
      this.page = 1
      this.customFormworkList()
      this.step = 0
      this.dialogVisible = true
    },
    //选择模板
    chooseFormwork (id) {
      getCustomFormwork({ id: id }).then(res => {
        if (res.code === 200) {
          const _this = this
          res.data.config.map(v => {
            v.data = JSON.parse(v.data)
            v.config = JSON.parse(v.config)
            if (v.data['backgroundImage']) {
              v.pic = _this.getLogo(v.data['backgroundImage'])
              _this.$set(v.data, 'backgroundImage', v.pic)
            }
          })
          //this.step++
          this.mbTransition(res.data)
          this.name = '新建模板'
          this.add(0)
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    mbTransition (mb) {
      let config2 = {}
      mb.config.map(v => {
        let config3 = {}
        v.config.map(p => {
          p.value = v.data[p.data]
          config3[p.data] = p
        })
        v.config2 = config3
        config2[v.code] = v
      })
      mb.config2 = config2

      this.formwork = mb
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
    //搜索模板
    search () {
      this.page = 1
      this.customFormworkList()
    },
    //模板列表翻页
    handleCurrentChange (val) {
      this.page = val
      this.customFormworkList()
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
    beforeAvatarUpload (file) {
      return false
    },
    getLogo (img) {
      if (img === null || img === "") {
        return ""
      } else if (img.indexOf('http://') !== -1 || img.indexOf('https://') !== -1) {
        return img
      }
      return process.env.IMG_URL + img
    }
  }
};
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