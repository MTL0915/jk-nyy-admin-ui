<template>
  <!-- 任务模式下 -->
  <div>
      <conp-topleft></conp-topleft>
      <conp-top></conp-top>
      <conp-topright></conp-topright>
  </div>
</template>

<script>
import conpTopleft from './topLeft.vue'
import compsTop from './top.vue'
import compTopright from './topRight.vue'
export default {
    components: {
        conpTopleft,
        compsTop,
        compTopright
    },
    mounted (){
        
    },
    methods: {

    }
}
</script>

<style>

</style>