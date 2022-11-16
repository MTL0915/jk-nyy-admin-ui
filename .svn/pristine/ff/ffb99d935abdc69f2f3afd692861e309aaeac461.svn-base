<template>
  <div class="nav-content">
    <div class="top">
      <span>组织机构</span>
    </div>
    <!-- <el-button
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-more"
        @click="expand"
      >{{ isexpand ? '折叠' : '展开' }}</el-button> -->

    <div class="sidebar" style="max-height:calc(100% - 40px);overflow-y:auto">
      <el-tree
        ref="tree"
        :expand-on-click-node="true"
        :props="defaultProps"
        :load="loadNode"
        :render-content="renderContent"
        highlight-current
        accordion
        lazy
        @node-click="handleNodeClick" />
    </div>
  </div>
</template>

<script>
import { treeOrgRootNode, treeChildOrgAndBase, treeFacilities } from '@/api/org'
import bus from '@/components/common/bus'
export default {
  name: 'InfoNav',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      isexpand: false
    }
  },
  methods: {
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

    loadNode(node, resolve) {
      if (node.level === 0) {
        treeOrgRootNode().then(res => {
          res.data.map((v, i) => {
            if (v.baseNum === 0 && v.deptNum === 0) {
              v.leaf = true
            }
          })
          bus.$emit('handelOrgBaseClick', res.data[0], node)
          return resolve(res.data)
        })
      } else {
        const id = node.data.id
        if (node.data.type === 'org') { // 节点为组织
          treeChildOrgAndBase({ org_id: id }).then(res => {
            res.data.map((v, i) => { // 点击展开 子组织 & 基地
              if (v.type === 'org') { // 子组织
                if (v.baseNum === 0 && v.deptNum === 0) {
                  v.leaf = true
                }
              } else if (v.type === 'base') { // 基地
                v.icon = 'el-icon-sort-down'
                if (v.facilitiesNum === 0) {
                  v.leaf = true
                }
              }
            })
            return resolve(res.data)
          })
        } else if (node.data.type === 'base') { // 节点为基地
          treeFacilities({ base_id: id }).then(res => {
            res.data.map((v, i) => {
              v.icon = 'el-icon-tickets'
              v.leaf = true
            })
            return resolve(res.data)
          })
        } else if (node.data.type === 'facilities') { // 节点为地块
          // 展示地块设备数据
        }
      }
    },
    handleNodeClick(data, node) {
      bus.$emit('handelOrgBaseClick', data, node)
    },
    expand() {
      this.isexpand = !this.isexpand
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.isexpand
        }
      })
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

	.el-button
		border 0
		font-size 14px
		padding 0 5px

	.sidebar
		overflow-y scroll

	.sidebar::-webkit-scrollbar
		width 0

	.el-tree
		font-size 14px
</style>
