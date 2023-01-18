<template>
  <canvas ref="canvas03" width="1100" height="700"></canvas>
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
        ctx.moveTo(400, 688); // 创建开始点
        ctx.lineTo(515, 688);
        ctx.arcTo(525, 688, 525, 678, 10);
        ctx.lineTo(525, 633);
        ctx.arcTo(525, 623, 535, 623, 10); //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数5：圆弧半径
        ctx.lineTo(785, 623);
        ctx.arcTo(795, 623, 795, 633, 10);
        ctx.lineTo(795, 678);
        ctx.arcTo(795, 688, 805, 688, 10);
        ctx.lineTo(1060, 688);
        ctx.arcTo(1070, 688, 1070, 678, 10);
        ctx.lineTo(1070, 30);
        ctx.arcTo(1070, 20, 1060, 20, 10);
        ctx.lineTo(70, 20);
        ctx.arcTo(60, 20, 60, 30, 10);
        ctx.lineTo(60, 290);
        ctx.arcTo(60, 300, 70, 300, 10);
        ctx.lineTo(785, 300);
        ctx.arcTo(795, 300, 795, 310, 10);
        ctx.lineTo(795, 623);
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