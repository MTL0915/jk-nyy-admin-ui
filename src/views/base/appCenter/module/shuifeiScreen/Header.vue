<template>
    <div class="header">
        <div class="header-middle">
          <div class="select">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <ul>
            <li class="item">首页</li>
            <li class="item">策略</li>
            <li class="item">日志</li>
            <li class="item">数据</li>
            <li class="item">视频</li>
            <li class="item">设置</li>
          </ul>
        </div>
        <div class="header-right">
          <div class="tianqi-box">
            <img src="@/assets/images/shuifeiji/header_tianqi_qing.png" class="tianqi-icon">
            <div class="tianqi">晴 32℃</div>
          </div>
          <div class="led-box">
              <div class="led-times">{{dateTime}}</div>
              <div class="led-times-info">{{dateYear}}{{dateWeek}}</div>
          </div>
        </div>
    </div>
</template>

<script>
// 显示时间
import dayjs from 'dayjs'
export default {
    name:'Header',
    data () {
        return {
            dateTime: null,
            dateYear: null,
            dateWeek: null,
            weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            timer:null,
            options: [
              {
                value: '选项1',
                label: '水肥01'
              }, {
                value: '选项2',
                label: '水肥02'
              }
            ],
            value: '水肥01'
        };
    },
    mounted () {
        this.timer = setInterval(() => {
            const date = dayjs(new Date())
            this.dateTime = date.format('HH:mm:ss');
            this.dateYear = date.format('YYYY-MM-DD' + ' ');
            this.dateWeek = date.format(this.weekday[date.day()]);
        }, 1000)
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
.header{
  width: 100%;
  display: flex;
  height: 98px;
  background: url(~@/assets/images/shuifeiji/header_logo.png) no-repeat;
  background-size: cover;
}

.header-middle{
  padding-left: 780px;
  display: flex;
  width: calc(100% - 1090px);
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
}
.header-middle .select {
  width: 122px;
  height: 40px;
}
.header-middle ul {
  display: flex;
}
.header-middle ul li{
  width: 85px;
  height: 41px;
  margin: 0 15px;
  line-height: 41px;
  text-align: center;
  font-size: 18px;
  background: url(~@/assets/images/shuifeiji/header_item_bg.png) no-repeat;
  cursor: pointer;
}
.header-right{
  display: flex;
  width: 310px;
  align-items: center;
  justify-content: space-around;
}
.tianqi-box{
  display: flex;
  align-items: center;
}
.tianqi-icon{
  width: 35px;
  height: 35px;
}
.tianqi {
  font-size: 16px;
  color: #79EEFC;
}
.tianqi-icon {
  margin-right: 10px;
}
.led-box {
  height: 50px;
  color: #79EEFC;
}
.led-times {
  font-family: UniDreamLED;
  font-size: 24px;
}
.led-times-info{
  font-size: 16px;
}

/* 修改饿了么选择框 */
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 20px;
}
::v-deep .el-input__inner {
  background: rgba(255,255,255,0.1);
  color: #00E5FF;
  border: 1px solid #00E5FF;
  border-radius: 20px;
}
::v-deep .el-input__inner:hover {
  border: 1px solid #00E5FF;
}
::v-deep .el-select .el-input.is-focus .el-input__inner {
    border-color: #00E5FF;
}
::v-deep .el-select .el-input__inner:focus {
    border-color: #00E5FF;
}
.el-select-dropdown__item {

}
::v-deep .el-select-dropdown {
  background-color: transparent;
}
::v-deep .el-select-dropdown__list {
  padding: 0;
}
::v-deep .el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
::v-deep .el-popper .popper__arrow,
::v-deep .el-popper .popper__arrow::after {
  display: none;
}
.el-select-dropdown__item:hover {
  color: #00E5FF;
}

</style>