import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { sortUsersByField, addUserAndSort, updateSortingParams } from "./helpers";

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
    toggledUsersUUID: [],
    sortingParams: {
      field: '',
      direction: 0
    }
  },

  getters: {
    users: state => {
      return state.users;
    },
    toggledUsersUUID: state => {
      return state.toggledUsersUUID
    },
    sortingParams: state => {
      return state.sortingParams
    }
  },

  mutations: {
    ADD_USER: (state, payload) => {
      addUserAndSort(state.users, payload, state.sortingParams)
    },
    SORT_USERS: (state, payload) => {
      updateSortingParams(state.sortingParams, payload)
      sortUsersByField(state.users, state.sortingParams)
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
