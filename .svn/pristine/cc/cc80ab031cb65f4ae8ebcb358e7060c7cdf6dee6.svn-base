<template>
  <!-- 导航图 -->
  <div
    class='mapBase top_right'
    v-show='point.length != 0'
    @mousewheel='mousewheel'
    @drop="dropfn"
    @dragover="allowDrop"
  >
    <div
      class='box'
      :style='"transform: scale("+scale+");transform-origin:"+x+"% "+y+"%;"'
    >
      <img
        v-if='panorBaseMap'
        :src='panorBaseMap'
      />
      <img
        v-if='!panorBaseMap'
        :src='require("@/assets/vr/daohangtu.jpg")'
      />
      <!-- 标注 -->
      <div class='biaoji'>
        <div
          class='bj'
          @click='iconClick(it)'
          :title='it.name'
          v-for='(it,i) in point'
          :key='i'
          :style='"left:"+it.point[0]+"%;top:"+it.point[1]+"%;"'
        >
          <img
            v-show='!id || it.id === id'
            class='point'
            :style='" transform: translate(-0%,-120%) rotateZ("+(angle-45)+"deg);"'
            :src='require("@/assets/vr/keshifanwei.png")'
          />
          <img
            class='shox'
            :src='"@/assets/vr/test1.gif"'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      type: Object,
      default: () => {
        return []
      }
    },
    // 选中的值
    id: {
      type: String,
      default: ""
    },
    // 角度
    angle: {
      type: Number,
      default: 0
    },
    // 图标被点击事件
    iconClick: {
      type: Function,
      default: () => { }
    },

    dropfn: {
      type: Function,
      default: () => { }
    },

    panorBaseMap: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      scale: 1,
      x: 0,
      y: 0
    }
  },
  mounted () {

  },
  methods: {
    mousewheel (res) {
      this.scale += res.deltaY * 0.001;
      // 获取坐标轴
      this.x = res.offsetX;
      this.y = res.offsetY;
    },

    // 拖动结束
    allowDrop (res) {
      event.preventDefault();
    },
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.box > img {
  width: 100%;
  height: 100%;
}
.bj {
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
}
.bj img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}
.bj .point {
  transform-origin: 0 100%;
}
.bj .shox {
  width: 25px;
  height: 25px;
}

.mapBase.top_right {
  /* top: 15px;
        right: 15px; */
}

.mapBase {
  /* width: 300px;
        height: 300px; */
  border-radius: 4px;
  overflow: hidden;
  border: solid 1px #7d7979;
  /* position: absolute; */
}
.mapBase > img {
  width: 100%;
  height: 100%;
}
</style>