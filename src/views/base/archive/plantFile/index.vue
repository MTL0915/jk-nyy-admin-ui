<template>
  <div class="plantFileBox">
    <div style="position: absolute;top: 20px;width: calc(100% - 40px);height: 45px;padding-left:20px;padding-right: 20px;">
      <div style="float:right;margin-right: -3px;line-height: 45px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="种植管理" name="manage"></el-tab-pane>
          <!-- <el-tab-pane label="模型库" name="modelLibrary"></el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <div class="info">
      <plantManage ref="plantManage" v-show="activeName == 'manage'" />
      <modelLibrary v-show="activeName == 'modelLibrary'" />
    </div>
  </div>
</template>
<script>
import plantManage from "./plantManage";
import modelLibrary from "./modelLibrary"
export default {
  components: {
    plantManage,
    modelLibrary
  },
  activated () {
     var refresh = this.$route.query.refresh;
     if (refresh){
        this.$refs.plantManage.init();
     }
  },
  data() {
    return {
      activeName: "manage"
    }
  }
}
</script>
<style lang="stylus" scoped>
.info
  background #ffffff
  padding 10px
</style>