<template>
  <div class='testList'>
    <div class='testListHead'>
      <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
      <span style='font-size:14px;margin-left:4px;'>作业任务</span>
      <!-- <span class='iconTaskRecord cur'>记录任务</span> -->
      <span class='iconTaskRecord cur' @click='shijiaoMode'>示教模式</span>
      <span @click='addTask' class=' addtest cur'>新增</span>
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
        v-for="(it, i) in publicData.activeDevice.task"
        :key='i'
      >
        <div :style='"color:"+it.color'>{{it.name}}</div>
        <div v-if='it.status !== 2 && it.status !== 1' style='color:#ffff00'>等待作业</div>
        <div v-if='it.status === 1'>正在进行</div>
        <div v-if='it.status === 2' style='color:#ff0000'>
          <span class='contiune' @click.stop='contiuneTask(it)'>继续</span>
          作业停止
        </div>
      </div>
      <div
        class='testListModel rows'
        v-show='publicData.activeDevice.task && publicData.activeDevice.task.length === 0'
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
import {
  getRouteJob //获取任务数据
} from '@/api/map3d/drawMap'
import { map3d } from "@/utils/jiankun_map";
export default {
  props: {
    deviceTypeData: {
      type: Array,
      default: []
    },
    publicData: {
      type: Array,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      taskData: []
    }
  },

  watch: {
    // 当选择设备变化的时候
    "publicData.activeDevice" (data) {
      // this.refreshList(data);
    }
  },

  created () {

  },
  mounted (){
    this.refreshList()
  },
  destroyed () {

  },
  // mounted (){
    // 延迟刷新任务状态
    // this.timerRefresh();
  // },

  methods: {

    addTask () {
      // 将状态值标注为正在添加设备
      this.publicData.isAddtask = true;
      // 隐藏设备列表
      this.$parent.showDeviceList = false;
      // 隐藏自己
      this.$parent.showtaskList = false;
      // 刷新新增任务列表
      this.$parent.$refs.addTask.init();
      // 显示新增任务列表
      this.$parent.showAddTask = true;
    },

    showInfo (it) {
      // 隐藏自己
      this.$parent.showtaskList = false;
      // 隐藏设备列表
      this.$parent.showDeviceList = false;
      // 表明选中的任务对象
      this.publicData.activeTask = it;
      // 显示编辑列表
      this.$parent.showEditTask = true;
      // 显示路段展示列表
      this.$parent.showPathlist = true;
      // 设置是否继续上一次未完成的任务
      this.$parent.$refs.editTask.isContinueTask = false;
    },

    // 继续任务
    contiuneTask (it){
      // 显示任务内容
      // this.showInfo(it);
      // 设置是否继续上一次未完成的任务
      // this.$parent.$refs.editTask.isContinueTask = true;
      this.$parent.headActive = 1;
      this.$parent.$refs.navigation.toNavigation(it,true);
    },

    refreshList (data){
      data = data || this.publicData.activeDevice;
      // 如果不存在任务
      if (!data.task.length) {
        getRouteJob(data.id).then((res) => {
          if( res.data.content[0].hd_device_id === data.id ){
            data.task = res.data.content.map((e) => {
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
        })
      }else {
        getRouteJob(data.id).then((res) => {
          if( res.data.content[0].hd_device_id === data.id ){
            res.data.content.forEach((e)=>{
              var task = data.task.find((ee)=>{ return ee.id == e.id; })
              task.status = e.status;
            })
          }
        })
      }
    },

    // 持续刷新任务列表状态
    timerRefresh (){
      this.timer = setInterval(()=>{
        var data = this.publicData.activeDevice;
        if( this.$parent.showtaskList ){
          getRouteJob(data.id).then((res) => {
            if( res.data.content[0].hd_device_id === data.id ){
              res.data.content.forEach((e)=>{
                var task = data.task.find((ee)=>{ return ee.id == e.id; })
                task.status = e.status;
              })
            }
          })
        }
      },1000)
    },

    // 示教模式
    shijiaoMode (){
      // // 切换到实时监控界面
      // this.$parent.headActive = 1;
      // 发起示教模式
      this.$parent.ws.teachMode((res)=>{
        if( res.code == 500 ) {
          this.$message({
            type: "error",
            message: res.msg || "示教模式出现错误"
          })
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
  background: #131f2dA8;
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
  position:absolute;
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
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.testListBody::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
}
.testListBody::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #535353;
}

</style>