import PromiseThen from '@/api/promiseThen'
import ajaxApi from '@/api/map'

/* 显示地块在地图上
 *
 * */

export default function(param) {
  // 基地id
  var jidi_id = param.JDId
  // 地图对象
  var map = param.map
  // g对象;
  var g = null
  // 获取基地的几何数据
  var jd_geometry_json = null
  // 完成事件
  var complete = param.complete
  // 地块的几何数据
  var DK_geometry = param.DK_geometry
  // 地块id
  var DK_id = param.DK_id

  new PromiseThen()
    .then(function(p, suc) {
      // 获取geometry对象
      // eslint-disable-next-line
			Lwz.require(['geometry/geometry'], function(geometry) {
        g = geometry
        // 删除之前的地图记录
        g.remove(map)
        suc()
      })
    })
    .then(function(p, suc) {
      // 获取地块基地的信息
      ajaxApi.getJDById(
        {
          bs_base_id: jidi_id
        },
        function(event) {
          jd_geometry_json = JSON.parse(event.data.geometry)
          suc()
        }
      )
    })
    .then(function(p, suc, complete) {
      // 获取当前地块的几何数据合并json 并显示
      jd_geometry_json.geometry.push(DK_geometry)
      // 根据获取的json通过g对象生成map对象的几何
      g.import(jd_geometry_json, map, function() {
        suc()
      })
    })
    .then(function(p, suc, complete) {
      // 在生成的几何中找到创建的地块几何
      var geometry = g.group.find(function(e) {
        return e.map === map && e.type === '地块'
      })
      // 将id传入几何中
      geometry.attribute.id = DK_id
      // 将生成的几何进行编辑模式 允许用户操作编辑
      geometry.editModel(2)
      complete()
    })
    .complete(complete)
    .start()
}
