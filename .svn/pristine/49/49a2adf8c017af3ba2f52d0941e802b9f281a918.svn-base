

var layer = null;
var layerShowAbsolute = null;
var map = null;

var model = 1; //1 正常模式  2 停止接受变化

// 创建layer
var createLayer = function(m = map){
    if( layerShowAbsolute ){ return; }
    layerShowAbsolute = new esri.layers.GraphicsLayer();
    layerShowAbsolute.id = "grapicShowName";
    // layerShowAbsolute = new esri.layers.GraphicsLayer();
    // layer.id = "grapicShowNameAbsolute";
    m.addLayer(layerShowAbsolute);
    return layerShowAbsolute;
};

// 绑定地图
var setMap = function(m){
    map = m;
    createLayer(map);
}

var setLayer = function(lay){
    lay.on("mouse-over",(e)=>{
        if( e.graphic ){
            showGraphicName(e.graphic,layer);   
        }
    })

    // 创建监听 如果 鼠标移出目标删除掉显示名称
    lay.on("mouse-out",function(e){
        if( e.graphic.bgGraphic && e.graphic.textGraphic && e.graphic.bgGraphic.getLayer() === layer ){
            layer.remove(e.graphic.bgGraphic);
            layer.remove(e.graphic.textGraphic);
        }
    })
}

var clearlayerShowAbsolute = function(){
    layerShowAbsolute.clear();
}

var hideGraphicName = function(graphic){
    
    if( model === 2 ){
        return
    }
    var layer ;
    if( graphic.bgGraphic ){
        layer = graphic.bgGraphic.getLayer();
        layer.remove(graphic.bgGraphic);
        graphic.bgGraphic = null;
    }
    if( graphic.textGraphic ){
        layer = graphic.textGraphic.getLayer();
        layer.remove(graphic.textGraphic);
        graphic.textGraphic = null;
    }
}

var showGraphicName = function(graphic,layers){
    
    if( model === 2 ){
        return
    }
    if( graphic.bgGraphic ){
        return;
    }
    var _layer = layers || layerShowAbsolute || createLayer(map || window.map);
    if( graphic && graphic._isDialog !== true ){
        if( _layer === layerShowAbsolute ){
            if( map ) {
                map.removeLayer(_layer);
                map.addLayer(_layer);
            }
        }
        if( _layer === layer ){
            if( map ) {
                _layer.clear();
                map.removeLayer(_layer);
                map.addLayer(_layer);
            }
        }
        // var layer = graphic.getLayer();
        if( !graphic.attributes ) return ;
        var text = graphic.attributes.name;
        var textLength = isNaN(text.length * 1)? 0 : text.length*1 * 20;
        if( textLength < 60 ) textLength = 60;
        var height = 80*(60/textLength);
        //textLength = 0;
        var iconPath = `M0 0 L200 0 L200 ${height} L0 ${height} Z`;
        var symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setOffset( 0,30 );
        symbol.setPath( iconPath );
        symbol.setSize( textLength );
        symbol.setColor( "#026698" );
        symbol.outline.setColor("#026698")
        var bgGraphic = new esri.Graphic(graphic.geometry,symbol,graphic.attributes);
        _layer.add(bgGraphic);
        //写入名称
        var Font = esri.symbol.Font;
        var font = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
        var orderSymbol = new esri.symbol.TextSymbol(text,font, new esri.Color("#ffffff"));
        orderSymbol.setOffset(0,27);
        var textGraphic = new esri.Graphic(graphic.geometry,orderSymbol,graphic.attributes);
        _layer.add(textGraphic);
        graphic.bgGraphic = bgGraphic;
        graphic.textGraphic = textGraphic;
        bgGraphic._isDialog = true;
        textGraphic._isDialog = true;
    }

}

var setModel = function(m){
    return model = m;
}


export default { setMap , showGraphicName , hideGraphicName , setLayer , clearlayerShowAbsolute , setModel };