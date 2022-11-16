<template>
  <div class="main-panel">
    <div class="head-container">
      <div style="display: inline-block;float:left">
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="$refs.eAdd.showDialog(),$refs.eAdd.form.bs_org_id = deptId || orgid"
        >添加</el-button>
        <!-- <el-button
          icon="el-icon-close"
          type="danger"
          size="mini"
        >删除</el-button>
        <el-button
          icon="el-icon-download"
          type="success"
          size="mini"
        >导入</el-button>
        <el-button
          icon="el-icon-upload2"
          type="warning"
          size="mini"
        >导出</el-button> -->
      </div>
      <!-- <el-select v-model="form.bs_org_id" size="mini" clearable placeholder="请选择组织" style="width:150px" @change="toQuery()">
          <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.dcount }}</span>
          </el-option>
        </el-select> -->
      <!-- 搜索 -->
      <div style="text-align:right;margin-right:10px">

        <!-- 选择某个组织 -->
        <!-- <el-select v-model="form.bs_org_id" size="mini" clearable placeholder="请选择组织" style="width:150px" @change="cur_page=1;init()" @clear="cur_page=1;init()">
          <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.baseCount }}</span>
          </el-option>
        </el-select> -->
        <el-select
          v-if="orgid===null"
          size="mini"
          clearable
          filterable
          v-model="form.bs_org_id"
          placeholder="请选择组织"
          style="width:150px"
          @change="cur_page=1;init()"
          @clear="cur_page=1;init()"
        >
          <el-option-group
            v-for="group in orgList"
            :key="group.name"
            :label="group.name"
          >
            <el-option
              v-for="item in group.value"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.name }} </span>
              <span style="float: left;color:#cc317f;">{{' ('+ item.code+')' }} </span>
              <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.baseCount }}</span>
            </el-option>
          </el-option-group>
        </el-select>

        <el-input
          v-model="form.keyword"
          clearable
          placeholder="输入关键字"
          style="width: 200px;"
          class="filter-item"
        />
        <!-- 基地状态 -->
        <!-- <el-select v-model="form.bs_base_sta" clearable placeholder="基地状态" class="filter-item" style="width: 120px" @change="cur_page=1,init()">
          <el-option label="在线" value="1" />
          <el-option label="离线" value="2" />
        </el-select> -->
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="onSearch"
        >搜索</el-button>
      </div>

    </div>
    <el-card shadow="never">
      <!-- <div style="float:left;width:200px">
        <el-tree
          ref="tree"
          v-model="deptId"
          :highlight-current="true"
          :data="depts"
          node-key="id"
          default-expand-all
          @node-click="handleNodeClick"/>
      </div>
      <div style="float:left;width:calc(100% - 200px)">-->
      <div>
        <!-- tooltip-effect="dark" -->
        <el-table
          ref="multipleTable"
          :data="data"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column
            type="selection"
            width="30"
          /> -->
          <!-- <el-table-column prop="bs_org_name" label="单位名称" min-width="140" /> -->
          <el-table-column
            label="单位"
            min-width="200"
          >
            <template slot-scope="scope">
              <div><label>{{ scope.row.bs_org_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({{ scope.row.bs_org_code }})</label></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="基地名称"
            min-width="140"
          />
          <el-table-column
            prop="code"
            label="基地编码"
            min-width="100"
          />
          <el-table-column
            prop="linkman"
            label="负责人"
            min-width="120"
          />
          <el-table-column
            prop="mobile"
            label="联系电话"
            min-width="120"
          />
          <!-- <el-table-column label="基地状态" min-width="120" >
            <template slot-scope="scope">
              <span>{{ scope.row.bs_base_sta === 0 ? "离线" : "在线" }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            :show-overflow-tooltip="true"
            prop="create_date"
            label="创建日期"
          >
            <template slot-scope="scope"><span>{{ parseTime(scope.row.create_date) }}</span></template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="280"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handelWatch(scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handelEdit(scope.row)"
              >编辑</el-button>
              <el-dropdown
                split-button
                size="mini"
                type="primary"
                @command="handleCommand($event,scope.row,scope.$index)"
              >更多
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="$store.state.baseinfo.cur_user_level<=2"
                    command="transferBase"
                  >迁移基地</el-dropdown-item>
                  <el-dropdown-item command="map">地图</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          :current-page.sync="cur_page"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
        <eAdd
          ref="eAdd"
          @upDateInfoList="upDateInfoList"
        />
        <eForm
          ref="eForm"
          @upDateInfoList="upDateInfoList"
        />
      </div>
    </el-card>
    <el-dialog
      :visible.sync="eViewVisible"
      title="基地信息"
      append-to-body
      width="80%"
    >
      <eView
        v-if="eViewVisible"
        ref="eView"
        :baseid="eView_baseId"
        :orgid="eView_orgId"
      />
    </el-dialog>
    <transferBase ref="transferBase" />
  </div>
</template>

<script>
import { getDepts } from '@/api/dept'
import { orgSelect } from '@/api/org'
import { getBaseINfoData, deleteById, getBaseCountGroupDeptType } from '@/api/baseInfo'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/date'
import eAdd from './module/form1'
import eForm from './module/form1'
import eView from './module/view'
import transferBase from './module/transferBase'
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
import bus from '@/components/common/bus.js'

export default {
  components: {
    eAdd,
    eForm,
    eView,
    transferBase,
  },
  mixins: [initData],
  data () {
    return {
      eViewVisible: false,
      deptId: null,
      depts: [],
      form: {
        bs_org_id: null,
        bs_org_type: '',
        keyword: '',
        bs_base_sta: '1'
      },
      orgTypeList: [],
      orgList: [],
      tableData: [],
      cur_page: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      unwatch: null,
      childForm: {},
      eView_baseId: null,
      eView_orgId: null
    }
  },
  props: {
    orgid: {
      type: Number,
      default: null
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
    },
    ...mapGetters(['curOrgId'])
  },
  created () {
    this.$nextTick(() => {
      // this.getDeptSelect()
      this.getBaseCountGroupDeptType()
      this.init()
    })
  },
  activated () {
    console.log('in info activated, create watch')
    this.unwatch = this.$store.watch((state, getters) => {
      return getters['curOrgId']
    }, (newVal, oldVal) => {
      this.cur_page = 1
      this.getData(newVal)
      this.bs_org_id = newVal
    })
  },
  deactivated () {
    console.log('in info deactivated, stop watch')
    this.unwatch = null
  },
  methods: {
    getBaseCountGroupDeptType () {
      orgSelect().then(res => {
        if (res.code === 200) {
          this.orgList = res.data
        }
      })
    },
    beforeInit () {
      this.url = '/bs/bs_base/baseList'
      this.params = {
        bs_org_id: this.orgid || this.form.bs_org_id,
        keyword: this.form.keyword,
        bs_base_sta: this.form.bs_base_sta,
        page: this.cur_page,
        size: this.pageSize,
        excludeImplement: true
      }
      // if (this.form.bs_org_type !== '' && this.form.bs_org_type !== null) { this.params['bs_org_type'] = this.form.bs_org_type }

      return true
    },
    // getDeptSelect() {
    //   this.cur_page = 1
    //   this.form.bs_org_id = null
    //   getDepts({ type: this.form.bs_org_type, getTree: false }).then(res => {
    //     if (res.code === 200) {
    //       this.orgList = res.data
    //       this.init()
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })
    // },
    parseTime,
    // getDeptData() {
    //   getDepts().then(res => {
    //     this.depts = res.data.content
    //     // this.$refs.tree.setCurrentKey(1)
    //   })
    // },
    sizeChange: function (pageSize) { // 每页条数切换
      this.pageSize = pageSize
      this.pageChange(this.cur_page)
    },
    // 分页
    pageChange (val) {
      this.cur_page = val
      this.init()
    },
    getData (bs_org_id) {
      getBaseINfoData({ bs_org_id, page: this.cur_page, size: this.pageSize }).then(res => {
        res.data.content.map(v => {
          const date = new Date(v.create_date)
          v.create_date = formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        })
        this.tableData = res.data.content
        this.total = res.data.totalElements
      })
    },
    onSearch () {
      this.cur_page = 1
      this.init()
    },
    reset () {
      this.$refs.form.resetFields()
    },
    handelEdit (row) {
      // this.childForm = row
      this.$refs.eForm.showDialog()
      this.$refs.eForm.getData(row.id)
    },
    handelWatch (row) {
      this.eView_baseId = row.id
      this.eView_orgId = row.bs_org_id
      this.eViewVisible = true
    },
    // 添加编辑地图选项 20190426 小廖添加
    handelMap (index, row) {
      this.$router.push({ path: '/map', query: { mapForm: index.id } })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    handelDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById({ bs_base_id: index.id }).then(res => {
          if (res.code === 200) {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
            this.init()
            bus.$emit('getBaseList')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      })
    },
    upDateInfoList (msg) {
      this.getData(this.bs_org_id || msg)
    },
    handleCommand (command, index, row) {
      if (command === 'map') {
        this.handelMap(index, row)
      } else if (command === 'delete') {
        this.handelDelete(index, row)
      } else if (command === 'transferBase') {
        this.$refs.transferBase.showDialog(index.bs_org_id, index.id)
      }
    },
    handleNodeClick (data, node) {
      this.deptId = data.id
      this.init()
    }
  }
}
</script>o

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

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

.bottom-content
  justify-content space-between

.el-table
  font-size 14px

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777

.main-panel
  height calc(100% - 100px)
  background #FFFFFF
</style>
