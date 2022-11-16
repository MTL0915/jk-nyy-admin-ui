<template>
  <div class="card">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane name="first"><span slot="label"><i class="el-icon-date"/>人员管理</span>
        <div style="text-align:right">
          <el-button
            type="success"
            size="medium"
            @click="handelAddClick"
          >添加人员</el-button>
        </div>
        <el-collapse>
          <el-collapse-item
            title="基地负责人(16人)"
            name="1"
          >
            <div class="flex">
              <div
                v-for="item in list"
                :key="item.id"
                class="list"
              >
                <img src="@/assets/img/img.jpg">
                <div class="flex list-name"><span>库存管理员</span><span>利库</span></div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="种植管理员(57人)"
            name="2"
          >
            <div class="flex">
              <div
                v-for="item in list"
                :key="item.id"
                class="list"
              >
                <img src="@/assets/img/img.jpg">
                <div class="flex list-name"><span>库存管理员</span><span>利库</span></div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="second"><span slot="label"><i class="el-icon-share"/>职位管理</span>配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    const list = []
    for (var i = 0; i < 10; i++) {
      list.push({ id: i })
    }
    return {
      activeName: 'first',
      list: list
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handelAddClick() {
      this.$router.push('/personalAdd')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()

.el-tabs >>> .el-tabs__nav
  float right

.flex
  display flex
  align-items center
  flex-flow wrap

.list
  padding 0 10px

  .list-name
    justify-content space-around
</style>
