<template>
  <div>
    <div style="position: absolute;top: 34px;right: 33px;">
      <a style="color:#5b5bca" href="javascript:window.history.back()">返回</a>
    </div>

    <div class="app_info open">
      <!-- 设备信息区 -->
      <div class="app_box">
        <!-- 左侧 -->
        <div class="app_box_left">
          <!-- 设备头部信息 -->
          <div class="model info_model" style="height: 250px;">
            <titleInfo ref="titleInfo" :deviceObj="deviceObj" id="titleInfoComponent" />
          </div>

          <!-- 设备日志 -->
          <deviceLog class="model cgq_model" id="logPanel" ref="deviceLog" :hd_device_id="deviceObj.id" />
        </div>

        <!-- 右侧 -->
        <div class="app_box_right">
          <div class="model">
            <devicePropertyNow ref="devicePropertyNow" :hd_device_id="deviceObj.id" />
          </div>

          <div class="model">
            <yunmuData ref="yunmuData" :hd_device_id="deviceObj.id" />
          </div>

          <div class="model">
            <yunmuDateData ref="yunmuDateData" :hd_device_id="deviceObj.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { mapGetters } from 'vuex';
import { getDetailById } from '@/api/equip';

import titleInfo from '@/views/base/equip/component/common/titleInfo';
import deviceLog from '@/views/base/equip/component/common/deviceLog';
import GetStaButton from '@/views/base/equip/component/common/GetStaButton';
import devicePropertyNow from '@/views/base/equip/component/common/devicePropertyNow';
import yunmuData from '@/views/base/equip/component/yunmu/yunmuData';
import yunmuDateData from '@/views/base/equip/component/yunmu/yunmuDateData';


export default {
  name: 'EquipIflytekXJ',
  components: {titleInfo,deviceLog,GetStaButton,devicePropertyNow,yunmuData,yunmuDateData},
  data () {
    return {
      hd_device_id: '',
      deviceObj: {},
      communication: null
    };
  },
  filters: {
  },
  props: {
    
  },
  computed: {
    ...mapGetters(['id', 'token', 'user'])
  },
  created () {
   
  },
  mounted () {
    var hd_device_id = this.$route.query.id;
    if (hd_device_id != null && hd_device_id != '') {
      this.handelWatch(hd_device_id);
    }

    this.$nextTick(function(){
     //设置日志组件高度
      var main_height = $('.app-main')[0].scrollHeight;
      if (main_height > 0) {
        $('#logPanel').css('height', main_height - 320 + 'px');
      }
   });

  },
  methods: {
    //根据ID初始化页面
    handelWatch (hd_device_id) {
      this.hd_device_id = hd_device_id
      //获取设备详情
      this.getDetailById()
    },
    //获取设备详情
    getDetailById () {
      getDetailById({ hd_device_id: this.hd_device_id }).then(res => {
        this.deviceObj = res.data
        this.communication = JSON.parse(res.data.communication)
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.app_info
  width calc(100% - 30px)
  height calc(100% - 76px)
  position absolute
  background #E8ECF0
  top 45px
  left 0px
  margin 15px

.app_box
  display flex
  height 100%

.app_info .model
  padding 10px
  background #ffffff
  margin-top 5px
  width 100%
  position relative

.app_info .app_box_left
  height 100%
  width 300px
  margin-left 5px
  flex-shrink 0

.app_info .cgq_model
  height calc(100% - 260px)
  padding 10px 2px 10px 10px

.app_info .app_box_right
  width calc(100% - 300px)
  height 100%
  display flex
  margin-right 5px;
  margin-left 5px
  align-content flex-start
  flex-wrap wrap

.app_info .sb_name
  font-size 16px
  font-weight 800
  color #42b983
  background #ccf8e4
  padding 8px 0

.app_info .box_left
  width 30%
  height 100%
  border-right solid 1px #cdc9c9
  flex-shrink 0

.app_info .box_right
  width 100%
  height 100%
  display flex
  flex-direction column




</style>
