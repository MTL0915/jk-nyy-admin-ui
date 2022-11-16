<template>
  <div class="addTask">
    <!-- 头部 -->
    <div class="addTaskHead">
      <img
        @click="back"
        :src="require('@/assets/img/Plan/drawLineMap/qp/jtz.png')"
      />
      <span @click="back" style="font-size:14px;">作业任务内容</span>
    </div>
    <!-- 身体 -->
    <div class="">
      <div class="addTaskModel">
        <div class="addTaskModelName">设备名称：</div>
        <div>{{ form.hd_device_name }}</div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">任务名称：</div>
        <div><input class="inputStyle" type="text" v-model="form.name" /></div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">任务类型：</div>
        <div>
          <select class="taskType inputStyle" v-model="form.routeJobTypeId">
            <option
              v-for="(it, i) in publicData.taskType"
              :key="i"
              :value="it.id"
              >{{ it.name }}</option
            >
          </select>
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">执行速度：</div>
        <div>
          <el-slider
            style="width: 150px;"
            v-model="form.speed"
            :step="0.1"
            :max="1.5"
            show-stops
          >
          </el-slider>
        </div>
      </div>
      <!-- <div class='addTaskModel'>
                <div class='addTaskModelName'></div>
                <div class=''>当前剩余：12.9L </div>
            </div> -->
      <div class="addTaskModel">
        <div class="addTaskModelName">操作模式</div>
        <div class="flex width">
          <el-radio-group v-model="form.controlMode">
            <el-radio :label="1">手动</el-radio>
            <el-radio :label="2">自动</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">操作机手：</div>
        <div>
          <input
            type="text"
            v-model="form.operationUser"
            class="taskType inputStyle"
          />
        </div>
      </div>

      <div class="addTaskModel" v-show="form.controlMode === 2">
        <div class="addTaskModelName">开启日期：</div>
        <div>
          <el-date-picker
            v-model="form.startDate"
            size="mini"
            style="width:160px;"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="addTaskModel" v-show="form.controlMode === 2">
        <div class="addTaskModelName">结束日期：</div>
        <div>
          <el-date-picker
            v-model="form.endDate"
            size="mini"
            style="width:160px;"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptionsEnd"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="addTaskModel" v-show="form.controlMode === 2">
        <div class="addTaskModelName">任务周期：</div>
        <div class="timeZhouQi">
          <div
            @click="clickZhouQi(1)"
            :class="{ active: weeks.indexOf(1) > -1 }"
          >
            星期一
          </div>
          <div
            @click="clickZhouQi(2)"
            :class="{ active: weeks.indexOf(2) > -1 }"
          >
            星期二
          </div>
          <div
            @click="clickZhouQi(3)"
            :class="{ active: weeks.indexOf(3) > -1 }"
          >
            星期三
          </div>
          <div
            @click="clickZhouQi(4)"
            :class="{ active: weeks.indexOf(4) > -1 }"
          >
            星期四
          </div>
          <div
            @click="clickZhouQi(5)"
            :class="{ active: weeks.indexOf(5) > -1 }"
          >
            星期五
          </div>
          <div
            @click="clickZhouQi(6)"
            :class="{ active: weeks.indexOf(6) > -1 }"
          >
            星期六
          </div>
          <div
            @click="clickZhouQi(7)"
            :class="{ active: weeks.indexOf(7) > -1 }"
          >
            星期日
          </div>
        </div>
      </div>
      <div class="addTaskModel" v-show="form.controlMode === 2">
        <div class="addTaskModelName">开始时间：</div>
        <div>
          <el-time-picker
            size="mini"
            style="width:160px;"
            v-model="startTimeForm"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </div>
      </div>
    </div>

    <div class="footor">
      <!-- <div class='edit' @click='edit'>
                <span>编辑</span>
            </div> -->
      <!-- <div class='edit' @click='play'>播放</div> -->
      <div class="edit" @click="execute">执行</div>
      <div class="edit" @click="update_task">保存</div>
      <div class="close" @click="del">删除</div>
      <div class="close" @click="back">返回</div>
    </div>
  </div>
</template>

<script>
import {
  getRouteJobPath, //获取任务路线数据
  getRouteJobLine, //获取子任务的数据
  removeRouteJob, //删除任务数据
  updateRouteJob //修改任务数据
} from "@/api/map3d/drawMap";
window.xs = 0; //-0.000005;
window.ys = 0; //0.00001;
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
        return {};
      }
    },
    deviceWs: {
      type: Object,
      default: () => {}
    },
    ws: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        hd_device_name: "1号无人喷药车",
        name: "喷药作业",
        taskType: "喷药",
        operationUser: "",
        controlMode: 1,
        routeJobTypeId: "",
        speed: "",
        mode: 1, //模式
        czjs: "廖威仲",
        startDate: "",
        endDate: "",
        endTime: "",
        startTime: "",
        weeks: [1, 2, 3, 4, 5],
        color: "#ff0000"
      },
      task: {},
      isContinueTask: false, // 是否等待执行
      graphic: null,
      weeks: [],
      startTimeForm: new Date(),
      startTime: "00:00:00",
      endTime: "23:59:59",
      pickerOptions: {
        disabledDate(time) {
          var d = new Date();
          d.setDate(d.getDate() - 1);
          return time.getTime() <= d * 1;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },

  watch: {
    "publicData.activeTask"(it) {
      if (!it.id) {
        return;
      }
      this.task = it;
      if (it.startTime) {
        // 解决一下开始任务时间转化的问题
        this.startTimeForm = new Date("2020-1-13 " + it.startTime + ":00");
      }
      // 解决一下开始任务周几转化的问题
      if (it.weeks === "" || !it.weeks) {
        this.weeks = [];
      } else if (it.weeks.push) {
        this.weeks = it.weeks;
      } else {
        this.weeks = it.weeks.split(",").map(e => {
          return e * 1;
        });
      }
      for (var i in this.form) {
        this.form[i] = it[i];
      }

      // 判断这个任务时候已经在加载过了
      if (it.path && it.pathData) {
        // 将选中任务传入 显示路径
        this.$parent.$refs.deviceList.showTaskPath(it);
        // 访问成功后 调用pathList的刷新事件 显示子任务路段
        this.$parent.$refs.pathList.setPointTask(it.pointTask);
        // 生成路径任务线段
        var pointTask = it.pointTask;
        for (var i in pointTask) {
          var e = pointTask[i];
          var showTaskLine = this.$parent.$refs.deviceList.showTaskLine;
          var p = JSON.parse(e.path);
          e.graphic = showTaskLine(p[0], p[p.length - 1], e.color);
        }
        // 判断是否需要执行
        if (this.isContinueTask) {
          this.continueTask();
        }
        return;
      }
      // 当选中任务的时候 获取路线数据
      getRouteJobPath(it.routeJobPathId).then(e => {
        // 获取任务路线
        if (e.data.content[0]) {
          // 注入线段
          it.path = e.data.content[0].path
            ? JSON.parse(e.data.content[0].path)
            : [];
          //
          it.path = this.$parent.jiaozheng(it.path);
          // 注入线段数据
          it.pathData = e.data.content[0];
          // 将选中任务传入 显示路径
          this.$parent.$refs.deviceList.showTaskPath(it);
          // 加载任务子任务数据
          getRouteJobLine(it.routeJobPathId).then(e => {
            // 当任务被选中的时候
            var showTaskLine = this.$parent.$refs.deviceList.showTaskLine;
            // 当任务被选中的时候
            it.pointTask =
              e.data.content.length > 0
                ? e.data.content.map(e => {
                    var p = JSON.parse(e.path);
                    return {
                      ...e,
                      point: p,
                      name: e.name,
                      taskType: e.routeJobActionId,
                      color: e.color,
                      graphic: showTaskLine(p[0], p[p.length - 1], e.color)
                    };
                  })
                : [];
            // 访问成功后 调用pathList的刷新事件
            this.$parent.$refs.pathList.setPointTask(it.pointTask);
            // 判断是否需要执行
            if (this.isContinueTask) {
              this.continueTask();
            }
          });
        }
        return e;
      });
    }
  },

  methods: {
    clickZhouQi(XQ) {
      var weeks = this.weeks;
      if (weeks.indexOf(XQ) != -1) {
        weeks.splice(weeks.indexOf(XQ), 1);
      } else {
        weeks.push(XQ);
        weeks.sort();
      }
    },

    test1() {
      this.endTime =
        this.form.endTime.getHours() +
        ":" +
        this.form.endTime.getMinutes() +
        ":" +
        this.form.endTime.getSeconds();
    },

    test(e) {
      this.startTime =
        this.form.startTime.getHours() +
        ":" +
        this.form.startTime.getMinutes() +
        ":" +
        this.form.startTime.getSeconds();
    },

    changeTaskType() {
      var data = this.publicData.taskType.find(e => {
        return this.form.taskType === e.id;
      });
      this.form.taskTypeId = data.id;
      this.form.taskTypeName = data.name;
    },

    // 开始绘制路径
    drawClick() {
      // 启动绘制功能
      this.draw();
    },

    draw() {
      // 绘制线段
      map3d.Util.draw("polyline", res => {
        // 将几何保存进入
        this.graphic = res.graphic;
      });
    },

    back() {
      // 隐藏自己
      this.$parent.showEditTask = false;
      // 隐藏路径列表
      this.$parent.showPathlist = false;
      // 显示任务列表
      this.$parent.showtaskList = true;
      // 显示设备列表
      this.$parent.showDeviceList = true;
      // 将状态值标注为退出添加设备
      this.publicData.isAddtask = false;
      // 隐藏当前几何的图层
      this.publicData.activeTask.graphic.layer.removeAll(); // visible = false;
      // 清空当前选中的任务
      this.publicData.activeTask = {};
      // 调用路线任务模块设置
      this.$parent.$refs.pathList.editTaskBack();
    },

    // 删除
    del() {
      this.$confirm("此操作将删除此任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var task = this.publicData.activeTask;
          removeRouteJob(task.id).then(res => {
            // 隐藏自己
            this.$parent.showEditTask = false;
            // 隐藏路径列表
            this.$parent.showPathlist = false;
            // 显示任务列表
            this.$parent.showtaskList = true;
            // 显示设备列表
            this.$parent.showDeviceList = true;
            // 将状态值标注为退出添加设备
            this.publicData.isAddtask = false;
            // 清除掉绘制的线
            this.$parent.$refs.deviceList.clearCurrentPath();
            // 将当前任务从选中设备中清除掉
            var index = this.publicData.activeDevice.task.indexOf(
              this.publicData.activeTask
            );
            this.publicData.activeDevice.task.splice(index, 1);
            this.publicData.activeTask = {};
          });
        })
        .catch(() => {});
    },

    // 改变线段颜色
    changePathColor(event) {
      this.$parent.$refs.deviceList.changeCurrentPathColor(event.target.value);
    },

    // 修改编辑当前几何的线段
    edit() {
      // 找到当前选中任务
      var task = this.publicData.activeTask;
      // 找到几何
      var graphic = task.graphic;
      // 将几何变成编辑模式
      map3d.Util.edit(graphic);
    },

    update_task_speed() {
      if (this.update_task_speed_key) {
        clearTimeout(this.update_task_speed_key);
      }
      this.update_task_speed_key = setTimeout(() => {
        this.update_task();
      }, 1000);
    },

    update_task() {
      // 获取当前选中的任务
      var task = this.form;
      var startDate = new Date(task.startDate);
      startDate = startDate
        ? startDate.getFullYear().toString() +
          "-" +
          (startDate.getMonth() + 1 > 9
            ? startDate.getMonth() + 1
            : "0" + (startDate.getMonth() + 1)) +
          "-" +
          (startDate.getDate() > 9
            ? startDate.getDate()
            : "0" + startDate.getDate())
        : "";

      var endDate = new Date(task.endDate);
      endDate = task.endDate
        ? endDate.getFullYear().toString() +
          "-" +
          (endDate.getMonth() + 1 > 9
            ? endDate.getMonth() + 1
            : "0" + (endDate.getMonth() + 1)) +
          "-" +
          (endDate.getDate() > 9 ? endDate.getDate() : "0" + endDate.getDate())
        : "";

      var startTime = this.startTimeForm;
      startTime = startTime
        ? (startTime.getHours() > 9
            ? startTime.getHours()
            : "0" + startTime.getHours()) +
          ":" +
          (startTime.getMinutes() > 9
            ? startTime.getMinutes()
            : "0" + startTime.getMinutes())
        : "";

      var weeks = this.weeks.join(",");

      // 判断是否有选择任务类型
      if (this.form.controlMode != 1) {
        // 如果不是手动模式
        // 判断时间是否不为空
        if (!startTime || !startDate || !endDate || weeks === "") {
          this.$message({
            message: "自动模式下 请补全时间配置信息",
            type: "warning"
          });
          return;
        }
      }

      var id = this.publicData.activeTask.id;
      var routeJobPathId = this.publicData.activeTask.routeJobPathId;
      var hd_device_id = this.publicData.activeTask.hd_device_id;

      updateRouteJob({
        ...task,
        hd_device_id,
        startDate,
        id,
        routeJobPathId,
        endDate,
        startTime,
        weeks,
        path: undefined,
        pathData: undefined,
        pointTask: undefined,
        graphic: undefined
      }).then(res => {
        if (res.code === 200) {
          delete res.data.hd_device_id;
          for (var i in res.data) {
            this.publicData.activeTask[i] = res.data[i];
          }
          this.$parent.$refs.pathList.update(e => {
            if (e.code == 200) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
            } else {
              this.$message({
                type: "error",
                message: "保存失败"
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "保存失败"
          });
        }
      });
    },

    save() {},

    play() {
      // 关闭掉现在的模式
      this.$parent.showEditTask = false;
      this.$parent.showPathlist = false;
      this.$parent.showTaskNotes = true;
      this.$parent.$refs.taskNotes.createAnimate(
        this.publicData.activeTask.path
      );
    },

    // 执行
    execute() {
      if (this.deviceWs.controlType === 3) {
        // 如果是现场控制则取消本次任务执行
        return this.$message({
          showClose: true,
          message:
            "该设备目前为手动控制模式，无法执行任务，请关闭掉手动在此尝试",
          type: "warning"
        });
      }
      this.ui_execute();
      return;
    },

    // 继续任务
    continueTask() {
      // 首先获取当前的任务路径
      var taskPath = this.task.path.concat();
      // 获取当前设备的坐标点
      var point = this.deviceWs.property_values.location;
      // 计算最近的点
      var dif = taskPath
        .map((e, i) => {
          return { d: this.diff(e, [point[1], point[0]]), point: e, i };
        })
        .sort((a, b) => {
          return a.d - b.d;
        });
      // 将最近的第一个数组坐标设备目标点  以及下标位置
      var index = dif[0].i;
      // 截取任务路由
      // taskPath.splice(0,index+1);
      // 发送任务
      this.ws.setUpInstructions(
        this.task.id,
        () => {
          this.ws.executeInstructions(this.task.id, e => {
            if (e.code == "500") {
              this.$message({
                type: "error",
                message: e.msg
              });
            } else {
              this.$message({
                type: "success",
                message: "继续上一次任务成功，开始任务；"
              });
            }
          });
        },
        index
      );
    },

    // 求兩點之間的距離
    diff(p1, p2) {
      var x = Math.abs(p1[0] - p2[0]);
      var y = Math.abs(p1[1] - p2[1]);
      var diff = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      return diff;
    },

    // 执行导航后的UI操作
    ui_execute() {
      // 然后进入到切换模式
      this.$parent.$refs.navigation.toNavigation(this.task).then(() => {
        // 退出任务详细
        this.back();
        // 切换到实时监控界面
        this.$parent.headActive = 1;
      });
    }
  }
};
</script>

<style scoped>
.addTask {
  position: absolute;
  top: 60px;
  right: 4px;
  background: #131f2da8;
  width: 278px;
  border-radius: 4px;
  color: #ffffff;
  /* padding: 8px; */
  /* transform: translate(-50%,-100%);
        font-size: 12px; */
}

.addTaskHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid 1px #ffffff;
  padding: 8px;
  display: flex;
  align-items: center;
}
.addTaskHead img {
  width: 12px;
  cursor: pointer;
}
.addTaskModel {
  display: flex;
  padding: 8px 19px;
  align-items: center;
}
.addTaskModelName {
  width: 62px;
  flex-shrink: 0;
}
input[type="text"],
select {
  width: 160px;
}
input[type="text"],
select,
button {
  border-radius: 4px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.width {
  width: 100%;
}
.cur {
  cursor: pointer;
}
.footor {
  display: flex;
  justify-content: space-evenly;
  padding: 9px;
  font-size: 12px;
  margin-top: 10px;
}
.edit {
  padding: 6px 12px;
  background: #318ad5;
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
  /* margin-right: 28px; */
}
.del {
  padding: 6px 12px;
  background: #ff0000;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
}
.inputStyle {
  padding: 6px 6px;
  border: none;
  border-radius: 1px;
  background: #84848480;
  color: #fff;
}

.timeZhouQi {
  display: flex;
  flex-wrap: wrap;
}
.timeZhouQi > div {
  padding: 4px;
  background: #575e6ba8;
  color: #ffffff;
  border-radius: 4px;
  margin: 5px;
  cursor: pointer;
}
.timeZhouQi > div:hover {
  background: #318ad5a8;
}
.timeZhouQi > div.active {
  background: #318ad5;
}
</style>
