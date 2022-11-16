<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img src="/static/img/dashboard/dk.png" width="52" height="52">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">地块数量</div>
          <router-link to="/mydevicedata/map">
            <count-to :start-val="0" :end-val="count.dk" :duration="2600" class="card-panel-num"/>
          </router-link>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img src="/static/img/dashboard/sb.png" width="52" height="52">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">网关数量</div>
          <router-link to="/myresources/mydevice">
            <count-to :start-val="0" :end-val="count.wg" :duration="3600" class="card-panel-num"/>
          </router-link>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <img src="/static/img/dashboard/cgq.png" width="52" height="52">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">传感器数量</div>
          <router-link to="/myresources/mydevice">
            <count-to :start-val="0" :end-val="count.cgq" :duration="3000" class="card-panel-num"/>
          </router-link>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <img src="/static/img/dashboard/sxt.png" width="52" height="52">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">摄像头数量</div>
          <router-link to="/myresources/mycamera">
            <count-to :start-val="0" :end-val="count.sxt" :duration="3200" class="card-panel-num"/>
          </router-link>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      count: { dk: 0, wg: 0, cgq: 0, sxt: 0 }
    }
  },
  mounted() {
    this.count.dk = 67
    this.count.wg = 32
    this.count.cgq = 23
    this.count.sxt = 11
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
