//import Vue from 'vue'
//import Vuex from 'vuex'
import app from './modules/app'
import help from './modules/help'
import api from './modules/api'
import user from './modules/user'
import baseinfo from './modules/baseinfo'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'
import shuifei from "./modules/shuifei"

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    api,
    help,
    user,
    baseinfo,
    tagsView,
    permission,
    settings,
    shuifei
  },
  getters
});

export default store
