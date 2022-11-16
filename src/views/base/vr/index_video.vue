<template>
  <div
    ref='vr'
    :class="{ 'vr_viewMode': !mode , 'vrCur' : vrCur }"
    class="vr"
  >
    <audio
      loop='loop'
      ref='mp'
      :src="require('@/assets/img/vr/sound.mp3')"
      style='opacity:0;position:absolute;'
    ></audio>
    <!-- 提示拖动 -->
    <div
      ref='tishituodongBox'
      :class='{tishituodongBoxhide : showTishituodong1}'
      style='user-select: none!important;z-index:99;position:absolute;left:0;top:0;width:100%;height:100%;background: #00000000;'
    > 
    </div>
    <div
      class='cover'
      v-show='!showTishituodong'
      style='height:100%;width:100%;background:#ffffff00;position:absolute;z-index: 999;top:0;left:0;'
    >
    </div>
    <div
      class='vrName'
      style='user-select: none!important'
    > {{panorname}} </div>
    <!-- 二维码 -->
    <div
      class='imgRWM'
      v-show='!mode'
      :class='{active : imgRWMShow}'
      @click='imgRWMShow = !imgRWMShow'
      style='user-select: none!important'
    >
      <vue-qr
        style='width:100%;height:100%;'
        :logoSrc="imageUrl"
        :text="location.href"
        :size="200"
      ></vue-qr>
    </div>

    <div style='display:none;position:absolute;z-Index: 899999;bottom: 60px;right:0;padding:15px;background:#ffffff'>
      {{ consolelog }}
    </div>
    <vr-video
      :url='vr_video_url'
      :load='init'
      class='video'
    ></vr-video>
    <div
      ref="demo2"
      class="view"
      style="position: absolute;top: 0;left: 0;"
    />
    <add
      v-show="show.add"
      ref="add"
    />
    <div
      v-show="mode"
      class="vr_add"
    >
      <div @click="showEditList"> 热点 </div>
      <!-- <div @click='createCamera'>  </div> -->
    </div>
    <hot-list
      ref="hotList"
      :create="createList"
      :edit="editAnchor"
      :delete="deleteAnchor"
      :isEdit='mode'
    />
    <hot-edit
      v-if="mode"
      ref="hotEdit"
      :panor="panor"
      :edit="editHot"
      :create="createHot"
    />
    <!-- 操作台 -->
    <div
      class="operating"
      v-show='showTishituodong'
    >
      <div class="operatingBtn">
        <div @click="showSceneList = !showSceneList">
          <img
            style="width: 25px;display: block;margin-bottom: 7px;"
            src='@/assets/img/vr/cj.png'
          />
          <span>场景</span>
        </div>
        <div class="sy">
          <el-slider
            class='vrhide'
            style='position: absolute;bottom: 92%;left: 50%;padding: 14px 0px;border-radius: 9px;transform: translateX(-50%);'
            v-model="syValue"
            vertical
            height="100px"
            :max='100'
            :min='0'
            @change='sySize'
          ></el-slider>
          <div style='display: block;margin-bottom: 7px;text-align:center;'>
            <img
              style='width: 25px;'
              v-show='isSy'
              @click='sy'
              src='@/assets/img/vr/sy.png'
            />
            <img
              style='width: 25px;'
              v-show='!isSy'
              @click='sy'
              src='@/assets/img/vr/sy_close.png'
            />
          </div>
          <span>关闭音乐</span>
        </div>
        <div class="sy">
          <div style='display: block;margin-bottom: 7px;text-align:center;'>
            <img
              style='width: 25px;'
              @click='showEditList'
              src='@/assets/img/vr/rd.png'
            />
            <!-- <img style='width: 25px;' v-show='!isSy' @click='sy' src='@/assets/img/vr/sy_close.png' />   -->
          </div>
          <span>热点</span>
        </div>
        <div class="sy">
          <div style='display: block;margin-bottom: 7px;text-align:center;'>
            <img
              style='width: 25px;'
              @click='iframeHotListDisplayShow = !iframeHotListDisplayShow'
              src='@/assets/img/vr/rd.png'
            />
            <!-- <img style='width: 25px;' v-show='!isSy' @click='sy' src='@/assets/img/vr/sy_close.png' />   -->
          </div>
          <span>表单管理</span>
        </div>
        <div
          class=''
          style="padding: 4px 6px;position: absolute;right: 0;cursor: pointer;"
        >
          <img
            style='width: 18px;'
            v-show='!isFullScreen'
            @click='FullScreen'
            src='@/assets/img/vr/fd.png'
          />
          <img
            style='width: 18px;'
            v-show='isFullScreen'
            @click='FullScreen'
            src='@/assets/img/vr/sx.png'
          />
        </div>
      </div>
      <!-- 场景列表 -->
      <div
        :class='showSceneList? "show" : "hide"'
        class="sceneList"
      >
        <!-- <div style='position: absolute;top: -21px;background: #00000080;padding: 4px;color: #fff;'>列表展示</div> -->
        <!-- <div class='leftSco Sco' @click='pervSco'> </div> -->
        <div
          ref='sceneListBox'
          @mousewheel='wheelSco'
        >
          <div
            v-for="(it , i) in sceneList"
            :key="i"
            :class="it.id == sceneId ? 'active' : ''"
            @click="changeScene(it.id)"
            v-show='it.status === 1'
          >
            <!-- <img  :src='require("./logo.png")' /> -->
            <img :src="getPath( it.thumbnailPath )">
            <div class="sceneListName"> {{ it.name }} </div>
          </div>
        </div>
        <!-- <div class='rightSco Sco' @click=' nextSco'> </div> -->
      </div>
    </div>

    <!-- 内部窗口播放 -->
    <div
      v-show="iframeShow"
      class="iframeBox"
    >
      <div class="iframeTitle">{{ iframeTitle }}
        <i
          class="el-icon-close closeIframe"
          @click="iframeShow=false;iframeSrc=''"
        />
      </div>
      <div
        :style="'width:'+iframeWidth+'px;height:'+iframeHeight+'px;'"
        class="iframeWindow"
      >
        <iframe
          :src="iframeSrc"
          frameborder="0"
        />
      </div>
    </div>
    <div
      herf='dragCover'
      v-show='vrCur'
      class='dragCover'
    ></div>
    <!-- 列表弹窗 -->
    <div>
      <!-- 所有的列表热点缩放点 -->
      <div
        class='iframeHotListDisplay'
        :class='{show: iframeHotListDisplayShow}'
      >
        <div
          :style='"border-color:"+(it.config.device_show ? "#0580ff" : "#ffffff")'
          v-for="(it ,i) in iframeHotList"
          :key='i'
          @click='it.config.device_show = !it.config.device_show'
        >{{it.name}}</div>
      </div>
      <div
        v-for="(it ,i) in iframeHotList"
        :key='i'
        class='hotListBox'
        style='position:absolute;'
        :style='"display:"+(it.config.device_show ? "block": "none")+";"+"width:"+it.config.windowWidth+"px;"+"height:"+it.config.windowHeight+"px;"+(it.config.windowPositionLeftOrRight?"left":"right")+":"+it.config.windowPositionLeftOrRightValue+"px;"+(it.config.windowPositionTopOrBottom?"top":"bottom")+":"+it.config.windowPositionTopOrBottomValue+"px;"'
      >
        <div class='title'>
          {{it.name}}
          <i
            @click='it.config.device_show = false'
            class='el-icon-close'
            title='隐藏'
            style='position:absolute;right: 5px;top: 5px;'
          />
        </div>
        <iframe
          style='width: 100%;height: 100%;border:none;'
          v-show='it.config.listType == "1"'
          :src='it.config.hotLink'
        ></iframe>
        <div
          style='width: 100%;height: 100%;'
          v-show='it.config.listType == "2"'
          v-html='it.config.hotHTML'
        >

        </div>
      </div>
    </div>

    <!-- 显示导航图 -->
    <panormap
      class='panorMap'
      :iconClick='iconClick'
      :panorBaseMap="panorBaseMap"
      :id="sceneId"
      :angle='angle'
      :point='panorScene'
    ></panormap>

  </div>
</template>

<script>

import { setToken } from '@/utils/auth'
import * as THREE from 'three'
window.THREE = THREE
var vector3 = new THREE.Vector3()
// import { TrackballControls } from './controls/TrackballControls.js';
import { DragControls } from './controls/DragControls.js'
import { OrbitControls } from './controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from './controls/CSS3DRenderer.js'

// import add from './components/edit';
import anchor from './js/anchor.js'
import { getCameraById } from './data/camera.js'

import hotList from './components/hotList.vue'
import hotEdit from './components/hotEdit.vue'
import panormap from './components/map.vue'

import { get, addPanorViewCount } from '@/api/rsPanor'
import { get as getScene, getByPanorId as getSceneByPanorId } from '@/api/rsPanorScene'
import { get as getAnchor, add as addAnchor, edit as editAnchor, getBySceneId as getAnchorBySceneId, del as delAnchor } from '@/api/rsSceneHotspot'

window.lon = 0; window.lat = 0; window.fovValue = 0;
window.py = 0;
var phi = 0, theta = 0
var lv = 0.05

var _offsetWidth = 0
var _offsetHeight = 0

import { getSxtUrlById } from '@/api/sxt'

import vueQr from 'vue-qr'

import vrVideo from './components/vr_video'

// import dat from 'dat.gui'
export default {
  components: {
    hotList,
    hotEdit,
    vueQr,
    panormap,
    vrVideo
  },
  data: () => ({
    vr_video_url: '/static/test1.mp4',
    domainName: "http://121.32.129.19:8100/" || process.env.VR_IMGPATH,
    consolelog: "测试内容",
    // vr镜面墙
    wall: [],
    // 热点
    anchor: [],
    // 权限
    Authority: {
      edit: false,
      add: false,
      delete: false
    },
    // 显示
    show: {
      add: false
    },
    path: '',
    sceneId: null,
    panorId: null,
    // 是否显示全景列表
    showSceneList: true,
    // 当前选中的场景
    selectScene: null,
    // 全景數據
    panor: null,
    // 是否是编辑模式
    mode: false,
    // 攝像頭
    sceneList: [],
    // iframe配置
    iframeShow: false,
    iframeWidth: 500,
    iframeHeight: 400,
    iframeTitle: '默认弹框',
    iframeSrc: '',

    vrCur: false,
    isVrShow: true,
    showTishituodong: true,
    showTishituodong1: true,
    imageUrl: require("@/assets/img/vr/drag.png"),

    location: window.location,

    imgRWMShow: false,

    panorname: "",
    // 是否全屏
    isFullScreen: false,
    // 是否播放背景音乐
    isSy: true,
    // 音量
    syValue: 80,
    // 是否开启入场动画
    isGoAnimate: true,
    // 初始化角度
    cameraDefault: null,
    // 是否绑定了事件 禁止重复绑定
    isBindEvent: false,
    // 列表数组
    iframeHotList: [],
    // 显示列表的缩放表单
    iframeHotListDisplayShow: false,
    // 导航图参数
    panorScene: [],
    // 导航图角度
    angle: 0,
    // 导航图的底图
    panorBaseMap: ""
  }),
  created () {
    var panorId = this.$router.history.current.query.panorId
    var sceneId = this.$router.history.current.query.sceneId
    var animate = this.$router.history.current.query.isAnimate
    var camera = this.$router.history.current.query.camera
    if (this.$router.history.current.query.token) {
      setToken(this.$router.history.current.query.token, true)
    }
    this.mode = false;
    this.$nextTick(() => {
      this.panorId = panorId
      this.sceneId = sceneId

      this.isGoAnimate = (typeof animate === 'string' ? true : false)
      camera && (eval("this.cameraDefault = " + camera))
      // this.init(panorId)

    })

  },
  mounted () {
    _offsetWidth = document.body.offsetWidth
    _offsetHeight = document.body.offsetHeight
    // 开启iframe监听 主要是双击放大的事件
    this.iframeClick()
  },
  methods: {

    // 导航图图标被点击
    iconClick (res) {
      var id = res.id;
      // 从场景组中找到该场景
      var obj = this.sceneList.find((e) => { return e.id === id });
      if (obj) {
        this.changeScene(id);
      }
    },

    pervSco () {
      this.$refs.sceneListBox.scrollLeft -= 100;
    },

    nextSco () {
      this.$refs.sceneListBox.scrollLeft += 100;
    },

    wheelSco (e) {
      this.$refs.sceneListBox.scrollLeft += e.deltaY / 3;
    },

    getPath (imagePath) {
      return this.domainName + imagePath;
    },
    clickFn (event) {
      var name = null
      var dom = event.target
      for (var i = 0; i < 5; i++) {
        name = dom.getAttribute('v-click')
        if (name) {
          this[name] && this[name](dom)
          break
        }
        dom = dom.parentElement
        if (!dom) {
          break
        }
      }
    },
    init (panorId) {

      // this.loadCamera()
    },
    opt_delete (dom) {
      var anchor = dom.parentElement.anchor
      this.deleteAnchor(anchor)
    },

    deleteAnchor (anchor) {
      if (confirm('是否要删除热点？')) {
        delAnchor(anchor.data.id).then(() => {
          anchor.dom && anchor.dom.remove()
          anchor.position && this.scene.remove(anchor)
          this.anchor.splice(this.anchor.indexOf(anchor), 1)

          // 如果删除的列表
          if (anchor.data.config.hotType === 'list') {
            var l = this.iframeHotList.find((e) => { return e.id === anchor.data.id });
            this.iframeHotList.splice(this.iframeHotList.indexOf(l), 1);
          }
        })
      }
    },

    showMaxBox () {

    },

    showMinBox () {

    },

    jumpScene (param) {
      this.isVrShow = true;
      var _this = this;
      var wall = this.wall
      var anchor = this.anchor
      // 编辑删除释放几何墙
      for (var i in wall) {
        var item = wall[i]
        // item.geometry.dispose(); // 删除几何体
        // item.material.dispose(); // 删除材质
        // item.remove();
        this.scene.remove(item) // 从场景中删除物体
      }
      this.wall = []
      // 删除热点
      for (var i in anchor) {
        var item = anchor[i]
        this.scene.remove(item) // 从场景中删除物体
        item.dom.remove() // 删除映射dom
      }

      this.anchor = []

      // 创建新的几何墙
      // var url = this.conf.vrPath + 'camera/' +  param.path + "/";
      var url = this.domainName + param.path + '/source_';
      // 预加载图片
      var index = 0;
      var p = ["r_m.jpg", 'l_m.jpg', 'u_m.jpg', 'd_m.jpg', 'f_m.jpg', 'b_m.jpg'];

      var juli = 512

      var sides = [
        {
          url_min: url + 'r_2.jpg',
          url_max: url + 'r_1.jpg',
          url: url + 'r.jpg',
          position: [-1 * juli, 0, 0],
          rotation: [0, Math.PI / 2, 0]
        },
        {
          url_min: url + 'l_2.jpg',
          url_max: url + 'l_1.jpg',
          url: url + 'l.jpg',
          position: [juli, 0, 0],
          rotation: [0, -Math.PI / 2, 0]
        },
        {
          url_min: url + 'u_2.jpg',
          url_max: url + 'u_1.jpg',
          url: url + 'u.jpg',
          position: [0, juli, 0],
          rotation: [Math.PI / 2, 0, Math.PI]
        },
        {
          url_min: url + 'd_2.jpg',
          url_max: url + 'd_1.jpg',
          url: url + 'd.jpg',
          position: [0, -1 * juli, 0],
          rotation: [-Math.PI / 2, 0, Math.PI]
        },
        {
          url_min: url + 'f_2.jpg',
          url_max: url + 'f_1.jpg',
          url: url + 'f.jpg',
          position: [0, 0, 512],
          rotation: [0, Math.PI, 0]
        },
        {
          url_min: url + 'b_2.jpg',
          url_max: url + 'b_1.jpg',
          url: url + 'b.jpg',
          position: [0, 0, -512],
          rotation: [0, 0, 0]
        }
      ]

      var imgLoad = (side, event) => {
        var imgdom = event.target;
        index++;
        var jlv = index / 6
        this.$refs.loadingDiv && (this.$refs.loadingDiv.style.width = parseInt(jlv * 100) + "%");

        if (jlv === 1) {
          setTimeout(() => {
            this.isVrShow = false;
            this.$refs.loadingDiv && (this.$refs.loadingDiv.style.width = 0 + "%");
            this.openVrCover();
          }, 500)
        }

        // 取消这个img的加载完成事件 禁止重复完成
        imgdom.onload = null;
        // 创建高清图片
        var elementMax = document.createElement('img')
        elementMax.width = 1026 // 2 pixels extra to close the gap.
        elementMax.src = side.url_max
        elementMax.onload = function () {
          // 修改url地址 替换成高清图片
          imgdom.src = elementMax.src;
          // 创建超清图片
          var elementSuperMax = document.createElement('img')
          elementSuperMax.width = 1026 // 2 pixels extra to close the gap.
          elementSuperMax.src = side.url
          elementSuperMax.onload = () => {
            // 加载完成后在此替换成高清图片
            imgdom.src = elementSuperMax.src;
          }
        }
      }

      var imgMaxLoad = (e) => {
        e.target.elementMin.src = e.target.src
      }

      var imgSuperMaxLoad = (e) => {
        e.target.elementMax.maxPic = e.target.src
      }

      for (var i = 0; i < sides.length; i++) {
        var side = sides[i]

        var element = document.createElement('img')
        element.width = 1026 // 2 pixels extra to close the gap.
        element.src = side.url_min
        element.onload = imgLoad.bind(this, side)

        // // 创建高清图片
        // var elementMax = document.createElement('img')
        // elementMax.width = 1026 // 2 pixels extra to close the gap.
        // elementMax.src = side.url_max
        // elementMax.elementMin = element
        // elementMax.onload = imgMaxLoad

        // // 创建超清图片
        // var elementSuperMax = document.createElement('img')
        // elementSuperMax.width = 1026 // 2 pixels extra to close the gap.
        // elementSuperMax.src = side.url
        // elementSuperMax.elementMax = element
        // elementSuperMax.onload = imgSuperMaxLoad

        var object = new CSS3DObject(element)
        object.position.fromArray(side.position)
        object.rotation.fromArray(side.rotation)
        this.scene.add(object)
        this.wall.push(object)
      }

      lon = 0
      lat = 0
      phi = 0
      theta = 0
      camera.fov_ = 60
      py = 0

      if (this.cameraDefault) {
        this.cameraDefault.lon !== undefined && (lon = this.cameraDefault.lon)
        this.cameraDefault.lat !== undefined && (lat = this.cameraDefault.lat)
        this.cameraDefault.phi !== undefined && (phi = this.cameraDefault.phi)
        this.cameraDefault.theta !== undefined && (theta = this.cameraDefault.theta)
        this.cameraDefault.fov_ !== undefined && (camera.fov_ = this.cameraDefault.fov_)
        this.cameraDefault.py !== undefined && (py = this.cameraDefault.py)
      }
    },

    initMesh (param) {
      var container = document.createElement('div')
      this.vrDom = container
      this.$refs.demo1.appendChild(container)
      var _this = this
      // 创建
      var camera, scene, renderer
      var target = new THREE.Vector3()

      var touchX, touchY

      this.camera = window.camera = camera = new THREE.PerspectiveCamera(100, _this.$refs.demo1.offsetWidth / _this.$refs.demo1.offsetHeight, 1, 10000)
      this.camera.fov_ = 60
      // camera.position.y = 500
      this.scene = scene = new THREE.Scene()

      this.renderer = renderer = new CSS3DRenderer()
      _this.consolelog = 'reset-' + window.innerWidth + "-" + window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight)

      container.appendChild(renderer.domElement)
      var boolStop = false

      var _lat = 90, __lat, _lon = 0;

      // 判断版本游览器 主要是谷歌高版本会出现白边的问题
      var a = navigator.userAgent.toLocaleLowerCase()
      var b = /chrome\/(.*?) /g
      var c = b.exec(a);
      var v = c[1];
      var v = v.split(".");
      var maxFov = 100;

      if (v[0] * 1 >= 85) {
        maxFov = 60;
      }

      var animate = () => {
        var isChangeCamera = false;

        // 正常的延迟动画率
        if (Math.abs((lon - _lon) * lv) > lv * 0.3) { isChangeCamera = true; }
        _lon += (lon - _lon) * lv;
        __lat = 90 - Math.max(-85, Math.min(85, lat));
        if (Math.abs((__lat - _lat) * lv) > lv * 0.3) { isChangeCamera = true; }
        _lat += (__lat - _lat) * lv;
        phi = THREE.Math.degToRad(_lat.toFixed(3) * 1)
        theta = THREE.Math.degToRad(_lon.toFixed(3) * 1)
        target.x = Math.sin(phi) * Math.cos(theta)
        target.y = Math.cos(phi)
        target.z = Math.sin(phi) * Math.sin(theta)
        camera.position.y += (py - camera.position.y) / 10;
        this.angle = (lon % 360);
        camera.lookAt(target)
        renderer.render(scene, camera)
        if (optcameraFor()) {
          isChangeCamera = true;
        }
        // 如果角度发生变化
        if (isChangeCamera) {
          _this.mapAnchor();
          if (_this.anchor) {
            // 指望摄像头
            for (var i = 0; i < _this.anchor.length; i++) { _this.anchor[i].lookAt(_this.camera.position) }
          }
        }
        requestAnimationFrame(animate)
      }
      animate()

      // 控制摄像机
      function optcameraFor () {
        if (Math.abs((camera.fov_ - camera.fov) / 10) > 0.1) {
          var fov = camera.fov + (camera.fov_ - camera.fov) / 10;
          camera.fov = THREE.Math.clamp(fov, 10, 10000);
          // if (camera.for <= 25) {
          //   _this.showMaxBox();
          // } else {
          //   _this.showMinBox();
          // }
          camera.updateProjectionMatrix();
          return true
        }
        return false;
      }

      this.jumpScene(param);
      if (!this.isGoAnimate) {
        lon = 0
        lat = -89
        phi = 0
        theta = 0
        camera.fov_ = 150
        py = 500
        camera.position.y = 500
        camera.fov = 150
      }

      window.vrBindEvent = () => {
        if (this.isBindEvent) {
          return;
        }
        this.isBindEvent = true;
        container.addEventListener('click', onclick, false)
        container.addEventListener('mousedown', onDocumentMouseDown, false)
        container.addEventListener('wheel', onDocumentMouseWheel, false)
        container.addEventListener('touchstart', onDocumentTouchStart, false)
        container.addEventListener('touchmove', onDocumentTouchMove, false)
        window.addEventListener('resize', onWindowResize, false)

        function onclick () {

        }

        function onWindowResize () {
          // _this.consolelog = 'reset-'+window.innerWidth+"-"+window.innerHeight;
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }

        var targetRotationX = 0;
        var targetRotationY = 0;
        var targetRotationOnMouseDownX = 0;
        var targetRotationOnMouseDownY = 0;
        var mouseX = 0;
        var mouseY = 0;
        var mouseXOnMouseDownX = 0;
        var mouseXOnMouseDownY = 0;

        function onDocumentMouseDown (event) {
          // boolStop = false;
          // requestAnimationFrame( animate );
          _this.vrCur = true;
          event.preventDefault()
          document.addEventListener('mousemove', onDocumentMouseMove, false)
          document.addEventListener('mouseup', onDocumentMouseUp, false)
        }

        function onDocumentMouseMove (event) {
          if (_this.vrCur === false) {
            return;
          }
          var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
          var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
          // targetRotationX = targetRotationOnMouseDownX + movementX * 0.5;
          // targetRotationY = Math.min(Math.max((targetRotationOnMouseDownY - movementX * 0.1), -45), 45); //拖拽后的目标位置
          lon -= movementX * 0.2 * (camera.fov_ / 100)
          lat += movementY * 0.2 * (camera.fov_ / 100)
          if (lat > 90) { lat = 90 } else if (lat < -90) { lat = -90 }
          // _this.consolelog = lat;
          // _this.mapAnchor()
        }

        function onDocumentMouseUp () {
          _this.vrCur = false;
          document.removeEventListener('mousemove', onDocumentMouseMove)
          document.removeEventListener('mouseup', onDocumentMouseUp)
        }

        function onDocumentMouseWheel (event) {
          camera.fov_ += event.deltaY * 0.05;
          if (camera.fov_ > maxFov) { camera.fov_ = maxFov }
          if (camera.fov_ < 10) { camera.fov_ = 10 }
        }

        var touchStart, cameraFov;
        function onDocumentTouchStart (event) {
          touchX = null
          touchY = null
          event.preventDefault()
          this.consolelog = event.touches.length + "";
          //手指按下时的手指所在的X，Y坐标  
          if (event.touches.length > 1) {
            // 如果有2根以上的手指 则进入控制放大缩小
            touchStart = event.touches;
            cameraFov = camera.fov_;
            // alert(cameraFov);
            // this.consolelog = cameraFov;
            return;
          }

          var touch = event.touches[0]
          touchX = touch.screenX
          touchY = touch.screenY

        }


        function onDocumentTouchMove (event) {
          event.preventDefault()
          //手指按下时的手指所在的X，Y坐标  
          if (event.touches.length > 1) {
            var now = event.touches;
            var diff = getDistance(now[0], now[1]) - getDistance(touchStart[0], touchStart[1]);
            if (diff < 0) {
              // 縮小
              cameraFov += -1 * diff * 0.01;
            } else {
              // 放大
              cameraFov += -1 * diff * 0.01;
            }
            if (cameraFov < 40) cameraFov = 40;
            else if (cameraFov > maxFov) cameraFov = maxFov;
            // _this.consolelog = cameraFov+"";
            camera.fov_ = cameraFov;
            if (camera.fov_ > maxFov) { camera.fov_ = maxFov }
            if (camera.fov_ < 10) { camera.fov_ = 10 }
            _this.consolelog = cameraFov;
            return;
          }

          if (!touchX || !touchY) {
            return;
          }

          var touch = event.touches[0]
          // lon -= (touch.screenX - touchX) * 0.1
          // lat += (touch.screenY - touchY) * 0.1
          lon -= (touch.screenX - touchX) * 0.2 * (camera.fov_ / 100)
          lat += (touch.screenY - touchY) * 0.2 * (camera.fov_ / 100)
          if (lat > 90) { lat = 90 } else if (lat < -90) { lat = -90 }
          touchX = touch.screenX
          touchY = touch.screenY
        }

        function getDistance (p1, p2) {
          var x = p2.pageX - p1.pageX,
            y = p2.pageY - p1.pageY;
          return Math.sqrt((x * x) + (y * y));
        };

      }
    },

    // 选中处理
    mouseVector (event) {
      var raycaster = new THREE.Raycaster() // create once
      var mouse = new THREE.Vector2() // create once
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
      raycaster.setFromCamera(this.mouse, this.camera)
      var intersects = raycaster.intersectObjects(this.anchor, recursiveFlag)
    },

    // 创建拖动插件
    createDrag () {
      var camera = this.camera
      var renderer = this.renderer
      var objects = this.anchor
      var dragcontrols = new DragControls(objects, camera, renderer.domElement)

      dragcontrols.addEventListener('dragstart', function (event) {
        // event.object.material.emissive.set( 0xaaaaaa );
        // controls.enabled = false;
      })
      dragcontrols.addEventListener('drag', function (event) {
        // var { x , y , z } = event.object.position;
        // var hr = Math.sqrt( Math.pow( y , 2 ) + Math.pow( x , 2 ) + Math.pow( z , 2 ) );
        // var chr =  8000 / hr;
        // event.object.position.x *= chr;
        // event.object.position.y *= chr;
        // event.object.position.z *= chr;
      })
      dragcontrols.addEventListener('dragend', (event) => {
        // event.object.material.emissive.set( 0x000000 );
        // console.log(event.object)
        // controls.enabled = true;
        this.showEdit(event.object)
      })
    },

    // 创建锚点
    addAnchor (icon, param) {
      var config = param.config
      var position = config.position || {}

      // 如果没有图标则不渲染图表对象
      if (icon && config.hotType !== 'list') {



        var element = document.createElement('img')
        element.src = icon ? this.domainName + '/' + icon : this.conf.vrPath + 'anc/point.png' // this.conf.vrPath+'anc/point.png';
        element.style.opacity = 0

        var object = new CSS3DObject(element)
        object.objId = 'test1'
        object.lookAt(this.camera.position)

        this.camera.getWorldDirection(vector3)
        object.position.x = position.x || vector3.x * 1000 // camera.quaternion
        object.position.y = position.y || vector3.y * 1000
        object.position.z = position.z || vector3.z * 1000
        // 进入场景
        this.scene.add(object)
        // 加入数据组
        // 创建数据组
        object.data = param
        this.anchor.push(object)
        this.getXY(object)

        // 如果热点类型是设备 并且配置里设置为默认打开则直接打开
        if (config.hotType === 'device' && config.device_show) {
          // 如果该热点为设备直接显示设备信息
          this.showDeviceInfo(object, config.device)
        }
        return object;
      }

      // 如果热点类型为列表
      if (config.hotType === 'list') {
        this.showHotList(param);
      }

      return object
    },

    // 显示热点列表类型
    showHotList (param) {
      this.iframeHotList.push(param);
    },

    // 

    // 显示编辑窗口
    showEdit (anchor_obj) {
      this.show.add = true
      // this.$refs.add.set( anchor_obj );
    },

    loadCamera () {
      this.renderPanor(this.panorId)
    },

    // 渲染全景
    renderPanor (id) {
      this.panorId = id
      get({ id: id }).then((e) => {
        if (e.code === 200) {
          this.panor = e.data.content[0] || {
            'id': '40288ad2710c43c701710c5f4c920004',
            'name': '乳源县全景图',
            'code': null,
            'imagePath': null,
            'rqcodeImagePath': null,
            'sta': null,
            'viewCount': null,
            'createUser': '1',
            'createDate': 1585050504000
          }
          // this.panorname = this.panor.name;
          if (this.mode) {
            this.$refs.hotEdit.setPanor(this.panor)
          }
          // 渲染场景
          this.renderScene(this.sceneId)

          // 加载导航图数据
          if (this.panor.config) {
            var json = JSON.parse(this.panor.config)
            this.panorScene = json.point || [];
            this.panorBaseMap = json.dhtBaseImage || "";
          };
        } else {
          this.$message.error(e.msg)
          this.$router.push({ path: '/dashboard' })
        }
      })
    },

    renderScene (sceneId, rsPanorId, fn) {
      this.sceneId = sceneId
      // 获取场景
      this.getScene(rsPanorId || this.panor.id, (data) => {
        this.selectScene = sceneId ? data.find((e) => { return e.id === sceneId }) : data[0]
        this.sceneId = this.selectScene.id
        this.panorname = this.selectScene.name;
        if (!this.camera) {
          this.initMesh({ path: this.selectScene.folderPath })
        } else {
          this.jumpScene({ path: this.selectScene.folderPath })
        }
        fn && fn();
      })
    },

    // 渲染热点
    renderAnchor (rsPanorScene, fn) {
      getAnchorBySceneId(rsPanorScene).then((event) => {
        for (var i = 0; i < event.content.length; i++) {
          var config = event.content[i].config = JSON.parse(event.content[i].config)
          var anchor = this.addAnchor(event.content[i].imagePath, event.content[i])
        }
        this.$refs.hotList.setAnchors(this.anchor)
        fn && fn()
      })
    },

    getScene (rsPanorId, fn) {
      getSceneByPanorId(rsPanorId).then((e) => {
        this.sceneList = e.content
        fn && fn(this.sceneList)
      })
    },

    createCamera () {
      location.pathname = 'vr_new'
    },

    editHot (json) {
      var name = json.hotTitle
      var imagePath = json.icon
      delete json.hotTitle
      delete json.icon
      var config = json
      // 获取热点的坐标
      // 查询这个图标然后把修改信息修改
      var anchor = this.anchor.find((e) => { return e.data.id === json.id })
      json.position = { x: anchor.position.x, y: anchor.position.y, z: anchor.position.z }

      // 添加新的热点去数据库中
      editAnchor({
        id: json.id,
        // 输入场景id
        rsPanorScene: this.selectScene.id,
        // 热点名称
        name,
        // 热点图标
        imagePath,
        // 配置文件
        config: JSON.stringify(config)
      }).then((event) => {
        // event.config = JSON.parse(event.config);
        anchor.data.renderScene = this.selectScene.id
        anchor.data.name = name
        anchor.data.imagePath = imagePath
        anchor.data.config = config
        anchor.dom.querySelector('.anchorName').innerText = name
        anchor.dom.querySelector('img').src = this.domainName + imagePath
        anchor.dom.querySelector('img').className = config.iconanimate
        this.$set(this.anchor, this.anchor.indexOf(anchor), anchor)
      })
    },

    // 创建热点
    createHot (json) {
      var name = json.hotTitle
      var imagePath = json.icon
      delete json.hotTitle
      delete json.icon
      var config = json
      // 获取热点的坐标
      this.camera.getWorldDirection(vector3)
      json.position = { x: vector3.x * 1000, y: vector3.y * 1000, z: vector3.z * 1000 }

      // 添加新的热点去数据库中
      addAnchor({
        // 输入场景id
        rsPanorScene: this.selectScene.id,
        // 热点名称
        name,
        // 热点图标
        imagePath,
        // 配置文件
        config: JSON.stringify(config)
      }).then((event) => {
        event.config = JSON.parse(event.config)
        // 加载热点的图标
        var anchor = this.addAnchor(imagePath, event)
        // 加载热点的事件
      })
    },

    // 映射热点
    mapAnchor () {
      var data = this.anchor
      for (var i in data) {
        this.getXY(data[i])
      }
    },

    // 世界坐标转屏幕坐标
    getXY (it) {
      var dom = it.dom
      if (!dom) {
        var div = document.createElement('div')
        div.className = 'anchorDom'
        div.style = 'position: absolute;transform: translate(-50%, -50%);height: 30px;width:30px;'
        dom = it.dom = div
        var element = document.createElement('img')
        element.className = it.data.config.iconanimate
        element.anchor = it
        element.style.cssText = 'position:absolute;width: 100%;height: 100%;cursor: pointer;'
        element.src = it.element.src
        element.draggable = false
        element.ondragend = this.getXYZ.bind(this, element.anchor)
        element.onclick = this.anchorClick.bind(this, element.anchor)
        div.appendChild(element)
        var names = document.createElement('div')
        names.style.cssText = "user-select: none!important;"
        names.className = 'anchorName'
        names.innerText = it.data.name
        div.appendChild(names)
        var opt = document.createElement('div')
        opt.onclick = this.clickFn.bind(this)
        opt.anchor = it
        opt.className = 'anchorOpt'
        opt.innerHTML = `
          <i class='el-icon-close' v-click='opt_delete' title='删除'></i>
          <i class='el-icon-setting' v-click='opt_edit' title='编辑'></i>
        `
        div.appendChild(opt)
        this.$refs.demo2.appendChild(dom)
      }

      var worldVector = new THREE.Vector3(
        it.position.x,
        it.position.y,
        it.position.z
      )

      var standardVector = worldVector.project(this.camera)// 世界坐标转标准设备坐标
      // window.outerWidth
      var a = _offsetWidth / 2
      var b = _offsetHeight / 2
      var x = Math.round(standardVector.x * a + a)// 标准设备坐标转屏幕坐标
      var y = Math.round(-standardVector.y * b + b)// 标准设备坐标转屏幕坐标
      if (standardVector.z > 1) {
        // dom.style.display = 'none'
        dom.style.opacity = 0
      } else {
        // dom.style.display = 'block'
        dom.style.opacity = 1
      }
      dom.style.left = x + 'px'
      dom.style.top = y + 'px'
      // dom.querySelector(".anchorName").innerText = window.innerWidth+","+window.innerHeight
    },

    // 屏幕坐标转换世界坐标
    getXYZ (anchor, event) {

      event.stopPropagation();
      var a = -1
      const pX = (event.x / this.renderer.domElement.clientWidth) * 2 - 1
      const pY = -(event.y / this.renderer.domElement.clientHeight) * 2 + 1
      const p = new THREE.Vector3(pX, pY, a).unproject(this.camera)
      anchor.data.config.position.x = anchor.position.x = p.x * 1000
      anchor.data.config.position.y = anchor.position.y = p.y * 1000
      anchor.data.config.position.z = anchor.position.z = p.z * 1000
      this.getXY(anchor)
      // 保存热点的坐标系
      editAnchor({
        id: anchor.data.id,
        config: JSON.stringify(anchor.data.config)
      }).then((e) => {

      })
    },

    showEditList () {
      this.$refs.hotList.show = !this.$refs.hotList.show;
    },

    createList () {
      this.$refs.hotEdit.show()
    },

    // 热点点击事件
    anchorClick (anchor) {
      var data = anchor.data.config
      // 如果设置了不生效则不会发生点击事件
      if (data.isEffective === false) { return };
      if (data.hotType === 'link') {
        if (data.hotLinkIsOpenWindow) {
          this.showIframeWindow(anchor.data.name, data.hotLink)
        } else {
          open(data.hotLink)
        }
      } else if (data.hotType === 'jump') {
        this.changeScene(data.scene)
      } else if (data.hotType === 'video') {
        this.showCamera(data.video, anchor)
      } else if (data.hotType === 'device') {
        this.showDeviceInfo(anchor, data.device)
      }
    },

    changeScene (sceneId) {
      var oldvr = this.vrDom.cloneNode()
      oldvr.innerHTML = this.vrDom.innerHTML
      oldvr.draggable = false;
      var imgs = oldvr.querySelectorAll("img");
      imgs = Array.prototype.slice.apply(imgs)
      imgs.forEach((e) => { return e.draggable = false; })
      this.vrDom.after(oldvr)
      oldvr.className = 'cloneVrDom'
      setTimeout(() => {
        oldvr.remove()
      }, 2000)
      // 创建新的全景
      this.renderScene(sceneId, null, () => {
        // 渲染瞄点
        // this.renderAnchor(this.selectScene.id)
      })
    },

    opt_edit (dom) {
      var anchor = dom.parentElement.anchor
      this.editAnchor(anchor)
    },

    // 編輯热点
    editAnchor (anchor) {
      this.$refs.hotEdit.show({
        name: anchor.data.name,
        id: anchor.data.id,
        icon: anchor.data.imagePath,
        // hotLink : anchor.data.config.hotLink,
        // hotType : anchor.data.config.hotType,
        // scene : anchor.data.config.scene,
        // iconanimate : anchor.data.config.iconanimate,
        ...anchor.data.config,
        step: 3
      })
    },

    // 显示新窗口内容
    showIframeWindow (name, url, width, height) {
      this.iframeShow = true
      this.iframeSrc = url
      this.iframeTitle = name || '默认弹窗'
      this.iframeWidth = width || 500
      this.iframeHeight = height || 400
    },

    // 显示设备信息
    showDeviceInfo (anchor, device) {
      // 创建dom src="/deviceshow?hd_device_id=${device}&mode=map3d"
      var dom = document.createElement('div')
      dom.innerHTML = `
          <div class='iframeBox' v-show='iframeShow' style='top:-100%;'>
            <div class='iframeTitle'>
              ${anchor.data.name}
              <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement;dom.querySelector("iframe").remove();dom.remove();'></i>
              <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement;dom.querySelector("iframe").remove();dom.remove();'></i>
            </div>
            <div class='iframeWindow' style='width: 350px;height: 360px;background: #00000099'>
              <iframe
                src="/expEcharts?hd_device_id=${device}&mode=map3d"
                frameborder="0"
              />
            </div>
          </div>
        `
      anchor.dom.appendChild(dom)
      // this.showIframeWindow(name, "/deviceshow?hd_device_id=" + device, 1000, 600);
    },

    // 显示摄像头
    showCamera (url, anchor) {
      // 创建dom
      var dom = document.createElement('div')
      dom.innerHTML = `
          <div class='iframeBox' v-show='iframeShow' style='top:-100%;'>
            <div class='iframeTitle'>${anchor.data.name}
              <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement;dom.querySelector("iframe").remove();dom.parentElement.parentElement.style.zIndex=0; dom.remove();'></i>
            </div>
            <div class='iframeWindow' style='width: 300px;height: 200px;background: #00000099;'>
              <iframe
                dbc='bigSmall' 
                src="/openvideo?device_id=${url}&playWay=play"
                frameborder="0"
              />
            </div>
          </div>
        `
      anchor.dom.appendChild(dom)
      anchor.dom.style.zIndex = 9999;
    },

    // 全屏部分
    FullScreen () {
      this.isFullScreen = !this.isFullScreen;
      var el = this.$refs.vr;
      if (!this.isFullScreen) {//退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          //改变平面图在google浏览器上面的样式问题
          $("#canvasPaintArea").css("position", "static").css("width", "100%");
          $(".buildingsFloor").css("width", "70%");
          $(".floor-plan").css("width", "78%");
          document.webkitExitFullscreen()
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen()
        }
      } else {    //进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          //改变平面图在google浏览器上面的样式问题
          $("#canvasPaintArea").css("position", "absolute").css("width", "94%");
          $(".buildingsFloor").css("width", "98%");
          $(".floor-plan").css("width", "90%");
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        }
      }
    },

    sy (bool) {
      this.isSy = typeof bool === "boolean" ? bool : !this.isSy;
      this.isSy ? this.$refs.mp.play() : this.$refs.mp.pause();
    },

    sySize () {
      this.$refs.mp.volume = this.syValue / 100;
    },

    openVrCover () {
      if (this.isGoAnimate) {
        // lat = 0;
        // lon = 360;
        // camera.fov_ = 60;
        // py = 0;

        // camera.fov_ = 150;
        // py = 500;
        lv = 0.3;
      } else {
        lat = 0;
        lon = 360;
        camera.fov_ = 60;
        py = 0;
      }

      // 绑定事件
      vrBindEvent();
      this.showTishituodong = true;
      setTimeout(() => {
        // 渲染瞄点
        this.renderAnchor(this.selectScene.id, () => {
          // 显示控制台
          // this.showTishituodong = true;
          setTimeout(() => {
            var fnd = this.sceneList.find((e) => { return e.id === this.sceneId })
            var i = this.sceneList.indexOf(fnd)
            this.$refs.sceneListBox.scrollLeft = i * 140;
          })
        })
        lv = 0.3;
      }, this.isGoAnimate ? 10 : 2500);
      this.showTishituodong1 = true;
      // this.sy(true);
      var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
          'mozHidden' in document ? 'mozHidden' :
            null;
      var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
      var onVisibilityChange = () => {
        if (!this.isSy) return;
        if (!document[hiddenProperty]) {
          this.$refs.mp.play()
        } else {
          this.$refs.mp.pause()
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },

    iframeClick () {
      var IframeOnClick = {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
          this.type = arguments[0];
          this.cb = arguments[1];
          this.hasTracked = false;
        },
        track: function (type, cb) {
          this.iframes.push(new this.Iframe(type, cb));
          if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
          }
        },
        checkClick: function () {
          if (document.activeElement) {
            var activeElement = document.activeElement;
            // for (var i in this.iframes) {  
            // 如果选中的对象存在 且对象的dbc属性存在 且对象是iframe
            var dbc = activeElement.getAttribute("dbc");
            if (activeElement && activeElement.tagName === "IFRAME" && dbc) {
              // 注銷选中的状态
              document.activeElement.blur();
              // 如果点击的是这个iframe 这个iframe处于未被点击的状态
              if (!activeElement.hasTracked) {
                // 标记为被点击并等待下一次点击
                activeElement.hasTracked = true;
                // 如果200毫秒内没有被在此点击重置次状态
                activeElement.setTimeout = setTimeout(function (iframe) {
                  iframe.hasTracked = false;
                }, 800, activeElement);
              } else {
                // 如果判断这个已经是被点击的状态了
                // 清除掉等待事件
                clearTimeout(activeElement.setTimeout);
                // 修改为未选择状态
                activeElement.hasTracked = false;
                // 查询类型的注册事件
                var ary = this.iframes.find((e) => { return e.type === dbc });
                // 执行事件
                (0, ary.cb)(activeElement);
              }
            } else {
              activeElement.tagName === "IFRAME" && (activeElement.hasTracked = false);
            }
            // }  
          }
        }
      };
      // 开启检测
      IframeOnClick.track("bigSmall", (iframe) => {
        if (iframe.isBig) {
          iframe.isBig = false;
          iframe.parentElement.parentElement.parentElement.parentElement.className = "anchorDom";
        } else {
          iframe.isBig = true;
          iframe.parentElement.parentElement.parentElement.parentElement.className = "anchorDom big";
        }
      });
    }
  },

}


if (window.openWindow) {
  window.openWindow = function (dom) {
    // 创建一个容器
    var div = document.createElement("div");
    // 添加进入页面
    document.body.appendChild(div);
    // 创建黑色遮罩
    var cover = document.createElement("div");
  }
}

</script>

<style scoped>
.video {
  height: calc(100% - 65px) !important;
}

.panorMap {
  width: 200px;
  height: 200px;
  position: absolute;
  right: 15px;
  top: 15px;
}

.iframeHotListDisplay > div:hover {
  color: #00a1ff;
  cursor: pointer;
}
.iframeHotListDisplay > div {
  border-radius: 4px;
  border: solid 1px #0580ff;
  padding: 8px;
}
.iframeHotListDisplay.show {
  left: 0%;
}
.iframeHotListDisplay {
  position: absolute;
  left: -100%;
  top: 0;
  background: #ffffff;
  border-radius: 4px;
  padding: 15px;
  height: 100%;
  z-index: 9999;
  transition: left 0.25s;
}
.editWH {
  position: absolute;
  top: 2px;
  right: 2px;
  color: #ffffff;
}
.hotListEdit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: #00000000;
  transition: all 0.25s;
  opacity: 0;
}

.hotListEdit:hover {
  background: #000000a8;
  opacity: 1;
}

.hotListEdit > .div {
  opacity: 0;
  top: 40%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.25s;
  color: #ffffff;
}

.hotListEdit:hover > .div {
  opacity: 1;
  top: 50%;
}

.hotListBox {
  position: relative;
}

.hotListEditBtn:hover {
  box-shadow: 0px 0px 3px #00a1ff;
}
.hotListEditBtn {
  border: solid 1px;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
  color: #00a1ffee;
  cursor: pointer;
}
.hotListDelBtn:hover {
  box-shadow: 0px 0px 3px #ff0000;
}
.hotListDelBtn {
  border: solid 1px;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
  color: #ff0000ee;
  cursor: pointer;
}
.title {
  font-size: 12px;
  color: #000000;
  background: #ffffff;
  padding: 8px;
  z-index: 99;
  position: relative;
}
.title i {
  cursor: pointer;
}
</style>

<style>
.vr {
  height: 100%;
}

.vr.vrCur {
  cursor: move;
}

.vr.vr_viewMode .anchorOpt {
  display: none !important;
}

.vr .anchorOpt {
  display: none;
  color: #ffffff;
  position: absolute;
  cursor: pointer;
  background: #00000088;
  padding: 4px;
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
}

.vr .anchorDom:hover .anchorOpt {
  display: block;
}

.vr .anchorOpt > i:hover {
  color: #00a1ff;
}

.vr .anchorName {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -30px;
  background: #00000088;
  color: #ffffff;
  padding: 3px;
  border-radius: 4px;
  width: max-content;
}

.vr .anchorDom.big {
  transform: none !important;
}

.vr .anchorDom.big .iframeBox {
  transform: none !important;
}

.vr .anchorDom.big iframe {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

.vr .view {
  height: 100%;
}

.vr .view > div {
  height: 100%;
  width: 100%;
}

/* .vr .view > div > div {
  width:100%!important;
  height:100%!important;
} */

.vr .vr_add {
  position: absolute;
  padding: 8px 15px;
  color: #ffffff;
  border-radius: 4px;
  top: 8px;
  left: 8px;
  display: flex;
}

.vr .vr_add > div {
  padding: 5px;
  box-shadow: 0px 0px 3px #ffffff;
  background: #000000a8;
  cursor: pointer;
  transition: all 0.35s;
  padding: 12px 18px;
  margin: 15px;
  border-radius: 6px;
}

.vr .vr_add > div:hover {
  background: #00a1ff;
}

.vr .cloneVrDom {
  position: absolute;
  top: 0;
  left: 0;
  /* transform: opacity 1s; */
  animation: cloneHide 2s;
}

@keyframes cloneHide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.vr .operating {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background: #00000088;
}

.vr .operatingBtn {
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
}

.vr .operatingBtn > div {
  color: #fff;
  margin: 0 15px;
  /* border: solid 1px #ffffff; */
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.vr .sceneList {
  position: absolute;
  /* top: px; */
  width: 100%;
  background: #00000000;
  display: flex;
}

.vr .sceneList.show {
  animation: sceneListTop 0.85s forwards;
}

.vr .sceneList.hide {
  animation: sceneListTopHide 0.85s forwards;
}

@keyframes sceneListTop {
  0% {
    top: 200px;
  }
  50% {
    top: -118px;
  }
  65% {
    top: -118px;
  }
  100% {
    top: -98px;
  }
}

@keyframes sceneListTopHide {
  0% {
    top: -98px;
  }
  50% {
    top: -118px;
  }
  65% {
    top: -118px;
  }
  100% {
    top: 200px;
  }
}

.vr .sceneList > div > div.active {
  color: #00a1ff;
}

.vr .sceneList > div {
  display: flex;
  overflow: auto;
}

.vr .sceneList > div::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.vr .sceneList > div > div {
  position: relative;
  float: left;
  margin: 6px;
  cursor: pointer;
  border: solid 5px;
  color: #ffffff;
  border-radius: 4px;
}

.vr .sceneList > div.active {
  border: solid 1px #1f72b3;
  color: #1f72b3;
}

.vr .sceneList img {
  width: 120px;
  height: 75px;
}

.vr .sceneList .sceneListName {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #000000;
  /* color: #ffffff; */
  width: 100%;
  text-align: center;
  padding: 5px;
  user-select: none !important;
}

.vr .icon_leftRight {
  animation: leftRight 2s infinite linear;
}

@keyframes leftRight {
  0% {
    left: 0%;
  }
  25% {
    left: 10%;
  }
  50% {
    left: 0%;
  }
  75% {
    left: -10%;
  }
  100% {
    left: 0%;
  }
}

.vr .icon_topBottom {
  animation: topBottom 2s infinite linear;
}

@keyframes topBottom {
  0% {
    top: 0%;
  }
  25% {
    top: 10%;
  }
  50% {
    top: 0%;
  }
  75% {
    top: -10%;
  }
  100% {
    top: 0%;
  }
}

.vr .icon_bigSmall {
  animation: bigSmall 2s infinite linear;
}

@keyframes bigSmall {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.vr .icon_rotateY {
  animation: rotateY 2s infinite linear;
}

@keyframes rotateY {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.vr .iframeBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.vr .iframeBox iframe {
  width: 100%;
  height: 100%;
}
.vr .iframeWindow {
  /* background: #e6e6e6; */
}
.vr .iframeBox iframe::-webkit-scrollbar {
  width: 0;
}
.vr .closeIframe {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.vr .closeIframe:hover {
  color: red;
}
.vr .iframeTitle {
  padding: 2px;
  background: #0000009e;
  color: #dadada;
  border-bottom: solid 1px;
  font-size: 12px;
}

.vr .tishituodong {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 235px;
  background: #ffffff63;
  color: #ffffff;
  font-size: 12px;
  z-index: 99;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.vr .tishituodong.active {
  animation: vrTishituodong 3s forwards;
}

.vr .tishituodong > div {
  height: 100px;
  line-height: 100px;
}

.vr .tishituodong > div > img {
  animation: tishituodong 2s linear infinite;
}

@keyframes vrTishituodong {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    top: 200%;
    opacity: 0;
  }
}

@keyframes tishituodong {
  0% {
    transform: translateX(-80px);
  }
  100% {
    transform: translateX(80px);
  }
}

.vr .imgRWM {
  display: inline-block;
  position: absolute;
  z-index: 999;
  right: 8px;
  width: 100px;
  top: 8px;
  transition: all 0.25s;
}

.vr .imgRWM.active {
  width: 25px;
}

.vr .vrName {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  color: #fff;
  text-shadow: 2px 2px 2px #000000;
  font-size: 26px;
}

.vr .tishituodongBoxhide {
  animation: tishituodongBoxhide 1s linear forwards;
}

@keyframes tishituodongBoxhide {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    z-index: 0;
  }
}

.vr .vrhide {
  display: none;
}

.vr .sy:hover > .vrhide {
  display: block;
  z-index: 99;
}

@media screen and (max-width: 900px) {
  .vrhide {
    display: none !important;
  }
}

.vr .Sco {
  background: #00000085;
  width: 86px;
  height: 98px;
}

.vr .dragCover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
}

.vr .loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #000000;
}

.vr .loading .text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}

.vr .loading .text .LoadingLine {
  width: 150px;
  height: 6px;
  border-radius: 5px;
  background: #ffffff;
}

.vr .loading .text .LoadingLine > div {
  height: 100%;
  width: 0%;
  background: #007eff;
  border-radius: 6px;
  transition: width 0.25s;
}
</style>
