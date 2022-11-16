import ajaxApi from '@/api/map'
var DKColor = [[208, 151, 163], [104, 182, 120], [62, 135, 180], [144, 185, 217], [115, 137, 73], [202, 149, 79], [0, 113, 219], [128, 194, 105], [85, 162, 140], [229, 123, 241], [114, 85, 231], [194, 197, 68], [194, 197, 68]]
export default {
  // 获取当前组织下的所有基地信息
  getMapJdByBs_org_id(call) {
    ajaxApi.getJDById(this.baseId || this.$store.state.baseinfo.cur_base_id, (event) => {
      this.mapData.jd = [
        {
          graphic: null, // 几何
          option: event.data, // 保存配置
          dk: null, // 地块合计
          sb: null,
          point: null // 中心点
        }
      ]
      call && call()
    })
  },

  // 根据基地获取地块
  getDKByJDId(jd_id, fn) {
    var jd = this.getJD(jd_id)
    // 获取所有地块
    ajaxApi.getDKByJDId({ bs_base_id: jd_id }, (event) => {
      jd.dk = event.data.map((e) => {
        return {
          graphic: null,
          option: e
        }
      })
      fn && fn()
    })
  },

  // 根据基地获取设备
  queryDevice(jd_id, fn) {
    var jd = this.getJD(jd_id)
    ajaxApi.queryDevice({ bs_base_id: jd_id, need_geometry: true, need_camera: true, size: 999 }, (event) => {
      jd.sb = event.data.content.map((e) => {
        return {
          graphic: null,
          option: e
        }
      })
      fn && fn()
    })
  },

  // 获取设备类型数据
  getSBType(fn) {
    ajaxApi.getAllList((event) => {
      event.data.content.forEach(function(e, i) {
        e.image_path = process.env.IMG_URL + '/' + e.image_path
        e.color = DKColor[i % DKColor.length]
      })
      this.data.sbType = event.data.content
      fn && fn()
    })
  },

  // 获取地块类型
  getDKType(fn) {
    ajaxApi.findFacilitieTypeList({}, (event) => {
      event.data.content.forEach(function(e, i) {
        e.image_path = process.env.IMG_URL + '/' + e.image2_path
        e.color = DKColor[i % DKColor.length]
      })
      this.data.dkType = event.data.content
      fn && fn()
    })
  }

}
