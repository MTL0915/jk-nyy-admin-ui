<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        prop="bs_base_name"
        label="基地"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="设备名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="device_id"
        label="设备序列号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="登记时间"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <div>
            <span
              v-show="scope.row.status === 0"
              style="color:red"
            >待处理</span>
            <span
              v-show="scope.row.status === 1"
              style="color:#67C23A"
            >已处理</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 0"
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
          >检修</el-button>
          <el-button
            v-if="scope.row.status === 1"
            @click="handleClick(scope.row)"
            type="success"
            size="small"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="故障检修"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <faultHandle ref="faultHandle" />
    </el-dialog>
  </div>
</template>
<script>
import faultHandle from "./faultHandle"
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    faultHandle
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClick (item) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.faultHandle.getDetail(item.id);
      })
    }
  }
}
</script>