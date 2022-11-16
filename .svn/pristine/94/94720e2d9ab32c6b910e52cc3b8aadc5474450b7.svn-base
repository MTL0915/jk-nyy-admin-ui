!function(model){
	
	window.model = model();
	
	var optionelement = null;
	document.addEventListener("click",function(event){
		try{ 
			if( optionelement && optionelement.style )
				optionelement.style.display = 'none';
			var input = event.target;
			if( input.tagName === "INPUT" && input.type=='text' ){
				input.nextElementSibling.style.display = "block";
				optionelement = input.nextElementSibling; 
			}else
			if( input.className === 'soption' ){
				var inp = input.parentElement.previousElementSibling;
				var value = input.getAttribute("value") || input.innerText;
				inp.value = value;
				inp.onchange({input: inp ,target: input,value : value});
			}
		}catch(e){
			
		}
		
	});
	
}(function(){
	
	var model = function(){
		
		this.json = null;
		this.param = null;
		this.element = null;
		
	}
	
	var fn = model.prototype = {
		
		save : function(){
			var json = this.json;
			for( var i in json ){
				json[i].value = this.element.querySelector("."+(json[i].name||i)).value;	
			}
			this.onsave && this.onsave(json);
			return json;
		},
		
		onsave : null,
		
		createElement : function(json,param = {}){
			this.json = json; 
			this.param = param;
			//获取容器 
			var modelElement = param.dom || this.getContent();
			//根据json来生成
			var html = "<div class='table_menu'>";
			for( var i in json ){
				var it = json[i];
				var type = it.type || "text";//默认类型
				var value = it.value || ""; //默认值
				var name = it.name || i;
				var inputHtml = "";
				if( ["text","color","range"].indexOf(type) > -1 ){
					inputHtml =  `<input class='inputText_symbol1 ${name}' type="${type}" name="name" value="${value}">`;
				}else if(type == 'select'){
					var options = it.option.map(function(e){ return `<div class='soption'>${e}</div>` }).join("");
					inputHtml = `<input class='inputText_symbol1 ${name}' type="text" name="name" value="${value}">
							<div class='selectOption'>
								${options}
							</div>
						</input>`;
				}
				html += `<div class="table_menu_content">
					<div class="datav-label">
						<span class="redfont">*</span>
						<span class='fonts'>${name}</span>
					</div>
					<div class="datav-field">
						${inputHtml}
					</div>
				</div>`
			}
			//处理额外的按钮
			html += `<div>
				<div class='btn' doc-attr='save'> 保存 </div>
			</div>`;
			if( param.btn ){
				for( var i in param.btn ){
					html += `<div>
						<div class='btn' doc-attr='zidingyiBtn'> ${param.btn[i].name} </div>
					</div>`;
				}	
			}
			//收尾table_menu
			html += "</div>";
			modelElement.innerHTML = html;
		},
		
		//获取容器
		getContent : function(){
			var self = this;
			
			
			var f = function(e){
				if( e.target === this ){
					// self.hide();
					return;
				}
				var doc = e.target.getAttribute("doc-attr");
				if( doc && self[doc] )
					self[doc](e.target);
			}
			
			if( this.element ) {
				
				if( this.element.iselement !== true ){
					this.element.onclick = f ;
				}
				
				return this.element;
			};
			
			//先 生成容器div
			var modelElement = this.element = document.createElement("div");
			modelElement.iselement = true;
			modelElement.className += " table_content";
			this.element = modelElement; 
			document.body.appendChild(modelElement);
			modelElement.onclick = f;
			return modelElement;
		},
		
		hide : function(){
			this.element.style.display = "none";;
			this.onsave = null;
			this.param = null;
			this.json = null;
		},
		
		show : function(json,cb,param){
			json && this.createElement(json,param);
			cb && (this.onsave = cb);
			this.element.style.display = "block";
		},
		
		zidingyiBtn : function(dom){
			var j = this.param.btn.find(function(e){ return e.name == dom.innerText });
			j.call && j.call.apply(this,dom);
		}
		
	}
	
	return model;
	
})
