<template>
  <div class="vr_list" v-show="show">
    <div class="title">场景热点</div>
    <div class="hotTypeSelect">
      <div
        @click="activeType = 'all'"
        :class="activeType == 'all' ? 'active' : ''"
      >
        全部热点
      </div>
      <div
        @click="activeType = 'link'"
        :class="activeType == 'link' ? 'active' : ''"
      >
        链接跳转
      </div>
      <div
        @click="activeType = 'jump'"
        :class="activeType == 'jump' ? 'active' : ''"
      >
        场景漫游
      </div>
      <div
        @click="activeType = 'video'"
        :class="activeType == 'video' ? 'active' : ''"
      >
        监控摄像
      </div>
      <div
        @click="activeType = 'device'"
        :class="activeType == 'device' ? 'active' : ''"
      >
        设备详情
      </div>
    </div>
    <div class="listTitle">该类型热点有 ({{ dataLength }})个</div>
    <div class="list">
      <div v-show="dataLength" class="title_ts">
        <span>该类型还没有创建</span>
      </div>
      <div v-show="data.length" v-for="(it, i) in data" :key="i">
        <div v-show="activeType === 'all' || it.data.config.hotType == activeType" class="listMode">
          {{ it.data.name }}
          <div class="opt">
            <span @click="lookAt(it)">定位</span>
            <span @click="editAnchor(it)" v-show="isEdit">修改</span>
            <span @click="deleteAnchor(it)" v-show="isEdit">刪除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footor">
      <div class="footor_create" v-show="isEdit" @click="_create">
        + 创建热点
      </div>
      <div class="footor_close" @click="_close">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },

    create: {
      type: Function,
      default: new Function()
    },

    edit: {
      type: Function,
      default: new Function()
    },

    delete: {
      type: Function,
      default: new Function()
    }
  },
  data() {
    return {
      data: [],
      show: false,
      activeType: "link",
      dataLength: 0
    };
  },
  methods: {
    getDataLength() {
      this.dataLength = this.data.filter(e => {
        e.data.config.hotType == this.activeType;
      }).length;
    },

    setAnchors(Anchors) {
      // this.anchors = Anchors;
      this.data = Anchors;
    },

    _close() {
      this.show = false;
      this.close && this.close();
    },

    _create() {
      this.create();
    },

    editAnchor(anchor) {
      this.edit(anchor);
    },

    deleteAnchor(anchor) {
      this.delete(anchor);
    },

    lookAt(anchor) {
      var angle = Math.floor(
        180 /
          (Math.PI /
            Math.atan(
              Math.pow(Math.abs(anchor.position.x), 2) /
                Math.pow(Math.abs(anchor.position.z), 2)
            ))
      );
      if (anchor.position.x > 0) {
        if (anchor.position.z < 0) {
          angle = 270 + angle;
        } else {
          angle = 90 - angle;
        }
      } else {
        if (anchor.position.z < 0) {
          angle = 270 - angle;
        } else {
          angle = 90 + angle;
        }
      }
      lon = angle;
      var xx = Math.sqrt(
        Math.pow(anchor.position.x, 2) + Math.pow(anchor.position.z, 2)
      );
      angle = Math.abs(
        Math.floor(180 / (Math.PI / Math.atan(xx / anchor.position.y)))
      );
      if (anchor.position.y < 0) {
        angle = -1 * (90 - angle);
      } else {
        angle = 90 - angle;
      }
      lat = angle;
    }
  }
};
</script>

<style>
.vr_list {
  position: absolute;
  padding: 8px 15px;
  color: #00a1ff;
  background: #000000a8;
  border-radius: 4px;
  top: 8px;
  right: 8px;
  /* bottom: 165px; */
  height: calc(100% - 165px);
  width: 350px;
  border-top: solid 2px #00a1ff;
  border-bottom: solid 2px #00a1ff;
  z-index: 99;
}

.vr_list .title {
  padding: 15px 0;
}

.vr_list .hotTypeSelect {
  display: flex;
  flex-wrap: wrap;
}

.vr_list .hotTypeSelect > div {
  width: calc(25% - 5px);
  text-align: center;
  border: solid 1px #00a1ff;
  margin: 2.5px;
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
}

.vr_list .hotTypeSelect > div:hover {
  background: #00a1ff;
}

.vr_list .hotTypeSelect .active {
  background: #00a1ff;
}

.vr_list .list {
  height: calc(100% - 230px);
  overflow-x: auto;
}

.vr_list .list::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.vr_list .footor {
  display: flex;
  text-align: center;
  margin-top: 8px;
}

.vr_list .footor .footor_create {
  width: 70%;
  background: #00a1ff;
  padding: 15px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  transform: all 0.25s;
}

.vr_list .footor .footor_create:hover {
  background: #000000;
}

.vr_list .footor .footor_close {
  width: 30%;
  background: #000000a8;
  padding: 15px;
  box-sizing: border-box;
  color: #ffffff;
}

.vr_list .title_ts {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vr_list .listTitle {
  padding: 22px 0px;
}

.vr_list .listMode {
  padding: 10px 0px;
  border-bottom: solid 1px #ffffff;
  color: #ffffff;
  position: relative;
  cursor: pointer;
}
.vr_list .listMode:hover {
  background: #ffffff22;
}

.vr_list .opt {
  position: absolute;
  right: 0;
  top: 11px;
  cursor: pointer;
  transform: all 0.25s;
}

.vr_list .opt > span:hover {
  color: #00a1ff;
}
</style>
