<template>
  <div class="view_content">
    <view-iframe :src="src" />
  </div>
</template>

<script>
import ViewIframe from '@/components/iframe/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    ViewIframe
  },
  data() {
    return {
      src: ''
    }
  },
  computed: {
    ...mapGetters(['visualToken'])
  },
  created() {
    // this.src = 'http://183.62.243.20:8002/gdcyy/index/dashboard.htm?areaCode2=441283&name=高要区&type=xian'
    // this.src = 'http://127.0.0.1:8085/gdcyy/index/dashboard.htm?areaCode2=441283&name=高要区&type=xian'
    // this.src = 'http://127.0.0.1:8085/gdcyy/login3.jsp?_zz_token=2429E57468FCE6A2AB5B63B81017F9C373BFB8876E25804466F926CBB1CEB1D71D35B0842E0BEF2648A831899C4C8E7D'
    this.src = 'http://183.62.243.20:8002/gdcyy/login3.jsp?_zz_token=2429E57468FCE6A2AB5B63B81017F9C373BFB8876E25804466F926CBB1CEB1D71D35B0842E0BEF2648A831899C4C8E7D'
  }
}
</script>

<style scoped>
.view_content {
  width: 100%;
  height: 100%;
}
.view_content iframe {
  width: 100%;
  height: 100%;
}
</style>
