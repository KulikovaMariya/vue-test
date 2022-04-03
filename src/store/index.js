import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getUserByUUID, sortUsersByField, compare } from "./helpers";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
      users: state.users
    })
})

export const store = new Vuex.Store({
  state: {
    users: [],
    toggledUsersUUID: []
  },
  getters: {
    users: state => {
      return state.users;
    },
    userByUUID: state => UUID => {
      return getUserByUUID(state.users, UUID)
    },
    toggledUsersUUID: state => {
      return state.toggledUsersUUID
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
      // TODO проверить
      sortUsersByField(state.users, payload.field, payload.direction)
    },
    ADD_TOGGLED_USER: (state, payload) => {
      state.toggledUsersUUID.push(payload)
    },
    DELETE_TOGGLED_USER: (state, payload) => {
      const index = state.toggledUsersUUID.findIndex(UUID => UUID === payload)
      state.toggledUsersUUID.splice(index, 1)
    }
  },
  actions: {
    ADD_USER: ({ commit }, payload) => {
      commit('ADD_USER', payload)
    },
    SORT_USERS({ commit }, payload) {
      commit('SORT_USERS', payload)
    },
    SET_TOGGLED_USER: ({ commit, getters }, payload) => {
      if (!getters.toggledUsersUUID.includes(payload)) {
        commit('ADD_TOGGLED_USER', payload)
      } else {
        commit('DELETE_TOGGLED_USER', payload)
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
