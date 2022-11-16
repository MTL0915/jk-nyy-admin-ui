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
    this.src = 'http://i.svrvr.com/?a=wapView&id=d89598'
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
