<template>
  <div class="view_content">
    <view-iframe :src="src" />
  </div>
</template>

<script>
import ViewIframe from '@/components/iframe/index'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getDataViewToken } from '@/api/login'
export default {
  components: {
    ViewIframe
  },
  data () {
    return {
      src: ''
    }
  },
  computed: {
    ...mapGetters(['visualToken'])
  },
  created () {
    getDataViewToken().then(res => {
      this.src = process.env.VISUAL_API + '/dv/dv_visual_group.htm' + '?app_code=nyy&token=' + (res.data.token) + "&GLOBAL_nyy_bs_base_id=" + this.$store.state.baseinfo.cur_base_id;
    })
  }
}
</script>

<style scoped>
.view_content {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  background: #ffffff;
  position: absolute;
  top: 20px;
  left: 20px;
}
.view_content iframe {
  width: 100%;
  height: 100%;
}
</style>
