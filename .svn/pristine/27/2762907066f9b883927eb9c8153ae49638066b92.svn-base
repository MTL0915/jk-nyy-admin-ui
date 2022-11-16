<template>
  <div class="pathLine">
    <!-- 路线配置 -->
    <div class="pathList" v-show="!publicData.isAddPath">
      <div class="pathsName">
        <span>路线配置</span>
        <div>
          <el-button type="primary" size="mini" v-show="skm" @click="backEdit"
            >完成编辑</el-button
          >
          <el-button type="primary" size="mini" @click="update">保存</el-button>
        </div>
      </div>
      <div class="pathsModelBox">
        <div
          class="pathsModel"
          :class="{ active: activePath == i }"
          v-for="(it, i) in pointTask.filter(e => {
            return input === '' || e.name === input;
          })"
          :key="i"
          @click="selectPath(it, i)"
        >
          <div class="modelName">
            <span>{{ it.name }}</span>
            <!-- <span :style='"color:"+it.color'>*</span> -->
            <input
              style="width:20px;"
              type="color"
              @click.stop=""
              @change="changePathColor(it)"
              v-model="it.color"
            />
            <span @click.stop="fenduan(it)" class="fenduan">分段</span>
            <i
              class="el-icon-close closeBtn"
              @click.stop="deleteJobLine(it)"
            ></i>
          </div>
          <div class="modelBox">
            <div
              class="dui1"
              v-for="(its, i) in sensorBtn.filter(e => {
                return e.hd_sensor_type_function_code !== 'POWER_SWITCH';
              })"
              :key="i"
            >
              <div>{{ its.name }}</div>
              <input
                type="checkbox"
                @click.stop=""
                @change="change($event, its, it)"
                :checked="isChecked(it, its)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示 -->
    <div class="info" v-show="publicData.isAddPath">
      <div class="infoName">提示</div>
      <div class="infoBox" :class="{ shansuo: shansuo }">
        点击地图上路段中的红色点， 选择2个点，生成路段
      </div>
      <div class="editPath" v-show="publicData.isAddPath">
        <div class="infoName">编辑路径</div>
        <div>
          <div class="row">
            <div>路径名称：</div>
            <div><input type="text" v-model="pathName" /></div>
          </div>
          <div class="row">
            <div>作业内容：</div>
            <div>
              <select v-model="taskType">
                <option
                  v-for="(it, i) in publicData.taskLineType"
                  :key="i"
                  :value="it.id"
                  >{{ it.name }}</option
                >
              </select>
            </div>
          </div>
        </div>

        <div class="footor">
          <!-- <div class='save' @click='draw'>绘制</div> -->
          <div class="save" @click="save">保存</div>
          <div class="close" @click="back">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRouteJobLine, // 获取任务 子任务的列表
  addRouteJobLine, // 保存任务 子任务的数据
  addRouteJobLines,
  removeRouteJobLine, //删除任务 子任务的数据
  removeRouteJobLines,
  updateRouteJobLine, //修改子任务的数据
  updateRouteJobPath, //修改任务路线数据
  removeRouteJob, //删除任务数据  主要是修改重建
  updateRouteJob, //修改任務數據 主要是修改重建
  deleteByRouteJobPathId // 根据任务路线RouteJobPathId 删除子任务
} from "@/api/map3d/drawMap";
export default {
  props: {
    deviceTypeData: {
      type: Array,
      default: []
    },
    publicData: {
      type: Array,
      default: () => {
        return {};
      }
    },
    sensorBtn: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      input: "",
      pathPoint: [0, 1, 2, 3],
      pathName: "asdasd",
      taskType: "",
      pathColor: "#ff0000",
      pointTask: [],
      testArray: [0, 1, 2, 3],
      graphic: null,
      shansuo: true,
      activePath: -1,
      skm: null //几何编辑控件
    };
  },
  watch: {},
  mounted() {},
  methods: {
    isChecked(it, its) {
      if (!it.actionConfig) return false;
      var config = JSON.parse(it.actionConfig);
      var val = config[its.channel + ""];
      if (val) {
        return true;
      } else {
        return false;
      }
    },

    setPointTask(pointTask) {
      this.pointTask = pointTask;
    },

    // 初始化
    init() {
      this.pathPoint = [];
      this.pathName = "新建路线";
      this.taskType = "";
      this.pathColor = "#ff0000";
      this.graphic = null;
    },

    // 新增路线
    addPath() {
      // 将状态值标注为正在添加设备
      this.publicData.isAddPath = true;
      // 隐藏编辑任务列表
      this.$parent.showEditTask = false;
    },

    // 创建线段成功
    setPathPoint(point, graphic) {
      // 将创建的线段赋值进来
      this.pathPoint = point;
      // 记录下来路径几何
      this.graphic = graphic;
    },

    // 保存数据
    save(it) {
      if (!this.taskType) {
        this.$message({
          message: "请选择作业内容",
          type: "warnning"
        });
        return;
      }
      if (!this.graphic) {
        // 如果不存在几何 则提先进行绘制
        this.$message({
          message: "请绘制路径线段，选择路线中的节点进行绘制",
          type: "warnning"
        });
        return;
      }

      var activeTask = this.publicData.activeTask;

      var json = {
        distance: 0,
        id: 0,
        name: it.name,
        path: it.path,
        color: it.pathColor,
        pathSpot: "",
        routeJobPathId: activeTask.pathData.id,
        routeJobPathName: activeTask.pathData.name,
        actionConfig: it.actionConfig || "{}"
      };

      addRouteJobLine(json).then(res => {
        // 获取当前选中的任务
        var pointTask = activeTask.pointTask;
        // 添加数据
        pointTask.push({
          ...res.data,
          point: this.pathPoint,
          name: this.pathName,
          taskType: this.taskType,
          color: this.pathColor,
          graphic: this.graphic
        });
        this.init();
        // 将状态值标注为正在添加设备
        this.publicData.isAddPath = false;
        // 隐藏编辑任务列表
        this.$parent.showEditTask = true;
        // 清除掉选中事件
        this.$parent.$refs.deviceList.backCreateTask();
      });
    },

    back() {
      // 将状态值标注为不在添加设备
      this.publicData.isAddPath = false;
      // 隐藏编辑任务列表
      this.$parent.showEditTask = true;
      // 如果存在几何删除几何
      this.graphic && this.graphic.layer.remove(this.graphic);
      // 初始化
      this.init();
      // 调用设备绘制初始化
      this.$parent.$refs.deviceList.backCreateTask();
      // 选中下标置空
      this.activePath = "";
    },

    del_path(it) {
      removeRouteJobLine(it.id).then(() => {
        // 获取当前选中的任务
        var task = this.publicData.activeTask;
        // 获取当前任务的路段数组
        var paths = task.pointTask;
        // 从数组中删除
        paths.splice(paths.indexOf(it), 1);
        // 删除几何
        it.graphic && it.graphic.layer.remove(it.graphic);
      });
    },

    update_path(it, name, value) {
      it[name] = value;
      updateRouteJobLine(it);
    },

    draw() {},

    handleIconClick() {},

    changePathColor(it) {
      this.$parent.$refs.deviceList.changeCurrentPathColor(it);
      // 将变化的颜色修改
      // this.update_path(it, "color", it.color);
    },

    change(res, its, it) {
      if (!it.actionConfig) {
        it.actionConfig = {};
      } else {
        it.actionConfig = JSON.parse(it.actionConfig);
      }
      // 如果是101类型按钮
      it.actionConfig[its.channel] = res.target.checked ? 1 : 0;
      it.actionConfig = JSON.stringify(it.actionConfig);
      // updateRouteJobLine({
      //   "actionConfig": it.actionConfig,
      //   "id": it.id,
      // }).then((e)=>{
      //
      // })
    },

    /*************************************************************************** */
    /**************** 分段逻辑部分 ************************************************/
    /*************************************************************************** */

    // 分段
    fenduan(it) {
      // 如果存在编辑对象
      if (this.skm) {
        return this.$message({ type: "warnning", message: "请先完成编辑。" });
      }
      // 获取这个数据的下标
      var i = this.pointTask.indexOf(it);
      // 深度克隆一個
      var its = JSON.parse(JSON.stringify(it));
      // 将克隆对象插入数组
      this.pointTask.splice(i + 1, 0, its);
      // 将目标对象的坐标下标转换
      this.indexChange(i);
      // 将实体路线分为2截
      this.taskLineDiff(i);
      // 从新渲染几何
      this.showList();
    },

    // 将实体路线分为2截
    taskLineDiff(i) {
      var path = this.publicData.activeTask.path;
      var p1 = path[i];
      var p2 = path[i + 1];
      var px = p1[0] + (p2[0] - p1[0]) / 2;
      var py = p1[1] + (p2[1] - p1[1]) / 2;
      path.splice(i + 1, 0, [px, py]);
    },

    // 将线段所有的下标转换
    indexChange(ind) {
      // 生成路径任务线段
      var pointTask = this.pointTask;
      for (var i in pointTask) {
        if (i <= ind) {
          continue;
        }
        var its = pointTask[i];
        its.point = [its.point[1], its.point[1] + 1];
        its.path = JSON.stringify(its.point);
      }
    },

    showList() {
      // 生成路径任务线段
      var pointTask = this.pointTask;
      for (var i in pointTask) {
        var e = pointTask[i];
        // 如果几何存在先清除掉
        if (e.graphic && e.graphic.layer) {
          e.graphic.layer.remove(e.graphic);
        }
        var showTaskLine = this.$parent.$refs.deviceList.showTaskLine;
        var p = JSON.parse(e.path);
        e.graphic = showTaskLine(p[0], p[p.length - 1], e.color);
      }
    },
    /*---------------------------------------------------------------------------*/

    /*************************************************************************** */
    /**************** 保存修改逻辑 ************************************************/
    /*************************************************************************** */
    // 保存修改
    update(fn) {
      if (this.skm) {
        this.$message({
          type: "warnning",
          message: "请先完成编辑."
        });
        return;
      }
      // 获取任务id 用于删除
      var task = this.publicData.activeTask;
      var path = task.path;
      path = this.$parent.unjiaozheng(path);
      // 修改任务数据
      updateRouteJobPath({
        id: task.routeJobPathId,
        endLat: path[path.length - 1][1],
        endLon: path[path.length - 1][0],
        hd_device_id: this.publicData.activeDevice.id,
        hd_device_name: this.publicData.activeDevice.name,
        name: task.name,
        path: JSON.stringify(path),
        startLat: path[0][1],
        startLon: path[0][0]
      }).then(res => {
        // 获取所有路段的数据
        var pointTask = this.pointTask;
        // 删除现在的路径分段任务
        deleteByRouteJobPathId(task.routeJobPathId).then(() => {
          // 将所有的数据id去掉
          pointTask.forEach(e => {
            delete e.id;
          });
          // 从新添加所有的分段任务
          this.createPathList(pointTask, 0, [], () => {
            typeof fn === "function"
              ? fn({ code: 200 })
              : this.$message({
                  type: "success",
                  message: "保存成功"
                });
          });
        });
      });
    },

    createPathList(pointTaskJSON, index = 0, pointTask_new, fn) {
      if (index >= pointTaskJSON.length) {
        fn && fn(pointTask_new);
        return;
      }
      // 克隆一套路段配置
      var pointTask = JSON.parse(JSON.stringify(pointTaskJSON[index]));
      // 获取选中任务
      var activeTask = this.publicData.activeTask;
      var json = {
        ...pointTask
      };
      delete json.id;
      delete json.graphic;

      // 更新任务
      addRouteJobLine(json).then(res => {
        var json = {
          ...res.data,
          point: res.data.path,
          name: res.data.name,
          actionConfig: res.data.actionConfig,
          color: res.data.color
        };
        // 添加数据
        pointTask_new.push(json);
        var showTaskLine = this.$parent.$refs.deviceList.showTaskLine;
        var p = JSON.parse(json.path);
        json.graphic = showTaskLine(p[0], p[p.length - 1], json.color);
        this.createPathList(pointTaskJSON, ++index, pointTask_new, fn);
      });
    },

    /*********************************************************************** */

    /*************************************************************************** */
    /**************** 删除路线逻辑 ************************************************/
    /*************************************************************************** */

    // 第一步调用删除接口
    deleteJobLine(it) {
      // 获取这个路段的下标
      var index = this.publicData.activeTask.pointTask.indexOf(it);
      // this.updateJobPath(index);
      // this.updateTaskArray(index)
      // return;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除当前选中的任务路线
          removeRouteJobLine(it.id).then(() => {
            this.updateJobPath(index);
          });
        })
        .catch(() => {});
    },

    // 修改路线坐标
    updateJobPath(index) {
      var task = this.publicData.activeTask;
      var path = task.path;
      // 刪除掉刪除的坐标下标
      if (index === path.length - 2) {
        // 如果删除的是最后一个
        path.splice(index + 1, 1);
      } else {
        path.splice(index, 1);
      }
      path = path.concat();
      path = this.$parent.unjiaozheng(path);
      // 删除掉原来的几何
      task.graphic &&
        task.graphic.layer &&
        task.graphic.layer.remove(task.graphic);
      // 从新绘制这个几何
      this.$parent.$refs.deviceList.showTaskPath(task, false);
      // 修改任务数据
      updateRouteJobPath({
        id: task.routeJobPathId,
        endLat: path[path.length - 1][1],
        endLon: path[path.length - 1][0],
        hd_device_id: this.publicData.activeDevice.id,
        hd_device_name: this.publicData.activeDevice.name,
        name: task.name,
        path: JSON.stringify(path),
        startLat: path[0][1],
        startLon: path[0][0]
      }).then(res => {
        // 修改路线操作之后
        this.updateTaskArray(index);
      });
    },

    // 对数据路段进行保存
    updateTaskArray(index) {
      // 获取所有路段的数据
      var pointTask = this.pointTask;
      // 删除现在的路径分段任务
      removeRouteJobLines(
        pointTask.map(e => {
          return e.id;
        })
      ).then(() => {
        // 数据库删除成功后
        // 删除掉下标的路段
        var graphic = pointTask[index].graphic;
        // 删除几何
        graphic && graphic.layer && graphic.layer.remove(graphic);
        // 移出数组
        pointTask.splice(index, 1);
        // 修改所有路段的下标
        pointTask.forEach((it, i) => {
          // var pointTask = this.pointTask;
          // 如果存在几何删除几何
          var graphic = it.graphic;
          graphic && graphic.layer && graphic.layer.remove(graphic);
          it.point = [i * 1, i * 1 + 1];
          it.path = JSON.stringify(it.point);
        });

        // 将所有的数据id去掉
        pointTask.forEach(e => {
          delete e.id;
        });
        // 从新添加所有的分段任务
        this.createPathList(pointTask, 0, [], res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.publicData.activeTask.pointTask = res;
          this.setPointTask(res);
        });
      });
    },

    /*-------------------------------------------------------------------------------*/

    /*************************************************************************** */
    /**************** 编辑和选中等相关事件 ************************************************/
    /*************************************************************************** */

    editComplete(res) {
      // 退出编辑
      this.activePath = -1;
      this.skm = null;
      // 从数组中查询出事那个路段被操作了
      var item = this.pointTask.find(e => {
        return e.graphic === res;
      });
      // 修改路线情况
      var path = this.publicData.activeTask.path; //获取路线数组
      // 如果path为大坐标
      if (path[0][0] > 1000) {
        path = this.publicData.activeTask.path = path.map(e => {
          return map3d.esri.webMercatorUtils.xyToLngLat(e[0], e[1]);
        });
      }
      var index = this.pointTask.indexOf(item); //获取下标来确定修改位置
      // 定义线段geometry
      var xy = map3d.esri.webMercatorUtils.xyToLngLat(
        res.geometry.paths[0][0][0],
        res.geometry.paths[0][0][1]
      );
      path[index][0] = xy[0];
      path[index][1] = xy[1];
      xy = map3d.esri.webMercatorUtils.xyToLngLat(
        res.geometry.paths[0][1][0],
        res.geometry.paths[0][1][1]
      );
      path[index + 1][0] = xy[0];
      path[index + 1][1] = xy[1];
      // 删除原路线绘制
      var graphic = this.publicData.activeTask.graphic; //获取原路线graphic对象
      graphic && graphic.layer && graphic.layer.remove(graphic); //删除几何
      this.$parent.$refs.deviceList.showTaskPath(
        this.publicData.activeTask,
        false
      ); //根据数据从新绘制一个
      // 修改路段将前后的线路对接起来
      var graphic = this.pointTask[index].graphic; // 删除掉下标的路段
      graphic && graphic.layer && graphic.layer.remove(graphic); // 删除几何
      this.pointTask.forEach((it, i) => {
        // 修改所有路段的下标
        var graphic = it.graphic;
        graphic && graphic.layer && graphic.layer.remove(graphic); // 如果存在几何删除几何
        var showTaskLine = this.$parent.$refs.deviceList.showTaskLine; //获取生成路段的方法
        var p = JSON.parse(it.path); //获取路段下标
        it.graphic = showTaskLine(p[0], p[p.length - 1], it.color); //生成路段根据数据
      });
    },

    selectPathGraphicBefore(graphic) {
      // 判断是否已经存在选中了
      if (this.skm != null) {
        // this.activePath = -1;
        // this.$message({
        //   type: "warning",
        //   message: "已经有选中的请先完成上一次编辑，或退出;"
        // })
        this.skm.complete();
        return false;
      }
    },

    // 如果几何被选中
    selectPathGraphic(graphic, skm) {
      // 将状态标记为选中
      var index = -1;
      this.pointTask.find((e, i) => {
        if (e.graphic === graphic) {
          index = i;
          return true;
        }
      });
      this.activePath = index;
      this.skm = skm;
    },

    // 路段选中
    selectPath(it, i) {
      // 触发它的几何编辑
      this.$parent.$refs.deviceList.pathClick(it.graphic);
    },

    // 退出编辑
    backEdit() {
      // 退出编辑
      this.skm && this.skm.complete();
      this.skm = null;
      this.activePath = -1;
    },

    // 配置任务选择退出了
    editTaskBack() {
      this.backEdit();
    }
  }
};
</script>

<style scoped>
.fenduan:hover {
  color: #007ef9;
}

.fenduan {
  cursor: pointer;
}

.info {
  background: #00000080;
  padding: 8px;
  margin-top: 16px;
  border-radius: 4px;
}

.infoName {
  font-size: 16px;
  color: #fff;
}

.infoBox {
  padding: 10px 0 0;
  text-indent: 2em;
  line-height: 19px;
  color: #e8e8e8;
}

.pathLine {
  position: absolute;
  top: 200px;
  left: 8px;
  width: 300px;
  border-radius: 6px;
  color: #fff;
  bottom: 10px;
}

.pathList {
  background: #131f2da8;
  padding: 8px;
  border-radius: 4px;
  height: 100%;
}

.pathsName {
  padding: 5px 0;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pathsModel {
  background: #ffffff40;
  color: #ffffff;
  border-radius: 3px;
  padding: 8px;
  position: relative;
  margin: 11px 0;
}

.pathsModelBox {
  max-height: calc(100% - 39px);
  overflow: auto;
}

.pathsModelBox::-webkit-scrollbar {
  width: 0px;
}

.modelBox {
  margin-top: 12px;
  color: #ffffff;
  /* display: flex; */
}

.modelName {
  color: #ffffff;
}

.modelBox .dui1 {
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 4px;
}

.modelBox .dui1 > * {
  margin-right: 5px;
}

select {
  width: 100px;
  border-radius: 4px;
}

.closeBtn {
  position: absolute;
  right: 4px;
  cursor: pointer;
  color: #000;
  font-size: 14px;
}

.addPath {
  color: #ffffff;
  cursor: pointer;
}

.addPath:hover {
  color: #35a24c;
}

.editPath {
  position: absolute;
  width: calc(100% - 16px);
  left: 8px;
  padding: 8px;
  top: 135px;
  background: #000000a8;
  border-radius: 4px;
}

.infoName {
  margin-bottom: 15px;
}

.row {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.row input[type="text"] {
  border-radius: 4px;
  background: #cccccc;
  border: 0;
  padding: 4px;
}

.footor {
  display: flex;
  justify-content: space-around;
  padding: 9px;
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

.shansuo {
  color: #e6a23c;
}

.pathsModel.active {
  border-right: solid 11px #007ef9;
}

.backSelectPath {
}
</style>
