define([],function(){
	
	var inputImage = function(){
		
		this.element = null;
		
	}
	
	inputImage.prototype = {
		
		show : function(json){
			json && this.createElement(json);
			if( !this.element.parentElement ){
				document.body.appendChild(this.element); 
			}else{
				this.element.style.display = "block";
			}
		},
		
		hide : function(){
			this.element.style.display = "none";
		},
		
		createElement : function(json){
			if( !this.element ){
				this.element = document.createElement("div");
				this.element.style.cssText = "position: absolute;left: 50%;top: 50%;width: 500px;transform: translate(-50%,-50%);background: #ffffff;border-radius: 7px;overflow: hidden;";
			}
			var img = "";
			for( var i in json ){
				img +=`
				<div style="padding: 12px;border: solid 1px #333;border-radius: 15px;cursor: pointer;background: #dedede;">
					<div>
						<span> ${json[i].name} </span>
					</div>
					<div>
						<img src="${json[i].name}">
					</div>
				</div>`
			}
			var html = `
				<div style="padding: 7px;background: #2d2d2d;color: #fff;">
					<span> 选择图片 </span>
				</div>
				<div style="display: flex;padding: 8px;">
					${img}
				</div>
			`;
			this.element.innerHTML = html;
			return html;
		}
	}
	
	return inputImage;

})
	
