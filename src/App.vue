<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>

window.param = function(url){
    var p = {};
    url = url.substring(1,url.length);
    url = url.split("&");
    for(var i in url){
        var it = url[i];
        it = it.split("=");
        p[it[0]]= decodeURI(url[i].substring(it[0].length+1,url[i].length));
    }
    return p;
}(location.search);
import WebSocket from '@/utils/MyWebSocket'
import { getToken } from '@/utils/auth'
export default {
  name: 'App',
  created (){
    if (Vue.prototype.$ws){
      return;
    }
    console.log("APP.vue建立socket连接");
    let ws = new WebSocket(process.env.WEBSOCKET_URL, getToken())
    Vue.prototype.$ws = ws
    if (!window["GLOBAL_VARIABLE"]) window["GLOBAL_VARIABLE"] = {};
    window["GLOBAL_VARIABLE"]["WEBSOCKET"] = ws
    this.$ws.open(this)
    // 当浏览器界面关闭或刷新时触发该事件
    window.addEventListener('beforeunload', e => {
      this.$ws.close()
    })
  }
}
</script>
<style>
.el-tree-node.is-current > .el-tree-node__content{
  background-color: #b3d9ff !important
}
.el-table__body{
	font-size:12px;
}
html,body {
  overflow: hidden;
}
* {
  user-select: none;
}

.esri-view .esri-view-surface--inset-outline:focus::after {
  outline: none!important;
}

.closeIframe {
  /* display: none; */
}

iframe {
  border: none;
}

iframe::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.loginBox {
  /* left: 0!important;
  transform: translate3d(0%, -50%, 0)!important; */
}

</style>