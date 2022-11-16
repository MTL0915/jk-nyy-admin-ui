'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  
  BASE_API: '"http://121.32.129.19:8100/nyy/admin"',     
  // BASE_API: '"https://iot.joinken.cn/nyy/admin"',

  VISUAL_API: '"http://121.32.129.19:8100/dv2_nyy"',
  
  IMG_URL: '"http://121.32.129.19:8100"',
  // IMG_URL: '"https://iot.joinken.cn"',

  VIDEO_URL: '"http://192.168.33.181:8123"',
  
  WEBSOCKET_URL:'"121.32.129.19:8100/iotcs-websocket/socketServer"'
  // WEBSOCKET_URL:'"iot.joinken.cn/iotcs-websocket/socketServer"'

})