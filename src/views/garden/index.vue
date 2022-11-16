<template>
  <div class="box">
    <div class="header">
      <img src="@/views/garden/garden/topTitle_30.png" style="position:absolute;top:0;height:100%;width:100%;object-fix:contain"/>
      <div class="nav">
        <div v-for="(item, index) in menu" :key="index" class="menuText" :class="item.label == active?'active':''" @click="chooseMenu(item)">
          {{ item.label }}
          <div class="active-icon" v-show="item.label == active"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left">
        <div class="mainImg">
          <img src="@/views/garden/garden/bg.png" style="width:100%;height: 200px"/>
          <div class="mainImgText">
            <span class="gardenName" @click="enterGarden">博瑞136号菜园</span>
            <div style="position:absolute;bottom: 15px;color:#fff;font-size:14px;width:100%">
              <div style="display:flex;justify-content:space-between;padding:0 10px">
                <span style="flex:1">区域：1号地</span>
                <span style="flex:1">适中区域：全国</span>
                <span style="flex:1">适中季节：四季</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="height:190px">
          <span class="cardTitle">试验信息</span>
          <div style="margin-top:10px;padding:0 10px">
            <div class="cardInfo">
              <div class="baseText">
                <img src="@/views/garden/garden/ico_gzdw.png" style="vertical-align:middle;width:22px;height:22px;margin-right:10px"/><span>供应单位</span>
              </div>
              <div style="flex: 1">
                {{ companyInfo.name }}
              </div>
            </div>
            <div class="cardInfo">
              <div class="baseText">
                <img src="@/views/garden/garden/ico_bzrq.png" style="vertical-align:middle;width:22px;height:22px;margin-right:10px"/><span>播种日期</span>
              </div>
              <div style="flex: 1">
                {{ plantInfo.growDate }}
              </div>
            </div>
            <div class="cardInfo">
              <div class="baseText">
                <img src="@/views/garden/garden/ico_dzrq.png" style="vertical-align:middle;width:22px;height:22px;margin-right:10px"/><span>定植日期</span>
              </div>
              <div style="flex: 1">
                {{ plantInfo.plantingDate }}
              </div>
            </div>
            <div class="cardInfo">
              <div class="baseText">
                <img src="@/views/garden/garden/ico_lxr.png" style="vertical-align:middle;width:22px;height:22px;margin-right:10px"/><span>联系人</span>
              </div>
              <div style="flex: 1">
                {{ companyInfo.leader }}
              </div>
            </div>
            <div class="cardInfo">
              <div class="baseText">
                <img src="@/views/garden/garden/ico_lxdh_57.png" style="vertical-align:middle;width:22px;height:22px;margin-right:10px"/><span>联系电话</span>
              </div>
              <div style="flex: 1">
                {{ companyInfo.leaderMobile }}
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="height:calc(100% - 423px)">
          <span class="cardTitle">品种详情</span>
          <div style="display:flex;flex-direction:column;height:calc(100% - 44px)">
            <div class="detailBox">
              <span style="color:#2CBFA7;font-size:12px">品种特性:</span><span style="line-height:18px">{{ plantInfo.trait }}</span>
            </div>
            <div class="detailBox">
              <span style="color:#2CBFA7;font-size:12px">主要栽培措施:</span><span style="line-height:18px">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="right-title">
          <span>甘蓝种植环境</span>
        </div>
        <div style="padding:0 5px;position:relative" class="clearfix">
          <div class="environment" v-for="(item, index) in environmentList" :key="index">
            <img :src="item.img" style="width:30px;height:30px">
            <p style="margin:5px 0;font-size:22px;font-family:DS-Digital">{{ item.value }} <span style="font-size:12px">{{ item.unit }}</span></p>
            <p style="font-size:12px">{{ item.name }}</p>
          </div>
          <div class="echartBox" id="echart">
          </div>
          <div class="scaleBox">
            <img src="@/views/garden/garden/pic_kd.png" style="height:130px;width:130px;border: 5px solid #2A436D;padding:2px;border-radius:50%" />
          </div>
          <div class="inScaleBox"></div>
        </div>
        <div class="recordListBox" style="margin-top:5px;padding: 0 5px">
          <div style="color: #ccc;margin-bottom:10px;padding:0 5px">
            <div class="rightNav" :class="rightActive == item.label? 'rightActive': ''" v-for="(item, index) in rightNavList" :key="index" @click="switchNav(item)">{{ item.name }}</div>
          </div>
          <div class="recordList card" v-show="rightActive=='种植记录'">
            <div class="timeLine"
              v-for="(item, index) in plantRecordList"
              :key="index"
            >
              <div style="width: 70px;color:#0DD1E5">{{ item.time.substr(0, 10)}}</div>
              <div class="point"></div>
              <div style="flex:1;background: rgba(22, 32, 103, 0.8);padding:10px;border-radius:0px 10px 10px 10px;margin-bottom:10px">
                <p style="color:#fff;font-size:14px;margin-bottom:10px">{{ item.recordName}}--{{ item.num }}{{ item.unit }}</p>
                  <div style="color:#8A95D2;font-size:12px">
                    <p style="margin-bottom:5px">操作人：{{ item.person }}</p>
                    <p style="margin-bottom:5px">操作时间：{{ item.time }}</p>
                    <p>所属地块：{{ item.parcel }} ({{ item.parcelArea }}{{ item.parcelUnit }})</p>
                  </div>
              </div>
            </div>
          </div>
          <div class="recordList" v-show="rightActive=='实时图片'" style="overflow:hidden;text-align:center">
            <img :src="currentImg" style="width:calc(100% - 10px);height:220px;margin:5px;" >
            <div class="switch-imgBox">
              <div class="pre" @click="pre">
                <i class="el-icon-arrow-left" style="padding:10px 11px 10px 0;"></i>
              </div>
              <div class="switch-img" ref="box" v-if="carouselList.length > 0">
                <div
                  style="display:inline-block;text-align:center;width:85px;margin:5px;overflow:hidden"
                  v-for="(item, index) in carouselList"
                  :key="index"
                  ref="imgBox"
                  @click="imgClick(item)"
                >
                  <img
                    :src="item.img"
                    style="width:100%;height:55px;margin-bottom:10px"
                    :class="item.img == currentImg? 'imgActive': ''"
                  >
                  <p :style="{color: item.img == currentImg? '#00FFFE': '#ccc'}">{{ item.time }}</p>
                </div>
              </div>
              <div class="next" @click="next">
                <i class="el-icon-arrow-right" style="padding:10px 0 10px 10px;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import img6 from "@/views/garden/garden/ico_1y.png"
import img6_1 from "@/views/garden/garden/ico_dq.png"
import img6_2 from "@/views/garden/garden/ico_qn.png"
import img6_3 from "@/views/garden/garden/ico_jyl.png"

import img7 from "@/views/garden/garden/bg.png"
import img8 from "@/views/garden/garden/bg1.png"
export default {
  data() {
    return {
      color: "#00FFFE",
      menu: [
        {label: '数字菜园', value: '数字菜园'},
        {label: '数字果园', value: '数字果园'}
      ],
      active: '数字菜园',
      rightActive: '种植记录',
      companyInfo: "",
      plantInfo: "",
      feature: "广州市健坤网络科技发展有限公司成立于2000年，前身是广东省农业机械研究所信息部，是一家专业提供行业信息化(农业信息化)综合服务的成长型高新技术企业。",
      environmentList: [
        {name: '全年实测均温', value: '22', unit: '°C', img: img6_2},
        {name: '当前实测均温', value: '22', unit: '°C', img: img6_1},
        {name: '1月实测均温', value: '22', unit: '°C', img: img6},
        {name: '全年实测累计降雨量', value: '1300', unit: 'mm', img: img6_3}
      ],
      rightNavList: [
        {label: "实时图片", name: '实时图片'},
        {label: "种植记录", name: '种植记录'}
      ],
      plantRecordList: [
        {recordName: '甘蓝苗已施肥', num: 30, unit: 'Kg', person: '张三', time: '2020-10-20 13:30', parcel: '地块4', parcelArea: '4.4', parcelUnit: '亩' },
        {recordName: '甘蓝苗已施肥', num: 30, unit: 'Kg', person: '张三', time: '2020-11-01 13:30', parcel: '地块4', parcelArea: '4.4', parcelUnit: '亩' },
        {recordName: '甘蓝苗已施肥', num: 30, unit: 'Kg', person: '张三', time: '2020-12-08 13:30', parcel: '地块4', parcelArea: '4.4', parcelUnit: '亩' },
        {recordName: '甘蓝苗已施肥', num: 30, unit: 'Kg', person: '张三', time: '2020-12-20 13:30', parcel: '地块4', parcelArea: '4.4', parcelUnit: '亩' }
      ],
      carouselList: [
        {img: img7, time: '2020-10-20'},
        {img: img8, time: '2020-11-01'}
      ],
      currentImg: img7
    }
  },
  mounted() {
    const dom = document.getElementById("echart")
    const myEchart = window.myEchart = echarts.init(dom)
    this.init(myEchart)
    this.dataLoad()
  },
  methods: {
    init(myEchart) {
      var  getvalue=[100];
      var option = {
        title: {
          text: getvalue,
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          subtext: '环境评分',
          subtextStyle: {
              color: '#fff',
              fontSize: 12
          },
          itemGap: 10,
          left: 'center',
          top: '40%'
        },
        tooltip: {
          formatter: function (params) {
              return '<span style="color: #fff;">环境评分：'+ getvalue + '分</span>';
          }
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
              show: false,
          },
          axisLine: {
              show: false,

          },
          axisTick: {
              show: false
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%' //图形大小
        },
        series: [{
          type: 'bar',
          data: getvalue,
          showBackground: true,
          backgroundStyle: {
            color: '#BDEBFF',
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 5,
          itemStyle: {
            normal: {
              opacity: 1,
              color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#0DB9DE'
                }, {
                  offset: 1,
                  color: '#1EDEB2'
                }]),
              shadowBlur: 5,
              shadowColor: '#08AFEC',
            }
          },
        }]
      };
      myEchart.setOption(option);
    },
    dataLoad() {
      const config = {
        headers: { 'Content-Type': 'application/form-data'}
      }
      this.$axios.get("http://192.168.33.180:3265/api/sfjdCropInfo?code=001010", config).then(res => {
        if (res.status === 200) {
          this.plantInfo = res.data.data.content[0]
          console.log(this.plantInfo)
          this.getCompanyInfo()
        }
      })
    },
    getCompanyInfo() {
      const config = {
        headers: { 'Content-Type': 'application/form-data'}
      }
      this.$axios.get("http://192.168.33.180:3265/api/sfjdCropCompany?name="+ this.plantInfo.companyName, config).then(res => {
        if (res.status === 200) {
          this.companyInfo = res.data.data.content[0]
          console.log(this.companyInfo)
        }
      })
    },
    // 轮播图切换
    imgClick(item) {
      this.currentImg = item.img
    },
    pre() {
      const left = this.$refs.imgBox[1].offsetLeft
      for (let i = 0; i < this.carouselList.length; i++) {
        if (this.carouselList[i].img == this.currentImg) {
          if (i == 0) {
            this.currentImg = this.carouselList[this.carouselList.length -1].img
            this.$refs.imgBox[this.carouselList.length -1].scrollIntoView(false)
          } else {
            this.currentImg = this.carouselList[i - 1].img
            this.$refs.imgBox[i - 1].style.offsetLeft = left + 'px'
            this.$refs.imgBox[i - 1].scrollIntoView(false)
          }
          break
        }
      }
    },
    next() {
      for (let i = 0; i < this.carouselList.length; i++) {
        if (this.carouselList[i].img == this.currentImg) {
          if (i == this.carouselList.length -1) {
            this.currentImg = this.carouselList[0].img
            this.$refs.imgBox[0].scrollIntoView(false)
          } else {
            this.currentImg = this.carouselList[i + 1].img
            this.$refs.imgBox[i + 1].scrollIntoView(false)
          }
          break
        }
      }
    },
    // 菜单路由切换
    chooseMenu(item) {
      this.active = item.label
    },
    // 进入菜园
    enterGarden() {},
    // 右侧菜单切换
    switchNav(item) {
      this.rightActive = item.label
    }
  }
}
</script>

<style>
@keyframes rotateImg{
  from{
      transform: translate3d(-50%,-50%,0) rotate(0deg);
  }
  to{
      transform: translate3d(-50%,-50%,0) rotate(360deg);
  }
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.box {
  height:100%;
  background:url('./garden/bg.png')
}
.header {
  height: 108px;
  position: relative;
}
.right-title {
  margin-top: 10px;
  height: 35px;
  text-align:center;
  color:#0DD1E5;
  font-size: 15px;
  background: url('./garden/title.png') no-repeat;
  background-size: contain;
}
.nav {
  position: absolute;
  height: 70px;
  left: 50%;
  color: #ccc;
}
.menuText {
  display: inline-block;
  height: 100%;
  line-height: 70px;
  padding: 0 20px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}
.active {
  color: #00FFFE;
}
.rightActive {
  color: #0DD1E5;
  border-bottom: 1px solid #0DD1E5;
}
.imgActive {
  border:1px solid #00FFFE;
}
.active-icon {
  width: 0;
  height: 0;
  border: 7px solid;
  border-color: transparent transparent #00FFFE;
  position: absolute;
  bottom: 8px;
  left:50%;
  transform: translateX(-50%);
}
.container {
  height: calc(100% - 108px);
}
.left {
  background: rgba(22, 32, 103, 0.8);
  margin-left: 20px;
  width: 350px;
  height: calc(100% - 20px);
  margin-top: 10px;
  margin-bottom:10px;
  /* overflow: auto; */
}
.mainImg {
  position: relative;
}
.mainImgText {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(89, 154, 128, 0.7)
}
.gardenName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: inline-block;
  padding: 8px 10px;
  font-size: 14px;
  color: #fff;
  border: 1px solid #fff;
  background: rgba(65, 182, 151, 0.3);
  cursor: pointer;
}
.card {
  color: #fff;
  margin: 10px;
  border-radius: 5px;
  padding: 8px 10px;
  background: rgba(255,255,255,0.2)
}
.cardTitle {
  height: 24px;
  font-size:16px;
  width: 100%;
  display:inline-block;
  padding-bottom:5px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.cardTitle:before {
  content: "";
  position: absolute;
  height:15px;
  width: 3px;
  background: #1FDEB2;
  top: 0;
  left: -6px;
}

.cardInfo {
  padding: 3px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.baseText {
  margin-right: 10px;
  display: inline-block;
  width: 90px;
}
.detailBox {
  flex: 1;
  margin-top: 10px;
  padding: 10px;
  background: rgba(255,255,255, 0.1);
  overflow:hidden;
  /* text-overflow:ellipsis;
  white-space:nowrap; */
  /* display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; */
}

.right {
  float: right;
  background: rgba(28, 54, 128, 0.7);
  margin-top: -30px;
  width: 350px;
  height: calc(100% + 30px);
}
.environment {
  /* display: inline-block; */
  float: left;
  width: 160px;
  height: 120px;
  margin: 5px;
  color: #fff;
  background: rgba(22, 32, 103, 0.8);
}
.environment:nth-child(even) {
  text-align:right;
  padding-right:20px;
  padding-top: 15px;
}
.environment:nth-child(odd) {
  text-align:left;
  padding-left: 20px;
  padding-top: 15px;
}
.echartBox {
  width:70%;
  height:70%;
  position:absolute;
  border-radius: 50%;
  top:50%;
  left:50%;
  transform:translate3d(-50%,-50%,0);
  z-index: 10;
}
.scaleBox {
  width:130px;
  height:130px;
  text-align: center;
  line-height: 130px;
  position:absolute;
  border-radius: 50%;
  /* border: 5px solid #12275E; */
  top:50%;
  left:50%;
  background: #11115B;
  transform:translate3d(-50%,-50%,0);
  box-sizing: border-box;
  animation:  rotateImg 10s ease 0.1s infinite alternate
}
.inScaleBox {
  width:70px;
  height:70px;
  position:absolute;
  border-radius: 50%;
  top:50%;
  left:50%;
  background: radial-gradient(circle, #271EB4, #11125D);
  transform:translate3d(-50%,-50%,0);
  box-sizing: border-box;
}
.rightNav {
  display: inline-block;
  font-size: 15px;
  padding: 5px 10px;
  cursor: pointer;
}
.el-timeline-item__timestamp {
  color: #00FFFE
}
.recordListBox {
  height: calc(100% - 318px)
}
.recordList {
  margin-top: 15px;
  height: calc(100% - 61px);
  overflow: auto;
}
.switch-imgBox {
  padding: 5px;
  display: flex;
  align-items: center;
}
.switch-img {
  white-space: nowrap;
  overflow: hidden;
}
.pre:hover {
  color: #00FFFE;
}
.next:hover {
  color: #00FFFE;
}
.timeLine {
  display: flex;
}
.point {
  width: 1px;
  margin: 0 10px;
  border-right: 1px solid #0DD1E5;
  position: relative;
}
.point::before {
  position: absolute;
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #0DD1E5;
  left: -2px;
}
</style>