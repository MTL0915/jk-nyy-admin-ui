// 基地点坐标
// 在指定层级有不一样的响应事件
var base = function(){
    this.init && this.init.apply(this,arguments);
}

base.prototype = {
    // 初始化函数
    init (){
        // 显示基地点的层级
        this.baseZoom = null;
        // 显示基地全貌的层级
        this.baseInfoZoom = null;
        // 基地全貌的集合
        this.baseGrapics = [];
        // 基地数据
        this.data = [];
        // 基地几何
        this.baseGraphic = null;
        // 基地坐标
        this.baseGraphicPosition = [];
    },
}

export default base