<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive v-if="$store.state.baseinfo.cur_base_id!=''">
        <router-view
          v-if="isRouterAlive"
          :key="key"
        />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
// import WebSocket from '@/utils/MyWebSocket'
import Vue from 'vue'
// import { getToken } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath + '_' + this.$store.state.baseinfo.cur_base_id
    }
  },
  created () {
    // 
    // let ws = new WebSocket(process.env.WEBSOCKET_URL, getToken())
    // Vue.prototype.$ws = ws
    // if (!window["GLOBAL_VARIABLE"]) window["GLOBAL_VARIABLE"] = {};
    // window["GLOBAL_VARIABLE"]["WEBSOCKET"] = ws
    // this.$ws.open(this)
    // // 当浏览器界面关闭或刷新时触发该事件
    // window.addEventListener('beforeunload', e => {
    //   this.$ws.close()
    // })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.app-main {
  // z-index: 88;
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  background: #e8ecf0;
  padding: 20px;
  overflow: auto;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 85px;
  }
}
</style>
