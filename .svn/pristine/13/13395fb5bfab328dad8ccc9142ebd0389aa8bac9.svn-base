<template>
  <div>
    <div class="wrap">
      <div class="title">
        <div class="titlename">
          预警通知
        </div>
        <img
          :src='require("@/assets/planDeviceNew/warn_title.png")'
          style="display:block;width:100%;height:2px;"
        />
      </div>
      <div class="content">
        <marquee
          style="height:100%"
          scrolldelay=200
          direction=up
          behavior=scroll
          onMouseOut="this.start()"
          onMouseOver="this.stop()"
        >
          <div class="row system">
            <span class="label">系统</span>
            <span class="text">设备状态为正常！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row system">
            <span class="label">系统</span>
            <span class="text">设备往前进！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row system">
            <span class="label">系统</span>
            <span class="text">设备电源开关打开！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row system">
            <span class="label">系统</span>
            <span class="text">设备打开左喷药阀门！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row warn">
            <span class="label">预警</span>
            <span class="text">前方障碍物报警，请注意避让！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row warn">
            <span class="label">预警</span>
            <span class="text">前方障碍物报警，请注意避让！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
          <div class="row warn">
            <span class="label">预警</span>
            <span class="text">前方障碍物报警，请注意避让！</span>
            <span class="img"><img :src='require("@/assets/planDeviceNew/warnicon.png")' /></span>
          </div>
        </marquee>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hd_device_id: {
      type: Object,
    },
  },
  components: {},
  data () {
    return {};
  },
  mounted () { },
  watch: {
    hd_device_id: function (newValue, oldValue) { },
  },
  methods: {},
};
</script>

<style scoped>
.wrap {
  color: #fff;
  border: 1px solid #417b78;
  background-color: rgba(19, 30, 31, 0.6);
  width: 455px;
  height: 300px;
  padding: 10px 15px;
  font-family: "\5FAE\8F6F\96C5\9ED1";
}

.title {
  height: 35px;
  line-height: 35px;
  margin-bottom: 10px;
}
.titlename {
  font-size: 20px;
  color: #00f5f5;
}
.content {
  padding-left: 10px;
  overflow: hidden;
  height: calc(100% - 40px);
}
.content::-webkit-scrollbar {
  display: none;
}
.content .row {
  margin-bottom: 10px;
  margin-left: 0;
}

.content .row img {
  vertical-align: text-bottom;
}
.content .row .text {
  font-size: 16px;
}
.label {
  font-size: 15px;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  border-radius: 20px;
  margin-right: 7px;
  padding: 3px 8px;
}
.content .row.system .label {
  background-color: #8c6800;
  border: 3px solid #ffe271;
}

.content .row.system .img {
  display: none;
}

.content .row.warn .label {
  background-color: #350306;
  color: #d70c18;
  border: 3px solid #e60d1a;
}
@media (max-width: 1024px) {
  .wrap {
    width: 300px;
    height: 200px;
    padding: 4px 5px;
    font-size: 0.9rem;
  }
  .titlename {
    font-size: 0.7rem;
  }
  .content {
    padding-left: 5px;
    height: calc(100% - 30px);
  }
  .label {
    font-size: 0.7rem;
    line-height: 20px;
    margin-right: 3px;
  }
  .title {
    height: 20px;
    line-height: 20px;
  }
  .content .row.system .label {
    border: 1px solid #ffe271;
  }
  .content .row.warn .label {
    border: 1px solid #e60d1a;
  }
  .content .row .text {
    font-size: 0.7rem;
  }
}
</style>