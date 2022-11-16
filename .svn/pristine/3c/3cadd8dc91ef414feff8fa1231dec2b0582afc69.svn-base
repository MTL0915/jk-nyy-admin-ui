<template>
  <div v-if="baseInfo !== null">
    <el-drawer
      title="查看农事计划"
      :visible.sync="drawer"
      :modal="false"
      :with-header="false">
      <div class="baseInfo">
        <span style="font-size:14px;font-weight:700">基本信息</span>
        <div style="margin-top:10px">
          <div class="baseCard"  v-show="info.week.length == 0">
            <span class="baseText">计划类型</span><span>单次计划</span>
          </div>
          <div class="baseCard" v-show="info.week.length > 0">
            <span class="baseText">计划类型</span><span>周期计划</span>
          </div>
          <div class="baseCard">
            <span class="baseText">所在地块</span><span>{{ rs_facilities_name }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">档案</span><span>{{ archiveName }}</span>
          </div>
          <div class="baseCard" v-show="info.sta == 1">
            <span class="baseText">状态</span><span>正在执行</span>
          </div>
          <div class="baseCard" v-show="info.sta == 0">
            <span class="baseText">状态</span><span>已暂停</span>
          </div>
          <div class="baseCard">
            <span class="baseText">开始时间</span><span>{{ info.startTime }}</span>
          </div>
          <div class="baseCard" v-show="info.week.length > 0">
            <span class="baseText">结束时间</span><span>{{ info.endTime }}</span>
          </div>
          <div class="baseCard" >
            <span class="baseText">任务时间</span><span>{{ info.time }}</span>
          </div>
          <div class="baseCard" style="display:flex;align-items:center" v-show="info.week.length > 0">
            <div class="baseText">计划周期</div>
            <div style="flex:1">
              <span class="week" v-for="(item, index) in info.week" :key="index">{{ getWeek(item) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:10px 0;text-align:center">
        <el-button size="small" @click="drawer=  false">取消</el-button>
        <el-button type="danger" size="small" @click="planBtn" v-show="info.sta == 1">暂停计划</el-button>
        <el-button type="danger" size="small" @click="planBtn" v-show="info.sta == 0">开始计划</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { agroProducePlanChangeSta } from '@/api/agroProducePlan'
import { formatDate } from '@/utils/date'
export default {
  data() {
    return {
      drawer: false,
      info: {
        cycle: '',
        duration: '',
        id: '',
        name: '',
        sta: '',
        time: '',
        week: [],
        startTime: '',
        endTime: ''
      },
      rs_facilities_name: "",
      archiveName: ""
    }
  },
  methods: {
    getWeek(item) {
      if (item == 1) {
        return '周一'
      } else if (item == 2) {
        return '周二'
      } else if (item == 3) {
        return '周三'
      } else if (item == 4) {
        return '周四'
      } else if (item == 5) {
        return '周五'
      } else if (item == 6) {
        return '周六'
      } else {
        return '周日'
      }
    },
    planBtn() {
      const data = {
        id: this.info.id
      }
      let staText = ''
      if (this.info.sta == 0) {
        staText = '开始计划'
      } else {
        staText = '暂停计划'
      }
      this.$confirm(`是否${staText}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        agroProducePlanChangeSta(data).then(res => {
          if (res.code === 200) {
            this.drawer = false;
            this.$message.success('操作成功')
            this.$parent.getAagroProduceArchiveList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消')
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.baseInfo
  padding 10px
  border-bottom 1px solid #ccc
  margin-bottom 10px
.baseCard
  padding 10px 0
  font-size 14px
.baseText
  margin-right 30px
  display inline-block
  width 60px
>>>.el-drawer__body
  overflow auto
.week
  display inline-block
  padding 8px 15px
  color #fff
  fong-size 14px
  margin 5px
  background #67C23A
  border-radius 5px
</style>