<template>
  <div class="info-main">
    <nav-menu/>
    <div
      :class="{'collapse':collapse}"
      class="info-content"
    >
      <post-content/>
    </div>
  </div>
</template>

<script>
import PostContent from './components/Content'
import NavMenu from '@/components/common/NavMenu'
export default {
  name: 'Post',
  components: {
    NavMenu,
    PostContent
  },
  data() {
    return {
      collapse: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.info-main
  position relative
  height 100%

.info-content
  position absolute
  left 169px
  right 0

.collapse
  left 169px
</style>

