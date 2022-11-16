<template>
  <div class="showbox">
    <draggable class="small-box" chosenClass="chosen" forceFallback="true" group="small" animation="1000">
    <shuju></shuju>
    <jiankong></jiankong>
    <rizhi></rizhi>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import shuju from './shuju.vue'
import jiankong from './jiankong.vue'
import rizhi from './rizhi.vue'

export default {
  components: {
    draggable,
    shuju,
    jiankong,
    rizhi,
  }
}
</script>

<style scoped>
.showbox {
    width: 450px;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    margin-left: 20px;
}
.small-box{
  height: 100%;
}
.chosen {
  opacity: 0;
}
</style>