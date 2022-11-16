<template>
  <div class="app-container">
    <eHeader :query="query" />
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%;"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      />
      <el-table-column
        prop="pigfarmname"
        label="猪场名称"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="type"
        label="设备类型"
      />
      <!-- <el-table-column prop="code" label="设备编码"/> -->
      <el-table-column
        prop="ip"
        label="IP"
      />
      <el-table-column
        prop="port"
        label="端口"
      />
      <el-table-column
        prop="order"
        label="排序"
      />
      <!-- <el-table-column prop="info" label="备注"/> -->
      <!-- <el-table-column prop="status" label="状态"/> -->

      <el-table-column
        v-if="checkPermission(['ADMIN','WLWZDSZVIDEO_ALL','WLWZDSZVIDEO_EDIT','WLWZDSZVIDEO_DELETE'])"
        label="操作"
        width="300px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.status=='1'"
            slot="reference"
            size="mini"
            @click="updatastu(scope.row)"
          >正常</el-button>
          <el-button
            v-if="scope.row.status=='0'"
            slot="reference"
            type="danger"
            size="mini"
            @click="updatastu(scope.row)"
          >暂停</el-button>
          <edit
            v-permission="['ADMIN','WLWZDSZVIDEO_ALL','WLWZDSZVIDEO_EDIT']"
            :data="scope.row"
            :sup_this="sup_this"
          />
          <el-popover
            v-permission="['ADMIN','WLWZDSZVIDEO_ALL','WLWZDSZVIDEO_DELETE']"
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
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, editindex } from '@/api/wlwZdszVideo'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data () {
    return {
      delLoading: false, sup_this: this
    }
  },
  created () {

    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit () {
      this.url = 'api/wlwZdszVideo'
      const sort = 'systemusertime,desc'
      this.params = { page: this.page, size: this.size, sort: sort }

      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) {
        this.params[type] = value
      }
      return true

    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    updatastu (row) {

      if (row.status == "1") {
        row.status = 0
      } else if (row.status == "0") {
        row.status = 1
      }

      this.delLoading = false

      editindex(row).then(res => {
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.init()
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
