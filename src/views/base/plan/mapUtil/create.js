import ajaxApi from '@/api/map'
import util from './geometry/util'
import { esri } from './mapInit.js'
import baseinfo from '@/store/modules/baseinfo'
import bus from '@/components/common/bus.js'
import {
  add,
  edit,
  get,
  getByBaseId
} from '@/api/rsPanorScene'
export default {

  // 新建一个基地
  createJiDi: function (param, call) {

    if (this.editGeometry) return this.$message({
      message: '编辑状态中，无法进行该操作。',
      type: 'warning'
    });
    var jd = this.getJD();

    // 如果已经存在基地几何 则需要让用户选择是否进行新建基地的操作
    this.$confirm('选择你要进行的操作', '提示', {
      confirmButtonText: '新建基地',
      cancelButtonText: '绘制当前基地',
      type: 'warning',
      center: true
    }).then(() => {
      this.createBase();
      return;
    }).catch(() => {
      var option = {
        esri: window.esri,
        map: this.map,
        attr: {
          name: jd.option.name,
        },
        option: {
          type: '基地',
          id: this.getSelectId(),
          color: '#ff0000',
          lineColor: 'yollew',
          opacity: '0.25'
        },
      }
      var p = util.createPolygon(option)
      this.isdraw = true
      this.drawGeometry = p
      p.drawGeometry((graphic) => {
        this.isdraw = false
        call && call(graphic)
        this.showJDEdit(p);
        // 当编辑地图选择保存时
        this.$refs.createJD.onsave = (g) => {
          this.$refs.createJD.onsave = null;
          // var a = baseinfo;
          // bus.$emit("getBaseList",(data)=>{

          bus.$emit("selectBase", {
            name: g.attr.name,
            id: g.attr.id || g.option.id
          });
          // });
        }
        graphic.layerClick(this.layerClick)
        // p.showName && p.showName()
        // p.showZW && p.showZW()
      })
    });
    // this.$message({ message: '已经存在基地，无法重复创建，请进行修改', type: 'warning' });



    this.introClose();
  },

  // 创建设备
  createSheBei: function (item, fn) {
    if (!this.isHaveJD()) {
      return this.$message({
        message: '请先绘制基地',
        type: 'warning'
      })
    };
    if (this.editGeometry) return this.$message({
      message: '编辑状态中，无法进行该操作。',
      type: 'warning'
    });;
    if (this.isdraw) {
      alert('请先完成或者按esc取消上一步绘制。')
      return
    }
    this.isdraw = true;
    var option = {
      esri: window.esri,
      map: this.map,
      option: {
        type: '设备'
      },
      attr: {
        ...item,
        name: item.name,
        typeId: "",
        id: item.id,
        bs_base_id: this.getSelectId(),
      }
    }
    var p = util.createPoint(option)
    this.drawGeometry = p
    p.drawGeometry((graphic) => {
      // 确认一下所属地块
      var jd = this.getJD();
      var dk = jd.dk.find ? jd.dk.find((e) => {
        return e.graphic ? esri.GeometryEngine.contains(e.graphic.graphic.geometry, p.graphic.geometry) : false;
      }) : null;
      if (!dk) {
        this.$message({
          message: '当前设备没有标注在地块上',
          type: 'warning'
        });
      } else {
        p.attr.rs_facilities_id = dk.graphic.attr.id;
      }
      this.isdraw = false
      // this.addDeviceFn();
      // this.showSBEdit(p)
      graphic.layerClick(this.layerClick)
      fn && fn(p);
    })
    this.introClose();
  },

  // 创建全景图
  createVR: function (item, fn) {

    if (!this.isHaveJD()) {
      return this.$message({
        message: '请先绘制基地',
        type: 'warning'
      })
    };
    if (this.editGeometry) return this.$message({
      message: '编辑状态中，无法进行该操作。',
      type: 'warning'
    });;
    if (this.isdraw) {
      alert('请先完成或者按esc取消上一步绘制。')
      return
    }
    this.isdraw = true;
    var option = {
      esri: window.esri,
      map: this.map,
      option: {
        type: '全景图'
      },
      attr: {
        ...item,
        name: item.name,
        typeId: "",
        id: item.id,
        bs_base_id: this.getSelectId(),
      }
    }
    var p = util.createPoint(option)
    this.drawGeometry = p
    p.drawGeometry((graphic) => {
      // 绘制完图形后显示创建面板
      this.$refs.addVrVue.show(p);
      this.$refs.addVrVue.vClick = (done, json) => {
        if (done.type == 'hide') {
          this.isdraw = false
          return;
        }
        this.$refs.addVrVue.vClick = null;
        // 保存经纬度
        edit({
          id: json.id,
          latitude: graphic.graphic.geometry.y,
          longitude: graphic.graphic.geometry.x,
        }).then(() => {

        })
        p.attr = json;
        p.attr.latitude = graphic.graphic.geometry.y,
          p.attr.longitude = graphic.graphic.geometry.x,
          this.isdraw = false
        // this.addDeviceFn();
        // this.showSBEdit(p)
        graphic.layerClick(this.layerClick);
        // this.showVR(p);
        fn && fn(p);
      }
    })
  },

  createDiKuaiByType(itme, fn) {
    itme.rs_facilities_type_id = itme.id;
    delete itme.id;
    itme.background_color = itme.background_color || "#ffffff"
    this.createDiKuai(itme, fn);
  },

  createDiKuai: function (item, fn) {
    if (!this.isHaveJD()) {
      return this.$message({
        message: '请先绘制基地',
        type: 'warning'
      })
    };
    if (this.editGeometry) return this.$message({
      message: '编辑状态中，无法进行该操作。',
      type: 'warning'
    });
    if (this.isdraw) {
      alert('请先完成或者按esc取消上一步绘制。')
      return
    }
    this.isdraw = true;
    var option = {
      esri: window.esri,
      map: this.map,
      option: {
        type: '地块',
        color: item.background_color,
      },
      attr: {
        name: item.name,
        typeId: "",
        id: item.id,
        bs_base_id: this.getSelectId(),
        rs_facilities_type_id: item.rs_facilities_type_id
      }
    }

    var p = util.createPolygon(option)
    var key = this.map.on("click", (event) => {
      // 判断点击的几何如果是地块几何的话
      var dk = this.getJD().dk ? this.getJD().dk.find((e) => {
        return e.graphic && e.graphic.graphic === event.graphic
      }) : null;
      if (dk) {
        p.draw.deactivate();
        p.draw.activate('polygon');
        return this.$message({
          message: '地块和其他地块重叠，请注意重新创建',
          type: 'warning'
        });
      }
    });
    this.drawGeometry = p

    p.drawGeometry((graphic) => {
      this.isdraw = false
      key.remove();
      if (this.isCoverDk(p.graphic.geometry)) {
        this.$message({
          message: '地块和其他地块重叠了，请编辑纠正后保存',
          type: 'warning'
        });
      };
      if (!esri.GeometryEngine.contains(this.getJD().graphic.graphic.geometry, p.graphic.geometry)) {
        p.remove();
        return this.$message({
          message: '当前地块没有标注在基地上或者超出了基地范围',
          type: 'warning'
        });
      }
      this.showDKEdit(p)
      graphic.layerClick(this.layerClick)
      fn && fn(p)
    })
    this.introClose();
  },

  // 创建图形
  createGeometry: function (param = {}, call) {
    var option = param || {
      esri: window.esri,
      map: this.map,
      option: {
        type: '基地',
        id: this.mapForm.id,
        color: 'red',
        lineColor: 'yollew',
        opacity: '0.25'
      }
    }
    var p = util.createPolygon(option)
    //   console.log(this.selectJD);
    this.isdraw = true
    this.drawGeometry = p
    p.drawGeometry((graphic) => {
      this.isdraw = false
      call && call(graphic)
      // p.showName && p.showName()
      // p.showZW && p.showZW()
    })
  },

  // 创建设备
  createSheXiangTou: function () {
    if (this.editGeometry) return this.$message({
      message: '编辑状态中，无法进行该操作。',
      type: 'warning'
    });;
    this.bindSb.dk = this.getJD().dk.map((e) => {
      return {
        id: e.option.id,
        name: e.option.name
      }
    });
    // 弹窗发现设备窗口
    this.$refs.faxianshebeiWindow.style.display = 'block'
  },
  // 开始关联设备  发现设备窗口确定
  faxianshebeiWindowOK: function () {
    this.addDevice({
      // 设备验证码
      verification_code: this.bindSb.yzm,
      // 序列号
      device_id: this.bindSb.xlh,
      // 用户id
      bs_user_id: this.user.id,
      // 地块id
      rs_facilities_id: this.bindSb.dkid
    })
    // 关闭 发现设备窗口
    this.$refs.faxianshebeiWindow.style.display = 'none'
  },
  faxianshebeiWindowClose: function () {
    // 关闭 发现设备窗口
    this.$refs.faxianshebeiWindow.style.display = 'none'
  },
  // 发现设备
  addDevice: function (obj) {
    var json = {
      // 设备验证码
      verification_code: obj.verification_code,
      // 地块id
      rs_facilities_id: obj.rs_facilities_id,
      // 序列号
      device_id: obj.device_id,
      // 用户id
      bs_user_id: obj.bs_user_id
    }
    ajaxApi.addDevice(json, (event) => {
      ajaxApi.getDetailById(event.data, (e) => {
        this.getJD().sb.push({
          graphic: null,
          option: e.data,
        })
        this.$refs.jdTree.render();
      });
      this.$message.success(event.msg)
    })
  },
  //解绑设备
  removeDevice: function (id, fn) {
    confirm("确定解绑设备？") && ajaxApi.deleteDevice(id, fn);
  },
  // 判断是否和已存在的地块叠加了
  isCoverDk(dk) {
    var dk = this.getJD().dk ? this.getJD().dk.find((e) => {
      if (e.graphic && dk === e.graphic.graphic.geometry) return false;
      return (e.graphic) ? !esri.GeometryEngine.disjoint(e.graphic.graphic.geometry, dk) : false;
    }) : null
    return !!dk;
  },
  // 新建基地 在已有的基地上切换新基地
  createBase() {
    // 保存上一个基地的id
    var id = this.getSelectId();
    // 消除之前基地的
    var jd = this.getJD();
    // 消除地块
    jd.dk && jd.dk.forEach((e) => {
      return e.graphic && e.graphic.remove();
    })
    jd.dk = [];
    // 消除设备
    jd.sb && jd.sb.forEach((e) => {
      return e.graphic && e.graphic.remove();
    });
    jd.sb = [];
    // 消除基地
    jd.graphic.remove();
    this.mapData.jd = [];
    // 开始绘制
    var option = {
      esri: window.esri,
      map: this.map,
      option: {
        type: '基地',
        id: this.getSelectId(),
        color: '#ff0000',
        lineColor: 'yollew',
        opacity: '0.25'
      },
    }
    var p = util.createPolygon(option)
    this.isdraw = true
    this.drawGeometry = p
    p.drawGeometry((graphic) => {
      // 如果确认保存的话 新增基地 并展开编辑列表
      var name = "新建基地";
      // 确认绘制完成
      this.isdraw = false
      // 请输入正确的名称
      p.attr = {
        name
      };
      // 展开基地编辑框
      this.showJDEdit(p)
      // 保存点击事件
      graphic.layerClick(this.layerClick)
      // 允许ESC取消绘制
      this.isBanDraw = false;
      // 当编辑地图选择取消时
      this.$refs.createJD.onclose = (g) => {
        this.$refs.createJD.onclose = null;
        p.remove();
        // 如果取消的话  返回上一个基地的展示状态
        this.loadMap();
      };
      // 当编辑地图选择保存时
      this.$refs.createJD.onsave = (g) => {
        this.$refs.createJD.onsave = null;
        // var a = baseinfo;
        this.loadMap();
        bus.$emit("getBaseList", (data) => {
          bus.$emit("selectBase", {
            name: g.attr.name,
            id: g.attr.id
          });
        });
      }
    })
    // 不允许ESC取消绘制
    this.isBanDraw = true;
  }
}
