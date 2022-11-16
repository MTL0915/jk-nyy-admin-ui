import events from '../event.js'
import graphicShowName from '@/views/base/plan/mapUtil/graphicShowName'

var icon_ = {
  "": {
    icon: "",
    lx_icon: "",
    state_0_icon: "",
  }
}

var polygon = function () {
  // arcgis工具集
  this.esri = null
  this.option = {
    type: 'point',
    point: [],
    img: '/static/map/img/set2.png'
  }
  // 默认初始化入口
  this.main.apply(this, arguments)
}

polygon.prototype = {

  // 对象初始化入口
  main: function (param) {
    // 生成配置
    this.createOption(param.option)
    // 导入传入数据
    this.setAttr(param.attr)
    // 创建layer点击监听事件
    this.layerClick = new events()
    // 导入esri配置对象集
    this.setEsri(param.esri)
    // 创建
    this.createGraphic()
    // 导入esri配置对象集
    this.setMap(param.map)
  },

  // 输入esri配置对象集
  setEsri: function (esri) {
    this.esri = esri
  },

  // 输入map
  setMap: function (map) {
    this.map = map
    this.layer = this.createLayer()
    this.map.addLayer(this.layer)
    this.layer.add(this.graphic)
  },

  // 生成配置
  createOption: function (option) {
    for (var i in option) {
      this.option[i] = option[i]
    }
  },

  createGraphic: function () {
    this.graphic = new esri.Graphic()
    this.createSymbol()
  },

  createLayer: function () {
    var layer = this.esri.layers.GraphicsLayer()
    layer.on('click', (event) => {
      this.layerClick(this, event)
    })
    layer.on("mouse-over", (e) => {
      if (e.graphic) {
        // 
        if (!e.graphic.attributes) {
          e.graphic.attributes = {
            name: this.attr.name
          }
        };
        graphicShowName.showGraphicName(e.graphic, layer);
        // this.graphicName && this.graphicName.show();
        // this.map.setMapCursor("pointer");
      }
    })
    layer.on("mouse-out", (e) => {
      if (e.graphic && this.map.getLevel() !== this.map.getMaxZoom()) {
        graphicShowName.hideGraphicName(e.graphic, layer);
        // this.graphicName && this.graphicName.hide();
        // this.map.setMapCursor("default");
      }
    })
    return layer
  },

  // 创建图形 需要传入
  createGeometry: function () {
    var map = this.map
    var esri = this.esri
    var geometry = new esri.geometry.Point(this.getPoint(), map.spatialReference)
    this.createSymbol();
    this.graphic.setGeometry(geometry)
  },

  drawGeometry: function (call) {
    call && (this.ondrawComplete = call)
    var draw = this.draw
    if (!draw) {
      draw = this.draw = new this.esri.toolbars.Draw(this.map)
      draw.on('draw-complete', this.drawComplete.bind(this))
    }
    draw.activate('point')
  },

  ondrawComplete: null,

  deactivate: function () {
    this.draw && this.draw.deactivate()
  },

  drawComplete: function (event) {
    this.draw.deactivate()
    this.setPoint([event.geometry.x, event.geometry.y])
    this.createGeometry()
    this.ondrawComplete && this.ondrawComplete(this)
    this.ondrawComplete = null
  },

  // 创建symbol
  createSymbol: function () {

    var esri = this.esri
    var symbol = this.option
    var img = symbol.img
    var size = 24;

    if (this.option.type === '全景图') {
      this.attr.hd_device_type_code = "JK-VR";
      this.attr.state = "1";
      // img = '/static/map/img/编辑页面工具栏/vr.png';
      size = 32;
    } else if (this.attr.hd_device_type_code) {
      img = '@/assets/img/Plan/sbIcon/' + this.attr.hd_device_type_code
      // img = '/static/img/Plan/sbIcon/'+this.attr.hd_device_type_code
      if (this.attr.bind_sta === 1) {
        if (this.attr.state == "3") {
          // 绑定状态中
          img += "_" + this.attr.state + '.gif';
        } else {
          // 绑定状态中
          img += "_" + this.attr.state + '.png';
        }
        // if (this.attr.image_path) {
        //   img = process.env.IMG_URL + this.attr.image_path
        // }  
      } else {
        img += "_unbind.png"
      }
    } else {
      // img = '@/assets/img/Plan/sbIcon/' + "JK-PC_1.png";
      this.attr.hd_device_type_code = "JK-PC";
      this.attr.state = "1";
    }
    try{
      img = require('@/assets/img/Plan/sbIcon/' + this.attr.hd_device_type_code + '_' + this.attr.state + '.png');
    }catch(e0){
      img = require('@/assets/img/Plan/sbIcon/JK-SC_0.png');
    }
    // 创建颜色
    // img = require(img+"")
    var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(img, size, size);
    this.graphic.setSymbol(pictureMarkerSymbol);
  },

  getPoint: function () {
    return this.option.point
  },

  setPoint: function (point) {
    this.option.point = point
    return point
  },

  setAttr: function (attr) {
    this.attr = attr
    return attr
  },

  edit: function (type) {
    if (!this.Edit) {
      this.Edit = new this.esri.toolbars.Edit(this.map)
    }
    this.Edit.activate(type || 1, this.graphic)
    this.Edit.old || (this.Edit.old = [this.graphic.geometry.x * 1, this.graphic.geometry.y * 1]);
  },

  remove: function () {
    this.layer.clear()
    this.nameChangeShowOrHide && this.nameChangeShowOrHide.remove()
    this.map.removeLayer(this.layer)
    this.map = null
    this.layer = null
    this.graphic = null
  },

  hide: function () {
    this.layer.hide()
  },

  show: function () {
    this.layer.show()
  },

  unedit: function (bool) {
    this.Edit && this.Edit.deactivate()
    if (bool && this.Edit.old && false) {
      this.graphic.geometry.setX(this.Edit.old[0]);
      this.graphic.geometry.setY(this.Edit.old[1]);
      this.Edit.old = null;
      this.showName();
      this.layer.refresh();
    }
  },

  // 显示名称
  showName: function () {
    var name = this.getName()
    if (this.graphicName) {
      this.layer.remove(this.graphicName);
    }
    // 0	离线
    // 1	正常运行
    // 2	休眠中
    // 3	电源故障（主电源被切断）
    var stateColor = ['#646161', '#42b983', '#e2a712', '#ee0000']

    if (!name) return
    var esri = this.esri
    var Color = esri.Color
    var Font = esri.symbol.Font
    var textSymbol = new esri.symbol.TextSymbol(name).setColor(
      new Color(stateColor[this.attr.state] || '#ffffff')).setAlign(Font.ALIGN_START).setFont(
      new Font('10pt').setWeight(Font.WEIGHT_NORMAL)).setOffset(0, 15)

    var geometry = new esri.geometry.Point(this.graphic.geometry)
    var gra = new esri.Graphic(geometry, textSymbol)
    this.graphicName = gra
    gra.hide()

    setTimeout(() => {
      this.nameChangeShowOrHide = this.map.on('zoom-end', this.extent.bind(this))
    }, 100)

    var graphic = this.graphic;
    var layer = this.layer;
    if (map.getLevel() === this.map.getMaxZoom()) {
      if (!graphic.attributes) {
        graphic.attributes = {
          name: this.attr.name
        }
      };
      graphicShowName.showGraphicName(graphic, layer);
    } else {
      graphicShowName.hideGraphicName(graphic, layer);
    }

    this.layer.add(gra)
  },

  extent(e) {
    var graphic = this.graphic;
    var layer = this.layer;
    if (e.level === this.map.getMaxZoom()) {
      if (!graphic.attributes) {
        graphic.attributes = {
          name: this.attr.name
        }
      };
      graphicShowName.showGraphicName(graphic, layer);
    } else {
      graphicShowName.hideGraphicName(graphic, layer);
    }
  },

  getName: function () {
    return this.attr.name || this.option.name;
  },

  // 对象的导入
  import: function (option) {
    this.createOption(typeof option === 'string' ? JSON.parse(option) : option)
    this.createGeometry()
    this.createSymbol()
  },

  // 对象的导出
  export: function (option) {
    return JSON.stringify(this.option)
  }

}

export default polygon
