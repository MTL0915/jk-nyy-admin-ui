<template>
  <div class='weather'>
      <div class='title'>
          <span>气象站</span>
      </div>
      <div style='height: 65px;overflow: auto;'>
          <div v-for='(it , i) in dataList' :key='i' class='weatherMode'>
              <div>
                  <img :src='path + it.hd_sensor_type_small_image_path'/>
              </div>
              <div>{{it.name}}</div>
              <div>{{it.value + it.unit}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import { queryDevice , findByHd_device_id } from "@/api/device.js"
export default {
    data (){
        return {
            dataList : [],
            path : process.env.VR_IMGPATH
        }
    },
    mounted (){
        queryDevice({ rs_facilities_id : "40288ad26f32f9dc016f3582c89a0005" }).then((e)=>{
            // 获取地块下面的采集器数据
            var CJ = e.data.content.find((e)=>{
                return e.hd_device_type_code == 'JK-CJ'
            })
            // 根据采集器数据查传感器数据
            findByHd_device_id({hd_device_id : CJ.id }).then((e)=>{
                this.dataList = e.data;
            })
        })
    },
    methods : {

    }
}
</script>

<style>
    .weatherMode { display: inline-block;padding: 5px;width: 72px;font-size: 12px;text-align: center; }
    .weatherMode img { width: 25px; height: 25px; }
</style>