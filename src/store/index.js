import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 0,
      user: ''
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    getUser(state, user) {
      state.user = user
    }
  }
})

export default store
