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
      <el-button
        type="primary"
        size="mini"
        @click="initAttributeByDeviceType"
      >
        根据设备类型初始化
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="initAttributeByFactoryDevice"
      >
        根据出厂配置初始化
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
      v-if="deviceAttributeFormDialogVisible"
      :visible.sync="deviceAttributeFormDialogVisible"
      append-to-body
      :title="formId?'编辑属性':'新增属性'"
      width="400px"
    >
      <deviceAttributeForm
        :formId="formId"
        :hd_device_id="hd_device_id"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getAttributeByDevice, deleteAttribute, initAttributeByFactoryDevice, initAttributeByDeviceType } from '@/api/hd_device_attribute'
import deviceAttributeForm from './deviceAttributeForm'

export default {
  components: {
    deviceAttributeForm,
  },
  props: {
    hd_device_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      tableData: [],
      formId: null,
      deviceAttributeFormDialogVisible: false,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.hd_device_id) {
        getAttributeByDevice({ hd_device_id: this.hd_device_id }).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    initAttributeByDeviceType () {
      initAttributeByDeviceType({ hd_device_id: this.hd_device_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    initAttributeByFactoryDevice () {
      initAttributeByFactoryDevice({ hd_device_id: this.hd_device_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    add () {
      this.formId = null
      this.deviceAttributeFormDialogVisible = true
    },
    editAttribute (id) {
      this.formId = id
      this.deviceAttributeFormDialogVisible = true
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