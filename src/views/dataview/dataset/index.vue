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
    this.src = process.env.VISUAL_API + '/dv/dv_dataset/data_preview.htm' + '?app_code=nyy&token=' + this.visualToken
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
