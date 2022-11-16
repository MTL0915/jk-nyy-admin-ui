<template>
  <div>
    <nav-menu @handleClick="handelClick" />
    <div class="data-content">
      <data-content ref="content" />
    </div>
  </div>
</template>

<script>
import NavMenu from './module/NavMenu'
import DataContent from './module/Content'
export default {
  name: 'Equip',
  components: {
    NavMenu,
    DataContent
  },
  methods: {
    handelClick(label) {
      this.$refs.content.chooseChart(label)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-content{
  position:absolute;
  left:150px;
	right: 20px;
	overflow: auto;
	background: #FFFFFF;
	height: calc(100% - 100px);
}
</style>
