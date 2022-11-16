<template>
  <div>
    <div style="position:relative">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="种植信息"
          name="plantInfo"
        >
          <plantInfo
            :agroProduceArchiveId="agroProduceArchiveId"
            :cover="cover"
            :info="info"
          />
        </el-tab-pane>
        <el-tab-pane
          label="农事计划"
          name="producePlan"
        >
          <producePlan
            :agroProduceArchiveId="agroProduceArchiveId"
            :facilitiesId="facilitiesId"
          />
        </el-tab-pane>
        <el-tab-pane
          label="农事记录"
          name="farm"
        >
          <div style="text-align:right;">
            <el-button
              type="primary"
              size="mini"
              @click="addFarmRecord"
            >添加农事记录</el-button>
            <!-- 
            <el-button
              type="warning"
              size="mini"
              @click="farmRecordList"
            >农事记录详情</el-button>
            -->
          </div>
          <farmRecord
            :classificationName="classificationName"
            :agroProduceArchiveId="agroProduceArchiveId"
            ref="farm"
          />
        </el-tab-pane>

        <el-tab-pane
          label="生产批次"
          name="produceBatch"
        >
          <produceBatch :agroProduceArchiveId="agroProduceArchiveId" />
        </el-tab-pane>
        <el-tab-pane
          v-if="archiveSta==='now'"
          label="环境监控"
          name="archiveCycleEnv"
        >
          <archiveCycleEnv :agroProduceArchiveId="agroProduceArchiveId" />
        </el-tab-pane>
        <el-tab-pane
          label="病虫害预防"
          name="archiveCyclePest"
        >
          <archiveCyclePest :agroProduceArchiveId="agroProduceArchiveId" />
        </el-tab-pane>

      </el-tabs>
      <div style="position:absolute;top:0;right:0">
      </div>
    </div>
    <el-dialog
      v-if="produceRecordFormDialogVisible"
      title="添加农事记录"
      append-to-body
      width="600px"
      :visible.sync="produceRecordFormDialogVisible"
    >
      <produceRecordForm
        :agroProduceArchiveId="agroProduceArchiveId"
        ref="produceRecordForm"
      />
    </el-dialog>
    <el-dialog
      v-if="farmRecordDetailsDialogVisible"
      title="农事记录列表"
      append-to-body
      :visible.sync="farmRecordDetailsDialogVisible"
      :before-close="produceRecordFormDialogClose"
      width="1500px"
      class="farmDialog"
    >
      <farmRecordDetails
        :agroProduceArchiveId="agroProduceArchiveId"
        ref="farmRecordDetails"
      />
    </el-dialog>
  </div>
</template>
<script>
import plantInfo from "./plantInfo"
import farmRecord from "./farmRecord"
import produceRecordForm from "./produceRecordForm"
import farmRecordDetails from './farmRecordDetails'
import archiveCycleEnv from './archiveCycleEnv'
import archiveCyclePest from './archiveCyclePest'
import produceBatch from './produceBatch'
import producePlan from './producePlan'

export default {
  components: {
    plantInfo,
    farmRecord,
    produceRecordForm,
    farmRecordDetails,
    archiveCycleEnv,
    archiveCyclePest,
    produceBatch,
    producePlan
  },
  props: {
    classificationName: {
      type: String,
      defalut: null
    },
    activeName: {
      type: String,
      default: 'plantInfo'
    },
    agroProduceArchiveId: {
      type: Number,
      default: null,
    },
    cover: {
      type: String,
      default: null
    },
    info: {
      type: Object,
      default: () => { }
    },
    archiveSta: {
      type: String,
      default: null
    },
    facilitiesId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      produceRecordFormDialogVisible: false,
      farmRecordDetailsDialogVisible: false
    }
  },
  created () {
    //this.init()
  },
  methods: {
    //添加农事记录
    addFarmRecord () {
      this.produceRecordFormDialogVisible = true
    },
    //农事记录列表
    farmRecordList () {
      this.farmRecordDetailsDialogVisible = true
    },
    produceRecordFormDialogClose (done) {
      this.$refs.farm.init()
      done()
    }
    // init () {

    // }
  }
}
</script>
<style lang="stylus" scoped>
.farmDialog
  >>>.el-dialog__headerbtn
    top 10px
    right 10px
</style>