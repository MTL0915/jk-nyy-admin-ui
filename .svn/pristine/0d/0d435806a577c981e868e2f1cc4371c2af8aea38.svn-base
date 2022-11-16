<template>
    <div class='vr_show' v-show="dialogVisible">
        <div class='vr_edit_vr' @click='hideVr'>退出</div>
        <iframe class='iframe_src' :src='"/vr_view?"+this.vrid'></iframe>
    </div>
</template>

<script>
import { getCameraById } from '../../vr/data/camera.js'
export default {
    data() {
      return {
        vrid : 1,
        title : "全景图",
        dialogVisible: false,
        fn : null
      };
    },
    mounted (){
        
    },
    methods: {
        show (id) {
            this.vrid = id;
            this.dialogVisible = true;
        },
        hide (){
            this.dialogVisible = false;
        },
        handleClose(done) {
            this.$confirm('确认放弃创建吗？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        queding (){
            this.hide();
            this.fn && this.fn(this.value);
        },
        hideVr (){
          this.hide();
        }
    }
};
</script>

<style>
  .vr_show {
    position: absolute;
    width: 100%;
    height: 100%;
    top : 0;
    left: 0;
    z-index: 9999;
    background: #ffffffc2;
  }
  .vr_show .iframe_src {
    width: 100%;
    height: 100%;
    border: none;
  }

  .vr_show .close {
    color:red;
    position:absolute;
    right:8px;
    width: 8px;
  }

  .vr_show .vr_edit_vr {
      position: absolute;
      top:8px;
      right: 68px;
      padding: 8px 15px;
      color: #00a1ff;
      background: #ffffff;
      border-radius: 4px;
      cursor: pointer;
    }
</style>