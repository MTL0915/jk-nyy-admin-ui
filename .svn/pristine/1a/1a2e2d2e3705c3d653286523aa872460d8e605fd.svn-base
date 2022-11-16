<template>
    <div class='map3d_bottom'>

        <!-- 选择朝向和模式 放大缩小的按钮 -->
        <div class='toolGraup' :class='modePanor && sceneList.length? "top" : ""'>
            <!-- 时间 -->
            <div class='toolTime' v-show='isLight' @click='showLightUi'>
                <!-- <i class='el-icon-watch'></i> -->
                <!-- {{timeDate}}:00 -->
                <img style='width: 19px;' :src='require("@/assets/img/Plan/run.png")' />
            </div>
            <!-- 遮罩 -->
            <div class='toolCover' @click='showCover'>
                <img style='width: 19px;' v-show='isShowCover' :src='require("@/assets/img/Plan/yy1.png")' />
                <img style='width: 19px;' v-show='!isShowCover' :src='require("@/assets/img/Plan/yy.png")' />
            </div>
            <!-- 全图 -->
            <div class='toolFull' @click='To3d'>
                {{(mode == 2 ? "3" : "2") +"d"}}
            </div>
            <!-- 指南针 -->
            <div class='toolCompass' @click='changeHeading' :style='"transform:rotateZ("+heading+"deg)"'></div>
            <!-- 放大缩小区域 -->
            <div class='toolZoom'>
                <div @click='bigZoom'>+</div>
                <div @click='smallZoom'>-</div>
            </div>
        </div>

        <div class='layerChange' :class='{top: modePanor && sceneList.length , noP: sceneList && sceneList.length === 0 }'>
            <!--  -->
            <div class='layerBox dt' :class='selectBaseMap === "topo"? "active":""' @click='selectBaseMapClick("topo")'>
                <div>地图</div>
            </div>
            <div class='layerBox wx' :class='{active:selectBaseMap === "satellite"}' @click='selectBaseMapClick("satellite")'>
                <div>卫星</div>
            </div>
            <div v-show='sceneList.length > 0' :style='sceneList[0] && "background-image: url("+getPath(sceneList[0].thumbnailPath)+");"' class='layerBox qj' :class='modePanor? "active":""' @click='showPanorList'>
                <div>全景</div>
            </div>
        </div>
        <!-- 场景列表 -->
        <div
            :class='modePanor && sceneList.length > 0 ? "show" : "hide"'
            class="sceneList"
        >
            <!-- <div style='position: absolute;top: -21px;background: #00000080;padding: 4px;color: #fff;'>列表展示</div> -->
            <!-- <div class='leftSco Sco' @click='pervSco'> </div> -->
            <div ref='sceneListBox' @mousewheel='wheelSco'>
                <div v-show='sceneList.length === 0' style="background: #b9b9b9;color: #504545;border: none;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);padding: 10px;">暂无全景数据</div>
                <div
                    v-for="(it , i) in sceneList"
                    :key="i"
                    v-show='( it.longitude && it.latitude ) || true'
                    :class="it.id == sceneId ? 'active' : ''"
                    @click="changeScene(it)"
                >
                    <div @mouseover="SceneMouseover(it,$event)" @mouseout="SceneMouseout(it,$event)" style='position:absolute;width: 100%;height: 100%;top: 0;left: 0;z-index:9;'></div>
                    <!-- <img  :src='require("./logo.png")' /> -->
                    <img :src="getPath( it.thumbnailPath )">
                    <!-- <img :src='require("@/assets/img/imgny.png")' /> -->
                    <div class="sceneListName"> {{ it.name }} </div>
                </div>
            </div>
            <!-- <div class='rightSco Sco' @click=' nextSco'> </div> -->
        </div>

        <div class='arrow' v-show='arrowShow' ref='arrow'>
            
        </div>

        <!-- 修改右下角区域，添加图例面板 -->
        <!-- <div class="tuli">
            <div class="divBottomText">图例</div>
            <div class="divBottomSymbolOffline">●</div>
            <div class="divBottomText">离线</div>
            <div id="op1" @click="click1">dianji</div>
            <div class="divBottomSymbolOnline">●</div>
            <div class="divBottomText">在线</div>
            <i class="el-icon-success" id="op2" @click="click2"></i>
            <div class="divBottomSymbolError">●</div>
            <div class="divBottomText">故障</div>
            <i class="el-icon-success" id="op3" @click="click3"></i>
        </div> -->
    </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
export default {
    props: {
        changePanor: {
            type: Function,
            default: function(){}
        },

        changeBaseMap: {
            type: Function,
            default: function(){}
        },
        sceneList: {
            type: Array,
            default: function(){ return [{ name: "123465" }] }
        },

        heading: {
            type: Number,
            default: 0
        },

        view: {
            type: Object,
            default: function(){ return {} }
        },

        // 3d还是2d模式模式
        mode: {
            type: Number,
            default: 2,
        },

        // 是否是全景状态
        modePanor: {
            type: Boolean,
            default: false
        },

        // 是否显示日光配置按钮
        isLight: {
            type: Boolean,
            default: false
        }
    },
    data (){
        return {
            // sceneList: [],
            sceneId: null,
            // modePanor: false,
            selectBaseMap: 'satellite',
            arrowShow: false,
            closeSceneMouseoutBool: true,
            // 地图时间
            timeDate: new Date().getHours(),
            // 是否开启时间控制
            isTimer: false,

            daylightWidget: null,

            isShowCover: true
        }
    },
    methods: {
        
        showLightUi (){
            
            this.isTimer = !this.isTimer
            
            if( this.isTimer ) {
                if( !this.daylightWidget ){
                    map3d.Util.load(["esri/widgets/Daylight"]).then((arge)=>{
                        var Daylight = arge[0];
                        this.daylightWidget = new Daylight({
                            view: view,
                            // plays the animation twice as fast than the default one
                            playSpeedMultiplier: 0.5,
                            // disable the timezone selection button
                            visibleElements: {
                                timezone: false
                            }
                        });
                        view.ui.add(this.daylightWidget, "top-right");
                    })
                }else{
                    view.ui.add(this.daylightWidget, "top-right");
                }       
            }else {
                this.daylightWidget && this.hideLightUi();
            }
        },

        hideLightUi (){
            this.daylightWidget && view.ui.remove(this.daylightWidget);
        },

        getLayerChangeClass (){
            var cl = "";
            cl += this.modePanor? "top" : "";
            cl += this.sceneList.length > 0?"noP" :"";
            return cl;
        },

        getPath (path){
            return path ? process.env.VR_IMGPATH + path : require("@/assets/img/imgny.png");
        },

        bigZoom (){
            var zoom = view.zoom + 1;
            zoom < 20 && view.goTo({
                zoom: view.zoom + 1
            })
        },

        smallZoom (){
            var zoom = view.zoom - 1;
            zoom > 14 && view.goTo({
                zoom: view.zoom - 1
            })
        },

        wheelSco (e){
            this.$refs.sceneListBox.scrollLeft += e.deltaY / 3;
            this.SceneMouseout();
        },

        // 改变地图朝向
        changeHeading (){
            var heading = Math.abs(this.heading);
            if( heading - 90 < 0 ) this.heading = 90;
            else if( heading - 180 < 0 ) this.heading = 180;
            else if( heading - 270 < 0 ) this.heading = 270;
            else if( heading - 360 < 0 ) this.heading = 0;
            this.view.goTo({
                heading: this.heading
            })
        },

        changeScene (it){
            // 关闭触摸
            this.closeSceneMouseout();
            this.SceneMouseout()
            if( !it._graphics ){
                // 如果不存在点 直接进入全景
                this.changePanor(it)
            }else{
                // 关闭全景感应
                this.$parent.isPanor = true;
                // 存在点 先执行入场动画 
                view.goTo({
                    position: {
                        longitude: it._graphics.geometry.longitude,
                        latitude: it._graphics.geometry.latitude,
                        z: 80
                    },
                    tilt: 0
                }).then(()=>{
                    view.goTo({
                        tilt: 90,
                        heading: 0,
                    }).then(()=>{
                        this.$parent.isPanor = false;
                        this.changePanor(it,{ tilt : 90 , heading: 0 })
                    })
                })
            }
        },
        showPanorList (){
            this.$parent.modePanor = this.modePanor = !this.modePanor;
        },
        selectBaseMapClick (type){
            this.selectBaseMap = type;
            this.changeBaseMap(type);
        },
        // 鼠标一上去显示动画
        SceneMouseover (it,event){
            if( !this.closeSceneMouseoutBool ){
                return 
            }
            var dom = event.toElement;
            var x = event.pageX - event.layerX + dom.offsetWidth / 2;
            var y = event.pageY - event.layerY
            // event.layerY

            event.stopPropagation();
            // 如果不存在几何
            if( !it._graphics ){
                return
            }
            var xy = view.toScreen(it._graphics.geometry);
            var deff = { x: 0, y: 0 , z: 0 }
            deff.x = Math.abs(xy.x - x);
            deff.y = Math.abs(xy.y - y);
            deff.z = Math.sqrt(Math.abs(Math.pow(deff.x, 2)) + Math.abs(Math.pow(deff.y, 2)))

            var angle = Math.abs(Math.asin(deff.y / deff.z) / Math.PI * 180)
            // 对角度进行象限判断
            if( xy.x - x > 0 ){
                if( xy.y - y > 0 ){
                    // 第一现象
                    angle = angle*-1;
                }else{
                    // 第二现象
                    angle = angle;
                }
            }else{
                if( xy.y - y > 0 ){
                    // 第四现象
                    angle = 180 + angle;
                }else{
                    // 第三现象
                    angle = 180 - angle;
                }
            }
            
            var arrow = this.$refs.arrow;
            this.arrowShow = true;
            arrow.style.cssText = `
                top: ${y}px;
                left: ${x}px;
                transform-origin: 0;
                transform: rotateZ(${angle*-1}deg);
                z-index: 9;
                width: 0px;
                transition: width 0.75s; 
            `;

            $(arrow).animate({width: deff.z},100);
            //.style.width = `${deff.z}px`
            // setTimeout(()=>})
        },

        SceneMouseout (){
            this.arrowShow = false;
        },

        // 关闭选择触发
        closeSceneMouseout (){
            this.closeSceneMouseoutBool = false;
            setTimeout(()=>{
                this.closeSceneMouseoutBool = true;
            },5000)
        },

        mapExtent (){
            this.$parent.mapExtent();
        },

        To3d (){
            // 加载3d模型
            if( this.mode === 2 ){ 
                this.$parent.to3D();
            }else{
                this.$parent.to2D();
            }
        },

        showCover (){
            this.isShowCover = !this.isShowCover;
            if( this.isShowCover ){
                this.$parent.toCover();
            }else{
                this.$parent.clearCover();
            }
        },
        clearOption() {
            document.getElementById("op1").style.color = ""
            document.getElementById("op2").style.color = ""
            document.getElementById("op3").style.color = ""
        },
        click1 () {
            console.log(1)
            console.log(document.getElementById("op1"))
            // this.clearOption()
            document.getElementById("op1").style.color = "blue"
            document.getElementById("op1").style.right = 0
            //$("#op1").css("color", "blue")
        },
        click2 () {
            this.clearOption()
            document.getElementById("op2").style.color = "blue"
        },
        click3 () {
            this.clearOption()
            document.getElementById("op3").style.color = "blue"
        }
        
    }
}
</script>

<style>
    #op1 {
        position: absolute;
        top: 27px;
        right: 15px;
        color: grey;
    }
    #op2 {
        position: absolute;
        top: 54px;
        right: 15px;
    }
    #op3 {
        position: absolute;
        top: 80px;
        right: 15px;
    }
    .map3d_bottom {
        /* position:absolute; */
        top:0;
        left:0;
    }

    .map3d_bottom .tuli {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: white;
        width: 100px;
        height: 100px;
        z-index: 999999;
    }
    .map3d_bottom .tuli .divBottomText {
        font-family: "等线";
        color: black;
        font-size: 125%;
        text-align: center;
        height: 25%;
    }
    .map3d_bottom .tuli .divBottomSymbolOnline {
        color: yellowgreen;
        width: 10px;
        position: absolute;
        top: 48px;
        left: 15px;
    }
    .map3d_bottom .tuli .divBottomSymbolOffline {
        color: gray;
        width: 10px;
        position: absolute;
        top: 23px;
        left: 15px;
    }
    .map3d_bottom .tuli .divBottomSymbolError {
        color: red;
        width: 10px;
        position: absolute;
        top: 75px;
        left: 15px;
    }
    .map3d_bottom .layerChange.top {
        bottom: 100px;
    }
    .map3d_bottom .layerChange {
        position: absolute;
        right: 0;
        bottom: 0;
        display:flex;
        width: 100px;
        height: 71px;
        transition: all 0.25s;
    }
    .map3d_bottom .layerChange:hover {
        width: 330px;
        background: #ffffff;
        display:flex;
        justify-content: space-between;
    }
    .map3d_bottom .layerChange:hover > .layerBox {
        position:relative;
    }
    .map3d_bottom .layerChange.noP:hover {
        width: 220px;
    }
    .map3d_bottom .dt {
        background: url("~@/assets/img/Plan/mapLayerType.png") no-repeat 0 0;
        background-size: cover;
        position:absolute;
        /* left: 0%; */
    }
    .map3d_bottom .wx {
        background: url(/static/img/mapLayerType.a6d3e9b.png) no-repeat;
        background-size: 103px 275px;
        background-position-y: -68px;
        position:absolute;
        /* left: 50%;
        transform: translateX(-50%); */
    }
    .map3d_bottom .qj {
        /* background: url("~@/assets/img/Plan/mapLayerType.png") no-repeat 0 0; */
        /* background-size: 103px 275px; */
        /* background-position-y: -137px; */
        background-position: center;
        position:absolute;
        /* right: 0; */
        z-index: 9;
    }
    .map3d_bottom .layerBox {
        width: 100px;
        height: 69px;
        color: #ffffff;
        cursor: pointer;
    }


    .map3d_bottom .layerBox > div {
        position:absolute;
        padding: 2px;
        bottom: 0;
        right: 0;
    }

    .map3d_bottom .layerBox:hover , .map3d_bottom .layerBox.active {
        border: solid 1px #3385ff;
        z-index: 2;
    }
    .map3d_bottom .layerBox:hover > div, .map3d_bottom .layerBox.active > div {
        background: #3385ff;
    }

    .map3d_bottom .panorList {
        position: absolute;
        bottom: 0;
        right: 0;
        width:100%;
        background: #000000a8;
    }
    .map3d_bottom .panorList > div > div {
        width: 132px;
        text-align: center;
        color: #fff;
        padding: 8px;
    }
    .map3d_bottom .panorList > div > div > img {
        height: 85px;
        width: 100%;
        border-radius: 4px;
        border: solid 1px #fff;
    }

    .map3d_bottom .sceneList {
        position: absolute;
        /* top: px; */
        width: 100%;
        background: #00000000;
        display:flex;
        bottom: 0;
        background: #000000a8;
        min-height: 100px;
        z-index: 99;
    }

    .map3d_bottom .sceneList.show {
        animation: sceneListTop 0.25s forwards;
    }

    .map3d_bottom .sceneList.hide {
        animation: sceneListTopHide 0.25s forwards;
    }

    @keyframes sceneListTop {
        0% {
            bottom: -98px;
        }
        /* 50% {
            bottom: 0px;
        }
        55% {
            bottom: 0px;
        } */
        100% {
            bottom: 0px;
        }
    }

    @keyframes sceneListTopHide {
        0% {
            bottom: 0px;
        }
        /* 50% {
            bottom: 0px;
        }
        55% {
            bottom: 0px;
        } */
        100% {
            bottom: -98px;
        }
    }

    .map3d_bottom .sceneList > div > div.active {
        color: #00a1ff;
    }

    .map3d_bottom .sceneList > div > div:hover {
        color: #00a1ff;
    }

    .map3d_bottom .sceneList > div {
        display: flex;
        overflow: auto;
    }

    .map3d_bottom .sceneList > div::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .map3d_bottom .sceneList > div > div {
        position: relative;
        float: left;
        margin: 6px;
        cursor: pointer;
        border: solid 5px;
        color: #ffffff;
        border-radius: 4px;
    }

    .map3d_bottom .sceneList > div.active {
        border: solid 1px #1f72b3;
        color: #1f72b3;
    }

    .map3d_bottom .sceneList img {
        width: 120px;
        height: 75px;
    }

    .map3d_bottom .sceneList .sceneListName {
        position: absolute;
        bottom: 0;
        left: 0;
        background: #000000;
        /* color: #ffffff; */
        width: 100%;
        text-align: center;
        padding: 5px;
        user-select: none!important;
    }

    .map3d_bottom .arrow {
        background: #ffffff;
        height: 2px;
        position:absolute;
        box-shadow: 0 0 3px #000;
    }

    .map3d_bottom .arrow::after {
        content: "";
        border-radius: 50%;
        padding: 3px;
        background: #b5b0b0;
        box-shadow: 0px 0px 7px #000000;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .map3d_bottom .arrow::before {
        content: "";
        border-radius: 50%;
        padding: 2px;
        background: #78daff;
        box-shadow: 0px 0px 3px #000000;
        position:absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
    .map3d_bottom .toolGraup {
        position: absolute;
        right: 10px;
        bottom: 85px;
        /* height: 100px; */
        /* width: 20px; */
        /* background: #000; */
        border-radius: 6px;
        user-select: none;
        transition: all 0.25s;
    }
    .map3d_bottom .toolGraup.top {
        bottom: 185px
    }

    .map3d_bottom .toolTime:hover > .timer {
        display: block;
    }

    .map3d_bottom .toolTime .timer {
        position:absolute;
        right: 100%;
        width: 100px;
        display:none;
        top: 0;
    }
    .map3d_bottom .toolTime {
        width: 35px;
        height: 35px;
        background: #2d2d2d;
        border-radius: 50%;
        position:relative;
        margin-bottom: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    
    .map3d_bottom .toolFull {
        width: 35px;
        height: 35px;
        background: #2d2d2d;
        border-radius: 50%;
        position:relative;
        margin-bottom: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .map3d_bottom .toolCompass {
        width: 35px;
        height: 35px;
        background: #2d2d2d;
        border-radius: 50%;
        position:relative;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .map3d_bottom .toolCompass::before {
        position:absolute;
        content: "";
        border-right: solid 5px transparent;
        border-left: solid 5px transparent;
        border-top: solid 5px #fff700;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 0);
    }
    .map3d_bottom .toolCompass::after {
        position: absolute;
        content: "";
        border-right: solid 5px transparent;
        border-left: solid 5px transparent;
        border-top: solid 10px #ff0000;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%) rotateZ(180deg);
    }
    .map3d_bottom .toolZoom {
        background: #2d2d2d;
        border-radius: 24px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }
    .map3d_bottom .toolZoom > div {
        color:#ffffff;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .map3d_bottom .toolZoom > div:hover {
        color:#00a1ff;
    }

    .map3d_bottom .toolCover {
        width: 35px;
        height: 35px;
        background: #2d2d2d;
        border-radius: 50%;
        position: relative;
        margin-bottom: 10px;
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #fff;
    }

</style>