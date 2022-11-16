<template>
  <div class="guangaifa">
    <!--操作装置等待-->
    <loading ref="loading" />
    <ul class="pg_valve" v-for="(item, ulIndex) in sixResult" :key="ulIndex">
      <li v-for="(liItem, liIndex) in item" :key="liItem.hd_device_sensor_id">
        <span
          class="valve_icon"
          ref="iconBtn"
          @click="
            btnClick(
              $event,
              ulIndex,
              liIndex,
              liItem.hd_device_sensor_id,
              liItem.value
            )
          "
          :code="`${liItem.channel}`"
          :class="[liItem.value ? 'btn_on' : 'btn_off']"
        ></span>
        <a>{{ liItem.name }}</a>
        <div
          class="penshui1"
          :where="`41,45,42,${liItem.channel}`"
          or="9,10,11,12,13,14,15,16"
          :where1="`41,${liItem.channel}`"
          style="display: none"
        ></div>
      </li>
      <water20 class="water water20" where="41"></water20>
      <water21 class="water water21" where="41"></water21>
    </ul>
  </div>
</template>

<script>
import { openOrCloseChannel } from "@/utils/websocket_util.js";
import loading from "../loading";
import water20 from "../water/water20.vue";
import water21 from "../water/water21.vue";
export default {
  components: {
    loading,
    water20,
    water21
  },
  data() {
    return {
      // 处理后的灌溉阀数组，六个一组
      sixResult: [],
    };
  },
  mounted() {
    // 绑定事件总线，调整灌溉阀喷水器（事件在shuiliu组件中触发）
    this.$bus.$on("guangaifaEvent", () => {
      // 这里一定要用箭头函数
      this.tiaozhengguangaifa();
    });
  },
  beforeDestroy(){
    this.$bus.$off("guangaifaEvent")
  },
  computed: {
    // 这里是拿到VueX的装置数组数据
    shebeiArr() {
      return this.$store.state.shuifei.pkArr;
    },
  },
  watch: {
    shebeiArr(shebeiArr) {
      var guangaifaArr = [];
      // 过滤出喷灌阀的数组
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("灌溉阀") != -1) {
          guangaifaArr.push(shebeiArr[i]);
        }
      }
      // console.log(guangaifaArr)
      // 每六个一组
      this.sixResult = [];
      for (var i = 0; i < guangaifaArr.length; i += 6) {
        this.sixResult.push(guangaifaArr.slice(i, i + 6));
      }
      // console.log(this.sixResult);
      // 子向父传值，告诉父有数组有多少个数据,从而控制宽度
      this.$emit("getWidth", this.sixResult.length);
    },
    sixResult() {
      // DOM还没更新
      this.$nextTick(function () {
        // DOM更新了,现在数据已经渲染完毕,通过事件总线调用shuiliu组件的waterEvent
        this.$bus.$emit("waterEvent");
      });
    },
  },
  methods: {
    // 控制按钮开关
    btnClick(e, ulIndex, liIndex, id, value) {
      var targetBtn = e.currentTarget;
      // 获取属性code
      let code = targetBtn.getAttribute("code");
      // 转变成数字
      code = Number(code);
      // 获取目前开关的情况，根据情况切换，并保存到vuex里
      const index = this.$store.state.shuifei.openKey.indexOf(code);

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.sixResult[ulIndex][liIndex].value = newValue;
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
          this.sixResult[ulIndex][liIndex].value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });

      this.tiaozhengguangaifa();
    },
    tiaozhengguangaifa() {
      // 所有的噴水器
      var penshui = document.getElementsByClassName("penshui1");
      var penshuiBox = Array.prototype.slice.apply(penshui);
      // console.log(penshuiBox)
      for (var i = 0; i < penshuiBox.length; i++) {
        // 获取开着的按钮
        var openKey = this.$store.state.shuifei.openKey;
        var penshuiItem = penshuiBox[i];
        var where = penshuiItem.getAttribute("where");
        if (!where) continue;
        where = where.split(",").map(Number);
        var or = penshuiItem.getAttribute("or");
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

        var bool1 = true;
        var where1 = penshuiItem.getAttribute("where1");
        if (!where1) {
          bool1 = false;
        } else {
          where1 = where1.split(",").map(Number);
          var or1 = penshuiItem.getAttribute("or1");
          if (or1) or1 = or1.split(",").map(Number);
          for (var ii in where1) {
            if (openKey.indexOf(where1[ii]) === -1) {
              bool1 = false;
              break;
            }
          }
          if (or1 && bool1) {
            bool1 = false;
            for (var ii in or1) {
              if (openKey.indexOf(or1[ii]) !== -1) {
                bool1 = true;
                break;
              }
            }
          }
        }

        if (bool || bool1) {
          penshuiItem.style.display = "block";
        } else {
          penshuiItem.style.display = "none";
        }
      }
    },
  },
};
</script>

<style scoped>
.guangaifa {
  width: 100%;
  height: 100%;
}
.pg_valve {
  float: left;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  box-sizing: border-box;
  padding-bottom: 100px;
  padding-top: 60px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100px;
  background-image: url(~@/assets/images/shuifeiji/5-a.png);
  position: relative;
}
.pg_valve:last-child {
  background-image: url(~@/assets/images/shuifeiji/5-b.png);
}

.pg_valve li {
  /* overflow: hidden; */
  margin: 22px 0;
  height: 60px;
  position: relative;
  padding-left: 27px;
  box-sizing: border-box;
  z-index: 1;
  list-style: none;
}

/* .pg_valve1 li {
	overflow: hidden;
	margin-bottom: 15px;
	height: 60px;
	position: relative;
    padding-left: 36%;
    box-sizing: border-box;
} */

.pg_valve li * {
  float: left;
  clear: left;
}

.valve_icon {
  width: 48px;
  height: 30px;
  /* background-image: url(~@/assets/images/shuifeiji/电磁阀.png); */
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.btn_on {
  background-image: url(~@/assets/images/shuifeiji/电磁阀on.png);
}

.btn_off {
  background-image: url(~@/assets/images/shuifeiji/电磁阀off.png);
}

.pg_valve li a {
  margin-left: 12px;
  color: #7a8399;
}

.margin_left {
  /* margin-left: 39px; */
}

/* .pg_valve3 .valve_icon {
	background-image: url(../assets/images/shuifei/05-2valve_off.png);
}

.pg_valve4 .valve_icon {
	background-image: url(../assets/images/shuifei/05-3valve_no.png);
} */
.penshui1 {
  /* left: calc(100% - 9px); */
  left: 72px;
  top: 0;
  width: 19px;
  height: 35px;
  background: url(~@/assets/images/shuifeiji/penshui.png);
  /* transform: rotateZ(90deg); */
  background-position: 0px 0px;
  background-repeat: no-repeat;
  animation: penshuiAnimate 1.5s infinite linear;
  position: absolute;
  display: none;
}
@keyframes penshuiAnimate {
  from {
    background-position: -32px 0px;
  }
  to {
    background-position: 0px 0px;
  }
}

/* 水流 */
.water20{
  position: absolute;
  top:769px;
}
.water21{
  position: absolute;
  top:70px;
  left: 2px;
}
</style>