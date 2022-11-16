<template>
  <div class="map3d_bottom">
    <!-- 修改右下角区域，添加图例面板 -->
    <div class="tuli" id="tuli1">
      <div class="divBottomTitle">图例</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allDeviceData: {
      type: Array,
      default: () => [],
    },
    deviceLayer: {},
    deviceNameLayer: {},
    deviceGroupLayer: {},
    view: {},
    currentType: {
      type: Array,
      default: () => [],
    },
    currentStatus: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: 0,
      stateArray: [],
      typeArray: [],
      nameflag: true,
    };
  },
  watch: {
    allDeviceData() {
      this.stateArray = [];
      this.typeArray = [];
      this.clearDiv()
      this.currentStatus.splice(0, this.currentStatus.length);
      this.showAllDevice();
      this.createMenu();
    },
  },
  methods: {
    clearDiv () {
      var div = document.getElementById("tuli1")
      var children = div.childNodes
      var l = children.length
      while (l > 1) {
        div.removeChild(children[l - 1])
        l--
      }
    },

    showAllDevice() {
      for (let i = 0; i < this.allDeviceData.length; i++) {
        if (this.allDeviceData[i].geometry_json){
          this.typeArray.push(this.allDeviceData[i].hd_device_type_name);
          this.stateArray.push(this.allDeviceData[i].state);
        }
      }
      this.currentStatus.push(0);
      this.currentStatus.push(1);
      this.currentStatus.push(2);
      this.currentStatus.push(3);
    },

    arrayRemove(e, array) {
      for (let i = 0; i < array.length; i++) {
        if (e === array[i]) {
          for (let j = 0; j < i; j++) {
            let e2 = array[0]
            array.shift()
            array.push(e2)
          }
          array.shift()
          return
        }
      }
    },

    inArray(num, array) {
      for (let i = 0; i < array.length; i++) {
        if (num === array[i]) return true;
      }
      return false;
    },

    getElementNum(e) {
      var result = 0;
      for (let i = 0; i < this.allDeviceData.length; i++) {
        if (e === this.allDeviceData[i].state) {
          result++;
        }
      }
      return result.toString();
    },

    showPoint(x) {
      if (this.deviceLayer.graphics.items.length - 1 < x) {
        console.log("图形缺失");
        return;
      }
      this.deviceLayer.graphics.items[x].visible = true;
      if (this.nameflag) this.deviceNameLayer.graphics.items[x].visible = true;
    },

    hidePoint(x) {
      if (this.deviceLayer.graphics.items.length - 1 < x) {
        console.log("图形缺失");
        return;
      }
      if (this.deviceLayer.graphics.items[x].visible === false) return
      this.deviceLayer.graphics.items[x].visible = false;
      this.deviceNameLayer.graphics.items[x].visible = false;
    },

    showOnline() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (
          (this.stateArray[i] === 1 || this.stateArray[i] === 3) &&
          this.inArray(this.typeArray[i], this.currentType)
        )
          this.showPoint(i);
      }
    },

    hideOnline() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (this.stateArray[i] === 1 || this.stateArray[i] === 3) this.hidePoint(i);
      }
    },

    showOffline() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (
          this.stateArray[i] === 0 &&
          this.inArray(this.typeArray[i], this.currentType)
        )
          this.showPoint(i);
      }
    },

    hideOffline() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (this.stateArray[i] === 0) this.hidePoint(i);
      }
    },

    showError() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (
          this.stateArray[i] === 2 &&
          this.inArray(this.typeArray[i], this.currentType)
        )
          this.showPoint(i);
      }
    },

    hideError() {
      for (let i = 0; i < this.stateArray.length; i++) {
        if (this.stateArray[i] === 2) this.hidePoint(i);
      }
    },

    updateGroupLayer() {
      let lengthlist = []
      let length = this.$parent.group.length
      let max = this.$parent.group[length - 1].group + 1
      let result = 0
      for (let i = 0; i < max; i++) {
        result = 0
        for (let j = 0; j < length; j++) {
          if (this.$parent.group[j].group === i) {
            for (let k = 0; k < this.deviceLayer.graphics.length; k++) {
              if (this.$parent.group[j].data.graphic.attributes.longitude === this.deviceLayer.graphics.items[k].attributes.longitude) {
                if (this.deviceLayer.graphics.items[k].visible === true) result++
                break;
              }
            }
          }
        }
        lengthlist.push(result)
      }
      for (let i = 0; i < lengthlist.length; i++) {
        if (lengthlist[i] === 0) {
          this.deviceGroupLayer.graphics.items[i].visible = false
          return
        } else if (lengthlist[i] > 0 && this.deviceGroupLayer.graphics.items[i].visible === false) {
          this.deviceGroupLayer.graphics.items[i].visible = true
        }
        let width = 20 + lengthlist[i] * 2
        let height = width
        this.deviceGroupLayer.graphics.items[i].symbol.width = width.toString() + "px"
        this.deviceGroupLayer.graphics.items[i].symbol.height = height.toString() + "px"
        this.deviceGroupLayer.graphics.items[i].symbol = this.deviceGroupLayer.graphics.items[i].symbol.clone()
      }
    },

    createMenu() {
      var state = [];
      for (let i = 0; i < this.stateArray.length; i++) {
        if (!this.inArray(this.stateArray[i], state)) {
          state.push(this.stateArray[i]);
        }
      }
      var div = document.getElementById("tuli1");
      // 离线状态
      // 添加状态文本
      let stateDiv1 = document.createElement("div");
      stateDiv1.style.fontFamily = "等线";
      stateDiv1.style.color = "black";
      stateDiv1.style.fontSize = "125%";
      stateDiv1.style.height = "25%";
      stateDiv1.style.marginLeft = "20px";
      stateDiv1.innerHTML =
        "离线(" + this.getElementNum(0) + ")";
      stateDiv1.onmouseover = function () {
        stateDiv1.style.color = "#2376ac";
      };
      stateDiv1.onmouseout = function () {
        stateDiv1.style.color = "black";
      };
      stateDiv1.style.cursor = "pointer";
      div.appendChild(stateDiv1);
      // 添加状态图例
      let offLinePoint = document.createElement("img")
      offLinePoint.src = "./static/img/icon-offline.png"
      offLinePoint.style.width = "15px"
      offLinePoint.style.height = "15px"
      offLinePoint.style.position = "absolute"
      offLinePoint.style.top = "25px"
      offLinePoint.style.left = "5px"
      div.appendChild(offLinePoint);
      // 添加勾选项
      let choose1 = document.createElement("i");
      choose1.setAttribute("class", "el-icon-success");
      choose1.style.position = "absolute";
      choose1.style.top = "29px";
      choose1.style.right = "5px";
      choose1.style.color = "blue";
      var _this = this;
      choose1.onclick = function () {
        if (choose1.style.color === "blue") {
          choose1.style.color = "black";
          // 修改当前勾选状态
          _this.arrayRemove(0, _this.currentStatus)
          // 修改结束
          _this.hideOffline();
          _this.updateGroupLayer()
        } else {
          choose1.style.color = "blue";
          _this.currentStatus.push(0);
          _this.showOffline();
          _this.updateGroupLayer()
        }
      };
      div.appendChild(choose1);

      // 在线状态
      // 添加状态文本
      let stateDiv2 = document.createElement("div");
      stateDiv2.style.fontFamily = "等线";
      stateDiv2.style.color = "black";
      stateDiv2.style.fontSize = "125%";
      stateDiv2.style.height = "25%";
      stateDiv2.style.marginLeft = "20px";
      stateDiv2.innerHTML =
        "在线(" + (parseInt(this.getElementNum(1)) + parseInt(this.getElementNum(3))).toString() + ")";
      stateDiv2.onmouseover = function () {
        stateDiv2.style.color = "#2376ac";
      };
      stateDiv2.onmouseout = function () {
        stateDiv2.style.color = "black";
      };
      stateDiv2.style.cursor = "pointer";
      div.appendChild(stateDiv2);
      // 添加状态图例
      let onLinePoint = document.createElement("img")
      onLinePoint.src = "./static/img/icon-online.png"
      onLinePoint.style.width = "15px"
      onLinePoint.style.height = "15px"
      onLinePoint.style.position = "absolute"
      onLinePoint.style.top = "50px"
      onLinePoint.style.left = "5px"
      div.appendChild(onLinePoint);
      // 添加勾选项
      let choose2 = document.createElement("i");
      choose2.setAttribute("class", "el-icon-success");
      choose2.style.position = "absolute";
      choose2.style.top = "54px";
      choose2.style.right = "5px";
      choose2.style.color = "blue";
      choose2.onclick = function () {
        if (choose2.style.color === "blue") {
          choose2.style.color = "black";
          _this.arrayRemove(1, _this.currentStatus)
          _this.arrayRemove(3, _this.currentStatus)
          _this.hideOnline();
          _this.updateGroupLayer()
        } else {
          choose2.style.color = "blue";
          _this.currentStatus.push(1);
          _this.currentStatus.push(3);
          _this.showOnline();
          _this.updateGroupLayer()
        }
      };
      div.appendChild(choose2);

      // 故障状态
      // 添加状态文本
      let stateDiv3 = document.createElement("div");
      stateDiv3.style.fontFamily = "等线";
      stateDiv3.style.color = "black";
      stateDiv3.style.fontSize = "125%";
      stateDiv3.style.height = "25%";
      stateDiv3.style.marginLeft = "20px";
      stateDiv3.innerHTML =
        "故障(" + this.getElementNum(2) + ")";
      stateDiv3.onmouseover = function () {
        stateDiv3.style.color = "#2376ac";
      };
      stateDiv3.onmouseout = function () {
        stateDiv3.style.color = "black";
      };
      stateDiv3.style.cursor = "pointer";
      div.appendChild(stateDiv3);
      // 添加状态图例
      let errorPoint = document.createElement("img")
      errorPoint.src = "./static/img/icon-error.png"
      errorPoint.style.width = "15px"
      errorPoint.style.height = "15px"
      errorPoint.style.position = "absolute"
      errorPoint.style.top = "75px"
      errorPoint.style.left = "5px"
      div.appendChild(errorPoint);
      // 添加勾选项
      let choose3 = document.createElement("i");
      choose3.setAttribute("class", "el-icon-success");
      choose3.style.position = "absolute";
      choose3.style.top = "80px";
      choose3.style.right = "5px";
      choose3.style.color = "blue";
      choose3.onclick = function () {
        if (choose3.style.color === "blue") {
          choose3.style.color = "black";
          _this.arrayRemove(2, _this.currentStatus)
          _this.hideError();
          _this.updateGroupLayer()
        } else {
          choose3.style.color = "blue";
          _this.currentStatus.push(2);
          _this.showError();
          _this.updateGroupLayer()
        }
      };
      div.appendChild(choose3);
      stateDiv1.onclick = choose1.onclick;
      stateDiv2.onclick = choose2.onclick;
      stateDiv3.onclick = choose3.onclick;
    },
  },
};
</script>

<style>
.map3d_bottom {
  top: 0;
  left: 0;
}

.map3d_bottom .tuli {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: white;
  width: 100px;
  height: 100px;
  z-index: 999999;
}
.map3d_bottom .tuli .divBottomTitle {
  font-family: "等线";
  color: black;
  font-size: 125%;
  text-align: center;
  height: 25%;
}
</style>