var compression = function(){
	var eleFile = document.createElement("input");
	eleFile.type = 'file';
	// 压缩图片需要的一些元素和对象
	var reader = new FileReader(),
	//创建一个img对象
	img = new Image();

	// 选择的文件对象
	var file = null;

	// 缩放图片需要的canvas
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

	var completeOver = null;

	// base64地址图片加载完毕后
	img.onload = function() {
		// 图片原始尺寸
		var originWidth = this.width;
		var originHeight = this.height;
		// 最大尺寸限制，可通过国设置宽高来实现图片压缩程度
		var maxWidth = 300,
			maxHeight = 300;
		// 目标尺寸
		var targetWidth = originWidth,
			targetHeight = originHeight;
		// 图片尺寸超过400x400的限制
		if(originWidth > maxWidth || originHeight > maxHeight) {
			if(originWidth / originHeight > maxWidth / maxHeight) {
				// 更宽，按照宽度限定尺寸
				targetWidth = maxWidth;
				targetHeight = Math.round(maxWidth * (originHeight / originWidth));
			} else {
				targetHeight = maxHeight;
				targetWidth = Math.round(maxHeight * (originWidth / originHeight));
			}
		}
		// canvas对图片进行缩放
		canvas.width = targetWidth;
		canvas.height = targetHeight;
		// 清除画布
		context.clearRect(0, 0, targetWidth, targetHeight);
		// 图片压缩
		context.drawImage(img, 0, 0, targetWidth, targetHeight);
		/* 第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
		// 压缩后的图片base64 url
		/* canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
			* qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
		var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
		// console.log(canvas.toDataURL('image/jpeg', 0.92));
		// document.body.style.backgroundImage='url(' + newUrl + ')';
		// ps.src = newUrl;
		completeOver && completeOver(newUrl) ;
		completeOver = null ;
	};

	// 文件base64化，以便获知图片原始尺寸
	reader.onload = function(e) {
		img.src = e.target.result;
	};
	
	eleFile.addEventListener('change', function(event) {
		file = event.target.files[0];
		// 选择的文件是图片
		if(file.type.indexOf("image") == 0) {
			reader.readAsDataURL(file);
		}
	});
	
	// 选择压缩图片
	this.toSelect = function(fn){
		completeOver = fn;
		eleFile.value = "";
		eleFile.click();
	};
	
	// 通过路径压缩图片
	this.toSrc = function(paths,fn){
		completeOver = fn;
		img.src = paths;
	};
	
	// 通过files压缩图片
	this.toFiles = function(files,fn){
		completeOver = fn;
		reader.readAsDataURL(files);
	};
}

export { compression }