export default {
  actions: {},
  mutations: {
    setShebeiData(state, pkArrObj) {
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
      // console.log(state.pkArr)
    },
    setChuanganqiData(state, pcArr) {
      state.pcArr = pcArr;
    },
  },
  state: {
    pkArr: [],
    pcArr: [],
    pkArr01: [],
    pkArr02: [],
  },
};