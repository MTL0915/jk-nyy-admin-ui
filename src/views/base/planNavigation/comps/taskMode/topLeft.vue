<template>
  <div class='notice'>
      <div class='noticerow1'>
          <div>
              <img :src='require("@/assets/img/Plan/planNavigation/left.png")' />
              <img :src='require("@/assets/img/Plan/planNavigation/right.png")' />
              <img :src='require("@/assets/img/Plan/planNavigation/zx.png")' />
          </div>
          <div>226米 后</div>
      </div>
      <div class='noticerow2'>
          <span>预计</span> 
          <span>15:27</span>
          <span>到达</span>
      </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .notice {
        position:fixed;
        top: 8px;
        left: 4px;
        border-radius: 4px;
        background: #000000;
        color:#ffffff;
    }
    .noticerow1 {

    }
    .noticerow2 {
        
    }
</style>