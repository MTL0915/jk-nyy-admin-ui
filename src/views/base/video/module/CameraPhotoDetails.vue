<template>
  <div>
    <!-- <div
      v-show="sensorShow"
      style="z-index: 9999;position: fixed;top: 0;left: 0;width:100%;height:20%;cursor: pointer;"
      @click="closePicture"
    >
      

    </div> -->
    <div
      style="z-index: 9999;position: fixed;top: 0;left: 0;width:100%;height:100%;cursor: pointer;"
      v-show="preveShow"
      class="pre"
      @mouseenter="mouseenter"
    >
      <div style="position: absolute;top: 30px;right: 30px">
        <i
          class="el-icon-circle-close"
          style="color: #fff;font-size: 30px"
          @click="closePre"
        ></i>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <!-- 显示传感器数据Strat -->
        <div class="head">
          <div style="margin-left: 30px;">
            <!-- 温度 -->
            <div>
              <div v-if="photoSensor0">
                <span
                  style="font-size: 50px;"
                  :style="{ color: photoSensor0.state == 2 ? 'red' : photoSensor0.state == 3 || photoSensor0.state == 4? '#e2e200' : '#11DC86'}"
                >{{(photoSensor0.value===null || photoSensor0.value===undefined)?'暂无数据':(photoSensor0.value+photoSensor0.unit || ''+'   ')}}</span>
                <span style="font-size: 25px;">{{photoSensor0.name}}</span>
              </div>
              <!-- <div v-else><span style="font-size: 50px;">暂无温度</span></div> -->
            </div>
            <!-- 时间 -->
            <div style="font-size: 25px;">
              <div v-if="photoTime">
                <span>{{parseTime(photoTime)}}</span>
              </div>
              <div v-else>
                <span>暂无时间{{photoTime}}</span>
              </div>
            </div>
          </div>
          <!-- 传感器 -->
          <div
            v-if="photoSensor1"
            style="text-align: center;font-size: 18px;margin-left: 30px;"
          >
            <div style="margin-top:18px;"><span>{{photoSensor1.name}}</span></div>
            <div :style="{ color: photoSensor1.state == 2 ? 'red' : photoSensor1.state == 3 || photoSensor1.state == 4? '#e2e200' : '#11DC86'}">
              <span v-show="photoSensor1.value != undefined && photoSensor1.value != null">{{photoSensor1.value+photoSensor1.unit || ''}}</span>
              <span v-show="photoSensor1.value == undefined && photoSensor1.value == null">暂无数据</span>
            </div>
          </div>
          <div
            v-if="photoSensor2"
            style="text-align: center;font-size: 18px;margin-left: 30px;"
          >
            <div style="margin-top:18px;"><span>{{photoSensor2.name}}</span></div>
            <div :style="{ color: photoSensor2.state == 2 ? 'red' : photoSensor2.state == 3 || photoSensor2.state == 4? '#e2e200' : '#11DC86'}">
              <span v-show="photoSensor2.value">{{photoSensor2.value+photoSensor2.unit || ''}}</span>
              <span v-show="!photoSensor2.value">暂无数据</span>
            </div>
          </div>
          <div
            v-if="photoSensor3"
            style="text-align: center;font-size: 18px;margin-left: 30px;"
          >
            <div style="margin-top:18px;"><span>{{photoSensor3.name}}</span></div>
            <div :style="{ color: photoSensor3.state == 2 ? 'red' : photoSensor3.state == 3 || photoSensor3.state == 4? '#e2e200' : '#11DC86'}">
              <span v-show="photoSensor3.value">{{photoSensor3.value+photoSensor3.unit || ''}}</span>
              <span v-show="!photoSensor3.value">暂无数据</span>
            </div>
          </div>
        </div>
        <!-- 显示传感器数据End -->
        <div>
          <!-- 海睿虫情识别Strat -->
          <div
            class="head"
            v-if="recognition_type === 'hairui_cq'"
          >
            <div
              class="rightShow"
              v-if="hairuiArray && hairuiArray.length!==0"
            >
              <div>
                <span
                  class="spanClass"
                  style="'color:#ffffff;text-align: right;'"
                >虫情识别：</span>
              </div>
              <div
                class="head"
                style="height: 32px;margin-top: 15px;"
              >
                <div
                  v-for="(item,index) in hairuiArray"
                  :key="index"
                  style="text-align: center;font-size: 18px;margin-left: 15px;"
                >
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.name}}:</span>
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.value}}</span>
                </div>
              </div>
              <!-- 时间 
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间{{photoTime}}</span>
            </div>
          </div>-->
            </div>
          </div>
          <!-- 海睿虫情识别End -->
          <!-- 瑞丰虫情识别Start -->
          <div
            class="head"
            v-else-if="recognition_type === 'ruifeng_cq'"
          >
            <div
              class="rightShow"
              v-if="ruifengArray && ruifengArray.length!==0"
            >
              <div>
                <span
                  class="spanClass"
                  style="'color:#ffffff;text-align: right;'"
                >虫情识别：</span>
              </div>
              <div
                class="head"
                style="height: 32px;margin-top: 15px;"
              >
                <div
                  v-for="(item,index) in ruifengArray"
                  :key="index"
                  style="text-align: center;font-size: 18px;margin-left: 15px;"
                >
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.name}}:</span>
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.value}}</span>
                </div>
              </div>
              <!-- 时间 
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间{{photoTime}}</span>
            </div>
          </div>-->
            </div>
          </div>
          <!-- 瑞丰虫情识别End -->
          <!-- 百度人形识别Start -->
          <div
            class="head"
            v-else-if="recognition_type === 'baidu_humanoid'"
          >
            <div
              class="rightShow"
              v-if="humanoidArray && humanoidArray.length!==0"
            >
              <div>
                <span
                  class="spanClass"
                  style="'color:#ffffff;text-align: right;'"
                >识别类型：人形</span>
              </div>
              <div
                class="head"
                style="height: 32px;margin-top: 15px;"
              >
                <div
                  v-for="(item,index) in humanoidArray"
                  :key="index"
                  style="text-align: center;font-size: 18px;margin-left: 15px;"
                >
                  <!-- <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.name}}:</span> -->
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >识别数量：{{item.value}}</span>
                </div>
              </div>
              <!-- 时间 
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间{{photoTime}}</span>
            </div>
          </div>-->
            </div>
          </div>
          <!-- 百度人形识别End -->
          <!-- 死鱼识别Start -->
          <div
            class="head"
            v-else-if="recognition_type === 'deadfish'"
          >
            <div
              class="rightShow"
              v-if="deadfishArray && deadfishArray.length!==0"
            >
              <div>
                <span
                  class="spanClass"
                  style="'color:#ffffff;text-align: right;'"
                >识别类型：死鱼</span>
              </div>
              <div
                class="head"
                style="height: 32px;margin-top: 15px;"
              >
                <div
                  v-for="(item,index) in deadfishArray"
                  :key="index"
                  style="text-align: center;font-size: 18px;margin-left: 15px;"
                >
                  <!-- <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.name}}:</span> -->
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >识别数量：{{item.value}}</span>
                </div>
              </div>
              <!-- 时间 
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间{{photoTime}}</span>
            </div>
          </div>-->
            </div>
          </div>
          <!-- 死鱼识别End -->
          <!-- 物品识别Start -->
          <div
            class="head"
            v-else-if="recognition_type === 'ItemRecognition'"
          >
            <div
              class="rightShow"
              v-if="ItemRecognitionName!==''"
            >
              <div>
                <span
                  class="spanClass"
                  style="color:#ffffff;"
                >识别类型：{{ItemRecognitionName}}</span>
              </div>
              <div>
                <div
                  v-for="(item,index) in ItemRecognitionArray"
                  :key="index"
                >
                  <!-- <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >{{item.name}}:</span> -->
                  <span
                    class="spanClass"
                    :style="'color:'+item.color+';'"
                  >识别数量：{{item.value}}</span>
                </div>
              </div>
              <div v-if="pestStr !== ''">
                <span
                  class="spanClass"
                  style="color:#ff0000;"
                >病虫害：{{pestStr}}</span>
              </div>
              <!-- 时间 
          <div style="font-size: 25px;">
            <div v-if="photoTime">
              <span>{{parseTime(photoTime)}}</span>
            </div>
            <div v-else>
              <span>暂无时间{{photoTime}}</span>
            </div>
          </div>-->
            </div>
          </div>
          <!-- 物品识别End -->
        </div>

      </div>
      <div
        style="position: fixed;top: 100px;bottom: 0;left: 0;right: 0;overflow:hidden"
        ref="pre"
      >
        <div style="position:relative;width: 100%;height: 100%">
          <div
            ref="preBox"
            class="preBox"
            @mousedown="mousedown"
          >
            <img
              class="pre_img"
              :src="image_path"
            />
            <div
              v-for="(item, index) in imgConfig"
              :key="index"
            >
              <div
                class="redFrame"
                ref="ItemRecogn"
                v-for="(v, i) in item.location"
                :key="i"
                :style="{
                  left: v.left + 'px',
                  top: v.top + 'px',
                  width: v.width + 'px',
                  height: v.height + 'px',
                  border: `${borderWidth}px solid ${v.color}`,
                  display: 'flex',
                  'align-items': 'center'
                }"
                @mouseover="ItemRecognMouseover(i,v.color)"
                @mouseout="ItemRecognMouseout(i)"
              >
                <span>{{v.maturity_rate}}</span>
              </div>
            </div>

          </div>
          <div class="scaleMenu">
            <i
              title="缩小"
              class="scaleMenuIcon el-icon-zoom-out"
              @click="zoomOut"
            />
            <i
              title="恢复"
              class="scaleMenuIcon el-icon-full-screen"
              @click="recover"
            />
            <i
              title="放大"
              class="scaleMenuIcon el-icon-zoom-in"
              @click="zoomIn"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPhotoDetails } from '@/api/hd_device_camera'
import { parseTime } from '@/utils/index'
// const TEMP = "ff8080817682e8200176838180880094"
export default {
  data () {
    return {
      //temp: TEMP,
      scale: 0.1,
      naturalScale: [], // 图片加载完成后的原始缩放尺寸
      top: 0,
      preveShow: false,
      imgConfig: [],
      image_path: "",
      photoTime: null,
      photoSensor0: null,
      photoSensor1: null,
      photoSensor2: null,
      photoSensor3: null,
      hd_device_id: "",
      hairuiArray: null,//海睿虫情数组
      ruifengArray: null,//瑞丰虫情数组
      humanoidArray: null,//人形识别数组
      deadfishArray: null,//死鱼识别数组
      ItemRecognitionArray: null,//物品识别数组
      ItemRecognitionName: '',//物品名称
      recognition_type: null,
      borderWidth: 1,//识别框宽度
      colorArray: ['#ff5757', '#aaffd0', '#eddb08', '#6690dd', '#dde171', '#34c95e', '#8e9d9c', '#50b7c1', '#ad8b3d', '#e349ff'],//默认颜色组
      api2: 'https://cp.e-jiankun.com/recognise/api/disease/getCropAndPestResult',
      // api2: 'https://cp.e-jiankun.com/recognise/api/disease/getPestDetailResult',//用不了
      pestStr: '',

    }
  },
  methods: {
    // 监听鼠标移入
    mouseenter (e) {
      // 监听鼠标滚轮事件
      this.addEvent(document, 'mousewheel', this.scrollFunc)
      this.addEvent(document, 'DOMMouseScroll', this.scrollFunc)
    },
    // 鼠标滚轮事件，兼容性处理
    addEvent (obj, xEvent, fn) {
      if (obj.attachEvent) {
        obj.attachEvent('on' + xEvent, fn)
      } else {
        obj.addEventListener(xEvent, fn, false)
      }
    },
    scrollFunc (e) {
      // 向上滚动，则放大，向下滚动，则缩小
      e = e || window.event
      if (e.wheelDelta) { // 第一步：先判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 50) { // 当滑轮向上滚动时
          console.log('滑轮向上滚动')
          this.zoomIn()
        }
        if (e.wheelDelta < 50) { // 当滑轮向下滚动时
          console.log('滑轮向下滚动')
          this.zoomOut()
        }
      } else if (e.detail) { // Firefox滑轮事件
        if (e.detail > 50) { // 当滑轮向上滚动时
          console.log('滑轮向上滚动')
          this.zoomIn()
        }
        if (e.detail < 50) { // 当滑轮向下滚动时
          console.log('滑轮向下滚动')
          this.zoomOut()
        }
      }
    },
    // 图片拖动
    mousedown (e) {
      const dom = this.$refs.preBox
      const domScale = dom.style.transform.split('scale')[1].substring(1, dom.style.transform.split('scale')[1].length - 1).split(',')
      // 获取鼠标点击图片时，相对与页面的横坐标，纵坐标
      let startX = e.clientX
      let startY = e.clientY
      // 图片缩放后的宽高
      const scaleWidth = dom.offsetWidth * domScale[0]
      const scaleHeight = dom.offsetHeight * domScale[1]
      const mousemove = (moveEvent) => {
        // 移动后的位置
        const endX = moveEvent.clientX
        const endY = moveEvent.clientY
        // 移动距离
        const moveX = endX - startX
        const moveY = endY - startY
        // dom.style.left = dom.offsetLeft - scaleWidth * 0.5  + moveX + 'px'
        // dom.style.top = dom.offsetTop - scaleHeight * 0.5 + moveY + 'px'
        dom.style.left = dom.offsetLeft + moveX + 'px'
        dom.style.top = dom.offsetTop + moveY + 'px'
        dom.style.transform = `translate(-50%, -50%) scale(${domScale[0]}, ${domScale[1]})`
        startX = moveEvent.clientX
        startY = moveEvent.clientY
      }
      // 鼠标抬起，清除所有鼠标监听事件
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }

      // 监听鼠标移动
      document.addEventListener('mousemove', mousemove)
      // 监听鼠标抬起
      document.addEventListener('mouseup', mouseup)
    },
    // 缩小
    zoomOut () {
      const dom = this.$refs.preBox
      const domScale = dom.style.transform.split('scale')[1].substring(1, dom.style.transform.split('scale')[1].length - 1).split(',')
      dom.style.transform = `translate(-50%, -50%) scale(${domScale[0] - domScale[0] * this.scale}, ${domScale[1] - domScale[1] * this.scale})`
    },
    // 放大
    zoomIn () {
      const dom = this.$refs.preBox
      const domScale = dom.style.transform.split('scale')[1].substring(1, dom.style.transform.split('scale')[1].length - 1).split(',')
      dom.style.transform = `translate(-50%, -50%) scale(${domScale[0] * 1 + domScale[0] * this.scale}, ${domScale[1] * 1 + domScale[1] * this.scale})`
    },
    // 恢复
    recover () {
      const dom = this.$refs.preBox
      // const domScale = dom.style.transform.split('scale')[1].substring(1, dom.style.transform.split('scale')[1].length - 1).split(',')
      dom.style.left = '50%'
      dom.style.top = '50%'
      dom.style.transform = `translate(-50%, -50%) scale(${this.naturalScale[0] * 1}, ${this.naturalScale[1] * 1})`
    },
    ItemRecognMouseover (i, color) {
      this.$refs.ItemRecogn[i].style.color = color
    },
    ItemRecognMouseout (i) {
      this.$refs.ItemRecogn[i].style.color = 'transparent'
    },
    parseTime,
    addTime (time) {
      this.photoTime = time + 9 * 24 * 3600 * 1000
    },
    getData (id) {
      this.images = [];
      this.imagesInfo = {};
      const data = {
        id: this.photoID
      };
      this.photoTime = null
      this.photoSensor0 = null
      this.photoSensor1 = null
      this.photoSensor2 = null
      this.photoSensor3 = null
      getPhotoDetails({
        id: id
      }).then(res => {
        if (res.code === 200) {
          this.imgConfig = []
          this.preveShow = true
          // 临时
          // if (this.hd_device_id == TEMP) {
          //   this.addTime(res.data.insert_date)
          // } else {
          //   this.photoTime = res.data.insert_date
          // }
          this.photoTime = res.data.insert_date
          if (res.data.image_path.indexOf("http") == -1) {
            this.image_path = process.env.IMG_URL + res.data.image_path
          } else {
            this.image_path = res.data.image_path
          }

          //识别处理
          this.recognition_type = res.data.recognition_type
          let recognition_json = res.data.recognition_json

          if (this.recognition_type) {

            //海睿虫情识别
            if ("hairui_cq" === this.recognition_type) {
              if (recognition_json) {
                this.hairuiArray = []
                let rjson = JSON.parse(recognition_json)
                for (let i = 0; i < rjson.data.length; i++) {
                  this.hairuiArray.push({
                    name: rjson.data[i].name,
                    color: rjson.data[i].color || this.colorArray[i],
                    value: rjson.data[i].number
                  })
                }
              }
            }
            //ruifeng_cq瑞丰虫情识别
            else if ("ruifeng_cq" === this.recognition_type) {
              if (recognition_json) {
                this.ruifengArray = []
                let rjson = JSON.parse(recognition_json)
                for (let i = 0; i < rjson.data.length; i++) {
                  this.ruifengArray.push({
                    name: rjson.data[i].name,
                    color: rjson.data[i].color || this.colorArray[i],
                    value: rjson.data[i].number
                  })
                  for (let j = 0; j < rjson.data[i].location.length; j++) {
                    rjson.data[i].location[j].color = rjson.data[i].color || this.colorArray[i]
                  }
                }
                this.imgConfig = rjson.data
              }
            }
            //baidu_humanoid百度人形识别
            else if ("baidu_humanoid" === this.recognition_type) {
              this.humanoidArray = []
              let rjson = JSON.parse(recognition_json)
              for (let i = 0; i < rjson.data.length; i++) {
                this.humanoidArray.push({
                  name: rjson.data[i].name,
                  color: rjson.data[i].color || this.colorArray[i],
                  value: rjson.data[i].number
                })
                for (let j = 0; j < rjson.data[i].location.length; j++) {
                  rjson.data[i].location[j].color = rjson.data[i].color || this.colorArray[i]
                }
              }
              this.imgConfig = rjson.data
            }
            //deadfish 死鱼识别
            else if ("deadfish" === this.recognition_type) {
              if (recognition_json) {
                this.deadfishArray = []
                let rjson = JSON.parse(recognition_json)
                for (let i = 0; i < rjson.data.length; i++) {
                  this.deadfishArray.push({
                    name: rjson.data[i].name,
                    color: rjson.data[i].color || this.colorArray[i],
                    value: rjson.data[i].number
                  })
                  for (let j = 0; j < rjson.data[i].location.length; j++) {
                    rjson.data[i].location[j].color = rjson.data[i].color || this.colorArray[i]
                  }
                }
                this.imgConfig = rjson.data
              }
            }
            //ItemRecognition 物品识别
            else if ("ItemRecognition" === this.recognition_type) {
              this.ItemRecognitionName = ''
              this.ItemRecognitionArray = []
              if (recognition_json) {
                this.ItemRecognitionArray = []
                let rjson = JSON.parse(recognition_json)
                for (let i = 0; i < rjson.data.length; i++) {
                  if (rjson.data.length === 1) {
                    this.ItemRecognitionName = rjson.data[i].name
                  } else {
                    this.ItemRecognitionName = this.ItemRecognitionName + ' ' + rjson.data[i].name
                  }
                  this.ItemRecognitionArray.push({
                    name: rjson.data[i].name,
                    color: rjson.data[i].color || '#DDFF23',// this.colorArray[i],
                    value: rjson.data[i].number,
                    maturity_rate: rjson.data[i].maturity_rate,
                  })
                  for (let j = 0; j < rjson.data[i].location.length; j++) {
                    rjson.data[i].location[j].color = rjson.data[i].color || '#DDFF23'//|| this.colorArray[i]
                  }
                }
                this.imgConfig = rjson.data
              }
              this.pestStr = ''
              //防止http访问https出现跨域
              let a = this.image_path.replaceAll('https://', 'http://')
              // let a = 'https://iot.e-jiankun.com/picture/iot/upload/test/aa.png'
              this.getImageFileFromUrl(a, file => {
                let formData = new FormData()
                formData.append('file', file)
                // formData.append('cropName', 'lizhi')
                // formData.append('image_path', file)
                const config = {
                  headers: { 'Content-Type': 'multipart/form-data', 'Authorization': '' }
                }
                this.$axios.post(this.api2, formData, config).then(res => {
                  console.log(res)
                  if (res.data.code === 200) {
                    if (res.data.data.code === 'lizhi') {
                      // 根据识别率从大到小进行排序
                      // res.data.data.pestList = res.data.data.pestList.sort((a, b) => b.probability - a.probability)
                      for (let i = 0; i < res.data.data.pestList.length; i++) {
                        //病虫害类型,并且识别率大于60
                        if (res.data.data.pestList[i].type === 'bs_pest' && res.data.data.pestList[i].probability > 60) {
                          this.pestStr = this.pestStr + ' ' + res.data.data.pestList[i].name
                        }
                      }
                    }
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
              });
            }
          }
          //图片过大，进行适配缩放
          this.$nextTick(() => {
            const dom = this.$refs.preBox.getElementsByClassName("pre_img")[0];
            //图片加载完成后执行
            dom.onload = () => {
              //获取外层父元素宽高
              const w = this.$refs.pre.offsetWidth;
              const h = this.$refs.pre.offsetHeight;
              //获取图片原始像素
              const w1 = dom.naturalWidth;
              const h1 = dom.naturalHeight;
              //根据原始图片大小设置边框宽度，防止看不清
              this.getBorderWidth(w1)

              const whb = w / h
              const whb1 = w1 / h1
              let scaleW = null
              let scaleH = null
              let pcH = 0
              let pcW = 0
              if (whb1 > whb) {
                scaleW = w / w1
                scaleH = w / w1
                pcH = (w / w1 * h1) / 2
                //this.$refs.preBox.style.top = `calc(50% - ${pcH}px)`;
              } else {
                scaleW = h / h1
                scaleH = h / h1
                pcW = (h / h1 * w1) / 2
                //this.$refs.preBox.style.left = `calc(50% - ${pcW}px)`;
              }

              //缩放
              this.$refs.preBox.style.left = '50%'
              this.$refs.preBox.style.top = '50%'
              this.$refs.preBox.style.transform = `translate(-50%, -50%) scale(${scaleW}, ${scaleH})`
              // this.$refs.preBox.style.transform = `scale(${scaleW}, ${scaleH}) translate(${-w1 * (1 - scaleW)}px, ${-h1 * (1 - scaleH)}px)`;
              // this.$refs.preBox.style.transformOrigin = `0 0`;
              this.naturalScale = [scaleW, scaleH]

            }
          })

          let sensor_json = res.data.sensor_json
          if (sensor_json) {
            let list = JSON.parse(sensor_json)
            let index = 0
            for (let w = 0; w < list.length; w++) {
              let s = list[w]
              if (s.sensor_code !== '101' && s.sensor_code !== '102' && s.sensor_code !== "801") {
                this['photoSensor' + index] = { name: s.sensor_name, value: s.sensor_value, unit: s.sensor_unit || '', state: s.state }
                index++
                if (index === 4) { break }
              }
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 根据路径返回file
    getImageFileFromUrl (url, callback) {
      // imageName一定要带上后缀
      var blob = null
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Accept', 'image/jpeg')
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          blob = xhr.response
          const imgFile = new File([blob], '图片.png', { type: 'image/jpeg' })
          callback.call(this, imgFile)
        }
      }
      xhr.send()
    },
    getColor (i) {
      if (i >= this.colorArray.length) {
        return '#72777b'
      } else {
        return this.colorArray[i]
      }
    },
    closePre () {
      this.preveShow = false;
    },
    getBorderWidth (w) {
      if (w <= 1000) {
        this.borderWidth = 1
      } else if (w <= 2000) {
        this.borderWidth = 2
      } else if (w <= 3000) {
        this.borderWidth = 3
      } else if (w <= 4000) {
        this.borderWidth = 4
      } else if (w <= 5000) {
        this.borderWidth = 5
      } else if (w <= 6000) {
        this.borderWidth = 6
      } else if (w <= 7000) {
        this.borderWidth = 7
      }
    },
    //获取url参数字段
    GetQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      // var r = window.location.search.substr(1).match(reg);
      var str = window.location.hash.split("wechatRecord?")[1];
      if (str == undefined) {
        return null;
      }
      var r = str.match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
}
</script>
</script>
<style lang="stylus" scoped>
.head
  background rgba(0, 0, 0, .9)
  color #ffffff
  display flex
  height 100px

.redFrame
  position absolute
  color transparent
  // border 1px solid red

.pre
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  overflow hidden
  text-align center
  background rgba(0, 0, 0, .9)

.preBox
  position absolute

.pre_img
  -webkit-user-select none !important
  -moz-user-select none !important
  -khtml-user-select none !important
  -ms-user-select none !important
  pointer-events none !important

.spanClass
  font-size 20px
  font-weight 700

.rightShow
  margin-left 30px
  text-align right
  margin-right 100px

.scaleMenu
  position absolute
  bottom 50px
  left 50%
  transform translateX(-50%)
  background #66686B
  height 44px
  display flex
  align-items center
  padding 0 22px
  border-radius 22px

.scaleMenuIcon
  color #CECFCF
  font-size 30px
  margin 0 10px
</style>