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
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 0"
            @click="edit(scope.row)"
            type="primary"
            size="small"
          >修改</el-button>
          <el-button
            v-if="scope.row.status === 1"
            @click="view(scope.row)"
            type="success"
            size="small"
          >查看</el-button>
          <el-button
            @click="del(scope.row)"
            icon="el-icon-delete"
            type="danger"
            size="small"
            :disabled="scope.row.status?true:false"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="故障申报"
      :visible.sync="dialogVisible"
      width="80%"
      append-to-body
    >
      <addRepair ref="addRepair" />
    </el-dialog>
  </div>
</template>
<script>
import addRepair from "./addRepair"
import { deleteWaitInfo } from "@/api/equip_repair"
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    addRepair
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    del (item) {
      this.$confirm('是否删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = new FormData()
        data.append("id", item.id)
        deleteWaitInfo(data).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.$parent.getRepairListInfo();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    view (item) {
      this.edit(item)
    },
    edit (item) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addRepair.getDetail(item.id);
        this.$refs.addRepair.images = [];
        this.$refs.addRepair.images_path = [];
      })
    }
  }
}
</script>