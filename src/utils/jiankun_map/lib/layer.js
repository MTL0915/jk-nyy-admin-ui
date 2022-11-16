// var __config = require("../../../map.config.js");
import eventBox from './js/event.js';

// __config.baseLayer = __config.baseLayer || {};
// __config.picLayer = __config.picLayer || {};

/**
 * 可配置地图服务
 * @date 2020-03-18
 * @returns {any}
 */
let baseLayer = function(config){
	this.comer(config);
    //点击事件
    this.onclick = new eventBox();
    // 加载完成事件
    this.onload = new eventBox();
    // 区域数组
    this.graphics = [];
     // 参数条件
     this.where = "1=1";
     // 服务地址
     this.serveUrl = "";
     // 层
     this.index = 0;
     //高度
     this.zoom = 0;
     // 服务
     this.basemap = null;
}

baseLayer.prototype = {
    
    comer (config){
        this.config = config ;
        // 选中区域数组
        this.selectName = this.config.baseLayer.selectName || ["长江市"];
        // symbol 
        this.symbol = this.config.baseLayer.symbol || [];
        // default symbol 
        this._defaultSymbol = { color: "#000000" , opacity : 0.7 , outline : { color : "#1b4a42" , opacity : 1 , weight : 1 }  };
        this.defaultSymbol = this.config.baseLayer.defaultSymbol || this._defaultSymbol;
        // 選中顔色
        this.hoverSymbol = this.config.baseLayer.hoverSymbol || this._defaultSymbol;
		this.hoverSymbol = this.hoverSymbol ? this.getSymbol(null,this.hoverSymbol) : null;
        // 判断区域名字段
        this.field = this.config.baseLayer.field || '镇名称';
		
    },

    setSelectName (array){
        this.selectName = array;
    },

    // 开启服务
    init (basemap){
        this.basemap = basemap;
        this.basemap.hide();
        this.setServeUrl(this.basemap.url + "/" + this.index);
    },

    getLayer (){
         if( !this.layer ){
			this.layer = new esri.layers.GraphicsLayer({ id: "baseLayer" });
			this.basemap.getMap().addLayer(this.layer,this.zoom);
			this.layer.on("click",(e)=>{
				e.graphic && this.onclick(e.graphic);
			});
			this.layer.on("mouse-out", (e)=> {
                this.layer.getMap().setMapCursor("default");
                if( e.graphic.geometry.type === "point" ){
					return ;
				};
				if( this.hoverSymbol ){
					var outline = e.graphic._oldLine;
					e.graphic.setSymbol(outline);
				}
			});
			this.layer.on("mouse-over", (e)=> {
                this.layer.getMap().setMapCursor("pointer");
				if( e.graphic.geometry.type === "point" ){
					return ;
				};
				if( this.hoverSymbol ){
					e.graphic._oldLine = e.graphic.symbol;
					e.graphic.setSymbol(this.hoverSymbol)
				}
			});
		}
		return this.layer;
    },

    getName (graphic){
        var name = graphic.attributes[this.field];
        if (!name) return

        // 先从symbol中查询是否有symbol配置
        var symbol = this.symbol.find( (e)=>{ return e.name == name; } );
        if( !symbol ){
            symbol = this.defaultSymbol;
        }
        symbol = symbol.font;
        var Color = esri.Color
        var Font = esri.symbol.Font
        var textSymbol = new esri.symbol.TextSymbol(name).setColor(
        new Color(symbol.color||'#ffffff')).setAlign(Font.ALIGN_START).setFont(
        new Font((symbol.size||10)+'pt').setWeight(symbol.isWeight||"bold"))
        var geometry = graphic.geometry.getCentroid()
        var gra = new esri.Graphic(geometry, textSymbol)
        return gra;
    },

    getSymbol (name,symbols){
        // 先从symbol中查询是否有symbol配置
        var symbol = this.symbol.find( (e)=>{ return e.name == name; } );
        if( !symbol ){
            symbol = this.defaultSymbol;
        }
        symbol = symbols || symbol;
        var linecolor = new esri.Color(symbol.outline.color || this._defaultSymbol.outline.color);
        linecolor.a = symbol.outline.opacity || this._defaultSymbol.outline.opacity;

        var color = new esri.Color(symbol.color || this._defaultSymbol.color);
        color.a = symbol.opacity || this._defaultSymbol.opacity;

        var sfs = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              linecolor, symbol.outline.weight || this._defaultSymbol.outline.opacity ),
            color
        )
        return sfs;
    },

    // 解析url
    setServeUrl (url){
        this.serveUrl = url;
        this.query();
    },

    // 获取所有的可配置区域
    query (){
        var queryTask = new esri.tasks.QueryTask(this.serveUrl);
        var query = new esri.tasks.Query();
        query.outFields = ["*"];
        query.where = this.where;
        query.returnGeometry = true;
        queryTask.on("complete", this.queryTaskComplete.bind(this));
        queryTask.on("error", this.queryTaskError.bind(this));
        queryTask.execute(query);
    },

    queryTaskComplete (res){
        this.graphics = res.featureSet.features;
        this.onload(this);
        this.show();
    },

    show (config){
        config && this.comer(config);
        var geometry = this.graphics;
        var layer = this.getLayer();
        layer.clear();
        for( var i in geometry ){
            geometry[i].setSymbol(this.getSymbol( geometry[i].attributes[this.field] ))
            layer.add(geometry[i]);
            layer.add(this.getName(geometry[i]));
        }
    },

    queryTaskError (){
        console.error(" 动态图层渲染失败 ");
    },  

}

let picLayer = function( pointArray ){
    this.pointArray = pointArray || [];
    //点击事件
    this.onclick = new eventBox();
}

picLayer.prototype = {

    /**
     * 获取图层
     * @date 2020-03-18
     * @returns {any}
     */
    getLayer (){
        var self = this;
        if( !this.layer ){
            this.layer = new esri.layers.GraphicsLayer({ id: "picLayer" });
            map.addLayer(this.layer);
            this.layer.on("click",(e)=>{
                e.graphic && this.onclick(e.graphic);
            });
            this.layer.on("mouse-out", function(e) {
                if( !e.graphic.param.hoverImg ){
                    return ;
                }
                this.getMap().setMapCursor("default");
                var outline = e.graphic._oldLine;
                e.graphic.setSymbol(outline);
            });
            this.layer.on("mouse-over", function(e) {
                if( !e.graphic.param.hoverImg ){
                    return ;
                }
                var sfs = self.getSymbol({ size: e.graphic.param.size , img : e.graphic.param.hoverImg });
                this.getMap().setMapCursor("pointer");
                e.graphic._oldLine = e.graphic.symbol;
                e.graphic.setSymbol(sfs)
            });
        }
        return this.layer;
    },

    showLayer (pointArray,bool){
		var data = pointArray || this.pointArray;
		var layer = this.getLayer();
		!bool && layer.clear();
		for( var i = 0 ; i< data.length ; i++ ){
			var point = new esri.geometry.Point(data[i].point,map.spatialReference);
			point = new esri.Graphic( point , this.getSymbol(data[i]) , data[i].data || {} )
			point.param = data[i];
			layer.add(point);
		}
	},

    getSymbol (symbol){
		var symbol = new esri.symbol.PictureMarkerSymbol( symbol.img, symbol.width || symbol.size, symbol.height || symbol.size );
		symbol.offsetX && ( a.xoffset = symbol.offsetX );
		symbol.offsetY && ( a.yoffset = symbol.offsetY );
        return symbol;
    }
}

let featuresLayer = function(map){
	this.map = map;
	this.layer = this.getLayer();
}

featuresLayer.prototype = {
	getLayer(){
		if( this.layer ){
			this.layer = new esri.layers.GraphicsLayer();
			this.map.addLayer(this.layer);
		}
		return this.layer;
	},
	
	addText ( point , name ){
		this.getLayer().add(this.createName(point , name));
	},
	
	createName ( point , name ){
		var geometry = new esri.geometry.Point(point,this.map.spatialReference);
		var textSymbol =  new esri.symbol.TextSymbol(name).setColor(
		    new esri.Color([128,0,0])).setAlign(esri.symbol.Font.ALIGN_START).setAngle(45).setFont(
		    new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));
		return new esri.Graphic( geometry , textSymbol );
	},
	
	addImg ( point , path ){
		this.getLayer().add(this.createImg(point , path));
	},
	
	createImg ( point , picPath ){
		var geometry = new esri.geometry.Point(point,this.map.spatialReference);
		var pictureMarkerSymbol = new PictureMarkerSymbol('http://www.esri.com/graphics/aexicon.jpg', 51, 51);
		return new esri.Graphic( geometry , pictureMarkerSymbol );
	},
	
}

var loadLayer = function(){
    this.index = 0;
    this.layer = [];
    this.load = new eventBox();
    return this;
}
loadLayer.prototype = {
    addLayer(layer){
        this.index ++;
        layer.on("load",this.complet.bind(this))
        layer.on("error",this.complet.bind(this))
        this.layer.push(layer);
    },
    addMap(map){
        for( var i in this.layer ){
            map.addLayer(this.layer[i],this.layer[i].zIndex||undefined);
        }
        this.layer = [];
    },
    complet (){
        --this.index === 0 ? this.load() : null;
    },
}
loadLayer.get = function(){
    if( !this.newLoadLayer ) this.newLoadLayer = new loadLayer();
    return this.newLoadLayer;
}
loadLayer.LoadTiled = function(url){ this.get().addLayer( new esri.layers.ArcGISTiledMapServiceLayer(url) ); return this.get(); }
loadLayer.LoadDynamic = function(){ this.get().addLayer( new esri.layers.ArcGISDynamicMapServiceLayer(url) ); return this.get(); }
loadLayer.add = function(layer,index){ this.get().addLayer( layer ); return this.get(); }
loadLayer.addMap = function(map){ this.get().addMap(map); return this.get(); }


export { baseLayer , picLayer , featuresLayer , loadLayer }