import { loadCss, loadModules } from "esri-loader";
import eventBox from "./js/event";

var http = location.protocol || "https:";

loadCss(http+'//iot.joinken.cn/arcgis_js_api4/esri/themes/light/main.css')

let esri = {}

let _view = null;

let esriRequire = function(Modules){
  // 加载模块
  return loadModules(Modules, {
      // url: "http://121.32.129.19:8100/arcgis_js_api/init.js" 
      // url: "http://192.168.33.163/arcgis_js_api/init.js" 
      url: http+"//iot.joinken.cn/arcgis_js_api4/init.js" 
      // url: 'https://js.arcgis.com/4.16/' 
      // url: "http://arcgis.biubu.cn/v326/init.js" 
      // http://iot.joinken.cn/arcgis_js_api4/init.js 
  })
}

// esriRequire([
//   "esri/Map", 
//   "esri/Basemap", 
//   "esri/views/MapView",
//   "esri/views/SceneView",
//   "esri/layers/TileLayer",
//   "esri/Graphic",
//   "esri/layers/BaseTileLayer",
//   "esri/layers/support/TileInfo",
//   "esri/layers/WebTileLayer",
//   "esri/geometry/SpatialReference",
//   "esri/layers/GraphicsLayer",
//   "esri/layers/IntegratedMeshLayer",
//   "esri/Color",
//   'esri/geometry/geometryEngine',
//   'esri/geometry/Polygon',
//   'esri/geometry/Point',
//   'esri/geometry/Polyline',
//   "esri/views/draw/Draw",
//   "esri/widgets/Sketch/SketchViewModel"
// ]).then((argu)=>{});



/**
 * 地图类
 * @date 2020-03-13
 * @param {any} id
 * @param {any} param
 * @returns {any}
 */
class map {

  /**
   * 构造函数
   * @constructor
   * @date 2020-03-13
   * @param {string} id 创建map对象的dom.id
   * @param {json} param 配置参数
   * @returns {Map} 返回地图对象
   */
  constructor ( id , param ){
      this.id = id;
      // 地图实例
      this.map = null;
      // 配置参数
      this.param = param || {};
      // 预加载资源
      this.gisConstructor = param.gisConstructor || [];
      // 创建完成回调事件
      this.onInit = new eventBox();
      // 地图创建之前
      // this.onloadMapBefore = new __event();
      // 地图完成之后
      this.onloadMap = new eventBox();
      // 创建底图
      this.createMap( id , param );
      return this;
  }

  /**
   * 创建地图实例入口
   * @date 2020-03-13
   * @param {string} id 创建map对象的dom.id
   * @param {json} param 配置参数
   */
  createMap (id , param){
      // 初始化加载地图资源
      this.init(param);
  }

  /**
   * 开始加载地图所需要用的资源
   * @date 2020-03-13
   * @param {any} param
   * @returns {any}
   */
  init (){

    esriRequire([
      "esri/Map", 
      "esri/Basemap", 
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/TileLayer",
      "esri/Graphic",
      "esri/layers/BaseTileLayer",
      "esri/layers/support/TileInfo",
      "esri/layers/WebTileLayer",
      "esri/geometry/SpatialReference",
      "esri/layers/GraphicsLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/Color",
      'esri/geometry/geometryEngine',
      'esri/geometry/Polygon',
      'esri/geometry/Point',
      'esri/geometry/Polyline',
      "esri/views/draw/Draw",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/symbols/ObjectSymbol3DLayer",
      "esri/symbols/PointSymbol3D"
    ].concat(this.gisConstructor)).then((argu)=>{
      this.initMap.apply(this,argu);
    });
  }

  /**
   * 加载资源完毕对地图进行初始化
   * @date 2020-03-13
   * @returns {any}
   */
  initMap( Map, Basemap, MapView, SceneView, TileLayer, Graphic, BaseTileLayer, TileInfo,WebTileLayer, SpatialReference, GraphicsLayer, IntegratedMeshLayer, Color, geometryEngine, Polygon, Point, Polyline, Draw, SketchViewModel, ObjectSymbol3DLayer, PointSymbol3D) {

    // 将加载的默认对象保存在esri里面
    this.esri = { Map, Basemap, MapView, SceneView, TileLayer, Graphic, BaseTileLayer, TileInfo,WebTileLayer, SpatialReference, GraphicsLayer, IntegratedMeshLayer, Color, geometryEngine, Polygon, Point, Polyline, Draw, SketchViewModel, ObjectSymbol3DLayer, PointSymbol3D };
    esri = { ...this.esri };
    // var layer = this.createGg("wx");
    // var customBasemap = new Basemap({
    //   baseLayers: [layer],
    //   title: "Custom Basemap",
    //   id: "myBasemap"
    // });
    // Create a Map instance
    var myMap = new Map({
      basemap: "satellite",
      ground: "world-elevation"
    });

    var id = myMap.basemap.id;
    myMap.basemap.load().then((e)=>{
      // 加载底图成功之后
      this.onloadMap(this.view);
    })

    // Create a MapView instance (for 2D viewing) and reference the map instance
    var view = this.view = new MapView({
      map: myMap,
      container: this.id,
      scale: 50000000,
    }); 
	
	if( !window.view ){
		window.view = view;
		_view = view;
	}

    // view.on("layerview-create", (event)=> {
      // if (event.layer.id === "satelliteMap" || event.layer.id === "satellite-base-layer") {
      // }
    // });

    // view.watch("zoom",()=>{

    // })

    // 监听几何响应鼠标事件
    var viewMouseover = [];
    view.on("pointer-move", (event)=>{
      view.hitTest(event).then(function(response) {
        for( var i = 0; i < viewMouseover.length; i++ ){
          var graphic = viewMouseover[i];
          if( response.results.map((e)=>{ return e.graphic }).indexOf(graphic) === -1 ){
            if( graphic.cursor ) {
              document.body.style.cursor = "";
            }
            graphic.mouseout && graphic.mouseout(graphic,event,response,view)
            viewMouseover.splice(i,1);
            i--;
          } 
        }
        response.results.map((e)=>{ return e.graphic }).forEach((graphic,i)=>{
          if( i === 0 && graphic.cursor ) {
            document.body.style.cursor = graphic.cursor;
          }
          if( viewMouseover.indexOf(graphic) === -1 ){
            viewMouseover.push(graphic);
            graphic.mouseover && graphic.mouseover(graphic,event,response,view)
          }
        })
      });
    });

    // 监听摄像头的变化
    // view.watch('camera',(camera) => {

    // });
    
    view.on('mouse-wheel', (event)=>{
      // 获取摄像头位置
      var position = this.view.camera.position;
      // return;
      if( position.z < 300 ){
          view.hitTest(event).then((response)=>{
              if(response.results[0]){
                  var graphic = response.results[0].graphic;
                  graphic.wheelGo && graphic.wheelGo(graphic,event,response)
              }
          })
          return;
      }
    }, false)

    view.on("click",(event)=>{
      console.log(event.mapPoint);
      view.hitTest(event).then((response)=>{
        if(response.results[0]){
          var graphic = response.results[0].graphic;
          graphic.click && graphic.click(graphic,event,response,view);
        }
      })
    })

    view.on("double-click",(event)=>{
      console.log(event.mapPoint);
      view.hitTest(event).then((response)=>{
        if(response.results[0]){
          var graphic = response.results[0].graphic;
          graphic.dbclick && graphic.dbclick(graphic,event,response,view);
        }
      })
    })
  }
}

var Util = window.Util2d = {

  // 保存常用的配置参数
  __config: {
    // 第一次加载弹窗css
    alertDialogCss: true,
    // 第一次创建监听滚动事件
    alertDialog: true,
    // 记录创建的编辑对象多次调用
    sketchViewModel: [],
  },

  // 添加几何
  addGraphic ( graphic , type , view ){
    var layer = this.getLayer( type , view );
    layer.add( graphic );
    return layer;
  },

  // 创建图层
  getLayer( type , view = _view , param = {} ){
    var layer = view.map.findLayerById( type );
    if( !layer ) {
      layer = new esri.GraphicsLayer({ id: type , ...param });
      view.map.add(layer)
    }
    return layer
  },

  // 删除图层
  removeLayer(type, view = _view) {
    var layer = view.map.findLayerById(type);
    view.map.remove(layer);
  },

  // 创建几何
  createGraphic (json){
    return new esri.Graphic(json);
  },

  // 创建线
  createPolyline (paths,spa){
    // 2D polyline with to paths with m-values (note that the 2nd path does not have m-values defined)
    return new esri.Polyline({
      hasZ: false,
      hasM: true,
      paths: paths,
      spatialReference: { wkid: spa || 4326 }
    });
  },

  // 创建面
  createPolygon ( param ){
    var rings = param.rings , 
        color= param.color , 
        lineColor= param.lineColor , 
        attributes = param.attributes || {},
        spatialReference = param.spatialReference || undefined;
    var polygon = { type: "polygon", rings: rings }; //102113
    spatialReference && (polygon.spatialReference = spatialReference);
    var fillSymbol = {
      type: "simple-fill",
      color: color || [255, 255, 255, 0],
      outline: { color: lineColor || color || [255, 255, 255, 0], width: 1 }
    };
    var polygonGraphic = this.createGraphic({
      geometry: polygon,
      symbol: fillSymbol,
      attributes
    });

    return polygonGraphic;
  },

  // 创建点
  createPoint (xy,spa){
    return new esri.Point({
      type: "point",
      x: xy[0],
      y: xy[1],
      z: xy[2] || undefined,
      spatialReference: spa || undefined
    });
  },

  // 创建图片点
  createImgPoint (param){
    var xy = param.xy, 
        spa = param.spatialReference,
        no3d= param.no3d, 
        img = param.img || param.url, 
        width= param.width, 
        height= param.height, 
        size= param.size,
        maxHeight= param.maxHeight,
        minHeight= param.minHeight;
    var point = this.createPoint(xy , spa);
    var symbol = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: img,
      // width: width,
      // height: height,
      size: size || 5,
    }

    var symbol3d = {
      type: "point-3d", // autocasts as new PointSymbol3D()
      symbolLayers: [
        {
          type: "icon", // autocasts as new IconSymbol3DLayer()
          resource: {
            href: img
          },
          size: size || 20,
          outline: {
            color: "white",
            size: 2
          }
        }
      ],
      verticalOffset: {
        screenLength: 20,
        maxWorldLength: maxHeight || 50,
        minWorldLength: minHeight || 0
      },
      callout: {
        type: "line", // autocasts as new LineCallout3D()
        color: "white",
        size: 1,
        border: {
          color: "white"
        }
      }
    };

    return this.createGraphic({ geometry: point , symbol: no3d ? symbol: symbol3d , attributes: param.data || param });
  },

  // 创建文字点
  createTextPoint (param){
    var xy = param.xy, spa = param.spatialReference,haloColor=param.haloColor,haloSize=param.haloSize,color= param.color,offset = param.offset || [] , is3d= param.is3d, text = param.text || param.name, weight= param.weight, height= param.height, size= param.size;
    var point = this.createPoint(xy , spa);
    var symbol = is3d ? {
      type: "label-3d",  // autocasts as new LabelSymbol3D()
      symbolLayers: [{
        type: "text",  // autocasts as new TextSymbol3DLayer()
        material: { color: color || [ 49,163,84 ] },
        size: 12,  // points
        text: text || "123",
        xoffset: offset[0] || 0,
        yoffset: offset[1] || 0,
        font: {  // autocasts as new Font()
          size: size || 12,
          family: "Josefin Slab",
          weight: weight || "bold"
        }
      }]
    } : {
      type: "text",  // autocasts as new TextSymbol()
      color: color || "white",
      haloColor: haloColor || "black",
      haloSize: haloSize || "1px",
      text: text,
      xoffset: offset[0] || 0,
      yoffset: offset[1] || 0,
      font: {  // autocasts as new Font()
        size: size || 12,
        family: "Josefin Slab",
        weight: weight || "bold"
      }
    }
    return this.createGraphic({ geometry: point , symbol , attributes: param.data || param });
  },

  // 创建模型点
  createObjectPoint(param) {
    var xy = param.xy, spa = param.spatialReference, img = param.img || param.url, width= param.width, height= param.height;
    var point = this.createPoint(xy,spa);
    var symbol = {
      type: "point-3d",  // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "object",  // autocasts as new ObjectSymbol3DLayer()
        resource: {
          href: img
        },
        height: height,
        // material: {
        //   color: "red"
        // }
      }]
    };
    return this.createGraphic({ geometry : point , symbol , attributes: param.data || param })
  },

  // 创建3d lineSymbol
  create3dPolyLine ( path , symbol = {} , spa ){
    // create a PathSymbol3DLayer with a strip style
    var stripPath = {
      type: "line-3d",  // autocasts as new LineSymbol3D()
      symbolLayers: [{
        type: "path",  // autocasts as new PathSymbol3DLayer()
        profile: "quad",  // creates a rectangular shape
        width: 2,  // path width in meters
        height: 2,  // path height in meters
        material: { color: "#ff7380" },
        cap: "square",
        profileRotation: "heading",
        ...symbol
      }]
    };

    var graphics = this.createGraphic({
      geometry: this.createPolyline( path , spa ),
      symbol: stripPath,
    })

    return graphics;
  },

  getSketchViewModel (view = window.view){
    var model = this.__config.sketchViewModel.find((e)=>{
      e.view === view;
    })
    if( !model ) {
      model = new esri.SketchViewModel({
        layer: this.getLayer("系统绘制",view, {
          // elevationInfo: {
          //   mode: "relative-to-scene",
          //   offset: 0
          // }
        }),
        view: view,
        polygonSymbol: {
          type: "polygon-3d", // autocasts as new PolygonSymbol3D()
          symbolLayers: [
            {
              type: "fill", // autocasts as new FillSymbol3DLayer()
              material: {
                color: [255, 255, 255, 0.8]
              },
              outline: {
                size: "3px",
                color: [82, 82, 122, 1]
              }
            }
          ]
        },
        polylineSymbol: {
          type: "line-3d",
          symbolLayers: [
            {
              type: "line",
              size: "3px",
              material: {
                color: [82, 82, 122, 0.9]
              }
            },
            {
              type: "line",
              size: "10px",
              material: {
                color: [255, 255, 255, 0.8]
              }
            }
          ]
        },
        defaultCreateOptions: {
          hasZ: false,
        },
        updateOnGraphicClick: true
      })
    }
    return model
  },

  // 绘制工具
  draw (type , fn , view = window.view){
    var sketchViewModel = this.getSketchViewModel(view);
    sketchViewModel.create(type).then(()=>{
      var it = sketchViewModel.on("create",(e)=>{
        if( e.state === 'complete' ) {
          it.remove();
          fn && fn(e)
        }
      })
    })
    return sketchViewModel;
  },

  edit (graphic,fn,view = window.view){
    var sketchViewModel = this.getSketchViewModel(view);
    sketchViewModel.update(graphic,{
      util: "reshape"
    }).then(()=>{
      var it = sketchViewModel.on("update",(e)=>{
        if( e.state === 'complete' ) {
          it.remove();
          fn && fn(e)
        }
      })
    })
    return sketchViewModel;
  },

  geodesic ( geometry , unit = 9001){
    if( geometry.type === 'polyline' ){
      return esri.geometryEngine.geodesicLength(geometry, unit);
    }else if( geometry.type === 'polygon' ){
      return esri.geometryEngine.geodesicArea(geometry, unit);
    }
  },

  dialog(graphic , name , html){
    var dom = document.createElement("div");
    dom.className = 'map3d_dialog';
    dom.innerHTML = `
        <div class='bor'></div>
        <div class='iframeBox' v-show='iframeShow' style='top:-100%;width: 150px;'>
            <div class='iframeTitle'>${name}
            <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement.parentElement;dom.remove();dom.graphics.dom = null'></i>
            </div>
            <div class='iframeWindow' style="padding: 7px;">
                ${html}
            </div> 
        </div>
    `;
    // 如果this.graphicDialog 数量不为0
    if( this.__config.alertDialogCss === true ){
      this.__config.alertDialogCss = false;
        var css = document.createElement("style");
        css.innerHTML = `
        .map3d_dialog {background: #000000A8;padding: 5px;border-radius: 4px;position:absolute;transform: translate(-50%,-100%);color:#ffffff;cursor: pointer;}
        .map3d_dialog::after {content: "";position:absolute;left: 50%;bottom: 0;transform: translate(-50%,100%);border-top:solid 5px #000000A8;border-left:solid 5px #ffffff00;border-right:solid 5px #ffffff00;}
        .map3d_dialog:hover > .bor {display: block;}
        .map3d_dialog .bor {display: none;position:absolute;left: 50%;bottom: -5px;transform: translate(-50%,0) rotateZ(45deg);border-right: solid 1px #ffffff;border-bottom: solid 1px #ffffff;padding: 3px;}
        .map3d_dialog .closeSonBox {position: absolute;top: 8px;right: 7px;display: none;}
        .map3d_dialog:hover > .closeSonBox {display: block;}
        .map3d_dialog .title {padding: 2px 2px 8px;font-size: 14px;text-align: center;}
        .map3d_dialog .sonBox {display: flex;flex-wrap: wrap;}
        .map3d_dialog .sonBox > div {width: 33%;text-align: center;padding: 3px;}
        .map3d_dialog .a {  }
        .map3d_dialog:hover {border:solid 1px #ffffff;z-index: 9999;background: #000000;}`;
      document.head.appendChild(css);
    }
    return this.alertDialog(graphic, dom)
  },

  //预警弹窗
  alertDialog(graphic,html,dom) {
    dom || (dom = _view.container);

    // 不存在数据合计 创建
    if( !this.graphicDialog ){
      this.graphicDialog = [];
    }

    // 如果并没有保存这个graphic
    if( this.graphicDialog.indexOf(graphic) === -1 ){
      this.graphicDialog.push(graphic)
    }

    // 如果this.graphicDialog 数量不为0
    if( this.__config.alertDialog === true ){
      this.__config.alertDialog = false;
      // 检测摄像头变化
      _view.watch('camera',(camera) => {
        this.graphicDialog.forEach((graphic)=>{
          this.alertDialog(graphic);
        })
      });
    }

    // 如果不存在dom
    if( !graphic.dom ) {
        if( graphic.dom === null ){
          this.graphicDialog.splice(this.graphicDialog.indexOf(graphic),1);
          return;
        }
        if( typeof html === 'string' ){
          var div = document.createElement("div");
          div.innerHTML = html;
          graphic.dom = div.children[0];
        }else{
          graphic.dom = html;
        }
        graphic.dom.graphics = graphic;
        dom.appendChild(graphic.dom);
    }
    // 获取屏幕坐标
    if( graphic.geometry.type === "point" ){
        var p = _view.toScreen(graphic.geometry);
    }else{
        var p = _view.toScreen(graphic.geometry.centroid || graphic.geometry.extent.center);
    }
    graphic.dom.style.cssText = `left: ${p.x}px;top:${p.y-50}px;`;

    return {
      remove (){ 
        graphic.dom.remove();
        graphic.dom = null;
      },
      graphic: graphic,
      itmes: this.graphicDialog
    };
  },

  // 关于UI的创建
  ui: {

  },
  
  // 
  measure: function(div,view = window.view){
    if( !div ){
      div = document.createElement("div");
    }
    return new Promise(function(a,b){
      // 给容器内部创建 
      esriRequire([
        "esri/widgets/DirectLineMeasurement3D",
        "esri/widgets/AreaMeasurement3D"
      ]).then((argu)=>{
        var DirectLineMeasurement3D = argu[0],
            AreaMeasurement3D = argu[1];
        var activeWidget = null;
        var ret = { 
          remove: function(){
            if( activeWidget ){
              view.ui.remove(activeWidget);
              activeWidget.destroy();
              activeWidget = null;
            }
          },
          activeLine: function(){
            ret.remove();
            var activeLine = new DirectLineMeasurement3D({
              view: view
            });
            activeWidget = activeLine;
            activeLine.viewModel.newMeasurement();
            view.ui.add(activeWidget, "top-right");
          },
          activeArea: function(){
            ret.remove();
            var activeArea = new AreaMeasurement3D({
              view: view
            });
            activeWidget = activeArea;
            activeArea.viewModel.newMeasurement();
            view.ui.add(activeWidget, "top-right");
          }
        }
        a(ret)

      });
    })
  },

  // 创建点几何带名字  未完成
  createFeatureLayer ( graphics = [] ){
    return new Promise(function(a,b){
      // 给容器内部创建 
      esriRequire([
        "esri/layers/FeatureLayer",
      ]).then((argu)=>{
        var FeatureLayer = argu[0];
        var Fealayer = new FeatureLayer({
          source: graphics,
          fields: [{
              name: "name",
              alias: "name",
              type: "string"
          },{
            name: "type",
            alias: "type",
            type: "string"
        },],
          objectIdField: "name",
          geometryType: "point",
          renderer: {
            type: "unique-value", // autocasts as new UniqueValueRenderer()
            field: "type",
            uniqueValueInfos: [{
              value: "name",
              symbol: {
                type: "point-3d", // autocasts as new PointSymbol3D()
                symbolLayers: [{
                    type: "icon", // autocasts as new IconSymbol3DLayer()
                    resource: {
                        href: "https://developers.arcgis.com/javascript/latest/sample-code/visualization-point-styles/live/Museum.png"
                    },
                    size: 20,
                    outline: {
                        color: "white",
                        size: 2
                    }
                }],
                verticalOffset: {
                    screenLength: 40,
                    maxWorldLength: 200,
                    minWorldLength: 35
                },
                callout: {
                    type: "line", // autocasts as new LineCallout3D()
                    color: "white",
                    size: 2,
                    border: {
                        color: "#ffffff"
                    }
                }
              }
            }]
          },
          labelingInfo: [{
            labelExpressionInfo: {
              expression: "$feature.aons"
            },
            symbol: {
              type: "label-3d",
              symbolLayers: [{
                type: "text",
                material: {
                  color: "white"
                },
                halo: {
                  size: 1,
                  color: [50, 50, 50]
                },
                size: 10
              }]
            }
          }]
        });
        a( Fealayer );
      })
    })
  },

  // 加载工具
  load (array){
    return new Promise(function(a,b){
      // 给容器内部创建 
      esriRequire(array).then((argu)=>{
        a( argu );
      })
    })
  }
}

export { map , esri , esriRequire , Util }