<template>
  <div class="bg-left">
    <feiliaotong class="feiliaotongComponent"></feiliaotong>
    <zengyabeng class="zengyabengComponent"></zengyabeng>
    <guolvqi class="guolvqiComponent"></guolvqi>
    <jinshuifa class="jinshuifaComponent"></jinshuifa>
    <tiaojiefa class="tiaojiefaComponent"></tiaojiefa>
    <jiayashifeibeng class="jiayashifeibengComponent"></jiayashifeibeng>
    <famen class="famenComponent"></famen>
    <PH class="phComponent"></PH>
    <EC class="ecComponent"></EC>
    <yalichuanganqi class="yalichuanganqiComponent"></yalichuanganqi>
    <liuliangji class="liuliangjiComponent"></liuliangji>
    <diepianguolvqi class="diepianguolvqiComponent"></diepianguolvqi>
    <shuiliu class="shuiliuComponent"></shuiliu>
  </div>
</template>

<script>
import feiliaotong from "./feiliaotong.vue";
import zengyabeng from "./zengyabeng.vue";
import guolvqi from "./guolvqi.vue";
import jinshuifa from "./jinshuifa.vue";
import tiaojiefa from "./tiaojiefa.vue";
import jiayashifeibeng from "./jiayashifeibeng.vue";
import famen from "./famen.vue";
import PH from "./PH.vue";
import EC from "./EC.vue";
import yalichuanganqi from "./yalichuanganqi.vue";
import liuliangji from "./liuliangji.vue";
import diepianguolvqi from "./diepianguolvqi.vue";
import shuiliu from "./shuiliu.vue";
export default {
  components: {
    feiliaotong,
    zengyabeng,
    guolvqi,
    jinshuifa,
    tiaojiefa,
    jiayashifeibeng,
    famen,
    PH,
    EC,
    yalichuanganqi,
    liuliangji,
    diepianguolvqi,
    shuiliu,
  },
};
</script>

<style>
.bg-left {
  background: url(~@/assets/images/shuifeiji/bg-left.png) no-repeat;
  width: 1400px;
  height: 800px;
  background-size: 100% 100%;
  position: relative;
}
.feiliaotongComponent {
  position: absolute;
  top: -115px;
  left: 140px;
  z-index: 2;
}
.zengyabengComponent {
  position: absolute;
  top: 660px;
  left: 23px;
  z-index: 2;
}
.guolvqiComponent {
  position: absolute;
  top: 620px;
  left: 240px;
  z-index: 2;
}
.jinshuifaComponent {
  position: absolute;
  top: 675px;
  left: 456px;
  z-index: 2;
}
.tiaojiefaComponent {
  position: absolute;
  top: 730px;
  left: 550px;
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
.phComponent {
  position: absolute;
  top: 695px;
  left: 730px;
  z-index: 2;
}
.ecComponent {
  position: absolute;
  top: 695px;
  left: 830px;
  z-index: 2;
}
.yalichuanganqiComponent {
  position: absolute;
  top: 695px;
  left: 930px;
  z-index: 2;
}
.liuliangjiComponent {
  position: absolute;
  top: 695px;
  left: 1030px;
  z-index: 2;
}
.diepianguolvqiComponent {
  position: absolute;
  top: 635px;
  left: 1200px;
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