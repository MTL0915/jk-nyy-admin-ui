<template>
  <div>
    <div style="display:flex;flex-direction:row-reverse">
      <div
        @click="refreshData()"
        style="cursor:pointer;"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <sensorItemData id="device-inner-detail" ref='sensorItemData' :sensorCj="sensorCj" :hd_device_id="hd_device_id"/>
  </div>
</template>

<script>
import sensorItemData from '@/views/base/equip/component/common/sensorItemData';
import { getDetailById } from '@/api/equip';
import { getSta } from '@/utils/websocket_util'
import { Loading } from 'element-ui'

export default {
  name: 'sensorDeviceShow',
  components: {sensorItemData },
  mixins: [], //混入
  props:{
    hd_device_id:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      loadingInstance:null,
      sensorCj:[]
    }
  },
 
  created() {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  watch:{
    hd_device_id:function(){
      this.getDetailById(); 
    }
  },
  methods: {
    //获取设备详情
    getDetailById () {
      getDetailById({ hd_device_id: this.hd_device_id }).then(res => {
        this.setSensorCj(res.data);
      });
    },
    // 设置采集类传感器列表
    setSensorCj (deviceObj){
      this.sensorCj = [];
      let sensors = deviceObj.sensor;
      for (var i = 0; i < sensors.length; i++) {
        sensors[i]["hd_device_sensor_name"] = sensors[i].name
        sensors[i]["hd_device_sensor_value"] = sensors[i].value
        sensors[i]["hd_sensor_type_unit"] = sensors[i].sensor_type_unit
        
        if (sensors[i].sensor_type_code !== '101' && sensors[i].sensor_type_code !== '102') {
          var v = sensors[i]
          v.config_json_obj = JSON.parse(v.config_json)
          if (v.config_json_obj == null || v.config_json_obj.length == 0) {
            v.config_json_obj = []
            v["start_value"] = 0
            v["end_value"] = 0
          } else {
            v["start_value"] = v.config_json_obj[0].start_value
            v["end_value"] = v.config_json_obj[v.config_json_obj.length - 1].end_value
          }
          if (sensors[i].sensor_type_code === "801") {
            continue
          }
          this.sensorCj.push(sensors[i])
        }
      }
    },
    refreshData() {
      this.loadingInstance && this.loadingInstance.close()

      this.loadingInstance = Loading.service({ target:'#device-inner-detail', text: '正在获取设备信息，请等待！' })
      
      getSta(this.hd_device_id, this.$ws).then((res) => {
        this.getDetailById();
        this.loadingInstance && this.loadingInstance.close()
      }).catch(err => {
        this.$message.error(err.msg)
        this.loadingInstance && this.loadingInstance.close()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  
</style>