<template>
	<div class='mapBox'>
		<div :id='mapId'></div>
	</div>
</template>

<script type="text/babel">

  import { map } from "../../../map3d.js";
  export default {
    name: 'JKMap3d',
    props: {
      load : {
        type : Function,
        default : new Function
      },
      mapParams : {
        type : Object,
        default : function(){
          return {}
        }
      }
    },

    data() {
      return {
        visible: true,
        mapId : "map3d_xid_" + (new Date()).getTime(),
        
        layers : [],
      };
    },

	mounted() {
		this.map = new map(this.mapId,this.mapParams || {});
		this.map.onloadMap(this.load);
	},

    methods: {
      // 锁定范围
      setExtent (camera){
        this.view.goTo(camera);
      },

      create (type , url , param){
        if( type === "TileLayer" ){ return this.createTileLayer(url, param) }
        else if( type === "3d" ){ return this.create3d(url, param) }
      },

      // 创建高清图层
      createTileLayer (url , param){
        return new this.map.esri.TileLayer(url, param);
      },

      // 加载3d模型
      create3d (url , param = {}){
        return new this.map.esri.IntegratedMeshLayer({
          url:"http://192.168.33.163/arcgis/rest/services/Hosted/Production_1/SceneServer",
          // copyright:"jk",
          elevationInfo:{
            mode:"absolute-height",
            offset:-20
          },
          // ...param
        });
      },

      addGraphic ( graphic , type ){
        var layer = this.getLayer( type );
        layer.add( graphic );
        return layer;
      },

      createGraphic (json){
        return new this.map.esri.Graphic(json);
      },

      // 创建图层
      getLayer( type ){
        var layer = this.map.view.map.findLayerById( type );
        if( !layer ) {
          layer = new this.map.esri.GraphicsLayer({ id: type });
          this.map.view.map.add(layer)
        }
        return layer
      },

      // 创建线
      createPolyline (paths,spa){
        // 2D polyline with to paths with m-values (note that the 2nd path does not have m-values defined)
        var line = new Polyline({
          hasZ: false,
          hasM: true,
          paths: paths,
          spatialReference: { wkid: spa || 4326 }
        });
      },

      // 创建3d lineSymbol
      create3dPolyLine ( path , profile ){
        // create a PathSymbol3DLayer with a strip style
        var stripPath = {
          type: "line-3d",  // autocasts as new LineSymbol3D()
          symbolLayers: [{
            type: "path",  // autocasts as new PathSymbol3DLayer()
            profile: profile || "quad",  // creates a rectangular shape
            width: 20,  // path width in meters
            height: 5,  // path height in meters
            material: { color: "#ff7380" },
            cap: "square",
            profileRotation: "heading"
          }]
        };

        var graphics = this.createGraphic({
          geometry: this.createPolyline( path ),
          symbol: stripPath,
        })

        return graphics;
      }

    },

    computed: {
      
    }
  };
</script>
<style>
	.mapBox,.mapBox > div { width: 100%; height: 100%; }	
</style>
