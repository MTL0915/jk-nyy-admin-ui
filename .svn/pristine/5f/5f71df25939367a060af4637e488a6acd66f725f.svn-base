//坐标转化
define([],function(){
	
	var transformation = function(){
		this.constructor = function(){
			
		}
		this.constructor.apply(this,arguments);
	}
	
	transformation.prototype.to4490 = function(){
			
		var point = arguments[0];
		
		var x , y , t;
		
		var pi = 3.14159265358979324;
		var a = 6378245.0;
		var ee = 0.00669342162296594323;
		
		var transform = function(wgLon,wgLat) {
			var mgLat;
			var mgLon;
			var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
			var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
			var radLat = wgLat / 180.0 * pi;
			var magic = Math.sin(radLat);
			magic = 1 - ee * magic * magic;
			var sqrtMagic = Math.sqrt(magic);
		
			dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
			dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		
			mgLat = wgLat + dLat;
			mgLon = wgLon + dLon;
		
			return {x:mgLon,y:mgLat};
		}
		
		var transformLat = function (x,y) {
			var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
			+ 0.2 * Math.sqrt(Math.abs(x));
			ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
			ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
			return ret;
		}
		
		var transformLon = function (x, y) {
			var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
			* Math.sqrt(Math.abs(x));
			ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
			ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
			* pi)) * 2.0 / 3.0;
			return ret;
		}
		
		
		return function(){
			
			if( point.declaredClass ){
				
				/*如果是json的话*/
				t = "esri";
				x = point.x;
				y = point.y;					
				
			}else if( typeof point === "object" && point.toString() === "[object Object]"){
			
				/*如果是json的话*/
				t = "object";
				x = point.x;
				y = point.y;
			
			}else if( arguments.length === 2 ){
				
				/*如果传入的参数有2个的话*/
				t = "dbParam";
				x = point;
				y = agruments[1];
				
			}else if( typeof point === "object" && point instanceof Object &&  point instanceof Array  ){
				
				/*如果是数组的话*/
				t = "array"; 
				x = point[0];
				y = point[1];
				
			}
			
			if( !x || !y || isNaN(x) || isNaN(y) ){
				
				throw "输入的类型不正确";
				
			}
			
			/*point=transform(x,y);
			x = point.x * 20037508.342789 / 180;
			y = Math.log(Math.tan((90+point.y)*Math.PI/360))/(Math.PI/180) * 20037508.34789 / 180;*/
			
			x = x / 20037508.34 * 180;
	        y = y / 20037508.34 * 180;
	        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
	        
			//x = x - 0.005459324439559675 - 0.0009471801462659357 -0.0010675089476279709 + 0.0021750178952686383 - 0.000047; // 0.005452324439559675; //0.00546250362235412;
			//y = y + 0.003559429045671635 + 0.0006203505468960202 - 0.0015675600697591108; // 0.0025507857062336825;
	        
			x = x - 0.005452324439559675; //0.00546250362235412;
			y = y + 0.002559429045671635; // 0.0025507857062336825;
			
			switch (t){
				
				case "dbParam" :
					
					return [x,y];
					
				break;
				
				case "esri" : 
				
					return new esri.geometry.Point(x,y,new esri.SpatialReference(102113));
				
				break;
				
				case "object" : 
				
					return {x:x,y:y};
				
				break;
				
				case "array" : 
				
					return [x,y];
				
				break;
				
			}
			
		}()
		
	}
	
	transformation.prototype.to102113 = function(){
		
		var point = arguments[0];
		
		var x , y , t;
		
		var pi = 3.14159265358979324;
		var a = 6378245.0;
		var ee = 0.00669342162296594323;
		
		var transform = function(wgLon,wgLat) {
			var mgLat;
			var mgLon;
			var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
			var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
			var radLat = wgLat / 180.0 * pi;
			var magic = Math.sin(radLat);
			magic = 1 - ee * magic * magic;
			var sqrtMagic = Math.sqrt(magic);
		
			dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
			dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		
			mgLat = wgLat + dLat;
			mgLon = wgLon + dLon;
		
			return {x:mgLon,y:mgLat};
		}
		
		var transformLat = function (x,y) {
			var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
			+ 0.2 * Math.sqrt(Math.abs(x));
			ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
			ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
			return ret;
		}
		
		var transformLon = function (x, y) {
			var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 
			* Math.sqrt(Math.abs(x));
			ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
			ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
			ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
			* pi)) * 2.0 / 3.0;
			return ret;
		}
		
		return function(){
			
			if( point.declaredClass ){
				
				/*如果是json的话*/
				t = "esri";
				x = point.x;
				y = point.y;					
				
			}else if( typeof point === "object" && point.toString() === "[object Object]"){
			
				/*如果是json的话*/
				t = "object";
				x = point.x;
				y = point.y;
			
			}else if( arguments.length === 2 ){
				
				/*如果传入的参数有2个的话*/
				t = "dbParam";
				x = point;
				y = agruments[1];
				
			}else if( typeof point === "object" && point instanceof Object &&  point instanceof Array  ){
				
				/*如果是数组的话*/
				t = "array"; 
				x = point[0];
				y = point[1];
				
			}
			
			if( !x || !y || isNaN(x) || isNaN(y) ){
				
				throw "输入的类型不正确";
				
			}
			
			point=transform(x,y);
			x = point.x * 20037508.34/180;
			y = Math.log(Math.tan((90+point.y)*Math.PI/360))/(Math.PI/180);
			y = y * 20037508.34/180;
			
			//x = x - 0.005452324439559675; //0.00546250362235412;
			//y = y + 0.006559429045671635;
			
			switch (t){
				
				case "dbParam" :
					
					return [x,y];
					
				break;
				
				case "esri" : 
				
					return new esri.geometry.Point(x,y,new esri.SpatialReference(102113));
				
				break;
				
				case "object" : 
				
					return {x:x,y:y};
				
				break;
				
				case "array" : 
				
					return [x,y];
				
				break;
				
			}
			
		}()
		
	}
	
	return new transformation();
	
})
