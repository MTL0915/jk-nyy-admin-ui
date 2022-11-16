<template>
  <div class="wrap" v-show="show">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <span style="font-size:14px;">参数配置</span>
        <i class="el-icon-close img" @click="close"></i>
      </div>
      <div class="body">
        <el-form ref="form" class="form" :model="formData" label-width="120px">
          <el-form-item
            class="formRow"
            :label="it.description"
            v-for="(it, i) in formData"
            :key="i"
          >
            <el-input size="mini" v-model="it.value"></el-input>
            <el-button
              v-show="it.name == 'positionCorrection'"
              plain
              @click="jiaozheng(it)"
              size="small"
              >矫正</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" @click="addOrUpdateAttribute" size="small"
          >保存</el-button
        >
        <el-button plain @click="close" size="small">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAttributeByDeviceByHdDeviceId,
  addOrUpdateAttribute
} from "@/api/equip";
export default {
  props: {
    hd_device_id: {
      type: String
    },
    hideCompFunc: {
      type: Function
    },
    updateDeviceConfFunc: {
      type: Function
    }
  },
  data() {
    return {
      formData: [],
      show: false
    };
  },
  created() {},
  methods: {
    getDeviceConfig() {
      if (!this.hd_device_id) {
        return;
      }
      getAttributeByDeviceByHdDeviceId(this.hd_device_id).then(res => {
        if (res.code !== 200) {
          return;
        }
        var data = res.data;
        if (data.length === 0) {
          return;
        }

        var positionCorrection = data.find(e => {
          return e.name === "positionCorrection";
        });
        if (
          positionCorrection &&
          positionCorrection.value != "" &&
          positionCorrection.value
        ) {
          // 如果存在矫正地址
          positionCorrection.inputValue = positionCorrection.value;
          positionCorrection.inputValue = positionCorrection.inputValue
            .split(",")
            .map(res => {
              return (res * 1).toFixed(7);
            })
            .join(",");
        }
        // 获取有几种类型
        this.formData = data;
      });
    },
    addOrUpdateAttribute() {
      var len = this.formData.length;
      for (var i in this.formData) {
        addOrUpdateAttribute(this.formData[i]).then(e => {
          if (--len <= 0) {
            this.$message({
              showClose: true,
              message: "成功修改",
              type: "success"
            });
            this.updateDeviceConfFunc && this.updateDeviceConfFunc();
          }
        });
      }
    },
    close() {
      if (this.hideCompFunc) {
        this.hideCompFunc("deviceAttributeConfig");
      } else {
        this.hideComp();
      }
    },
    hideComp() {
      this.show = false;
    },
    showComp() {
      this.show = true;
      this.getDeviceConfig();
    },
    jiaozheng(it) {
      this.show = false;

      // 提示点击地图
      this.$notify({
        title: "操作提示",
        message: this.$createElement(
          "i",
          { style: "color: #ff0000" },
          "请点击地图上设备实际位置。"
        )
      });

      // 等待地图被选中点击
      var key = view.on("click", event => {
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
        addOrUpdateAttribute(it).then(res => {
          if (res.code == "200") {
            this.$message({
              showClose: true,
              message: "矫正成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "矫正结果保存失败,(" + res.msg + ")",
              type: "success"
            });
          }
        });
        key.remove();
      });
    }
  }
};
</script>

<style></style>

<style scoped>
.wrap * {
  user-select: none !important;
}
.wrap {
  background: #000000a8;
  z-index: 999;
}
.content {
  width: 100%;
  height: 100%;
  background: #131f2da8;
  color: #ffffff;
  padding: 0px;
  border-radius: 4px;
}
.header {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid 1px #ffffff;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header .img {
  font-size: 16px;
  cursor: pointer;
}
.form {
  padding-right: 30px;
}
.formRow {
  padding: 0 12px;
}

.body {
  height: calc(100% - 90px);
  overflow: auto;
}
.body >>> .el-form-item {
  margin-bottom: 10px;
}

.body::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
.body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
.body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.footer {
  height: 40px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
  line-height: 50px;
}
</style>
