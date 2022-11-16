<template>
    <div class="jdstree-app-container">
        <el-input style='z-index: 1;margin-left: 20px;width: calc(100% - 20px);color:#505050;cursor: pointer;border: none;' v-show='true' v-model="selectJD" placeholder="请输入内容" disabled @click='keys=[1]'></el-input>
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
        />
        <!-- <el-form-item v-if="canEdit" style="margin-bottom: 0px;" label="上级部门">
            <treeselect 
                :options="options"
                :load-options="loadOptions"
                placeholder="Try expanding any folder option... "
                v-model="value" />
        </el-form-item> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editPermission, editMenu, get, getLevelNum } from '@/api/role'
import { treeOrgRootNode, treeChildOrgAndBase } from '@/api/org'
export default {
  components: { },
  props: {
      jdsTreeOrgClick : Function,
      jdsTreeBaseClick : Function 
  },
  data() {
    return {
      deptId: null,
      baseId: null,
      userLevel: 999,
      show : {
          tree : false,
      },
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf',
        id : "id",
      },
      currentId: 0, permissionLoading: false, menuLoading: false, showButton: false, opt: '菜单分配',
      delLoading: false, sup_this: this, permissions: [], permissionIds: [], menus: [], menuIds: [],
      selectJD : null,
      keys : [],
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created() {

  },
  methods: {
    renderContent(h, {
      node,
      data,
      store
    }) {
      console.log('ddd', {
        node,
        data,
        store
      })
      return (
        <span>
          <i class={data.icon}></i>
          <span>{node.label}</span>
        </span>
      )
    },
    handleNodeClick(data, node) {
        if (data.type === 'org') {
            this.jdsTreeOrgClick(data, node);
        } else if (data.type === 'base') {
            this.jdsTreeBaseClick(data, node);
            this.selectJD = data.name;
        }else {

        }
        this.$refs.tree.$children[0].node.data.name = data.name;
    },
    loadNode(node, resolve) {
        
      if (node.level === 0) {
        treeOrgRootNode().then(res => {
            res.data.map((v, i) => {
                v.label = v.name
                if (v.baseNum === 0 && v.deptNum === 0) {
                v.leaf = true
                }
            })
            setTimeout(()=>{
                
                this.keys.push(res.data[0].id);
            },500)
            return resolve(res.data)
        })
      } else {
        const id = node.data.id
        if (node.data.type === 'org') { // 节点为组织
          treeChildOrgAndBase({ org_id: id }).then(res => {
            res.data.map((v, i) => { // 点击展开 子组织 & 基地
              v.label = v.name
              if (v.type === 'org') { // 子组织
                if (v.baseNum === 0 && v.deptNum === 0) {
                  v.leaf = true
                }
              } else if (v.type === 'base') { // 基地
                v.label = v.name
                v.icon = 'el-icon-sort-down'
                v.leaf = true
              }
            })
            return resolve(res.data)
          })
        }
      }
    },

    loadOptions({ action, parentNode, callback }) {
        // Typically, do the AJAX stuff here.
        // Once the server has responded,
        // assign children options to the parent node & call the callback.
        
        if (action === "") {
            switch (parentNode.id) {
            case 'success': {
            simulateAsyncOperation(() => {
                parentNode.children = [ {
                id: 'child',
                label: 'Child option',
                } ]
                callback()
            })
            break
            }
            case 'no-children': {
            simulateAsyncOperation(() => {
                parentNode.children = []
                callback()
            })
            break
            }
            case 'failure': {
            simulateAsyncOperation(() => {
                callback(new Error('Failed to load options: network error.'))
            })
            break
            }
            default: /* empty */
            }
        }
        },
    },

    
  
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
