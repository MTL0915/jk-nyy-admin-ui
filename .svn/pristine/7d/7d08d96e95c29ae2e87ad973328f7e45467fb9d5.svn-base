<template>
  <div>
    <div class="component_title_div" style="border-bottom:0px;">
        <div style="float: left;">设备日志</div>
        <div style="float: right;">
          <div @click="loadAllLog" style="margin-top: -2px;padding-right: 5px;cursor: pointer;">
              <i class="el-icon-full-screen fullScreen"></i>
          </div>
        </div>
    </div>
    <div class="cgq_model_div">
        <div class="cgq_model_timeLine" style="margin-top:15px;margin-right: 2px;" >
        <el-timeline>
            <el-timeline-item v-for="(item, index) in deviceRunLogList" :key="index" size="large" :icon="item.icon" :color="item.color" placement="top">
            <el-card>
                <div>
                <span style="padding: 3px 6px;" :style="'border-radius:5px;color:#FFF;background:' + item.color">{{ item.type }}</span>
                </div>
                <p style="margin-top: 10px;">{{ item.title }}</p>
                <div style="margin-top:10px;align-items: center;">
                <div>
                    <img style="width: 18px;height: 18px;align-self:center;position:absolute" src="/static/img/timer.png"/>
                    <span style="margin-left: 24px;">{{ item.date }}</span>
                </div>
                <div style="margin-left:24px">操作人:{{ item.u_name }}</div>
                </div>
            </el-card>
            </el-timeline-item>
        </el-timeline>
        </div>
    </div>
  </div>
</template>
<script>
import { getLogTypeDes, getLogTypeColor, getLogTypeIcon } from '@/utils/logutil';
import { getDeviceRunLogListByh_id } from '@/api/equip';
import { parseTime } from '@/utils/index';

export default {
  name: 'deviceLog',
  props:{
      hd_device_id:{
          type:String,
          default:""
      }
  },
  data() {
    return {
        deviceRunLogList: [], // 设备日志列表
    }
  },
  watch: {
    hd_device_id:function(val) {
      this.getDeviceRunLogListByh_id();
    }
  },
  created() {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  methods: {
      //获取设备日志
    getDeviceRunLogListByh_id() {
      getDeviceRunLogListByh_id({ h_id: this.hd_device_id, startPosition: 0, maxResult: 10 }).then(e => {
        if (e.code === 200) {
          this.deviceRunLogList = [];
          for (let index = 0; index < e.data.content.length; index++) {
            const element = e.data.content[index];
            var obj = {
              title: element.tle,
              content: element.cont,
              u_name: element.u_name,
              date: parseTime(element.i_date),
              type: getLogTypeDes(element.type),
              color: getLogTypeColor(element.type),
              icon: getLogTypeIcon(element.type)
            };
            this.deviceRunLogList.push(obj);
          }
        }
      })
    },
    //查看所有日志
    loadAllLog () {
      this.$router.push({
        path: '/deviceLog',
        query: { id: this.hd_device_id }
      });
    },
  }
}
</script>

<style lang="stylus" scoped>
.cgq_model_div >>> .el-timeline-item__node--large
  left -9px
  width 30px
  height 30px

.cgq_model_div >>> .el-timeline-item__icon
  font-size 20px

.cgq_model_div
  height calc(100% - 20px)
  padding-left 15px
  padding-right 8px
  overflow hidden
  clear both

.cgq_model_div::-webkit-scrollbar
  /* 滚动条整体样式 */
  width 8px /* 高宽分别对应横竖滚动条的尺寸 */
  height 1px

.cgq_model_div::-webkit-scrollbar-thumb
  /* 滚动条里面小方块 */
  border-radius 10px
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  background #31BFA6

.cgq_model_div::-webkit-scrollbar-track
  /* 滚动条里面轨道 */
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  border-radius 10px
  background #ededed

.cgq_model_timeLine .el-timeline-item__tail
  left 12px

.cgq_model_timeLine .el-timeline-item__node
  left 0
</style>