<template>
  <div class="machine">
    <view-iframe ref="iframe" :src="src" style="height: calc(100% + 50px)" />
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
      src: 'http://183.62.243.18:92/cas/login?username=gdsuser&password=123&remoteLogin=true&service=http://183.62.243.18:92/index.do'
    }
  },
  computed: {
    ...mapGetters(['visualToken'])
  },
  created() {
    // getDataViewToken().then(res => {
    //   this.src = 'http://183.62.243.18:92/cas/login?username=gdsuser&password=123&remoteLogin=true&service=http://183.62.243.18:92/index.do'
    //   //  this.src = process.env.VISUAL_API + '/dv/dv_visual_group.htm' + '?app_code=nyy&token=' + (res.data.token)+"&GLOBAL_nyy_bs_base_id="+this.$store.state.baseinfo.cur_base_id
    // })
  }
}
</script>
<style lang="stylus" scoped>
.machine {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  background:#FFFFFF;
	position: absolute;
	top: 20px;
	left: 20px;
  overflow: hidden;
}
.machine iframe {
  margin-top: -70px !important;
}
</style>
