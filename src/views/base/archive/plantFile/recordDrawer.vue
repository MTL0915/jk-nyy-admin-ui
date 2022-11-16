<template>
  <div v-if="baseInfo !== null">
    <el-drawer
      title="查看农事记录"
      :visible.sync="drawer"
      :modal="false"
      :with-header="false"
    >
      <div class="baseInfo">
        <span style="font-size:14px;font-weight:700">基本信息</span>
        <div style="margin-top:10px">
          <div class="baseCard">
            <span class="baseText">所在地块</span><span>{{ rs_facilities_name }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">档案</span><span>{{ archiveName }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">操作人</span><span>{{ baseInfo.optionUser || '无'}}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">操作记录</span><span>{{ baseInfo.name }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">农事类型</span><span>{{ baseInfo.produceRecordType_name }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">开始时间</span><span>{{ baseInfo.startTime }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">结束时间</span><span>{{ baseInfo.endTime }}</span>
          </div>
          <div class="baseCard">
            <span class="baseText">工作时长</span><span>{{ baseInfo.duration }} 小时</span>
          </div>
          <div
            class="baseCard"
            style="display:flex;align-items:center"
          >
            <div class="baseText">具体描述</div>
            <div style="flex:1">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="暂无描述"
                readonly
                v-model="baseInfo.description"
              >
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="baseInfo">
        <span style="font-size:14px;font-weight:700">农事图片</span>
        <div
          style="margin-top:10px"
          v-if='baseInfo.images.length > 0'
        >
          <img
            v-for="(url, index) in baseInfo.images"
            :key="index"
            :src="baseUrl + url.imagePath"
            style="width:100px;height:100px;margin:3px"
          />
        </div>
        <div
          style="margin-top:10px"
          v-else
        >
          --
        </div>
      </div>
      <div style="padding:10px 0;text-align:center">
        <el-button
          size="small"
          @click="drawer=  false"
        >取消</el-button>
        <el-button
          type="danger"
          size="small"
          @click="delRecord"
        >删除</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { getAgroProduceRecordById, deleteAgroProduceRecordById } from '@/api/agroProduceRecord'
import { formatDate } from '@/utils/date'
export default {
  data () {
    return {
      drawer: false,
      id: '',
      baseInfo: null,
      baseUrl: process.env.IMG_URL,
      rs_facilities_name: "",
      archiveName: ""
    }
  },
  methods: {
    delRecord () {
      this.$confirm('是否进行删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgroProduceRecordById({ id: this.id }).then(res => {
          if (res.code === 200) {
            this.drawer = false;
            this.$message.success('删除成功')
            this.$parent.getAagroProduceArchiveList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    },
    dataLoad () {
      const data = {
        id: this.id
      }
      getAgroProduceRecordById(data).then(res => {
        res.data.duration = ((res.data.endTime - res.data.startTime) / 3600000).toFixed(1)
        res.data.startTime = formatDate(new Date(res.data.startTime), 'yyyy-MM-dd hh:mm:ss')
        res.data.endTime = formatDate(new Date(res.data.endTime), 'yyyy-MM-dd hh:mm:ss')
        const temp = []
        for (let i = 0; i < res.data.users.length; i++) {
          temp.push(res.data.users[i].name)
        }
        res.data.optionUser = temp.join("、")
        this.baseInfo = res.data
      })
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
</style>