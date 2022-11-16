<template>
  <div class="locationAndSize" >
    <div>
      <div>
        <img :src="getImage(deviceInfo.hd_device_type_image_path)"></img>
      </div>

      <div class="row1 head">
        <div class="headImage">
          <img title="定位设备" :src="getImage(deviceInfo.hd_device_type_image_path)" class="headIcon">
        </div> 
        <div  class="a1">
          <div  class="a2">
            <div  class="a3">模拟调试无人车</div> <div  class="a4">
              <span  class="a5">设备状态</span> 
              <span  style="color: rgb(0, 255, 80);"> 在线 </span>
            </div>
          </div> 
          <div  class="a6">
            <div  class="a7">14%电量</div> 
            <div  class="a8">
              <div  class="a9" style="max-width: 100%; width: 14%;"></div>
            </div>
            </div>
          </div>
        </div>

      <div>
        <div>
          <span>{{deviceInfo.name}}</span>
          <span>设备状态</span>
          <span>{{deviceInfo.state}}</span>
        </div>
        <span>
          {{deviceInfo.batteryPercentage}}电量
        </span>
      </div>
    </div>
    
    <div>
      <div>
        <div>
          <span>电源开关</span>
          <el-switch  v-model="deviceInfo.power_switch_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <div>
          <span>障碍物报警</span>
          <el-switch  v-model="deviceInfo.power_switch_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <div>
        <div>
          <span>远程控制</span>
          <el-switch  v-model="deviceInfo.power_switch_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <div>
          <span>手动航行</span>
          <el-switch  v-model="deviceInfo.power_switch_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { getImage } from '@/utils/image_util'
export default {
  name: 'GyStatus',
  data() {
    return {
      deviceInfo:{
        name:"",// 设备名称
        state:"",// 设备状态值
        batteryPercentage:"15%",//电量百分比
        power_switch_value:0,// 电源开关值
        hd_device_type_image_path:"/picture/iot/upload/devicetype/11d8cec5-50f1-4e6f-84d0-4060baf73658.png"
      }
    }
  },
  computed: {
    data() {
      
    }
  },
  created() {
    // dom载入后触发
    this.$nextTick(() => {
       
    })
  },
  methods: {
    getImage:getImage,
  }
}
</script>

<style lang="stylus" scoped>
  .locationAndSize {
    width: 300px;
    height: 180px;
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 9999;
    color: #fff;
    background:#213546ad;
  }
</style>