<template>
  <div>
    <div >
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
          <el-button icon="el-icon-close" type="danger" size="mini" @click="delAll">删除</el-button>
        </div>
        <div style="text-align:right;margin-right:10px">
          <el-input v-model="s_title" placeholder="标题" class="handle-input ml10" />
          <el-select v-model="s_type" placeholder="问题分类" class="mr10 ml10" clearable>
            <el-option
              v-for="item in questionTypeDicts"
              :key="item.label"
              :value="item.label"
            />
          </el-select>
          <el-button type="success" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
          <el-button v-if="is_search" size="mini" type="primary" @click="clearSearch">清空</el-button>
        </div>

      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        :default-sort="{prop: 'ord', order: 'ascending'}"
        border
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="ord" label="序号" width="70"/>
        <el-table-column prop="title" label="标题" width="180" />

        <el-table-column prop="type" label="问题类型" width="100"/>

        <el-table-column prop="content" label="内容" />
        <el-table-column label="操作" width="150" align="center">
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
    <el-dialog :title="dialogTitle" :visible.sync="editVisible" append-to-body width="60%">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="序号" prop="ord">
          <el-input v-model="form.ord" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="问题类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button
              v-for="item in questionTypeDicts"
              :label="item.label"
              :key="item.label"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            rows="5"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="delVisible" append-to-body title="提示" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  find,
  add,
  edit,
  del
} from '@/api/question'
import initDict from '@/mixins/initDict'

export default {
  name: 'Basetable',
  mixins: [initDict],

  data() {
    return {
      tableData: [],
      pageSize: 10,
      totalNum: 0,
      cur_page: 1,
      multipleSelection: [],
      s_title: '',
      s_type: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        ord: '',
        title: '',
        type: '',
        content: ''
      },
      idx: -1,
      dialogTitle: '编辑',
      dev_list: [],
      valid: true,
      questionTypeDicts: [],
      rules: {
        title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
        function_code: [
          // 单选
          { required: true, message: '问题类型', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.title === this.del_list[i].title) {
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
  created() {
    this.getDict2(this, 'questionTypeDicts', 'question_type')
    this.getData()
  },
  methods: {
    handleSizeChange: function(pageSize) {
      // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.cur_page)
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val
      this.getData()
    },

    // 获取列表数据
    getData() {
      const _params = {
        size: this.pageSize,
        page: this.cur_page - 1
      }
      if (this.is_search) {
        if (this.s_title) {
          _params.title = this.s_title
        }
        if (this.s_type) {
          _params.type = this.s_type
        }
      }
      find(_params).then(res => {
        this.tableData = res.data.content
        this.totalNum = res.data.totalElements
      })
    },
    search() {
      this.is_search = true
      this.cur_page = 1
      this.getData()
    },
    clearSearch() {
      this.is_search = false
      this.s_title = ''
      this.cur_page = 1
      this.getData()
    },
    filterTag(value, row) {
      return row.tag === value
    },
    handleEdit(index, row) {
      if (!this.valid) {
        this.$refs.form.resetFields()
      }
      this.dialogTitle = '编辑'
      const item = row
      const _index = this.tableData.findIndex(function(e) {
        if (e.id === row.id) {
          return true
        }
      })
      this.idx = _index > -1 ? _index : index
      this.fileRaw = null
      this.form = {
        ord: item.ord,
        title: item.title,
        type: item.type,
        content: item.content,
        id: item.id
      }

      this.editVisible = true
    },
    handleAdd() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogTitle = '添加'
      this.editVisible = true
      this.fileRaw = null
      this.form = {
        ord: '',
        title: '',
        type: '',
        content: ''
      }
      this.image_path = ''
    },
    handleDelete(index, row) {
      // this.idx = index;
      // fixed order bug.
      const _index = this.tableData.findIndex(function(e) {
        if (e.id === row.id) {
          return true
        }
      })
      this.idx = _index > -1 ? _index : index
      this.delVisible = true
    },
    delAll() {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].title + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form
          if (this.dialogTitle === '添加') {
            add(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false
                if (this.fileRaw) {
                  this.fileRaw = null
                }
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            edit(form).then(res => {
              if (res.code === 200) {
                this.editVisible = false
                const form = this.form
                this.$set(this.tableData, this.idx, form)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.valid = false
          console.log('valid fail, return')
        }
      })
    },
    // 确定删除
    deleteRow() {
      del(this.tableData[this.idx]['id']).then(
        res => {
          console.log('del res', res)
          this.tableData.splice(this.idx, 1)
          this.$message.success('删除成功')
          this.delVisible = false
        }
      )
    },
    handleAvatarSuccess(res, file) {
      console.log('res', res)
      console.log('file', file)
      // 提示上传结果.
      // this.image_path = URL.createObjectURL(file.raw);
    },
    handleChange(file, fl) {
      // 生成上传file数据 file.raw
      this.fileRaw = file.raw
    },
    handleChange2(file, fl) {
      this.logo_path = URL.createObjectURL(file.raw)
    },
    getDevName(row, column) {
      const _curProd = this.dev_list.find(function(element) {
        return element.code === row.function_code
      })
      if (_curProd) {
        return _curProd.title
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.handle-input {
  width: 120px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.ml10 {
  margin-left: 10px;
}

/* 图片上传 */
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409eff;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

