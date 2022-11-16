<template>
  <div class='vr'>
    <div class='view' ref="demo1"></div>
    <div class='view'>
      <div v-for='( it ,i ) in anchor' :style='getXY()' :key='i'>測試</div>
    </div>
    <add ref='add' v-show='show.add'></add>
    <div class='vr_add'>
      <div @click='addAnchor'> 新增标注 </div>
      <div @click='createCamera'> 新建全景 </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import { TrackballControls } from './controls/TrackballControls.js';
import { DragControls } from './controls/DragControls.js';
import { OrbitControls } from './controls/OrbitControls.js';

// import add from './components/edit';
import anchor from './js/anchor.js'
import { getCameraById } from './data/camera.js'

// import dat from 'dat.gui'
export default {
  components : {
    // add
  },
  data: () => ({
    anchor : [],
    // 权限
    Authority : {
      edit : false,
      add : false,
      delete : false
    },
    // 显示
    show : {
      add : false,
    }
  }),
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      let {initMesh, controls} = this
      // initMesh();
      this.loadCamera()
      this.createDrag();
    },

    initMesh (param) {
        var _this = this;

        var target = new THREE.Vector3();
        var lon = 90, lat = 0;
        var phi = 0, theta = 0;
        var touchX, touchY;

        var container;
        var camera, scene, renderer , controls;
        var spheres = [];
        var mouseX = 0, mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        init();
        animate();
        function init() {
            container = document.createElement( 'div' );
            _this.$refs.demo1.appendChild( container );
            _this.camera = camera = new THREE.PerspectiveCamera( 60, _this.$refs.demo1.offsetWidth / _this.$refs.demo1.offsetHeight, 1, 10000 );
            camera.position.z = 1;
            _this.scene = scene = new THREE.Scene();
            scene.background = new THREE.CubeTextureLoader()
                .setPath( _this.conf.vrPath + 'camera/' +  param.path + "/" )
                .load( [ 'r.jpg', 'l.jpg', 'u.jpg', 'd.jpg', 'f.jpg', 'b.jpg' ] );
            var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background, refractionRatio: 0.95 } );
            material.envMap.mapping = THREE.CubeRefractionMapping;
            _this.renderer = renderer = new THREE.WebGLRenderer();
            // renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( _this.$refs.demo1.offsetWidth , _this.$refs.demo1.offsetHeight );
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
            // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
            // document.addEventListener( 'wheel', onDocumentMouseWheel, false );
            // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
            // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
            // window.addEventListener( 'resize', onWindowResize, false );
            createControls( camera );
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function onDocumentMouseDown( event ) {
            event.preventDefault();
            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        }

        function onDocumentMouseMove( event ) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            lon -= movementX * 0.1;
            lat += movementY * 0.1;
        }

        function onDocumentMouseUp() {
            document.removeEventListener( 'mousemove', onDocumentMouseMove );
            document.removeEventListener( 'mouseup', onDocumentMouseUp );
        }

        function onDocumentMouseWheel( event ) {
            var fov = camera.fov + event.deltaY * 0.05;
            camera.fov = THREE.Math.clamp( fov, 10, 75 );
            camera.updateProjectionMatrix();
        }

        function onDocumentTouchStart( event ) {
            event.preventDefault();
            var touch = event.touches[ 0 ];
            touchX = touch.screenX;
            touchY = touch.screenY;
        }

        function onDocumentTouchMove( event ) {
            event.preventDefault();
            var touch = event.touches[ 0 ];
            lon -= ( touch.screenX - touchX ) * 0.1;
            lat += ( touch.screenY - touchY ) * 0.1;
            touchX = touch.screenX;
            touchY = touch.screenY;
        }

        // function onDocumentMouseMove( event ) {
        //     mouseX = ( event.clientX - windowHalfX ) * 10;
        //     mouseY = ( event.clientY - windowHalfY ) * 10;
        // }

        function animate() {
            if( _this.anchor ){
              // 指望摄像头
              for( var i = 0 ; i < _this.anchor.length ; i++ )
                _this.anchor[i].lookAt(_this.camera.position);
            }
            // controls.update();
            requestAnimationFrame( animate );

            lat = Math.max( - 85, Math.min( 85, lat ) );
            phi = THREE.Math.degToRad( 90 - lat );
            theta = THREE.Math.degToRad( lon );
            target.x = Math.sin( phi ) * Math.cos( theta );
            target.y = Math.cos( phi );
            target.z = Math.sin( phi ) * Math.sin( theta );
            camera.lookAt( target );

            render();
        }

        function createControls( camera ) {
            controls = new OrbitControls( camera, renderer.domElement );

            controls.enableDamping = true; 
            controls.dampingFactor = 0.05;

            controls.screenSpacePanning = false;
            controls.rotationSpeed = 1;
            
            controls.enableZoom = false;            
        
            controls.minDistance = 100;
            controls.maxDistance = 500;

            controls.enableDamping = false;

            controls.maxPolarAngle = Math.PI;

            // controls = new TrackballControls( camera, renderer.domElement );
            // controls.keys = [ 65, 83, 68 ];
        }

        function render() {
            var timer = 0.0001 * Date.now();
            // for ( var i = 0, il = spheres.length; i < il; i ++ ) {
            //     var sphere = spheres[ i ];
            //     sphere.position.x = 5000 * Math.cos( timer + i );
            //     sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
            // }
            // camera.position.x += ( mouseX - camera.position.x ) * .05;
            // camera.position.y += ( - mouseY - camera.position.y ) * .05;
            // camera.lookAt( scene.position );
            renderer.render( scene, camera );
        }
    },

    // 创建拖动插件
    createDrag (){
        var camera = this.camera; 
        var renderer = this.renderer;
        var objects = this.anchor;
        var dragcontrols = new DragControls( objects, camera, renderer.domElement );

        dragcontrols.addEventListener( 'dragstart', function ( event ) {
            // event.object.material.emissive.set( 0xaaaaaa );
            // controls.enabled = false;
        } );
        dragcontrols.addEventListener( 'drag', function ( event ) {
            // var { x , y , z } = event.object.position;
            // var hr = Math.sqrt( Math.pow( y , 2 ) + Math.pow( x , 2 ) + Math.pow( z , 2 ) );
            // var chr =  8000 / hr;
            // event.object.position.x *= chr;
            // event.object.position.y *= chr;
            // event.object.position.z *= chr;
        } );
        dragcontrols.addEventListener( 'dragend', ( event )=> {
            // event.object.material.emissive.set( 0x000000 );
            // console.log(event.object)
            // controls.enabled = true;
            this.showEdit(event.object)
        } );
    },

    // 创建锚点
    addAnchor (param){
       var geometry = new THREE.BoxBufferGeometry( 1000, 1000, 100 );
      var texture = new THREE.TextureLoader().load( this.conf.vrPath+'anc/point.png' );
      var material = new THREE.MeshBasicMaterial( { map: texture , depthTest: false ,  transparent: true,  } );
      // 创建渲染
      var object = new THREE.Mesh( geometry, material );
      object.position.x =  param.x || 0;
      object.position.y =  param.y || 0;
      object.position.z =  param.z || -1000;
      // 进入场景
      this.scene.add( object );
      // 加入数据组
      // 创建数据组
      object.data = {
        type : param.type || "0",
        scenes : param.scenes || "",
        link : param.link || "",
        name : param.name || ""
      };
      this.anchor.push( object );
    },

    // 显示编辑窗口
    showEdit ( anchor_obj ){
      this.show.add = true;
      this.$refs.add.set( anchor_obj );
    },

    loadCamera (){
      var id = location.search.replace("?","");
      getCameraById(id||"2",(data)=>{
        this.initMesh(data.info);
        // this.createDrag();  
        for( var i in data.anchor ){
          // this.addAnchor(data.anchor[i]);
        }
      })
    },

    createCamera (){
      location.pathname = "vr_new";
    },

    // 获取屏幕坐标
    getXY ( it ){
      
    },

  }
}
</script>
<style>
    .vr {
        height: 100%;
    }

    .vr .view {
      height: 100%;
    }

    .vr .view > div {
      height: 100%;
    }

    .vr .vr_add {
        position: absolute;
        padding: 8px 15px;
        color: #00a1ff;
        background: #ffffff;
        border-radius: 4px;
        top: 8px;
        left: 8px;
        display: flex;
    }

    .vr .vr_add > div {
      padding: 5px;
      border: solid 1px #ffffff;
      cursor: pointer;
      transition: all 0.35s;
    }

    .vr .vr_add > div:hover {
      color :#00a1ff;
      border-bottom : solid 1px #00a1ff;
    }

</style>