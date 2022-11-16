<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div v-show="title.length > 5">
      <div style="height:50px;">
        <navbar :title="title" :img="img" ref="navbar" />
      </div>
      <div style="height:calc(100% - 50px)">
        <sidebar class="sidebar-container" style="top:50px;height:calc(100% - 50px)" />
        <div
          :class="{hasTagsView:needTagsView}"
          class="main-container"
        >
          <app-main v-if="user.orgId && title.length > 5" />
          <applyBase v-else />
          <right-panel>
            <settings />
          </right-panel>
        </div>
      </div>
    </div>

    <div v-show="title.length <=5">
      <sidebar class="sidebar-container" />
      <div
        :class="{hasTagsView:needTagsView}"
        class="main-container"
      >
        <div :class="{'fixed-header':fixedHeader}">
          <navbar :title="title" :img="img" ref="navbar1" />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main v-if="user.orgId && title.length <=5" />
        <applyBase v-else />
        <right-panel>
          <settings />
        </right-panel>
      </div>
    </div>


  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'
import applyBase from '@/views/register/applyBase'
import logoTitle from '@/mixins/logoTitle'
import bus from "@/components/common/bus.js";

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Settings,
    Sidebar,
    TagsView,
    RightPanel,
    applyBase
  },
  mixins: [ResizeMixin, logoTitle],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'id',
      'token',
      'user',
      'baseInfo'
    ])
  },
  data() {
    return {
      title: '农语云'
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  },
  // created() {
  //   this.getTitle();
  // },
  watch: {
    baseInfo() {
      this.getTitle();
    },
    title() {
      if (this.title.length > 5) {
        this.$nextTick(() => {
          this.$refs.navbar.getBaseList()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.navbar1.getBaseList()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
// .sidebar-container1 {
//   transition: width 0.28s;
//   width: 180px !important;
//   height: 100%;
//   position: fixed;
//   font-size: 0px;
//   top: 60px;
//   bottom: 0;
//   left: 0;
//   z-index: 1001;
//   overflow: hidden;
// }
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  background: #ffffff;
  z-index: 99;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSidebarWidth});
}

.mobile .fixed-header {
  width: 100%;
}
</style>
