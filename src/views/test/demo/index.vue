<template>
  <div class="box">
    <div class="box-header">
      <div class="headerContent">
        <a href="#" class="link">
          <img src="../../../assets/logo/logo3.png">
          <span>农语云</span>
        </a>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <left-nav />
      </div>
      <div class="right">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item
            v-for="(item, index) in breadList"
            :key="index"
            :to="{path: item.path}"
          >{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <v-content :bread="breadList" :list="list" :current-data="currentData" class="right-content" />
        <!-- -->
      </div>
    </div>
  </div>
</template>
<script>
import leftNav from './nav'
import vContent from './contant'
import { mapState } from 'vuex'
export default {
  components: {
    leftNav,
    vContent
  },
  data() {
    return {
      breadList: []
    }
  },
  computed: {
    ...mapState({
      list: state => state.help.api_list,
      currentData: state => state.help.currentData
    })
  },
  watch: {
    $route() {
      console.log('route ,id ==>', this.$route.query.id)
      this.getBreadrumb()
    }
  },
  created() {
    this.getBreadrumb()
  },
  mounted() {
  },
  methods: {
    isHome(route) {
      return route.path === '/nav'
    },
    getBreadrumb() {
      let matched = this.$route.matched
      // console.log(matched)

      if (!this.isHome(matched[0])) {
        matched = [{ path: '/nav' }].concat(matched)
      }
      this.breadList = matched
      console.log('breadList', this.breadList)
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .box {
        height: 100%;
        //max-height: 100%;

        box-sizing: border-box;
    }
    .box-header {
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: #e5e5e5 1px solid;
    }
    .headerContent {
        padding: 0 60px;
    }
    .link {
        display: inline-block;
        height: 60px;
        padding-top: 10px;
        font-size:20px;
        font-weight: 800;
        color:#000000a6;
        img {vertical-align: middle;}
    }
    .main {
        display: flex;
        height: 90%;
        padding: 10px;
        .left {
            flex: 0 0 240px;
            border-top: 1px solid #DFE6EC;
            border-right: 1px solid #DFE6EC;
            border-bottom: 1px solid #DFE6EC;
            overflow: auto;
        }
        .right {
            flex: 1;
            border: 1px solid #DFE6EC;
            margin-left: 10px;
            max-height: 100%;
            overflow: auto;
        }
        .breadcrumb {
            margin: 10px;
        }
        //定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
        .right::-webkit-scrollbar,.left::-webkit-scrollbar {
            background-color: #DFE6EC;
            width: 1px;
            height: 100%;
        }
        //定义滚动条轨道 内阴影+圆角
        .right::-webkit-scrollbar-track,.left::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #DFE6EC;
        }
        //定义滑块 内阴影+圆角
        .right::-webkit-scrollbar-thumb,.left::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #DFE6EC;
        }
        .right-content {
            padding: 10px;
            box-sizing: border-box;
        }
    }

</style>
