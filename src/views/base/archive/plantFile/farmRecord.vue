<template>
  <div style="overflow:hidden">
    <div style="padding:20px 0">
      <el-carousel
        trigger="click"
        :autoplay="false"
        height="220px"
        indicator-position="none"
        ref="remarkCarusel"
        @change="change"
      >
        <el-carousel-item
          v-for="(item, index) in recodeList"
          :key="index"
        >
          <div style="display:flex;height:100%;align-items:center">
            <div style="flex:1;text-align:right;padding:10px;border-right:1px solid #ccc">
              <el-carousel
                height="180px"
                :interval="2000"
                type="card"
                arrow="never"
              >
                <el-carousel-item
                  v-for="(item2,index2) in item.images"
                  :key="index2"
                >
                  <img
                    :src="item2.image_path"
                    style="height:180px;width:240px;"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div style="flex:1;padding:10px;">
              <p class="p">产品类型：{{ classificationName+'　'}}
                <i
                  @click="editFarm(item.id)"
                  class="el-icon-edit-outline"
                />
                <i
                  @click="deleteFarm(item.id)"
                  class="el-icon-delete"
                />
              </p>
              <p class="p">农事类型：{{ item.produceRecordType_name }}</p>
              <p class="p">标题：{{ item.name }}</p>
              <p
                class="p"
                style="max-height: 100px;overflow-y: auto;"
              >描述：{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      class="mark"
      @mousedown.stop="down"
      @mousemove.stop="move"
      @mouseup.stop="up"
      @mouseleave="leave"
    >
      <div
        class="timeNav"
        ref="timeNav"
      >
        <div class="content">
          <div
            class="marker"
            v-for="(item, index) in recodeList"
            :key="index"
            ref="marker"
            @click="markerClick(index)"
          >
            <div
              class="flag"
              style="user-select:none !important"
            >
              {{ item.name }}
            </div>
            <div
              class="line"
              :style="{background: activeIndex == index? '#08c': ''}"
            ></div>
          </div>
        </div>
        <div class="time">
          <div class="time-interval-minor">
            <div
              class="minor"
              ref="timeMinor"
            ></div>
          </div>
          <div
            class="time-interval-minor-month"
            ref="timeYear"
          >
            <div
              style="user-select:none !important"
              ref="year"
              v-for="(year, index) in getTimeYear"
              :key="index"
            >{{ year }}</div>
          </div>
          <div
            class="time-interval-minor-month"
            ref="timeMonth"
          >
            <div
              style="user-select:none !important"
              ref="month"
              v-for="(month, index) in getTimeMonth"
              :key="index"
            >{{ month }}</div>
          </div>
          <div
            class="time-interval-minor-day"
            ref="timeDay"
          >
            <div
              style="user-select:none !important"
              ref="day"
              v-for="(day, index) in getTimeDay"
              :key="index"
            >{{ day }}</div>
          </div>
        </div>
      </div>
      <div class="timeLine"></div>
      <div class="timeBox"></div>
      <div class="toolBar">
        <div style="padding:5px">
          <i
            class="el-icon-zoom-in icon1"
            style="font-size:20px"
            @click="zoom"
          ></i>
        </div>
        <div style="padding:5px">
          <i
            class="el-icon-zoom-out icon1"
            style="font-size:20px"
            @click="scale"
          ></i>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="produceRecordFormDialogVisible"
      title="修改农事记录"
      append-to-body
      :visible.sync="produceRecordFormDialogVisible"
      width="600px"
    >
      <produceRecordForm
        :recordId="recordId"
        ref="produceRecordForm"
      />
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getAgroProduceRecordByArchive, deleteAgroProduceRecordById } from '@/api/agroProduceRecord'
import defaultImg from '@/assets/img/Plan/nongshijihua.png'
import produceRecordForm from './produceRecordForm'


const START_LEFT = 430;
export default {
  components: {
    produceRecordForm
  },
  props: {
    classificationName: {
      type: String,
      default: null
    },
    agroProduceArchiveId: {
      type: Number,
      default: null
    },
  },
  created () {
    this.init()
  },
  data () {
    return {
      startX: 0, //鼠标按下开始位置
      mouseDown: false,
      startLeft: START_LEFT, //初始位置
      activeIndex: 0, //当前激活农事记录
      housrLength: 5, //一个小时的长度  px
      scalePer: 1, //标尺显示百分比
      // recodeList: [
      //   { type: "中华田园犬", name: "小黄毛", plantName: "定植", durationTime: "3.5", time: "2020-9-05 08:00" },
      //   { type: "中华田园犬", name: "小黄毛", plantName: "浇水", durationTime: "3.5", time: "2020-10-15 09:00" },
      //   { type: "中华田园犬", name: "小黄毛", plantName: "浇水", durationTime: "3.5", time: "2020-10-15 18:00" },
      //   { type: "中华田园犬", name: "小黄毛", plantName: "施肥", durationTime: "3.5", time: "2020-10-25 10:00" },
      //   { type: "中华田园犬", name: "小黄毛", plantName: "杀虫", durationTime: "3.5", time: "2020-11-05 11:00" },
      //   { type: "中华田园犬", name: "小黄毛", plantName: "采收", durationTime: "3.5", time: "2020-11-15 12:00" }
      // ],
      recodeList: [],
      moveTime: 0,
      timer: null,
      produceRecordFormDialogVisible: false,
      recordId: null
    };
  },
  computed: {
    //计算天
    getTimeDay () {
      const arr = [];
      for (let i = 0; i < this.recodeList.length; i++) {
        arr.push(this.recodeList[i].time.split("-")[1] + "月" + this.recodeList[i].time.split("-")[2].split(" ")[0] + "日")
      }
      return arr
    },
    //计算月
    getTimeMonth () {
      let arr = [];
      for (let i = 0; i < this.recodeList.length; i++) {
        arr.push(this.recodeList[i].time.split("-")[1] + "月")
      }
      arr = Array.from(new Set(arr))
      return arr
    },
    //计算年
    getTimeYear () {
      let arr = [];
      for (let i = 0; i < this.recodeList.length; i++) {
        arr.push(this.recodeList[i].time.split("-")[0] + "年")
      }
      arr = Array.from(new Set(arr))
      return arr
    }
  },
  mounted () {

  },
  methods: {
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
    editFarm (id) {
      this.recordId = id
      this.produceRecordFormDialogVisible = true
    },
    init () {
      if (this.agroProduceArchiveId === null) {
        this.$message.error('id不能为空')
      } else {
        getAgroProduceRecordByArchive({ id: this.agroProduceArchiveId }).then(res => {
          if (res.code === 200) {
            res.data.map(v => {
              v.time = formatDate(new Date(v.startTime), 'yyyy-MM-dd hh:mm')
              //v.image_path = v.imagePath ? (v.imagePath.indexOf('http') === -1 ? (process.env.IMG_URL + v.imagePath) : v.imagePath) : defaultImg
              if (v.images && v.images.length != 0) {
                v.images.map(s => {
                  s.image_path = process.env.IMG_URL + s.imagePath
                })
              } else {
                v.images = [{ image_path: defaultImg }]
              }
            })
            this.recodeList = res.data
            this.startLeft = START_LEFT;
            this.$refs.timeNav.style.left = START_LEFT + "px";
            this.$refs.timeNav.style.transition = "left 1s ease-out";
            this.$nextTick(() => {
              this.getLength()
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    //触发农事记录旗子标记
    markerClick (index) {
      this.activeIndex = index
      this.$refs.remarkCarusel.setActiveItem(index)
      this.$refs.timeNav.style.left = START_LEFT - parseFloat(this.$refs.marker[index].style.left) + "px"
      this.startLeft = START_LEFT - parseFloat(this.$refs.marker[index].style.left)
    },
    //切换轮播图
    change (e) {
      this.markerClick(e)
    },
    //放大
    zoom () {
      if (this.scalePer >= 5) {
        retrun;
      }
      this.startLeft = START_LEFT;
      this.$refs.timeNav.style.left = START_LEFT + "px";
      this.scalePer *= 1.05;
      this.getLength();
    },
    //缩小
    scale () {
      if (this.scalePer <= 0.01) {
        return;
      }
      this.startLeft = START_LEFT;
      this.$refs.timeNav.style.left = START_LEFT + "px";
      this.scalePer *= 0.95;
      this.getLength();
    },
    //鼠标按下，记录点击位置
    down (e) {
      e.preventDefault();
      this.moveTime = new Date().getTime();
      this.startX = e.pageX;
      this.mouseDown = true;
    },
    //鼠标移动
    move (e) {
      e.preventDefault();
      if (!this.mouseDown) {
        return;
      }
      this.$refs.timeNav.style.left = `${this.startLeft + e.pageX - this.startX}px`;
    },
    //鼠标抬起，记录最终移动的距离
    up (e) {
      e.preventDefault();
      const that = this
      this.startLeft = this.startLeft + e.pageX - this.startX;
      let time = new Date().getTime() - this.moveTime
      const speed = Math.abs(e.pageX - this.startX) / time
      this.mouseDown = false;
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        console.log(time)
        if (e.pageX - that.startX < 0) {
          that.$refs.timeNav.style.left = `${that.startLeft - 1 * speed}px`;
          that.$refs.timeNav.style.transition = "left 1s ease-out";
        } else {
          that.$refs.timeNav.style.left = `${that.startLeft + 1 * speed}px`;
          that.$refs.timeNav.style.transition = "left 1s ease-out";
        }
        time--
        if (time == 0) {
          clearInterval(that.timer)
        }
      }, 1);

    },
    leave (e) {
      if (this.mouseDown) {
        this.up(e)
      }
    },
    //渲染刻度尺，农事记录旗子位置
    getLength () {
      if (this.recodeList && this.recodeList.length != 0) {
        //获取第一个农事记录，作为 参考系
        const time = new Date(this.recodeList[0].time).getTime();
        let length = 0; //刻度尺长度
        let length1 = 0; //刻度尺left偏移量
        let length2 = 0;
        let tempMonth = [];
        //计算农事记录所在位置
        for (let x = 0; x < this.recodeList.length; x++) {
          let diffTime = 0
          const times = new Date(this.recodeList[x].time).getTime();
          diffTime = (times - time) / 3600000 //小时
          length = diffTime > length ? diffTime : length
          this.$refs.marker[x].style.left = (diffTime * this.housrLength * this.scalePer) + "px";
        }
        //天
        for (let i = 0; i < this.recodeList.length; i++) {
          //获取月份
          tempMonth.push(this.recodeList[i].time.split("-")[0] + "-" + this.recodeList[i].time.split("-")[1]);
          let diff = 0;
          const longTime = new Date(this.recodeList[i].time.split(" ")[0] + " 00:00:00").getTime();
          diff = (longTime - time) / 3600000; //小时
          this.$refs.day[i].style.left = (diff * this.housrLength * this.scalePer) + "px";
        }
        //月
        //去重
        tempMonth = Array.from(new Set(tempMonth))
        for (let j = 0; j < tempMonth.length; j++) {
          let diff1 = 0;
          const monthTime = new Date(tempMonth[j] + "-01 00:00:00").getTime();
          diff1 = (monthTime - time) / 3600000; //小时
          if (diff1 < 0) {
            length1 = diff1;
          }
          this.$refs.month[j].style.left = (diff1 * this.housrLength * this.scalePer) + "px";
        }
        //年
        for (let k = 0; k < this.getTimeYear.length; k++) {
          let diff2 = 0;
          const yearTime = new Date(this.getTimeYear[k].split("年")[0] + "-01-01 00:00:00").getTime();
          diff2 = (yearTime - time) / 3600000; //天
          if (diff2 < 0) {
            length2 = diff2
          }
          this.$refs.year[k].style.left = (diff2 * this.housrLength * this.scalePer) + "px";
        }
        //放大倍数 >=0.5倍，显示月、日
        if (this.scalePer >= 0.5) {
          this.$refs.timeDay.style.display = "block";
          this.$refs.timeMonth.style.display = "block";
          this.$refs.timeYear.style.display = "none";
          this.$refs.timeMinor.style.left = (length1 * this.housrLength * this.scalePer) - 300 + "px";
        } else if (this.scalePer >= 0.05) {
          //倍数为0.05倍，显示年、月
          this.$refs.timeDay.style.display = "none";
          this.$refs.timeMonth.style.display = "block";
          this.$refs.timeYear.style.display = "block";
          length1 = length2
          this.$refs.timeMinor.style.left = (length1 * this.housrLength * this.scalePer) - 300 + "px";
        } else {
          //更小只显示年
          this.$refs.timeDay.
            style.display = "none";
          this.$refs.timeMonth.style.display = "none";
          this.$refs.timeYear.style.display = "block"
          length1 = length2
          this.$refs.timeMinor.style.left = (length1 * this.housrLength * this.scalePer) - 300 + "px";
        }
        //赋予刻度宽度 = 初始宽度 + left偏移量
        this.$refs.timeMinor.style.width = (length * this.housrLength * this.scalePer) - (length1 * this.housrLength * this.scalePer) + 400 + "px";
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.mark
  height 200px
  width 100%
  background #333
  position relative
  cursor move

.timeLine
  height 150px
  width 0px
  background #08c
  position absolute
  left 50%
  transform translateX(-50%)

.timeBox
  height 50px
  width 100%
  position absolute
  top 150px
  background #626262

.timeNav
  position absolute
  width 100%
  top 0
  left 430px
  z-index 1

.time
  position absolute
  top 150px
  height 50px
  background-color #fff
  line-height 0
  max-width none

.time-interval-minor
  max-width none
  height 6px
  white-space nowrap
  position absolute
  top -2px

.minor
  position relative
  top 2px
  display inline-block
  background-image url('../../../../assets/images/mark.png')
  width 100px
  height 6px
  left 0px
  // background-position center top
  white-space nowrap
  color #666
  margin-top 0
  padding-top 0

.toolBar
  position absolute
  top 45px
  left 0
  cursor pointer
  background #000
  z-index 20

.icon1:hover
  color #ffffff
  font-weight 700

.time-interval-minor-month div
  background-image url('../../../../assets/images/mark.png')
  background-position left top
  background-repeat no-repeat
  padding-top 15px
  position absolute
  height 16px
  left 0
  display block
  font-weight bold
  font-size 12px
  line-height 20px
  text-transform uppercase
  text-align left
  text-indent 0
  white-space nowrap
  color #fff
  margin-left 0
  margin-right 0
  margin-top 1px
  z-index 5
  text-indent -12.5px

.time-interval-minor-day div
  background-image url('../../../../assets/images/mark.png')
  background-position left top
  background-repeat no-repeat
  padding-top 6px
  position absolute
  height 10px
  left 0
  display block
  font-weight normal
  font-size 10px
  line-height 20px
  text-transform uppercase
  text-align left
  white-space nowrap
  color #fff
  text-indent -27px

.marker
  position absolute
  top 0
  left 0
  display block

.flag
  position absolute
  padding 10px
  box-sizing border-box
  color #fff
  top 50px
  width 153px
  height 46px
  background #555658
  border-radius 5px 5px 5px 0px
  cursor pointer

.flag:hover
  background #E3E3E3
  color #000

.flag:after
  position absolute
  bottom -10px
  left 0
  content ''
  width 0
  height 0
  border 5px solid transparent
  border-left-color #555658
  border-top-color #555658

.line
  width 1px
  height 150px
  background #ccc
  // background #08c

.p
  font-size 20px
  line-height 26px
</style>