<template>
  <div class="nav-content">
    <div class="top">
      <span>基地列表</span>
    </div>
    <div class="sidebar">
      <!--<el-tree
        ref="baseFacilitiesTree"
        :default-expanded-keys="defaultExpandBase"
        :expand-on-click-node="false"
        :props="props"
        :data="baseFacilitiesList"
        node-key="id"
        @node-click="handleNodeClick"
      />-->
      <el-tree
        ref="tree"
        :expand-on-click-node="true"
        :props="defaultProps"
        :load="loadNode"
        :render-content="renderContent"
        accordion
        highlight-current
        lazy
        @node-click="handleNodeClick" />
    </div>
  </div>
</template>

<script>
// import { getBaseFacilitiesByUserId } from '@/api/device'
import { mapGetters } from 'vuex'
import { treeOrgRootNode, treeChildOrgAndBase, treeFacilitiesIncludeSensor } from '@/api/org'
export default {
  name: 'DeviceNav',
  data() {
    return {
      props: {
        children: 'facilitiesList',
        label: 'name'
      },
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      baseFacilitiesList: [],
      defaultExpandBase: []
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    // this.getBaseFacilities()
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
          // bus.$emit('handelOrgBaseClick', res.data[0], node)
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
          treeFacilitiesIncludeSensor({ base_id: id }).then(res => {
            res.data.map((v, i) => {
              v.icon = 'el-icon-tickets'
              v.leaf = true
            })
            return resolve(res.data)
          })
        } else if (node.data.type === 'facilities') { // 节点为地块
          // 展示地块设备数据
          // this.$emit('handelDeviceClick', data.id)
        }
      }
    },
    // getBaseFacilities() {
    //   getBaseFacilitiesByUserId({ user_id: this.id }).then(res => {
    //     if (res.data.length > 0) {
    //       for (var i = 0, len = res.data.length; i < len; i++) {
    //         res.data[i].level = 1
    //       }
    //       this.baseFacilitiesList = res.data
    //       this.$nextTick(() => {
    //         var tree = this.$refs.tree

    //         this.defaultExpandBase.push(res.data[0].id)
    //         tree.setCurrentKey(res.data[0].facilitiesList[0].id)
    //         this.$emit('handelDeviceClick', res.data[0].facilitiesList[0].id)
    //       })
    //     }
    //   }).catch({})
    // },
    handleNodeClick(data) {
      if (data.type === 'facilities') {
        this.$emit('handelDeviceClick', data.id)
      }
      /* if (!data.level) {
        this.$emit('handelDeviceClick', data.id)
      }*/
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-content
  background #fff
  width 190px
  position absolute
  overflow-y auto
  height 100%

.top
  padding 10px 15px
  border-bottom 1px solid #eee

  span
    color #666
    font-size 14px

.sidebar
  overflow-y scroll

.sidebar::-webkit-scrollbar
  width 0

.el-tree
  padding-bottom 70px
</style>
