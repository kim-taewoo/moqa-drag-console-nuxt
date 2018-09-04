import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken (state, token) {
        state.token = token
      }
    },
    actions: {

    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore