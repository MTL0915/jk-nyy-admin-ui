<template>
  <div>
    <img :src="getImage(deviceObj.hd_device_type_image_path)" style="width:100px;height:100px;margin-left: 5px" />
    <div class="titleInfoDiv" style="margin-top: 15px;">
        <div class="model_content_row" style="margin-bottom:5px;padding-left: 15px;">
        <div class="row_title">{{ deviceObj.name }}</div>
        <div style="">({{ deviceObj.device_id }})</div>
        </div>
        <div class="model_content_row">
        <i class="el-icon-position row_centent_img" style="font-size:15px;color:#333;"></i>
        <span class="row_centent">{{ deviceObj.hd_device_type_name }}</span>
        </div>
        <!-- 地块跳转 -->
        <router-link :to="'/dkInfo?id=' + deviceObj.rs_facilities_id">
        <div class="model_content_row" style="cursor: pointer">
            <i class="el-icon-menu row_centent_img" style="font-size:15px;color:#333;" ></i>
            <span class="row_centent" style="color:blue;cursor: pointer;">{{ deviceObj.rs_facilities_name }}</span>
        </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import { getImage } from '@/utils/image_util'

export default {
  name: 'titleInfo',
  components: {  },
  mixins: [], //混入
  props:{
      deviceObj: {
          type:Object,
          default:{}
      }
  },
  data() {
    return {
        
    }
  },
  computed: {
    data() {
      return null
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
.titleInfoDiv
  padding 1px 0
  position relative

.titleInfoDiv .model_content_row
  padding 5px 0
  font-size 12px
  color #aeb3c6

.titleInfoDiv .model_content_row .row_val
  color #408dc3

.row_centent_img
  width 15px
  height 15px
  margin-left 15px

.row_centent
  color #000000
  padding-left 5px

.row_title
  font-size 16px
  color #000000
  font-weight 600

</style>