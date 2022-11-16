<template>
  <div>
    <div style="display:flex;flex-direction:row-reverse">
      <div
        @click="getData()"
        style="cursor:pointer;"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getSta } from '@/utils/websocket_util'
import { Loading } from 'element-ui'

export default {
  name: 'GetStaButton',
  mixins: [], //混入
  props:{
    hd_device_id:{
      type:String,
      default:""
    },
    target:{
      type:String,
      default:""
    },
    triggerFun:{
      type:Function,
      default:null
    }
  },
  data() {
    return {
      loadingInstance:null,
    }
  },
 
  created() {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  watch:{
    hd_device_id:function(){
      
    }
  },
  methods: {
    getData() {
      this.loadingInstance && this.loadingInstance.close()

      if (this.target){
        this.loadingInstance = Loading.service({ target:this.target, text: '正在获取设备信息，请等待！' })
      }
      
      getSta(this.hd_device_id, this.$ws).then((res) => {
        this.loadingInstance && this.loadingInstance.close();
        this.triggerFun && this.triggerFun(res.data);
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