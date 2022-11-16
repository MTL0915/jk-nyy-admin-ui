<template>
    <div class='navigationMode' :style='!isNa ? "padding: 0;": ""'>
        <!-- <div v-show='isNa'>自动航行模式中</div>
        <div v-show='isNa' class='backBtn' @click='stopRouteJob'>退出</div> -->
        <img v-show='isNa' style='margin-top: 6px;left: 50%;top: 0;position: absolute;transform: translate(-50%, 0px);' :src='require("@/assets/img/editMap/daohangmoshi.png")' />
        <div v-show='isTouch' style='width: 100%;text-align: center;margin-top: 6px;'>
            <img :src='require("@/assets/img/editMap/shijiaomoshi.png")' />
            <img @click='backTouch' class='shijiaoend' :src='require("@/assets/img/editMap/shijiaoend.png")' />
        </div>
        <img v-show='!isTouch && $parent.headActive == 1 && !isNa' class='shijiaostart' @click="shijiaostart" :src='require("@/assets/img/editMap/shijiaostart.png")' />
    </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
import drawLine from '../bll/drawLine.bll.js'
let { createPolygonByPolyline } = drawLine;

import { 
    getRouteJobPath,   //获取任务路线数据
    getRouteJob,
    routeJobDetail
} from '@/api/map3d/drawMap'
export default {
    props: {
        publicData: {
            type: Object,
            default: ()=>{}
        },
        deviceWs: {
            type: Object,
            default: ()=>{}
        },
        device: {
            type: Object,
            default: ()=>{}
        }
    },
    watch: {
        deviceWs (data){
            // 如果地图还未加载好
            if( !this.viewLoad ){
                return ;
            }
            // 判断是否是在导航状态
            if( data.property_values.nav_cmd === 5 && (data.property_values.task_id || data.property_values.task_id == 0) && this.device && !this.isNa ){
                this.isNa = true;
                if( data.property_values.task_id == 0 ){
                    // 如果是导航状态下
                    this.createLineByTask_id( );
                }
                return ;
            }else if(data.property_values.nav_cmd !== 5 || (!data.property_values.task_id && data.property_values.task_id != 0)){
                this.isNa = false;
            }

             // 判断是否是在示教状态
            if( data.property_values.nav_cmd === 1 && this.device && !this.isTouch ){
                this.isTouch = true;
                // 如果是示教状态下
                this.touchMode();
                return ;
            }else if(data.property_values.nav_cmd !== 1 ){
                this.isTouch = false;
            }
        }
    },
    data (){
        return {
            layer: null,
            task: null,
            taskPath: null,
            isNa: false,     //是否已经是导航状态了
            isTouch: false,  //将模式设置为示教模式
            routeJob: {},
            viewLoad: false, //地图是否加载成功了
        }
    },
    mounted(){
        
    },
    methods: {
        // 开始示教
        shijiaostart (){
            // this.$refs.navigation
            this.$parent.ws.teachMode((res)=>{
                if( res.code == 500 ) {
                    this.$message({
                        type: "error",
                        message: res.msg || "示教模式出现错误"
                    })
                }else{
                    var location = this.deviceWs.property_values.location.reverse();
                    if( location ) {
                        var p = view.center.clone();
                        p.longitude = location[0];
                        p.latitude = location[1];
                        view.center = p;
                    }
                }
            });
        },

        // 地图加载完毕事件
        loadMap (){
            this.viewLoad = true;
        },

        stopRouteJob (){
            this.$parent.$refs.headPortrait.stopRouteJob();
        },

        back (){
            //清除路线
            view.map.remove(this.layer);
        },

        // 创建自己的图层
        toNavigation (task,isContinue){
            return new Promise((res,err)=>{
                // 根据传入的任务获取任务路径
                var path = task.path;
                // 根据任务id获取路径数据
                this.getPath (task,isContinue,()=>{
                    res()
                    // 创建路线
                    this.createLine(this.taskPath);
                });
                // 隐藏一些必要界面
                this.uiOperate();
            })
        },

        uiOperate (){
            this.$parent.headActive = 1;
            // this.$parent.isShwo
        },

        getPath (it,isContinue,fn){
            this.task = it;
            // 当选中任务的时候 获取路线数据
            getRouteJobPath(it.routeJobPathId).then((e)=>{
                if( e.code === 200 ){
                    this.taskPath = e.data.content[0];
                    this.taskPath.path = this.$parent.jiaozheng(JSON.parse(this.taskPath.path));
                    // 下发执行命令
                    isContinue === true ? this.continueTask(fn) : this.execuTask(fn);
                }
            })
        },

        createLineByTask_id(id){
            // 根据任务id获取路径
            routeJobDetail({id}).then((res) => {
                this.routeJob = res.data;
                res.data.routeJobPathDTO.path=this.$parent.jiaozheng(JSON.parse(res.data.routeJobPathDTO.path));
                this.createLine(res.data.routeJobPathDTO);
            })
        },

        createLine (item,bool){
            // 定义线段symbol
            var symbol = this.getLineSymbol();
            // 定义线段geometry
            if( item.path[0][0] > 1000 ){
                var path = item.path;
            }else{
                var path = item.path.map((e)=>{
                    return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
                })
            }
            var geometry = map3d.Util.createPolyline(path, view.spatialReference.wkid);
            // 合并开始
            // var graphic = map3d.Util.createGraphic({ geometry, symbol })
            var graphic = createPolygonByPolyline(geometry);
            // 将当前几何和任务联系起来
            graphic.task = item;
            // 绑定联系
            item.graphic = graphic;
            // 视角移动指定路线
            bool !== false && view.goTo({
                target: graphic.geometry.extent
            })
            // 添加到地图上
            this.layer = map3d.Util.addGraphic(graphic, "自动导航", view);
            return graphic;
        },

        getLineSymbol (param={}){
            return {
                type: "line-3d",
                symbolLayers: [
                    {
                        type: "line",
                        size: "10px",
                        material: {
                            color: param.color || [255, 255, 255, 0.8]
                        }
                    }
                ]
            }
        },
        
        execuTask (fn){
            // 发送任务
            this.$parent.ws.setUpInstructions(this.task.id,()=>{
                this.$parent.ws.executeInstructions(this.task.id,(e)=>{
                    if( e.code == "500" ){
                        this.$message({
                            type: "error",
                            message: e.msg
                        })
                    }else{
                        this.$message({
                            type: "success",
                            message: "任务启动成功，开始导航；"
                        })
                        fn && fn()
                    }
                });
            },0)
        },

        // 继续任务
        continueTask(fn) {
            // 首先获取当前的任务路径
            var taskPath = this.taskPath.path.concat();
            // 获取当前设备的坐标点
            var point = this.deviceWs.property_values.location;
            // 计算最近的点
            var dif = this.$parent.unjiaozheng(taskPath).map((e,i)=>{
                return { d: this.diff( e , [point[1],point[0]] ) , point: e , i }
            }).sort((a,b)=>{ return a.d - b.d })
            // 将最近的第一个数组坐标设备目标点  以及下标位置
            var index = dif[0].i;
            // 发送任务
            // return ;
            this.$parent.ws.setUpInstructions(this.task.id,()=>{
                this.$parent.ws.executeInstructions(this.task.id,(e)=>{
                    if( e.code == "500" ){
                        this.$message({
                            type: "error",
                            message: e.msg
                        })
                    }else{
                        this.$message({
                            type: "success",
                            message: "继续上一次任务成功，开始任务；"
                        })
                        fn && fn()
                    }
                });
            },index)
        },

         // 求兩點之間的距離
        diff (p1,p2){
            var x = Math.abs(p1[0] - p2[0]);
            var y = Math.abs(p1[1] - p2[1]);
            var diff = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
            return diff;
        },

        // 示教模式
        touchMode (){
            // 然后将页面设置为监控页面
            this.uiOperate();
        },

        // 退出示教
        backTouch (){
            // 发出退出示教提示
            this.$parent.ws.unteachMode((res)=>{
                if( res.code == 200 ){
                    this.$message({
                        type: "success",
                        message: "退出成功"
                    })
                    // res.data = [{"action_config":null,"arimuth":0,"lat":23.1457757,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457775,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457793,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457811,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457829,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457847,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457865,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457883,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457901,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.145791,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457928,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457945,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457963,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457981,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1457999,"lng":113.3383622},{"action_config":"{\"2\":1}","arimuth":0,"lat":23.1458008,"lng":113.3383622},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458021,"lng":113.3383608},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458034,"lng":113.3383594},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458047,"lng":113.338358},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458059,"lng":113.3383567},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458072,"lng":113.3383553},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458085,"lng":113.3383539},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458097,"lng":113.3383525},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.145811,"lng":113.3383511},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458123,"lng":113.3383497},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458136,"lng":113.3383484},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458148,"lng":113.338347},{"action_config":"{\"3\":1}","arimuth":315,"lat":23.1458161,"lng":113.3383456}]
                    // 处理示教返回的路线数组
                    var data = res.data.map((e)=>{ var a = { 
                        position: [e.lng,e.lat] , action: e.action_config }; return a; });
                    // 获得处理后的坐标数据
                    // var data = this.processPath(data)
                    // 首先显示任务管理
                    this.$parent.headActive = 2;
                    setTimeout(()=>{
                        // 然后调用新增任务模块
                        this.$parent.$refs.taskList.addTask();
                        // 添加新增任务中的path路径属性
                        var addTask = this.$parent.$refs.addTask;
                        // 将路线保存
                        addTask.form.path = this.$parent.jiaozheng(data.map((e)=>{ 
                            return e.position; 
                        })).map((e)=>{ return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1]) });
                        // addTask.form.path = data.map((e)=>{ return e.position; });
                        // 输入生成路线
                        addTask.pathListData = data.map((e)=>{ return e.action });
                        // 创建绘制路线
                        addTask.graphic = this.$parent.$refs.deviceList.showTaskPath(addTask.form,true);
                    },200)
                }else{
                    this.$message({
                        type: "error",
                        message: "退出失败"
                    })
                }
            });
        },

        // 处理示教的返回数据
        processPath (data){
            // var data = [[113.3383534,23.1458512],[113.3383515,23.1458507],[113.3383496,23.1458503],[113.3383486,23.14585],[113.3383477,23.1458498],[113.3383458,23.1458493],[113.3383439,23.1458489],[113.338342,23.1458484],[113.3383401,23.1458479],[113.3383383,23.1458475],[113.3383364,23.145847],[113.3383354,23.1458468],[113.3383347,23.1458461],[113.3383333,23.1458449],[113.338332,23.1458436],[113.3383306,23.1458423],[113.3383292,23.1458411],[113.3383292,23.1458402],[113.3383292,23.1458384],[113.3383292,23.1458366],[113.3383292,23.1458348],[113.3383292,23.145833]];
            // 总线段
            var paths = [];
            // 一根单线段
            var pathsLine = [];
            // 当前处理线段
            var path = [];
            // 初始角度
            var arcStart = 0;
            // 极限角度、
            var arcMax = 5;
            for( var i in data ){
                var a = data[i];
                // 如果当前处理线段还没有点坐标
                if( path.length === 0 ) {
                    // 将当前点作为初始点
                    path.push(a);
                    pathsLine.push(a);
                    continue;
                }else{
                    var p = path[0];
                    // 计算结束坐标
                    // 判断是否存在初始角度
                    if( !arcStart ){
                        // 如果不存在初始角度计算当前角度 并将角度设置为初始值
                        arcStart = this.deg(p.position,a.position);
                        continue;
                    }else{

                        var bb = new map3d.esri.Point(
                            p.position,
                            window.view.spatialReference
                        );
                        var aa = new map3d.esri.Point(
                            a.position,
                            window.view.spatialReference
                        );
                        // 获取距离
                        var diff = map3d.esri.geometryEngine.distance(bb, aa);

                        // 如果存在初始角度 则开始判断角度累积
                        var arc = arcStart - this.deg(p.position,a.position);
                        // 累积过后的角度是否超过了极限值 或者 如果到了最后一个了 或者 action类型不同分段
                        if( // 当角度大于等于最大默认角度
                            ((Math.abs(arc) >= arcMax ||
                                // 动作发生变化
                                p.action != a.action) &&
                                // 判断距离
                                diff > 0.8) ||
                                // 是最后的点
                                i == data.length - 1 ){
                            // 超过极限值后
                            // 将上一个点作为线段的结束
                            path.push(data[i-1]);
                            pathsLine.push(a);
                            // 将线段存入总集里
                            paths.push(path);
                            // 创建新的线段并将当前点作为初始点
                            path = [data[i-1]];
                            // 初始角度清空
                            arcStart = this.deg(path[0].position,a.position);
                            continue;
                        }else{

                        }
                    }
                }
            }
            return pathsLine;
        },

        // 求2点之间的角度
        deg (p1 , p2){
            var x = p1[0] - p2[0];
            var y = p1[1] - p2[1];
            var deg = Math.atan(Math.abs(x / y)) * 180 / Math.PI
            if( x > 0 ){
                if( y > 0 ){
                    // 第四象限
                    deg = 180 - deg;
                }else{
                    // 第一象限 不用改变
                }
            }else{
                if( y > 0 ){
                    // 第三象限
                    deg = 180 + deg; 
                }else{
                    // 第二象限
                    deg = 360 - deg; 
                }
            }
            return deg;
        },

    }
}
</script>

<style>
    .shijiaostart:hover {
        border-radius: 50%;
        box-shadow: 0px 0px 3px #ffffff;
    }

    .shijiaostart {
        transition: all 0.25s;
        cursor: pointer;
        position: absolute;
        top: 65px;
        right: 5px;
    }
    .shijiaoend:hover {
        border-radius: 50%;
        box-shadow: 0px 0px 3px #ffffff;
    }

    .shijiaoend {
        transition: all 0.25s;
        cursor: pointer;
        position: absolute;
        top: 65px;
        right: 5px;
    }

    .navigationMode {
        position: absolute;
        top: 0px;
        left: 50%;
        padding: 15px;
        border-radius: 4px;
        transform: translateX(-50%);
        color: #ead4d4;
        font-size: 16px;
        display: flex;
        align-items: center;
        width:100%;
        z-index: 1000;
    }

    .backBtn {
        padding: 4px;
        background: #43657d;
        border-radius: 4px;
        color: #fff;
        margin-left: 14px;
        cursor: pointer;
    }

    /* .backBtn:hover {
        background: #ead4d4;
    } */

</style>