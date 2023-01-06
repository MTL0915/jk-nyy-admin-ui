<template>
  <canvas ref="canvas20" width="100" height="40"></canvas>
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
        ctx.moveTo(0, 20); // 创建开始点
        ctx.lineTo(96, 20);
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
    this.canvas = this.$refs.canvas20;
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