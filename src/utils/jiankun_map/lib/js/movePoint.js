let point = function(point){

    // 点
    this.point = null;

    // 保存路径点
    this.paths = [];

    // 实际运行轨迹
    this.line = [];

    // 速度事件
    this.speed = 1000;
    
    // 行动下标
    this.index = 0;

    this.setPoint(point);

}

point.prototype = {

    setPoint (point){
        this.point = point;
        this.layer = this.point.getLayer();
        this.paths.push(this.getData(point.geometry));
    },

    moves (xys,param){
        xys.forEach((e)=>{
            this.move(e)
        })
    },

    getData(xy){
        return xy.x ? [xy.x , xy.y] : xy;
    },

    move (xy,param){
        xy = this.getData(xy);
        // 如果处在动画中的话 则直接扩充路径
        if( this.isAnimate ){
            // 处理位置进行分段处理
            var paths = this.handlePath(this.paths[this.paths.length-1],xy);
            // 扩充数组
            this.paths.push.apply(this.paths,paths);
            return;
        }
        // 处理位置进行分段处理
        this.paths.push.apply(this.paths,this.handlePath([this.point.geometry.x,this.point.geometry.y],xy));
        // 开始创建动画计时器
        this.createAnimateTimer(param);
    },

    clear (){
        this.stop();
        this.paths = null;
    },

    handlePath (path,xy){
        var p = [];
        var start = path;
        var end = xy;
        if( !end ) return;
        var x = start[0]-end[0];
        var y = start[1]-end[1];
        var _x = x / 100;
        var _y = y / 100;
        var angle = 0;
        if( x > 0 && y > 0 ){
            angle = Math.atan( Math.abs(x / y) ) * 180 / Math.PI;
        }else if( x > 0 && y < 0 ){
            angle = Math.atan( Math.abs(y / x) ) * 180 / Math.PI + 90;
        }else if( x < 0 && y < 0 ){
            angle = Math.atan( Math.abs(x / y) ) * 180 / Math.PI + 180;
        }else if( x < 0 && y > 0 ){
            angle = Math.atan( Math.abs(y / x) ) * 180 / Math.PI + 270;
        }
        // var angle = this.GetJiaoDu(start,end);
        for( var n = 1; n <= 100; n ++ ){
            // if( p[i-2] ) g.symbol.setAngle(this.GetJiaoDu(p[i-2],ps));
            p.push([start[0]-_x*n,start[1]-_y*n,angle]);
        }
        return p;
    },

    createAnimateTimer (param = {}){
        
        // 如果存在动画先停掉
        if( this.animate ) { return  /* this.stop(); */ }
        var points = this.paths;
        var layer = this.layer;
        // 表明动画中
        this.isAnimate = true;
        this.animate = setInterval(()=>{
            // 获取路线数组第一个
            var xy = points[this.index++];
            // // xy如果不存在了 则停止
            // if( !xy ) { this.clear(); return; }
            // 修改物体的经纬度
            // this.point.geometry.x = xy[0];
            // this.point.geometry.y = xy[1];
            this.updatePoint(xy)

            // xy如果不存在了 则停止
            if( this.index >= this.paths.length ) { this.stop(); return; }
        }, param.speed ? param.speed / 100 : this.speed / 100);
    },

    // 暂停动画
    stop (){
        clearInterval( this.animate );
        this.animate = null;
        // 表明动画中
        this.isAnimate = false;
    },

    updatePoint (xy){
        // 设置角度
        xy[2] && this.point.symbol.setAngle( xy[2] );
        // 刷新物体的layer;
        var layer = this.layer || this.point.getLayer();
        if( layer ) {
            layer.remove(this.point)
            this.point.geometry.setX(xy[0])
            this.point.geometry.setY(xy[1])
            layer.add(this.point)
        };
    },

    // 设置运动下标
    setIndex (index){
        var xy = this.paths[index];
        if( !xy ) return;
        this.index = index;
        if( !this.isAnimate ){
            // 如果不在动画中的话
            this.updatePoint(xy)
        }
    }

}

export default point