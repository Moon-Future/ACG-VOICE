import * as types from './mutation-types'

const mutations = {
  [types.SET_CHARACTER](state, character) {
    state.character = character
  },
  [types.SET_PALYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    Array.isArray(list) === true ? state.playlist = list : state.playlist.push(list)
  },
  [types.SET_SEQUENCE_LIST](state, list, flag) {
    Array.isArray(list) === true ? state.sequenceList = list : state.sequenceList.push(list) 
  },
  [types.SET_PALY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
}

export default mutations