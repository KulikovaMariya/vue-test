import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getUserByUUID, sortUsersByField } from "./helpers";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    users: state => {
      return state.users;
    },
    userByUUID: state => UUID => {
      return getUserByUUID(state.users, UUID)
    }
  },
  mutations: {
    ADD_USER: (state, payload) => {
      if (payload.supervisorUUID) {
        const supervisor = getUserByUUID(state.users, payload.supervisorUUID)
        if (supervisor) {
          supervisor.subordinates.push(payload)
        }
      } else {
        state.users.push(payload)
      }
    },
    SORT_USERS: (state, payload) => {
      sortUsersByField(state.users, payload)
    }
  },
  actions: {
    ADD_USER: ({ commit }, payload) => {
      commit('ADD_USER', payload)
    },
    SORT_USERS({ commit }, payload) {
      commit('SORT_USERS', payload)
    }
  },
  plugins: [vuexLocal.plugin]
})
