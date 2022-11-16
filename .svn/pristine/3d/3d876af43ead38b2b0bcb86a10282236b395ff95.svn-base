<template>
  <div class="nav-content">
    <div class="top">
      <span>组织机构</span>
      <!-- <el-button-group>
        <el-button icon="el-icon-edit-outline"></el-button>
        <el-button icon="el-icon-arrow-down"></el-button>
        <el-button icon="el-icon-refresh"></el-button>
      </el-button-group> -->
    </div>
    <div class="sidebar">
      <!--<el-tree
        :expand-on-click-node="false"
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
      />-->
      <el-tree
        ref="tree"
        :data="depts"
        :expand-on-click-node="true"
        :render-content="renderContent"
        highlight-current
        accordion
        @node-click="handleNodeClick" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bus from '@/components/common/bus'
import { getDepts } from '@/api/dept'
export default {
  name: 'InfoNav2',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      depts: []
    }
  },
  created() {
    this.getDepts()
  },

  methods: {
    ...mapActions('baseinfo', ['setOrgId', 'setOrgName']),
    renderContent(h, {
      node,
      data,
      store
    }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span>{node.label}</span>
        </span>
      )
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.data.content
      })
    },
    handleNodeClick(data) {
      bus.$emit('upDateInfoList', data.id)
      this.setOrgId(data.id)
      this.setOrgName(data.name)
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-content
  position absolute
  left 0
  top 0
  bottom 0
  background #fff
  width 163px

.top
  padding 10px 15px
  border-bottom 1px solid #eee

  span
    color #666
    font-size 14px

  .el-button
    border 0
    font-size 14px
    padding 0 5px

.sidebar
  overflow-y scroll

.sidebar::-webkit-scrollbar
  width 0
</style>
