<template>
    <div class="header">
        <div class="header-left">
          <img src="@/assets/images/shuifeiji/header_logo.png" class="logo">
          <div class="select">
            <el-select v-model="value" placeholder="请选择" style="width:215px;height:40px" :popper-append-to-body="false" @change="handleChange">
              <el-option
                v-for="item in list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <ul class="nav">
            <li class="item" v-for="(item, index) in navList" :key="index" :class="{ isActive: item.router == selectTag }" @click="HandelToggle(index,item.router)">{{item.name}}</li>
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
          <img src="@/assets/images/shuifeiji/set.png" class="set-icon" @click="handleSet">
        </div>
    </div>
</template>

<script>
// 显示时间
import dayjs from 'dayjs'
import { productSfList, productSfDetail } from '@/api/shuifei'
export default {
    name:'Header',
    props:['value'],
    data () {
        return {
            dateTime: null,
            dateYear: null,
            dateWeek: null,
            weekday: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            timer:null,
            bs_base_id:'',
            list:[],
            value:'',
            toggleIndex: 0,
            selectTag: "", //选择菜单
            navList:[
              {
                name:'首页',
                type:'home',
                router:'/bigScreen/bigScreenHome',
              },
              {
                name:'策略',
                type:'strategy',
                router:'/bigScreen/bigScreenStrategy',
              },
              {
                name:'日志',
                type:'log',
                router:'/bigScreen/bigScreenLog',
              },
              {
                name:'数据',
                type:'data',
                router:'/bigScreen/bigScreenData',
              },
              {
                name:'视频',
                type:'sxt',
                router:'/bigScreen/bigScreenSxt',
              },
            ],
            hd_device_id:''
        };
    },
    created(){
      // 获取当前基地id
      this.bs_base_id = this.$route.query.bs_base_id
      // 获取当前基地水肥应用，用于头部下拉列表
      this.getList()
    },
    mounted(){
        this.timer = setInterval(() => {
            const date = dayjs(new Date())
            this.dateTime = date.format('HH:mm:ss');
            this.dateYear = date.format('YYYY-MM-DD' + ' ');
            this.dateWeek = date.format(this.weekday[date.day()]);
        }, 1000)
        // this.HandelToggle(0,'bigScreenHome')
        this.getProductSfDetail()
    },
    watch: {
      "$route.path": {
        handler(val) {
          console.log("菜单：", val); //'/bigScreen/bigScreenLog'
          this.selectTag = val;	//val是路由跳转的path
        },
        immediate: true //立即执行
      }
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    },
    methods: {
      // 设置返回水肥列表页
      handleSet() {
        this.$router.push({
          path: "/appcenter/fertilizer",
        });
      },
      // 获取水肥应用列表（主列表）
      getList(){
        const _params = {
          bs_base_id: this.bs_base_id,
        }
        productSfList(_params).then(res => {
          if (res.code === 200) {
            this.list = res.data.content
          }
        })
      },
      // 根据水肥id获取到主设备的32位id
      getProductSfDetail(){
        const data = {
          id: this.$route.query.id,
        }
        productSfDetail(data)
          .then(res => {
            if (res.code === 200) {
              this.hd_device_id = res.data.hd_device_id
            }
          })
      },
      // 下拉列表切换
      handleChange(){
        this.$router.push({
          path: "/bigScreen/bigScreenHome",
          query: {
            bs_base_id: this.bs_base_id,
            id: this.value,
          },
        });
        this.$router.go(0) //强制刷新
      },
      // nav导航栏切换
      HandelToggle(index,router){
        this.toggleIndex = index;
        this.$router.push({
          path: router,
          query: {
            bs_base_id: this.bs_base_id,
            id: this.value,
            hd_device_id: this.hd_device_id,
          },
        });
      },
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
  background-size: cover;
  justify-content: space-between;
}

.header-left{
  display: flex;
  width: calc(100% - 370px);
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  background: url(~@/assets/images/shuifeiji/header_bg_left.png) no-repeat;
}
.header .logo{
  padding-left: 25px;
  padding-right: 25px;
}
.header-left .select {
  width: 215px;
  height: 40px;
  padding-bottom: 20px;
}
.header-left .nav {
  display: flex;
  padding-bottom: 20px;
  padding-right: 35px;
}
.header-left .nav li{
  width: 85px;
  height: 41px;
  margin: 0 12px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  background: url(~@/assets/images/shuifeiji/header_item_bg.png) no-repeat;
  cursor: pointer;
}
.header-left .nav li:hover{
  background: url(~@/assets/images/shuifeiji/header_item_bg_active.png) no-repeat;
}
.header-left .nav li.isActive{
  background: url(~@/assets/images/shuifeiji/header_item_bg_active.png) no-repeat;
}
.header-right{
  display: flex;
  width: 340px;
  align-items: center;
  justify-content: space-around;
  background: url(~@/assets/images/shuifeiji/header_bg_right.png) no-repeat;
  padding-bottom: 20px;
  padding-left: 30px;
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
.set-icon{
  cursor: pointer;
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
::v-deep .el-icon-arrow-up:before {
    content: "\e6e1";
    color: #00E5FF;
}
::v-deep .el-select-dropdown {
  background-color: #0e527f;
  border: none;
}
::v-deep .el-select-dropdown__wrap {
  border-top: 5px solid #02fef6;
}
::v-deep .el-select-dropdown__list {
  padding: 0;
  background-color: #0e527f;
}
::v-deep .el-popper[x-placement^="bottom"] {
  margin-top: 30px;
}
::v-deep .el-popper .popper__arrow{
  left: 100px !important;
  border-bottom-color: #02fef6;
}
::v-deep .el-popper .popper__arrow::after {
  display: none;
}
.el-select-dropdown__item {
  background-color: #0e527f;
  color: #fff;
  text-align: center;
  height: 57px;
  line-height: 57px;
  border-bottom: 2px solid #165c8a;
}
.el-select-dropdown__item:hover {
  color: #00E5FF;
  background-color: #0e527f;
}

</style>