<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="添加机构"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="名称："
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="组织类型："
          prop="bs_org_type_code"
        >
          <el-radio-group v-model="form.bs_org_type_code">
            <el-radio
              v-for="item in org_type_list"
              :label="item.code"
              :key="item.id"
            >{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="所属组织" prop="bs_org_id">
            <el-select
              v-model="form.bs_org_parent_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in org"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item> -->

        <el-form-item label="所属组织">
          <el-cascader
            :options="org"
            v-model="form.org_parent_id"
            :show-all-levels="false"
            :props="props"
            change-on-select
            @change="handleItemChange"
          />
        </el-form-item>

        <el-form-item label="编号：">
          <el-input v-model="form.code" />
        </el-form-item>

        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input v-model="form.email" />
        </el-form-item>

        <area-code
          ref="myarea"
          :area_code="form.area_id"
        />

        <el-form-item label="图标">
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
              v-if="logo_path"
              :src="logo_path"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>

        <el-form-item label="详细地址：">
          <el-input v-model="form.website" />
        </el-form-item>

        <el-form-item
          label="联系电话："
          prop="phone"
        >
          <el-input v-model="form.phone" />
        </el-form-item>

        <el-form-item label="简介：">
          <el-input
            v-model="form.summary"
            type="area"
          />
        </el-form-item>

        <el-form-item label="主题：">
          <el-input v-model="form.topic_code" />
        </el-form-item>

        <el-form-item label="公司网址：">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="form.linkman" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrg"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import areaCode from '@/components/common/area'
import { getProvence } from '@/api/baseInfo'
import { addOrg, findOneLevelList, findSubList } from '@/api/org.js'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgAdd',
  components: {
    areaCode
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        bs_org_parent_id: '',
        org_parent_id: [],
        area_id: [],
        bs_area_id: '',
        name: '',
        code: '',
        email: '',
        website: '',
        phone: '',
        summary: '',
        topic_code: '',
        url: '',
        linkman: ''
      },
      org: [],
      area: [],
      provenceArray: [],
      props: {
        label: 'name',
        value: 'id'
      },
      logo_path: '',
      fileRaw: null,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ pattern: /^1[34578]\d{9}$|\d{6,8}/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['org_type_list'])
  },
  created () {
    this.getAllOrgData()
    // this.form.area_id = this.getAreaCodeArr('440106');
    // this.getProvenceData()
  },
  methods: {
    getAreaCodeArr (bcode) {
      // var bcode = '440106';
      // var prov = bcode.substring(0,2) + '0000';
      // var city = bcode.substring(0,4) + '00';
      console.log([bcode.substring(0, 2) + '0000', bcode.substring(0, 4) + '00', bcode])
      return [bcode.substring(0, 2) + '0000', bcode.substring(0, 4) + '00', bcode]
    },
    dialogShow () {
      this.dialogFormVisible = true
    },
    getAllOrgData () {
      findOneLevelList().then(res => {
        const arr = res.data.content.map(item => {
          if (item.subNum > 0) {
            item.children = []
          }
          return item
        })
        console.log('arr == ', arr)
        this.org = arr
      })
    },
    getProvenceData () {
      getProvence().then(res => {
        if (res.code === 200) {
          this.provenceArray = res.data
          this.provenceArray.forEach((item, index) => {
            this.$set(this.provenceArray[index], 'children', [])
          })
        }
      })
    },
    findLastArr (sarr, darr) { // 递归得 [index,index2]
      if (darr.length > 0) {
        sarr.forEach((item, index) => {
          if (item.id === darr[0]) {
            this.result.push(index)
          }
          if (item.children instanceof Array) {
            this.findLastArr(item.children, darr.slice(1))
          }
        })
      }
    },
    handleItemChange (val) {
      const length = val.length
      const curId = val[val.length - 1]
      findSubList(curId)
        .then(res => {
          if (res.length === 0) {
            return
          }
          if (length === 1) {
            // 这里只处理了第一层
            this.org.forEach((item, index) => {
              if (item.id === curId) {
                const _arr = res.map((v, i) => {
                  if (v.subNum > 0) {
                    v.children = []
                  }
                  return v
                })
                this.$set(this.org[index], 'children', _arr)
                this.lastArr = _arr
                this.lastIndex = index
              }
            })
          } else { // 只支持到多层
            this.result = []
            this.findLastArr(this.org, val)
            const _arr = res.map((v, i) => {
              if (v.subNum > 0) {
                v.children = []
              }
              return v
            })

            const _len = this.result.length
            if (_len > 2) {
              let _str = ''
              for (let i = 1; i < _len; i++) { // 拼接循环部分
                _str = _str + "['children'][" + this.result[i] + ']'
              }
              /* eslint-disable */
              const _dd = this.org
              this.$set(eval('(' + '_dd[' + this.result[0] + ']' + _str + ')'), 'children', _arr) // 多层
            } else {
              this.$set(this.org[this.result[0]]['children'][this.result[1]], 'children', _arr) // 二层
            }
          }
        })
    },
    addOrg () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 成功去提交表单
          const areaId = this.$refs.myarea.getAreaid()
          if (areaId) {
            this.form.bs_area_id = areaId
          }
          if (this.fileRaw) { // 图片
            this.form.logo_path = this.fileRaw
          }
          if (this.form.org_parent_id.length > 0) { // todo 保存parent_id数组
            this.form.bs_org_parent_id = this.form.org_parent_id[this.form.org_parent_id.length - 1]
          }
          console.log('this.form is === ', this.form)
          addOrg(this.form)
            .then(res => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$refs.form.resetFields()
                this.dialogFormVisible = false
                // 主动通知父组件刷新页面.
                this.$emit('upOrgData')
              }
            })
        } else {
          this.$message.error('数据不完整!')
        }
      })
    },
    handleChange (file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw = file.raw
      this.logo_path = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        file = null
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      return false
      //return isJPG && isLt2M
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>>
  .el-dialog
    width 60%

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 30px 50px

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
