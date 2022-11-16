<template>
  <div>
    <div class="head-container">

      <div style="display: inline-block;float:left">
        <!-- 添加 -->
        <!--<div style="display: inline-block;margin: 0px 2px;">-->
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="$refs.productAdd.dialogFormVisible = true"
        >添加</el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-close"
          @click="confiramDelAll"
        >删除</el-button>
      </div>

      <!-- 搜索 -->
      <div style="text-align:right;margin-right:10px">
        <el-input
          v-model="productName"
          clearable
          placeholder="输入产品名称搜索"
          style="width: 170px;"
          @clear="onSearch"
          @keyup.enter.native="onSearch"
        />
        <el-button
          icon="el-icon-search"
          size="mini"
          type="success"
          @click="onSearch"
        >搜索</el-button>
      </div>
    </div>

    <el-card shadow="never">
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
          prop="category"
          label="产品种类"
          sortable
        />
        <el-table-column
          prop="name"
          label="产品名称"
          sortable
        />
        <el-table-column
          prop="code"
          label="产品编码"
          sortable
        />
        <el-table-column
          prop="ord"
          label="显示顺序"
          sortable
        />
        <el-table-column
          prop="summary"
          label="产品描述"
          sortable
        />
        <el-table-column
          prop="image_path"
          label="图标"
          sortable
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.image_url"
              min-width="40"
              height="40"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handelEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="flex bottom-bar"
        style="margin-top:10px"
      >
        <!-- <div class="bottom-text">第{{ startNum }}到{{ totalNum }}条，共{{ totalNum }}条记录。</div> -->
        <div class="pagination">
          <el-pagination
            :current-page="cur_page"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
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
    <product-add
      ref="productAdd"
      @upProductData="getData"
    />
    <product-edit
      ref="productEdit"
      :form="childform"
      @upProductData="getData"
    />
  </div>
</template>

<script>
import ProductAdd from './module/add'
import ProductEdit from './module/edit'
import { queryProduct, deleteById, deleteProducts } from '@/api/product'
export default {
  components: {
    ProductAdd,
    ProductEdit
  },
  data () {
    return {
      productName: '',
      childform: {},
      tableData: [],
      cur_page: 1,
      pageSize: 10,
      delAllVisible: false,
      multipleSelection: [],
      total: 0
    }
  },
  computed: {
    startNum () {
      if (this.tableData.length > 0) {
        return 1
      } else {
        return 0
      }
    },
    totalNum () {
      return this.tableData.length
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (name) {

      queryProduct({ name, size: this.pageSize, page: this.cur_page }).then(res => {
        res.data.content.map(v => {
          if (v.image_path) {
            v.image_url = process.env.IMG_URL + v.image_path
          }
        })
        this.tableData = res.data.content
        this.total = res.data.totalElements
      })
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },
    onSearch () {
      this.cur_page = 1
      this.getData(this.productName)
    },
    reset () {
      this.$refs.form.resetFields()
    },
    confiramDelAll () {
      var length = this.multipleSelection.length
      if (length === 0) {
        this.$message.error('请选择删除的产品信息!')
        return false
      }
      this.delAllVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let ids = ''
      for (let i = 0; i < length; i++) {
        ids += this.multipleSelection[i].id + ','
      }

      // this.del_list = this.del_list.concat(this.multipleSelection)
      deleteProducts({ hd_product_ids: ids }).then(
        res => {
          if (res.code === 200) {
            this.multipleSelection = []
            this.$message.success('删除成功')
            this.delAllVisible = false
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        }
      )
    },
    handelEdit (index, row) {
      this.childform = row
      this.$refs.productEdit.handelEdit()
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        deleteById({ hd_product_id: row.id }).then(res => {
          if (res.code === 200) {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()
  margin 0

.flex
  display flex
  align-items center

.el-table
  font-size 14px

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777
</style>
