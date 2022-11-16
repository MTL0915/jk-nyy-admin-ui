import { map3d } from "@/utils/jiankun_map";

export function createPolygonByPolyline(polyline){
    var polygon = map3d.esri.geometryEngine.geodesicBuffer(polyline,3,'feet');
    var polygonStyle = { type: "simple-fill", color: [227, 139, 79, 0.8], outline: { color: [255, 255, 255], width: 1 } };
    return new map3d.esri.Graphic(polygon,polygonStyle);
}


// 显示子任务 段落
export function showTaskLine (path,pointIndex1, pointIndex2, color) {
    var paths = path.slice(Math.min(pointIndex1, pointIndex2), Math.max(pointIndex1, pointIndex2) + 1);
    if( paths[0][0] < 1000 ){
      paths = paths.map((e)=>{
        return map3d.esri.webMercatorUtils.lngLatToXY(e[0],e[1])
      })
    }
    var graphic = this.showPath(paths, { color: color || [255, 0, 0, 0.8] });
    return graphic;
}

// 根据节点显示线段
export function showPath (paths, param) {
    // 定义线段symbol
    var symbol = this.getLineSymbol(param);
    var geometry = map3d.Util.createPolyline(paths, view.spatialReference.wkid);
    // 合并开始
    var graphic = map3d.Util.createGraphic({ geometry, symbol })
    // 返回合成几何
    return graphic;
}