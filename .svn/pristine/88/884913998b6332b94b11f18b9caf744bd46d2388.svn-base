<template>
  <el-menu
    :unique-opened="true"
    :default-active="$route.query.id || current"
  >
    <el-submenu v-for="(item, index) in getList" :index="index" :key="index">
      <template slot="title" class="title">{{ item.text }}</template>
      <el-menu-item-group>
        <el-menu-item v-for="(listData, i) in item.list" :index="listData.id" :title="listData.port" :key="i" class="list" @click="link(listData,i)">{{ listData.port }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      current: ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.help.api_list
      // currentData: state => state.help.currentData,
      // currentPath: state => state.help.currentPath
    }),
    getList() {
      if (this.list.length > 0) {
        return this.list
      } else {
        return this.MyList
      }
    }
  },
  created() {
    // this.current = this.$route.query.id
    // console.log(this.$route.path)
    this.MyList = JSON.parse(sessionStorage.getItem('MyList'))
  },
  methods: {
    link(item, i) {
      this.$router.push({
        path: `/nav`,
        query: {
          id: item.id
        }
      })
      this.$store.commit('SET_CURRENT_DATA', item)
      this.current = item.id
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .el-menu-item.is-active {
        color: #6681FA;
        background-color: #EAEEFF !important;
    }
    .list {
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .title {
        font-size: 16px;
        font-weight: 800;
    }
</style>
