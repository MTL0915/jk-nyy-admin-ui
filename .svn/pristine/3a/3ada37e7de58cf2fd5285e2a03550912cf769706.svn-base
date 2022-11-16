import { getOrgTypeList } from '@/api/baseInfo'
const state = {
  cur_org_id: '',
  cur_org_name: '',
  cur_base_id: '',
  cur_user_level: '',
  cur_base_list: [],
  org_type_list: [],
  baseInfo: {}
}

const mutations = {
  SET_ORG_ID: (state, orgId) => {
    state.cur_org_id = orgId
  },
  SET_ORG_NAME: (state, org) => {
    state.cur_org_name = org
  },
  SET_ORG_TYPES: (state, lists) => {
    state.org_type_list = lists
  },
  SET_BASE_INFO: (state, lists) => {
    state.org_type_list = lists
  }
}

const actions = {
  setOrgId({ commit }, orgId) {
    commit('SET_ORG_ID', orgId)
  },
  setOrgName({ commit }, org) {
    commit('SET_ORG_NAME', org)
  },
  "baseInfo.getOrgTypes"({ commit, state }) {
    
  },
  getOrgTypes({ commit, state }) {
    // 读取组织分类，如有缓存，返回缓存数据
    return new Promise((resolve, reject) => {
      if (state.org_type_list.length > 0) {
        resolve(state.org_type_list)
      } else {
        getOrgTypeList()
          .then(res => {
            if (res.code === 200) {
              commit('SET_ORG_TYPES', res.data)
              resolve(res.data)
            }
            reject('接口返回数据error')
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
