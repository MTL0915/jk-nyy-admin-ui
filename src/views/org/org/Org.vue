<template>
  <div>
    <div class="card">
      <el-form ref="search" label-width="85px">
        <div class="flex">
          <el-form-item label="机构名称：">
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
              @click="reset"
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
          <!-- <el-button
            icon="el-icon-edit-outline"
            type="success"
            style="background:#6DD9C3;border-color:#6DD9C3;"
          >修改</el-button> -->
          <el-button
            icon="el-icon-sort"
            type="success"
          >展开/折叠</el-button>
        </div>
        <el-button-group>
          <el-button icon="el-icon-refresh"/>
          <el-dropdown split-button><i class="el-icon-menu"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>菜单一</el-dropdown-item>
              <el-dropdown-item>菜单二</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
      </div>
      <el-table
        :data="tableData"
        :load="load2"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
        highlight-current-row
        lazy
      >
        <el-table-column
          prop="name"
          label="机构名称"
          width="200"
        />
        <el-table-column
          prop="linkman"
          label="联系人"
          width="100"
        />
        <el-table-column
          label="状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span class="table-span">{{ scope.row.bs_org_type_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="创建时间"
          width="180"
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
              @click="handleEdit(scope.$index, scope.row)"
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
          <el-pagination
            :total="total"
            background
            layout="total, sizes,prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <org-add ref="orgAdd" @upOrgData="getData"/>
      <org-edit ref="orgEdit" :form="editform" @upOrgData="getData"/>
    </div>
  </div>
</template>

<script>
import OrgAdd from './OrgAdd'
import OrgEdit from './OrgEdit'
import { getOrgOne, findSubList, delOrg } from '@/api/org'
import { formatDate } from '@/utils/date'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Org',
  components: {
    OrgAdd,
    OrgEdit
  },
  data() {
    return {
      form: {
        name: '',
        address: '',
        code: '',
        start_create_date: '',
        end_create_date: '',
        org_parent_id: []
      },
      editform: {},
      cur_page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      s_name: '',
      is_search: false
    }
  },
  computed: {
    ...mapGetters(['org_type_list'])
  },
  created() {
    this.getData()
    if (this.org_type_list.length === 0) { // check 组织分类数据是否加载?
      console.log(' in  org_type_list.length === 0')
      this.getOrgTypes()
    }
  },
  methods: {
    ...mapActions('baseinfo', ['getOrgTypes']),
    handleSizeChange: function(pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.cur_page)
    },
    // 分页
    handleCurrentChange(val) {
      this.cur_page = val
      this.getData()
    },
    getAreaCodeArr(bcode) {
      if (bcode) {
        return [bcode.substring(0, 2) + '0000', bcode.substring(0, 4) + '00', bcode]
      }
      return []
    },
    handelAdd() {
      this.$refs.orgAdd.dialogShow()
    },
    load2(row, treeNode, resolve) { // tree, treeNode, resolve
      if (row.subNum > 0) {
        const bs_org_parent_id = row.id
        findSubList(bs_org_parent_id).then(res => {
          res.map((item, index) => {
            const date = new Date(item.create_date)
            item.create_date = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            if (item.subNum > 0) {
              item.hasChildren = true
            }
          })
          resolve(res)
        })
      }
    },
    handleEdit(index, row) {
      // edit
      row.area_id = this.getAreaCodeArr(row.bs_area_code)
      console.log('row === ', row)
      this.editform = row
      // this.$refs.orgEdit.resetAreaCode();
      this.$refs.orgEdit.dialogShow()
      // this.$refs.orgEdit.reSetareaid(row.area_id);
    },
    handelDelete(index, row) {
      // 删除
      const delId = row.id
      const _index = index
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrg({ bs_org_id: delId })
          .then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功!')
              this.tableData.splice(_index, 1)
            }
          })
      }).catch()
    },
    getData() {
      const startPosition = (this.cur_page - 1) * this.pageSize
      const _params = { maxResult: this.pageSize, startPosition: startPosition }
      if (this.is_search) {
        _params.name = this.s_name
      }
      getOrgOne(_params).then(res => {
        if (res.code === 200) {
          res.data.map(v => {
            const date = new Date(v.create_date)
            v.create_date = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            if (v.subNum > 0) {
              v.hasChildren = true
            }
          })
          this.tableData = res.data
          this.total = res.page.totalNum
        }
      })
    },
    search() {
      this.cur_page = 1
      this.is_search = true
      this.getData()
    },
    reset() {
      this.is_search = false
      this.s_name = ''
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
