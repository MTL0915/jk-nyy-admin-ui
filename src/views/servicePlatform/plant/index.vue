<template>
  <div class="plant">
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
  data() {
    return {
      src: 'http://219.137.27.162:8082/gdnyjstgzz/pt_zsk.action'
    }
  },
  computed: {
    ...mapGetters(['visualToken'])
  },
  created() {
    // getDataViewToken().then(res => {
    //   this.src = 'http://219.137.27.162:8082/gdnyjstgzz/pt_zsk.action'
    //   //  this.src = process.env.VISUAL_API + '/dv/dv_visual_group.htm' + '?app_code=nyy&token=' + (res.data.token)+"&GLOBAL_nyy_bs_base_id="+this.$store.state.baseinfo.cur_base_id
    // })
  }
}
</script>
<style scoped>
.plant {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  background:#FFFFFF;
	position: absolute;
	top: 20px;
	left: 20px;
  overflow: hidden;
}
.plant iframe {
  width: 100%;
  height: 100%;
}
</style>
