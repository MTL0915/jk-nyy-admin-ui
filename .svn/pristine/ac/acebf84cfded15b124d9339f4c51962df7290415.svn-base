import { DodecahedronBufferGeometry } from "three"

export function getImage(img) {
  if (img === null) {
    return ''
  }
  if (img === undefined){
    return ''
  }
  if (img.indexOf('blob') > -1 || img.indexOf('http') > -1) {
    return img
  }
  return process.env.IMG_URL + img
}

export function getPestImage(img) {
  if (img === null) {
    return ''
  }
  if (img.indexOf('blob') > -1 || img.indexOf('http') > -1) {
    return img
  }
  return "https://cp.e-jiankun.com/jk_image_server" + img
}


export function getRecognitionResult (result,device_type_code) {
  if (result == false){
    return "无";
  }
  if (device_type_code == "JK-ZS") {
    try{
      var status = result.replace(new RegExp("'","g"), "\"")
      var result = [];
      
      var jsonArray = JSON.parse(status);
      if (!(jsonArray instanceof Array)){
        return status;
      }
      for (var i = 0,len = jsonArray.length;i < len;i++){
        var arr = jsonArray[i];
        if (arr[0].trim() === "off"){
          result.push("关");
        }else if (arr[0].trim() === "on"){
          result.push("开");
        }else{
          result.push("未知");
        }
      }

      return JSON.stringify(result);
    }catch(e){
      return status;
    }
  }else{
    return status;
  }
}