<template>
  <div>
    <div class='taskNotes'>
      <!-- 头部 -->
      <div class='taskNotesHead'>
        <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
        <span>作业记录详细</span>
      </div>

      <!-- 作用身体 -->
      <div>
        <div class='taskInfo'>
          <div class='taskInfoModel'>
            <div class='taskName'>设备名称：</div>
            <div>1号无人喷药车</div>
          </div>
          <div class='taskInfoModel'>
            <div class='taskName'>作业面积：</div>
            <div>5.3亩</div>
          </div>
          <div class='taskInfoModel'>
            <div class='taskName'>作业类型：</div>
            <div>巡检</div>
          </div>
          <div class='taskInfoModel'>
            <div class='taskName'>总计耗时：</div>
            <div>15分钟</div>
          </div>
          <div
            class='taskInfoModel'
            v-if='dateTime'
          >
            <div class='taskName'>开始时间：</div>
            <div>{{ dateTime }}</div>
          </div>
          <div
            class='taskInfoModel'
            v-if='dateTime'
          >
            <div class='taskName'>开始倒计时：</div>
            <div>{{ dateTime2 }}</div>
          </div>
        </div>
      </div>

      <!-- 尾部 -->
      <div class='footor'>
        <!-- <div class='save'>预览</div>
                <div class='save'>加速</div>
                <div class='save'>重置</div> -->
        <div
          class='save'
          v-show='isStart === 0'
          @click='play'
        >开始</div>
        <div
          class='save'
          v-show='isStart === 1'
          @click='pause'
        >停止</div>
        <div
          class='save'
          @click='dingshi'
        >定时</div>
        <div
          class='save'
          @click='back'
        >返回</div>
      </div>
    </div>

    <!-- 控制界面 -->
    <div
      class='optControl'
      v-if='false'
    >
      <div>

      </div>
      <div class='controlBox'>
        <i
          class='el-icon-video-pause'
          style='color:red;'
          v-show='status==1'
          @click='pause'
        ></i>
        <i
          class='el-icon-video-play'
          style='color:green;'
          v-show='status==0'
          @click='play'
        ></i>
        <!-- <div class='speed' @click='changeSpeed'> x{{speed}} </div> -->
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-date-picker
        v-model="dateTime1"
        type="datetime"
        placeholder="选择日期时间"
      > </el-date-picker>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveTime"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 手动控制界面
    <comp-noManOpt
      v-if='isShoudong'
      :changeAngleParent='changeAngle'
      style='position:absolute;bottom:0;left:0'
    ></comp-noManOpt> -->
  </div>
</template>

<script>
// import ws from '../components_unmanned/noManOpt_pyc/Control'
import animate from './js/arcgis_animate';
import { map3d } from "@/utils/jiankun_map";
// import compNoManOpt from '../components_unmanned/noManOpt_pyc/noManOpt'
// var paths = [[12623867.192992784,2654167.017123362],[12623833.202421965,2654103.115462072],[12623804.1249852,2654046.746480573],[12623777.953436079,2653990.4498262624],[12623752.896882452,2653938.944122552],[12623717.467376597,2653872.9993854314],[12623689.386448707,2653815.950333535],[12623665.734689742,2653756.7947267327],[12623658.737134164,2653685.932486681]];
// paths.reverse();
window.xs = -0.000005;
window.ys = 0.00001;
export default {
  components: {
    // compNoManOpt
  },
  props: {
    deviceTypeData: {
      type: Array,
      default: () => []
    },
    publicData: {
      type: Array,
      default: () => { }
    },
    property_values: {
      type: Object,
      default: () => { }
    },
    deviceWs: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      index: 0,
      speed: 1,
      status: 0,
      layer: null,

      isStart: 0,

      direction: 0,
      isShoudong: false,
      positions: [],

      // 设置时间的面板显示
      dialogVisible: false,
      // 设置的时间
      dateTime: "",
      // 修改的事件
      dateTime1: "",
      // 剩余时间
      dateTime2: ""
    }
  },
  watch: {
    // 设备信息上传变化时
    property_values (res) {
      var point = res.location;
      this.xinghaoChange(point[0] / 10000000, point[1] / 10000000)
    }
  },
  mounted () {
    // ws.onupdateInfo((res) => {
    //   var point = res.property_values.location;
    //   this.xinghaoChange(point[0] / 10000000, point[1] / 10000000)
    // })
    this.timerCountdown()
  },
  beforeDestroy () {
    this.timerCountdownKey && clearInterval(this.timerCountdownKey);
  },
  methods: {

    timerCountdown () {
      this.timerCountdownKey = setInterval(() => {
        // 获取当前时间
        var date = new Date();
        // 获取设定时间
        var date1 = this.dateTime1;
        // 获得时差
        var dateDiff = date1 * 1 - date * 1;
        // 获得时差秒
        var s = dateDiff / 1000;
        // 如果时差相差大于天
        if (s > 3600 * 24) {
          this.dateTime2 = parseInt(s / 3600 / 24) + "天";
        } else {
          // 如果时差小于天
          // 获取小时数
          var h = s / 3600 > 0 ? parseInt(s / 3600) + ":" : "";
          // 获取秒数
          var m = parseInt(s % 3600 / 60);
          // 获取秒数
          var se = parseInt(s % 60);
          this.dateTime2 = h + m + ":" + se;
        }
      }, 1000)
    },

    getDate (date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return year + ":" + month + ":" + day + " " + hours + ":" + minutes;
    },

    dingshi () {
      this.dialogVisible = true;
    },

    saveTime () {
      this.dateTime = this.getDate(this.dateTime1);
    },

    createAnimate (paths) {
      // 路线对象
      var lineGraphic = this.lineGraphic = map3d.Util.createGraphic({
        geometry: {
          type: "polyline",
          hasZ: false,
          hasM: true,
          paths: [[]],
          spatialReference: { wkid: 102100 }
        },
        symbol: {
          type: "simple-line",
          color: "lightblue",
          width: "1px",
          style: "short-dot"
        }
      });
      this.x = paths[0][0];
      this.y = paths[0][1];
      // 
      // var layer = this.layer = map3d.Util.addGraphic(lineGraphic, "liaoweizhong")
      // 几何对象
      var pointGraphic = this.pointGraphic = map3d.Util.createImgPoint({
        img: require("@/assets/img/Plan/biaoshi.png"),
        xy: paths[0],
        spatialReference: { wkid: 102100 }
      });

      // var point = new map3d.esri.Point({
      //     type: "point",
      //     x: paths[0][0],
      //     y: paths[0][1],
      //     spatialReference: { wkid: 102100 }
      // })
      // var simpleRenderer = {
      //     type: "simple", // autocasts as new UniqueValueRenderer()
      //     symbol: new PointSymbol3D({
      //         symbolLayers: [
      //         new ObjectSymbol3DLayer({
      //             resource: {
      //                 // the dependencies referenced in the gltf file will be requested as well
      //                 href: "/static/model/qiche.gltf"
      //             },
      //             height: 3,
      //             material: {
      //                 color: "red"
      //             }
      //         })
      //         ]
      //     })
      // };
      // 
      // var graphic = map3d.Util.createGraphic({
      //     geometry: point, symbol: simpleRenderer
      // })
      // var layer = map3d.Util.addGraphic(graphic,"liaoweizhong")
      // 创建点动画
      // this.animate = new animate(pointGraphic,paths,lineGraphic);

      // this.animate.onAnimate((res)=>{
      //     this.status = res.status;
      //     this.index = parseInt((res.index + 1) / res.analysisPaths.length * 100);
      //     if( this.index === 100 ){
      //         this.pause();
      //     }
      // })
      this.positionCar();
    },

    // pause (){
    //     this.status = 0
    //     this.animate.pause();
    // },

    pause () {
      this.isStart = 0;
      // 发送取消任务指令
      this.$parent.ws.cancelInstructions();
    },

    play () {
      // 执行之前 会先检查一下控制模式

      if (this.deviceWs.controlType === 3) {
        // 如果是现场控制则取消本次任务执行
        return this.$message({
          showClose: true,
          message: '该设备目前为手动控制模式，无法执行任务，请关闭掉手动在此尝试',
          type: 'warning'
        });
      }
      // 标记状态为开始执行
      this.isStart = 1;
      // 发送坐标数据
      var paths = this.publicData.activeTask.path.map((e) => {
        var p = new map3d.esri.Point({ x: e[0], y: e[1], spatialReference: { wkid: 102100 }, type: "point" });
        return [p.longitude - window.xs, p.latitude - window.ys]
      });
      paths = paths.map((e) => { return e.join(",") }).join(",").split(",").map((e) => { return parseFloat(e) });
      // ws.sendPathPoint(paths, paths.map((e) => { return Math.random() * 10 > 5 ? 0 : 1 }).splice(0, a.length / 2));

      // 获取任务路段动作定点
      var pointTask = this.publicData.activeTask.pointTask;
      // 创建一个和路段点相同的数组
      var pointPaths = paths.concat().map(() => { return 0 });
      // 开始处理喷药逻辑
      for (var i in pointTask) {
        var it = pointTask[i];
        // 获取路段任务的点下表
        var p = it.point
        // 获得路段任务类型
        var routeJobActiveId = it.routeJobActionId;
        if (routeJobActiveId === 1) {
          // 如果是1 则是左喷药
          for (var ii in p) {
            pointPaths[p[ii] * 2] = 1;
          }
        } else if (routeJobActiveId === 2) {
          // 如果是2 则是右喷药
          for (var ii in p) {
            pointPaths[p[ii] * 2 + 1] = 1;
          }
        }
      }
      // 将路段任务最后的一组数据改为0
      pointPaths[pointPaths.length - 1] = 0;
      pointPaths[pointPaths.length - 2] = 0;
      // 下发执行任务的指令

      this.$parent.ws.setUpInstructions(paths, pointPaths, (argu) => {
        this.$message({
          showClose: true,
          message: '设置设备任务数据成功',
          type: 'success'
        });

        this.$parent.ws.executeInstructions(0.6, () => {
          this.$message({
            showClose: true,
            message: '设备开始执行任务',
            type: 'success'
          });
        });
        // this.$message({
        //     showClose: true,
        //     message: '该设备目前为手动控制模式，无法执行任务，请关闭掉手动在此尝试',
        //     type: 'warning'
        // });
      });

    },

    reset () {
      this.animate.reset();
    },

    changeIndex () {
      this.animate.index = parseInt(this.animate.analysisPaths.length * (this.index / 100));
      this.animate.moveGraphic(this.animate.index);
    },

    changeSpeed () {
      var level = this.animate.getSpeed();
      level++;
      if (level > 3) {
        level = 1;
      }
      this.animate.setSpeed(level);
      this.speed = level;
    },

    back () {
      // 关闭掉现在的模式
      this.$parent.showEditTask = true;
      this.$parent.showPathlist = true;
      this.$parent.showRunTask = false;
      this.close();
    },

    // 重置
    close () {
      if (this.layer) {
        this.layer.removeAll();
      }
    },

    shoudong () {
      // 停止当前的任务
      this.pause()
      // 显示方向盘
      this.isShoudong = true;
    },

    zidong () {
      // 隱藏方向盤
      this.isShoudong = false;
    },

    // 实时获取小车位置
    positionCar () {
      this.key = setInterval(() => {
        if (this.pointGraphic.geometry.x !== this.x || this.pointGraphic.geometry.y !== this.y) {
          // 试试刷新point的位置
          this.pointGraphic.geometry.x = this.x;
          this.pointGraphic.geometry.y = this.y;
          this.pointGraphic.geometry = this.pointGraphic.geometry.clone();
          // 位移线段
          this.lineGraphic.geometry.paths[0] = this.positions;
          this.lineGraphic.geometry = this.lineGraphic.geometry.clone();
        }
      })
    },

    xinghaoChange (x, y) {
      if (this.pointGraphic) {
        this.pointGraphic.geometry.longitude = x + window.xs;
        this.pointGraphic.geometry.latitude = y + window.ys;
        this.pointGraphic.geometry = this.pointGraphic.geometry.clone();
        this.x = this.pointGraphic.geometry.x;
        this.y = this.pointGraphic.geometry.y;
        this.positions.push([this.x, this.y]);
        // 位移线段
        this.lineGraphic.geometry.paths[0] = this.positions;
        this.lineGraphic.geometry = this.lineGraphic.geometry.clone();
      }
    },

    // 改变方向盘变化
    changeAngle (e) {
      console.log(e);
      var r = 10;
      var x = Math.cos(e) * r;
      var y = Math.sin(e) * r;
      this.x += x;
      this.y += y;
      this.positions.push([this.x, this.y]);
    },

  }
}
</script>

<style scoped>
.taskNotes {
  position: absolute;
  top: 50px;
  right: 15px;
  background: #00000080;
  width: 220px;
  border-radius: 6px;
  color: #fff;
  padding: 8px;
  z-index: 99;
}

.taskNotesHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.taskNotesHead img {
  width: 12px;
}

.taskInfoModel {
  display: flex;
  padding: 6px 0px;
}

.taskInfo {
  color: #ffffff;
}

.taskName {
  width: 75px;
  flex-shrink: 0;
}

.footor {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  font-size: 12px;
  margin-top: 10px;
}

.save {
  padding: 6px 12px;
  background: #35a24c;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
}

.close {
  padding: 6px 12px;
  background: #ffffff;
  border-radius: 4px;
  color: #4e4d4d;
  font-size: 12px;
  cursor: pointer;
}

.optControl {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  padding: 15px;
  border-radius: 4px;
  background: #000000a8;
  color: #fff;
}

.controlBox {
  display: flex;
  justify-content: space-evenly;
  font-size: 22px;
}

.controlBox i {
  cursor: pointer;
}

.speed {
  font-size: 12px;
  border-radius: 50%;
  border: solid 2px #fff;
  padding: 0 0px;
  width: 21px;
  text-align: center;
  line-height: 18px;
}
</style>
