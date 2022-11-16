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
          placeholder="请选择档案"
        >
          <el-option
            v-for="item in archiveList"
            :key="item.id"
            :label="item.classification_name"
            :value="item.id"
          >
            <span style="float: left">{{ item.classification_name+'('+item.productBreed_name+')' }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rs_facilities_name }}</span>
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 10px;"
          clearable
          size="mini"
          v-model="agro_product_pluck_type_id"
          placeholder="采收类型"
          @change="page=1;init()"
        >
          <el-option
            v-for="item in productPluckTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          type="success"
          size="mini"
          @click="page=1;init()"
        >搜索</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
         <el-table-column
          prop="name"
          label="批次名称"
        />
        <el-table-column label="等级">
          <template slot-scope="scope">
            {{getLevel(scope.row.level)}}
          </template>
        </el-table-column>
        <el-table-column
          v-if="!agroProduceArchiveId"
          prop="rs_facilities_name"
          label="所属地块"
        />
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            {{scope.row.agro_product_classification_name+'('+scope.row.agro_product_breed_name+')'}}
          </template>
        </el-table-column>
        <el-table-column label="采收时间">
          <template slot-scope="scope">
            {{getDate(scope.row.pluckTime)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="agro_product_pluck_type_name"
          label="采收类型"
        />
        <el-table-column
          prop="weight"
          label="采收重量（公斤）"
        />
        <el-table-column
          v-if="!agroProduceArchiveId"
          label="图片"
          width="150px"
        >
          <template slot-scope="scope">
            <div style="display:flex;width: 100%;">
              <div v-if="scope.row.imagePath">
                <img
                  :src="scope.row.imagePath"
                  class="avatar"
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteBatch(scope.row.id)"
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
      v-if="produceBatchFormDialogVisible"
      title="产品批次"
      append-to-body
      width="600px"
      :visible.sync="produceBatchFormDialogVisible"
    >
      <produceBatchForm
        :agroProduceBatchId="agroProduceBatchId"
        :agroProduceArchiveId="agroProduceArchiveId"
      />
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date"
import { agroProduceBatchList, deleteAgroProduceBatch, agroProductPluckTypeList } from '@/api/agroProduceBatch'
import produceBatchForm from './produceBatchForm'
import { getFacilitiesCountArchive } from '@/api/rs_facilities'
import { agroProduceArchiveList } from '@/api/agroProduceArchive'

export default {
  components: {
    produceBatchForm
  },
  props: {
    agroProduceArchiveId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      tableData: [],
      rs_facilities_id: null,
      agro_product_pluck_type_id: null,
      keyword: null,
      start_pluck_time: null,
      end_pluck_time: null,
      produceBatchFormDialogVisible: false,
      agroProduceBatchId: null,
      apaId: null,
      archiveList: [],
      page: 1,
      size: 10,
      total: 0,
      facilitiesList: [],
      productPluckTypeList: [],
      levelOptions: [
        {
          name: '一等品',
          value: 1
        },
        {
          name: '二等品',
          value: 2
        },
        {
          name: '三等品',
          value: 3
        },
        {
          name: '四等品',
          value: 4
        },
        {
          name: '五等品',
          value: 5
        },
      ],
    }
  },
  created () {
    this.init()
    getFacilitiesCountArchive({ type: 'now', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.facilitiesList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    agroProduceArchiveList({ timeType: 'now', bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.archiveList = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
    agroProductPluckTypeList().then(res => {
      if (res.code === 200) {
        this.productPluckTypeList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    formatDate,
    getLevel (val) {
      for (let i = 0; i < this.levelOptions.length; i++) {
        if (this.levelOptions[i].value === val) {
          return this.levelOptions[i].name
        }
      }
    },
    deleteBatch (id) {
      this.$confirm('是否进行删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgroProduceBatch({ id: id }).then(res => {
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
    add () {
      this.agroProduceBatchId = null
      this.produceBatchFormDialogVisible = true
    },
    edit (id) {
      this.agroProduceBatchId = id
      this.produceBatchFormDialogVisible = true
    },
    getDate (time) {
      return this.formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
    },
    // 分页
    pageChange (val) {
      this.page = val
      this.init()
    },
    init () {
      agroProduceBatchList({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: this.rs_facilities_id,
        agro_produce_archive_id: this.apaId || this.agroProduceArchiveId,
        agro_product_pluck_type_id: this.agro_product_pluck_type_id,
        keyword: this.keyword,
        start_pluck_time: this.start_pluck_time,
        end_pluck_time: this.end_pluck_time,
        page: (this.page - 1),
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          res.data.content.map(v => {
            if (v.imagePath) {
              v.imagePath = process.env.IMG_URL + v.imagePath
            }
          })
          this.total = res.data.totalElements
          this.tableData = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
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