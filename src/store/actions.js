import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { stat } from 'fs';

function findIndex(list, voice) {
  return list.findIndex((item) => {
    return item.id === voice.id
  })
}

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PALYING_STATE, true)
}

export const selectOne = function({commit, state}, voice) {
  // 是否已经存在相同歌曲
  if (!Array.isArray(voice)) {
    for (let i = 0, len = state.playlist.length; i < len; i++) {
      const element = state.playlist[i]
      if ((element.id && element.id === voice.id) || (element.key && element.key === voice.key)) {
        if (state.currentIndex !== i) {
          commit(types.SET_CURRENT_INDEX, i)
        }
        commit(types.SET_FULL_SCREEN, true)
        return
      }
    }
  }
  commit(types.SET_PLAYLIST, voice)
  commit(types.SET_SEQUENCE_LIST, voice)
  commit(types.SET_CURRENT_INDEX, state.playlist.length - 1)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PALYING_STATE, true)
}

export const clearPlaylist = function({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PALYING_STATE, false)
}