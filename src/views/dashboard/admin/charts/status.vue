<template>
  <div class="card-item" style="max-width:350px">
    <div class="x-card">
      <div class="card-header">
        <div class="title-container">
          <a data-track-id="card-header-title" target="_self" title="" href="#"><!--182-->
            <span class="title">状态</span>
          </a>
          <span class="sub-title"/>
        </div>
        <div class="option-container">
          <span class="option"><!--185--></span>
          <span class="menu">
            <i class="iconfont icon-console-more-option"/>
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="item-container content-container">
          <div style="padding-left:20px;width:150px">
            <div class="x-circle-text ">
              <a target="_self" title="" href="#">
                <div class="value"><h5>{{ deviceCount }}</h5></div>
              </a>
              <div class="desc">设备总数量</div>
            </div>
          </div>
          <div class="x-pure-text-container x-size-small">
            <div class="x-pure-text">
              <div class="name">
                <span class="status icon success"/>
                在线
              </div>
              <div class="value">
                <span class="number "> {{ deviceState.onLine }} </span>
                <span class="unit">个 </span>
              </div>
            </div>
            <div class="x-pure-text">
              <div class="name">
                <span class="status icon info"/>
                离线
              </div>
              <div class="value">
                <span class="number ">{{ deviceState.offLine }} </span>
                <span class="unit">个</span>
              </div>
            </div>
            <div class="x-pure-text">
              <div class="name">
                <span class="status icon warning"/>
                休眠中
              </div>
              <div class="value">
                <span class="number "> {{ deviceState.sleep }} </span>
                <span class="unit"> 个 </span>
              </div>
            </div>
            <div class="x-pure-text">
              <div class="name">
                <span class="status icon primary"/>
                电池供电
              </div>
              <div class="value">
                <span class="number ">{{ deviceState.cellNormal }}</span>
                <span class="unit"> 个</span>
              </div>
            </div>
            <div class="x-pure-text">
              <div class="name">
                <span class="status icon error"/>
                电池故障
              </div>
              <div class="value">
                <span class="number ">{{ deviceState.cellFault }}</span>
                <span class="unit"> 个</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deviceStateStatisticsByBase } from '@/api/equip'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Status',
  data() {
    return {
      deviceCount: 0,
      deviceState: {
        onLine: 0, // 在线
        offLine: 0, // 离线
        sleep: 0, // 休眠
        cellNormal: 0, // 电池供电
        cellFault: 0// 电池故障
      }
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  mounted: function() {

  },
  created() {
    this.deviceStateStatisticsByBase(this.$store.state.baseinfo.cur_base_id)
  },
  methods: {
    deviceStateStatisticsByBase(bs_base_id) {
      deviceStateStatisticsByBase({ bs_base_id: bs_base_id }).then(res => {
        if (res.code === 200) {
          const _this = this
          _this.deviceCount = 0
          res.data.forEach(element => {
            if (element.state === 1) {
              _this.deviceState.onLine = element.count
            } else if (element.state === 0) {
              _this.deviceState.offLine = element.count
            } else if (element.state === 2) {
              _this.deviceState.sleep = element.count
            } else if (element.state === 3) {
              _this.deviceState.cellNormal = element.count
            } else if (element.state === 4) {
              _this.deviceState.cellFault = element.count
            }
            _this.deviceCount = _this.deviceCount + element.count
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-container{
  padding-top:15px;
}
.list-block{
  width:50px;
}
.list-chart{
  width: 522px;
  height:80px;
  .echart{
    width:100%;
    height:100%;
  }
}
</style>
