<template>
  <!-- 水流标签 -->
  <div>
    <water01 class="water water01" where="41"></water01>
    <water02 class="water water02" where="41"></water02>
    <water03 class="water water03" where="41,45"></water03>
    <water19 class="water water19" where="41"></water19>
  </div>
</template>

<script>
import water01 from "../water/water01.vue";
import water02 from "../water/water02.vue";
import water03 from "../water/water03.vue";
import water19 from "../water/water19.vue";
export default {
  mounted() {
    // 一开始先触发
    this.tiaozhengshuiliu();
    // 事件总线，开关变化就会触发这个事件
    this.$bus.$on("waterEvent", () => {
      // 这里一定要用箭头函数
      this.tiaozhengshuiliu();
    });
  },
    beforeDestroy(){
    this.$bus.$off("waterEvent")
  },
  components: {
    water01,
    water02,
    water03,
    water19,
  },
  methods: {
    tiaozhengshuiliu() {
      // 获取所有流水
      var shuiliuBox = document.getElementsByClassName("water");
      shuiliuBox = Array.prototype.slice.apply(shuiliuBox);
      // console.log(shuiliuBox)

      // 调整水流的逻辑
      for (var i = 0; i < shuiliuBox.length; i++) {
        // 获取开着的按钮
        var openKey = this.$store.state.shuifei.openKey;
        var shuiliuItem = shuiliuBox[i];
        var where = shuiliuItem.getAttribute("where");
        if (!where) continue;
        where = where.split(",").map(Number);
        var or = shuiliuItem.getAttribute("or");
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
        var where1 = shuiliuItem.getAttribute("where1");
        if (!where1) {
          bool1 = false;
        } else {
          where1 = where1.split(",").map(Number);
          var or1 = shuiliuItem.getAttribute("or1");
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
          shuiliuItem.style.display = "block";
        } else {
          shuiliuItem.style.display = "none";
        }
      }
      // 事件总线触发灌溉阀事件
      this.$bus.$emit("guangaifaEvent");
    },
  },
};
</script>

<style scoped>
.water01 {
  position: absolute;
  left: 20px;
  top: 640px;
}
.water02 {
  position: absolute;
  left: 245px;
  top: 740px;
}
.water03 {
  position: absolute;
  left: 193px;
  top: 200px;
}
.water19 {
  position: absolute;
  left: 1175px;
  top: 769px;
}

</style>