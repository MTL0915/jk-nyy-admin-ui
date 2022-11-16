<template>
  <div>
    <div class="card">
      <el-form
        ref="form"
        :model="form"
        label-width="85px"
      >
        <div
          class="flex"
          style="margin-bottom:20px"
        >
          <el-form-item label="登录名称：">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="form.phone"/>
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select
              v-model="form.region"
              placeholder="请选择"
            >
              <el-option
                key="sy"
                label="所有"
                value="sy"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="创建时间：">
            <el-col :span="10">
              <el-date-picker
                v-model="form.date1"
                type="datetime"
                placeholder="开始时间"
                style="width: 100%;"
              />
            </el-col>
            <el-col
              :span="1"
              style="text-align:center"
            >-</el-col>
            <el-col :span="10">
              <el-date-picker
                v-model="form.date2"
                type="datetime"
                placeholder="结束时间"
                style="width: 100%;"
              />
            </el-col>
          </el-form-item>
          <div style="margin-left:15px">
            <el-button
              round
              icon="el-icon-search"
              type="success"
            >搜索</el-button>
            <el-button
              round
              icon="el-icon-refresh"
              type="warning"
              native-type="reset"
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
          <el-button
            icon="el-icon-download"
            type="success"
          >导入</el-button>
          <el-button
            icon="el-icon-upload2"
            type="warning"
          >导出</el-button>
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
          prop="id"
          label="用户id"
          width="80"
        />
        <el-table-column
          prop="name"
          label="基地名称"
          width="100"
        />
        <el-table-column
          prop="org"
          label="所属组织"
          width="100"
        />
        <el-table-column
          prop="phone"
          label="手机"
          width="120"
        />
        <el-table-column
          label="用户状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#23C6C8"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建时间"
          sortable
          width="180"
        />
        <el-table-column
          label="操作"
          align="center"
          min-width="210"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handelDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              type="success"
            >重置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex bottom-bar">
        <div class="bottom-text">第1到2条，共2条记录。</div>
        <div class="pagination">
          <el-pagination
            :total="5"
            background
            layout="prev, pager, next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoContent',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        date1: '',
        date2: ''
      },
      tableData: [{
        id: '1',
        name: '若依',
        org: '研发部门',
        phone: '15888888888',
        state: true,
        time: '2018-03-16 11:30:00'
      }, {
        id: '2',
        name: '若依',
        org: '测试部门',
        phone: '16888888888',
        state: true,
        time: '2018-03-16 11:30:00'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handelAdd() {
      this.$router.push('/userAdd')
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handelDelete(index, row) {
      this.tableData.splice(index, 1)
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

.bottom-bar
  justify-content space-between

.bottom-text
  font-size 12px
  color #777
</style>
