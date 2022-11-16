<template>
    <div id="example"></div>
</template>

<script>
// 加载video插件
import vrVideo from '../controls/mxreality.js'
export default {
    props: {
        url: {
            type: String,
            default: ""
        },
        load: {
            type: Function,
            default: ()=>{}
        },
    },
    mounted (){
        this.init();
    },
    methods: {
        init(){

            var scene, renderer;
            var container;
            var vr;

            AVR.debug=true;
            if( !AVR.Broswer.isIE() && AVR.Broswer.webglAvailable() ) {
                renderer = new THREE.WebGLRenderer();
            }else {
                renderer = new THREE.CanvasRenderer();
            }
            renderer.setPixelRatio( window.devicePixelRatio );
            container = document.getElementById('example');
            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            // fov 选项可调整初始视频远近
            vr = window.vr =new VR(scene,renderer,container,{"fov":100});

            //vr.playText="<img src='img/play90.png' width='40' height='40'/>";
            vr.vrbox.radius=600;
            if(AVR.isCrossScreen()) {
                // 调整vr视窗偏移量
                vr.effect.separation=1.2;
            }
            vr.loadProgressManager.onLoad=function () {

            }
            vr.init( ()=> {
                this.load({
                    vr, scene  
                });
            });

            vr.play(this.url,vr.resType.video);

            vr.video.setAttribute("loop","loop");
            vr.video.crossOrigin="Anonymous";

            vr.video.onended=function () {
                
            }
            
            // 创建几何
            var geometry = new THREE.PlaneGeometry( 10, 10, 1 , 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry, material );
            plane.position.set( 10, 20, 20 )
            scene.add( plane );
        }
    }
} 
</script>

<style>

</style>