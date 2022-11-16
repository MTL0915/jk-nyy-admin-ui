<template>
  <!-- 用的地块信息页面展示地块位置 -->
  <JKMap :load='init'></JKMap>
</template>

<script>
// import EchartsLayer from './EchartsLayer'
import api from "@/api/map";
export default {
    props: {
        dkId: {
            type: String,
            default: ""
        }
    },
    mounted (){
        this.init();
    },
    methods: {
        init(map){
            this.getDk();
        },

        // 获取地块数据
        getDk (){
            api.getFacilitiesByid(dkId,(e)=>{
            })
        }
    }
}
</script>

<style>

</style>

