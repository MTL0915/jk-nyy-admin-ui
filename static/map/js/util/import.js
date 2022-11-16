define([],function(){
	
	return {
		
		ImportString : function(content,filename){
		    var a=document.createElement('a');
		    a.setAttribute('href','data:text/html;gb2312,'+content);
		    a.setAttribute('download',filename);
		    a.setAttribute('target','_blank');
		    a.style.display="none";
		    document.body.appendChild(a);
		    a.click();
		    document.body.removeChild(a);
		    a = null;
		}
		
	}
	
})
