import movePoint from "./js/movePoint.js";

export default {
	
	flicker : function(graphic , time , speed , symbol ){
        var close = function(){
            clearInterval(key);
            symbol ? graphic.setSymbol(oldSymbol) : graphic.show();
        }
		var layer = graphic.getLayer();
		if( !layer ){
			return ;
		}
		layer.remove(graphic);
		layer.add(graphic);
        setTimeout(close, time || 5000);
        var oldSymbol = graphic.symbol;
        var sv = false;
        var key = setInterval(()=>{
            sv = !sv;
            if( symbol ){
                sv ? graphic.setSymbol(symbol) : graphic.setSymbol(oldSymbol);
            }else{
                sv ? graphic.hide() : graphic.show();
            }
        },speed || 500)
        return close;
    },

    // 点动画
    movePoint : movePoint.default
	
}

