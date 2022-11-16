import events from '../event.js'
import {esri} from '../../../mapInit.js'


var point = function() {
  // arcgis工具集
  this.esri = null
  this.option = {
    type: 'polygon',
    rings: [],
    color: '#ff0000',
    opacity: '0.25'
  }
  // 默认初始化入口
  this.main.apply(this, arguments)
}

point.prototype = {

  // 对象初始化入口
  main: function(param) {
    // 生成配置
    this.createOption(param.option)
    // 导入传入数据
    this.setAttr(param.attr)
    // 创建layer点击监听事件
    this.layerClick = new events()
    // 创建layer点击监听事件
    this.layerDblClick = new events()
    // 导入esri配置对象集
    this.setEsri(param.esri)
    // 创建
    this.createGraphic()
    // 导入esri配置对象集
    this.setMap(param.map)
  },

  // 输入esri配置对象集
  setEsri: function(esri) {
    this.esri = esri
  },

  // 输入map
  setMap: function(map) {
    this.map = map
    this.layer = this.createLayer()
    this.map.addLayer(this.layer)
    this.layer.add(this.graphic)
  },

  // 生成配置
  createOption: function(option) {
    for (var i in option) {
      this.option[i] = option[i]
    }
  },

  createGraphic: function() {
    this.graphic = new esri.Graphic()
    this.createSymbol()
  },

  createLayer: function() {
    var layer = new esri.GraphicsLayer()
    layer.on('click', (event) => {
      this.layerClick(this, event)
    })
    layer.on('dbl-click', (event) => {
      this.layerDblClick(this, event)
    })
    return layer
  },

  // 创建图形 需要传入
  createGeometry: function() {
    var map = this.map
    var esri = this.esri
    var polygonJson = {
      'rings': this.getRings(),
      'spatialReference': map.spatialReference
    }
    var geometry = new esri.geometry.Polygon(polygonJson)
    this.graphic.setGeometry(geometry)
    this.area = this.getArea()
  },

  drawGeometry: function(call) {
    call && (this.ondrawComplete = call)
    var draw = this.draw
    if (!draw) {
      draw = this.draw = new this.esri.toolbars.Draw(this.map)
      draw.on('draw-complete', this.drawComplete.bind(this))
    }
    draw.activate('polygon')
  },

  ondrawComplete: null,

  deactivate: function() {
    this.draw && this.draw.deactivate()
  },

  drawComplete: function(event) {
    this.deactivate()
    this.setRings(event.geometry.rings)
    this.createGeometry()
    this.ondrawComplete && this.ondrawComplete(this)
    this.ondrawComplete = null
  },

  // 创建symbol
  createSymbol: function() {
    var esri = this.esri
    var symbol = this.option
    // 创建颜色
    var sfs = new esri.symbol.SimpleFillSymbol(
      esri.symbol.SimpleFillSymbol.STYLE_SOLID,
      new esri.symbol.SimpleLineSymbol(
        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
        new esri.Color(symbol.color), 2),
      new esri.Color(symbol.color)
    )
    sfs.color.a = (symbol.opacity || 1) * 1
    this.graphic.setSymbol(sfs)
  },

  getRings: function() {
    return this.option.rings
  },

  setRings: function(rings) {
    this.option.rings = rings
    return rings
  },

  setAttr: function(attr) {
    this.attr = attr
    return attr
  },

  edit: function(type,fn) {
    if (!this.Edit) {
      this.Edit = new this.esri.toolbars.Edit(this.map)
    }
    this.Edit.activate(type || 2, this.graphic)
    fn && ( this.Edit.moveStop = this.Edit.on("vertex-move-stop",fn) );
    this.Edit.old || (this.Edit.old = this.graphic.geometry.rings);
    
  },

  remove: function() {
    this.layer && this.layer.clear()
    this.nameChangeShowOrHide && this.nameChangeShowOrHide.remove()
    this.map && this.map.removeLayer(this.layer)
    this.map = null
    this.layer = null
    this.graphic = null
  },

  hide: function() {
    this.layer.hide()
  },

  show: function() {
    this.layer.show()
  },

  // 显示作物
  showZW: function() {
    
    var name = this.getName()
    if (this.graphicZW) {
      this.layer.remove(this.graphicZW)
    }
    if (!name) return
    var esri = this.esri
    // var Color = esri.Color
    // var Font = esri.symbol.Font
    // 创建颜色
    var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(
      '/static/img/Plan/xiangjiao.jpg', 15, 15)
    var geometry = this.graphic.geometry.getCentroid()
    var gra = new esri.Graphic(geometry, pictureMarkerSymbol)
    this.graphicZW = gra
    this.layer.add(gra)
    gra.hide();
  },

  // 显示名称
  showName: function() {
    var name = this.getName()
    if (this.graphicName) {
      this.layer.remove(this.graphicName)
    }
    if (!name) return
    var esri = this.esri
    var Color = esri.Color
    var Font = esri.symbol.Font
    var textSymbol = new esri.symbol.TextSymbol(name).setColor(
      new Color('#ffffff')).setAlign(Font.ALIGN_START).setFont(
      new Font('10pt').setWeight(Font.WEIGHT_BOLD))
    textSymbol.setOffset(0, 15)
    var geometry = this.graphic.geometry.getCentroid()
    var gra = new esri.Graphic(geometry, textSymbol)
    this.graphicName = gra

    setTimeout(()=>{
      this.nameChangeShowOrHide = this.map.on('zoom-end', this.extent.bind(this))
      this.graphicName.hide();
      this.graphicName.show();
    },100)
    
    this.layer.add(gra)
  },

  extent(e) {
    // if (this.map.getMaxZoom() - e.level <= 3) {
    //   this.graphicName.show()
    // }else {
    //   this.graphicName.hide()
    // }
  },

  getArea: function() {
    var geometry = esri.Geometry.webMercatorToGeographic(this.graphic.geometry);
    var area = esri.GeometryEngine.geodesicArea(geometry,'square-meters');
    return parseInt(area);
  },

  getName: function() {
    return this.attr.name || this.option.name
  },

  unedit: function(bool) {
    this.Edit.moveStop && this.Edit.moveStop.remove();
    this.Edit && this.Edit.deactivate()
    if( bool && false ){
      this.graphic.geometry.rings = this.Edit.old;
      this.Edit.old = null;
      this.showName();
      this.layer.refresh();
    } 
  },

  // 对象的导入
  import: function(option) {
    this.createOption(typeof option === 'string' ? JSON.parse(option) : option)
    this.createGeometry()
    this.createSymbol()
  },

  // 对象的导出
  export: function(option) {
    return JSON.stringify(this.option)
  }

}

export default point
