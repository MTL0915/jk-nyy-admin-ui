<template>
  <div class="bg-left">
    <feiliaotong class="feiliaotongComponent"></feiliaotong>
    <zengyabeng class="zengyabengComponent"></zengyabeng>
    <guolvqi class="guolvqiComponent"></guolvqi>
    <diepianguolvqi class="diepianguolvqiComponent"></diepianguolvqi>
    <tiaojiefa class="tiaojiefaComponent"></tiaojiefa>
    <PH class="phComponent"></PH>
    <EC class="ecComponent"></EC>
    <PH2 class="phComponent2"></PH2>
    <EC2 class="ecComponent2"></EC2>
    <zengyabeng2 class="zengyabengComponent2"></zengyabeng2>
    <kongzhitai class="kongzhitai"></kongzhitai>
    <hunhetong class="hunhetong"></hunhetong>
    <guangzhao class="guangzhao"></guangzhao>
    <liuliangji class="liuliangjiComponent"></liuliangji>
    <shuiliu class="shuiliuComponent"></shuiliu> 
    <!-- <jinshuifa class="jinshuifaComponent"></jinshuifa>
    <tiaojiefa class="tiaojiefaComponent"></tiaojiefa>
    <jiayashifeibeng class="jiayashifeibengComponent"></jiayashifeibeng>
    <famen class="famenComponent"></famen>
    <PH class="phComponent"></PH>
    <EC class="ecComponent"></EC>
    <yalichuanganqi class="yalichuanganqiComponent"></yalichuanganqi>
    <liuliangji class="liuliangjiComponent"></liuliangji>
    <diepianguolvqi class="diepianguolvqiComponent"></diepianguolvqi>
    <shuiliu class="shuiliuComponent"></shuiliu> -->
  </div>
</template>

<script>
import feiliaotong from "./feiliaotong.vue";
import zengyabeng from "./zengyabeng.vue";
import guolvqi from "./guolvqi.vue";
import diepianguolvqi from "./diepianguolvqi.vue";
import tiaojiefa from "./tiaojiefa.vue";
import PH from "./PH.vue";
import EC from "./EC.vue";
import PH2 from "./PH.vue";
import EC2 from "./EC.vue";
import zengyabeng2 from "./zengyabeng2.vue";
import kongzhitai from "./kongzhitai.vue";
import hunhetong from "./hunhetong.vue";
import guangzhao from "./guangzhao.vue";
import liuliangji from "./liuliangji.vue";
import shuiliu from "./shuiliu.vue";
// import jinshuifa from "./jinshuifa.vue";
// import jiayashifeibeng from "./jiayashifeibeng.vue";
// import famen from "./famen.vue";

// import yalichuanganqi from "./yalichuanganqi.vue";

export default {
  components: {
    feiliaotong,
    zengyabeng,
    guolvqi,
    diepianguolvqi,
    tiaojiefa,
    // jinshuifa,
    // jiayashifeibeng,
    // famen,
    PH,
    EC,
    PH2,
    EC2,
    zengyabeng2,
    kongzhitai,
    hunhetong,
    guangzhao,
    liuliangji,
    // yalichuanganqi,
    // diepianguolvqi,
    shuiliu,
  },
};
</script>

<style scoped>
.bg-left {
  background: url(~@/assets/images/shuifeiji/bg-left-zaixian.png) no-repeat;
  width: 1400px;
  height: 800px;
  background-size: 100% 100%;
  position: relative;
}
.feiliaotongComponent {
  position: absolute;
  top: -216px;
  left: 30px;
  z-index: 2;
}
.zengyabengComponent {
  position: absolute;
  top: 660px;
  left: 25px;
  z-index: 2;
}
.guolvqiComponent {
  position: absolute;
  top: 620px;
  left: 210px;
  z-index: 2;
}
.diepianguolvqiComponent {
  position: absolute;
  top: 620px;
  left: 420px;
  z-index: 2;
}
.tiaojiefaComponent {
  position: absolute;
  top: 662px;
  left: 610px;
  z-index: 2;
}
.phComponent {
  position: absolute;
  top: 321px;
  left: 880px;
  z-index: 2;
}
.ecComponent {
  position: absolute;
  top: 321px;
  left: 990px;
  z-index: 2;
}
.phComponent2 {
  position: absolute;
  top: 457px;
  left: 880px;
  z-index: 2;
}
.ecComponent2 {
  position: absolute;
  top: 457px;
  left: 990px;
  z-index: 2;
}
.zengyabengComponent2 {
  position: absolute;
  top: 660px;
  left: 905px;
  z-index: 2;
}
.kongzhitai {
  position: absolute;
  top: 672px;
  left: 975px;
  z-index: 2;
}
.hunhetong {
  position: absolute;
  top: 644px;
  left: 784px;
  z-index: 2;
}
.guangzhao {
  position: absolute;
  top: -110px;
  left: 984px;
  z-index: 2;
}
.liuliangjiComponent {
  position: absolute;
  top: 695px;
  left: 1200px;
  z-index: 2;
}
.jinshuifaComponent {
  position: absolute;
  top: 675px;
  left: 456px;
  z-index: 2;
}
.jiayashifeibengComponent {
  position: absolute;
  top: 290px;
  left: 1011px;
  z-index: 2;
}
.famenComponent {
  position: absolute;
  top: 520px;
  left: 1002px;
  z-index: 2;
}

.yalichuanganqiComponent {
  position: absolute;
  top: 695px;
  left: 930px;
  z-index: 2;
}

.shuiliuComponent {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>