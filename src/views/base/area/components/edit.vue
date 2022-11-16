<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="'编辑地块'"
    append-to-body
  >
    <el-tabs>
      <el-tab-pane label="基本信息">

        <div class="dk-content">
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="90px"
          >
            <!-- 所属组织 -->
            <el-form-item
              v-show="form.isAdmin"
              label="所属组织"
              prop="bs_org_id"
            >
              <treeselect
                v-model="form.bs_org_id"
                :options="depts"
                style="width: 400px;"
                placeholder="选择组织"
                @select="orgChange"
              />
            </el-form-item>
            <el-form-item
              v-show="form.isAdmin"
              label="所属基地"
              prop="bs_base_id"
            >
              <el-select
                style="width: 400px;"
                v-model="form.bs_base_id"
                placeholder="请先选择基地"
              >
                <el-option
                  v-for="item in bases"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="地块名称"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="地块名称"
              />
            </el-form-item>
            <el-form-item label="类别">
              <el-select
                v-model="form.facilities_type_id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in facilitesType"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="面积">
              <el-col :span="5">
                <div style="display:flex;">
                  <el-input
                    v-model="form.acreage"
                    placeholder="100"
                  />&nbsp;&nbsp;亩
                </div>
              </el-col>
            </el-form-item>
            <el-form-item label="排序">
              <el-col :span="5">
                <el-input v-model="form.ord" />
              </el-col>
            </el-form-item>
            <el-form-item label="示例图">
              <!-- upload html -->
              <el-upload
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-change="handleFileChange"
                class="avatar-uploader"
                action="' '"
              >
                <img
                  v-if="form.image_path"
                  :src="form.http_image_path"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                />
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="saveData"
              >确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置信息">
        <div style="display: flex;align-items: center;">
          <div style="padding: 10px;">
            <el-button
              size="mini"
              type="primary"
              @click="addUser(form.id)"
            >添加人员</el-button>
          </div>
          <div style="position: absolute;right:10px">
            <div style="margin:10px;">
              开启地块设备异常短信通知
              <el-switch
                v-model="note_value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="updateFacilitiesNote"
              />
            </div>
            <div style="margin:10px;">
              开启地块设备异常电话通知
              <el-switch
                v-model="phone_value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="updateFacilitiesPhone"
              />
            </div>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="data"
          size="small"
          style="width: 100%;"
        >
          <el-table-column
            prop="user_username"
            label="账号"
          />
          <el-table-column
            prop="user_name"
            label="姓名"
          />
          <el-table-column label="开启异常短信通报">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.note_value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="noteChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="开启异常电话通报">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.phone_value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="phoneChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 删除 -->
              <el-popover
                v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_DELETE']"
                :ref="scope.row.user_id"
                placement="top"
                width="180"
              >
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs[scope.row.user_id].doClose()"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="subDelete(scope.row)"
                  >确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                >删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </el-tab-pane>
    </el-tabs>
    <areaUser ref="areaUser" />
  </el-dialog>
</template>

<script>

// import ajaxApi from '@/api/map'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getDepts } from '@/api/dept'
import { getById as getFacilitesById, getFacilitiesUserByFacilitiesId, updateFacilitiesConfigJsonInteger } from '@/api/rs_facilities'
import { getList as getFacilitesType } from '@/api/rs_facilities_type'
import areaUser from './areaUser'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { baseList } from '@/api/baseinfo'

export default {
  name: 'AreaEdit',
  components: { areaUser, Treeselect },
  props: {
  },
  data () {
    return {
      loading: false,
      depts: [],
      bases: [],
      phone_value: true,
      note_value: true,
      data: [],
      total: 0,
      pageSize: 10,
      cur_page: 1,
      dialogVisible: false,
      facilitesType: [],
      form: {
        id: '',
        acreage: 0,
        bs_org_id: this.$store.state.baseinfo.cur_org_id
      },
      formData: new FormData(),
      rules: {
        name: [{ required: true, message: '请输入地块名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token'
    ])
  },
  watch: {

  },
  created () {
    var _this = this
    getFacilitesType().then(res => {
      if (res.code === 200) {
        _this.facilitesType = res.data.content
      }
    }).catch(() => { })
  },
  methods: {
    orgChange () {
      this.form.bs_base_id = null
      this.getBaseList(this.form.bs_org_id)
    },
    addUser (rs_facilities_id) {
      this.$refs.areaUser.getList(rs_facilities_id)
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      this.getFacilitiesUserByFacilitiesId(this.form.id, this.cur_page, this.pageSize)
    },
    // 修改地块短信开关
    updateFacilitiesNote () {
      var value = 0
      if (this.note_value) {
        value = 1
      }
      updateFacilitiesConfigJsonInteger({ rs_facilities_id: this.form.id, name: 'note_sta', value: value }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 修改地块电话开关
    updateFacilitiesPhone () {
      var value = 0
      if (this.phone_value) {
        value = 1
      }
      updateFacilitiesConfigJsonInteger({ rs_facilities_id: this.form.id, name: 'phone_sta', value: value }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 删除用户地块关联
    subDelete (row) {
      this.updateUserFacilitiesRelevance(row.user_id, row.facilities_id, row.phone_sta, row.note_sta, null)
    },
    // 修改地块用户短信开关
    noteChange (row) {
      if (row.note_value) {
        row.note_sta = 1
      } else {
        row.note_sta = 0
      }
      this.updateUserFacilitiesRelevance(row.user_id, row.facilities_id, row.phone_sta, row.note_sta, row.facilities_sta)
    },
    // 修改地块用户电话开关
    phoneChange (row) {
      if (row.phone_value) {
        row.phone_sta = 1
      } else {
        row.phone_sta = 0
      }
      this.updateUserFacilitiesRelevance(row.user_id, row.facilities_id, row.phone_sta, row.note_sta, row.facilities_sta)
    },
    updateUserFacilitiesRelevance (bs_user_id, rs_facilities_id, phone_sta, note_sta, facilities_sta) {
      var list = []
      list.push({
        bs_user_id: bs_user_id,
        rs_facilities_id: rs_facilities_id,
        phone_sta: phone_sta,
        note_sta: note_sta,
        facilities_sta: facilities_sta
      })
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/updateUserFacilitiesRelevance', list, config).then(res => {
        if (res.data && res.data.code === 200) {
          this.$message.success('成功')
          if (facilities_sta === null) {
            this.getFacilitiesUserByFacilitiesId(this.form.id, 1, 10)
            this.$refs[bs_user_id].doClose()
          }
        } else {
          this.$message.error('失败')
        }
      })
    },
    // index点击编辑进入方法
    handelWatch (d) {
      this.dialogVisible = true
      getFacilitesById({ rs_facilities_id: d.id }).then((res) => {
        this.form = res.data
        const config_json = JSON.parse(this.form.config_json)
        if (config_json == null || config_json.phone_sta === 0) {
          this.phone_value = false
        } else {
          this.phone_value = true
        }
        if (config_json == null || config_json.note_sta === 0) {
          this.note_value = false
        } else {
          this.note_value = true
        }
        this.form.http_image_path = process.env.IMG_URL + res.data.image_path
        this.form.rs_facilities_id = res.data.id
        getDepts().then(res => {
          this.depts = res.data.content
        })
        this.getBaseList(this.form.bs_org_id)
      })
      this.getFacilitiesUserByFacilitiesId(d.id, 1, 10)
    },
    //获取基地列表接口
    getBaseList (bs_org_id) {
      baseList({ bs_org_id: bs_org_id, size: 999 }).then(res => {
        this.bases = res.data.content
      })
    },
    // 获取列表数据接口
    getFacilitiesUserByFacilitiesId (rs_facilities_id, page, size) {
      getFacilitiesUserByFacilitiesId({ rs_facilities_id: rs_facilities_id, page: page, size: size }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存编辑
    saveData () {
      if (this.form.acreage === null) {
        this.form.acreage = 0
      }
      if (this.form.bs_org_id === null) {
        this.$message.error('请选择组织')
        return
      }
      if (this.form.bs_base_id === null) {
        this.$message.error('请选择基地')
        return
      }
      var json = { rs_facilities_id: this.form.id, ...this.form }

      for (var i in json) {
        if (json[i] != null) {
          this.formData.append(i, json[i])
        }
      }
      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/update', this.formData, config).then(res => {
        if (res.data && res.data.code === 200) {
          this.$message.success('保存成功！')
        } else {
          this.$message.error(res.data.msg)
        }
        this.formData = new FormData()
        this.dialogVisible = false
        this.$parent.loadTableData()
      })
    },
    handleFileChange (file, fl) {
      if (file) {
        this.form.image_path = URL.createObjectURL(file.raw)
        this.form.http_image_path = URL.createObjectURL(file.raw)
        fl = fl.splice(0, fl.length - 1)
        this.formData.set('image_path', file.raw)
      }
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      // return isLt2M
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 图片上传 */
.el-dialog__wrapper >>>
  .el-dialog
    width 780px

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 30px 50px
      overflow auto
      height 410px

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

.avatar
  width 178px
  height 178px
  display block
</style>

