<template>
	<div class='mapBox'>
		<div :id='mapId'></div>
	</div>
</template>

<script type="text/babel">
  import mapConfig from "../../../config/map.config.js";
  import map from "../../../map.js";
  export default {
    name: 'JKMap',
    props: {
      load : {
        type : Function,
        default : new Function
      },
      mapParams : {
        type : Object,
        default : mapConfig
      },
	  url : {
		  type : String,
		  default : ""
	  },
	  urlType : {
		  type : String,
		  default : ""
	  }
    },

    data() {
      return {
        visible: true,
		mapId : "map_xid_" + (new Date()).getTime() + "_" + (Math.random() * 10000).toFixed(0)
      };
    },

	mounted() {
		if( this.url ) {
			this.mapParams.baseMap = this.url;
			this.mapParams.layersType = this.urlType || null;
		}
		this.map = new map(this.mapId,this.mapParams || {});
		this.map.onloadMap(this.load);
	},

    methods: {
      getMap(){
        return this.map.map;
      }
    },

    computed: {
     
    }
  };
</script>
<style>
	.mapBox,.mapBox > div { width: 100%; height: 100%; }	
</style>
