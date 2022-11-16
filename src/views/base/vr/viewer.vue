<template>
  <div class='vr'>
    <div class='view' ref="demo1"></div>
    <add ref='add' v-show='show.add'></add>
    <div class='vr_add'>
      <div @click='addAnchor'> 新增标注 </div>
    </div>
  </div>
</template>

<script>
import { PhotoSphereViewer } from './js/viewer.js'
// import add from './components/edit';

// import dat from 'dat.gui'
export default {
  components : {
    // add
  },
  data: () => ({
   show :{
     add : false
   }
  }),
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      this.initMesh();
    },

    initMesh () {
      var PSV = new PhotoSphereViewer({
        // Path to the panorama
        panorama:  this.conf.vrPath+'dv/sun.jpg',

        // Container
        container: this.$refs.demo1,

        // Deactivate the animation
        time_anim: false,

        // Display the navigation bar
        navbar: true,

        // Resize the panorama
        // size: {
        //   width: '100%',
        //   height: '500px'
        // }
      });
    },

    // 创建拖动插件
    createDrag (){
        var camera = this.camera; 
        var renderer = this.renderer;
        var objects = this.anchor;
        var controls = new DragControls( objects, camera, renderer.domElement );

        var 现时拖动

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
            this.showEdit({
              type : "0",
              scenes : "场景1",
              link : "https://www.baidu.com",
              name : "新建锚点",
            })
        } );
    },

    // 创建锚点
    addAnchor (){
      // 创建几何
      var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
      // var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(this.) } );
      var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
      // 创建渲染
      var object = new THREE.Mesh( geometry,  material );
      // 确定位置
      // object.position.x = Math.random() * 1000 - 500;
      // object.position.y = Math.random() * 600 - 300;
      // object.position.z = Math.random() * 800 - 400;
      object.position.x =  0;
      object.position.y =  0;
      object.position.z = -800;
      // 确定朝向
      // object.rotation.x = Math.random() * 2 * Math.PI;
      // object.rotation.y = Math.random() * 2 * Math.PI;
      // object.rotation.z = Math.random() * 2 * Math.PI;
      // 确定宽高大小缩放
      // object.scale.x = Math.random() * 2 + 1;
      // object.scale.y = Math.random() * 2 + 1;
      // object.scale.z = Math.random() * 2 + 1;
      // 进入场景
      this.scene.add( object );
      // 加入数据组
      // 创建数据组
      object.data = {
        type : "0",
        scenes : "",
        link : "",
        name : ""
      };
      this.anchor.push( object );
    },

    // 显示编辑窗口
    showEdit ( anchor_obj ){
      this.show.add = true;
      this.$refs.add.set( anchor_obj );
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
</style>