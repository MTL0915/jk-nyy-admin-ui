<template>
  <div class="addBox">
    <myForm ref="myForm" />
  </div>
</template>
<script>
import myForm from "./form"
export default {
  components: {
    myForm
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.myForm.getAreaData()
    })
  }
}
</script>
<style lang="stylus" scoped>
.addBox
  height calc(100% - 45px)
  background #fff
  padding 10px
  overflow auto
</style>