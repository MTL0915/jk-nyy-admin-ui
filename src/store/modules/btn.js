export default {
  actions: {},
  mutations: {
    // 循环所有设备，获得开启的channel
    initCode(state, pkArrObj) {
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
    addCode(state, code) {
      state.openKey.push(code);
      console.log(state.openKey);
    },
    delCode(state, index) {
      state.openKey.splice(index, 1);
      console.log(state.openKey);
    },
  },
  state: {
    openKey: [],
    pkArr01: [],
    pkArr02: []
  },
};