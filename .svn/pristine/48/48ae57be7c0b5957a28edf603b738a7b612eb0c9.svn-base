define([],function(){
	
	var banKey = ["constructor"];
    var Lfunction　= function(){
        this.constructor = function(){
            this.runExtentConstructor();
        }
 
        this.constructor.apply(this,arguments);
 
        this.runExtentConstructor=function(){
            this.constructor.__extentConstructor &&
            this.constructor.__extentConstructor.forEach(function(argu,e){ e.apply(this,argu) }.bind(this,arguments));
        }
     
    }
　　
    Lfunction.extends = function(obj){ //扩展
        if (obj.hasOwnProperty("constructor")){
            this.__extentConstructor || (this.__extentConstructor=[]);
            this.__extentConstructor.push(obj.constructor);
        };
        for( var i in obj ){
            if( banKey.indexOf(i) != -1 ) continue;
            this.prototype[i] = obj[i];
        }
    }
 
    Lfunction.inherit = function(objPro){ //继承
        var obj = function(){
            this.constructor = function(){};
            this.constructor.apply(this,arguments);
        };
        obj.extent = this.extent;
        obj.inherit = this.inherit;
        obj.extent(new this());
        obj.extent(objPro);
        return obj;
    }
	
	return Lfunction
	
})
 