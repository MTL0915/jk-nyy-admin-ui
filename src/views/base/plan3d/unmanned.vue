<template>
    <!-- 无人车操作系统PC版 -->
    <div class='unmannedMap'>
        <!-- 在线时间 -->
        <!-- <div class='loginTime'>
            <span> 已登录 </span>
            <span>{{ this.loginTime / 3600 > 1 ? parseInt(this.loginTime / 3600)+ ":" : "" }}</span>
            <span>{{ this.loginTime / 60 > 1 ? parseInt((this.loginTime / 60) % 60) + ":" : "0:" }}</span>
            <span>{{ this.loginTime % 60 }}</span>
        </div> -->
        
        <!-- 左侧操作模式按钮部分 -->
        <div class='left-bottom' v-show='!isFull'>
            <div class='left-btn-box' v-if='false'>
                <div class='left-btn' @click='openFull'>
                    <i class='el-icon-menu'></i>
                    <div>操作模式</div>
                </div>
                <div class='left-btn'>
                    <i class='el-icon-plus'></i>
                    <div>其他功能</div>
                </div>
            </div>

            <!-- 无人控制台 -->
            <comp-noManOpt v-if='deviceData.state' :speed_gear1='speed_gear' :headActive='headActive' ref='noManOpt' :ws='ws' :deviceWsUpdate='deviceWsUpdate' :device_id='device_id' :device='deviceData'></comp-noManOpt>
        </div>

        <!-- 列表 -->
        <div v-show='!isFull'>
            <!-- 列表 -->
            <comp-noManList v-if='true' :device='deviceData' :property_values='property_values' :updateInfo='updateInfo' :sensorInfos='sensorInfos'></comp-noManList>
        </div>

        <!-- 全屏模式 -->
        <div class='fullModeBox'>
            <comp-fullMode :beforeClose='beforeCloseFullMode' v-show='showFullMode'></comp-fullMode>
            <comp-fullModeWrc v-show='showFullModeWrc'></comp-fullModeWrc>
            <comp-fullModePyc v-show='showFullModePyc'></comp-fullModePyc>
        </div>

        <!-- 地图部分 -->
        <!-- <JKMap3d :load='loadMap'></JKMap3d> -->

        <!-- mini地图 -->
        <!-- <comp-miniMap class='miniMap' ref='miniMap' :center='miniCenterXY' :xy='miniXY' :heading='miniheading'></comp-miniMap> -->

        <div class='pointInfo' :style='"left:"+pointInfoX+"px;top:"+pointInfoY+"px"' v-if='false'>
            <div class='pointInfo-title'>{{deviceData.name || "-"}}</div>
            <div class='pointInfo-row'>
                <!--
                <div class='pointInfo-model'>
                    <span class='pointInfo-name'>电量:</span> 
                    <span class='pointInfo-value'>{{property_values.batVol? parseInt(property_values.batVol / 15 * 100)+"%" : "-"}}</span>
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
            </div>
        </div>
        
    </div>
</template>

<script>
// 挖肥机
import compNoManOpt from "./components_unmanned/noManOpt/noManOpt"

import compNoManList from "./components_unmanned/noManList"
import compMiniMap from "./components_unmanned/miniMap"
import compFullMode from "./components_unmanned/fullMode"
import compFullModeWrc from "./components_unmanned/fullMode_wrc"
import compFullModePyc from "./components_unmanned/fullMode_pyc"

// import { getDetailById } from '@/api/equip'

import { map3d } from "@/utils/jiankun_map";
export default {
    props: {
        device_id: {
            type: String,
            default: param.id
        },
        ws: {
            type: Object,
            default: ()=> {}
        },
        view: {
            type: Object,
            default: ()=> {}
        },
        headActive: {
            type: Number,
            default: 1
        },
        deviceData: {
            type: Object,
            default: ()=> {}
        }
    },
    watch: {
        
    },
    components: {
        compNoManOpt,
        compNoManList,
        compFullMode,
        compFullModeWrc,
        compFullModePyc,
        compMiniMap
    },
    data (){
        return {
            hours: 0, 
            minutes: 0,
            seconds: 0,
            day: 0,
            year: 0,
            month: 0,
            timeDate: 0,
            loginTime: 0,

            showFullMode: false,
            showFullModeWrc: false,
            showFullModePyc: false,

            point: null,
            pointLine: null,
            analysisPaths: [],

            pointInfoX: 800,
            pointInfoY: 300,
            miniXY: [122,22],
            miniCenterXY: [122,22],
            miniheading: 0,

            updateInfo: {},
            property_values: {},
            sensorInfos: [],

            position: [],

            deviceWsUpdate: {},

            // 是否有权限
            isAuthority: false,

            speed_gear: 0.5,

        }
    },
    mounted (){
        // 获取设备信息
        // this.getDevice()
    },  
    destroyed (){
        // 清除计时器
        this.key && clearInterval(this.key);
        // 清除图层和事件
        view && view.map.layers.items.forEach((e)=>{
            e.declaredClass == "esri.layers.GraphicsLayer" && e.id != "pointInfo" && view.map.layers.remove( e )
        })
    },
    methods: {
        
        deviceWsUpdateFunction (info){
            this.deviceWsUpdate = info;
            this.sensorInfos = info.sensorInfos;
            this.updateInfo = info;
            this.property_values = info.property_values;

            this.updateInfoFunction(info);
        },

        // 获取设备信息
        // getDevice (){
        //     getDetailById({
        //         device_id: this.device_id
        //     }).then((e)=>{
        //         if( e.code == 500 ) {
        //             this.$message({
        //                 showClose: true,
        //                 message: '你没有这个设备的权限',
        //                 type: 'warning',
        //                 duration: 0
        //             });
        //         }else{
        //             this.isAuthority = true;
        //             this.deviceData = e.data;
        //             // 判断在线状态
        //             if( this.deviceData.state == 0 ){
        //                 // 如果是离线状态下 则不显示页面信息ui和控制ui
        //                 this.$alert('该设备不在线', '提示', {
        //                     confirmButtonText: '确定',
        //                     callback: action => {}
        //                 });
        //             }
        //         }
        //     })
        // },

        // 监听上报信息
        updateInfoFunction (info){
            // console.log(info);
            // 实时跟新位置
            // this.updateDevicePosition(info);
        },

        // 根据上传位置实时定位设备位置显示
        updateDevicePosition (info){
            // 获取上报的坐标位置
            var position = info.property_values.location;
            // 如果传入的金纬度存在则显示设备在地图上
            if( position[0] ){
                this.showPoint([position[1],position[0]]);
            }      
        },
        
        //表钟
        loadMap(view){
            // 这个就是url
            // var layer = new map3d.esri.IntegratedMeshLayer({
            //     // url: "http://121.32.129.19:8100/arcgis3d/rest/services/Hosted/gdnytgzz/SceneServer",
            //     url: "http://121.32.129.19:8100/arcgis3d/rest/services/Hosted/yangdong5/SceneServer",
            //     copyright:"jk",
            //     elevationInfo:{
            //         mode:"absolute-height",
            //         offset:0
            //     },
            //     id: "3dLayer"
            // });

            // view.goTo({
            //     position: {"spatialReference":{"latestWkid":3857,"wkid":102100},"x":12623907.938285986,"y":2653873.503721932,"z":1543.4117499236017}
            // }).then(()=>{
            //     // this.showPoint();
            // })

            // 监听摄像头的变化
            // var btn = view.watch('camera',(camera) => {
            //     if( this.devicePoint ){
            //         // 基本上 在4.x里面 所有的地图拖动 旋转 本质上都是摄像头的变化
            //         var windowXY = view.toScreen(this.devicePoint.geometry)
            //         this.pointInfoX = windowXY.x;
            //         this.pointInfoY = windowXY.y;
            //     }
            //     var point = view.center.clone();
            //     this.miniCenterXY = [point.x,point.y];
            //     this.miniheading = view.camera.heading;
            // });
        },

        // 显示目标点
        showPoint (position){
            if( !this.view ) return;
            // this.position.push(position)
            // 几何对象
            if( this.devicePoint ){
                // 如果对象已经创建了则修改
                var g = this.devicePoint.geometry
                g.longitude = position[0];
                g.latitude = position[1];
                this.devicePoint.geometry = g.clone();
                var positions = map3d.esri.webMercatorUtils.geographicToWebMercator({x:position[0],y:position[1]});
                position = [positions.x,positions.y]
                
                var ary = this.pointLine.geometry.paths[0];
                if( ary.length===0 || ary[ary.length-1][0] !== position[0] || ary[ary.length-1][1] !== position[1] ){
                    ary.push(position);
                    this.pointLine.geometry.paths[0] = ary;
                    this.pointLine.geometry = this.pointLine.geometry.clone();
                }
            }else{
                // 如果对象不存在则新建
                var pointGraphic = this.point = map3d.Util.createImgPoint({
                    img: require("@/assets/img/Plan/drawLineMap/qp/point.png"),
                    xy: position,
                    spatialReference: { wkid: 4326 }
                });
                var layer = map3d.Util.addGraphic(pointGraphic,"liaoweizhong",view)
                this.devicePoint = pointGraphic;
                this.view.zoom = 17.5;
                this.view.center = pointGraphic.geometry.clone();
                // 路线对象
                var lineGraphic = window.lineGraphic = this.pointLine = map3d.Util.createGraphic({
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
                        width: "2px",
                        style: "solid"
                    }
                });
                var layer = map3d.Util.addGraphic(lineGraphic,"liaoweizhong",view)
            }
            var windowXY = view.toScreen(this.devicePoint.geometry)
            if( windowXY ){
                this.pointInfoX = windowXY.x;
                this.pointInfoY = windowXY.y;
                // this.miniXY = [this.devicePoint.geometry.longitude,this.devicePoint.geometry.latitude];
                // this.$refs.miniMap.updateCenter(this.miniXY)
            }
        },

        communication (x,y){
            this.analysisPaths.push([x,y]);

            // 点渲染
            this.point.geometry.x = x;
            this.point.geometry.y = y;
            this.point.geometry = this.point.geometry.clone();

            // 改变线段
            this.pointLine.geometry.paths[0] = this.analysisPaths;
            this.pointLine.geometry = this.pointLine.geometry.clone();
        },

        // 开启全屏
        openFull (){
            this.isFull = true;
            this.showFullMode = true;
        },

        beforeCloseFullMode (){
            this.isFull = false;
            this.showFullMode = false;
        },

        beforeClose (){
            // 隐藏当前显示的结构
            this.$parent.showDeviceList = true;
            // 关闭任务
            this.$parent.showtaskList = true;
            // 显示控制模板
            this.$parent.showUnmanned = false;
        }
    }
}
</script>

<style>
    .unmannedMap .esri-ui-top-left.esri-ui-corner ,.unmannedMap .esri-attribution.esri-widget {
        display: none;
    }

    .unmannedMap * {
        -webkit-user-select: none!important;
    }

</style>

<style scoped>

    .loginTime {        
        position: absolute;
        background: #00000099;
        z-index: 99;
        color: #fff;
        font-size: 12px;
        padding: 4px;
    }

    .miniMap {
        width: 280px;
        height: 200px;
        position: absolute;
        right: 3px;
        bottom: 3px;
        /* border: solid 2px #808080; */
        border-radius: 6px;
        overflow: hidden;
        z-index: 999;
        border: solid 1px #06c4fb;
        border-radius: 4px;
    }

    .pointInfo {
        position:absolute;
        z-index: 999;
        background: #000000A8;
        padding: 8px;
        border-radius: 4px;
        color: #fff;
        transform: translate(-50%,-130%);
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

    .unmannedMap {
        height: 100%;
    }

    .title {
        position:absolute;
        background: #000000A8;
        color:#ffffff;
        padding: 20px 22px;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content:space-between;
        top: 0;
    }

    .title .name {
        font-size: 24px;
    }

    .left-bottom {
        position:absolute;
        left: 0;
        bottom: 0;
        top: 0;
        z-index: 9999;
    }

    .left-btn-box {
        margin-left: 15px;
        position: absolute;
        bottom: 230px;
    }

    .left-btn {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        background: #0000006e;
        border: solid 1px #ffffff;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        padding-top: 9px;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .left-btn i {
        font-size: 32px;
        color: #fff;
    }

    .time {
        font-size: 32px;
        margin-right: 15px;
    }

    .title-right {
        display: flex;
        align-items: baseline;
    }

    .fullModeBox {
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999999;
    }

    .back:hover {
        color: #1dcbc9;
    }

    .back {
        color: #ffffff;
        margin: 0 17px;
        border-radius: 4px;
        border: solid 1px;
        padding: 8px;
        cursor: pointer;
        transition: all 0.25s;
    }

    .lwz {
        position: absolute;
        width: 100%;
        height: calc(100% + 35px);
        z-index: 9999999;
        margin-top: -35px;
    }
</style>