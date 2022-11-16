<template>
  <div>
    <div
      class='taskNotes'
      v-if='false'
    >
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
          <div class='taskInfoModel'>
            <div class='taskName'>开始时间：</div>
            <div>2020-10-25 10:35</div>
          </div>
          <div class='taskInfoModel'>
            <div class='taskName'>结束时间：</div>
            <div>2020-10-25 10:35</div>
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
          @click='back'
        >返回</div>
      </div>
    </div>

    <!-- 控制界面 -->
    <div class='optControl'>
      <div>
        <el-slider
          v-model="index"
          @change='changeIndex'
          max='100'
        ></el-slider>
      </div>
      <div class='controlBox'>
        <i
          class='el-icon-refresh-left'
          @click='reset'
        ></i>
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
        <div
          class='speed'
          @click='changeSpeed'
        > x{{speed}} </div>
      </div>
    </div>

    <!-- <comp-noManList></comp-noManList> -->
    <!-- <comp-noManOpt style='position: absolute;bottom: 0;'></comp-noManOpt> -->
  </div>
</template>

<script>
import animate from './js/arcgis_animate';
import { map3d } from "@/utils/jiankun_map";

export default {
  components: {
    // compNoManList,
    // compNoManOpt
  },
  data () {
    return {
      index: 0,
      speed: 1,
      status: 0,
      layer: null
    }
  },
  mounted () {
    
  },
  methods: {

    createAnimate (paths) {
      // 路线对象
      var lineGraphic = map3d.Util.createGraphic({
        geometry: {
          type: "polyline",
          hasZ: false,
          hasM: true,
          paths: [[]],
          spatialReference: { wkid: 102100 }
        },
        symbol: {
          type: "simple-line",
          color: [255, 0, 0],
          width: "5px",
          style: "short-dot"
        }
      });
      // 
      var layer = this.layer = map3d.Util.addGraphic(lineGraphic, "liaoweizhong")

      var point = new map3d.esri.Point({
        type: "point",
        x: paths[0][0],
        y: paths[0][1],
        spatialReference: { wkid: 102100 }
      })
      var pointSymbol = {
        type: "point-3d",
        symbolLayers: [{
          type: "object",
          width: 2, //模型宽度
          height: 2, //模型高度
          resource: {
            // href: "https://developers.arcgis.com/javascript/latest/sample-code/import-gltf/live/tent.glb"
            href: "/static/model/qiche.gltf"
          },
          heading: 88 //朝向
        }]
      };
      var pointGraphic = window.pointGraphic = map3d.Util.createGraphic({
        geometry: point, symbol: pointSymbol
      })

      var layer = map3d.Util.addGraphic(pointGraphic, "liaoweizhong")
      // 创建点动画
      this.animate = new animate(pointGraphic, paths, lineGraphic);

      this.animate.onAnimate((res) => {
        this.status = res.status;
        this.index = parseInt((res.index + 1) / res.analysisPaths.length * 100);
        if (this.index === 100) {
          this.pause();
        }
      })
    },

    pause () {
      this.status = 0
      this.animate.pause();
    },

    play () {
      if (this.index === 100) {
        this.reset();
      }
      this.animate.play();
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
      this.$parent.showTaskNotes = false;
      this.close();
      // this.$parent.$refs.taskNotes.createAnimate(this.publicData.activeTask.path);
    },

    // 重置
    close () {
      if (this.layer) {
        this.layer.removeAll();
      }
      this.reset();
      // 销毁动画函数
      this.animate.destroy();
      this.animate = null;
    }

  }
}
</script>

<style scoped>
.taskNotes {
  position: absolute;
  top: 50px;
  right: 15px;
  background: #00000080;
  width: 185px;
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
  width: 65px;
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