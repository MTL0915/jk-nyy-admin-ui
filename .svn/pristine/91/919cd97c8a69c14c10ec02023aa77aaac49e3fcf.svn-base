<template>
	<div ref='mapLegend'></div>
</template>

<script type="text/babel">

  export default {
    name: 'JKMapLegend',

    props: {
		load : {
			type : Function,
			default : function(){

			}
		},
		
		url : {
			type : String,
			default : "",
		},
		
		index : {
			type : String,
			default : "0",
		},

		namef : {
			type : Object,
			default : function(){
				return {}
			}
		},

		formatter : {
			type : String,
			default : "${val}"
		}
	},

    data() {
      return {
        visible: true
      };
    },
	
	watch: {
		
		"index" (){
			this.showLegend();
		},

		"url" (){
			this.showLegend();
		},

		"namef" (){
			this.showLegend();
		}
		
	},

	mounted() {
		this.showLegend();
	},

    methods: {
      
		showLegend : function() {
		  var url = this.url;
		  var index = this.index;
		  var fn = this.load;
		  var a = url + "/legend?f=pjson";
		  $.ajax({
		    url: a,
		    dataType: "jsonp",
		    success: (event)=> {
		      if (event.layers) {
				var legend = event.layers.find((e)=>{ return e.layerId == index })
				if( !legend ) {
					return;
				}
				legend = legend.legend;
		        // var legend = event.layers[index].legend;
		        var tulihtml = "";
		        for (var i = 0 ; i < legend.length ; i++) {
		          var it = legend[i];
		
		          var name = this.namef[it.label] || it.label;
		
		          if (!name || name.replace(/\s{0,}/g, "") == "") {
		            continue;
		          }
		          if (name.indexOf("其他所有值") !== -1) name = "全部";
		
		          tulihtml += `
		                      <div valign="middle" class='box' style="display: flex;padding: 5px 0;align-items: center;padding:5px 10px;">
		                          <img src="data:image/png;base64,${it.imageData}" style="padding-right:5px;"/>
		                          <span>${this.formatters(name)}</span>
		                      </div>
		                  `;
		        }
		        // <div>${name}</div>
		        var html = `<div style="display: flex;flex-wrap: wrap;">${tulihtml}</div>`
				var sd = document.createElement("div")
				sd.innerHTML = html
				html = sd.children[0]
		        html.style.cssText = "background: #0e416e;font-size:12px;color:#fff;";
				fn && fn(html);
				this.$refs.mapLegend.innerHTML = "";
				this.$refs.mapLegend.appendChild(html);
		      }
		    }
		  });
		},

		formatters (name){
			var val = name;
			name = eval("`"+this.formatter+"`")
			return name;
		}
    },

    computed: {
		
    }
  };
</script>
<style>

</style>
