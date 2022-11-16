<template>
  <div>
    <el-table
      :data="cycleList"
      style="width: 100%"
      border
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="name"
        label="时期名称"
        align="center"
        width="110"
      />
      <el-table-column
        label="时间"
        align="center"
        width="250"
      >
        <template slot-scope="scope">
          {{ getDateStr(scope.row.startTime)+' 至 '+getDateStr(scope.row.endTime)}}
        </template>
      </el-table-column>
      <el-table-column
        label="防治病虫害"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in scope.row.agroProductPests"
            :key="index"
            type="text"
            @click="showPestDetail(item.id)"
          >{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="dialogVisible"
      title="病虫害信息"
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <detail :pestId="pestId" />
      <div style="text-align:right;">
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import detail from '@/views/base/archive/pest/module/detail'
import { formatDate } from "@/utils/date";
import { getAgroProductPestByArchive } from '@/api/agroProductPest'
export default {
  components: {
    detail
  },
  props: {
    agroProduceArchiveId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      cycleList: [],
      cycleIndex: null,
      dialogVisible: false,
      pestId: null,
    }
  },
  created () {
    this.init()
  },
  methods: {
    formatDate,
    showPestDetail (bs_pest_id) {
      this.pestId = bs_pest_id
      this.dialogVisible = true
      // this.$router.push({ path: '/pestDetail', query: { id: bs_pest_id, breadcrumb: 'hide' } })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (this.cycleIndex != null && rowIndex === this.cycleIndex) {
        return 'success-row';
      } else {
        return ''
      }
    },
    getDateStr (datetime) {
      return formatDate(new Date(datetime), 'yyyy年MM月dd日')
    },
    init () {
      if (this.agroProduceArchiveId) {
        getAgroProductPestByArchive({ id: this.agroProduceArchiveId }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.cycleIndex = res.data.cycleIndex
              this.cycleList = res.data.cycleList
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('农产品生产档案不存在!')
      }
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #00fa9a54;
}
</style>