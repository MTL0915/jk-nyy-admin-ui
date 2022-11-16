<template>
  <div>
    <div>
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
          >添加</el-button>
          <!-- <el-button icon="el-icon-close" type="danger" size="mini" @click="delAll">删除</el-button> -->
        </div>
        <div style="text-align:right;margin-right:10px">
          <el-input
            v-model="s_name"
            placeholder="筛选关键词"
            class="handle-input ml10"
          />
          <el-select
            v-model="s_prod"
            placeholder="筛选产品名称"
            class="ml10"
            clearable
          >
            <el-option
              v-for="item in prod_list"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-select
            v-model="s_code"
            placeholder="筛选设备功能"
            class="mr10 ml10"
            clearable
          >
            <el-option
              v-for="item in device_functionDicts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="success"
            icon="el-icon-search"
            size="mini"
            @click="search"
          >搜索</el-button>
          <el-button
            v-if="is_search"
            type="primary"
            size="mini"
            @click="clearSearch"
          >清空</el-button>
        </div>
        <div style="clear:both;" />
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        :default-sort="{prop: 'order', order: 'descending'}"
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
          label="设备名称"
          align="center"
          width="200"
        />
        <el-table-column
          prop="code"
          label="设备类型编号"
          align="center"
          width="150"
        />
        <el-table-column
          prop="hd_product_name"
          label="产品"
          align="center"
          width="150"
        />
        <el-table-column
          :formatter="getFunctionCodeName"
          prop="function_code"
          align="center"
          label="网络层级"
          width="150"
        />
        <el-table-column
          :formatter="getTypeName"
          prop="type"
          label="设备类型"
          align="center"
          width="150"
        />
        <el-table-column
          prop="image_path"
          label="图标"
          align="center"
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
          prop="ord"
          width="100"
          sortable
          align="center"
          label="排序"
        />
        <el-table-column
          label="操作"
          align="center"
          width="250"
        >
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

            <el-dropdown
              split-button
              size="mini"
              type="primary"
              @command="handleCommand($event,scope.row)"
            >
              更多
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-upload"
                  command="versionManager"
                >版本管理</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-setting"
                  command="dataDefine"
                >数据定义</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-connection"
                  command="attributeDefine"
                >属性定义</el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-connection"
                  command="initProductByDeviceType"
                >同步到设备与出厂</el-dropdown-item>
                <!-- 转移到出厂设备进行配置通道信息 -->
                <!-- <el-dropdown-item icon="el-icon-setting" command="channelConfig">通道配置</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
      <div
        class="pagination"
        style="margin-top:10px"
      >
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

    <versionManager ref="versionManager" />
    <dataDefine ref="dataDefine" />
    <channelConfig ref="channelConfig" />
    <edit ref="edit" />
    <add ref="add" />
    <el-dialog
      v-if="deviceTypeAttributeDialogVisible"
      :visible.sync="deviceTypeAttributeDialogVisible"
      append-to-body
      title="设备类型属性定义"
    >
      <deviceTypeAttribute :hd_device_type_id="hd_device_type_id" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  deleteById
} from '@/api/equiptype'
import { queryProduct } from '@/api/product'
import edit from './module/edit'
import add from './module/add'
import versionManager from './module/versionManager'
import dataDefine from './module/dataDefine'
import channelConfig from './module/channelConfig'
import deviceTypeAttribute from './module/deviceTypeAttribute'
import initDict from '@/mixins/initDict'
import { initProductByDeviceType } from '@/api/hd_device_type'

export default {
  name: 'Basetable',
  components: { dataDefine, channelConfig, edit, add, versionManager, deviceTypeAttribute },
  mixins: [initDict],
  data () {
    return {
      device_functionDicts: null, // 设备功能字典
      device_typeDicts: null,
      communication_typeDicts: null, // 设备通讯方式字典
      signal_channelDicts: null, // 设备信号通道字典
      prod_list: [], // 产品列表

      tableData: [],
      pageSize: 10,
      totalNum: 0,
      cur_page: 1,
      multipleSelection: [],
      s_name: '',
      s_prod: '',
      s_code: '',
      del_list: [],
      is_search: false,
      deviceTypeAttributeDialogVisible: false,
      hd_device_type_id: null
    }
  },
  computed: {
    data () {
      return this.tableData.filter(d => {
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
    this.$nextTick(() => {
      this.getDict2(this, 'device_functionDicts', 'device_function')
      this.getDict2(this, 'device_typeDicts', 'device_type')
      this.getDict2(this, 'communication_typeDicts', 'communication_type')
      this.getDict2(this, 'signal_channelDicts', 'signal_channel')

      this.getProductData()
      this.getData()
    })
  },
  methods: {
    handleCommand (command, row) {
      if (command === 'dataDefine') {
        this.$refs.dataDefine.showDialog(row.id, row.name)
      } else if (command === 'channelConfig') {
        this.$refs.channelConfig.showDialog(row.id, row.name)
      } else if (command === 'versionManager') {
        this.$refs.versionManager.showDialog(row)
      } else if (command === 'attributeDefine') {
        this.hd_device_type_id = row.id
        this.deviceTypeAttributeDialogVisible = true
      } else if (command === 'initProductByDeviceType') {
        initProductByDeviceType({
          hd_device_type_id: row.id
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleSizeChange: function (pageSize) {
      // 每页条数切换
      this.pageSize = pageSize
      this.handleCurrentChange(this.cur_page)
    },
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },
    // 获取prod数据
    getProductData () {
      queryProduct().then(res => {
        this.prod_list = res.data.content
      })
    },
    // 获取列表数据
    getData () {
      const _params = {
        size: this.pageSize,
        page: this.cur_page
      }
      if (this.is_search) {
        if (this.s_name) {
          _params.name = this.s_name
        }
        if (this.s_prod) {
          _params.hd_product_name = this.s_prod
        }
        if (this.s_code) {
          _params.function_code = this.s_code
        }
      }
      getList(_params).then(res => {
        this.tableData = res.data.content
        this.totalNum = res.data.totalElements
      })
    },
    search () {
      this.is_search = true
      this.cur_page = 1
      this.getData()
    },
    clearSearch () {
      this.is_search = false
      this.s_name = ''
      this.s_prod = ''
      this.s_code = ''
      this.getData()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      this.$refs.edit.show(row)
    },
    handleAdd () {
      this.$refs.add.show()
    },
    handleDelete (index, row) {

      this.$confirm('是否确认删除该设备类型?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        deleteById({ hd_device_type_id: row.id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        }
        )
      })
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    getLogo (img) {
      if (img === null) {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },
    getFunctionCodeName (row, column) {
      var device_functionDicts = this.device_functionDicts
      if (!device_functionDicts) {
        return ''
      }
      const _curProd = this.device_functionDicts.find(function (element) {
        return element.value === row.function_code
      })
      if (_curProd) {
        return _curProd.label
      }
      return ''
    },
    getTypeName (row, column) {
      var device_typeDicts = this.device_typeDicts
      if (!device_typeDicts) {
        return ''
      }
      const _curProd = this.device_typeDicts.find(function (element) {
        return element.value === row.type
      })
      if (_curProd) {
        return _curProd.label
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.handle-input
  width 120px
  display inline-block

.del-dialog-cnt
  font-size 16px
  text-align center

.table
  width 100%
  font-size 14px

.red
  color #ff0000

.ml10
  margin-left 10px

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

