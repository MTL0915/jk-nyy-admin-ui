<template>
  <div>
    <el-card shadow="never">
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="rs_facilities_name"
          label="所在地块"
        />
        <el-table-column
          prop="crop_name"
          label="作物名称"
        />
        <el-table-column
          prop="crop_image_path"
          label="作物图片"
        >
          <template slot-scope="scope">
            <img
              :src="getImg(scope.row.crop_image_path)"
              min-width="40"
              height="40"
            >
          </template>
        </el-table-column>
        <el-table-column label="排产标准">
          <template slot-scope="scope">
            <div>
              <label v-if="scope.row.plant_norm===0">有机</label>
              <label v-if="scope.row.plant_norm===1">绿色</label>
              <label v-if="scope.row.plant_norm===2">无公害</label>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="acreage"
          label="排产面积"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="plant_start_time"
          label="定植时间"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.plant_start_time).substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="recovery_time"
          label="采收时间"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.recovery_time).substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="plant_end_time"
          label="结束日期"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.plant_end_time).substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="400"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="margin-left:10px"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handelDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 删除提示框 -->
      <el-dialog
        :visible.sync="delVisible"
        append-to-body
        title="提示"
        width="300px"
        center
      >
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="deleteRow"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!--分页组件-->
      <el-pagination
        :total="total"
        :current-page="page"
        :page-size="pageSize"
        style="margin-top: 8px;"
        layout="total, prev, pager, next"
        @current-change="pageChange"
      />
    </el-card>
  </div>
</template>

<script>
import { apsList, apsDelete } from '@/api/rs_facilities'
import { parseTime } from '@/utils/index'

export default {
  components: {
  },
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      page: 1,
      total: 0,
      pageSize: 10,
      data: [],
      delVisible: false,
      rs_facilities_ids: '',
      crop_name: '',
      plant_time_quantum: null,
      plant_start_time: null,
      plant_end_time: null,
      deleteId: ''
    }
  },
  created () {
  },
  methods: {
    getImg (img) {

      if (img === null) {
        return ''
      }
      if (img.indexOf('blob') > -1) {
        return img
      }
      return process.env.IMG_URL + img
    },
    parseTime,
    edit (id) {
      this.sup_this.dialogTitle = '修改'
      this.sup_this.dialogVisible = true
      this.$nextTick(() => {
        this.sup_this.$refs.apsAddEdit.getData(id)
      })
    },
    handelDelete (row) {
      this.deleteId = row.id
      this.delVisible = true
    },
    deleteRow () {
      apsDelete({ id: this.deleteId }).then(res => {
        if (res.code === 200) {
          this.page = 1
          this.$message.success('删除成功!')
          this.delVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 翻页
    pageChange (val) {
      this.page = val
      this.getData()
    },
    getData () {
      apsList({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_ids: this.rs_facilities_ids,
        crop_name: this.crop_name,
        plant_time_quantum: this.plant_time_quantum,
        plant_start_time: this.plant_start_time,
        plant_end_time: this.plant_end_time,
        page: this.page,
        size: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.totalElements
          this.data = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

