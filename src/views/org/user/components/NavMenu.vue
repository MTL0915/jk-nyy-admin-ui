<template>
  <div class="nav-content">
    <div class="top">
      <span>组织机构</span>
      <el-button-group>
        <el-button icon="el-icon-edit-outline"/>
        <el-button icon="el-icon-arrow-down"/>
        <el-button icon="el-icon-refresh"/>
      </el-button-group>
    </div>
    <div class="sidebar">
      <el-tree
        :expand-on-click-node="false"
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script>
import { findOneLevelList, findSubList } from '@/api/org'
export default {
  name: 'InfoNav',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        findOneLevelList().then(res => {
          //
          return resolve(res.data.content)
        })
      } else {
        const id = node.data.id
        findSubList(id).then(res => {
          return resolve(res)
        })
      }
    },
    handleNodeClick(data) {
      //
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
  display flex
  align-items center
  padding 10px 15px
  border-bottom 1px solid #eee

  span
    margin-right 15px
    color #666

  .el-button
    border 0
    font-size 14px
    padding 0 5px

.sidebar
  overflow-y scroll

.sidebar::-webkit-scrollbar
  width 0
</style>
