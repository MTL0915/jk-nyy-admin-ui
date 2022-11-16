<template>

  <div class="map_legend">
    <div class="legendName">
      <i class="el-icon-s-home"></i>
      <div class=''>
        
      </div>
    </div>
    <div class="legend">
      <el-checkbox @change="filter">
        <i class="el-icon-s-home">基地</i>
      </el-checkbox>
      <el-checkbox @change="filter">
        <i class="el-icon-receiving">地块({{ dkLength }})</i>
      </el-checkbox>
      <el-checkbox @change="filter">
        <i class="el-icon-s-home">设备({{ sbLength }})</i>
      </el-checkbox>
      <div style="padding: 0 0 0 38px;">
        <div style="color: green;">在线({{ sbShowLength }})</div>
        <div style="color: red;">离线({{ sbLength - sbShowLength }})</div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'MapLegned',
  props: {
    data: Object
  },
  data() {
    return {
      name: 'mapLegned',
      dkLength: '', // 地块数量
      sbLength: '', // 设备数量
      sbShowLength: '' // 在线的设备数量
    }
  },
  methods: {
    filter() {
      // this.$parent.filter()
    },
    // 获取面积
    setDKLength(length) {
      this.dkLength = length
    },
    // 输入设备数量信息
    setSBLength(length, showLength) {
      this.sbLength = length
      this.sbShowLength = showLength
    }
  }
}

</script>

<style>
.map_legend {
  position: absolute;
  bottom: 10px;
  left: 20px;
  background: #ffffff;
  border-radius: 4px;
  /* padding: 12px; */
}
.map_legend .legendName {
  color: #fff;
  background: #304156;
  padding: 8px 12px;
}
.map_legend .legend {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
.map_legend .legend > * {
  padding: 5px 0;
}
</style>
