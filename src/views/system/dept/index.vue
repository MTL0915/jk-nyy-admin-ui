<template>
  <div>
    <eHeader
      :query="query"
      :sup_this="sup_this"
      :dicts="dicts"
    />
    <!--表格渲染-->
    <el-card shadow="never">
      <tree-table
        v-loading="loading"
        :expand-all="expand"
        :data="data"
        :columns="columns"
        size="small"
      >
        <el-table-column
          prop="code"
          label="组织编码"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <div
              v-for="item in dicts"
              :key="item.id"
            >
              <el-tag
                v-if="scope.row.enabled.toString() === item.value"
                :type="scope.row.enabled ? '' : 'info'"
              >{{ item.label }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-user"
              @click="orgManage(scope.row.id)"
            />
            <edit
              :dicts="dicts"
              :data="scope.row"
              :sup_this="sup_this"
            />
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180"
            >
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="$refs[scope.row.id].doClose()"
                >取消</el-button>
                <el-button
                  :loading="delLoading"
                  type="primary"
                  size="mini"
                  @click="subDelete(scope.row.id)"
                >确定</el-button>
              </div>
              <el-button
                :disabled="!checkClick(scope.row)"
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              />
            </el-popover>
          </template>
        </el-table-column>
      </tree-table>
    </el-card>
    <el-dialog
      :visible.sync="delVisible"
      append-to-body
      title="组织管理"
      center
      width="1200px"
    >
      <orgManage
        v-if="delVisible"
        :orgid=orgid
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import treeTable from '@/components/TreeTable'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import orgManage from './module/orgManage'

export default {
  components: { eHeader, edit, treeTable, orgManage },
  mixins: [initData, initDict],
  data () {
    return {
      columns: [
        {
          text: '名称',
          value: 'name'
        }
      ],
      userLevel: 999, delLoading: false, sup_this: this, expand: true,
      delVisible: false,
      orgid: null
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created () {
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('dept_status')
    })
  },
  mounted () {
    this.userLevel = this.$store.state.baseinfo.cur_user_level
  },
  methods: {
    checkClick (row) {
      //:disabled="scope.row.id === sup_this.user.orgId || scope.row.id === 1"
      if (row.code === 'jk' || row.code === 'jk-000') {
        return false
      } else {
        if (this.userLevel === 1 || this.user.orgCode === 'jk-000') {
          return true
        } else if (this.userLevel === 2 && this.user.orgId !== row.id) {
          return true
        }
      }
      return false
    },
    //点击组织管理
    orgManage (id) {
      this.orgid = id
      this.delVisible = true
    },
    parseTime,
    checkPermission,
    beforeInit () {
      this.url = 'api/dept'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const value = query.value
      const enabled = query.enabled
      const type = query.type
      if (value) { this.params['name'] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      if (type !== '' && type !== null) { this.params['type'] = type }
      return true
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        if (res.code === 200) {
          this.init()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
