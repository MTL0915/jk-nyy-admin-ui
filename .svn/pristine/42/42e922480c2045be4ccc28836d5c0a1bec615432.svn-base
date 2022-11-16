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
          <!-- <el-button
	            icon="el-icon-edit-outline"
	            type="success"
	            style="background:#6DD9C3;border-color:#6DD9C3;"
	          >修改</el-button> -->
          <el-button
            class="filter-item"
            icon="el-icon-close"
            type="danger"
            size="mini"
            @click="confiramDelAll"
          >删除</el-button>
        </div>

        <div style="text-align:right;margin-right:10px">
          <el-input
            v-model="select_word"
            clearable
            placeholder="筛选关键词"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="search"
            @clear="search"
          />
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-search"
            @click="search"
          >搜索</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
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
          label="类别名称"
          width="150"
        />
        <el-table-column
          prop="code"
          label="编号"
          width="120"
        />
        <el-table-column
          prop="image_path"
          label="显示图片"
        >
          <template slot-scope="scope">
            <img
              :src="getLogo(scope.row.image_path)"
              min-width="40"
              height="40"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-setting"
              @click="sensorTypeConfig(scope.row.id)"
            >配置</el-button>
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
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page.sync="cur_page"
          :total="total"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </div>
    <!-- 传感器类型配置界面 -->
    <el-dialog
      title="传感器类型配置"
      :visible.sync="sensorTypeConfigVisible"
      append-to-body
      width="750"
    >
      <el-table
        :data="sensorTypeConfigData"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="ord"
          label="序号"
          sortable
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.ord+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="hd_sensor_type_name"
          label="传感器类型"
          width="120"
          align="center"
        />
        <el-table-column
          label="权重(占比%)"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.weight"
              size="mini"
              :min="0"
              :max="100"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="330"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="configValueLevel(scope.row)"
            >阈值配置</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="zIndexDown(sensorTypeConfigData,scope.row.ord,sensorTypeConfigData.length)"
            >下移</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="zIndexUp(sensorTypeConfigData,scope.row.ord)"
            >上移</el-button>
            <el-button
              size="mini"
              type="success"
              @click="zIndexTop(sensorTypeConfigData,scope.row.ord)"
            >置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin-top:15px;">
        <el-button
          type="primary"
          :loading="sensorTypeConfigLoading"
          @click="saveSensorTypeConfig"
        >保存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editVisible"
      append-to-body
      width="80%"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="90px"
      >
        <el-form-item
          label="类别名称"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="显示图片">
          <!-- upload html -->
          <el-upload
            ref="upload"
            action="' '"
            :data="form"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            name="image_path"
          >
            <img
              v-if="image_path"
              :src="image_path"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
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
    <ValueLevel ref="valueLevel" />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import initData from '@/mixins/initData'
import { add, update, deleteById, deleteFacilitieTypes, getFacilitiestypeSensortypeList } from '@/api/rs_facilities_type'
import ValueLevel from './module/ValueLevel'
export default {
  components: { ValueLevel },
  mixins: [initData],
  data () {
    return {
      pageSize: 10,
      cur_page: 1,
      selectedRowId: '',
      multipleSelection: [],
      valueLevelTableData: [{ number: 1, name: '寒冷', start_value: 0, end_value: 10 }, { number: 2, name: '暖和', start_value: 10, end_value: 25 }, { number: 3, name: '炎热', start_value: 25, end_value: 30 }, { number: 4, name: '酷热', start_value: 30 }],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      delAllVisible: false,
      sensorTypeConfigData: [],
      sensorTypeConfigVisible: false,
      sensorTypeConfigLoading: false,
      form: {
        rs_facilities_type_id: '',
        name: '',
        code: ''
        // type: '',
      },
      image_path: '',
      idx: -1,
      dialogTitle: '编辑',
      rules: {
        name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
      },

    }
  },
  computed: {
    data () {
      return this.data.filter((d) => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          return d
        }
      })
    }
  },
  created () {
    // this.getData()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    configValueLevel (row) {
      let config_json = JSON.parse(row.config_json);
      if (config_json != null) {
        this.$refs.valueLevel.tableData = config_json;
      } else {
        this.$refs.valueLevel.tableData = [];
      }
      this.$refs.valueLevel.id = row.id;
      this.$refs.valueLevel.valueLevelVisible = true;
    },
    //换位
    swapArray (arr, index1, index2) {
      arr[index1].ord = index2
      arr[index2].ord = index1
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr
      //return arr;
    },
    //置顶
    zIndexTop (arr, index) {
      if (index != 0) {
        //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
        var moveNum = index - 0;
        //循环出需要一个一个上移的次数
        for (var i = 0; i < moveNum; i++) {
          this.swapArray(arr, index, index - 1);
          index--;
        }
      } else {
        this.$message.warning('已经处于顶部')
      }
    },
    //下移
    zIndexDown (arr, index, length) {
      if (index + 1 != length) {
        this.swapArray(arr, index, index + 1);
      } else {
        this.$message.warning('已经处于置顶，无法下移')
      }
    },
    //上移
    zIndexUp (arr, index) {
      if (index != 0) {
        this.swapArray(arr, index, index - 1);
      } else {
        this.$message.warning('已经处于置底，无法上移')
      }
    },
    saveSensorTypeConfig () {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.sensorTypeConfigLoading = true

      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities_type/saveFacilitiestypeSensortype', this.sensorTypeConfigData, config).then(res => {
        this.sensorTypeConfigLoading = false
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.sensorTypeConfigVisible = false
        }
        else {
          this.$message.error(res.data.msg)
        }
      })
    },
    sensorTypeConfig (id) {
      getFacilitiestypeSensortypeList({ rs_facilities_type_id: id }).then(res => {
        if (res.code === 200) {

          this.sensorTypeConfigData = res.data
          this.sensorTypeConfigVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    beforeInit () {
      this.params = { name: this.select_word, page: this.cur_page - 1, size: this.pageSize }
      this.url = 'rs/rs_facilities_type/find'
      return true
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      this.init()
    },
    // 获取 easy-mock 的模拟数据
    // getData() {
    //   const startPosition = (this.cur_page - 1) * this.pageSize
    //   const _params = { maxResult: this.pageSize, startPosition: startPosition }
    //   if (this.is_search && this.select_word) {
    //     _params.name = this.select_word
    //   }
    //   getList(_params)
    //     .then(res => {
    //       this.tableData = res.data.content
    //       this.totalNum = res.data.totalElements
    //     })
    // },
    search () {
      this.is_search = true
      this.cur_page = 1
      // this.getData()
      this.init()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      this.dialogTitle = '编辑'
      this.upUrl = process.env.IMG_URL + '/rs/rs_facilities/updateFacilitieType'
      this.idx = index
      this.editVisible = true
      this.fileRaw = null
      const item = this.data[index]
      this.form = {
        rs_facilities_type_id: item.id,
        name: item.name,
        code: item.code
      }
      this.image_path = this.getLogo(item.image_path)
    },
    handleAdd () {
      this.dialogTitle = '添加'
      this.upUrl = process.env.IMG_URL + '/rs/rs_facilities/addFacilitieType'
      this.editVisible = true
      this.fileRaw = null
      this.form = {
        rs_facilities_type_id: '',
        name: '',
        code: ''
      }
      this.image_path = ''
    },
    handleDelete (index, row) {
      this.idx = index
      this.delVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let ids = ''
      for (let i = 0; i < length; i++) {
        ids += this.multipleSelection[i].id + ','
      }

      this.del_list = this.del_list.concat(this.multipleSelection)
      deleteFacilitieTypes({ rs_facilities_type_ids: ids }).then(
        res => {
          if (res.code === 200) {
            this.multipleSelection = []
            this.$message.success('删除成功')
            this.delAllVisible = false
            // this.getData()
            this.init()
          } else {
            this.$message.error(res.msg)
          }
        }
      )
      /* const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []*/
    },
    confiramDelAll () {
      var length = this.multipleSelection.length
      if (length === 0) {
        this.$message.error('请选择删除的设备!')
        return false
      }
      this.delAllVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('this.multipleSelection', this.multipleSelection)
    },
    // 保存编辑
    saveEdit () {
      // check form
      this.$refs.form.validate((valid) => {
        if (valid) {
          const form = this.form
          if (this.fileRaw) {
            form.image_path = this.fileRaw
          }
          if (this.dialogTitle === '添加') {
            add(form)
              .then(res => {
                if (res.code === 200) {
                  this.editVisible = false
                  if (this.fileRaw) {
                    this.fileRaw = null
                  }
                  // this.getData()
                  this.init()
                } else {
                  this.$message.error(res.msg)
                }
              })
          } else {
            update(form)
              .then(res => {
                if (res.code === 200) {
                  this.editVisible = false
                  const form = this.form
                  if (this.fileRaw) {
                    // this.getData()
                    this.init()
                    form.image_path = URL.createObjectURL(this.fileRaw)
                    this.fileRaw = null
                  } else {
                    form.image_path = this.data[this.idx]['image_path']
                  }
                  form.id = form.rs_facilities_type_id
                  this.$set(this.data, this.idx, form)
                } else {
                  this.$message.error(res.msg)
                }
              })
          }
          // else{
          //     // 有上传图片数据
          //     console.log(' 有上传图片数据')
          //     this.$refs.upload.submit();
          // }
        } else {
          this.$message.error('数据不完整')
        }
      })

      // this.$message.success(`修改第 ${this.idx+1} 行成功`);
    },
    // 确定删除
    deleteRow () {
      deleteById({ rs_facilities_type_id: this.data[this.idx]['id'] })
        .then(res => {
          if (res.code === 200) {
            console.log('del res', res)
            this.data.splice(this.idx, 1)
            this.$message.success('删除成功')
            this.delVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // handleAvatarSuccess (res, file) {
    //   // this.image_path = URL.createObjectURL(file.raw);
    //   // 提示上传成功
    //   this.$message.success(res.msg)
    //   this.editVisible = false
    //   this.fileRaw = null
    // },
    handleChange (file, fl) {
      this.image_path = URL.createObjectURL(file.raw)
      this.fileRaw = file.raw
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
    },
    getLogo (img) {
      if (img === null) {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    }
  }
}

</script>

<style lang="stylus" scoped>
.del-dialog-cnt
  font-size 16px
  text-align center

.table
  width 100%
  font-size 14px

.red
  color #ff0000

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
