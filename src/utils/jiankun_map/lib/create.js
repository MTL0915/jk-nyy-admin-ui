export default {
	
	// 创建
	createPoint (param){
		var jd = param.x,
			wd = param.y,
			img = param.img,
			size = param.size,
			sp = param.sp;
		
		var point = new esri.geometry.Point([jd,wd],sp);
		var symbol = this.createImgSymbol();
		
	},
	
	// 创建图片symbol
	createImgSymbol(img,size){
		return new esri.symbol.PictureMarkerSymbol(img,size,size);
	},
	
	
	
}