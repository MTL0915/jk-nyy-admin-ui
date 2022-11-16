<template>
    <JKMap2d :load='loadMap'></JKMap2d>
</template>

<script>

import { map3d } from "@/utils/jiankun_map";
export default {
    props: {
        xy: {
            type: Array,
            default: ()=> [0,0]
        },
        center: {
            type: Array,
            default: ()=> [0,0]
        },
        heading: {
            type: Number,
            default: 0
        }
    },
    watch: {
        xy (val){
            // this.updatePoint(val)
        },
        center (val){
            // this.updateCenter(val)
        },
        heading (val){
            // this.updateHeading(val)
        }
    },
    data (){
        return {
            devicePoint: null
        }
    },
    methods: {
        loadMap: function(view){
            this.view2d = window.view2d = view;
            this.createPoint();
        },

        updateHeading (val){
            this.view2d.rotation = val * -1;
        },

        updatePoint (position){
            var g = this.devicePoint.geometry
            g.longitude = position[0];
            g.latitude = position[1];
            this.devicePoint.geometry = g.clone();
            var ary = this.pointLine.geometry.paths[0];
            var positions = map3d.esri.webMercatorUtils.geographicToWebMercator({x:position[0],y:position[1]});
            position = [positions.x,positions.y]
            if( ary.length===0 || ary[ary.length-1][0] !== position[0] || ary[ary.length-1][1] !== position[1] ){
                ary.push(position);
                this.pointLine.geometry.paths[0] = ary;
                this.pointLine.geometry = this.pointLine.geometry.clone();
            }
        },

        updateCenter (position){
            var g = this.view2d.center;
            if( g ) {
                g.x = position[0];
                g.y = position[1];
                this.view2d.center = g.clone();
            }
        },

        createPoint (){
            // 如果对象不存在则新建
            var pointGraphic = this.point = Util2d.createImgPoint({
                no3d: true,
                img: require("@/assets/img/Plan/biaoshi.png"),
                xy: this.xy,
                spatialReference: { wkid: 4326 }
            });
            var layer = Util2d.addGraphic(pointGraphic,"liaoweizhong",this.view2d)
            this.devicePoint = pointGraphic;
            this.view2d.zoom = 16;

            // 路线对象
            var lineGraphic = this.pointLine = map3d.Util.createGraphic({
                geometry : {
                    type: "polyline",
                    hasZ: false,
                    hasM: false,
                    paths: [[]],
                    spatialReference: { wkid: 102100 }
                },
                symbol : {
                    type: "simple-line",
                    color: "lightblue",
                    width: "2px",
                    style: "solid"
                }
            });
            var layer = Util2d.addGraphic(lineGraphic,"liaoweizhong",this.view2d)

            // setTimeout(()=>{
                
            //     // this.view2d.center = pointGraphic.geometry.clone();
            // },3000)
        }
    }
}
</script>

<style>

</style>