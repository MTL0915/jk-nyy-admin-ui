<template>
  <div >
    <div style="position: absolute;right: 10px;top:10px;">
      <div
        @click="refreshDevicePropertyValue(hd_device_id)"
        style="cursor: pointer;"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div id="device-inner-detail" style="width:100%;display: flex;flex-wrap: wrap;">
      <div v-for="(property,i) in propertys" :key="i" style="background: #2d5988;color:#FFFFFF;border-radius: 10px;margin-right: 10px;margin-top: 20px;padding: 5px;text-align: center;">
        <div style="color: #d6d6d5;font-size: 12px;">{{ property.chinesename }}:</div>
        <div style="padding-top: 5px;font-size: 13px;">{{ property.value }}{{ property.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSta, getPropertyList } from '@/utils/websocket_util'
import {getInnerDetailById} from '@/api/equip'
import { Loading } from 'element-ui'
export default {
  name: 'BaseInfo',
  data: function() {
    return {
      hd_device_id: '',
      propertys: [],
      loadingInstance:null
    }
  },
  methods: {
    refreshDevicePropertyValue(hd_device_id){
      if (hd_device_id == undefined){
        hd_device_id = this.hd_device_id;
      }
      this.getData(hd_device_id);
    },
    showDevicePropertyValue(hd_device_id) {
      this.closeLoadInstance()

      this.hd_device_id= hd_device_id;
      getInnerDetailById({"hd_device_id":hd_device_id}).then(res => {
        this.propertys = getPropertyList(res.data)
      })
    },
    closeLoadInstance() {
      this.loadingInstance && this.loadingInstance.close()
    },
    getData(hd_device_id) {
      this.closeLoadInstance()
      this.hd_device_id = hd_device_id
      
      this.loadingInstance = Loading.service({ target:'#device-inner-detail', text: '正在获取设备信息，请等待！' })
      
      getSta(hd_device_id, this.$ws).then((res) => {
        this.propertys = getPropertyList(res.data)
        this.closeLoadInstance()
      }).catch(err => {
        this.$message.error(err.msg)
        this.closeLoadInstance()
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
label
  text-align right
  float left
  font-size 14px
  color #606266
  line-height 40px
  padding 0 12px 0 0
  -webkit-box-sizing border-box
  box-sizing border-box
</style>
