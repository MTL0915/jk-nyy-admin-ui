<template>
  <div class='noManList'>
    <!-- 按钮 -->
    <div></div>
    <!-- 列表 -->
    <div class='list'>
      <!-- 头部 -->
      <div class='head'>
        <div class='name'>
          <!-- <span class='dian'></span> -->
          <img :src='require("@/assets/img/Plan/drawLineMap/qp/jt.png")' />
          <span>设备属性</span>
        </div>
      </div>
      <!-- 内容格子 -->
      <div class='box'>
        <div class='y-line'></div>
        <div class='listBox'>
          <div class='value'>{{property_values.location ? property_values.location[0].toFixed(7) : "-"}}</div>
          <div class='valueName'>经度:(°E °N)</div>
        </div>
        <div class='listBox'>
          <div class='value'>{{property_values.location ? property_values.location[1].toFixed(7) : "-"}}</div>
          <div class='valueName'>纬度:(°E °N)</div>
        </div>
        <div class='line'></div>
        <div class='listBox'>
          <div class='value'>{{property_values.speed ? property_values.speed.toFixed(1) : "0"}}</div>
          <div class='valueName'>速度:(m/s)</div>
        </div>
        <div class='listBox'>
          <div class='value'>{{property_values.gps_sta === 4 ? "正常" : "干扰"}}</div>
          <div class='valueName'>卫星信号状态</div>
        </div>
        <div class='line'></div>

        <div class='listBox'>
          <div class='value'>{{
                        property_values.speed === 0 && property_values.direction === 0 ? "停止": 
                            ( property_values.direction > 315 || property_values.direction < 45 ? "直行": 
                                ( property_values.direction >= 45 && property_values.direction < 135?"右转": 
                                    ( property_values.direction >= 135 && property_values.direction <= 225?"后退": 
                                        (property_values.direction >= 225 && property_values.direction <= 315?"左转": "-")) 
                            ))}}</div>
          <div class='valueName'>行驶状态</div>
        </div>

        <!-- 开沟机 -->
        <div
          v-if="updateInfo && updateInfo.hd_device_type_code==='JK-WA'"
          class='listBox'
        >
          <div class='value'>
            {{getJjzt(updateInfo)}}
          </div>
          <div class='valueName'>机具状态</div>
        </div>
        <div
          v-else
          class='listBox'
        >
          <!--<div class='value'>{{property_values.arimuth!==undefined ? property_values.arimuth:'未知'}}°</div>
                    <div class='valueName'>方位角</div> -->
          <div
            class='value'
            style='height: 14px;width: 100%;text-align: center;position: relative;'
          >
            <img
              v-if='text !== "喷药状态"'
              src='@/assets/img/penshui.png'
              style="height: 55px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"
            />
            <div v-if='text === "喷药状态"'> 停止中 </div>
          </div>
          <div class='valueName'>{{text}}</div>
        </div>

        <div class='line'></div>
        <div
          class='listBox'
          v-for='(it,i) in sensorInfos.filter((e)=>{ return e.channelType === 2 || e.channelType === 3 || e.channelType === 5 })'
          :key='i'
        >
          <div class='value'>{{( updateInfo.channelValue[it.channel - 1] || "-" ) + " " + ( it.unit || "" )}}</div>
          <div class='valueName'>{{it.name}}</div>
        </div>
        <div class='listBox'>
          <div class='value'>{{property_values.version}}</div>
          <div class='valueName'>版本号</div>
        </div>
      </div>
      <div>
        <!-- <img :src='require("@/assets/img/Plan/unmanned/sp.png")'> -->
      </div>
    </div>
  </div>
</template>

<script>
import ws from "../../../websocket/py_ws.js"
export default {
  props: {
    updateInfo: {
      type: Object,
      default: function () { return {} }
    },
    property_values: {
      type: Object,
      default: function () { return {} }
    },
    sensorInfos: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {
      // updateInfo : {}
      controlType: ["底线安全策略", "远程手动控制", "条件逻辑控制", "现场控制"],
      nav_cmd: ["暂无", "命令设备开始连续记录位置点", "命令设备结束连续记录位置点", "命令设备记录单个位置点", "从服务器下载目标路径到设备里", "启动自动航行", "停止自动导航", "向服务器上传设备里已保存的位置点", "清空设备里已保存的位置点"],
      text: ""
    }
  },
  mounted () {
    this.createWebsocket();
  },
  methods: {

    /* 开始建立websocket链接 */
    createWebsocket () {
      // 创建ws的实例化对象
      this.ws = ws.get();
      // 绑定上报事件
      this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
    },

    deviceWsUpdateFunction (result) {
      window.wsInfo = result;
      this.updateInfo = result.data;
      this.sensorInfos = result.data.sensorInfos;
      this.property_values = result.data.property_values;

      if (result.data.sensorInfos[1].value * 1 && result.data.sensorInfos[2].value * 1) {
        console.log(result.data);
        this.text = "双向喷药中"
      } else if (result.data.sensorInfos[1].value * 1) {
        this.text = "左喷药中"
      } else if (result.data.sensorInfos[2].value * 1) {
        this.text = "右喷药中"
      } else {
        this.text = "喷药状态"
      }
    },
    getJjzt (info) {
      if (info && info.sensorInfos && info.channelValue) {
        for (let i = 0; i < info.sensorInfos.length; i++) {
          if (info.sensorInfos[i].hd_sensor_type_function_code === 'KG_MACHINE') {//机具升降 三挡开关
            let index = info.sensorInfos[i].channel - 1
            let val = info.channelValue[index]
            if (val === 8) {
              return '上升'
            } else if (val === 9) {
              return '下降'
            } else {
              return '静止'
            }
          }
        }
      }
    }

  }
}
</script>


<style scoped>
.noManList {
  padding: 12px;
  background: #131f2da8;
  color: #bfe0e4;
  z-index: 1000;
  height: 100%;
}

.head::after {
  content: "";
  position: absolute;
  left: 0;
  height: 3px;
  width: 3px;
  bottom: -2px;
  background: #487bc4;
  z-index: 122;
}

.head::before {
  content: "";
  position: absolute;
  right: 0;
  height: 3px;
  width: 10px;
  bottom: -2px;
  background: #487bc4;
  z-index: 122;
}

.head {
  padding: 8px 0px;
  position: relative;
  /* background: #01afc51c; */
  border-bottom: solid 1px #fff;
}

.dian {
  background: red;
  border-radius: 50%;
  display: block;
  padding: 3px;
  height: 0;
  width: 0;
  margin: 0 6px;
}

.name {
  display: flex;
  align-items: center;
  color: #ffffff;
}

.listBox {
  width: 50%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}

.valueName {
  color: #e6e6e6;
}

.value {
  font-size: 16px;
}

.box::-webkit-scrollbar {
  width: 1px;
}

.box {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 11px 0;
  height: 250px;
  overflow-y: auto;
}

.line {
  width: 100%;
  border-radius: 50%;
  border: solid 1px #1e1e1e;
}

.y-line {
  height: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  width: 0;
  transform: translateX(-50%);
  border-radius: 50%;
  border: solid 1px #1e1e1e;
}

.list img {
  /* width: 100%; */
}
</style>