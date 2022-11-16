<template>
  <canvas ref="canvas03" width="850" height="600"></canvas>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      canvas: '',
      ctx: ''
    };
  },
  methods: {
    draw() {
      var ctx = this.ctx
      if(ctx){
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "#109ffa";
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.moveTo(276, 588); // 创建开始点
        ctx.arcTo(281, 588, 281, 583, 5);
        ctx.lineTo(281, 435);
        ctx.arcTo(281, 425, 291, 425, 10); //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数5：圆弧半径
        ctx.lineTo(710, 425);
        ctx.arcTo(720, 425, 720, 415, 10);
        ctx.lineTo(720, 312);
        ctx.arcTo(720, 302, 710, 302, 10);
        ctx.lineTo(30, 302);
        ctx.arcTo(20, 302, 20, 292, 10);
        ctx.lineTo(20, 30);
        ctx.arcTo(20, 20, 30, 20, 10);
        ctx.lineTo(823, 20);
        ctx.arcTo(833, 20, 833, 30, 10);
        ctx.lineTo(833, 462);
        ctx.arcTo(833, 472, 823, 472, 10);
        ctx.lineTo(496, 472);
        ctx.arcTo(486, 472, 486, 482, 10);
        ctx.lineTo(486, 583);
        ctx.arcTo(486, 588, 491, 588, 5);
        ctx.setLineDash([20, 20]); // [实线长度, 间隙长度]
        ctx.stroke();
        ctx.lineDashOffset = -this.offset;
      }
    },
    march() {
      this.offset++;
      if (this.offset > 200) {
        this.offset = 0;
      }
      this.draw();
      setTimeout(this.march, 10);
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas03;
    this.ctx = this.canvas.getContext("2d")
    this.march();
  },
  beforeDestroy() {
    clearTimeout(this.march);
    if(this.canvas){
      this.canvas.remove();
      this.ctx = null;
      this.canvas = null;
    }
  },
};
</script>

<style scoped></style>