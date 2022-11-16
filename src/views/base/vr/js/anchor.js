// 锚点管理器
var Anchor = function(){
    // 锚点个数
    this.anchor = [];
    // 运行初始化函数
    this.init.apply(this,arguments);
}

Anchor.prototype = {

    init (camera, renderer){
        // 创建拖动插件
        this.createDrag(camera, renderer);  
    },

    // 创建拖动插件
    createDrag (camera, renderer){
        var objects = this.anchor;
        var controls = new DragControls( objects, camera, renderer.domElement );
        controls.addEventListener( 'dragstart', function ( event ) {
            event.object.material.emissive.set( 0xaaaaaa );
        } );
        controls.addEventListener( 'dragend', function ( event ) {
            event.object.material.emissive.set( 0x000000 );
        } );
    },

    // 创建锚点
    create (){
        // 创建几何
        var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
        // 创建渲染
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        // 确定位置
        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;
        // 确定朝向
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        // 确定宽高大小缩放
        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;
        // 进入场景
        scene.add( object );
        // 加入数据组
        objects.push( object );
    },

}

export { Anchor }