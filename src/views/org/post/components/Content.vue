<template>
  <div>
    <div class="card">
      <el-form
        ref="sform"
        :model="form"
        label-width="85px"
      >
        <div class="flex">
          <el-form-item label="岗位编码：">
            <el-input v-model="s_code"/>
          </el-form-item>
          <el-form-item label="岗位名称：">
            <el-input v-model="s_name"/>
          </el-form-item>
          <div style="margin-left:15px">
            <el-button
              round
              icon="el-icon-search"
              type="success"
              @click="search"
            >搜索</el-button>
            <el-button
              round
              icon="el-icon-refresh"
              type="warning"
              @click="clearSearch"
            >重置</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="card">
      <div class="flex bottom-content">
        <div class="left-btn">
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="handelAdd"
          >添加</el-button>
          <el-button
            icon="el-icon-edit-outline"
            type="success"
            style="background:#6DD9C3;border-color:#6DD9C3;"
          >修改</el-button>
          <el-button
            icon="el-icon-close"
            type="danger"
          >删除</el-button>
          <!-- <el-button
            icon="el-icon-download"
            type="success"
          >导入</el-button>
          <el-button
            icon="el-icon-upload2"
            type="warning"
          >导出</el-button> -->
        </div>
        <el-button-group>
          <el-button icon="el-icon-search"/>
          <el-button icon="el-icon-refresh"/>
          <el-button icon="el-icon-lx-sort"/>
          <el-dropdown split-button><i class="el-icon-menu"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>菜单一</el-dropdown-item>
              <el-dropdown-item>菜单二</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-button-group>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
        />

        <el-table-column
          prop="code"
          label="岗位编码"
          width="100"
        />
        <el-table-column
          prop="name"
          label="岗位名称"
          sortable
          width="100"
        />
        <el-table-column
          prop="ord"
          label="显示顺序"
          sortable
          width="120"
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handelEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handelDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex bottom-bar">
        <div class="pagination">
          <el-pagination :total="totalNum" background layout="total, sizes,prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
    <post-add ref="postAdd" :types="editType" :form="form" @updateList="getData"/>
  </div>
</template>

<script>
import { getLists, deletePost } from '@/api/orgPost'
import { mapGetters } from 'vuex'
import PostAdd from '../PostAdd'
export default {
  name: 'PostContent',
  components: {
    PostAdd
  },
  data() {
    return {
      editType: 'add',
      form: {
        name: '',
        code: '',
        ord: ''
      },
      tableData: [{
        ord: '1',
        code: 'ceo',
        name: '董事长'
      }, {
        ord: '2',
        code: 'hr',
        name: '人力资源'
      }],
      multipleSelection: [],
      cur_page: 1,
      pageSize: 10,
      totalNum: 0,
      s_name: '',
      s_code: '',
      is_search: false,
      unwatch: null
    }
  },
  computed: {
    ...mapGetters(['curOrgId'])
  },
  // watch: { // 修改用vuex.watch
  //   curOrgId(val){
  //     //如果有变化 去加载page
  //     this.cur_page = 1;
  //     this.getData()
  //   }
  // },
  activated() {
    console.log('in post activated, create watch')
    this.unwatch = this.$store.watch((state, getters) => {
      return getters['curOrgId']
    }, (newVal, oldVal) => {
      this.cur_page = 1
      this.getData()
    })
  },
  deactivated() {
    console.log('in post deactivated, stop watch')
    this.unwatch()
  },
  created() {
    if (this.curOrgId) {
      this.getData()
    }
  },
  methods: {
    handleSizeChange: function(pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.cur_page)
    },
    // 分页
    handleCurrentChange(val) {
      this.cur_page = val
      this.getData()
    },
    getData() {
      const startPosition = (this.cur_page - 1) * this.pageSize
      const _params = { 'bs_org_id': this.curOrgId, 'maxResult': this.pageSize, startPosition }
      if (this.is_search) {
        if (this.s_name) {
          _params.name = this.s_name
        }
        if (this.s_code) {
          _params.code = this.s_code
        }
      }
      getLists(_params)
        .then(res => {
          this.tableData = res.data.data
          this.totalNum = res.data.page.totalNum
        })
    },
    handelAdd() {
      this.form = {
        name: '',
        code: '',
        ord: ''
      }
      this.editType = 'add'
      this.$refs.postAdd.handelAdd()
    },
    handelEdit(row) {
      this.form = row
      this.form.bs_post_id = row.id
      this.editType = 'edit'
      this.$refs.postAdd.handelAdd()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handelDelete(index, row) {
      // this.tableData.splice(index, 1)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePost({ bs_post_id: row.id })
          .then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功!')
              // 拿到正确 index
              const _index = this.tableData.findIndex(function(e) {
                if (e.id === row.id) {
                  return true
                }
              })
              this.tableData.splice(_index, 1)
            }
          })
      }).catch()
    },
    search() {
      this.is_search = true
      this.cur_page = 1
      this.getData()
    },
    clearSearch() {
      this.is_search = false
      this.s_name = ''
      this.s_code = ''
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()

.flex
  display flex
  align-items center

.el-form >>> label
  padding 0

.card
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 0

.left-btn
  .el-button+.el-button
    margin-left 5px

.el-dropdown >>> .el-button:first-child
  padding 9px 5px

.el-dropdown >>> .el-button:last-child
  padding 9px 0

.bottom-content
  justify-content space-between

.el-table
  font-size 14px

.table-span
  background #1AB394
  color #fff
  padding 2px 5px
  border-radius 25px

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777
</style>
