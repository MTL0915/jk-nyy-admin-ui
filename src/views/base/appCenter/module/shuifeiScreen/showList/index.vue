<template>
  <div class="showbox">
    <draggable class="small-box" chosenClass="chosen" forceFallback="true" group="small" animation="1000">
    <!-- <shuju></shuju>
    <jiankong></jiankong>
    <rizhi></rizhi> -->
      <component :is="item.productSfModelType" v-for="item in allData.productSfModels" :key="item" :modelData="item.productSfModelDetails" :bs_base_id="bs_base_id" :hd_device_id="allData.hd_device_id"></component>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import sensor from './shuju.vue'
import sxt from './jiankong.vue'
import log from './rizhi.vue'

export default {
  props:["allData"],
  data(){
    return{
      bs_base_id:'',
    }
  },
  components: {
    draggable,
    sensor,
    sxt,
    log,
  },
  created(){
    // 获取当前基地id
    this.bs_base_id = this.$parent.$parent.bs_base_id
  },
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