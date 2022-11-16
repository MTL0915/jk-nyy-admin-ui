<template>
  <div class="nav-content">
    <div class="sidebar">
      <el-tree
        :data="treeData"
        @node-click="handleNodeClick"
        node-key="id"
        :current-node-key="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceNav",
  data () {
    return {
      // treeData: [{
      //   id: 1,
      //   label: '实时曲线'
      // }, {
      //   id: 2,
      //   label: '日均曲线'
      // }, {
      //   id: 3,
      //   label: '历史曲线'
      // },{
      //   id: 4,
      //   label: '数据监控'
      // }, {
      //   id: 5,
      //   label: '设备运行时长'
      // }, {
      //   id: 6,
      //   label: '导出数据'
      // }]
      treeData: [
        {
          id: 1,
          label: "数据监控"
        },
        {
          id: 2,
          label: "设备运行时长"
        },
        // {
        //   id: 3,
        //   label: "摄像头流量"
        // }
        // , {
        //   id: 3,
        //   label: '能耗统计'
        // }
        // , {
        //   id: 3,
        //   label: '导出数据'
        // }
      ]
    };
  },
  created: function () {
    this.$nextTick(() => {
      this.$emit("handleClick", "数据监控");
    });
  },
  methods: {
    handleNodeClick (data) {
      this.$emit("handleClick", data.label);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-content {
  border-right: 1px solid #80808029;
  width: 130px;
  height: calc(100% - 100px);
  background: #ffffff;
  position: absolute;
}
.top {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}
span {
  color: #666;
  font-size: 14px;
}
.sidebar {
  overflow: auto;
  height: calc(100vh - 117px);
}
.el-tree-node > .el-tree-node__children {
  overflow: inherit;
}
</style>
