import {map3d} from "@/utils/jiankun_map";

window.ss = 0;

/* arcgis动画计算参数
*  graphic 动画图形
*  paths   动画轨迹路径
*/ 
let animate = function(pointGraphic,paths,line){
    this.line   = line;
    this.timer  = null;
    this.paths  = paths;                     //路径
    this.index  = 0;                         //像素帧下标
    this.speed  = 60;                        //速度
    this.status = 0;                         //状态   // 0 停止  // 1 运动
    this._animate      = [];                 //监听动画的事件集
    this.pointGraphic  = pointGraphic;       //唯一像素图片
    this.analysisPaths = [];                 //像素帧
    this.init.apply(this,arguments);
}

animate.prototype = {

    destroy (){
        this.pause();
        this.line   = null;
        this.timer  = null;
        this.paths  = null;                     //路径
        this.index  = null;                         //像素帧下标
        this.speed  = null;                        //速度
        this.status = null;                         //状态   // 0 停止  // 1 运动
        this._animate      = null;                 //监听动画的事件集
        this.pointGraphic  = null;       //唯一像素图片
        this.analysisPaths = null;                 //像素帧
    },

    // 初始化函数
    init (param){
        // 开始处理分析路径
        this.analysisPath()
    },

    // 开始动画
    play (index){
        if( this.status == 1 ){
            return //禁止重复播放
        }
        this.status = 1;
        index && ( this.index = index )
        this.animate();
    },

    // 暂停动画
    pause (){
        this.status = 0;
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    },

    // 重置动画
    reset (){
        this.pause();
        this.index = 0;
        this.moveGraphic(0)
    },

    // 改变速度
    setSpeed (level){
        this.speed = level * 60;
        if( this.status === 1 ){
            // 如果正在播放中
            this.pause();
            this.play();
        }
    },

    getSpeed (){
        return this.speed / 60;
    },

    /*  分析路径处理
    *   将路径分为可置信的几个小段
    */ 
    analysisPath (){
        var paths = this.paths;
        var analysisPaths = [];
        var len = this.speed;
        for( var i = 0 ; i < paths.length-1 ; i++ ){
            var 
            //获取经度
            lon = paths[i][0],
            //获取纬度
            lat = paths[i][1];
            //开始计算差值
            var _lon = (lon - paths[i+1][0])/len;
            var _lat = (lat - paths[i+1][1])/len;
            for( var i1 = 0 ; i1 < len; i1++ ){
                analysisPaths.push([lon-_lon*i1,lat-_lat*i1])
            }
        }
        // 将处理好的位置像素帧保存下来
        this.analysisPaths = analysisPaths;
    },

    /* 动画过程
    *  
    */
    animate (){
        // this.status = 1;
        this.timer = setTimeout(()=>{
            // 如果运动状态被改为了0 则立即停止
            if( this.status === 0 ){
                return 
            }
            this.moveGraphic(this.index++);
            this.createLine();
            if( this.index < this.analysisPaths.length ){
                this.animate();
            }
        },1000 / this.speed)
    },

    /** 将点移动到对应下标上
     * 
     */
    moveGraphic (index){
        var point = this.analysisPaths[index];
        this.pointGraphic.symbol.symbolLayers.items[0].heading = window.ss + this.deg([this.pointGraphic.geometry.x,this.pointGraphic.geometry.y],point);
        this.pointGraphic.symbol = this.pointGraphic.symbol.clone();
        this.pointGraphic.geometry.x = point[0];
        this.pointGraphic.geometry.y = point[1];
        this.pointGraphic.geometry = this.pointGraphic.geometry.clone();
        map3d.Util.dialog(this.pointGraphic,"智能小车","<div> <div>状态: 任务中</div><div>电量: 79%</div><div>电量: 0.5m/s</div> </div>")
        this._onAnimate(this);
    },

    // 求2点之间的距离
    deg (p1 , p2){
        var x = p1[0] - p2[0];
        var y = p1[1] - p2[1];
        var deg = Math.atan(Math.abs(x / y)) * 180 / Math.PI
        if( x > 0 ){
            if( y > 0 ){
                // 第四象限
                deg = 180 - deg; 
                console.log("4")
            }else{
                deg = deg + 180; 
                // 第一象限 不用改变
                console.log("1")
            }
        }else{
            if( y > 0 ){
                // 第三象限
                deg = 180 + deg; 
                console.log("3")
            }else{
                // 第二象限
                deg = deg + 180; 
                console.log("2")
            }
        }
        return deg;
    },

    /** 渲染轨迹线
     *  
     */
    createLine() {
        if( this.line ){
            this.line.geometry.paths[0] = this.analysisPaths.slice(0,this.index);
            this.line.geometry = this.line.geometry.clone();
        }
    },

    _onAnimate (_this){
        this._animate.forEach(( e )=>{ 
            try{ e(_this) }catch(e){};
            return ; 
        });
    },

    onAnimate (fn){
        if( typeof fn === 'function' ){
            this._animate.push(fn);
            return {
                remove (){ 
                    var index = this._animate.find((e)=> { return e  === fn });
                    this._animate.splice(index,1);
                }
            }
        }
    }

}

export default animate;