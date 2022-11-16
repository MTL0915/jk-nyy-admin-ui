define([],function(){
	
	var imageManagement = function(){
		
		this.imageData = [];
		
	};
	
	var fn = imageManagement.prototype = {
		
		//添加图片
		add : function(){
			//调用选择文件
			this.selectFile(function(name,base64){
				this.imageData.push({name: name, data : base64 });
			}.bind(this));
		},
		
		//弹出选择文件框
		selectFile : function(call){
		
			var file = document.createElement("input");
			file.type = "file";
			file.onchange = function(e){
				var reader = new FileReader();
				var name = this.files[0].name;
				reader.onload=function(e)
				{
					
					this.onload = null;
					call && call(name,e.currentTarget.result);
					name = null;
				}
				reader.readAsDataURL(this.files[0]);
				
				this.onchange = null;
			}
			file.click();
			
		}
		
	}
	
	return imageManagement;
	
})
