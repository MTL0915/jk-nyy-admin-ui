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
    const to_way = `&to_way=` + escape(process.env.VISUAL_API + '/dv_dataset/data_preview.htm')
    const from_way = `&from_way=${escape(window.location.href)}`
    const from_to = to_way + from_way
    this.src = process.env.VISUAL_API + '/dv/dv_datasource.htm' + '?app_code=nyy&token=' + this.visualToken + from_to
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
