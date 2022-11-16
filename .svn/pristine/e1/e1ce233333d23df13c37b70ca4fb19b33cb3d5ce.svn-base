<!-- sim卡列表 -->
<template>
  <div>
    <div
      class="head-container"
      style="display: flex;justify-content: space-between;padding: 10px;"
    >
      <div>
        <el-button
          type="primary"
          @click="addSim"
          size="mini"
        >新增</el-button>
        <el-button
          type="warning"
          @click="simDetails"
          size="mini"
        >
          流量详情
        </el-button>
      </div>
      <div>

        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="expireTimeIsNull"
          placeholder="是否存在过期时间"
          @change="search()"
        >
          <el-option
            v-for="item in expireTimeIsNullOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="isOverdue"
          placeholder="是否过期"
          @change="search()"
          v-show="isOverdueShow"
        >
          <el-option
            v-for="item in isOverdueOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-input
          v-model="surplusDay"
          placeholder="剩余天数"
          size="mini"
          class="inputClass"
          type="number"
          @change="search()"
          v-show="isOverdueShow"
        />

        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="isBindDevice"
          placeholder="是否绑定"
          @change="search()"
        >
          <el-option
            v-for="item in isBindDeviceOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="bs_base_id"
          placeholder="选择基地"
          @change="search()"
        >
          <el-option
            v-for="item in baseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="hd_device_type_id"
          placeholder="选择设备类型"
          @change="search()"
        >
          <el-option
            v-for="item in deviceTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="type"
          placeholder="sim卡供应商"
          @change="search()"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          class="inputClass"
          clearable
          size="mini"
          filterable
          v-model="status"
          placeholder="卡片状态"
          @change="search()"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          size="mini"
          clearable
          v-model="keyword"
          placeholder="关键词"
          class="inputClass"
        />
        <el-button
          type="primary"
          @click="search"
          size="mini"
        >搜索</el-button>
      </div>
    </div>
    <div>
      <el-table :data="simArray">
        <el-table-column
          prop="iccid"
          label="ICCID"
          width="200"
        />
        <el-table-column
          label="设备名称"
          width="200"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.device_id"
              @click="view(scope.row)"
            >
              <div>{{scope.row.hd_device_name}}</div>
              <div style="color:#ff005e">({{scope.row.device_id}})</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="sim卡类型">
          <template slot-scope="scope">
            {{valueGetName(scope.row.type,typeOptions)}}
          </template>
        </el-table-column>
        <el-table-column label="激活时间">
          <template slot-scope="scope">
            {{getDate(scope.row.activateTime)}}
          </template>
        </el-table-column>
        <el-table-column label="到期时间">
          <template slot-scope="scope">
            {{getDate(scope.row.expireTime)}}
          </template>
        </el-table-column>
        <el-table-column label="剩余天数">
          <template slot-scope="scope">
            <div v-html="getRemainDay(scope.row.remainDay)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="总容量"
          prop="totalFlow"
          sortable
        >
          <template slot-scope="scope">
            {{getFlow(scope.row.totalFlow,scope.row.unit)}}
          </template>
        </el-table-column>
        <el-table-column
          label="剩余容量"
          prop="surplus"
          sortable
          width="200"
        >
          <template slot-scope="scope">
            {{getFlow(scope.row.surplus,scope.row.unit)}}
          </template>
        </el-table-column>
        <el-table-column
          label="使用量"
          prop="dosage"
          sortable
        >
          <template slot-scope="scope">
            {{getFlow(scope.row.dosage,scope.row.unit)}}
          </template>
        </el-table-column>
        <el-table-column label="卡片状态">
          <template slot-scope="scope">
            {{valueGetName(scope.row.status,statusOptions)}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <!-- <el-button
              type="success"
              size="mini"
              @click="simActivationCard(scope.row.id)"
            >复机</el-button>
            <el-button
              type="info"
              size="mini"
              @click="simStopCard(scope.row.id)"
            >停机</el-button> -->
            <el-button
              type="warning"
              size="mini"
              @click="updateWarnConfig(scope.row)"
            >预警配置
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="editSim(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteSim(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :current-page="page + 1"
          :page-size="size"
          @current-change="pageChange"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      v-if="simFormDialogVisible "
      :visible.sync="simFormDialogVisible"
      append-to-body
      title="sim卡"
      width="700px"
    >
      <simForm
        :simId="simId"
        :baseArray="baseList"
      />
    </el-dialog>
    <el-dialog
      v-if="simDetailsDialogVisible "
      :visible.sync="simDetailsDialogVisible"
      append-to-body
      title="日统计流量"
      width="1000px"
    >
      <simDetails :closeFunction="closeFunction" />
    </el-dialog>

    <el-dialog
      v-if="updateSysWarnConfigDialogVisible"
      :visible.sync="updateSysWarnConfigDialogVisible"
      append-to-body
      title="预警配置"
      width="1000px"
    >
      <updateSysWarnConfig :hd_device_sim_id="hd_device_sim_id" />
    </el-dialog>
  </div>
</template>
<script>
import { simList, deleteSim, simActivationCard, simStopCard, existSimDeviceType } from '@/api/hd_device_sim'
import { baseList } from '@/api/baseInfo'
import { formatDate } from "@/utils/date"
import simForm from './module/form'
import simDetails from './module/simDetails'
import updateSysWarnConfig from './module/updateSysWarnConfig'
export default {
  components: { simForm, simDetails, updateSysWarnConfig },
  data () {
    return {
      keyword: null,
      type: null,
      typeOptions: [
        {
          name: '科通达',
          value: 'COTONDA'
        },
        {
          name: '173物联',
          value: 'WULIAN'
        },
        {
          name: '仨石',
          value: 'SASHI'
        }
      ],
      bs_base_id: null,
      baseList: [],
      status: null,
      statusOptions: [
        {
          name: '待激活',
          value: 1
        },
        {
          name: '已激活',
          value: 2
        },
        {
          name: '已停机',
          value: 3
        },
        {
          name: '已失效',
          value: 4
        },
        {
          name: '测试卡',
          value: 5
        },
        {
          name: '已销户',
          value: 6
        },
        {
          name: '库存',
          value: 7
        },
        {
          name: '机卡分离',
          value: 8
        },
      ],
      isBindDevice: null,
      isBindDeviceOptions: [
        {
          name: '已绑定',
          value: true
        },
        {
          name: '未绑定',
          value: false
        }
      ],
      isOverdue: false,
      isOverdueShow: true,
      isOverdueOptions: [
        {
          name: '已过期',
          value: true
        },
        {
          name: '未过期',
          value: false
        }
      ],
      expireTimeIsNull: false,
      expireTimeIsNullOptions: [
        {
          name: '到期时间不存在',
          value: true
        },
        {
          name: '到期时间存在',
          value: false
        }
      ],
      surplusDay: null,//剩余天数
      simArray: [],
      page: 0,
      size: 10,
      total: 0,
      simFormDialogVisible: false,
      deviceTypeList: [],//设备类型列表
      hd_device_type_id: null,
      simDetailsDialogVisible: false,//流量详情弹窗
      updateSysWarnConfigDialogVisible: false,//修改流量预警配置弹窗
      hd_device_sim_id: null,
    }
  },
  created () {
    baseList({
      excludeImplement: true,
      page: 0,
      size: 9999,
    }).then(res => {
      if (res.code === 200) {
        this.baseList = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
    existSimDeviceType().then(res => {
      if (res.code === 200) {
        this.deviceTypeList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    this.getSimList()
  },
  methods: {
    view (row) {
      var base = this.$router && this.$router.options && this.$router.options.base;
      if (base === undefined) {
        base = "";
      }
      if (row.hd_device_type_code === 'JK-WT') {//无人投料车 || 无人投料船
        window.open("http://121.32.129.19:8100/zljqr/#/sb_caozuo?device_id=" + row.device_id + "&device_type=" + row.hd_device_type_code.substring(3))
      } else if (row.hd_device_type_code === 'JK-FM') {
        this.$router.push({ path: '/jkfmDeviceInfo', query: { device_id: row.device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'JK-WA' || row.hd_device_type_code === 'JK-WC') {
        // 开沟施肥机、无人喷药车
        window.open("/unmannedMap?device_id=" + row.device_id + "&id=" + row.hd_device_id)
      } else if (row.hd_device_type_code === 'JK-GY') {
        // 轨道运输车
        window.open("/unmannedMapGdc?device_id=" + row.device_id + "&id=" + row.hd_device_id);
      } else if (row.device_id === "CD01A-1900001") {//托普云农页面
        // this.$refs.zjtpyunForm.submit();
      } else if (row.hd_device_type_code === 'IK-CO') {
        this.$router.push({ path: '/equipIflytekCO', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'IK-XJ') {
        this.$router.push({ path: '/equipIflytekXJ', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else if (row.hd_device_type_code === 'YM-FW') {
        this.$router.push({ path: '/equipYunmuFW', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      } else {
        //this.$refs.equipJkl.handelWatch(row.hd_device_id, row.device_id)
        this.$router.push({ path: '/deviceInfo', query: { id: row.hd_device_id, breadcrumb: 'hide' } })
      }
    },
    //修改流量预警配置
    updateWarnConfig (row) {
      this.hd_device_sim_id = row.id
      this.updateSysWarnConfigDialogVisible = true
    },
    //里层触发外层dialog关闭
    closeFunction () {
      this.simDetailsDialogVisible = false
    },
    //点击流量详情
    simDetails () {
      this.simDetailsDialogVisible = true
    },
    //复机
    simActivationCard (id) {
      simActivationCard({
        id: id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //停机
    simStopCard (id) {
      simStopCard({
        id: id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //删除sim卡
    deleteSim (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSim({
          id: id
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.search()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //新增sim
    addSim () {
      this.simId = null
      this.simFormDialogVisible = true
    },
    //编辑sim
    editSim (id) {
      this.simId = id
      this.simFormDialogVisible = true
    },
    //剩余天数
    getRemainDay (remainDay) {
      if (this.checkNotNull(remainDay)) {
        if (remainDay > 0) {
          return '<span >' + (remainDay + '天') + '</span>'
        } else {
          return '<span style="color:red">已到期</span>'
        }
      }
      return ''
    },
    //获取流量文本
    getFlow (value, unit) {
      if (this.checkNotNull(value)) {
        return (value + (this.checkNotNull(unit) ? unit : ''))
      }
      return ''
    },
    //日期转换
    formatDate,
    getDate (timestamp) {
      if (this.checkNotNull(timestamp)) {
        return this.formatDate(new Date(timestamp), 'yyyy-MM-dd')
      } else {
        return ''
      }
    },
    //获取卡片状态
    valueGetName (value, list) {
      if (value !== undefined && value != null) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].value === value) {
            return list[i].name
          }
        }
      }
      return ''
    },
    //翻页
    pageChange (e) {
      this.page = e - 1;
      this.getSimList()
    },
    //搜索
    search () {
      this.page = 0
      this.getSimList()
    },
    //获取sim卡数据
    getSimList () {
      if (this.expireTimeIsNull) {
        this.isOverdue = null
        this.isOverdueShow = false
      } else {
        this.isOverdueShow = true
      }
      this.simArray = []
      simList({
        keyword: this.keyword,
        type: this.type,
        bs_base_id: this.bs_base_id,
        status: this.status,
        sta: 1,
        isBindDevice: this.isBindDevice,
        hd_device_type_id: this.hd_device_type_id,
        isOverdue: this.isOverdue,
        expireTimeIsNull: this.expireTimeIsNull,
        surplusDay: this.surplusDay,
        page: this.page,
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          this.simArray = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    checkNotNull (value) {
      if (value !== undefined && value !== null) {
        return true
      }
      return false
    },
  }
}


</script>
<style>
.inputClass {
  width: 130px;
}
</style>
