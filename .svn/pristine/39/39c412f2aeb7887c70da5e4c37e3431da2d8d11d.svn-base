!(function(w){
	
	w.cdnError = function(script){
		// 获取当前script的加载器的内容
		var spare = script.getAttribute("spare");
		// 然后根据加载器的内容获取他的备用插件路径
		if( spare ) {
			document.writeln('<script src="'+spare+'"></script>')
		}
		// createname = createCdnList.find((e)=>{ return createName.split(",").indexOf(e) == -1 });
		// if( createname ){
		// 	createWriteIn();
		// }
	}
	
	// 首先获取一下当前文件参数
	var scripts = document.getElementsByTagName("script");
	var script = scripts[scripts.length - 1];
	// 获取连接
	var src = script.src;
	// 然后获取参数
	var cdn = getQueryVariable("cdn", src);
	if( cdn ){
		cdn = cdn.split(",");
	}
	// 获取cdn渲染服务
	var typeCdn = getQueryVariable("serve", src);
	if( !typeCdn ) typeCdn = createJsdelivrCdn;
	else {
		eval("typeCdn = create"+typeCdn);
	}
	createWriteInAll();
	
	// 包含所有加载器的函数
	const createCdnList = ["createJsdelivrCdn","createBootCdn"]
	
	function createWriteInAll() {
		var html = "";
		for( var i in cdn ){
			var cdns = cdn[i]
			var cdnName = cdns.split("@")[0];
			var cdnVers = cdns.split("@")[1];
			var cdnVersName = cdns.split("@")[2] || (cdnName + ".min");
			var space = script.getAttribute("spare");
			if( cdnName === "arcgis" ) {
				html += arcgisCdn(cdnName,cdnVers,cdnVersName,space)
				continue
			}
			html += typeCdn(cdnName,cdnVers,cdnVersName,space)
		}
		document.writeln(html)
	}
	
	function getQueryVariable(variable,cdn){
	       var query = cdn.split("?")[1];
		   if( !query ) return false;
	       var vars = query.split("&");
	       for (var i=0;i<vars.length;i++) {
	               var pair = vars[i].split("=");
	               if(pair[0] == variable){return pair[1];}
	       }
	       return(false);
	}
	function createJsdelivrCdn (cdnName,cdnVers,cdnVersName,space){
		if( cdnName === 'three'){
			cdnVers = cdnVers.replace("r","");
			return ('<script spare="'+space+'" createName="createJsdelivrCdn" onerror="cdnError(this)" src="https://cdn.jsdelivr.net/npm/'+cdnName+"@0."+cdnVers+'.0/build/'+cdnVersName+'.js"></script>')
		}
		return ('<script spare="'+space+'" createName="createJsdelivrCdn" onerror="cdnError(this)" src="https://cdn.jsdelivr.net/npm/'+cdnName+"@"+cdnVers+'/dist/'+cdnVersName+'.js"></script>')
	}
	function createBootCdn (cdnName,cdnVers,cdnVersName,space){
		if( cdnName === 'three'){
			cdnVers = cdnVers.replace("r","");
			// https://cdn.bootcdn.net/ajax/libs/three.js/r123/three.min.js
			return ('<script spare="'+space+'" createName="createBootCdn" onerror="cdnError(this)" src="https://cdn.bootcdn.net/ajax/libs/'+cdnName+'.js/r'+cdnVers+'/'+cdnVersName+'.js"></script>')
		}else{
			https://cdn.bootcdn.net/ajax/libs/vue/3.2.26/vue.min.js
			return ('<script spare="'+space+'" createName="createBootCdn" onerror="cdnError(this)" src="https://cdn.bootcdn.net/ajax/libs/'+cdnName+'/'+cdnVers+'/'+cdnVersName+'.js"></script>')
		}
	}
	function arcgisCdn (cdnName,cdnVers,cdnVersName,space){
		if( cdnVers == 3 ){
			return (`
			<script src="http://cp.e-jiankun.com/arcgis_js_api/init.js"></script>
			<link href="http://cp.e-jiankun.com/arcgis_js_api/esri/css/esri.css" rel='styleSheet' type='text/css'/>
			`)
		}
		return (`
		<script src="http://121.32.129.19:8100/arcgis4/init.js"></script>
		<link href="http://121.32.129.19:8100/arcgis4/esri/css/esri.css" rel='styleSheet' type='text/css'/>`)
	}
})(window)
