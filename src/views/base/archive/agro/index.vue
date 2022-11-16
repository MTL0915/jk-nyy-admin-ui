<template>
  <div class="app-container">

    <eHeader
      :query="query"
      :sup_this="sup_this"
    />
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%;"
      :default-sort="{ prop: 'order', order: 'descending' }"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="code"
        label="编码"
      />
      <el-table-column
        prop="alias"
        label="别名"
      />
      <el-table-column
        prop="enName"
        label="英文名"
      />
      <el-table-column
        prop="p_name"
        label="所属分类"
      />
      <el-table-column
        prop="agroProductBreedNum"
        label="品种数量"
        width="70px"
        align="center"
      />
      <el-table-column
        label="缩略图"
        align="center"
      >
        <template slot-scope="scope">
          <img
            :src="getImage(scope.row.imagePath)"
            min-width="60"
            height="60"
          >
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="300px"
        align="center"
      >
        <template slot-scope="scope">
          <edit
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
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popover>

          <!-- 品种管理 -->
          <el-dropdown
            split-button
            size="mini"
            type="primary"
            @click="breedView(scope.row.id)"
            @command="handelDropdown($event, scope.row)"
          >
            品种管理
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cycle">生长周期管理</el-dropdown-item>
              <el-dropdown-item command="pest">病虫害关联</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

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
import { del } from '@/api/agroProductClassification'
import { getImage } from '@/utils/image_util'
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
    getImage: getImage,
    checkPermission,
    handelDropdown (command, row) {
      if (command === 'cycle') {
        this.$router.push({ path: '/cycleManager', query: { agroProductClassification: row.id, breadcrumb: 'hide' } })
      } else if (command === 'pest') {
        this.$router.push({ path: '/pestManager', query: { agroProductClassification: row.id, breadcrumb: 'hide' } })
      }
    },
    breedView (id) {
      this.$router.push({ path: '/breedManager', query: { agroProductClassification: id, breadcrumb: 'hide' } })
    },
    beforeInit () {
      this.url = 'api/agroProductClassification'
      const sort = 'id,desc'
      if (this.query.keyword) {
        this.params = { page: this.page, size: this.size, sort: sort, keyword: this.query.keyword }
      } else {
        this.params = { page: this.page, size: this.size, sort: sort }
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
    }
  }
}
</script>

<style scoped>
</style>
