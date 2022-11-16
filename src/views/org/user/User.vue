<template>
  <div class="user-main">
    <nav-menu/>
    <div
      :class="{'collapse':collapse}"
      class="info-content"
    >
      <info-content/>
    </div>
  </div>
</template>

<script>
// import NavMenu from '../common/NavMenu'
import NavMenu from './components/NavMenu'
import InfoContent from './components/Content'
export default {
  name: 'User',
  components: {
    NavMenu,
    InfoContent
  },
  data() {
    return {
      collapse: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-main
  position relative
  height 100%

.info-content
  position absolute
  left 169px
  right 0

.collapse
  left 169px
</style>

