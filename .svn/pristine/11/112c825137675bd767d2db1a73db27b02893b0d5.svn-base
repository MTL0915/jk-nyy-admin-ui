import base from '../map/graphic/base'
// 关于加载基地的相关代码
var loadBase = {

  // 根据用户查询基地
  setUserShowJdPoint(userid) {
    ajaxApi.getBasesDetailByUser({
      bs_user_id: userid
    }, (event) => {
      var data = event.data
      for (var i in data) {
        this.loadBase(data)
      }
    })
  },

  // 加载基地的坐标点
  loadBase(data) {
    // 生成基地面积

  }

}

export default loadBase
