import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import projects from './modules/projects'
import staff from './modules/staff'
import daily from './modules/daily'
import setting from './modules/setting'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    projects,
    staff,
    daily,
    setting
  },
  getters
})

export default store
