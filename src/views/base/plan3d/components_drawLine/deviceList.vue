<template>

  <div class='deviceList'>
    <!-- 头部 -->
    <div
      class='deviceListHead'
      v-show=' false && !activeDeviceType'
    >
      <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
      <span>设备列表</span>
    </div>
    <!-- 内容 -->
    <div
      class='deviceListBody'
      v-show='false && !activeDeviceType'
    >
      <!-- 模块 -->
      <div
        @click='activeDeviceTypeClick(it)'
        class='deviceListModel'
        v-for='(it,i) in deviceTypeData'
        :key='i'
      >
        <!-- 名称 -->
        <div class='deviceListModelName'>
          <span>{{it.name}}</span>
          (<span class='deviceCount'>{{it.status1+it.status2}}</span>)
          
        </div>
        <div class='deviceListModelBox'>
          <div class='deviceListModelRow'>
            <div class='yuanGreen'></div>
            <div class='deviceListModelRowName'>
              <span>正</span>
              <span>在</span>
              <span>作</span>
              <span>业</span>
              <span>：</span>
            </div>
            <div>{{it.status1}}台</div>
          </div>
          <div class='deviceListModelRow'>
            <div class='yuanRed'></div>
            <div class='deviceListModelRowName'>
              <span>已</span>
              <span>离</span>
              <span>线</span>
              <span>：</span>
            </div>
            <div>{{it.status2}}台</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class='deviceListHead'
      v-show='activeDeviceType'
    >
      <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
      <span>设备列表</span>
      <i
        class='el-icon-back backType'
        @click="toBack"
      ></i>
    </div>
    <div
      class='deviceListBody deviceListBox'
      v-show='activeDeviceType'
    >
      <!-- 模块 -->
      <div
        @click='activeDeviceClick(it)'
        :class='{ "active" : publicData.activeDevice.id === it.id }'
        class='deviceListModel'
        v-for='(it,i) in deviceData'
        :key='i'
      >
        <!-- 名称 -->
        <div class='deviceListModelName'>
          <span>{{it.name}}</span>
          (<span
            class='deviceCount'
            :style='it.status === 0 ? "color:red;":""'
          >{{ it.status === 0 ? "已离线" : "作业中" }}</span>)
          <div
            @click.stop='controls(it)'
            class='deviceBtn'
          >控制</div>
          <!-- <div v-show='it.path.length == 0' @click.stop='draw(it)' class='deviceBtn'>创建路线</div>
                    <div v-show='it.path.length != 0' @click.stop='edit(it)' class='deviceBtn'>编辑路线</div> -->
        </div>
        <div class='deviceListModelBox'>
          <div class='deviceListModelRow'>
            <!-- <div class='yuanGreen'></div> -->
            <div class='deviceListModelR owName'>
              <span>负</span>
              <span>责</span>
              <span>人</span>
              <span>：</span>
            </div>
            <div>{{it.master}}</div>
          </div>
          <div class='deviceListModelRow'>
            <!-- <div class='yuanRed'></div> -->
            <div class='deviceListModelRowName'>
              <span>联</span>
              <span>系</span>
              <span>电</span>
              <span>话</span>
              <span>：</span>
            </div>
            <div>{{it.phone}}</div>
          </div>
        </div>
      </div>
    </div>

      

  </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
window.map3d = map3d;
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
    },
    property_values: {
      type: Object,
      default: ()=> {}
    }
  },
  watch: {
    // property_values (res){
    //   this.showPoint(res.location)
    // }
  },
  data () {
    return {
      deviceData: [],
      activeDeviceType: null, // 当前选中的农机类型
      selectNode: [],       //选中节点
      activePathIndex: [],  //选中节点的下标
      currentPath: null,     //当前绘制的路线 一般用于新增任务的时候绘制的
      layers: []
    }
  },

  // 如果被去除 则清除一下创建的图层
  beforeDestroy (){
    // this.layers.forEach((e)=>{ return e.removeAll() })
  },

  mounted () {
    // this.activeDeviceTypeClick(this.datas[0]);
    // this.activeDeviceClick();
    this.activeDeviceClick(this.$parent.defaultActive)
  },

  methods: {

    edit (item) {
      // 先判断当前选中的是否是自己
      if (this.publicData.activeDevice.id !== item.id) {
        // 先选中组件
        // this.activeDeviceClick();
      }
      // 获取图层
      var layer = view.map.findLayerById("农机规划路线_" + item.id);
      if( this.layers.indexOf(layer) === -1 ){
        this.layers.layer;
      }

      // 如果图层不存在
      if (!layer) { return }
      // 查询图层中的line
      var graphic = layer.graphics.items.find((e) => { return e.geometry.type === 'polyline' })
      // 如果
      if (graphic) {
        // 将几何编写入编辑模式
        var drawOption = map3d.Util.edit(graphic)
      }
    },

    draw (item) {
      map3d.Util.draw("polyline", (res) => {
        // 将几何保存进入
        item.path = res.graphic.geometry.paths[0];
        // 删除掉绘制的图层以及图形
        view.map.remove(res.graphic.layer);
        // 显示设备路线
        this.showTaskPath(item);
      })
    },

    toBack () {
      // 选中设备类型为空
      this.activeDeviceType = null;
      // 置空设备信息
      this.deviceData = [];
      // 置空选中设备
      this.publicData.activeDevice = {}
      // 关闭任务列表
      this.$parent.showtaskList = false;
    },

    // 选中农机设备类型
    activeDeviceTypeClick (it) {
      // 赋值选中设备类型
      this.activeDeviceType = it;
      // 输入设备列表数据
      this.deviceData = it.children;
    },

    activeDeviceClick (it) {
      // 将当前选中下标指明自己
      this.publicData.activeDevice = it;
      // 显示对应的作业任务
      this.showTask(it);
      // 创建自己的小船
      // this.showPoint();
    },

    // 显示设备点
    showPoint (position){
      if( !this.pointGraphic ){
        this.pointGraphic = map3d.Util.createImgPoint({
          img: require("@/assets/img/Plan/drawLineMap/qp/point.png"),
          xy: position,
          spatialReference: { wkid: 4326 }
        });
        var layer = map3d.Util.addGraphic(this.pointGraphic,"deviceList_layer",view);
        if( this.layers.indexOf(layer) === -1 ){
          this.layers.layer;
        }
      }else{
        this.pointGraphic.geometry.x = position[0];
        this.pointGraphic.geometry.y = position[1];
        this.pointGraphic.geometry = this.pointGraphic.geometry.clone();
      }
    },

    // 根据节点显示线段
    showPath (paths, param) {
      // 定义线段symbol
      var symbol = this.getLineSymbol(param);
      // 定义线段geometry view.spatialReference.wkid
      // var path = item.path.map((e)=>{
      //   return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
      // })
      var geometry = map3d.Util.createPolyline(paths, view.spatialReference.wkid);
      // 合并开始
      var graphic = map3d.Util.createGraphic({ geometry, symbol })
      // 返回合成几何
      return graphic;
    },

    // 显示设备的路线规划图
    showTaskPath (item,bool) {
      // 定义线段symbol
      var symbol = this.getLineSymbol();
      // 定义线段geometry
      if( item.path[0][0] > 1000 ){
        var path = item.path;
      }else{
        var path = item.path.map((e)=>{
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
        })
      }
      var geometry = map3d.Util.createPolyline(path, view.spatialReference.wkid);
      // 合并开始
      var graphic = map3d.Util.createGraphic({ geometry, symbol })
      // 将当前几何和任务联系起来
      graphic.task = item;
      // 绑定联系
      item.graphic = graphic;

      // 视角移动指定路线
      bool !== false && view.goTo({
        target: graphic.geometry.extent
      })

      // 添加到地图上
      var layer = map3d.Util.addGraphic(graphic, "农机规划路线_" + item.id, view);
      if( this.layers.indexOf(layer) === -1 ){
        this.layers.push(layer) ;
      }

      return graphic;
    },

    // 获取线段symbol
    getLineSymbol (param = {}) {
      return {
        type: "line-3d",
        symbolLayers: [
          {
            type: "line",
            size: "10px",
            material: {
              color: param.color || [255, 255, 255, 0.8]
            }
          }
        ]
      }
    },

    // 获取节点symbol
    getPointSymbol () {
      return {
        type: "point-3d",  // autocasts as new PointSymbol3D()
        symbolLayers: [{
          type: "object",  // autocasts as new ObjectSymbol3DLayer()
          width: 0.5,  // diameter of the object from east to west in meters
          height: 0.5,  // height of the object in meters
          depth: 0.5,  // diameter of the object from north to south in meters
          resource: { primitive: "sphere" },
          material: { color: "red" }
        }]
      };
    },

    // 获取编辑路径节点的颜色
    getPointNodeSymbol () {
      return {
        type: "point-3d",  // autocasts as new PointSymbol3D()
        symbolLayers: [{
          type: "object",  // autocasts as new ObjectSymbol3DLayer()
          width: 0.5,  // diameter of the object from east to west in meters
          height: 0.5,  // height of the object in meters
          depth: 0.5,  // diameter of the object from north to south in meters
          resource: { primitive: "sphere" },
          material: { color: "green" }
        }]
      };
    },

    // 显示对于的任务栏
    showTask (it) {
      this.$parent.showtaskList = true;
      // this.$refs.showTask(it)
    },

    isContainNode (graphic) {
      // 获取当前点对于路径的下标
      var index = this.publicData.activeDevice.path.indexOf(this.publicData.activeDevice.path.find((e) => { return e[0] === graphic.geometry.x && e[1] === graphic.geometry.y }));
      // 先找到当前选中对象的任务列表
      var taskList = this.publicData.activeTask.pointTask;
      // 开始遍历查询是否包含
      var points = taskList.find((e) => {
        return e.point.find((e) => {
          return e == index
        })
      });
      return points ? true : false;
    },

    // 任务路线被点击
    pathClick (graphic) {
      var action = null;
      // 获取当前任务路线属于的任务对象
      var task = this.publicData.activeTask.pointTask.find((e)=>{ return e.graphic === graphic });
      // 判断任务对象是否存在
      if( !task ) { return }
      // 将这个几何进入编辑模式
      map3d.Util.load([
        "esri/widgets/Sketch/SketchViewModel",
      ]).then((res) =>{
        if( window.ads === false ){
          return;
        }
        if( this.$parent.$refs.pathList && this.$parent.$refs.pathList.selectPathGraphicBefore(graphic) === false ){
          action = graphic;
          return; 
        }
        if( !graphic.layer ){
          graphic.layer = map3d.Util.getLayer("编辑用的",view);
        }
        var sketchViewModel = new res[0]({
          view: window.view,
          layer: graphic.layer,
          updateOnGraphicClick: false, 
          defaultUpdateOptions: {      // 设置更新操作的默认选项
              toggleToolOnClick: false // 仅启用重塑操作
          }
        });
        if( this.$parent.$refs.pathList && this.$parent.$refs.pathList.selectPathGraphic(graphic,sketchViewModel) === false ){
          return;
        }
        sketchViewModel.update([graphic], {
          tool: "reshape"
        });
        sketchViewModel.eventUpdate = sketchViewModel.on("update",(e)=>{
          if( e.state === 'complete' ) {
            sketchViewModel.eventUpdate.remove();
            //完成编辑后触发
            this.$parent.$refs.pathList.editComplete(e.graphics[0]);
          }
        })
      });
    }, 

    nodeClick (graphic) {
      if (!this.publicData.isAddPath) {
        // 只有在新增路段的状态下才可以执行
        return;
      }

      // 判断这个点击的点是否被其他任务包含了
      if (this.isContainNode(graphic)) {
        // 如果已经被其他任务包含了 则提示她无法作为新任务的点
        this.$message({
          message: '这个点已经被其他任务包含了，无法作为新任务的初始点选中',
          type: 'warning'
        });
        return;
      }

      // 选中节点改变颜色
      graphic.symbol = this.getPointNodeSymbol();
      // 将选中节点添加进入
      this.selectNode.push(graphic);
      // 如果已经存在2个选中的点
      if (this.selectNode.length === 2) {
        // 根据2个点获取路径中途的所有节点数据
        var path = this.publicData.activeTask.path.map((e)=>{
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
        })
        var pointIndex1 = path.find((e) => {
          return e[0] === this.selectNode[0].geometry.x && e[1] === this.selectNode[0].geometry.y
        });
        var pointIndex2 = path.find((e) => {
          return e[0] === this.selectNode[1].geometry.x && e[1] === this.selectNode[1].geometry.y
        });
        pointIndex1 = path.indexOf(pointIndex1);
        pointIndex2 = path.indexOf(pointIndex2);
        this.activePathIndex = [];
        for (var i = Math.min(pointIndex1, pointIndex2); i <= Math.max(pointIndex1, pointIndex2); i++) {
          this.activePathIndex.push(i);
        }
        // var paths = this.publicData.activeTask.path.slice(Math.min(pointIndex1,pointIndex2),Math.max(pointIndex1,pointIndex2)+1);
        // 创建路线 
        this.currentPath = this.showTaskLine(pointIndex1, pointIndex2); // this.showPath( paths , { color: [255,0,0,0.8] } );
        // 触发创建路段事件
        this.createPath();
      }
    },

    // 显示子任务 段落
    showTaskLine (pointIndex1, pointIndex2, color) {
      var paths = this.publicData.activeTask.path.slice(Math.min(pointIndex1, pointIndex2), Math.max(pointIndex1, pointIndex2) + 1);
      if( paths[0][0] < 1000 ){
        paths = paths.map((e)=>{
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
        })
      }
      var graphic = this.showPath(paths, { color: color || [255, 0, 0, 0.8] });
      graphic.click = this.pathClick.bind(this)
      // 添加到对应图层
      var layer = map3d.Util.addGraphic(graphic, "农机规划路线_" + this.publicData.activeTask.id,view);
      if( this.layers.indexOf(layer) === -1 ){
        this.layers.push(layer) ;
      }
      return graphic;
    },

    createPath () {
      // 调用pathList变化
      this.$parent.$refs.pathList.setPathPoint(this.activePathIndex, this.currentPath);
    },

    // 进入创建任务的流程
    createTask () {
    },

    // 退出创建任务的流程
    backCreateTask () {
      this.selectNode.forEach((e) => {
        // 将几何变回原来的颜色
        e.symbol = this.getPointSymbol();
      })
      this.selectNode = [];
    },


    // 添加新任务的事件 一般是被addtask.vue调用
    addTask (task) {
      // 获取当前选中的设备
      var device = this.publicData.activeDevice;
      // 然后获取当前存储任务的对象数组
      device.task.push(task);
      // 清除掉一下东西
      this.backCreateTask();
    },

    // 清除掉当前绘制的线段
    clearCurrentPath () {
      var graphic = this.publicData.activeTask.graphic
      if (graphic) {
        graphic.layer.removeAll();
      }
      // 清除掉几何
      this.currentPath && this.currentPath.layer.remove(this.currentPath);
      this.currentPath = null;
      // 清除掉一下东西
      this.backCreateTask();
    },

    // 修改当前绘制线段的颜色
    changeCurrentPathColor (it) {
      var color = it.color;
      var graphic = it.graphic;
      graphic && (graphic.symbol = this.getLineSymbol({ color: color }));
    },

    // 进入设备控制环节
    controls () {
      // 隐藏当前显示的结构
      this.$parent.showDeviceList = false;
      // 关闭任务
      this.$parent.showtaskList = false;
      // 显示控制模板
      this.$parent.showUnmanned = true;
    }

  }
}
</script>

<style scoped>
.deviceListModel.active {
  background: #00000096;
}

.deviceListModel {
  padding: 7px;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

.deviceListModelName {
  position: relative;
}

.deviceBtn {
  position: absolute;
  right: 0;
  top: 0;
  color: #9e9e9e;
  cursor: pointer;
  display: none;
}

.active .deviceBtn {
  display: block;
}

.deviceList {
  position: absolute;
  top: 50px;
  left: 15px;
  background: #00000080;
  width: 215px;
  /* height: 250px; */
  border-radius: 6px;
  color: #fff;
  /* padding: 8px; */
}

.deviceListHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
  position: relative;
}

.deviceListHead img {
  width: 12px;
}

.yuanRed {
  background: #ff0000;
  border-radius: 50%;
  padding: 4px;
}

.yuanGreen {
  background: #00ff66;
  border-radius: 50%;
  padding: 4px;
}

.deviceListModelRow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.deviceListModelRowName {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  width: 95px;
}

.deviceListModelBox {
  padding: 8px;
}

.deviceCount {
  color: #00ff66;
}

.deviceListBox .deviceListModelRow {
  justify-content: left;
  padding: 7px 0;
}

.deviceListBox .deviceListModelBox {
  padding: 8px 3px;
}

.deviceListBox .deviceListModelRowName {
  padding: 0px 4px;
  width: 75px;
}

.backType {
  position: absolute;
  right: 0px;
  top: 0px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.pointInfo {
    position:absolute;
    z-index: 999;
    background: #000000A8;
    padding: 8px;
    border-radius: 4px;
    color: #fff;
    transform: translate(-50%,-170%);
    width: 150px;
}
.pointInfo-title {
    color: #039fb2;
    padding: 0 0 12px;
    font-size: 14px;
}
.pointInfo-row { }
.pointInfo-model { }
.pointInfo-name { }
.pointInfo-value { color: #8cc8cf; }

</style>
