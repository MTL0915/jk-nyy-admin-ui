<template>
  <div class="nav-content">
    <div class="top">
      <span>组织机构</span>
    </div>
    <div class="sidebar">
      <el-tree
        ref="tree"
        :expand-on-click-node="false"
        :props="defaultProps"
        :load="loadNode"
        :render-content="renderContent"
        highlight-current
        lazy
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script>
import { findOneLevelList, findSubList, getBaseData, getFacilitiesData } from '@/api/org'
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
    renderContent(h, { node, data, store }) {
      console.log('ddd', { node, data, store })
      return (
        <span>
          <i class={data.icon}></i>
          <span>{node.label}</span>
        </span>
      )
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        findOneLevelList().then(res => {
          // bus.$emit('handelOrgBaseClick', res[0])
          res.data.content.map((v, i) => {
            if (v.baseNum === 0 && v.subNum === 0) {
              v.leaf = true
            }
          })
          return resolve(res)
        })
      } else {
        const id = node.data.id
        if (node.data.subNum === 0 && node.data.baseNum > 0) {
          getBaseData(id).then(res => {
            res.map((v, i) => {
              v.icon = 'el-icon-office-building'
              if (v.facilitiesNum === 0) {
                v.leaf = true
              }
            })
            return resolve(res)
          })
        }
        if (node.data.subNum > 0 && node.data.baseNum === 0) {
          findSubList(id).then(res => {
            res.map((v, i) => {
              if (v.subNum === 0) {
                v.leaf = true
              }
            })
            return resolve(res)
          })
        }
        if (node.data.subNum > 0 && node.data.baseNum > 0) {
          let arr = []
          Promise.all([getBaseData(id), findSubList(id)]
          ).then(res => {
            res[0].map((v, i) => {
              v.icon = 'el-icon-office-building'
            })
            arr = arr.concat(res[0])
            arr = arr.concat(res[1])
            arr.map((v, i) => {
              if (v.subNum === 0 || v.facilitiesNum === 0) {
                v.leaf = true
              }
            })
            return resolve(arr)
          })
        }
        if (node.data.facilitiesNum > 0) {
          getFacilitiesData(id).then(res => {
            res.map((v, i) => {
              v.icon = 'el-icon-tickets'
              v.leaf = true
            })
            return resolve(res)
          })
        }
      }
    },
    handleNodeClick(data) {
      bus.$emit('handelOrgBaseClick', data.node)
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

.el-tree
  font-size 14px
</style>
