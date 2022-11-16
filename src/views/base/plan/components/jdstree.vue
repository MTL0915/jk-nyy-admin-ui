<template>
  <div class="jdstree-app-container">
    <!-- <el-input style='z-index: 1;margin-left: 20px;width: calc(100% - 20px);color:#505050;cursor: pointer;border: none;' v-show='true' v-model="selectJD" placeholder="请输入内容" disabled @click='keys=[1]'></el-input>
        <el-tree
            style='position: absolute;width:230px;max-height: 500px;overflow-y: auto;'
            ref="tree"
            :data='data'
            :expand-on-click-node="true"
            :props="defaultProps"
            :load="loadNode"
            :render-content="renderContent"
            highlight-current
            lazy
            @node-click="handleNodeClick"
            :default-expanded-keys='keys'
        /> -->
    <el-select
      v-model="selectJD"
      filterable
      placeholder="请选择"
      @change="handleNodeClick"
    >
      <el-option
        v-for="item in datas"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { treeOrgRootNode, treeChildOrgAndBase } from '@/api/org'

export default {
  components: {},
  props: {
    jdsTreeBaseClick: Function
  },
  data () {
    return {
      deptId: null,
      baseId: null,
      userLevel: 999,
      selectJD: '',
      datas: []
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created () {
    ;
    this.getData()
  },
  methods: {
    getData () {
      // 获取最上级单位
      treeOrgRootNode().then(res => {
        res.data.map((v, i) => {
          v.label = v.name
          if (v.baseNum === 0 && v.deptNum === 0) {
            v.leaf = true
          }
        })
        this.getDatas(res.data[0])
      })
    },
    getDatas (data) {
      treeChildOrgAndBase({ org_id: data.id }).then(res => {
        res.data.map((v, i) => { // 点击展开 子组织 & 基地
          v.label = v.name
          if (v.type === 'org') { // 子组织
            this.getDatas(v)
          } else if (v.type === 'base') { // 基地
            this.datas.push(v)
          }
        })
      })
    },
    handleNodeClick (data, node) {
      // if(this.selectJD == data) return;
      this.jdsTreeBaseClick(data, node)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.role-span {
  font-weight: bold;
  color: #303133;
  font-size: 15px;
}

.jdstree-app-container .el-tree-node__content {
  padding: 20px 0;
}
.jdstree-app-container {
  display: flex;
  flex-direction: column;
  width: 230px;
  border-radius: 3px;
  overflow: hidden;
  background: #ffffff;
}

.jdstree-app-container .el-input.is-disabled .el-input__inner {
  color: #304156;
  cursor: pointer;
  // background: #304156;
  // border: none;
}

// .jdstree-app-container .el-input > input {

// }

// .jdstree-app-container .el-tree {
//   background: #304156;
// }

// .jdstree-app-container .el-tree-node__content:hover {
//   background: #304156;
// }
</style>
