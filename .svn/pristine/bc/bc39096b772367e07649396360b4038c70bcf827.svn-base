<template>
  <div
    class='testList'
    v-show='isShow'
  >
    <div class='testListHead'>
      <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
      <span style='font-size:14px;margin-left:4px;'>作业任务</span>
      <!-- <span class='iconTaskRecord cur'>记录任务</span> -->
      <span
        class='iconTaskRecord cur'
        @click='shijiaoMode'
      >示教模式</span>
      <span
        @click='addTask'
        class=' addtest cur'
      >新增</span>
      <!-- <i
        title='新增任务'
        @click='addTask'
        class='el-icon-plus addtest cur'
      ></i> -->
    </div>
    <div class='testListBody'>
      <div
        class='testListModel rows go'
        @click='showInfo(it)'
        v-for="(it, i) in task"
        :key='i'
      >
        <div :style='"color:"+it.color'>{{it.name}}</div>
        <div
          v-if='it.status !== 2 && it.status !== 1'
          style='color:#ffff00'
        >等待作业</div>
        <div v-if='it.status === 1'>正在进行</div>
        <div
          v-if='it.status === 2'
          style='color:#ff0000'
        >
          <span
            class='contiune'
            @click.stop='contiuneTask(it)'
          >继续</span>
          作业停止
        </div>
      </div>
      <div
        class='testListModel rows'
        v-show='task && task.length === 0'
      >
        <div>暂无作业</div>
        <div
          class='addTask'
          @click='addTask'
        >新增作业</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRouteJob_ } from '../../../data/data'
import bus from '../../../util/bus'
import ws from '../../../websocket/py_ws'
export default {
  props: {

  },
  data () {
    return {
      task: [],
      isShow: true
    }
  },

  watch: {

  },

  created () {

  },
  mounted () {
    this.refreshList()
    this.createWebsocket();
    bus.$on("taskList_show", () => { this.isShow = true; });
    bus.$on("taskList_hide", () => { this.isShow = false; });
    bus.$on("taskList_refresh", () => { this.refreshList() });
    bus.$on("taskList_switchMode", () => { this.isShow = true; this.refreshList(); })
  },
  destroyed () {

  },
  // mounted (){
  // 延迟刷新任务状态
  // this.timerRefresh();
  // },

  methods: {

    /* 开始建立websocket链接 */
    createWebsocket () {
      // 创建ws的实例化对象
      this.ws = ws.get();
    },

    addTask () {
      // 隐藏自己
      this.isShow = false;
      // 显示新增列表
      bus.$emit("taskAdd_show");
    },

    showInfo (it) {
      // 隐藏自己
      this.isShow = false;
      // 显示编辑列表
      bus.$emit("taskEdit_show", it);
      // 在地图上先是任务路线图
      bus.$emit("map_showPath", it, (it) => {
        // 显示路段展示列表
        bus.$emit("pathlist_show", it.pointTask);
      });
    },

    // 继续任务
    contiuneTask (it) {
      // 切换到实时监控界面
      bus.$emit("home_showRealMonitor");
      // 通知调用继续任务指令
      bus.$emit("toNavigation", it, true)
    },

    refreshList () {
      var hd_device_id = this.$route.query.id;
      getRouteJob_(hd_device_id).then((res) => {
        if (res.data && res.data.content && res.data.content.length !== 0) {
          if (res.data.content[0].hd_device_id === hd_device_id) {
            this.task = res.data.content.map((e) => {
              return {
                ...e,
                taskName: e.name,
                mode: e.controlMode,
                czjs: e.operationUser,
                taskType: e.routeJobTypeId,
                pointTask: [],
                speed: e.speed || 0.1
              }
            });
          }
        }
      })
    },

    // 持续刷新任务列表状态
    timerRefresh () {
      this.timer = setInterval(() => {
        var data = this.publicData.activeDevice;
        if (this.$parent.showtaskList) {
          getRouteJob_(data.id).then((res) => {
            if (res.data.content[0].hd_device_id === data.id) {
              res.data.content.forEach((e) => {
                var task = data.task.find((ee) => { return ee.id == e.id; })
                task.status = e.status;
              })
            }
          })
        }
      }, 1000)
    },

    // 示教模式
    shijiaoMode () {
      // // 切换到实时监控界面
      // this.$parent.headActive = 1;
      // 发起示教模式
      this.ws.teachMode((res) => {
        if (res.code == 500) {
          this.$message({
            type: "error",
            message: res.msg || "示教模式出现错误"
          })
        } else {
          // 跳转到实时监控界面
          bus.$emit("home_showRealMonitor");
        }
      });
    }

  }
}
</script>

<style scoped>
.addTask {
  color: #248eff;
  border: solid 1px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
}

.testList {
  position: absolute;
  top: 60px;
  right: 4px;
  background: #131f2da8;
  width: 278px;
  border-radius: 4px;
  color: #fff;
}
.testListHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid 1px #ffffff;
  padding: 8px;
  display: flex;
  align-items: center;
}

.testListHead img {
  width: 12px;
}

.addtest {
  position: absolute;
  right: 5px;
}

.iconTaskRecord {
  position: absolute;
  right: 35px;
}

.rows {
  display: flex;
  justify-content: space-between;
  padding: 9px;
  align-items: center;
  cursor: pointer;
}

.go {
  color: #00ff66;
}

.contiune {
  border: solid 1px #1dffab;
  color: #1dffab;
  border-radius: 4px;
  padding: 3px 6px;
}

.testListBody {
  max-height: 500px;
  overflow: auto;
}

.testListBody::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.testListBody::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}
.testListBody::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #535353;
}
</style>