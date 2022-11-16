<template>
  <!--施肥桶-->
  <div
    class="pot_cont"
    v-loading="loading"
    element-loading-text="水肥数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <!--操作装置等待-->
    <loading ref="loading" />
    <!-- 小水流 -->
    <div class="smallWater-box">
      <div class="smallWater smallWater1" where="17" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater2" where="17" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater3" where="18" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater4" where="18" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater5" where="19" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater6" where="19" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater7" where="20" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater8" where="20" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater9" where="21" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater10" where="21" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater11" where="22" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater12" where="22" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater13" where="23" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater14" where="23" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater15" where="24" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater16" where="24" or="">
        <div class="shuiliuB">
          <img class="" src="@/assets/images/shuifeiji/smallWater_b.png" />
        </div>
      </div>
      <div class="smallWater smallWater17" where="33" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater18" where="34" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater19" where="35" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater20" where="36" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater21" where="37" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater22" where="38" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater23" where="39" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater24" where="40" or="">
        <div class="shuiliu_r">
          <img class="" src="@/assets/images/shuifeiji/smallWater_r.png" />
        </div>
      </div>
      <div class="smallWater smallWater25" where="25" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater26" where="26" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater27" where="27" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater28" where="28" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater29" where="29" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater30" where="30" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater31" where="31" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
      <div class="smallWater smallWater32" where="32" or="">
        <div class="shuiliu_l">
          <img class="" src="@/assets/images/shuifeiji/smallWater_l.png" />
        </div>
      </div>
    </div>
    <!--入口背景-->
    <div class="pot_entry" v-show="potsArr.length"></div>
    <!--循环遍历每一个桶-->
    <div
      class="pot_box"
      v-for="(item, index) in potsArr"
      :key="item.num"
      :class="`pot_box${item.num}`"
    >
      <a
        ><span>{{ item.name }}</span
        ><span class="boxL">{{ item.rongliang.value }}L</span></a
      >
      <div class="pot_water" :class="`pot_water_${item.num}`">
        <ul class="water_bg">
          <li
            class="water_top"
            :class="`water_top${item.num}`"
            :style="{ height: (item.rongliang.value / 500) * 65 + 'px' }"
          ></li>
          <li class="water_bottom"></li>
        </ul>
        <div id="burbujas">
          <span class="b0"></span>
          <span class="b1"></span>
          <span class="b2"></span>
          <span class="b3"></span>
          <span class="b4"></span>
          <span class="b5"></span>
          <span class="b6"></span>
          <span class="b7"></span>
          <span class="b8"></span>
          <span class="b9"></span>
        </div>
        <!-- <div class="water_scale"></div> -->
      </div>
      <!--大按钮，注肥阀按钮-->
      <i
        @click="
          btnClick(
            $event,
            index,
            item.zhufeifa.hd_device_sensor_id,
            item.zhufeifa.value
          )
        "
        class="btn_s"
        :class="[item.zhufeifa.value ? 'btn_on' : 'btn_off']"
        :code="`${item.zhufeifa.channel}`"
      ></i>
      <!--注水阀按钮-->
      <i
        @click="
          zhushuiBtnClick(
            $event,
            index,
            item.zhushuifa.hd_device_sensor_id,
            item.zhushuifa.value
          )
        "
        class="zhushuiBtn"
        :class="[item.zhushuifa.value ? 'smallBtn_on' : 'smallBtn_off']"
        :code="`${item.zhushuifa.channel}`"
      ></i>
      <!--进肥阀按钮-->
      <i
        @click="
          jinfeiBtnClick(
            $event,
            index,
            item.jinfeifa.hd_device_sensor_id,
            item.jinfeifa.value
          )
        "
        class="jinfeiBtn"
        :class="[item.jinfeifa.value ? 'smallBtn_on' : 'smallBtn_off']"
        :code="`${item.jinfeifa.channel}`"
      ></i>
      <!--排水阀按钮-->
      <i
        @click="
          paishuiBtnClick(
            $event,
            index,
            item.paishuifa.hd_device_sensor_id,
            item.paishuifa.value
          )
        "
        class="paishuiBtn"
        :class="[item.paishuifa.value ? 'smallBtn_on' : 'smallBtn_off']"
        :code="`${item.paishuifa.channel}`"
      ></i>
      <water04 class="water water04" where="41,45"></water04>
      <water05
        class="water water05"
        :where="`${item.zhufeifa.channel}`"
      ></water05>
    </div>
  </div>
</template>

<script>
import { openOrCloseChannel } from "@/utils/websocket_util.js";
import loading from "../loading";
import water04 from "../water/water04.vue";
import water05 from "../water/water05.vue";
export default {
  data() {
    return {
      potsBtn: [],
      potsData: [],
      potsArr: [],
      maxLength: "",
      loading: true,
    };
  },
  components: {
    loading,
    water04,
    water05,
  },
  computed: {
    // 这里是拿到VueX的装置数组数据
    shebeiArr() {
      return this.$store.state.shuifei.pkArr;
    },
    chuanganqiArr() {
      return this.$store.state.shuifei.pcArr;
    },
  },
  watch: {
    shebeiArr(shebeiArr) {
      // console.log(shebeiArr)
      // 过滤出注水阀的数组
      var zhushuifaArr = [];
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("注水阀") != -1) {
          zhushuifaArr.push(shebeiArr[i]);
        }
      }
      // 过滤出进肥阀的数组
      var jinfeifaArr = [];
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("传送阀") != -1) {
          jinfeifaArr.push(shebeiArr[i]);
        }
      }
      // 过滤出排水阀的数组
      var paishuifaArr = [];
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("排水阀") != -1) {
          paishuifaArr.push(shebeiArr[i]);
        }
      }
      // 过滤出注肥阀的数组
      var zhufeifaArr = [];
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("注肥阀") != -1) {
          zhufeifaArr.push(shebeiArr[i]);
        }
      }
      // 获取最大长度
      var maxLength = Math.max(
        zhushuifaArr.length,
        jinfeifaArr.length,
        paishuifaArr.length,
        zhufeifaArr.length
      );
      // 设定桶的数量
      this.maxLength = maxLength;

      // 清掉之前的数据
      this.potsBtn = [];
      for (let i = 0; i < this.maxLength; i++) {
        // 构建对象
        var realNum = i + 1;
        var obj = {};
        obj.num = realNum;
        obj.name = "肥罐" + realNum;
        for (var j = 0; j < zhushuifaArr.length; j++) {
          obj.zhushuifa = "";
          if (zhushuifaArr[j].ord == realNum) {
            obj.zhushuifa = zhushuifaArr[j];
            break;
          }
        }
        for (var j = 0; j < jinfeifaArr.length; j++) {
          obj.jinfeifa = "";
          if (jinfeifaArr[j].ord == realNum) {
            obj.jinfeifa = jinfeifaArr[j];
            break;
          }
        }
        for (var j = 0; j < paishuifaArr.length; j++) {
          obj.paishuifa = "";
          if (paishuifaArr[j].ord == realNum) {
            obj.paishuifa = paishuifaArr[j];
            break;
          }
        }
        for (var j = 0; j < zhufeifaArr.length; j++) {
          obj.zhufeifa = "";
          if (zhufeifaArr[j].ord == realNum) {
            obj.zhufeifa = zhufeifaArr[j];
            break;
          }
        }
        // 对象推进数组
        this.potsBtn.push(obj);
      }

      // console.log(this.potsBtn);
      this.potsArr = this.potsData.map((item, index) => {
        return { ...item, ...this.potsBtn[index] };
      });
      // console.log(this.potsArr);
    },

    chuanganqiArr(chuanganqiArr) {
      // console.log(chuanganqiArr);
      // 过滤出肥桶容量
      var rongliangArr = [];
      for (var i = 0; i < chuanganqiArr.length; i++) {
        if (chuanganqiArr[i].name.indexOf("当前容量") != -1) {
          rongliangArr.push(chuanganqiArr[i]);
        }
      }
      // console.log(rongliangArr);

      this.potsData = [];
      for (let i = 0; i < this.maxLength; i++) {
        // 构建对象
        var realNum = i + 1;
        var obj = {};
        for (var j = 0; j < rongliangArr.length; j++) {
          obj.rongliang = "";
          if (rongliangArr[j].ord == realNum) {
            obj.rongliang = rongliangArr[j];
            break;
          }
        }
        // 对象推进数组
        this.potsData.push(obj);
      }
      // console.log(this.potsData);
      this.potsArr = this.potsBtn.map((item, index) => {
        return { ...item, ...this.potsData[index] };
      });
      // console.log(this.potsArr);
    },
    potsArr() {
      this.loading = false
      this.$nextTick(function () {
        if (this.potsArr.length == 0) {
          var potEntry = document.getElementsByClassName("pot_entry")[0];
          potEntry.style.backgroundImage = "none";
        }
        if (this.potsArr.length == 1) {
          var onlyPot = document.getElementsByClassName("pot_box")[0];
          onlyPot.style.backgroundImage =
            "url(" + require("@/assets/images/shuifeiji/pot_05.png") + ")";
        }
        this.tiaozhengSmallWater();
        this.$bus.$emit("waterEvent");
      });
    },
  },
  methods: {
    // 注肥阀控制按钮开关
    btnClick(e, i, id, value) {
      var targetBtn = e.currentTarget;
      var code = targetBtn.getAttribute("code");
      code = Number(code); // 转变成数字

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.potsArr[i].zhufeifa.value = newValue;
          this.$refs.loading.closeLoadInstance();
          // 异步完成之后对vuex进行操作，改变按钮与水流
          // 获取目前开关的情况，根据情况切换，并保存到vuex里
          const index = this.$store.state.shuifei.openKey.indexOf(code);
          if (index === -1) {
            this.$store.commit("ADD_CODE", code);
          } else {
            this.$store.commit("DEL_CODE", index);
          }
          // 事件总线触发流水事件
          this.$bus.$emit("waterEvent");
        })
        .catch((err) => {
          this.$message.error(err.msg);
          this.potsArr[i].zhufeifa.value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },

    // 注水阀小按钮控制开关
    zhushuiBtnClick(e, i, id, value) {
      var targetBtn = e.currentTarget;
      var code = targetBtn.getAttribute("code");
      code = Number(code); // 转变成数字

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.potsArr[i].zhushuifa.value = newValue;
          this.$refs.loading.closeLoadInstance();
          // 异步完成之后对vuex进行操作，改变按钮与水流
          // 获取目前开关的情况，根据情况切换，并保存到vuex里
          const index = this.$store.state.shuifei.openKey.indexOf(code);
          if (index === -1) {
            this.$store.commit("ADD_CODE", code);
          } else {
            this.$store.commit("DEL_CODE", index);
          }
          this.tiaozhengSmallWater();
        })
        .catch((err) => {
          this.$message.error(err.msg);
          this.potsArr[i].zhushuifa.value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },

    // 进肥阀小按钮控制开关
    jinfeiBtnClick(e, i, id, value) {
      var targetBtn = e.currentTarget;
      var code = targetBtn.getAttribute("code");
      code = Number(code); // 转变成数字

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.potsArr[i].jinfeifa.value = newValue;
          this.$refs.loading.closeLoadInstance();
          // 异步完成之后对vuex进行操作，改变按钮与水流
          // 获取目前开关的情况，根据情况切换，并保存到vuex里
          const index = this.$store.state.shuifei.openKey.indexOf(code);
          if (index === -1) {
            this.$store.commit("ADD_CODE", code);
          } else {
            this.$store.commit("DEL_CODE", index);
          }
          this.tiaozhengSmallWater();
        })
        .catch((err) => {
          this.$message.error(err.msg);
          this.potsArr[i].jinfeifa.value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },

    // 排水阀小按钮控制开关
    paishuiBtnClick(e, i, id, value) {
      var targetBtn = e.currentTarget;
      var code = targetBtn.getAttribute("code");
      code = Number(code); // 转变成数字

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.potsArr[i].paishuifa.value = newValue;
          this.$refs.loading.closeLoadInstance();
          // 异步完成之后对vuex进行操作，改变按钮与水流
          // 获取目前开关的情况，根据情况切换，并保存到vuex里
          const index = this.$store.state.shuifei.openKey.indexOf(code);
          if (index === -1) {
            this.$store.commit("ADD_CODE", code);
          } else {
            this.$store.commit("DEL_CODE", index);
          }
          this.tiaozhengSmallWater();
        })
        .catch((err) => {
          this.$message.error(err.msg);
          this.potsArr[i].paishuifa.value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },

    // 控制小流水显示隐藏
    tiaozhengSmallWater() {
      // 所有的噴水器
      var smallWater = document.getElementsByClassName("smallWater");
      var smallWaterBox = Array.prototype.slice.apply(smallWater);

      for (var i = 0; i < smallWaterBox.length; i++) {
        // 获取开着的按钮
        var openKey = this.$store.state.shuifei.openKey;
        var smallWaterItem = smallWaterBox[i];
        var where = smallWaterItem.getAttribute("where");
        if (!where) continue;
        where = where.split(",").map(Number);
        var or = smallWaterItem.getAttribute("or");
        if (or) or = or.split(",").map(Number);
        var bool = true;
        for (var ii in where) {
          if (openKey.indexOf(where[ii]) === -1) {
            bool = false;
            break;
          }
        }
        if (or && bool) {
          bool = false;
          for (var ii in or) {
            if (openKey.indexOf(or[ii]) !== -1) {
              bool = true;
              break;
            }
          }
        }
        if (bool) {
          smallWaterItem.style.display = "block";
        } else {
          smallWaterItem.style.display = "none";
        }
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
/*施肥桶样式*/
.pot_cont {
  /* z-index: 1; */
  width: 822px;
  height: 658px;
  /* position: relative; */
}
.pot_entry {
  width: 196px;
  height: 658px;
  background-image: url(~@/assets/images/shuifeiji/pot_01.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: -196px;
  top: -50px;
}
.pot_box {
  position: absolute;
  left: 0;
  top: -50px;
  width: 120px;
  /* height: 100%; */
  height: 658px;
  background-image: url(~@/assets/images/shuifeiji/pot_03.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.pot_box:last-child {
  background-image: url(~@/assets/images/shuifeiji/pot_04.png);
}
.pot_box1 {
  background-image: url(~@/assets/images/shuifeiji/pot_02.png);
  /* height: 448px; */
}

/*施肥桶顶部文字描述+容量*/
.pot_box a {
  position: absolute;
  left: 17px;
  top: 173px;
  color: #e5596b;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 58px;
  text-align: center;
}

.pot_box a span {
  color: #2d94e3;
  font-size: 13px;
}

.pot_box a .boxL {
}

/*施肥桶填充水*/
.pot_water {
  width: 69px;
  height: 93px;
  position: relative;
  left: 11px;
  top: 216px;
  overflow: hidden;
}

.water_bg {
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.water_bg li {
  width: 100%;
}

.water_top {
  /* height: 65px; */
  max-height: 66px;
  background-color: #9bcdf2;
}

.water_bottom {
  height: 22px;
  background-image: url(~@/assets/images/shuifeiji/waterbg_bottom.png);
  background-repeat: no-repeat;
  background-size: 100%;
}

/*施肥桶刻度*/
.water_scale {
  position: absolute;
  left: 30px;
  bottom: 0px;
  width: 31px;
  height: 93px;
  background-image: url(~@/assets/images/shuifeiji/03scale.png);
  background-repeat: no-repeat;
}
.pot_box1 {
  left: -0.4%;
}

/* .water_top1 {
  height: 65px;
} */

.pot_box2 {
  left: 11.5%;
}

/* .water_top2 {
  height: 65px;
} */

.pot_box3 {
  left: 23.25%;
}

/* .water_top3 {
  height: 65px;
} */

.pot_box4 {
  left: 35%;
}

/* .water_top4 {
  height: 65px;
} */

.pot_box5 {
  left: 46.75%;
}

/* .water_top5 {
  height: 65px;
} */

.pot_box6 {
  left: 58.5%;
}

/* .water_top6 {
  height: 65px;
} */

.pot_box7 {
  left: 70.25%;
}

/* .water_top7 {
  height: 65px;
} */

.pot_box8 {
  left: 82%;
}

/* .water_top8 {
  height: 65px;
} */

/* 肥料桶控制开关按钮 */
.btn_s {
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 1;
  background-size: cover;
  right: 62.5px;
  top: 442px;
  position: absolute;
}

.btn_on {
  background-image: url(~@/assets/images/shuifeiji/on.png);
}

.btn_off {
  background-image: url(~@/assets/images/shuifeiji/off.png);
}

/* 注水阀 */
.zhushuiBtn {
  top: 83px;
  left: 55px;
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 1;
  background-size: cover;
}

/* 进肥阀 */
.jinfeiBtn {
  top: 142px;
  left: 24px;
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 1;
  background-size: cover;
}

/* 排水阀 */
.paishuiBtn {
  top: 324px;
  left: 85px;
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 1;
  background-size: cover;
}

.smallBtn_on {
  background-image: url(~@/assets/images/shuifeiji/small_on.png);
}

.smallBtn_off {
  background-image: url(~@/assets/images/shuifeiji/small_off.png);
}
/* 大水流 */
.water04 {
  position: absolute;
  left: 55px;
  top: 376px;
}
.pot_box1 .water04 {
  display: none !important;
}
.water05 {
  position: absolute;
  left: 26px;
  top: 276px;
}

/* 小水流 */
.smallWater-box {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.smallWater {
  position: absolute;
  display: none;
  z-index: 1;
  overflow: hidden;
}
.smallWater1 {
  top: 3px;
  left: 0;
  width: 29px;
  height: 9px;
}
.smallWater3 {
  top: 3px;
  left: 90px;
  width: 29px;
  height: 9px;
}
.smallWater5 {
  top: 3px;
  left: 190px;
  width: 29px;
  height: 9px;
}
.smallWater7 {
  top: 3px;
  left: 290px;
  width: 29px;
  height: 9px;
}
.smallWater9 {
  top: 3px;
  left: 390px;
  width: 29px;
  height: 9px;
}
.smallWater11 {
  top: 3px;
  left: 490px;
  width: 29px;
  height: 9px;
}
.smallWater13 {
  top: 3px;
  left: 590px;
  width: 29px;
  height: 9px;
}
.smallWater15 {
  top: 3px;
  left: 690px;
  width: 29px;
  height: 9px;
}
.smallWater2 {
  top: 82px;
  left: 52px;
  width: 9px;
  height: 29px;
}
.smallWater4 {
  top: 82px;
  left: 151px;
  width: 9px;
  height: 29px;
}
.smallWater6 {
  top: 82px;
  left: 247px;
  width: 9px;
  height: 29px;
}
.smallWater8 {
  top: 82px;
  left: 344px;
  width: 9px;
  height: 29px;
}
.smallWater10 {
  top: 82px;
  left: 440px;
  width: 9px;
  height: 29px;
}
.smallWater12 {
  top: 82px;
  left: 537px;
  width: 9px;
  height: 29px;
}
.smallWater14 {
  top: 82px;
  left: 632px;
  width: 9px;
  height: 29px;
}
.smallWater16 {
  top: 82px;
  left: 730px;
  width: 9px;
  height: 29px;
}
.smallWater17 {
  top: 65px;
  left: -30px;
  width: 29px;
  height: 9px;
}
.smallWater18 {
  top: 65px;
  left: 70px;
  width: 29px;
  height: 9px;
}
.smallWater19 {
  top: 65px;
  left: 170px;
  width: 29px;
  height: 9px;
}
.smallWater20 {
  top: 65px;
  left: 270px;
  width: 29px;
  height: 9px;
}
.smallWater21 {
  top: 65px;
  left: 370px;
  width: 29px;
  height: 9px;
}
.smallWater22 {
  top: 65px;
  left: 470px;
  width: 29px;
  height: 9px;
}
.smallWater23 {
  top: 65px;
  left: 570px;
  width: 29px;
  height: 9px;
}
.smallWater24 {
  top: 65px;
  left: 670px;
  width: 29px;
  height: 9px;
}
.smallWater25 {
  top: 303px;
  left: 25px;
  width: 29px;
  height: 9px;
}
.smallWater26 {
  top: 303px;
  left: 125px;
  width: 29px;
  height: 9px;
}
.smallWater27 {
  top: 303px;
  left: 225px;
  width: 29px;
  height: 9px;
}
.smallWater28 {
  top: 303px;
  left: 325px;
  width: 29px;
  height: 9px;
}
.smallWater29 {
  top: 303px;
  left: 425px;
  width: 29px;
  height: 9px;
}
.smallWater30 {
  top: 303px;
  left: 525px;
  width: 29px;
  height: 9px;
}
.smallWater31 {
  top: 303px;
  left: 625px;
  width: 29px;
  height: 9px;
}
.smallWater32 {
  top: 303px;
  left: 725px;
  width: 29px;
  height: 9px;
}

/* 小水流动画 */

* {
  -ms-user-select: none;
}

@keyframes shuiliuT {
  from {
    transform: translateY(25px);
  }

  to {
    transform: translateY(-25px);
  }
}

.shuiliuT {
  animation: shuiliuT 1s linear infinite;
}

@keyframes shuiliu_r {
  from {
    transform: translateX(-25px);
  }

  to {
    transform: translateX(25px);
  }
}

.shuiliu_r {
  animation: shuiliu_r 1s linear infinite;
}

@keyframes shuiliu_l {
  from {
    transform: translateX(25px);
  }

  to {
    transform: translateX(-25px);
  }
}

.shuiliu_l {
  animation: shuiliu_l 1s linear infinite;
}

@keyframes shuiliuB {
  from {
    transform: translateY(-25px);
  }

  to {
    transform: translateY(25px);
  }
}

.shuiliuB {
  animation: shuiliuB 1s linear infinite;
}

/* 肥桶冒泡泡 */
#burbujas {
  position: absolute;
  z-index: 3;
  width: 70px;
  height: 94px;
  top: 0;
}
#burbujas span {
  display: block;
  position: absolute;
  bottom: -12px;
  left: 33%;
  height: 0;
  width: 0;
  border: 12px solid #c8edff;
  border-radius: 3.5em;
  opacity: 0;
  transform: scale(0.2);
}
@-webkit-keyframes burbujasL {
  0% {
    -ms-transform: scale(0.2) translate(0, 0);
    -webkit-transform: scale(0.2) translate(0, 0);
    transform: scale(0.2) translate(0, 0);
  }
  10% {
    opacity: 1;
    -ms-transform: scale(0.2) translate(0, -5px);
    -webkit-transform: scale(0.2) translate(0, -5px);
    transform: scale(0.2) translate(0, -5px);
  }
  100% {
    opacity: 0;
    -ms-transform: scale(1) translate(-20px, -130px);
    -webkit-transform: scale(1) translate(-20px, -130px);
    transform: scale(1) translate(-20px, -130px);
  }
}
@keyframes burbujasL {
  0% {
    -ms-transform: scale(0.2) translate(0, 0);
    -webkit-transform: scale(0.2) translate(0, 0);
    transform: scale(0.2) translate(0, 0);
  }
  10% {
    opacity: 1;
    -ms-transform: scale(0.2) translate(0, -5px);
    -webkit-transform: scale(0.2) translate(0, -5px);
    transform: scale(0.2) translate(0, -5px);
  }
  100% {
    opacity: 0;
    -ms-transform: scale(1) translate(-20px, -130px);
    -webkit-transform: scale(1) translate(-20px, -130px);
    transform: scale(1) translate(-20px, -130px);
  }
}
@-webkit-keyframes burbujasR {
  0% {
    -ms-transform: scale(0.2) translate(0, 0);
    -webkit-transform: scale(0.2) translate(0, 0);
    transform: scale(0.2) translate(0, 0);
  }
  10% {
    opacity: 1;
    -ms-transform: scale(0.2) translate(0, -5px);
    -webkit-transform: scale(0.2) translate(0, -5px);
    transform: scale(0.2) translate(0, -5px);
  }
  100% {
    opacity: 0;
    -ms-transform: scale(1) translate(20px, -130px);
    -webkit-transform: scale(1) translate(20px, -130px);
    transform: scale(1) translate(20px, -130px);
  }
}
@keyframes burbujasR {
  0% {
    -ms-transform: scale(0.2) translate(0, 0);
    -webkit-transform: scale(0.2) translate(0, 0);
    transform: scale(0.2) translate(0, 0);
  }
  10% {
    opacity: 1;
    -ms-transform: scale(0.2) translate(0, -5px);
    -webkit-transform: scale(0.2) translate(0, -5px);
    transform: scale(0.2) translate(0, -5px);
  }
  100% {
    opacity: 0;
    -ms-transform: scale(1) translate(20px, -130px);
    -webkit-transform: scale(1) translate(20px, -130px);
    transform: scale(1) translate(20px, -130px);
  }
}
#burbujas .b0 {
  -webkit-animation: burbujasL 10s 0s infinite;
  animation: burbujasL 10s 0s infinite;
}
#burbujas .b1 {
  -webkit-animation: burbujasR 10s 1s infinite;
  animation: burbujasR 10s 1s infinite;
}
#burbujas .b2 {
  -webkit-animation: burbujasL 10s 2s infinite;
  animation: burbujasL 10s 2s infinite;
}
#burbujas .b3 {
  -webkit-animation: burbujasR 10s 3s infinite;
  animation: burbujasR 10s 3s infinite;
}
#burbujas .b4 {
  -webkit-animation: burbujasL 10s 4s infinite;
  animation: burbujasL 10s 4s infinite;
}
#burbujas .b5 {
  -webkit-animation: burbujasR 10s 5s infinite;
  animation: burbujasR 10s 5s infinite;
}
#burbujas .b6 {
  -webkit-animation: burbujasL 10s 6s infinite;
  animation: burbujasL 10s 6s infinite;
}
#burbujas .b7 {
  -webkit-animation: burbujasR 10s 7s infinite;
  animation: burbujasR 10s 7s infinite;
}
#burbujas .b8 {
  -webkit-animation: burbujasR 10s 8s infinite;
  animation: burbujasR 10s 8s infinite;
}
#burbujas .b8 {
  -webkit-animation: burbujasR 10s 9s infinite;
  animation: burbujasR 10s 9s infinite;
}

/* 饿了么组件loading修改 */
::v-deep .el-loading-spinner .el-loading-text {
    color: red;
    margin: -50px 0;
    font-size: 20px;
}
::v-deep .el-loading-spinner i {
    color: red;
    font-size: 20px;
    margin: -50px 0;
}
</style>
