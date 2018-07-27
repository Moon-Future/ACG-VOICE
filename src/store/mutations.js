import * as types from './mutation-types'

const mutations = {
  [types.SET_CHARACTER](state, character) {
    state.character = character
  }
}

export default mutations