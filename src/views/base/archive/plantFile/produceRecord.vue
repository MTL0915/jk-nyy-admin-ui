<template>
  <div
    style="background: #ffffff;"
    class="farmBox"
  >
    <div style="display:flex;justify-content: space-between;padding: 10px;">
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="addFarm"
        >新增</el-button>
      </div>
      <div>
        <div style="display:flex;">
          <div class="searchBtn">
            <span
              class="searchClick"
              v-for="(item, index) in recordSourceOptions"
              :key="index"
              :class="item.value===recordSource ? 'searchClickActive': ''"
              @click="recordSource=item.value;page=1;init();"
            >
              {{ item.name }}
            </span>
          </div>
          <!-- <el-select
            style="margin-left: 10px;width:120px;"
            clearable
            size="mini"
            v-model="recordSource"
            placeholder="来源"
            @change="page=1;init()"
          >
            <el-option
              v-for="item in recordSourceOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select> -->
          <el-select
            v-show="!agroProduceArchiveId"
            style="margin-left: 10px;width:120px;"
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
            style="width:150px;margin-left: 10px;"
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
          style="width:150px;margin-left: 10px;"
          v-show="!agroProduceArchiveId"
          clearable
          size="mini"
          v-model="timeType"
          placeholder="种植时间"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in timeTypeOptions"
            :key="item.key"
            :label="item.name"
            :value="item.key"
          />
        </el-select>
        -->
          <el-select
            v-show="!agroProduceArchiveId"
            style="width:120px;margin-left: 10px;"
            size="mini"
            v-model="agro_produce_record_type_id"
            placeholder="农事类型"
            clearable
            @change="page=1;init()"
          >
            <el-option
              v-for="item in recordTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

          <el-select
            style="width:120px;margin-left: 10px;"
            v-show="!agroProduceArchiveId"
            clearable
            size="mini"
            v-model="sta"
            placeholder="工作状态"
            @change="page=1;init()"
          >
            <el-option
              v-for="item in staOptions"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            />
          </el-select>

          <el-input
            v-model="keyword"
            placeholder="输入关键词"
            size="mini"
            style="width:120px;margin-left: 10px;"
            clearable
          />
          <el-button
            style="margin-left: 5px;"
            type="success"
            size="mini"
            @click="page=1;init()"
          >搜索</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
    >
      <el-table-column
        v-if="!agroProduceArchiveId"
        prop="rs_facilities_name"
        label="所属地块"
      />
      <el-table-column
        v-if="!agroProduceArchiveId"
        label="种植档案"
      >
        <template slot-scope="scope">
          {{scope.row.agroProduceArchiveName}}
          <span
            v-if="!scope.row.startTime"
            style="color: #ff002d;"
          >(待完成)</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="produceRecordType_name"
        label="农事类型"
      />
      <el-table-column
        prop="name"
        label="标题"
      />
      <el-table-column
        label="开始时间"
        width="300px"
      >
        <template slot-scope="scope">
          {{getTime(scope.row.startTime)}}
        </template>
      </el-table-column>
      <el-table-column
        label="工作时长"
        width="300px"
      >
        <template slot-scope="scope">
          {{getDuration(scope.row.duration)}}
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div style="display:flex;width: 100%;">
            <div v-if="scope.row.images.length > 0">
              <img
                :src="scope.row.images[0].imagePath"
                class="avatar"
              >
            </div>
            <!-- <div
              v-show="scope.row.images.length > 0"
              v-for="(item, index) in scope.row.images"
              :key="index"
            >
              <img
                :src="item.imagePath"
                class="avatar"
              >
            </div> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180px"
      >
        <template slot-scope="scope">
          <el-button
            :type="getEditButtonPrimary(scope.row)"
            size="mini"
            @click="editFarm(scope.row)"
          >{{getEditButton(scope.row)}}</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteFarm(scope.row.id)"
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
    <el-dialog
      v-if="produceRecordFormDialogVisible"
      :title="title"
      append-to-body
      :visible.sync="produceRecordFormDialogVisible"
      width="600px"
    >
      <produceRecordForm
        :recordId="recordId"
        :agroProduceArchiveId="agroProduceArchiveId"
        ref="produceRecordForm"
      />
    </el-dialog>
  </div>
</template>
<script>
import { agroProduceRecordTypeList, agroProduceRecordList, deleteAgroProduceRecordById } from '@/api/agroProduceRecord'
import produceRecordForm from './produceRecordForm'
import { formatDate } from "@/utils/date";
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { agroProduceArchiveList } from '@/api/agroProduceArchive'

export default {
  components: {
    produceRecordForm
  },
  props: {
    agroProduceArchiveId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      dataList: [],
      recordId: null,
      produceRecordFormDialogVisible: false,
      keyword: null,
      rs_facilities_id: null,
      timeType: null,
      agro_produce_record_type_id: null,
      total: 0,
      page: 1,
      size: 5,
      facilitiesList: [],
      recordTypeOptions: [],
      archiveList: [],
      apaId: null,
      title: '',
      recordSource: "assignedToMe",
      timeTypeOptions: [
        //{ name: "全部", key: "all" },
        { name: "当前种植", key: "now" },
        { name: "历史种植", key: "history" },
        //{ name: "计划种植", key: "plan" },
      ],
      sta: "",
      staOptions: [
        { name: "已完成", value: 1 },
        { name: "未完成", value: 0 },
      ],
      recordSourceOptions: [
        { name: "全部", value: "" },
        { name: "指派给我", value: "assignedToMe" },
        { name: "由我创建", value: "createByMe" }
      ]
    }
  },
  created () {
    getFacilitiesCountArchive({ type: 'all', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.facilitiesList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    agroProduceRecordTypeList().then(res => {
      this.recordTypeOptions = res.data
    })
    agroProduceArchiveList({ lte_start_time: this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.archiveList = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
    this.init()
  },
  methods: {
    formatDate,
    getEditButton (row) {
      if (row.startTime && row.endTime) {
        return '编辑'
      } else {
        return '完成'
      }
    },
    getEditButtonPrimary (row) {
      if (row.startTime && row.endTime) {
        return 'primary'
      } else {
        return 'success'
      }
    },
    init () {
      agroProduceRecordList({
        agro_produce_archive_id: this.agroProduceArchiveId || this.apaId,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: this.rs_facilities_id,
        keyword: this.keyword,
        sta: this.sta,
        timeType: this.timeType,
        agro_produce_record_type_id: this.agro_produce_record_type_id,
        recordSource: this.recordSource,
        page: (this.page - 1),
        size: this.size,
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.totalElements
          if (this.total != 0) {
            res.data.content.map(v => {
              v.images.map(s => {
                s.imagePath = process.env.IMG_URL + s.imagePath
              })
            })
          }
          this.dataList = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDuration (duration) {
      if (duration % 86400000 === 0) {
        return (duration / 86400000) + '天'
      } else if (duration % 3600000 === 0) {
        return (duration / 3600000) + '小时'
      } else {
        return (duration / 60000) + '分钟'
      }
    },
    getTime (time) {
      if (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
      } else {
        return ''
      }
    },
    deleteFarm (id) {
      this.$confirm('是否进行删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgroProduceRecordById({ id: id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.init()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    },
    addFarm () {
      this.recordId = null
      this.title = '添加农事记录'
      this.produceRecordFormDialogVisible = true
    },
    editFarm (row) {
      this.recordId = row.id
      if (row.startTime && row.endTime) {
        this.title = '修改农事记录'
      } else {
        this.title = '完成农事任务'
      }
      this.produceRecordFormDialogVisible = true
    },
    // 分页
    pageChange (val) {
      this.page = val
      this.init()
    },
    timeTypeChange (item) {
      if (item.key == this.timeType) {
        return
      }
      this.timeType = item.key;
      this.init()
    },
  }
}
</script>
<style lang="stylus" scoped>
.farmBox
  >>>.el-dialog__body
    overflow hidden

.avatar
  margin-right 10px
  vertical-align middle
  width 100px
  height 100px

.searchBtn
  margin-left 20px
  cursor pointer

.searchClick
  display inline-block
  height 30px
  line-height 30px
  padding 0 10px
  margin 0 5px
  font-size 14px
  border-radius 15px

.searchClickActive
  background #84C710
  color #fff

>>>.img-uploader
  display inline-block
  width 100px
  height 100px
  text-align center
  line-height 100px
  border 1px dashed #ccc
</style>