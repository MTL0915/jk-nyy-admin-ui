<template>
  <div class='vr'>
    <div class='view' ref="demo1"></div>
    <add ref='add' v-show='show.add'></add>
    <div class='vr_info'>
      <div class='title'>测试标题</div>
      <div class='textInfo'>在乳源流传着很多传奇的民俗故事，如有一说“乳源”的名字来源于云门禅宗。云门山大觉禅寺俗称云门寺，坐落在今乳源县城北6公里的云门山下，五代后唐庄宗同光元年（923年）六祖慧能七传弟子文偃禅师创建，并在此创立云门宗，成为云门宗祖庭。据今存云门寺的南汉古碑记载：文偃祖师圆寂后葬方丈室塔内，15年后启塔，“肉身如故”。南汉王刘晟即命“部署人船往云门，修斋迎请”。把文偃真身用船经乳水（南水河）运往都城广州，“迎引灵龛入于大内”，“大陈供养一月余日”。云门寺在当时名声大震：因其为名师创建，又得南汉国几代君主崇佛，建筑规模是全国最大的禅院之一；寺院有皇帝赐额，从“光泰禅院”到“证真禅寺”，再勅升“大觉禅寺”；还是云门宗的祖庭。所以，其影响及于京师和朝廷，甚至可以说挟皇权之势。时南汉皇帝广赐土地予寺庙，“数十里广置田庄”，“名山秀水，膏田沃野，率归于浮屠”。当时的云门寺，可谓声名盖世，盛冠一方，“天下学侣望风而至”。云门宗这个法脉源头，“法乳源流”流布天下，连地方名也取其“法乳源流”中的“乳源”荣耀一方</div>
    </div>
    <div class='vr_select'>
      <div v-for='(it,ind) in selectVr' :key='ind'>
        <img @click='qiehuan(it)' :src='conf.vrPath + "camera/" + it.info.path + "/logo.png" ' :title='it.info.name' />
      </div>
    </div>
    <div class='vr_edit_vr' @click='goedit'>
      编辑
    </div>
    <!-- <div class='vr_add'>
      <div @click='addAnchor'> 新增标注 </div>
    </div> -->
  </div>
</template>

<script>
import * as THREE from 'three'
import { TrackballControls } from './controls/TrackballControls.js';
import { DragControls } from './controls/DragControls.js';
// import add from './components/edit';
import anchor from './js/anchor.js'
import { getCameraById } from './data/camera.js'


// import dat from 'dat.gui'
export default {
  components : {
    // add
  },
  data: () => ({
    cameraJson : null,
    anchor : [],
    selectVr : [],
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
      // 开始加载场景
      this.loadCamera();
      this.createVrSelect();
    },

    // 创建vr切换
    createVrSelect (){
      getCameraById("all",(data)=>{
        this.selectVr = data;
      })
    },

    cubeClick (ev){
       if( !ev ) return;
       if( !ev.data ) return;
       if( ev.data.type === "0" ){
         open(ev.data.link);
       }else{
         location.search = "?"+ev.data.scenes
       }
    },

    initMesh (param) {
        var _this = this;
        var container;
        var camera, scene, renderer , controls;
        var spheres = [];
        var mouseX = 0, mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //点击射线
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        this.$refs.demo1.addEventListener('click', onDocumentMouseDown, false);
        function onDocumentMouseDown(event) {
            event.preventDefault();
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            // 需要被监听的对象要存储在clickObjects中。
            var intersects = raycaster.intersectObjects(_this.anchor);
            // console.log(intersects)
            if(intersects.length > 0) {
                _this.cubeClick(intersects[0].object);
            }
        }
        init();
        animate();
        function init() {
            container = document.createElement( 'div' );
            _this.$refs.demo1.appendChild( container );
            _this.camera = camera = new THREE.PerspectiveCamera( 60, _this.$refs.demo1.offsetWidth / _this.$refs.demo1.offsetHeight, 1, 10000 );
            camera.position.z = 1;
            _this.scene = scene = new THREE.Scene();
            scene.background = new THREE.CubeTextureLoader()
                .setPath( _this.conf.vrPath + 'camera/' + param.path + "/" )
                .load( [ 'r.jpg', 'l.jpg', 'u.jpg', 'd.jpg', 'f.jpg', 'b.jpg' ] );
            var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background, refractionRatio: 0.95 } );
            material.envMap.mapping = THREE.CubeRefractionMapping;
            _this.renderer = renderer = new THREE.WebGLRenderer();
            // renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( _this.$refs.demo1.offsetWidth , _this.$refs.demo1.offsetHeight );
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
            createControls( camera );
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function onDocumentMouseMove( event ) {
            mouseX = ( event.clientX - windowHalfX ) * 10;
            mouseY = ( event.clientY - windowHalfY ) * 10;
        }

        function animate() {
            if( _this.anchor ){
              // 指望摄像头
              for( var i = 0 ; i < _this.anchor.length ; i++ )
                _this.anchor[i].lookAt(_this.camera.position);
            }
            controls.update();
            requestAnimationFrame( animate );
            render();
        }

        function createControls( camera ) {
            controls = new TrackballControls( camera, renderer.domElement );
            // controls.minDistance = 200;
            // controls.maxDistance = 100000;
            // controls.rotateSpeed = 1.0;
            // controls.zoomSpeed = 1.2;
            // controls.panSpeed = 0.8;
            controls.keys = [ 65, 83, 68 ];
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
            camera.lookAt( scene.position );
            renderer.render( scene, camera );
        }
    },

    // 创建拖动插件
    createDrag (){
        var camera = this.camera; 
        var renderer = this.renderer;
        var objects = this.anchor;
        var controls = new DragControls( objects, camera, renderer.domElement );

        controls.addEventListener( 'dragstart', function ( event ) {
            // event.object.material.emissive.set( 0xaaaaaa );
        } );
        controls.addEventListener( 'drag', function ( event ) {
            // console.log(JSON.stringify(event.object.position));
            var { x , y , z } = event.object.position;
            var hr = Math.sqrt( Math.pow( y , 2 ) + Math.pow( x , 2 ) + Math.pow( z , 2 ) );
            var chr =  1000 / hr;
            event.object.position.x *= chr;
            event.object.position.y *= chr;
            event.object.position.z *= chr;
        } );
        controls.addEventListener( 'dragend', ( event )=> {
            // event.object.material.emissive.set( 0x000000 );
            this.showEdit(event.object)
        } );
    },

    // 创建锚点
    addAnchor (param){
      // 创建几何
      var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
      var texture = new THREE.TextureLoader().load( this.conf.vrPath+'anc/point.png' );
      var material = new THREE.MeshBasicMaterial( { map: texture , depthTest: false ,  transparent: true, } );
      // 创建渲染
      var object = new THREE.Mesh( geometry, material );
      object.position.x =  param.x || 0;
      object.position.y =  param.y || 0;
      object.position.z =  param.z || -800;
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
      // this.show.add = true;
      // this.$refs.add.set( anchor_obj );
    },

    loadCamera (){
      var id = location.search.replace("?","");
      getCameraById(id,(data)=>{
        this.initMesh(data.info);
        // this.createDrag();  
        for( var i in data.anchor ){
          this.addAnchor(data.anchor[i]);
        }
        this.cameraJson = data;
      })
    },

    qiehuan (obj){
      this.cameraJson = obj;
      location.search = "?"+obj.info.id;
    },

    goedit (){
      var dat = this.cameraJson;
      open("vr?"+dat.info.id);
    }

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
    }

    .vr .vr_info {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 262px;
      background: #0000003c;
      color: #e0e0e0;
      padding: 5px;
      border-radius: 4px;
    }

    .vr .vr_info .title {
      font-size: 14px;
      padding: 5px 0px;
      text-align: center;
    }

    .vr .vr_info .textInfo {
      text-indent: 2em;
    }

    .vr .vr_select {
      position: absolute;
      right: 8px;
      bottom: 8px;
      display: flex;
      background: #0000008c;
      border-radius: 4px;
    }

    .vr .vr_select > div {
      padding: 4px;
      cursor: pointer;
    }

    .vr .vr_select > div:hover {
      background: #00a1ff;
    }

    .vr .vr_select img {
      width: 70px;
      height: 50px;
    }

    .vr .vr_edit_vr {
      position: absolute;
      top:8px;
      right: 8px;
      padding: 8px 15px;
      color: #00a1ff;
      background: #ffffff;
      border-radius: 4px;
      cursor: pointer;
    }

</style>