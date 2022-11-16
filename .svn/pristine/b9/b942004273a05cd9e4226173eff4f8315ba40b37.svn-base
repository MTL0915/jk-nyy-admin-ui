<template>
  <div>

      <div>
            <div class='deviceInfo' v-for='(it,i) in sensorList' :key='i'>
                <div>
                    <img :src='"http://121.32.129.19:8100"+it.hd_sensor_type_small_image_path' />
                    <!-- <img :src='require("@/assets/img/qxz.png")' /> -->
                </div>
                <div>{{it.hd_device_sensor_name}}</div>
                <div>{{it.value + it.hd_sensor_type_unit}}</div>
            </div>
      </div>
      <div>
          <div ref='chart'></div>
      </div>
  </div>
</template>

<script>
export default {
    data (){
        return {
            sensorList: []
        }
    },
    mounted() {

    },
    methods: {
        // 渲染echarts
        renderCharts(){
            
        }
    }
}
</script>

<style>

</style>