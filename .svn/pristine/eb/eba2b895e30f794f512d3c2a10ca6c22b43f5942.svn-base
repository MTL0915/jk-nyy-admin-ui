// 管理业务的模块
// 控制几何的创建和删除

import util from './geometry/util'
import {
  getToken
} from '@/utils/auth'
import {
  getSxtUrlById
} from '@/api/sxt'
import {
  add,
  edit,
  get,
  getByBaseId
} from '@/api/rsPanorScene'
export default {

  // 渲染基地坐标
  renderJDPosition: function () {
    var mapjd = this.mapData.jd // 获取基地数据
    var rings = [] // 创建数组
    for (var i in mapjd) { // 遍历处理基地
      var data = mapjd[i].option
      if (data.geometry) {
        var option = {
          esri: esri,
          map: this.map,
          option: JSON.parse(data.geometry),
          attr: data
        }
        var p = util.createPolygon(option)
        p.createGeometry()
        p.layerClick(this.layerClick)
        mapjd[i].graphic = p
        p.showName()
        p.graphicName && p.graphicName.geometry && rings.push([p.graphicName.geometry.x, p.graphicName.geometry.y])
      }

      if (i == 0) {
        // 如果时第一个基地默认选中
        this.selectJdOpt(this.baseId || this.$store.state.baseinfo.cur_base_id)
      }
    }
  },

  // 当几何被点击之后
  layerClick(event) {
    // 获取当前模式
    var mode = this.status.mode
    if (mode) {
      this.viewModeClick(event)
    } else {
      this.editModeClick(event)
    }
  },

  // 编辑模式下 图形被点击事件
  editModeClick: function (geometry) {
    if (this.isdraw) return
    if (this.editGeometry) return
    if (geometry.option.type === '基地') {
      this.showJDEdit(geometry)
    } else if (geometry.option.type === '地块') {
      this.showDKEdit(geometry)
    } else if (geometry.option.type === '设备') {
      this.showSBEdit(geometry)
    } else if (geometry.option.type === '全景图') {
      this.showEditVR(geometry)
    }
  },

  // 预览模式几何被点击
  viewModeClick(geometry) {

    if (geometry.option.type === '基地') {} else if (geometry.option.type === '地块') {
      this.showDKInfo(geometry.attr.id)
      return
    } else if (geometry.option.type === '设备') {
      // if (geometry.attr.device_id === 'JZ01A-1800009') {
      //   var dom = $(this.map.container)
      //   var dom1 = dom.clone(true)
      //   dom.hide()
      //   dom.after(dom1)
      //   dom1.css({ position: 'absolute', top: '0', left: '0' })
      //   dom1.addClass('open')
      //   setTimeout(() => {
      //     this.show.vr = true
      //     setTimeout(() => {
      //       dom.show()
      //       dom1.remove()
      //     }, 500)
      //   }, 2200)
      //   return
      // }

      if (geometry.attr.hd_device_type_code === 'JK-SX') {

        // 假如是摄像头
        getSxtUrlById({
          hd_device_id: geometry.attr.id,
          protocol: 'rtmp',
          definition: 'hd'
        }).then(res => {
          if (res.code === 200) {
            // var json = JSON.parse(geometry.attr.communication)
            if (geometry.attr.cam_tag_id) {
              window.open(process.env.VIDEO_URL + '/#/index?token=' + getToken() + '&id=' + geometry.attr.id + '&name=' + this.getJD().option.name)
            } else {
              this.videoAdress = res.data
              this.childRow = geometry.attr
              this.dialogVisible = true
              // 显示摄像头
              //   this.$alert('<iframe style="width:700px;height:400px;" test="' + Math.random() + '" src="/static/cam/index.html?url=' + json.url.hd.rtmp + '" >  </iframe>', geometry.attr.name, {
              //     dangerouslyUseHTMLString: true,
              //     customClass: 'sx',
              //     beforeClose(action, instance, done) {
              //       this.$el.querySelector('iframe').remove()
              //       done()
              //     }
              //   })
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.showSBInfo(geometry.attr.id, geometry.attr.device_id, geometry.attr.sensorNum)
      }
    } else if (geometry.option.type === '全景图') {

      this.showVR(geometry)
    }
  },

  // 选择基地
  selectJdOpt: function (id) {
    if (id) {
      this.map.id = id
    } else {
      id = this.map.id
    }
    // 找到对于的基地
    var jd = this.getJD(id)
    // 显示关于基地内部的地块和设备
    this.renderJD(jd, (p) => {
      // 显示基地介绍
      this.isshowJDInfo = true
      // 显示基地后锁定显示范围
      this.map.setExtent(jd.graphic.graphic.geometry.getExtent())
      // 显示图例
      this.$refs.mapLegend.setData(this.mapData)
    })
    // // 刷新基地显示信息
    this.showJDInfo(id)
  },

  renderDK: function (jd_id, fn) {
    var jd = this.getJD(jd_id)
    if (jd && jd.dk) {
      // 如果存在基地并且基地的地块不为空
      jd.dk.forEach((e) => {
        e.graphic.show()
      })
      fn && fn()
    } else {
      // 获取地块得数据
      this.getDKByJDId(jd_id, () => {
        jd.dk.forEach((ee) => {
          var e = ee.option
          if (ee.graphic) {
            // 是否存在几何
            ee.graphic.show()
          } else {
            // 不存在几何判断是否存在配置
            if (e.geometry_json && e.geometry_json != 'null') {
              // 如果存在几何创建几何
              var g_json = JSON.parse(e.geometry_json)
              g_json.id = e.id
              var option = {
                esri: esri,
                map: this.map,
                option: g_json,
                attr: e
              }
              var p = util.createPolygon(option)
              p.createGeometry()
              p.layerClick(this.layerClick)
              // p.layerDblClick(this.layerDblClick)
              p.showName()
              p.showZW()
              ee.graphic = p
            }
          }
        })
        fn && fn()
      })
    }
  },

  renderSB: function (jd_id, fn) {

    var jd = this.getJD(jd_id)
    if (jd && jd.sb) {
      // 如果存在基地并且基地的地块不为空
      jd.sb.forEach((e) => {
        e.graphic.show()
      })
      fn && fn()
    } else {
      // 获取地块得数据
      this.queryDevice(jd_id, () => {
        jd.sb.forEach((ee) => {
          var e = ee.option
          if (ee.graphic) {
            // 是否存在几何
            ee.graphic.show()
          } else {
            // 不存在几何判断是否存在配置
            if (e.geometry_json && e.geometry_json != "null" && e.hd_device_type_code !== "JK-JZ") {
              // 如果存在几何创建几何
              var g_json = JSON.parse(e.geometry_json)
              g_json.id = e.id
              var option = {
                esri: esri,
                map: this.map,
                option: g_json,
                attr: e
              }
              var p = util.createPoint(option)
              p.createGeometry()
              p.layerClick(this.layerClick)
              // p.layerDblClick(this.layerDblClick)
              p.showName()
              ee.graphic = p
            }
          }
        })
        fn && fn()
      })
    }
  },

  renderVR(JD, call) {

    getByBaseId(JD).then((e) => {
      var data = e.content
      for (var i in data) {
        var it = data[i]
        if (it.longitude && it.latitude) {
          var option = {
            esri: window.esri,
            map: this.map,
            option: {
              type: '全景图'
            },
            attr: {
              ...it,
              name: it.name,
              typeId: '',
              id: it.id,
              bs_base_id: this.getSelectId()
            }
          }
          var p = util.createPoint(option)
          p.setPoint(new esri.geometry.Point([it.longitude * 1, it.latitude * 1], map.spatialReference))
          p.layerClick(this.layerClick)
          p.createGeometry()
        }
      }
      call && call()
    })
  },

  // 渲染地图几何
  renderJD: function (JD, call) {
    var data = JD
    // var map = this.map
    var self = this
    // 获取数据中的基地id
    var jd_id = data.option.id
    // 判断一下是否存在基地的地块渲染
    this.renderDK(jd_id, () => {
      this.renderSB(jd_id, () => {
        this.renderVR(jd_id, () => {
          JD.graphic && call && call();
          // 判断地图模式
          var mode = this.$router.history.current.query.mode;
          if( mode ){ 
            // this.status.mode = JSON.parse(mode);
            this.switchEdit()
          }
        })
      })
    })
    // 判断基地是否存在几何
    if (JD.graphic) {
      // 显示基地的几何
      JD.graphic.show()
      return
    } else {
      // 如果基地没有几何的存在则
      // 对用户进行权限管理
      if (!this.getCur_user_level()) {
        return this.$message({
          message: '您没有编辑基地的权限',
          type: 'error'
        })
      }
      // 根据名称获取默认距离
      this.map.setExtent(new esri.geometry.Extent(12602534.272429993, 2644863.064915012, 12616101.844950592, 2651923.9354028455, this.map.spatialReference))
      // 进入编辑模式
      // this.switchEdit();
      // 进入提示隐藏所有的功能先要求绘制基地
      // this.createJiDi(JD.option, (graphic)=> {
      //   graphic.attr = JD.option;
      //   this.isBanDraw = false;
      // })
      // 开始指引模式
      this.intro()
      // 隐藏关闭指引按钮
      this.show.introClose = false
      // 不允许取消绘制
      this.isBanDraw = true
    }
  },

  // 进入教学状态
  intro() {
    this.show.intro = true
    this.show.intro_mode = true
    this.show.intro_draw_jd = true
    this.show.intro_draw_sb = true
    this.show.intro_draw_dk = true
    this.show.intro_select = true
  },

  // 退出教学模式
  introClose() {
    this.show.intro = false
    this.show.intro_mode = false
    this.show.intro_draw_jd = false
    this.show.intro_draw_sb = false
    this.show.intro_draw_dk = false
    this.show.intro_select = false
  },

  // 判断是否存在基地几何
  isHaveJD() {
    return !!(this.mapData.jd && this.mapData.jd[0].graphic)
  },

  // 显示vr
  showVR(geometry) {
    var json = geometry.attr
    this.show.vr = true
    setTimeout(() => {
      this.$refs.vrIframe.src = `/vr?panorId=${json.rsPanorId}&sceneId=${json.id}`;
    }, 200);
  },

  // 显示编辑状态的vr
  showEditVR(geometry) {
    this.$refs.editVr.show(geometry);
    // var json = geometry.attr
    // this.show.vr = true
    // setTimeout(() => {
    //   this.$refs.vrIframe.src = `/vr_edit?panorId=${json.rsPanorId}&sceneId=${json.id}`;
    // }, 200);
  }

}
