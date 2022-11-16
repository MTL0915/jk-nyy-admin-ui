const state = {
  api_list: {},
  api_data: [],
  currentData: '',
  currentPath: ''
}

const mutations = {
  SET_API_DATA: (state, list) => {
    state.api_data = list
  },
  SET_API_LIST: (state, list) => {
    state.api_list = list
  },
  SET_CURRENT_DATA: (state, currentData) => {
    state.currentData = currentData
  },
  SET_CURRENT_PATH: (state, path) => {
    state.currentPath = path
  }
}

const actions = {
  setApiData({ commit }, list) {
    commit('SET_API_DATA', list)
  }
}

export default {
  state,
  mutations,
  actions
}
