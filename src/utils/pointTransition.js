var M_PI = 3.14159265358979324;
var A = 6378245.0;
var EE = 0.00669342162296594323;
var X_PI = M_PI * 3000.0 / 180.0;

/**
 * 坐标系转换函数
 * WGS->GCJ
 * WGS->BD09
 * GCJ->BD09
 */
 export function Convertor(x,y) {
    let poi = {lng:x,lat:y}

    //WGS->GCJ
    var poi2 = WGS2GCJ(poi);
    if (typeof poi2 === "undefined") {
        return;
    }
    //GCJ->百度坐标系
    return GCJ2BD09(poi2);

}

function WGS2GCJ (poi) {
    if (outofChine(poi)) {
        return;
    }
    var poi2 = {};
    var dLat = WGS2GCJ_lat(poi.lng - 105.0, poi.lat - 35.0);
    var dLon = WGS2GCJ_lng(poi.lng - 105.0, poi.lat - 35.0);
    var radLat = poi.lat / 180.0 * M_PI;
    var magic = Math.sin(radLat);
    magic = 1 - EE * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((A * (1 - EE)) / (magic * sqrtMagic) * M_PI);
    dLon = (dLon * 180.0) / (A / sqrtMagic * Math.cos(radLat) * M_PI);
    poi2.lat = poi.lat + dLat;
    poi2.lng = poi.lng + dLon;
    return poi2;
}

function outofChine (p) {
    if (p.lng < 72.004 || p.lng > 137.8347) {
        return true;
    }
    if (p.lat < 0.8293 || p.lat > 55.8271) {
        return true;
    }
    return false;
}

function WGS2GCJ_lat (x, y) {
    var ret1 = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret1 += (20.0 * Math.sin(6.0 * x * M_PI) + 20.0 * Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
    ret1 += (20.0 * Math.sin(y * M_PI) + 40.0 * Math.sin(y / 3.0 * M_PI)) * 2.0 / 3.0;
    ret1 += (160.0 * Math.sin(y / 12.0 * M_PI) + 320 * Math.sin(y * M_PI / 30.0)) * 2.0 / 3.0;
    return ret1;
  }
  
  function WGS2GCJ_lng (x, y) {
    var ret2 = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret2 += (20.0 * Math.sin(6.0 * x * M_PI) + 20.0 * Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
    ret2 += (20.0 * Math.sin(x * M_PI) + 40.0 * Math.sin(x / 3.0 * M_PI)) * 2.0 / 3.0;
    ret2 += (150.0 * Math.sin(x / 12.0 * M_PI) + 300.0 * Math.sin(x / 30.0 * M_PI)) * 2.0 / 3.0;
    return ret2;
  }


  function GCJ2BD09 (poi) {
    var poi2 = {};
    var x = poi.lng
      , y = poi.lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    poi2.lng = z * Math.cos(theta) + 0.0065;
    poi2.lat = z * Math.sin(theta) + 0.006;
    return poi2;
}
