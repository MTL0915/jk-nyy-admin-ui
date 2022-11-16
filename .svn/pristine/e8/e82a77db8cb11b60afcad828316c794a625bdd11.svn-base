export function getStateDes(state) {
  if (state === -1 || state === '-1') {
    return '无此设备'
  } else if (state === 0 || state === '0') {
    return '离线'
  } else if (state === 1 || state === '1') {
    return '正常'
  } else if (state === 2 || state === '2') {
    return '休眠'
  } else if (state === 3 || state === '3') {
    return '供电'
  } else if (state === 4 || state === '4') {
    return '故障'
  } else if (state === 5 || state === '5') {
    return '待机'
  } else {
    return '未知'
  }
}

export function getControlTypeDesc(controlType){
  if (controlType == undefined || controlType == null){
    return "未知";
  }
  if (controlType === 0 || controlType === '0') {
    return '底线安全策略'
  } else if (controlType === 1 || controlType === '1') {
    return '远程手动控制'
  } else if (controlType === 2 || controlType === '2') {
    return '条件逻辑控制'
  } else if (controlType === 3 || controlType === '3') {
    return '现场控制'
  } else {
    return '未知'
  }
}

export function getDirectionByArimuth(s){
  if (s <= 22.5 || s >= 337.5) {
    return "往北";
  } else if (s <= 67.5) {
    return "东北";
  } else if (s <= 112.5) {
    return "往东";
  } else if (s <= 157.5) {
    return "东南";
  } else if (s <= 202.5) {
    return "往南";
  } else if (s <= 247.5) {
    return "西南";
  } else if (s <= 292.5) {
    return "往西";
  } else if (s <= 337.5) {
    return "西北";
  }
}

/**
 * 判断是否是网关设备
 * @param {设备序列号} device_id
 */
export function isNetDevice(device_id) {
  var char = device_id.substring(4, 5)
  if (char === 'A') {
    return true
  }
  return false
}

export function isOtherDevice(device_id){
  return (isNetDevice(device_id) === false) && (isSubNetDevice(device_id) === false)
}

/**
 * 判断是否是网关下属设备
 * @param {设备序列号} device_id
 */
export function isSubNetDevice(device_id) {
  var char = device_id.substring(4, 5)
  if (char === 'B') {
    return true
  }
  return false
}

export function getStateClass(state) {
  if (state === -1 || state === '-1') {
    return 'grep'
  } else if (state === 0 || state === '0') {
    return 'grep'
  } else if (state === 1 || state === '1') {
    return 'normal'
  } else if (state === 2 || state === '2') {
    return 'grep'
  } else if (state === 3 || state === '3') {
    return 'grep'
  } else if (state === 4 || state === '4') {
    return 'abnormal'
  }else {
    return 'grep'
  }
}
