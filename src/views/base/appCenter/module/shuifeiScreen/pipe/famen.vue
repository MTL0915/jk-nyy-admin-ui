<template>
  <div class="famen"> 
    <div class="device-bg">
      <!-- <i @click="btnClick()" ref="btn" code="13" class="btn_s" :class="[btnStatus?'btn_on':'btn_off']"></i> -->
    </div>
    <div class="device-name">单向阀</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.famen {
  display: flex;
  width: 56px;
  height: 63px;
  justify-content: space-between;
}
.famen .device-name {
  writing-mode: tb-rl;
  text-align: center;
}
.famen .device-bg {
  background: url(~@/assets/images/shuifeiji/阀门.png) no-repeat;
  width: 51px;
  height: 63px;
  background-size: 100% 100%;
  position: relative;
}
.btn_s {
	width: 25px;
	height: 25px;
	cursor: pointer;
	z-index:1;
	background-size: cover;
  position: absolute;
  top: 50%;
  margin-top: -12.5px;
  left: 32%;
}
.btn_on {
	background-image: url(~@/assets/images/shuifeiji/on.png);
}
.btn_off {
	background-image: url(~@/assets/images/shuifeiji/off.png);
}
</style>
