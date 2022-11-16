<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="addCJDevice"
      >添加冠辰采集类设备</el-button>

      <el-button
        type="primary"
        size="mini"
        @click="addCDDevice"
      >添加冠辰杀虫灯设备</el-button>

      <el-button
        type="primary"
        size="mini"
        @click="addQCDevice"
      >添加冠辰测报灯设备</el-button>

      <!-- <el-button
        type="primary"
        size="mini"
        @click="addQXDevice"
      >添加冠辰气象站设备</el-button> -->
    </div>

    <CJDevice ref="CJDevice" />
    <CDDevice ref="CDDevice" />
    <QCDevice ref="QCDevice" />
    <QXDevice ref="QXDevice" />
  </div>
</template>
<script>
import CJDevice from './CJDevice'
import CDDevice from './CDDevice'
import QCDevice from './QCDevice'
import QXDevice from './QXDevice'

export default {
  components: { CJDevice, CDDevice, QXDevice, QCDevice },
  data () {
    return {

    }
  },
  methods: {
    addCJDevice () {
      this.$refs.CJDevice.showDialog();
    },
    addCDDevice () {
      this.$refs.CDDevice.showDialog();
    },
    addQCDevice () {
      this.$refs.QCDevice.showDialog();
    },
    addQXDevice () {
      this.$refs.QXDevice.showDialog();
    }
  }
}
</script>