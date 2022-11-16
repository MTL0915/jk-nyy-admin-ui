import { map3d } from "@/utils/jiankun_map";

export default {
    // 根据路线polygin生成 扩展路线几何 
    createPolygonByPolyline(polyline) {
        var polygon = map3d.esri.geometryEngine.geodesicBuffer(polyline,3,'feet');
        var polygonStyle = { type: "simple-fill", color: [227, 139, 79, 0.8], outline: { color: [255, 255, 255], width: 1 } };
        return new map3d.esri.Graphic(polygon,polygonStyle);
    },
}
