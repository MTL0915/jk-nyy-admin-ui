<template>
  <canvas ref="canvas04" width="40" height="300"></canvas>
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
        ctx.moveTo(25, 290)
        ctx.arcTo(20, 290, 20, 285, 5);
        ctx.lineTo(20, 20);
        ctx.arcTo(20, 10, 30, 10, 5);
        ctx.setLineDash([20, 20]); // [实线长度, 间隙长度]
        ctx.stroke();
        ctx.clearRect(0, 159, 30, 60);   // 变成隐藏
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
    this.canvas = this.$refs.canvas04;
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