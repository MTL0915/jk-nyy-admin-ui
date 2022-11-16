<template>
  <div class="plantBox">
    <div class="left">
      <div class="circle">
        <img
          :src="cover"
          style="width:100%;height:100%;border-radius:50%"
        >
      </div>
    </div>
    <div class="right">
      <el-row>
        <el-col :span="24">
          <p
            class="p"
            v-if="info.name"
          >档案名称：{{info.name}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p
            class="p"
            v-if="info.rs_facilities_name"
          >生产地块：{{info.rs_facilities_name}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p
            class="p"
            v-if="info.classification_name"
          >农产品分类：{{info.classification_name}}</p>
        </el-col>
        <el-col :span="12">
          <p
            class="p"
            v-if="info.productBreed_name"
          >农产品品种：{{info.productBreed_name}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p
            class="p"
            v-if="info.produceStartTime"
          >生产开始时间：{{getTime(info.produceStartTime)}}</p>
        </el-col>
        <el-col :span="12">
          <p
            class="p"
            v-if="info.produceEndTime"
          >生产结束时间：{{getTime(info.produceEndTime)}}</p>
        </el-col>
      </el-row>
      <div class="growth">
        <div
          class="growthCard"
          v-for="item in cycleList"
          :key="item"
        >
          <div style="display:flex">
            <div class="growthLeft">
              <img
                :src="item.productCycle_imagePath"
                style="width:100%;height:100%"
              />
            </div>
            <div class="growthRight">
              <p style="height:18px">{{item.name}}</p>
              <p style="height:22px">{{(item.startTime===null?'--':item.startTimeStr)+' 至 '+(item.endTime===null?'--':item.endTimeStr)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script> 
import cover from "@/assets/img/img.jpg"
import img from "@/assets/images/base.png"
import { getAgroProduceCycleByArchive } from '@/api/agroProduceArchive'
import { formatDate } from "@/utils/date";

export default {
  props: {
    info: {
      type: Object,
      default: () => { }
    },
    agroProduceArchiveId: {
      type: Number,
      default: null
    },
    cover: {
      type: String,
      default: null,
    }
  },
  data () {
    return {
      cycleList: []
    };
  },
  created () {
    if (this.cover == null) {
      this.cover = cover
    }
    this.init()
  },
  methods: {
    getTime (t) {
      return formatDate(new Date(t), 'yyyy-MM-dd')
    },
    init () {
      if (this.agroProduceArchiveId === null) {
        this.$message.error('id不能为空')
      } else {
        getAgroProduceCycleByArchive({ id: this.agroProduceArchiveId }).then(res => {
          if (res.code === 200) {
            res.data.map(v => {
              v.productCycle_imagePath = v.productCycle_imagePath ? (v.productCycle_imagePath.indexOf('http') === -1 ? process.env.IMG_URL + v.productCycle_imagePath : v.productCycle_imagePath) : img
              if (v.startTime) {
                v.startTimeStr = formatDate(new Date(v.startTime), 'yyyy-MM-dd')
              }
              if (v.endTime) {
                v.endTimeStr = formatDate(new Date(v.endTime), 'yyyy-MM-dd')
              }
            })
            this.cycleList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
.plantBox
  display flex

.left
  width 210px
  margin-right 10px

.right
  flex 1
  overflow hidden

.circle
  width 180px
  height 180px
  border-radius 50%
  border 3px solid #9AC062
  box-sizing border-box
  padding 3px

.name
  height 40px
  line-height 40px
  font-size 28px
  color #999
  white-space nowrap
  text-overflow ellipsis
  overflow hidden

.userInfo
  margin-top 10px

.growth
  margin-top 10px
  white-space nowrap
  overflow auto

.growthCard
  display inline-block
  border 1px solid #ccc
  padding 30px 15px

.growthLeft
  width 40px
  height 40px
  margin-right 10px

.growthRight
  flex 1

.p
  font-size 17px
  line-height 28px
</style>