export default {
  // namespaced: true, //开启命名空间
  state: {
    pkArr: [], // 合并后的正确设备
    pcArr: [], // 传感器数组
    pkArr01: [], // 主设备
    pkArr02: [], // 副设备
    openKey: [], // 打开的开关按钮
  },
  mutations: {
    SET_EQUIPMENT_DATA(state, pkArrObj) {
      if (pkArrObj.pkArr01) {
        state.pkArr01 = pkArrObj.pkArr01;
      }
      if (pkArrObj.pkArr02) {
        state.pkArr02 = pkArrObj.pkArr02;
      }
      state.pkArr = [];
      for (var i = 0; i < state.pkArr01.length; i++) {
        // 过滤掉传送阀（进肥阀），通道号是33-40，共8个
        if (state.pkArr01[i].channel >= 33 && state.pkArr01[i].channel <= 40) {
          continue;
        }
        state.pkArr.push(state.pkArr01[i]);
      }
      for (var i = 0; i < state.pkArr02.length; i++) {
        // 只要传送阀（进肥阀），通道号是33-40，共8个
        if (state.pkArr02[i].channel >= 33 && state.pkArr02[i].channel <= 40) {
          state.pkArr.push(state.pkArr02[i]);
        }
      }
    },
    SET_SENSOR_DATA(state, pcArr) {
      state.pcArr = pcArr;
    },
    // 循环所有设备，获得开启的channel
    INIT_CODE(state, pkArrObj) {
      // console.log(pkArrObj);
      if (pkArrObj.pkArr01) {
        state.pkArr01 = pkArrObj.pkArr01;
      }
      if (pkArrObj.pkArr02) {
        state.pkArr02 = pkArrObj.pkArr02;
      }
      state.openKey = [];
      for (var i = 0; i < state.pkArr01.length; i++) {
        // 过滤掉传送阀（进肥阀），通道号是33-40，共8个
        if (state.pkArr01[i].channel >= 33 && state.pkArr01[i].channel <= 40) {
          continue;
        }
        if (state.pkArr01[i].value == 1) {
          state.openKey.push(state.pkArr01[i].channel);
        }
      }
      for (var i = 0; i < state.pkArr02.length; i++) {
        // 只要传送阀（进肥阀），通道号是33-40，共8个
        if (state.pkArr02[i].channel >= 33 && state.pkArr02[i].channel <= 40) {
          if (state.pkArr02[i].value == 1) {
            state.openKey.push(state.pkArr02[i].channel);
          }
        }
      }
      console.log(state.openKey);
    },
    ADD_CODE(state, code) {
      state.openKey.push(code);
      console.log(state.openKey);
    },
    DEL_CODE(state, index) {
      state.openKey.splice(index, 1);
      console.log(state.openKey);
    },
  },
  actions: {},
};
