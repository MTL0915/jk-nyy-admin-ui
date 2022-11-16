var draw = function(){
    // 地图
    this.map = null;
    // 禁止重复参数
    this.isSearch = false;
    // 绘制的几何
    this.graphics = [];
}

draw.prototype = {

    getLayer (){
        if( !this.layer ){
            this.layer = new esri.layers.GraphicsLayer();
            this.layer.id = "draw_Artboard";
            this.getMap().addLayer(this.layer);
        }
        return this.layer;
    },

    clearLayer (){
        this.getLayer().clear();
    },

    close (){
        this.clearLayer();
        this.map = null;
        this.layer = null;
        this.graphics = null;
    },

    setMap (map){ 
        this.map = map; 
    },

    getMap(){
        return this.map || window.map;
    },

    getDraw (map){
        if( !this.draw ){
            this.draw = new esri.toolbars.Draw(map);
        }
        return this.draw;
    },

    active (type,fn){
        // 禁止重复
        if (this.isSearch) return;
        this.isSearch = true;
        // 标名map
        var map = this.getMap();
        // 进入绘制
        var draw = this.getDraw(map);
        // 开启绘制几何
        draw.activate(type);
        // 监听完成事件
        var drawFn = draw.on("draw-complete", e => {
            // 解锁禁止
            this.isSearch = false;
            // 去除掉回调
            drawFn.remove();
            // 关闭绘制
            draw.deactivate();
            // 触发回调
            fn && fn(e);
            // 绘制进入layer
            this.setGometry(e);
            // 去除掉按钮事件
            document.onkeyup = null;
        });
        // 监听ESC退出
        document.onkeyup = e => {
            if (e.keyCode === 27) {
                this.isSearch = false;
                // 去除掉回调
                drawFn.remove();
                // 关闭绘制
                draw.deactivate();
                // 去除掉自己
                document.onkeyup = null;
            }
        };
    },

    // 将几何绘制到layer上
    setGometry(event){
        var geometry = event.geometry;
        var symbol = event.symbol ||  ( geometry.type.indexOf("line") > -1 ? event.target.lineSymbol : event.target.fillSymbol  );
        var attr = event.attributes || {};
        var graphic = new esri.Graphic(geometry,symbol,attr);
        var layer = this.getLayer();
        layer.add(graphic);
    },

    drawTestDistance (type,fn){
        var layer = this.getLayer()
        this.active(type,function(e){
            debugger;
            var p = null;
            if( e.geometry.type.indexOf("line") > -1 ){
                p = new esri.geometry.Point( e.geometry.paths[0][0] )
            }else{
                p = e.geometry.getCentroid();
            }
            drawTestDistance(e.geometry,(c)=>{
                var textSymbol =  new esri.symbol.TextSymbol(c+(type==='polygon' ? "千米" : "平方千米")).setColor(
                    new esri.Color([128,0,0])).setAlign(esri.symbol.Font.ALIGN_START).setFont(
                    new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD)) ;
                var graphic = new esri.Graphic(p,textSymbol);
                layer.add(graphic);
            });

        })
        
    }

}

draw.active = function(type , fn){
    // 创建绘制工具
    this.draw = new esri.toolbars.Draw();
    // 开启绘制几何
    draw.activate(type);
    // 监听完成事件
    var drawFn = draw.on("draw-complete", e => {
        // 去除掉回调
        drawFn.remove();
        // 触发回调
        fn && fn(e);
        // 去除掉按钮事件
        document.removeEventListener("keyup",keyup);
    });

    var keyup = function(e){
        if (e.keyCode === 27) {
            // 去除掉回调
            drawFn.remove();
            // 关闭绘制
            draw.deactivate();
            // 去除掉自己
            document.removeEventListener("keyup",keyup);
        }
    }

    // 监听ESC退出
    document.addEventListener("keyup",keyup);
}

/**在地图上 画图形
*传入需要画的类型
*/
//测距
var geometryService = null;
var getGeometryService = function(){
    if( !geometryService ){
        geometryService = new esri.tasks.GeometryService("http://121.32.129.19:8100/arcgis/rest/services/Utilities/Geometry/GeometryServer"); 
    }
    return geometryService;
}

var drawTestDistance = function(geometry,fn){
debugger;
    // var map = this.map;
    geometryService = getGeometryService();
    // draw.on("draw-end",function(event){
        /* dojo.disconnect(geometryServiceEvent); */
        // if(drawEnd){ drawEnd(event,map,draw); return; }
        // draw.deactivate();
        // map.setMapCursor("default");
        var measuregeometry = geometry;

        function outputDistance(result) {
            var CurX = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][0];  
            var CurY = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][1];  
            var CurPos  =  new  esri.geometry.Point(CurX,  CurY, map.spatialReference);  
            // map.infoWindow.setTitle("距离测量");  
            // map.infoWindow.setContent(" 测 量 长 度 ： <strong>" + result.lengths[0].toFixed(2)+ "千米</strong>");  
            // map.infoWindow.show(CurPos);  
            fn && fn(result.lengths[0].toFixed(2))
        } 
            
        function outputAreaAndLength(result) {
            var CurX = (measuregeometry.cache._extent.xmax + measuregeometry.cache._extent.xmin) / 2;  
            var CurY = (measuregeometry.cache._extent.ymax + measuregeometry.cache._extent.ymin) / 2  
            var CurPos = new esri.geometry.Point(CurX, CurY, map.spatialReference);
            // map.infoWindow.setTitle("面积测量");  
            // map.infoWindow.setContent(" 面积 ： <strong>" + result.areas[0].toFixed(2)+ "平方千米</strong>");  
            // map.infoWindow.show(CurPos);  
            fn && fn(result.areas[0].toFixed(2))
        } 
        switch (measuregeometry.type) {
        case "polyline":{
                var lengthParams = new esri.tasks.LengthsParameters();
                lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
                lengthParams.geodesic = true; 
                lengthParams.polylines = [measuregeometry];
                geometryService.lengths(lengthParams);
                dojo.connect(geometryService, "onLengthsComplete", outputDistance); 
                break;
            }
            case "polygon":{
                
                var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();  
                areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;  
                areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_KILOMETERS; 
                areasAndLengthParams.calculationType = "geodesic";
                geometryService.project([measuregeometry], map.spatialReference, function (geometry) {  
                    geometryService.simplify(geometry, function (simplifiedGeometries) {  
                        areasAndLengthParams.polygons = simplifiedGeometries;  
                        areasAndLengthParams.polygons[0].spatialReference = map.spatialReference;  
                        geometryService.areasAndLengths(areasAndLengthParams);  
                    });  
                }); 
                dojo.connect(geometryService, "onAreasAndLengthsComplete", outputAreaAndLength);
                break;
            }
        }
}

// module.exports = { draw : draw }

export default draw