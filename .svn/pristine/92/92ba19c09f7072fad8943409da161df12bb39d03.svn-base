<template>
  <!-- 参数配置 -->
  <div
    class='configEdit configuration_vue'
    v-show='isShow'
  >
    <div class='config_form'>
      <!-- 头部 -->
      <div class='addTaskHead'>
        <img
          @click='back'
          style='cursor:pointer;'
          :src='require("@/assets/img/Plan/drawLineMap/qp/jtz.png")'
        />
        <span style='font-size:14px;'>参数配置</span>
      </div>
      <el-form
        v-show='form.length > 0'
        class=''
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-form-item
          class='formRow'
          :label="it.description"
          v-for='( it , i ) in form'
          :key='i'
        >
          <el-input
            size='mini'
            v-model="it.inputValue"
          ></el-input>
          <el-button
            v-show='it.name == "positionCorrection"'
            plain
            @click='jiaozheng(it)'
            size="small"
          >矫正</el-button>
        </el-form-item>
        <div style="margin:0 auto;text-align:center;margin-bottom: 10px;">
          <el-button
            type="primary"
            @click='addOrUpdateAttribute'
            size="small"
          >保存</el-button>
          <el-button
            plain
            @click='back'
            size="small"
          >取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getDeviceConf, addOrUpdateDeviceConf } from '../../data/data'
import bus from '../../util/bus'
import ws from '../../websocket/py_ws'
export default {
  props: {

  },
  data () {
    return {
      form: [],
      isShow: true
    }
  },
  mounted () {
    this.getDeviceConfig();
    this.createWebsocket();
    bus.$on("configuration_refresh", () => { return this.getDeviceConfig(); })
  },
  methods: {

    /* 开始建立websocket链接 */
    createWebsocket () {
      // 创建ws的实例化对象
      this.ws = ws.get();
      // 绑定上报事件
      this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
    },

    deviceWsUpdateFunction (result) {
      this.property_values = result.data.property_values;
    },

    getDeviceConfig () {
      // 获取设备配置信息
      getDeviceConf(this.$route.query.device_id).then((res) => {

        var data = res.data
        for (var i in data) {
          data[i].inputValue = data[i].value;
        }
        var positionCorrection = data.find((e) => { return e.name === 'positionCorrection'; });
        if (positionCorrection && positionCorrection.value != "" && positionCorrection.value) {
          // 如果存在矫正地址
          positionCorrection.inputValue = positionCorrection.value;
          positionCorrection.inputValue = positionCorrection.inputValue.split(",").map((res) => {
            return (res * 1).toFixed(6);
          }).join(",")
        }
        // 获取有几种类型
        this.form = data;
      })
    },

    addOrUpdateAttribute () {
      var il = this.form.length
      for (var i in this.form) {
        addOrUpdateDeviceConf(this.form[i]).then((e) => {
          if (--il <= 0) {
            this.$message({
              showClose: true,
              message: "成功修改",
              type: "success"
            })
            // 刷新一下设备配置
            ws.refreshDeviceConf();
            this.back();
          }
        })
      }
    },

    back () {
      // this.$parent.showConfigEdit = false;
      bus.$emit("home_backConfiguration");
    },

    jiaozheng (it) {
      this.isShow = false;

      // 将视角移动到当前设备图标的位置上去
      bus.$emit("map_centerAt");

      // 提示点击地图
      this.$notify({
        title: '操作提示',
        message: this.$createElement('i', { style: 'color: #ff0000' }, '请点击地图上设备实际位置。')
      });

      // 等待地图被选中点击
      var key = view.on("click", (event) => {
        this.isShow = true;
        // 获得点击的坐标点
        var point = [event.mapPoint.longitude, event.mapPoint.latitude];
        // 获得上传的坐标点
        var location = this.property_values.location;
        // 计算坐标点误差 上传经纬度是反的
        var x = point[0] - location[0];
        var y = point[1] - location[1];
        // 将误差放上去
        it.value = x + "," + y;
        addOrUpdateDeviceConf(it).then((res) => {
          if (res.code == "200") {
            this.$message({
              showClose: true,
              message: "矫正成功",
              type: "success"
            })
            // 刷新一下设备配置
            ws.refreshDeviceConf();
          } else {
            this.$message({
              showClose: true,
              message: "矫正结果保存失败,(" + res.msg + ")",
              type: "success"
            })
          }
        })
        key.remove();
      })
    }
  }
}
</script>

<style>
</style>

<style scoped>
.configEdit {
  height: 100%;
  background: #000000a8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.config_form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #131f2da8;
  color: #ffffff;
  padding: 0px;
  border-radius: 4px;
}
.addTaskHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid 1px #ffffff;
  padding: 8px;
  display: flex;
  align-items: center;
}

.addTaskHead img {
  width: 12px;
}

.formRow {
  padding: 0 12px;
}
</style>