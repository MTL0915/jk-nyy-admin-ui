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
    this.src = 'https://i.svrvr.com/v2/pano/#/pano/088d992578'
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
