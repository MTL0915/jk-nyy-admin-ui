<template>
  <div style="background: #ffffff;">
    <!-- 头部 -->
    <div style="display:flex;justify-content: space-between;padding: 10px;">
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="add"
        >新增</el-button>
      </div>
      <div>
        <el-select
          v-show="!agroProduceArchiveId"
          style="margin-left: 10px;"
          clearable
          size="mini"
          v-model="rs_facilities_id"
          placeholder="所在地块"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in facilitiesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-show="!agroProduceArchiveId"
          style="width:200px;margin-left: 10px;"
          size="mini"
          v-model="apaId"
          @change="page=1;init()"
          clearable
          placeholder="请选择种植档案"
        >
          <el-option
            v-for="item in archiveList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.classification_name+'('+item.productBreed_name+')' }}</span>
          </el-option>
        </el-select>

        <!--
        <el-select
          style="margin-left: 10px;width:100px;"
          clearable
          size="mini"
          v-model="sta"
          placeholder="状态"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in staOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
         -->
         <!--
        <el-select
          style="margin-left: 10px;width:130px;"
          clearable
          size="mini"
          v-model="timeType"
          placeholder="计划时间"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in timeTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
         -->
         <el-select
          style="margin-left: 10px;width:130px;"
          clearable
          size="mini"
          v-model="finish"
          placeholder="计划状态"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in finishTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>

        <el-input
          clearable
          style="width:130px;"
          size="mini"
          v-model="keyword"
          placeholder="请输入关键词"
        />
        <el-button
          type="success"
          size="mini"
          @click="page=1;init()"
        >搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="种植档案">
          <template slot-scope="scope">
            {{scope.row.agroProduceArchiveName}}
          </template>
        </el-table-column>
        <el-table-column label="计划名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            {{getDate(scope.row.startTime)}}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            <div v-if="scope.row.endTime">
              {{getDate(scope.row.endTime)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="周期">
          <template slot-scope="scope">
            <div v-if="scope.row.cycleStr">
              <p>{{scope.row.cycleStr}}</p>
              <p>工作时间：{{scope.row.hourMinute}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="启动状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.finish === 1"
              v-model="scope.row.sta"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value=1
              :inactive-value=0
              @change=staChange(scope.row)
            />
          </template>
        </el-table-column>
        <el-table-column label="计划状态">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.finish === 1"
              type="success"
            >已完成</el-tag>
            <el-tag
              v-if="!scope.row.finish"
            >正在执行</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <!-- <el-button
              type="warning"
              size="mini"
            >完成</el-button> -->
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope.row.id)"
            >{{scope.row.finish === 1?'查看':'编辑'}}</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deletePlan(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :current-page="page"
        @current-change="pageChange"
      />
    </div>
    <el-dialog
      v-if="producePlanFormDialogVisible"
      title="农事计划"
      append-to-body
      width="600px"
      :visible.sync="producePlanFormDialogVisible"
    >
      <producePlanForm
        :agroProducePlanId="agroProducePlanId"
        :agroProduceArchiveId="agroProduceArchiveId"
        :facilitiesId="facilitiesId"
      />
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date"
import producePlanForm from './producePlanForm'
import { agroProducePlanList, deleteAgroProducePlan, agroProducePlanChangeSta } from '@/api/agroProducePlan'
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { agroProduceArchiveList } from '@/api/agroProduceArchive'

export default {
  components: {
    producePlanForm
  },
  props: {
    agroProduceArchiveId: {
      type: Number,
      default: null
    },
    facilitiesId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      producePlanFormDialogVisible: false,
      rs_facilities_id: null,
      apaId: null,
      keyword: null,
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      sta: null,
      timeType: null,
      finish:null,
      facilitiesList: [],
      archiveList: [],
      timeTypeOptions: [{ name: '当前计划', value: 'now' }, { name: '历史计划', value: 'history' }, { name: '将来计划', value: 'plan' }],
      finishTypeOptions: [{ name: '正在执行', value: 0 },{ name: '已完成', value: 1 }],
      staOptions: [{ name: '启用', value: 1 }, { name: '禁用', value: 0 }],
      cycleOptions: [
        { name: '星期一', value: '1' },
        { name: '星期二', value: '2' },
        { name: '星期三', value: '3' },
        { name: '星期四', value: '4' },
        { name: '星期五', value: '5' },
        { name: '星期六', value: '6' },
        { name: '星期日', value: '0' },
      ],
    }
  },
  created () {
    this.init()
    getFacilitiesCountArchive({ type: 'all', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.facilitiesList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    agroProduceArchiveList({ timeType: 'all', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.archiveList = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    formatDate,
    // 分页
    pageChange (val) {
      this.page = val
      this.init()
    },
    getDate (time) {
      return this.formatDate(new Date(time), 'yyyy-MM-dd')
    },
    getDate2 (time) {
      return this.formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
    },
    init () {
      agroProducePlanList({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: this.rs_facilities_id,
        agro_produce_archive_id: this.apaId || this.agroProduceArchiveId,
        keyword: this.keyword,
        timeType: this.timeType,
        finish:this.finish,
        sta: this.sta,
        page: (this.page - 1),
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          const _this = this
          res.data.content.map(v => {
            if (v.cycle) {
              let a = []
              let c = v.cycle.split(',')
              c.map(u => {
                _this.cycleOptions.map(p => {
                  if (u === p.value) {
                    a.push(p.name)
                  }
                })
              })
              if (a.length === 7) {
                v.cycleStr = '每天'
              } else {
                v.cycleStr = a.join(',')
              }
            } else {
              v.cycleStr = '特定时间'
              v.hourMinute = _this.getDate2(v.startTime).substring(11, 16)
            }
          })
          this.total = res.data.totalElements
          this.tableData = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    add () {
      this.agroProducePlanId = null
      this.producePlanFormDialogVisible = true
    },
    edit (id) {
      this.agroProducePlanId = id
      this.producePlanFormDialogVisible = true
    },
    deletePlan (id) {
      this.$confirm('是否进行删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgroProducePlan({ id: id }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.page = 1
            this.init()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    },
    staChange (item) {
      let s = item.sta
      agroProducePlanChangeSta({ id: item.id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          item.sta = (s === 1) ? 0 : 1
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>