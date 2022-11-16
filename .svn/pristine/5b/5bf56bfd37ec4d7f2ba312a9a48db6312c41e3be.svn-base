<template>
  <div class="box">
    <router-link to="/myresources/area">
      <div class="rect first-rect">
        <div
          class="img-block"
          style="background: #ce4b4b;"
        >
          <img
            class="icon"
            src="@/assets/dashboard/mydk.png"
          >
        </div>
        <div class="content">
          <div class="value"><span>{{ facilitiesCount }}</span></div>
          <div class="title">分区</div>
        </div>
      </div>
    </router-link>
    <router-link to="/myresources/mydevice">
      <div class="rect">
        <div
          class="img-block"
          style="background: #268872;"
        >
          <img
            class="icon"
            src="@/assets/dashboard/mydevice.png"
          >
        </div>
        <div class="content">
          <div class="value"><span>{{ deviceCount }}</span></div>
          <div class="title">物联网设备</div>
        </div>
      </div>
    </router-link>
    <router-link to="/myresources/mycamera">
      <div class="rect">
        <div
          class="img-block"
          style="background: #1791ce;"
        >
          <img
            class="icon"
            src="@/assets/dashboard/mycamera.png"
          >
        </div>
        <div class="content">
          <div class="value"><span>{{ cameraCount }}</span></div>
          <div class="title">视频监控</div>
        </div>
      </div>
    </router-link>
    <router-link to="/mydevicedata/dkInfo">
      <div
        class="rect"
        style="background: #3dca99;border-radius: 20px;border-color: #3dca99;box-shadow: 0 0 15px #3dca99, inset 0 0 15px #3dca99;"
      >
        <div
          class="img-block"
          style="display: block;"
        >
          <img
            class="icon"
            src="@/assets/dashboard/zhzs.png"
            style="width: 55px;height: 60px;padding-top: 6px;"
          >
        </div>
        <div
          class="content"
          style="line-height: 70px"
        >
          <div
            class="title"
            style="font-size: 22px;padding-left:20px;text-align: left;font-weight: bold;color:#FFFFFF;"
          >
            综合展示
            <i
              class="el-icon-arrow-right"
              style="font-weight: bold;"
            ></i>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseStatistics } from '@/api/baseinfo'
import mapBox from './map.vue'
export default {
  name: 'MyResources',
  components: {
    mapBox
  },
  data () {
    return {
      facilitiesCount: 0,
      deviceCount: 0,
      cameraCount: 0,
      sensorCount: 0
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  mounted: function () {

  },
  created () {
    this.baseStatistics(this.$store.state.baseinfo.cur_base_id)
  },
  methods: {
    baseStatistics (bs_base_id) {
      baseStatistics({ bs_base_id: bs_base_id }).then(res => {
        if (res.code === 200) {
          this.facilitiesCount = res.data.facilitiesCount
          this.deviceCount = res.data.deviceCount
          this.cameraCount = res.data.cameraCount
          this.sensorCount = res.data.sensorCount
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
