'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  
  //BASE_API: '"https://iot.joinken.cn/nyy/admin"', // 正式
  // BASE_API: '"https://iot.joinken.cn/nyy/admin82"',  // 测试 82
  //BASE_API: '"http://121.32.129.19:8100/nyy/admin"',  // 测试 82
  BASE_API: '"https://iot.e-jiankun.com/nyy/admin"', // 临时
  
  //VISUAL_API: '"http://iot.joinken.cn/dataV"',          // 正式
  //VISUAL_API: '"http://121.32.129.19:8100/dv2_nyy"', // 测试 82npm
  VISUAL_API: '"https://iot.e-jiankun.com/dataV"',          // 临时
  
  //IMG_URL: '"https://iot.joinken.cn"',       // 正式
  //IMG_URL: '"http://121.32.129.19:8100"',       // 测试 82
  IMG_URL: '"https://iot.e-jiankun.com"',       // 临时

  VIDEO_URL: '"http://192.168.33.181:8123"',      
  
  //VR_IMGPATH : '"https://iot.joinken.cn/"',  // 正式
  //VR_IMGPATH : '"http://121.32.129.19:8100"',   // 测试 82
  VR_IMGPATH : '"https://iot.e-jiankun.com/"',  // 临时
  

  // WEBSOCKET_URL:'"iot.joinken.cn/iotcs-websocket/socketServer"' // 正式
  // WEBSOCKET_URL:'"iot.joinken.cn/iotcs-websocket82/socketServer"' // 测试 82
  //WEBSOCKET_URL:'"121.32.129.19:8100/iotcs-websocket/socketServer"', // 测试 82
  WEBSOCKET_URL:'"iot.e-jiankun.com/iotcs-websocket/socketServer"', // 临时

  //DOMAIN:"'iot.joinken.cn'"//正式
  DOMAIN:"'iot.e-jiankun.com'"//临时

})