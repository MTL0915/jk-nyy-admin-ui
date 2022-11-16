<template>
  <div>
    <!-- 头部 -->
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="add"
      >
        新增
      </el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        />
        <el-table-column
          prop="value"
          label="数值"
        />
        <el-table-column
          prop="unit"
          label="单位"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              @click="editAttribute(scope.row.id)"
              type="primary"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="deleteAttribute(scope.row.id)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-if="deviceTypeAttributeFormDialogVisible"
      :visible.sync="deviceTypeAttributeFormDialogVisible"
      append-to-body
      :title="formId?'编辑属性':'新增属性'"
      width="400px"
    >
      <deviceTypeAttributeForm
        :formId="formId"
        :hd_device_type_id="hd_device_type_id"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getAttributeByDeviceType, deleteAttribute } from '@/api/hd_device_type_attribute'
import deviceTypeAttributeForm from './deviceTypeAttributeForm'

export default {
  components: {
    deviceTypeAttributeForm,
  },
  props: {
    hd_device_type_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      tableData: [],
      formId: null,
      deviceTypeAttributeFormDialogVisible: false,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.hd_device_type_id) {
        getAttributeByDeviceType({ hd_device_type_id: this.hd_device_type_id }).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    add () {
      this.formId = null
      this.deviceTypeAttributeFormDialogVisible = true
    },
    editAttribute (id) {
      this.formId = id
      this.deviceTypeAttributeFormDialogVisible = true
    },
    deleteAttribute (id) {
      this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAttribute({ id: id }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.init()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    }
  }
}
</script>