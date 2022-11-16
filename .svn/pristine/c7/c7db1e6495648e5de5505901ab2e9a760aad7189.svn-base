<template>
  <div class="toolbars" :style="isBack ? 'right: 120px;' : ''">
    <!-- 图层下拉框 -->
    <div @click="changeActive" :class="active === 0 ? 'active' : ''">
      <i class="el-icon-coin" @click="changeActive"></i>
      图层
      <i class="el-icon-arrow-down" @click="changeActive" />
      <div class="menuList">
        <div class="DropDownBox" id="ddb1">
          <div
            class="DropDownBoxText"
            onmousemove="this.style.color = '#2376ac'"
            onmouseout="this.style.color = 'black'"
            v-for="(it, i) in types"
            :key="i"
            @click="click"
            value="0"
          >
            {{ it.name }}({{ it.num }})
            <img class="DropDownBoxImage" src="@/assets/images/icon-sun.png" />
            <i class="el-icon-success"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 结束 -->
    <!-- 工具栏下拉框 -->
    <div
      @click="changeActive"
      :class="active === 1 ? 'active' : ''"
      id="toolbar"
    >
      <i class="el-icon-suitcase" @click="changeActive"></i>
      工具栏
      <i class="el-icon-arrow-down" @click="changeActive" />
      <div class="menuList">
        <div class="DropDownBox2">
          <div
            class="DropDownBoxText"
            onmousemove="this.style.color = '#2376ac'"
            onmouseout="this.style.color = 'black'"
          >
            测距
          </div>
          <div
            class="DropDownBoxText"
            onmousemove="this.style.color = '#2376ac'"
            onmouseout="this.style.color = 'black'"
          >
            测面
          </div>
          <img src="@/assets/images/icon-ruler.png" id="img7" />
          <img src="@/assets/images/icon-map.png" id="img8" />
        </div>
      </div>
    </div>
    <!-- 结束 -->
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
  watch: {
    allDeviceData() {
      this.stateArray = [];
      this.typeArray = [];
      this.currentType.splice(0, this.currentType.length);
      this.initData();
      this.showAllDevice();
      this.createMenu();
    },
  },
  data() {
    return {
      active: 4,
      typeArray: [],
      stateArray: [],
      types: [],
      nameflag: true,
      groupflag: true,
      buttonTime: 0,
    };
  },
  mounted() {
    console.log("加载设备信息中……");
  },
  methods: {
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
      if (this.deviceLayer.graphics.items[x].visible === false) return;
      this.deviceLayer.graphics.items[x].visible = false;
      this.deviceNameLayer.graphics.items[x].visible = false;
    },

    initData() {
      var ddb1 = document.getElementById("ddb1");
      for (let i = 0; i < ddb1.children.length; i++) {
        ddb1.children[i].value = "1";
        ddb1.children[i].children[1].style.color = "blue";
      }
    },

    showAllDevice() {
      for (let i = 0; i < this.allDeviceData.length; i++) {
        if (this.allDeviceData[i].geometry_json) {
          this.typeArray.push(this.allDeviceData[i].hd_device_type_name);
          this.stateArray.push(this.allDeviceData[i].state);
        }
      }
    },

    inArray(num, array) {
      for (let i = 0; i < array.length; i++) {
        if (num === array[i]) {
          return true;
        }
      }
      return false;
    },

    arrayRemove(e, array) {
      for (let i = 0; i < array.length; i++) {
        if (e === array[i]) {
          for (let j = 0; j < i; j++) {
            let e2 = array[0];
            array.shift();
            array.push(e2);
          }
          array.shift();
          return;
        }
      }
    },

    // 创建菜单，修改过长的选项，使其显示正常
    createMenu() {
      var type = [];
      for (let i = 0; i < this.allDeviceData.length; i++) {
        var t = type.find((e) => {
          return e.name === this.allDeviceData[i].hd_device_type_name;
        });
        if (t) {
          t.num += 1;
        } else {
          type.push({
            name: this.allDeviceData[i].hd_device_type_name,
            num: 1,
          });
          this.currentType.push(this.allDeviceData[i].hd_device_type_name);
        }
      }
      this.types = type;
      return;
    },

    changeActive(e) {
      console.log(e)
      if (e.path[0].nodeName === "I" && this.buttonTime === 0) {
        if (e.path[0].className === "el-icon-coin" && this.active != 0)
          this.active = 0;
        else if (e.path[0].className === "el-icon-suitcase" && this.active != 1)
          this.active = 1;
        else if (
          e.path[0].className === "el-icon-coin" ||
          e.path[0].className === "el-icon-suitcase"
        )
          this.active = 2;
        this.buttonTime = 1
      } else if (e.path[0].nodeName === "DIV") {
        if (e.path[0].innerHTML === "图层" && this.active != 0) this.active = 0
        else if (e.path[0].innerHTML === "工具栏" && this.active != 1) this.active = 1
        else this.active = 2
      } else {
        this.buttonTime = 0
      }
    },

    getTypeString(str) {
      str = str.substr(1, str.length - 1);
      while (str.charAt(0) === " ") str = str.substr(1, str.length - 1);
      var end = str.indexOf("(");
      str = str.substr(0, end);
      return str;
    },

    updateGroupLayer() {
      let lengthlist = [];
      let length = this.$parent.group.length;
      let max = this.$parent.group[length - 1].group + 1;
      let result = 0;
      for (let i = 0; i < max; i++) {
        result = 0;
        for (let j = 0; j < length; j++) {
          if (this.$parent.group[j].group === i) {
            for (let k = 0; k < this.deviceLayer.graphics.length; k++) {
              if (
                this.$parent.group[j].data.graphic.attributes.longitude ===
                this.deviceLayer.graphics.items[k].attributes.longitude
              ) {
                if (this.deviceLayer.graphics.items[k].visible === true)
                  result++;
                break;
              }
            }
          }
        }
        lengthlist.push(result);
      }
      for (let i = 0; i < lengthlist.length; i++) {
        if (lengthlist[i] === 0) {
          this.deviceGroupLayer.graphics.items[i].visible = false;
          return;
        } else if (
          lengthlist[i] > 0 &&
          this.deviceGroupLayer.graphics.items[i].visible === false
        ) {
          this.deviceGroupLayer.graphics.items[i].visible = true;
        }
        let width = 20 + lengthlist[i] * 2;
        let height = width;
        this.deviceGroupLayer.graphics.items[i].symbol.width =
          width.toString() + "px";
        this.deviceGroupLayer.graphics.items[i].symbol.height =
          height.toString() + "px";
        this.deviceGroupLayer.graphics.items[
          i
        ].symbol = this.deviceGroupLayer.graphics.items[i].symbol.clone();
      }
    },

    click(e) {
      // console.log(e)
      if (e.srcElement.nodeName != "DIV") {
        // 获取类型
        var str = this.getTypeString(e.srcElement.parentNode.innerHTML);
        if (e.srcElement.parentNode.value === "0") {
          e.srcElement.parentNode.children[1].style.color = "blue";
          this.currentType.push(str);
          for (let i = 0; i < this.typeArray.length; i++) {
            if (
              str === this.typeArray[i] &&
              this.inArray(this.stateArray[i], this.currentStatus)
            ) {
              this.showPoint(i);
            }
          }
          e.srcElement.parentNode.value = "1";
        } else {
          e.srcElement.parentNode.children[1].style.color = "black";
          // 修改当前勾选类型
          this.arrayRemove(str, this.currentType);
          // 修改结束
          for (let i = 0; i < this.typeArray.length; i++) {
            if (str === this.typeArray[i]) {
              this.hidePoint(i);
            }
          }
          e.srcElement.parentNode.value = "0";
        }
      } else {
        // 获取类型
        var str = this.getTypeString(e.srcElement.innerHTML);
        if (e.srcElement.value === "0") {
          e.srcElement.children[1].style.color = "blue";
          this.currentType.push(str);
          for (let i = 0; i < this.typeArray.length; i++) {
            if (
              str === this.typeArray[i] &&
              this.inArray(this.stateArray[i], this.currentStatus)
            ) {
              this.showPoint(i);
            }
          }
          e.srcElement.value = "1";
        } else {
          e.srcElement.children[1].style.color = "black";
          // 修改当前勾选类型
          this.arrayRemove(str, this.currentType);
          // 修改结束
          for (let i = 0; i < this.typeArray.length; i++) {
            if (str === this.typeArray[i]) {
              this.hidePoint(i);
            }
          }
          e.srcElement.value = "0";
        }
      }
      this.updateGroupLayer();
    },
  },
};
</script>

<style>
.toolbars {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  background: #fff;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px #a9a4a4;
  user-select: none;
}

.toolbars > div {
  padding: 7px;
  border: solid 1px #eeeeee;
  cursor: pointer;
  position: relative;
  min-width: 160px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toorbars #toorbar {
  width: 50px;
}

.toolbars > div.active .menuList {
  display: block;
}

/* 下拉菜单样式 */
.toolbars .menuList {
  display: none;
  position: absolute;
  background: #fff;
  min-width: 100%;
  left: 0;
  top: 44px;
  padding: 5px;
  text-align: left;
  box-shadow: 0px 0px 3px #a9a4a4;
}

.toolbars .menuList .DropDownBox {
  /* height: 150px; */
}

.toolbars .menuList .DropDownBox .DropDownBoxText {
  color: black;
  font-size: 105%;
  text-align: center;
  font-family: "等线";
  height: 25px;
  padding-top: 5px;
}

.toolbars .menuList .DropDownBox .DropDownBoxText .DropDownBoxImage {
  position: absolute;
  left: 5px;
  width: 12px;
  height: 12px;
}

.toolbars .menuList .DropDownBox .DropDownBoxText .el-icon-success {
  position: absolute;
  right: 5px;
  color: blue;
}

.toolbars .menuList .DropDownBox2 {
  height: 50px;
}

.toolbars .menuList .DropDownBox2 .DropDownBoxText {
  color: black;
  font-size: 105%;
  text-align: center;
  font-family: "等线";
  height: 25px;
  padding-top: 5px;
}

.toolbars .menuList .DropDownBox2 #img7 {
  position: absolute;
  left: 5px;
  width: 20px;
  height: 20px;
  top: 7px;
}

.toolbars .menuList .DropDownBox2 #img8 {
  position: absolute;
  left: 5px;
  width: 20px;
  height: 20px;
  top: 32px;
}
</style>
