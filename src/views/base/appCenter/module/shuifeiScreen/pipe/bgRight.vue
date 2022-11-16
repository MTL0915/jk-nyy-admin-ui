<template>
  <div class="bg-right">
    <guangaifa @getWidth="getWidth"></guangaifa>
  </div>
</template>

<script>
import guangaifa from "./guangaifa.vue";
export default {
  components: {
    guangaifa,
  },
  methods: {
    getWidth(length) {
      var bgRight = document.getElementsByClassName("bg-right")[0];
      bgRight.style.width = 100 * length + "px";
    },
  },
};
</script>

<style>
.bg-right {
  width: 300px;
  height: 800px;
  position: relative;
}
</style>