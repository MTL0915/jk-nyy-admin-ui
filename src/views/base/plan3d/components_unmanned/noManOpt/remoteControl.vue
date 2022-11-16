<template>
    <!-- 方向盘 -->
    <div class='quan'>
        <!-- 外边距 -->
        <div class='m-border'></div>
        <!-- 内边距 -->
        <div class='p-border' ref='quan'
            :class='"boxShadow"+interval'
            @mousedown="downQuan" @touchstart='downQuanTouch' 
            @mouseout="outQuan" 
            @mouseup="upQuan" @touchend='upQuan' 
            @mousemove='clickQuanTest' @touchmove='clickQuanTestTouche'>
            <!-- 遮罩 -->
            <!-- <div :class='{full: !quanStatus}' class='cover'></div> -->
            <!-- 控制球 -->
            <!-- <div class='qiu' :style='left !== 0 && top !== 0 ? ("left:"+left+"px;top:"+top+"px;") : ""'>{{angle}}</div> -->
            <!-- <img draggable="false" :src='require("@/assets/img/Plan/unmanned/fx.png")' style='width:100%;cursor: pointer;' /> -->
            <img draggable="false" 
                :src='require("@/assets/img/Plan/drawLineMap/qp/fangxiangpan.png")' 
                style='width:100%;cursor: pointer;' />
        </div>

        <!-- 测试参数 -->
        <div class='test_params'>
            <!-- <div>{{JSON.stringify(center)}}</div> -->
        </div>
    </div>
</template>

<script>
// import Control from './Control.js'


export default {
    props: {
        // 设备信息
        device_id: {
            type: String,
            default: ""
        },

        angle: {
            type: Number,
            default: 0
        },
        changeAngle: {
            type: Function,
            default: function(){}
        },
        mouseup: {
            type: Function,
            default: function(){}
        },
        mousedown: {
            type: Function,
            default: function(){}
        },
        ws: {
            type: Object,
            default: ()=>{}
        },
        property_values: {
            type: Object,
            default: ()=>{}
        },
        info: {
            type: Object,
            default: ()=>{}
        },
        // 是否允许控制
        isopt: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            quanStatus: true,
            top: 0,
            left: 0,
            center: [],
            domLayer: [],
            interval: 0,
            // 为了
        }
    },
    mounted (){
        this.control = this.ws;
    },

    beforeDestroy (){

    },

    methods: {

        outQuan (){
            // 判断电源是否启动
            if( !this.isopt ){
                this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning',    
                });
                return;
            }

            // 判断一下当前状态
            if( this.property_values.state === 0 ){
                // 如果设备是处于离线状态则无法控制
                 this.$message({
                    message: '该设备处于离线状态 无法远程控制。',
                    type: 'warning',
                    
                });
                return ;
            }
            if( this.property_values.nav_cmd === 5 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
                    type: 'warning',
                    
                });
                return ;
            }

            this.upQuan();
        },

        downQuan (res){
            // 判断电源是否启动
            if( !this.isopt ){
                 this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning',
                    
                });
                return;
            }

            // 判断一下当前状态
            if( this.property_values.state === 0 ){
                // 如果设备是处于离线状态则无法控制
                 this.$message({
                    message: '该设备处于离线状态 无法远程控制。',
                    type: 'warning',
                    
                });
                return ;
            }
    
            if( this.info.controlType === 3 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在现场控制 无法远程控制。',
                    type: 'warning',
                    
                });
                return ;
            }

            if( this.property_values.nav_cmd === 5 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
                    type: 'warning',
                    
                });
                return ;
            }

            // 当按下去的时候记录一下当前位置的信息
            var dom = res.target;
            // 获取dom的中心位置
            var center = [dom.offsetWidth / 2, dom.offsetHeight / 2];
            // 计算当前触发点位于屏幕位置
            var layer = [res.x,res.y];
            // 计算当前点位于所在dom的相对位置
            var layer1 = [res.offsetX,res.offsetY];
            // 用相对于屏幕位置 - 相对dom的位置 获得控制dom的屏幕位置
            var layer = [layer[0] - layer1[0], layer[1] - layer1[1]];
            // 获取dom相对于屏幕的位置 + dom的半径 可以获得 dom中心相对于屏幕的位置
            this.center = [layer[0] + center[0], layer[1] + center[1]];
            this.quanStatus = false;
            this.mousedown(res);
            // 修改点击之后 默认触发
            this.clickQuanTest(res);
        },

        downQuanTouch (res){    
            // alert(JSON.stringify(res))
            // 当按下去的时候记录一下当前位置的信息
            var dom = res.target.className === "qiu" ? res.target.parentElement : res.target;
            // 获取到当前的touch的返回值
            var touches = Array.prototype.slice.apply(res.touches);
            var resDom = touches.find((e)=>{ return e.target === res.target });
            var position = this.position = dom.getBoundingClientRect();
            // 获取dom的中心位置
            var center = [dom.offsetWidth / 2, dom.offsetHeight / 2];
            // 计算当前触发点位于屏幕位置
            var layer = [resDom.pageX,resDom.pageY];
            // 计算当前点位于所在dom的相对位置
            var layer1 = [resDom.clientX-position.x,resDom.clientY-position.y];
            // 用相对于屏幕位置 - 相对dom的位置 获得控制dom的屏幕位置
            var layer = [layer[0] - layer1[0], layer[1] - layer1[1]];
            // 获取dom相对于屏幕的位置 + dom的半径 可以获得 dom中心相对于屏幕的位置
            this.center = [layer[0] + center[0], layer[1] + center[1]];
            this.quanStatus = false;
            this.mousedown(res);
        },

        upQuan (){
            this.mouseup()
            this.quanStatus = true;
            this.left = 0; 
            this.top = 0;
            this.interval = 0;
        },

        clickQuanTestTouche (res){
            if( this.quanStatus ) return ;
            // 判定区域
            // var dom = this.$refs.quan;
            // 实际圆的中心点
            var point = this.center;
             // 当按下去的时候记录一下当前位置的信息
            var dom = this.$refs.quan;
            // 获取到当前的touch的返回值
            var touches = Array.prototype.slice.apply(res.touches);
            var resDom = touches.find((e)=>{ return e.target === res.target });
            // 被点击的点位置
            var resXY = [resDom.pageX,resDom.pageY]; 
            // var resXY = [res.offsetX,res.offsetY]; 
            // 计算距离是否在球内
            var diff = this.diff(resXY,point);
            // 然后获取角度
            this.angle = parseInt(this.deg(resXY,point)); 
            // 判断这个角度所在的区间
            this.interval = this.getQuadrant(this.angle);
            // 触发回调函数
            this.changeAngle(this.angle);
            // 判断距离是否大于半径 如果距离大于半径
            if( diff > point[0] ){  
                // 根据角度求最大外边坐标
                var xy = this.getXyYuan(this.angle,point[0]);
                this.left = dom.offsetWidth / 2 + xy[0];
                this.top = dom.offsetHeight / 2 - xy[1];
            }else {
                // 赋值变化
                this.left = resDom.pageX - this.position.x //+ dom.offsetWidth / 2;
                this.top = resDom.pageY - this.position.y //+ dom.offsetHeight / 2;
            }
        },

        clickQuanTest (res){
            if( this.quanStatus ) return ;
            // 判定区域
            var dom = this.$refs.quan;
            // 实际圆的中心点
            var point = this.center;
            // 被点击的点位置
            var resXY = [res.x,res.y]; 
            // var resXY = [res.offsetX,res.offsetY]; 
            // 计算距离是否在球内
            var diff = this.diff(resXY,point);
            // 然后获取角度
            this.angle = parseInt(this.deg(resXY,point));
            
            this.interval = this.getQuadrant(this.angle);
            // 触发回调函数
            this.changeAngle(this.angle);
            // 判断距离是否大于半径 如果距离大于半径
            if( diff > point[0] ){  
                // 根据角度求最大外边坐标
                var xy = this.getXyYuan(this.angle,point[0]);
                this.left = dom.offsetWidth / 2 + xy[0];
                this.top = dom.offsetHeight / 2 - xy[1];
            }else{
                // 赋值变化
                this.left = res.x - point[0] + dom.offsetWidth / 2;
                this.top = res.y - point[1] + dom.offsetHeight / 2;
            }
        },

        // 已知角度求最大外边圆坐标xy
        getXyYuan (angle , r){
            var x = Math.sin(angle * Math.PI / 180) * r;
            var y = Math.cos(angle * Math.PI / 180) * r;
            return [x,y]
        },

        // 求兩點之間的距離
        diff (p1,p2){
            var x = Math.abs(p1[0] - p2[0]);
            var y = Math.abs(p1[1] - p2[1]);
            var diff = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
            return diff;
        },

        getQuadrant (x){
            if( x > 315 || x < 45 ){
                return 1
            }else if( x < 135 ){
                return 2
            }else if( x < 225 ){
                return 3
            }else if( x < 315 ){
                return 4
            }
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

        // 开启
        open (){
            this.control.open();
        },

        // 关火
        off (){
            this.control.bootDown();
        },

        // 方向盘变化
        setAngle (a,b){
            this.control.setAnget(a,b);
        },

        up (){
            if( this.upKey ) {
                clearInterval(this.upKey)
                this.upKey = null;
            }
            this.upKey = setInterval(()=>{
                this.control.up();
            },500)
        },

        down (){
            if( this.downKey ) {
                clearInterval(this.downKey)
                this.upKey = null;
            }
            this.downKey = setInterval(()=>{
                this.control.down();
            },500)
        },

        unUpAndDown (){
            // 停止之前的计时器
            if( this.upKey ) {
                clearInterval(this.upKey)
                this.upKey = null;
            }
            if( this.downKey ) {
                clearInterval(this.downKey)
                this.upKey = null;
            }
            this.control.unUpAndDown();
        },

        sendOn (id){
            this.control.sendOn(id);
        },

        sendOff (id){
            this.control.sendOff(id);
        },

        setSpeedGean (gean){
            this.control.setSpeedGean(gean)
        },

        openWindow (id){
            this.control.openWindow(id)
        },

        closeWindow (id){
            this.control.closeWindow(id)
        },

        stopWindow (id){
            this.control.stopWindow(id)
        }
    }
}
</script>

<style>
    .qiu {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        position:absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%,-50%);
        background: #fff;
        line-height: 40px;
        cursor: pointer;
    }

    .m-border {
        background: #2c4b4594;
        border-radius: 50%;
        margin: 15px;
        height: calc(100% - 30px);
        position: absolute;
        width: calc(100% - 30px);
    }

    .p-border {
        background: #233136;
        border-radius: 50%;
        margin: 30px;
        height: calc(100% - 60px);
        position: absolute;
        width: calc(100% - 60px);
    }

    .p-border > img {
        pointer-events: none;
    }

    .cover.full {
        position:fixed!important;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99999999999;
    }

    .p-border .cover {
        position:absolute;
        z-index: 9;
        width: 100%;
        top:0;
        left:0;
        height: 100%;
    }

    .boxShadow1 {
        box-shadow: 0px -3px 3px #ffffff;
    }
    .boxShadow2 {
        box-shadow: 3px 0px 3px #ffffff;
    }
    .boxShadow3 {
        box-shadow: 0px 3px 3px #ffffff;
    }
    .boxShadow4 {
        box-shadow: -3px 0px 3px #ffffff;
    }
</style>