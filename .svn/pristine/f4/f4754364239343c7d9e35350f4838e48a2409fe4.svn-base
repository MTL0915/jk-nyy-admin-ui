<template>
    <div class='pointInfo' :style='"left:"+pointInfoX+"px;top:"+pointInfoY+"px"'>
        <div class='pointInfo-title'>{{device.name || "-"}}</div>  
        <div class='pointInfo-row'>
            <!--
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>电量:</span> 
                <span class='pointInfo-value'>{{getPowerValue}}</span>
            </div>
            -->
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>温度:</span> 
                <span class='pointInfo-value'>{{property_values.dTemp? parseInt(property_values.dTemp )+"℃" : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>速度:</span> 
                <span class='pointInfo-value'>{{property_values.speed? parseInt(property_values.speed) : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>报警:</span> 
                <span class='pointInfo-value' style='color:#ff0000;' >{{property_values.rd_sta === 1 ? "有障碍物注意" : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>任务状态:</span> 
                <span class='pointInfo-value' >{{property_values.nav_cmd === 5 ? "正在任务中" : "暂无任务"}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import drawLine from '../bll/drawLine.bll.js'
let { createPolygonByPolyline } = drawLine;
export default {
    props: {
        property_values: {
            type: Object,
            default: ()=> {}
        },
        device: {
            type: Object,
            default: ()=> {}
        },
        deviceConfig: {
            type: Array,
            default: ()=> []
        },
        positionCorrection: {
            type: String,
            default: ""
        }
    },
    watch: {
        property_values (res){
            // 刷新电量
            this.getPower();
            var loaction = res.location.concat();
            if( window.view && view.center ){
                if( this.positionCorrection && this.positionCorrection != "" ){
                    var pc = this.positionCorrection.split(",");
                    loaction[1] += pc[0]*1;
                    loaction[0] += pc[1]*1;
                }
                loaction = [loaction[1],loaction[0]]
                var p =view.center.clone();
                p.longitude = loaction[0];
                p.latitude = loaction[1];
                p = view.toScreen(p);
                this.pointInfoX = p.x;
                this.pointInfoY = p.y;

                this.showPoint(loaction)
                this.cameraChange(view);

                if( res.nav_cmd == 5 ){
                    this.layerLine.visible = false;
                }else{
                    this.layerLine.visible = true;
                }

                if( this.pointGraphic ){
                    this.pointGraphic.symbol.symbolLayers.items[0].heading = res.arimuth*1 + 180;
                    this.pointGraphic.symbol = this.pointGraphic.symbol.clone();
                }
            }
        }
    },
    data (){
        return {
            pointInfoX: 0,        // 设备屏幕坐标
            pointInfoY: 0,        // 设备屏幕坐标
            isCameraChange: false,
            layer: null,
            layerLine: null,
            getPowerValue: 0
        }
    },
    mounted (){
        
    },
    methods: {

        // 获得电量
        getPower (){
            // 获得配置信息
            var dataConfig = this.deviceConfig;
            // 获取配置信息中的最小电压
            var min = dataConfig.find((e)=>{ return e.name == "batVolLower" });
            min ? min = min.value : min = 0;
            // 获取配置信息中的最大电压
            var max = dataConfig.find((e)=>{ return e.name == "batVolUpper" });
            max ? max = max.value : max = 0;
            // 获取当前上传电压
            var batVol = this.property_values.batVol;

            if( max === 0 ){
                this.getPowerValue = "0%"
            }else{
                this.getPowerValue = parseInt(( batVol*1 - min*1 ) / (max*1 - min*1) * 100) + "%";
            }
        },

        cameraChange (view){
            if( this.isCameraChange ) return;
            this.isCameraChange = true;
            //  监听摄像头的变化
            var btn = view.watch('camera',(camera) => {
                if( this.pointGraphic ){
                    // 基本上 在4.x里面 所有的地图拖动 旋转 本质上都是摄像头的变化
                    var windowXY = view.toScreen(this.pointGraphic.geometry)
                    this.pointInfoX = windowXY.x;
                    this.pointInfoY = windowXY.y;
                }
                // 监听摄像机高度 隐藏显示模型和图标
                if( view.zoom < 20 ){                    
                    this.pointGraphicIcon.visible = true;
                    this.pointGraphic.visible = false;
                }else{
                    this.pointGraphicIcon.visible = false;
                    this.pointGraphic.visible = true;
                }
            });
        },

        // 显示设备点
        showPoint (position){
            if( !this.pointGraphic ){
                this.pointGraphicIcon = map3d.Util.createImgPoint({
                    img: require("@/assets/img/Plan/drawLineMap/qp/point.png"),
                    xy: position,
                    spatialReference: { wkid: 4326 }
                });
                // 生成几何Point 
                var point = {
                    type: "point",
                    x: position[0],
                    y: position[1],
                    spatialReference: { wkid: 4326 }
                }
                // 生成模型symbol 
                var symbol = {
                    type: "point-3d",  
                    symbolLayers: [{
                        anchor: "bottom",
                        type: "object", 
                        resource: {
                            href: "/static/model/nj3.gltf"
                        },
                        width: 1, //模型宽度
                        height: 1, //模型高度
                        // height: 1,
                        material: {
                            color: "red"
                        }
                    }]
                }
                // 生成Graphic
                this.pointGraphic = new map3d.esri.Graphic({geometry:point,symbol:symbol});
                // 添加图标
                this.layer = map3d.Util.addGraphic(this.pointGraphicIcon,"pointInfo",view);
                this.pointGraphicIcon.visible = false;
                // 添加模型
                this.layer = map3d.Util.addGraphic(this.pointGraphic,"pointInfo",view);
                // 路线对象
                this.pointLine = map3d.Util.createGraphic({
                    geometry : {
                        type: "polyline",
                        hasZ: false,
                        hasM: false,
                        paths: [[]],
                        spatialReference: { wkid: 102100 }
                    },
                    symbol : {
                        type: "simple-line",
                        color: "lightblue",
                        width: "20px",
                        style: "solid"
                    }
                });
                this.pointLine.visible = false;
                this.layerLine = map3d.Util.addGraphic(this.pointLine,"pointInfoLine",view)
                // 创建矩形线
                this.layerLinePolygon = createPolygonByPolyline(this.pointLine.geometry);
                map3d.Util.addGraphic(this.layerLinePolygon,"pointInfoLine",view);
            }else{
                this.pointGraphic.geometry.x = position[0];
                this.pointGraphic.geometry.y = position[1];
                this.pointGraphic.geometry = this.pointGraphic.geometry.clone();

                this.pointGraphicIcon.geometry.x = position[0];
                this.pointGraphicIcon.geometry.y = position[1];
                this.pointGraphicIcon.geometry = this.pointGraphicIcon.geometry.clone();

                var positions = map3d.esri.webMercatorUtils.geographicToWebMercator({x:position[0],y:position[1]});
                position = [positions.x,positions.y]
                var ary = this.pointLine.geometry.paths[0];
                if( ary.length===0 || ary[ary.length-1][0] !== position[0] || ary[ary.length-1][1] !== position[1] ){
                    ary.push(position);
                    this.pointLine.geometry.paths[0] = ary;
                    this.pointLine.geometry = this.pointLine.geometry.clone();

                    this.layerLinePolygon.geometry = map3d.esri.geometryEngine.geodesicBuffer(this.pointLine.geometry,3,'feet')
                }
            }
        },
    }
}
</script>

<style scoped>
.pointInfo {
    position:absolute;
    z-index: 999;
    background: #000000A8;
    padding: 8px;
    border-radius: 4px;
    color: #fff;
    transform: translate(-50%,-140%);
    width: 150px;
}
.pointInfo-title {
    color: #039fb2;
    padding: 0 0 12px;
    font-size: 14px;
}
.pointInfo-row { }
.pointInfo-model { }
.pointInfo-name { }
.pointInfo-value { color: #8cc8cf; }
</style>