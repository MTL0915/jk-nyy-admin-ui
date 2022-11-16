<template>
  <div
    class='toolbars'
    :style='isBack ? "right: 120px;": ""'
  >
    <div
      @click='changeActive(0)'
      :class='active === 0 ? "" : ""'
    >
      <i class='el-icon-map-location' />
      <el-select
        v-model="base"
        @change="changeBaseList"
        size='mini'
        filterable
        placeholder="请选择"
      >
        <el-option
          v-for="(item,i) in bases"
          :key="i"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- <span style='width: 150px;display: inline-block;white-space: nowrap;overflow: hidden;'>{{name}}</span> -->
      <i class='el-icon-arrow-down' />
      <div class='menuList'>
        <el-radio-group
          v-model="base"
          @change="changeBaseList"
        >
          <el-radio
            v-for='(it,i) in bases'
            :key='i'
            :disabled='!it.exist_geometry && !it.geometry'
            :class='{ colore : !it.exist_geometry && !it.geometry }'
            :label="it.id"
          >
            {{ it.name }}
            <span
              v-show='!it.geometry'
              style='color:#c79d9d;font-size:12px;'
            >{{"(未绘制)"}}</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div
      @click='changeActive(1)'
      :class='active === 1 ? "active" : ""'
    >
      <i class='el-icon-coin' />
      图层
      <i class='el-icon-arrow-down' />
      <div class='menuList'>
        <el-radio-group v-model="topic">
          <el-radio
            @change='showAllDevice'
            label="sbxx"
          > 设备信息 </el-radio>
          <el-radio
            @change='showAllJd'
            label="jdxx"
          > 基地信息 </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div
      v-show='topic === ""'
      @click='changeActive(2)'
      :class='active === 2 ? "active" : ""'
    >
      <i class='el-icon-coin' />
      图例
      <i class='el-icon-arrow-down' />
      <div class='menuList'>
        <el-checkbox-group
          v-model="checkList"
          @change='changeLayerType'
        >
          <el-checkbox
            @change='showDeviceInfo'
            label="xxzs"
          > 设备信息 </el-checkbox>
          <el-checkbox
            @change='showWarnInfo'
            label="yjxx"
          > 预警信息 </el-checkbox>
          <el-checkbox
            @change='showSxtInfo'
            label="sxt"
          > 摄像头 </el-checkbox>
          <el-checkbox
            v-for='(it,i) in layerTypes'
            :key='i'
            :label="it.name"
          >{{it.name}}{{it.count?"("+it.count+")":""}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div
      @click='changeActive(3)'
      :class='active === 3 ? "active" : ""'
    >
      <i class='el-icon-suitcase' />
      工具箱
      <i class='el-icon-arrow-down' />
      <div class='menuList'>
        <div
          class='cl'
          @click='drawLine'
        >测线</div>
        <div
          class='cl'
          @click='drawArea'
        >测面</div>
        <div
          class='cl'
          @click='clearDraw'
        >退出</div>
      </div>
    </div>
    <div
      class='goEdit'
      @click='goEdit'
      v-if="checkBasePermission2()"
    >编辑 </div>
    <div
      class='goEdit'
      v-if='isBack'
      style='right: -114px;'
      @click='callBack'
    >退出</div>
  </div>
</template>

<script>
import { loadCss, loadModules } from 'esri-loader'
import { mapGetters } from 'vuex'
import { baseListByOrgIds } from '@/api/map3d/index.js'
import { map3d } from "@/utils/jiankun_map";
import checkBasePermission from "@/utils/base_permission";

export default {
  props: {
    baseChange: {
      type: Function,
      default: function () { }
    },

    typeChange: {
      type: Function,
      default: function () { }
    },

    layerTypes: {
      type: Array,
      default: function () { return [] }
    },

    esri: {
      type: Object,
      default: function () { return {} }
    },

    // 退出回调函数 一般用于访问设置退出
    isBack: {
      type: Boolean,
      default: false
    },
    callBack: {
      type: Function,
      default: function () {

      }
    },

  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  watch: {
    layerTypes: function () {
      // this.checkList = this.layerTypes.map((e)=>{ return e.name });
      this.checkList = ["基地", "地块"]
      this.changeLayerType(this.checkList);
    },

    mode: function () {
      // 如果专题模式变化了
      // 清除掉上一个专题
      this.clearTopic()
      // 加载这个专题
      this.loadTopic();
    }
  },
  data () {
    return {
      name: "广东省农业推广总站",
      active: 4,
      checkList: this.layerTypes.map((e) => { return e.name }),//["温室大棚","种植地块","鱼塘","气象站","墒情监测","水质监测"],
      // checkList: [""],
      checkLists: [
        { name: "温室大棚", count: "" },
        { name: "种植地块", count: "5" },
        { name: "鱼塘", count: "" },
        { name: "气象站", count: "" },
        { name: "墒情监测", count: "" },
        { name: "水质监测", count: "" }
      ],
      bases: [],
      base: "",
      topic: "",
      // 情景模式
      mode: "",
      ld: {
        show: false,
        length1: 0,
        length2: 0,
        length3: 0
      },

    }
  },
  mounted () {
    // 加载基地id列表
    this.getBaseArray();
  },
  methods: {
    checkBasePermission,
    checkBasePermission2 () {

      for (let i = 0; i < this.bases.length; i++) {
        if (this.base === this.bases[i].id) {
          return this.checkBasePermission(this.bases[i].bs_org_id, this.bases[i].id)
        }
      }
      return false
    },
    // 显示全部设备
    showAllDevice (evt) {
      this.baseChange("allDevice");
    },

    showAllJd () {
      this.baseChange("all");
    },

    goEdit () {
      // location.href = './map?mode=false&base_id=' + this.$parent.base_id
      open('./map?mode=false&base_id=' + this.$parent.base_id);
    },

    changeActive (index) {
      if (this.active === index) this.active = 4;
      else this.active = index;
    },

    // 根据组织id获取基地列表
    getBaseArray () {
      // 组织id
      var id = this.id
      // 根据接口获取基地列表
      baseListByOrgIds(true).then((e) => {
        // 绑定基地数组
        e.data.unshift({ exist_geometry: 1, value: '全部基地', name: "全部基地", id: "all" })
        this.bases = e.data.map((e) => { e.value = e.name; return e; });
        // 显示选中基地
        var selectBase = e.data.find((e) => { return e.id === this.$parent.base_id });
        // 显示名称
        this.name = selectBase.name;
        this.base = this.$parent.base_id;
      })
    },

    // 切换基地
    changeBaseList (id) {

      var base = this.bases.find((e) => { return e.id === id });
      if (base.exist_geometry === 0) {
        return;
      }
      this.name = base.name;
      this.baseChange(id);
    },

    changeLayerType (a) {
      if (this.isShowDeviceInfo) {
        this.isShowDeviceInfo = false;
        return;
      }
      this.typeChange(a);
    },

    showDeviceInfo (bool) {
      this.isShowDeviceInfo = true;
      if (bool) {
        // 展示所有的设备信息浮层 
        this.$parent.showDeviceInfo()
      } else {
        // 隱藏所有的设备信息浮层 
        this.$parent.hideDeviceInfo()
      }
    },

    showWarnInfo (bool) {
      this.isShowDeviceInfo = true;
      if (bool) {
        // 展示所有的设备信息浮层 
        this.$parent.showWarnInfo()
      } else {
        // 隱藏所有的设备信息浮层 
        this.$parent.hideWarnInfo()
      }
    },

    showSxtInfo (bool) {
      this.isShowDeviceInfo = true;
      if (bool) {
        // 展示所有的设备信息浮层 
        this.$parent.showSxtInfo()
      } else {
        // 隱藏所有的设备信息浮层 
        this.$parent.hideSxtInfo()
      }
    },

    drawLine () {
      this.$parent.measure.activeLine();
    },

    drawArea () {
      this.$parent.measure.activeArea();
    },

    clearDraw () {
      this.$parent.measure.remove();
    },

    measure (type, fn) {
      map3d.Util.draw(type, (e) => {
        fn && fn(e.graphic.geometry)
      }, this.view);
    },

  }
}
</script>

<style>
.toolbars .clBox .drawBtn:active {
  transform: scale(0.9);
}

.toolbars .clBox .drawBtn {
  background: #05a9f7;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  transform: scale(1);
  transition: all 0.25s;
}

.toolbars .clBox {
  position: absolute;
  background: #fff;
  right: 0;
  top: 51px;
  border-radius: 4px;
  padding: 0 17px;
}

.toolbars .goEdit {
  position: absolute;
  right: -59px;
  width: 50px;
  height: 43px;
  background: #ffffff;
  color: #272727;
  min-width: auto;
  top: 0;
  border-radius: 4px;
  align-items: center;
}

.toolbars {
  position: absolute;
  top: 15px;
  right: 65px;
  display: flex;
  background: #fff;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px #a9a4a4;
  user-select: none;
}

.toolbars > div {
  padding: 7px;
  border: solid 1px #eeeeee;
  cursor: pointer;
  position: relative;
  min-width: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toolbars > div.active .menuList {
  display: block;
}

.toolbars .menuList {
  display: none;
  position: absolute;
  background: #fff;
  min-width: 100%;
  left: 0;
  top: 44px;
  padding: 5px;
  text-align: left;
  box-shadow: 0px 0px 3px #a9a4a4;
}

.toolbars .el-checkbox {
  width: 100%;
}

.toolbars .el-radio-group {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
}
.toolbars .el-radio-group > * {
  padding: 5px 0;
}

.toolbars .colore {
  color: #b3b2b2;
}

.toolbars .cl {
  padding: 10px;
}

.toolbars .cl:hover {
  color: #2376ac;
}

.toolbars input[type="text"] {
  border: none;
  height: 14px;
  line-height: 14px;
}

.toolbars .el-select__caret.el-input__icon {
  display: none;
}
</style>