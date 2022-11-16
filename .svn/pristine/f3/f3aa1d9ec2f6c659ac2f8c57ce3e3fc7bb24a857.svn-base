<template>
  <div>
    <div class="wrap">
      <!-- 向前走 -->
      <!-- 
                mousedown:当鼠标指针移动到元素上方,并按下鼠标左键时,
                mouseup:当鼠标指针移动到元素上方,并松开鼠标左键时
                mouseout:当鼠标指针从元素上移开时, 
                mousemove:当鼠标指针在指定的元素中移动时,
                
            -->
      <div
        class="divbtn btntop"
        @mousedown="btMousedown('top')"
        @mouseup="btMouseup('top')"
        @mouseout="btMouseout('top')"
        @mousemove="btMousemove('top')"
      >
      </div>

      <!-- 向左转 -->
      <div
        class="divbtn btnleft"
        @mousedown="btMousedown('left')"
        @mouseup="btMouseup('left')"
        @mouseout="btMouseout('left')"
        @mousemove="btMousemove('left')"
      >
      </div>

      <!-- 向右转 -->
      <div
        class="divbtn btnright"
        @mousedown="btMousedown('right')"
        @mouseup="btMouseup('right')"
        @mouseout="btMouseout('right')"
        @mousemove="btMousemove('right')"
      >
      </div>

      <!-- 向后退 -->
      <div
        class="divbtn btnbottom"
        @mousedown="btMousedown('bottom')"
        @mouseup="btMouseup('bottom')"
        @mouseout="btMouseout('bottom')"
        @mousemove="btMousemove('bottom')"
      >
      </div>

      <!-- 速度设置 -->
      <div class="speddset">
        <span
          class="btn sub"
          @click="subSpeed()"
        >-</span>
        <span class="text">
          <span class="speedtext">
            {{speed}}
          </span>
          <span class="unittext">
            m/s
          </span>
        </span>
        <span
          class="btn plus"
          @click="plusSpeed()"
        >+</span>
      </div>
    </div>
  </div>
</template>

<script>
import { customize } from "@/utils/websocket_util.js";
export default {
  props: {
    hd_device_id: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      speed: 0.4,
      activeAction: "",
      actionTimerFun: null,
      notifyStatus: 0, //提示状态，0表示不需要提示
    };
  },
  mounted() {},
  watch: {},
  methods: {
    startAction(action) {
      this.notifyStatus = 1;
      this.activeAction = action;
      if (!this.activeAction) {
        return;
      }
      this.runAction();
      this.actionTimerFun = setInterval(() => {
        this.runAction();
      }, 500);
    },
    removeAction() {
      this.activeAction = "";
      this.sendCustomize(0, 0)
        .then((res) => {})
        .catch((error) => {
          console.log("error", error);
        });
      this.actionTimerFun && clearInterval(this.actionTimerFun);
    },
    runAction() {
      var direction = this.getDirection(this.activeAction);
      if (direction == null) {
        return;
      }
      var speed = this.speed;

      this.sendCustomize(direction, speed)
        .then((res) => {})
        .catch((error) => {
          if (this.notifyStatus === 1) {
            this.$message.error(error.msg);
            this.notifyStatus = 0;
          }
        });
    },
    sendCustomize(direction, speed) {
      if (!this.hd_device_id) {
        return;
      }
      var request_body = {
        message_type: "MultiCommand",
        message_body: {
          command_type: ["SetPara"],
          SetPara: {
            speed: speed,
            direction: direction,
          },
        },
      };
      return customize(this.hd_device_id, request_body, this.$ws);
    },
    getDirection(activeAction) {
      if (activeAction === "top") {
        return 0;
      } else if (activeAction === "right") {
        return 90;
      } else if (activeAction === "bottom") {
        return 180;
      } else if (activeAction === "left") {
        return 270;
      }
      return null;
    },
    // 当鼠标指针移动到元素上方,并按下鼠标左键时,
    btMousedown(action) {
      this.startAction(action);
    },
    // 当鼠标指针移动到元素上方,并松开鼠标左键时
    btMouseup(action) {
      this.removeAction();
    },
    // 当鼠标指针从元素上移开时,
    btMouseout(action) {
      this.removeAction();
    },
    // 当鼠标指针在指定的元素中移动时,
    btMousemove(action) {},
    plusSpeed() {
      if (this.speed >= 1.8) {
        this.speed = 1.8;
        return;
      }
      this.speed = this.speed + 0.1;
      console.log(this.speed);
      this.speed = parseFloat(this.speed.toFixed(1));
    },
    subSpeed() {
      if (this.speed <= 0.1) {
        this.speed = 0.1;
        return;
      }
      this.speed = this.speed - 0.1;
      this.speed = parseFloat(this.speed.toFixed(1));
    },
  },
};
</script>

<style scoped>
.wrap * {
  user-select: none !important;
}
.wrap {
  color: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  width: 251px;
  height: 247px;
  background-image: url("../../../../../assets/planDeviceNew/controlpanel.png");
}

.divbtn {
  width: 80px;
  height: 35px;
  cursor: pointer;
  position: absolute;
}

.btntop {
  top: 0px;
  left: calc(50% - 40px);
}
.btnright {
  right: 0px;
  height: 80px;
  width: 35px;
  top: calc(50% - 40px);
}
.btnleft {
  left: 0px;
  height: 80px;
  width: 35px;
  top: calc(50% - 40px);
}
.btnbottom {
  bottom: 0px;
  left: calc(50% - 40px);
}

.speddset .btn {
  font-size: 35px;
  vertical-align: top;
  cursor: pointer;
}
.speddset {
  width: 140px;
  height: 35px;
  line-height: 35px;
  position: absolute;
  bottom: 60px;
  left: calc(50% - 70px);
}
.speddset .text {
  background-image: url("../../../../../assets/planDeviceNew/speedcontainer.png");
  width: 86px;
  height: 35px;
  display: inline-block;
  padding-left: 10px;
  line-height: 35px;
  margin-left: 3px;
  margin-right: 3px;
  color: #00fefe;
  font-weight: bold;
}

.speedtext {
  font-size: 20px;
}
.unittext {
  font-size: 15px;
}
@media (max-width: 1024px) {
  .wrap {
    color: #fff;
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../../../../assets/planDeviceNew/controlpanel.png");
    background-size: 100% 100%;
  }
  .speddset .btn {
    font-size: 1rem;
    vertical-align: top;
    cursor: pointer;
  }
  .speddset {
    width: 100px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 28px;
    left: calc(50% - 40px);
  }
  .speddset .text {
    background-image: url("../../../../../assets/planDeviceNew/speedcontainer.png");
    width: 86px;
    height: 35px;
    display: inline-block;
    padding-left: 10px;
    line-height: 35px;
    margin-left: 3px;
    margin-right: 3px;
    color: #00fefe;
    font-weight: bold;
  }
  .speedtext {
    font-size: 0.8rem;
  }
  .unittext {
    font-size: 0.7rem;
  }
  .speddset .text {
    background-image: url("../../../../../assets/planDeviceNew/speedcontainer.png");
    background-size: 100% 100%;
    width: 60px;
    height: 30px;
    padding-left: 7px;
    line-height: 30px;
  }
}
</style>