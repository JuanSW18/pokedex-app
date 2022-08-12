import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      favoriteList: []
    }
  },
  mutations: {
    savePokemon (state, pokemon) {
      state.favoriteList.push(pokemon)
    },
    removePokemon(state, pokemon) {
      state.favoriteList = state.favoriteList.filter(item => item !== pokemon)
    }
  }
})